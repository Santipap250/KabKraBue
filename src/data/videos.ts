// Optional video showcase data.
//
// This section stays empty until real published video sources and thumbnails
// are available. Placeholder entries are intentionally not kept in the
// production data so the UI never exposes TODO content or broken assets.

export interface VillageVideo {
  id: string;
  title: string;
  description: string;
  provider: "youtube" | "vimeo" | "mp4";
  // For youtube/vimeo: the video ID only (not the full URL).
  // For mp4: the path under /public/videos/.
  source: string;
  thumbnail: string; // path under /public
}

export const videos: VillageVideo[] = [];
