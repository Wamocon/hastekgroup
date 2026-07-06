import type { CSSProperties } from "react";

/**
 * HeroDiamond — a self-contained server component (no "use client") rendering a
 * faceted cut-gem mark built from the brand's diamond geometry: the outer
 * rhombus plus internal crown facets radiating from the center to the vertices
 * and to the edge midpoints. Colour is driven entirely by the parent's gold
 * `currentColor` via gradient stop-opacity — no hardcoded hex, no red.
 */

// Brand rhombus geometry (viewBox 0 0 400 400).
const OUTER = { N: [200, 40], E: [340, 200], S: [200, 360], W: [60, 200] } as const;
// Girdle edge midpoints (crown facet anchors between the main points).
const EDGE = { NE: [270, 120], SE: [270, 280], SW: [130, 280], NW: [130, 120] } as const;
// Inner "table" rhombus (center-scaled), the flat top of the cut gem.
const TABLE = { N: [200, 136], E: [256, 200], S: [200, 264], W: [144, 200] } as const;
const CENTER = [200, 200] as const;

type Pt = readonly [number, number];
type Facet = { from: Pt; to: Pt; delay: number };

// Bezel / kite facets: table corners out to the main girdle points (along the axes).
const BEZEL: Facet[] = [
  { from: TABLE.N, to: OUTER.N, delay: 0.2 },
  { from: TABLE.E, to: OUTER.E, delay: 0.28 },
  { from: TABLE.S, to: OUTER.S, delay: 0.36 },
  { from: TABLE.W, to: OUTER.W, delay: 0.44 },
];

// Star / upper-girdle facets: table corners fanning to the neighbouring edge midpoints.
const STAR: Facet[] = [
  { from: TABLE.N, to: EDGE.NW, delay: 0.5 },
  { from: TABLE.N, to: EDGE.NE, delay: 0.56 },
  { from: TABLE.E, to: EDGE.NE, delay: 0.62 },
  { from: TABLE.E, to: EDGE.SE, delay: 0.68 },
  { from: TABLE.S, to: EDGE.SE, delay: 0.74 },
  { from: TABLE.S, to: EDGE.SW, delay: 0.8 },
  { from: TABLE.W, to: EDGE.SW, delay: 0.86 },
  { from: TABLE.W, to: EDGE.NW, delay: 0.92 },
];

// Pavilion reflections: faint lines from the center out to the edge midpoints.
const PAVILION: Facet[] = [
  { from: CENTER, to: EDGE.NW, delay: 1.0 },
  { from: CENTER, to: EDGE.NE, delay: 1.06 },
  { from: CENTER, to: EDGE.SE, delay: 1.12 },
  { from: CENTER, to: EDGE.SW, delay: 1.18 },
];

// Facet-vertex dots.
const NODES: { at: Pt; r: number; delay: number }[] = [
  { at: OUTER.N, r: 4, delay: 0.1 },
  { at: OUTER.E, r: 4, delay: 0.35 },
  { at: OUTER.S, r: 4, delay: 0.6 },
  { at: OUTER.W, r: 4, delay: 0.85 },
  { at: TABLE.N, r: 3, delay: 1.1 },
  { at: TABLE.E, r: 3, delay: 1.25 },
  { at: TABLE.S, r: 3, delay: 1.4 },
  { at: TABLE.W, r: 3, delay: 1.55 },
  { at: CENTER, r: 5, delay: 1.7 },
];

const rhombus = (p: typeof OUTER | typeof TABLE) =>
  `M${p.N[0]},${p.N[1]} L${p.E[0]},${p.E[1]} L${p.S[0]},${p.S[1]} L${p.W[0]},${p.W[1]} Z`;

const drawStyle = (length: number, delay: number): CSSProperties =>
  ({ "--facet-length": String(length), animationDelay: `${delay}s` } as CSSProperties);

export function HeroDiamond({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 400"
      aria-hidden="true"
      className={["overflow-visible", className].filter(Boolean).join(" ")}
    >
      <defs>
        {/* Metallic gold ramp — driven purely by the parent's currentColor. */}
        <linearGradient
          id="heroGoldGrad"
          gradientUnits="userSpaceOnUse"
          x1="60"
          y1="40"
          x2="340"
          y2="360"
        >
          <stop offset="0" stopColor="currentColor" stopOpacity="1" />
          <stop offset="0.5" stopColor="currentColor" stopOpacity="0.55" />
          <stop offset="1" stopColor="currentColor" stopOpacity="0.9" />
        </linearGradient>
        {/* Soft center glow. */}
        <radialGradient id="heroGoldGlow" gradientUnits="userSpaceOnUse" cx="200" cy="200" r="130">
          <stop offset="0" stopColor="currentColor" stopOpacity="0.28" />
          <stop offset="1" stopColor="currentColor" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Center glow behind the facets. */}
      <circle cx="200" cy="200" r="130" fill="url(#heroGoldGlow)" />

      {/* Main girdle outline. */}
      <path
        d={rhombus(OUTER)}
        fill="none"
        stroke="url(#heroGoldGrad)"
        strokeWidth="2.6"
        strokeLinejoin="round"
        className="facet-line"
        style={drawStyle(900, 0)}
      />
      {/* Inner table outline. */}
      <path
        d={rhombus(TABLE)}
        fill="none"
        stroke="url(#heroGoldGrad)"
        strokeWidth="1.8"
        strokeLinejoin="round"
        className="facet-line"
        style={drawStyle(360, 0.12)}
      />

      {/* Bezel / kite facets. */}
      {BEZEL.map((f, i) => (
        <line
          key={`bezel-${i}`}
          x1={f.from[0]}
          y1={f.from[1]}
          x2={f.to[0]}
          y2={f.to[1]}
          stroke="url(#heroGoldGrad)"
          strokeWidth="1.4"
          strokeLinecap="round"
          className="facet-line"
          style={drawStyle(140, f.delay)}
        />
      ))}

      {/* Star / upper-girdle facets. */}
      {STAR.map((f, i) => (
        <line
          key={`star-${i}`}
          x1={f.from[0]}
          y1={f.from[1]}
          x2={f.to[0]}
          y2={f.to[1]}
          stroke="url(#heroGoldGrad)"
          strokeWidth="1.1"
          strokeLinecap="round"
          className="facet-line"
          style={drawStyle(120, f.delay)}
        />
      ))}

      {/* Pavilion reflections — faintest inner facets. */}
      {PAVILION.map((f, i) => (
        <line
          key={`pav-${i}`}
          x1={f.from[0]}
          y1={f.from[1]}
          x2={f.to[0]}
          y2={f.to[1]}
          stroke="url(#heroGoldGrad)"
          strokeWidth="0.8"
          strokeLinecap="round"
          strokeOpacity="0.6"
          className="facet-line"
          style={drawStyle(130, f.delay)}
        />
      ))}

      {/* Facet-vertex nodes. */}
      {NODES.map((n, i) => (
        <circle
          key={`node-${i}`}
          cx={n.at[0]}
          cy={n.at[1]}
          r={n.r}
          fill="currentColor"
          className="facet-node"
          style={{ animationDelay: `${n.delay}s` }}
        />
      ))}
    </svg>
  );
}
