# /public/images

ภาพจริงของ KabKraBue ใช้ไฟล์ที่ถูกอ้างอิงจาก `src/data/`

## Current media

| File / folder | Used by |
|---|---|
| `og-cover.jpg` | Open Graph / social sharing preview |
| `culture-01.webp` … `culture-12.webp` | Culture — Village Temple |
| `gallery/*` | Photo Gallery — see `src/data/gallery.ts` |
| `places/*` | Retained image assets for existing visual content |
| `*.webp`, `*.jpg` | Story / Explore imagery as referenced by `src/data/` |

To add a gallery photo, put the optimized asset in `public/images/gallery/` and add
the corresponding entry to `src/data/gallery.ts`.

For large photos used on mobile, prefer optimized WebP/JPEG assets rather than
uploading original camera files.
