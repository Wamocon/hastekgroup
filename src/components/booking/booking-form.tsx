"use client";

import { useState, type FormEvent } from "react";
import { useTranslations } from "next-intl";
import { CheckCircle2 } from "lucide-react";
import { SEGMENT_KEYS, SEGMENT_SLUGS } from "@/lib/segments";
import { addDemoBooking } from "@/lib/demo-bookings";
import { WhatsAppButton } from "@/components/layout/whatsapp-button";

const SERVICE_TYPES = ["consultation", "installation", "maintenance"] as const;

export function BookingForm() {
  const t = useTranslations("booking");
  const tSegments = useTranslations("segments");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    const form = new FormData(event.currentTarget);

    addDemoBooking({
      name: String(form.get("name") ?? ""),
      email: String(form.get("email") ?? ""),
      phone: String(form.get("phone") ?? ""),
      segment: String(form.get("segment") ?? ""),
      serviceType: String(form.get("serviceType") ?? ""),
      preferredDate: String(form.get("preferredDate") ?? ""),
      message: String(form.get("message") ?? ""),
    });

    window.setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 500);
  }

  if (submitted) {
    return (
      <div className="rounded-2xl border border-border bg-surface p-8 text-center">
        <CheckCircle2 className="mx-auto h-10 w-10 text-accent" />
        <h2 className="mt-4 text-xl font-semibold">{t("successTitle")}</h2>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t("successBody")}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 rounded-2xl border border-border bg-surface p-6 md:p-8">
      <div className="grid gap-5 md:grid-cols-2">
        <Field label={t("fields.name")}>
          <input name="name" required className="form-input" />
        </Field>
        <Field label={t("fields.email")}>
          <input name="email" type="email" required className="form-input" />
        </Field>
        <Field label={t("fields.phone")}>
          <input name="phone" required className="form-input" />
        </Field>
        <Field label={t("fields.preferredDate")}>
          <input name="preferredDate" type="date" className="form-input" />
        </Field>
        <Field label={t("fields.segment")}>
          <select name="segment" required defaultValue="" className="form-input">
            <option value="" disabled>
              &nbsp;
            </option>
            {SEGMENT_KEYS.map((key) => (
              <option key={key} value={SEGMENT_SLUGS[key]}>
                {tSegments(`${key}.shortLabel`)}
              </option>
            ))}
          </select>
        </Field>
        <Field label={t("fields.serviceType")}>
          <select name="serviceType" required defaultValue="" className="form-input">
            <option value="" disabled>
              &nbsp;
            </option>
            {SERVICE_TYPES.map((type) => (
              <option key={type} value={type}>
                {t(`serviceTypeOptions.${type}`)}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <Field label={t("fields.message")}>
        <textarea name="message" rows={4} className="form-input resize-none" />
      </Field>

      <p className="text-xs text-muted-foreground">{t("demoNotice")}</p>

      <div className="flex flex-wrap items-center gap-4 pt-2">
        <button
          type="submit"
          disabled={submitting}
          className="rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-contrast disabled:opacity-60"
        >
          {submitting ? t("submitting") : t("submit")}
        </button>
        <span className="text-sm text-muted-foreground">{t("whatsappAlt")}</span>
        <WhatsAppButton />
      </div>
    </form>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block text-sm">
      <span className="mb-1.5 block font-medium text-foreground/85">{label}</span>
      {children}
    </label>
  );
}
