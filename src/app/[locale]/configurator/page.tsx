import { useTranslations } from "next-intl";
import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { Configurator } from "@/components/configurator/configurator";
import { SeljukStar } from "@/components/ornament/seljuk-star";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "configurator" });
  return { title: t("title"), description: t("intro") };
}

export default async function ConfiguratorPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <ConfiguratorContent />;
}

function ConfiguratorContent() {
  const t = useTranslations("configurator");

  return (
    <section className="container-hastek py-16 md:py-20">
      <div className="flex items-center gap-2 text-accent">
        <SeljukStar className="h-5 w-5" />
        <span className="font-mono text-xs uppercase tracking-[0.2em]">{t("eyebrow")}</span>
      </div>
      <h1 className="font-display mt-4 text-3xl font-semibold tracking-tight md:text-5xl">
        {t("title")}
      </h1>
      <p className="mt-4 max-w-2xl text-muted-foreground">{t("intro")}</p>

      <div className="mt-10">
        <Configurator />
      </div>
    </section>
  );
}
