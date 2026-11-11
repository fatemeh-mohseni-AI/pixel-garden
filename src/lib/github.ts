import {
  orderRepositories,
  REPOSITORY_LIMIT,
  type Repository,
} from '../domain/garden';

const LOGIN = /^[a-z\d]+(?:-[a-z\d]+)*$/i;
const CACHE_TTL = 5 * 60 * 1000;
const CACHE_LIMIT = 20;
const REQUEST_TIMEOUT = 12000;

export function parseUsername(value: string): string | null {
  const input = value.trim();
  const profile =
    /^(?:https?:\/\/)?(?:www\.)?github\.com\/([^/?#]+)\/?(?:\?[^#]*)?(?:#.*)?$/i.exec(
      input,
    );
  const candidate = profile?.[1] ?? input;
  return candidate.length <= 39 && LOGIN.test(candidate)
    ? candidate.toLowerCase()
    : null;
}

type LookupFailure =
  'missing' | 'rate-limit' | 'network' | 'timeout' | 'unavailable';

export class GitHubError extends Error {
  constructor(
    public readonly kind: LookupFailure,
    public readonly retryAt: number | null = null,
  ) {
    super(kind);
    this.name = 'GitHubError';
  }
}

export interface GitHubGarden {
  username: string;
  repositories: Repository[];
  capped: boolean;
}

function asObject(value: unknown): Record<string, unknown> | null {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : null;
}

function stringOrNull(value: unknown) {
  return typeof value === 'string' ? value : null;
}

function timestamp(value: unknown) {
  if (typeof value !== 'string') return null;
  const parsed = Date.parse(value);
  return Number.isFinite(parsed) ? parsed : null;
}

function safeRepositoryUrl(value: unknown, name: string) {
  if (typeof value !== 'string') return null;
  try {
    const url = new URL(value);
    const match = /^\/([a-z\d-]+)\/([\w.-]+)$/i.exec(url.pathname);
    return url.origin === 'https://github.com' &&
      !url.username &&
      !url.password &&
      !url.search &&
      !url.hash &&
      match?.[2] === name
      ? url.href
      : null;
  } catch {
    return null;
  }
}

function normalize(value: unknown): Repository | null {
  const row = asObject(value);
  if (
    !row ||
    row.private === true ||
    typeof row.id !== 'number' ||
    !Number.isSafeInteger(row.id) ||
    typeof row.name !== 'string' ||
    !row.name
  )
    return null;

  return {
    id: row.id,
    name: row.name,
    description: stringOrNull(row.description),
    language: stringOrNull(row.language),
    stars:
      typeof row.stargazers_count === 'number' &&
      Number.isFinite(row.stargazers_count)
        ? Math.max(0, Math.floor(row.stargazers_count))
        : 0,
    pushedAt: timestamp(row.pushed_at),
    updatedAt: timestamp(row.updated_at),
    url: safeRepositoryUrl(row.html_url, row.name),
  };
}

function rateLimitReset(headers: Headers, now: number) {
  const retry = headers.get('retry-after');
  const reset = headers.get('x-ratelimit-reset');
  const retryAt =
    retry === null
      ? NaN
      : /^\d+$/.test(retry)
        ? now + Number(retry) * 1000
        : Date.parse(retry);
  const resetAt =
    headers.get('x-ratelimit-remaining') === '0' && reset !== null
      ? Number(reset) * 1000
      : NaN;
  const dates = [retryAt, resetAt].filter(
    (value) => Number.isFinite(value) && value > now,
  );
  return dates.length ? Math.max(...dates) : null;
}

export function createGitHubClient(
  fetchPage: typeof fetch = fetch,
  now = Date.now,
  timeoutMs = REQUEST_TIMEOUT,
) {
  const cache = new Map<string, { expiresAt: number; garden: GitHubGarden }>();
  let nextRequestAt: number | null = null;

  return async function fetchGarden(
    username: string,
    signal: AbortSignal,
  ): Promise<GitHubGarden> {
    signal.throwIfAborted();
    const cached = cache.get(username);
    if (cached && cached.expiresAt > now()) return cached.garden;
    cache.delete(username);
    if (nextRequestAt !== null && nextRequestAt > now()) {
      throw new GitHubError('rate-limit', nextRequestAt);
    }

    const url = new URL(
      `https://api.github.com/users/${encodeURIComponent(username)}/repos`,
    );
    url.search = 'type=owner&sort=pushed&direction=desc&per_page=100&page=1';
    const timeout = AbortSignal.timeout(timeoutMs);
    const requestSignal = AbortSignal.any([signal, timeout]);
    let response: Response;
    let payload: unknown;
    try {
      response = await fetchPage(url, {
        signal: requestSignal,
        headers: { Accept: 'application/vnd.github+json' },
        credentials: 'omit',
      });
      if (response.status === 200 || response.status === 403) {
        try {
          payload = await response.json();
        } catch (error) {
          if (!(error instanceof SyntaxError)) throw error;
        }
      }
      requestSignal.throwIfAborted();
    } catch {
      signal.throwIfAborted();
      throw new GitHubError(timeout.aborted ? 'timeout' : 'network');
    }

    if (response.status === 404) throw new GitHubError('missing');
    const message = asObject(payload)?.message;
    if (
      response.status === 429 ||
      (response.status === 403 &&
        (response.headers.get('x-ratelimit-remaining') === '0' ||
          response.headers.has('retry-after') ||
          (typeof message === 'string' &&
            /rate limit|abuse detection/i.test(message))))
    ) {
      nextRequestAt = rateLimitReset(response.headers, now());
      throw new GitHubError('rate-limit', nextRequestAt);
    }

    if (!response.ok || !Array.isArray(payload))
      throw new GitHubError('unavailable');

    const byId = new Map<number, Repository>();
    for (const value of payload.slice(0, REPOSITORY_LIMIT)) {
      const repository = normalize(value);
      if (repository) byId.set(repository.id, repository);
    }
    if (payload.length && !byId.size) throw new GitHubError('unavailable');

    const garden = {
      username,
      repositories: orderRepositories([...byId.values()]),
      capped: payload.length >= REPOSITORY_LIMIT,
    };
    cache.set(username, { expiresAt: now() + CACHE_TTL, garden });
    if (cache.size > CACHE_LIMIT) {
      const oldest = cache.keys().next();
      if (!oldest.done) cache.delete(oldest.value);
    }
    return garden;
  };
}

export const fetchGarden = createGitHubClient();
