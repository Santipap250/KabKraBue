# Before / After screenshots

Before captures were taken from the supplied production URL `https://kab-kra-bue.vercel.app`; After captures were taken from the final local static export. The same Playwright/Chromium viewport sizes and `prefers-reduced-motion` setting were used, and the page was scrolled to activate below-the-fold media before capture. Before screenshots describe the baseline only; they do not imply production has been updated.

The Vercel Preview for PR #1 is Ready at [the Preview URL](https://kab-kra-bue-git-manus-kabkrabue-premium-upgrade-obixconfig.vercel.app/), but deployment protection shows a Vercel login page to unauthenticated browsers. Therefore “After” screenshots below are from the final local export, not from the protected Preview; a Vercel-authorized reviewer should confirm the hosted content.

| View | Before | After |
|---|---|---|
| Homepage — desktop (1280×900 full page) | [Open](screenshots/before/homepage-desktop.jpg) | [Open](screenshots/after/homepage-desktop.jpg) |
| Hero — desktop (1280×900) | [Open](screenshots/before/hero.jpg) | [Open](screenshots/after/hero.jpg) |
| Story — desktop (1280×900) | [Open](screenshots/before/story.jpg) | [Open](screenshots/after/story.jpg) |
| Gallery — desktop (1280×900) | [Open](screenshots/before/gallery.jpg) | [Open](screenshots/after/gallery.jpg) |
| Explore — desktop (1280×900) | [Open](screenshots/before/explore.jpg) | [Open](screenshots/after/explore.jpg) |
| Footer — desktop (1280×900) | [Open](screenshots/before/footer.jpg) | [Open](screenshots/after/footer.jpg) |
| Homepage — mobile (390×844 full page) | [Open](screenshots/before/homepage-mobile.jpg) | [Open](screenshots/after/homepage-mobile.jpg) |
| Mobile navigation (390×844) | [Open](screenshots/before/mobile-navigation.jpg) | [Open](screenshots/after/mobile-navigation.jpg) |

## Notable baseline/browser differences

- The baseline production browser run logged React hydration error `#418` on desktop and mobile and failed the mobile-menu Escape-close check; the final local export produced no page errors and passed keyboard focus cycling, Escape close, and focus restoration.
- The final responsive Hero poster uses the existing landscape viewpoint photograph on desktop and retains the existing portrait poster on mobile.
- Story/gallery/explore captures now show their actual revealed content in both reduced-motion and regular-motion states.
