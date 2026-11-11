import { useCallback, useEffect, useRef, useState } from 'react';
import { Garden } from './components/Garden';
import { Icon } from './components/Icons';
import { LookupDialog, type LookupState } from './components/LookupDialog';
import { EXAMPLE_REPOSITORIES } from './domain/example';
import {
  fetchGarden,
  GitHubError,
  parseUsername,
  type GitHubGarden,
} from './lib/github';

const idle: LookupState = { status: 'idle' };

function messageFor(error: unknown, username: string) {
  if (!(error instanceof GitHubError))
    return 'GitHub could not load this garden. Try again shortly.';
  switch (error.kind) {
    case 'missing':
      return `GitHub couldn't find @${username}. Check the username and try again.`;
    case 'network':
      return 'Could not reach GitHub. Check your connection and try again.';
    case 'timeout':
      return 'GitHub took too long to respond. Try again.';
    case 'rate-limit':
      return error.retryAt === null
        ? 'GitHub’s public API is rate-limited. Wait a few minutes, then try again.'
        : `GitHub’s public API is rate-limited. Try again after ${new Date(Math.ceil(error.retryAt / 60000) * 60000).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}.`;
    case 'unavailable':
      return 'GitHub could not load this garden. Try again shortly.';
  }
}

export function App() {
  const [garden, setGarden] = useState<GitHubGarden | null>(null);
  const [lookup, setLookup] = useState<LookupState>(idle);
  const [dialogOpen, setDialogOpen] = useState(false);
  const request = useRef<AbortController | null>(null);
  const tryButton = useRef<HTMLButtonElement>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const input = useRef<HTMLInputElement>(null);
  const initialProfile = useRef(
    new URLSearchParams(window.location.search).get('user'),
  );

  const closeLookup = useCallback(() => {
    if (dialog.current?.open) {
      dialog.current.close();
      tryButton.current?.focus();
    }
    setDialogOpen(false);
  }, []);

  const load = useCallback(
    async (username: string) => {
      if (request.current) return;
      const controller = new AbortController();
      request.current = controller;
      setLookup({ status: 'loading' });

      try {
        const result = await fetchGarden(username, controller.signal);
        if (request.current !== controller) return;
        setGarden(result);
        setLookup(idle);
        closeLookup();
        const url = new URL(window.location.href);
        url.searchParams.set('user', result.username);
        window.history.replaceState(null, '', url);
      } catch (error) {
        if (request.current === controller) {
          setLookup({ status: 'error', message: messageFor(error, username) });
        }
      } finally {
        if (request.current === controller) request.current = null;
      }
    },
    [closeLookup],
  );

  useEffect(() => {
    const candidate = initialProfile.current;
    if (candidate !== null) {
      const username = parseUsername(candidate);
      if (username) void load(username);
      else
        setLookup({
          status: 'error',
          message: 'This link contains an invalid GitHub username.',
        });
    }
    return () => {
      request.current?.abort();
      request.current = null;
    };
  }, [load]);

  function openLookup() {
    if (!dialog.current || dialog.current.open || !input.current) return;
    input.current.value = garden?.username ?? initialProfile.current ?? '';
    dialog.current.showModal();
    setDialogOpen(true);
    input.current.focus();
    input.current.select();
  }

  function dismissLookup() {
    request.current?.abort();
    request.current = null;
    closeLookup();
    setLookup(idle);
  }

  return (
    <div className="app">
      <header className="site-header">
        <div className="brand">
          <img
            src={`${import.meta.env.BASE_URL}sprout.svg`}
            alt=""
            width="34"
            height="34"
          />
          <span>Pixel Garden</span>
        </div>
        <button
          className="primary-button try-button"
          ref={tryButton}
          type="button"
          onClick={openLookup}
          aria-haspopup="dialog"
        >
          <Icon name="sprout" width="18" height="18" />
          Try Your Own
        </button>
      </header>
      <Garden
        key={garden?.username ?? 'example:'}
        repositories={garden?.repositories ?? EXAMPLE_REPOSITORIES}
        username={garden?.username ?? null}
        capped={garden?.capped ?? false}
        lookup={dialogOpen ? idle : lookup}
        openLookup={openLookup}
      />
      <LookupDialog
        dialog={dialog}
        input={input}
        lookup={lookup}
        onSubmit={(username) => void load(username)}
        onDismiss={dismissLookup}
        onEdit={() => {
          if (lookup.status === 'error') setLookup(idle);
        }}
      />
    </div>
  );
}
