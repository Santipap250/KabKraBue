# KabKraBue 2.0 — Implementation Plan

## Scope and constraints

Continue from the existing Next.js App Router project and current content/assets. Work only on a new feature branch based on the verified current `main` commit `72583c51e026becffe8525d17926d9939e738b06`; do not push to `main`, merge, promote or otherwise change Production. Keep `output: "export"`, Vercel compatibility, original media, existing YouTube IDs/social links/contact and public content. Do not redesign, change the palette, add sections, invent village facts, or remove original media. Validate root and `/KabKraBue/` behavior before claiming it works.

Current starting point for this follow-up: `main` SHA `72583c51e026becffe8525d17926d9939e738b06` (PR #3 merge).

## Implementation approach

1. Correct only the verified Thai typo in `src/data/village.ts`; inspect nearby Thai/English copy and change no other wording unless a definite typo is found.
2. Update `ScrollToTop` so activation uses `smooth` normally and `auto` when `prefers-reduced-motion: reduce`; preserve SSR-safe initial rendering, visibility, keyboard access and hidden-state behavior.
3. Bound dynamic service-worker cache entries while retaining the app shell/offline Privacy route, deleting only obsolete KabKraBue caches, and never caching media/range requests. Verify cache version migration and root/basePath scope.
4. Correct stale audit/TODO/README/plan status and label evidence with the date and source commit tested; preserve useful historical records and distinguish PR #3 source, current main, current Production evidence and remaining work.
5. Inspect remaining accessibility and performance behavior using the available browser; run axe/Lighthouse only if already available without adding a large dependency. Run fresh security, lint, typecheck, root/basePath builds and targeted browser checks. Record limits honestly.
6. Commit and push only the new feature branch, create a PR to `main`, and report its checks and Preview status. Do not merge, promote, or change Production.

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

## PR #3 implementation — merged 2026-11-12

PR #3 (`manus/kabkrabue-final-polish`) merged into `main` as `72583c51e026becffe8525d17926d9939e738b06`. Its CI completed successfully for `56fc511ddf488c0664cce7bee034154c309d9510`. Current hardening work is on `manus/kabkrabue-final-hardening`, based directly on that merged SHA; do not merge or change Production as part of this task.
