export function ScenePrivateHomes({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 640 480"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={"h-auto w-full text-foreground/60 " + (className ?? "")}
    >
      {/* Crescent moon — evening calm */}
      <path
        d="M546 70 A24 24 0 0 0 532 112 A32 32 0 0 1 546 70"
        fill="none"
        strokeWidth={1}
        className="stroke-[color:var(--accent)]"
      />

      {/* Sea horizon, broken by wall, villa and palm */}
      <path
        d="M54 316 H84 M184 316 H208 M462 316 H524 M548 316 H586"
        fill="none"
        strokeWidth={1}
        className="stroke-[color:var(--muted-foreground)]"
      />
      {/* Wave dashes */}
      <path
        d="M64 332 H82 M470 334 H492 M508 342 H532 M556 330 H578"
        fill="none"
        strokeWidth={1}
        className="stroke-[color:var(--muted-foreground)]"
      />

      {/* Ground baseline */}
      <path d="M60 380 H584" fill="none" strokeWidth={1.5} className="stroke-current" />
      {/* Terrace paving ticks */}
      <path
        d="M228 394 H272 M320 398 H368 M414 394 H446"
        fill="none"
        strokeWidth={1}
        className="stroke-[color:var(--muted-foreground)]"
      />

      {/* Villa — roof slab, metallic hero line on top edge */}
      <path d="M196 258 H472" fill="none" strokeWidth={1.5} stroke="url(#goldFoil)" />
      <path d="M196 258 V268 H472 V258" fill="none" strokeWidth={1} className="stroke-current" />
      {/* Villa side walls */}
      <path d="M212 268 V380 M456 268 V380" fill="none" strokeWidth={1} className="stroke-current" />

      {/* Full-height glazing with soft gold wash */}
      <rect x={232} y={292} width={84} height={88} className="fill-[color:var(--accent-soft)] opacity-40" />
      <rect x={232} y={292} width={84} height={88} fill="none" strokeWidth={1} className="stroke-current" />
      <path d="M260 292 V380 M288 292 V380" fill="none" strokeWidth={1} className="stroke-current" />

      {/* Slatted screen */}
      <path
        d="M336 292 H384 M336 292 V380 M344 292 V380 M352 292 V380 M360 292 V380 M368 292 V380 M376 292 V380 M384 292 V380"
        fill="none"
        strokeWidth={1}
        className="stroke-current"
      />

      {/* Entrance door with handle */}
      <path d="M404 380 V292 H440 V380 M433 332 V342" fill="none" strokeWidth={1} className="stroke-current" />

      {/* Garden wall, gate leaf and gate pillar */}
      <path d="M88 380 V334 H130 V380" fill="none" strokeWidth={1} className="stroke-current" />
      <path
        d="M132 342 H160 M138 344 V378 M146 344 V378 M154 344 V378"
        fill="none"
        strokeWidth={1}
        className="stroke-current"
      />
      <path d="M162 380 V328 H178 V380" fill="none" strokeWidth={1} className="stroke-current" />

      {/* Wall-mounted camera, gold hairline */}
      <path
        d="M104 334 V326 M96 318 H112 V326 H96 Z M112 322 L117 324"
        fill="none"
        strokeWidth={1}
        className="stroke-[color:var(--accent)]"
      />
      {/* Signal arcs from the camera */}
      <path
        d="M119 314 A10 10 0 0 1 119 330 M126 309 A16 16 0 0 1 126 335"
        fill="none"
        strokeWidth={1}
        className="stroke-[color:var(--accent)]"
      />

      {/* Palm — trunk with bark ticks */}
      <path
        d="M536 380 C534 344 528 302 517 264 M543 380 C541 344 535 304 524 262 M527 322 L536 318 M523 298 L532 294 M520 278 L528 274"
        fill="none"
        strokeWidth={1}
        className="stroke-current"
      />
      {/* Palm fronds */}
      <path
        d="M520 260 C504 246 486 246 474 256 M520 260 C508 238 494 232 480 236 M520 260 C518 236 524 224 536 218 M520 260 C534 238 550 232 564 238 M520 260 C538 248 556 252 568 264 M520 260 C510 262 498 268 492 278"
        fill="none"
        strokeWidth={1}
        className="stroke-current"
      />

      {/* Sensor nodes: gate pillar, roof corner, by the door */}
      <circle cx={170} cy={322} r={3} className="facet-node fill-[color:var(--accent)]" />
      <circle cx={470} cy={252} r={3.5} className="facet-node fill-[color:var(--accent)]" />
      <circle cx={448} cy={288} r={3} className="facet-node fill-[color:var(--accent)]" />
    </svg>
  );
}
