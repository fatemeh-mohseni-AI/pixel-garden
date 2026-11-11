import { useState, type FormEvent, type RefObject } from 'react';
import { parseUsername } from '../lib/github';
import { Icon } from './Icons';

export type LookupState =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'error'; message: string };

interface Props {
  dialog: RefObject<HTMLDialogElement | null>;
  input: RefObject<HTMLInputElement | null>;
  lookup: LookupState;
  onSubmit: (username: string) => void;
  onDismiss: () => void;
  onEdit: () => void;
}

export function LookupDialog({
  dialog,
  input,
  lookup,
  onSubmit,
  onDismiss,
  onEdit,
}: Props) {
  const [invalid, setInvalid] = useState(false);
  const busy = lookup.status === 'loading';

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy) return;
    const username = parseUsername(input.current?.value ?? '');
    if (username) {
      setInvalid(false);
      onSubmit(username);
    } else {
      setInvalid(true);
      input.current?.focus();
    }
  }

  function dismiss() {
    setInvalid(false);
    onDismiss();
  }

  return (
    <dialog
      ref={dialog}
      className="lookup-dialog"
      aria-labelledby="lookup-title"
      onCancel={(event) => {
        event.preventDefault();
        dismiss();
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) dismiss();
      }}
    >
      <div className="dialog-content">
        <button
          className="icon-button dialog-close"
          type="button"
          aria-label="Close dialog"
          onClick={dismiss}
        >
          <Icon name="close" />
        </button>
        <span className="dialog-emblem">
          <Icon name="sprout" width="27" height="27" />
        </span>
        <h2 id="lookup-title">Grow your garden</h2>
        <p className="dialog-intro">
          Enter a GitHub profile to turn its public repositories into plants.
        </p>
        <form onSubmit={submit} noValidate>
          <label htmlFor="profile">GitHub username or profile URL</label>
          <div className="input-wrap">
            <Icon name="github" width="19" height="19" />
            <input
              id="profile"
              ref={input}
              type="text"
              name="username"
              autoComplete="off"
              autoCapitalize="none"
              spellCheck={false}
              placeholder="octocat or github.com/octocat"
              aria-invalid={invalid || undefined}
              aria-describedby={
                invalid || lookup.status === 'error'
                  ? 'lookup-error'
                  : undefined
              }
              readOnly={busy}
              onChange={() => {
                setInvalid(false);
                onEdit();
              }}
            />
          </div>
          {invalid && (
            <p className="form-error" id="lookup-error" role="alert">
              Enter a valid GitHub username or a profile URL such as
              github.com/octocat.
            </p>
          )}
          {!invalid && lookup.status === 'error' && (
            <p className="form-error" id="lookup-error" role="alert">
              {lookup.message}
            </p>
          )}
          <button
            className="primary-button form-submit"
            type="submit"
            aria-disabled={busy}
          >
            <span>{busy ? 'Growing…' : 'Grow my garden'}</span>
            <Icon name="arrow" />
          </button>
          <span className="sr-only" role="status">
            {busy ? 'Loading public repositories from GitHub.' : ''}
          </span>
        </form>
      </div>
    </dialog>
  );
}
