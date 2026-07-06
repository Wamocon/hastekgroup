import { SEGMENT_KEYS, SEGMENT_SLUGS, type SegmentKey } from "./segments";

export type GalleryCategory = SegmentKey | "systems";

export type GalleryItem = {
  id: string;
  /** category key used by the filter + for the translated caption */
  category: GalleryCategory;
  /** which visual to render: a segment slug scene or a named system mockup */
  visual: { kind: "scene"; slug: string } | { kind: "mockup"; name: "dashboard" | "phone" };
};

/**
 * Gallery is built from the site's own gold-engraving illustrations. These are
 * deliberately-labelled "Örnek Görünüm" placeholders: the grid, filter and
 * lightbox are the real, finished feature; real project photos drop straight
 * into the same slots once Hastek provides them (zero-fabrication rule - no
 * invented photography).
 */
export const GALLERY_ITEMS: GalleryItem[] = [
  ...SEGMENT_KEYS.map(
    (key): GalleryItem => ({
      id: `segment-${SEGMENT_SLUGS[key]}`,
      category: key,
      visual: { kind: "scene", slug: SEGMENT_SLUGS[key] },
    })
  ),
  { id: "system-dashboard", category: "systems", visual: { kind: "mockup", name: "dashboard" } },
  { id: "system-phone", category: "systems", visual: { kind: "mockup", name: "phone" } },
];

export const GALLERY_CATEGORIES: GalleryCategory[] = [...SEGMENT_KEYS, "systems"];
