"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { InstagramGlyph } from "@/components/brand/instagram-glyph";
import { SEGMENT_KEYS, SEGMENT_SLUGS } from "@/lib/segments";
import { SEGMENT_SCENES } from "@/lib/segment-scenes";
import { instagramHref, siteConfig } from "@/lib/site-config";
import { Reveal } from "@/components/ui/reveal";

/**
 * Instagram integration (WAMOCON premium package feature). The account handle
 * is pending client confirmation (see site-config), so - like the WhatsApp CTA -
 * this renders the finished integration UI in a clearly-labelled "activates
 * after confirmation" state using the site's own illustrations as placeholder
 * tiles, rather than linking to an unverified account or fabricating posts.
 */
export function InstagramFeed() {
  const t = useTranslations("instagram");
  const href = instagramHref();
  // Do NOT fabricate a handle: instagramHandle is null until the client
  // confirms account ownership. Show the concrete handle only when it is set.
  const handle = siteConfig.instagramHandle;
  const [showNotice, setShowNotice] = useState(false);

  const tiles = SEGMENT_KEYS.slice(0, 6);

  return (
    <section className="container-hastek py-16 md:py-20">
      <Reveal className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
        <div>
          <span className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-accent-text-safe dark:text-accent">
            <InstagramGlyph className="h-4 w-4" />
            {t("eyebrow")}
          </span>
          <h2 className="font-display mt-3 max-w-xl text-2xl font-semibold tracking-tight md:text-3xl">
            {t("title")}
          </h2>
          <p className="mt-2 max-w-lg text-sm text-muted-foreground">{t("subtitle")}</p>
        </div>

        <div className="relative">
          {href && handle ? (
            <a href={href} target="_blank" rel="noopener noreferrer" className="btn-secondary">
              <InstagramGlyph className="h-4 w-4" />
              {t("follow", { handle })}
            </a>
          ) : (
            <button type="button" onClick={() => setShowNotice((v) => !v)} className="btn-secondary">
              <InstagramGlyph className="h-4 w-4" />
              {t("followGeneric")}
            </button>
          )}
          {showNotice ? (
            <span className="absolute right-0 top-full z-20 mt-2 w-72 rounded-lg border border-border bg-surface p-3 text-xs text-muted-foreground shadow-lg">
              {t("pendingNotice")}
            </span>
          ) : null}
        </div>
      </Reveal>

      <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {tiles.map((key) => {
          const Scene = SEGMENT_SCENES[SEGMENT_SLUGS[key]];
          return (
            <Reveal key={key}>
              <div className="card-elevated border-gold-metallic group relative flex aspect-square items-end justify-center overflow-hidden rounded-xl bg-surface-muted/60">
                <span className="absolute right-2 top-2 z-10 text-accent/70">
                  <InstagramGlyph className="h-3.5 w-3.5" />
                </span>
                {Scene ? (
                  <Scene className="h-[150%] w-auto max-w-none text-foreground/55 opacity-75 transition-opacity group-hover:opacity-100" />
                ) : null}
                <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/50 to-transparent px-2 pb-1.5 pt-6 text-center font-mono text-[0.5rem] uppercase tracking-wide text-white/80">
                  {t("exampleBadge")}
                </span>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
