import { useEffect, useRef, useState } from 'react';

export function useReaction<T>(duration: number) {
  const [reaction, setReaction] = useState<{
    value: T;
    revision: number;
  } | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const revision = useRef(0);

  useEffect(() => () => clearTimeout(timer.current), []);

  function react(value: T) {
    clearTimeout(timer.current);
    setReaction({ value, revision: ++revision.current });
    timer.current = setTimeout(() => setReaction(null), duration);
  }

  return [reaction, react] as const;
}
