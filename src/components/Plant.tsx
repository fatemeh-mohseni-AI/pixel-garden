import type { PlantStyle } from '../domain/garden';

const foliage = [
  ['#3f7048', '#659a4d', '#87b653', '#b1cd6b'],
  ['#306948', '#488e59', '#71ac66', '#a3c77b'],
  ['#466e48', '#639054', '#84ad62', '#a7c476'],
] as const;

const petals = [
  ['#ba694f', '#eea579', '#ffda9b'],
  ['#786b9c', '#a99ad1', '#e0c9ef'],
  ['#a2637e', '#de90aa', '#ffd1d2'],
] as const;

function Sprout({ palette }: PlantStyle) {
  const [dark, , green, light] = foliage[palette] ?? foliage[0];
  return (
    <>
      <path
        fill={dark}
        d="M42 89V80h-7v-4h-6v-9h9v3h6v5h4v-5h4v-5h9v8h-3v5h-6v4h-5v7Z"
      />
      <path fill={green} d="M32 69h6v3h5v5h-6v-3h-5Zm18 3h4v-5h5v5h-3v4h-6Z" />
      <path fill={light} d="M33 70h4v2h-4zm21-1h3v2h-3z" />
    </>
  );
}

function Bush({ palette, stage }: PlantStyle) {
  const [dark, green, leaf, light] = foliage[palette] ?? foliage[0];
  const [outline, flower, shine] = petals[palette] ?? petals[0];
  const flowering = stage === 'flowering';
  return (
    <>
      <g transform={flowering ? undefined : 'translate(9 18) scale(.8)'}>
        <path
          fill={dark}
          d="M10 77h5v-8h7v-9h11v-7h10v-7h15v6h8v8h9v9h7v14h-6v6H20v-4H10Z"
        />
        <path
          fill={green}
          d="M14 77h5v-7h8v-8h9v-7h10v-7h10v7h9v8h9v9h5v10H67v5H48v-4H35v4H23v-5h-9Z"
        />
        <path
          fill={leaf}
          d="M21 72h9v-9h11v-8h8v-4h7v7h7v6h8v9H60v-4H48v8H36v-7h-7v6h-8Z"
        />
        <path fill={light} d="M45 57h7v4h-7zm-9 8h7v4h-7zm21 8h8v3h-8z" />
      </g>
      {flowering && (
        <>
          <path fill={dark} d="M29 71V53h3v18Zm24-6V44h4v21Zm13 10V57h3v18Z" />
          <path
            fill={outline}
            d="M27 45h8v3h4v9h-4v3h-8v-3h-4v-9h4Zm24-11h9v4h5v9h-4v4H50v-4h-4v-9h5Zm14 18h7v3h4v7h-4v3h-8v-3h-3v-7h4Z"
          />
          <path
            fill={flower}
            d="M28 45h6v4h4v6h-5v3h-5v-3h-4v-6h4Zm24-11h7v5h5v6h-5v4h-7v-4h-5v-6h5Zm13 18h6v4h4v5h-4v2h-6v-2h-3v-5h3Z"
          />
          <path fill={shine} d="M29 50h4v4h-4zm24-10h5v5h-5zm13 16h4v4h-4z" />
        </>
      )}
    </>
  );
}

function Trunk({ rare = false }: { rare?: boolean }) {
  return (
    <>
      <path
        fill={rare ? '#76505e' : '#75583d'}
        d="M40 49h12v13h10v-6h7v9h-8v6H52v13h8v5H29v-4h9V72h-7v-6h-9v-8h8v5h10Z"
      />
      <path
        fill={rare ? '#ac7577' : '#ae8251'}
        d="M42 53h5v29h-5v5h-8v-3h5V70h-5v-4h8Zm9 12h9v-4h5v4h-5v4h-9Z"
      />
    </>
  );
}

function Tree({ palette }: PlantStyle) {
  const [dark, green, leaf, light] = foliage[palette] ?? foliage[0];
  return (
    <>
      <Trunk />
      <path
        fill={dark}
        d="M7 44v-9h8V24h9v-9h12V9h17v7h12v8h10v11h7v17h-6v8H64v6H49v-5H36v6H22v-6H11v-8H6v-9Z"
      />
      <path
        fill={green}
        d="M10 37h8V26h10v-9h12v-6h11v8h12v8h10v11h7v13h-8v7H62v6H51v-6H33v6H24v-7H13v-8h-3Z"
      />
      <path
        fill={leaf}
        d="M20 30h9V20h12v-7h9v8h12v10h9v10H56v-7H45v8H33v-5H19Z"
      />
      <path
        fill={light}
        d="M34 22h7v-6h8v4h-6v7h-9zm20 1h6v4h-6zm-30 9h8v4h-8z"
      />
      <path
        fill={dark}
        opacity=".62"
        d="M12 49h13v4h11v-5h15v4h15v-7h12v7h-10v5H51v-4H35v6H24v-5H12Z"
      />
      <path fill="#d7ae64" d="M27 43h5v6h-5zm28-4h6v6h-6zm9 9h5v5h-5z" />
    </>
  );
}

const rareCrowns = [
  ['#82555e', '#c97c82', '#eb9c98', '#ffc5a8', '#ffe5b5'],
  ['#66547e', '#a186b8', '#bb9dcd', '#e2bae0', '#ffe3be'],
  ['#8d5b55', '#cb8b6a', '#e8ab78', '#ffce93', '#ffedbd'],
] as const;

function RareTree({ palette }: PlantStyle) {
  const [edge, shade, petal, light, glint] =
    rareCrowns[palette] ?? rareCrowns[0];
  return (
    <>
      <Trunk rare />
      <path
        fill={edge}
        d="M4 44V31h6v-9h8v-8h11V8h13V3h17v6h12v9h8v10h6v18h-5v10H69v7H57v-5H45v8H30v-6H16v-7H8v-9Z"
      />
      <path
        fill={shade}
        d="M7 33h6V24h8v-8h11V10h13V5h12v7h12v9h8v9h6v14h-7v9H66v7h-8v-6H43v9H31v-6H18v-7H10v-9H7Z"
      />
      <path
        fill={petal}
        d="M14 28h11v-9h11v-7h11V6h10v7h11v9h8v10h6v10H71v8H58v-6H46v9H30v-7H19v-6H11v-8h3Z"
      />
      <path
        fill={light}
        d="M27 21h10v-7h11V8h8v7h11v7h7v8H63v-5H51v8H40v-6H29v6H17v-6h10Z"
      />
      <path
        fill={shade}
        opacity=".73"
        d="M10 41h10v6h13v7h13v-7h13v4h14v-8h9v5h-7v6H58v-4H47v8H32v-6H19v-6h-9Z"
      />
      <path
        fill={glint}
        d="M46 13h7v5h-7zm-12 7h6v4h-6zm24 9h5v5h-5zm-35 7h5v5h-5zm26 2h5v5h-5zm20-3h5v4h-5zm-37 11h5v5h-5zM12 62h3v5h-3zm62-1h4v3h-4zm-9 8h3v4h-3Z"
      />
    </>
  );
}

const sprites = {
  sprout: Sprout,
  bush: Bush,
  flowering: Bush,
  tree: Tree,
  rare: RareTree,
};

export function Plant({ style }: { style: PlantStyle }) {
  const Sprite = sprites[style.stage];
  const transform = style.flipped ? 'translate(88 0) scale(-1 1)' : undefined;
  return (
    <svg
      viewBox="0 0 88 96"
      data-plant-stage={style.stage}
      shapeRendering="crispEdges"
      aria-hidden="true"
      focusable="false"
    >
      <path
        fill="#608747"
        opacity=".48"
        d="M14 88h10v-3h41v3h10v5H64v3H24v-3H14Z"
      />
      <path fill="#acc86d" opacity=".68" d="M23 89h12v-2h20v2h12v4H23Z" />
      <g className="sprite">
        <g transform={transform}>
          <Sprite {...style} />
        </g>
      </g>
      {style.fresh && (
        <path fill="#f6dd89" d="M73 75h3v3h3v3h-3v3h-3v-3h-3v-3h3Z" />
      )}
    </svg>
  );
}
