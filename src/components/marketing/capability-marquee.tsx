import { LiveClock } from "./live-clock";

type CapabilityMarqueeProps = {
  items: string[];
};

export function CapabilityMarquee({ items }: CapabilityMarqueeProps) {
  const doubled = [...items, ...items];

  return (
    <div className="flex items-center gap-6 border-y border-border bg-surface-muted py-3">
      <div className="container-hastek flex items-center gap-6">
        <div className="hidden shrink-0 md:block">
          <LiveClock />
        </div>
        <div className="flex-1 overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)]">
          <div className="marquee-track">
            {doubled.map((item, index) => (
              <span
                key={`${item}-${index}`}
                className="mx-4 shrink-0 font-mono text-xs uppercase tracking-[0.1em] text-muted-foreground"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
