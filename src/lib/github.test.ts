import { describe, expect, it, vi } from 'vitest';
import { createGitHubClient, parseUsername } from './github';

const active = () => new AbortController().signal;
const record = (id: number, extra = {}) => ({
  id,
  name: `repo-${id}`,
  private: false,
  html_url: `https://github.com/gardener/repo-${id}`,
  ...extra,
});

describe('GitHub profile input', () => {
  it.each([
    ' Octo-Cat ',
    'https://github.com/Octo-Cat/',
    'github.com/Octo-Cat?tab=repositories',
    'https://www.github.com/Octo-Cat#readme',
  ])('accepts %s', (value) => {
    expect(parseUsername(value)).toBe('octo-cat');
  });

  it.each([
    '',
    '-octo',
    'octo-',
    'octo--cat',
    'octo cat',
    'git_hub',
    'a'.repeat(40),
    'https://github.com/user/repo',
    'https://github.com.evil.test/octo',
    'https://github.com@evil.test/octo',
    'github.com/%6fcto',
    'https://github.com:444/octo',
  ])('rejects %s', (value) => {
    expect(parseUsername(value)).toBeNull();
  });
});

describe('public repository lookup', () => {
  it.each([0, 1, 10, 11, 50, 100, 110])(
    'handles %i public records with one request',
    async (count) => {
      const fetcher = vi
        .fn<typeof fetch>()
        .mockResolvedValue(
          Response.json(Array.from({ length: count }, (_, id) => record(id))),
        );
      const garden = await createGitHubClient(fetcher)('gardener', active());
      expect(garden.repositories).toHaveLength(Math.min(100, count));
      expect(garden.capped).toBe(count >= 100);
      expect(fetcher).toHaveBeenCalledOnce();
      expect(fetcher.mock.calls[0]?.[0].toString()).toBe(
        'https://api.github.com/users/gardener/repos?type=owner&sort=pushed&direction=desc&per_page=100&page=1',
      );
      expect(fetcher.mock.calls[0]?.[1]).toMatchObject({ credentials: 'omit' });
    },
  );

  it('keeps forks, normalizes partial metadata, and rejects unsafe URLs and private records', async () => {
    const fetcher = vi
      .fn<typeof fetch>()
      .mockResolvedValue(
        Response.json([
          record(1, {
            fork: true,
            stargazers_count: -3,
            html_url: 'https://github.com.evil.test/gardener/repo-1',
          }),
          record(2, { private: true }),
          record(3, {
            language: 'CSS',
            pushed_at: 'invalid',
            html_url: 'https://github.com/gardener/repo-3',
          }),
        ]),
      );
    const { repositories } = await createGitHubClient(fetcher)(
      'gardener',
      active(),
    );
    expect(repositories).toEqual([
      {
        id: 1,
        name: 'repo-1',
        language: null,
        description: null,
        stars: 0,
        url: null,
        pushedAt: null,
        updatedAt: null,
      },
      {
        id: 3,
        name: 'repo-3',
        language: 'CSS',
        description: null,
        stars: 0,
        url: 'https://github.com/gardener/repo-3',
        pushedAt: null,
        updatedAt: null,
      },
    ]);
  });

  it.each([
    [404, {}, {}, 'missing'],
    [
      403,
      {},
      { message: 'You have exceeded a secondary rate limit' },
      'rate-limit',
    ],
    [403, {}, {}, 'unavailable'],
    [429, {}, {}, 'rate-limit'],
    [503, {}, {}, 'unavailable'],
    [200, {}, { invalid: true }, 'unavailable'],
  ] as const)('handles HTTP %i as %s', async (status, headers, body, kind) => {
    const fetcher = vi
      .fn<typeof fetch>()
      .mockResolvedValue(Response.json(body, { status, headers }));
    await expect(
      createGitHubClient(fetcher)('gardener', active()),
    ).rejects.toMatchObject({ kind });
  });

  it('honors both rate-limit headers before another lookup', async () => {
    let time = 1000;
    const fetcher = vi
      .fn<typeof fetch>()
      .mockResolvedValueOnce(
        Response.json(
          {},
          {
            status: 403,
            headers: {
              'x-ratelimit-remaining': '0',
              'x-ratelimit-reset': '100',
              'retry-after': '10',
            },
          },
        ),
      )
      .mockResolvedValueOnce(Response.json([]));
    const lookup = createGitHubClient(fetcher, () => time);
    await expect(lookup('gardener', active())).rejects.toMatchObject({
      kind: 'rate-limit',
      retryAt: 100000,
    });
    await expect(lookup('other', active())).rejects.toMatchObject({
      kind: 'rate-limit',
    });
    expect(fetcher).toHaveBeenCalledOnce();
    time = 100000;
    await expect(lookup('other', active())).resolves.toMatchObject({
      repositories: [],
    });
  });

  it('uses a five-minute session cache', async () => {
    let time = 0;
    const fetcher = vi
      .fn<typeof fetch>()
      .mockImplementation(async () => Response.json([]));
    const lookup = createGitHubClient(fetcher, () => time);
    await lookup('gardener', active());
    time += 299999;
    await lookup('gardener', active());
    expect(fetcher).toHaveBeenCalledOnce();
    time += 1;
    await lookup('gardener', active());
    expect(fetcher).toHaveBeenCalledTimes(2);
  });

  it('reports offline failures and never starts a cancelled request', async () => {
    const fetcher = vi
      .fn<typeof fetch>()
      .mockRejectedValue(new TypeError('offline'));
    const lookup = createGitHubClient(fetcher);
    await expect(lookup('gardener', active())).rejects.toMatchObject({
      kind: 'network',
    });
    await expect(lookup('gardener', AbortSignal.abort())).rejects.toMatchObject(
      { name: 'AbortError' },
    );
    expect(fetcher).toHaveBeenCalledOnce();
  });

  it('distinguishes an elapsed timeout from a user cancellation', async () => {
    const fetcher = vi.fn<typeof fetch>().mockImplementation(
      (_input, options) =>
        new Promise((_resolve, reject) => {
          const signal = options?.signal;
          signal?.addEventListener('abort', () => reject(signal.reason), {
            once: true,
          });
        }),
    );
    const controller = new AbortController();
    const lookup = createGitHubClient(fetcher, Date.now, 15);
    const pending = lookup('gardener', controller.signal);
    controller.abort();
    await expect(pending).rejects.toMatchObject({ name: 'AbortError' });
    await expect(lookup('gardener', active())).rejects.toMatchObject({
      kind: 'timeout',
    });
  });
});
