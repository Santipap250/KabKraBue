"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ChevronDown, Eye, EyeOff, Images, Moon, Sun } from "lucide-react";
import { siteConfig } from "@/data/site";
import { TerraceDivider } from "@/components/TerraceDivider";
import { InstallAppButton } from "@/components/InstallAppButton";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const videoSrc = `${basePath}/videos/village-hero.mp4`;
const fallbackVideoSrc = `${basePath}/videos/village-hero.webm`;
const posterSrc = `${basePath}/images/village-hero-poster.jpg`;

const BANGKOK_TIME_ZONE = "Asia/Bangkok";

function formatThailandClock(date: Date) {
  const timeFormatter = new Intl.DateTimeFormat("en-GB", {
    timeZone: BANGKOK_TIME_ZONE,
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  const dateFormatter = new Intl.DateTimeFormat("en-GB", {
    timeZone: BANGKOK_TIME_ZONE,
    day: "2-digit",
    month: "short",
  });

  const hourFormatter = new Intl.DateTimeFormat("en-GB", {
    timeZone: BANGKOK_TIME_ZONE,
    hour: "2-digit",
    hour12: false,
  });

  return {
    time: timeFormatter.format(date),
    date: dateFormatter.format(date).toUpperCase(),
    hour: Number.parseInt(hourFormatter.format(date), 10),
  };
}

export function Hero() {
  const [reduceMotion, setReduceMotion] = useState(false);
  const [textHidden, setTextHidden] = useState(false);
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduceMotion(mediaQuery.matches);
    update();
    mediaQuery.addEventListener("change", update);

    return () => mediaQuery.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  const clock = formatThailandClock(now);
  const isDaytime = clock.hour >= 6 && clock.hour < 18;
  const slideTransition = { duration: reduceMotion ? 0 : 0.65, ease: [0.16, 1, 0.3, 1] as const };

  return (
    <section id="top" className="relative flex h-[100svh] min-h-[560px] w-full items-end overflow-hidden bg-ink">
      <div className="absolute inset-0">
        {reduceMotion ? (
          <div className="h-full w-full bg-[radial-gradient(circle_at_50%_25%,rgba(194,208,187,0.8),rgba(31,35,31,0.95)_70%)]" aria-hidden="true" />
        ) : (
          <video
            className="h-full w-full object-cover object-center"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster={posterSrc}
            aria-hidden="true"
          >
            <source src={videoSrc} type="video/mp4" />
            <source src={fallbackVideoSrc} type="video/webm" />
          </video>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-ink/10" />
        <div className="grain-overlay absolute inset-0" />
      </div>

      <div
        className="absolute left-1/2 top-[13%] z-10 -translate-x-1/2"
        aria-label={`เวลาประเทศไทย ${clock.time} ${clock.date}`}
        aria-live="polite"
      >
        <div className="relative flex h-[112px] w-[112px] items-center justify-center sm:h-[132px] sm:w-[132px]">
          {/* Soft ambient glow lifting the dial off the sky */}
          <div
            className="absolute inset-[-18%] rounded-full bg-gold/20 blur-2xl"
            aria-hidden="true"
          />

          {/* Bezel ring with fine hairline hour ticks (static, like a real watch face) */}
          <svg
            viewBox="0 0 200 200"
            className="absolute inset-0 h-full w-full drop-shadow-[0_6px_18px_rgba(0,0,0,0.28)]"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="kkbGoldSheen" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#F3DFA6" />
                <stop offset="45%" stopColor="#C99A3E" />
                <stop offset="100%" stopColor="#8A6423" />
              </linearGradient>
            </defs>

            {/* faint outer halo ring */}
            <circle cx="100" cy="100" r="98" fill="none" stroke="#F3DFA6" strokeOpacity="0.18" strokeWidth="1" />

            {/* fine hour ticks — thin hairlines, slightly longer at 12/3/6/9 */}
            {Array.from({ length: 12 }).map((_, i) => {
              const angle = (i * 30 - 90) * (Math.PI / 180);
              const isMajor = i % 3 === 0;
              const rOuter = 94;
              const rInner = isMajor ? 84 : 89;
              const x1 = 100 + rOuter * Math.cos(angle);
              const y1 = 100 + rOuter * Math.sin(angle);
              const x2 = 100 + rInner * Math.cos(angle);
              const y2 = 100 + rInner * Math.sin(angle);
              return (
                <line
                  key={i}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke="#F3DFA6"
                  strokeOpacity={isMajor ? 0.85 : 0.4}
                  strokeWidth={isMajor ? 1.25 : 0.75}
                  strokeLinecap="butt"
                />
              );
            })}

            {/* main polished bezel */}
            <circle cx="100" cy="100" r="72" fill="none" stroke="url(#kkbGoldSheen)" strokeWidth="2" />
          </svg>

          {/* Glass face */}
          <div className="absolute inset-[13%] rounded-full bg-[radial-gradient(circle_at_32%_28%,rgba(255,255,255,0.14),rgba(20,22,18,0.22)_65%)] shadow-inner backdrop-blur-[2px]" />

          <div className="absolute inset-0 flex flex-col items-center justify-center leading-none text-rice">
            {isDaytime ? (
              <Sun className="mb-1.5 h-3.5 w-3.5 text-gold/90" strokeWidth={1.35} aria-hidden="true" />
            ) : (
              <Moon className="mb-1.5 h-3.5 w-3.5 text-gold/90" strokeWidth={1.35} aria-hidden="true" />
            )}
            <span className="font-display text-[26px] tracking-[0.08em] sm:text-[30px]">{clock.time}</span>
            <span className="my-1.5 h-px w-6 bg-gradient-to-r from-transparent via-gold/70 to-transparent" aria-hidden="true" />
            <span className="whitespace-nowrap font-mono text-[7px] tracking-[0.16em] text-rice/70 sm:text-[8px]">
              THAILAND <span className="text-gold/85">· {clock.date}</span>
            </span>
          </div>
        </div>
      </div>

      <div className="container-content relative z-10 pb-20 pt-40 sm:pb-28">
        <motion.div animate={{ x: textHidden ? "-130%" : "0%", opacity: textHidden ? 0 : 1 }} transition={slideTransition}>
          <motion.div initial={{ opacity: 0, scaleX: 0.4 }} animate={{ opacity: 1, scaleX: 1 }} transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }} className="w-24 origin-left">
            <TerraceDivider tone="rice" className="opacity-80" />
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }} className="heading-display -mt-2 max-w-3xl text-rice">
            <span className="block text-3xl font-normal text-rice/80 sm:text-4xl lg:text-5xl">Discover</span>
            <span className="block bg-gradient-to-r from-rice via-rice to-gold bg-clip-text text-6xl text-transparent sm:text-7xl lg:text-8xl">{siteConfig.name}</span>
          </motion.h1>
        </motion.div>

        <motion.div animate={{ x: textHidden ? "130%" : "0%", opacity: textHidden ? 0 : 1 }} transition={slideTransition}>
          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }} className="mt-6 max-w-xl text-lg leading-relaxed text-rice/85">{siteConfig.heroSubtitleThai}</motion.p>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.55 }} className="mt-9 flex flex-wrap items-center gap-4">
            <motion.a href="#village" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} transition={{ duration: 0.2 }} className="group inline-flex items-center gap-2.5 border border-rice/40 bg-rice px-7 py-3.5 font-mono text-xs uppercase tracking-[0.2em] text-ink shadow-lg shadow-ink/20 transition-colors hover:border-gold hover:bg-gold">Enter the village<ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={1.75} /></motion.a>
            <motion.a href="#gallery" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} transition={{ duration: 0.2 }} className="group inline-flex items-center gap-2.5 border border-rice/30 px-7 py-3.5 font-mono text-xs uppercase tracking-[0.2em] text-rice backdrop-blur-sm transition-colors hover:border-rice hover:bg-rice/10"><Images className="h-3.5 w-3.5" strokeWidth={1.75} />View gallery</motion.a>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.68 }} className="mt-4">
            <InstallAppButton />
          </motion.div>
        </motion.div>
      </div>

      <button type="button" onClick={() => setTextHidden((value) => !value)} aria-pressed={textHidden} aria-label={textHidden ? "แสดงข้อความ" : "ซ่อนข้อความเพื่อดูวิดีโอเต็มจอ"} className="group absolute bottom-8 left-6 z-10 inline-flex items-center gap-2 rounded-full border border-rice/15 bg-ink/10 px-4 py-2 text-rice/65 backdrop-blur-sm transition-all duration-300 hover:border-rice/40 hover:bg-ink/20 hover:text-rice/85 sm:left-12">
        {textHidden ? <Eye className="h-3.5 w-3.5" strokeWidth={1.5} /> : <EyeOff className="h-3.5 w-3.5" strokeWidth={1.5} />}
        <span className="font-mono text-[10px] uppercase tracking-[0.2em]">{textHidden ? "แสดงข้อความ" : "ซ่อนข้อความ"}</span>
      </button>

      <a href="#village" aria-label="Scroll to next section" className="absolute bottom-8 right-6 z-10 hidden flex-col items-center gap-2 text-rice/70 sm:right-12 sm:flex"><span className="font-mono text-[10px] uppercase tracking-[0.2em] [writing-mode:vertical-rl]">Scroll</span><ChevronDown className="h-4 w-4 animate-scroll-pulse" strokeWidth={1.5} /></a>
    </section>
  );
}
