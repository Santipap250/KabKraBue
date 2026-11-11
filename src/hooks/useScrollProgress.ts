"use client";

import { useEffect, useState } from "react";

/**
 * Tracks threshold state and, when requested, document progress (0–1).
 */
export function useScrollProgress(threshold = 80, trackProgress = true) {
  const [progress, setProgress] = useState(0);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        if (trackProgress) {
          const doc = document.documentElement;
          const max = doc.scrollHeight - doc.clientHeight;
          setProgress(max > 0 ? Math.min(window.scrollY / max, 1) : 0);
        }
        setScrolled(window.scrollY > threshold);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [threshold, trackProgress]);

  return { progress, scrolled };
}
