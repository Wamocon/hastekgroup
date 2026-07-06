import { getTranslations } from "next-intl/server";

type AiSummaryProps = {
  locale: string;
};

export async function AiSummary({ locale }: AiSummaryProps) {
  const t = await getTranslations({ locale, namespace: "geo" });

  return (
    <section className="border-y border-border bg-surface-muted">
      <div className="container-hastek py-10 md:py-12">
        <div className="max-w-3xl">
          <h2 className="font-display text-xs font-semibold uppercase tracking-[0.22em] text-accent-text-safe">
            {t("summaryTitle")}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground md:text-base">
            {t("summaryBody")}
          </p>
        </div>
      </div>
    </section>
  );
}
