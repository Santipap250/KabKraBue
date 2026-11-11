# KabKraBue — Audit and Remediation Report

## Scope and baseline

ตรวจ repository `Santipap250/KabKraBue` จาก baseline `main` SHA `5a7c5058d7535327585f5420d9000a35bee05418` ก่อนแก้ไข บน branch `manus/kabkrabue-premium-upgrade`. Implementation ถูก merge เข้า `main` เป็น `43eb9bc1f5ffe32fc4822ad976f7254aefa3f2af` ผ่าน PR #1; Vercel รายงาน Production deployment สำเร็จ. ดังนั้นข้อความเก่าที่ว่า main/production ยังไม่เปลี่ยนไม่เป็นปัจจุบันแล้ว.

ตรวจ architecture/routes/components/sections/hooks/data/styles/config/dependencies/assets/PWA/SEO/accessibility/performance/security/responsive behavior และ static export. รายงาน audit รอบต้นครอบคลุม 38 source files. ไม่พบ P0; ไม่พบ broken local image/video path ที่ใช้งานอยู่ใน source inventory.

## สิ่งที่ปรับปรุง

- **Framework/security:** อัปเดต Next.js และ `eslint-config-next` เป็น `15.5.29` ซึ่งเป็น patched 15.x line ที่ระบุจาก official advisory โดยไม่ทำ major upgrade; pin PostCSS `8.5.28` และใช้ npm override ให้ lockfile ไม่ย้อนกลับไปใช้ PostCSS patch เก่า.
- **Hydration/time:** Hero ใช้ placeholder แบบ SSR-safe แล้วเริ่มเวลา real Thailand หลัง mount ด้วย `Intl`/`Asia/Bangkok`, อัปเดตนาทีละครั้ง. Copyright year ใช้ build-time constant.
- **Hero/design:** เพิ่มภาพ desktop poster แบบ landscape (`viewpoint-01.jpg`) และคง portrait poster เดิมบนมือถือ; ใช้ source ที่ตอบกับ viewport และ basePath. คง palette/typography เดิมและสีทองแบบ accent.
- **Story/media:** Hero เลือก WebM ก่อน MP4; Story video `preload="none"`, เริ่มเมื่อใกล้ viewport, pause เมื่อออก และประสานให้มี story clip เล่นพร้อมกันได้เพียงหนึ่งคลิป. วิดีโอต้นฉบับคงไว้; `nature-section.mp4` มี optimized H.264 720×306 สำเนา 4,416,202 bytes จากต้นฉบับ 11,129,273 bytes (ลด ~60.3%); ไม่มี audio ในสำเนาเพราะ player mute โดยค่าเริ่มต้น. เทียบ sample frames ก่อนใช้.
- **Shorts:** thumbnail-first; YouTube iframe ไม่ถูกสร้างใน initial load และถูกเพิ่มหลังผู้ใช้กดเล่น.
- **BasePath/PWA:** เพิ่ม `withBasePath`, normalize `NEXT_PUBLIC_BASE_PATH`, รองรับ static manifest route, metadata/icons/media/service-worker paths. Worker ใช้ namespace `kabkrabue-*`, ลบเฉพาะ cache ของตัวเอง, จำกัด scope, network-first navigation/offline fallback และไม่ intercept/cache video หรือ range request.
- **Accessibility:** mobile menu, Gallery Lightbox, Video dialog และ install help ใช้ focus management/Escape/restoration. Gallery แสดงเฉพาะ category ที่มีภาพจริงและ filter มี `aria-pressed`; Explore/Story/Gallery แสดง final state เมื่อ reduced motion ปิด viewport reveals เพื่อไม่ให้ content ค้างที่ opacity 0.
- **Content/SEO/privacy:** People imagery ใช้คำว่า “Place & Memory” ให้ตรงกับภาพจริง. Privacy อธิบาย YouTube thumbnail/player, OpenStreetMap และ PWA cache. Metadata/social cards, manifest, robots, sitemap, JSON-LD, address/coordinates เดิมได้รับการคงไว้; เอา sitemap `lastModified` ที่ไม่ได้สะท้อนวันแก้ไขจริงออก.
- **Scroll/handoff:** Header ใช้ threshold แทนการ update state ทุก animation frame. เพิ่ม README, TODO, implementation plan, audit และ Before/After screenshots.

## Verification performed

ผลทดสอบบน final source/export:

- `npm ci` — ผ่าน (375 packages ติดตั้ง; npm แสดง 6 moderate findings ตาม residual ด้านล่าง).
- `npm run lint` — ผ่าน.
- `npx tsc --noEmit` — ผ่าน.
- `npm run build` (root/Vercel static export) — ผ่าน; routes `/`, `/privacy`, `/manifest.webmanifest`, `/robots.txt`, `/sitemap.xml` ถูก prerender/export.
- `GITHUB_PAGES=true npm run build` — ผ่าน; ตรวจ `out/`, manifest `start_url`/`scope` ใต้ `/KabKraBue/`, icons/favicon, worker, privacy route และ static assets.
- Chromium basePath run (390/1280 px, reduced-motion): root/privacy status 200; desktop เลือก `/KabKraBue/images/places/viewpoint-01.jpg`, มือถือคง `/KabKraBue/images/village-hero-poster.jpg`; service worker scope `/KabKraBue/`; ไม่มี console/page errors หรือ failed/unprefixed local requests.
- Chromium root run ทั้ง `no-preference` และ `reduce`: status 200, ไม่มี page/console errors หรือ failed local responses; ไม่พบ YouTube iframe ตอนแรก; `Nature` filter เหลือภาพจริง 1 ภาพจาก Gallery 14 ภาพ; ไม่มีหมวด People ที่ว่าง; lightbox Arrow/Escape/focus restoration ผ่าน; install-help Escape/restoration ผ่าน.
- Mobile navigation: dialog semantics, Escape close และ focus restoration ผ่าน.
- Shorts: YouTube iframe 0 ก่อนกด Play และ 1 หลังคลิก thumbnail; CTA ของ TikTok/YouTube คงอยู่.
- Optional Video Showcase: `src/data/videos.ts` ว่างโดยตั้งใจและ section `#video` ไม่ถูก render.
- Story video QA (no-preference): story clips มี `preload="none"` และ `readyState=0` ก่อนเข้า viewport; เริ่มเล่นเมื่อเข้า viewport; clip ก่อนหน้าหยุดเมื่อเปิด clip ถัดไป; มี story clip ที่เล่นพร้อมกันหนึ่งรายการ; worker cache ไม่มีไฟล์วิดีโอ.
- PWA offline: หลัง install/activate และโหลดหน้า online แล้ว จำลอง offline navigation root และ `/KabKraBue/` ได้ response 200 จาก cache; worker scope ถูกต้อง.
- Breakpoints 360, 390, 768, 1024 และ 1440 px — `documentElement.scrollWidth` ไม่เกิน viewport.
- Privacy route, map iframe accessible title/directions URL และ custom `out/404.html` copy/CTA ตรวจพบ.
- หลัง merge เปิด production Home (`https://kab-kra-bue.vercel.app/`) และ Privacy (`https://kab-kra-bue.vercel.app/privacy/`) แบบ read-only; ทั้งสองหน้าแสดงเนื้อหาและ title ที่คาดไว้. Manifest, `sw.js`, robots และ sitemap ตอบสนองต่อ read-only request.
- Screenshots Before มาจาก production baseline และ After จาก local export: [`SCREENSHOTS.md`](SCREENSHOTS.md). After ไม่ใช่ screenshot จาก protected Vercel Preview.
- Lighthouse/real-device Android/iPhone/screen-reader audit ไม่ได้รัน; ไม่อ้างว่าได้ทดสอบ.

## Residual dependency risk

`npm audit` ล่าสุด: **6 moderate, 0 high, 0 critical**; findings อยู่ใน ESLint/TypeScript-ESLint/minimatch development/lint chain ไม่ใช่ runtime dependency ของ static site. Tree ปัจจุบันมี `@typescript-eslint/eslint-plugin@8.69.0`, `@typescript-eslint/parser@8.72.2`, `@typescript-eslint/typescript-estree@8.69.0/8.72.2` และ `minimatch@10.2.6`. `npm audit` ระบุ `fixAvailable: true`; อย่างไรก็ตาม `npm audit fix --dry-run` รอบล่าสุดยังเหลือ 6 findings, ไม่ได้เปลี่ยน package version และเตือน peer dependency. จึงยังต้องตรวจ remediation candidate ใน branch แยก โดยไม่ใช้ `--force` และไม่ถือว่า audit สะอาด.

Registry/advisory evidence ก่อนหน้านี้ชี้ว่า patched `minimatch` เป็น 11.x และอาจเปลี่ยน Node engine requirement; `npm audit fix` ก่อนหน้านี้ไม่เคลียร์ findings. หลีกเลี่ยง forced override/major upgrade ที่เสี่ยงกับ Next.js 15/tooling/Node compatibility; ตรวจใหม่เมื่อมี compatible fix หรือทำ coordinated toolchain upgrade.

npm ยังเตือนว่า `eslint@9.39.5` ไม่ได้รับการ support แล้ว; `eslint-config-next@15.5.29` รับ ESLint ถึง v9 จึงควรวางแผนอัปเกรด ESLint/Next.js ร่วมกันในงานแยก แทนการฝืน peer range.

## GitHub / Vercel delivery status

- Baseline before upgrade: `5a7c5058d7535327585f5420d9000a35bee05418`.
- Current `main`: merge commit `43eb9bc1f5ffe32fc4822ad976f7254aefa3f2af`, PR [#1 — KabKraBue 2.0](https://github.com/Santipap250/KabKraBue/pull/1). GitHub records merge time `2026-11-11T19:16:53Z` and merger account `Santipap250`.
- Vercel created Production deployment `7719355534` and reported `success` at `2026-11-11T19:17:46Z`; deployment URL: https://kab-kra-oopf7zs0y-obixconfig.vercel.app/ . Public production Home and Privacy routes were opened read-only after the merge.
- Preview URL: https://kab-kra-bue-git-manus-kabkrabue-premium-upgrade-obixconfig.vercel.app/ . An unauthenticated browser sees `Login – Vercel` and an asset response `403`; readiness/URL are known from GitHub/Vercel status, but page-level Preview content was not validated without an authorized Vercel session.
- A later docs-only commit `1da43b38549208f1bdd11d313d1400fee7b5b16a` remains on `manus/kabkrabue-premium-upgrade`, is not part of `main`, and contains stale PR #1 status wording; do not use it as the current source of truth.
- This follow-up changes only `TODO.md` and this audit report. It does not change application code, merge, or alter Production; Vercel may create its normal protected PR Preview automatically.

## Official security references

- Next.js official security release overview: https://nextjs.org/blog/security
- Next.js November 2026 security release: https://nextjs.org/blog/november-2026-security-release.md
- Next.js advisory GHSA-vcvr-r3jv-pc5j: https://github.com/vercel/next.js/security/advisories/GHSA-vcvr-r3jv-pc5j
- Next.js advisory GHSA-9qr9-h5gf-34mp: https://github.com/vercel/next.js/security/advisories/GHSA-9qr9-h5gf-34mp
- PostCSS advisory GHSA-qx2v-qp2m-jg93: https://github.com/advisories/GHSA-qx2v-qp2m-jg93
- PostCSS advisory GHSA-6g55-p6wh-862q: https://github.com/advisories/GHSA-6g55-p6wh-862q
- minimatch advisory GHSA-g3hv-75wg-m249: https://github.com/advisories/GHSA-g3hv-75wg-m249
