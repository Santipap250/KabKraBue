# KabKraBue 2.0 — Implementation Plan

## Scope and constraints

Continue from the existing Next.js App Router project and its current content/assets. Work only on `manus/kabkrabue-final-polish`, based on the current `main`; do not merge into `main`, change Production, or invent village history, people, location data, coordinates, or video records. Keep `output: "export"`, Vercel compatibility, the original media, existing YouTube IDs, and the current public content. Validate any path/basePath behavior before claiming GitHub Pages support.

Current starting point for this follow-up: `main` SHA `a92a60739ec325366aa0dea77f334636258e4b15`.

## Implementation approach

1. Patch Next.js and aligned framework packages to the current secure maintenance release without a major-version upgrade. Resolve transitive audit findings where semver-compatible and verify with `npm ci`, `npm audit`, lint, TypeScript, build, and exported files.
2. Preserve the current editorial site architecture. Improve its shared design tokens, typography rhythm, hero clock, media loading, mobile navigation, gallery filtering/lightbox, PWA cache boundaries, metadata, privacy disclosure, and documentation where audit evidence shows defects.
3. Centralize internal static paths so root-hosted Vercel and a tested project `basePath` produce working assets, icons, manifest, service-worker scope, and privacy navigation. Preserve accurate canonical metadata for the production origin.
4. Keep YouTube embeds click-to-load, videos outside service-worker caches, real video IDs/content intact, and optimized media as separate files so originals remain available. Reduce offscreen video work and prefer an efficient supported source.
5. Commit the verified follow-up on this feature branch, push only this branch, and open a PR against `main`. Do not merge, promote, or deploy to Production; a Vercel Preview is separate from Production and must not be reported as page-tested unless actually verified.

## Project structure

- `src/app/`: static App Router pages, metadata, robots and sitemap.
- `src/components/`: reusable navigation, gallery, media, PWA, map, UI and footer components.
- `src/sections/`: homepage hero and editorial story sections.
- `src/data/`: site configuration and village, gallery, explore, short, video and event content.
- `src/hooks/`, `src/lib/`: browser interaction hooks and shared utilities.
- `src/styles/`: global design tokens and styles.
- `public/images/`, `public/videos/`, `public/icons/`, `public/sw.js`: static media and PWA files.

## Design direction

**Quiet Luxury × Cinematic Editorial × Thai Village Heritage.** Preserve the existing rice/ink/paddy/clay palette and terrace-line motif, using gold sparingly. Keep an editorial, image-led composition with generous but mobile-conscious spacing, restrained transitions, legible Thai body type, and clear bilingual hierarchy. Display typography uses Fraunces; Thai body text uses IBM Plex Sans Thai; metadata uses IBM Plex Mono. Brand essence: a calm, image-led introduction to KabKraBue for people discovering or remembering the village; grounded, reflective, welcoming. Voice: specific and warm rather than promotional. Wordmark stays text-led with the existing name and Thai identity; no invented emblem or fabricated heritage symbol.

## Historical audit baseline before PR #1 implementation

- Latest `main` and branch starting SHA: `5a7c5058d7535327585f5420d9000a35bee05418`.
- `npm ci`, `npm run lint`, `npx tsc --noEmit`, and `npm run build` passed on the starting tree; Next produced static routes including `/`, `/privacy`, `/robots.txt`, and `/sitemap.xml`.
- Baseline `npm audit`: 12 findings (7 moderate, 4 high, 1 critical). Official Next.js November 2026 release identifies `15.5.29` as the Maintenance LTS security release; installed Next.js was `15.5.25`.
- Confirmed source risks include the Hero clock using render-time `new Date()` and one-second updates, empty gallery filters, missing dialog focus management, service-worker activation deleting every origin cache, hard-coded root paths that need testing under `basePath`, and incomplete privacy disclosure for map/thumbnail/cache behavior.
- Video inventory was checked with `ffprobe`; originals will not be overwritten. No broken referenced image/video assets was confirmed by the first source check, but generated export URLs still require validation.

## PR #1 implementation status — 2026-11-11

Code changes and QA for PR #1 were completed on `manus/kabkrabue-premium-upgrade` and merged; their audit state is historical and recorded in `docs/PROJECT_AUDIT.md`.

## Premium polish follow-up — 2026-11-12

The current work is isolated on `manus/kabkrabue-final-polish`, branched from `a92a607`. Scope: remove focusability from hidden controls, make nested dialog focus traps topmost-only, pause Hero media when offscreen or Data Saver/reduced motion applies, correct verified contrast/touch-target defects, use the existing story video frame variant, refresh mutable assets/offline Privacy in the service worker, remediate the minimatch advisory with a scoped override, and add read-only GitHub Actions quality checks. Run full audit/lint/typecheck/root+basePath builds and static-export browser smoke tests before opening a PR; do not merge or deploy.
