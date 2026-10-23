# Content

All copy and data live in **`src/data/profile.ts`**. Components only read from it.

## Model

| Export | Shape | Shown in |
| --- | --- | --- |
| `profile` | name, intro, portrait `{ image?, alt, crop? }`, location, current position, education, links | Header, Hero, Footer, `<title>` |
| `skills` | `{ name, logo }[]` | Programming languages logo row. `logo` is an imported SVG from `src/assets/logos/` |
| `technologies` | `{ name, logo }[]` (same `Skill` type) | Technologies logo row under the languages |
| `workProjects` | `WorkProject[]` | Landing shows the first 2 (codes `W/01`, `W/02`); `/work` shows all as case studies |
| `uniProjects` | `Project[]` (any number) | University strip (scrolls sideways), codes `U/01`… |
| `albums` | `{ slug, title, note?, period?, photos: Photo[] }[]` | `/photos`: one block per album (`A/01`…), label alternates left/right. `slug` is the anchor (`/photos#album-01`) |
| `albumCovers` | derived: the first photo of each album, in album order, max 4 (`Photo` = `{ caption, alt, place?, date?, image? }`) | Landing grid. Don't edit — reorder albums / photos instead |

| `imprint`, `privacy` | `LegalPage` = `{ title, kicker, note?, sections: LegalSection[] }`, `LegalSection` = `{ heading, body?: LegalBlock[], sections?: LegalSection[] }`, `LegalBlock` = paragraph string \| `{ heading }` (small heading inside the text) \| `{ list: string[] }` | `/imprint`, `/privacy`. A section with `sections` is a chapter (`§ 01`) over numbered sub-sections (`§ 01.1`); privacy uses this, imprint doesn't. `\n` inside a paragraph is a line break (addresses). Use a non-breaking space after `§` (`§\u00a05`) |

`Project` = `{ title, meta, description, tags[], href?, image? }`.
`meta` is the small mono line above the title — keep it `Org · Year`.

`WorkProject` = `Project` + `{ slug, role, org, period, context, contributions[], outcome, website? }`.
`website` is the live site built for the client (full `https://` URL); when set, `/work` shows a
"Visit website ↗" button at the bottom of the facts column. Leave it out and the button disappears.
`slug` is the anchor on `/work` (`/work#project-alpha`) — keep it URL-safe and stable.
For work projects `meta` duplicates `org · period`; keep both in sync.

## Logos (languages + technologies)

Logos are single-colour SVGs in `src/assets/logos/`, imported at the top of `profile.ts`
and rendered as Astro SVG components in `--fg`. To add one:

1. Take the monochrome glyph from [Simple Icons](https://simpleicons.org) (CC0) or, if it's
   missing there (Java), the `plain` variant from [Devicon](https://devicon.dev) (MIT).
   If neither has it (Bicep), redraw the official logo as a single `evenodd` path.
2. Strip `<title>`, `role` and every `fill="…"` attribute so it inherits `currentColor`.
3. If the glyph sits small inside its `viewBox`, tighten the `viewBox` to the drawing.
4. Keep the total a multiple of 6 (one full row on desktop, rows of 3 on mobile).

Generic hand-drawn glyphs (no usable monochrome brand logo):

| Entry | File |
| --- | --- |
| SQL & KQL | `database.svg` |
| Microsoft Defender | `shield.svg` (shield + check) |
| Microsoft Sentinel | `radar.svg` |

`bicep.svg` is a one-colour redraw of Microsoft's Bicep logo (MIT, from the `Azure/bicep` repo):
the hexagon with the arm cut out and the two hex nuts filled back in.

Azure, PowerShell, Linux and Docker come from Simple Icons.

## Adding images

Put files in `src/assets/photos/` (or another folder under `src/assets/`), import them
at the top of `profile.ts`, and pass the import as `image`:

```ts
import beach from "../assets/photos/beach.jpg";
// …
{ caption: "Baltic Sea, 2025", alt: "Sunset over the Baltic Sea", image: beach },
```

Astro then generates responsive, optimised versions. Don't use `public/` for these.

## Portrait framing

`profile.portrait.crop = { zoom, origin }` tightens the framing in CSS (no file edits):
the image is cropped with `object-fit: cover` (~0.7 ratio on desktop, square on phones),
then scaled by `zoom` around `origin` (a CSS `transform-origin`, e.g. `"100% 100%"`
keeps the bottom-right fixed so the top/left background drops out). Current photo:
`zoom: 1.22, origin: "100% 100%"`. Check both desktop and a 390px viewport after changing it.

## Placeholders still to replace

Everything marked `// TODO` in `profile.ts`:

- intro sentence, city
- current role, company, start year
- degree, university, years
- email (`mailto:`), LinkedIn URL; confirm GitHub handle
- all six languages
- technologies: Azure, PowerShell, Linux were filled in as suggestions — confirm or swap
- both work projects; university projects 04–06 are placeholders
- work case-study text (role, context, contributions, outcome)
- (done) imprint (e-Recht24) and privacy (text supplied by Noah, kept word for word) — update both if address, contact, hosting or business details change, and update privacy if the site starts collecting anything new (contact form, analytics, embeds)
- albums (title, note, period) + photos with captions, alt text, place/date (3 placeholder albums × 3 photos; the first photo of each of the first 4 albums appears on the landing page)

## Writing guidelines

- Intro: two short sentences max.
- Project descriptions: 2–3 lines on desktop (~120–180 characters). Problem → your part → result.
- Tags: 2–4 per project, technology names only.
- Site language is currently English (`<html lang="en">`). If switching to German, change `lang` in `Base.astro` and the fixed UI strings (section notes in `index.astro`, "Based in", "Contact", footer link labels).
