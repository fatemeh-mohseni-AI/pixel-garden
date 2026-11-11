export function GardenCottage() {
  return (
    <g className="garden-cottage" transform="translate(718 349)">
      <g className="scene-prop-scale">
        <path fill="#859e58" d="M-68-4h13v-5h104v5h17v9H51v5H-60V5h-8Z" />
        <path fill="#84694c" d="M-52-58h102V0H-52Z" />
        <path fill="#e2bd87" d="M-48-58h94v54h-94Z" />
        <path fill="#edcf9e" d="M-45-52h56v42h-56Z" />
        <path
          fill="#c39a71"
          d="M13-53h30v43H13Zm-58 5h88v3h-88zM-45-17h88v3h-88z"
        />
        <path fill="#827764" d="M-50-9h99v9H-50Z" />
        <path
          fill="#b4a184"
          d="M-47-8h14v4h-14zm17 0h17v4h-17zm44 0h13v4H14zm16 0h15v4H30Z"
        />
        <path fill="#a4785d" d="M24-84h15v25H24Z" />
        <path fill="#c09d7b" d="M21-88h21v6H21Z" />
        <path
          fill="#915f52"
          d="M-61-56h7v-8h7v-8h9v-9h11v-8h13v-6h21v6h12v8h12v9h10v9h10v8h8v10H-61Z"
        />
        <path
          fill="#bf7862"
          d="M-58-55h9v-9h9v-8h12v-8h12v-8h9v-5H7v7h12v8h11v9h11v9h10v8h6v4H-58Z"
        />
        <path
          fill="#dd9a77"
          d="M-44-62h10v-8h12v-9h13v-9H3v6h-11v8h-12v8h-13v7h-11Zm29 4h18v-4h14v-4h14v5H18v4H3v4h-18Z"
        />
        <path
          fill="#899955"
          d="M-55-54h19v-5h12v4h13v6h-12v-3h-8v4h-24Zm78-26h7v8h9v7h-9v-5h-7Z"
        />
        <path
          fill="#88664b"
          d="M-13-32h6v-4H7v4h6V0h-26Zm-30-9h18v20h-18Zm69 0h14v17H26Z"
        />
        <path fill="#9f7750" d="M-9-30h5v-3h9v4h4v25H-9Z" />
        <path fill="#bf9263" d="M-6-28h3v23h-3zm10 0h3v23H4z" />
        <path fill="#f6da8a" d="M-39-37h10v12h-10Zm68-1h8v11h-8ZM3-16h3v4H3Z" />
        <path
          fill="#a27859"
          d="M-35-37h2v12h-2zm-4 5h10v2h-10zm71-6h2v11h-2z"
        />
        <path fill="#8c765e" d="M-16 0h33v4h6v4h-45V4h6Z" />
        <path fill="#cbac87" d="M-14 0h29v3h-29zm-5 4h39v2h-39Z" />
        <path
          fill="#548254"
          d="M-49-7h4v-7h4v-6h4v8h5v5H44v-8h5v-5h5v9h4v7h-9v-4H-35v4h-14Z"
        />
        <path fill="#e9a7a1" d="M-42-21h5v5h-5zm89 4h5v5h-5zm6-4h5v5h-5z" />
      </g>
      <path fill="#c9b58a" d="M-9 20h20v5H-9zm-6 15h17v5h-17zm3 18H4v4h-16z" />
    </g>
  );
}

export function GardenCat() {
  return (
    <g className="garden-cat" transform="translate(752 540)">
      <g className="scene-prop-scale">
        <path fill="#bc976e" opacity=".62" d="M-19 1h39v5h-39Z" />
        <path
          className="cat-tail"
          fill="#985f4e"
          d="M7-11h7v-5h4v-7h5v9h-4v6h-5v4H7Z"
        />
        <path
          fill="#985f4e"
          d="M-19-22h4v4h7v-4h4v8h5v3h12v4h4v8h-7v-3H1v3h-6v-5h-9v-3h-5Z"
        />
        <path
          fill="#dc9b6b"
          d="M-17-18h4v3h6v-3h2v7h6v2h10v4H0v3h-4v-4h-9v-3h-4Z"
        />
        <path fill="#f9d9ad" d="M-18-10h8v4h-5v-2h-3Zm12 4h6v3h-6Z" />
        <path fill="#4f493b" d="M-15-13h2v2h-2z" />
      </g>
    </g>
  );
}

function Bird({ x, y, scale = 1 }: { x: number; y: number; scale?: number }) {
  return (
    <g
      className="garden-bird"
      transform={`translate(${x} ${y}) scale(${scale})`}
    >
      <g className="scene-prop-scale">
        <g className="bird-flight">
          <path
            fill="#66817c"
            d="M-14-4h8v2h5v2h7v-2h4v-3h7v4h-4v3H8v4H-3V3h-5V1h-6Z"
          />
          <path fill="#8da79a" d="M-5 0h12v2H3v2h-6V2h-2Z" />
        </g>
      </g>
    </g>
  );
}

export function GardenBirds() {
  return (
    <>
      <Bird x={540} y={165} />
      <Bird x={588} y={145} scale={0.72} />
    </>
  );
}
