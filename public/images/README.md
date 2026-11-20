# /public/images

ภาพจริงของ KabKraBue ใช้ไฟล์ที่ถูกอ้างอิงจาก `src/data/`

## Current media

| File / folder | Used by |
|---|---|
| `og-cover.jpg` | Open Graph / social sharing preview |
| `kabkrabue-logo.webp` | Header, mobile menu, and footer brand lockup |
| `culture-01.webp` … `culture-16.webp` | Culture — Village Temple story set + selected Gallery culture collection |
| `gallery/*` | Photo Gallery — see `src/data/gallery.ts` |
| `places/*` | Retained image assets for existing visual content |
| `*.webp`, `*.jpg` | Story / Explore imagery as referenced by `src/data/` |

Gallery assets can live in `public/images/gallery/` or directly in `public/images/` when an image is
shared with other sections. In both cases, add the corresponding entry to `src/data/gallery.ts`.

For large photos used on mobile, prefer optimized WebP/JPEG assets rather than
uploading original camera files.

## Responsive WebP candidates

`public/images/responsive/` contains generated WebP candidates for phone viewports; it is not a replacement for the original files. The manifest at `src/data/responsive-image-manifest.json` maps original paths to non-upscaled candidates targeting 480px/768px, or native width when a source is smaller. `ResponsiveImage` selects those candidates only up to 767 CSS pixels; tablets and desktop retain the original full-resolution source. The Hero poster follows the same mobile-only WebP policy and uses its full-resolution desktop poster at wider sizes. The Open Graph cover is intentionally excluded and remains the original social-preview asset.

Regenerate candidates after adding, replacing, or removing an image:

```bash
python3 -m pip install -r scripts/requirements-images.txt
npm run images:generate
npm run build
npm run verify:export
```

The generator uses Pillow as an optional development tool, preserves aspect ratio and ICC profiles, does not crop or upscale, leaves source images untouched, and removes only obsolete files within `public/images/responsive/`. Commit the generated candidates and manifest together with the source/content change. Before merge, also run the `GITHUB_PAGES=true` build and export verifier; the same URLs must work below `/KabKraBue/`.
