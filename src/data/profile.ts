/**
 * Single source of truth for all site content.
 * The landing page, /work and /photos all render from the objects below —
 * edit text here, not in the components.
 *
 * Entries marked `TODO` are placeholders and still need real content.
 */
import type { ImageMetadata } from "astro";
import type { SvgComponent } from "astro/types";
// Portrait
import portraitImage from "../assets/noah_portrait_big.jpg";
// Logos for skills and technologies
import typescriptLogo from "../assets/logos/typescript.svg";
import pythonLogo from "../assets/logos/python.svg";
import bicepLogo from "../assets/logos/bicep.svg";
import databaseLogo from "../assets/logos/database.svg";
import flutterLogo from "../assets/logos/flutter.svg";
import rustLogo from "../assets/logos/rust.svg";
import shieldLogo from "../assets/logos/shield.svg";
import radarLogo from "../assets/logos/radar.svg";
import azureLogo from "../assets/logos/azure.svg";
import powershellLogo from "../assets/logos/powershell.svg";
import linuxLogo from "../assets/logos/linux.svg";
import dockerLogo from "../assets/logos/docker.svg";
// Project images
import etruckerImage from "../assets/projects/eTrucker__eActros_2810.png";
import naviculaImage from "../assets/projects/Navicula__Charter_On-Tour_2.png";
import briemImage from "../assets/projects/BRIEM.jpg";
import gaImage from "../assets/projects/GA-Gmbh.png";
import immoRiethImage from "../assets/projects/immo-rieth-2.jpg";
import vesperkultImage from "../assets/projects/vesperkult.jpg";
import thera4Image from "../assets/projects/thera4.jpg";
import vgcImage from "../assets/projects/VGC.jpg";
// Photo albums
// Munich-2021-01
import munich2021_01_01 from "../assets/photos/munich-2021-01/Munich-2021-01-1.jpg";
import munich2021_01_02 from "../assets/photos/munich-2021-01/munich-2021-01-2.jpg";
import munich2021_01_03 from "../assets/photos/munich-2021-01/munich-2021-01-3.jpg";
import munich2021_01_04 from "../assets/photos/munich-2021-01/munich-2021-01-4.jpg";
import munich2021_01_05 from "../assets/photos/munich-2021-01/munich-2021-01-5.jpg";
import munich2021_01_06 from "../assets/photos/munich-2021-01/munich-2021-01-6.jpg";
import munich2021_01_07 from "../assets/photos/munich-2021-01/munich-2021-01-7.jpg";
import munich2021_01_08 from "../assets/photos/munich-2021-01/munich-2021-01-8.jpg";
import munich2021_01_09 from "../assets/photos/munich-2021-01/munich-2021-01-9.jpg";

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
  /** Live site built for the client. Adds a "Visit website" button on /work when set. */
  website?: string;
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
  location: {
    city: "Ludwigsburg",
    country: "Germany",
  },
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
  { name: "Bicep", logo: bicepLogo },
  { name: "SQL & KQL", logo: databaseLogo },
  { name: "Flutter", logo: flutterLogo },
  { name: "Rust", logo: rustLogo },
];

// Second logo row under the languages (label on the right). Same rule: multiple of 6.
// Defender and Sentinel use generic glyphs (no monochrome logo available).
export const technologies: Skill[] = [
  { name: "Microsoft Defender", logo: shieldLogo },
  { name: "Microsoft Sentinel", logo: radarLogo },
  { name: "Azure", logo: azureLogo },
  { name: "PowerShell", logo: powershellLogo },
  { name: "Linux", logo: linuxLogo },
  { name: "Docker", logo: dockerLogo },
];

// TODO: real work projects. The landing page shows the first two; /work shows all.
export const workProjects: WorkProject[] = [
  // eTrucker
  {
    slug: "etrucker",
    title: "eTrucker — Website",
    image: etruckerImage,
    meta: "ETM Elektrotrucker Media GmbH",
    org: "ETM Elektrotrucker Media GmbH",
    period: "2025-2026",
    role: "Website Designer & Engineer",
    website: "https://etrucker.io",
    description:
      "Placeholder — what the product is, what you owned, and the outcome. Two to three lines read best in this card.",
    tags: [
      "WordPress",
      "JavaScript",
      "PHP",
      "Adobe XD",
      "Gemini",
      "Claude Code",
      "Adobe Premiere Pro",
    ],
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
  // Navicula
  {
    slug: "navicula",
    title: "Navicula Logistica — Website",
    image: naviculaImage,
    meta: "Navicula Logistica d.o.o.",
    org: "Navicula Logistica d.o.o.",
    period: "2025-2026",
    role: "Website Designer & Engineer",
    website: "https://navicula-logistica.com",
    description:
      "Placeholder — the problem, your approach, and one concrete result (a number if you have one).",
    tags: ["Node.js", "Astro", "Composer", "Figma", "Claude Code"],
    context:
      "Placeholder — the starting point of the project and the constraints you worked within.",
    contributions: [
      "Placeholder — a concrete thing you designed, built or decided.",
      "Placeholder — a second contribution, ideally with a technical detail.",
    ],
    outcome: "Placeholder — what changed because of the project.",
  },
  // GA GmbH
  {
    slug: "ga-gmbh",
    title: "GA GmbH — Website",
    image: gaImage,
    meta: "GA GmbH",
    org: "GA GmbH",
    period: "2026",
    role: "Website Designer & Engineer",
    website: "https://ga-gmbh.de",
    description:
      "Placeholder — the problem, your approach, and one concrete result (a number if you have one).",
    tags: [
      "WordPress",
      "JavaScript",
      "PHP",
      "Composer",
      "Figma",
      "Claude Code",
    ],
    context:
      "Placeholder — the starting point of the project and the constraints you worked within.",
    contributions: [
      "Placeholder — a concrete thing you designed, built or decided.",
      "Placeholder — a second contribution, ideally with a technical detail.",
    ],
    outcome: "Placeholder — what changed because of the project.",
  },
  // endodiabetikum
  {
    slug: "endodiabetikum",
    title: "endodiabetikum — Website",
    meta: "PD Dr. med. Dorothee M. Baur",
    org: "PD Dr. med. Dorothee M. Baur",
    period: "2025",
    role: "Website Engineer",
    website: "https://endodiabetikum.de",
    description:
      "Placeholder — the problem, your approach, and one concrete result (a number if you have one).",
    tags: ["HTML5", "(S)CSS", "JavaScript"],
    context:
      "Placeholder — the starting point of the project and the constraints you worked within.",
    contributions: [
      "Placeholder — a concrete thing you designed, built or decided.",
      "Placeholder — a second contribution, ideally with a technical detail.",
    ],
    outcome: "Placeholder — what changed because of the project.",
  },
  // ImmoRieth
  {
    slug: "immorieth",
    title: "ImmoRieth — Website",
    image: immoRiethImage,
    meta: "Immobilien Rieth",
    org: "Immobilien Rieth",
    period: "2025",
    role: "Website Designer & Engineer",
    website: "https://immo-rieth.de",
    description:
      "Placeholder — the problem, your approach, and one concrete result (a number if you have one).",
    tags: ["WordPress", "JavaScript", "PHP"],
    context:
      "Placeholder — the starting point of the project and the constraints you worked within.",
    contributions: [
      "Placeholder — a concrete thing you designed, built or decided.",
      "Placeholder — a second contribution, ideally with a technical detail.",
    ],
    outcome: "Placeholder — what changed because of the project.",
  },
  // TSV Ehningen
  {
    slug: "tsv-ehningen",
    title: "TSV Ehningen — Website",
    meta: "TSV Ehningen",
    org: "TSV Ehningen",
    period: "2025 - now",
    role: "Website Maintenace & Consulting",
    website: "https://tsv-ehningen.de",
    description:
      "Placeholder — the problem, your approach, and one concrete result (a number if you have one).",
    tags: ["WordPress", "JavaScript", "PHP"],
    context:
      "Placeholder — the starting point of the project and the constraints you worked within.",
    contributions: [
      "Placeholder — a concrete thing you designed, built or decided.",
      "Placeholder — a second contribution, ideally with a technical detail.",
    ],
    outcome: "Placeholder — what changed because of the project.",
  },
  // BRIEM
  {
    slug: "briem",
    title: "BRIEM Speditions-GmbH — Website",
    image: briemImage,
    meta: "BRIEM Speditions-GmbH",
    org: "BRIEM Speditions-GmbH",
    period: "2023-2024",
    role: "Website Designer & Engineer + Drone Pilot",
    website: "https://briem-sped.com",
    description:
      "Placeholder — the problem, your approach, and one concrete result (a number if you have one).",
    tags: [
      "WordPress",
      "JavaScript",
      "PHP",
      "Adobe Premiere Pro",
      "Drone Videography",
    ],
    context:
      "Placeholder — the starting point of the project and the constraints you worked within.",
    contributions: [
      "Placeholder — a concrete thing you designed, built or decided.",
      "Placeholder — a second contribution, ideally with a technical detail.",
    ],
    outcome: "Placeholder — what changed because of the project.",
  },
  // Vesperkult
  {
    slug: "vesperkult",
    title: "Vesperkult — Website",
    image: vesperkultImage,
    meta: "VGC Backwaren GmbH & Co. KG",
    org: "VGC Backwaren GmbH & Co. KG",
    period: "2023-2024",
    role: "Website Designer & Engineer + Photo- & Videographer",
    website: "https://vesperkult.de",
    description:
      "Placeholder — the problem, your approach, and one concrete result (a number if you have one).",
    tags: [
      "WordPress",
      "JavaScript",
      "PHP",
      "Adobe Lightroom",
      "Adobe Premiere Pro",
    ],
    context:
      "Placeholder — the starting point of the project and the constraints you worked within.",
    contributions: [
      "Placeholder — a concrete thing you designed, built or decided.",
      "Placeholder — a second contribution, ideally with a technical detail.",
    ],
    outcome: "Placeholder — what changed because of the project.",
  },
  // thera4
  {
    slug: "thera4",
    title: "thera4 — Website",
    image: thera4Image,
    meta: "thera4 GbR",
    org: "thera4 GbR",
    period: "2023",
    role: "Website Designer & Engineer",
    website: "https://thera4.de",
    description:
      "Placeholder — the problem, your approach, and one concrete result (a number if you have one).",
    tags: ["WordPress", "JavaScript", "PHP"],
    context:
      "Placeholder — the starting point of the project and the constraints you worked within.",
    contributions: [
      "Placeholder — a concrete thing you designed, built or decided.",
      "Placeholder — a second contribution, ideally with a technical detail.",
    ],
    outcome: "Placeholder — what changed because of the project.",
  },
  // VGC
  {
    slug: "vgc",
    title: "VGC Calw — Website",
    image: vgcImage,
    meta: "Verbrauchergenossenschaft Calw eG",
    org: "Verbrauchergenossenschaft Calw eG",
    period: "2021-2022",
    role: "Website Designer & Engineer + Photo- & Videographer + Drone Pilot",
    website: "https://vgc-calw.de",
    description:
      "Placeholder — the problem, your approach, and one concrete result (a number if you have one).",
    tags: [
      "WordPress",
      "JavaScript",
      "PHP",
      "Adobe Lightroom",
      "Adobe Premiere Pro",
      "Drone Videography",
    ],
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
    meta: "Bachelor · 2026-2027",
    description:
      "Development of a mobile application for iOS and Android with Flutter, including a backend API.",
    tags: ["Research", "App-Development", "iOS", "Android", "Flutter"],
  },
  {
    title: "Security-by-Design Project",
    meta: "Bachelor · 2026",
    description:
      "Implementation of a web application with industry-standard security features.",
    tags: [
      "React",
      "Python FastAPI",
      "Authentication",
      "TOTP",
      "Session Handling",
    ],
  },
  {
    title: "Rust Project",
    meta: "Bachelor · 2026",
    description:
      "A Rust-based command-line tool for file integrity verification and hashing.",
    tags: ["Rust", "Terminal", "Integrity", "Cryptography", "Hashing"],
  },
  // TODO: placeholders — replace or delete. Any number works; the strip scrolls.
  {
    title: "Project thesis #2",
    meta: "Bachelor · 2026",
    description:
      "University paper with focus on security-relevant tenant data & vulnerability management.",
    tags: [
      "Paper",
      "Microsoft Graph API",
      "SQL & KQL",
      "Power BI",
      "Azure",
      "Bicep IaC",
    ],
  },
  {
    title: "Software Engineering Project",
    meta: "Bachelor · 2025",
    description:
      "Work on an open-source project with a team of students. Taking ownership of the infrastructure and CI/CD pipelines.",
    tags: [
      "Open Source",
      "Kanban",
      "CI/CD",
      "Docker",
      "GitHub Actions",
      "Infrastructure",
    ],
  },
  {
    title: "Project thesis #1",
    meta: "Bachelor · 2025",
    description:
      "University paper with focus on PowerShell testing in CI/CD pipelines for VMware environments.",
    tags: [
      "Paper",
      "CI/CD",
      "Testing",
      "Quality Assurance",
      "VMware",
      "PowerShell",
    ],
  },
];

// TODO: add photos to src/assets/photos/, import them here and group them into albums.
// /photos shows one block per album; the landing page shows the first photo of the first four albums.
export const albums: Album[] = [
  // Hanover 2026-01
  {
    slug: "hanover-2026-01",
    title: "Hanover, Germany",
    note: "Placeholder — one line about where or what this album is.",
    period: "2026",
    photos: [
      { caption: "Photo 01", alt: "", place: "Place", date: "2025" },
      { caption: "Photo 02", alt: "", place: "Place", date: "2025" },
      { caption: "Photo 03", alt: "", place: "Place", date: "2025" },
    ],
  },
  // Leipzig 2026-01
  {
    slug: "leipzig-2026-01",
    title: "Leipzig, Germany",
    note: "Placeholder — one line about where or what this album is.",
    period: "2026",
    photos: [
      { caption: "Photo 01", alt: "", place: "Place", date: "2025" },
      { caption: "Photo 02", alt: "", place: "Place", date: "2025" },
      { caption: "Photo 03", alt: "", place: "Place", date: "2025" },
    ],
  },
  // Netherlands 2025-01
  {
    slug: "netherlands-2025-01",
    title: "Netherlands",
    note: "Placeholder — one line about where or what this album is.",
    period: "2025",
    photos: [
      { caption: "Photo 01", alt: "", place: "Place", date: "2025" },
      { caption: "Photo 02", alt: "", place: "Place", date: "2025" },
      { caption: "Photo 03", alt: "", place: "Place", date: "2025" },
    ],
  },
  // Lago Maggiore 2024-01
  {
    slug: "lagomaggiore-2024-01",
    title: "Lago Maggiore, Swiss/Italy",
    note: "Placeholder — one line about where or what this album is.",
    period: "2024",
    photos: [
      { caption: "Photo 01", alt: "", place: "Place", date: "2025" },
      { caption: "Photo 02", alt: "", place: "Place", date: "2025" },
      { caption: "Photo 03", alt: "", place: "Place", date: "2025" },
    ],
  },
  // Crotia 2024-01
  {
    slug: "crotia-2024-01",
    title: "Croatia",
    note: "Placeholder — one line about where or what this album is.",
    period: "2024",
    photos: [
      { caption: "Photo 01", alt: "", place: "Place", date: "2025" },
      { caption: "Photo 02", alt: "", place: "Place", date: "2025" },
      { caption: "Photo 03", alt: "", place: "Place", date: "2025" },
    ],
  },
  // Hamburg 2023-02
  {
    slug: "hamburg-2023-02",
    title: "Hamburg, Germany (Autumn)",
    note: "Placeholder — one line about where or what this album is.",
    period: "2023",
    photos: [
      { caption: "Photo 01", alt: "", place: "Place", date: "2025" },
      { caption: "Photo 02", alt: "", place: "Place", date: "2025" },
      { caption: "Photo 03", alt: "", place: "Place", date: "2025" },
    ],
  },
  // South Tirol 2023-01
  {
    slug: "southtirol-2023-01",
    title: "South Tirol, Italy",
    note: "Placeholder — one line about where or what this album is.",
    period: "2023",
    photos: [
      { caption: "Photo 01", alt: "", place: "Place", date: "2025" },
      { caption: "Photo 02", alt: "", place: "Place", date: "2025" },
      { caption: "Photo 03", alt: "", place: "Place", date: "2025" },
    ],
  },
  // Hamburg 2023-01
  {
    slug: "hamburg-2023-01",
    title: "Hamburg, Germany (Summer)",
    note: "Placeholder — one line about where or what this album is.",
    period: "2023",
    photos: [
      { caption: "Photo 01", alt: "", place: "Place", date: "2025" },
      { caption: "Photo 02", alt: "", place: "Place", date: "2025" },
      { caption: "Photo 03", alt: "", place: "Place", date: "2025" },
    ],
  },
  // Crete 2022-01
  {
    slug: "crete-2022-01",
    title: "Crete, Greece",
    note: "Placeholder — one line about where or what this album is.",
    period: "2022",
    photos: [
      { caption: "Photo 01", alt: "", place: "Place", date: "2025" },
      { caption: "Photo 02", alt: "", place: "Place", date: "2025" },
      { caption: "Photo 03", alt: "", place: "Place", date: "2025" },
    ],
  },
  // Ludwigsburg 2021-01
  {
    slug: "ludwigsburg-2021-01",
    title: "Ludwigsburg, Germany",
    note: "Placeholder — one line about where or what this album is.",
    period: "2021",
    photos: [
      { caption: "Photo 04", alt: "", place: "Place", date: "2024" },
      { caption: "Photo 05", alt: "", place: "Place", date: "2024" },
      { caption: "Photo 06", alt: "", place: "Place", date: "2024" },
    ],
  },
  // Munich 2021-01
  {
    slug: "munich-2021-01",
    title: "Munich, Germany",
    note: "Placeholder — one line about where or what this album is.",
    period: "2021",
    photos: [
      {
        caption: "Munich 01",
        alt: "",
        place: "Munich",
        date: "2021",
        image: munich2021_01_01 as ImageMetadata | undefined,
      },
      {
        caption: "Munich 02",
        alt: "",
        place: "Munich",
        date: "2021",
        image: munich2021_01_02 as ImageMetadata | undefined,
      },
      {
        caption: "Munich 03",
        alt: "",
        place: "Munich",
        date: "2021",
        image: munich2021_01_03 as ImageMetadata | undefined,
      },
      {
        caption: "Munich 04",
        alt: "",
        place: "Munich",
        date: "2021",
        image: munich2021_01_04 as ImageMetadata | undefined,
      },
      {
        caption: "Munich 05",
        alt: "",
        place: "Munich",
        date: "2021",
        image: munich2021_01_05 as ImageMetadata | undefined,
      },
      {
        caption: "Munich 06",
        alt: "",
        place: "Munich",
        date: "2021",
        image: munich2021_01_06 as ImageMetadata | undefined,
      },
      {
        caption: "Munich 07",
        alt: "",
        place: "Munich",
        date: "2021",
        image: munich2021_01_07 as ImageMetadata | undefined,
      },
      {
        caption: "Munich 08",
        alt: "",
        place: "Munich",
        date: "2021",
        image: munich2021_01_08 as ImageMetadata | undefined,
      },
      {
        caption: "Munich 09",
        alt: "",
        place: "Munich",
        date: "2021",
        image: munich2021_01_09 as ImageMetadata | undefined,
      },
    ],
  },
];

/** Landing grid: the first photo of each album, in album order, at most four. */
export const albumCovers: Photo[] = albums
  .filter((album) => album.photos.length > 0)
  .slice(0, 4)
  .map((album) => album.photos[0]);

/**
 * A legal page (/imprint, /privacy): heading + paragraphs per section.
 * Line breaks inside a paragraph ("\n") are kept, e.g. for an address.
 */
export interface LegalPage {
  title: string;
  /** Small mono line above the title. */
  kicker: string;
  note?: string;
  sections: { heading: string; paragraphs: string[] }[];
}

// TODO: fill in all placeholders. Impressum under § 5 DDG (formerly § 5 TMG).
export const imprint: LegalPage = {
  title: "Imprint",
  kicker: "Legal — Impressum",
  note: "Provider information under German law. Last updated: TODO.",
  sections: [
    {
      heading: "Information according to §\u00a05 DDG",
      paragraphs: [
        "Noah Becker\nTODO Street and number\nTODO Postcode City\nGermany",
      ],
    },
    {
      heading: "Contact",
      paragraphs: ["Email: TODO\nPhone: TODO"],
    },
    {
      heading: "Responsible for content",
      paragraphs: [
        "Responsible according to §\u00a018 (2) MStV:\nNoah Becker\nTODO address (as above)",
      ],
    },
  ],
};

// TODO: fill in all placeholders. Datenschutzerklärung under Art. 13 GDPR.
export const privacy: LegalPage = {
  title: "Privacy",
  kicker: "Legal — Datenschutzerklärung",
  note: "How this site handles personal data. Last updated: TODO.",
  sections: [
    {
      heading: "Controller",
      paragraphs: [
        "Noah Becker\nTODO Street and number\nTODO Postcode City\nGermany\nEmail: TODO",
      ],
    },
    {
      heading: "Overview",
      paragraphs: [
        "TODO: short summary of what data this site processes and why.",
      ],
    },
    {
      heading: "Hosting and server logs",
      paragraphs: [
        "TODO: hosting provider, what the server logs (IP address, time, requested page, browser), legal basis, retention period, data processing agreement.",
      ],
    },
    {
      heading: "Cookies, tracking and fonts",
      paragraphs: [
        "TODO: confirm. This site sets no cookies, uses no analytics and loads no third-party resources; fonts are hosted on this server. A single timestamp is kept in your browser's session storage to animate page changes and is deleted when you close the tab.",
      ],
    },
    {
      heading: "Contact by email",
      paragraphs: [
        "TODO: what happens with data you send by email, legal basis, how long it's kept.",
      ],
    },
    {
      heading: "External links",
      paragraphs: [
        "TODO: links to GitHub and LinkedIn lead to third-party sites; their privacy policies apply once you follow them.",
      ],
    },
    {
      heading: "Your rights",
      paragraphs: [
        "TODO: access, rectification, erasure, restriction, data portability and objection (Art. 15–21 GDPR), and the right to lodge a complaint with a supervisory authority (e.g. LfDI Baden-Württemberg).",
      ],
    },
  ],
};
