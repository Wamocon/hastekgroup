"use client";

import { useSyncExternalStore } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

const STORAGE_KEY = "hastek-cookie-consent";

const CHANGE_EVENT = "hastek-cookie-consent-changed";

function subscribe(onStoreChange: () => void) {
  window.addEventListener(CHANGE_EVENT, onStoreChange);
  return () => window.removeEventListener(CHANGE_EVENT, onStoreChange);
}

function hasStoredConsent() {
  return window.localStorage.getItem(STORAGE_KEY) !== null;
}

function hasStoredConsentServer() {
  return true;
}

export function CookieBanner() {
  const t = useTranslations("cookie");
  const consentStored = useSyncExternalStore(subscribe, hasStoredConsent, hasStoredConsentServer);

  function handleChoice(choice: "accepted" | "declined") {
    window.localStorage.setItem(STORAGE_KEY, choice);
    window.dispatchEvent(new Event(CHANGE_EVENT));
  }

  if (consentStored) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-surface/95 backdrop-blur">
      <div className="container-hastek flex flex-col items-start gap-3 py-4 md:flex-row md:items-center md:justify-between">
        <p className="max-w-2xl text-sm text-muted-foreground">
          {t("message")}{" "}
          <Link href="/legal/datenschutz" className="underline underline-offset-2 hover:text-accent">
            {t("settings")}
          </Link>
        </p>
        <div className="flex shrink-0 gap-2">
          <button
            type="button"
            onClick={() => handleChoice("declined")}
            className="rounded-full border border-border px-4 py-2 text-xs font-medium text-foreground/80 hover:border-accent hover:text-accent"
          >
            {t("decline")}
          </button>
          <button
            type="button"
            onClick={() => handleChoice("accepted")}
            className="rounded-full bg-accent px-4 py-2 text-xs font-medium text-accent-contrast"
          >
            {t("accept")}
          </button>
        </div>
      </div>
    </div>
  );
}
