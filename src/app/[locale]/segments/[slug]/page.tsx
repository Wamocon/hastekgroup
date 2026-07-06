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
import { getAidasLoveContent } from "@/lib/aidaslove-content";
import { SEGMENT_SCENES } from "@/lib/segment-scenes";
import { FacetHero } from "@/components/marketing/facet-hero";
import { AidasLoveSections } from "@/components/content/aidaslove-sections";
import { BeforeAfterShowcase } from "@/components/proof/before-after-showcase";
import { ServiceSchema } from "@/components/seo/service-schema";
import { Reveal } from "@/components/ui/reveal";

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
  const content = getAidasLoveContent(locale, slug);
  return {
    title: t(`${key}.label`),
    description: content.heroSubtitle,
  };
}

export default async function SegmentPage({ params }: PageProps) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const key = segmentKeyFromSlug(slug);
  if (!key) notFound();

  return <SegmentContent segmentKey={key} slug={slug} locale={locale} />;
}

function SegmentContent({
  segmentKey,
  slug,
  locale,
}: {
  segmentKey: (typeof SEGMENT_KEYS)[number];
  slug: string;
  locale: string;
}) {
  const t = useTranslations("segments");
  const tServices = useTranslations("home.services");
  const tCommon = useTranslations("common");
  const solutions = t.raw(`${segmentKey}.solutions`) as ServiceKey[];
  const content = getAidasLoveContent(locale, slug);
  const Scene = SEGMENT_SCENES[slug];
  const proofPair = segmentKey === "retail" || segmentKey === "gastronomy" ? "storefront" : "villa";

  return (
    <>
      <ServiceSchema locale={locale} segmentKey={segmentKey} />
      <FacetHero
        eyebrow={content.heroEyebrow}
        title={content.heroTitle}
        subtitle={content.heroSubtitle}
        statusItems={[t(`${segmentKey}.shortLabel`)]}
        showConciergeSignal={false}
        visual={Scene ? <Scene className="max-h-[26rem] max-w-[32rem]" /> : undefined}
        primaryCta={
          <Link href="/booking" className="btn-primary">
            {content.ctaPrimary}
            <ArrowRight className="h-4 w-4" />
          </Link>
        }
        secondaryCta={<WhatsAppButton className="btn-secondary" label={content.ctaSecondary} />}
      />

      <section className="container-hastek py-14">
        <Reveal>
          <h2 className="font-display text-xl font-semibold">{t("sectionTitle")}</h2>
        </Reveal>
        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {solutions.map((serviceKey) => {
            const Icon = SERVICE_ICONS[serviceKey];
            return (
              <div
                key={serviceKey}
                className="flex items-center gap-3 rounded-xl border border-border bg-surface p-4"
              >
                <Icon className="h-5 w-5 shrink-0 text-accent" />
                <span className="text-sm font-medium">{tServices(serviceKey)}</span>
                <Check className="ml-auto h-4 w-4 text-accent" />
              </div>
            );
          })}
        </div>
      </section>

      <AidasLoveSections sections={content.sections} />

      <BeforeAfterShowcase pair={proofPair} />

      <section className="bg-[color:var(--obsidian)] py-16 text-white">
        <div className="container-hastek flex flex-col items-start gap-6">
          <h2 className="font-display max-w-lg text-2xl font-semibold tracking-tight md:text-3xl">
            {content.ctaPrimary}
          </h2>
          <div className="flex flex-wrap gap-4">
            <Link href="/booking" className="btn-primary">
              {tCommon("bookNow")}
              <ArrowRight className="h-4 w-4" />
            </Link>
            <WhatsAppButton className="btn-secondary !border-[color:var(--border-gold)] !text-accent" />
          </div>
        </div>
      </section>
    </>
  );
}
