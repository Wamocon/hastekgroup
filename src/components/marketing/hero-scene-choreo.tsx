"use client";

import { useScrollProgress } from "@/lib/use-scroll-progress";
import { HeroNightScene } from "./hero-night-scene";

/**
 * Wraps the hero night scene with a scroll-driven choreography: as the visitor
 * scrolls the hero into view a nightfall veil deepens and an "armed" status
 * pill settles in — the property visibly transitions into its protected,
 * automated evening state. All motion is CSS reading the --scene-progress var
 * set by useScrollProgress, and degrades to a calm fixed state under
 * prefers-reduced-motion.
 */
export function HeroSceneChoreo({
  className,
  armedLabel,
}: {
  className?: string;
  armedLabel: string;
}) {
  const ref = useScrollProgress<HTMLDivElement>();

  return (
    <div ref={ref} className={"scene-choreo relative " + (className ?? "")}>
      <HeroNightScene />
      <div aria-hidden="true" className="scene-nightfall" />
      <div className="scene-armed pointer-events-none absolute right-3 top-3 flex items-center gap-2 rounded-full border border-[color:var(--border-gold)] bg-[color:var(--obsidian)]/70 px-3 py-1.5 backdrop-blur-sm">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[color:var(--signal-live)] opacity-60" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-[color:var(--signal-live)]" />
        </span>
        <span className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-white/90">
          {armedLabel}
        </span>
      </div>
    </div>
  );
}
