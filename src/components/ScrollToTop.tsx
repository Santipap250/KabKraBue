"use client";

import { ArrowUp } from "lucide-react";
import { useScrollProgress } from "@/hooks/useScrollProgress";
import { cn } from "@/lib/cn";

export function ScrollToTop() {
  const { progress, scrolled } = useScrollProgress(600);
  const circumference = 2 * Math.PI * 18;

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Scroll back to top"
      className={cn(
        "fixed bottom-6 right-6 z-30 flex h-12 w-12 items-center justify-center rounded-full bg-ink text-rice shadow-lg transition-all duration-300",
        scrolled ? "opacity-100 translate-y-0" : "pointer-events-none translate-y-4 opacity-0"
      )}
    >
      <svg className="absolute inset-0 h-12 w-12 -rotate-90" viewBox="0 0 40 40">
        <circle cx="20" cy="20" r="18" fill="none" stroke="rgba(245,241,226,0.15)" strokeWidth="2" />
        <circle
          cx="20"
          cy="20"
          r="18"
          fill="none"
          stroke="#C99A3E"
          strokeWidth="2"
          strokeDasharray={circumference}
          strokeDashoffset={circumference * (1 - progress)}
          strokeLinecap="round"
        />
      </svg>
      <ArrowUp className="h-4 w-4" strokeWidth={1.5} />
    </button>
  );
}
