# KabKraBue 2.0 — Work Items

Status distinguishes application source from the live Production alias. The application source on `main` remains the PR #1 implementation at `43eb9bc1f5ffe32fc4822ad976f7254aefa3f2af`; PR #2 (`682e349`) and later commits changed documentation only. The user-requested rollback to `5a7c505` was superseded after documentation commit `c60c46a` was pushed: Vercel marked deployment `3YeusiWhr51j67AA9ws3YM8cLB9h` Ready/Current for `kab-kra-bue.vercel.app`, and Home and Privacy returned HTTP 200. Further pushes to `main`, including documentation-only changes, can trigger another Production deployment. The implementation checklist below describes the PR #1 application source.

## 1. Secure static build — COMPLETE; dependency audit remediated; toolchain lifecycle note OPEN

- [x] Start from main SHA `5a7c5058d7535327585f5420d9000a35bee05418`; the resulting implementation was merged in PR #1.
- [x] Keep `output: "export"` and static-only routes; no Next.js server runtime required.
- [x] Update Next.js and `eslint-config-next` to 15.5.29; keep React 18 and avoid a major Next.js upgrade.
- [x] Keep package manifest/lockfile aligned; clean install, lint, TypeScript and build passed for the implementation.
- [x] Fix the Hero clock to use post-hydration real `Asia/Bangkok` time and update once per minute; build-time year prevents SSR/client mismatch.
- [x] Resolve GHSA-g3hv-75wg-m249 by scoping a `minimatch@11.0.1` override to `@typescript-eslint/typescript-estree`; verify clean install and `npm audit` with no `--force` or unrelated major upgrades.
- [ ] Plan a coordinated ESLint/Next.js tooling upgrade: npm warns that `eslint@9.39.5` is no longer supported, while the current `eslint-config-next@15.5.29` peer range stops at ESLint 9.

## 2. Editorial experience — COMPLETE

- [x] Preserve real village content and rice/ink/paddy/clay/gold/mist identity while improving responsive media and content visibility.
- [x] Hero uses a landscape still on desktop and the original portrait poster on mobile; Thailand clock, clear CTAs, responsive layout and reduced-motion fallback remain.
- [x] Preserve story sections, navigation, social/contact, privacy, map, copyright and section anchors.
- [x] Rename People imagery to truthful “Place & Memory” framing; do not invent history, culture, people or coordinates.
- [x] Confirm reduced-motion mode does not strand story/gallery/explore reveal wrappers at opacity zero.

## 3. Media and performance — COMPLETE

- [x] YouTube Shorts remain thumbnail-first; initial page has no YouTube iframe, one appears only after the user presses play. IDs/CTAs are preserved.
- [x] Optional video showcase stays hidden with no real entries; no placeholder videos added.
- [x] Story videos use `preload="none"`, begin in view, pause offscreen, and only one story video plays at a time. Hero video pauses outside the viewport and stays on a still when reduced motion or Data Saver applies. Service worker does not cache video files.
- [x] Keep original nature video; use separate 720×306 optimized copy after sample-frame comparison.
- [x] Keep below-fold assets lazy/sized and Hero WebM small; reduce scroll-state work.

## 4. PWA and static paths — COMPLETE

- [x] Verify generated manifest, icons, service-worker registration/scope, cache namespace and offline navigation on root and `/KabKraBue/` static exports.
- [x] Worker deletes only `kabkrabue-*` caches, is scoped to the app path, skips video/Range requests, refreshes mutable assets stale-while-revalidate, and pre-caches the Privacy route for offline navigation.
- [x] Browser-test Vercel/root paths and GitHub Pages basePath paths for manifest, poster, privacy route and worker.
- [x] Preserve static export and root-hosted deployment behavior.

## 5. Accessibility and responsive interactions — targeted fixes COMPLETE; formal audit OPEN

- [x] Support 360, 390, 768, 1024 and 1440 px widths; browser checks found no horizontal page overflow.
- [x] Mobile navigation, Gallery Lightbox and PWA help dialog have keyboard focus management, Escape close and focus restoration; nested dialogs only run the topmost focus trap.
- [x] Hidden Hero controls/content and ScrollToTop no longer remain keyboard-focusable while visually hidden; major carousel/filter/footer controls have larger touch targets and low-contrast text was corrected.
- [x] Gallery arrows work; only categories with real images are shown; no empty People filter. Map iframe has an accessible title; controls have names.
- [x] Test both normal and reduced-motion browser preferences; Story and Explore content remains visible.
- [ ] Run a formal WCAG/axe and screen-reader review; targeted source/browser checks are not a substitute for that audit.

## 6. Content, SEO, map and privacy — COMPLETE; owner confirmation OPEN

- [x] Preserve the `src/data/` content architecture; verify anchor/image paths.
- [x] Preserve route titles/canonicals/OG/Twitter, robots, sitemap, icons, manifest, on-page address and existing coordinates; avoid unverified postal-address claims in JSON-LD.
- [x] Privacy disclosures match YouTube click-to-load, OpenStreetMap, external links and PWA caching.
- [x] Verify production Home and Privacy routes respond after the merge.
- [ ] Confirm the existing location/address/coordinates with the site owner; the implementation preserved them but did not independently revalidate their accuracy.

## 7. Architecture and handoff — COMPLETE

- [x] Reuse existing components; only remove the obsolete public manifest after confirming no remaining references; replace with the Next-generated static manifest route.
- [x] Expand README with project structure, setup/build/deploy, images/video, PWA/cache and design tokens.
- [x] Add audit report, work plan, TODO and Before/After screenshots.

## 8. Main / Production delivery status

- PR #2 (`https://github.com/Santipap250/KabKraBue/pull/2`) merged as `682e3492a8c0405b9f69f5df19c562ef822cef56` and changed only `TODO.md` and `docs/PROJECT_AUDIT.md`; it did not alter application source.
- PR #1 application code is the first-parent source at `43eb9bc1f5ffe32fc4822ad976f7254aefa3f2af`; its Vercel Production deployment completed successfully at `https://kab-kra-oopf7zs0y-obixconfig.vercel.app/`.
- On 2026-11-12, the user requested rollback of the Production alias to Vercel deployment `AMtk4AdgBevAKQmuYM7XsbDa7Dx4`, built from commit `5a7c5058d7535327585f5420d9000a35bee05418`. Vercel confirmed promotion; the deployment page showed `kab-kra-bue.vercel.app` as Current, and Home and Privacy returned HTTP 200 afterward.
- The subsequent documentation-only commit `c60c46ac287918d6862f6b3129cc6bb18ed5ae91` was pushed to `main`; Vercel created deployment `3YeusiWhr51j67AA9ws3YM8cLB9h`, reported it Ready/Current, and assigned `kab-kra-bue.vercel.app`. Home and Privacy returned HTTP 200. This auto-deployment superseded the manual rollback and serves the PR #1 application source.
- Any further push to `main` can trigger another Production deployment, even when the changes are documentation-only; verify Vercel after publishing.
- Preview page-level QA remains distinct from Production QA; do not claim it based only on a Ready status or URL.
- The old side-branch documentation commit `1da43b38549208f1bdd11d313d1400fee7b5b16a` is not the current `main` source of truth.

## 9. Premium polish follow-up — `manus/kabkrabue-final-polish`

- [x] Work from feature branch based on current `main` SHA `a92a60739ec325366aa0dea77f334636258e4b15`; do not change `main` or Vercel Production directly.
- [x] Address identified accessibility issues: remove hidden Hero/ScrollToTop controls from keyboard/accessibility tree; give controls accessible names/regions; improve contrast and touchscreen targets; ensure only the topmost nested dialog owns the focus trap, with correct Escape close and focus restoration.
- [x] Improve performance: Hero pauses offscreen and uses poster when reduced motion or Data Saver applies; keep video un-cached; correct Gallery image loading/fit and use actual Story video variant; keep YouTube embeds click-to-load.
- [x] Improve PWA freshness/stability: stale-while-revalidate for mutable same-origin assets, cache Privacy shell for offline navigation, retain app-scoped cache cleanup and basePath-safe scope.
- [x] Add GitHub Actions checks with read-only contents permission for security audit, lint, typecheck and static builds at root and `/KabKraBue/`.
- [x] Remove unreferenced `LoadingState`; update Thai/English documentation and record follow-up evidence in `docs/PROJECT_AUDIT.md`.
- [x] Fresh `npm ci`, `npm run security` (0 vulnerabilities), `npm run lint`, `npm run typecheck`, root build and GitHub Pages basePath build all passed.
- [x] Chromium smoke on static GitHub Pages export at 390×844 and reduced-motion; tested no horizontal overflow, hidden Hero content, nested menu/install dialogs, gallery category/lightbox keyboard, basePath assets, and offline Privacy response from service worker; no browser errors.
- [ ] Formal WCAG/axe and screen-reader review; Lighthouse, Vercel Preview and real-device audits remain untested.
- [ ] Push this branch and open a PR; merge is not authorized by this task.
- [ ] Coordinate ESLint/Next.js toolchain upgrade separately; npm warns `eslint@9.39.5` is out of support.

## 10. Final verification

- [x] `npm ci`, `npm run lint`, `npx tsc --noEmit`, root `npm run build` and `GITHUB_PAGES=true npm run build` passed for the merged implementation.
- [x] Inspect `out/` files; check root/basePath assets and routes, hydration, YouTube click-to-load, PWA shell/offline, and browser console.
- [x] Test mobile navigation, filters/lightbox, Shorts, no-video state, map/directions, install dialog, story video play/pause, and responsive widths where browser tooling permits.
- [ ] Lighthouse was not run in this environment; record as untested rather than inferred.
