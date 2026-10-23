# Design system

## Principles

1. **The grid is the decoration.** Structure is shown, not hidden: 1px hairlines
   divide every block, vertical rails frame the column, horizontal lines run edge to edge.
2. **Blocks, not cards.** No rounded corners, no shadows, no gradients for depth.
   Everything is a rectangle that shares its borders with its neighbours.
3. **Quiet surfaces, loud type.** Big, tight sans headlines; small uppercase mono labels.
   One accent colour, used sparingly.
4. **Empty space is drawn, not left blank.** Unused cells and spacers get a diagonal
   hatch; visual placeholders get a dot grid.

## Tokens (`src/styles/global.css`)

### Colour

| Token | Light | Dark | Use |
| --- | --- | --- | --- |
| `--bg` | `#f6f6f3` | `#0f0f10` | Page and cell background |
| `--surface` | `#ffffff` | `#17171a` | Hover state of cells |
| `--fg` | `#121212` | `#ecece8` | Text, skill/technology logos, logo block |
| `--muted` | `#6c6c66` | `#8f8f89` | Secondary text, labels |
| `--line` | `#d8d8d1` | `#2b2b2f` | All grid lines, tag borders |
| `--marker` | `#8e8e86` | `#5c5c62` | "+" intersection markers |
| `--accent` | `#2b59ff` | `#7090ff` | Contact button, hover state of "see more" / "Visit website" buttons, hero caret, page-change progress line. Nothing else. |
| `--hatch` / `--dot` | low-alpha black/white | | Pattern ink |
| `--season` / `--season-2` | per season | per season | Seasonal glyphs and the header season toggle only (see Seasons). Never used by the layout |

Theme follows `prefers-color-scheme`; there is no visitor-facing toggle (yet). `html[data-theme="light|dark"]` forces one — set only by the dev theme switcher (see Footer), from `localStorage["theme-override"]` by the inline head script before first paint. The dark tokens therefore exist twice in `global.css` (under the media query with `:not([data-theme="light"])`, and on `[data-theme="dark"]`) — keep them identical. Season tokens are set on `html[data-season]`.

### Type

| Role | Font | Size | Notes |
| --- | --- | --- | --- |
| Name (h1) | Space Grotesk 600 | `clamp(64px, 12vw, 152px)` | line-height .88, tracking −0.055em |
| Section title (h2) | Space Grotesk 600 | `clamp(28px, 4vw, 44px)` | tracking −0.03em |
| Card title (h3) | Space Grotesk 600 | 20–30px | |
| Body | Space Grotesk 400 | 16px (lede 17–20px) | muted colour for descriptions |
| `.label` | JetBrains Mono 500 | 11px uppercase, +0.08em | section indices, field labels, nav |
| `.tag` | JetBrains Mono | 11px, bordered | tech tags |

### Spacing / layout

- `--container: 1200px` — max width of the framed column
- `--gutter: 16px` — minimum space between rail and viewport edge
- `--pad: clamp(16px, 2.6vw, 32px)` — standard cell padding
- `--header-h: 56px` — header height, also the size of the logo square
- `--ease-out: cubic-bezier(0.22, 1, 0.36, 1)` — easing for all movement
- Breakpoints (in component CSS): **860px** (hero/skills/uni collapse), **720px** (header, work, section heads, footer collapse)

## Grid primitives

```
 ─────────┼──────────────────────────────┼─────────   ← .row border-bottom (full viewport width)
          │  .frame (rails left + right) │
          │ ┌──────────┬───────────────┐ │
          │ │  cell    │  cell         │ │            ← .cells children, outlined
          │ └──────────┴───────────────┘ │
 ─────────┼──────────────────────────────┼─────────
          +  ← .has-markers draws "+" at rail × line
```

- **`<Row>`** (`components/Row.astro`) = `.row > .frame`. Every block on the page sits in one.
  `markers={false}` only for the first row (header) where there is no line above.
- **`.cells`** = CSS grid with `gap: 1px`; each child gets `outline: 1px solid var(--line)`.
  The outlines fall into the 1px gaps and onto the rails / row lines, so all neighbours
  share a single hairline. Empty grid slots stay clean (no coloured gap showing).
  Children need `min-width: 0` (already set) so long text can't blow out columns.
- **Never** put `overflow: hidden` on a `.row`, `.frame` or `.cells` container — it clips outlines and markers.
- A cell must stretch to the full track size for its outline to align. Don't use
  `align-self`/`justify-self` on cells; align their *content* with flex instead.

## Patterns

- `.hatch` — 45° diagonal lines, 7px pitch. Spacer rows, header filler, empty photo cells, footer tail.
- `.dots` — 16px dot grid. Project card visuals.
- **Corner tag** — small mono label boxed into the top-left (or bottom-left) of a visual with right + bottom borders (`W/01`, `PHOTO 01`, `PORTRAIT`).
- **Image placeholder** — hatch or dots + a centred bordered mono badge (`NB`, `W/01`, `01`) until a real image is set.

## Components

| Component | Layout |
| --- | --- |
| Header | sticky; `[logo 56×56][Profile][Work][University][Photos][hatch filler][Contact (accent)][season 56×56]`; nav links hidden < 720px. Links go to `/#section`; on `/work` and `/photos` the matching link gets `aria-current="page"` (fg text + 2px inset bottom bar). Logo → `/` |
| Hero | 3 equal tracks. Row 1: intro (label, name on two lines, lede pinned to bottom) spans 2, portrait 1 — portrait stretches to the intro's height (no `aspect-ratio`, which would stop it stretching). Row 2: current position / education / based in. < 860px → 1 col, portrait becomes 1:1 |
| Skills | one row: `label 1.5fr | 6 × logo cell`. Each cell: 36px monochrome logo (`--fg`, via `currentColor`) centred over the name as a `.label`. No skill levels. < 860px → label row on top, 3 cols. Keep the count a multiple of 6 for a full grid at every breakpoint. Used twice: Programming languages, then Technologies with `flip` (`6 × logo | label 1.5fr`, label right-aligned; label stays first in the DOM and moves via `order`; < 860px it goes back on top) |
| SectionHead | `96px index | title | 340px note`; < 720px note drops to its own row. Optional `actions` slot adds an extra auto-width column (used for StripControls) |
| ProjectCard | `Visual` (16:9 `lg`, 4:3 `sm`), then meta label, title, description, tags pushed to bottom. Becomes an `<a>` when an `href` is set: → for internal links, ↗ for external. Work cards link to `/work#<slug>` |
| Visual | dot grid + centred code badge + top-left corner tag, or the image (`object-fit: cover`). Aspect ratio via prop |
| Work grid | 2 cols → 1 col < 720px |
| University strip | `Strip`: sideways-scrolling row with scroll snap, any number of cards. Visible cards = `min(count, 3.25)` desktop / `min(count, 2.25)` < 860px / `min(count, 1.15)` < 560px — the fractional part is the "peek" that signals more. Scrollbar hidden; region is focusable (arrow keys scroll). Cells get `overflow: hidden` so the reveal's rise can't cause a vertical scrollbar |
| StripControls | ← → buttons (56px wide, divider between) in the section head's `actions` slot; hover inverts to `--fg`; disabled at the ends (`--line` colour). Hidden until JS confirms the strip overflows. < 720px: own row, buttons right, hatch fill left. No counter (removed on request) |
| PhotoGrid | 2×2 at all sizes, 4:3 cells, caption tag bottom-left; hatch + big number when no image |
| MoreLink | row under a section: `[hatch filler 1fr][note label][button]`. Button = inverted block (`--fg` bg, `--bg` text), mono uppercase, → arrow; hover → accent, arrow nudges right. Used under Work ("Projects in depth", note "Case studies") and Photos ("See all photos", no note — the `04 / 09` count was removed on request) |
| Spacer | hatched row, `clamp(32px, 5vw, 56px)` tall, between every section |
| Footer | `© | Email ↗ | GitHub ↗ | LinkedIn ↗ | Imprint → | Privacy → | Top` → 2 cols < 860px (© spans both); hatched tail row. In `npm run dev` only, two switcher rows sit above the tail: season (see Seasons) and theme `Dev · Theme | Auto (light) | Light | Dark` (`ThemeSwitcher.astro`, `scripts/theme.ts`) |

## Subpages

Same shell as the landing page (Header, Spacer rhythm, Footer). Structure:

1. **PageHead** — two rows. Row 1: full-width back link ("← Back to overview", 56px tall, whole row clickable, hover → `--surface`, arrow nudges left); goes to the matching landing section (`/#work`). Row 2: `kicker + h1 (56–112px) | 340px note`; < 720px the note drops below.
2. Spacer, then content rows, Spacer between items.

- **WorkDetail** (`/work`): title row `code | h2 | org · period`, then body grid `1fr | 2fr` — left: facts list (Role, Company, Period, Stack) with internal hairlines, spanning 2 rows, plus — only when `website` is set — a "Visit website ↗" button pinned to the bottom of that column (same inverted block as MoreLink, hover → accent, opens in a new tab); right: Visual 16:9, then text cell (Context / What I did / Outcome, max 62ch, square bullets). < 860px: 1 col, facts become a 2×2 block with the button full-width underneath.
- **Album** (`/photos`): one Row per album, Spacer between albums. Grid `4 × 1fr`: label cell (`A/01`, h2 title, muted note, `03 PHOTOS · 2025`) takes one slot of the first row — 3 photos beside it, then further photos continue underneath in rows of 4 (the label keeps the height of one photo row). Albums alternate sides — odd ones label left, even ones label right (`flip`, same idea as the Technologies row; label stays first in the DOM). Hatch filler cells complete the last photo row. < 860px: label becomes a full-width row on top, photos 2 cols; < 520px 1 col. Each figure: 4:3 image (hatch + number placeholder, numbered per album) over a caption strip `caption …… PLACE · DATE`.

- **LegalText** (`/imprint`, `/privacy`): back link goes to `/`. One Row, grid `1fr | 2fr`, one grid row per section — left: `§ 01` label + h2 (20–26px); right: paragraphs (17px, max 62ch, `white-space: pre-line` so `\n` breaks lines in addresses). Sections with sub-sections (privacy) become a chapter row — `§ 01` + h2 at section-title size (28–44px), intro text or a hatch filler on the right — followed by one row per sub-section (`§ 01.1` + h3, 20–26px). Inside the text: small headings (17px 600, 10px extra space above) and square-bullet lists as on `/work`. < 720px: 1 col, heading cell above its text, hatch fillers hidden.

## Interaction

- Hover on interactive cells: background → `--surface` (120ms). Contact button inverts to `--fg`.
- Arrows (→ / ↗ / ←) nudge 3px in their direction on hover.
- Focus: 2px accent outline, inset.
- Smooth scrolling + `scroll-padding-top` for the sticky header.

## Motion

Rule of thumb: motion confirms the grid, it never moves the grid. Lines, rails and
row borders stay put; only what's *inside* cells moves. Nothing loops except the caret
(and the seasonal particles, which live outside the rails — see Seasons).

| Effect | Where | Details |
| --- | --- | --- |
| Row reveal | every `<Row>` (except header) | On entering the viewport (40px offset): cells fade in 600ms, their direct children rise 14px over 800ms; staggered 70ms per cell (max 6 steps). Non-grid rows (spacers, back link) just fade |
| Marker lock-in | "+" markers | rotate 45° → 0° (× becomes +) and fade in with the row |
| Caret | hero "01 — Profile" | 7×12 accent block, blinks (steps, 1.1s) |
| Card hover | ProjectCard | dot grid drifts 8px; code badge lifts −3px onto a 3px hard block shadow (`--line`) — the only shadow on the site |
| Photo hover | PhotoGrid, /photos | image scales 1.03 (700ms); hatch placeholders drift |
| Page change | all navigations | native cross-document View Transition (cross-fade); header has `view-transition-name: site-header` so it stays still |
| Progress line | header bottom hairline | 2px accent line (`.nav-progress`) on clicking a link to another page: trickles 0 → 90% (8s, ease-out segments). The next page resumes it at the same point, runs it to 100% once loaded and fades it (600ms). In-page anchors, external links and modifier-clicks don't trigger it. `src/scripts/progress.ts` |

### How the reveal works

- `Base.astro` inline head script adds `html.motion` before first paint — only if
  `prefers-reduced-motion: no-preference` and IntersectionObserver exist. If the reveal
  script hasn't started after 2.5s, it removes `.motion` again (content is never stuck hidden).
- `Row.astro` renders `.frame[data-reveal]` (opt out with `reveal={false}`).
- `src/scripts/reveal.ts` sets `--i` on each cell, adds `.is-in` when the row arrives,
  then **removes `data-reveal`** after the animation so component hover transitions
  aren't overridden by the reveal rules.
- CSS lives in `global.css` → "Motion". Component-specific reveal tweaks use
  `:global(.motion .frame[data-reveal])` / `:global(.motion .frame.is-in)`.
- Reduced motion: no `.motion` class, and global CSS kills all transitions/animations.

### How the progress line carries across pages

- Click on an internal link → `html.nav-loading` + click time in `sessionStorage["nav-start"]`.
- `Base.astro` inline head script on the next page: if that time is < 10s old, sets
  `--nav-elapsed` and `html.nav-loading` before first paint, so the animation resumes via a
  negative `animation-delay` exactly where the old page's line was (seamless under the View Transition).
- `progress.ts` on `load`: reads the current scale into `--nav-from`, swaps to `html.nav-done`.
  Back/forward-cache restores also get `nav-done`.
- New component inside a Row gets the reveal automatically. Animate *contents*, never
  `transform` the cell itself (it would drag its outline off the grid).

## Seasons

Optional decorations that follow the calendar. **Off by default** — an extra the visitor switches on
with the header toggle; the choice is remembered.

- **Season** = meteorological, northern hemisphere: Mar–May spring, Jun–Aug summer,
  Sep–Nov autumn, Dec–Feb winter. Picked in the browser, not at build time (static site).
- **Where:** only in places that are already decoration —
  1. **Spacer scenes** — small flat glyphs resting on each hatched Spacer's bottom line
     (pumpkins + jack-o'-lantern + fallen leaves / firs + snowman + drifts / tulips + daisies +
     sprouts / half sun on the line + sailboat + waves). Three layouts per season; consecutive
     spacers cycle through them (`src/data/seasons.ts`). Glyphs grow up out of the line (700ms,
     70ms stagger), waiting for the row's reveal. Switched off, they sink back in (450ms, 40ms
     stagger) before the scene is hidden.
  2. **Gutter particles** — 16 particles drifting in the area outside the rails (falling leaves /
     snow / petals; summer sparkles twinkle in place). Only ≥ 1360px wide, never over content,
     under the sticky header. Positions continue across page loads (`--season-t`). The layer
     fades in (600ms) when switched on and out (450ms) when switched off — an opacity/visibility
     transition, never `display: none` (re-showing restarts every particle animation, which Safari
     skipped on the first switch-on). While off, particles are paused and resume where they stopped.
- **Glyph style:** flat fills, no outlines except snow (surface fill + `--season` stroke).
  Three inks: `currentColor` (= `--season`), `--season-2`, and `--bg` / `--surface` for
  cut-outs and snow, so every glyph follows both theme and season. All drawn once in the
  sprite in `components/Seasons.astro`.
- **Header toggle:** 56×56 square at the far right, mirroring the logo square. Shows the current
  season's icon: off (default) → grey, its colours show on hover as a hint; on → `--season`. `aria-pressed`. Hidden
  without JS (then there are no decorations either).
- **Dev switcher:** footer row `Dev · Season | Auto (autumn) | Spring | Summer | Autumn | Winter`,
  rendered only by `npm run dev`. Picking a season also turns decorations on.
- **State:** `html[data-season]` + `html[data-seasonal="on"]` (`"leaving"` for 650ms while switching off), set by the inline head script in
  `Base.astro` before first paint (no flash). `localStorage["seasonal"]` (`"on"`, absent = off) and
  `["season-override"]` (dev) persist them; `src/scripts/season.ts` wires the buttons.
- Reduced motion: no particles; scene glyphs show without the rise.

| Season | `--season` light / dark | `--season-2` light / dark |
| --- | --- | --- |
| Spring | `#dc6b93` / `#ee8cb0` (blossom) | `#5b9a56` / `#79b874` (leaf) |
| Summer | `#eaa91c` / `#f4c04f` (sun) | `#2e8bbd` / `#57abd8` (sea) |
| Autumn | `#e46f27` / `#f08a45` (pumpkin) | `#a8742a` / `#c99a4e` (stem, leaves) |
| Winter | `#5b8fc4` / `#8ab4df` (ice) | `#3c785a` / `#5c9d7c` (pine) |

## Ideas not yet built

- Manual theme toggle
- Subtle hatch in the area outside the rails on very wide screens
- Real images/screens in project visuals
