import { useTranslations } from "next-intl";
import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { FaqAccordion } from "@/components/faq/faq-accordion";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "faq" });
  return { title: t("title"), description: t("intro") };
}

export default async function FaqPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <FaqContent />;
}

function FaqContent() {
  const t = useTranslations("faq");
  const items = t.raw("items") as { q: string; a: string }[];

  return (
    <section className="container-hastek py-16 md:py-24">
      <h1 className="max-w-2xl text-3xl font-semibold tracking-tight md:text-5xl">{t("title")}</h1>
      <p className="mt-4 max-w-xl text-muted-foreground">{t("intro")}</p>
      <div className="mt-10 max-w-3xl">
        <FaqAccordion items={items} />
      </div>
    </section>
  );
}
