import Image from "next/image";

type LogoProps = {
  className?: string;
};

export function Logo({ className }: LogoProps) {
  return (
    <span
      className={`inline-flex items-center rounded-lg bg-white px-2.5 py-1.5 shadow-sm ${className ?? ""}`}
    >
      <Image
        src="/brand/has-teknoloji-logo.jpg"
        alt="HAS Teknoloji - Hastek Group"
        width={168}
        height={54}
        priority
        className="h-8 w-auto object-contain"
      />
    </span>
  );
}
