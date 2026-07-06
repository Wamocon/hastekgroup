/**
 * Renders the shared #goldFoil SVG gradient once per document so any
 * illustration can stroke/fill with url(#goldFoil) and inherit the metallic
 * ramp. Zero-height, aria-hidden, does not affect layout.
 */
export function GoldDefs() {
  return (
    <svg width="0" height="0" aria-hidden="true" style={{ position: "absolute" }}>
      <defs>
        <linearGradient id="goldFoil" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#7a5a1e" />
          <stop offset="0.18" stopColor="#c9a54d" />
          <stop offset="0.4" stopColor="#f6e7b4" />
          <stop offset="0.5" stopColor="#fff8e1" />
          <stop offset="0.6" stopColor="#f6e7b4" />
          <stop offset="0.82" stopColor="#c9a54d" />
          <stop offset="1" stopColor="#7a5a1e" />
        </linearGradient>
      </defs>
    </svg>
  );
}
