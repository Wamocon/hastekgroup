import { SEGMENT_SCENES } from "@/lib/segment-scenes";
import { MockupDashboard } from "@/components/illustrations/mockup-dashboard";
import { MockupConciergePhone } from "@/components/illustrations/mockup-concierge-phone";
import type { GalleryItem } from "@/lib/gallery";

export function GalleryVisual({ item, className }: { item: GalleryItem; className?: string }) {
  if (item.visual.kind === "scene") {
    const Scene = SEGMENT_SCENES[item.visual.slug];
    return Scene ? <Scene className={className} /> : null;
  }
  if (item.visual.name === "dashboard") {
    return <MockupDashboard className={className} />;
  }
  return <MockupConciergePhone className={className} />;
}
