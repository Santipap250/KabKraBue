# KabKraBue — Work Items

## สถานะปัจจุบัน (2026-11-12)

- `main`: `662d0e95bf599228c851eb08422a0e26b34cf98f` (PR #4 merge commit).
- PR [#4 — Harden service worker and reduced-motion behavior](https://github.com/Santipap250/KabKraBue/pull/4) ถูก merge โดย `Santipap250` เวลา `2026-11-12T00:17:04Z`; GitHub ระบุ Production deployment success และ public Home/Privacy/`sw.js` ตอบ HTTP 200. การ merge เกิดระหว่าง QA; Manus ไม่ได้ merge/push `main` หรือสั่ง deploy.
- งาน axe contrast แยกอยู่ branch `manus/kabkrabue-axe-contrast-followup` จาก `662d0e9`; source commit `929b008b1a6af390f95caf7199581e0f1338b164`. เปิด PR [#5](https://github.com/Santipap250/KabKraBue/pull/5) แล้ว; เป็น review-only และห้าม merge หรือแตะ Production.

## 1. Security/static build — COMPLETE; toolchain note OPEN

- [x] คง Next.js static export และ root/basePath deployment.
- [x] `npm ci`, `npm run security`, `npm run lint`, `npm run typecheck`, `npm run build` และ `GITHUB_PAGES=true npm run build` ผ่านบน source commit `929b008`.
- [x] `npm audit` รายงาน 0 vulnerabilities; scoped `minimatch@11.0.1` override ยังคงแก้ GHSA-g3hv-75wg-m249.
- [ ] วางแผนอัปเกรด `eslint@9.39.5`/Next.js tooling ร่วมกัน; npm เตือน ESLint version ไม่ได้รับการ support แล้ว. GitHub Actions ยังเตือน `actions/checkout@v4`/`setup-node@v4` Node 20 deprecation/Node 24 และ `ubuntu-latest` migration; ห้ามฝืน peer range หรือเปลี่ยน workflow นอก scope โดยไม่มีเหตุผล.

## 2. Content/PWA — COMPLETE ผ่าน PR #4

- [x] แก้คำผิดยืนยันได้ `เสียงกบเขียดในนายามพลบค่ำ` → `เสียงกบเขียดในยามพลบค่ำ`; คงข้อมูลหมู่บ้าน/พิกัด/social/contact/original media.
- [x] ScrollToTop เลือก `smooth` หรือ `auto` ตาม prefers-reduced-motion โดยคง visibility และ keyboard access.
- [x] จำกัด dynamic service-worker cache ที่ 100 entries; คง app shell/offline Privacy, root และ `/KabKraBue/` scope, ลบเฉพาะ cache namespace ของแอป และไม่ cache video/Range request.
- [x] ทดสอบ worker version migration/cache bounds/offline Privacy และ responsive/keyboard behavior บน static export.

## 3. Accessibility — targeted contrast fixes COMPLETE; manual review OPEN

- [x] พบและแก้ axe contrast nodes 4 จุดโดยใช้ palette เดิม: Shorts gold label, Find Us index, Footer Navigate/Visit.
- [x] axe-core 4.13.0 บน Home/Privacy หลังแก้: 0 violations; Home 29 pass rules, Privacy 19 pass rules.
- [ ] Human review contrast ของ 64 nodes บน gradient ที่ axe คำนวณพื้นหลังไม่ได้.
- [ ] ตรวจ caption requirement ของ 5 Story videos ที่ axe ให้ `incomplete`; 2 referenced files มี AAC stereo. ตรวจเสียงจริงก่อนเพิ่ม transcript/captions.
- [ ] ทดสอบ screen reader และอุปกรณ์จริง; ยังไม่อ้าง WCAG 2.2 AA conformance.

## 4. Performance — snapshot COMPLETE; Lighthouse/field review OPEN

- [x] บันทึก Chromium Performance API snapshot บน local static export: mobile 390×844 LCP 260 ms/CLS 0; desktop 1440×900 LCP 292 ms/CLS 0.00003; initial Hero WebM 1.31 MB.
- [ ] Lighthouse ไม่ติดตั้ง; ไม่เพิ่ม toolchain ขนาดใหญ่ใน scope นี้. ค่า browser snapshot ไม่มี CPU/network throttling จึงไม่ใช่คะแนนหรือ field data.
- [ ] หากต้องการ Lighthouse/field data, ให้รันจาก environment ที่มี tool/อุปกรณ์จริงและเก็บ profile แยกจาก local numbers.

## 5. Delivery/docs — READY FOR REVIEW (PR #5 OPEN)

- [x] ปรับ `docs/PROJECT_AUDIT.md`, `TODO.md` และ `plan.md` ให้สะท้อน main `662d0e9`, owner-merged PR #4, Production evidence, exact source SHA และ test limitations.
- [x] เปิด [PR #5](https://github.com/Santipap250/KabKraBue/pull/5) จาก `manus/kabkrabue-axe-contrast-followup` เข้า `main`; review-only, ห้าม merge/auto-promote จากการกระทำของ Manus.
- [x] บน head `35187b5`, PR run `43129011877` ผ่าน ส่วน push run `43129005714` ล้มที่ basePath `next/font/google`; PR/feature-push trigger ซ้ำกันทำให้เกิด duplicate full builds.
- [x] ตัด push trigger `manus/**` ที่ซ้ำใน `.github/workflows/quality.yml`; การ update PR branch ยังถูกตรวจผ่าน `pull_request` event.
- [ ] ตรวจ PR-only CI run หลัง trigger change. Vercel deployment `7724901892` สำเร็จสำหรับ head ก่อนหน้า; Preview content redirect ไป login จึงไม่ได้ browser-verify.
- [x] ยืนยัน remote `main` ยังคง `662d0e95bf599228c851eb08422a0e26b34cf98f`; Manus ไม่ได้ push หรือ merge เข้า `main`.

## Historical record

- PR #1 คือ application implementation; PR #2 ปรับ Production status documentation.
- PR #3 merge เป็น `72583c51e026becffe8525d17926d9939e738b06` จาก head `56fc511ddf488c0664cce7bee034154c309d9510`; CI และ targeted Chromium tests ผ่าน.
- PR #4 merge เป็น `662d0e95bf599228c851eb08422a0e26b34cf98f` จาก head `8c4ce1fe2f75572fcba1b05bb96fe2c3793a3088`; CI audit/lint/typecheck/root/basePath builds ผ่าน. GitHub ระบุ Vercel Production deployment record `7724621029` success.
- รายงานผล axe/performance ใน checklist นี้ไม่ใช่ formal WCAG, Lighthouse, screen-reader หรือ real-device certification.
