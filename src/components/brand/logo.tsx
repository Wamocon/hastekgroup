import Image from "next/image";

type LogoProps = {
  className?: string;
  /** Larger presence for hero/footer placements. */
  size?: "sm" | "md" | "lg";
};

const IMG_HEIGHT: Record<NonNullable<LogoProps["size"]>, string> = {
  sm: "h-8",
  md: "h-9",
  lg: "h-12",
};

/**
 * The real HAS Teknoloji logo ships as a red-on-white asset, so instead of a
 * bare white box we frame it as an intentional premium name-plate: a warm-white
 * plaque with a metallic-gold ring and a soft shadow that reads as a luxury
 * embossed card on light backgrounds and glows quietly on the obsidian ones.
 */
export function Logo({ className, size = "md" }: LogoProps) {
  return (
    <span
      className={`inline-flex items-center rounded-xl bg-white px-3 py-2 ring-1 ring-[color:var(--gold-base)]/45 shadow-[0_6px_18px_-6px_rgba(0,0,0,0.22)] dark:ring-[color:var(--gold-hi)]/50 dark:shadow-[0_0_22px_-4px_rgba(214,180,92,0.4)] ${className ?? ""}`}
    >
      <Image
        src="/brand/has-teknoloji-logo.jpg"
        alt="HAS Teknoloji - Hastek Group"
        width={168}
        height={54}
        priority
        className={`${IMG_HEIGHT[size]} w-auto object-contain`}
      />
    </span>
  );
}
