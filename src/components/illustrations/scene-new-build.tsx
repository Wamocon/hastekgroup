export function SceneNewBuild({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 640 480"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={"h-auto w-full text-foreground/60 " + (className ?? "")}
    >
      {/* Horizon */}
      <path d="M52 342 H588" className="stroke-current" strokeWidth={1} />

      {/* Tower crane — slim mast at far left, jib crossing above the shell */}
      <path d="M132 342 V74 M140 342 V74" className="stroke-current" strokeWidth={1.5} />
      <path
        d="M132 96 L140 118 L132 140 L140 162 L132 184 L140 206 L132 228 L140 250 L132 272 L140 294 L132 316 L140 338"
        className="stroke-current"
        strokeWidth={1}
        opacity={0.7}
      />
      <path d="M76 90 H424" className="stroke-current" strokeWidth={1.5} />
      <path d="M132 74 L136 58 L140 74 M136 58 L424 90 M136 58 L76 90" className="stroke-current" strokeWidth={1} />
      <rect x={80} y={95} width={22} height={11} className="stroke-current" strokeWidth={1} />
      <path d="M300 90 V150 M300 150 c0 7 -8 9 -10 3" className="stroke-current" strokeWidth={1} />

      {/* Focal villa — shell under construction */}
      <path d="M170 342 V190 M350 342 V190" className="stroke-current" strokeWidth={1.5} />
      <path d="M164 190 H356" stroke="url(#goldFoil)" strokeWidth={1.5} />
      <path d="M166 265 H354" className="stroke-current" strokeWidth={1} />
      <path d="M205 190 v-10 M250 190 v-10 M300 190 v-10" className="stroke-current" strokeWidth={1} />
      <rect x={195} y={212} width={48} height={40} className="stroke-current" strokeWidth={1} />
      <rect x={262} y={212} width={52} height={40} className="stroke-current" strokeWidth={1} />
      <path d="M212 342 V286 H244 V342" className="stroke-current" strokeWidth={1} />
      <rect x={270} y={288} width={54} height={34} className="stroke-current" strokeWidth={1} />
      <path d="M350 190 L384 202 V334 L350 342" className="stroke-current" strokeWidth={1} />

      {/* Stacked blocks on site */}
      <path d="M398 342 V326 H424 V342 M404 326 V314 H420 V326" className="stroke-current" strokeWidth={1} opacity={0.7} />

      {/* Finished villa behind */}
      <g opacity={0.5}>
        <path d="M430 342 V256 H505 V284 H558 V342" className="stroke-current" strokeWidth={1.5} />
        <path d="M444 300 h28 M444 312 h28 M518 306 h24" className="stroke-current" strokeWidth={1} />
      </g>

      {/* Ground ticks */}
      <path d="M84 356 h40 M480 350 h26" className="stroke-current" strokeWidth={1} opacity={0.5} />

      {/* Blueprint sheet — unrolled in the foreground */}
      <path
        d="M322 374 L564 358 L588 418 L350 438 Z"
        className="stroke-current fill-[color:var(--accent-soft)]"
        strokeWidth={1.5}
        fillOpacity={0.5}
      />
      <path d="M322 374 q-20 4 -18 16 q2 10 20 8 M312 380 q-6 6 2 10" className="stroke-current" strokeWidth={1} />
      <path
        d="M329 390 L570 373 M336 406 L576 388 M343 422 L582 403 M383 370 L410 433 M443 366 L469 428 M504 362 L529 423"
        className="stroke-current"
        strokeWidth={1}
        opacity={0.3}
      />
      {/* Floor plan drawn on the sheet, interior wall with door gap */}
      <path
        d="M371 384 L509 375 L525 412 L387 421 Z M437 380 L443 394 M448 405 L453 417"
        className="stroke-current"
        strokeWidth={1}
      />
      {/* Conduit route — planned from the shell phase */}
      <path
        d="M404 413 L398 399 L456 395 L504 392 L499 379"
        className="stroke-[color:var(--accent)]"
        strokeWidth={1}
        strokeDasharray="5 4"
      />
      {/* Sensor nodes placed on the plan */}
      <circle cx={404} cy={413} r={3.5} className="facet-node fill-[color:var(--accent)]" />
      <circle cx={456} cy={395} r={3.5} className="facet-node fill-[color:var(--accent)]" />
      <circle cx={499} cy={379} r={3.5} className="facet-node fill-[color:var(--accent)]" />
      {/* Signal arcs above the corner node */}
      <path
        d="M492 371 a10 10 0 0 1 14 0 M488 365 a16 16 0 0 1 22 0"
        className="stroke-[color:var(--accent)]"
        strokeWidth={1}
      />
    </svg>
  );
}
