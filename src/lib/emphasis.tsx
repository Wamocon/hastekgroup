import { Fragment } from "react";

/**
 * Renders "*emphasised*" segments (as authored in the AIDASLove content)
 * as gold italic spans, matching the Kara Elmas headline treatment.
 */
export function renderEmphasis(text: string): React.ReactNode[] {
  const parts = text.split(/\*([^*]+)\*/g);
  return parts.map((part, index) =>
    index % 2 === 1 ? (
      <em key={index} className="font-display text-gold-metallic italic">
        {part}
      </em>
    ) : (
      <Fragment key={index}>{part}</Fragment>
    )
  );
}
