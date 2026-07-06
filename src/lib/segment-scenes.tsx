import { ScenePrivateHomes } from "@/components/illustrations/scene-private-homes";
import { SceneNewBuild } from "@/components/illustrations/scene-new-build";
import { SceneHospitality } from "@/components/illustrations/scene-hospitality";
import { SceneRetail } from "@/components/illustrations/scene-retail";
import { SceneGastronomy } from "@/components/illustrations/scene-gastronomy";
import { SceneCommercial } from "@/components/illustrations/scene-commercial";

type SceneComponent = (props: { className?: string }) => React.ReactNode;

export const SEGMENT_SCENES: Record<string, SceneComponent> = {
  "private-homes": ScenePrivateHomes,
  "new-build-developers": SceneNewBuild,
  hospitality: SceneHospitality,
  "retail-markets": SceneRetail,
  gastronomy: SceneGastronomy,
  "commercial-parking": SceneCommercial,
};
