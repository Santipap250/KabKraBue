# KabKraBue — Quality Pass Work Items

## สถานะปัจจุบัน (ตรวจ 2026-11-20)

- ฐาน integration ปัจจุบันคือ `origin/main` SHA `bfdcfa7a51f3c8f0d23772d467b7ff9eb7b4d787`; หลัง main เพิ่ม `NewYearClock` branch นี้ถูก rebase และคง component/การออกแบบล่าสุดไว้ พร้อมรวม quality fixes รอบนี้
- งานอยู่บน feature branch `manus/kabkrabue-full-quality-pass`; ห้าม push ตรงเข้า `main`, merge, promote หรือเปลี่ยน Production. PR จะใช้สำหรับ review/CI เท่านั้น
- Local typecheck, lint, security audit, root และ GitHub Pages export verification ผ่าน; Chromium browser acceptance ผ่านทั้ง root และ `/KabKraBue/` preview
- รอบนี้ไม่ได้ตรวจ live Production หรือ hosting response headers; ห้ามอนุมานผล Production จาก local/CI
- Read-only audit 8 ด้านระบุและแก้ source-confirmed issues พร้อมคงข้อมูลและสื่อเดิม; manual review ที่ต้องใช้อุปกรณ์/ผู้รู้ยังเปิดอยู่ตามด้านล่าง

## 1. Accessibility และภาษา

- [x] คง `<html lang="th">` เป็นภาษาหลัก และระบุ `lang="en"` ให้ข้อความ/ป้าย UI ภาษาอังกฤษที่เป็นวลีหรือประโยค เพื่อให้ screen reader ใช้ pronunciation language ถูกต้อง โดยไม่เปลี่ยน copy ที่มองเห็น
- [x] เปลี่ยน global `:focus-visible` เป็น dual-contrast ink/rice indicator เพื่อให้เห็นบนพื้นสว่างและมืด; คง keyboard order, nested focus-trap stack, Escape และ focus restoration
- [x] Gallery Lightbox ประกาศตำแหน่งภาพ/จำนวนภาพเมื่อเปลี่ยนด้วยปุ่มหรือลูกศร และคง keyboard/touch controls
- [x] คงภาษาไทย/อังกฤษ, alt text, touch targets, reduced-motion behavior และเนื้อหาหมู่บ้าน; ยก controls สำคัญที่แก้ในรอบนี้ให้แตะได้อย่างน้อย 44px
- [ ] ตรวจด้วย screen reader และอุปกรณ์จริงก่อนอ้าง WCAG conformance

## 2. Responsive, media และ performance

- [x] เพิ่ม responsive WebP candidates สำหรับภาพ editorial ที่ใช้ใน static export; URLs ผ่าน shared base-path helper และตรวจได้ทั้ง root กับ `/KabKraBue/`
- [x] เก็บไฟล์ภาพต้นฉบับไว้ ไม่ crop/upscale; targets 480/768px และใช้ native width เมื่อ source เล็กกว่า; WebP ใช้เฉพาะ viewport ไม่เกิน 767 CSS px ส่วน tablet/desktop ใช้ต้นฉบับเต็มความละเอียด
- [x] Hero เลือก mobile poster WebP ตาม viewport และ full-resolution poster บน desktop แม้เปิด reduced motion; ที่ 375×560 primary CTA เห็นได้ทันทีและปุ่มติดตั้งเข้าถึงได้ด้วย page scroll
- [x] หลังรวม `NewYearClock` ล่าสุด แก้ clock/heading overlap 49px ที่ 375×560 ด้วย compact rule เฉพาะจอ ≤380×680px; browser วัดช่องว่างใหม่ได้ 11px และไม่เปลี่ยน breakpoints ใหญ่กว่า
- [x] Mobile menu เลื่อนรายการภายในได้บน viewport เตี้ย; ปุ่มติดตั้งเห็นได้หลัง scroll และ install-help dialog/ปุ่มท้าย dialog เข้าถึงได้
- [x] คง mobile gallery-filter affordance และขนาด touch target โดยไม่เปลี่ยนหมวดหรือข้อมูลสื่อ
- [x] คง `public/videos/nature-section.mp4`, Story video IDs และ originals; ไม่มีไฟล์ภาพต้นฉบับถูกเปลี่ยนจาก generator
- [ ] ฟัง audio ของ Story clips ที่มีเสียงเพื่อยืนยันว่ามีคำพูด/เนื้อหาที่ต้อง caption หรือไม่; automated transcription ไม่พบ speech segments จึงยังไม่ถือว่าเสียงไม่มีความหมาย

## 3. SEO, static export และ CI

- [x] Canonical/Open Graph URL เป็น route-specific; Home และ Privacy มี URL ของตนเอง ส่วน 404 ไม่มี canonical/`og:url`, มี title เฉพาะ และ `noindex`
- [x] จำกัด Place JSON-LD ไว้เฉพาะ Home; คง metadataBase และ social preview assets
- [x] เพิ่ม deterministic static-export verifier สำหรับ Home, Privacy, 404, manifest, sitemap, robots, responsive assets และ base-path URLs
- [x] Root และ `/KabKraBue/` builds/verification ผ่าน; browser smoke ตรวจ route metadata, local asset requests และ service-worker scope ทั้งสองโหมด
- [ ] รอ GitHub Actions ของ PR ให้ผ่านก่อนขอ review/merge; การ merge/deploy ทำโดย repository owner ตาม workflow เดิม

## 4. PWA, security และข้อมูลที่ต้องยืนยัน

- [x] ตรวจ first-visit และ offline Home/Privacy ใน Chromium profile ใหม่ทั้ง root และ `/KabKraBue/`; service worker ควบคุมหน้าและใช้ app-shell cache ได้โดยไม่เปลี่ยน worker semantics
- [ ] ตรวจ security response headers บน staging/host ที่เจ้าของอนุมัติเท่านั้น; static-export source ไม่ยืนยัน headers ของ host จริง
- [ ] ก่อนเปลี่ยนพิกัด/ที่อยู่ ให้ผู้แทนหมู่บ้านยืนยันข้อมูลจริง; รอบนี้ไม่เปลี่ยนข้อมูลดังกล่าว
- [ ] ทำ manual contrast sampling บน gradients: axe ทำเครื่องหมาย `color-contrast` เป็น incomplete บน Home 68 nodes ใน root/Pages, nested install dialog 69/69 และ gallery lightbox 95/97 (root/Pages); จำนวนขึ้นกับ state/DOM และไม่ใช่ violations หรือผล pass
- [ ] ตรวจ captions ของ Story video ทั้ง 5 รายการ: พบ AAC audio track ใน 2 คลิป (`story-02.mp4`, `people-section.mp4`) และอีก 3 คลิปไม่มี audio track; STT ไม่พบ speech segments แต่ต้องฟังโดยมนุษย์ก่อนสรุปและไม่สร้าง transcript อัตโนมัติ
- [ ] ทำ screen-reader/real-device testing และ Lighthouse/field measurement ในสภาพแวดล้อมที่เหมาะสม; local Chromium metrics ไม่ใช่ Lighthouse หรือ field data
- [ ] ตรวจ Production status/headers แบบ read-only หลัง repository owner merge/deploy หากได้รับอนุญาต; รอบนี้ไม่ได้แตะ Production

## 5. หลักฐานรอบนี้และประวัติ

- Root และ GitHub Pages builds ผ่าน; `npm run security` รายงาน 0 vulnerabilities; `npm run verify:export` ตรวจ 7 route/PWA files และ 56 responsive candidates
- Chromium 156 ตรวจ 390×844, 767×900, 768×1024, 1280×720, 1440×900 และ 375×560; ไม่พบ horizontal overflow, broken images, local HTTP errors หรือ runtime errors; axe ไม่มี violations บน Home, Privacy, install dialog และ lightbox
- หลัง rebase/fix ตรวจ root และ `/KabKraBue/` ครบทั้ง 6 viewport อีกครั้ง: ไม่พบ overflow, รูปเสีย, console/runtime errors หรือ local HTTP errors; poster ใช้ WebP ถึง 767px และ full-resolution original ตั้งแต่ 768px
- axe rerun บน Home ที่ 375×560 และ 1280×720 ทั้ง root/Pages พบ 0 violations; `incomplete` รอบนี้มี color-contrast 81/86 nodes (small/desktop) และ video-caption 5 nodes ซึ่งยังต้อง human review
- PWA offline smoke ผ่านทั้ง Home และ Privacy; local unthrottled LCP event อยู่ที่ประมาณ 168ms (root) / 188ms (`/KabKraBue/`) โดย candidate เป็นข้อความ `<p>`, CLS 0; ไม่ใช่ Lighthouse/field result
- PR #5 แก้ axe-detected contrast issues และ CI trigger; PR #9 นำ compact New Year countdown label/opacity เข้า `main`. สถานะ PR อื่นและ Production ให้ยึด GitHub/Vercel ปัจจุบัน ไม่ใช้ข้อมูลเก่าแทน
- ห้ามอ้าง WCAG 2.2 AA, Lighthouse score, field data หรือ Production success หากยังไม่มีหลักฐานรอบปัจจุบัน
