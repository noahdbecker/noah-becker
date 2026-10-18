# Project docs

Context for anyone — human or AI session — picking up work on this site.
Read this file first, then the one relevant to your task.

| File | Read when |
| --- | --- |
| [design.md](design.md) | Changing anything visual: layout, colours, type, components |
| [content.md](content.md) | Editing text, projects, skills or photos |
| [decisions.md](decisions.md) | Wondering *why* something is the way it is, or making a new structural choice (append to it) |

## What this is

A small personal vita site for **Noah Becker**: a landing page plus two subpages.
The landing page (`/`) has six blocks, top to bottom:

1. **Profile** — name, intro, portrait, then current position / education / location
2. **Programming languages** — six languages as a row of monochrome logos
3. **Technologies** — six tools/platforms, same logo row mirrored (label on the right)
4. **Work** — 2 project cards
5. **University** — sideways-scrolling strip of project cards (any number)
6. **Photos** — 2×2 grid

Work and Photos each end in a "see more" button row leading to a subpage:

- **`/work`** — one case study per work project (role, company, period, stack, visual, context, what I did, outcome). Landing cards link to `/work#<slug>`.
- **`/photos`** — full gallery, 3 columns, caption + place · date under each photo.

Visual direction: blocky, visible-grid layout inspired by the *structure* of
[zed.dev](https://zed.dev) (hairline rails, full-width row lines, "+" markers
at intersections, hatched filler cells). We do **not** copy Zed's fonts or branding.

## Stack

- **Astro 7.3** (static output, no UI framework, no client JS)
- Plain CSS: global tokens in `src/styles/global.css`, component styles in scoped `<style>` blocks
- Fonts self-hosted via Fontsource: Space Grotesk (sans), JetBrains Mono (mono)
- Node ≥ 22.12 (dev machine runs 22.15; Astro 7.4+ needs ≥ 22.22, see decisions.md)

```sh
npm install
npm run dev       # http://localhost:4321
npm run build     # → dist/
npm run preview
```

## File map

```
src/
  data/profile.ts        ← ALL content lives here
  styles/global.css      ← tokens + grid system (.row / .frame / .cells) + patterns
  layouts/Base.astro     ← <html>, fonts, meta
  pages/
    index.astro          ← landing page composition (order of sections)
    work.astro           ← /work case studies
    photos.astro         ← /photos gallery
  components/
    Row.astro            ← full-bleed row + framed column (the grid primitive)
    Header.astro         ← sticky nav bar
    Hero.astro           ← name + portrait + facts
    Skills.astro         ← logo row (languages, technologies; `flip` puts the label right)
    SectionHead.astro    ← "02 | Work | note" heading row
    ProjectCard.astro    ← card used for work (size lg) and uni (size sm)
    Visual.astro         ← project image area (image or dot-grid placeholder + code)
    MoreLink.astro       ← "see more" button row under a section
    PageHead.astro       ← subpage title row with back link
    WorkDetail.astro     ← one case study on /work
    Strip.astro          ← sideways-scrolling card row (University)
    StripControls.astro  ← ← → buttons for a Strip
    PhotoGrid.astro      ← 2×2 photos
    Spacer.astro         ← hatched spacer row between sections
    Footer.astro
  scripts/reveal.ts      ← scroll-reveal for rows (see design.md → Motion)
  scripts/strip.ts       ← wires StripControls to a Strip
  scripts/progress.ts    ← page-change progress line under the header
  assets/logos/          ← monochrome logos for both logo rows (SVG, drawn in currentColor)
  assets/photos/         ← put photos here (optimised by astro:assets)
public/favicon.svg
```

## Status

- [x] Initial landing page design (light + dark via `prefers-color-scheme`)
- [x] `/work` and `/photos` subpages (initial design)
- [x] Subtle motion: scroll reveal, hovers, page cross-fade, page-change progress line
- [ ] Replace all `TODO` placeholders in `src/data/profile.ts` (see content.md)
- [ ] Add real photos
- [ ] Set `site` in `astro.config.mjs` once the domain is known
- [ ] Imprint / privacy page (required for a personal site hosted in Germany — "Impressum", "Datenschutzerklärung")
- [ ] Deployment target not chosen yet

## Working conventions

- Content changes → only `src/data/profile.ts`. Components must not hard-code personal text.
- New visual block → wrap it in `<Row>`, build its inside with a `.cells` grid. See design.md.
- No new colours or font sizes outside the tokens without updating design.md.
- JS is limited to progressive enhancement (scroll reveal, strip buttons, page-change progress line). The site must work fully without it — the strip still scrolls by swipe/trackpad/keyboard.
- Verify both themes, a 390 px wide viewport, and `prefers-reduced-motion` after visual changes.
