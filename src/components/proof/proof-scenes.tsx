/**
 * Paired gold-engraving illustrations for the before/after reveal.
 *
 * Each pair keeps identical base geometry so the wipe lines up exactly; only
 * the security storytelling differs (cameras, signal arcs, lit windows, closed
 * gate and sensor nodes appear in the "after" scene). Line-art follows the same
 * conventions as src/components/illustrations/scene-private-homes.tsx:
 * stroke-current for structure, stroke="url(#goldFoil)" for hero edges,
 * var(--accent) for devices and .facet-node dots for sensors.
 */

type SceneProps = { className?: string };

function SceneSvg({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 640 480"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={"h-full w-full " + (className ?? "")}
    >
      {children}
    </svg>
  );
}

/* ── Pair 1 · Villa ─────────────────────────────────────────────────────── */

export function SceneVillaBefore({ className }: SceneProps) {
  return (
    <SceneSvg className={className}>
      {/* Dim moon */}
      <path
        d="M544 80 A22 22 0 0 0 532 118 A30 30 0 0 1 544 80"
        strokeWidth={1}
        className="stroke-[color:var(--muted-foreground)]"
      />

      {/* Ground */}
      <path d="M60 392 H584" strokeWidth={1.5} className="stroke-current" />

      {/* Villa — roof slab (unlit, plain stroke) */}
      <path d="M188 250 H476" strokeWidth={1.5} className="stroke-current" />
      <path d="M188 250 V262 H476 V250" strokeWidth={1} className="stroke-current" />
      <path d="M206 262 V392 M458 262 V392" strokeWidth={1} className="stroke-current" />

      {/* Dark glazing — outline only */}
      <rect x={228} y={288} width={90} height={104} strokeWidth={1} className="stroke-current" />
      <path d="M258 288 V392 M288 288 V392" strokeWidth={1} className="stroke-current" />

      {/* Slatted screen */}
      <path
        d="M330 288 H386 M330 288 V392 M338 288 V392 M346 288 V392 M354 288 V392 M362 288 V392 M370 288 V392 M378 288 V392 M386 288 V392"
        strokeWidth={1}
        className="stroke-current"
      />

      {/* Entrance door */}
      <path d="M404 392 V286 H444 V392 M436 336 V348" strokeWidth={1} className="stroke-current" />

      {/* Garden wall + gate pillars */}
      <path d="M84 392 V330 H128 V392" strokeWidth={1} className="stroke-current" />
      <path d="M160 392 V324 H176 V392" strokeWidth={1} className="stroke-current" />

      {/* Gate open — leaf folded against the pillar, gap unguarded */}
      <path
        d="M112 346 H126 M116 346 V392 M120 346 V392 M124 346 V392"
        strokeWidth={1}
        className="stroke-[color:var(--muted-foreground)]"
      />
    </SceneSvg>
  );
}

export function SceneVillaAfter({ className }: SceneProps) {
  return (
    <SceneSvg className={className}>
      {/* Moon */}
      <path
        d="M544 80 A22 22 0 0 0 532 118 A30 30 0 0 1 544 80"
        strokeWidth={1}
        className="stroke-[color:var(--accent)]"
      />

      {/* Ground */}
      <path d="M60 392 H584" strokeWidth={1.5} className="stroke-current" />

      {/* Villa — roof slab with metallic hero edge */}
      <path d="M188 250 H476" strokeWidth={1.5} stroke="url(#goldFoil)" />
      <path d="M188 250 V262 H476 V250" strokeWidth={1} className="stroke-current" />
      <path d="M206 262 V392 M458 262 V392" strokeWidth={1} className="stroke-current" />

      {/* Lit glazing */}
      <rect x={228} y={288} width={90} height={104} className="fill-[color:var(--accent-soft)] opacity-40" />
      <rect x={228} y={288} width={90} height={104} strokeWidth={1} className="stroke-current" />
      <path d="M258 288 V392 M288 288 V392" strokeWidth={1} className="stroke-current" />

      {/* Slatted screen */}
      <path
        d="M330 288 H386 M330 288 V392 M338 288 V392 M346 288 V392 M354 288 V392 M362 288 V392 M370 288 V392 M378 288 V392 M386 288 V392"
        strokeWidth={1}
        className="stroke-current"
      />

      {/* Entrance door with a warm glow */}
      <rect x={404} y={286} width={40} height={106} className="fill-[color:var(--accent-soft)] opacity-30" />
      <path d="M404 392 V286 H444 V392 M436 336 V348" strokeWidth={1} className="stroke-current" />

      {/* Garden wall + gate pillars */}
      <path d="M84 392 V330 H128 V392" strokeWidth={1} className="stroke-current" />
      <path d="M160 392 V324 H176 V392" strokeWidth={1} className="stroke-current" />

      {/* Gate closed — perimeter secured */}
      <path
        d="M128 346 H160 M128 382 H160 M134 346 V392 M142 346 V392 M150 346 V392 M158 346 V392"
        strokeWidth={1}
        className="stroke-current"
      />

      {/* Wall-mounted camera + signal arcs */}
      <path
        d="M108 330 V322 M100 314 H116 V322 H100 Z M116 318 L121 320"
        strokeWidth={1}
        className="stroke-[color:var(--accent)]"
      />
      <path
        d="M123 312 A10 10 0 0 1 123 328 M130 307 A16 16 0 0 1 130 333"
        strokeWidth={1}
        className="stroke-[color:var(--accent)]"
      />

      {/* Sensor nodes: gate pillar, roof corner, by the door */}
      <circle cx={168} cy={318} r={3} className="facet-node fill-[color:var(--accent)]" />
      <circle cx={472} cy={246} r={3.5} className="facet-node fill-[color:var(--accent)]" />
      <circle cx={448} cy={282} r={3} className="facet-node fill-[color:var(--accent)]" />
    </SceneSvg>
  );
}

/* ── Pair 2 · Storefront ────────────────────────────────────────────────── */

export function SceneStoreBefore({ className }: SceneProps) {
  return (
    <SceneSvg className={className}>
      {/* Ground */}
      <path d="M60 408 H584" strokeWidth={1.5} className="stroke-current" />

      {/* Facade + fascia (unlit) */}
      <path d="M150 150 H498" strokeWidth={1.5} className="stroke-current" />
      <path d="M150 150 V408 M498 150 V408 M150 190 H498" strokeWidth={1} className="stroke-current" />

      {/* Blank signage */}
      <path
        d="M190 172 H238 M254 172 H302 M318 172 H366 M382 172 H430"
        strokeWidth={1}
        className="stroke-[color:var(--muted-foreground)]"
      />

      {/* Awning valance */}
      <path d="M150 190 L138 226 H510 L498 190" strokeWidth={1} className="stroke-current" />
      <path
        d="M186 226 V196 M226 226 V194 M266 226 V194 M306 226 V194 M346 226 V194 M386 226 V194 M426 226 V194 M466 226 V196"
        strokeWidth={1}
        className="stroke-[color:var(--muted-foreground)]"
      />

      {/* Dark display window */}
      <rect x={176} y={252} width={172} height={156} strokeWidth={1} className="stroke-current" />
      <path d="M236 252 V408 M296 252 V408 M176 320 H348" strokeWidth={1} className="stroke-current" />

      {/* Door */}
      <path d="M372 408 V252 H448 V408 M410 252 V408 M440 332 V348" strokeWidth={1} className="stroke-current" />
    </SceneSvg>
  );
}

export function SceneStoreAfter({ className }: SceneProps) {
  return (
    <SceneSvg className={className}>
      {/* Ground */}
      <path d="M60 408 H584" strokeWidth={1.5} className="stroke-current" />

      {/* Facade + metallic fascia */}
      <path d="M150 150 H498" strokeWidth={1.5} stroke="url(#goldFoil)" />
      <path d="M150 150 V408 M498 150 V408 M150 190 H498" strokeWidth={1} className="stroke-current" />

      {/* Lit signage */}
      <rect x={150} y={150} width={348} height={40} className="fill-[color:var(--accent-soft)] opacity-30" />
      <path
        d="M190 172 H238 M254 172 H302 M318 172 H366 M382 172 H430"
        strokeWidth={1.5}
        stroke="url(#goldFoil)"
      />

      {/* Awning valance */}
      <path d="M150 190 L138 226 H510 L498 190" strokeWidth={1} className="stroke-current" />
      <path
        d="M186 226 V196 M226 226 V194 M266 226 V194 M306 226 V194 M346 226 V194 M386 226 V194 M426 226 V194 M466 226 V196"
        strokeWidth={1}
        className="stroke-[color:var(--muted-foreground)]"
      />

      {/* Lit display window */}
      <rect x={176} y={252} width={172} height={156} className="fill-[color:var(--accent-soft)] opacity-40" />
      <rect x={176} y={252} width={172} height={156} strokeWidth={1} className="stroke-current" />
      <path d="M236 252 V408 M296 252 V408 M176 320 H348" strokeWidth={1} className="stroke-current" />

      {/* Door */}
      <path d="M372 408 V252 H448 V408 M410 252 V408 M440 332 V348" strokeWidth={1} className="stroke-current" />

      {/* CCTV camera + signal arcs */}
      <path
        d="M188 214 V206 M180 198 H196 V206 H180 Z M196 202 L201 204"
        strokeWidth={1}
        className="stroke-[color:var(--accent)]"
      />
      <path
        d="M203 196 A10 10 0 0 1 203 212 M210 191 A16 16 0 0 1 210 217"
        strokeWidth={1}
        className="stroke-[color:var(--accent)]"
      />

      {/* Alarm box */}
      <path d="M460 198 H478 V214 H460 Z" strokeWidth={1} className="stroke-[color:var(--accent)]" />

      {/* Sensor + alarm nodes */}
      <circle cx={469} cy={206} r={2.5} className="facet-node fill-[color:var(--accent)]" />
      <circle cx={410} cy={250} r={3} className="facet-node fill-[color:var(--accent)]" />
      <circle cx={180} cy={254} r={3} className="facet-node fill-[color:var(--accent)]" />
    </SceneSvg>
  );
}
