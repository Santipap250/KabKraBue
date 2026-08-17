"use client";

import { useMemo, useState } from "react";
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

export function ImageGallery() {
  const [filter, setFilter] = useState<(typeof categories)[number]["id"]>("all");
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const filtered = useMemo(
    () => (filter === "all" ? galleryImages : galleryImages.filter((img) => img.category === filter)),
    [filter]
  );

  return (
    <div>
      <div
        className="flex flex-wrap gap-2 overflow-x-auto pb-1"
        role="tablist"
        aria-label="Filter gallery by category"
      >
        {categories.map((cat) => (
          <button
            key={cat.id}
            role="tab"
            aria-selected={filter === cat.id}
            onClick={() => setFilter(cat.id)}
            className={cn(
              "whitespace-nowrap border px-4 py-2 font-mono text-xs uppercase tracking-[0.15em] transition-colors",
              filter === cat.id
                ? "border-paddy bg-paddy text-rice"
                : "border-border text-ink/60 hover:border-paddy/50 hover:text-ink"
            )}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <div className="mt-8 columns-1 gap-4 sm:columns-2 lg:columns-3 [&>*]:mb-4">
        {filtered.map((img, i) => (
          <button
            key={img.id}
            type="button"
            onClick={() => setActiveIndex(i)}
            className="group block w-full break-inside-avoid text-left"
            aria-label={`Open image: ${img.alt}`}
          >
            <MediaFrame
              src={img.src}
              alt={img.alt}
              aspect="aspect-auto"
              className="w-full transition-opacity duration-300 group-hover:opacity-90"
            />
          </button>
        ))}
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
