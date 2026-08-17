import { ArrowUpRight, Play, Youtube } from "lucide-react";

const SHORTS = [
  {
    id: "3R3wIqhAzdQ",
    pageUrl:
      "https://youtube.com/shorts/3R3wIqhAzdQ?si=yZLZLzwHvMCvUsso",
    title: "KabKraBue — Featured Short",
    label: "YouTube Short 01",
  },
  {
    id: "auayNR7ydYM",
    pageUrl: "https://m.youtube.com/shorts/auayNR7ydYM",
    title: "KabKraBue — Featured Short 02",
    label: "YouTube Short 02",
  },
  {
    id: "rTvHhPfmsf8",
    pageUrl: "https://m.youtube.com/shorts/rTvHhPfmsf8",
    title: "KabKraBue — Featured Short 03",
    label: "YouTube Short 03",
  },
];

const SHORT_CHANNEL_URL = "https://m.youtube.com/@obixconfig/shorts";

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

            <h2
              id="featured-short-heading"
              className="heading-display text-4xl text-rice sm:text-5xl lg:text-6xl"
            >
              The Village Diaries
            </h2>

            <p className="mt-2 font-body text-lg text-gold/85 sm:text-xl">
              บันทึกเรื่องราวผ่านเลนส์ที่หมู่บ้านกาบกระบือ
            </p>

            <p className="mt-6 max-w-2xl text-base leading-relaxed text-rice/72 sm:text-lg lg:text-xl">
              ชมบรรยากาศของหมู่บ้านกาบกระบือผ่านวิดีโอสั้น
              แล้วเลื่อนชมบันทึกเรื่องราวจากอีกช่วงเวลาหนึ่งไปเรื่อย ๆ
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href={SHORTS[0].pageUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 bg-rice px-5 py-3.5 font-mono text-[11px] uppercase tracking-[0.18em] text-ink transition-colors hover:bg-gold"
              >
                <Play className="h-4 w-4 fill-current" strokeWidth={1.5} />
                Watch Short
              </a>

              <a
                href={SHORT_CHANNEL_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 border border-rice/20 px-5 py-3.5 font-mono text-[11px] uppercase tracking-[0.18em] text-rice/80 transition-colors hover:border-rice/45 hover:text-rice"
              >
                <Youtube className="h-4 w-4" strokeWidth={1.5} />
                More Shorts
                <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.5} />
              </a>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-[10px] uppercase tracking-[0.16em] text-rice/30">
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
              {SHORTS.map((short) => {
                const embedUrl = `https://www.youtube-nocookie.com/embed/${short.id}?rel=0&modestbranding=1&playsinline=1&autoplay=0`;

                return (
                  <article
                    key={short.id}
                    className="w-[82vw] max-w-[292px] shrink-0 snap-start sm:w-[300px] lg:w-[310px]"
                  >
                    <div className="rounded-[1.8rem] border border-rice/15 bg-rice/[0.035] p-2 shadow-2xl shadow-black/30 backdrop-blur-sm">
                      <div className="overflow-hidden rounded-[1.3rem] bg-black">
                        <div className="relative aspect-[9/16] w-full">
                          <iframe
                            src={embedUrl}
                            title={short.title}
                            loading="lazy"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                            referrerPolicy="strict-origin-when-cross-origin"
                            className="absolute inset-0 h-full w-full"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="mt-3 flex items-center justify-between px-1">
                      <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-rice/30">
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
              })}
            </div>

            <div className="mt-2 flex items-center justify-between gap-4 px-1">
              <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-rice/25">
                Swipe to explore
              </span>

              <span
                className="font-mono text-[9px] uppercase tracking-[0.18em] text-gold/45"
                aria-hidden="true"
              >
                01 / {String(SHORTS.length).padStart(2, "0")}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
