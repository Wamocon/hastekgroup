/**
 * Shared cookie-consent state so the banner and the floating action buttons
 * agree on whether the bottom bar is currently occupying the screen.
 */
export const COOKIE_KEY = "hastek-cookie-consent";
export const COOKIE_EVENT = "hastek-cookie-consent-changed";

export function subscribeConsent(onChange: () => void) {
  window.addEventListener(COOKIE_EVENT, onChange);
  return () => window.removeEventListener(COOKIE_EVENT, onChange);
}

/** True once the visitor has made a choice (banner no longer shown). */
export function hasConsent() {
  return typeof window !== "undefined" && window.localStorage.getItem(COOKIE_KEY) !== null;
}

/** SSR/initial value: assume consented so nothing flashes on the server. */
export function hasConsentServer() {
  return true;
}

export function setConsent(choice: "accepted" | "declined") {
  window.localStorage.setItem(COOKIE_KEY, choice);
  window.dispatchEvent(new Event(COOKIE_EVENT));
}
