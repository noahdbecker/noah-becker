/**
 * Single source of truth for all site content.
 * The landing page, /work and /photos all render from the objects below —
 * edit text here, not in the components.
 *
 * Entries marked `TODO` are placeholders and still need real content.
 */
import type { ImageMetadata } from "astro";
import type { SvgComponent } from "astro/types";
import portraitImage from "../assets/noah_portrait_big.jpg";
import typescriptLogo from "../assets/logos/typescript.svg";
import pythonLogo from "../assets/logos/python.svg";
import csharpLogo from "../assets/logos/csharp.svg";
import databaseLogo from "../assets/logos/database.svg";
import javaLogo from "../assets/logos/java.svg";
import rustLogo from "../assets/logos/rust.svg";
import shieldLogo from "../assets/logos/shield.svg";
import radarLogo from "../assets/logos/radar.svg";
import directoryLogo from "../assets/logos/directory.svg";
import azureLogo from "../assets/logos/azure.svg";
import powershellLogo from "../assets/logos/powershell.svg";
import linuxLogo from "../assets/logos/linux.svg";

export interface Skill {
  name: string;
  /** Monochrome SVG from src/assets/logos, drawn in the text colour. */
  logo: SvgComponent;
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

/** A group of photos on /photos, e.g. one trip or one theme. */
export interface Album {
  /** URL fragment on /photos, e.g. /photos#japan. */
  slug: string;
  title: string;
  /** One short line under the album title. */
  note?: string;
  /** Shown next to the photo count, e.g. "2025" or "2023 – 2025". */
  period?: string;
  photos: Photo[];
}

export const profile = {
  name: { first: "Noah", last: "Becker" },
  // TODO: replace with a real one-liner.
  intro:
    "Software developer building thoughtful, reliable products. This is a placeholder intro — two short sentences about what you do and what you care about work best.",
  portrait: {
    image: portraitImage as ImageMetadata | undefined,
    alt: "Portrait of Noah Becker",
    // Tighter framing: zoom in, anchored at the bottom-right so the top/left
    // background drops out. Re-tune when the photo changes.
    crop: { zoom: 1.22, origin: "100% 100%" } as
      | { zoom: number; origin: string }
      | undefined,
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

// Shown as a row of logos. Keep the count a multiple of 6 so the grid stays full.
export const skills: Skill[] = [
  { name: "TypeScript", logo: typescriptLogo },
  { name: "Python", logo: pythonLogo },
  { name: "C#", logo: csharpLogo },
  { name: "SQL & KQL", logo: databaseLogo },
  { name: "Java", logo: javaLogo },
  { name: "Rust", logo: rustLogo },
];

// Second logo row under the languages (label on the right). Same rule: multiple of 6.
// Defender, Sentinel and Active Directory use generic glyphs (no monochrome logo available).
export const technologies: Skill[] = [
  { name: "Microsoft Defender", logo: shieldLogo },
  { name: "Microsoft Sentinel", logo: radarLogo },
  { name: "Active Directory", logo: directoryLogo },
  { name: "Azure", logo: azureLogo }, // TODO: confirm
  { name: "PowerShell", logo: powershellLogo }, // TODO: confirm
  { name: "Linux", logo: linuxLogo }, // TODO: confirm
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

// TODO: add photos to src/assets/photos/, import them here and group them into albums.
// /photos shows one block per album; the landing page shows the first four photos overall.
export const albums: Album[] = [
  {
    slug: "album-01",
    title: "Album 01",
    note: "Placeholder — one line about where or what this album is.",
    period: "2025",
    photos: [
      { caption: "Photo 01", alt: "", place: "Place", date: "2025" },
      { caption: "Photo 02", alt: "", place: "Place", date: "2025" },
      { caption: "Photo 03", alt: "", place: "Place", date: "2025" },
    ],
  },
  {
    slug: "album-02",
    title: "Album 02",
    note: "Placeholder — one line about where or what this album is.",
    period: "2024",
    photos: [
      { caption: "Photo 04", alt: "", place: "Place", date: "2024" },
      { caption: "Photo 05", alt: "", place: "Place", date: "2024" },
      { caption: "Photo 06", alt: "", place: "Place", date: "2024" },
    ],
  },
  {
    slug: "album-03",
    title: "Album 03",
    note: "Placeholder — one line about where or what this album is.",
    period: "2023",
    photos: [
      { caption: "Photo 07", alt: "", place: "Place", date: "2023" },
      { caption: "Photo 08", alt: "", place: "Place", date: "2023" },
      { caption: "Photo 09", alt: "", place: "Place", date: "2023" },
    ],
  },
];

export const photos: Photo[] = albums.flatMap((album) => album.photos);
