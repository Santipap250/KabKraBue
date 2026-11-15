# KabKraBue — Post-merge Status Documentation Plan

## Scope and constraints

Current `main` is `b0a2ade1fa5d04c03253eb55fc72fb707137e36e`, the owner-merged PR #5 commit. This branch, `manus/kabkrabue-postmerge-status`, starts from that exact SHA and changes documentation only. Preserve the application's static export, Vercel compatibility, root/`/KabKraBue/` support, established design/palette, village content and original media. Do not make application changes, push directly to `main`, merge a PR, promote a deployment or alter Production.

PR #5 was merged by repository owner `Santipap250` at `2026-11-12T10:34:41Z`; GitHub records Production deployment `7734790604` as successful. That merge/deployment was not initiated by Manus. Current public alias endpoint checks were read-only and returned HTTP 200 for Home, Privacy, `sw.js`, and the manifest.

## Current implementation approach

1. Reconcile `TODO.md`, `docs/PROJECT_AUDIT.md`, and this plan with current `main`, PR #5's merge, the final PR-only CI run, and current Production evidence.
2. Update the README's CI note to specify that pull requests targeting `main` run the checks and branch updates on an open PR use the PR workflow; the redundant feature-branch push trigger was removed.
3. Preserve distinction between completed automated checks and remaining manual work: gradient contrast sampling, Story-video audio/caption review, screen-reader/real-device checks, Lighthouse/field data, and toolchain lifecycle follow-ups.
4. Commit and deliver these documentation-only corrections through a separate review-only PR. Keep `main` and Production untouched; do not merge or promote.

## Project structure

- `src/app/`: static App Router pages, metadata, robots and sitemap.
- `src/components/`: navigation, Gallery/lightbox, media, PWA, map, shared UI and Footer.
- `src/sections/`: Hero and editorial village content.
- `src/data/`: site configuration and village/gallery/explore/short/video data.
- `src/hooks/`, `src/lib/`: interaction hooks and shared utilities.
- `src/styles/`: global design tokens and styles.
- `public/images/`, `public/videos/`, `public/icons/`, `public/sw.js`: static media and PWA worker.
- `docs/`: audit, QA and supporting documentation.

## Design direction (preserve existing)

**Quiet Luxury × Cinematic Editorial × Thai Village Heritage.** Preserve the rice/ink/paddy/clay palette and terrace-line motif, with gold used sparingly. Retain the editorial, image-led composition, responsive spacing, restrained motion, legible Thai body text, and bilingual hierarchy. Display typography uses Fraunces; Thai body text uses IBM Plex Sans Thai; metadata uses IBM Plex Mono. Keep the village voice specific, warm and grounded; add no fabricated history, culture or location claim.

## Historical baselines

- PR #1 started from `5a7c5058d7535327585f5420d9000a35bee05418` and delivered the initial application upgrade.
- PR #3 merged as `72583c51e026becffe8525d17926d9939e738b06`; its accessibility/PWA/CI polish and targeted browser checks passed.
- PR #4 merged as `662d0e95bf599228c851eb08422a0e26b34cf98f`; it bounded dynamic Service Worker cache, corrected ScrollToTop reduced-motion behavior, and fixed a verified Thai typo.
- PR #5 merged as `b0a2ade1fa5d04c03253eb55fc72fb707137e36e`; it fixed four axe-confirmed contrast nodes and removed duplicate feature-push CI runs. Its final PR-only quality run passed.
