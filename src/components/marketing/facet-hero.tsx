"use client";

import { useEffect, useRef } from "react";
import { renderEmphasis } from "@/lib/emphasis";
import { HeroDiamond } from "./hero-diamond";
import { Guilloche } from "@/components/ornament/guilloche";
import { SeljukStar } from "@/components/ornament/seljuk-star";
import { LiveClock } from "./live-clock";

type FacetHeroProps = {
  eyebrow: string;
  title: string;
  subtitle: string;
  primaryCta: React.ReactNode;
  secondaryCta: React.ReactNode;
  statusItems: string[];
  showConciergeSignal?: boolean;
  /** Optional scene illustration replacing the default facet-diamond mark. */
  visual?: React.ReactNode;
  /** Show the provided visual below the copy on small screens too. */
  visualOnMobile?: boolean;
};

export function FacetHero({
  eyebrow,
  title,
  subtitle,
  primaryCta,
  secondaryCta,
  statusItems,
  showConciergeSignal = true,
  visual,
  visualOnMobile = false,
}: FacetHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    function handleMove(event: MouseEvent) {
      const rect = el!.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 100;
      const y = ((event.clientY - rect.top) / rect.height) * 100;
      el!.style.setProperty("--x", `${x}%`);
      el!.style.setProperty("--y", `${y}%`);
      el!.style.setProperty("--specular-opacity", "1");
    }

    function handleLeave() {
      el!.style.setProperty("--specular-opacity", "0");
    }

    el.addEventListener("mousemove", handleMove);
    el.addEventListener("mouseleave", handleLeave);
    return () => {
      el.removeEventListener("mousemove", handleMove);
      el.removeEventListener("mouseleave", handleLeave);
    };
  }, []);

  return (
    <section
      ref={containerRef}
      style={{ ["--x" as string]: "50%", ["--y" as string]: "30%", ["--specular-opacity" as string]: "0" }}
      className="relative overflow-hidden bg-background"
    >
      {/* Base layer: slow ambient mesh */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-70 [background:radial-gradient(55%_45%_at_15%_10%,color-mix(in_srgb,var(--accent)_14%,transparent),transparent),radial-gradient(45%_40%_at_90%_85%,color-mix(in_srgb,var(--accent)_10%,transparent),transparent)]"
      />

      {/* Guilloche watermark behind the mark (Turkish engine-turned texture) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[-6rem] top-1/2 hidden h-[42rem] w-[42rem] -translate-y-1/2 text-accent opacity-[0.06] [mask-image:radial-gradient(closest-side,black,transparent)] md:block"
      >
        <Guilloche className="ornament-spin" />
      </div>

      {/* Cursor specular highlight over the facet mark */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 transition-opacity duration-300"
        style={{
          opacity: "var(--specular-opacity)",
          background:
            "radial-gradient(280px circle at var(--x) var(--y), color-mix(in srgb, var(--gold-hi) 34%, transparent), transparent 70%)",
        }}
      />

      <div className="container-hastek relative grid gap-10 py-20 md:grid-cols-2 md:py-28 lg:py-32">
        <div className="relative z-10 flex flex-col gap-6">
          <span className="flex w-fit items-center gap-2 rounded-full border border-[color:var(--border-gold)] px-4 py-1.5 font-mono text-[0.7rem] uppercase tracking-[0.18em] text-accent-text-safe dark:text-accent">
            <SeljukStar className="h-3.5 w-3.5" />
            {eyebrow}
          </span>
          <h1 className="font-display max-w-xl text-4xl font-semibold leading-[1.12] tracking-tight md:text-6xl">
            {renderEmphasis(title)}
          </h1>
          <p className="max-w-lg text-base leading-relaxed text-muted-foreground md:text-lg">{subtitle}</p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            {primaryCta}
            {secondaryCta}
          </div>

          {showConciergeSignal ? (
            <div className="flex items-center gap-2 pt-1">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[color:var(--signal-live)] opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[color:var(--signal-live)]" />
              </span>
              <span className="text-xs text-muted-foreground">KI-Concierge · jetzt erreichbar</span>
            </div>
          ) : null}

          <div className="mt-2 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-border pt-5 font-mono text-[0.7rem] uppercase tracking-[0.08em] text-muted-foreground">
            {statusItems.map((item) => (
              <span key={item}>{item}</span>
            ))}
            <LiveClock />
          </div>
        </div>

        {/* The mark: scene illustration if provided, else the faceted gem */}
        <div
          className={
            visual && visualOnMobile
              ? "relative flex items-center justify-center"
              : "relative hidden items-center justify-center md:flex"
          }
          aria-hidden="true"
        >
          {visual ?? (
            <div className="relative flex h-full max-h-[28rem] w-full max-w-[28rem] items-center justify-center">
              {/* rotating gold caustic behind the stone */}
              <div
                className="ornament-spin pointer-events-none absolute inset-8 rounded-full opacity-60"
                style={{
                  background:
                    "conic-gradient(from 0deg, transparent, color-mix(in srgb, var(--gold-hi) 30%, transparent), transparent 55%, color-mix(in srgb, var(--gold-hi) 22%, transparent), transparent)",
                  mask: "radial-gradient(closest-side, transparent 52%, black 60%, transparent 82%)",
                  WebkitMask: "radial-gradient(closest-side, transparent 52%, black 60%, transparent 82%)",
                }}
              />
              <HeroDiamond className="hero-float relative h-[26rem] w-[26rem] text-accent" />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
