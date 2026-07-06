export function MockupConciergePhone({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 320 640"
      fill="none"
      className={"h-auto w-full text-[color:var(--foreground)] " + (className ?? "")}
    >
      {/* soft grounding wash on the horizon */}
      <ellipse
        cx={160}
        cy={521}
        rx={104}
        ry={8}
        className="fill-[color:var(--accent-soft)]"
        opacity={0.5}
      />

      {/* main engraved linework */}
      <g
        className="stroke-current"
        fill="none"
        strokeWidth={1}
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity={0.65}
      >
        {/* horizon hairline, lower third */}
        <line x1={26} y1={520} x2={294} y2={520} opacity={0.7} />

        {/* outer engraved echo of the phone body */}
        <rect x={54} y={64} width={212} height={442} rx={40} opacity={0.35} />

        {/* screen */}
        <rect x={70} y={80} width={180} height={410} rx={26} />

        {/* speaker pill */}
        <rect x={142} y={90} width={36} height={6} rx={3} opacity={0.6} />

        {/* side buttons resting between the double contour */}
        <line x1={57} y1={170} x2={57} y2={196} opacity={0.6} />
        <line x1={57} y1={206} x2={57} y2={232} opacity={0.6} />
        <line x1={263} y1={185} x2={263} y2={235} opacity={0.6} />

        {/* avatar */}
        <circle cx={160} cy={130} r={13} strokeWidth={1.5} />

        {/* contact-name placeholder lines */}
        <line x1={134} y1={164} x2={186} y2={164} strokeWidth={1.5} />
        <line x1={146} y1={174} x2={174} y2={174} strokeWidth={1.5} opacity={0.5} />

        {/* header divider */}
        <line x1={84} y1={188} x2={236} y2={188} opacity={0.35} />

        {/* bubble 1 — incoming, arrives first */}
        <g className="bubble-in" style={{ animationDelay: "0.3s" }}>
          <rect x={84} y={200} width={100} height={40} rx={12} />
          <line x1={96} y1={214} x2={168} y2={214} strokeWidth={1.5} />
          <line x1={96} y1={226} x2={148} y2={226} strokeWidth={1.5} opacity={0.6} />
        </g>

        {/* bubble 2 — outgoing, right */}
        <g className="bubble-in" style={{ animationDelay: "0.8s" }}>
          <rect x={136} y={252} width={100} height={40} rx={12} />
          <line x1={148} y1={266} x2={220} y2={266} strokeWidth={1.5} />
          <line x1={148} y1={278} x2={196} y2={278} strokeWidth={1.5} opacity={0.6} />
        </g>

        {/* bubble 3 — incoming, left */}
        <g className="bubble-in" style={{ animationDelay: "1.3s" }}>
          <rect x={84} y={304} width={88} height={28} rx={12} />
          <line x1={96} y1={318} x2={158} y2={318} strokeWidth={1.5} />
        </g>

        {/* bubble 4 — outgoing, right */}
        <g className="bubble-in" style={{ animationDelay: "1.8s" }}>
          <rect x={148} y={344} width={88} height={40} rx={12} />
          <line x1={160} y1={358} x2={222} y2={358} strokeWidth={1.5} />
          <line x1={160} y1={370} x2={200} y2={370} strokeWidth={1.5} opacity={0.6} />
        </g>

        {/* bubble 5 — the concierge is typing a reply (looping dots) */}
        <g className="bubble-in" style={{ animationDelay: "2.3s" }}>
          <rect x={84} y={396} width={72} height={28} rx={12} />
          <circle cx={104} cy={410} r={3} className="typing-dot fill-[color:var(--accent)]" style={{ animationDelay: "0s" }} />
          <circle cx={118} cy={410} r={3} className="typing-dot fill-[color:var(--accent)]" style={{ animationDelay: "0.2s" }} />
          <circle cx={132} cy={410} r={3} className="typing-dot fill-[color:var(--accent)]" style={{ animationDelay: "0.4s" }} />
        </g>

        {/* input bar */}
        <rect x={84} y={440} width={142} height={30} rx={15} />
        <line x1={98} y1={455} x2={160} y2={455} strokeWidth={1.5} opacity={0.4} />

        {/* home indicator */}
        <line x1={142} y1={480} x2={178} y2={480} strokeWidth={1.5} opacity={0.5} />
      </g>

      {/* gold hero lines */}
      <g
        className="stroke-[color:var(--accent)]"
        fill="none"
        strokeWidth={1}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* thin metallic rim of the phone */}
        <rect x={60} y={70} width={200} height={430} rx={36} strokeWidth={1.5} stroke="url(#goldFoil)" />

        {/* subtle gold ring around the avatar */}
        <circle cx={160} cy={130} r={18} opacity={0.8} />

        {/* signal arcs radiating from the presence node — breathing */}
        <path d="M179.9 139 A8 8 0 0 1 177 149.9" className="arc-pulse" />
        <path d="M184.3 136.5 A13 13 0 0 1 179.5 154.3" className="arc-pulse" style={{ animationDelay: "0.9s" }} />

        {/* send arrow */}
        <path d="M234 447 L248 455 L234 463 Z" />
      </g>

      {/* sensor nodes — live presence in gold */}
      <circle cx={173} cy={143} r={3.5} className="facet-node fill-[color:var(--accent)]" />
      <circle cx={284} cy={520} r={3} className="facet-node fill-[color:var(--accent)]" />
    </svg>
  );
}
