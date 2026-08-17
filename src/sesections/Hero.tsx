"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { siteConfig } from "@/data/site";
import { MediaFrame } from "@/components/MediaFrame";

export function Hero() {
  return (
    <section id="top" className="relative flex h-[100svh] min-h-[560px] w-full items-end overflow-hidden bg-ink">
      <div className="absolute inset-0">
        <MediaFrame
          src="/images/village-hero.jpg"
          alt="Panoramic view of KabKraBue village at golden hour"
          aspect="aspect-auto h-full"
          className="h-full w-full"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-ink/10" />
        <div className="grain-overlay absolute inset-0" />
      </div>

      <div className="container-content relative z-10 pb-20 pt-40 sm:pb-28">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="eyebrow text-mist"
        >
          {siteConfig.nameThai} · Rice fields &amp; river mist
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="heading-display mt-4 max-w-3xl text-6xl text-rice sm:text-7xl lg:text-8xl"
        >
          {siteConfig.tagline}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-6 max-w-xl text-lg leading-relaxed text-rice/85"
        >
          {siteConfig.shortDescriptionThai}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.55 }}
          className="mt-9 flex flex-wrap items-center gap-4"
        >
          <a
            href="#village"
            className="inline-flex items-center gap-2 border border-rice/40 bg-rice px-7 py-3.5 font-mono text-xs uppercase tracking-[0.2em] text-ink transition-colors hover:bg-gold hover:border-gold"
          >
            Enter the village
          </a>
          <a
            href="#gallery"
            className="inline-flex items-center gap-2 border border-rice/30 px-7 py-3.5 font-mono text-xs uppercase tracking-[0.2em] text-rice transition-colors hover:border-rice"
          >
            View gallery
          </a>
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
