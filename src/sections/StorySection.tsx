"use client";

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

            <h2 className="heading-display mt-3 max-w-2xl text-4xl text-ink sm:text-5xl">
              {data.title}
            </h2>

            <p className="story-title-thai mt-3 max-w-xl font-body">
              {data.titleThai}
            </p>

            <div className="story-body mt-7 max-w-xl">
              {data.body.split("\n\n").map((paragraph, index) => (
                <p key={`${data.id}-${index}`}>{paragraph}</p>
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
            <MediaFrame
              src={`/images/${data.imageId}`}
              alt={data.imageAlt}
              aspect="aspect-[4/5]"
            />
          </motion.div>
        </div>
      </div>
      <TerraceDivider className="opacity-70" />
    </section>
  );
}
