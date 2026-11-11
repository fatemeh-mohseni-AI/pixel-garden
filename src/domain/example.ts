import type { Repository } from './garden';

const examples = [
  [
    'sunny-sketches',
    'JavaScript',
    38,
    'A little sketchbook of experiments with color and light.',
  ],
  [
    'moonlit-maps',
    'TypeScript',
    2,
    'An illustrated atlas of imaginary walking trails.',
  ],
  [
    'grove-tools',
    'Rust',
    440,
    'Small tools for keeping a growing collection of notes tidy.',
  ],
  [
    'berry-notebook',
    'Python',
    12,
    'A field notebook for cataloguing wild berries.',
  ],
  [
    'pebble-scripts',
    'Shell',
    82,
    'Short command-line helpers for everyday chores.',
  ],
  [
    'wildflower.css',
    'CSS',
    21,
    'An assortment of tiny, reusable CSS drawings.',
  ],
  [
    'fern-and-fable',
    'Kotlin',
    8,
    'A collection of short stories for quiet evenings.',
  ],
  [
    'orchard-clock',
    'Go',
    146,
    'A friendly timer that helps you step away from your desk.',
  ],
  [
    'little-greenhouse',
    null,
    0,
    'Notes and drawings from a pocket-sized greenhouse.',
  ],
  ['raspberry-patch', 'Ruby', 32, 'A fictional recipe book for berry season.'],
] as const;

export const EXAMPLE_REPOSITORIES: Repository[] = examples.map(
  ([name, language, stars, description], index) => ({
    id: index + 101,
    name,
    language,
    stars,
    description,
    url: null,
    pushedAt: null,
    updatedAt: null,
  }),
);
