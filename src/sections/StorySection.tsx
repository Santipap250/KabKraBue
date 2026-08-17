"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import type { StorySection as StorySectionData } from "@/data/village";
import { MediaFrame } from "@/components/MediaFrame";
import { TerraceDivider } from "@/components/TerraceDivider";
import { cn } from "@/lib/cn";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

// Collapsed height (px) before "อ่านเพิ่มเติม" is needed — tuned to the
// .story-body type scale in globals.css, roughly the intro line plus
// the first paragraph on mobile.
const COLLAPSED_HEIGHT = 210;
// Below this character count the text already fits within
// COLLAPSED_HEIGHT, so no toggle is rendered at all.
const COLLAPSE_THRESHOLD = 260;

interface StorySectionProps {
  data: StorySectionData;
  reverse?: boolean;
}

function StoryMedia({ data }: { data: StorySectionData }) {
  const [reduceMotion, setReduceMotion] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduceMotion(mediaQuery.matches);
    update();
    mediaQuery.addEventListener("change", update);
    return () => mediaQuery.removeEventListener("change", update);
  }, []);

  const showVideo = Boolean(data.videoId) && !reduceMotion && !videoFailed;

  if (!showVideo) {
    return <MediaFrame src={`/images/${data.imageId}`} alt={data.imageAlt} aspect="aspect-[4/5]" />;
  }

  return (
    <div className="relative aspect-[4/5] overflow-hidden bg-mist">
      <video
        className="h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-label={data.imageAlt}
        onError={() => setVideoFailed(true)}
      >
        <source src={`${basePath}/videos/${data.videoId}`} type="video/mp4" />
      </video>
    </div>
  );
}

function StoryBody({ id, body }: { id: string; body: string }) {
  const [expanded, setExpanded] = useState(false);
  const paragraphs = body.split("\n\n");
  const isLong = body.length > COLLAPSE_THRESHOLD;

  return (
    <div className="mt-7 max-w-xl">
      <motion.div
        id={`${id}-story-body`}
        initial={false}
        animate={{ height: expanded || !isLong ? "auto" : COLLAPSED_HEIGHT }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className="story-body relative overflow-hidden"
      >
        {paragraphs.map((paragraph, index) => (
          <p key={`${id}-${index}`}>{paragraph}</p>
        ))}
        {isLong && !expanded && (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-rice to-transparent"
          />
        )}
      </motion.div>

      {isLong && (
        <button
          type="button"
          onClick={() => setExpanded((value) => !value)}
          aria-expanded={expanded}
          aria-controls={`${id}-story-body`}
          className="mt-3 inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-[0.15em] text-paddy transition-colors hover:text-clay"
        >
          {expanded ? "ย่อเรื่องราว" : "อ่านเพิ่มเติม"}
          <ChevronDown
            className={cn("h-3.5 w-3.5 transition-transform duration-300", expanded && "rotate-180")}
            strokeWidth={1.5}
          />
        </button>
      )}
    </div>
  );
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

            <StoryBody id={data.id} body={data.body} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="group"
          >
            <StoryMedia data={data} />
          </motion.div>
        </div>
      </div>
      <TerraceDivider className="opacity-70" />
    </section>
  );
}
