import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { ThemeScript } from "@/components/theme/theme-script";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { CookieBanner } from "@/components/layout/cookie-banner";
import { ChatWidget } from "@/components/chat/chat-widget";
import { LocalBusinessSchema } from "@/components/seo/local-business-schema";
import "../globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

type LayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: LayoutProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "home" });

  return {
    title: {
      default: `${t("hero.eyebrow")} | HAS Teknoloji`,
      template: "%s | HAS Teknoloji",
    },
    description: t("hero.subtitle"),
    metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"),
  };
}

export default async function LocaleLayout({ children, params }: LayoutProps) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "home" });

  return (
    <html
      lang={locale}
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <ThemeScript />
        <LocalBusinessSchema locale={locale} name="HAS Teknoloji (Hastek Group)" description={t("hero.subtitle")} />
      </head>
      <body className="flex min-h-full flex-col bg-background text-foreground">
        <NextIntlClientProvider>
          <ThemeProvider>
            <SiteHeader />
            <main className="flex-1">{children}</main>
            <SiteFooter />
            <CookieBanner />
            <ChatWidget />
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
