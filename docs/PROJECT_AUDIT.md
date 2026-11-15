# KabKraBue — Audit and Remediation Report

## Current status (checked 2026-11-15)

- Current `main` is `b0a2ade1fa5d04c03253eb55fc72fb707137e36e`, merge commit for PR [#5 — Fix axe-detected contrast issues](https://github.com/Santipap250/KabKraBue/pull/5).
- PR #5 was merged by repository owner `Santipap250` (`TUIzFPV`) at `2026-11-12T10:34:41Z` (17:34:41 ICT), from head `dd31a8e5c15e5480698e21f3d81b1403d0774175`, based on `662d0e95bf599228c851eb08422a0e26b34cf98f`. Manus did not merge or push to `main`.
- GitHub records Vercel Production deployment `7734790604` for `b0a2ade` as `success`; environment URL: `https://kab-kra-f9u05sro2-obixconfig.vercel.app`. On 2026-11-15, the public alias returned HTTP 200 for `/`, `/privacy/`, `/sw.js`, and `/manifest.webmanifest`. These were read-only checks; the Vercel dashboard was not directly inspected.
- The PR #5 Vercel Preview deployment `7725059075` was reported `success`. The preview's page content was not independently browser-verified.
- Current documentation-only work is on `manus/kabkrabue-postmerge-status`, created from current `main` SHA `b0a2ade`. It corrects status records and README CI wording only; no application source or runtime assets are changed. Delivery remains through a separate review-only PR; do not merge, promote, or change Production from this branch.

## History and scope

PR #1 upgraded the site from baseline `5a7c5058d7535327585f5420d9000a35bee05418`; PR #2 updated Production status documents. PR #3 merged as `72583c51e026becffe8525d17926d9939e738b06` from head `56fc511ddf488c0664cce7bee034154c309d9510`. PR #4 merged as `662d0e95bf599228c851eb08422a0e26b34cf98f` from head `8c4ce1fe2f75572fcba1b05bb96fe2c3793a3088`. PR #5 merged as described above.

The delivered application changes preserve the established palette/design, village copy and contact data, social links, original images/videos, static export, and root plus `/KabKraBue/` basePath support. No axe or Lighthouse dependency was added.

## Accessibility findings and remediation

`axe-core` 4.13.0 was already available transitively after clean install; it was not added as a direct dependency. Initial Home testing found four low-contrast nodes: the Shorts gold/80 counter, the Find Us index in clay, and the Footer `Navigate`/`Visit` headings whose intended mist/70 color was overridden by the `.eyebrow` default. The fixes use existing palette tokens and targeted class/context changes only; palette values and page content remain unchanged.

Post-fix axe results on the Home and Privacy static routes:

| Route | Violations | Passed rules | Incomplete/manual review |
| --- | ---: | ---: | --- |
| Home `/` | 0 | 29 | `color-contrast`: 64 nodes on gradients that axe could not calculate; `video-caption`: human review needed for 5 Story video elements |
| Privacy `/privacy/` | 0 | 19 | None reported |

`incomplete` is not equivalent to pass or fail. `ffprobe` found AAC stereo in the referenced `story-02.mp4` and `people-section.mp4` files; their audio meaning and caption-track need have not been reviewed. The other 3 referenced Story clips have no audio stream. Human contrast sampling on gradients, audio/caption review, and screen-reader/real-device checks remain open. These checks do not constitute WCAG 2.2 AA certification.

## Build, security, and CI evidence

Local clean-install and static-build verification ran on application source commit `929b008b1a6af390f95caf7199581e0f1338b164` (tree `afbf7c33b3abb92142efb9bc6d2fc8ad1b7e825c`). The final PR #5 head `dd31a8e5c15e5480698e21f3d81b1403d0774175` passed GitHub Actions run [43129535092](https://github.com/Santipap250/KabKraBue/actions/runs/43129535092) on 2026-11-12:

- `npm ci`, dependency audit/security check, lint, and TypeScript typecheck passed; audit reported 0 vulnerabilities.
- Root static export and `GITHUB_PAGES=true` `/KabKraBue/` static export both passed.
- Earlier duplicate feature-push and PR workflows made overlapping full builds and intermittently failed in the remote `next/font/google` response parser. The feature-branch `push` trigger was removed; PR updates continue to run the full workflow. The resulting single PR-only run passed.
- Non-blocking lifecycle warnings remain for `eslint@9.39.5`, the Node 20-to-24 transition affecting `actions/checkout@v4`/`setup-node@v4`, and the planned `ubuntu-latest` migration. No out-of-scope forced upgrades were made.

## Browser smoke and performance evidence

On the same application source tree, local Chromium/CDP checks covered keyboard and focus behavior in dialogs, Gallery filters/lightbox (Arrow/Escape/focus restoration), Hero toggle, ScrollToTop, reduced motion, responsive overflow, service-worker cache limit/version migration, and offline Privacy behavior. The tested tree matched source commit `929b008`; interaction checks passed.

Lighthouse was not installed, and no large tooling was added. Chromium Performance API snapshots were taken against a local static export with HTTP cache off and service-worker interception bypassed:

| Emulated viewport | TTFB | FCP/LCP | CLS | Resources | First-party bytes | Hero WebM |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| 390×844 | 17 ms | 260 ms | 0 | 33 | 3.48 MB | 1.31 MB |
| 1440×900 | 18 ms | 292 ms | 0.00003 | 34 | 3.54 MB | 1.31 MB |

These are unthrottled local snapshots—not Lighthouse scores, field data, or results from a real device—and should not be compared directly with Production.

## Production and deployment safety

PR #4 merge `662d0e9` and PR #5 merge `b0a2ade` were performed by repository owner `Santipap250`. Their Vercel deployments followed the repository's `main`-linked deployment behavior. Manus did not push to `main`, merge either PR, promote a deployment, or change a Production alias. Current Production evidence is limited to GitHub deployment/status records and public HTTP responses noted above.

## Remaining follow-ups

1. Human-review the 64 contrast nodes over gradients; axe could not determine their effective backgrounds.
2. Review the AAC audio in the 2 Story clips and determine caption/subtitle needs before creating transcripts.
3. Conduct screen-reader and real-device testing before making any conformance claim.
4. Run Lighthouse and field-data checks only in an environment with the appropriate tooling/device; current Chromium metrics are local snapshots only.
5. Plan ESLint/Next.js and GitHub Actions runner/action lifecycle updates separately; do not force an upgrade that breaks peer compatibility.
6. Monitor the remote Google Fonts build step. The duplicate-workflow source was addressed, and the final PR-only run passed; if a single PR run fails again, investigate the external font-fetch failure separately.

## Historical security references

- Next.js security releases: https://nextjs.org/blog/security
- Next.js November 2026 security release: https://nextjs.org/blog/november-2026-security-release.md
- Next.js advisories: https://github.com/vercel/next.js/security/advisories/GHSA-vcvr-r3jv-pc5j and https://github.com/vercel/next.js/security/advisories/GHSA-9qr9-h5gf-34mp
- PostCSS advisories: https://github.com/advisories/GHSA-qx2v-qp2m-jg93 and https://github.com/advisories/GHSA-6g55-p6wh-862q
- minimatch advisory: https://github.com/advisories/GHSA-g3hv-75wg-m249
