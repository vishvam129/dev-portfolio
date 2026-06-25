// Full-Stack "Studio" data — the résumé's products, framed end-to-end.

export const FS_PROFILE = {
  name: "Vishvam Patel",
  role: "Full-Stack Engineer",
  tagline: "I build the whole thing — database to pixel.",
  email: "vishvamp129@gmail.com",
  phone: "+91 96245 99774",
  github: "https://github.com/vishvam129",
  githubHandle: "vishvam129",
  linkedin: "https://www.linkedin.com/in/vishvam129/",
  resume: "/resume/Vishvam_Patel_FullStack_Developer.pdf",
};

export type Device = "desktop" | "mobile";
export type Preview = "map" | "chat" | "photo";

export type Project = {
  id: string;
  name: string;
  tag: string;            // one-line product description
  year: string;
  status: "live" | "shipped" | "building";
  devices: Device[];      // which frames it ships on (first = default)
  preview: Preview;       // styled in-frame mock
  accent: string;         // product brand accent
  liveUrl?: string;       // embeddable / openable
  blurb: string;
  highlights: string[];
  frontend: string[];
  backend: string[];
};

export const FS_PROJECTS: Project[] = [
  {
    id: "lendlocal", name: "LendLocal", tag: "Hyperlocal sharing marketplace", year: "2025",
    status: "live", devices: ["desktop", "mobile"], preview: "map", accent: "#0d9488",
    liveUrl: "https://lendlocal-eight.vercel.app",
    blurb: "A full-stack marketplace where neighbours lend items and skills — built end-to-end: OAuth sign-in, profiles, listings, map discovery, bookings, reviews, and Stripe payments. Shipped to production on Vercel with Neon Postgres and Blob storage.",
    highlights: ["Stripe payments + escrow-style holds", "Leaflet map-based discovery", "Prisma schema: users · listings · bookings · reviews", "1100+ lines of booking/payment tests"],
    frontend: ["Next.js 14", "Tailwind", "Leaflet"],
    backend: ["Prisma", "Neon Postgres", "Stripe", "OAuth"],
  },
  {
    id: "near", name: "Near", tag: "Realtime app for long-distance couples", year: "2026",
    status: "shipped", devices: ["mobile", "desktop"], preview: "chat", accent: "#ff7da6",
    blurb: "One React 19 + TypeScript codebase shipping to web (installable PWA) and Android (Capacitor): chat, photos, voice notes, watch-together, shared albums, and a couple dashboard — with WebRTC calls and E2E-encrypted secret chat.",
    highlights: ["Web PWA + Android from one codebase", "WebRTC voice/video over Firestore signaling", "E2E-encrypted chat (passphrase KDF)", "Code-split 1.2 MB → 616 KB"],
    frontend: ["React 19", "TypeScript", "Vite", "Capacitor", "PWA"],
    backend: ["Firestore", "WebRTC", "Cloud Functions", "FCM"],
  },
  {
    id: "vrixo", name: "Vrixo", tag: "AI photo-processing platform", year: "2026",
    status: "building", devices: ["desktop"], preview: "photo", accent: "#3b8cff",
    blurb: "A full-stack AI photo platform: a responsive Next.js 14 + Tailwind + shadcn/ui frontend with Supabase auth and Cloudflare R2 storage, backed by a FastAPI service running a Celery + Redis queue for asynchronous, GPU-bound image jobs.",
    highlights: ["Next.js 14 + shadcn/ui frontend", "FastAPI + Celery + Redis job queue", "SQLAlchemy + Postgres for job history", "Cloudflare R2 object storage"],
    frontend: ["Next.js 14", "Tailwind", "shadcn/ui", "Supabase"],
    backend: ["FastAPI", "Celery", "Redis", "PostgreSQL"],
  },
];

export const FS_EXPERIENCE = [
  {
    org: "RdFlex", role: "Full-Stack Developer", period: "Jul 2025 — present",
    desc: "Backend and frontend for a multi-service web platform — Python (FastAPI / Odoo) REST APIs and a React / Next.js workspace UI. JWT/OAuth auth, PostgreSQL instance-lifecycle schemas, and Docker / Kubernetes (Kind, DOKS) with Gateway API routing.",
  },
  {
    org: "RdFlex", role: "Python Developer Intern", period: "Jan — Jun 2025",
    desc: "Backend components for a business-management platform; optimized PostgreSQL schemas and integrated third-party REST APIs for e-commerce and inventory.",
  },
];

export const FS_EDUCATION = { org: "LJ University", degree: "B.E. Computer Science & Technology", period: "2022 — 2026" };

export const FS_STACK = [
  { label: "Frontend", items: ["React 19", "Next.js 14", "Vite", "TypeScript", "Tailwind", "shadcn/ui", "Leaflet", "PWA", "Capacitor"] },
  { label: "Backend", items: ["Node.js", "Express", "FastAPI", "Django", "REST", "JWT / OAuth", "WebRTC"] },
  { label: "Data", items: ["PostgreSQL", "Prisma", "SQLAlchemy", "MongoDB", "Supabase", "Neon", "Firestore"] },
  { label: "Infra", items: ["Docker", "Kubernetes (Kind, DOKS)", "Vercel", "Stripe", "AWS", "Git"] },
];
