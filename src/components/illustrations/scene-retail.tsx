export function SceneRetail({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 640 480"
      fill="none"
      className={"h-auto w-full " + (className ?? "")}
    >
      {/* soft gold washes: awning canopy + window glass */}
      <g stroke="none" opacity={0.5} className="fill-[color:var(--accent-soft)]">
        <path d="M 138 210 L 130 240 L 340 240 L 332 210 Z" />
        <rect x={152} y={258} width={176} height={100} />
      </g>

      {/* primary structure */}
      <g
        fill="none"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="stroke-[color:var(--muted-foreground)]"
      >
        <path d="M 52 380 H 588" />
        <path d="M 120 380 V 148" />
        <path d="M 470 380 V 148" />
        <path d="M 120 148 H 470" />
        <path d="M 128 196 H 462" />
        <path d="M 254 166 H 340" />
        <path d="M 138 210 L 130 240 L 340 240 L 332 210 Z" />
        <path d="M 130 240 V 252 H 340 V 240" />
        <rect x={150} y={256} width={180} height={104} />
        <path d="M 272 360 V 318 H 328" />
        <rect x={352} y={228} width={54} height={152} />
        <path d="M 361 306 V 320" />
        <rect x={414} y={222} width={52} height={14} rx={3} />
        <path d="M 420 312 H 460" />
      </g>

      {/* fine hairline detail */}
      <g
        fill="none"
        strokeWidth={1}
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity={0.8}
        className="stroke-[color:var(--muted-foreground)]"
      >
        <path d="M 272 178 H 322" />
        {/* awning stripes */}
        <path d="M 177 210 L 172 240" />
        <path d="M 216 210 L 214 240" />
        <path d="M 254 210 L 256 240" />
        <path d="M 293 210 L 298 240" />
        {/* shelves + products */}
        <path d="M 158 300 H 262" />
        <path d="M 158 334 H 262" />
        <rect x={163} y={284} width={15} height={16} />
        <rect x={186} y={289} width={20} height={11} />
        <rect x={160} y={318} width={18} height={16} />
        <rect x={186} y={322} width={13} height={12} />
        {/* barcode motif on the glass */}
        <path d="M 284 266 V 286" strokeWidth={1.5} />
        <path d="M 290 266 V 286" />
        <path d="M 294 266 V 286" />
        <path d="M 301 266 V 286" strokeWidth={1.5} />
        <path d="M 306 266 V 286" />
        <path d="M 313 266 V 286" strokeWidth={1.5} />
        {/* POS terminal on the counter */}
        <rect x={292} y={301} width={15} height={10} />
        <path d="M 299 311 V 318" />
        {/* door transom */}
        <path d="M 352 248 H 406" />
        {/* shutter guides + slats */}
        <path d="M 418 236 V 380" />
        <path d="M 462 236 V 380" />
        <path d="M 421 250 H 459" />
        <path d="M 421 263 H 459" />
        <path d="M 421 276 H 459" />
        <path d="M 421 289 H 459" />
        <path d="M 421 302 H 459" />
        {/* neighbouring facade + ground ticks */}
        <path d="M 84 380 V 214 H 120" />
        <path d="M 142 388 H 198" />
        <path d="M 430 388 H 484" />
      </g>

      {/* gold hero lines: roofline + door camera with signal arcs */}
      <g
        fill="none"
        strokeWidth={1}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="stroke-[color:var(--accent)]"
      >
        <path d="M 108 134 H 482" strokeWidth={1.5} stroke="url(#goldFoil)" />
        <path d="M 379 200 V 210" />
        <rect x={368} y={210} width={20} height={11} rx={2} />
        <path d="M 393 206 a 9 9 0 0 1 9 9" />
        <path d="M 396 202 a 13 13 0 0 1 13 13" />
        <circle cx={384} cy={215.5} r={1.6} stroke="none" className="fill-[color:var(--accent)]" />
      </g>

      {/* sensor nodes: door, storeroom side, counter */}
      <circle cx={345} cy={262} r={3.5} className="facet-node fill-[color:var(--accent)]" />
      <circle cx={440} cy={340} r={3.5} className="facet-node fill-[color:var(--accent)]" />
      <circle cx={280} cy={306} r={3} className="facet-node fill-[color:var(--accent)]" />
    </svg>
  );
}
