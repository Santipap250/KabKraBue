"use client";

import { Navigation } from "lucide-react";
import { getDirectionsUrl, getEmbedUrl, villageCoordinates } from "@/lib/map";

export function MapSection() {
  return (
    <div className="relative overflow-hidden border border-border">
      <iframe
        title="Map of KabKraBue village"
        src={getEmbedUrl(villageCoordinates)}
        className="h-[420px] w-full grayscale-[15%] sm:h-[480px]"
        loading="lazy"
      />
      <a
        href={getDirectionsUrl(villageCoordinates)}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute bottom-5 left-5 inline-flex items-center gap-2 bg-ink px-5 py-3 font-mono text-xs uppercase tracking-[0.15em] text-rice transition-colors hover:bg-paddy"
      >
        <Navigation className="h-3.5 w-3.5" strokeWidth={1.5} />
        Get Directions
      </a>
    </div>
  );
}
