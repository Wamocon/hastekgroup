import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { ShowroomView } from "@/components/showroom/showroom-view";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "showroom" });
  return { title: t("title"), description: t("intro") };
}

export default async function ShowroomPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <ShowroomView />;
}
