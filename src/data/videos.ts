// Video showcase data. Supports YouTube, Vimeo, or a self-hosted MP4.
// Add a new entry here to add a new video to the Video section — no
// component changes required.

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

export const videos: VillageVideo[] = [
  {
    id: "village-overview",
    title: "KabKraBue, from above",
    description: "[TODO: คำอธิบายวิดีโอ — มุมมองทางอากาศของหมู่บ้าน]",
    provider: "youtube",
    source: "[TODO: YOUTUBE_VIDEO_ID]",
    thumbnail: "/images/video-thumb-01.jpg",
  },
  {
    id: "village-life",
    title: "A day with KabKraBue's farmers",
    description: "[TODO: คำอธิบายวิดีโอ — วิถีชีวิตประจำวัน]",
    provider: "youtube",
    source: "[TODO: YOUTUBE_VIDEO_ID]",
    thumbnail: "/images/video-thumb-02.jpg",
  },
];
