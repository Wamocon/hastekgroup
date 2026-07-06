/**
 * demo-store — the single, typed data spine for the whole customer journey.
 *
 * Everything backend-free (localStorage + sessionStorage) but modelled as one
 * coherent lifecycle so the premium features interlock instead of each
 * inventing its own shape:
 *
 *   Configurator (A)  -> writes a ConfiguratorResult (segment + systems)
 *        |                 which pre-fills the Booking form
 *        v
 *   Booking           -> can create a customer Account (portal journey)
 *        |
 *        v
 *   Portal (G)        -> reads the Account's Devices + Maintenance + Reminders
 *        |
 *        +-- Devices (H)      each carries a QR token -> /device/[token]
 *        +-- Maintenance (H)  per-device service history + next-due date
 *        +-- Reminders (I)    WhatsApp/e-mail schedule preview
 *
 * A clearly-labelled demo account ("Örnek Hesap") is seeded on first use so the
 * portal, QR pages and reminder previews are never empty in a fresh browser -
 * this is illustrative sample data (like the existing demo bookings/reviews),
 * NOT a claim about real customers. Real data drops into the same shapes.
 *
 * useSyncExternalStore-safe: getSnapshot returns a cached, stable reference that
 * is only rebuilt on mutation or cross-tab `storage` events.
 */

import { useSyncExternalStore } from "react";
import type { ServiceKey } from "@/lib/segments";

/* ── Types ─────────────────────────────────────────────────────────────── */

export type Account = {
  id: string;
  name: string;
  email: string;
  phone: string;
  /** Segment slug, e.g. "private-homes". */
  segment: string;
  locale: string;
  createdAt: string;
  /** True for the seeded illustrative account, so the UI can badge it. */
  demo?: boolean;
};

export type ConfiguratorResult = {
  id: string;
  /** Segment slug. */
  segment: string;
  systems: ServiceKey[];
  /** Answer ids the visitor picked, kept for optional recap. */
  answers: string[];
  /** Priority the visitor emphasised (drives copy), e.g. "away" | "coverage". */
  priority: string;
  createdAt: string;
};

export type LocationKey =
  | "entrance"
  | "livingRoom"
  | "kitchen"
  | "garden"
  | "carPark"
  | "reception";

export type Device = {
  id: string;
  accountId: string;
  serviceKey: ServiceKey;
  locationKey: LocationKey;
  installedAt: string;
  /** ISO date the next scheduled service is due. */
  nextServiceDue: string;
  /** Stable token used by the QR deep-link /device/[token]. */
  qrToken: string;
};

export type MaintenanceKind = "install" | "inspection" | "service" | "reminderSent";

export type MaintenanceRecord = {
  id: string;
  deviceId: string;
  date: string;
  kind: MaintenanceKind;
  /** One of the Hastek team names, or undefined for automated events. */
  technician?: string;
};

export type ReminderChannel = "whatsapp" | "email";

export type ReminderSettings = {
  enabled: boolean;
  channel: ReminderChannel;
  /** Days before nextServiceDue that the reminder is sent. */
  leadDays: number;
};

export type DemoSnapshot = {
  account: Account | null;
  sessionEmail: string | null;
  configuratorResult: ConfiguratorResult | null;
  accounts: Account[];
  devices: Device[];
  maintenance: MaintenanceRecord[];
  reminders: ReminderSettings;
};

export type DeviceStatus = "ok" | "due" | "overdue";

/* ── Storage keys ──────────────────────────────────────────────────────── */

const K = {
  accounts: "hastek-demo-accounts",
  devices: "hastek-demo-devices",
  maintenance: "hastek-demo-maintenance",
  reminders: "hastek-demo-reminders",
  configurator: "hastek-demo-configurator",
  session: "hastek-portal-email",
  seeded: "hastek-demo-seeded",
} as const;

export const DEMO_ACCOUNT_ID = "acc-demo-oernek";
export const DEMO_ACCOUNT_EMAIL = "demo@hastekgroup.com";

const DEFAULT_REMINDERS: ReminderSettings = {
  enabled: true,
  channel: "whatsapp",
  leadDays: 14,
};

const EMPTY_SNAPSHOT: DemoSnapshot = {
  account: null,
  sessionEmail: null,
  configuratorResult: null,
  accounts: [],
  devices: [],
  maintenance: [],
  reminders: DEFAULT_REMINDERS,
};

/* ── Low-level read/write ──────────────────────────────────────────────── */

function readJSON<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw);
    return (parsed ?? fallback) as T;
  } catch {
    return fallback;
  }
}

function writeJSON(key: string, value: unknown) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(key, JSON.stringify(value));
}

function uid(prefix: string): string {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

function isoOffset(days: number): string {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString();
}

/* ── Demo seed (illustrative account) ──────────────────────────────────── */

function seedIfNeeded() {
  if (typeof window === "undefined") return;
  if (window.localStorage.getItem(K.seeded) === "1") return;

  const account: Account = {
    id: DEMO_ACCOUNT_ID,
    name: "Örnek Müşteri",
    email: DEMO_ACCOUNT_EMAIL,
    phone: "—",
    segment: "private-homes",
    locale: "tr",
    createdAt: isoOffset(-430),
    demo: true,
  };

  const devices: Device[] = [
    {
      id: "dev-cctv",
      accountId: DEMO_ACCOUNT_ID,
      serviceKey: "cctv",
      locationKey: "entrance",
      installedAt: isoOffset(-420),
      nextServiceDue: isoOffset(21),
      qrToken: "HAS-CCTV-4821",
    },
    {
      id: "dev-smart",
      accountId: DEMO_ACCOUNT_ID,
      serviceKey: "smartHome",
      locationKey: "livingRoom",
      installedAt: isoOffset(-300),
      nextServiceDue: isoOffset(150),
      qrToken: "HAS-SMART-1907",
    },
    {
      id: "dev-alarm",
      accountId: DEMO_ACCOUNT_ID,
      serviceKey: "alarm",
      locationKey: "entrance",
      installedAt: isoOffset(-420),
      nextServiceDue: isoOffset(-8),
      qrToken: "HAS-ALARM-3355",
    },
    {
      id: "dev-fire",
      accountId: DEMO_ACCOUNT_ID,
      serviceKey: "fire",
      locationKey: "kitchen",
      installedAt: isoOffset(-240),
      nextServiceDue: isoOffset(96),
      qrToken: "HAS-FIRE-7788",
    },
  ];

  const maintenance: MaintenanceRecord[] = [
    { id: "m1", deviceId: "dev-cctv", date: isoOffset(-420), kind: "install", technician: "Emre Altuntaş" },
    { id: "m2", deviceId: "dev-cctv", date: isoOffset(-235), kind: "inspection", technician: "Harun Çoban" },
    { id: "m3", deviceId: "dev-cctv", date: isoOffset(-55), kind: "service", technician: "Emre Altuntaş" },
    { id: "m4", deviceId: "dev-smart", date: isoOffset(-300), kind: "install", technician: "Harun Çoban" },
    { id: "m5", deviceId: "dev-smart", date: isoOffset(-120), kind: "inspection", technician: "Emre Altuntaş" },
    { id: "m6", deviceId: "dev-alarm", date: isoOffset(-420), kind: "install", technician: "Emre Altuntaş" },
    { id: "m7", deviceId: "dev-alarm", date: isoOffset(-235), kind: "inspection", technician: "Harun Çoban" },
    { id: "m8", deviceId: "dev-alarm", date: isoOffset(-30), kind: "reminderSent" },
    { id: "m9", deviceId: "dev-fire", date: isoOffset(-240), kind: "install", technician: "Harun Çoban" },
  ];

  writeJSON(K.accounts, [account]);
  writeJSON(K.devices, devices);
  writeJSON(K.maintenance, maintenance);
  writeJSON(K.reminders, DEFAULT_REMINDERS);
  window.localStorage.setItem(K.seeded, "1");
}

/* ── Snapshot cache + pub/sub ──────────────────────────────────────────── */

let cache: DemoSnapshot | null = null;
const listeners = new Set<() => void>();

function readAll(): DemoSnapshot {
  if (typeof window === "undefined") return EMPTY_SNAPSHOT;
  seedIfNeeded();
  const accounts = readJSON<Account[]>(K.accounts, []);
  const sessionEmail = window.sessionStorage.getItem(K.session);
  const account = sessionEmail
    ? accounts.find((a) => a.email.toLowerCase() === sessionEmail.toLowerCase()) ?? null
    : null;
  return {
    accounts,
    account,
    sessionEmail,
    configuratorResult: readJSON<ConfiguratorResult | null>(K.configurator, null),
    devices: readJSON<Device[]>(K.devices, []),
    maintenance: readJSON<MaintenanceRecord[]>(K.maintenance, []),
    reminders: readJSON<ReminderSettings>(K.reminders, DEFAULT_REMINDERS),
  };
}

function rebuild() {
  cache = readAll();
  listeners.forEach((l) => l());
}

function commit() {
  rebuild();
}

if (typeof window !== "undefined") {
  window.addEventListener("storage", rebuild);
}

function subscribe(cb: () => void): () => void {
  listeners.add(cb);
  return () => {
    listeners.delete(cb);
  };
}

function getSnapshot(): DemoSnapshot {
  if (cache === null) cache = readAll();
  return cache;
}

function getServerSnapshot(): DemoSnapshot {
  return EMPTY_SNAPSHOT;
}

/** Reactive access to the whole demo store (client components only). */
export function useDemoStore(): DemoSnapshot {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

/* ── Derived helpers (pure) ────────────────────────────────────────────── */

export function deviceStatus(device: Device, now: Date = new Date()): DeviceStatus {
  const due = new Date(device.nextServiceDue).getTime();
  const diffDays = (due - now.getTime()) / 86_400_000;
  if (diffDays < 0) return "overdue";
  if (diffDays <= 30) return "due";
  return "ok";
}

export function devicesForAccount(snapshot: DemoSnapshot, accountId: string): Device[] {
  return snapshot.devices.filter((d) => d.accountId === accountId);
}

export function maintenanceForDevice(snapshot: DemoSnapshot, deviceId: string): MaintenanceRecord[] {
  return snapshot.maintenance
    .filter((m) => m.deviceId === deviceId)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function findDeviceByToken(snapshot: DemoSnapshot, token: string): Device | null {
  return snapshot.devices.find((d) => d.qrToken.toLowerCase() === token.toLowerCase()) ?? null;
}

export function accountForDevice(snapshot: DemoSnapshot, device: Device): Account | null {
  return snapshot.accounts.find((a) => a.id === device.accountId) ?? null;
}

/** Date the next reminder for a device would be sent, given the settings. */
export function reminderSendDate(device: Device, reminders: ReminderSettings): Date {
  const due = new Date(device.nextServiceDue);
  due.setDate(due.getDate() - reminders.leadDays);
  return due;
}

/* ── Mutations ─────────────────────────────────────────────────────────── */

export function saveConfiguratorResult(
  input: Omit<ConfiguratorResult, "id" | "createdAt">
): ConfiguratorResult {
  const result: ConfiguratorResult = {
    ...input,
    id: uid("cfg"),
    createdAt: new Date().toISOString(),
  };
  writeJSON(K.configurator, result);
  commit();
  return result;
}

export function getConfiguratorResult(): ConfiguratorResult | null {
  return readJSON<ConfiguratorResult | null>(K.configurator, null);
}

export function clearConfiguratorResult() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(K.configurator);
  commit();
}

/** Create (or fetch existing) a customer account and start a portal session. */
export function upsertAccount(
  input: Omit<Account, "id" | "createdAt">
): Account {
  const accounts = readJSON<Account[]>(K.accounts, []);
  const existing = accounts.find((a) => a.email.toLowerCase() === input.email.toLowerCase());
  if (existing) {
    setPortalSession(existing.email);
    return existing;
  }
  const account: Account = {
    ...input,
    id: uid("acc"),
    createdAt: new Date().toISOString(),
  };
  writeJSON(K.accounts, [account, ...accounts]);
  setPortalSession(account.email);
  return account;
}

export function setPortalSession(email: string) {
  if (typeof window === "undefined") return;
  window.sessionStorage.setItem(K.session, email);
  commit();
}

export function clearPortalSession() {
  if (typeof window === "undefined") return;
  window.sessionStorage.removeItem(K.session);
  commit();
}

/** Demo login: succeeds if an account with this email exists (incl. the seed). */
export function loginPortal(email: string): boolean {
  const accounts = readJSON<Account[]>(K.accounts, []);
  const match = accounts.find((a) => a.email.toLowerCase() === email.trim().toLowerCase());
  if (!match) return false;
  setPortalSession(match.email);
  return true;
}

export function loginDemoAccount() {
  seedIfNeeded();
  setPortalSession(DEMO_ACCOUNT_EMAIL);
}

export function updateReminders(patch: Partial<ReminderSettings>) {
  const current = readJSON<ReminderSettings>(K.reminders, DEFAULT_REMINDERS);
  writeJSON(K.reminders, { ...current, ...patch });
  commit();
}
