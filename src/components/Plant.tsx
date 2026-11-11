import type { PlantStyle } from '../domain/garden';

const blossom = [
  ['#f4cb69', '#d78e50', '#ffe5a2'],
  ['#eea0ac', '#bd668a', '#f9c6c1'],
  ['#f6a27a', '#cb7159', '#ffd2a0'],
] as const;

const spires = [
  ['#a591d7', '#7865ab', '#cfb9ee'],
  ['#f0a8bc', '#b36f9d', '#f9d0d7'],
  ['#79b8cc', '#5888b0', '#afdae4'],
] as const;

const fruit = ['#de897d', '#efc268', '#c597d1'] as const;

function Leaves() {
  return (
    <>
      <path
        fill="#427b4a"
        d="M37 84V41h7v14h6v-9h7v-7h16v13h-5v7h-8v6H44v19ZM11 54h13v5h8v6h6v11H23v-5h-8v-6h-4Z"
      />
      <path
        fill="#78ae54"
        d="M15 57h10v6h8v8H24v-5h-7Zm35-3h7v-7h13v6h-6v6H50Z"
      />
      <path fill="#a2c568" d="M17 58h7v4h-7zm43-11h8v3h-8z" />
    </>
  );
}

function Flower({ palette, mature }: PlantStyle) {
  const [petal, shade, light] = blossom[palette] ?? blossom[0];
  return (
    <>
      <Leaves />
      <path
        fill={shade}
        d="M30 8h21v6h10v8h7v20h-8v9H50v6H30v-6H20v-9h-8V22h8v-8h10Z"
      />
      <path
        fill={petal}
        d="M32 8h17v8h12v9h7v14H57v10H46v7H32v-8H21V38h-9V24h10v-9h10Z"
      />
      <path
        fill={light}
        d="M33 11h13v5H33zm-11 8h9v5h-9zm29 0h7v7h-7zm-34 8h6v7h-6zm34 13h6v7h-6z"
      />
      <path fill="#94583f" d="M32 22h16v5h6v12h-6v5H32v-5h-6V27h6Z" />
      <path fill="#ae6d42" d="M33 23h13v5h5v7h-6v5H32v-6h-4v-5h5Z" />
      <path fill="#f4b66b" d="M33 27h6v4h-6zm10 6h4v4h-4z" />
      {mature && (
        <path fill={light} d="M65 12h4v5h5v4h-5v5h-4v-5h-5v-4h5zM9 44h4v5H9z" />
      )}
    </>
  );
}

function Spire({ palette, mature }: PlantStyle) {
  const [petal, shade, light] = spires[palette] ?? spires[0];
  return (
    <>
      <Leaves />
      <path fill="#458051" d="M27 82h-5V34h5zm33 2h-5V42h5zM38 84h-5V18h6Z" />
      <path
        fill={shade}
        d="M15 40h6v-9h7v8h6v15h-6v5h-9v-7h-4Zm34 7h7v-9h6v7h7v15h-6v5h-9v-7h-5ZM31 17h6V7h8v7h6v9h5v23h-5v9H35v-7h-7V30h3Z"
      />
      <path
        fill={petal}
        d="M16 41h7v-9h5v9h5v9h-5v5h-9v-8h-3zm34 6h8v-8h5v8h5v9h-7v5h-7v-8h-4zM37 10h7v7h6v8h4v17h-6v8H36v-9h-6V30h6v-7h-4v-6h5Z"
      />
      <path
        fill={light}
        d="M38 16h6v5h-6zm5 11h7v5h-7zm-10 7h7v5h-7zm10 7h6v4h-6zM21 42h6v5h-6zm34 7h6v5h-6z"
      />
      {mature && (
        <path
          fill={light}
          d="M64 16h5v5h5v5h-5v5h-5v-5h-5v-5h5ZM14 21h5v5h-5Z"
        />
      )}
    </>
  );
}

function Tree({ palette, mature }: PlantStyle) {
  return (
    <>
      <path fill="#775539" d="M32 51h15v13h10v-5h8v11H48v14h10v4H22v-4h10Z" />
      <path fill="#ac8150" d="M35 58h6v27H28v-3h7z" />
      <path
        fill="#39734a"
        d="M9 42H4V26h7V17h10V9h14V4h19v5h13v8h10v11h6v16h-7v11H64v7H50v-5H32v6H19v-8H9Z"
      />
      <path
        fill="#5c9b52"
        d="M8 27h8V18h12V9h13V6h11v7h15v8h9v9h5v11h-9v10H60v7H49v-8H32v7H21v-8H12v-9H8Z"
      />
      <path
        fill="#82b45b"
        d="M18 23h11V14h14v-4h8v7h15v7h7v9H55v7H42v-8H25v8H13v-9h5Z"
      />
      <path
        fill="#aacb75"
        d="M23 23h10v-6h9v4h-7v7H23zm27-8h8v4h-8zm12 12h9v5h-9z"
      />
      {mature && (
        <path
          fill={fruit[palette] ?? fruit[0]}
          d="M23 34h7v7h-7zm28-8h7v7h-7zm12 15h7v7h-7zM39 46h6v6h-6z"
        />
      )}
    </>
  );
}

function Shrub({ palette, mature }: PlantStyle) {
  const color = fruit[palette] ?? fruit[0];
  return (
    <>
      <path
        fill="#3b7445"
        d="M1 69h5V57h9V46h10v5h6V37h9v-7h16v9h9v11h10v9h7v18h-8v8H13v-6H1Z"
      />
      <path
        fill="#5c9a50"
        d="M8 58h12v-8h6v10h8V43h9v-9h12v7h9v12h10v10h5v11H66v8H52v-6H34v6H16v-8H6V64h2Z"
      />
      <path
        fill="#85b85e"
        d="M12 58h10v-5h4v9h10V46h10v-9h8v7h9v11h8v9H58v-7H43v7H28v7H14v-5h-5v-4h3Z"
      />
      <path fill="#a4c873" d="M46 45h10v4H46zm-7 8h8v4h-8zm-23 8h9v4h-9z" />
      <path fill={color} d="M43 56h6v7h-6zM21 65h7v7h-7zm39-2h7v7h-7z" />
      {mature && (
        <path fill={color} d="M51 43h6v6h-6zM12 70h5v5h-5zm43 4h6v6h-6z" />
      )}
    </>
  );
}

function Cactus({ palette, mature }: PlantStyle) {
  return (
    <>
      <path
        fill="#367a61"
        d="M29 86V67H15v-7H9V41h5v-8h11v8h5v11h3V22h7v-8h17v7h8v35h5V44h11v7h5v17h-8v7H64v11Z"
      />
      <path
        fill="#61a97c"
        d="M37 23h6v-6h12v7h7v37h8v-9h4v-5h6v7h4v12h-8v6H62v11H33V63H16v-7h-4V44h4v-8h8v7h3v13h10Z"
      />
      <path fill="#8ec58a" d="M43 24h6v52h-6zm-25 21h5v11h-5zm54 15h6v5h-6z" />
      <path
        fill="#e0e3a9"
        d="M42 37h4v4h-4zm12 18h4v4h-4zm-3-26h4v4h-4zM19 47h3v3h-3zm57 12h4v4h-4z"
      />
      {mature && (
        <path
          fill={fruit[palette] ?? fruit[0]}
          d="M44 3h7v5h6v6h-5v5h-9v-5h-5V8h6Z"
        />
      )}
    </>
  );
}

function Sprout({ mature }: PlantStyle) {
  return (
    <>
      <path
        fill="#427b4a"
        d="M39 85V61H27v-6h-8v-7h-6V34h13v4h10v7h7v10h4V38h6V28h9v-8h19v13h-5v10h-6v8H57v9H47v25Z"
      />
      <path
        fill="#84b761"
        d="M17 37h9v5h9v7h6v8H29v-6h-9v-7h-3Zm34 0h6v-7h9v-7h12v9h-6v9h-6v7H54v7h-3Z"
      />
      <path fill="#acd079" d="M22 41h5v4h-5zm37-7h6v5h-6zm8-7h7v4h-7z" />
      {mature && <path fill="#f5d680" d="M44 19h5v6h-5zM24 24h5v5h-5Z" />}
    </>
  );
}

const sprites = {
  flower: Flower,
  spire: Spire,
  tree: Tree,
  shrub: Shrub,
  cactus: Cactus,
  sprout: Sprout,
};

export function Plant({ style }: { style: PlantStyle }) {
  const Sprite = sprites[style.family];
  const transform = style.flipped ? 'translate(88 0) scale(-1 1)' : undefined;
  return (
    <svg
      viewBox="0 0 88 96"
      shapeRendering="crispEdges"
      aria-hidden="true"
      focusable="false"
    >
      <path
        fill="#74994e"
        opacity=".7"
        d="M13 84h10v-4h42v4h10v7H64v4H24v-4H13Z"
      />
      <path fill="#9ebc61" d="M16 86h11v-3h34v3h11v4H62v2H26v-2H16Z" />
      <g
        className={
          style.mature ? 'sprite sprite--mature' : 'sprite sprite--young'
        }
      >
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
