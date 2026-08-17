"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
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
  const paragraphs = data.body.split("\n\n").filter(Boolean);
  const [expanded, setExpanded] = useState(false);
  const hasMore = paragraphs.length > 1;

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

            <div id={`${data.id}-story-body`} className={cn("story-body mt-7 max-w-xl", expanded && "is-expanded")}>
              {paragraphs.map((paragraph, index) => {
                const hidden = !expanded && index > 0;
                return (
                  <p
                    key={`${data.id}-${index}`}
                    className={cn(hidden && "story-paragraph-hidden")}
                    aria-hidden={hidden ? true : undefined}
                  >
                    {paragraph}
                  </p>
                );
              })}
            </div>

            {hasMore && (
              <button
                type="button"
                className="story-readmore mt-6 inline-flex items-center gap-2"
                onClick={() => setExpanded((value) => !value)}
                aria-expanded={expanded}
                aria-controls={`${data.id}-story-body`}
              >
                <span>{expanded ? "ย่อเรื่องราว" : "อ่านเรื่องราวต่อ"}</span>
                <ChevronDown
                  className={cn("h-4 w-4 transition-transform duration-300", expanded && "rotate-180")}
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
              </button>
            )}
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
