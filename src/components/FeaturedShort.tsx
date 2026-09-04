"use client";

import Image from "next/image";
import { ArrowUpRight, Play, Youtube, Music2 } from "lucide-react";
import { useState } from "react";
import {
  shorts as SHORTS,
  SHORT_CHANNEL_URL,
  TIKTOK_PROFILE_URL,
  type FeaturedShortItem,
} from "@/data/shorts";

function LazyShortCard({
  short,
}: {
  short: FeaturedShortItem;
}) {
  const [loaded, setLoaded] = useState(false);

  const thumbnailUrl = `https://i.ytimg.com/vi/${short.id}/hqdefault.jpg`;
  const embedUrl = `https://www.youtube-nocookie.com/embed/${short.id}?rel=0&modestbranding=1&playsinline=1`;

  return (
    <article className="w-[82vw] max-w-[292px] shrink-0 snap-start sm:w-[300px] lg:w-[310px]">
      <div className="rounded-[1.8rem] border border-rice/15 bg-rice/[0.035] p-2 shadow-2xl shadow-black/30 backdrop-blur-sm">
        <div className="overflow-hidden rounded-[1.3rem] bg-black">
          <div className="relative aspect-[9/16] w-full">
            {loaded ? (
              <iframe
                src={embedUrl}
                title={short.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                referrerPolicy="strict-origin-when-cross-origin"
                className="absolute inset-0 h-full w-full"
              />
            ) : (
              <button
                type="button"
                onClick={() => setLoaded(true)}
                className="group/short relative block h-full w-full overflow-hidden text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-inset"
                aria-label={`เล่น ${short.title}`}
              >
                <Image
                  src={thumbnailUrl}
                  alt=""
                  fill
                  unoptimized
                  loading="lazy"
                  sizes="(min-width: 1024px) 310px, (min-width: 640px) 300px, 82vw"
                  className="object-cover transition-transform duration-500 group-hover/short:scale-[1.025]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-black/20" />
                <span
                  aria-hidden="true"
                  className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-rice/35 bg-ink/55 text-rice shadow-2xl backdrop-blur-md transition-transform duration-300 group-hover/short:scale-105"
                >
                  <Play className="ml-0.5 h-6 w-6 fill-current" strokeWidth={1.4} />
                </span>
                <span className="absolute bottom-4 left-4 right-4 font-mono text-[9px] uppercase tracking-[0.18em] text-rice/70">
                  Tap to watch with sound
                </span>
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between px-1">
        <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-rice/45">
          {short.label}
        </span>

        <a
          href={short.pageUrl}
          target="_blank"
          rel="noreferrer"
          className="font-mono text-[9px] uppercase tracking-[0.18em] text-gold/75 transition-colors hover:text-gold"
        >
          Open →
        </a>
      </div>
    </article>
  );
}

export function FeaturedShort() {
  return (
    <section
      id="short"
      className="relative overflow-hidden border-t border-border bg-ink text-rice"
      aria-labelledby="featured-short-heading"
    >
      <div className="pointer-events-none absolute inset-0 opacity-60">
        <div className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-paddy/20 blur-3xl" />
        <div className="absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-gold/10 blur-3xl" />
      </div>

      <div className="container-content relative py-16 sm:py-20 lg:py-24">
        <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-16">
          <div className="max-w-2xl">
            <div className="mb-5 h-px w-14 bg-gold/70" aria-hidden="true" />

            <h2 id="featured-short-heading" className="heading-display text-4xl text-rice sm:text-5xl lg:text-6xl">
              The Village Diaries
            </h2>

            <p className="mt-2 font-body text-lg text-gold/85 sm:text-xl">บันทึกเรื่องราวผ่านเลนส์</p>

            <p className="mt-6 max-w-2xl text-base leading-relaxed text-rice/72 sm:text-lg lg:text-xl">
              ชมบรรยากาศของหมู่บ้านกาบกระบือผ่านวิดีโอสั้น
              แล้วเลื่อนชมบันทึกเรื่องราวจากอีกช่วงเวลาหนึ่งไปเรื่อย ๆ
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href={TIKTOK_PROFILE_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="เปิดโปรไฟล์ TikTok ของ TuizFPV"
                className="inline-flex items-center gap-2 bg-rice px-5 py-3.5 font-mono text-[11px] uppercase tracking-[0.18em] text-ink transition-colors hover:bg-gold"
              >
                <Music2 className="h-4 w-4" strokeWidth={1.6} />
                TikTok
              </a>

              <a
                href={SHORT_CHANNEL_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 border border-rice/20 px-5 py-3.5 font-mono text-[11px] uppercase tracking-[0.18em] text-rice/80 transition-colors hover:border-rice/45 hover:text-rice"
              >
                <Youtube className="h-4 w-4" strokeWidth={1.5} />
                YouTube Shorts
                <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.5} />
              </a>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-[10px] uppercase tracking-[0.16em] text-rice/45">
              <span>Featured Video</span>
              <span className="h-px w-10 bg-rice/15" aria-hidden="true" />
              <span>Obixconfig · YouTube Shorts</span>
            </div>
          </div>

          <div className="min-w-0">
            <div
              className="flex snap-x snap-mandatory gap-5 overflow-x-auto overscroll-x-contain pb-4 pr-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:gap-6"
              aria-label="Featured YouTube Shorts"
            >
              {SHORTS.map((short) => (
                <LazyShortCard key={short.id} short={short} />
              ))}
            </div>

            <div className="mt-2 flex items-center justify-between gap-4 px-1">
              <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-rice/40">
                Swipe to explore · Tap to play
              </span>

              <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-gold/45" aria-hidden="true">
                01 / {String(SHORTS.length).padStart(2, "0")}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
