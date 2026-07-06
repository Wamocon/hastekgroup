export function SceneGastronomy({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 640 480"
      fill="none"
      className={"h-auto w-full " + (className ?? "")}
    >
      {/* Soft washes: warm light spilling from the kitchen doorway */}
      <rect
        x={525}
        y={260}
        width={32}
        height={140}
        className="fill-[color:var(--accent-soft)]"
        opacity={0.5}
      />
      <ellipse
        cx={541}
        cy={403}
        rx={36}
        ry={6}
        className="fill-[color:var(--accent-soft)]"
        opacity={0.35}
      />

      {/* Sea horizon and water hairlines */}
      <g
        className="stroke-[color:var(--foreground)]"
        opacity={0.35}
        strokeWidth={1}
        strokeLinecap="round"
      >
        <path d="M56 322h436" />
        <path d="M120 334h96M252 336h48M380 338h64" />
      </g>

      {/* Main linework */}
      <g
        className="stroke-[color:var(--foreground)]"
        opacity={0.6}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* terrace ground line */}
        <path d="M56 402h528" strokeWidth={2.5} />

        {/* pergola posts, beam, rafter ends */}
        <path d="M96 402V108M456 402V108" />
        <path d="M76 100h400M80 108h392" />
        <path
          d="M136 100v-10M196 100v-10M256 100v-10M316 100v-10M376 100v-10M436 100v-10"
          strokeWidth={1}
        />

        {/* low railing before the sea */}
        <path d="M60 344h432M60 372h432" strokeWidth={1} />
        <path
          d="M76 344v58M130 344v58M184 344v58M238 344v58M292 344v58M346 344v58M400 344v58M454 344v58"
          strokeWidth={1}
        />

        {/* string-light catenary, post to post, then down to the kitchen roof */}
        <path d="M96 112Q276 168 456 112Q500 176 552 190" strokeWidth={1} />

        {/* round table one with two bistro chairs */}
        <ellipse cx={190} cy={350} rx={44} ry={7} />
        <path
          d="M190 357v35m-18 10c5-8 11-10 18-10s13 2 18 10"
          strokeWidth={1}
        />
        <path d="M137 328q2 20 3 38h24l6 36M141 366l-6 36" strokeWidth={1} />
        <path d="M243 328q-2 20-3 38h-24l-6 36M239 366l6 36" strokeWidth={1} />

        {/* round table two with two bistro chairs */}
        <ellipse cx={360} cy={350} rx={44} ry={7} />
        <path
          d="M360 357v35m-18 10c5-8 11-10 18-10s13 2 18 10"
          strokeWidth={1}
        />
        <path d="M307 328q2 20 3 38h24l6 36M311 366l-6 36" strokeWidth={1} />
        <path d="M413 328q-2 20-3 38h-24l-6 36M409 366l6 36" strokeWidth={1} />

        {/* service / kitchen volume with open doorway and small window */}
        <path d="M500 402V196h84v206" />
        <path d="M522 402v-145h38v145" />
        <path d="M564 274h14v14h-14z" strokeWidth={1} />
      </g>

      {/* string-light bulbs, neutral */}
      <g className="fill-[color:var(--foreground)]" opacity={0.5}>
        <circle cx={146} cy={134} r={2} />
        <circle cx={190} cy={142} r={2} />
        <circle cx={233} cy={146} r={2} />
        <circle cx={319} cy={146} r={2} />
        <circle cx={362} cy={142} r={2} />
        <circle cx={406} cy={134} r={2} />
        <circle cx={522} cy={185} r={2} />
      </g>

      {/* Gold hairlines: roofline, camera over the doorway, signal arcs, evening sun */}
      <g
        className="stroke-[color:var(--accent)]"
        strokeWidth={1}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M492 190h96" strokeWidth={1.5} stroke="url(#goldFoil)" />
        <path d="M550 196v9m-12 4l22-6 3 9-22 6z" />
        <path d="M528 205a10 10 0 0 0 0 14M521 201a17 17 0 0 0 0 22" />
        <path d="M264 322a12 12 0 0 1 24 0" />
      </g>
      <circle cx={536} cy={212} r={1.5} className="fill-[color:var(--accent)]" />

      {/* sensor nodes: two doubling as gold bulbs on the wire, one on the pergola post */}
      <circle
        cx={276}
        cy={148}
        r={3.5}
        className="facet-node fill-[color:var(--accent)]"
      />
      <circle
        cx={488}
        cy={159}
        r={3.5}
        className="facet-node fill-[color:var(--accent)]"
      />
      <circle
        cx={96}
        cy={128}
        r={3}
        className="facet-node fill-[color:var(--accent)]"
      />
    </svg>
  );
}
