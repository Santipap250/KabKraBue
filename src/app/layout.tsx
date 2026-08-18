import type { Metadata } from "next";
import { siteConfig } from "@/data/site";
import "@/styles/globals.css";
import { PwaBootstrap } from "@/components/PwaBootstrap";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — ${siteConfig.tagline}`,
    template: `%s — ${siteConfig.name}`,
  },
  description: siteConfig.shortDescription,
  keywords: ["KabKraBue", "หมู่บ้าน", "ท่องเที่ยวชุมชน", "village tourism", "Thailand village"],
  authors: [{ name: siteConfig.name }],
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.shortDescription,
    images: [{ url: "/images/og-cover.jpg", width: 1200, height: 630, alt: siteConfig.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.shortDescription,
    images: ["/images/og-cover.jpg"],
  },
  icons: {
    icon: "/favicon/favicon.svg",
    apple: "/favicon/apple-touch-icon.png",
  },
  manifest: "/manifest.webmanifest",
  alternates: {
    canonical: siteConfig.url,
  },
  appleWebApp: {
    capable: true,
    title: "KabKraBue",
    statusBarStyle: "black-translucent",
  },
};

export const viewport = {
  themeColor: siteConfig.themeColor,
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "TouristDestination",
  name: siteConfig.name,
  alternateName: siteConfig.nameThai,
  description: siteConfig.shortDescription,
  url: siteConfig.url,
  address: {
    "@type": "PostalAddress",
    addressLocality: "ตำบลโคกสะอาด",
    addressRegion: "จังหวัดสุรินทร์",
    postalCode: "32140",
    addressCountry: "TH",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 14.52646,
    longitude: 103.36005,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="th">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font -- intentional: site-wide fonts loaded once in the root layout, not per-page */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300..700&family=IBM+Plex+Sans+Thai:wght@300;400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap"
        />
      </head>
      <body>
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <PwaBootstrap />
        {children}
      </body>
    </html>
  );
}
