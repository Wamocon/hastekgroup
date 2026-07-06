"use client";

import { useState } from "react";
import { MessageCircle } from "lucide-react";
import { useTranslations } from "next-intl";
import { whatsappHref } from "@/lib/site-config";

type WhatsAppButtonProps = {
  className?: string;
  label?: string;
};

export function WhatsAppButton({ className, label }: WhatsAppButtonProps) {
  const t = useTranslations("common");
  const href = whatsappHref();
  const [showNotice, setShowNotice] = useState(false);

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className ?? "btn-secondary"}>
        <MessageCircle className="h-4 w-4" />
        {label ?? t("whatsapp")}
      </a>
    );
  }

  return (
    <span className="relative inline-block">
      <button
        type="button"
        onClick={() => setShowNotice((value) => !value)}
        className={className ?? "btn-secondary"}
      >
        <MessageCircle className="h-4 w-4" />
        {label ?? t("whatsapp")}
      </button>
      {showNotice ? (
        <span className="absolute left-1/2 top-full z-20 mt-2 w-64 -translate-x-1/2 rounded-lg border border-border bg-surface p-3 text-xs text-muted-foreground shadow-lg">
          {t("whatsappPending")}
        </span>
      ) : null}
    </span>
  );
}
