import type { SVGProps } from 'react';

type IconName =
  | 'sprout'
  | 'arrow'
  | 'back'
  | 'close'
  | 'external'
  | 'star'
  | 'pointer'
  | 'github'
  | 'sun'
  | 'moon'
  | 'water';

const paths: Record<IconName, string> = {
  sprout:
    'M12 20v-8m0 1C8 13 4 11 4 6c4 0 7 1 8 5m0 2c0-6 3-9 8-9 0 5-3 8-8 8M8 20h8',
  arrow: 'M4 12h15m-6-6 6 6-6 6',
  back: 'M20 12H5m6-6-6 6 6 6',
  close: 'm6 6 12 12M18 6 6 18',
  external: 'M13 5h6v6m0-6-9 9m6-1v5H6V8h5',
  star: 'm12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-2.9-5.6 2.9 1.1-6.2L3 9.6l6.2-.9L12 3Z',
  pointer: 'm6 4 13 8-6 1-2 6-5-15Z',
  sun: 'M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.4 1.4m11.2 11.2L19 19m0-14-1.4 1.4M6.4 17.6 5 19m12-7a5 5 0 1 1-10 0 5 5 0 0 1 10 0Z',
  moon: 'M21 13.1A9 9 0 0 1 10.9 3 9 9 0 1 0 21 13.1Z',
  water:
    'M12 3c-1.7 3.3-6 7.2-6 12a6 6 0 0 0 12 0c0-4.8-4.3-8.7-6-12Zm-3 12a3 3 0 0 0 3 3',
  github:
    'M8 18c-4 1-4-2-6-2m12 4v-3.5a3 3 0 0 0-.8-2.3c2.7-.3 5.6-1.3 5.6-6A4.8 4.8 0 0 0 17.5 5c.2-.5.4-1.5-.1-3 0 0-1 0-3.4 1.3a12 12 0 0 0-6 0C5.7 2 4.6 2 4.6 2c-.5 1.5-.3 2.5-.1 3A4.8 4.8 0 0 0 3.2 8.2c0 4.7 2.9 5.7 5.6 6A3 3 0 0 0 8 16.5V20',
};

export function Icon({
  name,
  ...props
}: SVGProps<SVGSVGElement> & { name: IconName }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="20"
      height="20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d={paths[name]} />
    </svg>
  );
}
