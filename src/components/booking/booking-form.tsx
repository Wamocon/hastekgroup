"use client";

import { useState, type FormEvent } from "react";
import { useTranslations } from "next-intl";
import { CheckCircle2, X } from "lucide-react";
import { SEGMENT_KEYS, SEGMENT_SLUGS } from "@/lib/segments";
import { addDemoBooking } from "@/lib/demo-bookings";
import { useDemoStore, clearConfiguratorResult } from "@/lib/demo-store";
import { WhatsAppButton } from "@/components/layout/whatsapp-button";

const SERVICE_TYPES = ["consultation", "installation", "maintenance"] as const;

export function BookingForm() {
  const t = useTranslations("booking");
  const tSegments = useTranslations("segments");
  const tServices = useTranslations("home.services");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const prefill = useDemoStore().configuratorResult;

  // Only the three configurator-driven fields are controlled, so dismissing the
  // prefill (or clearing it) never disturbs name/email/phone the user typed.
  const [segment, setSegment] = useState("");
  const [serviceType, setServiceType] = useState("");
  const [message, setMessage] = useState("");
  const [appliedId, setAppliedId] = useState<string | null>(null);

  // Apply a freshly-arrived configurator result exactly once (adjusting state
  // during render — the documented React pattern, no effect, no ref).
  if (prefill && appliedId !== prefill.id) {
    setAppliedId(prefill.id);
    setSegment(prefill.segment);
    setServiceType("consultation");
    setMessage(`${t("configuratorLead")} ${prefill.systems.map((s) => tServices(s)).join(", ")}.`);
  }

  function dropPrefill() {
    clearConfiguratorResult();
    setAppliedId(null);
    setSegment("");
    setServiceType("");
    setMessage("");
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    const form = new FormData(event.currentTarget);

    addDemoBooking({
      name: String(form.get("name") ?? ""),
      email: String(form.get("email") ?? ""),
      phone: String(form.get("phone") ?? ""),
      segment,
      serviceType,
      preferredDate: String(form.get("preferredDate") ?? ""),
      message,
      systems: prefill?.systems,
      source: prefill ? "configurator" : "form",
    });

    if (prefill) clearConfiguratorResult();

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
    <form
      onSubmit={handleSubmit}
      className="space-y-5 rounded-2xl border border-border bg-surface p-6 md:p-8"
    >
      {prefill ? (
        <div className="flex items-start justify-between gap-3 rounded-xl border border-[color:var(--border-gold)] bg-accent-soft/50 p-3 text-sm">
          <p className="text-foreground/85">{t("configuratorBanner")}</p>
          <button
            type="button"
            onClick={dropPrefill}
            className="flex shrink-0 items-center gap-1 text-xs text-muted-foreground hover:text-accent"
          >
            <X className="h-3.5 w-3.5" />
            {t("configuratorClear")}
          </button>
        </div>
      ) : null}

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
          <select
            name="segment"
            required
            value={segment}
            onChange={(e) => setSegment(e.target.value)}
            className="form-input"
          >
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
          <select
            name="serviceType"
            required
            value={serviceType}
            onChange={(e) => setServiceType(e.target.value)}
            className="form-input"
          >
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
        <textarea
          name="message"
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="form-input resize-none"
        />
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
