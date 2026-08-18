"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { GalleryImage } from "@/data/gallery";
import { MediaFrame } from "@/components/MediaFrame";
import { useLockBodyScroll } from "@/hooks/useLockBodyScroll";

interface GalleryLightboxProps {
  images: GalleryImage[];
  activeIndex: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export function GalleryLightbox({ images, activeIndex, onClose, onNavigate }: GalleryLightboxProps) {
  const open = activeIndex !== null;
  const touchStartX = useRef<number | null>(null);
  const reduceMotion = useReducedMotion();
  useLockBodyScroll(open);

  const goTo = (delta: number) => {
    if (activeIndex === null || images.length === 0) return;
    const next = (activeIndex + delta + images.length) % images.length;
    onNavigate(next);
  };

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") goTo(1);
      if (e.key === "ArrowLeft") goTo(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, activeIndex, images.length]);

  if (activeIndex === null || !images[activeIndex]) return null;
  const image = images[activeIndex];

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={image.alt}
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={reduceMotion ? undefined : { opacity: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.22 }}
          className="fixed inset-0 z-[60] flex flex-col bg-ink/97 backdrop-blur-xl"
          onClick={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
          onTouchStart={(e) => (touchStartX.current = e.touches[0].clientX)}
          onTouchEnd={(e) => {
            if (touchStartX.current === null) return;
            const delta = e.changedTouches[0].clientX - touchStartX.current;
            if (Math.abs(delta) > 50) goTo(delta > 0 ? -1 : 1);
            touchStartX.current = null;
          }}
        >
          <div className="flex items-center justify-between px-5 py-4 sm:px-8">
            <div>
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-rice/45">KabKraBue Gallery</span>
              <span className="ml-3 font-mono text-xs uppercase tracking-[0.2em] text-rice/75">
                {String(activeIndex + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
              </span>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close gallery"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-rice/15 text-rice transition-colors hover:border-rice/40 hover:bg-rice/10"
            >
              <X strokeWidth={1.35} />
            </button>
          </div>

          <div className="relative flex min-h-0 flex-1 items-center justify-center px-4 pb-5 sm:px-16">
            <button
              type="button"
              onClick={() => goTo(-1)}
              aria-label="Previous image"
              className="absolute left-2 top-1/2 z-10 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-rice/10 bg-ink/15 text-rice/70 backdrop-blur-sm transition hover:border-rice/30 hover:text-rice sm:flex"
            >
              <ChevronLeft className="h-6 w-6" strokeWidth={1.2} />
            </button>

            <motion.figure
              key={image.id}
              initial={reduceMotion ? false : { opacity: 0, scale: 0.985, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={reduceMotion ? { duration: 0 } : { duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="flex max-h-full max-w-5xl flex-col items-center"
            >
              <MediaFrame
                src={image.src}
                alt={image.alt}
                aspect="aspect-auto"
                className="max-h-[74vh] w-auto max-w-[92vw] sm:max-h-[78vh] sm:max-w-[82vw]"
                sizes="90vw"
              />
              <figcaption className="mt-4 max-w-2xl text-center font-body text-sm leading-relaxed text-rice/65 sm:text-base">
                {image.caption ?? image.alt}
              </figcaption>
            </motion.figure>

            <button
              type="button"
              onClick={() => goTo(1)}
              aria-label="Next image"
              className="absolute right-2 top-1/2 z-10 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-rice/10 bg-ink/15 text-rice/70 backdrop-blur-sm transition hover:border-rice/30 hover:text-rice sm:flex"
            >
              <ChevronRight className="h-6 w-6" strokeWidth={1.2} />
            </button>
          </div>

          <div className="flex items-center justify-center gap-4 pb-5 sm:hidden">
            <button
              type="button"
              onClick={() => goTo(-1)}
              aria-label="Previous image"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-rice/10 text-rice/80"
            >
              <ChevronLeft strokeWidth={1.4} />
            </button>
            <button
              type="button"
              onClick={() => goTo(1)}
              aria-label="Next image"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-rice/10 text-rice/80"
            >
              <ChevronRight strokeWidth={1.4} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
