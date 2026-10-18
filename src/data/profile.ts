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
  location: "Germany", // TODO: city
  current: {
    label: "Current position",
    role: "Software Engineer", // TODO
    org: "Company GmbH", // TODO
    since: "2024", // TODO
  },
  education: {
    label: "Education",
    degree: "M.Sc. Computer Science", // TODO
    school: "University Name", // TODO
    status: "2022 – 2025", // TODO
  },
  links: {
    email: "mailto:you@example.com", // TODO
    github: "https://github.com/noahdbecker", // TODO: confirm handle
    linkedin: "#", // TODO
  },
};

// TODO: real languages + levels. Keep the count a multiple of 3 so the grid stays full.
export const skills: Skill[] = [
  { name: "TypeScript", level: 5, note: "Primary" },
  { name: "Python", level: 4 },
  { name: "Java", level: 4 },
  { name: "SQL", level: 3 },
  { name: "C / C++", level: 3 },
  { name: "Go", level: 2 },
];

// TODO: real work projects. The landing page shows the first two; /work shows all.
export const workProjects: WorkProject[] = [
  {
    slug: "project-alpha",
    title: "Project Alpha",
    meta: "Company GmbH · 2025",
    org: "Company GmbH",
    period: "2025",
    role: "Software Engineer",
    description:
      "Placeholder — what the product is, what you owned, and the outcome. Two to three lines read best in this card.",
    tags: ["TypeScript", "React", "PostgreSQL"],
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

// TODO: three real university projects.
export const uniProjects: Project[] = [
  {
    title: "Master's Thesis",
    meta: "University · 2025",
    description:
      "Placeholder — research question and key finding in one or two sentences.",
    tags: ["Research", "Python"],
  },
  {
    title: "Team Software Project",
    meta: "University · 2023",
    description: "Placeholder — what the team built and your role in it.",
    tags: ["Java", "Scrum"],
  },
  {
    title: "Seminar Project",
    meta: "University · 2022",
    description: "Placeholder — topic, method and what you learned.",
    tags: ["C++", "Algorithms"],
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
