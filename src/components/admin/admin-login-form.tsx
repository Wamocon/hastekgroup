"use client";

import { useState, type FormEvent } from "react";
import { useTranslations } from "next-intl";
import { ShieldCheck } from "lucide-react";
import { useRouter } from "@/i18n/navigation";
import { DEMO_CREDENTIALS, setAdminSession } from "@/lib/demo-auth";

export function AdminLoginForm() {
  const t = useTranslations("admin");
  const router = useRouter();
  const [error, setError] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const email = String(form.get("email") ?? "");
    const password = String(form.get("password") ?? "");

    if (email === DEMO_CREDENTIALS.email && password === DEMO_CREDENTIALS.password) {
      setAdminSession();
      router.push("/admin/dashboard");
      return;
    }
    setError(true);
  }

  return (
    <div className="mx-auto max-w-md rounded-2xl border border-border bg-surface p-8">
      <ShieldCheck className="h-8 w-8 text-accent" />
      <h1 className="mt-4 text-2xl font-semibold">{t("loginTitle")}</h1>
      <p className="mt-2 text-sm text-muted-foreground">{t("demoNotice")}</p>
      <p className="mt-1 text-xs text-accent">{t("demoCredentialsHint")}</p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <label className="block text-sm">
          <span className="mb-1.5 block font-medium text-foreground/85">{t("emailLabel")}</span>
          <input name="email" type="email" required className="form-input" />
        </label>
        <label className="block text-sm">
          <span className="mb-1.5 block font-medium text-foreground/85">{t("passwordLabel")}</span>
          <input name="password" type="password" required className="form-input" />
        </label>
        {error ? <p className="text-sm text-red-500">{t("loginError")}</p> : null}
        <button
          type="submit"
          className="w-full rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-contrast"
        >
          {t("loginButton")}
        </button>
      </form>
    </div>
  );
}
