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

const paletteLanguages = [
  ['javascript', 'html', 'vue', 'svelte', 'astro', 'css', 'scss'],
  [
    'typescript',
    'c#',
    'swift',
    'kotlin',
    'go',
    'rust',
    'java',
    'c',
    'c++',
    'dart',
  ],
  [
    'python',
    'jupyter notebook',
    'r',
    'ruby',
    'php',
    'shell',
    'lua',
    'zig',
    'powershell',
    'nix',
  ],
];

const languagePalettes = new Map(
  paletteLanguages.flatMap((languages, palette) =>
    languages.map((language) => [language, palette] as const),
  ),
);

const growthStages = [
  { below: 3, stage: 'sprout' },
  { below: 15, stage: 'bush' },
  { below: 60, stage: 'flowering' },
  { below: 250, stage: 'tree' },
] as const;

function seed(id: number) {
  let value = id ^ Math.floor(id / 0x100000000);
  value = Math.imul(value ^ (value >>> 16), 0x45d9f3b);
  value = Math.imul(value ^ (value >>> 16), 0x45d9f3b);
  return (value ^ (value >>> 16)) >>> 0;
}

export function plantFor(
  repository: Repository,
  latestPush: number | null = null,
) {
  const variation = seed(repository.id);
  const stage: (typeof growthStages)[number]['stage'] | 'rare' =
    growthStages.find(({ below }) => repository.stars < below)?.stage ?? 'rare';
  return {
    stage,
    palette:
      languagePalettes.get(repository.language?.toLowerCase() ?? '') ??
      variation % 3,
    flipped: (variation & 4) !== 0,
    fresh:
      repository.pushedAt !== null &&
      latestPush !== null &&
      latestPush >= repository.pushedAt &&
      latestPush - repository.pushedAt <= 14 * 86400000,
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
  { x: 54, y: 83, mobileX: 50, mobileY: 83 },
  { x: 73, y: 84, mobileX: 69, mobileY: 84 },
  { x: 92, y: 83, mobileX: 89, mobileY: 83 },
] as const;

export function gardenSections(repositories: readonly Repository[]) {
  const count = Math.max(1, Math.ceil(repositories.length / SECTION_SIZE));
  return Array.from({ length: count }, (_, index) => {
    const start = index * SECTION_SIZE;
    return repositories.slice(start, start + SECTION_SIZE);
  });
}
