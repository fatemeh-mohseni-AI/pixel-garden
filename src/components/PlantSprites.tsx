import type { PlantStyle } from '../domain/garden';

const palettes = [
  { edge: '#69445b', shade: '#b4617e', body: '#e58fa4', light: '#ffd0cf' },
  { edge: '#484574', shade: '#6975b5', body: '#9eafe9', light: '#d7dcff' },
  { edge: '#764950', shade: '#c37962', body: '#eeaa70', light: '#ffe0a3' },
] as const;

function moonlit(color: string) {
  return `color-mix(in srgb, ${color}, #354b64 var(--plant-dusk, 0%))`;
}

function plantColors(index: number) {
  const colors = palettes[index] ?? palettes[0];
  return {
    edge: moonlit(colors.edge),
    shade: moonlit(colors.shade),
    body: moonlit(colors.body),
    light: moonlit(colors.light),
  };
}

function Sprout({ palette }: PlantStyle) {
  const { edge, shade, body, light } = plantColors(palette);
  return (
    <>
      <path
        fill={edge}
        d="M39 90V77H30v-5H20v-6h-5V55h12v4h10v7h5V56h7v10h5v-6h9v-5h12v11h-6v7H56v5h-7v12Z"
      />
      <path
        fill={body}
        d="M19 58h9v4h9v5h4v6H31v-5h-8v-4h-4Zm33 12h5v-7h8v-5h7v6h-6v6H54v4h-2Z"
      />
      <path fill={shade} d="M42 66h5v21h-5Z" />
      <path fill={edge} d="M34 42h7v-4h10v4h7v12h-6v5H39v-5h-5Z" />
      <path fill={light} d="M37 43h6v-3h7v4h5v9h-5v3h-9v-4h-4Z" />
      <path fill="#f8bc67" d="M43 46h7v6h-7Z" />
      <path fill="#fff1cf" d="M43 43h5v3h-5ZM24 61h4v3h-4Zm42 0h4v3h-4Z" />
    </>
  );
}

function Bush({ palette }: PlantStyle) {
  const { edge, shade, body, light } = plantColors(palette);
  return (
    <g transform="translate(0 -7.3) scale(1 1.08)">
      <path
        fill={edge}
        d="M8 69h5V57h8V47h12v-9h18v5h11v7h11v12h7v16h-6v8H63v5H25v-5H14v-6H8Z"
      />
      <path
        fill={shade}
        d="M12 70h5V59h8V50h11v-9h14v6h11v8h10v12h6v10h-7v7H60v4H28v-5H17v-6h-5Z"
      />
      <path
        fill={body}
        d="M19 64h8V53h12v-8h10v6h12v8h9v12h-9v6H48v-5h-8v7H28v-7h-9Z"
      />
      <path
        fill={light}
        d="M30 55h10v-7h8v5h-6v7H30Zm21 1h9v6h-9Zm-29 8h6v5h-6Z"
      />
      <path fill="#ffe4a3" d="M34 64h7v7h-7Zm22-1h8v7h-8Zm-8 12h6v7h-6Z" />
      <path fill="#fff4cc" d="M35 64h3v3h-3Zm22-1h3v3h-3Zm-8 12h3v3h-3Z" />
    </g>
  );
}

function FloweringBush({ palette }: PlantStyle) {
  const { edge, shade, body, light } = plantColors(palette);
  return (
    <>
      <path
        fill={edge}
        d="M5 71h6V59h10v-8h12v-6h13v6h12v-5h12v9h8v9h6v17h-9v7H60v4H27v-4H15v-7H5Z"
      />
      <path
        fill={shade}
        d="M9 72h7V62h8v-8h11v-6h9v7h16v-6h8v9h8v9h5v11h-8v7H58v4H29v-4H17v-7H9Z"
      />
      <path
        fill={body}
        d="M16 65h9v-8h11v-5h8v7h13v-4h12v8h7v8H65v6H54v-6H43v7H31v-5H20v-5h-4Z"
      />
      <path fill={light} d="M19 69h10v5H19Zm21 10h10v4H40Zm22-13h10v4H62Z" />
      <path fill={edge} d="M24 62V46h5v16Zm18 3V38h6v27Zm22 1V47h5v19Z" />
      <path
        fill={edge}
        d="M13 37h5v-6h14v5h6v13h-6v5H18v-5h-5Zm20-12h6v-7h15v7h7v14h-6v6H39v-6h-6Zm24 12h6v-6h12v6h6v13h-5v5H63v-5h-6Z"
      />
      <path
        fill={light}
        d="M16 38h5v-5h9v5h6v9h-6v5h-9v-5h-5Zm20-12h6v-6h10v6h6v10h-6v6H42v-6h-6Zm24 12h5v-5h9v6h5v9h-5v5h-9v-5h-5Z"
      />
      <path fill="#f4bc71" d="M22 39h8v8h-8Zm20-11h10v9H42Zm24 12h8v8h-8Z" />
      <path fill="#fff2bf" d="M22 39h4v4h-4Zm20-11h5v4h-5Zm24 12h4v4h-4Z" />
    </>
  );
}

function SpiralTrunk({ palette }: PlantStyle) {
  const { edge, shade, light } = plantColors(palette);
  return (
    <>
      <path
        fill={edge}
        d="M37 40h16v14h8v9h-5v8H45v10h6v7h13v6H26v-6h8v-8h-4V66h7V54h-5v-9h5Z"
      />
      <path
        fill={shade}
        d="M40 45h10v12h8v5h-5v6H42v13h5v8h11v3H30v-3h8v-9h-5V68h7V53h-5v-5h5Z"
      />
      <path
        fill={light}
        opacity=".8"
        d="M42 53h4v8h7v3H42Zm-5 16h4v8h-4Zm5 11h3v6h-3Z"
      />
    </>
  );
}

function Tree(style: PlantStyle) {
  const { edge, shade, body, light } = plantColors(style.palette);
  return (
    <>
      <SpiralTrunk {...style} />
      <path
        fill={edge}
        d="M4 35h6V25h10V14h13V8h18v6h13v7h12v8h8v17h-6v9H66v7H53v-5H40v8H24v-8H12v-9H4Z"
      />
      <path
        fill={shade}
        d="M7 36h6V27h10V16h13v-6h14v7h13v7h11v8h7v12h-6v8H63v7H54v-6H38v9H26v-8H15v-9H7Z"
      />
      <path
        fill={body}
        d="M13 29h11v-9h13v-7h12v7h13v7h11v7h7v8H68v7H53v-7H42v8H28v-7H15v-6h-2Z"
      />
      <path
        fill={light}
        d="M30 23h8v-7h12v6h-9v7H29Zm23 1h9v6h-9Zm-36 8h10v5H17Z"
      />
      <path
        fill={edge}
        opacity=".55"
        d="M14 46h12v6h12v-5h14v6h11v-6h11v6H64v6H53v-6H39v9H27v-7H15Z"
      />
      <path
        fill="#ffdb8a"
        d="M20 38h7v8h-7Zm22-8h8v9h-8Zm18 8h8v8h-8ZM31 51h6v7h-6Z"
      />
      <path fill="#fff1b3" d="M21 38h3v4h-3Zm22-8h3v4h-3Zm18 8h3v4h-3Z" />
    </>
  );
}

const starBloom = 'M-2-6h4v4h4v4H2v4h-4V2h-4v-4h4Z';

function RareTree(style: PlantStyle) {
  const { edge, shade, body, light } = plantColors(style.palette);
  return (
    <>
      <SpiralTrunk {...style} />
      <path
        fill={edge}
        d="M1 33h5V23h8V15h10V9h12V5h6V1h13v4h8v6h10v8h8v10h6v18h-5v10H70v7H58v7H45v-5H30v3H17v-8H9v-9H1Z"
      />
      <path
        fill={shade}
        d="M4 34h5V25h8v-8h11v-6h12V6h5V3h9v5h8v6h10v8h8v10h4v13h-5v9H68v7H56v7H46v-6H29v4H19v-8h-8v-9H4Z"
      />
      <path
        fill={body}
        d="M10 27h9v-8h11v-6h12V8h5V4h6v6h9v6h10v8h7v10h4v10H72v8H61v-5H50v9H36v-7H24v5H13v-8H7V34h3Z"
      />
      <path
        fill={light}
        d="M20 25h10v-7h13v-7h7V6h4v8h8v6h10v8H60v-6h-8v7H39v-6H30v8H19Z"
      />
      <path
        fill={edge}
        opacity=".62"
        d="M11 45h13v7h12v6h14v-7h12v5h11v-8h9v5H72v8H61v4H48v-3H30v4H19v-8h-8Z"
      />
      <path
        fill="#edb66c"
        d="M17 50h3v11h-3Zm13 8h3v11h-3Zm28-3h3v13h-3Zm16-6h3v11h-3Z"
      />
      <path
        fill="#ffdb8f"
        d="M15 59h7v8h-7Zm13 8h7v9h-7Zm28-1h7v9h-7Zm16-8h7v8h-7Z"
      />
      <path
        fill="#fff5ca"
        d="M16 59h3v4h-3Zm13 8h3v4h-3Zm28-1h3v4h-3Zm16-8h3v4h-3Z"
      />
      <g fill="#fff2ba">
        <path d={starBloom} transform="translate(20 34)" />
        <path d={starBloom} transform="translate(38 43) scale(1.16)" />
        <path d={starBloom} transform="translate(54 21)" />
        <path d={starBloom} transform="translate(67 40) scale(1.12)" />
      </g>
      <path
        fill="#d78b63"
        d="M18 32h4v4h-4Zm18 9h4v4h-4Zm16-22h4v4h-4Zm13 19h4v4h-4Z"
      />
    </>
  );
}

export const plantSprites = {
  sprout: Sprout,
  bush: Bush,
  flowering: FloweringBush,
  tree: Tree,
  rare: RareTree,
};
