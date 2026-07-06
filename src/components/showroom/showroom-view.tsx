"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { ArrowRight, Info } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { SEGMENT_SLUGS } from "@/lib/segments";
import { SEGMENT_SCENES } from "@/lib/segment-scenes";
import { WhatsAppButton } from "@/components/layout/whatsapp-button";
import { LiveClock } from "@/components/marketing/live-clock";
import { useMagnetic } from "@/lib/use-magnetic";
import { CameraTile, type MotionConfig } from "./camera-tile";

type CamLabelKey = "entrance" | "drive" | "pool" | "lobby";

type Camera = {
  camId: string;
  slug: string;
  labelKey: CamLabelKey;
  motion: MotionConfig;
};

/** Four distinct scenes wired to four fictional camera positions. */
const CAMERAS: Camera[] = [
  {
    camId: "CAM 01",
    slug: SEGMENT_SLUGS.privateHomes,
    labelKey: "entrance",
    motion: { left: "30%", top: "44%", width: "22%", height: "27%", driftX: "11px", driftY: "-7px" },
  },
  {
    camId: "CAM 02",
    slug: SEGMENT_SLUGS.commercial,
    labelKey: "drive",
    motion: { left: "52%", top: "40%", width: "20%", height: "24%", driftX: "-9px", driftY: "8px" },
  },
  {
    camId: "CAM 03",
    slug: SEGMENT_SLUGS.hospitality,
    labelKey: "pool",
    motion: { left: "38%", top: "52%", width: "24%", height: "22%", driftX: "12px", driftY: "6px" },
  },
  {
    camId: "CAM 04",
    slug: SEGMENT_SLUGS.newBuild,
    labelKey: "lobby",
    motion: { left: "44%", top: "42%", width: "20%", height: "28%", driftX: "-10px", driftY: "-8px" },
  },
];

const STAMP_PLACEHOLDER = "---- -- -- --:--:--";

function formatStamp(date: Date): string {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/Istanbul",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).formatToParts(date);
  const get = (type: string) => parts.find((part) => part.type === type)?.value ?? "--";
  return `${get("year")}-${get("month")}-${get("day")} ${get("hour")}:${get("minute")}:${get("second")}`;
}

export function ShowroomView() {
  const t = useTranslations("showroom");
  const [activeId, setActiveId] = useState<string>(CAMERAS[0].camId);
  const [now, setNow] = useState<Date | null>(null);
  const magneticRef = useMagnetic<HTMLDivElement>();

  // Seconds-resolution timestamp shared across every tile (mirrors a real NVR clock).
  // Initial paint via rAF (not a synchronous setState in the effect body).
  useEffect(() => {
    const raf = window.requestAnimationFrame(() => setNow(new Date()));
    const id = window.setInterval(() => setNow(new Date()), 1000);
    return () => {
      window.cancelAnimationFrame(raf);
      window.clearInterval(id);
    };
  }, []);

  const timestamp = now ? formatStamp(now) : STAMP_PLACEHOLDER;
  const activeCam = CAMERAS.find((cam) => cam.camId === activeId) ?? CAMERAS[0];
  const ActiveScene = SEGMENT_SCENES[activeCam.slug];

  return (
    <section className="container-hastek py-16 md:py-20">
      {/* Header */}
      <div className="max-w-2xl">
        <span className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-accent-text-safe dark:text-accent">
          {t("eyebrow")}
        </span>
        <h1 className="font-display mt-3 text-3xl font-semibold tracking-tight md:text-5xl">{t("title")}</h1>
        <p className="mt-4 text-muted-foreground">{t("intro")}</p>
      </div>

      {/* Wall status bar */}
      <div className="mt-10 flex flex-wrap items-center justify-between gap-4">
        <span className="inline-flex items-center gap-2 rounded-full border border-[color:var(--border-gold)] bg-surface px-3 py-1 font-mono text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-accent-text-safe dark:text-accent">
          <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--accent)]" />
          {t("simulationBadge")}
        </span>
        <div className="flex items-center gap-2">
          <span className="rec-blink h-1.5 w-1.5 rounded-full bg-[color:var(--accent)]" />
          <span className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-muted-foreground">
            {t("liveLabel")}
          </span>
          <span aria-hidden className="text-muted-foreground/50">
            ·
          </span>
          <LiveClock />
        </div>
      </div>

      {/* Camera wall */}
      <div className="mt-4">
        <CameraTile
          scene={ActiveScene}
          camId={activeCam.camId}
          label={t(`camLabels.${activeCam.labelKey}`)}
          recLabel={t("recLabel")}
          motionLabel={t("motionLabel")}
          timestamp={timestamp}
          motion={activeCam.motion}
          main
          aspectClassName="aspect-[4/3] sm:aspect-[16/10] lg:aspect-[16/9]"
        />

        <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {CAMERAS.map((cam) => {
            const Scene = SEGMENT_SCENES[cam.slug];
            const label = t(`camLabels.${cam.labelKey}`);
            const isActive = cam.camId === activeId;
            return (
              <button
                key={cam.camId}
                type="button"
                onClick={() => setActiveId(cam.camId)}
                aria-pressed={isActive}
                aria-label={`${cam.camId} · ${label}`}
                className={`group rounded-xl transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent)] ${
                  isActive
                    ? "ring-2 ring-[color:var(--accent)]"
                    : "opacity-80 hover:opacity-100 focus-visible:opacity-100"
                }`}
              >
                <CameraTile
                  scene={Scene}
                  camId={cam.camId}
                  label={label}
                  recLabel={t("recLabel")}
                  motionLabel={t("motionLabel")}
                  timestamp={timestamp}
                  motion={cam.motion}
                />
              </button>
            );
          })}
        </div>
      </div>

      {/* Disclaimer */}
      <div className="mt-4 flex max-w-3xl items-start gap-3 rounded-2xl border border-[color:var(--border-gold)] bg-surface-muted p-4 text-sm text-muted-foreground">
        <Info className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
        <p>{t("disclaimer")}</p>
      </div>

      {/* CTA */}
      <div className="panel-obsidian border-gold-metallic--obsidian mt-12 rounded-2xl p-8 md:p-10">
        <div className="flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
          <h2 className="font-display max-w-lg text-2xl font-semibold tracking-tight text-white md:text-3xl">
            {t("ctaTitle")}
          </h2>
          <div className="flex flex-wrap items-center gap-4">
            <div ref={magneticRef} className="inline-flex">
              <Link href="/booking" className="btn-primary">
                {t("ctaBook")}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <WhatsAppButton
              className="btn-secondary !border-[color:var(--border-gold)] !text-accent"
              label={t("ctaWhatsapp")}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
