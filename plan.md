# KabKraBue 2.0 — Implementation Plan

## Scope and constraints

Continue from the existing Next.js App Router project and its current content/assets. Work only on `manus/kabkrabue-premium-upgrade`; do not merge into `main`, change production, or invent village history, people, location data, coordinates, or video records. Keep `output: "export"`, Vercel compatibility, the original media, existing YouTube IDs, and the current public content. Validate any path/basePath behavior before claiming GitHub Pages support.

Current starting point: `main` SHA `5a7c5058d7535327585f5420d9000a35bee05418`.

## Implementation approach

1. Patch Next.js and aligned framework packages to the current secure maintenance release without a major-version upgrade. Resolve transitive audit findings where semver-compatible and verify with `npm ci`, `npm audit`, lint, TypeScript, build, and exported files.
2. Preserve the current editorial site architecture. Improve its shared design tokens, typography rhythm, hero clock, media loading, mobile navigation, gallery filtering/lightbox, PWA cache boundaries, metadata, privacy disclosure, and documentation where audit evidence shows defects.
3. Centralize internal static paths so root-hosted Vercel and a tested project `basePath` produce working assets, icons, manifest, service-worker scope, and privacy navigation. Preserve accurate canonical metadata for the production origin.
4. Keep YouTube embeds click-to-load, videos outside service-worker caches, real video IDs/content intact, and optimized media as separate files so originals remain available. Reduce offscreen video work and prefer an efficient supported source.
5. Commit in meaningful units on the working branch, inspect diffs, push only this branch, open a PR if GitHub authorizes it, and verify a Vercel preview only if the linked project automatically creates one. Never merge or promote to production.

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

## Current audit baseline

- Latest `main` and branch starting SHA: `5a7c5058d7535327585f5420d9000a35bee05418`.
- `npm ci`, `npm run lint`, `npx tsc --noEmit`, and `npm run build` passed on the starting tree; Next produced static routes including `/`, `/privacy`, `/robots.txt`, and `/sitemap.xml`.
- Baseline `npm audit`: 12 findings (7 moderate, 4 high, 1 critical). Official Next.js November 2026 release identifies `15.5.29` as the Maintenance LTS security release; installed Next.js was `15.5.25`.
- Confirmed source risks include the Hero clock using render-time `new Date()` and one-second updates, empty gallery filters, missing dialog focus management, service-worker activation deleting every origin cache, hard-coded root paths that need testing under `basePath`, and incomplete privacy disclosure for map/thumbnail/cache behavior.
- Video inventory was checked with `ffprobe`; originals will not be overwritten. No broken referenced image/video assets was confirmed by the first source check, but generated export URLs still require validation.

## Implementation status — 2026-11-12

Code changes and QA are complete on `manus/kabkrabue-premium-upgrade`. `npm ci`, lint, TypeScript, root static build, GitHub Pages static build, responsive/browser interactions, PWA offline and media loading checks pass. The final audit still reports six moderate development-tooling dependency findings (zero high/critical); see `docs/PROJECT_AUDIT.md`. The next step is push/PR and verify the automatically generated Vercel deployment through GitHub checks. Do not merge or promote to production.
