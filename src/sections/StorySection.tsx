"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronDown, ChevronLeft, ChevronRight, Play } from "lucide-react";
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

type VideoVariant = "village" | "people" | "nature" | "default";

function VideoFrameShell({
  variant,
  children,
  alt,
}: {
  variant: VideoVariant;
  children: React.ReactNode;
  alt: string;
}) {
  if (variant === "village") {
    return (
      <div
        className="relative overflow-hidden rounded-[2.25rem] border border-ink/10 bg-rice/80 p-3 shadow-[0_30px_80px_-35px_rgba(31,33,27,0.45)] sm:p-4"
        aria-label={`${alt} — cinematic frame`}
      >
        <div className="pointer-events-none absolute inset-2 rounded-[1.8rem] border border-clay/30 sm:inset-3" aria-hidden="true" />
        <div className="relative overflow-hidden rounded-[1.65rem] bg-ink shadow-[0_20px_45px_-25px_rgba(31,33,27,0.55)] sm:rounded-[1.8rem]">
          {children}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-rice/10 via-transparent to-ink/25" aria-hidden="true" />
          <div className="pointer-events-none absolute inset-x-5 top-5 flex items-center justify-between text-rice/85 sm:inset-x-6 sm:top-6">
            <span className="font-mono text-[9px] uppercase tracking-[0.24em]">01 / The Village</span>
            <span className="h-px w-10 bg-rice/45 sm:w-14" aria-hidden="true" />
          </div>
          <div className="pointer-events-none absolute inset-x-5 bottom-5 flex items-end justify-between gap-4 sm:inset-x-6 sm:bottom-6">
            <div>
              <p className="font-mono text-[8px] uppercase tracking-[0.22em] text-rice/55">A moving portrait of home</p>
              <p className="mt-1 font-body text-sm text-rice/95">ท้องนา ถนน และบ้านที่ค่อย ๆ เปิดเผยตัวตน</p>
            </div>
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-rice/35 bg-ink/20 text-rice/90 backdrop-blur-md sm:h-10 sm:w-10" aria-hidden="true">
              <Play className="h-4 w-4 fill-current" strokeWidth={1.2} />
            </span>
          </div>
        </div>
      </div>
    );
  }

  if (variant === "people") {
    return (
      <div
        className="relative overflow-hidden rounded-[2rem] border border-ink/12 bg-ink p-2.5 shadow-[0_30px_80px_-35px_rgba(31,33,27,0.5)] sm:p-3.5"
        aria-label={`${alt} — cinematic frame`}
      >
        <div className="pointer-events-none absolute inset-1.5 rounded-[1.7rem] border border-clay/35 sm:inset-2" aria-hidden="true" />
        <div className="relative overflow-hidden rounded-[1.45rem] bg-ink sm:rounded-[1.6rem]">
          {children}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/55 via-transparent to-ink/10" aria-hidden="true" />
          <div className="pointer-events-none absolute inset-x-5 top-5 flex items-center justify-between sm:inset-x-6 sm:top-6">
            <span className="rounded-full border border-rice/25 bg-ink/20 px-3 py-1 font-mono text-[8px] uppercase tracking-[0.22em] text-rice/85 backdrop-blur-md">
              KabKraBue
            </span>
            <span className="font-mono text-[9px] tracking-[0.22em] text-rice/70">03</span>
          </div>
          <div className="pointer-events-none absolute inset-x-5 bottom-5 sm:inset-x-6 sm:bottom-6">
            <div className="h-px w-12 bg-clay/80" />
            <p className="mt-2 font-mono text-[8px] uppercase tracking-[0.2em] text-rice/55">A place we remember</p>
            <p className="mt-1 max-w-sm font-body text-sm text-rice/95">ถนน ผืนนา ท้องฟ้า และภาพที่ยังอยู่ในความทรงจำ</p>
          </div>
        </div>
      </div>
    );
  }

  if (variant === "nature") {
    return (
      <div
        className="relative overflow-hidden rounded-[2rem] border border-ink/10 bg-mist shadow-2xl shadow-ink/15 ring-1 ring-ink/10"
        aria-label={`${alt} — cinematic frame`}
      >
        {children}
      </div>
    );
  }

  return children;
}

function LazyStoryVideo({
  src,
  alt,
  className,
  variant = "default",
}: {
  src: string;
  alt: string;
  className?: string;
  variant?: VideoVariant;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [failed, setFailed] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion) return;
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          void video.play().catch(() => undefined);
        } else {
          video.pause();
        }
      },
      { rootMargin: "120px 0px", threshold: 0.2 }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, [reduceMotion]);

  if (failed || reduceMotion) {
    return (
      <MediaFrame
        src="/images/og-cover.jpg"
        alt={alt}
        aspect="aspect-[4/5]"
      />
    );
  }

  const isNature = variant === "nature";

  const video = (
    <video
      ref={videoRef}
      className={cn("h-full w-full object-cover", className)}
      muted
      loop
      playsInline
      preload="none"
      poster={`${basePath}/images/og-cover.jpg`}
      aria-label={alt}
      onError={() => setFailed(true)}
    >
      <source src={src} type="video/mp4" />
    </video>
  );

  if (variant === "village" || variant === "people" || variant === "nature") {
    return (
      <VideoFrameShell variant={variant} alt={alt}>
        <div className={cn(
          "relative aspect-[4/5] overflow-hidden",
          isNature && "aspect-[9/16] sm:aspect-[4/5]"
        )}>
          {video}
        </div>
      </VideoFrameShell>
    );
  }

  return (
    <div className={cn("relative aspect-[4/5] overflow-hidden bg-mist", className)}>
      {video}
    </div>
  );
}

function StoryCarousel({ data }: { data: StorySectionData }) {
  const slides = [{ imageId: data.imageId, imageAlt: data.imageAlt }, ...(data.gallery ?? [])];
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const reduceMotion = useReducedMotion();

  const goTo = (target: number) => {
    const next = (target + slides.length) % slides.length;
    setDirection(next > index || (index === slides.length - 1 && next === 0) ? 1 : -1);
    setIndex(next);
  };

  return (
    <div
      className="group/carousel relative aspect-[4/5] overflow-hidden bg-mist"
      role="region"
      aria-roledescription="carousel"
      aria-label={`${data.eyebrow} — ${slides.length} ภาพ`}
      onTouchStart={(e) => {
        touchStartX.current = e.touches[0].clientX;
      }}
      onTouchEnd={(e) => {
        if (touchStartX.current === null) return;
        const delta = e.changedTouches[0].clientX - touchStartX.current;
        if (Math.abs(delta) > 40) goTo(index + (delta > 0 ? -1 : 1));
        touchStartX.current = null;
      }}
    >
      <AnimatePresence initial={false} custom={direction} mode="popLayout">
        <motion.div
          key={index}
          custom={direction}
          initial={reduceMotion ? { opacity: 1 } : { opacity: 0, x: direction >= 0 ? 24 : -24 }}
          animate={{ opacity: 1, x: 0 }}
          exit={reduceMotion ? { opacity: 1 } : { opacity: 0, x: direction >= 0 ? -24 : 24 }}
          transition={{ duration: reduceMotion ? 0 : 0.22, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0"
        >
          <MediaFrame
            src={`/images/${slides[index].imageId}`}
            alt={slides[index].imageAlt}
            aspect="aspect-auto"
            className="h-full"
          />
        </motion.div>
      </AnimatePresence>

      {slides.length > 1 && (
        <>
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/35 via-transparent to-transparent" aria-hidden="true" />
          <button type="button" onClick={() => goTo(index - 1)} aria-label="ภาพก่อนหน้า" className="absolute left-3 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-ink/30 text-rice opacity-0 backdrop-blur-sm transition-opacity duration-200 hover:bg-ink/55 focus-visible:opacity-100 group-hover/carousel:opacity-100">
            <ChevronLeft className="h-4 w-4" strokeWidth={1.75} />
          </button>
          <button type="button" onClick={() => goTo(index + 1)} aria-label="ภาพถัดไป" className="absolute right-3 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-ink/30 text-rice opacity-0 backdrop-blur-sm transition-opacity duration-200 hover:bg-ink/55 focus-visible:opacity-100 group-hover/carousel:opacity-100">
            <ChevronRight className="h-4 w-4" strokeWidth={1.75} />
          </button>
          <div className="absolute inset-x-0 bottom-4 z-10 flex justify-center gap-1.5">
            {slides.map((slide, i) => (
              <button key={slide.imageId} type="button" onClick={() => goTo(i)} aria-label={`ไปที่ภาพที่ ${i + 1} จาก ${slides.length}`} aria-current={i === index} className={cn("h-1.5 rounded-full transition-all duration-200", i === index ? "w-6 bg-rice" : "w-1.5 bg-rice/45 hover:bg-rice/75")} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function StoryMedia({ data, isNature }: { data: StorySectionData; isNature: boolean }) {
  const reduceMotion = useReducedMotion();
  if (data.videoId && !reduceMotion) {
    const variant: VideoVariant =
      data.id === "village" ? "village" :
      data.id === "people" ? "people" :
      data.id === "nature" ? "nature" : "default";
    return <LazyStoryVideo src={`${basePath}/videos/${data.videoId}`} alt={data.imageAlt} variant={variant} />;
  }
  if (data.gallery?.length) return <StoryCarousel data={data} />;
  return <MediaFrame src={`/images/${data.imageId}`} alt={data.imageAlt} aspect="aspect-[4/5]" />;
}

function StoryBody({ id, body }: { id: string; body: string }) {
  const [expanded, setExpanded] = useState(false);
  const paragraphs = body.split("\n\n");
  const isLong = body.length > COLLAPSE_THRESHOLD;
  const reduceMotion = useReducedMotion();

  return (
    <div className="mt-7 max-w-xl">
      <motion.div
        id={`${id}-story-body`}
        initial={false}
        animate={{ height: expanded || !isLong ? "auto" : COLLAPSED_HEIGHT }}
        transition={reduceMotion ? { duration: 0 } : { duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="story-body relative overflow-hidden"
      >
        {paragraphs.map((paragraph, index) => <p key={`${id}-${index}`}>{paragraph}</p>)}
        {isLong && !expanded && <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-rice to-transparent" />}
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
          <ChevronDown className={cn("h-3.5 w-3.5 transition-transform duration-200", expanded && "rotate-180")} strokeWidth={1.5} />
        </button>
      )}
    </div>
  );
}

export function StorySection({ data, reverse = false }: StorySectionProps) {
  const isNature = data.id === "nature";
  const reduceMotion = useReducedMotion();

  return (
    <section id={data.id} className="relative overflow-hidden border-t border-border">
      <div className={cn("container-content py-20 sm:py-28", isNature && "py-24 sm:py-32")}>
        {isNature && (
          <div className="pointer-events-none absolute inset-x-0 top-0 overflow-hidden" aria-hidden="true">
            <span className="absolute right-6 -mt-8 select-none font-display text-[17rem] leading-none text-paddy/5 sm:text-[23rem]">04</span>
          </div>
        )}

        <div className={cn(
          "relative grid items-center gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16",
          reverse && "lg:[&>*:first-child]:order-2",
          isNature && "lg:items-stretch"
        )}>
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 24 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.18, margin: "0px 0px -12% 0px" }}
            transition={reduceMotion ? { duration: 0 } : { duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className={cn(isNature && "flex flex-col justify-center")}
          >
            <div className="flex items-baseline gap-3">
              <span className="font-mono text-xs text-clay">{data.index}</span>
              <span className="eyebrow">{data.eyebrow}</span>
            </div>
            <h2 className="heading-display mt-3 max-w-2xl text-4xl text-ink sm:text-5xl">{data.title}</h2>
            <p className="story-title-thai mt-3 max-w-xl font-body">{data.titleThai}</p>
            {isNature && <div className="mt-6 h-px w-20 bg-clay/60" aria-hidden="true" />}
            <StoryBody id={data.id} body={data.body} />
          </motion.div>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 20, scale: 0.99 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.18, margin: "0px 0px -12% 0px" }}
            transition={reduceMotion ? { duration: 0 } : { duration: 0.65, delay: 0.06, ease: [0.16, 1, 0.3, 1] }}
            className={cn("group", isNature && "lg:translate-y-2")}
          >
            <StoryMedia data={data} isNature={isNature} />
          </motion.div>
        </div>
      </div>
      <TerraceDivider className="opacity-70" />
    </section>
  );
}
