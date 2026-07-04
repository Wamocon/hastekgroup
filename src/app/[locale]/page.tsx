import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { SERVICE_KEYS, SEGMENT_KEYS, SEGMENT_SLUGS } from "@/lib/segments";
import { SERVICE_ICONS } from "@/lib/service-icons";
import { WhatsAppButton } from "@/components/layout/whatsapp-button";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export default async function HomePage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <HomeContent />;
}

function HomeContent() {
  const t = useTranslations("home");
  const tCommon = useTranslations("common");
  const tServices = useTranslations("home.services");
  const tSegments = useTranslations("segments");

  return (
    <>
      {/* Attention */}
      <section className="relative overflow-hidden bg-ink text-white">
        <div className="pointer-events-none absolute inset-0 opacity-40 [background:radial-gradient(60%_50%_at_80%_0%,rgba(185,151,91,0.25),transparent)]" />
        <div className="container-hastek relative flex flex-col gap-8 py-20 md:py-28">
          <span className="w-fit rounded-full border border-white/20 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-brand-soft">
            {t("hero.eyebrow")}
          </span>
          <h1 className="max-w-3xl text-4xl font-semibold leading-[1.1] tracking-tight md:text-6xl">
            {t("hero.title")}
          </h1>
          <p className="max-w-xl text-lg leading-relaxed text-white/75">
            {t("hero.subtitle")}
          </p>
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link
              href="/booking"
              className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-contrast transition-transform hover:scale-[1.02]"
            >
              {t("hero.primaryCta")}
              <ArrowRight className="h-4 w-4" />
            </Link>
            <WhatsAppButton label={t("hero.secondaryCta")} />
          </div>
        </div>
      </section>

      {/* Trust bar */}
      <section className="border-b border-border bg-surface-muted">
        <div className="container-hastek grid grid-cols-2 gap-6 py-8 text-sm text-muted-foreground md:grid-cols-4">
          <p>{t("trustBar.founded")}</p>
          <p>{t("trustBar.segments")}</p>
          <p>{t("trustBar.local")}</p>
          <p>{t("trustBar.languages")}</p>
        </div>
      </section>

      {/* Interest */}
      <section className="container-hastek py-20">
        <span className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
          {t("interest.eyebrow")}
        </span>
        <h2 className="mt-3 max-w-2xl text-3xl font-semibold tracking-tight md:text-4xl">
          {t("interest.title")}
        </h2>
        <p className="mt-3 max-w-2xl text-muted-foreground">{t("interest.subtitle")}</p>

        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {SERVICE_KEYS.map((key) => {
            const Icon = SERVICE_ICONS[key];
            return (
              <div
                key={key}
                className="flex items-start gap-3 rounded-2xl border border-border bg-surface p-4"
              >
                <Icon className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                <span className="text-sm font-medium leading-snug">{tServices(key)}</span>
              </div>
            );
          })}
        </div>
      </section>

      {/* Desire */}
      <section className="bg-surface-muted py-20">
        <div className="container-hastek">
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
            {t("desire.eyebrow")}
          </span>
          <h2 className="mt-3 max-w-2xl text-3xl font-semibold tracking-tight md:text-4xl">
            {t("desire.title")}
          </h2>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {t.raw("desire.items").map((item: { title: string; body: string }) => (
              <div key={item.title} className="rounded-2xl border border-border bg-surface p-6">
                <h3 className="font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Action: segments */}
      <section className="container-hastek py-20">
        <span className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
          {t("segmentsCta.eyebrow")}
        </span>
        <h2 className="mt-3 max-w-2xl text-3xl font-semibold tracking-tight md:text-4xl">
          {t("segmentsCta.title")}
        </h2>
        <p className="mt-3 max-w-2xl text-muted-foreground">{t("segmentsCta.subtitle")}</p>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SEGMENT_KEYS.map((key) => (
            <Link
              key={key}
              href={`/segments/${SEGMENT_SLUGS[key]}`}
              className="group flex flex-col justify-between rounded-2xl border border-border bg-surface p-6 transition-colors hover:border-accent"
            >
              <div>
                <h3 className="font-semibold">{tSegments(`${key}.shortLabel`)}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {tSegments(`${key}.heroSubtitle`)}
                </p>
              </div>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-accent">
                {tCommon("learnMore")}
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Love/Share */}
      <section className="bg-surface-muted py-20">
        <div className="container-hastek">
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
            {t("loveShare.eyebrow")}
          </span>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
            {t("loveShare.title")}
          </h2>
          <p className="mt-3 max-w-2xl text-sm text-muted-foreground">{t("loveShare.demoNotice")}</p>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {t.raw("loveShare.quotes").map((item: { quote: string; author: string }) => (
              <blockquote key={item.author} className="rounded-2xl border border-border bg-surface p-6">
                <p className="text-lg leading-relaxed">&ldquo;{item.quote}&rdquo;</p>
                <footer className="mt-4 text-sm text-muted-foreground">{item.author}</footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* Final action */}
      <section className="bg-ink py-20 text-white">
        <div className="container-hastek flex flex-col items-start gap-6">
          <h2 className="max-w-xl text-3xl font-semibold tracking-tight md:text-4xl">
            {t("finalCta.title")}
          </h2>
          <p className="max-w-xl text-white/75">{t("finalCta.subtitle")}</p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/booking"
              className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-contrast transition-transform hover:scale-[1.02]"
            >
              {t("finalCta.primary")}
              <ArrowRight className="h-4 w-4" />
            </Link>
            <WhatsAppButton label={t("finalCta.secondary")} />
          </div>
        </div>
      </section>
    </>
  );
}
