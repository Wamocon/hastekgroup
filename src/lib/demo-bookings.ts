export type DemoBooking = {
  id: string;
  name: string;
  email: string;
  phone: string;
  segment: string;
  serviceType: string;
  preferredDate: string;
  message: string;
  createdAt: string;
};

const STORAGE_KEY = "hastek-demo-bookings";

export function getDemoBookings(): DemoBooking[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function addDemoBooking(booking: Omit<DemoBooking, "id" | "createdAt">): DemoBooking {
  const entry: DemoBooking = {
    ...booking,
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    createdAt: new Date().toISOString(),
  };
  const current = getDemoBookings();
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify([entry, ...current]));
  return entry;
}
