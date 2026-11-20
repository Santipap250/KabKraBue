import manifest from "@/data/responsive-image-manifest.json";
import { basePath, withBasePath } from "@/lib/paths";

type ResponsiveImageCandidate = {
  src: string;
  width: number;
};

type ResponsiveImageEntry = {
  width: number;
  height: number;
  sources: ResponsiveImageCandidate[];
};

const imageManifest = manifest as Record<string, ResponsiveImageEntry>;

export function getResponsiveImageSrcSet(src: string): string | undefined {
  if (!src.startsWith("/")) return undefined;

  const cleanPath = src.split(/[?#]/, 1)[0];
  const manifestPath = basePath && cleanPath.startsWith(`${basePath}/`)
    ? cleanPath.slice(basePath.length)
    : cleanPath;
  const entry = imageManifest[manifestPath];

  if (!entry?.sources?.length) return undefined;

  return entry.sources
    .map((candidate) => `${withBasePath(candidate.src)} ${candidate.width}w`)
    .join(", ");
}
