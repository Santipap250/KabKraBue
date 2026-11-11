# KabKraBue 2.0 — Implementation Plan

## Scope and constraints

Continue from the existing Next.js App Router project and its current content/assets. Work only on `manus/kabkrabue-premium-upgrade`; do not merge into `main`, change production, or invent village history, people, location data, coordinates, or video records. Keep `output: "export"`, Vercel compatibility, original media and existing YouTube IDs. Validate `basePath` behavior before claiming GitHub Pages support.

Starting/latest `main` SHA: `5a7c5058d7535327585f5420d9000a35bee05418`.

## Implementation approach

1. Patch Next.js and aligned framework packages to a current secure maintenance release without a major-version upgrade. Resolve transitive audit findings where compatibility allows; verify with clean install, audit, lint, TypeScript, build and exported files.
2. Preserve the editorial site architecture while improving media loading, Hero clock, mobile navigation, gallery filtering/lightbox, PWA cache boundaries, metadata, privacy disclosures and documentation where audit evidence shows issues.
3. Centralize internal static paths so root-hosted Vercel and tested project `basePath` produce working assets, icons, manifest, service-worker scope and privacy navigation. Preserve accurate canonical metadata.
4. Keep YouTube embeds click-to-load, videos outside service-worker caches, real video IDs/content intact, originals untouched and optimized media separate. Reduce offscreen video work.
5. Commit in meaningful units, inspect diffs, push only the feature branch, open a PR and verify Vercel status/Preview through GitHub. Never merge or promote to production.

## Project structure

- `src/app/`: static App Router pages, metadata, manifest, robots and sitemap.
- `src/components/`: navigation, gallery, media, PWA, map, UI and footer.
- `src/sections/`: Hero and editorial story sections.
- `src/data/`: site configuration and village, gallery, explore, Shorts, video and event content.
- `src/hooks/`, `src/lib/`: browser interaction hooks and shared utilities.
- `src/styles/`, `tailwind.config.ts`: design tokens, typography and global styles.
- `public/images/`, `public/videos/`, `public/icons/`, `public/sw.js`: static media and PWA files.
- `docs/`: project audit, QA and Before/After screenshots.

## Design direction

**Quiet Luxury × Cinematic Editorial × Thai Village Heritage.** Preserve the rice/ink/paddy/clay palette and terrace motif; use gold sparingly. Keep editorial image-led compositions, generous but mobile-conscious spacing, restrained transitions, legible Thai body type and a clear bilingual hierarchy. Display typography uses Fraunces; Thai body text uses IBM Plex Sans Thai; metadata uses IBM Plex Mono. Keep the voice specific, warm and grounded; do not invent emblems or heritage symbols.

## Starting audit baseline

- `npm ci`, lint, TypeScript and root static build passed on the starting tree; Next.js exported Home, Privacy, robots and sitemap.
- Baseline `npm audit`: 12 findings (7 moderate, 4 high, 1 critical); installed Next.js was 15.5.25. Official November 2026 Next.js security release selected 15.5.29 for the patched 15.x line.
- Confirmed issues included render-time Hero clock/one-second updates, empty gallery filters, missing dialog focus management, service-worker activation deleting all origin caches, untested root paths under `basePath`, and incomplete third-party privacy disclosure.
- Media inventory used `ffprobe`; originals were preserved. Initial referenced asset scan found no broken image/video paths; generated export URLs still needed browser verification.

## Implementation and QA status — 2026-11-12

Code changes are complete on `manus/kabkrabue-premium-upgrade`. `npm ci`, lint, TypeScript, root static build, GitHub Pages static build, responsive/browser interactions, PWA offline and media-loading checks pass. Final `npm audit` reports 6 moderate development-tooling findings (0 high/critical); see `docs/PROJECT_AUDIT.md`.

[PR #1](https://github.com/Santipap250/KabKraBue/pull/1) is open and mergeable. Vercel’s GitHub check reports deployment success and the Preview URL is https://kab-kra-bue-git-manus-kabkrabue-premium-upgrade-obixconfig.vercel.app/ . An unauthenticated browser is shown `Login – Vercel` with a 403 asset response, so actual hosted content still requires a user/reviewer Vercel session. Do not merge or promote to production without explicit authorization.
