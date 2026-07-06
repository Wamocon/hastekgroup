import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { getAidasLoveContent } from "@/lib/aidaslove-content";
import { WhatsAppButton } from "@/components/layout/whatsapp-button";
import { FacetHero } from "@/components/marketing/facet-hero";
import { HeroSceneChoreo } from "@/components/marketing/hero-scene-choreo";
import { CapabilityMarquee } from "@/components/marketing/capability-marquee";
import { AidasLoveSections } from "@/components/content/aidaslove-sections";
import { SegmentBentoGrid } from "@/components/content/segment-bento-grid";
import { ConciergeSpotlight } from "@/components/content/concierge-spotlight";
import { InstagramFeed } from "@/components/marketing/instagram-feed";
import { BeforeAfterShowcase } from "@/components/proof/before-after-showcase";
import { AiSummary } from "@/components/seo/ai-summary";
import { MockupDashboard } from "@/components/illustrations/mockup-dashboard";
import { Guilloche } from "@/components/ornament/guilloche";
import { SeljukStar } from "@/components/ornament/seljuk-star";
import { Reveal } from "@/components/ui/reveal";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export default async function HomePage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <HomeContent locale={locale} />;
}

function HomeContent({ locale }: { locale: string }) {
  const tCommon = useTranslations("common");
  const tHome = useTranslations("home");
  const tCfg = useTranslations("configurator");
  const tShow = useTranslations("showroom");
  const tPortal = useTranslations("portal");
  const tGallery = useTranslations("gallery");
  const home = getAidasLoveContent(locale, "home");
  const spotlight = getAidasLoveContent(locale, "ai-whatsapp-spotlight");

  return (
    <>
      <FacetHero
        eyebrow={home.heroEyebrow}
        title={home.heroTitle}
        subtitle={home.heroSubtitle}
        statusItems={["SEIT 2017 IN ALANYA", "TR · EN · RU · DE", "6 EINSATZBEREICHE"]}
        visual={<HeroSceneChoreo className="max-w-[46rem] md:w-[112%] md:max-w-none" armedLabel={tHome("hero.armed")} />}
        visualOnMobile
        primaryCta={
          <Link href="/booking" className="btn-primary">
            {home.ctaPrimary}
            <ArrowRight className="h-4 w-4" />
          </Link>
        }
        secondaryCta={<WhatsAppButton className="btn-secondary" label={home.ctaSecondary} />}
      />

      <CapabilityMarquee
        items={["SEIT 2017 IN ALANYA", "TR · EN · RU · DE", "6 EINSATZBEREICHE", "11 SYSTEME", "ALANYA · ANTALYA"]}
      />

      <AidasLoveSections sections={home.sections.slice(0, 4)} />

      <BeforeAfterShowcase pair="villa" />

      <section className="border-y border-border bg-surface py-14">
        <div className="container-hastek flex flex-col items-center gap-3">
          <Reveal className="w-full max-w-3xl">
            <div className="card-elevated border-gold-metallic rounded-2xl p-4 md:p-6">
              <MockupDashboard className="text-foreground/60" />
            </div>
          </Reveal>
          <span className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-muted-foreground">
            {tGallery("exampleBadge")}
          </span>
        </div>
      </section>

      <section className="bg-surface-muted py-16 md:py-20">
        <div className="container-hastek">
          <Reveal>
            <span className="font-mono text-xs uppercase tracking-[0.14em] text-accent-text-safe dark:text-accent">
              {tCommon("readMore")}
            </span>
            <h2 className="font-display mt-2 max-w-2xl text-2xl font-semibold md:text-3xl">
              {home.sections[4]?.heading}
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-muted-foreground">{home.sections[4]?.body}</p>
          </Reveal>
          <div className="mt-8">
            <SegmentBentoGrid locale={locale} />
          </div>
        </div>
      </section>

      {/* Configurator teaser — the interactive "find your system" funnel */}
      <section className="relative overflow-hidden border-y border-[color:var(--obsidian-line)] bg-[color:var(--obsidian)] py-16 text-white md:py-20">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 top-1/2 hidden h-[30rem] w-[30rem] -translate-y-1/2 text-accent opacity-[0.06] md:block [mask-image:radial-gradient(closest-side,black,transparent)]"
        >
          <Guilloche className="ornament-spin" />
        </div>
        <div className="container-hastek relative flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
          <Reveal className="max-w-xl">
            <span className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-accent">
              <SeljukStar className="h-3.5 w-3.5" />
              {tCfg("teaserEyebrow")}
            </span>
            <h2 className="text-gold-metallic font-display mt-3 text-2xl font-semibold tracking-tight md:text-4xl">
              {tCfg("teaserTitle")}
            </h2>
            <p className="mt-3 text-sm text-white/70 md:text-base">{tCfg("teaserBody")}</p>
          </Reveal>
          <Link href="/configurator" className="btn-primary shrink-0">
            {tCfg("teaserCta")}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <ConciergeSpotlight content={spotlight} />

      <AidasLoveSections sections={home.sections.slice(5, 8)} startIndex={5} />

      {/* Showroom + Portal teasers — experience monitoring, then retention */}
      <section className="bg-surface-muted py-16 md:py-20">
        <div className="container-hastek grid gap-5 md:grid-cols-2">
          <Reveal>
            <Link
              href="/showroom"
              className="card-elevated border-gold-metallic group flex h-full flex-col justify-between gap-6 rounded-2xl p-7 md:p-8"
            >
              <div>
                <span className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.16em] text-accent-text-safe dark:text-accent">
                  <SeljukStar className="h-3.5 w-3.5" />
                  {tShow("teaserEyebrow")}
                </span>
                <h3 className="font-display mt-3 text-xl font-semibold md:text-2xl">{tShow("teaserTitle")}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{tShow("teaserBody")}</p>
              </div>
              <span className="flex items-center gap-1.5 text-sm font-medium text-accent-text-safe dark:text-accent">
                {tShow("teaserCta")}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          </Reveal>
          <Reveal>
            <Link
              href="/portal"
              className="card-elevated border-gold-metallic group flex h-full flex-col justify-between gap-6 rounded-2xl p-7 md:p-8"
            >
              <div>
                <span className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.16em] text-accent-text-safe dark:text-accent">
                  <SeljukStar className="h-3.5 w-3.5" />
                  {tPortal("teaserEyebrow")}
                </span>
                <h3 className="font-display mt-3 text-xl font-semibold md:text-2xl">{tPortal("teaserTitle")}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{tPortal("teaserBody")}</p>
              </div>
              <span className="flex items-center gap-1.5 text-sm font-medium text-accent-text-safe dark:text-accent">
                {tPortal("teaserCta")}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          </Reveal>
        </div>
      </section>

      <InstagramFeed />

      <AiSummary locale={locale} />

      <section className="relative overflow-hidden bg-[color:var(--obsidian)] py-24 text-white">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 h-[40rem] w-[40rem] -translate-x-1/2 -translate-y-1/2 text-accent opacity-[0.05] [mask-image:radial-gradient(closest-side,black,transparent)]"
        >
          <Guilloche className="ornament-spin" />
        </div>
        <div className="container-hastek relative flex flex-col items-center gap-6 text-center">
          <SeljukStar className="h-8 w-8 text-accent" />
          <h2 className="text-gold-metallic font-display max-w-xl text-3xl font-semibold tracking-tight md:text-5xl">
            {home.ctaPrimary}
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/booking" className="btn-primary">
              {home.ctaPrimary}
              <ArrowRight className="h-4 w-4" />
            </Link>
            <WhatsAppButton className="btn-secondary !text-accent" label={home.ctaSecondary} />
          </div>
        </div>
      </section>
    </>
  );
}
