# KabKraBue

เว็บไซต์เล่าเรื่องหมู่บ้านกาบกระบือ ตำบลโคกสะอาด อำเภอปราสาท จังหวัดสุรินทร์
ผ่านภาพถ่าย วิดีโอ เรื่องราว และบรรยากาศของชุมชน

## Current release

- Next.js App Router + static export
- Mobile-first presentation
- PWA install support
- Lazy-loaded video playback
- Editorial Explore showcase
- Culture / Village Temple story set with 16 optimized WebP images
- Privacy, robots.txt, and sitemap.xml

## Development

```bash
npm install
npm run lint
npm run build
```

## Content

Content lives under `src/data/` and real media assets live under `public/images/` and
`public/videos/`. Culture story images are stored as `culture-01.webp` through
`culture-16.webp`; the browseable photo gallery additionally uses entries in
`src/data/gallery.ts`. The optional video showcase stays empty until real published
sources and thumbnails are available, so placeholder content is never exposed in production.

## Repository

https://github.com/Santipap250/KabKraBue
