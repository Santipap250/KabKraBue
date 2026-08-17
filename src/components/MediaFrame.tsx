"use client";

import { useState } from "react";
import { ImageOff } from "lucide-react";
import { cn } from "@/lib/cn";

interface MediaFrameProps {
  src: string;
  alt: string;
  aspect?: string; // Tailwind aspect-ratio class, e.g. "aspect-[4/5]"
  className?: string;
  priority?: boolean;
  sizes?: string;
}

/**
 * Renders a photo from /public. Until real photography is added, the
 * file will 404 and this component falls back to a deliberate,
 * on-brand placeholder (gradient + filename) instead of a broken-image
 * icon — see data files for where each filename is expected to live.
 */
export function MediaFrame({
  src,
  alt,
  aspect = "aspect-[4/5]",
  className,
  priority = false,
  sizes = "(min-width: 1024px) 50vw, 100vw",
}: MediaFrameProps) {
  const [failed, setFailed] = useState(false);

  return (
    <div className={cn("relative overflow-hidden bg-mist", aspect, className)}>
      {!failed ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={alt}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          sizes={sizes}
          onError={() => setFailed(true)}
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
      ) : (
        <div
          className="flex h-full w-full flex-col items-center justify-center gap-3 bg-gradient-to-br from-paddy/25 via-mist to-clay/20 p-6 text-center"
          role="img"
          aria-label={alt}
        >
          <ImageOff className="h-6 w-6 text-paddy/50" strokeWidth={1.5} aria-hidden="true" />
          <span className="font-mono text-[11px] uppercase tracking-wide text-ink/40">
            {src.split("/").pop()}
          </span>
        </div>
      )}
    </div>
  );
}
