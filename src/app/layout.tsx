import type { Metadata } from "next";
import { siteConfig } from "@/data/site";
import "@/styles/fonts.css";
import "@/styles/globals.css";
import { PwaBootstrap } from "@/components/PwaBootstrap";
import { withBasePath } from "@/lib/paths";

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
    icon: withBasePath("/favicon/favicon.svg"),
    apple: withBasePath("/favicon/apple-touch-icon.png"),
  },
  manifest: withBasePath("/manifest.webmanifest"),
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="th">
      <head />
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <PwaBootstrap />
        {children}
      </body>
    </html>
  );
}
