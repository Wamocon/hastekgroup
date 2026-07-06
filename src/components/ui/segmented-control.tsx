"use client";

type SegmentOption<T extends string> = {
  value: T;
  label: React.ReactNode;
  ariaLabel?: string;
};

type SegmentedControlProps<T extends string> = {
  options: SegmentOption<T>[];
  value: T;
  onChange: (value: T) => void;
  className?: string;
};

export function SegmentedControl<T extends string>({
  options,
  value,
  onChange,
  className,
}: SegmentedControlProps<T>) {
  const activeIndex = Math.max(
    0,
    options.findIndex((option) => option.value === value)
  );
  const count = options.length;

  return (
    <div
      className={`relative inline-flex items-center rounded-full border border-[color:var(--border-gold)] bg-[color:var(--surface-muted)] p-1 ${className ?? ""}`}
      role="tablist"
    >
      <span
        aria-hidden="true"
        className="absolute inset-y-1 rounded-full bg-accent transition-transform duration-300 ease-out"
        style={{
          width: `calc((100% - 0.5rem) / ${count})`,
          transform: `translateX(calc(${activeIndex} * 100%))`,
        }}
      />
      {options.map((option) => {
        const isActive = option.value === value;
        return (
          <button
            key={option.value}
            type="button"
            role="tab"
            aria-selected={isActive}
            aria-label={option.ariaLabel}
            onClick={() => onChange(option.value)}
            className={`relative z-10 flex h-7 flex-1 items-center justify-center px-3 text-xs font-semibold uppercase tracking-wide transition-colors ${
              isActive ? "text-accent-contrast" : "text-foreground/70 hover:text-accent"
            }`}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
