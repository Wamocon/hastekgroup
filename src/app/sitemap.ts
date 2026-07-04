import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { SEGMENT_KEYS, SEGMENT_SLUGS } from "@/lib/segments";

const STATIC_PATHS = ["", "/trust", "/faq", "/booking", "/legal/impressum", "/legal/agb", "/legal/datenschutz"];

export default function sitemap(): MetadataRoute.Sitemap {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  const segmentPaths = SEGMENT_KEYS.map((key) => `/segments/${SEGMENT_SLUGS[key]}`);
  const paths = [...STATIC_PATHS, ...segmentPaths];

  return routing.locales.flatMap((locale) =>
    paths.map((path) => ({
      url: `${appUrl}/${locale}${path}`,
      lastModified: new Date(),
    }))
  );
}
