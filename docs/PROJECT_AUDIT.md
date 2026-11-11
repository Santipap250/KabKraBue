# KabKraBue — Audit and Remediation Report

## Scope and baseline

ตรวจ repository `Santipap250/KabKraBue` จาก baseline `5a7c5058d7535327585f5420d9000a35bee05418` บน branch `manus/kabkrabue-premium-upgrade`. PR #1 merge application implementation เข้า `main` เป็น `43eb9bc1f5ffe32fc4822ad976f7254aefa3f2af`; PR #2 merge เป็น `682e3492a8c0405b9f69f5df19c562ef822cef56` และแก้เฉพาะเอกสารสองไฟล์. วันที่ 2026-11-12 ผู้ใช้สั่งให้ Vercel promote Production กลับไปยัง deployment ที่สร้างจาก baseline `5a7c505`; การทำเช่นนี้เปลี่ยน alias ใน Vercel แต่ไม่ reset GitHub `main`. หลัง push เอกสาร commit `c60c46a` ขึ้น `main`, Vercel auto-deploy แล้วกำหนด alias Production กลับไปยัง app source ของ PR #1.

ตรวจ architecture/routes/components/sections/hooks/data/styles/config/dependencies/assets/PWA/SEO/accessibility/performance/security/responsive behavior และ static export. รายงาน audit รอบต้นครอบคลุม 38 source files. ไม่พบ P0; ไม่พบ broken local image/video path ที่ใช้งานอยู่ใน source inventory.

## สิ่งที่ปรับปรุง

- **Framework/security:** อัปเดต Next.js และ `eslint-config-next` เป็น `15.5.29` ซึ่งเป็น patched 15.x line ที่ระบุจาก official advisory โดยไม่ทำ major upgrade; pin PostCSS `8.5.28` และใช้ npm override ให้ lockfile ไม่ย้อนกลับไปใช้ PostCSS patch เก่า.
- **Hydration/time:** Hero ใช้ placeholder แบบ SSR-safe แล้วเริ่มเวลา real Thailand หลัง mount ด้วย `Intl`/`Asia/Bangkok`, อัปเดตนาทีละครั้ง. Copyright year ใช้ build-time constant.
- **Hero/design:** เพิ่มภาพ desktop poster แบบ landscape (`viewpoint-01.jpg`) และคง portrait poster เดิมบนมือถือ; ใช้ source ที่ตอบกับ viewport และ basePath. คง palette/typography เดิมและสีทองแบบ accent.
- **Story/media:** Hero เลือก WebM ก่อน MP4; Story video `preload="none"`, เริ่มเมื่อใกล้ viewport, pause เมื่อออก และประสานให้มี story clip เล่นพร้อมกันได้เพียงหนึ่งคลิป. วิดีโอต้นฉบับคงไว้; `nature-section.mp4` มี optimized H.264 720×306 สำเนา 4,416,202 bytes จากต้นฉบับ 11,129,273 bytes (ลด ~60.3%); ไม่มี audio ในสำเนาเพราะ player mute โดยค่าเริ่มต้น. เทียบ sample frames ก่อนใช้.
- **Shorts:** thumbnail-first; YouTube iframe ไม่ถูกสร้างใน initial load และถูกเพิ่มหลังผู้ใช้กดเล่น.
- **BasePath/PWA:** เพิ่ม `withBasePath`, normalize `NEXT_PUBLIC_BASE_PATH`, รองรับ static manifest route, metadata/icons/media/service-worker paths. Worker ใช้ namespace `kabkrabue-*`, ลบเฉพาะ cache ของตัวเอง, จำกัด scope, network-first navigation/offline fallback และไม่ intercept/cache video หรือ range request.
- **Accessibility:** mobile menu, Gallery Lightbox, Video dialog และ install help ใช้ focus management/Escape/restoration. Gallery แสดงเฉพาะ category ที่มีภาพจริงและ filter มี `aria-pressed`; Explore/Story/Gallery แสดง final state เมื่อ reduced motion ปิด viewport reveals เพื่อไม่ให้ content ค้างที่ opacity 0.
- **Content/SEO/privacy:** People imagery ใช้คำว่า “Place & Memory” ให้ตรงกับภาพจริง. Privacy อธิบาย YouTube thumbnail/player, OpenStreetMap และ PWA cache. Metadata/social cards, manifest, robots, sitemap และ coordinates เดิมคงไว้; JSON-LD ใช้ `Place` และไม่ยืนยัน postal address ที่ยังไม่ได้ independently verify; เอา sitemap `lastModified` ที่ไม่ได้สะท้อนวันแก้ไขจริงออก.
- **Scroll/handoff:** Header ใช้ threshold แทนการ update state ทุก animation frame. เพิ่ม README, TODO, implementation plan, audit และ Before/After screenshots.

## Previous PR #1 verification

รายการตรวจด้านล่างเป็นหลักฐาน historical ของ PR #1 และไม่ใช่ผลทดสอบ follow-up branch รอบนี้:

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
- ก่อน rollback หลัง merge เปิด production Home (`https://kab-kra-bue.vercel.app/`) และ Privacy (`https://kab-kra-bue.vercel.app/privacy/`) แบบ read-only; ทั้งสองหน้าแสดงเนื้อหาและ title ที่คาดไว้. Manifest, `sw.js`, robots และ sitemap ตอบสนองต่อ read-only request.
- หลัง rollback วันที่ 2026-11-12 หน้า Home และ Privacy ของ Production ตอบ HTTP 200 จาก deployment `5a7c505`.
- Screenshots Before มาจาก production baseline และ After จาก local export: [`SCREENSHOTS.md`](SCREENSHOTS.md). After ไม่ใช่ screenshot จาก protected Vercel Preview.
- Lighthouse/real-device Android/iPhone/screen-reader audit ไม่ได้รัน; ไม่อ้างว่าได้ทดสอบ.

## Current dependency status and residual toolchain risk

การตรวจรอบก่อน follow-up เคยพบ **6 moderate, 0 high, 0 critical** ใน ESLint/TypeScript-ESLint/minimatch development/lint chain ไม่ใช่ runtime dependency ของ static site. ผลดังกล่าวเป็น historical baseline; remediation และผลสดของ follow-up branch อยู่ในหัวข้อถัดไป.

Follow-up แก้ advisory GHSA-g3hv-75wg-m249 ด้วย scoped override `@typescript-eslint/typescript-estree > minimatch@11.0.1`; Node engine ของแพ็กเกจนี้รองรับ Node 18/20 และ >=22. `npm ci`, `npm run security`, และตรวจ dependency tree ผ่าน; override ไม่เปลี่ยน minimatch 3.x ของ ESLint packages อื่น.

npm ยังเตือนว่า `eslint@9.39.5` ไม่ได้รับการ support แล้ว; `eslint-config-next@15.5.29` รับ ESLint ถึง v9 จึงควรวางแผนอัปเกรด ESLint/Next.js ร่วมกันในงานแยก แทนการฝืน peer range.

## Premium polish follow-up — `manus/kabkrabue-final-polish`

Branch นี้แยกจาก `main` ที่ `a92a60739ec325366aa0dea77f334636258e4b15`; ไม่แก้ `main` หรือ Vercel Production โดยตรง. เพิ่ม CI ที่ permission `contents: read` สำหรับ audit/lint/typecheck และ static build ทั้ง root กับ GitHub Pages basePath. ปรับ hidden Hero/ScrollToTop accessibility, topmost-only nested dialog focus trap, Hero video pause/resume และ Data Saver/reduced-motion poster, contrast/touch targets, image priority/fit, story video variant, service-worker stale-while-revalidate และ offline Privacy shell. Dead `LoadingState` ที่ไม่มี consumer ถูกลบ.

ผลตรวจของ follow-up branch บน source ล่าสุด:

- `npm ci` — ผ่าน; ติดตั้ง 376 packages และรายงาน 0 vulnerabilities.
- `npm run security` (`npm audit --audit-level=moderate`) — ผ่าน; 0 vulnerabilities.
- `npm run lint` และ `npm run typecheck` — ผ่าน.
- `npm run build` และ `GITHUB_PAGES=true npm run build` — ผ่านทั้ง root และ `/KabKraBue/` static exports.
- Chromium บน GitHub Pages export ที่ 390×844, `prefers-reduced-motion: reduce`: ไม่มี horizontal overflow, missing image alt หรือ unnamed controls; local assets ใช้ basePath; initial YouTube iframes 0; gallery NATURE filter/lightbox, Arrow/Escape และ focus restoration ผ่าน.
- Hero video เป็น poster เมื่อ reduced motion เปิด; Hero hidden content เป็น `inert`/`aria-hidden` และกลับมาได้หลัง toggle. Mobile menu ซ้อน install-help dialog ได้; เฉพาะ dialog ชั้นบนดัก Tab, Escape ปิดทีละชั้น และ focus กลับไปยัง trigger ที่ถูกต้อง.
- Service worker ใช้ scope `/KabKraBue/`; privacy page ถูก precache และ offline navigation ได้ HTTP 200 โดย CDP ยืนยัน `fromServiceWorker: true`; ไม่มี browser console/runtime errors.
- GitHub Actions `quality.yml` เพิ่ม audit/lint/typecheck และ build สำหรับ root/basePath, ใช้ permission `contents: read`.
- npm แสดง deprecation warning ของ `eslint@9.39.5`; เป็น toolchain lifecycle note ไม่ใช่ vulnerability และยังควรวางแผนอัปเกรดร่วมกับ Next.js แยกต่างหาก. Formal WCAG/axe, screen-reader, Lighthouse และ real-device audit ยังไม่ได้ทำ.

เปิด PR [#3 — Polish accessibility, PWA freshness, and CI quality checks](https://github.com/Santipap250/KabKraBue/pull/3) จาก `manus/kabkrabue-final-polish` เข้า `main` แล้ว. PR ยังไม่ merge; ไม่มีการ push ไป `main` และไม่ได้แก้ Vercel Production. GitHub Actions CI เริ่มตรวจหลัง PR ถูกสร้าง; สถานะ checks ให้ดูจาก PR โดยตรง.

## GitHub / Vercel delivery status

- Baseline before upgrade: `5a7c5058d7535327585f5420d9000a35bee05418`.
- PR [#2 — Docs: reflect current Production status](https://github.com/Santipap250/KabKraBue/pull/2) merged as `682e3492a8c0405b9f69f5df19c562ef822cef56`; it changed only `TODO.md` and this report. The application source remains the PR #1 implementation at `43eb9bc1f5ffe32fc4822ad976f7254aefa3f2af`, merged at `2026-11-11T19:16:53Z` by `Santipap250`.
- Vercel Production deployment for PR #1 completed successfully at `https://kab-kra-oopf7zs0y-obixconfig.vercel.app/`. The later Production deployment for `682e349` also reported Ready/success; its build completed, with npm warnings but no build failure.
- On 2026-11-12 the user authorized promoting the existing Vercel deployment `AMtk4AdgBevAKQmuYM7XsbDa7Dx4` from commit `5a7c5058d7535327585f5420d9000a35bee05418`. Vercel confirmed promotion and showed `kab-kra-bue.vercel.app` as Current; Home and Privacy returned HTTP 200 after the rollback. GitHub `main` remained unchanged by that Vercel action.
- The documentation-only commit `c60c46ac287918d6862f6b3129cc6bb18ed5ae91` was then pushed to `main`. Vercel created deployment `3YeusiWhr51j67AA9ws3YM8cLB9h`, reported it Ready/Current for `kab-kra-bue.vercel.app`, and assigned the Production alias. Home and Privacy returned HTTP 200 afterward. This deployment superseded the manual rollback and serves the PR #1 application source; the rollback deployment remains available as a historical deployment.
- Future pushes to `main`, including docs-only commits, can trigger another Production deployment in this project.
- Preview URL: https://kab-kra-bue-git-manus-kabkrabue-premium-upgrade-obixconfig.vercel.app/ . An unauthenticated browser sees `Login – Vercel` and an asset response `403`; readiness/URL are known from GitHub/Vercel status, but page-level Preview content was not validated without an authorized Vercel session.
- A later docs-only commit `1da43b38549208f1bdd11d313d1400fee7b5b16a` remains on `manus/kabkrabue-premium-upgrade`, is not part of `main`, and contains stale PR #1 status wording; do not use it as the current source of truth.

## Official security references

- Next.js official security release overview: https://nextjs.org/blog/security
- Next.js November 2026 security release: https://nextjs.org/blog/november-2026-security-release.md
- Next.js advisory GHSA-vcvr-r3jv-pc5j: https://github.com/vercel/next.js/security/advisories/GHSA-vcvr-r3jv-pc5j
- Next.js advisory GHSA-9qr9-h5gf-34mp: https://github.com/vercel/next.js/security/advisories/GHSA-9qr9-h5gf-34mp
- PostCSS advisory GHSA-qx2v-qp2m-jg93: https://github.com/advisories/GHSA-qx2v-qp2m-jg93
- PostCSS advisory GHSA-6g55-p6wh-862q: https://github.com/advisories/GHSA-6g55-p6wh-862q
- minimatch advisory GHSA-g3hv-75wg-m249: https://github.com/advisories/GHSA-g3hv-75wg-m249
