"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ChevronDown, Eye, EyeOff, Images } from "lucide-react";
import { siteConfig } from "@/data/site";
import { TerraceDivider } from "@/components/TerraceDivider";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const videoSrc = `${basePath}/videos/village-hero.webm`;

export function Hero() {
  const [reduceMotion, setReduceMotion] = useState(false);
  const [textHidden, setTextHidden] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduceMotion(mediaQuery.matches);
    update();
    mediaQuery.addEventListener("change", update);
    return () => mediaQuery.removeEventListener("change", update);
  }, []);

  const slideTransition = { duration: reduceMotion ? 0 : 0.65, ease: [0.16, 1, 0.3, 1] as const };

  return (
    <section id="top" className="relative flex h-[100svh] min-h-[560px] w-full items-end overflow-hidden bg-ink">
      <div className="absolute inset-0">
        {reduceMotion ? (
          <div
            className="h-full w-full bg-[radial-gradient(circle_at_50%_25%,rgba(194,208,187,0.8),rgba(31,35,31,0.95)_70%)]"
            aria-hidden="true"
          />
        ) : (
          <video
            className="h-full w-full object-cover object-center"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-hidden="true"
          >
            <source src={videoSrc} type="video/webm" />
          </video>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-ink/10" />
        <div className="grain-overlay absolute inset-0" />
      </div>

      <div className="container-content relative z-10 pb-20 pt-40 sm:pb-28">
        <div className="mb-7 flex justify-center lg:justify-start">
          <button
            type="button"
            onClick={() => setTextHidden((value) => !value)}
            aria-pressed={textHidden}
            aria-label={textHidden ? "แสดงข้อความ" : "ซ่อนข้อความเพื่อดูวิดีโอเต็มจอ"}
            className="group inline-flex items-center gap-2 rounded-full border border-rice/15 bg-ink/10 px-4 py-2 text-rice/40 backdrop-blur-sm transition-all duration-300 hover:border-rice/40 hover:bg-ink/20 hover:text-rice/85"
          >
            {textHidden ? (
              <Eye className="h-3.5 w-3.5" strokeWidth={1.5} />
            ) : (
              <EyeOff className="h-3.5 w-3.5" strokeWidth={1.5} />
            )}
            <span className="font-mono text-[10px] uppercase tracking-[0.2em]">
              {textHidden ? "แสดงข้อความ" : "ซ่อนข้อความ"}
            </span>
          </button>
        </div>

        <motion.div
          animate={{ x: textHidden ? "-130%" : "0%", opacity: textHidden ? 0 : 1 }}
          transition={slideTransition}
        >
          <motion.div
            initial={{ opacity: 0, scaleX: 0.4 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="w-24 origin-left"
          >
            <TerraceDivider tone="rice" className="opacity-80" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="heading-display -mt-2 max-w-3xl text-rice"
          >
            <span className="block text-3xl font-normal text-rice/80 sm:text-4xl lg:text-5xl">
              Discover
            </span>
            <span className="block bg-gradient-to-r from-rice via-rice to-gold bg-clip-text text-6xl text-transparent sm:text-7xl lg:text-8xl">
              {siteConfig.name}
            </span>
          </motion.h1>
        </motion.div>

        <motion.div
          animate={{ x: textHidden ? "130%" : "0%", opacity: textHidden ? 0 : 1 }}
          transition={slideTransition}
        >
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-6 max-w-xl text-lg leading-relaxed text-rice/85"
          >
            {siteConfig.heroSubtitleThai}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.55 }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <motion.a
              href="#village"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="group inline-flex items-center gap-2.5 border border-rice/40 bg-rice px-7 py-3.5 font-mono text-xs uppercase tracking-[0.2em] text-ink shadow-lg shadow-ink/20 transition-colors hover:border-gold hover:bg-gold"
            >
              Enter the village
              <ArrowRight
                className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1"
                strokeWidth={1.75}
              />
            </motion.a>
            <motion.a
              href="#gallery"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="group inline-flex items-center gap-2.5 border border-rice/30 px-7 py-3.5 font-mono text-xs uppercase tracking-[0.2em] text-rice backdrop-blur-sm transition-colors hover:border-rice hover:bg-rice/10"
            >
              <Images className="h-3.5 w-3.5" strokeWidth={1.75} />
              View gallery
            </motion.a>
          </motion.div>
        </motion.div>
      </div>

      <a
        href="#village"
        aria-label="Scroll to next section"
        className="absolute bottom-8 right-6 z-10 hidden flex-col items-center gap-2 text-rice/70 sm:right-12 sm:flex"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] [writing-mode:vertical-rl]">
          Scroll
        </span>
        <ChevronDown className="h-4 w-4 animate-scroll-pulse" strokeWidth={1.5} />
      </a>
    </section>
  );
}
