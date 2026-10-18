/**
 * Single source of truth for all site content.
 * The landing page, /work and /photos all render from the objects below —
 * edit text here, not in the components.
 *
 * Entries marked `TODO` are placeholders and still need real content.
 */
import type { ImageMetadata } from "astro";

export type SkillLevel = 1 | 2 | 3 | 4 | 5;

export interface Skill {
  name: string;
  /** 1 = basics … 5 = expert. Rendered as a 5-block meter. */
  level: SkillLevel;
  /** Optional short note shown under the name, e.g. "4 yrs". */
  note?: string;
}

export interface Project {
  title: string;
  /** Small mono line above the title, e.g. "Company · 2025". */
  meta: string;
  description: string;
  tags: string[];
  href?: string;
  image?: ImageMetadata;
}

/** Work projects carry extra detail for the /work case-study page. */
export interface WorkProject extends Project {
  /** URL fragment on /work, e.g. /work#project-alpha. */
  slug: string;
  role: string;
  org: string;
  period: string;
  context: string;
  contributions: string[];
  outcome: string;
}

export interface Photo {
  caption: string;
  alt: string;
  place?: string;
  date?: string;
  /** Import from src/assets/photos so Astro can optimise it. */
  image?: ImageMetadata;
}

export const profile = {
  name: { first: "Noah", last: "Becker" },
  // TODO: replace with a real one-liner.
  intro:
    "Software developer building thoughtful, reliable products. This is a placeholder intro — two short sentences about what you do and what you care about work best.",
  // TODO: add a portrait (4:5 works best) to src/assets/ and import it here.
  portrait: {
    image: undefined as ImageMetadata | undefined,
    alt: "Portrait of Noah Becker",
  },
  location: "Ludwigsburg, Germany",
  current: {
    label: "Current position",
    role: "Corporate Student",
    org: "TRUMPF SE + Co. KG",
    since: "2024",
  },
  education: {
    label: "Education",
    degree: "B.Sc. Cyber Security", // TODO
    school: "DHBW Stuttgart", // TODO
    status: "2024 – 2027", // TODO
  },
  links: {
    email: "mailto:hey@noah-becker.de", // TODO
    github: "https://github.com/noahdbecker", // TODO: confirm handle
    linkedin: "https://linkedin.com/in/noah-david-becker", // TODO
  },
};

// TODO: real languages + levels. Keep the count a multiple of 3 so the grid stays full.
export const skills: Skill[] = [
  { name: "TypeScript", level: 4 },
  { name: "Python", level: 4 },
  { name: "C#", level: 3 },
  { name: "SQL & KQL", level: 3 },
  { name: "Java", level: 2 },
  { name: "Rust", level: 1, note: "Learning" },
];

// TODO: real work projects. The landing page shows the first two; /work shows all.
export const workProjects: WorkProject[] = [
  {
    slug: "etrucker",
    title: "eTrucker Website",
    meta: "ETM Elektrotrucker Media GmbH",
    org: "ETM Elektrotrucker Media GmbH",
    period: "2025",
    role: "Website Designer & Engineer",
    description:
      "Placeholder — what the product is, what you owned, and the outcome. Two to three lines read best in this card.",
    tags: ["WordPress", "JavaScript", "PHP"],
    context:
      "Placeholder — where the project started: the problem, who it was for, and why it mattered. A short paragraph of three to four sentences is enough.",
    contributions: [
      "Placeholder — a concrete thing you designed, built or decided.",
      "Placeholder — a second contribution, ideally with a technical detail.",
      "Placeholder — something about collaboration, ownership or process.",
    ],
    outcome:
      "Placeholder — the result. Numbers work well here: performance, adoption, time saved, errors reduced.",
  },
  {
    slug: "project-beta",
    title: "Project Beta",
    meta: "Company GmbH · 2024",
    org: "Company GmbH",
    period: "2024",
    role: "Software Engineer",
    description:
      "Placeholder — the problem, your approach, and one concrete result (a number if you have one).",
    tags: ["Python", "AWS", "Docker"],
    context:
      "Placeholder — the starting point of the project and the constraints you worked within.",
    contributions: [
      "Placeholder — a concrete thing you designed, built or decided.",
      "Placeholder — a second contribution, ideally with a technical detail.",
    ],
    outcome: "Placeholder — what changed because of the project.",
  },
];

// University projects — shown as a sideways-scrolling strip, so any number works.
export const uniProjects: Project[] = [
  {
    title: "Seminar Project",
    meta: "University · 2026-2027",
    description:
      "Placeholder — research question and key finding in one or two sentences.",
    tags: ["Research", "App-Development"],
  },
  {
    title: "Security-by-Design Project",
    meta: "University · 2026",
    description: "Placeholder — what the team built and your role in it.",
    tags: ["Java", "Scrum"],
  },
  {
    title: "Rust Project",
    meta: "University · 2026",
    description: "Placeholder — topic, method and what you learned.",
    tags: ["Rust", "Terminal", "Hashing"],
  },
  // TODO: placeholders — replace or delete. Any number works; the strip scrolls.
  {
    title: "University Project 04",
    meta: "University · Year",
    description: "Placeholder — one or two sentences on topic and outcome.",
    tags: ["Tag"],
  },
  {
    title: "University Project 05",
    meta: "University · Year",
    description: "Placeholder — one or two sentences on topic and outcome.",
    tags: ["Tag"],
  },
  {
    title: "University Project 06",
    meta: "University · Year",
    description: "Placeholder — one or two sentences on topic and outcome.",
    tags: ["Tag"],
  },
];

// TODO: add photos to src/assets/photos/ and import them here.
// The landing page shows the first four; /photos shows all.
export const photos: Photo[] = [
  { caption: "Photo 01", alt: "", place: "Place", date: "2025" },
  { caption: "Photo 02", alt: "", place: "Place", date: "2025" },
  { caption: "Photo 03", alt: "", place: "Place", date: "2025" },
  { caption: "Photo 04", alt: "", place: "Place", date: "2024" },
  { caption: "Photo 05", alt: "", place: "Place", date: "2024" },
  { caption: "Photo 06", alt: "", place: "Place", date: "2024" },
  { caption: "Photo 07", alt: "", place: "Place", date: "2023" },
  { caption: "Photo 08", alt: "", place: "Place", date: "2023" },
  { caption: "Photo 09", alt: "", place: "Place", date: "2023" },
];
