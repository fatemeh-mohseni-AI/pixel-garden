import { expect, it } from 'vitest';
import { EXAMPLE_REPOSITORIES } from './example';
import {
  gardenSections,
  orderRepositories,
  plantFor,
  SLOTS,
  type Repository,
} from './garden';

const repo = (id: number, fields: Partial<Repository> = {}): Repository => ({
  id,
  name: `repo-${id}`,
  language: null,
  description: null,
  stars: 0,
  pushedAt: null,
  updatedAt: null,
  url: null,
  ...fields,
});

it.each([
  [0, 1],
  [1, 1],
  [10, 1],
  [11, 2],
  [50, 5],
  [100, 10],
])(
  'lays out %i repositories in %i sections with stable ordering and slots',
  (count, expectedSections) => {
    const repos = Array.from({ length: count }, (_, id) => repo(id));
    const sections = gardenSections(repos);
    expect(sections).toHaveLength(expectedSections);
    expect(sections.flat()).toEqual(repos);
    expect(sections.every((section) => section.length <= SLOTS.length)).toBe(
      true,
    );
    expect(new Set(SLOTS.map(({ x, y }) => `${x},${y}`)).size).toBe(10);
    expect(sections[0]).toEqual(repos.slice(0, 10));
  },
);

it('orders pushes, then stars, name and stable ID, keeping null pushes last', () => {
  const items = [
    repo(7, { stars: 900 }),
    repo(6, { pushedAt: 200 }),
    repo(5, { pushedAt: 100, stars: 4, name: 'Beta' }),
    repo(4, { pushedAt: 100, stars: 4, name: 'alpha' }),
    repo(3, { pushedAt: 100, stars: 4, name: 'Alpha' }),
    repo(2, { pushedAt: 100, stars: 12 }),
    repo(1),
  ];
  expect(orderRepositories(items).map((item) => item.id)).toEqual([
    6, 2, 3, 4, 5, 7, 1,
  ]);
  expect(items[0]?.id).toBe(7);
});

it.each([
  [0, 'sprout'],
  [2, 'sprout'],
  [3, 'bush'],
  [14, 'bush'],
  [15, 'flowering'],
  [59, 'flowering'],
  [60, 'tree'],
  [249, 'tree'],
  [250, 'rare'],
  [1e8, 'rare'],
])('maps %i stars to the %s growth stage', (stars, stage) => {
  expect(plantFor(repo(10, { stars })).stage).toBe(stage);
});

it('keeps palettes and facing deterministic across growth stages', () => {
  const young = plantFor(repo(10, { language: 'JavaScript', stars: 0 }));
  const grown = plantFor(repo(10, { language: 'javascript', stars: 250 }));
  expect(grown).toMatchObject({
    palette: young.palette,
    flipped: young.flipped,
  });
  expect(plantFor(repo(10, { language: 'Unknown' }))).toEqual(
    plantFor(repo(10)),
  );
  expect(plantFor(repo(10, { language: 'Python' })).palette).not.toBe(
    young.palette,
  );
  expect(
    new Set(EXAMPLE_REPOSITORIES.map((item) => plantFor(item).stage)).size,
  ).toBe(5);
});

it('marks push recency relative to the newest retrieved push', () => {
  const latest = Date.UTC(2026, 10, 11);
  expect(plantFor(repo(1, { pushedAt: latest }), latest).fresh).toBe(true);
  expect(
    plantFor(repo(1, { pushedAt: Date.UTC(2026, 9, 12) }), latest).fresh,
  ).toBe(false);
  expect(plantFor(repo(1), latest).fresh).toBe(false);
});
