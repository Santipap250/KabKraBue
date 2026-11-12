# KabKraBue — Accessibility Follow-up Plan

## Scope and constraints

Continue the existing Next.js App Router project from current `main` SHA `662d0e95bf599228c851eb08422a0e26b34cf98f` (PR #4 merge). Keep static export, Vercel compatibility, root/`/KabKraBue/` support, the established palette/design, village content and original media. Make only confirmed accessibility corrections; do not change palette values, invent captions/content, add large dependencies, or bypass review through a direct `main` push. Deliver the follow-up via a separate PR; do not merge, promote or otherwise change Production.

PR #4 was merged by repository account `Santipap250` at `2026-11-12T00:17:04Z` while the previous QA run was in progress. GitHub records a successful Production deployment for merge SHA `662d0e9`; that event was not initiated by Manus. This follow-up branch therefore starts from the post-merge main SHA.

## Current implementation approach

1. Use already installed `axe-core` 4.13.0 to check Home and Privacy on the static export. Fix only the four confirmed low-contrast text nodes, using existing palette colors and changing no palette values.
2. Keep the PR #4 content/PWA fixes unchanged. Review the axe `incomplete` items as open manual checks: gradient backgrounds and caption availability of Story videos. Do not create captions by guessing.
3. Because an open PR caused both `push manus/**` and `pull_request` workflows to run the full builds concurrently, remove the redundant feature-branch push trigger; keep PR events as the check path and retain all build steps.
4. Record exact source SHA, local clean-install/security/lint/typecheck/root/basePath builds, static route results, axe counts, Chromium performance methodology, Production evidence, CI trigger change and limitations in `TODO.md` and `docs/PROJECT_AUDIT.md`.
5. PR [#5](https://github.com/Santipap250/KabKraBue/pull/5) is open from `manus/kabkrabue-axe-contrast-followup` to `main`; report its current GitHub CI and Vercel Preview state. Do not merge or touch Production.

Current branch: `manus/kabkrabue-axe-contrast-followup`, based on `662d0e95bf599228c851eb08422a0e26b34cf98f`. Source commit: `929b008b1a6af390f95caf7199581e0f1338b164`. PR #5 is open and review-only; do not merge or promote it.

## Project structure

- `src/app/`: static App Router pages, metadata, robots and sitemap.
- `src/components/`: navigation, Gallery, media, PWA, map, shared UI and Footer.
- `src/sections/`: Hero and editorial village content.
- `src/data/`: site configuration and village/gallery/explore/short/video data.
- `src/hooks/`, `src/lib/`: interaction hooks and shared utilities.
- `src/styles/`: global design tokens and styles.
- `public/images/`, `public/videos/`, `public/icons/`, `public/sw.js`: static media and PWA worker.

## Design direction (preserve existing)

**Quiet Luxury × Cinematic Editorial × Thai Village Heritage.** Preserve the rice/ink/paddy/clay palette and terrace-line motif, with gold used sparingly. Retain the editorial, image-led composition, responsive spacing, restrained motion, legible Thai body text, and bilingual hierarchy. Display typography uses Fraunces; Thai body text uses IBM Plex Sans Thai; metadata uses IBM Plex Mono. Keep the village voice specific, warm and grounded; add no fabricated symbol, history or cultural claim.

## Historical baselines

- PR #1 started from `5a7c5058d7535327585f5420d9000a35bee05418`; it upgraded the static application, media behavior, SEO, privacy disclosure and baseline accessibility.
- PR #3 merged as `72583c51e026becffe8525d17926d9939e738b06` from `56fc511ddf488c0664cce7bee034154c309d9510`, with CI and targeted browser checks passing.
- PR #4 merged as `662d0e95bf599228c851eb08422a0e26b34cf98f` from `8c4ce1fe2f75572fcba1b05bb96fe2c3793a3088`; it corrected ScrollToTop reduced-motion behavior, bounded service-worker dynamic cache, fixed a verified typo and updated documentation. Its CI passed.
- PR #4 Production deployment status is read-only evidence only; this follow-up is not authorized to change it.
