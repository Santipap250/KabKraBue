"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowRight, ChevronDown, Eye, EyeOff, Images } from "lucide-react";
import { siteConfig } from "@/data/site";
import { TerraceDivider } from "@/components/TerraceDivider";
import { InstallAppButton } from "@/components/InstallAppButton";
import { withBasePath } from "@/lib/paths";

const videoSrc = withBasePath("/videos/village-hero.webm");
const fallbackVideoSrc = withBasePath("/videos/village-hero.mp4");
const posterSrc = withBasePath("/images/village-hero-poster.jpg");
const desktopPosterSrc = withBasePath("/images/places/viewpoint-01.jpg");

const BANGKOK_TIME_ZONE = "Asia/Bangkok";
const bangkokYearFormatter = new Intl.DateTimeFormat("en-US", {
  timeZone: BANGKOK_TIME_ZONE,
  year: "numeric",
});

function getNewYearCountdown(now: Date) {
  const thailandYear = Number.parseInt(bangkokYearFormatter.format(now), 10);
  // Bangkok observes UTC+7; midnight on January 1 is 17:00 UTC on December 31.
  const nextNewYear = Date.UTC(thailandYear + 1, 0, 1) - 7 * 60 * 60 * 1000;
  const remainingSeconds = Math.max(0, Math.floor((nextNewYear - now.getTime()) / 1000));
  const days = Math.floor(remainingSeconds / 86_400);
  const hours = Math.floor((remainingSeconds % 86_400) / 3_600);
  const minutes = Math.floor((remainingSeconds % 3_600) / 60);
  const seconds = remainingSeconds % 60;

  return { year: thailandYear + 1, days, hours, minutes, seconds };
}

function NewYearCountdown({ motionEnabled }: { motionEnabled: boolean }) {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    let timer = 0;
    const update = () => {
      const current = new Date();
      setNow(current);
      timer = window.setTimeout(update, 1_000 - current.getMilliseconds());
    };
    const handleVisibilityChange = () => {
      window.clearTimeout(timer);
      if (!document.hidden) update();
    };

    update();
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      window.clearTimeout(timer);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  const countdown = now ? getNewYearCountdown(now) : null;
  const units = [
    { label: "DAYS", value: countdown?.days },
    { label: "HRS", value: countdown?.hours },
    { label: "MIN", value: countdown?.minutes },
    { label: "SEC", value: countdown?.seconds },
  ];
  const accessibleLabel = countdown
    ? `นับถอยหลังถึงปีใหม่ ${countdown.year}: ${countdown.days} วัน ${countdown.hours} ชั่วโมง ${countdown.minutes} นาที ${countdown.seconds} วินาที. Countdown to New Year ${countdown.year}: ${countdown.days} days, ${countdown.hours} hours, ${countdown.minutes} minutes, ${countdown.seconds} seconds.`
    : "นับถอยหลังถึงปีใหม่ / Countdown to New Year";

  return (
    <div className="absolute left-1/2 top-[13%] z-10 -translate-x-1/2">
      <div
        role="timer"
        aria-label={accessibleLabel}
        aria-live="off"
        className={`countdown-capsule flex w-[164px] flex-col items-center gap-1 rounded-full border border-gold/40 bg-ink/90 px-3 py-1.5 shadow-[0_8px_24px_rgba(0,0,0,0.18)] backdrop-blur-md sm:w-[176px] sm:py-2 ${motionEnabled ? "countdown-capsule--motion" : ""}`}
      >
        <span aria-hidden="true" className="font-mono text-[8px] uppercase tracking-[0.18em] text-rice/80">
          <span className="text-gold">NEW YEAR</span>
          <span className="mx-1 text-gold/70">·</span>
          ปีใหม่{countdown ? ` ${countdown.year}` : ""}
        </span>
        <span aria-hidden="true" className="flex items-center gap-1 tabular-nums">
          {units.map((unit, index) => (
            <span key={unit.label} className="flex items-center gap-1">
              <span className="flex min-w-[23px] flex-col items-center leading-none">
                <span
                  key={unit.value ?? "pending"}
                  className={`font-mono text-[12px] tracking-[0.04em] text-rice ${motionEnabled && unit.value !== undefined ? "countdown-value-tick" : ""}`}
                >
                  {unit.value === undefined ? "--" : String(unit.value).padStart(2, "0")}
                </span>
                <span className="mt-0.5 font-mono text-[8px] tracking-[0.12em] text-rice/65">
                  {unit.label}
                </span>
              </span>
              {index < units.length - 1 && (
                <span className="-mt-1 font-mono text-[10px] text-gold/70">:</span>
              )}
            </span>
          ))}
        </span>
      </div>
    </div>
  );
}

export function Hero() {
  const [reduceMotion, setReduceMotion] = useState(false);
  const [motionPreferenceKnown, setMotionPreferenceKnown] = useState(false);
  const [networkPreferenceKnown, setNetworkPreferenceKnown] = useState(false);
  const [dataSaverEnabled, setDataSaverEnabled] = useState(false);
  const [textHidden, setTextHidden] = useState(false);
  const heroVideoRef = useRef<HTMLVideoElement>(null);
  const textContentRef = useCallback((element: HTMLDivElement | null) => {
    if (!element) return;
    if (textHidden) element.setAttribute("inert", "");
    else element.removeAttribute("inert");
  }, [textHidden]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduceMotion(mediaQuery.matches);
    update();
    setMotionPreferenceKnown(true);
    mediaQuery.addEventListener("change", update);

    return () => mediaQuery.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    type NetworkInformation = EventTarget & { saveData?: boolean; effectiveType?: string };
    const connection = (navigator as Navigator & { connection?: NetworkInformation }).connection;
    const update = () => setDataSaverEnabled(Boolean(
      connection?.saveData || connection?.effectiveType === "slow-2g" || connection?.effectiveType === "2g",
    ));

    update();
    setNetworkPreferenceKnown(true);
    connection?.addEventListener("change", update);
    return () => connection?.removeEventListener("change", update);
  }, []);

  const motionEnabled = motionPreferenceKnown && !reduceMotion && networkPreferenceKnown && !dataSaverEnabled;
  useEffect(() => {
    if (!motionEnabled) return;
    const video = heroVideoRef.current;
    if (!video || typeof IntersectionObserver === "undefined") return;

    let isIntersecting = false;
    const syncPlayback = () => {
      if (!isIntersecting || document.visibilityState !== "visible") {
        video.pause();
        return;
      }
      void video.play().catch(() => video.pause());
    };
    const observer = new IntersectionObserver(([entry]) => {
      isIntersecting = entry.isIntersecting;
      syncPlayback();
    }, { threshold: 0.15 });

    observer.observe(video);
    document.addEventListener("visibilitychange", syncPlayback);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", syncPlayback);
      video.pause();
    };
  }, [motionEnabled]);
  const slideTransition = { duration: motionEnabled ? 0.65 : 0, ease: [0.16, 1, 0.3, 1] as const };

  return (
    <section id="top" className="relative flex h-[100svh] min-h-[560px] w-full items-end overflow-hidden bg-ink">
      <div className="absolute inset-0">
        {!motionEnabled ? (
          <picture className="absolute inset-0 block">
            <source media="(min-width: 768px)" srcSet={desktopPosterSrc} />
            <Image
              src={posterSrc}
              alt=""
              fill
              unoptimized
              loading="eager"
              fetchPriority="high"
              sizes="100vw"
              className="object-cover object-center"
            />
          </picture>
        ) : (
          <video
            ref={heroVideoRef}
            className="h-full w-full object-cover object-center"
            muted
            loop
            playsInline
            preload="none"
            poster={posterSrc}
            aria-hidden="true"
          >
            <source src={videoSrc} type="video/webm" />
            <source src={fallbackVideoSrc} type="video/mp4" />
          </video>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-ink/10" />
        <div className="grain-overlay absolute inset-0" />
      </div>

      <NewYearCountdown motionEnabled={motionEnabled} />

      <div className="container-content relative z-10 pb-20 pt-40 sm:pb-28">
        <div ref={textContentRef} aria-hidden={textHidden}>
          <motion.div animate={{ x: textHidden ? "-130%" : "0%", opacity: textHidden ? 0 : 1 }} transition={slideTransition}>
            <motion.div initial={motionEnabled ? { opacity: 0, scaleX: 0.4 } : false} animate={{ opacity: 1, scaleX: 1 }} transition={{ duration: motionEnabled ? 0.9 : 0, ease: [0.16, 1, 0.3, 1] }} className="w-24 origin-left">
              <TerraceDivider tone="rice" className="opacity-80" />
            </motion.div>
            <motion.h1 initial={motionEnabled ? { opacity: 0, y: 24 } : false} animate={{ opacity: 1, y: 0 }} transition={{ duration: motionEnabled ? 0.9 : 0, delay: motionEnabled ? 0.15 : 0, ease: [0.16, 1, 0.3, 1] }} className="heading-display -mt-2 max-w-3xl text-rice">
              <span className="block text-3xl font-normal text-rice/80 sm:text-4xl lg:text-5xl">Discover</span>
              <span className="block bg-gradient-to-r from-rice via-rice to-gold bg-clip-text text-6xl text-transparent sm:text-7xl lg:text-8xl">{siteConfig.name}</span>
            </motion.h1>
          </motion.div>

          <motion.div animate={{ x: textHidden ? "130%" : "0%", opacity: textHidden ? 0 : 1 }} transition={slideTransition}>
            <motion.p initial={motionEnabled ? { opacity: 0, y: 16 } : false} animate={{ opacity: 1, y: 0 }} transition={{ duration: motionEnabled ? 0.8 : 0, delay: motionEnabled ? 0.4 : 0 }} className="mt-6 max-w-xl text-lg leading-relaxed text-rice/85">{siteConfig.heroSubtitleThai}</motion.p>
            <motion.div initial={motionEnabled ? { opacity: 0, y: 16 } : false} animate={{ opacity: 1, y: 0 }} transition={{ duration: motionEnabled ? 0.8 : 0, delay: motionEnabled ? 0.55 : 0 }} className="mt-9 flex flex-wrap items-center gap-4">
              <motion.a href="#village" whileHover={motionEnabled ? { scale: 1.02 } : undefined} whileTap={motionEnabled ? { scale: 0.98 } : undefined} transition={{ duration: motionEnabled ? 0.2 : 0 }} className="group inline-flex items-center gap-2.5 border border-rice/40 bg-rice px-7 py-3.5 font-mono text-xs uppercase tracking-[0.2em] text-ink shadow-lg shadow-ink/20 transition-colors hover:border-gold hover:bg-gold">Enter the village<ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={1.75} /></motion.a>
              <motion.a href="#gallery" whileHover={motionEnabled ? { scale: 1.02 } : undefined} whileTap={motionEnabled ? { scale: 0.98 } : undefined} transition={{ duration: motionEnabled ? 0.2 : 0 }} className="group inline-flex items-center gap-2.5 border border-rice/30 px-7 py-3.5 font-mono text-xs uppercase tracking-[0.2em] text-rice backdrop-blur-sm transition-colors hover:border-rice hover:bg-rice/10"><Images className="h-3.5 w-3.5" strokeWidth={1.75} />View gallery</motion.a>
            </motion.div>
            <motion.div initial={motionEnabled ? { opacity: 0, y: 12 } : false} animate={{ opacity: 1, y: 0 }} transition={{ duration: motionEnabled ? 0.8 : 0, delay: motionEnabled ? 0.68 : 0 }} className="mt-4">
              <InstallAppButton />
            </motion.div>
          </motion.div>
        </div>
      </div>

      <button type="button" onClick={() => setTextHidden((value) => !value)} aria-pressed={textHidden} aria-label={textHidden ? "แสดงข้อความ" : "ซ่อนข้อความเพื่อดูวิดีโอเต็มจอ"} className="group absolute bottom-8 left-6 z-10 inline-flex items-center gap-2 rounded-full border border-rice/15 bg-ink/10 px-4 py-2 text-rice/65 backdrop-blur-sm transition-all duration-300 hover:border-rice/40 hover:bg-ink/20 hover:text-rice/85 sm:left-12">
        {textHidden ? <Eye className="h-3.5 w-3.5" strokeWidth={1.5} /> : <EyeOff className="h-3.5 w-3.5" strokeWidth={1.5} />}
        <span className="font-mono text-[10px] uppercase tracking-[0.2em]">{textHidden ? "แสดงข้อความ" : "ซ่อนข้อความ"}</span>
      </button>

      <a href="#village" aria-label="Scroll to next section" className="absolute bottom-8 right-6 z-10 hidden flex-col items-center gap-2 text-rice/70 sm:right-12 sm:flex"><span className="font-mono text-[10px] uppercase tracking-[0.2em] [writing-mode:vertical-rl]">Scroll</span><ChevronDown className="h-4 w-4 animate-scroll-pulse" strokeWidth={1.5} /></a>
    </section>
  );
}
