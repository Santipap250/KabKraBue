# KabKraBue — Audit and Remediation Report

## สถานะปัจจุบัน

ข้อมูลนี้ตรวจเมื่อ 2026-11-12 (UTC/ICT) บน repository `Santipap250/KabKraBue`:

- `main` ปัจจุบันคือ `662d0e95bf599228c851eb08422a0e26b34cf98f` ซึ่งเป็น merge commit ของ PR [#4 — Harden service worker and reduced-motion behavior](https://github.com/Santipap250/KabKraBue/pull/4).
- PR #4 ถูก merge โดยบัญชี `Santipap250` (`TUIzFPV`) เวลา `2026-11-12T00:17:04Z` (07:17:04 ICT) จาก head `8c4ce1fe2f75572fcba1b05bb96fe2c3793a3088` โดยมีฐาน `72583c51e026becffe8525d17926d9939e738b06`. การ merge นี้เกิดระหว่างที่กำลังทำ QA; Manus ไม่ได้กด merge หรือ push ไป `main`.
- GitHub ระบุ Vercel Production deployment record `7724621029` ของ commit `662d0e9` ว่าสำเร็จ โดย URL คือ https://kab-kra-5kksu7vw9-obixconfig.vercel.app . Public alias `https://kab-kra-bue.vercel.app/`, `/privacy/` และ `/sw.js` ตอบ HTTP 200 ในการตรวจ read-only. เนื่องจาก repo มีการ deploy จาก `main` การ merge โดยเจ้าของทำให้ Production ได้รับ deployment ใหม่; Manus ไม่ได้สั่ง promote หรือแก้ alias.
- Contrast fixes ที่พบจาก axe ถูกแยกออกจาก PR #4 บน feature branch ใหม่ `manus/kabkrabue-axe-contrast-followup` ซึ่งเริ่มจาก current `main` SHA ข้างต้น. Source commit ที่ตรวจคือ `929b008b1a6af390f95caf7199581e0f1338b164` (tree `afbf7c33b3abb92142efb9bc6d2fc8ad1b7e825c`). เปิดเป็น PR [#5 — Fix axe-detected contrast issues](https://github.com/Santipap250/KabKraBue/pull/5); state `OPEN`, no merge commit. GitHub/Vercel checks are tracked on the PR and must pass review before any owner-approved merge.

## ประวัติและขอบเขต

PR #1 เป็นการปรับปรุงแอปจาก baseline `5a7c5058d7535327585f5420d9000a35bee05418`; PR #2 ปรับเอกสารสถานะ Production. รายงานในส่วนประวัติของ PR #1 และ PR #3 ด้านล่างเป็นหลักฐานย้อนหลัง ไม่ควรนำไปปะปนกับสถานะ current main/Production.

PR #3 (`manus/kabkrabue-final-polish`) merge เป็น `72583c51e026becffe8525d17926d9939e738b06`; CI และ browser smoke tests ของ head `56fc511ddf488c0664cce7bee034154c309d9510` ผ่าน. PR #4 เพิ่มการจำกัด dynamic service-worker cache ที่ 100 entries, reduced-motion behavior สำหรับ ScrollToTop, แก้คำผิดภาษาไทย, ปรับแผนและ TODO; CI ของ head `8c4ce1f` ผ่าน audit/lint/typecheck และ static builds.

งานทั้งหมดในรอบปัจจุบันคง design/palette, village content, contact data, social links, original media, static export และ root/`/KabKraBue/` basePath. ไม่มีการเพิ่ม dependency สำหรับ axe หรือ Lighthouse และไม่มีการเปลี่ยน production code ผ่านการ push เข้า `main` จาก Manus.

## Axe contrast findings ที่แก้ใน branch ปัจจุบัน

`axe-core` 4.13.0 มีอยู่ใน clean install แบบ transitive; ไม่ได้เพิ่มเป็น direct dependency. รอบแรกพบ contrast จริง 4 nodes: ตัวเลข Shorts สี gold/80 บนพื้นมืด, index สี clay ใน Find Us บนพื้น mist, และหัวข้อ Footer `Navigate`/`Visit` ซึ่ง utility สี mist ถูก `.eyebrow` default สี paddy override. แก้เฉพาะ class/context โดยใช้ palette token เดิม: gold แบบทึบ, paddy สำหรับ index เฉพาะ Visit, และบังคับ intended mist/70 utility ให้มีผลใน Footer. ไม่ได้เปลี่ยน palette หรือเนื้อหาหน้าเว็บ.

ผล axe หลังแก้ บน static export ของ source tree `afbf7c3`:

| หน้า | Violations | Passed rules | Incomplete |
| --- | ---: | ---: | --- |
| Home `/` | 0 | 29 | `color-contrast`: 64 nodes บน background gradient ที่ axe คำนวณพื้นหลังไม่ได้; `video-caption`: ต้องให้คนตรวจ 5 Story video elements |
| Privacy `/privacy/` | 0 | 19 | ไม่มี |

รายการ `incomplete` ไม่ใช่ข้อสรุปว่า element ผ่านหรือไม่ผ่าน. `ffprobe` พบ AAC stereo ในวิดีโอที่อ้างอิง `story-02.mp4` และ `people-section.mp4`; ยังไม่ได้ตรวจเนื้อหาเสียงหรือยืนยันว่ามี/จำเป็นต้องมี caption track. อีก 3 Story clips ที่ใช้อยู่ไม่มี audio stream ในไฟล์ที่อ้างอิง. จึงยังต้องมีคนตรวจความหมายของเสียง/captions และ contrast บน gradient; ไม่อ้างว่าได้รับการรับรอง WCAG 2.2 AA.

## Verification บน source tree ปัจจุบัน

รันเมื่อ 2026-11-12 บน branch `manus/kabkrabue-axe-contrast-followup`, source commit `929b008b1a6af390f95caf7199581e0f1338b164`:

- `npm ci` — ผ่าน, ติดตั้ง 376 packages; `npm audit` พบ 0 vulnerabilities. npm ยังแสดงคำเตือนว่า `eslint@9.39.5` ไม่ได้รับการ support แล้ว.
- `npm run security` — ผ่าน; 0 vulnerabilities.
- `npm run lint` และ `npm run typecheck` — ผ่าน.
- `npm run build` และ `GITHUB_PAGES=true npm run build` — ผ่านทั้ง root และ `/KabKraBue/` static exports.
- บน local static servers ตรวจ `/`, `/privacy/`, `/404.html`, manifest, robots, sitemap และ `sw.js` ทั้ง root และ `/KabKraBue/`; ทุก endpoint ที่ตรวจตอบ HTTP 200.
- axe-core 4.13.0 — Home 0 violations/29 passed rules; Privacy 0 violations/19 passed rules. รายละเอียด incomplete อยู่ด้านบน; ผลนี้เป็น automated check เฉพาะสอง routes ไม่ใช่ formal accessibility audit.

### Browser smoke/performance (local static export)

การทดสอบ CDP keyboard/dialog, Gallery filters/lightbox (Arrow/Escape/focus restore), Hero toggle, ScrollToTop, reduced motion, mobile/responsive overflow, SW cache bound/version migration/offline Privacy ทำก่อน cherry-pick บน commit `773f1ca834f23b9455412d20d2f73ed923eb68bb`; Git tree นั้นตรงกับ source tree `929b008` ทุกไฟล์. ผลการทดสอบ interaction paths ผ่าน.

Lighthouse package/CLI ไม่ติดตั้ง; ไม่ได้เพิ่ม dependency. Chromium Performance API snapshot ใหม่บน root export, cache ปิดและ Service Worker interception bypass:

| Emulated viewport | TTFB | FCP/LCP | CLS | Resources | First-party bytes | Hero WebM |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| 390×844 | 17 ms | 260 ms | 0 | 33 | 3.48 MB | 1.31 MB |
| 1440×900 | 18 ms | 292 ms | 0.00003 | 34 | 3.54 MB | 1.31 MB |

เป็น snapshot จาก local static server โดยไม่มี CPU/network throttling; ไม่ใช่ Lighthouse score, field data หรือผลบนอุปกรณ์จริง และไม่ควรเทียบตรงกับ Production.

## Production / Preview evidence

PR #4 preview deployment ที่รายงานผ่าน GitHub (`https://kab-kra-nx65g819c-obixconfig.vercel.app/`) ต้องเข้าสู่ Vercel login ในการเรียกแบบไม่ authenticated; จึงยืนยันได้แค่ deployment status/URL ไม่ได้ยืนยันหน้า Preview ด้วย browser. PR #5 เป็น follow-up review-only; ตรวจ CI/Preview state ล่าสุดผ่าน [PR #5](https://github.com/Santipap250/KabKraBue/pull/5), ไม่บันทึก status แบบชั่วคราวใน source docs. Production evidence ของ main ปัจจุบันมาจาก GitHub deployment status และ public HTTP checks ที่ระบุข้างต้น; ไม่ได้ตรวจ Vercel Dashboard โดยตรงในรอบนี้.

PR #5 เปิดจาก `manus/kabkrabue-axe-contrast-followup` เข้า `main` แล้ว; ห้าม merge, push ไป `main`, promote deployment หรือแก้ Production ในขั้นตอน follow-up นี้.

## Residual items

1. ตรวจ contrast บน 64 text nodes ที่วางบน gradient ด้วย human visual/color sampling; axe คำนวณ background ไม่ได้.
2. ตรวจเสียง Story videos สองไฟล์ที่มี AAC เพื่อยืนยัน caption/subtitle requirement; ไม่แต่ง transcript/captions โดยเดา.
3. ทำ screen-reader/real-device review ก่อนอ้าง conformance.
4. วางแผนอัปเกรด ESLint/Next.js tooling ร่วมกัน; ไม่ฝืน peer ranges. npm audit ปัจจุบัน 0 vulnerabilities.
5. Lighthouse ไม่ได้ติดตั้งและไม่ได้รัน; browser metrics ด้านบนเป็นเพียง local snapshot.

## Historical security references

- Next.js security releases: https://nextjs.org/blog/security
- Next.js November 2026 security release: https://nextjs.org/blog/november-2026-security-release.md
- Next.js advisories: https://github.com/vercel/next.js/security/advisories/GHSA-vcvr-r3jv-pc5j and https://github.com/vercel/next.js/security/advisories/GHSA-9qr9-h5gf-34mp
- PostCSS advisories: https://github.com/advisories/GHSA-qx2v-qp2m-jg93 and https://github.com/advisories/GHSA-6g55-p6wh-862q
- minimatch advisory: https://github.com/advisories/GHSA-g3hv-75wg-m249
