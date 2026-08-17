# KabKraBue — Village Website

A premium, cinematic, mobile-first showcase website for the village of
**KabKraBue** (กับกระบือ) — built with Next.js, TypeScript, and Tailwind CSS.

Live target: `https://Santipap250.github.io/KabKraBue`

---

## Technology Stack

| Layer | Choice | Why |
|---|---|---|
| Framework | Next.js 14 (App Router, static export) | Best-in-class SEO, file-based routing, ships as pure static HTML for free GitHub Pages hosting |
| Language | TypeScript | Type-safe data layer (`src/data/*.ts`) — a typo in a gallery entry fails the build, not the visitor's browser |
| Styling | Tailwind CSS | Design tokens (color/type/spacing) declared once in `tailwind.config.ts`, no scattered hard-coded values |
| Animation | Framer Motion | Scroll-reveal, page-load sequencing, and the mobile menu — used deliberately, not decoratively |
| Icons | lucide-react | Lightweight, tree-shakeable, consistent stroke weight |
| Images | Native `<img>` via a custom `MediaFrame` component | `next/image` requires either a server or a fixed-domain loader; since this ships as a static export with unknown final photo dimensions, a lazy-loaded native `<img>` with a graceful placeholder fallback is simpler and equally fast |

No other runtime dependencies were added. Every package above is used on
every page load.

---

## Project Structure

```
KabKraBue/
├── public/
│   ├── images/        # photos — see public/images/README.md for filenames
│   ├── videos/         # optional self-hosted mp4s
│   ├── icons/
│   └── favicon/
│
├── src/
│   ├── app/            # Next.js routes: layout, homepage, sitemap, robots, 404
│   ├── components/     # reusable UI: Header, Gallery, MapSection, Footer, ...
│   ├── sections/        # page-level composition: Hero, StorySection
│   ├── data/            # ← all editable content lives here (see below)
│   ├── lib/             # cn() classname helper, map provider abstraction
│   ├── hooks/           # useScrollProgress, useLockBodyScroll
│   └── styles/           # globals.css — base styles, focus states, motion
│
├── .github/workflows/deploy.yml   # GitHub Pages CI/CD
├── next.config.js                  # static export + GitHub Pages base path
└── tailwind.config.ts               # color/type/spacing design tokens
```

---

## Editing Content (no code changes required)

Everything a village coordinator would need to update lives in `src/data/`:

| To change... | Edit this file |
|---|---|
| Village name, tagline, nav links, contact info, social links | `src/data/site.ts` |
| "Our Story", "People", "Nature", "Culture" section text | `src/data/village.ts` |
| **Add a photo to the gallery** | Drop the file in `public/images/gallery/`, add one entry to `src/data/gallery.ts` |
| **Add a video** | Add one entry to `src/data/videos.ts` (YouTube ID, Vimeo ID, or an mp4 path) |
| **Add a place to Explore** | Add one entry to `src/data/places.ts` |
| Map location | `villageCoordinates` in `src/lib/map.ts` |
| Colors / fonts (theme) | `tailwind.config.ts` |

None of these require touching a component. Every `[TODO: ...]` placeholder
in the data files marks real village information that hasn't been supplied
yet — replace it with the real text; nothing was invented as fact.

### Adding 100 photos later

Because the gallery reads from one array (`src/data/gallery.ts`), adding
100 more photos is 100 more object literals in that one file, plus the
matching files in `public/images/gallery/`. No other file changes.

---

## Development

Requires Node.js 18.18+ (Node 20 recommended).

```bash
npm install
npm run dev
```

Open http://localhost:3000.

### Build

```bash
npm run build
```

This produces a fully static site in `/out` (no server required) — see
`output: "export"` in `next.config.js`.

### Lint

```bash
npm run lint
```

---

## Deployment

### Option A — GitHub Pages (configured, recommended)

A workflow at `.github/workflows/deploy.yml` builds and deploys the site
automatically on every push to `main`.

One-time setup after pushing to GitHub:

1. Go to **Settings → Pages** on `github.com/Santipap250/KabKraBue`
2. Under **Build and deployment → Source**, choose **GitHub Actions**
3. Push to `main` — the workflow builds with `GITHUB_PAGES=true` (which
   sets the `/KabKraBue` base path automatically via `next.config.js`)
   and publishes `/out` to Pages
4. The site will be live at `https://Santipap250.github.io/KabKraBue`

### Option B — Vercel / Netlify / any static host

Set the environment variable `NEXT_PUBLIC_BASE_PATH=""` (empty string) so
the site is served from the domain root instead of a `/KabKraBue`
sub-path, then run `npm run build` and deploy the `/out` folder (or point
the platform's build command at `npm run build`, output directory `out`).

---

## Pushing to GitHub

This project was prepared locally. To publish it:

```bash
cd KabKraBue
git init
git add .
git commit -m "Initial premium village website"
git branch -M main
git remote add origin https://github.com/Santipap250/KabKraBue.git
git push -u origin main
```

After the first push, GitHub Actions will build and deploy automatically
(once Pages is set to "GitHub Actions" as the source — see above).

---

## Changing the Theme

All colors and fonts are design tokens in `tailwind.config.ts` under
`theme.extend.colors` / `theme.extend.fontFamily`. Changing `paddy`,
`clay`, or `gold` there updates the accent color everywhere at once —
no component hard-codes a hex value.

The site currently ships with a single (light) theme, deliberately: a
Dark Mode toggle was evaluated against this content (large photography,
editorial typography) and judged not to add UX value proportional to its
added complexity. The color tokens are structured so a `dark:` variant
could be added later without restructuring components.

---

## Future Upgrade Roadmap

The data layer and component architecture were built to absorb these
without a rewrite:

- **Phase 2** — News / Events / Announcements: `src/data/events.ts`
  already exists as a typed placeholder; needs an `/events` route and a
  homepage teaser section.
- **Phase 3** — Admin CMS for images/videos/content: swap the static
  `src/data/*.ts` arrays for a CMS fetch (e.g. at build time via
  `getStaticProps`-equivalent server components) — the component layer
  already treats this data as opaque arrays, so the source can change
  without touching `ImageGallery`, `VideoShowcase`, etc.
- **Phase 4** — English translation: content strings are already
  isolated in `src/data/`, one step from an `en.ts` / `th.ts` split.
- **Phase 5** — Visitor guide, richer map/directions: `src/lib/map.ts`
  is already provider-agnostic (OpenStreetMap today, Google Maps or
  Mapbox later) via `getEmbedUrl()`.
- **Phase 6** — Booking, local products, marketplace: new `/data` files
  and routes following the same pattern as `places.ts`.
- **Phase 7** — Analytics, search, PWA: `public/favicon/site.webmanifest`
  is already in place as a PWA starting point.

---

## Known Limitations (honest status)

- **No real photography or video yet.** Every image reference in
  `src/data/` points to a filename that doesn't exist in `public/images/`
  yet; the `MediaFrame` component shows an on-brand placeholder instead
  of a broken image until real files are added. See
  `public/images/README.md` for the exact filenames expected.
  Same applies to `src/data/videos.ts` — YouTube/Vimeo IDs are `[TODO]`.
- **Map coordinates are placeholders** (Bangkok city-center default) in
  `src/lib/map.ts` — update `villageCoordinates` with the real location.
- **Contact details, social links, and all body copy** contain `[TODO:
  ...]` markers instead of invented facts about the village — see
  `src/data/site.ts` and `src/data/village.ts`.
- Repository was prepared and build-tested in this environment but has
  **not** been pushed to GitHub — no GitHub credentials or push access
  are available here. Use the commands in "Pushing to GitHub" above.
