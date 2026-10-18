# Content

All copy and data live in **`src/data/profile.ts`**. Components only read from it.

## Model

| Export | Shape | Shown in |
| --- | --- | --- |
| `profile` | name, intro, portrait `{ image?, alt, crop? }`, location, current position, education, links | Header, Hero, Footer, `<title>` |
| `skills` | `{ name, logo }[]` | Skills logo row. `logo` is an imported SVG from `src/assets/logos/` |
| `workProjects` | `WorkProject[]` | Landing shows the first 2 (codes `W/01`, `W/02`); `/work` shows all as case studies |
| `uniProjects` | `Project[]` (any number) | University strip (scrolls sideways), codes `U/01`… |
| `photos` | `{ caption, alt, place?, date?, image? }[]` | Landing grid shows the first 4; `/photos` shows all |

`Project` = `{ title, meta, description, tags[], href?, image? }`.
`meta` is the small mono line above the title — keep it `Org · Year`.

`WorkProject` = `Project` + `{ slug, role, org, period, context, contributions[], outcome }`.
`slug` is the anchor on `/work` (`/work#project-alpha`) — keep it URL-safe and stable.
For work projects `meta` duplicates `org · period`; keep both in sync.

## Language logos

Logos are single-colour SVGs in `src/assets/logos/`, imported at the top of `profile.ts`
and rendered as Astro SVG components in `--fg`. To add one:

1. Take the monochrome glyph from [Simple Icons](https://simpleicons.org) (CC0) or, if it's
   missing there (C#, Java), the `plain` variant from [Devicon](https://devicon.dev) (MIT).
2. Strip `<title>`, `role` and every `fill="…"` attribute so it inherits `currentColor`.
3. If the glyph sits small inside its `viewBox`, tighten the `viewBox` to the drawing.
4. Keep the total a multiple of 6 (one full row on desktop, rows of 3 on mobile).

"SQL & KQL" has no official logo and uses a generic database glyph (`database.svg`).

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
- both work projects; university projects 04–06 are placeholders
- work case-study text (role, context, contributions, outcome)
- photos + captions + alt text + place/date (9 placeholders; first 4 appear on the landing page)

## Writing guidelines

- Intro: two short sentences max.
- Project descriptions: 2–3 lines on desktop (~120–180 characters). Problem → your part → result.
- Tags: 2–4 per project, technology names only.
- Site language is currently English (`<html lang="en">`). If switching to German, change `lang` in `Base.astro` and the fixed UI strings (section notes in `index.astro`, "Based in", "Contact", footer link labels).
