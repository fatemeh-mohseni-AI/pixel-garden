import {
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
} from 'react';
import {
  gardenSections,
  plantFor,
  SECTION_SIZE,
  SLOTS,
  type Repository,
} from '../domain/garden';
import { useReaction } from '../hooks/useReaction';
import { GardenNeighbors } from './GardenNeighbors';
import type { LookupState } from './LookupDialog';
import { Icon } from './Icons';
import { Landscape } from './Landscape';
import { NightMoon } from './NightScenery';
import { Plant } from './Plant';
import type { PlantReaction } from './PlantReactions';

const date = new Intl.DateTimeFormat('en', {
  dateStyle: 'medium',
  timeZone: 'UTC',
});
const number = new Intl.NumberFormat('en');

interface Props {
  repositories: readonly Repository[];
  username: string | null;
  capped: boolean;
  lookup: LookupState;
  openLookup: () => void;
}

export function Garden({
  repositories,
  username,
  capped,
  lookup,
  openLookup,
}: Props) {
  const sections = useMemo(() => {
    const latestPush = repositories[0]?.pushedAt ?? null;
    return gardenSections(repositories).map((section) =>
      section.map((repository) => ({
        repository,
        style: plantFor(repository, latestPush),
      })),
    );
  }, [repositories]);
  const expanded = sections.length > 1;
  const [cottageOpen, setCottageOpen] = useState(false);
  const [reaction, react] = useReaction<{
    repository: Repository;
    kind: PlantReaction;
  }>(1750);
  const nextDiscovery = useRef(0);
  const [current, setCurrent] = useState(0);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const selected =
    selectedId === null
      ? null
      : (repositories.find((repository) => repository.id === selectedId) ??
        null);
  const viewport = useRef<HTMLDivElement>(null);
  const heading = useRef<HTMLHeadingElement>(null);
  const opener = useRef<HTMLButtonElement | null>(null);
  const returningFocus = useRef(false);
  const moveToDetails = useRef(false);

  function dismissDetails() {
    returningFocus.current = true;
    opener.current?.focus();
    returningFocus.current = false;
    setSelectedId(null);
  }

  function inspect(
    repository: Repository,
    button: HTMLButtonElement,
    focusDetails = false,
    celebrate = false,
  ) {
    if (returningFocus.current) return;
    opener.current = button;
    setCottageOpen(false);
    if (
      (celebrate || selectedId !== repository.id) &&
      plantFor(repository).stage === 'rare'
    ) {
      react({ repository, kind: 'celebrate' });
    }
    if (focusDetails) {
      if (heading.current && selected?.id === repository.id) {
        heading.current.focus({ preventScroll: true });
      } else {
        moveToDetails.current = true;
      }
    }
    setSelectedId(repository.id);
  }

  function pan(index: number) {
    const stage = viewport.current;
    if (stage) {
      const left =
        index === sections.length - 1
          ? stage.scrollWidth
          : stage.getBoundingClientRect().width * index;
      stage.scrollTo({ left });
    }
  }

  function changeCottage(open: boolean) {
    if (open) setSelectedId(null);
    setCottageOpen(open);
  }

  function bringPlantIntoView(repository: Repository) {
    const stage = viewport.current;
    const button = stage?.querySelector<HTMLButtonElement>(
      `[data-repository-id="${repository.id}"]`,
    );
    if (!stage || !button) return null;
    const bounds = button.getBoundingClientRect();
    const visible = stage.getBoundingClientRect();
    if (bounds.left < visible.left || bounds.right > visible.right) {
      pan(Math.floor(repositories.indexOf(repository) / SECTION_SIZE));
    }
    return button;
  }

  function discoverProject() {
    if (!repositories.length) return;
    const index =
      repositories.length - 1 - (nextDiscovery.current++ % repositories.length);
    const repository = repositories[index]!;
    const button = bringPlantIntoView(repository);
    if (button) inspect(repository, button, true, true);
  }

  function waterPlant() {
    if (!selected) return;
    bringPlantIntoView(selected);
    react({ repository: selected, kind: 'water' });
  }

  function handleStageKeys(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === 'Escape' && selected) {
      event.preventDefault();
      dismissDetails();
    }
    if (!expanded || event.target !== event.currentTarget) return;
    const destinations: Record<string, number> = {
      ArrowLeft: Math.max(0, current - 1),
      ArrowRight: Math.min(sections.length - 1, current + 1),
      Home: 0,
      End: sections.length - 1,
    };
    const destination = destinations[event.key];
    if (typeof destination === 'number') {
      event.preventDefault();
      pan(destination);
    }
  }

  return (
    <main className="garden" aria-label="Pixel Garden">
      <div className="stage">
        <div className="stage-top">
          <div className="garden-tag">
            <span className="tag-dot" />
            <h1>{username ? `@${username}` : 'Example garden'}</h1>
          </div>
          {capped && <p className="cap-note">First 100 public repositories</p>}
        </div>
        <div
          className="garden-scroll"
          ref={viewport}
          role="region"
          aria-label="Garden landscape"
          tabIndex={expanded ? 0 : undefined}
          onKeyDown={handleStageKeys}
          onScroll={(event) => {
            const stage = event.currentTarget;
            setCurrent(
              Math.min(
                sections.length - 1,
                Math.round(stage.scrollLeft / stage.clientWidth),
              ),
            );
          }}
        >
          {sections.map((section, sectionIndex) => (
            <div
              className="garden-section"
              data-section={sectionIndex + 1}
              key={sectionIndex}
            >
              <Landscape section={sectionIndex} />
              {sectionIndex === 0 && (
                <GardenNeighbors
                  cottageOpen={cottageOpen}
                  canDiscover={repositories.length > 0}
                  onCottageChange={changeCottage}
                  onDiscover={discoverProject}
                />
              )}
              {!repositories.length && (
                <>
                  <div className="soil" aria-hidden="true" />
                  <div className="empty-garden">
                    <Icon name="sprout" />
                    <h2>A little room to grow</h2>
                    <p>This profile has no public repositories yet.</p>
                  </div>
                </>
              )}
              {section.map(({ repository, style }, slotIndex) => {
                const slot = SLOTS[slotIndex]!;
                const placement = {
                  '--slot-x': `${slot.x}%`,
                  '--slot-y': `${slot.y}%`,
                  '--mobile-x': `${slot.mobileX}%`,
                  '--mobile-y': `${slot.mobileY}%`,
                } as CSSProperties;
                return (
                  <button
                    className={`plant-button ${slotIndex < 5 ? 'plant-button--back' : 'plant-button--front'}`}
                    type="button"
                    key={repository.id}
                    data-repository-id={repository.id}
                    style={placement}
                    aria-label={`Inspect ${repository.name}`}
                    aria-expanded={selected?.id === repository.id}
                    aria-controls={
                      selected?.id === repository.id
                        ? 'plant-details'
                        : undefined
                    }
                    onFocus={(event) => {
                      if (event.currentTarget.matches(':focus-visible'))
                        inspect(repository, event.currentTarget);
                    }}
                    onClick={(event) =>
                      inspect(
                        repository,
                        event.currentTarget,
                        event.detail === 0,
                        true,
                      )
                    }
                  >
                    <Plant
                      style={style}
                      reaction={
                        reaction?.value.repository.id === repository.id
                          ? {
                              kind: reaction.value.kind,
                              revision: reaction.revision,
                            }
                          : undefined
                      }
                    />
                  </button>
                );
              })}
            </div>
          ))}
        </div>
        <NightMoon />
        <span className="sr-only" role="status">
          {reaction?.value.kind === 'water' && (
            <span key={reaction.revision}>
              Watered {reaction.value.repository.name}.
            </span>
          )}
        </span>

        {lookup.status !== 'idle' && (
          <div className="scene-message" role="status">
            {lookup.status === 'loading' ? (
              'Growing your garden…'
            ) : (
              <>
                <span>{lookup.message}</span>
                <button type="button" onClick={openLookup}>
                  Try again
                </button>
              </>
            )}
          </div>
        )}

        {selected && (
          <section
            id="plant-details"
            className="plant-details"
            aria-labelledby="plant-title"
            onKeyDown={(event) => {
              if (event.key === 'Escape') {
                event.preventDefault();
                dismissDetails();
              }
            }}
          >
            <h2
              id="plant-title"
              tabIndex={-1}
              ref={(element) => {
                heading.current = element;
                if (element && moveToDetails.current) {
                  moveToDetails.current = false;
                  element.focus({ preventScroll: true });
                }
              }}
            >
              {selected.name}
            </h2>
            <button
              className="icon-button details-close"
              type="button"
              aria-label="Close plant details"
              onClick={dismissDetails}
            >
              <Icon name="close" width="17" height="17" />
            </button>
            {selected.description && (
              <p className="plant-description">{selected.description}</p>
            )}
            <dl className="plant-stats">
              <div>
                <dt>Language</dt>
                <dd>{selected.language ?? 'Unspecified'}</dd>
              </div>
              <div>
                <dt>Stars</dt>
                <dd>
                  <Icon name="star" width="15" height="15" />
                  {number.format(selected.stars)}
                </dd>
              </div>
              <div>
                <dt>
                  {selected.pushedAt !== null ? 'Last push' : 'Last updated'}
                </dt>
                <dd>
                  {selected.pushedAt !== null || selected.updatedAt !== null
                    ? date.format(selected.pushedAt ?? selected.updatedAt ?? 0)
                    : 'Unavailable'}
                </dd>
              </div>
            </dl>
            <div className="plant-actions">
              {selected.url && (
                <a
                  className="repository-link"
                  href={selected.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View on GitHub <Icon name="external" width="16" height="16" />
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              )}
              <button
                className="water-button"
                type="button"
                onClick={waterPlant}
              >
                <Icon name="water" width="16" height="16" /> Water Plant
              </button>
            </div>
          </section>
        )}
      </div>
      <footer className="garden-footer">
        <p className="plant-count" role="status">
          <Icon name="sprout" width="16" height="16" />
          {repositories.length} {username ? 'public ' : 'sample '}
          {repositories.length === 1 ? 'repository' : 'repositories'}
        </p>
        {expanded ? (
          <nav className="garden-nav" aria-label="Explore garden sections">
            <span className="scroll-hint">Scroll to explore</span>
            <button
              className="icon-button"
              type="button"
              aria-label="Previous garden section"
              aria-disabled={current === 0}
              onClick={() => {
                if (current > 0) pan(current - 1);
              }}
            >
              <Icon name="back" width="17" height="17" />
            </button>
            <span className="section-count">
              {current + 1} / {sections.length}
              <span className="sr-only"> garden sections</span>
            </span>
            <button
              className="icon-button"
              type="button"
              aria-label="Next garden section"
              aria-disabled={current === sections.length - 1}
              onClick={() => {
                if (current < sections.length - 1) pan(current + 1);
              }}
            >
              <Icon name="arrow" width="17" height="17" />
            </button>
          </nav>
        ) : (
          repositories.length > 0 && (
            <p className="plant-hint">
              <Icon name="pointer" width="15" height="15" /> Explore the garden
            </p>
          )
        )}
      </footer>
    </main>
  );
}
