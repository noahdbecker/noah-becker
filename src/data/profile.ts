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
  /** URL fragment on /work, e.g. /work/#project-alpha. */
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
  /** URL fragment on /photos, e.g. /photos/#japan. */
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
    degree: "B.Sc. Cyber Security",
    school: "DHBW Stuttgart",
    status: "2024 – 2027",
  },
  links: {
    email: "mailto:hey@noah-becker.de",
    github: "https://github.com/noahdbecker",
    linkedin: "https://linkedin.com/in/noah-david-becker",
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
    period: "2025-today",
    role: "Website Designer, Engineer & Maintenance",
    website: "https://etrucker.io",
    description:
      "Bilingual website for eTrucker – app, charging chip and fleet manager for electric trucks – from the team behind Elektrotrucker, a YouTube channel with over 100k subscribers.",
    tags: [
      "WordPress",
      "Vite",
      "Tailwind CSS",
      "Adobe XD",
      "Adobe Premiere Pro",
      "Gemini",
    ],
    context:
      "ETM Elektrotrucker Media GmbH is the company behind Elektrotrucker, Tobias Wagner's YouTube channel about driving electric trucks across Europe, with over 100k subscribers. Its eTrucker system combines a free routing app for drivers, a chip that bundles a fleet's direct charging contracts and a manager for dispatchers, alongside a greenhouse gas quota (THG) service and a 2026 world tour. The site had to explain this to fleet operators, dispatchers and drivers in German and English, stay true to the existing brand and turn interest into enquiries.",
    contributions: [
      "Design within the brand — page layouts designed in Adobe XD around eTrucker's existing logo and colours, illustrated with AI-generated imagery from Gemini, responsive from phone to desktop.",
      "Theme from scratch — a custom WordPress theme bundled with Vite and styled with Tailwind CSS, with block styles for headings, text, containers and buttons.",
      "Own block library — a custom plugin of nine React and ACF blocks, written AI-assisted with Gemini: video hero, product slider, pricing table with a 12/24-month toggle, FAQ accordion, operator carousels and, the toughest, an animated journey contrasting dispatch, driving and charging with and without eTrucker.",
      "Video & pages — the homepage video, cut in Adobe Premiere Pro, plus a system page with products, pricing and FAQ, a THG quota page and the World Tour 2026 page.",
      "Two languages — German and English with Polylang, localised URLs and hreflang tags; translated with DeepL and reviewed by the client.",
      "Privacy & operations — CCM19 cookie consent, the initial HubSpot, Matomo and beehiiv integrations the client now runs, and ongoing changes and additions on request.",
    ],
    outcome:
      "eTrucker presents its whole system – app, chip, manager, pricing and THG service – on one bilingual site that keeps growing with the product. In the three months to October 2026 it earned 40k Google search impressions and 9.2k clicks, 5k of them in the last 28 days.",
  },
  // Navicula
  {
    slug: "navicula",
    title: "Navicula Logistica — Website",
    image: naviculaImage,
    meta: "Navicula Logistica d.o.o.",
    org: "Navicula Logistica d.o.o.",
    period: "2025-2026",
    role: "Logo & Website Designer, Engineer",
    website: "https://navicula-logistica.com",
    description:
      "Logo and trilingual website for a transport company on the Croatian coast – freight, B2B boat charters and an upcoming yacht transport service, in German, English and Croatian.",
    tags: [
      "Astro",
      "Tailwind CSS",
      "TypeScript",
      "Adobe XD",
      "Figma",
      "Claude Code",
    ],
    context:
      "Navicula Logistica is a transport company in Novi Vinodolski near the port of Rijeka, run by the same family as BRIEM Speditions-GmbH. It moves part and full loads across Croatia and Europe, runs B2B charters on an Invictus 320 GTS along the Adriatic coast, and is preparing a European yacht transport service. The site had to present three very different services to German, English and Croatian-speaking business customers and lead each of them to a direct enquiry.",
    contributions: [
      "Brand & design — the Navicula logo and colour palette, then a layout designed in Adobe XD, moved to Figma and illustrated with AI-generated imagery.",
      "Static Astro site — Astro, Tailwind CSS and TypeScript, built AI-assisted with Claude Code from the Figma design; page content in YAML per language, all pages generated from one route, images served as responsive WebP.",
      "Three languages — the client's German, English and Croatian copy with localised URLs, a language switcher and hreflang tags; old URLs redirect after the restructure.",
      "One page per service — a homepage that splits into transport and charter, a charter page for the Invictus 320 GTS covering equipment, safety and season, and a 'coming soon' page announcing yacht transport.",
      "Privacy & deployment — Impressum and privacy policy, self-hosted fonts, no tracking and therefore no cookie banner, plus the deployment to the client's Plesk hosting.",
    ],
    outcome:
      "Navicula now presents all three services in the languages its customers speak, under one brand I designed from the logo up – with every page ending in a direct way to get in touch.",
  },
  // GA GmbH
  {
    slug: "ga-gmbh",
    title: "GA GmbH — Website",
    image: gaImage,
    meta: "GA GmbH",
    org: "GA GmbH",
    period: "2026-today",
    role: "Website Designer, Engineer & Maintenance",
    website: "https://ga-gmbh.de",
    description:
      "Relaunch for a Dortmund building automation company – replacing a dated, non-responsive site with one that presents its services, own products and open jobs.",
    tags: ["WordPress", "Vite", "Tailwind CSS", "Figma", "Claude Code"],
    context:
      "GA Gebäude Automatisierung GmbH develops its own automation stations and the GA-Leit building management system, used by clients such as Dortmund Airport, Grünenthal and several Sparkassen. Its old website was very dated and did not work on phones. The new one had to explain a highly technical offer – from consulting to BACnet hardware – to facility managers and planners, help with recruiting, and stay true to the existing brand.",
    contributions: [
      "Design within the brand — a new layout designed in Figma around GA's existing logo and colours, responsive from phone to desktop.",
      "Theme from scratch — a hand-built WordPress theme on a Composer-managed Bedrock setup, bundled with Vite and styled with Tailwind CSS.",
      "Own block library — a custom plugin with React and ACF blocks (hero, stats, reference slider, contact form, layout container) plus text and button styles, so pages can be edited in the block editor without breaking the design. Written AI-assisted with Claude Code.",
      "Products & careers — GA's content turned into a services homepage, spec sheets for around ten hardware components, a software overview and a jobs page with open positions.",
      "Privacy & operations — Contact Form 7 with ALTCHA instead of reCAPTCHA, CCM19 cookie consent, self-hosted fonts, a deployment process, and ongoing maintenance.",
    ],
    outcome:
      "Since the 2026 relaunch, GA has a modern website that works on any device and gives its products, references and open jobs a proper home – maintained and extended by me as needs change.",
  },
  // endodiabetikum
  {
    slug: "endodiabetikum",
    title: "Endodiabetikum — Website",
    meta: "PD Dr. med. Dorothee M. Baur",
    org: "PD Dr. med. Dorothee M. Baur",
    period: "2025-today",
    role: "Website Engineer & Maintenance",
    website: "https://endodiabetikum.de",
    description:
      "The first website for an endocrinology and diabetes practice in Illertissen – one clear page with address, opening hours and contact details that patients check regularly.",
    tags: ["HTML5", "CSS3", "Usercentrics", "Google Search Console"],
    context:
      "Endodiabetikum is the endocrinology and diabetes practice of PD Dr. med. Dorothee M. Baur in Illertissen. It had no website at all. Patients mainly need to know where the practice is, when it is open and how to reach it – so the site had to answer exactly that, quickly and on any device, while complying with German privacy law.",
    contributions: [
      "One page, one job — hand-written HTML and CSS with no framework or build step: a full-screen map with a contact card showing address, opening hours and one-tap phone, fax and email links.",
      "Privacy by default — Usercentrics cookie consent set up from scratch, Google Maps blocked until consent, fonts hosted on the site instead of loaded from Google, plus Impressum and privacy policy.",
      "Hiring banner — a job-ads banner the practice can switch on when it is recruiting, listing the open positions and an application address.",
      "Hosting & upkeep — hosting, Google Search Console setup and ongoing small updates such as changed opening hours.",
    ],
    outcome:
      "The practice has had an online presence since 2025. Patients regularly use the site to check opening hours and contact details, and small updates keep it current.",
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
      "A calm, personal website for a Ludwigsburg real estate agent specialising in rentals – built to earn the trust of property owners and connect them with the right tenants.",
    tags: ["WordPress", "PHP", "JavaScript", "Contact Form 7", "Usercentrics"],
    context:
      "Immobilien Rieth is a one-person agency in Ludwigsburg focused on renting out property – personal, reliable and fully digital. The website needed to reflect that personal approach, explain the service clearly to two very different audiences – property owners and prospective tenants – and stay simple enough for the owner to maintain himself.",
    contributions: [
      "A custom design — a hand-built WordPress theme (BlankSlate child theme) with a clear, text-led layout instead of an off-the-shelf template.",
      "Two audiences, two paths — dedicated pages for owners (service, process, fees) and for prospective tenants (waiting list), plus a testimonial carousel on the homepage as social proof.",
      "GDPR-compliant setup — Usercentrics cookie consent configured from scratch, Contact Form 7 enquiries, lazy-loaded images, and legal pages.",
    ],
    outcome:
      "The website gives the agency a professional, trustworthy online presence that matches its personal approach, and brings in enquiries from both owners and tenants through a single contact point.",
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
    period: "2023-today",
    role: "Website Designer & Engineer + Drone Pilot",
    website: "https://briem-sped.com",
    description:
      "A content-rich website for a family-run hazardous goods logistics company near Stuttgart – presenting services, certifications and careers to customers and future trainees.",
    tags: [
      "WordPress",
      "JavaScript",
      "PHP",
      "Usercentrics",
      "Adobe Premiere Pro",
      "Drone Videography",
    ],
    context:
      "BRIEM is a third-generation family business founded in 1946, specialising in the storage and transport of hazardous materials from two sites in Filderstadt and Münsingen. The website has to speak to very different audiences – industrial customers looking for a certified logistics partner, neighbours who must be informed under the Major Accidents Ordinance, and young people looking for vocational training or a dual study place – while remaining easy for the company to keep up to date.",
    contributions: [
      "A custom design — a hand-built WordPress theme (BlankSlate child theme) with full-screen video headers, a responsive layout and a footer mega-menu instead of an off-the-shelf template.",
      "Content structure — six service pages with case studies, a company history timeline back to 1946, certificate pages with downloads (ISO 9001/14001, SQAS, AEO-F …), a careers section and a news blog.",
      "GDPR-compliant integrations — Usercentrics cookie consent, Google Maps embeds for both sites, lazy-loaded media and links to the shipment tracking and warehouse management tools.",
      "Drone footage — aerial shots of the sites for BRIEM's internal use.",
    ],
    outcome:
      "The website gives BRIEM a modern, trustworthy presence that matches its certifications and experience. It brings customer information, legal disclosures and recruiting together in one place, and I still look after it as the content grows.",
  },
  // Vesperkult
  {
    slug: "vesperkult",
    title: "Vesperkult — Website",
    image: vesperkultImage,
    meta: "VGC Backwaren GmbH & Co. KG",
    org: "VGC Backwaren GmbH & Co. KG",
    period: "2023-today",
    role: "Website Designer & Engineer + Photo- & Videographer",
    website: "https://vesperkult.de",
    description:
      "A warm, food-led website for a young regional bakery brand with five shops in EDEKA markets – presenting its branches, story and open jobs, with my own image film and photos.",
    tags: [
      "WordPress",
      "PHP",
      "JavaScript",
      "Usercentrics",
      "Adobe Lightroom",
      "Adobe Premiere Pro",
    ],
    context:
      "Vesperkult is the bakery brand of VGC Backwaren GmbH & Co. KG, founded in 2021 as a subsidiary of the Verbrauchergenossenschaft Calw eG. It runs five bakery shops inside EDEKA markets between Calw, Böblingen and the Black Forest, selling bread, cakes and Swabian ‘Vesper’ classics. As a new brand it needed a website that makes it known locally, gives every shop its own page, and supports the ongoing search for sales staff.",
    contributions: [
      "A custom design — a hand-built WordPress theme (BlankSlate child theme) based on the existing Vesperkult brand, with a full-width image-film header and a warm, food-led look.",
      "Branch pages — one page per shop with address, opening hours, route link, contact, opening date, team contact and a photo slider, each linked to its EDEKA market page.",
      "Careers section — open positions listed per branch, with the job ads published by the management themselves.",
      "Photo & video — the image film on the homepage, shop photos and team portraits, shot and edited in Lightroom and Premiere Pro.",
      "GDPR-compliant setup — Usercentrics cookie consent configured from scratch, lazy-loaded media and legal pages.",
    ],
    outcome:
      "Vesperkult got a consistent online presence from its first shops onwards. The site grew with the brand from four to five branches, remains the central place for branch information and recruiting, and I still look after it.",
  },
  // thera4
  {
    slug: "thera4",
    title: "thera4 — Website",
    image: thera4Image,
    meta: "thera4 GbR",
    org: "thera4 GbR",
    period: "2022",
    role: "Website Designer & Engineer",
    website: "https://thera4.de",
    description:
      "A first website for a long-established physio and sports therapy practice in Ludwigsburg – services, opening hours, team and directions on one clear page.",
    tags: [
      "WordPress",
      "PHP",
      "JavaScript",
      "Usercentrics",
      "Smart Slider 3",
      "Google My Maps",
    ],
    context:
      "thera4 is a physiotherapy and sports therapy practice in Ludwigsburg that has been treating patients since 1993, with a team of eleven. Until 2022 it had no website at all. It needed a first online presence that answers what patients actually ask – which treatments are offered and covered by statutory health insurance, when the practice and reception are open, and how to get there – without anything the team would have to maintain day to day.",
    contributions: [
      "A custom design — a hand-built WordPress theme (BlankSlate child theme) as a single page with anchor navigation, custom SVG graphics and a loading screen, instead of an off-the-shelf template.",
      "Clear patient information — fourteen services with short explanations and private-pay treatments marked, separate practice and reception hours, and a team slider (Smart Slider 3) with portraits of all eleven team members, some of them photographed by me.",
      "Directions & GDPR — a custom Google My Maps map next to parking and public transport directions, lazy-loaded, and Usercentrics cookie consent configured from scratch.",
    ],
    outcome:
      "After almost 30 years in business the practice got its first website: one page where patients find services, opening hours, the team and directions – still in use today.",
  },
  // VGC
  {
    slug: "vgc",
    title: "VGC Calw — Website",
    image: vgcImage,
    meta: "Verbrauchergenossenschaft Calw eG",
    org: "Verbrauchergenossenschaft Calw eG",
    period: "2021-today",
    role: "Website Designer & Engineer + Photo- & Videographer + Drone Pilot",
    website: "https://vgc-calw.de",
    description:
      "A relaunch for a consumer cooperative founded in 1907 that runs twelve EDEKA and Trinkgut markets around Calw – market pages, company history and careers, with my own image film and photos.",
    tags: [
      "WordPress",
      "PHP",
      "JavaScript",
      "Usercentrics",
      "Adobe Lightroom",
      "Adobe Premiere Pro",
      "Drone Videography",
    ],
    context:
      "The Verbrauchergenossenschaft Calw eG (VGC) is a consumer cooperative founded in 1907 by workers and craftsmen in Calw. Today it runs eleven EDEKA supermarkets and a Trinkgut drinks market across the Calw, Böblingen and Freudenstadt/Rottweil regions, with more than 500 employees. Its old website no longer matched a company of that size. The relaunch had to help customers find their nearest market, present the cooperative and its history, support the constant search for staff and trainees, and stay easy for the team to update as new markets open.",
    contributions: [
      "A custom design — a hand-built WordPress theme (BlankSlate child theme) with a full-width image-film header and a homepage that groups all markets into three regions.",
      "Market pages — one page per market with address, opening hours, route link, phone and email, services (cashback, Scan & Go, catering platters …), key facts such as opening date and sales area, contact persons, and a scrollable row of the other markets.",
      "Company & careers — a company page with a timeline from the founding in 1907 to today, management and member information, and a careers section with job ads and a collapsible list of apprenticeships.",
      "Photo & video — the image film on the homepage (2023), market photos and contact-person portraits, shot and edited in Lightroom and Premiere Pro.",
      "GDPR-compliant setup — Usercentrics cookie consent configured from scratch, lazy-loaded media and legal pages.",
    ],
    outcome:
      "VGC got a modern, consistent web presence that has grown with the cooperative from ten to twelve markets, including its first Trinkgut drinks market. The site remains the central place for market information, news and recruiting, and I still look after it.",
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

// Impressum under § 5 DDG (formerly § 5 TMG), generated with e-Recht24.
export const imprint: LegalPage = {
  title: "Imprint",
  kicker: "Legal — Impressum",
  note: "Provider information under German law. Last updated: October 2026.",
  sections: [
    {
      heading: "Information according to § 5 DDG",
      paragraphs: [
        "Noah Becker\nndb.media\nPleidelsheimer Str. 47\n74321 Bietigheim-Bissingen\nGermany",
      ],
    },
    {
      heading: "Contact",
      paragraphs: ["Phone: +49 (0)178 1188295\nEmail: hey@noah-becker.de"],
    },
    {
      heading: "Business identification number",
      paragraphs: ["DE461817992"],
    },
    {
      heading: "Consumer dispute resolution",
      paragraphs: [
        "We are not willing or obliged to participate in dispute resolution proceedings in front of a consumer arbitration board.",
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
