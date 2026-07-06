import type { AidasLoveSection } from "@/lib/aidaslove-content";
import { Reveal } from "@/components/ui/reveal";
import { SeljukStar } from "@/components/ornament/seljuk-star";
import { OrnamentDivider } from "@/components/ornament/section-divider";

type AidasLoveSectionsProps = {
  sections: AidasLoveSection[];
  /** Absolute index of the first section, so ghost numerals stay continuous. */
  startIndex?: number;
};

export function AidasLoveSections({ sections, startIndex = 0 }: AidasLoveSectionsProps) {
  return (
    <div>
      {sections.map((section, i) => {
        const stageNumber = startIndex + i + 1;
        const flip = stageNumber % 2 === 0;
        return (
          <div key={section.heading}>
            {i > 0 ? (
              <div className="container-hastek">
                <OrnamentDivider className="mx-auto max-w-md text-accent opacity-70" />
              </div>
            ) : null}
            <Reveal className="py-10 md:py-14">
              <div className="container-hastek">
                <div
                  className={`relative grid items-start gap-4 md:grid-cols-[12rem_1fr] md:gap-12 ${
                    flip ? "md:[&>*:first-child]:order-2" : ""
                  }`}
                >
                  {/* ghost numeral behind the text */}
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute -top-6 select-none font-display text-[7rem] font-semibold leading-none text-accent-text-safe/25 dark:text-accent/30 md:text-[9rem]"
                    style={flip ? { right: 0 } : { left: 0 }}
                  >
                    {String(stageNumber).padStart(2, "0")}
                  </span>

                  <div className={`flex items-center gap-3 md:flex-col md:items-start md:gap-2 ${flip ? "md:items-end md:text-right" : ""}`}>
                    <SeljukStar className="h-6 w-6 shrink-0 text-accent" />
                    <span className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-accent-text-safe dark:text-accent">
                      {section.stage}
                    </span>
                  </div>

                  <div className="relative z-10 max-w-2xl">
                    <h3 className="font-display text-xl font-semibold md:text-2xl">{section.heading}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground md:text-base">
                      {section.body}
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        );
      })}
    </div>
  );
}
