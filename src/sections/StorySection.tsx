"use client";

import { useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ChevronDown, Play } from "lucide-react";
import type { StorySection as StorySectionData } from "@/data/village";
import { MediaFrame } from "@/components/MediaFrame";
import { TerraceDivider } from "@/components/TerraceDivider";
import { cn } from "@/lib/cn";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const COLLAPSED_HEIGHT = 210;
const COLLAPSE_THRESHOLD = 260;

interface StorySectionProps {
  data: StorySectionData;
  reverse?: boolean;
}

function StoryMedia({
  data,
  isNature,
  reduceMotion,
}: {
  data: StorySectionData;
  isNature: boolean;
  reduceMotion: boolean;
}) {
  const [videoFailed, setVideoFailed] = useState(false);
  const showVideo = Boolean(data.videoId) && !reduceMotion && !videoFailed;

  if (!showVideo) {
    return (
      <div
        className={cn(
          "overflow-hidden",
          isNature ? "aspect-[4/5] rounded-[2rem]" : "aspect-[4/5]"
        )}
      >
        <MediaFrame
          src={`/images/${data.imageId}`}
          alt={data.imageAlt}
          aspect="aspect-[4/5]"
        />
      </div>
    );
  }

  return (
    <div
      className={cn(
        "relative overflow-hidden bg-mist",
        isNature
          ? "aspect-[9/16] rounded-[2rem] shadow-2xl shadow-ink/15 ring-1 ring-ink/10 sm:aspect-[4/5]"
          : "aspect-[4/5]"
      )}
    >
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
        <source
          src={`${basePath}/videos/${data.videoId}`}
          type="video/mp4"
        />
      </video>

      {isNature && (
        <>
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/65 via-transparent to-ink/10"
            aria-hidden="true"
          />
          <div className="absolute left-5 top-5 rounded-full border border-rice/35 bg-ink/20 px-3 py-1.5 backdrop-blur-md">
            <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-rice/90">
              KabKraBue / Nature
            </span>
          </div>
          <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-4">
            <div>
              <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-rice/60">
                A moving landscape
              </p>
              <p className="mt-1 font-body text-sm text-rice/90">
                ท้องฟ้า ผืนนา และจังหวะของฤดูกาล
              </p>
            </div>
            <span
              className="rounded-full border border-rice/25 bg-ink/20 p-2 text-rice/75 backdrop-blur-md"
              aria-hidden="true"
            >
              <Play className="h-4 w-4 fill-current" strokeWidth={1.2} />
            </span>
          </div>
        </>
      )}
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
        animate={{
          height: expanded || !isLong ? "auto" : COLLAPSED_HEIGHT,
        }}
        transition={
          useReducedMotion()
            ? { duration: 0 }
            : { duration: 0.35, ease: [0.16, 1, 0.3, 1] }
        }
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
            className={cn(
              "h-3.5 w-3.5 transition-transform duration-300",
              expanded && "rotate-180"
            )}
            strokeWidth={1.5}
          />
        </button>
      )}
    </div>
  );
}

export function StorySection({ data, reverse = false }: StorySectionProps) {
  const isNature = data.id === "nature";
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  // Scroll-linked parallax: scrollYProgress runs 0 → 1 as this section
  // travels through the viewport (from "just entering the bottom" to
  // "just leaving the top"), so the text and media layers keep drifting
  // continuously with the scroll instead of only animating in once.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const textY = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [56, -56]);
  const textOpacity = useTransform(
    scrollYProgress,
    [0, 0.22, 0.82, 1],
    reduceMotion ? [1, 1, 1, 1] : [0, 1, 1, 0.55]
  );

  const mediaY = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [80, -80]);
  const mediaOpacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.85, 1],
    reduceMotion ? [1, 1, 1, 1] : [0, 1, 1, 0.6]
  );
  const mediaScale = useTransform(
    scrollYProgress,
    [0, 0.25, 1],
    reduceMotion ? [1, 1, 1] : [0.96, 1, 1.03]
  );

  return (
    <section
      ref={sectionRef}
      id={data.id}
      className="relative overflow-hidden border-t border-border"
    >
      <div
        className={cn(
          "container-content py-20 sm:py-28",
          isNature && "py-24 sm:py-32"
        )}
      >
        {isNature && (
          <div
            className="pointer-events-none absolute inset-x-0 top-0 overflow-hidden"
            aria-hidden="true"
          >
            <span className="absolute right-6 -mt-8 select-none font-display text-[17rem] leading-none text-paddy/5 sm:text-[23rem]">
              04
            </span>
          </div>
        )}

        <div
          className={cn(
            "relative grid items-center gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16",
            reverse && "lg:[&>*:first-child]:order-2",
            isNature && "lg:items-stretch"
          )}
        >
          <motion.div
            style={{ y: textY, opacity: textOpacity }}
            className={cn(isNature && "flex flex-col justify-center")}
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

            {isNature && (
              <div className="mt-6 h-px w-20 bg-clay/60" aria-hidden="true" />
            )}

            <StoryBody id={data.id} body={data.body} />
          </motion.div>

          <motion.div
            style={{ y: mediaY, opacity: mediaOpacity, scale: mediaScale }}
            className={cn("group", isNature && "lg:translate-y-2")}
          >
            <StoryMedia
              data={data}
              isNature={isNature}
              reduceMotion={Boolean(reduceMotion)}
            />
          </motion.div>
        </div>
      </div>

      <TerraceDivider className="opacity-70" />
    </section>
  );
}
