import type { Page } from '@playwright/test';

const languages = [
  'JavaScript',
  'TypeScript',
  'Rust',
  'Python',
  'Shell',
  'CSS',
  'Swift',
  'Go',
  null,
  'Ruby',
];

export function sampleRepos(count: number, username: string) {
  return Array.from({ length: count }, (_, index) => {
    const id = index + 1;
    const name = `garden-project-${id}`;
    return {
      id,
      name,
      private: false,
      html_url: `https://github.com/${username}/${name}`,
      description: `Public repository fixture ${id}.`,
      language: languages[index % languages.length] ?? null,
      stargazers_count: (index * 7 + 23) % 55,
      pushed_at: new Date(Date.UTC(2026, 9, 25 - index * 6)).toISOString(),
      updated_at: '2026-10-20T12:00:00Z',
    };
  });
}

export async function mockProfile(page: Page, username: string, count: number) {
  await page.route(
    `https://api.github.com/users/${username}/repos?*`,
    (route) => route.fulfill({ json: sampleRepos(count, username) }),
  );
}
