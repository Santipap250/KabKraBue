"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
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
  useLockBodyScroll(open);

  const goTo = (delta: number) => {
    if (activeIndex === null) return;
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
  }, [open, activeIndex]);

  if (activeIndex === null) return null;
  const image = images[activeIndex];

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={image.alt}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[60] flex flex-col bg-ink/97 backdrop-blur"
          onTouchStart={(e) => (touchStartX.current = e.touches[0].clientX)}
          onTouchEnd={(e) => {
            if (touchStartX.current === null) return;
            const delta = e.changedTouches[0].clientX - touchStartX.current;
            if (Math.abs(delta) > 50) goTo(delta > 0 ? -1 : 1);
            touchStartX.current = null;
          }}
        >
          <div className="flex items-center justify-between px-5 py-4 sm:px-8">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-rice/60">
              {activeIndex + 1} / {images.length}
            </span>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close gallery"
              className="flex h-11 w-11 items-center justify-center text-rice"
            >
              <X strokeWidth={1.5} />
            </button>
          </div>

          <div className="relative flex flex-1 items-center justify-center px-4 pb-6 sm:px-16">
            <button
              type="button"
              onClick={() => goTo(-1)}
              aria-label="Previous image"
              className="absolute left-2 top-1/2 hidden h-12 w-12 -translate-y-1/2 items-center justify-center text-rice/70 transition-colors hover:text-rice sm:flex"
            >
              <ChevronLeft className="h-8 w-8" strokeWidth={1.25} />
            </button>

            <motion.figure
              key={image.id}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="max-h-full max-w-3xl"
            >
              <MediaFrame
                src={image.src}
                alt={image.alt}
                aspect="aspect-auto"
                className="max-h-[70vh] w-full"
              />
              {image.caption && (
                <figcaption className="mt-4 text-center font-body text-sm text-rice/70">
                  {image.caption}
                </figcaption>
              )}
            </motion.figure>

            <button
              type="button"
              onClick={() => goTo(1)}
              aria-label="Next image"
              className="absolute right-2 top-1/2 hidden h-12 w-12 -translate-y-1/2 items-center justify-center text-rice/70 transition-colors hover:text-rice sm:flex"
            >
              <ChevronRight className="h-8 w-8" strokeWidth={1.25} />
            </button>
          </div>

          <div className="flex justify-center gap-4 pb-6 sm:hidden">
            <button
              type="button"
              onClick={() => goTo(-1)}
              aria-label="Previous image"
              className="flex h-11 w-11 items-center justify-center text-rice/80"
            >
              <ChevronLeft strokeWidth={1.5} />
            </button>
            <button
              type="button"
              onClick={() => goTo(1)}
              aria-label="Next image"
              className="flex h-11 w-11 items-center justify-center text-rice/80"
            >
              <ChevronRight strokeWidth={1.5} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
