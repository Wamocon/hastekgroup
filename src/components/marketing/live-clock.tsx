"use client";

import { useSyncExternalStore } from "react";

function formatAlanyaTime(date: Date) {
  return new Intl.DateTimeFormat("de-DE", {
    timeZone: "Europe/Istanbul",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

function subscribe(onStoreChange: () => void) {
  const interval = window.setInterval(onStoreChange, 15000);
  return () => window.clearInterval(interval);
}

function getSnapshot() {
  return formatAlanyaTime(new Date());
}

function getServerSnapshot() {
  return "--:--";
}

export function LiveClock({ label = "Alanya" }: { label?: string }) {
  const time = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  return (
    <span className="font-mono text-xs tracking-[0.08em] text-muted-foreground">
      {label} · {time}
    </span>
  );
}
