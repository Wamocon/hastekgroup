import { useTranslations } from "next-intl";
import { ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { SEGMENT_KEYS, SEGMENT_SLUGS } from "@/lib/segments";
import { getAidasLoveContent } from "@/lib/aidaslove-content";
import { SEGMENT_SCENES } from "@/lib/segment-scenes";
import { SeljukStar } from "@/components/ornament/seljuk-star";
import { Reveal } from "@/components/ui/reveal";

export function SegmentBentoGrid({ locale }: { locale: string }) {
  const tSegments = useTranslations("segments");

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {SEGMENT_KEYS.map((key, index) => {
        const slug = SEGMENT_SLUGS[key];
        const content = getAidasLoveContent(locale, slug);
        const Scene = SEGMENT_SCENES[slug];
        const isFeature = index === 0;
        return (
          <Reveal key={key} className={isFeature ? "sm:col-span-2 lg:col-span-2" : ""}>
            <Link
              href={`/segments/${slug}`}
              className={`group card-elevated border-gold-metallic relative flex h-full flex-col overflow-hidden rounded-2xl`}
            >
              <SeljukStar
                className="pointer-events-none absolute right-3 top-3 z-10 h-9 w-9 text-accent opacity-[0.35] transition-opacity group-hover:opacity-60"
              />
              {Scene ? (
                <div
                  aria-hidden="true"
                  className={`relative flex items-center justify-center overflow-hidden border-b border-[color:var(--border-gold)] bg-surface-muted/60 px-5 py-3 [&>svg]:h-full [&>svg]:w-auto [&>svg]:max-w-full ${
                    isFeature ? "h-48 md:h-60" : "h-40"
                  }`}
                >
                  <Scene className="opacity-80 transition-opacity group-hover:opacity-100" />
                </div>
              ) : null}
              <div className={`flex flex-1 flex-col justify-between p-6 ${isFeature ? "lg:p-8" : ""}`}>
                <div>
                  <span className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-muted-foreground">
                    {tSegments(`${key}.shortLabel`)}
                  </span>
                  <h3
                    className={`font-display mt-2 font-semibold leading-snug ${
                      isFeature ? "text-2xl md:text-3xl" : "text-lg"
                    }`}
                  >
                    {content.heroTitle.replace(/\*/g, "")}
                  </h3>
                </div>
                <span className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-accent-text-safe dark:text-accent">
                  {content.ctaPrimary}
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </div>
            </Link>
          </Reveal>
        );
      })}
    </div>
  );
}
