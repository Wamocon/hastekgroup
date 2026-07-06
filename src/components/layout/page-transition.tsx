"use client";

import { usePathname } from "@/i18n/navigation";

/**
 * Premium page-to-page cross-fade. React's <ViewTransition> is not exported by
 * the installed react 19.2.4 build, so we use the reliable pathname-keyed
 * approach: changing the key remounts the page subtree, replaying the
 * .page-enter CSS animation (a gentle fade + rise). Respects reduced motion.
 */
export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <div key={pathname} className="page-enter">
      {children}
    </div>
  );
}
