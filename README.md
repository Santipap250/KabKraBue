# KabKraBue

เว็บไซต์เล่าเรื่องหมู่บ้านกาบกระบือ ตำบลโคกสะอาด อำเภอปราสาท จังหวัดสุรินทร์ ผ่านภาพถ่าย วิดีโอ เรื่องราว และบรรยากาศของชุมชน เว็บไซต์ไทย/อังกฤษแนว **Quiet Luxury × Cinematic Editorial × Thai Village Heritage** สร้างด้วย Next.js App Router, React, TypeScript, Tailwind CSS และ Framer Motion

โปรเจกต์ใช้ **static export** ไม่ต้องพึ่ง Next.js server runtime และตั้งใจคงการ deploy บน Vercel พร้อมรองรับ GitHub Pages base path ที่ผ่านการทดสอบในรอบนี้

## โครงสร้าง

- `src/app/` — หน้า Home/Privacy, metadata, manifest, sitemap และ robots
- `src/components/` — navigation, Shorts, gallery/lightbox, media, PWA, map, footer และ UI
- `src/sections/` — Hero และ editorial story sections
- `src/data/` — site config และเนื้อหา village, gallery, explore, shorts, videos และ events
- `src/hooks/`, `src/lib/` — browser interaction hooks และ shared utilities
- `src/styles/`, `tailwind.config.ts` — design tokens, typography และ global styles
- `public/images/`, `public/videos/`, `public/icons/`, `public/sw.js` — static media, icons และ service worker
- `docs/` — audit/QA report และ Before/After screenshots

## เริ่มต้นและตรวจสอบ

```bash
npm ci
npm run dev
```

ตรวจ source และสร้าง production export:

```bash
npm run lint
npx tsc --noEmit
npm run build
```

ไฟล์ static จะอยู่ใน `out/`. สำหรับดู export ในเครื่องให้ใช้ static server เช่น `npx --yes serve out` แทน `next start` ซึ่งไม่ใช่คำสั่ง deploy สำหรับ static export

## Deploy

- **Vercel (root):** ใช้ `npm run build`; อย่าตั้ง `GITHUB_PAGES` สำหรับโดเมนที่เสิร์ฟจาก root
- **GitHub Pages:** ใช้ `GITHUB_PAGES=true npm run build` เพื่อสร้าง path ใต้ `/KabKraBue/`
- **Subpath อื่น:** ใช้ `NEXT_PUBLIC_BASE_PATH=/your-path npm run build`

`src/lib/paths.ts`, metadata/manifest, public asset paths และ service-worker scope ใช้ค่า base path ร่วมกัน ก่อน publish ที่ subpath ใหม่ ให้ตรวจ `out/` และเปิด export ผ่าน static server ที่ mount ใต้ path นั้น

## จัดการเนื้อหาและสื่อ

- ข้อความเว็บและ contact/site settings อยู่ใน `src/data/site.ts`; story sections อยู่ใน `src/data/village.ts`
- Gallery images/captions/categories อยู่ใน `src/data/gallery.ts`; Explore cards/anchors อยู่ใน `src/data/explore.ts`
- Shorts IDs, thumbnails และ CTA อยู่ใน `src/data/shorts.ts`; ห้ามเปลี่ยน ID หากไม่มีเหตุผลและการยืนยัน
- Optional video showcase อยู่ใน `src/data/videos.ts`; ปัจจุบันว่างโดยตั้งใจ จึงไม่แสดง section และห้ามใส่ placeholder

### เพิ่มภาพ

เก็บไฟล์ไว้ใน `public/images/` หรือโฟลเดอร์ย่อยที่เหมาะสม ใช้ภาพขนาดพอดีกับตำแหน่ง, WebP/JPEG ตามความเหมาะสม, ระบุ alt ที่บอกเนื้อหาจริง และเพิ่ม caption/category ใน data layer ที่เกี่ยวข้อง ตรวจ path และ preview ทั้ง desktop/mobile ก่อน commit

### เพิ่มวิดีโอ

เก็บต้นฉบับไว้ใน `public/videos/` เสมอ; หากสร้างไฟล์ optimized ให้แยกโฟลเดอร์/ชื่อไฟล์และตรวจภาพ/เสียงด้วย `ffprobe` ก่อนเปลี่ยน data reference. Story video IDs อยู่ใน `src/data/village.ts` พร้อม poster/fallback; วิดีโอ showcase ต้องมี source และ thumbnail ที่เป็นจริงก่อนเพิ่มข้อมูลใน `src/data/videos.ts`. อย่า cache วิดีโอใน service worker

เนื้อหาประวัติศาสตร์ วัฒนธรรม พิกัด และข้อเท็จจริงชุมชนต้องมีหลักฐานรองรับ ห้ามแต่งข้อมูลเพิ่ม

## PWA และ third-party content

- Manifest สร้างแบบ static ที่ `src/app/manifest.ts`; service worker อยู่ใน `public/sw.js`
- Worker ใช้ cache namespace `kabkrabue-*`, ลบเฉพาะ cache ของตัวเอง, จำกัด path scope และไม่ intercept/cache วิดีโอ
- ปรับ shell/cache behavior แล้วให้เพิ่มค่า `CACHE` ใน `public/sw.js`
- Shorts เป็น thumbnail-first; YouTube iframe ถูกสร้างหลังผู้ใช้กดเล่นเท่านั้น
- Privacy page อธิบาย YouTube thumbnail/player, OpenStreetMap, external links และ PWA cache; อัปเดตเมื่อเพิ่มบริการ third-party

## Design system

Tokens/typography อยู่ใน `tailwind.config.ts` และ `src/styles/globals.css`: rice, ink, paddy, clay, gold และ mist; Fraunces สำหรับ display, IBM Plex Sans Thai สำหรับเนื้อหา และ IBM Plex Mono สำหรับ metadata. Terrace divider/grain เป็น motif หลัก ใช้สีทองเป็น accent อย่างจำกัด รักษาความอ่านง่ายและ `prefers-reduced-motion` เมื่อเพิ่ม interaction

## Quality checks / ข้อควรทราบ

ก่อน merge/deploy ให้รัน `npm ci`, `npm run lint`, `npx tsc --noEmit`, `npm run build` และ `npm audit`; ทดสอบ `/`, `/privacy/`, custom `404.html`, basePath, media, gallery/lightbox, navigation, PWA/offline และ mobile widths. ดูผลจริงและ residual npm audit findings ใน [`docs/PROJECT_AUDIT.md`](docs/PROJECT_AUDIT.md); ดูภาพ Before/After ใน [`docs/SCREENSHOTS.md`](docs/SCREENSHOTS.md).

`npm audit` รอบส่งมอบรายงาน 6 moderate findings ใน ESLint/TypeScript-ESLint dependency tree, ไม่มี high/critical; รายละเอียดและข้อจำกัดการอัปเดตอยู่ใน audit report. อย่าอ้างว่า audit เป็นศูนย์จนกว่าจะตรวจผลใหม่หลังอัปเดต dependency

## Repository

https://github.com/Santipap250/KabKraBue
