export const DEMO_CREDENTIALS = {
  email: "admin@hastekgroup.com",
  password: "hastek-demo-2026",
};

const SESSION_KEY = "hastek-admin-session";

export function isAdminSession(): boolean {
  if (typeof window === "undefined") return false;
  return window.sessionStorage.getItem(SESSION_KEY) === "active";
}

export function setAdminSession() {
  window.sessionStorage.setItem(SESSION_KEY, "active");
}

export function clearAdminSession() {
  window.sessionStorage.removeItem(SESSION_KEY);
}
