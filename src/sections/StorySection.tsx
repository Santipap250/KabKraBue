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

function LazyStoryVideo({
  src,
  alt,
  className,
  isNature,
  isVillage,
}: {
  src: string;
  alt: string;
  className?: string;
  isNature: boolean;
  isVillage: boolean;
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

  return (
    <div
      className={cn(
        "relative overflow-hidden bg-mist",
        isNature
          ? "aspect-[9/16] rounded-[2rem] shadow-2xl shadow-ink/15 ring-1 ring-ink/10 sm:aspect-[4/5]"
          : isVillage
            ? "aspect-[4/5] rounded-[1.5rem] border border-ink/10 bg-[#efe8d8] p-[7px] shadow-[0_22px_60px_rgba(31,35,31,0.16)] ring-1 ring-ink/5 sm:rounded-[1.75rem] sm:p-[9px]"
            : "aspect-[4/5]",
        className
      )}
    >
      <div
        className={cn(
          "relative h-full w-full overflow-hidden bg-ink",
          isVillage ? "rounded-[1.1rem] ring-1 ring-rice/20 sm:rounded-[1.3rem]" : ""
        )}
      >
        <video
          ref={videoRef}
          className={cn(
            "h-full w-full object-cover",
            isVillage && "scale-[1.01]"
          )}
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

        {isVillage && (
          <>
            <div
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-ink/10"
              aria-hidden="true"
            />
            <div
              className="pointer-events-none absolute inset-[6px] rounded-[1rem] border border-rice/20 sm:inset-[8px] sm:rounded-[1.15rem]"
              aria-hidden="true"
            />
            <div className="absolute left-4 top-4 rounded-full border border-rice/30 bg-ink/25 px-3 py-1.5 backdrop-blur-md sm:left-5 sm:top-5">
              <span className="font-mono text-[9px] uppercase tracking-[0.24em] text-rice/90">
                01 / The Village
              </span>
            </div>
            <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-4 sm:bottom-5 sm:left-5 sm:right-5">
              <div>
                <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-rice/55">
                  KabKraBue · Village opening
                </p>
                <p className="mt-1 font-body text-sm text-rice/90">
                  ถนน ผืนนา และบ้านที่ค่อย ๆ เปิดเรื่องราว
                </p>
              </div>
              <span
                className="rounded-full border border-rice/25 bg-ink/25 p-2.5 text-rice/80 backdrop-blur-md"
                aria-hidden="true"
              >
                <Play className="h-4 w-4 fill-current" strokeWidth={1.2} />
              </span>
            </div>
          </>
        )}

        {isNature && (
          <>
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/65 via-transparent to-ink/10" aria-hidden="true" />
            <div className="absolute left-5 top-5 rounded-full border border-rice/35 bg-ink/20 px-3 py-1.5 backdrop-blur-md">
              <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-rice/90">
                KabKraBue / Nature
              </span>
            </div>
            <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-4">
              <div>
                <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-rice/60">A moving landscape</p>
                <p className="mt-1 font-body text-sm text-rice/90">ท้องฟ้า ผืนนา และจังหวะของฤดูกาล</p>
              </div>
              <span className="rounded-full border border-rice/25 bg-ink/20 p-2 text-rice/75 backdrop-blur-md" aria-hidden="true">
                <Play className="h-4 w-4 fill-current" strokeWidth={1.2} />
              </span>
            </div>
          </>
        )}
      </div>
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
      onTouchStart={(e) => { touchStartX.current = e.touches[0].clientX; }}
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
          <MediaFrame src={`/images/${slides[index].imageId}`} alt={slides[index].imageAlt} aspect="aspect-auto" className="h-full" />
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
  const isVillage = data.id === "village";
  if (data.videoId && !reduceMotion) {
    return <LazyStoryVideo src={`${basePath}/videos/${data.videoId}`} alt={data.imageAlt} isNature={isNature} isVillage={isVillage} />;
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
      <motion.div id={`${id}-story-body`} initial={false} animate={{ height: expanded || !isLong ? "auto" : COLLAPSED_HEIGHT }} transition={reduceMotion ? { duration: 0 } : { duration: 0.3, ease: [0.16, 1, 0.3, 1] }} className="story-body relative overflow-hidden">
        {paragraphs.map((paragraph, index) => <p key={`${id}-${index}`}>{paragraph}</p>)}
        {isLong && !expanded && <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-rice to-transparent" />}
      </motion.div>
      {isLong && (
        <button type="button" onClick={() => setExpanded((value) => !value)} aria-expanded={expanded} aria-controls={`${id}-story-body`} className="mt-3 inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-[0.15em] text-paddy transition-colors hover:text-clay">
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
        {isNature && <div className="pointer-events-none absolute inset-x-0 top-0 overflow-hidden" aria-hidden="true"><span className="absolute right-6 -mt-8 select-none font-display text-[17rem] leading-none text-paddy/5 sm:text-[23rem]">04</span></div>}
        <div className={cn("relative grid items-center gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16", reverse && "lg:[&>*:first-child]:order-2", isNature && "lg:items-stretch")}>
          <motion.div initial={reduceMotion ? false : { opacity: 0, y: 24 }} whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.18, margin: "0px 0px -12% 0px" }} transition={reduceMotion ? { duration: 0 } : { duration: 0.55, ease: [0.16, 1, 0.3, 1] }} className={cn(isNature && "flex flex-col justify-center")}>
            <div className="flex items-baseline gap-3"><span className="font-mono text-xs text-clay">{data.index}</span><span className="eyebrow">{data.eyebrow}</span></div>
            <h2 className="heading-display mt-3 max-w-2xl text-4xl text-ink sm:text-5xl">{data.title}</h2>
            <p className="story-title-thai mt-3 max-w-xl font-body">{data.titleThai}</p>
            {isNature && <div className="mt-6 h-px w-20 bg-clay/60" aria-hidden="true" />}
            <StoryBody id={data.id} body={data.body} />
          </motion.div>
          <motion.div initial={reduceMotion ? false : { opacity: 0, y: 20, scale: 0.99 }} whileInView={reduceMotion ? undefined : { opacity: 1, y: 0, scale: 1 }} viewport={{ once: true, amount: 0.18, margin: "0px 0px -12% 0px" }} transition={reduceMotion ? { duration: 0 } : { duration: 0.65, delay: 0.06, ease: [0.16, 1, 0.3, 1] }} className={cn("group", isNature && "lg:translate-y-2")}>
            <StoryMedia data={data} isNature={isNature} />
          </motion.div>
        </div>
      </div>
      <TerraceDivider className="opacity-70" />
    </section>
  );
}
