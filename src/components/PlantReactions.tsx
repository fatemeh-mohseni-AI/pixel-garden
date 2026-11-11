export type PlantReaction = 'water' | 'celebrate';

const cross = 'M-1.5-5h3v3.5H5v3H1.5V5h-3V1.5H-5v-3h3.5Z';

export function PlantReactions({
  kind,
  crown,
}: {
  kind: PlantReaction;
  crown: number;
}) {
  if (kind === 'celebrate') {
    return (
      <g
        className="plant-effect legendary-celebration"
        data-plant-effect="celebrate"
      >
        <g
          className="magic-sparks"
          fill="#ffe79a"
          stroke="#a67b5b"
          strokeWidth=".6"
        >
          <path d={cross} transform="translate(8 17)" />
          <path d={cross} transform="translate(79 10) scale(.92)" />
          <path d={cross} transform="translate(84 56) scale(.74)" />
          <path d={cross} transform="translate(12 65) scale(.65)" />
        </g>
      </g>
    );
  }

  return (
    <g className="plant-effect watering-effect" data-plant-effect="water">
      <g transform={`translate(62 ${Math.max(11, crown - 9)})`}>
        <g className="watering-can">
          <path
            fill="#3b6883"
            d="M-3 1h7v3h3v-7h16v5h5v5h-4v9H8v-3H4V9H0V6h-3ZM23 3h3v4h-3Z"
          />
          <path fill="#81c3da" d="M9 0h12v13H9Zm-9 3h3v4H0zm4 4h3v4H4Z" />
          <path fill="#c4e9ed" d="M11 2h7v3h-7zM9 10h3v2H9Z" />
          <path fill="#e8c784" d="M19 11h3v2h-3Z" />
        </g>
        <g fill="#a1e9f8" stroke="#3e7c99" strokeWidth=".55">
          <path className="water-drop" d="M-3 9h3v5h-3Z" />
          <path className="water-drop" d="M-9 14h3v6h-3Z" />
          <path className="water-drop" d="M-15 17h3v6h-3Z" />
          <path className="water-drop" d="M-22 21h3v5h-3Z" />
        </g>
      </g>
      <g
        className="water-bloom"
        fill="#fff1a8"
        stroke="#ad9164"
        strokeWidth=".55"
      >
        <path d={cross} transform={`translate(21 ${crown + 6}) scale(.82)`} />
        <path d={cross} transform={`translate(47 ${crown + 19})`} />
        <path d={cross} transform={`translate(69 ${crown + 26}) scale(.72)`} />
      </g>
    </g>
  );
}
