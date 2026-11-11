export function NightMoon() {
  return (
    <svg
      className="night-moon night-scene"
      viewBox="0 0 128 128"
      shapeRendering="crispEdges"
      aria-hidden="true"
    >
      <path
        fill="#9c96e0"
        opacity=".17"
        d="M39 0h50v9h18v12h12v18h9v50h-9v18h-12v12H89v9H39v-9H21v-12H9V89H0V39h9V21h12V9h18Z"
      />
      <path
        fill="#b0a5ed"
        opacity=".23"
        d="M46 13h36v8h17v9h9v17h7v34h-7v17h-9v9H82v8H46v-8H29v-9h-9V81h-7V47h7V30h9v-9h17Z"
      />
      <path
        fill="#b7afe6"
        d="M49 22h31v8h16v9h8v16h5v23h-8v15h-9v8H76v7H49v-7H34v-9H24V77h-6V51h7V37h9v-9h15Z"
      />
      <path
        fill="#ede3c1"
        d="M49 22h22v8H59v10H49v15h-7v20h7v13h12v8h20v-4h13v-7h8v8h-9v8H76v7H49v-7H34v-9H24V77h-6V51h7V37h9v-9h15Z"
      />
      <path
        fill="#fff3d0"
        d="M31 39h9v-7h13v5h-8v8h-8v12h-8V47h2Zm-3 31h7v9h7v8h-8v-6h-6Zm44 28h9v5h-9Z"
      />
      <path
        fill="#7169a0"
        d="M83 33h9v6h-9zm11 26h7v9h-7zM64 55h11v5H64zm-7 13h7v6h-7Z"
      />
    </svg>
  );
}

export function NightStars({ offset }: { offset: number }) {
  return (
    <g className="night-scene night-stars" transform={`translate(${offset} 0)`}>
      <path
        fill="#aaa8e7"
        opacity=".74"
        d="M78 77h3v4h-3zm75 84h4v3h-4zm59-101h3v3h-3zm55 72h4v4h-4zm81-48h3v4h-3zm54 82h3v3h-3zm60-63h4v3h-4zm51-76h3v4h-3zm40 149h4v3h-4zm54-99h3v3h-3zm34 51h4v4h-4zm81-97h3v4h-3zm42 157h3v3h-3zm41-123h3v3h-3zm70 145h4v3h-4zm64-162h3v4h-3zm68 91h3v4h-3zm95-81h4v4h-4zM98 216h4v3h-4zm139-23h3v3h-3zm449 21h4v3h-4zm401-27h4v3h-4z"
      />
      <path
        fill="#efe3c1"
        d="M194 102h3v4h4v3h-4v4h-3v-4h-4v-3h4zm228-47h3v4h4v3h-4v4h-3v-4h-4v-3h4zm261 84h3v4h4v3h-4v4h-3v-4h-4v-3h4zm120-31h3v4h4v3h-4v4h-3v-4h-4v-3h4zm251-8h3v4h4v3h-4v4h-3v-4h-4v-3h4z"
      />
    </g>
  );
}

export function Fireflies({ offset }: { offset: number }) {
  return (
    <g
      className="night-scene night-fireflies"
      transform={`translate(${offset} 0)`}
    >
      <path
        fill="#b6e6a5"
        opacity=".18"
        d="M239 384h16v16h-16zm193 72h16v16h-16zm258-49h17v17h-17zm293 36h16v16h-16zM86 583h16v16H86zm413 31h16v16h-16zm399-31h16v16h-16z"
      />
      <path
        fill="#e6efb3"
        d="M245 390h4v4h-4zm193 72h4v4h-4zm258-49h5v5h-5zm293 36h4v4h-4zM92 589h4v4h-4zm413 31h4v4h-4zm399-31h4v4h-4z"
      />
    </g>
  );
}
