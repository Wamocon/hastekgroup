import {
  SEGMENT_KEYS,
  SEGMENT_SLUGS,
  type SegmentKey,
  type ServiceKey,
} from "@/lib/segments";

/**
 * configurator-logic — the pure question/option model + recommendation mapping
 * behind the 3-step Leistungs-Konfigurator.
 *
 * Display strings deliberately live OUTSIDE this file: every option is
 * referenced by a stable id, and the wizard resolves labels from messages
 * (Q1 reuses the existing `segments` shortLabels/labels; Q2/Q3 use the
 * `configurator` namespace). This keeps the mapping language-agnostic.
 *
 * Flow:
 *   Q1 property type -> a SegmentKey (carries the segment's own baseline systems)
 *   Q2 biggest priority -> a PriorityId (+ systems to emphasise)
 *   Q3 how it is used -> a UsageId (+ systems to refine)
 * recommend() unions the segment's own solutions with the priority and usage
 * systems, dedupes while preserving a sensible order, and caps the package.
 */

export type QuestionId = "segment" | "priority" | "usage";

/** Ordered step metadata; titleKey/subtitleKey resolve in the `configurator` namespace. */
export const QUESTIONS: { id: QuestionId; titleKey: string; subtitleKey: string }[] = [
  { id: "segment", titleKey: "q1Title", subtitleKey: "q1Subtitle" },
  { id: "priority", titleKey: "q2Title", subtitleKey: "q2Subtitle" },
  { id: "usage", titleKey: "q3Title", subtitleKey: "q3Subtitle" },
];

export const TOTAL_STEPS = QUESTIONS.length;

/** Q1 options — one per segment. Display via the `segments` shortLabels/labels. */
export const SEGMENT_OPTIONS: readonly SegmentKey[] = SEGMENT_KEYS;

/** Q2 options — the visitor's single biggest priority. */
export const PRIORITY_IDS = [
  "away",
  "coverage",
  "access",
  "safety",
  "connectivity",
  "operations",
] as const;
export type PriorityId = (typeof PRIORITY_IDS)[number];

/** Q3 options — how the property is actually used. */
export const USAGE_IDS = ["yearRound", "mostlyAway", "seasonal"] as const;
export type UsageId = (typeof USAGE_IDS)[number];

/** Systems emphasised by the chosen priority (Q2). Universally sensible per segment. */
export const PRIORITY_SYSTEMS: Record<PriorityId, ServiceKey[]> = {
  away: ["cctv", "alarm", "smartHome"],
  coverage: ["cctv", "alarm"],
  access: ["smartLock", "videoIntercom"],
  safety: ["fire", "alarm"],
  connectivity: ["internet"],
  operations: ["internet", "sound"],
};

/** Systems refined by how the property is used (Q3). */
export const USAGE_SYSTEMS: Record<UsageId, ServiceKey[]> = {
  yearRound: ["smartHome"],
  mostlyAway: ["cctv", "alarm", "smartHome"],
  seasonal: ["smartLock", "internet"],
};

/** Keep packages focused: a handful of interlocking systems, never a wish list. */
const MAX_SYSTEMS = 6;

export type Recommendation = {
  /** Segment slug, e.g. "private-homes". */
  segment: string;
  systems: ServiceKey[];
};

/**
 * Build the recommended package.
 *
 * Order: the segment's own curated baseline leads (its signature system is
 * authored first, so it is never trimmed), followed by the priority and usage
 * additions. Duplicates are removed preserving that order, then the list is
 * capped at MAX_SYSTEMS.
 *
 * `segmentSolutions` is passed in by the wizard from the `segments` messages
 * (t.raw(`${key}.solutions`)) so this module stays free of copy.
 */
export function recommend(
  segmentKey: SegmentKey,
  priorityId: PriorityId,
  usageId: UsageId,
  segmentSolutions: ServiceKey[]
): Recommendation {
  const merged: ServiceKey[] = [
    ...segmentSolutions,
    ...PRIORITY_SYSTEMS[priorityId],
    ...USAGE_SYSTEMS[usageId],
  ];

  const seen = new Set<ServiceKey>();
  const systems: ServiceKey[] = [];
  for (const key of merged) {
    if (!seen.has(key)) {
      seen.add(key);
      systems.push(key);
    }
  }

  return {
    segment: SEGMENT_SLUGS[segmentKey],
    systems: systems.slice(0, MAX_SYSTEMS),
  };
}
