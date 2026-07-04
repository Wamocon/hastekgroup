import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { AdminLoginForm } from "@/components/admin/admin-login-form";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "admin" });
  return { title: t("loginTitle") };
}

export default async function AdminLoginPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <section className="container-hastek py-20 md:py-28">
      <AdminLoginForm />
    </section>
  );
}
