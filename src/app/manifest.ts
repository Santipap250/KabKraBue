import type { MetadataRoute } from "next";
import { siteConfig } from "@/data/site";
import { withBasePath } from "@/lib/paths";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  const appRoot = withBasePath("/");
  return {
    id: appRoot,
    name: `${siteConfig.name} — ${siteConfig.nameThai}`,
    short_name: siteConfig.name,
    description: siteConfig.shortDescriptionThai,
    start_url: appRoot,
    scope: appRoot,
    display: "standalone",
    display_override: ["window-controls-overlay", "standalone"],
    background_color: "#F5F1E2",
    theme_color: siteConfig.themeColor,
    orientation: "portrait-primary",
    lang: "th",
    dir: "ltr",
    icons: [
      {
        src: withBasePath("/brand/kabkrabue-app-icon.svg"),
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
      {
        src: withBasePath("/icons/icon-180.png"),
        sizes: "180x180",
        type: "image/png",
        purpose: "any",
      },
      {
        src: withBasePath("/icons/icon-192.png"),
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: withBasePath("/icons/icon-512.png"),
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: withBasePath("/icons/icon-192-maskable.png"),
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: withBasePath("/icons/icon-512-maskable.png"),
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
