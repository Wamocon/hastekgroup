"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import {
  ArrowRight,
  Check,
  ChevronLeft,
  RotateCcw,
  Home,
  Building2,
  Hotel,
  Store,
  UtensilsCrossed,
  Car,
  Plane,
  Camera,
  KeyRound,
  Flame,
  Wifi,
  Gauge,
  CalendarCheck,
  PlaneTakeoff,
  Sun,
  type LucideIcon,
} from "lucide-react";
import { Link } from "@/i18n/navigation";
import { SEGMENT_SLUGS, type SegmentKey, type ServiceKey } from "@/lib/segments";
import { SERVICE_ICONS } from "@/lib/service-icons";
import { SEGMENT_SCENES } from "@/lib/segment-scenes";
import {
  QUESTIONS,
  TOTAL_STEPS,
  SEGMENT_OPTIONS,
  PRIORITY_IDS,
  USAGE_IDS,
  recommend,
  type PriorityId,
  type UsageId,
  type Recommendation,
} from "@/lib/configurator-logic";
import { saveConfiguratorResult, clearConfiguratorResult } from "@/lib/demo-store";
import { WhatsAppButton } from "@/components/layout/whatsapp-button";
import { SeljukStar } from "@/components/ornament/seljuk-star";
import { Reveal } from "@/components/ui/reveal";
import { useMagnetic } from "@/lib/use-magnetic";

const SEGMENT_ICONS: Record<SegmentKey, LucideIcon> = {
  privateHomes: Home,
  newBuild: Building2,
  hospitality: Hotel,
  retail: Store,
  gastronomy: UtensilsCrossed,
  commercial: Car,
};

const PRIORITY_ICONS: Record<PriorityId, LucideIcon> = {
  away: Plane,
  coverage: Camera,
  access: KeyRound,
  safety: Flame,
  connectivity: Wifi,
  operations: Gauge,
};

const USAGE_ICONS: Record<UsageId, LucideIcon> = {
  yearRound: CalendarCheck,
  mostlyAway: PlaneTakeoff,
  seasonal: Sun,
};

export function Configurator() {
  const t = useTranslations("configurator");
  const tSegments = useTranslations("segments");

  const [stepIndex, setStepIndex] = useState(0);
  const [segmentKey, setSegmentKey] = useState<SegmentKey | null>(null);
  const [priorityId, setPriorityId] = useState<PriorityId | null>(null);
  const [usageId, setUsageId] = useState<UsageId | null>(null);
  const [result, setResult] = useState<{
    recommendation: Recommendation;
    segmentKey: SegmentKey;
  } | null>(null);

  const canAdvance =
    stepIndex === 0
      ? segmentKey !== null
      : stepIndex === 1
        ? priorityId !== null
        : usageId !== null;
  const isLast = stepIndex === TOTAL_STEPS - 1;

  function finish() {
    if (!segmentKey || !priorityId || !usageId) return;
    const solutions = tSegments.raw(`${segmentKey}.solutions`) as ServiceKey[];
    const recommendation = recommend(segmentKey, priorityId, usageId, solutions);
    saveConfiguratorResult({
      segment: recommendation.segment,
      systems: recommendation.systems,
      answers: [segmentKey, priorityId, usageId],
      priority: priorityId,
    });
    setResult({ recommendation, segmentKey });
  }

  function handleNext() {
    if (!canAdvance) return;
    if (isLast) finish();
    else setStepIndex((i) => i + 1);
  }

  function handleBack() {
    setStepIndex((i) => Math.max(0, i - 1));
  }

  function handleRestart() {
    clearConfiguratorResult();
    setSegmentKey(null);
    setPriorityId(null);
    setUsageId(null);
    setStepIndex(0);
    setResult(null);
  }

  if (result) {
    return (
      <ResultScreen
        segmentKey={result.segmentKey}
        systems={result.recommendation.systems}
        onRestart={handleRestart}
      />
    );
  }

  const question = QUESTIONS[stepIndex];

  return (
    <div className="mx-auto max-w-3xl">
      <div className="card-elevated border-gold-metallic rounded-3xl p-6 md:p-10">
        {/* Progress */}
        <div className="flex items-center justify-between gap-4">
          <span className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
            {t("stepLabel", { current: stepIndex + 1, total: TOTAL_STEPS })}
          </span>
          <SeljukStar className="h-5 w-5 text-accent opacity-60" />
        </div>
        <div className="mt-3 flex gap-1.5" aria-hidden="true">
          {QUESTIONS.map((q, i) => (
            <span
              key={q.id}
              className={`h-1 flex-1 rounded-full transition-colors ${
                i <= stepIndex ? "bg-accent" : "bg-border"
              }`}
            />
          ))}
        </div>

        {/* Question */}
        <Reveal key={question.id} className="mt-8">
          <h2 className="font-display text-xl font-semibold md:text-2xl">{t(question.titleKey)}</h2>
          <p className="mt-2 text-sm text-muted-foreground">{t(question.subtitleKey)}</p>

          <div className={`mt-6 grid gap-3 ${stepIndex === 2 ? "" : "sm:grid-cols-2"}`}>
            {stepIndex === 0
              ? SEGMENT_OPTIONS.map((key) => (
                  <OptionCard
                    key={key}
                    icon={SEGMENT_ICONS[key]}
                    title={tSegments(`${key}.shortLabel`)}
                    description={tSegments(`${key}.label`)}
                    selected={segmentKey === key}
                    onSelect={() => setSegmentKey(key)}
                  />
                ))
              : stepIndex === 1
                ? PRIORITY_IDS.map((id) => (
                    <OptionCard
                      key={id}
                      icon={PRIORITY_ICONS[id]}
                      title={t(`priority.${id}.label`)}
                      description={t(`priority.${id}.desc`)}
                      selected={priorityId === id}
                      onSelect={() => setPriorityId(id)}
                    />
                  ))
                : USAGE_IDS.map((id) => (
                    <OptionCard
                      key={id}
                      icon={USAGE_ICONS[id]}
                      title={t(`usage.${id}.label`)}
                      description={t(`usage.${id}.desc`)}
                      selected={usageId === id}
                      onSelect={() => setUsageId(id)}
                    />
                  ))}
          </div>
        </Reveal>

        {/* Navigation */}
        <div className="mt-8 flex items-center justify-between gap-4 border-t border-border pt-6">
          <button
            type="button"
            onClick={handleBack}
            disabled={stepIndex === 0}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground disabled:pointer-events-none disabled:opacity-40"
          >
            <ChevronLeft className="h-4 w-4" />
            {t("back")}
          </button>
          <button
            type="button"
            onClick={handleNext}
            disabled={!canAdvance}
            className="btn-primary disabled:pointer-events-none disabled:opacity-50"
          >
            {isLast ? t("seeResult") : t("next")}
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

function OptionCard({
  icon: Icon,
  title,
  description,
  selected,
  onSelect,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onSelect}
      className={`group flex w-full items-start gap-4 rounded-2xl border p-4 text-left transition-colors ${
        selected
          ? "border-gold-metallic bg-surface-muted"
          : "border-border bg-surface hover:border-[color:var(--border-gold)]"
      }`}
    >
      <span
        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border transition-colors ${
          selected
            ? "border-[color:var(--border-gold)] bg-accent/10 text-accent"
            : "border-border text-muted-foreground group-hover:text-accent"
        }`}
      >
        <Icon className="h-5 w-5" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block font-medium text-foreground">{title}</span>
        <span className="mt-1 block text-sm text-muted-foreground">{description}</span>
      </span>
      <span
        aria-hidden="true"
        className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition-colors ${
          selected ? "border-accent bg-accent text-accent-contrast" : "border-border"
        }`}
      >
        {selected ? <Check className="h-3.5 w-3.5" /> : null}
      </span>
    </button>
  );
}

function ResultScreen({
  segmentKey,
  systems,
  onRestart,
}: {
  segmentKey: SegmentKey;
  systems: ServiceKey[];
  onRestart: () => void;
}) {
  const t = useTranslations("configurator");
  const tSegments = useTranslations("segments");
  const tServices = useTranslations("home.services");
  const magneticRef = useMagnetic<HTMLSpanElement>();
  const Scene = SEGMENT_SCENES[SEGMENT_SLUGS[segmentKey]];

  return (
    <div className="mx-auto max-w-4xl">
      <Reveal>
        <div className="card-elevated border-gold-metallic rounded-3xl p-6 md:p-10">
          <div className="flex items-center gap-2 text-accent">
            <SeljukStar className="h-5 w-5" />
            <span className="font-mono text-xs uppercase tracking-[0.2em]">{t("resultEyebrow")}</span>
          </div>
          <h2 className="font-display mt-4 text-2xl font-semibold tracking-tight md:text-3xl">
            {t("resultTitle")}
          </h2>
          <p className="mt-3 max-w-2xl text-muted-foreground">{t("resultLead")}</p>

          <div className="mt-8 grid gap-8 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
            {/* Profile */}
            <div className="panel-obsidian border-gold-metallic--obsidian rounded-2xl p-6 text-white">
              <p className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-white/50">
                {t("yourSegmentLabel")}
              </p>
              <p className="font-display mt-2 text-2xl font-semibold">
                {tSegments(`${segmentKey}.shortLabel`)}
              </p>
              <p className="mt-1 text-sm text-white/70">{tSegments(`${segmentKey}.label`)}</p>
              {Scene ? (
                <div className="mt-6 flex justify-center">
                  <Scene className="max-h-40 w-auto max-w-full" />
                </div>
              ) : null}
            </div>

            {/* Systems */}
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
                {t("recommendedLabel")}
              </p>
              <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                {systems.map((key) => {
                  const Icon = SERVICE_ICONS[key];
                  return (
                    <li
                      key={key}
                      className="flex items-center gap-3 rounded-xl border border-border bg-surface p-3"
                    >
                      <Icon className="h-5 w-5 shrink-0 text-accent" />
                      <span className="text-sm font-medium">{tServices(key)}</span>
                      <Check className="ml-auto h-4 w-4 text-accent" />
                    </li>
                  );
                })}
              </ul>
              <div className="mt-4 rounded-xl border border-[color:var(--border-gold)] bg-surface-muted p-4">
                <p className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-accent-text-safe">
                  {t("packageLabel")}
                </p>
                <p className="mt-1.5 text-sm text-muted-foreground">{t("packageHint")}</p>
              </div>
            </div>
          </div>

          {/* CTAs */}
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <span ref={magneticRef} className="inline-block">
              <Link href="/booking" className="btn-primary">
                {t("ctaBook")}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </span>
            <WhatsAppButton className="btn-secondary" label={t("ctaWhatsapp")} />
            <button
              type="button"
              onClick={onRestart}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              <RotateCcw className="h-4 w-4" />
              {t("restart")}
            </button>
          </div>

          <p className="mt-6 border-t border-border pt-5 text-xs text-muted-foreground">
            {t("disclaimer")}
          </p>
        </div>
      </Reveal>
    </div>
  );
}
