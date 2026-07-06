"use client";

type SceneComponent = (props: { className?: string }) => React.ReactNode;

/** CSS style object that also allows CSS custom properties. */
type StyleVars = React.CSSProperties & Record<`--${string}`, string>;

export type MotionConfig = {
  /** Left offset of the tracking box, e.g. "34%". */
  left: string;
  /** Top offset of the tracking box, e.g. "46%". */
  top: string;
  width: string;
  height: string;
  /** Horizontal drift for the .track-box animation, e.g. "10px". */
  driftX: string;
  /** Vertical drift for the .track-box animation, e.g. "-6px". */
  driftY: string;
};

type CameraTileProps = {
  scene: SceneComponent;
  /** Short camera id, e.g. "CAM 01". */
  camId: string;
  /** Location label shown in the lower bar. */
  label: string;
  /** Localised "REC" label. */
  recLabel: string;
  /** Localised "motion detected" tag. */
  motionLabel: string;
  /** Live, ticking timestamp string (updated by the parent). */
  timestamp: string;
  motion: MotionConfig;
  /** Larger overlay text for the promoted main tile. */
  main?: boolean;
  /** Aspect-ratio utility for the frame. Defaults to 4:3 (matches the scenes). */
  aspectClassName?: string;
  className?: string;
};

/**
 * A single simulated CCTV tile: an obsidian-framed panel wrapping a segment
 * scene illustration with REC/timestamp, a drifting motion-detection box, a
 * scanline sweep and a faint scanline grid. Purely presentational.
 */
export function CameraTile({
  scene: Scene,
  camId,
  label,
  recLabel,
  motionLabel,
  timestamp,
  motion,
  main = false,
  aspectClassName = "aspect-[4/3]",
  className,
}: CameraTileProps) {
  const overlayText = main ? "text-[0.7rem] md:text-xs" : "text-[0.55rem]";

  return (
    <div
      className={
        "relative w-full select-none overflow-hidden rounded-xl border border-[color:var(--obsidian-line)] bg-[color:var(--obsidian)] " +
        `${aspectClassName} ${className ?? ""}`
      }
    >
      {/* Scene illustration — forced to a cool monochrome tint on the always-dark tile.
          The descendant selector (higher specificity) overrides each scene's own colour. */}
      <div className="pointer-events-none absolute inset-0 [&_svg]:absolute [&_svg]:inset-0 [&_svg]:h-full [&_svg]:w-full [&_svg]:text-white/55">
        <Scene />
      </div>

      {/* CRT vignette */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 90% at 50% 42%, transparent 52%, color-mix(in srgb, var(--obsidian) 88%, transparent) 100%)",
        }}
      />

      {/* Faint scanline grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-70 mix-blend-soft-light"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent 0, transparent 2px, rgba(255,255,255,0.06) 2px, rgba(255,255,255,0.06) 3px)",
        }}
      />

      {/* Moving scanline sweep */}
      <div
        className="cctv-scan pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, transparent 0%, color-mix(in srgb, var(--accent) 26%, transparent) 1.6%, transparent 5%)",
        }}
      />

      {/* Motion-detection box */}
      <div
        className="track-box pointer-events-none absolute rounded-[3px] border border-[color:var(--accent)]"
        style={
          {
            left: motion.left,
            top: motion.top,
            width: motion.width,
            height: motion.height,
            "--track-x": motion.driftX,
            "--track-y": motion.driftY,
          } as StyleVars
        }
      >
        <span className="absolute -left-px -top-px h-2 w-2 border-l border-t border-[color:var(--accent)]" />
        <span className="absolute -right-px -top-px h-2 w-2 border-r border-t border-[color:var(--accent)]" />
        <span className="absolute -bottom-px -left-px h-2 w-2 border-b border-l border-[color:var(--accent)]" />
        <span className="absolute -bottom-px -right-px h-2 w-2 border-b border-r border-[color:var(--accent)]" />
        <span className="absolute -top-[1.05rem] left-0 whitespace-nowrap rounded-sm bg-[color:var(--accent)] px-1 py-px font-mono text-[0.5rem] font-semibold uppercase tracking-[0.08em] text-[color:var(--accent-contrast)]">
          {motionLabel}
        </span>
      </div>

      {/* Top bar: REC + live timestamp */}
      <div className="pointer-events-none absolute inset-x-0 top-0 flex items-center justify-between p-2 md:p-3">
        <span
          className={`flex items-center gap-1.5 font-mono font-semibold uppercase tracking-[0.14em] text-white/90 ${overlayText}`}
        >
          <span className="rec-blink inline-block h-2 w-2 rounded-full bg-[color:var(--accent)]" />
          {recLabel}
        </span>
        <span className={`font-mono tracking-[0.06em] text-white/70 ${overlayText}`}>{timestamp}</span>
      </div>

      {/* Bottom bar: CAM id + location */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 bg-gradient-to-t from-black/65 to-transparent p-2 pt-8 md:p-3 md:pt-10">
        <span
          className={`font-mono uppercase tracking-[0.14em] text-[color:var(--accent)] ${overlayText}`}
        >
          {camId}
        </span>
        <span className={`truncate font-mono uppercase tracking-[0.1em] text-white/75 ${overlayText}`}>
          {label}
        </span>
      </div>
    </div>
  );
}
