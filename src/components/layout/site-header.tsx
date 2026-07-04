"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Menu, X, ChevronDown } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Logo } from "@/components/brand/logo";
import { LanguageSwitcher } from "./language-switcher";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { WhatsAppButton } from "./whatsapp-button";
import { SEGMENT_KEYS, SEGMENT_SLUGS } from "@/lib/segments";

export function SiteHeader() {
  const t = useTranslations("nav");
  const tSegments = useTranslations("segments");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [segmentsOpen, setSegmentsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur">
      <div className="container-hastek flex h-20 items-center justify-between">
        <Link href="/" className="shrink-0">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          <div
            className="relative"
            onMouseEnter={() => setSegmentsOpen(true)}
            onMouseLeave={() => setSegmentsOpen(false)}
          >
            <button
              type="button"
              className="flex items-center gap-1 text-sm font-medium text-foreground/85 hover:text-accent"
            >
              {t("services")}
              <ChevronDown className="h-3.5 w-3.5" />
            </button>
            {segmentsOpen ? (
              <div className="absolute left-1/2 top-full w-72 -translate-x-1/2 pt-3">
                <ul className="overflow-hidden rounded-xl border border-border bg-surface py-2 shadow-xl">
                  {SEGMENT_KEYS.map((key) => (
                    <li key={key}>
                      <Link
                        href={`/segments/${SEGMENT_SLUGS[key]}`}
                        className="block px-4 py-2.5 text-sm text-foreground/85 hover:bg-surface-muted hover:text-accent"
                      >
                        {tSegments(`${key}.shortLabel`)}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
          <Link href="/trust" className="text-sm font-medium text-foreground/85 hover:text-accent">
            {t("trust")}
          </Link>
          <Link href="/faq" className="text-sm font-medium text-foreground/85 hover:text-accent">
            {t("faq")}
          </Link>
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <LanguageSwitcher />
          <ThemeToggle />
          <WhatsAppButton className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-2 text-sm font-medium text-white transition-transform hover:scale-[1.02]" />
          <Link
            href="/booking"
            className="rounded-full bg-accent px-4 py-2 text-sm font-semibold text-accent-contrast transition-opacity hover:opacity-90"
          >
            {t("booking")}
          </Link>
        </div>

        <button
          type="button"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-border lg:hidden"
          onClick={() => setMobileOpen((value) => !value)}
          aria-label="Menu"
        >
          {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </button>
      </div>

      {mobileOpen ? (
        <div className="border-t border-border bg-background lg:hidden">
          <div className="container-hastek flex flex-col gap-1 py-4">
            <p className="pt-2 pb-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              {t("services")}
            </p>
            {SEGMENT_KEYS.map((key) => (
              <Link
                key={key}
                href={`/segments/${SEGMENT_SLUGS[key]}`}
                onClick={() => setMobileOpen(false)}
                className="rounded-md px-2 py-2 text-sm text-foreground/85 hover:bg-surface-muted"
              >
                {tSegments(`${key}.shortLabel`)}
              </Link>
            ))}
            <Link href="/trust" onClick={() => setMobileOpen(false)} className="rounded-md px-2 py-2 text-sm text-foreground/85 hover:bg-surface-muted">
              {t("trust")}
            </Link>
            <Link href="/faq" onClick={() => setMobileOpen(false)} className="rounded-md px-2 py-2 text-sm text-foreground/85 hover:bg-surface-muted">
              {t("faq")}
            </Link>
            <div className="mt-3 flex items-center gap-3">
              <LanguageSwitcher />
              <ThemeToggle />
            </div>
            <div className="mt-3 flex flex-col gap-2">
              <WhatsAppButton className="inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-4 py-2.5 text-sm font-medium text-white" />
              <Link
                href="/booking"
                onClick={() => setMobileOpen(false)}
                className="rounded-full bg-accent px-4 py-2.5 text-center text-sm font-semibold text-accent-contrast"
              >
                {t("booking")}
              </Link>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
