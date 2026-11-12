# KabKraBue — Work Items

## Current baseline (2026-11-12)

- Current `main`: `72583c51e026becffe8525d17926d9939e738b06`, PR #3 merge commit.
- PR #3 implementation (`manus/kabkrabue-final-polish`, head `56fc511ddf488c0664cce7bee034154c309d9510`) is merged; see [PR #3](https://github.com/Santipap250/KabKraBue/pull/3).
- GitHub reports the Vercel check for merge commit `72583c5` as success; Production Home and Privacy returned HTTP 200 in a read-only check on 2026-11-12. The Vercel project dashboard requires authorization for independent verification of the current alias/deployment state.
- Current hardening changes are isolated on `manus/kabkrabue-final-hardening`, based on the exact main SHA above. Do not push to `main`, merge the hardening PR, promote a deployment or change the Production alias without owner approval.

## 1. Secure static build — COMPLETE; toolchain lifecycle note OPEN

- [x] Keep `output: "export"` and static-only routes; no Next.js server runtime required.
- [x] Use Next.js and `eslint-config-next` 15.5.29 and React 18; avoid unnecessary major upgrades.
- [x] Keep package manifest/lockfile aligned; scoped `minimatch@11.0.1` override remediates GHSA-g3hv-75wg-m249 in the TypeScript-ESLint dependency tree.
- [ ] Coordinate ESLint/Next.js tooling upgrade separately: npm warns `eslint@9.39.5` is out of support; do not force an upgrade outside the current peer range.

## 2. Editorial content — IN PROGRESS

- [x] Preserve the village content, design identity, existing section structure, social/contact data and original media.
- [ ] Correct the verified typo `เสียงกบเขียดในนายามพลบค่ำ` to `เสียงกบเขียดในยามพลบค่ำ` in `src/data/village.ts` and inspect adjacent Thai/English copy for additional definite typos only.
- [x] Do not invent village history, culture, location data, coordinates, people or video records.

## 3. Accessibility — targeted fixes; formal audit OPEN

- [x] PR #3 adds keyboard/focus behavior for mobile menu, nested install-help dialog and Gallery Lightbox; hidden Hero content is inert and hidden controls are excluded from focus.
- [ ] Make ScrollToTop use `behavior: "smooth"` normally and `behavior: "auto"` when `prefers-reduced-motion: reduce`, without changing hydration behavior or hiding/disabling the visible button.
- [ ] Re-test ScrollToTop in both motion modes, its hidden/focus state, and the interaction paths listed in the audit report.
- [ ] Run axe if a ready tool is available; otherwise document source, semantic and browser-keyboard checks without claiming WCAG 2.2 AA conformance.
- [ ] Screen-reader and real-device reviews remain outstanding unless performed and recorded separately.

## 4. PWA and service-worker hardening — IN PROGRESS

- [x] Preserve the app-scoped cache namespace, root and `/KabKraBue/` scope support, network-first navigation, offline Privacy shell, and exclusions for video and Range requests.
- [ ] Inspect `public/sw.js` for unbounded dynamic Cache Storage entries and duplicate shell/asset caching.
- [ ] If needed, bound dynamic entries while preserving Home/Privacy/manifest/icons and never deleting caches outside `kabkrabue-*`.
- [ ] Bump the worker cache version and test old-cache cleanup/worker takeover after a new static build; verify offline Privacy, no video caching and basePath behavior.

## 5. Performance QA — IN PROGRESS

- [x] PR #3 retains a still poster for reduced-motion/Data Saver, pauses Hero video offscreen, keeps Story videos lazy, corrects Gallery loading/fit, and keeps YouTube click-to-load.
- [ ] Inspect Hero poster/WebM, gallery loading, Story playback, font loading, first-load JavaScript, layout stability/LCP and network requests on current main/static export.
- [ ] Run Lighthouse only if it is already available without installing a large toolchain; otherwise record browser performance inspection and the Lighthouse limitation.
- [ ] Do not improve scores by hiding content, disabling features or changing the site's appearance.

## 6. Documentation and evidence — IN PROGRESS

- [ ] Keep `docs/PROJECT_AUDIT.md`, `TODO.md`, `README.md` and `plan.md` aligned to the merged PR #3, current main, current Production evidence and remaining work.
- [ ] Date every new test result and name the exact source commit tested; retain useful PR #1/PR #3 history but label it historical.
- [ ] Do not claim axe, Lighthouse, real-device or formal WCAG tests unless actually performed.

## 7. Final verification and delivery — IN PROGRESS

- [ ] Fresh `npm ci`, `npm run security`, `npm run lint`, `npm run typecheck`, root `npm run build`, and `GITHUB_PAGES=true npm run build`.
- [ ] Inspect root and `/KabKraBue/` outputs: Home, Privacy, 404, manifest, robots, sitemap, service worker, media paths and responsive layout.
- [ ] Browser-test relevant accessibility interactions, cache bounds/version migration/offline behavior and performance evidence; report unsupported checks honestly.
- [ ] Commit/push only `manus/kabkrabue-final-hardening` and open a new PR to `main`; do not merge, promote or change Production.

## Historical delivery record

- PR #1 contains the initial application implementation; PR #2 updated Production status documentation.
- PR #3 merged as `72583c51e026becffe8525d17926d9939e738b06` on 2026-11-11T23:31:36Z. Its GitHub Actions security/lint/typecheck/root/basePath-build checks passed on 2026-11-12 (ICT), source head `56fc511ddf488c0664cce7bee034154c309d9510`.
- PR #3's targeted Chromium smoke tests passed on 2026-11-12 (ICT) at the same source head: nested-dialog keyboard/focus behavior, Gallery filter/lightbox, reduced motion, basePath and offline Privacy via service worker. These were smoke tests, not a formal WCAG/axe audit or Lighthouse run.
- Production status must be rechecked after any `main` push because this repository can auto-deploy Production. No hardening change in this checklist is authorized to update `main` or Production.
