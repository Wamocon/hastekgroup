"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { X, ZoomIn } from "lucide-react";
import { GALLERY_ITEMS, GALLERY_CATEGORIES, type GalleryCategory, type GalleryItem } from "@/lib/gallery";
import { GalleryVisual } from "./gallery-visual";
import { SeljukStar } from "@/components/ornament/seljuk-star";
import { Reveal } from "@/components/ui/reveal";

type Filter = "all" | GalleryCategory;

export function GalleryView() {
  const t = useTranslations("gallery");
  const tSegments = useTranslations("segments");
  const [filter, setFilter] = useState<Filter>("all");
  const [active, setActive] = useState<GalleryItem | null>(null);

  const items = filter === "all" ? GALLERY_ITEMS : GALLERY_ITEMS.filter((item) => item.category === filter);

  const categoryLabel = (category: GalleryCategory) =>
    category === "systems" ? t("categorySystems") : tSegments(`${category}.shortLabel`);

  return (
    <>
      {/* Filter bar */}
      <div className="flex flex-wrap gap-2">
        <FilterChip active={filter === "all"} onClick={() => setFilter("all")}>
          {t("filterAll")}
        </FilterChip>
        {GALLERY_CATEGORIES.map((category) => (
          <FilterChip key={category} active={filter === category} onClick={() => setFilter(category)}>
            {categoryLabel(category)}
          </FilterChip>
        ))}
      </div>

      {/* Grid */}
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <Reveal key={item.id}>
            <button
              type="button"
              onClick={() => setActive(item)}
              className="group card-elevated border-gold-metallic relative flex aspect-[4/3] w-full items-end justify-center overflow-hidden rounded-2xl bg-surface-muted/60"
            >
              <SeljukStar className="pointer-events-none absolute right-3 top-3 z-10 h-8 w-8 text-accent opacity-[0.35]" />
              <GalleryVisual
                item={item}
                className="h-[135%] w-auto max-w-none text-foreground/60 opacity-80 transition-opacity group-hover:opacity-100"
              />
              <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-2 bg-gradient-to-t from-black/55 to-transparent px-4 pb-3 pt-8 text-left">
                <span className="font-mono text-[0.6rem] uppercase tracking-[0.14em] text-white/90">
                  {categoryLabel(item.category)}
                </span>
                <span className="flex items-center gap-1 text-[0.6rem] font-medium uppercase tracking-wide text-accent">
                  <ZoomIn className="h-3 w-3" />
                  {t("exampleBadge")}
                </span>
              </div>
            </button>
          </Reveal>
        ))}
      </div>

      {/* Lightbox */}
      {active ? (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          onClick={() => setActive(null)}
        >
          <div
            className="panel-obsidian border-gold-metallic--obsidian relative w-full max-w-3xl overflow-hidden rounded-2xl p-6 md:p-10"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setActive(null)}
              aria-label={t("close")}
              className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-[color:var(--border-gold)] text-accent hover:bg-white/5"
            >
              <X className="h-4 w-4" />
            </button>
            <div className="flex items-center justify-center">
              <GalleryVisual item={active} className="max-h-[60vh] w-auto max-w-full text-accent" />
            </div>
            <div className="mt-6 flex items-center justify-between border-t border-[color:var(--obsidian-line)] pt-4">
              <span className="font-display text-lg text-white">{categoryLabel(active.category)}</span>
              <span className="font-mono text-[0.6rem] uppercase tracking-[0.14em] text-white/50">
                {t("exampleBadge")}
              </span>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full border px-4 py-2 text-xs font-medium transition-colors ${
        active
          ? "border-transparent bg-accent text-accent-contrast"
          : "border-[color:var(--border-gold)] text-foreground/75 hover:text-accent"
      }`}
    >
      {children}
    </button>
  );
}
