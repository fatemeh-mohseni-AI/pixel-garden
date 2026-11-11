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

it('maps language and stars into six reusable families and two bounded tiers', () => {
  const flower = plantFor(repo(10, { language: 'JavaScript', stars: 19 }));
  expect(flower).toEqual(
    plantFor(repo(10, { language: 'javascript', stars: 1 })),
  );
  expect(flower).toMatchObject({ family: 'flower', mature: false });
  expect(plantFor(repo(10, { language: 'JavaScript', stars: 20 }))).toEqual(
    plantFor(repo(10, { language: 'JavaScript', stars: 1e8 })),
  );
  expect(plantFor(repo(10, { language: 'Unknown' })).family).toBe('sprout');
  expect(plantFor(repo(10)).family).toBe('sprout');
  expect(
    new Set(EXAMPLE_REPOSITORIES.map((item) => plantFor(item).family)).size,
  ).toBe(6);
});
