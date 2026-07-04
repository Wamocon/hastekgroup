import {
  Home,
  KeyRound,
  Video,
  Camera,
  ShieldAlert,
  Flame,
  ParkingSquare,
  Volume2,
  Wifi,
  ScanBarcode,
  Receipt,
  type LucideIcon,
} from "lucide-react";
import type { ServiceKey } from "./segments";

export const SERVICE_ICONS: Record<ServiceKey, LucideIcon> = {
  smartHome: Home,
  smartLock: KeyRound,
  videoIntercom: Video,
  cctv: Camera,
  alarm: ShieldAlert,
  fire: Flame,
  barrier: ParkingSquare,
  sound: Volume2,
  internet: Wifi,
  retailPos: ScanBarcode,
  restaurantPos: Receipt,
};
