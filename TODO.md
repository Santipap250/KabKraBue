# KabKraBue — Work Items

## สถานะปัจจุบัน (ตรวจ 2026-11-15)

- `main`: `b0a2ade1fa5d04c03253eb55fc72fb707137e36e`, merge commit ของ PR #5.
- PR [#5 — Fix axe-detected contrast issues](https://github.com/Santipap250/KabKraBue/pull/5) ถูก merge โดย `Santipap250` เวลา `2026-11-12T10:34:41Z`; Manus ไม่ได้ push หรือ merge เข้า `main`.
- Vercel Production deployment `7734790604` ของ `b0a2ade` รายงาน success. Public alias ตอบ HTTP 200 สำหรับ `/`, `/privacy/`, `/sw.js`, `/manifest.webmanifest` ในการตรวจแบบ read-only วันที่ 2026-11-15. Deployment เกิดจาก owner merge ไม่ใช่การสั่ง deploy โดย Manus.
- เอกสารสถานะหลัง merge กำลังปรับเฉพาะบน branch `manus/kabkrabue-postmerge-status` ซึ่งเริ่มจาก `b0a2ade`. ห้าม push ตรงเข้า `main`, merge PR หรือสั่ง promote Production.

## 1. Security, builds และ CI — COMPLETE; lifecycle follow-up OPEN

- [x] คง Next.js static export, root deployment และ GitHub Pages `/KabKraBue/` basePath.
- [x] `npm ci`, `npm run security`, `npm run lint`, `npm run typecheck`, `npm run build` และ `GITHUB_PAGES=true npm run build` ผ่าน; GitHub Actions PR-only run `43129535092` บน PR #5 head `dd31a8e` ผ่านทุกขั้น.
- [x] `npm audit` รายงาน 0 vulnerabilities; scoped `minimatch@11.0.1` override แก้ GHSA-g3hv-75wg-m249.
- [x] ตัด `push manus/**` trigger ที่ทำให้ PR และ push workflow รัน full builds ซ้ำกัน; updates บน feature branch ที่มี PR ใช้ `pull_request` checks.
- [ ] วางแผนอัปเกรด `eslint@9.39.5`/Next.js tooling โดยไม่ฝืน peer range. GitHub Actions ยังเตือน `actions/checkout@v4`/`setup-node@v4` Node 20→24 และแผนย้าย `ubuntu-latest` ไป Ubuntu 26.
- [ ] เฝ้าดู `next/font/google` remote fetch; final PR-only build ผ่าน แต่หากล้มเหลวซ้ำใน single run ให้แยกสาเหตุโดยไม่เปลี่ยนฟอนต์/รูปลักษณ์โดยพลการ.

## 2. Content และ PWA — COMPLETE ผ่าน PR #4

- [x] แก้คำผิดที่ยืนยันได้ `เสียงกบเขียดในนายามพลบค่ำ` → `เสียงกบเขียดในยามพลบค่ำ`; คงข้อมูลหมู่บ้าน พิกัด social/contact และ original media.
- [x] ScrollToTop เลือก `smooth`/`auto` ตาม prefers-reduced-motion โดยคง visibility และ keyboard access.
- [x] จำกัด dynamic Service Worker cache ไว้ 100 entries; คง app shell/offline Privacy, root และ `/KabKraBue/` scope; ลบเฉพาะ cache namespace ของแอป และไม่ cache วิดีโอ/Range requests.
- [x] ทดสอบ worker migration/cache bounds/offline Privacy และ responsive/keyboard behavior บน static export.

## 3. Accessibility — targeted fixes COMPLETE; manual checks OPEN

- [x] แก้ axe contrast nodes 4 จุดด้วย palette เดิม: Shorts counter, Find Us index, Footer `Navigate`/`Visit`.
- [x] axe-core 4.13.0 บน Home/Privacy หลังแก้: 0 violations; Home 29 passed rules, Privacy 19.
- [ ] ให้คนตรวจ contrast บน 64 text nodes ที่วางบน gradients ซึ่ง axe คำนวณ background ไม่ได้.
- [ ] ตรวจเสียง/ความจำเป็นของ caption สำหรับ 5 Story videos ที่ axe จัด `incomplete`; 2 referenced files มี AAC stereo. ห้ามเดา transcript/captions.
- [ ] ทดสอบ screen reader และอุปกรณ์จริง; ยังไม่อ้าง WCAG 2.2 AA conformance.

## 4. Performance — local snapshot COMPLETE; Lighthouse/field review OPEN

- [x] Chromium Performance API snapshot บน local static export: mobile 390×844 LCP 260 ms/CLS 0; desktop 1440×900 LCP 292 ms/CLS 0.00003; Hero WebM 1.31 MB.
- [ ] Lighthouse ไม่ได้ติดตั้ง/รัน; snapshot ไม่มี CPU/network throttling จึงไม่ใช่คะแนน Lighthouse หรือ field data.
- [ ] รัน Lighthouse/field review แยกเมื่อมี tooling และอุปกรณ์จริง พร้อมเก็บ methodology.

## 5. Delivery และ Production safety

- [x] PR #5 รวม axe contrast fixes และ CI trigger correction; Vercel Preview deployment `7725059075` รายงาน success.
- [x] Production deployment `7734790604` ของ merge commit `b0a2ade` รายงาน success; alias endpoints ด้านบนตอบ HTTP 200.
- [x] Manus ไม่ได้ merge PR #5, push เข้า `main`, promote deployment หรือแก้ Production alias.
- [ ] ส่งเอกสาร post-merge ชุดนี้ผ่าน PR แยกเพื่อ review; ห้าม merge หรือ promote จากการกระทำของ Manus.

## Historical record

- PR #1 เป็น application implementation; PR #2 ปรับ Production status documentation.
- PR #3 merge เป็น `72583c51e026becffe8525d17926d9939e738b06` จาก head `56fc511ddf488c0664cce7bee034154c309d9510`; CI และ targeted Chromium tests ผ่าน.
- PR #4 merge เป็น `662d0e95bf599228c851eb08422a0e26b34cf98f` จาก head `8c4ce1fe2f75572fcba1b05bb96fe2c3793a3088`; CI security/lint/typecheck/root/basePath builds ผ่าน.
- PR #5 merge เป็น `b0a2ade1fa5d04c03253eb55fc72fb707137e36e` จาก head `dd31a8e5c15e5480698e21f3d81b1403d0774175`; GitHub Actions run `43129535092` และ Vercel statuses ผ่าน.
- Axe incomplete, local browser metrics และ test evidence ในรายการนี้ไม่ใช่ formal WCAG, Lighthouse, screen-reader หรือ real-device certification.
