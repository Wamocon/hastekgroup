export function SceneCommercial({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 640 480"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={"h-auto w-full text-[color:var(--muted-foreground)] " + (className ?? "")}
    >
      {/* soft washes: lobby light left on + one lit office window (Friday 7pm) */}
      <rect x="178" y="306" width="44" height="54" className="fill-[color:var(--accent-soft)]" opacity={0.8} />
      <rect x="256" y="174" width="38" height="34" className="fill-[color:var(--accent-soft)]" opacity={0.6} />

      <g className="stroke-current">
        {/* ground */}
        <path d="M52 360 H588" strokeWidth={1.5} />
        <path d="M96 370 H112 M238 370 H252 M330 371 H348 M468 370 H482 M545 371 H560" strokeWidth={1} opacity={0.5} />

        {/* street lamp, far left */}
        <path d="M64 360 V296 Q64 289 71 289 H80" strokeWidth={1.5} />
        <circle cx="83" cy="289" r="2" className="fill-[color:var(--accent)]" stroke="none" />

        {/* office tower: walls, roof bulkhead, antenna mast */}
        <path d="M90 360 V80 M310 360 V80" strokeWidth={1.5} />
        <path d="M270 80 V64 H296 V80 M283 64 V46" strokeWidth={1.5} />
        <path d="M84 80 H316" strokeWidth={1.5} stroke="url(#goldFoil)" />
        <path d="M276 42 Q283 35 290 42" strokeWidth={1} className="stroke-[color:var(--accent)]" />

        {/* window grid, suggested not drawn */}
        <path d="M104 124 H296 M104 168 H244 M104 212 H296 M104 256 H198" strokeWidth={1} opacity={0.55} />
        <path d="M142 108 V238 M196 142 V296 M250 108 V214" strokeWidth={1} opacity={0.55} />

        {/* lobby: canopy, double door */}
        <path d="M170 302 H230 M180 302 V311 M220 302 V311" strokeWidth={1} />
        <path d="M182 360 V312 H218 V360 M200 312 V360" strokeWidth={1.5} />
        <circle cx="200" cy="294" r="3.5" className="facet-node fill-[color:var(--accent)]" stroke="none" />

        {/* parking wing with half-lowered grille */}
        <path d="M310 252 H430 V360" strokeWidth={1.5} />
        <path d="M336 360 V288 Q336 282 342 282 H402 Q408 282 408 288 V360" strokeWidth={1.5} />
        <path d="M341 291 H403 M341 299 H403 M341 307 H403" strokeWidth={1} opacity={0.55} />
        <circle cx="430" cy="252" r="3.5" className="facet-node fill-[color:var(--accent)]" stroke="none" />

        {/* camera over the garage mouth */}
        <path d="M370 256 V262 M362 262 H378 V270 H362 Z" strokeWidth={1} className="stroke-[color:var(--accent)]" />
        <circle cx="380.5" cy="266" r="1.5" className="fill-[color:var(--accent)]" stroke="none" />

        {/* barrier: post, half-raised arm, signal arcs */}
        <path d="M419 360 V332 H429 V360" strokeWidth={1.5} />
        <path d="M413 346 L426 337 L489 289" strokeWidth={1.5} className="stroke-[color:var(--accent)]" />
        <circle cx="424" cy="326" r="3.5" className="facet-node fill-[color:var(--accent)]" stroke="none" />
        <path d="M417 317 Q424 310 431 317 M412 311 Q424 300 436 311" strokeWidth={1} className="stroke-[color:var(--accent)]" />

        {/* intercom post */}
        <path d="M452 360 V332 M445 332 V314 H459 V332 H445" strokeWidth={1.5} />
        <path d="M448.5 319 H455.5 M448.5 323 H455.5" strokeWidth={1} />
        <circle cx="452" cy="327.5" r="1.5" className="fill-[color:var(--accent)]" stroke="none" />

        {/* waiting car, nose toward the barrier */}
        <path
          d="M509 352 H498 V343 Q498 338 505 337 L523 334 L535 321 Q537 319 541 319 H557 Q560 319 562 321 L571 332 L580 336 Q584 337 584 343 V352 H575 M531 352 H553 M539 321 V336"
          strokeWidth={1.5}
        />
        <circle cx="520" cy="351" r="9" strokeWidth={1.5} />
        <circle cx="564" cy="351" r="9" strokeWidth={1.5} />
        <circle cx="499.5" cy="340" r="2" className="fill-[color:var(--accent)]" stroke="none" />
      </g>
    </svg>
  );
}
