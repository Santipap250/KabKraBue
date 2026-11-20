# KabKraBue Brand Asset

## Primary logo lockup

- Asset: `public/images/kabkrabue-logo.webp`
- Source: the user-provided bilingual gold-on-navy logo image, trimmed to the full emblem and wordmark with clear margins. The original English and Thai lettering, gold highlights, and navy gradient are preserved; no text was regenerated or recolored.
- Use: `src/components/BrandLogo.tsx` in the desktop/mobile header, mobile navigation panel, and footer.
- Presentation: keep the native 1248:365 aspect ratio. The navy field is part of the supplied artwork and should remain visible as a compact logo plaque rather than being removed or recolored. Use `withBasePath()` so the asset also resolves from the GitHub Pages subpath.
- Accessible name: the component derives its alt text from `siteConfig.name` and `siteConfig.nameThai`.

The square favicon and PWA icons remain separate icon assets; this change replaces the site wordmark/lockup without squeezing the horizontal logo into a square.
