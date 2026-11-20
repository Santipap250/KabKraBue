"use client";

import Image from "next/image";
import type { SyntheticEvent } from "react";
import { withBasePath } from "@/lib/paths";
import { getResponsiveImageSrcSet } from "@/lib/responsive-images";

interface ResponsiveImageProps {
  src: string;
  alt: string;
  altLang?: "th" | "en";
  sizes: string;
  className?: string;
  priority?: boolean;
  onError?: (event: SyntheticEvent<HTMLImageElement>) => void;
}

export function ResponsiveImage({
  src,
  alt,
  altLang = "th",
  sizes,
  className,
  priority = false,
  onError,
}: ResponsiveImageProps) {
  const srcSet = getResponsiveImageSrcSet(src);

  return (
    <picture className="absolute inset-0 block">
      {srcSet && <source media="(max-width: 767px)" type="image/webp" srcSet={srcSet} sizes={sizes} />}
      <Image
        src={withBasePath(src)}
        alt={alt}
        lang={altLang}
        fill
        priority={priority}
        unoptimized
        sizes={sizes}
        onError={onError}
        className={className}
      />
    </picture>
  );
}
