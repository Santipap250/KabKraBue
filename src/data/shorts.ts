// Featured YouTube Shorts shown in "The Village Diaries" section.
// Add a new short by adding one entry here — no component changes needed.

export interface FeaturedShortItem {
  id: string; // YouTube video ID only (not the full URL)
  pageUrl: string;
  title: string;
  label: string;
}

export const SHORT_CHANNEL_URL = "https://m.youtube.com/@obixconfig/shorts";
export const TIKTOK_PROFILE_URL = "https://www.tiktok.com/@tuizfpv";

export const shorts: FeaturedShortItem[] = [
  {
    id: "3R3wIqhAzdQ",
    pageUrl: "https://youtube.com/shorts/3R3wIqhAzdQ?si=yZLZLzwHvMCvUsso",
    title: "KabKraBue — Featured Short",
    label: "YouTube Short 01",
  },
  {
    id: "auayNR7ydYM",
    pageUrl: "https://m.youtube.com/shorts/auayNR7ydYM",
    title: "KabKraBue — Featured Short 02",
    label: "YouTube Short 02",
  },
  {
    id: "3sRrtgoNurE",
    pageUrl: "https://www.youtube.com/shorts/3sRrtgoNurE",
    title: "KabKraBue — Featured Short 03",
    label: "YouTube Short 03",
  },
];
