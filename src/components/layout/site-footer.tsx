import { useTranslations } from "next-intl";
import { InstagramGlyph } from "@/components/brand/instagram-glyph";
import { Link } from "@/i18n/navigation";
import { Logo } from "@/components/brand/logo";
import { SEGMENT_KEYS, SEGMENT_SLUGS } from "@/lib/segments";
import { siteConfig, instagramHref } from "@/lib/site-config";
import { Guilloche } from "@/components/ornament/guilloche";

export function SiteFooter() {
  const t = useTranslations("footer");
  const tSegments = useTranslations("segments");
  const tNav = useTranslations("nav");
  const igHref = instagramHref();
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-border bg-surface-muted">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-24 hidden h-[32rem] w-[32rem] text-accent opacity-[0.04] [mask-image:radial-gradient(closest-side,black,transparent)] md:block"
      >
        <Guilloche />
      </div>
      <div className="container-hastek relative grid gap-10 py-14 md:grid-cols-4">
        <div className="md:col-span-2">
          <Logo size="lg" />
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
            <li>
              <Link href="/configurator" className="text-sm text-foreground/80 hover:text-accent">
                {tNav("configurator")}
              </Link>
            </li>
            <li>
              <Link href="/gallery" className="text-sm text-foreground/80 hover:text-accent">
                {tNav("gallery")}
              </Link>
            </li>
            <li>
              <Link href="/showroom" className="text-sm text-foreground/80 hover:text-accent">
                {tNav("showroom")}
              </Link>
            </li>
            <li>
              <Link href="/portal" className="text-sm text-foreground/80 hover:text-accent">
                {tNav("portal")}
              </Link>
            </li>
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
          {igHref ? (
            <a
              href={igHref}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="mt-3 inline-flex h-9 w-9 items-center justify-center rounded-full border border-[color:var(--border-gold)] text-foreground/70 hover:text-accent"
            >
              <InstagramGlyph className="h-4 w-4" />
            </a>
          ) : (
            <span className="mt-3 inline-flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground/50">
              <InstagramGlyph className="h-4 w-4" />
            </span>
          )}
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
