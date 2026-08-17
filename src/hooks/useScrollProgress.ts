"use client";

import { useEffect, useState } from "react";

/**
 * Tracks vertical scroll progress (0–1) and whether the page has been
 * scrolled past a threshold. Used for the sticky header transition and
 * the scroll-progress terrace-line indicator.
 */
export function useScrollProgress(threshold = 80) {
  const [progress, setProgress] = useState(0);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const doc = document.documentElement;
        const max = doc.scrollHeight - doc.clientHeight;
        setProgress(max > 0 ? Math.min(window.scrollY / max, 1) : 0);
        setScrolled(window.scrollY > threshold);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [threshold]);

  return { progress, scrolled };
}
