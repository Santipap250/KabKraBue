"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowRight, ChevronDown, Eye, EyeOff, Images } from "lucide-react";
import { siteConfig } from "@/data/site";
import { TerraceDivider } from "@/components/TerraceDivider";
import { InstallAppButton } from "@/components/InstallAppButton";
import { withBasePath } from "@/lib/paths";
import { CelestialTimepiece } from "@/components/CelestialTimepiece";
import { getResponsiveImageSrcSet } from "@/lib/responsive-images";

const videoSrc = withBasePath("/videos/village-hero.webm");
const fallbackVideoSrc = withBasePath("/videos/village-hero.mp4");
const posterSrc = "/images/village-hero-poster.jpg";
const desktopPosterSrc = "/images/places/viewpoint-01.jpg";
const posterSrcSet = getResponsiveImageSrcSet(posterSrc);

function HeroPoster() {
  return (
    <picture className="absolute inset-0 block">
      <source media="(min-width: 768px)" srcSet={withBasePath(desktopPosterSrc)} sizes="100vw" />
      {posterSrcSet && <source media="(max-width: 767px)" type="image/webp" srcSet={posterSrcSet} sizes="100vw" />}
      <Image
        src={withBasePath(posterSrc)}
        alt=""
        fill
        unoptimized
        loading="eager"
        fetchPriority="high"
        sizes="100vw"
        className="object-cover object-center"
      />
    </picture>
  );
}

export function Hero() {
  const [reduceMotion, setReduceMotion] = useState(false);
  const [motionPreferenceKnown, setMotionPreferenceKnown] = useState(false);
  const [networkPreferenceKnown, setNetworkPreferenceKnown] = useState(false);
  const [dataSaverEnabled, setDataSaverEnabled] = useState(false);
  const [textHidden, setTextHidden] = useState(false);
  const [videoHasStarted, setVideoHasStarted] = useState(false);
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
    if (!motionEnabled) setVideoHasStarted(false);
  }, [motionEnabled]);

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
    <section id="top" className="relative flex min-h-[max(560px,100svh)] w-full items-end overflow-hidden bg-ink">
      <div className="absolute inset-0">
        {!motionEnabled ? (
          <HeroPoster />
        ) : (
          <>
            <video
              ref={heroVideoRef}
              className="h-full w-full object-cover object-center"
              muted
              loop
              playsInline
              preload="none"
              aria-hidden="true"
              onPlaying={() => setVideoHasStarted(true)}
            >
              <source src={videoSrc} type="video/webm" />
              <source src={fallbackVideoSrc} type="video/mp4" />
            </video>
            <div aria-hidden="true" className={`absolute inset-0 transition-opacity duration-500 ${videoHasStarted ? "pointer-events-none opacity-0" : "opacity-100"}`}>
              <HeroPoster />
            </div>
          </>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-ink/10" />
        <div className="grain-overlay absolute inset-0" />
      </div>

      <CelestialTimepiece motionEnabled={motionEnabled} />

      <div className="hero-copy container-content relative z-10 pb-20 pt-40 sm:pb-28">
        <div ref={textContentRef} aria-hidden={textHidden}>
          <motion.div animate={{ x: textHidden ? "-130%" : "0%", opacity: textHidden ? 0 : 1 }} transition={slideTransition}>
            <motion.div initial={motionEnabled ? { opacity: 0, scaleX: 0.4 } : false} animate={{ opacity: 1, scaleX: 1 }} transition={{ duration: motionEnabled ? 0.9 : 0, ease: [0.16, 1, 0.3, 1] }} className="w-24 origin-left">
              <TerraceDivider tone="rice" className="opacity-80" />
            </motion.div>
            <motion.h1 initial={motionEnabled ? { opacity: 0, y: 24 } : false} animate={{ opacity: 1, y: 0 }} transition={{ duration: motionEnabled ? 0.9 : 0, delay: motionEnabled ? 0.15 : 0, ease: [0.16, 1, 0.3, 1] }} className="heading-display mt-1 max-w-3xl text-rice">
              <span lang="en" className="inline-block max-w-full bg-gradient-to-r from-rice via-rice to-gold bg-clip-text text-6xl font-medium leading-[0.95] tracking-[-0.035em] text-transparent drop-shadow-[0_2px_14px_rgba(28,27,23,0.4)] sm:text-7xl lg:text-8xl">{siteConfig.name}</span>
            </motion.h1>
          </motion.div>

          <motion.div animate={{ x: textHidden ? "130%" : "0%", opacity: textHidden ? 0 : 1 }} transition={slideTransition}>
            <motion.p initial={motionEnabled ? { opacity: 0, y: 16 } : false} animate={{ opacity: 1, y: 0 }} transition={{ duration: motionEnabled ? 0.8 : 0, delay: motionEnabled ? 0.4 : 0 }} className="mt-5 max-w-xl text-pretty text-lg leading-[1.85] tracking-[0.01em] text-rice/90 sm:mt-6 sm:text-xl">
              <span className="block sm:inline">{siteConfig.heroSubtitleThaiLines[0]}</span>{" "}
              <span className="block sm:inline">{siteConfig.heroSubtitleThaiLines[1]}</span>
            </motion.p>
            <motion.div initial={motionEnabled ? { opacity: 0, y: 16 } : false} animate={{ opacity: 1, y: 0 }} transition={{ duration: motionEnabled ? 0.8 : 0, delay: motionEnabled ? 0.55 : 0 }} className="mt-9 flex flex-wrap items-center gap-4">
              <motion.a lang="en" href="#village" whileHover={motionEnabled ? { scale: 1.02 } : undefined} whileTap={motionEnabled ? { scale: 0.98 } : undefined} transition={{ duration: motionEnabled ? 0.2 : 0 }} className="group inline-flex items-center gap-2.5 border border-rice/40 bg-rice px-7 py-3.5 font-mono text-xs uppercase tracking-[0.2em] text-ink shadow-lg shadow-ink/20 transition-colors hover:border-gold hover:bg-gold">Enter the village<ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={1.75} /></motion.a>
              <motion.a lang="en" href="#gallery" whileHover={motionEnabled ? { scale: 1.02 } : undefined} whileTap={motionEnabled ? { scale: 0.98 } : undefined} transition={{ duration: motionEnabled ? 0.2 : 0 }} className="group inline-flex items-center gap-2.5 border border-rice/30 px-7 py-3.5 font-mono text-xs uppercase tracking-[0.2em] text-rice backdrop-blur-sm transition-colors hover:border-rice hover:bg-rice/10"><Images className="h-3.5 w-3.5" strokeWidth={1.75} />View gallery</motion.a>
            </motion.div>
            <motion.div initial={motionEnabled ? { opacity: 0, y: 12 } : false} animate={{ opacity: 1, y: 0 }} transition={{ duration: motionEnabled ? 0.8 : 0, delay: motionEnabled ? 0.68 : 0 }} className="mt-4">
              <InstallAppButton />
            </motion.div>
          </motion.div>
        </div>
      </div>

      <button type="button" onClick={() => setTextHidden((value) => !value)} aria-pressed={textHidden} aria-label={textHidden ? "แสดงข้อความ" : "ซ่อนข้อความเพื่อดูวิดีโอเต็มจอ"} className="group absolute bottom-8 left-6 z-10 inline-flex min-h-11 items-center gap-2 rounded-full border border-rice/15 bg-ink/10 px-4 py-2 text-rice/65 backdrop-blur-sm transition-all duration-300 hover:border-rice/40 hover:bg-ink/20 hover:text-rice/85 sm:left-12">
        {textHidden ? <Eye className="h-3.5 w-3.5" strokeWidth={1.5} /> : <EyeOff className="h-3.5 w-3.5" strokeWidth={1.5} />}
        <span className="font-mono text-[10px] uppercase tracking-[0.2em]">{textHidden ? "แสดงข้อความ" : "ซ่อนข้อความ"}</span>
      </button>

      <a href="#village" aria-label="Scroll to next section" lang="en" className="absolute bottom-8 right-6 z-10 hidden flex-col items-center gap-2 text-rice/70 sm:right-12 sm:flex"><span className="font-mono text-[10px] uppercase tracking-[0.2em] [writing-mode:vertical-rl]">Scroll</span><ChevronDown className="h-4 w-4 animate-scroll-pulse" strokeWidth={1.5} /></a>
    </section>
  );
}
