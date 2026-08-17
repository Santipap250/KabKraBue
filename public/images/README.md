# /public/images

Drop real photography here using the filenames already referenced in
`src/data/`. Until a file exists, the site shows an on-brand placeholder
instead of a broken image — nothing will look broken while photos are
missing.

| File | Used by | Suggested size |
|---|---|---|
| `village-hero.jpg` | Hero section background | ≥ 2400×1600, landscape |
| `village-story-01.jpg` | "Our Story" section | 1600×2000 |
| `people-01.jpg` | "People" section | 1600×2000 |
| `nature-01.jpg` | "Nature" section | 1600×2000 |
| `culture-01.jpg` | "Culture" section | 1600×2000 |
| `lifestyle-01.jpg` | "Lifestyle" section | 1600×2000 |
| `og-cover.jpg` | Open Graph / social sharing preview | exactly 1200×630 |
| `gallery/*.jpg` | Photo Gallery — see `src/data/gallery.ts` | any, 4:5 or 16:9 |
| `places/*.jpg` | Explore Places — see `src/data/places.ts` | 4:3 |
| `video-thumb-*.jpg` | Video Showcase thumbnails | 16:9 |

To add a new gallery photo: put the file in `gallery/` and add one entry
to `src/data/gallery.ts`. No component needs to change.
