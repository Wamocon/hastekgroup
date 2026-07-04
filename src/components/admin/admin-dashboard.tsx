"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { useTranslations } from "next-intl";
import { LogOut, Star } from "lucide-react";
import { useRouter } from "@/i18n/navigation";
import { isAdminSession, clearAdminSession } from "@/lib/demo-auth";
import { getDemoBookings } from "@/lib/demo-bookings";
import { segmentKeyFromSlug } from "@/lib/segments";

const DEMO_REVIEWS = [
  { author: "K. Novak", rating: 5, text: "Fast, tidy CCTV install for our villa near the beach." },
  { author: "M. Ivanova", rating: 5, text: "Smart-lock + intercom setup explained clearly in Russian." },
  { author: "A. Yildiz", rating: 4, text: "Restaurant POS switch went smoothly during a busy week." },
];

function subscribeNever() {
  return () => {};
}

export function AdminDashboard() {
  const t = useTranslations("admin");
  const tSegments = useTranslations("segments");
  const router = useRouter();
  const [tab, setTab] = useState<"bookings" | "reviews">("bookings");
  const authorized = useSyncExternalStore(subscribeNever, isAdminSession, () => false);
  const bookings = useSyncExternalStore(subscribeNever, getDemoBookings, () => []);

  useEffect(() => {
    if (!authorized) {
      router.replace("/admin");
    }
  }, [authorized, router]);

  if (!authorized) return null;

  function handleLogout() {
    clearAdminSession();
    router.push("/admin");
  }

  return (
    <div className="container-hastek py-10">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">{t("dashboardTitle")}</h1>
        <button
          type="button"
          onClick={handleLogout}
          className="flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm hover:border-accent hover:text-accent"
        >
          <LogOut className="h-4 w-4" />
          {t("logout")}
        </button>
      </div>

      <div className="mt-6 flex gap-2">
        <TabButton active={tab === "bookings"} onClick={() => setTab("bookings")}>
          {t("tabs.bookings")}
        </TabButton>
        <TabButton active={tab === "reviews"} onClick={() => setTab("reviews")}>
          {t("tabs.reviews")}
        </TabButton>
      </div>

      {tab === "bookings" ? (
        <div className="mt-6 overflow-x-auto rounded-2xl border border-border bg-surface">
          {bookings.length === 0 ? (
            <p className="p-8 text-center text-sm text-muted-foreground">{t("emptyBookings")}</p>
          ) : (
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead className="border-b border-border text-xs uppercase tracking-wide text-muted-foreground">
                <tr>
                  <th className="px-4 py-3">{t("columns.name")}</th>
                  <th className="px-4 py-3">{t("columns.contact")}</th>
                  <th className="px-4 py-3">{t("columns.segment")}</th>
                  <th className="px-4 py-3">{t("columns.type")}</th>
                  <th className="px-4 py-3">{t("columns.date")}</th>
                  <th className="px-4 py-3">{t("columns.status")}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {bookings.map((booking) => {
                  const key = segmentKeyFromSlug(booking.segment);
                  return (
                    <tr key={booking.id}>
                      <td className="px-4 py-3 font-medium">{booking.name}</td>
                      <td className="px-4 py-3 text-muted-foreground">
                        {booking.email}
                        <br />
                        {booking.phone}
                      </td>
                      <td className="px-4 py-3">{key ? tSegments(`${key}.shortLabel`) : booking.segment}</td>
                      <td className="px-4 py-3">{booking.serviceType}</td>
                      <td className="px-4 py-3">{booking.preferredDate || "-"}</td>
                      <td className="px-4 py-3">
                        <span className="rounded-full bg-accent/15 px-2.5 py-1 text-xs font-medium text-accent">
                          {t("statusNew")}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      ) : (
        <div className="mt-6">
          <p className="mb-4 text-sm text-muted-foreground">{t("reviewsDemoNotice")}</p>
          <div className="grid gap-4 md:grid-cols-3">
            {DEMO_REVIEWS.map((review) => (
              <div key={review.author} className="rounded-2xl border border-border bg-surface p-5">
                <div className="flex gap-0.5 text-accent">
                  {Array.from({ length: review.rating }).map((_, index) => (
                    <Star key={index} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <p className="mt-3 text-sm leading-relaxed">{review.text}</p>
                <p className="mt-3 text-xs text-muted-foreground">{review.author}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function TabButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
        active ? "bg-accent text-accent-contrast" : "border border-border text-foreground/75 hover:border-accent"
      }`}
    >
      {children}
    </button>
  );
}
