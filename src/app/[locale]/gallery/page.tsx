import { useTranslations } from "next-intl";
import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { Info } from "lucide-react";
import { GalleryView } from "@/components/gallery/gallery-view";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "gallery" });
  return { title: t("title"), description: t("intro") };
}

export default async function GalleryPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <GalleryContent />;
}

function GalleryContent() {
  const t = useTranslations("gallery");

  return (
    <section className="container-hastek py-16 md:py-20">
      <h1 className="font-display text-3xl font-semibold tracking-tight md:text-5xl">{t("title")}</h1>
      <p className="mt-4 max-w-2xl text-muted-foreground">{t("intro")}</p>

      <div className="mt-6 flex max-w-2xl gap-3 rounded-2xl border border-[color:var(--border-gold)] bg-surface-muted p-4 text-sm text-muted-foreground">
        <Info className="h-5 w-5 shrink-0 text-accent" />
        <p>{t("placeholderNotice")}</p>
      </div>

      <div className="mt-10">
        <GalleryView />
      </div>
    </section>
  );
}
