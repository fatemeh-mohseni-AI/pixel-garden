import { useId } from 'react';

function Cloud({ x, y, scale = 1 }: { x: number; y: number; scale?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <g className="cloud-art">
        <path fill="#c0e4de" d="M0 32h16V20h28V8h52v8h24v12h28v12h16v8H0Z" />
        <path fill="#fff6db" d="M0 28h16V16h28V4h52v8h24v12h28v12h16v8H0Z" />
        <path fill="#fffcef" d="M20 20h28V8h44v8H52v8H20z" />
        <path fill="#e8edd7" d="M8 36h144v8H8Z" />
      </g>
    </g>
  );
}

function Pine({
  x,
  y,
  scale = 1,
  dark = false,
}: {
  x: number;
  y: number;
  scale?: number;
  dark?: boolean;
}) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <path
        fill={dark ? '#527e61' : '#71a37b'}
        d="M-4 0h8v10h8v14h10v14h10v12h10v14H-42V50h10V38h10V24h10V10h8Z"
      />
      <path
        fill={dark ? '#66956d' : '#89b384'}
        d="M-4 8h8v14h8v16h12v12h10v7H-34v-7h12V36h10V20h8Z"
      />
      <path
        fill={dark ? '#416d58' : '#608f72'}
        d="M-42 57h32v-6h30v6h22v7H4v13h-8V64h-38Z"
      />
      <path
        fill="#a1c085"
        opacity=".55"
        d="M-7 26H1v8h-8zm-16 21h8v5h-8zm29-5h7v5H6z"
      />
    </g>
  );
}

function Broadleaf({
  x,
  y,
  scale = 1,
  flip = false,
}: {
  x: number;
  y: number;
  scale?: number;
  flip?: boolean;
}) {
  return (
    <g
      transform={`translate(${x} ${y}) scale(${flip ? -scale : scale} ${scale})`}
    >
      <path
        fill="#5e7851"
        d="M-8 74H8v16h14v-7h8v15H12v34h14v5h-53v-5h14V95h-16v-8h21Z"
      />
      <path fill="#81905b" d="M-7 81h7v49h-7z" />
      <path
        fill="#537d55"
        d="M-54 62h-10V38h12V25h15V12h20V3h42v8h20v12h12v14h11v26H54v13H38v11H12v-5h-28v5h-27V76h-11Z"
      />
      <path
        fill="#72a565"
        d="M-53 38h14V26h16V15h19V9h25v8h21v13h11v13h10v15H48v12H32v10H15V69h-36v10h-17V67h-13V55h-7V43h5Z"
      />
      <path
        fill="#8db56b"
        d="M-38 27h18V17h20V11h19v10h16v12h15v10H23v9H5v-9h-25v8h-19v-7h-9V34h10Z"
      />
      <path fill="#a9c681" d="M-19 24h14v5h-14zm23-8h10v4H4zm24 17h9v5h-9z" />
      <path fill="#608d58" d="M-47 58h15v7h-15zm27-3h18v5h-18zm42 4h23v6H22z" />
    </g>
  );
}

function Bush({ x, y, scale = 1 }: { x: number; y: number; scale?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <path fill="#709d56" d="M0 24h8V14h12V8h15v6h10V6h23v6h10v11h10v9H0Z" />
      <path fill="#91b860" d="M8 23h12V14h15v8h13V12h19v5h10v9H8Z" />
      <path fill="#aac86e" d="M24 17h8v4h-8zm30-2h10v4H54z" />
    </g>
  );
}

function MeadowDetails({ section }: { section: number }) {
  const tufts = Array.from({ length: 104 }, (_, i) => {
    const x = 5 + ((i * 137 + section * 89) % 1190);
    const y = 340 + ((i * 31 + section * 37) % 337);
    const pathTop = x < 565 ? 483 + x * 0.035 : 503 - (x - 565) * 0.033;
    if (y > pathTop - 6 && y < pathTop + 70) return null;
    return (
      <path
        key={i}
        transform={`translate(${x} ${y})`}
        fill={i % 3 === 0 ? '#c5d77b' : i % 3 === 1 ? '#769f54' : '#a6c65f'}
        opacity={i % 3 === 1 ? 0.73 : 0.9}
        d={i % 4 === 0 ? 'M0 2h4v4h4V0h3v6h4V3h3v6H0Z' : 'M0 3h4v3h4V0h3v8H0Z'}
      />
    );
  });

  const flowers = [
    [36, 435],
    [57, 445],
    [221, 412],
    [232, 422],
    [398, 469],
    [415, 458],
    [716, 422],
    [737, 408],
    [988, 452],
    [1006, 444],
    [1096, 579],
    [52, 602],
    [66, 618],
    [221, 640],
    [234, 628],
    [467, 592],
    [479, 605],
    [656, 649],
    [669, 631],
    [904, 607],
    [919, 616],
    [1054, 668],
    [1069, 655],
    [1152, 633],
    [1170, 644],
  ];

  return (
    <>
      {tufts}
      {flowers.map(([x, y], i) => (
        <g key={i} transform={`translate(${x} ${y})`}>
          <path fill="#64914d" d="M3 6h3v4h5v3H3Z" />
          <path
            fill={i % 4 === 0 ? '#eab169' : i % 4 === 2 ? '#e7a3a7' : '#f8ebbc'}
            d="M2 0h5v2h2v5H0V2h2Z"
          />
          <path fill="#e0a94c" d="M3 2h3v3H3Z" />
        </g>
      ))}
    </>
  );
}

function Stone({ x, y, scale = 1 }: { x: number; y: number; scale?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <path fill="#709853" d="M0 12h43v9H0Z" />
      <path fill="#929980" d="M4 7h6V3h9V0h15v4h7v10h-8v4H9v-3H4Z" />
      <path fill="#bfc3a0" d="M10 7h9V3h14v5h5v3H10Z" />
      <path fill="#7e896f" d="M12 12h22v-2h7v4h-8v4H9v-3h3Z" />
    </g>
  );
}

export function Landscape({ section }: { section: number }) {
  const sky = useId();
  const grass = useId();
  const path = useId();
  const offset = (section % 3) * 30;

  return (
    <svg
      className="landscape"
      viewBox="0 0 1200 700"
      preserveAspectRatio="none"
      shapeRendering="crispEdges"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id={sky} x2="0" y2="1">
          <stop stopColor="#97cadb" />
          <stop offset=".65" stopColor="#c4e3dc" />
          <stop offset="1" stopColor="#f6e9bc" />
        </linearGradient>
        <linearGradient id={grass} x2="0" y2="1">
          <stop stopColor="#a8c765" />
          <stop offset="1" stopColor="#88b35a" />
        </linearGradient>
        <linearGradient id={path} x2="0" y2="1">
          <stop stopColor="#e8c589" />
          <stop offset="1" stopColor="#f0d098" />
        </linearGradient>
      </defs>
      <path fill={`url(#${sky})`} d="M0 0h1200v380H0Z" />
      {section % 3 === 0 && (
        <g className="sun-position" transform="translate(938 95)">
          <g className="sun-art">
            <path
              fill="#f9e9b6"
              opacity=".46"
              d="M-27-64h54v10h24v15h14v20h8v38h-8v20H51v15H27v10h-54V54h-24V39h-14V19h-8v-38h8v-20h14v-15h24Z"
            />
            <path
              fill="#ffefb1"
              d="M-16-43h32v7h17v11h9v14h7v22h-7v14h-9v11H16v7h-32v-7h-17V25h-9V11h-7v-22h7v-14h9v-11h17Z"
            />
            <path
              fill="#fff5c9"
              d="M-16-38h30v6h16v9h9v13H28v-10H8v-6h-24v8h-14v13h-9v-18h9v-9h14Z"
            />
          </g>
        </g>
      )}
      <g className="clouds">
        <Cloud x={98 + offset} y={119} scale={1.22} />
        <Cloud x={418 + offset} y={53} scale={0.78} />
        <Cloud x={673 - offset} y={138} scale={1.12} />
        <Cloud x={1017 - offset} y={155} scale={0.68} />
        <Cloud x={327 - offset} y={199} scale={0.58} />
      </g>
      <path
        fill="#9ac2ab"
        d="M0 288h28v-15h39v-16h39v-15h56v-16h72v13h37v12h46v17h34v14h62v-14h50v-16h41v-17h51v-14h53v-13h78v13h42v16h45v17h42v12h30v15h62v-11h35v-16h45v-13h58v-13h61v15h49v17h32v19h40v80H0Z"
      />
      <path
        fill="#acd0af"
        d="M85 275h35v-15h52v-14h51v8h40v12h39v12h-71v-10h-74v9H85zm402-5h35v-13h42v-14h50v-15h65v12h43v14h34v13h-65v-11h-57v9h-59v11h-88zm444 4h48v-15h49v-13h58v12h38v13h35v12h-63v-10h-71v9h-94Z"
      />
      <path
        fill="#89b18a"
        d="M0 314h34v-8h38v-13h62v-13h81v14h62v8h65v-6h53v-10h66v-9h64v13h57v10h63v12h43v-7h57v-12h67v-9h82v10h60v14h59v-4h63v-12h61v-5h63v85H0Z"
      />
      <path
        fill="#80a978"
        d="M0 322h48v-8h53v-11h55v10h69v-9h50v12h66v9h79v-8h72v-12h52v9h81v11h77v-7h73v-13h75v9h67v11h78v-8h60v-8h53v12h92v55H0Z"
      />
      <Pine x={24} y={252} scale={1.02} dark />
      <Pine x={62} y={269} scale={0.69} />
      <Pine x={281 + offset} y={270} scale={0.81} />
      <Pine x={328 + offset} y={253} scale={1.02} dark />
      <Pine x={371 + offset} y={282} scale={0.65} />
      <Pine x={809 - offset} y={261} scale={0.95} />
      <Pine x={855 - offset} y={241} scale={1.24} dark />
      <Pine x={895 - offset} y={274} scale={0.8} />
      <Pine x={1163} y={259} scale={1.06} />
      <path
        fill="#a0bc62"
        d="M0 340h59v-9h65v7h73v-6h66v-9h80v8h61v9h74v-7h74v-8h72v8h63v7h65v-9h77v-7h73v7h84v10h73v-9h83v8h58v50H0Z"
      />
      <path
        fill={`url(#${grass})`}
        d="M0 367h59v-11h90v-8h56v10h82v-8h77v8h75v-11h81v-7h77v9h87v10h61v-11h72v-9h61v8h90v12h64v-11h97v8h71v11h12v333H0Z"
      />
      <path
        fill="#c1d47a"
        opacity=".7"
        d="M0 368h59v-10h90v-8h56v9h82v-7h77v8h75v-11h81v-7h77v9h87v10h61v-11h72v-9h61v8h90v12h64v-11h97v8h71v10h12v7h-86v-8h-61v-6h-79v11h-91v-11h-74v-8h-53v8h-78v10h-71v-11h-80v-10h-62v8h-79v11h-83v-8h-71v8h-91v-11h-42v9H75v10H0Z"
      />
      <Broadleaf x={110} y={215} scale={0.99} />
      <Broadleaf x={175} y={252} scale={0.69} flip />
      <Broadleaf x={1052} y={205} scale={1.15} flip />
      <Broadleaf x={1126} y={251} scale={0.72} />
      <g className="mobile-trees">
        <Broadleaf x={273} y={259} scale={0.68} />
        <Broadleaf x={921} y={252} scale={0.72} flip />
      </g>
      <Bush x={18} y={331} scale={1.25} />
      <Bush x={195 + offset} y={326} scale={0.85} />
      <Bush x={557 - offset} y={318} scale={1.05} />
      <Bush x={897 - offset} y={318} scale={1.17} />
      <Bush x={1108} y={343} scale={0.9} />

      <path
        fill="#8ab059"
        d="M0 451h48v-9h87v8h71v-11h98v8h69v11h94v11h98v20H454v-10h-89v-12h-79v-9h-76v9h-89v-8H0Zm733-36h85v-8h71v8h78v-7h69v-9h81v9h83v12h-92v-6h-68v10h-78v8h-77v-8h-71v6h-81Z"
      />
      <path
        fill="#81a953"
        d="M0 631h50v-14h84v9h74v15h114v-9h92v10h85v-13h59v-15h91v12h100v15h79v-8h75v10h87v-17h70v-9h89v10h51v73H0Z"
      />
      <path
        fill="#93b75e"
        d="M0 647h65v-13h59v9h81v15h117v-10h92v11h89v-13h61v-14h87v12h87v14h92v-8h68v9h96v-17h68v-9h87v9h51v58H0Z"
      />
      <path
        fill="#789e51"
        d="M0 483h69v-8h82v-7h114v9h80v13h95v9h100v9h117v-10h87v-13h102v-12h98v-6h81v9h96v7h79v67h-82v-10h-102v-7h-91v11h-79v11h-101v12h-92v9H542v-10H435v-11h-92v-11h-92v-9h-95v8H73v8H0Z"
      />
      <path
        fill={`url(#${path})`}
        d="M0 490h70v-8h83v-7h110v9h83v12h97v10h99v9h112v-10h89v-13h101v-12h101v-6h79v9h99v7h77v52h-82v-10h-99v-7h-93v11h-78v11H745v13h-93v8H542v-10H437v-11h-92v-11h-92v-8h-99v7H72v7H0Z"
      />
      <path
        fill="#f6d9a1"
        d="M0 497h71v-8h84v-7h107v9h82v13h95v10h101v9h117v-10h88v-13h100v-12h101v-6h78v8h101v7h75v6h-77v-6h-100v-8h-76v6H847v12h-99v13h-90v10H539v-9h-101v-10h-97v-13h-81v-9H156v7H74v8H0Z"
      />
      <path
        fill="#d6ad74"
        opacity=".7"
        d="M0 532h72v-7h81v-8h101v8h92v11h91v11h105v10h110v-8h91v-12h102v-12h81v-11h94v7h99v11h81v10h-82v-10h-99v-7h-93v11h-78v11H745v13h-93v8H542v-10H437v-11h-92v-11h-92v-8h-99v7H72v7H0Z"
      />
      <path
        fill="#cca878"
        opacity=".75"
        d="M32 518h17v4H32zm68-16h9v3h-9zm88 2h14v4h-14zm106 5h8v4h-8zm67 15h22v4h-22zm124 9h10v3h-10zm101 9h20v4h-20zm90-3h9v3h-9zm111-19h15v3h-15zm83-13h21v4h-21zm91-5h9v4h-9zm124 10h19v3h-19zm74 6h13v4h-13z"
      />
      <MeadowDetails section={section} />
      <Stone x={79} y={569} scale={0.72} />
      <Stone x={262} y={447} scale={0.8} />
      <Stone x={449} y={638} scale={0.65} />
      <Stone x={635} y={402} scale={0.63} />
      <Stone x={799} y={596} scale={0.85} />
      <Stone x={1011} y={626} scale={1.03} />
      <Stone x={1136} y={448} scale={0.57} />
      <Bush x={8} y={671} scale={1.15} />
      <Bush x={328} y={675} scale={0.96} />
      <Bush x={1017} y={672} scale={1.14} />
      <Bush x={1118} y={663} scale={1.13} />
    </svg>
  );
}
