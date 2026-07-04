import { useTranslations } from "next-intl";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { ArrowRight, Check } from "lucide-react";
import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import {
  SEGMENT_KEYS,
  SEGMENT_SLUGS,
  segmentKeyFromSlug,
  type ServiceKey,
} from "@/lib/segments";
import { SERVICE_ICONS } from "@/lib/service-icons";
import { WhatsAppButton } from "@/components/layout/whatsapp-button";

type PageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    SEGMENT_KEYS.map((key) => ({ locale, slug: SEGMENT_SLUGS[key] }))
  );
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const key = segmentKeyFromSlug(slug);
  if (!key) return {};
  const t = await getTranslations({ locale, namespace: "segments" });
  return {
    title: t(`${key}.label`),
    description: t(`${key}.heroSubtitle`),
  };
}

export default async function SegmentPage({ params }: PageProps) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const key = segmentKeyFromSlug(slug);
  if (!key) notFound();

  return <SegmentContent segmentKey={key} />;
}

function SegmentContent({ segmentKey }: { segmentKey: (typeof SEGMENT_KEYS)[number] }) {
  const t = useTranslations("segments");
  const tServices = useTranslations("home.services");
  const tCommon = useTranslations("common");
  const solutions = t.raw(`${segmentKey}.solutions`) as ServiceKey[];
  const painPoints = t.raw(`${segmentKey}.painPoints`) as string[];

  return (
    <>
      <section className="bg-ink py-16 text-white md:py-24">
        <div className="container-hastek">
          <Link
            href="/"
            className="mb-6 inline-flex items-center gap-1 text-xs uppercase tracking-wide text-white/60 hover:text-accent"
          >
            {tCommon("backToSegments")}
          </Link>
          <span className="w-fit rounded-full border border-white/20 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-brand-soft">
            {t(`${segmentKey}.shortLabel`)}
          </span>
          <h1 className="mt-5 max-w-2xl text-3xl font-semibold leading-tight tracking-tight md:text-5xl">
            {t(`${segmentKey}.heroTitle`)}
          </h1>
          <p className="mt-4 max-w-xl text-lg text-white/75">
            {t(`${segmentKey}.heroSubtitle`)}
          </p>
        </div>
      </section>

      <section className="container-hastek grid gap-12 py-16 md:grid-cols-2 md:py-20">
        <div>
          <h2 className="text-xl font-semibold">
            {tCommon("readMore")}
          </h2>
          <ul className="mt-5 space-y-4">
            {painPoints.map((point) => (
              <li key={point} className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                {point}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold">{t("sectionTitle")}</h2>
          <ul className="mt-5 space-y-3">
            {solutions.map((serviceKey) => {
              const Icon = SERVICE_ICONS[serviceKey];
              return (
                <li
                  key={serviceKey}
                  className="flex items-center gap-3 rounded-xl border border-border bg-surface p-4"
                >
                  <Icon className="h-5 w-5 shrink-0 text-accent" />
                  <span className="text-sm font-medium">{tServices(serviceKey)}</span>
                  <Check className="ml-auto h-4 w-4 text-accent" />
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <section className="bg-surface-muted py-16">
        <div className="container-hastek flex flex-col items-start gap-6">
          <h2 className="max-w-lg text-2xl font-semibold tracking-tight md:text-3xl">
            {t(`${segmentKey}.cta`)}
          </h2>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/booking"
              className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-contrast transition-transform hover:scale-[1.02]"
            >
              {tCommon("bookNow")}
              <ArrowRight className="h-4 w-4" />
            </Link>
            <WhatsAppButton />
          </div>
        </div>
      </section>
    </>
  );
}
