export function MockupDashboard({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 640 400"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={"h-auto w-full text-foreground/60 " + (className ?? "")}
    >
      {/* browser window frame + top bar */}
      <rect x="64" y="52" width="512" height="304" rx="10" className="stroke-current" strokeWidth="1.5" />
      <line x1="64" y1="82" x2="576" y2="82" className="stroke-current" strokeWidth="1" />
      <circle cx="82" cy="67" r="2.5" className="stroke-current" strokeWidth="1" />
      <circle cx="96" cy="67" r="2.5" className="stroke-current" strokeWidth="1" />
      <circle cx="110" cy="67" r="2.5" className="stroke-current" strokeWidth="1" />

      {/* bento tile outlines */}
      <rect x="80" y="98" width="264" height="152" rx="8" className="stroke-current" strokeWidth="1" />
      <rect x="80" y="266" width="264" height="74" rx="8" className="stroke-current" strokeWidth="1" />
      <rect x="360" y="98" width="200" height="72" rx="8" className="stroke-current" strokeWidth="1" />
      <rect x="360" y="186" width="200" height="72" rx="8" className="stroke-current" strokeWidth="1" />
      <rect x="360" y="274" width="200" height="66" rx="8" className="stroke-current" strokeWidth="1" />

      {/* camera tile: soft ground wash + horizon */}
      <rect x="94" y="212" width="236" height="26" rx="2" className="soft-breathe fill-[color:var(--accent-soft)]" />
      <line x1="94" y1="212" x2="330" y2="212" className="stroke-current" strokeWidth="1" />
      <path d="M 110 220 h 10 M 240 224 h 14 M 306 218 h 8" className="stroke-current opacity-50" strokeWidth="1" />

      {/* gate: posts, rail, bars, gold arch */}
      <line x1="148" y1="162" x2="148" y2="212" className="stroke-current" strokeWidth="1.5" />
      <line x1="212" y1="162" x2="212" y2="212" className="stroke-current" strokeWidth="1.5" />
      <line x1="148" y1="176" x2="212" y2="176" className="stroke-current" strokeWidth="1" />
      <path d="M 161 178 V 212 M 174 178 V 212 M 187 178 V 212 M 200 178 V 212" className="stroke-current opacity-70" strokeWidth="1" />
      <path d="M 142 166 Q 180 132 218 166" stroke="url(#goldFoil)" strokeWidth="1.5" />

      {/* palm silhouette */}
      <path d="M 282 212 C 280 194 278 176 274 158" className="stroke-current" strokeWidth="1" />
      <path
        d="M 274 158 C 262 152 250 152 240 158 M 274 158 C 264 146 252 142 242 144 M 274 158 C 272 144 276 134 284 128 M 274 158 C 284 146 296 142 306 146 M 274 158 C 286 152 298 154 306 162"
        className="stroke-current"
        strokeWidth="1"
      />

      {/* REC dot (gold) with hairline ring — blinking like a live recorder */}
      <circle cx="316" cy="124" r="6.5" className="stroke-[color:var(--accent)] opacity-70" strokeWidth="1" />
      <circle cx="316" cy="124" r="3" className="rec-blink fill-[color:var(--accent)]" />

      {/* sensor nodes on camera tile corners + signal arcs + expanding rings */}
      <circle cx="80" cy="98" r="3.5" className="facet-node fill-[color:var(--accent)]" />
      <circle cx="344" cy="98" r="3.5" className="facet-node fill-[color:var(--accent)]" />
      <path d="M 349 89.3 A 10 10 0 0 1 354 97.1" className="stroke-[color:var(--accent)]" strokeWidth="1" />
      <path d="M 352 84.1 A 16 16 0 0 1 359.9 96.6" className="stroke-[color:var(--accent)] opacity-70" strokeWidth="1" />
      <circle cx="344" cy="98" r="7" className="signal-ring stroke-[color:var(--accent)]" strokeWidth="1" />
      <circle cx="344" cy="98" r="7" className="signal-ring stroke-[color:var(--accent)]" strokeWidth="1" style={{ animationDelay: "1.2s" }} />
      <circle cx="344" cy="98" r="7" className="signal-ring stroke-[color:var(--accent)]" strokeWidth="1" style={{ animationDelay: "2.4s" }} />

      {/* toggle tile 1 (on): label lines + pill + gold knob */}
      <line x1="378" y1="129" x2="426" y2="129" className="stroke-current" strokeWidth="1.5" />
      <line x1="378" y1="140" x2="408" y2="140" className="stroke-current opacity-50" strokeWidth="1" />
      <rect x="486" y="122" width="48" height="24" rx="12" className="stroke-current fill-[color:var(--accent-soft)] opacity-80" strokeWidth="1.5" />
      <circle cx="522" cy="134" r="6" className="facet-node fill-[color:var(--accent)]" />

      {/* toggle tile 2 (off): label lines + pill + hollow knob */}
      <line x1="378" y1="217" x2="426" y2="217" className="stroke-current" strokeWidth="1.5" />
      <line x1="378" y1="228" x2="404" y2="228" className="stroke-current opacity-50" strokeWidth="1" />
      <rect x="486" y="210" width="48" height="24" rx="12" className="stroke-current" strokeWidth="1.5" />
      <circle cx="498" cy="222" r="6" className="stroke-current" strokeWidth="1" />

      {/* graph tile: baseline, ticks, curve, gold end dot */}
      <line x1="94" y1="322" x2="330" y2="322" className="stroke-current opacity-50" strokeWidth="1" />
      <path d="M 150 322 v 4 M 222 322 v 4 M 288 322 v 4" className="stroke-current opacity-50" strokeWidth="1" />
      <path
        d="M 94 316 C 120 316 134 302 156 304 C 178 306 190 320 212 314 C 234 308 244 288 268 286 C 288 284 302 292 318 288"
        className="stroke-current"
        strokeWidth="1.5"
      />
      {/* flowing gold overlay — reads as live data moving along the curve */}
      <path
        d="M 94 316 C 120 316 134 302 156 304 C 178 306 190 320 212 314 C 234 308 244 288 268 286 C 288 284 302 292 318 288"
        className="glint-line stroke-[color:var(--accent)]"
        strokeWidth="1.5"
        strokeDasharray="3 7"
        opacity="0.85"
      />
      <circle cx="318" cy="288" r="3" className="facet-node fill-[color:var(--accent)]" />

      {/* lock tile: gold shackle + body, keyhole dot, label lines */}
      <path d="M 402 302 v -7 a 8 8 0 0 1 16 0 v 7" className="stroke-[color:var(--accent)]" strokeWidth="1.5" />
      <rect x="394" y="302" width="32" height="24" rx="4" className="stroke-[color:var(--accent)]" strokeWidth="1.5" />
      <circle cx="410" cy="313" r="2.5" className="fill-[color:var(--accent)]" />
      <line x1="444" y1="306" x2="506" y2="306" className="stroke-current" strokeWidth="1.5" />
      <line x1="444" y1="317" x2="480" y2="317" className="stroke-current opacity-50" strokeWidth="1" />
    </svg>
  );
}
