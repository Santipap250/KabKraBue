# Self-hosted font assets

These WOFF2 subsets keep the existing Fraunces, IBM Plex Sans Thai, and IBM Plex Mono families, requested weights, Unicode ranges, and fallback metric overrides. The subsets were copied from the current successful Next.js font build so the visual type system remains unchanged while CI no longer fetches Google Fonts during compilation.

The font software is distributed under SIL Open Font License 1.1. The corresponding license texts are included in `licenses/`:

- Fraunces: https://github.com/google/fonts/tree/main/ofl/fraunces
- IBM Plex Sans Thai: https://github.com/google/fonts/tree/main/ofl/ibmplexsansthai
- IBM Plex Mono: https://github.com/google/fonts/tree/main/ofl/ibmplexmono

`src/styles/fonts.css` declares the local subsets and should be updated together with the assets if font families, weights, or language coverage change.