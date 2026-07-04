"use client";

import { useLocale, useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { Globe } from "lucide-react";
import { useState } from "react";
import { routing } from "@/i18n/routing";
import { usePathname, useRouter } from "@/i18n/navigation";

export function LanguageSwitcher() {
  const t = useTranslations("common");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-label={t("language")}
        aria-expanded={open}
        className="flex h-9 items-center gap-1.5 rounded-full border border-border px-3 text-xs font-medium uppercase tracking-wide text-foreground/80 transition-colors hover:border-accent hover:text-accent"
      >
        <Globe className="h-3.5 w-3.5" />
        {locale}
      </button>
      {open ? (
        <ul className="absolute right-0 z-30 mt-2 w-40 overflow-hidden rounded-xl border border-border bg-surface py-1 shadow-lg">
          {routing.locales.map((code) => (
            <li key={code}>
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  router.replace(
                    // @ts-expect-error dynamic pathname across locales is safe here
                    { pathname, params },
                    { locale: code }
                  );
                }}
                className={`flex w-full items-center justify-between px-3 py-2 text-sm transition-colors hover:bg-surface-muted ${
                  code === locale ? "text-accent" : "text-foreground/80"
                }`}
              >
                {t(`languages.${code}`)}
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
