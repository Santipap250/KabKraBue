"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Play, X } from "lucide-react";
import { videos, type VillageVideo } from "@/data/videos";
import { MediaFrame } from "@/components/MediaFrame";
import { useLockBodyScroll } from "@/hooks/useLockBodyScroll";

function embedSrc(video: VillageVideo): string {
  if (video.provider === "youtube") {
    return `https://www.youtube-nocookie.com/embed/${video.source}?autoplay=1&rel=0`;
  }
  if (video.provider === "vimeo") {
    return `https://player.vimeo.com/video/${video.source}?autoplay=1`;
  }
  return video.source; // mp4 path, handled separately below
}

export function VideoShowcase() {
  const [active, setActive] = useState<VillageVideo | null>(null);
  useLockBodyScroll(active !== null);

  return (
    <div>
      <div className="grid gap-6 sm:grid-cols-2">
        {videos.map((video) => (
          <button
            key={video.id}
            type="button"
            onClick={() => setActive(video)}
            className="group relative block overflow-hidden text-left"
            aria-label={`Play video: ${video.title}`}
          >
            <MediaFrame src={video.thumbnail} alt={video.title} aspect="aspect-video" />
            <div className="absolute inset-0 flex items-center justify-center bg-ink/25 transition-colors group-hover:bg-ink/40">
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-rice/90 text-ink transition-transform group-hover:scale-110">
                <Play className="ml-1 h-6 w-6" fill="currentColor" strokeWidth={0} />
              </span>
            </div>
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/80 to-transparent p-5">
              <h3 className="font-display text-lg text-rice">{video.title}</h3>
            </div>
          </button>
        ))}
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={active.title}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-ink/95 p-4 backdrop-blur sm:p-10"
            onClick={() => setActive(null)}
          >
            <div
              className="relative aspect-video w-full max-w-4xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setActive(null)}
                aria-label="Close video"
                className="absolute -top-12 right-0 flex h-10 w-10 items-center justify-center text-rice/80 hover:text-rice"
              >
                <X strokeWidth={1.5} />
              </button>
              {active.provider === "mp4" ? (
                <video
                  src={embedSrc(active)}
                  controls
                  autoPlay
                  className="h-full w-full bg-black"
                >
                  <track kind="captions" />
                </video>
              ) : (
                <iframe
                  src={embedSrc(active)}
                  title={active.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="h-full w-full"
                />
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
