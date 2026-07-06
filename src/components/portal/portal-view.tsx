"use client";

import { useMemo, useState, type FormEvent } from "react";
import { useTranslations, useFormatter } from "next-intl";
import {
  ShieldCheck,
  Bell,
  Clock,
  QrCode,
  LogOut,
  CalendarClock,
  MapPin,
  CalendarDays,
  ChevronRight,
  Info,
} from "lucide-react";
import { Link } from "@/i18n/navigation";
import {
  useDemoStore,
  deviceStatus,
  devicesForAccount,
  reminderSendDate,
  loginPortal,
  loginDemoAccount,
  clearPortalSession,
  updateReminders,
  type Device,
  type ReminderChannel,
} from "@/lib/demo-store";
import { getDemoBookings, type DemoBooking } from "@/lib/demo-bookings";
import { segmentKeyFromSlug } from "@/lib/segments";
import { Reveal } from "@/components/ui/reveal";
import { StatusChip } from "./device-detail";

const LEAD_DAYS = [7, 14, 30] as const;
const CHANNELS: ReminderChannel[] = ["whatsapp", "email"];

export function PortalView() {
  const snapshot = useDemoStore();
  if (!snapshot.account) return <LoginGate />;
  return <PortalHub />;
}

/* ── Login gate ────────────────────────────────────────────────────────── */

function LoginGate() {
  const t = useTranslations("portal");
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const ok = loginPortal(email);
    setError(!ok);
  }

  return (
    <section className="container-hastek py-16 md:py-24">
      <div className="mx-auto max-w-md">
        <Reveal>
          <div className="card-elevated border-gold-metallic rounded-2xl p-8">
            <span className="flex h-12 w-12 items-center justify-center rounded-full border border-[color:var(--border-gold)] text-accent">
              <ShieldCheck className="h-6 w-6" />
            </span>
            <h1 className="mt-5 font-display text-2xl font-semibold tracking-tight">{t("loginTitle")}</h1>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t("loginIntro")}</p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <label className="block text-sm">
                <span className="mb-1.5 block font-medium text-foreground/85">{t("emailLabel")}</span>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(event) => {
                    setEmail(event.target.value);
                    if (error) setError(false);
                  }}
                  placeholder={t("emailPlaceholder")}
                  className="form-input"
                />
              </label>

              {error ? <p className="text-sm text-red-600 dark:text-red-400">{t("loginError")}</p> : null}

              <button type="submit" className="btn-primary w-full justify-center">
                {t("loginButton")}
              </button>
            </form>

            <div className="mt-4 border-t border-border pt-4">
              <button
                type="button"
                onClick={() => loginDemoAccount()}
                className="btn-secondary w-full justify-center"
              >
                {t("viewDemo")}
              </button>
            </div>
          </div>
        </Reveal>

        <p className="mt-6 flex items-start gap-2 text-xs leading-relaxed text-muted-foreground">
          <Info className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
          {t("disclaimer")}
        </p>
      </div>
    </section>
  );
}

/* ── Logged-in hub ─────────────────────────────────────────────────────── */

function PortalHub() {
  const t = useTranslations("portal");
  const tSegments = useTranslations("segments");
  const snapshot = useDemoStore();
  const account = snapshot.account!;

  const bookings = useMemo(() => {
    const email = account.email.toLowerCase();
    return getDemoBookings().filter((b) => b.email.toLowerCase() === email);
  }, [account.email]);

  const devices = useMemo(
    () => devicesForAccount(snapshot, account.id),
    [snapshot, account.id]
  );

  const segmentKey = segmentKeyFromSlug(account.segment);
  const segmentLabel = segmentKey ? tSegments(`${segmentKey}.shortLabel`) : account.segment;

  return (
    <section className="container-hastek py-12 md:py-16">
      {/* Account header */}
      <header className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-6">
        <div>
          <h1 className="font-display text-2xl font-semibold tracking-tight md:text-3xl">
            {t("welcome", { name: account.name })}
          </h1>
          <p className="mt-1 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
            <span>
              {t("accountSegmentLabel")}: {segmentLabel}
            </span>
            {account.demo ? (
              <span className="inline-flex items-center rounded-full border border-[color:var(--border-gold)] px-2 py-0.5 font-mono text-[0.6rem] uppercase tracking-[0.14em] text-accent">
                {t("demoBadge")}
              </span>
            ) : null}
          </p>
        </div>
        <button
          type="button"
          onClick={() => clearPortalSession()}
          className="btn-secondary"
        >
          <LogOut className="h-4 w-4" />
          {t("logout")}
        </button>
      </header>

      {/* Bookings */}
      <BookingsSection bookings={bookings} />

      {/* Systems */}
      <SystemsSection devices={devices} />

      {/* Reminders */}
      <RemindersSection devices={devices} />
    </section>
  );
}

/* ── Meine Termine ─────────────────────────────────────────────────────── */

const SERVICE_TYPE_KEYS = ["consultation", "installation", "maintenance"];

function BookingsSection({ bookings }: { bookings: DemoBooking[] }) {
  const t = useTranslations("portal");
  const tBooking = useTranslations("booking");
  const format = useFormatter();

  const fmt = (iso: string) => {
    const date = new Date(iso);
    return Number.isNaN(date.getTime())
      ? iso
      : format.dateTime(date, { year: "numeric", month: "long", day: "numeric" });
  };

  // Bookings store the raw select value ("consultation" etc.); map it back to
  // the localized label, falling back to the raw value for any legacy string.
  const serviceLabel = (value: string) =>
    SERVICE_TYPE_KEYS.includes(value) ? tBooking(`serviceTypeOptions.${value}`) : value;

  return (
    <div className="mt-12">
      <h2 className="flex items-center gap-2 font-display text-xl font-semibold tracking-tight">
        <CalendarDays className="h-5 w-5 text-accent" />
        {t("bookingsTitle")}
      </h2>
      {bookings.length === 0 ? (
        <EmptyState message={t("bookingsEmpty")} />
      ) : (
        <ul className="mt-5 space-y-3">
          {bookings.map((booking) => (
            <li
              key={booking.id}
              className="card-elevated flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border p-4"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[color:var(--border-gold)] text-accent">
                  <CalendarClock className="h-4 w-4" />
                </span>
                <div>
                  <p className="font-medium">{serviceLabel(booking.serviceType)}</p>
                  {booking.preferredDate ? (
                    <p className="text-sm text-muted-foreground">{fmt(booking.preferredDate)}</p>
                  ) : null}
                </div>
              </div>
              <span className="font-mono text-[0.6rem] uppercase tracking-[0.14em] text-muted-foreground">
                {fmt(booking.createdAt)}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

/* ── Meine Systeme ─────────────────────────────────────────────────────── */

function SystemsSection({ devices }: { devices: Device[] }) {
  const t = useTranslations("portal");
  const tServices = useTranslations("home.services");
  const format = useFormatter();

  const fmt = (iso: string) =>
    format.dateTime(new Date(iso), { year: "numeric", month: "long", day: "numeric" });

  return (
    <div className="mt-12">
      <h2 className="flex items-center gap-2 font-display text-xl font-semibold tracking-tight">
        <ShieldCheck className="h-5 w-5 text-accent" />
        {t("systemsTitle")}
      </h2>
      {devices.length === 0 ? (
        <EmptyState message={t("systemsEmpty")} />
      ) : (
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          {devices.map((device) => (
            <Reveal key={device.id}>
              <Link
                href={`/device/${device.qrToken}`}
                className="card-elevated border-gold-metallic group flex h-full flex-col rounded-2xl p-5 transition-colors hover:border-[color:var(--border-gold)]"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-display text-lg font-semibold">{tServices(device.serviceKey)}</p>
                    <p className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
                      <MapPin className="h-3.5 w-3.5 text-accent" />
                      {t(`locations.${device.locationKey}`)}
                    </p>
                  </div>
                  <StatusChip status={deviceStatus(device)} />
                </div>

                <dl className="mt-4 space-y-1.5 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck className="h-3.5 w-3.5 text-accent/70" />
                    {t("installedOn", { date: fmt(device.installedAt) })}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CalendarClock className="h-3.5 w-3.5 text-accent/70" />
                    {t("nextService", { date: fmt(device.nextServiceDue) })}
                  </div>
                </dl>

                <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-accent">
                  <QrCode className="h-4 w-4" />
                  {t("viewDevice")}
                  <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      )}
    </div>
  );
}

/* ── Wartungserinnerungen ──────────────────────────────────────────────── */

function RemindersSection({ devices }: { devices: Device[] }) {
  const t = useTranslations("portal");
  const tServices = useTranslations("home.services");
  const format = useFormatter();
  const snapshot = useDemoStore();
  const reminders = snapshot.reminders;

  const fmt = (date: Date) =>
    format.dateTime(date, { year: "numeric", month: "long", day: "numeric" });

  // Soonest-due device (earliest nextServiceDue, incl. overdue).
  const soonest = useMemo(() => {
    if (devices.length === 0) return null;
    return [...devices].sort(
      (a, b) => new Date(a.nextServiceDue).getTime() - new Date(b.nextServiceDue).getTime()
    )[0];
  }, [devices]);

  const preview = soonest
    ? {
        sendDate: fmt(reminderSendDate(soonest, reminders)),
        message: t("previewMessage", {
          system: tServices(soonest.serviceKey),
          date: fmt(new Date(soonest.nextServiceDue)),
        }),
      }
    : null;

  return (
    <div className="mt-12">
      <h2 className="flex items-center gap-2 font-display text-xl font-semibold tracking-tight">
        <Bell className="h-5 w-5 text-accent" />
        {t("remindersTitle")}
      </h2>
      <p className="mt-2 max-w-2xl text-sm text-muted-foreground">{t("remindersIntro")}</p>

      <div className="mt-5 grid gap-6 lg:grid-cols-2">
        {/* Settings card */}
        <div className="card-elevated rounded-2xl border border-border p-6">
          {/* Toggle */}
          <div className="flex items-center justify-between gap-4">
            <span className="font-medium">{t("reminderEnabled")}</span>
            <button
              type="button"
              role="switch"
              aria-checked={reminders.enabled}
              aria-label={t("reminderEnabled")}
              onClick={() => updateReminders({ enabled: !reminders.enabled })}
              className={`relative h-6 w-11 rounded-full transition-colors ${
                reminders.enabled ? "bg-accent" : "bg-surface-muted border border-border"
              }`}
            >
              <span
                className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${
                  reminders.enabled ? "translate-x-[22px]" : "translate-x-0.5"
                }`}
              />
            </button>
          </div>

          {/* Channel */}
          <fieldset className="mt-6" disabled={!reminders.enabled}>
            <legend className="mb-2 text-sm font-medium text-foreground/85">{t("channelLabel")}</legend>
            <div className="flex gap-2">
              {CHANNELS.map((channel) => (
                <button
                  key={channel}
                  type="button"
                  onClick={() => updateReminders({ channel })}
                  className={`flex-1 rounded-full border px-4 py-2 text-sm font-medium transition-colors disabled:opacity-50 ${
                    reminders.channel === channel
                      ? "border-transparent bg-accent text-accent-contrast"
                      : "border-[color:var(--border-gold)] text-foreground/75 hover:text-accent"
                  }`}
                >
                  {channel === "whatsapp" ? t("channelWhatsapp") : t("channelEmail")}
                </button>
              ))}
            </div>
          </fieldset>

          {/* Lead days */}
          <label className="mt-6 block text-sm">
            <span className="mb-1.5 block font-medium text-foreground/85">{t("leadDaysLabel")}</span>
            <select
              value={reminders.leadDays}
              disabled={!reminders.enabled}
              onChange={(event) => updateReminders({ leadDays: Number(event.target.value) })}
              className="form-input disabled:opacity-50"
            >
              {LEAD_DAYS.map((days) => (
                <option key={days} value={days}>
                  {t("leadDaysOption", { days })}
                </option>
              ))}
            </select>
          </label>
        </div>

        {/* Preview */}
        <div className="panel-obsidian border-gold-metallic--obsidian rounded-2xl p-6">
          <h3 className="flex items-center gap-2 font-display text-lg font-semibold text-white">
            <Clock className="h-5 w-5 text-accent" />
            {t("reminderPreviewTitle")}
          </h3>
          {preview ? (
            <>
              <p className="mt-2 text-sm text-white/70">{t("reminderPreviewLine", { date: preview.sendDate })}</p>
              <div className="mt-4 rounded-2xl rounded-tl-sm border border-[color:var(--obsidian-line)] bg-white/5 p-4 text-sm leading-relaxed text-white/90">
                {preview.message}
              </div>
              <p className="mt-3 font-mono text-[0.6rem] uppercase tracking-[0.16em] text-white/40">
                {t("qrCaption")}
              </p>
            </>
          ) : (
            <p className="mt-4 text-sm text-white/60">{t("noUpcoming")}</p>
          )}
        </div>
      </div>
    </div>
  );
}

/* ── Shared ────────────────────────────────────────────────────────────── */

function EmptyState({ message }: { message: string }) {
  return (
    <div className="mt-5 rounded-2xl border border-dashed border-border bg-surface-muted p-8 text-center text-sm text-muted-foreground">
      {message}
    </div>
  );
}
