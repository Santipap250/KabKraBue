# KabKraBue 2.0 — Work Items

Status distinguishes the application source on `main` from the live Production alias. `main` is at `682e3492a8c0405b9f69f5df19c562ef822cef56`; PR #2 changed documentation only, so its application source is the PR #1 implementation at `43eb9bc1f5ffe32fc4822ad976f7254aefa3f2af`. Before this documentation update is pushed, Vercel Production was manually promoted to the existing deployment built from baseline `5a7c5058d7535327585f5420d9000a35bee05418` (deployment `AMtk4AdgBevAKQmuYM7XsbDa7Dx4`). A new commit on `main` may trigger Vercel to deploy the current `main` application source and supersede that rollback. The implementation checklist below describes the PR #1 source, not necessarily the version currently served by Production.

## 1. Secure static build — COMPLETE; dependency follow-up OPEN

- [x] Start from main SHA `5a7c5058d7535327585f5420d9000a35bee05418`; the resulting implementation was merged in PR #1.
- [x] Keep `output: "export"` and static-only routes; no Next.js server runtime required.
- [x] Update Next.js and `eslint-config-next` to 15.5.29; keep React 18 and avoid a major Next.js upgrade.
- [x] Keep package manifest/lockfile aligned; clean install, lint, TypeScript and build passed for the implementation.
- [x] Fix the Hero clock to use post-hydration real `Asia/Bangkok` time and update once per minute; build-time year prevents SSR/client mismatch.
- [ ] Review 6 moderate `npm audit` findings in the ESLint/TypeScript-ESLint/minimatch dependency chain. Current audit shows no high/critical findings and `fixAvailable: true`, but a fresh `npm audit fix --dry-run` left the findings and emitted peer warnings; assess a compatible fix in a separate code change without `--force`.

## 2. Editorial experience — COMPLETE

- [x] Preserve real village content and rice/ink/paddy/clay/gold/mist identity while improving responsive media and content visibility.
- [x] Hero uses a landscape still on desktop and the original portrait poster on mobile; Thailand clock, clear CTAs, responsive layout and reduced-motion fallback remain.
- [x] Preserve story sections, navigation, social/contact, privacy, map, copyright and section anchors.
- [x] Rename People imagery to truthful “Place & Memory” framing; do not invent history, culture, people or coordinates.
- [x] Confirm reduced-motion mode does not strand story/gallery/explore reveal wrappers at opacity zero.

## 3. Media and performance — COMPLETE

- [x] YouTube Shorts remain thumbnail-first; initial page has no YouTube iframe, one appears only after the user presses play. IDs/CTAs are preserved.
- [x] Optional video showcase stays hidden with no real entries; no placeholder videos added.
- [x] Story videos use `preload="none"`, begin in view, pause offscreen, and only one story video plays at a time. Service worker does not cache video files.
- [x] Keep original nature video; use separate 720×306 optimized copy after sample-frame comparison.
- [x] Keep below-fold assets lazy/sized and Hero WebM small; reduce scroll-state work.

## 4. PWA and static paths — COMPLETE

- [x] Verify generated manifest, icons, service-worker registration/scope, cache namespace and offline navigation on root and `/KabKraBue/` static exports.
- [x] Worker deletes only `kabkrabue-*` caches, is scoped to the app path, and skips video/Range requests.
- [x] Browser-test Vercel/root paths and GitHub Pages basePath paths for manifest, poster, privacy route and worker.
- [x] Preserve static export and root-hosted deployment behavior.

## 5. Accessibility and responsive interactions — COMPLETE

- [x] Support 360, 390, 768, 1024 and 1440 px widths; browser checks found no horizontal page overflow.
- [x] Mobile navigation, Gallery Lightbox and PWA help dialog have keyboard focus management, Escape close and focus restoration.
- [x] Gallery arrows work; only categories with real images are shown; no empty People filter. Map iframe has an accessible title; controls have names.
- [x] Test both normal and reduced-motion browser preferences; Story and Explore content remains visible.

## 6. Content, SEO, map and privacy — COMPLETE; owner confirmation OPEN

- [x] Preserve the `src/data/` content architecture; verify anchor/image paths.
- [x] Preserve route titles/canonicals/OG/Twitter, robots, sitemap, JSON-LD, address/coordinates, icons and manifest.
- [x] Privacy disclosures match YouTube click-to-load, OpenStreetMap, external links and PWA caching.
- [x] Verify production Home and Privacy routes respond after the merge.
- [ ] Confirm the existing location/address/coordinates with the site owner; the implementation preserved them but did not independently revalidate their accuracy.

## 7. Architecture and handoff — COMPLETE

- [x] Reuse existing components; only remove the obsolete public manifest after confirming no remaining references; replace with the Next-generated static manifest route.
- [x] Expand README with project structure, setup/build/deploy, images/video, PWA/cache and design tokens.
- [x] Add audit report, work plan, TODO and Before/After screenshots.

## 8. Main / Production delivery status

- `main` was at `682e3492a8c0405b9f69f5df19c562ef822cef56` before this update. PR #2 (`https://github.com/Santipap250/KabKraBue/pull/2`) merged as that commit and changed only `TODO.md` and `docs/PROJECT_AUDIT.md`; it did not alter application source.
- PR #1 application code is the first-parent source at `43eb9bc1f5ffe32fc4822ad976f7254aefa3f2af`; its Vercel Production deployment completed successfully at `https://kab-kra-oopf7zs0y-obixconfig.vercel.app/`.
- On 2026-11-12, the user requested rollback of the Production alias to Vercel deployment `AMtk4AdgBevAKQmuYM7XsbDa7Dx4`, built from commit `5a7c5058d7535327585f5420d9000a35bee05418`. Vercel confirmed promotion; the deployment page showed `kab-kra-bue.vercel.app` as Current, and Home and Privacy returned HTTP 200 afterward.
- This documentation update is authorized for `main`. Because pushes to `main` trigger Vercel Production deployments in this project, verify the deployment status after pushing; the new deployment can supersede the manual rollback while still using PR #1 application source.
- Preview page-level QA remains distinct from Production QA; do not claim it based only on a Ready status or URL.
- The old side-branch documentation commit `1da43b38549208f1bdd11d313d1400fee7b5b16a` is not the current `main` source of truth.

## 9. Final verification

- [x] `npm ci`, `npm run lint`, `npx tsc --noEmit`, root `npm run build` and `GITHUB_PAGES=true npm run build` passed for the merged implementation.
- [x] Inspect `out/` files; check root/basePath assets and routes, hydration, YouTube click-to-load, PWA shell/offline, and browser console.
- [x] Test mobile navigation, filters/lightbox, Shorts, no-video state, map/directions, install dialog, story video play/pause, and responsive widths where browser tooling permits.
- [ ] Lighthouse was not run in this environment; record as untested rather than inferred.
