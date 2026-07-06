export function OrnamentDivider({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 400 24"
      fill="none"
      stroke="currentColor"
      className={"h-auto w-full " + (className ?? "")}
    >
      {/* thin centered horizontal rules, tapering toward the central motif */}
      <g strokeWidth={1} strokeLinecap="round" opacity={0.55}>
        <path d="M 24 12 H 170" />
        <path d="M 230 12 H 376" />
      </g>

      {/* elite end serifs */}
      <g strokeWidth={1} strokeLinecap="round" opacity={0.4}>
        <path d="M 24 8 V 16" />
        <path d="M 376 8 V 16" />
      </g>

      {/* small flanking diamonds framing the rosette */}
      <g strokeWidth={1} strokeLinejoin="round" opacity={0.7}>
        <path d="M 178 12 L 182 8 L 186 12 L 182 16 Z" />
        <path d="M 214 12 L 218 8 L 222 12 L 218 16 Z" />
      </g>

      {/* central diamond/rosette motif echoing the brand logo geometry */}
      <g strokeWidth={1.25} strokeLinejoin="round">
        {/* outer diamond */}
        <path d="M 200 1 L 213 12 L 200 23 L 187 12 Z" />
        {/* inner diamond */}
        <path d="M 200 6 L 208 12 L 200 18 L 192 12 Z" />
        {/* rosette accent points on the horizontal axis */}
        <path d="M 187 12 H 213" opacity={0.5} />
      </g>

      {/* tiny solid center node */}
      <path
        d="M 200 9 L 203 12 L 200 15 L 197 12 Z"
        stroke="none"
        fill="currentColor"
      />
    </svg>
  );
}
