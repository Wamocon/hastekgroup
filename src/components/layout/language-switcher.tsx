"use client";

import { useLocale } from "next-intl";
import { useParams } from "next/navigation";
import { routing, type AppLocale } from "@/i18n/routing";
import { usePathname, useRouter } from "@/i18n/navigation";
import { SegmentedControl } from "@/components/ui/segmented-control";

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();

  return (
    <SegmentedControl
      value={locale as AppLocale}
      onChange={(code) =>
        router.replace(
          // @ts-expect-error dynamic pathname across locales is safe here
          { pathname, params },
          { locale: code }
        )
      }
      options={routing.locales.map((code) => ({
        value: code,
        label: code,
        ariaLabel: code,
      }))}
    />
  );
}
