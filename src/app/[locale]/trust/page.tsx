import { useTranslations } from "next-intl";
import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { ShieldCheck, FileCheck2, Star, MessageCircleQuestion } from "lucide-react";
import { Link } from "@/i18n/navigation";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "trust" });
  return { title: t("title"), description: t("intro") };
}

export default async function TrustPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <TrustContent />;
}

function TrustContent() {
  const t = useTranslations("trust");

  const sections = [
    { icon: ShieldCheck, titleKey: "aboutTitle", bodyKey: "aboutBody" },
    { icon: FileCheck2, titleKey: "dataTitle", bodyKey: "dataBody" },
    { icon: FileCheck2, titleKey: "certificatesTitle", bodyKey: "certificatesNotice" },
    { icon: Star, titleKey: "reviewsTitle", bodyKey: "reviewsBody" },
    { icon: MessageCircleQuestion, titleKey: "contactTitle", bodyKey: "contactBody" },
  ] as const;

  return (
    <>
      <section className="bg-[color:var(--obsidian)] py-16 text-white md:py-24">
        <div className="container-hastek">
          <h1 className="max-w-2xl text-3xl font-semibold tracking-tight md:text-5xl">
            {t("title")}
          </h1>
          <p className="mt-4 max-w-xl text-lg text-white/75">{t("intro")}</p>
        </div>
      </section>

      <section className="container-hastek grid gap-6 py-16 md:grid-cols-2 md:py-20">
        {sections.map(({ icon: Icon, titleKey, bodyKey }) => (
          <div key={titleKey} className="rounded-2xl border border-border bg-surface p-6">
            <Icon className="h-6 w-6 text-accent" />
            <h2 className="mt-4 text-lg font-semibold">{t(titleKey)}</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t(bodyKey)}</p>
          </div>
        ))}
      </section>

      <section className="bg-surface-muted py-12">
        <div className="container-hastek text-sm text-muted-foreground">
          <Link href="/legal/datenschutz" className="underline underline-offset-2 hover:text-accent">
            {t("dataTitle")}
          </Link>
        </div>
      </section>
    </>
  );
}
