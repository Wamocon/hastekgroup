/**
 * Seljuk 10-point girih star (decagram) with an inner concentric decagon for
 * the interlace read. Hairline strokes in currentColor so the parent controls
 * colour/opacity. Used as an eyebrow marker, AIDASLove stage chip, and bento
 * card corner flourish.
 */
const CENTER = 32;
const POINTS = 10;

function decagram(outer: number, inner: number) {
  let d = "";
  for (let i = 0; i < POINTS * 2; i += 1) {
    const radius = i % 2 === 0 ? outer : inner;
    const angle = (Math.PI / POINTS) * i - Math.PI / 2;
    const x = CENTER + Math.cos(angle) * radius;
    const y = CENTER + Math.sin(angle) * radius;
    d += (i === 0 ? "M" : "L") + x.toFixed(2) + " " + y.toFixed(2) + " ";
  }
  return d.trim() + " Z";
}

function decagon(radius: number) {
  let d = "";
  for (let i = 0; i < POINTS; i += 1) {
    const angle = ((Math.PI * 2) / POINTS) * i - Math.PI / 2;
    const x = CENTER + Math.cos(angle) * radius;
    const y = CENTER + Math.sin(angle) * radius;
    d += (i === 0 ? "M" : "L") + x.toFixed(2) + " " + y.toFixed(2) + " ";
  }
  return d.trim() + " Z";
}

export function SeljukStar({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 64 64"
      fill="none"
      stroke="currentColor"
      strokeLinejoin="round"
      className={className}
    >
      <path d={decagram(28, 17)} strokeWidth={1} />
      <path d={decagon(11)} strokeWidth={0.75} opacity={0.7} />
      <circle cx={CENTER} cy={CENTER} r={3} strokeWidth={0.75} opacity={0.6} />
    </svg>
  );
}
