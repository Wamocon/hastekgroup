/**
 * HeroNightScene — the cinematic hook visual for the homepage hero.
 *
 * "Alanya bei Nacht": a modern villa under the castle hill, the sea with
 * moon glint, palms — and the HAS Teknoloji layer living on top of it:
 * windows lighting up in sequence (smart scenario), a sweeping camera cone,
 * expanding signal rings, a slow perimeter scan beam and a protective dome.
 *
 * Server component, no hooks — every motion is a CSS animation declared in
 * globals.css (scene-window / cam-sweep / signal-ring / scan-beam / glint-line /
 * palm-sway / comet-star / shield-pulse), all guarded for reduced motion.
 * Line-art follows the house engraving style: structure in currentColor,
 * gold only via var(--accent) and the shared #goldFoil ramp.
 */

const LOWER_SLATS = Array.from({ length: 13 }, (_, i) => `M${400 + i * 8} 368 V470`).join(" ");
const UPPER_SLATS = Array.from({ length: 5 }, (_, i) => `M${380 + i * 7} 258 V330`).join(" ");

const STARS: [number, number, number, number][] = [
  // [cx, cy, r, delay]
  [60, 66, 1.4, 0.2],
  [118, 132, 1.2, 1.1],
  [186, 58, 1.6, 2.0],
  [262, 110, 1.2, 0.6],
  [318, 52, 1.4, 2.8],
  [392, 96, 1.2, 1.6],
  [452, 44, 1.6, 0.9],
  [500, 120, 1.3, 2.4],
  [536, 74, 1.2, 3.2],
  [676, 44, 1.4, 1.4],
  [712, 148, 1.2, 0.4],
  [86, 182, 1.2, 1.9],
];

// Window glow panes: [x, y, w, h, delay, breathe]
const WINDOWS: [number, number, number, number, number, boolean][] = [
  [155, 371, 50, 96, 0.8, false],
  [217, 371, 50, 96, 2.0, true],
  [279, 371, 50, 96, 3.2, false],
  [199, 261, 44, 58, 1.4, false],
  [261, 261, 44, 58, 2.6, true],
  [323, 261, 44, 58, 4.0, false],
];

export function HeroNightScene({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 760 620"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={"h-auto w-full text-foreground/60 " + (className ?? "")}
    >
      <defs>
        <radialGradient id="hnsGlow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" style={{ stopColor: "var(--accent)", stopOpacity: 0.26 }} />
          <stop offset="1" style={{ stopColor: "var(--accent)", stopOpacity: 0 }} />
        </radialGradient>
        <linearGradient id="hnsCone" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" style={{ stopColor: "var(--accent)", stopOpacity: 0.5 }} />
          <stop offset="1" style={{ stopColor: "var(--accent)", stopOpacity: 0 }} />
        </linearGradient>
        <linearGradient id="hnsBeam" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" style={{ stopColor: "var(--accent)", stopOpacity: 0 }} />
          <stop offset="0.5" style={{ stopColor: "var(--accent)", stopOpacity: 0.55 }} />
          <stop offset="1" style={{ stopColor: "var(--accent)", stopOpacity: 0 }} />
        </linearGradient>
      </defs>

      {/* Warm horizon aura grounding the composition */}
      <ellipse cx={380} cy={470} rx={360} ry={64} fill="url(#hnsGlow)" opacity={0.55} />

      {/* ── Sky ─────────────────────────────────────────────────────────── */}
      {STARS.map(([cx, cy, r, delay]) => (
        <circle
          key={`${cx}-${cy}`}
          cx={cx}
          cy={cy}
          r={r}
          opacity={0.8}
          className="facet-node fill-[color:var(--accent)]"
          style={{ animationDelay: `${delay}s` }}
        />
      ))}

      {/* Shooting star — head + tail, glides across the sky */}
      <g className="comet-star">
        <line
          x1={96}
          y1={54}
          x2={56}
          y2={36}
          strokeWidth={1.5}
          strokeOpacity={0.7}
          className="stroke-[color:var(--accent)]"
        />
        <circle cx={96} cy={54} r={2} className="fill-[color:var(--accent)]" />
      </g>

      {/* Crescent moon with glow */}
      <circle cx={604} cy={92} r={56} fill="url(#hnsGlow)" />
      <path
        d="M612 64 A32 32 0 0 0 593 120 A42 42 0 0 1 612 64"
        strokeWidth={1.4}
        className="stroke-[color:var(--accent)]"
      />

      {/* ── Alanya castle hill (background) ─────────────────────────────── */}
      <g opacity={0.5}>
        <path
          d="M0 336 C48 322 96 296 138 264 C160 247 186 238 208 248 C246 266 300 308 348 336"
          strokeWidth={1}
          className="stroke-current"
        />
        {/* Fortress wall crenellations along the ridge */}
        <path
          d="M146 262 V250 H154 V256 H162 V250 H170 V256 H178 V250 H186 V256 H194 V250 H202 V256 H210 V250 H218 V262"
          strokeWidth={1}
          className="stroke-current"
        />
        {/* Keep tower with battlement top */}
        <path
          d="M226 258 V232 H231 V226 H236 V230 H241 V226 H244 V258"
          strokeWidth={1}
          className="stroke-current"
        />
        {/* Banner */}
        <path d="M235 226 V214 L245 218 L235 222" strokeWidth={1} className="stroke-[color:var(--accent)]" />
      </g>
      {/* Castle lights */}
      <circle cx={160} cy={268} r={1.5} className="facet-node fill-[color:var(--accent)]" style={{ animationDelay: "1.2s" }} />
      <circle cx={205} cy={266} r={1.5} className="facet-node fill-[color:var(--accent)]" style={{ animationDelay: "2.6s" }} />
      <circle cx={235} cy={252} r={1.5} className="facet-node fill-[color:var(--accent)]" style={{ animationDelay: "0.4s" }} />

      {/* ── Sea with moon glint ─────────────────────────────────────────── */}
      <path
        d="M352 336 H492 M512 336 H580 M640 336 H760"
        strokeWidth={1}
        className="stroke-[color:var(--muted-foreground)]"
      />
      <path
        d="M380 352 H404 M430 360 H452 M470 350 H494 M560 366 H584 M660 356 H688 M700 368 H724"
        strokeWidth={1}
        className="stroke-[color:var(--muted-foreground)]"
      />
      {/* Glint column under the moon — drifting dashes */}
      <path d="M586 344 H634" strokeWidth={1.2} strokeOpacity={0.7} strokeDasharray="4 8" className="glint-line stroke-[color:var(--accent)]" />
      <path d="M592 358 H628" strokeWidth={1.2} strokeOpacity={0.55} strokeDasharray="3 9" className="glint-line stroke-[color:var(--accent)]" style={{ animationDelay: "-1.4s" }} />
      <path d="M596 372 H624" strokeWidth={1.2} strokeOpacity={0.4} strokeDasharray="4 10" className="glint-line stroke-[color:var(--accent)]" style={{ animationDelay: "-2.6s" }} />

      {/* ── Protective dome over the estate ─────────────────────────────── */}
      <path
        d="M64 470 A300 300 0 0 1 664 470"
        strokeWidth={1.3}
        strokeDasharray="2 8"
        className="shield-pulse stroke-[color:var(--accent)]"
      />
      <circle cx={364} cy={170} r={3} className="facet-node fill-[color:var(--accent)]" style={{ animationDelay: "1.9s" }} />

      {/* ── Villa ───────────────────────────────────────────────────────── */}
      {/* Perimeter scan beam sweeping the facade (behind the line-work) */}
      <rect x={140} y={344} width={22} height={124} fill="url(#hnsBeam)" className="scan-beam" />

      {/* Upper volume */}
      <path d="M166 236 H424" strokeWidth={2} stroke="url(#goldFoil)" />
      <path d="M166 236 V246 H424 V236" strokeWidth={1} className="stroke-current" />
      <path d="M178 246 V330 M412 246 V330" strokeWidth={1} className="stroke-current" />
      {/* Upper glazing panes */}
      <path
        d="M196 258 H248 V330 M196 258 V330 M258 258 H310 V330 M258 258 V330 M320 258 H372 V330 M320 258 V330"
        strokeWidth={1}
        className="stroke-current"
      />
      <path d={`M380 258 H408 ${UPPER_SLATS}`} strokeWidth={1} className="stroke-current" />

      {/* Lower volume */}
      <path d="M116 330 H524" strokeWidth={2} stroke="url(#goldFoil)" />
      <path d="M116 330 V342 H524 V330" strokeWidth={1} className="stroke-current" />
      <path d="M132 342 V470 M508 342 V470" strokeWidth={1} className="stroke-current" />
      {/* Lower glazing panes */}
      <path
        d="M152 368 H208 V470 M152 368 V470 M214 368 H270 V470 M214 368 V470 M276 368 H332 V470 M276 368 V470"
        strokeWidth={1}
        className="stroke-current"
      />
      {/* Entrance door, gold handle, keypad */}
      <path d="M344 470 V368 H388 V470" strokeWidth={1} className="stroke-current" />
      <path d="M380 412 V424" strokeWidth={1.5} className="stroke-[color:var(--accent)]" />
      <circle cx={335} cy={404} r={2} className="facet-node fill-[color:var(--accent)]" style={{ animationDelay: "0.5s" }} />
      {/* Slatted screen */}
      <path d={`M400 368 H496 ${LOWER_SLATS}`} strokeWidth={1} className="stroke-current" />

      {/* Smart scenario: windows lighting up one after another */}
      {WINDOWS.map(([x, y, w, h, delay, breathe]) => (
        <rect
          key={`${x}-${y}`}
          x={x}
          y={y}
          width={w}
          height={h}
          fillOpacity={0.3}
          className={
            (breathe ? "scene-window scene-window--breathe" : "scene-window") +
            " fill-[color:var(--accent)]"
          }
          style={{ animationDelay: `${delay}s${breathe ? `, ${delay + 3}s` : ""}` }}
        />
      ))}
      {/* Pendant lamp silhouette in the lit middle pane */}
      <path d="M242 371 V380" strokeWidth={1} strokeOpacity={0.7} className="stroke-[color:var(--accent)]" />
      <circle cx={242} cy={383} r={2} fillOpacity={0.7} className="fill-[color:var(--accent)]" />

      {/* Camera on the lower-left corner with sweeping cone */}
      <polygon points="156,315 300,392 272,436" fill="url(#hnsCone)" opacity={0.32} className="cam-sweep" />
      <path d="M140 330 V318 M128 308 H152 V318 H128 Z" strokeWidth={1} className="stroke-current" />
      <path d="M152 313 L159 315" strokeWidth={1.2} className="stroke-[color:var(--accent)]" />

      {/* Roof sensor mast with expanding signal rings */}
      <path d="M470 330 V302" strokeWidth={1} className="stroke-current" />
      <circle cx={470} cy={298} r={3.5} className="facet-node fill-[color:var(--accent)]" />
      <circle cx={470} cy={298} r={24} strokeWidth={1.2} className="signal-ring stroke-[color:var(--accent)]" />
      <circle cx={470} cy={298} r={24} strokeWidth={1.2} className="signal-ring stroke-[color:var(--accent)]" style={{ animationDelay: "1.2s" }} />
      <circle cx={470} cy={298} r={24} strokeWidth={1.2} className="signal-ring stroke-[color:var(--accent)]" style={{ animationDelay: "2.4s" }} />

      {/* ── Terrace, pool, path lights ──────────────────────────────────── */}
      <path d="M30 470 H730" strokeWidth={1.5} className="stroke-current" />
      {/* Infinity pool with gold edge and shimmering water */}
      <rect x={180} y={492} width={280} height={38} className="fill-[color:var(--accent-soft)] opacity-40" />
      <path d="M180 492 H460 V530 H180 Z" strokeWidth={1} className="stroke-current" />
      <path d="M180 492 H460" strokeWidth={1.5} stroke="url(#goldFoil)" />
      <path d="M200 506 H300" strokeWidth={1} strokeOpacity={0.5} strokeDasharray="5 9" className="glint-line stroke-[color:var(--accent)]" />
      <path d="M320 516 H430" strokeWidth={1} strokeOpacity={0.4} strokeDasharray="6 10" className="glint-line stroke-[color:var(--accent)]" style={{ animationDelay: "-1.8s" }} />
      <path d="M240 524 H360" strokeWidth={1} strokeOpacity={0.3} strokeDasharray="4 9" className="glint-line stroke-[color:var(--accent)]" style={{ animationDelay: "-0.9s" }} />
      {/* Terrace paving ticks */}
      <path
        d="M528 500 H566 M588 514 H632 M544 530 H588 M120 508 H156 M96 522 H134"
        strokeWidth={1}
        className="stroke-[color:var(--muted-foreground)]"
      />
      {/* Path-light bollards */}
      <path d="M560 470 V458 M612 470 V458 M664 470 V458" strokeWidth={1} className="stroke-current" />
      <circle cx={560} cy={456} r={2} className="facet-node fill-[color:var(--accent)]" style={{ animationDelay: "0.7s" }} />
      <circle cx={612} cy={456} r={2} className="facet-node fill-[color:var(--accent)]" style={{ animationDelay: "1.3s" }} />
      <circle cx={664} cy={456} r={2} className="facet-node fill-[color:var(--accent)]" style={{ animationDelay: "1.9s" }} />

      {/* ── Palms (foreground, gently swaying) ──────────────────────────── */}
      <g opacity={0.8} className="palm-sway">
        <path
          d="M58 470 C62 424 70 372 88 322 M70 470 C74 424 82 376 98 326 M74 430 L84 426 M70 402 L80 398 M78 374 L88 370 M84 348 L93 344"
          strokeWidth={1.2}
          className="stroke-current"
        />
        <path
          d="M93 324 C74 306 52 302 36 312 M93 324 C80 298 62 290 44 294 M93 324 C90 296 98 280 114 274 M93 324 C108 298 128 290 146 296 M93 324 C112 308 132 310 148 322 M93 324 C84 328 68 336 60 348"
          strokeWidth={1.2}
          className="stroke-current"
        />
        <circle cx={88} cy={330} r={2.5} strokeWidth={1} className="stroke-current" />
        <circle cx={100} cy={328} r={2.5} strokeWidth={1} className="stroke-current" />
      </g>
      <g opacity={0.8} className="palm-sway" style={{ animationDelay: "-2.8s" }}>
        <path
          d="M700 470 C696 428 688 380 672 334 M712 470 C708 428 700 382 684 336 M694 434 L704 430 M688 404 L698 400 M682 376 L692 372"
          strokeWidth={1.2}
          className="stroke-current"
        />
        <path
          d="M678 332 C660 314 640 310 624 318 M678 332 C666 306 648 298 630 302 M678 332 C676 304 684 288 700 282 M678 332 C694 306 714 298 732 304 M678 332 C696 316 716 318 732 330 M678 332 C670 336 654 344 646 356"
          strokeWidth={1.2}
          className="stroke-current"
        />
      </g>
    </svg>
  );
}
