"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Images, Maximize2 } from "lucide-react";
import { galleryImages, type GalleryImage } from "@/data/gallery";
import { MediaFrame } from "@/components/MediaFrame";
import { GalleryLightbox } from "@/components/GalleryLightbox";
import { cn } from "@/lib/cn";

const categories: Array<{ id: GalleryImage["category"] | "all"; label: string }> = [
  { id: "all", label: "All" },
  { id: "landscape", label: "Landscape" },
  { id: "people", label: "People" },
  { id: "culture", label: "Culture" },
  { id: "nature", label: "Nature" },
  { id: "village", label: "Village" },
];

const featuredLayouts = [
  "lg:col-span-7 lg:row-span-2",
  "lg:col-span-5",
  "lg:col-span-5",
  "lg:col-span-4",
  "lg:col-span-4",
  "lg:col-span-4",
];

export function ImageGallery() {
  const [filter, setFilter] = useState<(typeof categories)[number]["id"]>("all");
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const reduceMotion = useReducedMotion();

  const filtered = useMemo(
    () => (filter === "all" ? galleryImages : galleryImages.filter((img) => img.category === filter)),
    [filter]
  );

  const openAt = (index: number) => setActiveIndex(index);

  return (
    <div>
      <div className="mb-8 flex flex-col gap-5 sm:mb-10 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="eyebrow flex items-center gap-2">
            <Images className="h-3.5 w-3.5" strokeWidth={1.4} />
            <span>{filtered.length} photographs</span>
          </div>
          <p className="mt-2 max-w-xl font-body text-sm leading-relaxed text-ink/55">
            ภาพของกาบกระบือจากมุมสูง ผืนนา สายน้ำ และชีวิตรอบบ้าน — แตะภาพเพื่อเปิดดูแบบเต็มจอ
          </p>
        </div>
        <span className="hidden font-mono text-[10px] uppercase tracking-[0.18em] text-ink/45 sm:block">
          Tap / Swipe / Explore
        </span>
      </div>

      <div
        className="flex gap-2 overflow-x-auto pb-2"
        role="tablist"
        aria-label="Filter gallery by category"
        style={{ scrollbarWidth: "none" }}
      >
        {categories.map((cat) => (
          <button
            key={cat.id}
            type="button"
            role="tab"
            aria-selected={filter === cat.id}
            onClick={() => setFilter(cat.id)}
            className={cn(
              "whitespace-nowrap rounded-full border px-4 py-2 font-mono text-[10px] uppercase tracking-[0.15em] transition-all duration-300",
              filter === cat.id
                ? "border-paddy bg-paddy text-rice shadow-sm"
                : "border-border bg-transparent text-ink/55 hover:border-paddy/50 hover:text-ink"
            )}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <div className="relative mt-8 overflow-visible lg:mt-10">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.div
            key={filter}
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduceMotion ? undefined : { opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.25 }}
            className="grid auto-rows-[minmax(190px,auto)] grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-12 lg:auto-rows-[190px]"
          >
            {filtered.map((img, i) => {
              const layout = featuredLayouts[i] ?? "lg:col-span-4";
              const isFeatured = i === 0;

              return (
                <motion.button
                  key={img.id}
                  type="button"
                  onClick={() => openAt(i)}
                  initial={reduceMotion ? false : { opacity: 0, y: 18 }}
                  whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.12 }}
                  transition={
                    reduceMotion
                      ? { duration: 0 }
                      : { duration: 0.45, delay: Math.min(i * 0.04, 0.18), ease: [0.16, 1, 0.3, 1] }
                  }
                  className={cn(
                    "group relative min-h-[190px] overflow-hidden rounded-[1.2rem] bg-mist text-left outline-none ring-offset-2 ring-offset-rice focus-visible:ring-2 focus-visible:ring-paddy",
                    layout,
                    isFeatured && "sm:col-span-2"
                  )}
                  aria-label={`เปิดภาพ ${i + 1}: ${img.alt}`}
                >
                  <MediaFrame
                    src={img.src}
                    alt={img.alt}
                    aspect="aspect-auto"
                    priority={i === 0}
                    sizes="(min-width: 1024px) 55vw, (min-width: 640px) 50vw, 100vw"
                    className="h-full min-h-[190px]"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/5 to-transparent opacity-75 transition-opacity duration-500 group-hover:opacity-95" />

                  <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full border border-rice/20 bg-ink/20 px-3 py-1.5 text-rice/85 backdrop-blur-md">
                    <span className="font-mono text-[9px] uppercase tracking-[0.18em]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="h-1 w-1 rounded-full bg-gold" aria-hidden="true" />
                    <span className="font-mono text-[9px] uppercase tracking-[0.18em]">{img.category}</span>
                  </div>

                  <div className="absolute inset-x-4 bottom-4 flex items-end justify-between gap-4">
                    <div className="max-w-[78%]">
                      <p className="font-body text-sm leading-relaxed text-rice sm:text-[15px]">
                        {img.caption ?? img.alt}
                      </p>
                    </div>
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-rice/25 bg-ink/20 text-rice backdrop-blur-md transition-transform duration-300 group-hover:scale-105">
                      <Maximize2 className="h-4 w-4" strokeWidth={1.4} />
                    </span>
                  </div>

                  <span className="absolute right-4 top-4 translate-y-2 rounded-full bg-rice px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.15em] text-ink opacity-0 shadow-lg transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                    Open <ArrowUpRight className="ml-1 inline h-3 w-3" strokeWidth={1.5} />
                  </span>
                </motion.button>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>

      <GalleryLightbox
        images={filtered}
        activeIndex={activeIndex}
        onClose={() => setActiveIndex(null)}
        onNavigate={setActiveIndex}
      />
    </div>
  );
}
