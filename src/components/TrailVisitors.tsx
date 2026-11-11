import { useEffect, useState } from 'react';

const visitors = ['pup', 'fox'] as const;
const walkDuration = 4400;

type Visitor = (typeof visitors)[number];

function Critter({ visitor }: { visitor: Visitor }) {
  const fox = visitor === 'fox';
  const outline = fox ? '#844b48' : '#795e50';
  const shade = fox ? '#ad674d' : '#ae8b67';
  const coat = fox ? '#d98e58' : '#eac593';
  const cream = fox ? '#ffd9a8' : '#fff0d0';

  return (
    <svg viewBox="0 0 53 31" shapeRendering="crispEdges" focusable="false">
      <path fill="#785e54" opacity=".24" d="M4 27h45v3H4Z" />
      <g transform={fox ? 'translate(53 0) scale(-1 1)' : undefined}>
        <g className="trail-tail">
          <path
            fill={outline}
            d={
              fox
                ? 'M16 16h-4v-4H8V8H1v9h4v4h6v3h8Z'
                : 'M16 15h-4v-4H8V7H4v9h4v4h8Z'
            }
          />
          <path
            fill={coat}
            d={
              fox ? 'M3 10h4v3h6v4h5v5h-6v-3H6v-4H3Z' : 'M6 9h3v5h4v4h-4v-3H6Z'
            }
          />
          {fox && <path fill={cream} d="M3 10h4v4H3Z" />}
        </g>
        <path
          fill={outline}
          d="M13 14h13v-2h7V7h4V4h8v5h4v6h3v6h-8v3H34v1H16v-3h-3Z"
        />
        <path
          fill={coat}
          d="M16 16h11v-2h8V9h4V6h5v5h4v6h2v2h-7v3H32v1H18v-3h-2Z"
        />
        <path fill={cream} d="M34 19h9v-2h6v2h-6v3h-8Zm-14 0h9v2h-9Z" />
        {fox ? (
          <>
            <path fill={outline} d="M34 11V3h4v3h4v4Zm8-2V1h4v4h3v6Z" />
            <path fill="#efab7e" d="M36 5h2v3h-2Zm8-2h2v4h-2Z" />
          </>
        ) : (
          <>
            <path fill="#a16d55" d="M35 5h6v4h-2v8h-5v-5h-2V8h3Z" />
            <path fill="#b48465" d="M36 7h3v4h-2v4h-2v-5h1Z" />
          </>
        )}
        <path fill="#483b43" d="M44 11h2v2h-2Zm5 5h3v2h-3Z" />
        <path
          className="trail-paws"
          fill={outline}
          d="M17 22h4v4h4v3h-7Zm17 0h4v3h4v3h-8Z"
        />
        <path
          className="trail-paws trail-paws-far"
          fill={shade}
          d="M23 22h4v5h4v2h-8Zm15-1h4v4h3v2h-7Z"
        />
      </g>
    </svg>
  );
}

export function TrailVisitors() {
  const [visitor, setVisitor] = useState<Visitor | null>(null);

  useEffect(() => {
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let timer: number;

    function schedule(index: number, delay: number) {
      timer = window.setTimeout(() => {
        if (!document.hidden) setVisitor(visitors[index]!);
        timer = window.setTimeout(() => {
          setVisitor(null);
          const next = (index + 1) % visitors.length;
          schedule(next, next === 1 ? 5100 : 20000);
        }, walkDuration);
      }, delay);
    }

    function updateMotion() {
      window.clearTimeout(timer);
      setVisitor(null);
      if (!motion.matches) schedule(0, 2600);
    }

    if (!motion.matches) schedule(0, 2600);
    motion.addEventListener('change', updateMotion);
    return () => {
      window.clearTimeout(timer);
      motion.removeEventListener('change', updateMotion);
    };
  }, []);

  if (!visitor) return null;

  return (
    <div
      className={`trail-visitor trail-visitor--${visitor}`}
      data-trail-visitor={visitor}
      aria-hidden="true"
      style={{ animationDuration: `${walkDuration}ms` }}
    >
      <Critter visitor={visitor} />
    </div>
  );
}
