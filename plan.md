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
