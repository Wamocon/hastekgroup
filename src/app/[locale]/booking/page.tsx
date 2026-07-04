import { useTranslations } from "next-intl";
import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { BookingForm } from "@/components/booking/booking-form";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "booking" });
  return { title: t("title"), description: t("subtitle") };
}

export default async function BookingPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <BookingContent />;
}

function BookingContent() {
  const t = useTranslations("booking");

  return (
    <section className="container-hastek py-16 md:py-20">
      <div className="mx-auto max-w-2xl">
        <h1 className="text-center text-3xl font-semibold tracking-tight md:text-4xl">
          {t("title")}
        </h1>
        <p className="mt-3 text-center text-muted-foreground">{t("subtitle")}</p>
        <div className="mt-10">
          <BookingForm />
        </div>
      </div>
    </section>
  );
}
