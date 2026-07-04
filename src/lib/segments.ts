export const SEGMENT_KEYS = [
  "privateHomes",
  "newBuild",
  "hospitality",
  "retail",
  "gastronomy",
  "commercial",
] as const;

export type SegmentKey = (typeof SEGMENT_KEYS)[number];

export const SEGMENT_SLUGS: Record<SegmentKey, string> = {
  privateHomes: "private-homes",
  newBuild: "new-build-developers",
  hospitality: "hospitality",
  retail: "retail-markets",
  gastronomy: "gastronomy",
  commercial: "commercial-parking",
};

export function segmentKeyFromSlug(slug: string): SegmentKey | undefined {
  return SEGMENT_KEYS.find((key) => SEGMENT_SLUGS[key] === slug);
}

export const SERVICE_KEYS = [
  "smartHome",
  "smartLock",
  "videoIntercom",
  "cctv",
  "alarm",
  "fire",
  "barrier",
  "sound",
  "internet",
  "retailPos",
  "restaurantPos",
] as const;

export type ServiceKey = (typeof SERVICE_KEYS)[number];
