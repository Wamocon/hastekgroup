"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

type BeforeAfterSliderProps = {
  before: React.ReactNode;
  after: React.ReactNode;
  beforeLabel: string;
  afterLabel: string;
  ariaLabel: string;
};

/**
 * Drag-to-reveal comparison control. The "before" layer fills the frame; the
 * "after" layer is clipped to the left of the handle via the --ba-pos CSS var.
 * A transparent range input drives the position and is fully keyboard- and
 * touch-accessible; the .ba-divider / .ba-knob visuals read --ba-pos too.
 */
export function BeforeAfterSlider({
  before,
  after,
  beforeLabel,
  afterLabel,
  ariaLabel,
}: BeforeAfterSliderProps) {
  const [pos, setPos] = useState(50);

  return (
    <div
      className="group relative aspect-[4/3] w-full select-none overflow-hidden bg-[color:var(--obsidian)]"
      style={{ "--ba-pos": `${pos}%` } as React.CSSProperties}
    >
      {/* Before — base layer (unsecured / unlit) */}
      <div className="absolute inset-0 text-white/30">
        {before}
        <span className="absolute bottom-3 right-3 rounded-full border border-white/20 bg-black/40 px-2.5 py-1 font-mono text-[0.6rem] uppercase tracking-[0.14em] text-white/70">
          {beforeLabel}
        </span>
      </div>

      {/* After — clipped overlay (secured & automated) */}
      <div
        className="absolute inset-0 text-white/65"
        style={{ clipPath: "inset(0 calc(100% - var(--ba-pos)) 0 0)" }}
      >
        {/* subtle warm glow to sell the "protected" state */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-70 [background:radial-gradient(120%_90%_at_35%_30%,var(--accent-soft),transparent_60%)]"
        />
        {after}
        <span className="absolute bottom-3 left-3 rounded-full border border-[color:var(--border-gold)] bg-black/40 px-2.5 py-1 font-mono text-[0.6rem] uppercase tracking-[0.14em] text-accent">
          {afterLabel}
        </span>
      </div>

      {/* Divider + knob (positioned by CSS via --ba-pos) */}
      <div aria-hidden="true" className="ba-divider" />
      <div
        aria-hidden="true"
        className="ba-knob transition-shadow group-focus-within:ring-2 group-focus-within:ring-[color:var(--accent)]"
      >
        <ChevronLeft className="h-3.5 w-3.5 -mr-0.5" />
        <ChevronRight className="h-3.5 w-3.5 -ml-0.5" />
      </div>

      {/* Transparent control on top — handles pointer, touch and keyboard */}
      <input
        type="range"
        min={0}
        max={100}
        value={pos}
        onChange={(event) => setPos(Number(event.target.value))}
        className="ba-range"
        aria-label={ariaLabel}
      />
    </div>
  );
}
