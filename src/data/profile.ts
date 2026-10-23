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
// Netherlands 2025-01
import netherlands2025_01_01 from "../assets/photos/netherlands-2025-01/netherlands-2025-01-1.jpg";
import netherlands2025_01_02 from "../assets/photos/netherlands-2025-01/netherlands-2025-01-2.jpg";
import netherlands2025_01_03 from "../assets/photos/netherlands-2025-01/netherlands-2025-01-3.jpg";
import netherlands2025_01_04 from "../assets/photos/netherlands-2025-01/netherlands-2025-01-4.jpg";
import netherlands2025_01_05 from "../assets/photos/netherlands-2025-01/netherlands-2025-01-5-2.jpg";
import netherlands2025_01_06 from "../assets/photos/netherlands-2025-01/netherlands-2025-01-6.jpg";
import netherlands2025_01_07 from "../assets/photos/netherlands-2025-01/netherlands-2025-01-7.jpg";
// Croatia 2024-01

// Hamburg 2023-02

// South Tirol 2023-01
import southtirol2023_01_01 from "../assets/photos/southtirol-2023-01/Southtirol-2023-01-1.jpg";
import southtirol2023_01_02 from "../assets/photos/southtirol-2023-01/Southtirol-2023-01-2.jpg";
import southtirol2023_01_03 from "../assets/photos/southtirol-2023-01/Southtirol-2023-01-3.jpg";
import southtirol2023_01_04 from "../assets/photos/southtirol-2023-01/Southtirol-2023-01-4.jpg";
import southtirol2023_01_05 from "../assets/photos/southtirol-2023-01/Southtirol-2023-01-5.jpg";
import southtirol2023_01_06 from "../assets/photos/southtirol-2023-01/Southtirol-2023-01-6.jpg";
import southtirol2023_01_07 from "../assets/photos/southtirol-2023-01/Southtirol-2023-01-7.jpg";
// Hamburg 2023-01

// Crete 2022-01

// Ludwigsburg 2021-01

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
  intro:
    "Security-interested software developer building thoughtful, reliable and secure products. I enjoy building websites, apps and tools that are simple to use, easy to maintain and look good.",
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
      "ETM Elektrotrucker Media GmbH is the company behind Elektrotrucker, Tobias Wagner's YouTube channel about driving electric trucks across Europe, with over 100k subscribers. Its eTrucker system combines a free routing app for drivers, a chip that bundles a fleet's direct charging contracts and a manager for dispatchers, alongside a greenhouse gas quota (THG) service. The site had to explain this to fleet operators, dispatchers and drivers in German and English, stay true to the existing brand and turn interest into enquiries.",
    contributions: [
      "Design within the brand — page layouts designed in Adobe XD around eTrucker's existing logo and colours, illustrated with AI-generated imagery, responsive from phone to desktop.",
      "Theme from scratch — a custom WordPress theme bundled with Vite and styled with Tailwind CSS, with block styles for headings, text, containers and buttons.",
      "Own block library — a custom plugin of multiple React and ACF blocks: video hero, product slider, pricing table, FAQ accordion, operator carousels and, the toughest, an animated journey contrasting dispatch, driving and charging with and without eTrucker.",
      "Video & pages — the homepage video, cut in Adobe Premiere Pro, plus a system page with products, pricing and FAQ, a THG quota page and the World Tour 2026 page.",
      "Two languages — German and English with Polylang, localised URLs and hreflang tags.",
      "Privacy & operations — CCM19 cookie consent, HubSpot, Matomo and beehiiv integrations the client now runs, and ongoing changes and additions on request.",
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
      "Three languages — the client's German, English and Croatian copy with localised URLs, a language switcher and hreflang tags.",
      "One page per service — a homepage that splits into transport and charter, a charter page for the fleet equipment, safety and season, and a page for yacht transport.",
      "Privacy & deployment — Impressum and privacy policy, self-hosted fonts, no tracking and therefore no cookie banner, plus the deployment to the client's hosting.",
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
      "Own block library — a custom plugin with React and ACF blocks plus text and button styles, so pages can be edited in the block editor without breaking the design.",
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
  /*
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
  */
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
      "Content structure — six service pages with case studies, a company history timeline back to 1946, certificate pages with downloads, a careers section and a news blog.",
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
      "thera4 is a physiotherapy and sports therapy practice in Ludwigsburg that has been treating patients since 1993. Until 2022 it had no website at all. It needed a first online presence that answers what patients actually ask – which treatments are offered and covered by statutory health insurance, when the practice and reception are open, and how to get there – without anything the team would have to maintain day to day.",
    contributions: [
      "A custom design — a hand-built WordPress theme (BlankSlate child theme) as a single page with anchor navigation, custom SVG graphics and a loading screen, instead of an off-the-shelf template.",
      "Clear patient information — several services with short explanations and private-pay treatments marked, separate practice and reception hours, and a team slider with portraits of all team members, some of them photographed by me.",
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
      "A relaunch for a consumer cooperative founded in 1907 that runs more than a hand full of EDEKA and Trinkgut markets around Calw – market pages, company history and careers, with my own image film and photos.",
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
      "The Verbrauchergenossenschaft Calw eG (VGC) is a consumer cooperative founded in 1907 by workers and craftsmen in Calw. Today it runs over a hand full of EDEKA supermarkets and a Trinkgut drinks market across the Calw, Böblingen and Freudenstadt/Rottweil regions, with more than 500 employees. Its old website no longer matched a company of that size. The relaunch had to help customers find their nearest market, present the cooperative and its history, support the constant search for staff and trainees, and stay easy for the team to update as new markets open.",
    contributions: [
      "A custom design — a hand-built WordPress theme (BlankSlate child theme) with a full-width image-film header and a homepage that groups all markets into three regions.",
      "Market pages — one page per market with address, opening hours, route link, phone and email, services (cashback, Scan & Go, catering platters …), key facts such as opening date and sales area and contact persons.",
      "Company & careers — a company page with a timeline from the founding in 1907 to today, management and member information, and a careers section with job ads and a list of apprenticeships.",
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

// /photos shows one block per album; the landing page shows the first photo of the first four albums.
export const albums: Album[] = [
  /*
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
  */
  // Netherlands 2025-01
  {
    slug: "netherlands-2025-01",
    title: "Netherlands",
    note: "Some cities, windmills, canals and alpacas. A short trip to the Netherlands in 2025.",
    period: "2025",
    photos: [
      {
        caption: "Photo 01",
        alt: "",
        place: "Netherlands",
        date: "2025",
        image: netherlands2025_01_01 as ImageMetadata | undefined,
      },
      {
        caption: "Photo 02",
        alt: "",
        place: "Netherlands",
        date: "2025",
        image: netherlands2025_01_02 as ImageMetadata | undefined,
      },
      {
        caption: "Photo 03",
        alt: "",
        place: "Netherlands",
        date: "2025",
        image: netherlands2025_01_03 as ImageMetadata | undefined,
      },
      {
        caption: "Photo 04",
        alt: "",
        place: "Netherlands",
        date: "2025",
        image: netherlands2025_01_04 as ImageMetadata | undefined,
      },
      {
        caption: "Photo 05",
        alt: "",
        place: "Netherlands",
        date: "2025",
        image: netherlands2025_01_05 as ImageMetadata | undefined,
      },
      {
        caption: "Photo 06",
        alt: "",
        place: "Netherlands",
        date: "2025",
        image: netherlands2025_01_06 as ImageMetadata | undefined,
      },
      {
        caption: "Photo 07",
        alt: "",
        place: "Netherlands",
        date: "2025",
        image: netherlands2025_01_07 as ImageMetadata | undefined,
      },
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
      {
        caption: "Photo 01",
        alt: "",
        place: "South Tirol",
        date: "2023",
        image: southtirol2023_01_01 as ImageMetadata | undefined,
      },
      {
        caption: "Photo 02",
        alt: "",
        place: "South Tirol",
        date: "2023",
        image: southtirol2023_01_02 as ImageMetadata | undefined,
      },
      {
        caption: "Photo 03",
        alt: "",
        place: "South Tirol",
        date: "2023",
        image: southtirol2023_01_03 as ImageMetadata | undefined,
      },
      {
        caption: "Photo 04",
        alt: "",
        place: "South Tirol",
        date: "2023",
        image: southtirol2023_01_04 as ImageMetadata | undefined,
      },
      {
        caption: "Photo 05",
        alt: "",
        place: "South Tirol",
        date: "2023",
        image: southtirol2023_01_05 as ImageMetadata | undefined,
      },
      {
        caption: "Photo 06",
        alt: "",
        place: "South Tirol",
        date: "2023",
        image: southtirol2023_01_06 as ImageMetadata | undefined,
      },
      {
        caption: "Photo 07",
        alt: "",
        place: "South Tirol",
        date: "2023",
        image: southtirol2023_01_07 as ImageMetadata | undefined,
      },
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
        caption: "Photo 01",
        alt: "",
        place: "Munich",
        date: "2021",
        image: munich2021_01_01 as ImageMetadata | undefined,
      },
      {
        caption: "Photo 02",
        alt: "",
        place: "Munich",
        date: "2021",
        image: munich2021_01_02 as ImageMetadata | undefined,
      },
      {
        caption: "Photo 03",
        alt: "",
        place: "Munich",
        date: "2021",
        image: munich2021_01_03 as ImageMetadata | undefined,
      },
      {
        caption: "Photo 04",
        alt: "",
        place: "Munich",
        date: "2021",
        image: munich2021_01_04 as ImageMetadata | undefined,
      },
      {
        caption: "Photo 05",
        alt: "",
        place: "Munich",
        date: "2021",
        image: munich2021_01_05 as ImageMetadata | undefined,
      },
      {
        caption: "Photo 06",
        alt: "",
        place: "Munich",
        date: "2021",
        image: munich2021_01_06 as ImageMetadata | undefined,
      },
      {
        caption: "Photo 07",
        alt: "",
        place: "Munich",
        date: "2021",
        image: munich2021_01_07 as ImageMetadata | undefined,
      },
      {
        caption: "Photo 08",
        alt: "",
        place: "Munich",
        date: "2021",
        image: munich2021_01_08 as ImageMetadata | undefined,
      },
      {
        caption: "Photo 09",
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
 * A legal page (/imprint, /privacy): numbered sections, heading + body each.
 * Line breaks inside a paragraph ("\n") are kept, e.g. for an address.
 */
export interface LegalPage {
  title: string;
  /** Small mono line above the title. */
  kicker: string;
  note?: string;
  sections: LegalSection[];
}

export interface LegalSection {
  heading: string;
  body?: LegalBlock[];
  /** Sub-sections (§ 01.1, § 01.2 …). The section itself becomes a chapter row above them. */
  sections?: LegalSection[];
}

/** A paragraph, a small heading inside the text, or a bullet list. */
export type LegalBlock = string | { heading: string } | { list: string[] };

export const imprint: LegalPage = {
  title: "Imprint",
  kicker: "Legal — Impressum",
  note: "Provider information under German law. Last updated: October 2026.",
  sections: [
    {
      heading: "Information according to § 5 DDG",
      body: [
        "Noah Becker\nndb.media\nPleidelsheimer Str. 47\n74321 Bietigheim-Bissingen\nGermany",
      ],
    },
    {
      heading: "Contact",
      body: ["Phone: +49 (0)178 1188295\nEmail: hey@noah-becker.de"],
    },
    {
      heading: "Business identification number",
      body: ["DE461817992"],
    },
    {
      heading: "Consumer dispute resolution",
      body: [
        "We are not willing or obliged to participate in dispute resolution proceedings in front of a consumer arbitration board.",
      ],
    },
  ],
};

// Datenschutzerklärung under Art. 13 GDPR, kept word for word as supplied.
// Update it if hosting, contact details or anything the site collects changes.
export const privacy: LegalPage = {
  title: "Privacy",
  kicker: "Legal — Datenschutzerklärung",
  note: "How this site handles personal data. Last updated: October 2026.",
  sections: [
    {
      heading: "An overview of data protection",
      sections: [
        {
          heading: "General information",
          body: [
            "The following information will provide you with an easy to navigate overview of what will happen with your personal data when you visit this website. The term “personal data” comprises all data that can be used to personally identify you. For detailed information about the subject matter of data protection, please consult our Data Protection Declaration, which we have included beneath this copy.",
          ],
        },
        {
          heading: "Data recording on this website",
          body: [
            { heading: "Who is the responsible party for the recording of data on this website (i.e., the “controller”)?" },
            "The data on this website is processed by the operator of the website, whose contact information is available under section “Information about the responsible party (referred to as the “controller” in the GDPR)” in this Privacy Policy.",
            { heading: "How do we record your data?" },
            "We collect your data as a result of your sharing of your data with us. This may, for instance be information you enter into our contact form.",
            "Other data shall be recorded by our IT systems automatically or after you consent to its recording during your website visit. This data comprises primarily technical information (e.g., web browser, operating system, or time the site was accessed). This information is recorded automatically when you access this website.",
            { heading: "What are the purposes we use your data for?" },
            "A portion of the information is generated to guarantee the error free provision of the website. Other data may be used to analyze your user patterns. If contracts can be concluded or initiated via the website, the transmitted data will also be processed for contract offers, orders or other order enquiries.",
            { heading: "What rights do you have as far as your information is concerned?" },
            "You have the right to receive information about the source, recipients, and purposes of your archived personal data at any time without having to pay a fee for such disclosures. You also have the right to demand that your data are rectified or eradicated. If you have consented to data processing, you have the option to revoke this consent at any time, which shall affect all future data processing. Moreover, you have the right to demand that the processing of your data be restricted under certain circumstances. Furthermore, you have the right to log a complaint with the competent supervising agency.",
            "Please do not hesitate to contact us at any time if you have questions about this or any other data protection related issues.",
          ],
        },
      ],
    },
    {
      heading: "Hosting",
      body: ["We are hosting the content of our website at the following provider:"],
      sections: [
        {
          heading: "External Hosting",
          body: [
            "This website is hosted externally. Personal data collected on this website are stored on the servers of the host. These may include, but are not limited to, IP addresses, contact requests, metadata and communications, contract information, contact information, names, web page access, and other data generated through a web site.",
            "The external hosting serves the purpose of fulfilling the contract with our potential and existing customers (Art. 6(1)(b) GDPR) and in the interest of secure, fast, and efficient provision of our online services by a professional provider (Art. 6(1)(f) GDPR). If appropriate consent has been obtained, the processing is carried out exclusively on the basis of Art. 6 (1)(a) GDPR and § 25 (1) TDDDG, insofar the consent includes the storage of cookies or the access to information in the user’s end device (e.g., device fingerprinting) within the meaning of the TDDDG. This consent can be revoked at any time.",
            "Our host(s) will only process your data to the extent necessary to fulfil its performance obligations and to follow our instructions with respect to such data.",
            "We are using the following host(s):",
            "Reichmann IT-Solutions\nPleidelsheimer Str. 47\n74321 Bietigheim-Bissingen",
            { heading: "Data processing" },
            "We have concluded a data processing agreement (DPA) for the use of the above-mentioned service. This is a contract mandated by data privacy laws that guarantees that they process personal data of our website visitors only based on our instructions and in compliance with the GDPR.",
          ],
        },
      ],
    },
    {
      heading: "General information and mandatory information",
      sections: [
        {
          heading: "Data protection",
          body: [
            "The operators of this website and its pages take the protection of your personal data very seriously. Hence, we handle your personal data as confidential information and in compliance with the statutory data protection regulations and this Data Protection Declaration.",
            "Whenever you use this website, a variety of personal information will be collected. Personal data comprises data that can be used to personally identify you. This Data Protection Declaration explains which data we collect as well as the purposes we use this data for. It also explains how, and for which purpose the information is collected.",
            "We herewith advise you that the transmission of data via the Internet (i.e., through e-mail communications) may be prone to security gaps. It is not possible to completely protect data against third-party access.",
          ],
        },
        {
          heading: "Information about the responsible party (referred to as the “controller” in the GDPR)",
          body: [
            "The data processing controller on this website is:",
            "Noah Becker\nndb.media\nPleidelsheimer Str. 47\n74321 Bietigheim-Bissingen",
            "Phone: +49 (0)178 11 88 295\nE-mail: hey@noah-becker.de",
            "The controller is the natural person or legal entity that single-handedly or jointly with others makes decisions as to the purposes of and resources for the processing of personal data (e.g., names, e-mail addresses, etc.).",
          ],
        },
        {
          heading: "Storage duration",
          body: [
            "Unless a more specific storage period has been specified in this privacy policy, your personal data will remain with us until the purpose for which it was collected no longer applies. If you assert a justified request for deletion or revoke your consent to data processing, your data will be deleted, unless we have other legally permissible reasons for storing your personal data (e.g., tax or commercial law retention periods); in the latter case, the deletion will take place after these reasons cease to apply.",
          ],
        },
        {
          heading: "General information on the legal basis for the data processing on this website",
          body: [
            "If you have consented to data processing, we process your personal data on the basis of Art. 6(1)(a) GDPR or Art. 9 (2)(a) GDPR, if special categories of data are processed according to Art. 9 (1) DSGVO. In the case of explicit consent to the transfer of personal data to third countries, the data processing is also based on Art. 49 (1)(a) GDPR. If you have consented to the storage of cookies or to the access to information in your end device (e.g., via device fingerprinting), the data processing is additionally based on § 25 (1) TDDDG. The consent can be revoked at any time. If your data is required for the fulfillment of a contract or for the implementation of pre-contractual measures, we process your data on the basis of Art. 6(1)(b) GDPR. Furthermore, if your data is required for the fulfillment of a legal obligation, we process it on the basis of Art. 6(1)(c) GDPR. Furthermore, the data processing may be carried out on the basis of our legitimate interest according to Art. 6(1)(f) GDPR. Information on the relevant legal basis in each individual case is provided in the following paragraphs of this privacy policy.",
          ],
        },
        {
          heading: "Recipients of personal data",
          body: [
            "In the scope of our business activities, we cooperate with various external parties. In some cases, this also requires the transfer of personal data to these external parties. We only disclose personal data to external parties if this is required as part of the fulfillment of a contract, if we are legally obligated to do so (e.g., disclosure of data to tax authorities), if we have a legitimate interest in the disclosure pursuant to Art. 6 (1)(f) GDPR, or if another legal basis permits the disclosure of this data. When using processors, we only disclose personal data of our customers on the basis of a valid contract on data processing. In the case of joint processing, a joint processing agreement is concluded.",
          ],
        },
        {
          heading: "Revocation of your consent to the processing of data",
          body: [
            "A wide range of data processing transactions are possible only subject to your express consent. You can also revoke at any time any consent you have already given us. This shall be without prejudice to the lawfulness of any data collection that occurred prior to your revocation.",
          ],
        },
        {
          heading: "Right to object to the collection of data in special cases; right to object to direct advertising (Art. 21 GDPR)",
          body: [
            "IN THE EVENT THAT DATA ARE PROCESSED ON THE BASIS OF ART. 6(1)(E) OR (F) GDPR, YOU HAVE THE RIGHT TO AT ANY TIME OBJECT TO THE PROCESSING OF YOUR PERSONAL DATA BASED ON GROUNDS ARISING FROM YOUR UNIQUE SITUATION. THIS ALSO APPLIES TO ANY PROFILING BASED ON THESE PROVISIONS. TO DETERMINE THE LEGAL BASIS, ON WHICH ANY PROCESSING OF DATA IS BASED, PLEASE CONSULT THIS DATA PROTECTION DECLARATION. IF YOU LOG AN OBJECTION, WE WILL NO LONGER PROCESS YOUR AFFECTED PERSONAL DATA, UNLESS WE ARE IN A POSITION TO PRESENT COMPELLING PROTECTION WORTHY GROUNDS FOR THE PROCESSING OF YOUR DATA, THAT OUTWEIGH YOUR INTERESTS, RIGHTS AND FREEDOMS OR IF THE PURPOSE OF THE PROCESSING IS THE CLAIMING, EXERCISING OR DEFENCE OF LEGAL ENTITLEMENTS (OBJECTION PURSUANT TO ART. 21(1) GDPR).",
            "IF YOUR PERSONAL DATA IS BEING PROCESSED IN ORDER TO ENGAGE IN DIRECT ADVERTISING, YOU HAVE THE RIGHT TO OBJECT TO THE PROCESSING OF YOUR AFFECTED PERSONAL DATA FOR THE PURPOSES OF SUCH ADVERTISING AT ANY TIME. THIS ALSO APPLIES TO PROFILING TO THE EXTENT THAT IT IS AFFILIATED WITH SUCH DIRECT ADVERTISING. IF YOU OBJECT, YOUR PERSONAL DATA WILL SUBSEQUENTLY NO LONGER BE USED FOR DIRECT ADVERTISING PURPOSES (OBJECTION PURSUANT TO ART. 21(2) GDPR).",
          ],
        },
        {
          heading: "Right to log a complaint with the competent supervisory agency",
          body: [
            "In the event of violations of the GDPR, data subjects are entitled to log a complaint with a supervisory agency, in particular in the member state where they usually maintain their domicile, place of work or at the place where the alleged violation occurred. The right to log a complaint is in effect regardless of any other administrative or court proceedings available as legal recourses.",
          ],
        },
        {
          heading: "Right to data portability",
          body: [
            "You have the right to have data that we process automatically on the basis of your consent or in fulfillment of a contract handed over to you or to a third party in a common, machine-readable format. If you should demand the direct transfer of the data to another controller, this will be done only if it is technically feasible.",
          ],
        },
        {
          heading: "Information about, rectification and eradication of data",
          body: [
            "Within the scope of the applicable statutory provisions, you have the right to demand information about your archived personal data, their source and recipients as well as the purpose of the processing of your data at any time. You may also have a right to have your data rectified or eradicated. If you have questions about this subject matter or any other questions about personal data, please do not hesitate to contact us at any time.",
          ],
        },
        {
          heading: "Right to demand processing restrictions",
          body: [
            "You have the right to demand the imposition of restrictions as far as the processing of your personal data is concerned. To do so, you may contact us at any time. The right to demand restriction of processing applies in the following cases:",
            {
              list: [
                "In the event that you should dispute the correctness of your data archived by us, we will usually need some time to verify this claim. During the time that this investigation is ongoing, you have the right to demand that we restrict the processing of your personal data.",
                "If the processing of your personal data was/is conducted in an unlawful manner, you have the option to demand the restriction of the processing of your data instead of demanding the eradication of this data.",
                "If we do not need your personal data any longer and you need it to exercise, defend or claim legal entitlements, you have the right to demand the restriction of the processing of your personal data instead of its eradication.",
                "If you have raised an objection pursuant to Art. 21(1) GDPR, your rights and our rights will have to be weighed against each other. As long as it has not been determined whose interests prevail, you have the right to demand a restriction of the processing of your personal data.",
              ],
            },
            "If you have restricted the processing of your personal data, these data – with the exception of their archiving – may be processed only subject to your consent or to claim, exercise or defend legal entitlements or to protect the rights of other natural persons or legal entities or for important public interest reasons cited by the European Union or a member state of the EU.",
          ],
        },
        {
          heading: "SSL and/or TLS encryption",
          body: [
            "For security reasons and to protect the transmission of confidential content, such as purchase orders or inquiries you submit to us as the website operator, this website uses either an SSL or a TLS encryption program. You can recognize an encrypted connection by checking whether the address line of the browser switches from “http://” to “https://” and also by the appearance of the lock icon in the browser line.",
            "If the SSL or TLS encryption is activated, data you transmit to us cannot be read by third parties.",
          ],
        },
      ],
    },
    {
      heading: "Recording of data on this website",
      sections: [
        {
          heading: "Cookies",
          body: [
            "Our websites and pages use what the industry refers to as “cookies.” Cookies are small data packages that do not cause any damage to your device. They are either stored temporarily for the duration of a session (session cookies) or they are permanently archived on your device (permanent cookies). Session cookies are automatically deleted once you terminate your visit. Permanent cookies remain archived on your device until you actively delete them, or they are automatically eradicated by your web browser.",
            "Cookies can be issued by us (first-party cookies) or by third-party companies (so-called third-party cookies). Third-party cookies enable the integration of certain services of third-party companies into websites (e.g., cookies for handling payment services).",
            "Cookies have a variety of functions. Many cookies are technically essential since certain website functions would not work in the absence of these cookies (e.g., the shopping cart function or the display of videos). Other cookies may be used to analyze user behavior or for promotional purposes.",
            "Cookies, which are required for the performance of electronic communication transactions, for the provision of certain functions you want to use (e.g., for the shopping cart function) or those that are necessary for the optimization (required cookies) of the website (e.g., cookies that provide measurable insights into the web audience), shall be stored on the basis of Art. 6(1)(f) GDPR, unless a different legal basis is cited. The operator of the website has a legitimate interest in the storage of required cookies to ensure the technically error-free and optimized provision of the operator’s services. If your consent to the storage of the cookies and similar recognition technologies has been requested, the processing occurs exclusively on the basis of the consent obtained (Art. 6(1)(a) GDPR and § 25 (1) TDDDG); this consent may be revoked at any time.",
            "You have the option to set up your browser in such a manner that you will be notified any time cookies are placed and to permit the acceptance of cookies only in specific cases. You may also exclude the acceptance of cookies in certain cases or in general or activate the delete-function for the automatic eradication of cookies when the browser closes. If cookies are deactivated, the functions of this website may be limited.",
            "If other cookies and services are used on this website, you can find this information in this privacy policy.",
          ],
        },
      ],
    },
  ],
};
