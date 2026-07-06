export function SceneHospitality({ className }: { className?: string }) {
  // Composition: horizon at y=350 (lower third). Boutique hotel facade x128-372,
  // cornice y=116-120, three balcony floors + lobby. Palm at x~420-487, pool
  // foreground x380-566 / y374-434, sea horizon running out both sides.
  const floors = [176, 234, 292]; // balcony slab levels
  const bays = [142, 220, 298]; // left x of each balcony bay (width 60)

  const balconyRow = (y: number) =>
    bays
      .map(
        (x) =>
          `M${x - 2} ${y} H${x + 62} M${x} ${y - 16} H${x + 60} ` +
          `M${x} ${y - 16} V${y} M${x + 20} ${y - 16} V${y} ` +
          `M${x + 40} ${y - 16} V${y} M${x + 60} ${y - 16} V${y}`
      )
      .join(" ");

  const windowRow = (y: number) =>
    bays
      .map(
        (x) =>
          `M${x + 14} ${y - 2} V${y - 46} H${x + 46} V${y - 2} ` +
          `M${x + 30} ${y - 46} V${y - 2}`
      )
      .join(" ");

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 640 480"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={"h-auto w-full text-foreground/60 " + (className ?? "")}
    >
      {/* soft washes: lit lobby door + pool water */}
      <rect
        x={238}
        y={308}
        width={24}
        height={42}
        opacity={0.55}
        className="fill-[color:var(--accent-soft)]"
      />
      <rect
        x={386}
        y={394}
        width={172}
        height={34}
        rx={6}
        opacity={0.5}
        className="fill-[color:var(--accent-soft)]"
      />

      {/* crescent moon, quiet night */}
      <path
        d="M546 61 A17 17 0 1 0 546 95 A22 22 0 0 1 546 61"
        fill="none"
        strokeWidth={1}
        className="stroke-current"
      />

      {/* sea horizon + wave dashes */}
      <path d="M52 350 H588" fill="none" strokeWidth={1.5} className="stroke-current" />
      <path
        d="M64 360 h12 M92 366 h12 M470 358 h14 M500 365 h12 M534 357 h12"
        fill="none"
        strokeWidth={1}
        className="stroke-current"
      />

      {/* hotel facade */}
      <rect
        x={128}
        y={120}
        width={244}
        height={230}
        fill="none"
        strokeWidth={1.5}
        className="stroke-current"
      />
      <path
        d="M130 176 H370 M130 234 H370 M130 292 H370"
        fill="none"
        strokeWidth={1}
        className="stroke-current"
      />

      {/* metallic roofline (hero line) + roof sensor node */}
      <path
        d="M122 116 H378"
        fill="none"
        strokeWidth={1.5}
        stroke="url(#goldFoil)"
      />
      <circle cx={358} cy={109} r={3.5} className="facet-node fill-[color:var(--accent)]" />

      {/* wi-fi signal above the roof */}
      <path
        d="M241 97 A12 12 0 0 1 259 97 M233 90 A22 22 0 0 1 267 90"
        fill="none"
        strokeWidth={1}
        className="stroke-[color:var(--accent)]"
      />
      <circle cx={250} cy={103} r={2} className="fill-[color:var(--accent)]" />

      {/* balcony rows + french doors, floors 2-4 */}
      {floors.map((y) => (
        <path
          key={`balcony-${y}`}
          d={balconyRow(y)}
          fill="none"
          strokeWidth={1}
          className="stroke-current"
        />
      ))}
      {floors.map((y) => (
        <path
          key={`window-${y}`}
          d={windowRow(y)}
          fill="none"
          strokeWidth={1}
          className="stroke-current"
        />
      ))}

      {/* a few lit rooms - full house */}
      <path
        d="M160 152 h16 M316 210 h16 M238 268 h16"
        fill="none"
        strokeWidth={1}
        className="stroke-[color:var(--accent)]"
      />

      {/* lobby windows + double entrance door */}
      <path
        d="M152 350 V306 H192 V350 M172 306 V350 M308 350 V306 H348 V350 M328 306 V350"
        fill="none"
        strokeWidth={1}
        className="stroke-current"
      />
      <path
        d="M236 350 V306 H264 V350 M250 306 V350"
        fill="none"
        strokeWidth={1}
        className="stroke-current"
      />

      {/* entrance canopy (gold) with tie rods */}
      <path
        d="M210 298 H290"
        fill="none"
        strokeWidth={1.5}
        className="stroke-[color:var(--accent)]"
      />
      <path
        d="M218 298 L230 283 M282 298 L270 283"
        fill="none"
        strokeWidth={1}
        className="stroke-current"
      />

      {/* discreet camera under the canopy edge */}
      <path
        d="M282 300 V307 M285 314 L291 319"
        fill="none"
        strokeWidth={1}
        className="stroke-[color:var(--accent)]"
      />
      <circle
        cx={282}
        cy={311}
        r={3}
        fill="none"
        strokeWidth={1}
        className="stroke-[color:var(--accent)]"
      />
      {/* lobby entrance sensor node */}
      <circle cx={250} cy={288} r={3.5} className="facet-node fill-[color:var(--accent)]" />

      {/* palm */}
      <path
        d="M420 350 C424 316 428 282 438 250 M429 350 C432 316 435 284 444 252"
        fill="none"
        strokeWidth={1}
        className="stroke-current"
      />
      <path
        d="M441 250 C428 238 410 234 394 240 M441 250 C452 236 470 232 487 238 M441 250 C430 250 414 256 402 268 M441 250 C454 249 468 256 478 268 M441 250 C438 238 436 226 440 214 M441 250 C448 240 452 230 452 218"
        fill="none"
        strokeWidth={1}
        className="stroke-current"
      />

      {/* pool with ladder */}
      <rect
        x={380}
        y={388}
        width={186}
        height={46}
        rx={8}
        fill="none"
        strokeWidth={1.5}
        className="stroke-current"
      />
      <path
        d="M404 410 q8 -5 16 0 q8 5 16 0 M478 421 q8 -5 16 0 q8 5 16 0 M508 402 q8 -5 16 0"
        fill="none"
        strokeWidth={1}
        className="stroke-current"
      />
      <path
        d="M398 406 V382 Q398 375 391 375 M408 406 V382 Q408 375 401 375 M398 390 H408 M398 398 H408"
        fill="none"
        strokeWidth={1}
        className="stroke-current"
      />
      {/* pool sensor on a small post */}
      <path d="M556 388 V378" fill="none" strokeWidth={1} className="stroke-current" />
      <circle cx={556} cy={373} r={3.5} className="facet-node fill-[color:var(--accent)]" />
    </svg>
  );
}
