# Decision log

Append new entries at the bottom. Format: date — decision — why.

### 2026-10-18 — Astro 7.3.x, not 7.4

Latest Astro (7.4) requires Node ≥ 22.22; the dev machine runs Node 22.15.
Astro 6.x installs fine but has open security advisories (XSS, sharp/AVIF RCE) fixed only in ≥ 7.3.
7.3.8 needs Node ≥ 22.12 and audits clean. Pinned as `~7.3.8`.
**To upgrade:** update Node to ≥ 22.22, then `npm install astro@latest`.

### 2026-10-18 — Plain CSS, no Tailwind

The design depends on a handful of custom primitives (`.row`, `.frame`, `.cells`, patterns).
Tokens + scoped component styles keep that readable without a utility framework.

### 2026-10-18 — Self-hosted fonts via Fontsource

Loading Google Fonts from Google's CDN is a GDPR problem for German sites (LG München, 2022).
Fontsource bundles the font files with the build. Fonts: Space Grotesk + JetBrains Mono —
deliberately not Zed's typefaces.

### 2026-10-18 — Grid lines via outlines, not gap-background

Common trick is `gap: 1px` + line-coloured container background, but any incomplete
row then shows a solid line-coloured block. Outlining each cell into a 1px gap gives
the same shared hairlines and leaves empty slots clean. See design.md → Grid primitives.

### 2026-10-18 — Content in one TypeScript file

Small, single-page site: a typed `profile.ts` is simpler than content collections.
Revisit if project detail pages are added (then move projects to a content collection).

### 2026-10-18 — Subpages as single pages with anchors, not per-item routes

"See more" for Work and Photos goes to `/work` and `/photos`. Each work project is a
section on `/work` reachable via `/work#<slug>` rather than its own route — enough
depth for a handful of projects, no content collection needed. Revisit (content
collection + `[slug].astro`) if projects get long-form writing or many images.

### 2026-10-18 — Motion as progressive enhancement, no animation library

A ~40-line IntersectionObserver script + CSS transitions covers the reveal; native
cross-document View Transitions (`@view-transition`) cover page changes with zero JS.
Browsers without support just navigate normally. Everything is off under
`prefers-reduced-motion`, and a 2.5s fallback ensures content never stays hidden if JS fails.
Astro's `<ClientRouter />` was not used — it would turn the site into a SPA for one cross-fade.

### 2026-10-18 — University projects as a sideways strip

To show more than three university projects without making the page longer or
adding a subpage, they scroll horizontally (CSS scroll snap, a peek of the next card
as the hint, ← → buttons in the section head). A position counter ("01–03 / 06") was
built and then removed at Noah's request — keep the controls to arrows only.
Testing note: headless Chrome with `--virtual-time-budget` doesn't fire scroll events
or rAF, so test the strip in real time (e.g. CDP), not with virtual time.
