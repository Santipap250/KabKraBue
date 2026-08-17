import { ArrowUpRight, Play, Youtube } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";

const SHORT_ID = "3R3wIqhAzdQ";
const SHORT_PAGE_URL =
  "https://youtube.com/shorts/3R3wIqhAzdQ?si=yZLZLzwHvMCvUsso";
const SHORT_CHANNEL_URL = "https://m.youtube.com/@obixconfig/shorts";
const SHORT_EMBED_URL =
  `https://www.youtube-nocookie.com/embed/${SHORT_ID}?rel=0&modestbranding=1&playsinline=1&autoplay=0`;

export function FeaturedShort() {
  return (
    <section
      id="short"
      className="relative overflow-hidden border-t border-border bg-ink text-rice"
      aria-labelledby="short-heading"
    >
      <div className="pointer-events-none absolute inset-0 opacity-60">
        <div className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-paddy/20 blur-3xl" />
        <div className="absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-gold/10 blur-3xl" />
      </div>

      <div className="container-content relative py-16 sm:py-20 lg:py-24">
        <div className="mb-10 flex items-end justify-between gap-6 sm:mb-12">
          <SectionHeading
            index="06"
            eyebrow="Featured Short"
            title="KabKraBue in motion"
            titleThai="กาบกระบือผ่านภาพเคลื่อนไหว"
          />

          <a
            href={SHORT_CHANNEL_URL}
            target="_blank"
            rel="noreferrer"
            className="hidden items-center gap-2 border border-rice/15 px-4 py-2.5 font-mono text-[10px] uppercase tracking-[0.18em] text-rice/70 transition-colors hover:border-gold/60 hover:text-gold sm:inline-flex"
            aria-label="ดู Shorts ทั้งหมดของช่อง Obixconfig"
          >
            <Youtube className="h-4 w-4" strokeWidth={1.5} />
            More Shorts
            <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.5} />
          </a>
        </div>

        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-16">
          <div className="max-w-2xl">
            <p className="text-base leading-relaxed text-rice/72 sm:text-lg lg:text-xl">
              ชมบรรยากาศของหมู่บ้านกาบกระบือผ่านวิดีโอสั้น
              แล้วค่อยออกไปค้นพบภาพ เรื่องราว และวิถีชีวิตอีกมากมายภายในเว็บไซต์
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href={SHORT_PAGE_URL}
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
                className="inline-flex items-center gap-2 border border-rice/20 px-5 py-3.5 font-mono text-[11px] uppercase tracking-[0.18em] text-rice/80 transition-colors hover:border-rice/45 hover:text-rice sm:hidden"
              >
                <Youtube className="h-4 w-4" strokeWidth={1.5} />
                More Shorts
              </a>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-[10px] uppercase tracking-[0.16em] text-rice/30">
              <span>Featured Video</span>
              <span className="h-px w-10 bg-rice/15" aria-hidden="true" />
              <span>Obixconfig · YouTube Shorts</span>
            </div>
          </div>

          <div className="flex justify-center lg:justify-end">
            <div className="w-full max-w-[290px] sm:max-w-[310px]">
              <div className="rounded-[1.8rem] border border-rice/15 bg-rice/[0.035] p-2 shadow-2xl shadow-black/30 backdrop-blur-sm">
                <div className="overflow-hidden rounded-[1.3rem] bg-black">
                  <div className="relative aspect-[9/16] w-full">
                    <iframe
                      src={SHORT_EMBED_URL}
                      title="KabKraBue — Featured YouTube Short"
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
                  YouTube Short
                </span>
                <a
                  href={SHORT_PAGE_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="font-mono text-[9px] uppercase tracking-[0.18em] text-gold/75 transition-colors hover:text-gold"
                >
                  Open →
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
