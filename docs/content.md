# Content

All copy and data live in **`src/data/profile.ts`**. Components only read from it.

## Model

| Export | Shape | Shown in |
| --- | --- | --- |
| `profile` | name, intro, portrait `{ image?, alt }`, location, current position, education, links | Header, Hero, Footer, `<title>` |
| `skills` | `{ name, level 1–5, note? }[]` | Skills grid. `note` replaces the level word (e.g. "Primary") |
| `workProjects` | `WorkProject[]` | Landing shows the first 2 (codes `W/01`, `W/02`); `/work` shows all as case studies |
| `uniProjects` | `Project[]` (3) | University section, codes `U/01`… |
| `photos` | `{ caption, alt, place?, date?, image? }[]` | Landing grid shows the first 4; `/photos` shows all |

`Project` = `{ title, meta, description, tags[], href?, image? }`.
`meta` is the small mono line above the title — keep it `Org · Year`.

`WorkProject` = `Project` + `{ slug, role, org, period, context, contributions[], outcome }`.
`slug` is the anchor on `/work` (`/work#project-alpha`) — keep it URL-safe and stable.
For work projects `meta` duplicates `org · period`; keep both in sync.

Level words: 1 Basics · 2 Working · 3 Solid · 4 Advanced · 5 Expert.

## Adding images

Put files in `src/assets/photos/` (or another folder under `src/assets/`), import them
at the top of `profile.ts`, and pass the import as `image`:

```ts
import beach from "../assets/photos/beach.jpg";
// …
{ caption: "Baltic Sea, 2025", alt: "Sunset over the Baltic Sea", image: beach },
```

Astro then generates responsive, optimised versions. Don't use `public/` for these.

## Placeholders still to replace

Everything marked `// TODO` in `profile.ts`:

- intro sentence, city
- portrait photo (`profile.portrait.image`; roughly 4:5, it's cropped with `object-fit: cover` — 4:5-ish on desktop, square on mobile)
- current role, company, start year
- degree, university, years
- email (`mailto:`), LinkedIn URL; confirm GitHub handle
- all six skills and levels
- both work projects, all three uni projects
- work case-study text (role, context, contributions, outcome)
- photos + captions + alt text + place/date (9 placeholders; first 4 appear on the landing page)

## Writing guidelines

- Intro: two short sentences max.
- Project descriptions: 2–3 lines on desktop (~120–180 characters). Problem → your part → result.
- Tags: 2–4 per project, technology names only.
- Site language is currently English (`<html lang="en">`). If switching to German, change `lang` in `Base.astro` and the fixed UI strings (section notes in `index.astro`, "Based in", "Contact", footer link labels).
