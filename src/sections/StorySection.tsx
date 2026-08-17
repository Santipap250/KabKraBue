"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import type { StorySection as StorySectionData } from "@/data/village";
import { MediaFrame } from "@/components/MediaFrame";
import { TerraceDivider } from "@/components/TerraceDivider";
import { cn } from "@/lib/cn";

interface StorySectionProps {
  data: StorySectionData;
  reverse?: boolean;
}

export function StorySection({ data, reverse = false }: StorySectionProps) {
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduceMotion(mediaQuery.matches);
    update();
    mediaQuery.addEventListener("change", update);
    return () => mediaQuery.removeEventListener("change", update);
  }, []);

  const isVideo = Boolean(data.videoId);

  return (
    <section id={data.id} className="border-t border-border">
      <div className="container-content py-20 sm:py-28">
        <div
          className={cn(
            "grid items-center gap-12 lg:grid-cols-2 lg:gap-20",
            reverse && "lg:[&>*:first-child]:order-2"
          )}
        >
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-baseline gap-3">
              <span className="font-mono text-xs text-clay">{data.index}</span>
              <span className="eyebrow">{data.eyebrow}</span>
            </div>

            <h2 className="heading-display mt-3 text-4xl text-ink sm:text-5xl">
              {data.title}
            </h2>

            <p className="mt-2 font-body text-lg text-ink/60">
              {data.titleThai}
            </p>

            <div className="mt-6 max-w-xl space-y-4 leading-relaxed text-ink/75">
              {data.body.split("\n\n").map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="group"
          >
            {isVideo && !reduceMotion ? (
              <div className="relative mx-auto w-full max-w-[420px] overflow-hidden rounded-[2rem] border border-border bg-ink shadow-2xl shadow-black/10">
                <div className="relative aspect-[9/16] overflow-hidden">
                  <video
                    className="absolute inset-0 h-full w-full object-cover"
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    poster="/images/og-cover.jpg"
                    aria-label={data.imageAlt}
                  >
                    <source src={`/videos/${data.videoId}`} type="video/mp4" />
                  </video>
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-white/5" />
                  <div className="pointer-events-none absolute inset-x-6 bottom-6">
                    <div className="h-px w-14 bg-rice/70" />
                    <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.2em] text-rice/80">
                      KabKraBue · The Village
                    </p>
                  </div>
                </div>
              </div>
            ) : isVideo ? (
              <div className="mx-auto w-full max-w-[420px] overflow-hidden rounded-[2rem] border border-border bg-ink shadow-2xl shadow-black/10">
                <div className="relative aspect-[9/16] overflow-hidden">
                  <img
                    src="/images/og-cover.jpg"
                    alt={data.imageAlt}
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            ) : (
              <MediaFrame
                src={`/images/${data.imageId}`}
                alt={data.imageAlt}
                aspect="aspect-[4/5]"
              />
            )}
          </motion.div>
        </div>
      </div>
      <TerraceDivider className="opacity-70" />
    </section>
  );
}
