export interface Repository {
  id: number;
  name: string;
  description: string | null;
  language: string | null;
  stars: number;
  pushedAt: number | null;
  updatedAt: number | null;
  url: string | null;
}

export const REPOSITORY_LIMIT = 100;
export const SECTION_SIZE = 10;

export function orderRepositories(repositories: readonly Repository[]) {
  return [...repositories]
    .sort((a, b) => {
      const aName = a.name.toLowerCase();
      const bName = b.name.toLowerCase();
      return (
        (b.pushedAt ?? -Infinity) - (a.pushedAt ?? -Infinity) ||
        b.stars - a.stars ||
        (aName < bName ? -1 : aName > bName ? 1 : a.id - b.id)
      );
    })
    .slice(0, REPOSITORY_LIMIT);
}

const families = {
  flower: ['javascript', 'html', 'vue', 'svelte', 'astro', 'css', 'scss'],
  spire: ['typescript', 'c#', 'swift', 'kotlin'],
  tree: ['go', 'rust', 'java', 'c', 'c++', 'dart'],
  shrub: ['python', 'jupyter notebook', 'r', 'ruby', 'php'],
  cactus: ['shell', 'lua', 'zig', 'powershell', 'nix'],
} as const;

type PlantFamily = keyof typeof families | 'sprout';
const languageFamilies = new Map<string, PlantFamily>(
  Object.entries(families).flatMap(([family, languages]) =>
    languages.map((language) => [language, family as keyof typeof families]),
  ),
);

function seed(value: number) {
  return Math.imul(value ^ (value >>> 16), 0x45d9f3b) >>> 0;
}

export function plantFor(repository: Repository) {
  const variation = seed(repository.id);
  return {
    family:
      languageFamilies.get(repository.language?.toLowerCase() ?? '') ??
      'sprout',
    mature: repository.stars >= 20,
    palette: variation % 3,
    flipped: (variation & 4) !== 0,
  };
}

export type PlantStyle = ReturnType<typeof plantFor>;

// The first and second rows have offset centers so their silhouettes read separately.
export const SLOTS = [
  { x: 10.5, y: 60, mobileX: 10, mobileY: 60 },
  { x: 29, y: 58, mobileX: 30, mobileY: 58 },
  { x: 48, y: 60, mobileX: 50, mobileY: 60 },
  { x: 68, y: 57, mobileX: 70, mobileY: 57 },
  { x: 87, y: 61, mobileX: 90, mobileY: 60 },
  { x: 13.5, y: 82, mobileX: 11, mobileY: 82 },
  { x: 33, y: 85, mobileX: 31, mobileY: 85 },
  { x: 54, y: 81, mobileX: 50, mobileY: 81 },
  { x: 73, y: 84, mobileX: 69, mobileY: 84 },
  { x: 92, y: 81, mobileX: 89, mobileY: 81 },
] as const;

export function gardenSections(repositories: readonly Repository[]) {
  const count = Math.max(1, Math.ceil(repositories.length / SECTION_SIZE));
  return Array.from({ length: count }, (_, index) => {
    const start = index * SECTION_SIZE;
    return repositories.slice(start, start + SECTION_SIZE);
  });
}
