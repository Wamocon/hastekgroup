import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Logo } from "@/components/brand/logo";
import { SEGMENT_KEYS, SEGMENT_SLUGS } from "@/lib/segments";
import { siteConfig } from "@/lib/site-config";

export function SiteFooter() {
  const t = useTranslations("footer");
  const tSegments = useTranslations("segments");
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-surface-muted">
      <div className="container-hastek grid gap-10 py-14 md:grid-cols-4">
        <div className="md:col-span-2">
          <Logo />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
            {t("about")}
          </p>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            {t("quickLinksTitle")}
          </p>
          <ul className="mt-3 space-y-2">
            {SEGMENT_KEYS.map((key) => (
              <li key={key}>
                <Link
                  href={`/segments/${SEGMENT_SLUGS[key]}`}
                  className="text-sm text-foreground/80 hover:text-accent"
                >
                  {tSegments(`${key}.shortLabel`)}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            {t("legalTitle")}
          </p>
          <ul className="mt-3 space-y-2">
            <li>
              <Link href="/legal/impressum" className="text-sm text-foreground/80 hover:text-accent">
                {t("impressum")}
              </Link>
            </li>
            <li>
              <Link href="/legal/agb" className="text-sm text-foreground/80 hover:text-accent">
                {t("agb")}
              </Link>
            </li>
            <li>
              <Link href="/legal/datenschutz" className="text-sm text-foreground/80 hover:text-accent">
                {t("datenschutz")}
              </Link>
            </li>
          </ul>

          <p className="mt-5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            {t("contactTitle")}
          </p>
          <p className="mt-3 text-sm text-foreground/80">
            {siteConfig.city}, {siteConfig.region}
          </p>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="container-hastek flex flex-col gap-2 py-5 text-xs text-muted-foreground md:flex-row md:items-center md:justify-between">
          <p>
            &copy; {year} {siteConfig.groupName} ({siteConfig.brandName}). {t("rights")}
          </p>
          <p className="max-w-xl">{t("draftNotice")}</p>
        </div>
      </div>
    </footer>
  );
}
