"use client";

import { useTranslations, useFormatter } from "next-intl";
import {
  ShieldCheck,
  Clock,
  Wrench,
  BadgeCheck,
  Bell,
  MapPin,
  CalendarClock,
  ArrowLeft,
  QrCode,
} from "lucide-react";
import { Link } from "@/i18n/navigation";
import {
  useDemoStore,
  deviceStatus,
  maintenanceForDevice,
  reminderSendDate,
  findDeviceByToken,
  accountForDevice,
  type Device,
  type Account,
  type DeviceStatus,
  type MaintenanceKind,
} from "@/lib/demo-store";
import { WhatsAppButton } from "@/components/layout/whatsapp-button";
import { QrTag } from "./qr-tag";

const STATUS_STYLES: Record<DeviceStatus, string> = {
  ok: "border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  due: "border-amber-500/30 bg-amber-500/10 text-amber-600 dark:text-amber-400",
  overdue: "border-red-500/30 bg-red-500/10 text-red-600 dark:text-red-400",
};

const STATUS_LABEL_KEY: Record<DeviceStatus, "statusOk" | "statusDue" | "statusOverdue"> = {
  ok: "statusOk",
  due: "statusDue",
  overdue: "statusOverdue",
};

const KIND_ICON: Record<MaintenanceKind, typeof Wrench> = {
  install: BadgeCheck,
  inspection: ShieldCheck,
  service: Wrench,
  reminderSent: Bell,
};

/** Shared status chip used by the portal list and the device detail. */
export function StatusChip({ status }: { status: DeviceStatus }) {
  const t = useTranslations("portal");
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium ${STATUS_STYLES[status]}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {t(STATUS_LABEL_KEY[status])}
    </span>
  );
}

type DeviceDetailProps = {
  device: Device;
  account: Account | null;
};

export function DeviceDetail({ device, account }: DeviceDetailProps) {
  const t = useTranslations("portal");
  const tServices = useTranslations("home.services");
  const format = useFormatter();
  const snapshot = useDemoStore();

  const status = deviceStatus(device);
  const history = maintenanceForDevice(snapshot, device.id);
  const reminders = snapshot.reminders;

  const fmtDate = (iso: string | Date) =>
    format.dateTime(typeof iso === "string" ? new Date(iso) : iso, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  const serviceName = tServices(device.serviceKey);
  const dueDate = fmtDate(device.nextServiceDue);
  const sendDate = fmtDate(reminderSendDate(device, reminders));
  const previewText = t("previewMessage", { system: serviceName, date: dueDate });

  return (
    <div className="grid gap-8 lg:grid-cols-[1.6fr_1fr]">
      {/* Main column */}
      <div className="space-y-8">
        <header className="card-elevated border-gold-metallic rounded-2xl p-6 md:p-8">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h1 className="font-display text-2xl font-semibold tracking-tight md:text-3xl">
                {serviceName}
              </h1>
              <p className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 text-accent" />
                {t(`locations.${device.locationKey}`)}
              </p>
            </div>
            <StatusChip status={status} />
          </div>

          <dl className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-border bg-surface-muted p-4">
              <dt className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                <ShieldCheck className="h-4 w-4 text-accent" />
                {t("installedOn", { date: fmtDate(device.installedAt) })}
              </dt>
            </div>
            <div className="rounded-xl border border-border bg-surface-muted p-4">
              <dt className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                <CalendarClock className="h-4 w-4 text-accent" />
                {t("nextService", { date: dueDate })}
              </dt>
            </div>
          </dl>
        </header>

        {/* Maintenance timeline */}
        <section>
          <h2 className="font-display text-xl font-semibold tracking-tight">{t("maintenanceTitle")}</h2>
          <ol className="mt-5 space-y-4">
            {history.map((record) => {
              const Icon = KIND_ICON[record.kind];
              return (
                <li key={record.id} className="relative flex gap-4">
                  <div className="flex flex-col items-center">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[color:var(--border-gold)] bg-surface text-accent">
                      <Icon className="h-4 w-4" />
                    </span>
                  </div>
                  <div className="card-elevated flex-1 rounded-xl border border-border p-4">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="font-medium">{t(`maintenanceKind.${record.kind}`)}</span>
                      <time className="font-mono text-xs text-muted-foreground">{fmtDate(record.date)}</time>
                    </div>
                    {record.technician ? (
                      <p className="mt-1 text-sm text-muted-foreground">
                        {t("technicianLabel")}: {record.technician}
                      </p>
                    ) : null}
                  </div>
                </li>
              );
            })}
          </ol>
        </section>

        {/* Reminder preview for this device */}
        <section className="panel-obsidian border-gold-metallic--obsidian rounded-2xl p-6 md:p-8">
          <h2 className="flex items-center gap-2 font-display text-lg font-semibold text-white">
            <Bell className="h-5 w-5 text-accent" />
            {t("reminderPreviewTitle")}
          </h2>
          <p className="mt-2 flex items-center gap-2 text-sm text-white/70">
            <Clock className="h-4 w-4 text-accent" />
            {t("reminderPreviewLine", { date: sendDate })}
          </p>
          <div className="mt-4 max-w-md rounded-2xl rounded-tl-sm border border-[color:var(--obsidian-line)] bg-white/5 p-4 text-sm leading-relaxed text-white/90">
            {previewText}
          </div>
          <p className="mt-3 font-mono text-[0.6rem] uppercase tracking-[0.16em] text-white/40">
            {t("qrCaption")}
          </p>
        </section>
      </div>

      {/* Side column */}
      <aside className="space-y-6">
        <div className="card-elevated flex flex-col items-center gap-4 rounded-2xl border border-border p-6">
          <QrTag token={device.qrToken} caption={t("qrCaption")} />
          <WhatsAppButton className="btn-secondary w-full justify-center" />
        </div>

        {account ? (
          <p className="text-center text-xs text-muted-foreground">{account.name}</p>
        ) : null}
      </aside>
    </div>
  );
}

/**
 * Client resolver for the /device/[token] page — reads the reactive store,
 * finds the device by its QR token and renders the detail, or a friendly
 * "unknown code" state. Kept here so the server page stays a thin shell.
 */
export function DeviceTokenView({ token }: { token: string }) {
  const t = useTranslations("portal");
  const snapshot = useDemoStore();
  const device = findDeviceByToken(snapshot, token);
  const account = device ? accountForDevice(snapshot, device) : null;
  // On the server / pre-hydration the client store has not seeded yet
  // (devices is empty), so a valid QR token would momentarily resolve to the
  // "unknown code" screen. Hold a neutral loading state until the store is
  // populated, so a real scan never flashes the failure card.
  const resolving = snapshot.devices.length === 0;

  return (
    <section className="container-hastek py-12 md:py-16">
      <Link
        href="/portal"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-accent"
      >
        <ArrowLeft className="h-4 w-4" />
        {t("backToPortal")}
      </Link>

      <div className="mt-8">
        {resolving ? (
          <div className="mx-auto max-w-md" role="status" aria-live="polite">
            <div className="card-elevated border-gold-metallic flex items-center justify-center rounded-2xl p-12">
              <span className="flex h-12 w-12 animate-pulse items-center justify-center rounded-full border border-[color:var(--border-gold)] text-accent">
                <QrCode className="h-6 w-6" />
              </span>
            </div>
          </div>
        ) : device ? (
          <DeviceDetail device={device} account={account} />
        ) : (
          <div className="mx-auto max-w-md">
            <div className="card-elevated border-gold-metallic rounded-2xl p-8 text-center">
              <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-[color:var(--border-gold)] text-accent">
                <QrCode className="h-6 w-6" />
              </span>
              <h1 className="mt-5 font-display text-2xl font-semibold tracking-tight">
                {t("deviceUnknownTitle")}
              </h1>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t("deviceUnknownBody")}</p>
              <Link href="/portal" className="btn-primary mt-6 justify-center">
                {t("backToPortal")}
              </Link>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
