# KabKraBue 2.0 — Work Items

Status reflects tests performed on `manus/kabkrabue-premium-upgrade`. `main` and production remain untouched. Refer to [`docs/PROJECT_AUDIT.md`](docs/PROJECT_AUDIT.md) for evidence and [`docs/SCREENSHOTS.md`](docs/SCREENSHOTS.md) for visual captures.

## 1. Secure static build — COMPLETE

- [x] Fetch latest `main` and record SHA `5a7c5058d7535327585f5420d9000a35bee05418`; branch work is based on that SHA.
- [x] Keep `output: "export"` and static-only routes; no Next.js server runtime required.
- [x] Update Next.js and `eslint-config-next` to 15.5.29; keep React 18 and avoid a major Next.js upgrade.
- [x] Keep package manifest/lockfile aligned; clean install, lint, TypeScript and build pass.
- [x] Fix the Hero clock to use post-hydration real `Asia/Bangkok` time and update once per minute; build-time year prevents SSR/client mismatch.
- [ ] Revisit 6 moderate `npm audit` findings in the ESLint/TypeScript-ESLint/minimatch dependency chain when a compatible patched toolchain is available. Current audit has no high/critical findings; do not claim zero audit findings.

## 2. Editorial experience — COMPLETE

- [x] Preserve real village content and rice/ink/paddy/clay/gold/mist identity while improving responsive media and content visibility.
- [x] Hero uses a sharper landscape still on desktop and the original portrait poster on mobile; Thailand clock, clear CTAs, responsive layout and reduced-motion fallback remain.
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

## 6. Content, SEO, map and privacy — COMPLETE

- [x] Preserve the `src/data/` content architecture; verify anchor/image paths.
- [x] Preserve route titles/canonicals/OG/Twitter, robots, sitemap, JSON-LD, address/coordinates, icons and manifest.
- [x] Privacy disclosures match YouTube click-to-load, OpenStreetMap, external links and PWA caching.
- [x] Test Home, Privacy, 404 output, map/directions and install UI.

## 7. Architecture and handoff — COMPLETE

- [x] Reuse existing components; only remove the obsolete public manifest after confirming no remaining references; replace with the Next-generated static manifest route.
- [x] Expand README with project structure, setup/build/deploy, images/video, PWA/cache and design tokens.
- [x] Add audit report, work plan, TODO and Before/After screenshots.

## 8. Pull request / preview — OPEN; preview is protected

- [x] Work on `manus/kabkrabue-premium-upgrade`; verify latest `origin/main` still matches the recorded base SHA.
- [x] Create meaningful commits, push only the feature branch, and open [PR #1](https://github.com/Santipap250/KabKraBue/pull/1) to `main`.
- [x] Verify Vercel Preview URL and GitHub checks: deployment `success`; 2 checks successful, 0 failing and 0 pending at the time checked. Preview URL: https://kab-kra-bue-git-manus-kabkrabue-premium-upgrade-obixconfig.vercel.app/ .
- [ ] Page-level Preview verification remains blocked: unauthenticated browser shows `Login – Vercel` and a 403 asset response. User/reviewer with Vercel project access must sign in to confirm content. Vercel MCP OAuth returned no token in this session.
- [x] Do not merge, promote, or change production without explicit authorization.

## 9. Final verification

- [x] `npm ci`, `npm run lint`, `npx tsc --noEmit`, root `npm run build` and `GITHUB_PAGES=true npm run build` pass.
- [x] Inspect `out/` files; check root/basePath assets and routes, hydration, YouTube click-to-load, PWA shell/offline, and browser console.
- [x] Test mobile navigation, filters/lightbox, Shorts, no-video state, map/directions, install dialog, story video play/pause, and responsive widths where browser tooling permits.
- [ ] Lighthouse was not run in this environment; record as untested rather than inferred.
