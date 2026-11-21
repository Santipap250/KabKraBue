# KabKraBue — Audit and Remediation Report

## Current main and Production status (checked 2026-11-21)

- Current `origin/main` is `8d6f99a69bc6bdef8975dab56ee0b1df8f4d348c`, the merge commit for PR #17 (`feat(hero): add looping butterfly wordmark`), recorded at 2026-11-21 11:11:41Z (18:11:41 +07).
- Vercel's latest Production deployment is `dpl_6y6nvSpn9K7xyxysH98NjzZVn6LE`, state `READY`, built from the same SHA. Vercel recorded it ready at 2026-11-21 11:12:26Z; deployment URL [kab-kra-89xn7k6v8-obixconfig.vercel.app](https://kab-kra-89xn7k6v8-obixconfig.vercel.app), with public alias [kab-kra-bue.vercel.app](https://kab-kra-bue.vercel.app).
- Read-only GET smoke against the public alias returned HTTP 200 for `/`, `/privacy/`, `/manifest.webmanifest`, `/sw.js`, `/sitemap.xml`, and `/robots.txt`. Direct unauthenticated requests to the immutable deployment URL returned HTTP 302 to Vercel SSO, so the public alias is the basis for these HTTP checks.
- Both `origin/main:public/sw.js` and the Production `/sw.js` response use cache namespace `kabkrabue-v8`.
- PR #17's looping Butterfly Wordmark is present in the current `main` and Production deployment. This status refresh is documentation-only; it makes no application/configuration/OG-image changes and did not trigger a merge, deploy, or rollback.
- This verification round checked deployment state and HTTP responses only; it did not repeat browser, visual, accessibility, offline, Lighthouse, or field-data testing. The detailed Celestial feature QA below is a historical snapshot from Production SHA `73eb58c` on 2026-11-20, not a claim about a fresh full QA run on current Production.

## Historical Celestial Production QA snapshot — PR #12 / SHA `73eb58c` (checked 2026-11-20)

- Before merge, PR #12 had 3 successful checks: Website quality, Vercel (deployment), and Vercel Preview Comments. Vercel marked the Preview Ready; direct unauthenticated access returned HTTP 302 to Vercel SSO, so its hosted content was not independently inspected.
- The app replaced the compact New Year clock with a compact `Asia/Bangkok` Celestial Timepiece, Thai Buddhist Era/English Gregorian dates, next-New-Year countdown/year progress, accessible interaction, and Reduced Motion/Data Saver handling; the supplied SVG identity was used site-wide and in PWA assets, with app-shell cache `kabkrabue-v7` at that release.
- Clean-install checks passed on the feature source: `npm ci`, `npm run security` (0 vulnerabilities), `npm run lint`, `npm run typecheck`, `npm run test:clock`, root build/export verifier, and GitHub Pages build/export verifier. npm warned that ESLint 9.39.5 is deprecated/unsupported.
- Production HTTP smoke at that time: Home, Privacy, manifest, service worker, sitemap, robots, favicon, Apple icon, and maskable icons tested returned HTTP 200. An unknown route returned 404 with `noindex` and no canonical/`og:url` inherited from Home.
- Production Chromium at 360×560, 375×560, 390×844, 430×932, 768×1024, 1280×800, 1280×900, and 1440×900 showed no horizontal overflow, tested clock/headline overlap, or page errors; the primary CTA was inside the initial viewport at all tested sizes. At 360×560, the measured clock/headline gap was 10px. Console checks at 390×844 and 1280×900 reported no errors.
- With browser timezone `Pacific/Honolulu`, that Production build displayed Bangkok time `20:09:51`, while simulated device-local time was `03:09:51`; Thai date was 20 November 2569 BE, English date 20 November 2026 CE, and New Year target 2570/2027. Reduced Motion rendered the poster; normal motion rendered the Hero video element. Hero WebM/MP4 and poster URLs returned HTTP 200 via HEAD requests.
- Production Gallery showed 14 images; Culture filtering showed 9; lightbox next/Escape passed. Shorts showed 3 cards and created its YouTube iframe only after play click. The root-scoped service worker activated with cache `kabkrabue-v7`; Home and Privacy both loaded offline with HTTP 200. No `src/data`, `public/images`, or `public/videos` files changed.
- In the Production HTML responses inspected on that round, HSTS was present; CSP, X-Content-Type-Options, Referrer-Policy, Permissions-Policy, and X-Frame-Options were not observed. This is a limited historical header observation, not a full security audit or a current-header check.
- Local axe results: Home/Privacy had 0 violations; Home still had incomplete color-contrast (85 nodes), frame-tested (1), and video-caption (5); Privacy had 0 incomplete checks. These are manual review items, not passes or violations.
- Unthrottled local Chromium snapshot: LCP 324 ms (text paragraph candidate), CLS 0.00872. This is not Lighthouse, field data, or a real-device measurement. Screen-reader, real-device, manual contrast/caption review, and Lighthouse/field checks remain unverified.
- Mobile and desktop Before/After captures from that feature round are indexed in `docs/SCREENSHOTS.md`; they are historical captures, not screenshots from this status refresh.

## Previous quality pass — historical status (checked 2026-11-20)

- Its integration base was `origin/main` at `bfdcfa7a51f3c8f0d23772d467b7ff9eb7b4d787`; that pass used feature branch `manus/kabkrabue-full-quality-pass` and preserved the then-current `NewYearClock` while restoring responsive Hero poster and accessibility changes.
- Its local checks and screenshots below are historical evidence for that earlier branch, not substitutes for the current Celestial branch checks or PR gates.
- Production status and live hosting response headers were not checked in that earlier pass.

## Prior-pass scope and preservation contract

The pass addresses source-confirmed accessibility/language, focus visibility, responsive media delivery, short-viewport reachability, route metadata, and static-export verification. It preserves the existing quiet-luxury/cinematic editorial direction; village wording, contact/location data, routes/anchors, social links, original images/videos, service-worker semantics, countdown, and current section order. No new runtime dependency was added. Original image binaries and `public/videos/nature-section.mp4` remain unchanged.

## Prior-pass findings and remediation

### Accessibility and bilingual content

- Added explicit English language metadata to English UI/content fragments while retaining Thai as the document language and keeping all visible copy unchanged.
- Replaced the single-color focus-visible indicator with a dual-contrast ink/rice treatment that remains visible over both light and dark surfaces.
- Kept the existing nested-dialog focus stack, Escape behavior, focus restoration, and minimum touch target hardening; improved mobile reachability for the Hero install control, mobile menu, and install-help dialog.
- Added/retained current-image announcements for Gallery Lightbox navigation.

### Responsive media and short viewports

- Added deterministic WebP candidates for 28 local UI image sources. The manifest contains 56 responsive candidates. Open Graph cover remains original-only because it is referenced by social metadata, not displayed in the UI. Targets are 480/768px; when an original is smaller, its native width is used. No crop or upscale is performed; source originals remain the fallbacks.
- WebP `srcset` is used only at viewport widths up to 767 CSS pixels. Tablet/desktop use original full-resolution images. A final review also caught and corrected the motion-enabled Hero video path: a responsive `picture` overlay remains until the video emits `playing`, so mobile no longer requests the full-resolution JPEG `video.poster`; desktop uses the full-resolution poster art.
- After rebasing onto the main branch's `NewYearClock`, browser measurement found a 49px clock/heading overlap at 375×560. A narrowly scoped ≤380×680 CSS rule compacts and raises only that small-screen clock; the measured gap is now 11px, and larger tested layouts retain their prior geometry.
- The generated variants total 4,372,346 bytes across the responsive candidate set. This is an asset-library size, not a claim that the deployed site is smaller overall; only viewport-selected assets are requested.
- At 375×560, the primary Hero CTA is visible at the initial viewport and the install control remains reachable by normal page scroll. Mobile menu, install dialog, and its final action remain reachable on the same short viewport.

### Route metadata and static-export checks

- Canonical/Open Graph URLs are route-specific for Home and Privacy. The exported 404 has a route-specific title and `noindex`, and has neither canonical nor `og:url` inherited from Home.
- Place JSON-LD is scoped to the Home route.
- Added a deterministic verifier for Home/Privacy/404, manifest, sitemap, robots, local responsive media, and base-path references. Both root and `/KabKraBue/` exports passed with seven route/PWA outputs and 56 responsive candidates.

## Prior-pass validation evidence

| Check | Result |
|---|---|
| TypeScript | `npm run typecheck` passed |
| ESLint | `npm run lint` passed |
| Dependency security | `npm run security` passed; 0 vulnerabilities |
| Root static export | `npm run build` and `npm run verify:export` passed |
| GitHub Pages export | `GITHUB_PAGES=true npm run build` and `GITHUB_PAGES=true npm run verify:export` passed |
| Responsive browser coverage | Chromium 156 at 390×844, 767×900, 768×1024, 1280×720, 1440×900, and 375×560; no horizontal overflow or broken images |
| Runtime/network | No local HTTP errors or uncaught runtime errors in the tested root and `/KabKraBue/` previews |
| Interaction paths | Skip-link focus, mobile menu, install dialog, nested Escape/focus restoration, Hero text toggle, Lightbox arrow/Escape/focus return, reduced motion, and short-viewport Hero reachability passed |
| SEO routes | Home/Privacy/404 metadata verified; 404 has `noindex` and no Home canonical/OG URL |
| PWA | Fresh-profile service-worker registration/activation and offline Home/Privacy passed in both root and `/KabKraBue/` previews; fonts and cached images loaded offline |
| Lab snapshot | Unthrottled local Home LCP event: about 168 ms (root) / 188 ms (`/KabKraBue/`); candidate was a text `<p>`, CLS 0. Not Lighthouse, field data, or a real-device result |

### axe-core review

`axe-core` reported zero violations on Home, Privacy, the nested install dialog, and Gallery Lightbox in the tested states. Home/dialog/lightbox each had 29 rules pass; Privacy had 20. `incomplete` is not a pass or violation:

| State | Root `color-contrast` incomplete nodes | `/KabKraBue/` `color-contrast` incomplete nodes | `video-caption` incomplete nodes |
| --- | ---: | ---: | ---: |
| Home | 68 | 68 | 5 |
| Nested install dialog | 69 | 69 | 5 |
| Gallery Lightbox | 95 | 97 | 5 |
| Privacy | 0 | 0 | 0 |

The contrast nodes are over gradients/complex imagery and still require human sampling. The five video-caption nodes correspond to Story video elements; `ffprobe` found AAC audio in `story-02.mp4` and `people-section.mp4`, while three other Story clips have no audio stream. Automated transcription returned no recognized speech segments for the two audio-bearing clips; that does not establish that their sound has no meaningful speech/music. No transcript or caption file was added without human listening/review.

A focused axe rerun after the `NewYearClock` integration and short-screen fix covered Home at 375×560 and 1280×720 in both root and `/KabKraBue/` exports. It found zero violations; the current run marked 81 small-screen / 86 desktop color-contrast nodes and five video-caption nodes as `incomplete`. These are still manual-review items, not passes.

## Remaining manual follow-ups

1. Manually sample gradient contrast nodes and inspect any text whose actual rendered background is ambiguous.
2. Listen to the two AAC-bearing Story clips and decide whether accurate captions/transcripts are required; do not infer from an empty automatic transcript alone.
3. Test keyboard/screen-reader behavior and layout on real devices before making a conformance claim.
4. Run Lighthouse and field-data checks in an appropriate authorized environment; local Chromium snapshots are only lab observations.
5. Consider a separate reviewed Vercel header-policy change: a historical read-only Production response checked after PR #12 on 2026-11-20 showed HSTS but did not include CSP, X-Content-Type-Options, Referrer-Policy, Permissions-Policy, or X-Frame-Options. This observation is not a full security audit, has not been revalidated on current Production, and no header change is included here.
6. Obtain village representative confirmation before changing address or coordinates.
7. Plan ESLint/Next.js and GitHub Actions runner/action lifecycle upgrades separately; no out-of-scope forced dependency upgrade was made here.

## Historical evidence (not current-round Production status)

PR #1 upgraded the site from baseline `5a7c5058d7535327585f5420d9000a35bee05418`; PR #3 merged as `72583c51e026becffe8525d17926d9939e738b06`; PR #4 merged as `662d0e95bf599228c851eb08422a0e26b34cf98f`; PR #5 merged as `b0a2ade1fa5d04c03253eb55fc72fb707137e36e`. On 2026-11-15, the public alias returned HTTP 200 for `/`, `/privacy/`, `/sw.js`, and `/manifest.webmanifest` for the then-current deployment. Those historical responses do not establish the current Production SHA or status.

Historical PR #5 axe results and CI evidence remain in GitHub Actions run [43129535092](https://github.com/Santipap250/KabKraBue/actions/runs/43129535092). Older source/build/browser snapshots are not used as evidence for this branch.

## Historical security references

- Next.js security releases: https://nextjs.org/blog/security
- Next.js November 2026 security release: https://nextjs.org/blog/november-2026-security-release.md
- Next.js advisories: https://github.com/vercel/next.js/security/advisories/GHSA-vcvr-r3jv-pc5j and https://github.com/vercel/next.js/security/advisories/GHSA-9qr9-h5gf-34mp
- PostCSS advisories: https://github.com/advisories/GHSA-qx2v-qp2m-jg93 and https://github.com/advisories/GHSA-6g55-p6wh-862q
- minimatch advisory: https://github.com/advisories/GHSA-g3hv-75wg-m249
