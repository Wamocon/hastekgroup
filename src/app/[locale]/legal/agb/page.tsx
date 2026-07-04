import { setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { getLegalContent } from "@/lib/legal-content";
import { LegalPageView } from "@/components/legal/legal-page";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  return { title: getLegalContent(locale).agb.title };
}

export default async function AgbPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const content = getLegalContent(locale);
  return <LegalPageView document={content.agb} draftBanner={content.draftBanner} />;
}
