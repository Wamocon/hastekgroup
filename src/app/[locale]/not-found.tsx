import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function LocaleNotFound() {
  const t = useTranslations("nav");

  return (
    <section className="container-hastek flex flex-col items-center justify-center gap-4 py-32 text-center">
      <h1 className="text-4xl font-semibold tracking-tight">404</h1>
      <p className="text-muted-foreground">
        {t("home")} · {t("services")} · {t("trust")}
      </p>
      <Link href="/" className="rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-contrast">
        {t("home")}
      </Link>
    </section>
  );
}
