import { useEffect, useRef } from 'react';
import { useReaction } from '../hooks/useReaction';
import { Icon } from './Icons';
import { GardenBird, GardenCat, GardenCottage } from './SceneLife';

interface Props {
  cottageOpen: boolean;
  canDiscover: boolean;
  onCottageChange: (open: boolean) => void;
  onDiscover: () => void;
}

export function GardenNeighbors({
  cottageOpen,
  canDiscover,
  onCottageChange,
  onDiscover,
}: Props) {
  const [reaction, react] = useReaction<'cat' | 'bird-one' | 'bird-two'>(1250);
  const door = useRef<HTMLButtonElement>(null);
  const greeting = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (cottageOpen) greeting.current?.focus({ preventScroll: true });
  }, [cottageOpen]);

  function dismissCottage() {
    onCottageChange(false);
    door.current?.focus({ preventScroll: true });
  }

  function bird(which: 'bird-one' | 'bird-two') {
    const flutter = reaction?.value === which;
    return (
      <button
        className={`scene-control scene-bird ${which}`}
        type="button"
        aria-label={
          which === 'bird-one'
            ? 'Greet the first bird'
            : 'Greet the second bird'
        }
        onClick={() => react(which)}
      >
        <GardenBird key={flutter ? reaction.revision : 0} flutter={flutter} />
      </button>
    );
  }

  const pet = reaction?.value === 'cat';

  return (
    <>
      {bird('bird-one')}
      {bird('bird-two')}
      <button
        className="scene-control scene-cat"
        type="button"
        aria-label="Pet the cat"
        onClick={() => react('cat')}
      >
        <GardenCat key={pet ? reaction.revision : 0} pet={pet} />
      </button>
      <button
        className="scene-control scene-cottage"
        type="button"
        aria-label="Open cottage door"
        ref={door}
        aria-expanded={cottageOpen}
        aria-controls={cottageOpen ? 'cottage-greeting' : undefined}
        onClick={() => onCottageChange(!cottageOpen)}
      >
        <GardenCottage open={cottageOpen} />
      </button>
      {cottageOpen && (
        <section
          className="cottage-greeting"
          id="cottage-greeting"
          aria-labelledby="cottage-title"
          onKeyDown={(event) => {
            if (event.key === 'Escape') {
              event.preventDefault();
              event.stopPropagation();
              dismissCottage();
            }
          }}
        >
          <h2 id="cottage-title" tabIndex={-1} ref={greeting}>
            Hello, sprout!
          </h2>
          <button
            className="icon-button cottage-close"
            type="button"
            aria-label="Close cottage greeting"
            onClick={dismissCottage}
          >
            <Icon name="close" width="16" height="16" />
          </button>
          <p>
            {canDiscover
              ? 'Shall I show you a project?'
              : 'This garden is waiting for its first project.'}
          </p>
          {canDiscover && (
            <button
              className="cottage-discover"
              type="button"
              onClick={onDiscover}
            >
              Discover a project <Icon name="arrow" width="16" height="16" />
            </button>
          )}
        </section>
      )}
      <span className="sr-only" role="status">
        {reaction && (
          <span key={reaction.revision}>
            {pet
              ? 'The cat sends you a heart.'
              : 'The bird flutters in greeting.'}
          </span>
        )}
      </span>
    </>
  );
}
