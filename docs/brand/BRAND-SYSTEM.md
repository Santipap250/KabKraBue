# KabKraBue — Celestial Brand System

## Identity lockup

Use the supplied celestial emblem as the symbol and keep the brand name as live HTML text. The reusable implementation is `src/components/BrandLogo.tsx`: it loads `public/brand/kabkrabue-celestial-mark.svg` and renders **KabKraBue** and **บ้านกาบกระบือ** separately, so the wordmark remains selectable, accessible, and styled with the site's existing self-hosted fonts. The image is decorative (`alt=""`); the adjacent HTML carries the readable name.

The SVG is a transparent 128×112 vector mark. Its gold linework uses a warm highlight gradient from `#FFF0C6` through `#D9AD63` to `#9B6A30`, with rice-white star details (`#F8E8BF`). Keep the SVG source intact; do not bake the wordmark into the emblem or introduce a network font.

## Typography and tones

- **English display/wordmark:** Fraunces, with Georgia as local/system fallback.
- **Thai wordmark and body:** IBM Plex Sans Thai, with a system sans-serif fallback.
- **Technical labels/metadata:** IBM Plex Mono, with a system monospace fallback.
- **Light-on-dark lockup:** rice/ivory text (`#F8EFD8`), used over the cinematic Hero and dark Footer.
- **Dark-on-light lockup:** ink text (`#292A22`), used by the scrolled Header when its background becomes light.
- Keep gold as a restrained accent; preserve the existing rice, ink, paddy, clay, gold and mist site palette.

`BrandLogo` exposes `compact`, `header` and `large` sizes, plus light/dark tones. Apply the shared component in Header (including its scrolled state), Mobile Menu, and Footer; do not substitute a bitmap logo in one of these surfaces.

## Supplied assets and placement

- `public/brand/kabkrabue-celestial-mark.svg` — primary transparent mark used in the shared site lockup.
- `public/brand/kabkrabue-app-icon.svg` — supplied vector app-icon variant, included in the install manifest and offline shell.
- `public/favicon/kabkrabue-celestial.svg` — browser SVG favicon.
- `public/icons/icon-180.png` — Apple touch icon source and 180px PWA any-purpose icon.
- `public/icons/icon-192.png` and `icon-512.png` — standard installable PWA icons.
- `public/icons/icon-192-maskable.png` and `icon-512-maskable.png` — separate safe-area maskable icons, declared with `purpose: "maskable"` in the manifest.

The previous `public/favicon/favicon.svg` and `apple-touch-icon.png` URLs remain valid compatibility aliases containing the new identity. New metadata points to the explicit celestial SVG and PNG paths. The service worker's `kabkrabue-v7` app shell includes the active mark and install-icon assets while keeping large media and Range requests outside its caches.

## URL and deployment rules

Use `withBasePath()` for all local asset URLs in metadata, manifest entries, and app code. This keeps the same source working from Vercel's root and GitHub Pages at `/KabKraBue/`. Do not hard-code an absolute host URL for local icons or add a new font/runtime dependency. Verify both `npm run build` and `GITHUB_PAGES=true npm run build` plus their export verifiers after changing app-shell assets.

## Compact celestial clock

`CelestialTimepiece` uses the same Fraunces/IBM Plex typography and a dark, translucent ink-blue capsule with limited warm-gold and mist-blue light. The card is intentionally subordinate to the Hero imagery and copy. It shows explicit Bangkok time, Thai Buddhist Era and English Gregorian dates, next-New-Year countdown and year progress. The deterministic star points and orbital paths are decorative and hidden from assistive technology; the clock group and native 44px activation button expose the usable information/action.

Decorative motion is gated by both the Hero's existing reduced-motion/data-saver decision and offscreen/page-visibility state. When motion is unavailable, the clock remains readable and the interactive affordance is omitted rather than left inert. Keep any new effect slow and brief; never make the Hero village footage, headline, or CTA less legible.
