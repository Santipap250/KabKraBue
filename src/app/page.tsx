import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ScrollToTop } from "@/components/ScrollToTop";
import { TerraceDivider } from "@/components/TerraceDivider";
import { SectionHeading } from "@/components/SectionHeading";
import { ImageGallery } from "@/components/ImageGallery";
import { VideoShowcase } from "@/components/VideoShowcase";
import { PlaceGrid } from "@/components/PlaceGrid";
import { MapSection } from "@/components/MapSection";
import { Hero } from "@/sections/Hero";
import { FeaturedShort } from "@/components/FeaturedShort";
import { StorySection } from "@/sections/StorySection";
import { storySections } from "@/data/village";
import { videos } from "@/data/videos";
import { siteConfig } from "@/data/site";
import { hasContent } from "@/lib/content";

const hasPlayableVideos = videos.some((video) => hasContent(video.source));

export default function HomePage() {
  return (
    <>
      <Header />
      <main id="main">
        <Hero />

        <FeaturedShort />

        {storySections.map((section, i) => (
          <StorySection key={section.id} data={section} reverse={i % 2 === 1} />
        ))}

        <section id="gallery" className="border-t border-border bg-rice">
          <div className="container-content py-20 sm:py-28">
            <SectionHeading index="07" eyebrow="Gallery" title="Every corner of KabKraBue" titleThai="ทุกมุมของกับกระบือ" />
            <div className="mt-12">
              <ImageGallery />
            </div>
          </div>
        </section>

        {hasPlayableVideos && (
          <>
            <TerraceDivider className="opacity-70" />

            <section id="video" className="border-t border-border bg-mist/40">
              <div className="container-content py-20 sm:py-28">
                <SectionHeading index="08" eyebrow="Video" title="See it in motion" titleThai="ภาพเคลื่อนไหวของหมู่บ้าน" />
                <div className="mt-12">
                  <VideoShowcase />
                </div>
              </div>
            </section>
          </>
        )}

        <TerraceDivider className="opacity-70" />

        <section id="explore" className="border-t border-border">
          <div className="container-content py-20 sm:py-28">
            <SectionHeading index="09" eyebrow="Explore" title="Places worth wandering to" titleThai="สถานที่ที่ควรค่าแก่การไปเยือน" />
            <div className="mt-12">
              <PlaceGrid />
            </div>
          </div>
        </section>

        <section aria-label="Map" className="border-t border-border bg-mist/40">
          <div className="container-content py-20 sm:py-28">
            <SectionHeading index="10" eyebrow="Find Us" title="On the map" titleThai="ตำแหน่งที่ตั้งหมู่บ้าน" />
            <div className="mt-12">
              <MapSection />
            </div>
            {hasContent(siteConfig.contact.address) && (
              <p className="mt-6 max-w-lg text-sm leading-relaxed text-ink/60">
                {siteConfig.contact.address}
              </p>
            )}
          </div>
        </section>
      </main>
      <Footer />
      <ScrollToTop />
    </>
  );
}
