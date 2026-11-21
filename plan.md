# KabKraBue — Comprehensive Quality Pass Plan

## Current scope and constraints

- Integration base: `origin/main` at `bfdcfa7a51f3c8f0d23772d467b7ff9eb7b4d787`; main was updated after this pass was first committed, so the unpushed feature branch was rebased and its Hero reconciliation preserves the latest `NewYearClock` component/design.
- Working branch: `manus/kabkrabue-full-quality-pass`. Deliver through a feature branch and pull request only; do not push directly to `main`, merge, promote, or modify Production.
- Goal: resolve source-confirmed accessibility, image-delivery, and not-found metadata defects; reduce responsive edge-case risk; strengthen static-export checks; record remaining items that require owner, hosting, device, or screen-reader evidence.
- Preserve the actual village text, contact and location data, social links, all original image/video files, route/anchor IDs, Thai/English copy, current page structure, PWA scope, and existing accessibility wins.
- No production deployment or live-host verification is included in this pass. Unverified real-world values and hosting behavior must not be guessed.

## Design read and decisions

- **Artifact/audience:** bilingual editorial village website for visitors on mobile and desktop, including keyboard and assistive-technology users.
- **Visual language/mode:** Quiet Luxury × Cinematic Editorial × Thai Village Heritage; Redesign · Preserve.
- **Five dials:** visual variance 1/10; motion intensity 3/10; information density 3/10; asset dependence 9/10; brand fidelity 10/10.
- **Positioning:** Hero is the cinematic entry; most visits are mobile at close viewing distance; visual temperature remains warm, grounded, and unhurried; layouts must expand rather than clip on short screens.
- **Design system:** retain rice/ink/paddy/clay/gold/mist tokens; Fraunces display, IBM Plex Sans Thai body, and IBM Plex Mono metadata; retain current spacing, radii, shadows, terrace-line motif, media crops, countdown, and restrained motion. Add no new hue, decorative content, or fabricated village claim.
- **Interaction:** preserve navigation, gallery/filter/lightbox, story carousel, install help, map, privacy, and service-worker behavior. Improve language metadata and focus visibility without changing the visible copy.

## Implementation approach

1. Add `lang` attributes to existing English UI/content segments while keeping Thai as the document language and preserving every visible phrase.
2. Replace the one-color global focus outline with a high-contrast dual-color indicator that remains visible on both light and dark surfaces.
3. Keep canonical and Open Graph URLs route-specific; ensure the static not-found document does not identify itself as the home page and is not indexable.
4. Add static-host-compatible responsive WebP image candidates for local editorial photos. Preserve every original, never crop or upscale, keep a full-resolution fallback, and ensure URLs work at root and `/KabKraBue/`.
5. Repair only evidenced short-viewport layout risks (Hero and mobile menu) with flow/scroll behavior that leaves all primary controls reachable; add a subtle mobile gallery-filter affordance if it remains consistent with the current system.
6. Add deterministic post-build assertions for required static-export routes and local asset/basePath references in both CI build modes.
7. Update README, TODO, and audit records to distinguish source-confirmed fixes from items requiring owner or live-device evidence.

## Project structure

- `src/app/`: Home/Privacy/not-found pages, metadata, manifest, sitemap, and robots.
- `src/components/`: navigation, gallery/lightbox, media, PWA/install, map, and shared UI.
- `src/sections/`: Hero and editorial village sections.
- `src/data/`: site, village, gallery, explore, shorts, videos, and event content.
- `src/hooks/`, `src/lib/`: interaction hooks, path helpers, and shared logic.
- `src/styles/`: local fonts, design tokens, and global styles.
- `public/images/`, `public/videos/`, `public/icons/`, `public/sw.js`: original visual media, icons, and service worker.
- `.github/workflows/`, `scripts/`, and `docs/`: CI, deterministic image/export utilities, and audit/QA records.

## Boundaries requiring external confirmation

- Do not alter village coordinates or address until a village representative confirms them.
- Do not remove/archive `public/videos/nature-section.mp4` until direct-URL and external-consumer use is ruled out; preserve both original and optimized clips.
- Do not claim or change deployed security headers without confirming the serving host and its policy.
- Do not broaden the promised offline experience or change worker precache semantics without browser/profile testing and an agreed support target.
- Source inspection does not establish screen-reader, physical-device, visual-contrast-on-gradients, Lighthouse, field-data, or production results.


## Follow-on task — Celestial Timepiece and signature identity (2026-11-20)

### Current base and constraints

- The latest inspected `origin/main` is `4fd6bb489069b9fc766ad80d21d9aa595a5213f5` (merge of PR #11, which already includes the preceding logo refresh). The supplied ZIP is older than this live repository and is used as source material, not as a full-project replacement.
- Work is isolated on `manus/kabkrabue-celestial-signature`, based on that SHA. Do not commit to `main`, merge, change domains, or promote/replace Production.
- The current `Hero.tsx`, its responsive poster/video fallback, reduced-motion/data-saver gating, site configuration, editorial content, routes, PWA/offline worker behavior, and accessibility improvements are protected. Reconcile only the bounded clock/brand surfaces.
- Do not change community copy, address, coordinates, contact details, social links, story/gallery/shorts data, source photos/videos, site palette, SEO intent, static export, Vercel root hosting, or `/KabKraBue/` basePath.

### Design and implementation decisions

- Mode: **Extension + Redesign · Preserve**. The supplied celestial identity defines the requested look; the existing Quiet Luxury × Cinematic Editorial × Thai Village Heritage system remains the site-wide language. Keep the clock visually compact and subordinate to the village Hero.
- Retain the local Fraunces, IBM Plex Sans Thai, and IBM Plex Mono fonts. Use the supplied SVG mark as an actual image asset and keep both wordmark lines as selectable HTML text. Do not add a network font request or runtime dependency.
- Add a client `CelestialTimepiece` with deterministic decorative geometry and pure calculation/formatting helpers in `src/lib/celestial-time.ts`. Time uses explicit `Asia/Bangkok`; server and first-client output are stable placeholders until hydration. Align one timer to second boundaries, suspend it when the page is hidden/offscreen, and resynchronize on visibility/entry.
- Render the time readout independently from a small native activation button. The readout remains available when motion is disabled; reduced motion and the existing Hero data-saver decision gate every decorative animation and pointer response. No disabled/dead activation control is rendered.
- Add layered SVG/CSS orbits, deterministic starfield, infrequent shooting-star and glass-sweep effects, restrained nebula, and a short touch/mouse/keyboard-triggerable light wave. Highlight the final 60 seconds and a short New Year midnight interval without delaying next-year retargeting.
- Replace only the shared brand component's source/markup and its Header, MobileMenu, and Footer sizing/tone props. Update icon metadata, true PWA maskable assets, manifest URLs, app-shell precache and worker cache namespace to `kabkrabue-v7`; all local paths use `withBasePath()` where runtime/build paths require it.
- Add boundary tests without a new package, wire them into the existing PR quality workflow, and extend the existing export verifier rather than replacing the build system.

### Project structure for this follow-on

- `src/components/CelestialTimepiece.tsx` and `.module.css`: compact Hero timepiece, accessible live time readout, action, and motion styling.
- `src/lib/celestial-time.ts`: pure explicit-time-zone date, year-boundary, countdown, and progress calculations.
- `src/components/BrandLogo.tsx` and `.module.css`: reusable real SVG asset + text wordmark for header/mobile/footer.
- `src/app/layout.tsx`, `src/app/manifest.ts`, `public/icons/`, `public/favicon/`, and `public/sw.js`: icon metadata, PWA resources, and versioned app-shell caching.
- `scripts/verify-celestial-clock.cjs` and `.github/workflows/quality.yml`: dependency-free calculation tests included in PR CI.
- `README.md`, `TODO.md`, `docs/PROJECT_AUDIT.md`, and `docs/brand/BRAND-SYSTEM.md`: architecture, verified evidence, limitations, and visual identity.

### Delivery boundary

- Deliver on the feature branch through a review PR only. A Vercel Preview counts as available only after GitHub/Vercel reports an actual deployment URL and status. If Preview cannot be created or checked, state the blocker. Do not merge or promote Production.


## Follow-on — Hero Butterfly Wordmark (approved 2026-11-21)

- **Base and delivery:** `origin/main` at `a51bd8da98c1e51b762270aa67c729f6fba2d585`; isolated branch `manus/kabkrabue-butterfly-wordmark`. Deliver on a review branch/PR; do not merge, promote, or change Production without separate authorization.
- **Design read:** homepage Hero wordmark for village visitors; warm twilight editorial language; **Extension** of the existing interface. Dials: variance 1, motion 4, density 1, asset dependence 1, brand fidelity 10.
- **Visual system:** retain the existing rice/ink/paddy/clay/gold palette, Fraunces display wordmark, Hero layout, contrast, and text. Add two small ivory/gold butterflies with slow, staggered curved flight around (not across/over) “KabKraBue”; keep glow restrained and subordinate to the wordmark.
- **Implementation:** isolated SVG/CSS component, transform/opacity-only loops, no external image/font requests or new runtime dependency. Reuse the existing Hero `motionEnabled` decision; render a still decorative state when reduced motion or Data Saver disables movement. Keep the heading text selectable and screen-reader output unchanged; effect is decorative and `aria-hidden`.
- **Protected contracts:** preserve the wordmark text, logo assets, Hero video/poster, layout, navigation, responsive behavior, static export, basePath, and Service Worker behavior. No production deployment/config changes.
