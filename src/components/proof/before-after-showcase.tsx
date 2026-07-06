"use client";

import { useTranslations } from "next-intl";
import { MoveHorizontal } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { SeljukStar } from "@/components/ornament/seljuk-star";
import { BeforeAfterSlider } from "./before-after-slider";
import {
  SceneVillaBefore,
  SceneVillaAfter,
  SceneStoreBefore,
  SceneStoreAfter,
} from "./proof-scenes";

type PairKey = "villa" | "storefront";

const PAIRS: Record<
  PairKey,
  {
    Before: React.ComponentType<{ className?: string }>;
    After: React.ComponentType<{ className?: string }>;
    captionKey: "villaCaption" | "storeCaption";
  }
> = {
  villa: { Before: SceneVillaBefore, After: SceneVillaAfter, captionKey: "villaCaption" },
  storefront: { Before: SceneStoreBefore, After: SceneStoreAfter, captionKey: "storeCaption" },
};

type BeforeAfterShowcaseProps = {
  /** Which illustration pair to reveal. Defaults to the villa. */
  pair?: PairKey;
  className?: string;
};

export function BeforeAfterShowcase({ pair = "villa", className }: BeforeAfterShowcaseProps) {
  const t = useTranslations("proof");
  const { Before, After, captionKey } = PAIRS[pair];

  return (
    <section className={"bg-background py-20 " + (className ?? "")}>
      <div className="container-hastek">
        <Reveal className="max-w-2xl">
          <span className="font-mono text-xs uppercase tracking-[0.18em] text-accent-text-safe">
            {t("eyebrow")}
          </span>
          <h2 className="text-gold-metallic font-display mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
            {t("title")}
          </h2>
          <p className="mt-3 text-muted-foreground">{t("subtitle")}</p>
        </Reveal>

        <Reveal className="mt-10">
          <figure className="panel-obsidian border-gold-metallic--obsidian relative overflow-hidden rounded-2xl">
            <SeljukStar className="pointer-events-none absolute left-4 top-4 z-10 h-8 w-8 text-accent opacity-[0.3]" />
            <span className="pointer-events-none absolute right-4 top-4 z-10 rounded-full border border-[color:var(--border-gold)] bg-black/40 px-2.5 py-1 font-mono text-[0.6rem] uppercase tracking-[0.14em] text-accent">
              {t("exampleBadge")}
            </span>

            <BeforeAfterSlider
              before={<Before />}
              after={<After />}
              beforeLabel={t("beforeLabel")}
              afterLabel={t("afterLabel")}
              ariaLabel={t("ariaLabel")}
            />

            <figcaption className="flex flex-col gap-3 border-t border-[color:var(--obsidian-line)] px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-white/70">{t(captionKey)}</p>
              <span className="inline-flex items-center gap-1.5 font-mono text-[0.65rem] uppercase tracking-[0.14em] text-accent">
                <MoveHorizontal className="h-3.5 w-3.5" />
                {t("dragHint")}
              </span>
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </section>
  );
}
