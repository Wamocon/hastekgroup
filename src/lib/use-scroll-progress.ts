"use client";

import { useEffect, useRef } from "react";

/**
 * Drives a `--scene-progress` custom property (0 -> 1) on the returned element
 * as it scrolls through the viewport, so CSS can choreograph a scene against
 * scroll position (dusk -> night, systems arming). Passive listener, rAF-
 * throttled, and a no-op under prefers-reduced-motion (progress pinned to a
 * calm mid-value so the scene still looks intentional).
 */
export function useScrollProgress<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.style.setProperty("--scene-progress", "0.6");
      return;
    }

    let frame = 0;

    function update() {
      frame = 0;
      const node = ref.current;
      if (!node) return;
      const rect = node.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      // 0 when the element top hits the viewport bottom, 1 when its top reaches
      // the viewport top — i.e. progress across one scroll of the hero.
      const raw = 1 - (rect.top + rect.height * 0.15) / (vh + rect.height * 0.15);
      const clamped = Math.min(1, Math.max(0, raw));
      node.style.setProperty("--scene-progress", clamped.toFixed(3));
    }

    function onScroll() {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    }

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return ref;
}
