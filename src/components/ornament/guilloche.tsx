// Server component — no "use client". Pure deterministic geometry, rendered inline.
// Draws an elegant Turkish / private-banking guilloche rosette using only hairline
// strokes in currentColor, so the parent fully controls color and opacity.

const C = 300; // center (viewBox 0 0 600 600)
const TAU = Math.PI * 2;

// A braided "guilloche" ring: r(t) = base + amp * sin(freq * t + phase).
// Two phase-shifted copies per band interlace into the classic woven band.
function waveRing(base: number, amp: number, freq: number, phase: number) {
  const steps = 240;
  let d = "";
  for (let i = 0; i <= steps; i++) {
    const t = (i / steps) * TAU;
    const rr = base + amp * Math.sin(freq * t + phase);
    const x = C + Math.cos(t) * rr;
    const y = C + Math.sin(t) * rr;
    d += (i === 0 ? "M" : "L") + x.toFixed(2) + " " + y.toFixed(2) + " ";
  }
  return d.trim() + " Z";
}

// A closed star-polygon {n/step}: connect every step-th vertex on a circle.
function starPath(n: number, step: number, radius: number) {
  let d = "";
  let idx = 0;
  for (let k = 0; k <= n; k++) {
    const a = (idx / n) * TAU - Math.PI / 2;
    const x = C + Math.cos(a) * radius;
    const y = C + Math.sin(a) * radius;
    d += (k === 0 ? "M" : "L") + x.toFixed(2) + " " + y.toFixed(2) + " ";
    idx = (idx + step) % n;
  }
  return d.trim() + " Z";
}

// A hypotrochoid (spirograph) curve — the delicate lace at the core.
function spiroPath(R: number, r: number, dd: number, scale: number) {
  const steps = 720;
  let d = "";
  for (let i = 0; i <= steps; i++) {
    const t = (i / steps) * TAU * (r / gcd(R, r));
    const k = R - r;
    const x = C + (k * Math.cos(t) + dd * Math.cos((k / r) * t)) * scale;
    const y = C + (k * Math.sin(t) - dd * Math.sin((k / r) * t)) * scale;
    d += (i === 0 ? "M" : "L") + x.toFixed(2) + " " + y.toFixed(2) + " ";
  }
  return d.trim();
}

function gcd(a: number, b: number): number {
  return b === 0 ? a : gcd(b, a % b);
}

// Concentric hairline frame rings.
const rings = [294, 288, 210, 204, 78, 72, 18];

// Overlapping-circle rosette (petals whose radius equals their orbit radius).
const petalCount = 30;
const petals = Array.from({ length: petalCount }, (_, i) => {
  const a = (i / petalCount) * TAU;
  return { cx: C + Math.cos(a) * 108, cy: C + Math.sin(a) * 108, r: 108 };
});

// Braided guilloche bands: each band = two interlaced phase-shifted wave rings.
const bands = [
  { base: 250, amp: 12, freq: 24 },
  { base: 165, amp: 10, freq: 18 },
  { base: 120, amp: 8, freq: 15 },
];
const braids = bands.flatMap((b) => [
  waveRing(b.base, b.amp, b.freq, 0),
  waveRing(b.base, b.amp, b.freq, Math.PI),
]);

// Rotationally repeated star polygons for the crisp interlaced star field.
const stars = [
  starPath(31, 12, 258),
  starPath(29, 13, 198),
  starPath(23, 9, 138),
  starPath(17, 7, 96),
];

// Spirograph lace at the very center.
const spiros = [
  spiroPath(11, 4, 3, 8.5),
  spiroPath(13, 5, 4, 6.2),
];

// A subtle ring of small tangent circles for filigree density.
const filigreeCount = 36;
const filigree = Array.from({ length: filigreeCount }, (_, i) => {
  const a = (i / filigreeCount) * TAU;
  return { cx: C + Math.cos(a) * 231, cy: C + Math.sin(a) * 231, r: 14 };
});

export function Guilloche({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 600 600"
      className={"h-full w-full " + (className ?? "")}
      fill="none"
      stroke="currentColor"
      strokeLinejoin="round"
      strokeLinecap="round"
    >
      {rings.map((r, i) => (
        <circle key={"ring-" + i} cx={C} cy={C} r={r} strokeWidth={0.75} />
      ))}

      {filigree.map((f, i) => (
        <circle
          key={"fil-" + i}
          cx={f.cx.toFixed(2)}
          cy={f.cy.toFixed(2)}
          r={f.r}
          strokeWidth={0.5}
        />
      ))}

      {petals.map((p, i) => (
        <circle
          key={"petal-" + i}
          cx={p.cx.toFixed(2)}
          cy={p.cy.toFixed(2)}
          r={p.r}
          strokeWidth={0.5}
        />
      ))}

      {braids.map((d, i) => (
        <path key={"braid-" + i} d={d} strokeWidth={0.6} />
      ))}

      {stars.map((d, i) => (
        <path key={"star-" + i} d={d} strokeWidth={0.6} />
      ))}

      {spiros.map((d, i) => (
        <path key={"spiro-" + i} d={d} strokeWidth={0.5} />
      ))}
    </svg>
  );
}
