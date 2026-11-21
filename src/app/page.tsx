import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ScrollToTop } from "@/components/ScrollToTop";
import { TerraceDivider } from "@/components/TerraceDivider";
import { SectionHeading } from "@/components/SectionHeading";
import { ImageGallery } from "@/components/ImageGallery";
import { VideoShowcase } from "@/components/VideoShowcase";
import { MapSection } from "@/components/MapSection";
import { ExploreShowcase } from "@/components/ExploreShowcase";
import { Hero } from "@/sections/Hero";
import { FeaturedShort } from "@/components/FeaturedShort";
import { StorySection } from "@/sections/StorySection";
import { storySections } from "@/data/village";
import { videos } from "@/data/videos";
import { siteConfig } from "@/data/site";
import { hasContent } from "@/lib/content";

export const metadata: Metadata = {
  alternates: {
    canonical: siteConfig.url,
  },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.shortDescription,
    images: [{
      url: siteConfig.socialPreviewImage.path,
      width: siteConfig.socialPreviewImage.width,
      height: siteConfig.socialPreviewImage.height,
      alt: siteConfig.socialPreviewImage.alt,
      type: "image/jpeg",
    }],
  },
};

const placeJsonLd = {
  "@context": "https://schema.org",
  "@type": "Place",
  name: siteConfig.name,
  alternateName: siteConfig.nameThai,
  description: siteConfig.shortDescription,
  url: siteConfig.url,
  geo: {
    "@type": "GeoCoordinates",
    latitude: 14.52646,
    longitude: 103.36005,
  },
};

const hasPlayableVideos = videos.some((video) => hasContent(video.source));

export default function HomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(placeJsonLd) }} />
      <Header />
      <main id="main">
        <Hero />

        <FeaturedShort />

        {storySections.map((section, i) => (
          <StorySection key={section.id} data={section} reverse={i % 2 === 1} />
        ))}

        <section id="gallery" className="border-t border-border bg-rice">
          <div className="container-content py-20 sm:py-28">
            <SectionHeading index="07" eyebrow="Gallery" title="Every corner of KabKraBue" titleThai="ทุกมุมของหมู่บ้านกาบกระบือ" />
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

        <section id="explore" className="border-t border-border bg-rice">
          <div className="container-content py-20 sm:py-28">
            <div className="max-w-3xl">
              <SectionHeading
                index="09"
                eyebrow="Explore KabKraBue"
                title="Scenes from a living village"
                titleThai="ภาพ บรรยากาศ และช่วงเวลาจากกาบกระบือ"
              />
            </div>
            <div className="mt-12">
              <ExploreShowcase />
            </div>
          </div>
        </section>

        <section id="visit" aria-label="Map" lang="en" className="border-t border-border bg-mist/40">
          <div className="container-content py-20 sm:py-28">
            <SectionHeading index="10" indexClassName="text-paddy" eyebrow="Find Us" title="On the map" titleThai="ตำแหน่งที่ตั้งหมู่บ้าน" />
            <div className="mt-12">
              <MapSection />
            </div>
            {hasContent(siteConfig.contact.address) && (
              <p lang="th" className="mt-6 max-w-lg text-sm leading-relaxed text-ink/70">
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
