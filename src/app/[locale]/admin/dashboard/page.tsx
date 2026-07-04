import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { AdminDashboard } from "@/components/admin/admin-dashboard";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "admin" });
  return { title: t("dashboardTitle") };
}

export default async function AdminDashboardPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <AdminDashboard />;
}
