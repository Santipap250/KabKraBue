import { SectionHeading } from "@/components/SectionHeading";

const SHORT_ID = "3R3wIqhAzdQ";
const SHORT_EMBED_URL =
  `https://www.youtube-nocookie.com/embed/${SHORT_ID}?rel=0&modestbranding=1&playsinline=1`;

export function FeaturedShort() {
  return (
    <section
      id="short"
      className="overflow-hidden border-t border-border bg-ink text-rice"
      aria-labelledby="short-heading"
    >
      <div className="container-content py-20 sm:py-28">
        <div className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <div className="max-w-xl">
            <SectionHeading
              index="06"
              eyebrow="Featured Short"
              title="KabKraBue in motion"
              titleThai="กาบกระบือในเวลาไม่ถึงหนึ่งนาที"
            />
            <p className="mt-6 max-w-lg text-base leading-relaxed text-rice/70 sm:text-lg">
              มองหมู่บ้านกาบกระบือผ่านวิดีโอสั้นที่เก็บบรรยากาศของสถานที่ไว้ในเวลาเพียงไม่กี่วินาที
            </p>
            <a
              href="https://m.youtube.com/shorts/3R3wIqhAzdQ"
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-flex items-center border border-rice/25 px-6 py-3.5 font-mono text-xs uppercase tracking-[0.2em] text-rice transition-colors hover:border-gold hover:text-gold"
            >
              Watch on YouTube
            </a>
          </div>

          <div className="mx-auto w-full max-w-[420px]">
            <div className="relative overflow-hidden rounded-[2rem] border border-rice/15 bg-black/20 p-2 shadow-2xl shadow-black/20">
              <div className="relative aspect-[9/16] overflow-hidden rounded-[1.5rem] bg-black">
                <iframe
                  src={SHORT_EMBED_URL}
                  title="KabKraBue — YouTube Short"
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  referrerPolicy="strict-origin-when-cross-origin"
                  className="absolute inset-0 h-full w-full"
                />
              </div>
            </div>
            <p className="mt-4 text-center font-mono text-[10px] uppercase tracking-[0.2em] text-rice/35">
              YouTube Short · KabKraBue
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
