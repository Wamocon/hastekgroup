"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { whatsappHref } from "@/lib/site-config";
import { WhatsAppGlyph } from "@/components/brand/whatsapp-glyph";

/**
 * Floating WhatsApp action — the priority contact channel, in WhatsApp green,
 * gently bobbing with a live halo. Degrades gracefully while the target number
 * is still pending (a tooltip instead of a dead link).
 */
export function FloatingWhatsApp() {
  const t = useTranslations("common");
  const href = whatsappHref();
  const [notice, setNotice] = useState(false);
  const label = t("whatsapp");

  const buttonClass =
    "relative z-10 flex h-full w-full items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl shadow-[#25D366]/40 transition-transform duration-200 hover:scale-110";

  return (
    <div className="float-bob relative h-14 w-14">
      <span aria-hidden="true" className="float-halo absolute inset-0 rounded-full bg-[#25D366]" />
      {href ? (
        <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className={buttonClass}>
          <WhatsAppGlyph className="h-7 w-7" />
        </a>
      ) : (
        <button type="button" onClick={() => setNotice((v) => !v)} aria-label={label} className={buttonClass}>
          <WhatsAppGlyph className="h-7 w-7" />
        </button>
      )}
      {notice ? (
        <span className="absolute right-full top-1/2 mr-3 w-56 -translate-y-1/2 rounded-lg border border-border bg-surface p-3 text-xs text-muted-foreground shadow-lg">
          {t("whatsappPending")}
        </span>
      ) : null}
    </div>
  );
}
