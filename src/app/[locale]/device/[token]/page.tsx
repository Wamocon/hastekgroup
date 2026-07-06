import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { Info } from "lucide-react";
import { DeviceTokenView } from "@/components/portal/device-detail";

export const dynamicParams = true;

type PageProps = {
  params: Promise<{ locale: string; token: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "portal" });
  return { title: t("deviceTitle") };
}

export default async function DevicePage({ params }: PageProps) {
  const { locale, token } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "portal" });

  return (
    <>
      <DeviceTokenView token={token} />
      <div className="container-hastek pb-12">
        <p className="mx-auto flex max-w-3xl items-start gap-2 rounded-2xl border border-[color:var(--border-gold)] bg-surface-muted p-4 text-xs leading-relaxed text-muted-foreground">
          <Info className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
          {t("scanNote")}
        </p>
      </div>
    </>
  );
}
