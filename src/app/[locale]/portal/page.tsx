import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { PortalView } from "@/components/portal/portal-view";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "portal" });
  return { title: t("loginTitle"), description: t("loginIntro") };
}

export default async function PortalPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <PortalView />;
}
