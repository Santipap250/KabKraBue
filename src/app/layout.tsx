import type { Metadata } from "next";
import { siteConfig } from "@/data/site";
import "@/styles/fonts.css";
import "@/styles/globals.css";
import { MotionProvider } from "@/components/MotionProvider";
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
    icon: [
      { url: withBasePath("/favicon/kabkrabue-celestial.svg"), type: "image/svg+xml" },
      { url: withBasePath("/icons/icon-192.png"), type: "image/png", sizes: "192x192" },
    ],
    apple: [{ url: withBasePath("/icons/icon-180.png"), type: "image/png", sizes: "180x180" }],
  },
  manifest: withBasePath("/manifest.webmanifest"),
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="th">
      <head />
      <body>
        <PwaBootstrap />
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
