// Single source of truth for all three sites.
// Derived verbatim-in-spirit from the three tailored resumes + cv.md.

export const PROFILE = {
  name: "Vishvam Patel",
  initials: "VP",
  location: "Gandhinagar, Gujarat, India",
  timezone: "Asia/Kolkata",
  tzLabel: "IST",
  email: "vishvamp129@gmail.com",
  github: "https://github.com/vishvam129",
  githubHandle: "vishvam129",
  linkedin: "https://www.linkedin.com/in/vishvam129/",
  graduating: "June 2026",
  education: {
    school: "LJ University",
    degree: "B.E. Computer Science & Technology",
    period: "Jun 2022 — Jun 2026",
    place: "Gujarat, India",
  },
} as const;

export type Lens = "ai" | "backend" | "fullstack";

export const TAGLINES: Record<Lens, string> = {
  ai: "I build AI-powered products — from LLM-backed platforms to vision pipelines.",
  backend: "I build reliable backend systems — APIs, data layers, and the infra that runs them.",
  fullstack: "I ship full-stack products end-to-end — backend to pixel, idea to production.",
};

export const ROLE_TITLE: Record<Lens, string> = {
  ai: "AI Developer",
  backend: "Backend Developer",
  fullstack: "Full-Stack Developer",
};

export type Experience = {
  role: string;
  company: string;
  period: string;
  place: string;
  current?: boolean;
  bullets: string[];
};

export const EXPERIENCE: Record<Lens, Experience[]> = {
  ai: [
    {
      role: "AI Platform Developer",
      company: "RdFlex",
      period: "Jul 2025 — Present",
      place: "Gandhinagar, India",
      current: true,
      bullets: [
        "Contributing to an AI development platform that uses Anthropic Claude to generate application modules from natural-language prompts.",
        "Built the Python auth, session, and REST API layer the AI orchestrator consumes — JWT/OAuth, cross-subdomain cookies, CORS, instance-lifecycle endpoints.",
        "Integrated the AI engine, editor-sync sidecar, and validator services; designed the draft-instance provisioning flow that previews generated code in seconds.",
        "Deployed to Kubernetes (Kind for dev, DigitalOcean DOKS for prod) with automated Docker build/push pipelines and Gateway API routing.",
      ],
    },
    {
      role: "Python Developer Intern",
      company: "RdFlex",
      period: "Jan 2025 — Jun 2025",
      place: "Gandhinagar, India",
      bullets: [
        "Built Python backend components for a business-management platform serving manufacturing and retail clients; optimized PostgreSQL schemas and queries.",
        "Integrated third-party REST APIs for e-commerce and inventory use cases across the full SDLC.",
      ],
    },
  ],
  backend: [
    {
      role: "Backend Developer",
      company: "RdFlex",
      period: "Jul 2025 — Present",
      place: "Gandhinagar, India",
      current: true,
      bullets: [
        "Developing Python backend services for a multi-service web platform — REST APIs, auth flows, and database layers (FastAPI / Odoo) against PostgreSQL.",
        "Built JWT/OAuth auth with refresh tokens and cross-subdomain cookies; shared CORS middleware across multiple services and origins.",
        "Designed and optimized PostgreSQL schemas and queries for the instance-lifecycle data model; integrated external services over REST.",
        "Containerized services with Docker; deployed to Kubernetes (Kind + DigitalOcean DOKS) with automated build/push pipelines and Gateway API routing.",
      ],
    },
    {
      role: "Python Developer Intern",
      company: "RdFlex",
      period: "Jan 2025 — Jun 2025",
      place: "Gandhinagar, India",
      bullets: [
        "Built Python backend components for a large-scale business-management platform; delivered custom features against PostgreSQL.",
        "Engineered and optimized PostgreSQL schemas and queries for data integrity and production performance; integrated third-party REST APIs.",
        "Participated in the full SDLC — requirements, technical specs, debugging, and resolving production issues.",
      ],
    },
  ],
  fullstack: [
    {
      role: "Full-Stack Developer",
      company: "RdFlex",
      period: "Jul 2025 — Present",
      place: "Gandhinagar, India",
      current: true,
      bullets: [
        "Building backend and frontend for a multi-service platform — Python (FastAPI / Odoo) APIs and a React / Next.js workspace UI.",
        "Built JWT/OAuth auth flows with refresh tokens and cross-subdomain cookies; CORS handling across services and origins.",
        "Designed and optimized PostgreSQL schemas for the core instance-lifecycle data model; integrated external services via REST.",
        "Containerized with Docker; deployed to Kubernetes (Kind + DOKS) with automated build/push and Gateway API routing.",
      ],
    },
    {
      role: "Python Developer Intern",
      company: "RdFlex",
      period: "Jan 2025 — Jun 2025",
      place: "Gandhinagar, India",
      bullets: [
        "Built Python backend components for a business-management platform; optimized PostgreSQL schemas and queries.",
        "Integrated third-party REST APIs for e-commerce and inventory use cases across the full SDLC.",
      ],
    },
  ],
};

export type Project = {
  id: string;
  name: string;
  tagline: string;
  status: "live" | "in-progress" | "shipped";
  year: string;
  stack: string[];
  url?: string;
  // per-lens descriptions; falls back to `summary`
  summary: string;
  ai?: string;
  backend?: string;
  fullstack?: string;
  // metrics shown as "eval"/"benchmark" lines
  metrics?: { label: string; value: string }[];
  highlights: string[];
};

export const PROJECTS: Project[] = [
  {
    id: "near",
    name: "Near",
    tagline: "Real-time app for long-distance couples — one codebase, web + Android.",
    status: "in-progress",
    year: "2026",
    stack: ["React 19", "TypeScript", "Vite", "Firebase", "WebRTC", "Capacitor", "PWA"],
    summary:
      "A real-time companion app shipped from a single React codebase to web (installable PWA) and Android (Capacitor).",
    fullstack:
      "One React 19 + TypeScript codebase shipping to web (PWA) and Android (Capacitor): chat, photos, voice notes, synced YouTube watch-together, shared albums, and a couple dashboard.",
    backend:
      "Realtime data layer on Cloud Firestore with per-couple security rules; a WebRTC signaling backend over Firestore for voice/video/sleep calls; Cloud Functions + FCM push.",
    ai: "A real-time product with E2E-encrypted chat, WebRTC calling, and an FCM push pipeline — 70+ feature components across calls, chat and shared-moment surfaces.",
    metrics: [
      { label: "components", value: "70+" },
      { label: "bundle", value: "1.2MB → 616KB" },
      { label: "targets", value: "web + Android" },
    ],
    highlights: [
      "WebRTC voice/video/sleep calls with Firestore signaling",
      "End-to-end-encrypted secret chat (passphrase KDF)",
      "Cloud Functions + FCM push; Cloudinary async video messages",
      "Code-split PWA, offline self-hosted fonts, Firebase Hosting",
    ],
  },
  {
    id: "vrixo",
    name: "Vrixo",
    tagline: "AI photo-enhancement platform — vision models behind a job queue.",
    status: "in-progress",
    year: "2026",
    stack: ["Python", "FastAPI", "PyTorch", "Celery", "Redis", "Next.js 14", "PostgreSQL"],
    summary:
      "AI photo tool: background removal, HD upscaling, face enhancement, colorization, object removal, restoration.",
    ai: "Integrates pre-trained vision models — Real-ESRGAN (4× upscale), GFPGAN (face), RemBG (background), LaMa (object removal) — via PyTorch / HuggingFace behind a FastAPI + Celery queue.",
    backend:
      "FastAPI REST API with SQLAlchemy + PostgreSQL and a Celery + Redis queue for asynchronous, GPU-bound inference jobs; pytest unit + integration coverage.",
    fullstack:
      "Next.js 14 + Tailwind + shadcn/ui frontend with Supabase auth and Cloudflare R2 storage, over a FastAPI + Celery inference backend.",
    metrics: [
      { label: "vision models", value: "4" },
      { label: "upscale", value: "4×" },
      { label: "queue", value: "Celery / Redis" },
    ],
    highlights: [
      "Real-ESRGAN, GFPGAN, RemBG, LaMa integrated end-to-end",
      "GPU-bound async inference via Celery + Redis",
      "Supabase auth + Cloudflare R2 object storage",
      "pytest coverage for auth and image pipelines",
    ],
  },
  {
    id: "lendlocal",
    name: "LendLocal",
    tagline: "Hyperlocal community sharing platform — live in production, solo build.",
    status: "live",
    year: "2025",
    stack: ["Next.js 14", "Prisma", "PostgreSQL", "Stripe", "Leaflet", "Vercel"],
    url: "https://lendlocal-eight.vercel.app",
    summary:
      "A neighborhood platform to share tools, equipment and skills — browse, book, pay, review. Built solo, end-to-end.",
    fullstack:
      "Full-stack hyperlocal platform: OAuth auth, listings, bookings, reviews, Stripe payments, and Leaflet map discovery — Prisma/Postgres schema designed end-to-end, shipped on Vercel.",
    backend:
      "Server-side API routes, OAuth auth, and Stripe payments over a Prisma/PostgreSQL schema covering users, listings, bookings, reviews and moderation; 1100+ lines of booking/payment test flows.",
    ai: "A production full-stack platform with Stripe payments, OAuth, and 1100+ lines of automated booking/payment test flows.",
    metrics: [
      { label: "status", value: "in production" },
      { label: "schema", value: "20+ models" },
      { label: "test flows", value: "1100+ lines" },
    ],
    highlights: [
      "OAuth auth + secure session management",
      "Stripe payments with escrow-style hold/release",
      "Leaflet map discovery by distance",
      "Shipped to Vercel with Neon Postgres + Vercel Blob",
    ],
  },
  {
    id: "stock",
    name: "Stock Price Prediction",
    tagline: "ML web app forecasting equities with Scikit-learn regressors.",
    status: "shipped",
    year: "2024",
    stack: ["Python", "Django", "Scikit-learn", "Plotly"],
    summary:
      "Fetches historical equity data and applies multiple Scikit-learn regression models with interactive Plotly charts.",
    ai: "Multiple Scikit-learn regression models over Yahoo Finance data with interactive Plotly visualizations of predictions vs actuals.",
    backend: "A Django app with model-backed forecasting endpoints over the Yahoo Finance API.",
    fullstack: "Django web app with interactive Plotly charts of predictions vs actual prices.",
    metrics: [{ label: "models", value: "multiple" }, { label: "source", value: "Yahoo Finance" }],
    highlights: [
      "Multiple regression models compared",
      "Interactive Plotly prediction charts",
      "Yahoo Finance data pipeline",
    ],
  },
  {
    id: "jobportal",
    name: "Job Portal",
    tagline: "Full-stack MERN job board with search, filtering, and applications.",
    status: "shipped",
    year: "2024",
    stack: ["React", "Node.js", "Express", "MongoDB"],
    summary:
      "MERN job portal: responsive React UI for browsing, advanced search and filtering, and application management.",
    fullstack:
      "MERN job portal with a responsive React UI for browsing, advanced search/filtering, and application management over a Node/Express + MongoDB REST API.",
    backend: "RESTful API with Node.js / Express and MongoDB persistence.",
    metrics: [{ label: "stack", value: "MERN" }],
    highlights: [
      "Advanced search and filtering",
      "Application management",
      "Node/Express REST API + MongoDB",
    ],
  },
];

// Project ordering per lens (most relevant first)
export const PROJECT_ORDER: Record<Lens, string[]> = {
  ai: ["vrixo", "near", "lendlocal", "stock"],
  backend: ["near", "vrixo", "lendlocal", "stock"],
  fullstack: ["near", "lendlocal", "vrixo", "jobportal"],
};

export function projectsFor(lens: Lens): Project[] {
  const order = PROJECT_ORDER[lens];
  return order
    .map((id) => PROJECTS.find((p) => p.id === id)!)
    .filter(Boolean);
}

export function describe(p: Project, lens: Lens): string {
  return (p as Record<string, unknown>)[lens] as string ?? p.summary;
}

export type SkillGroup = { label: string; items: string[] };

export const SKILLS: Record<Lens, SkillGroup[]> = {
  ai: [
    { label: "Languages", items: ["Python", "TypeScript", "JavaScript", "SQL", "Java", "C/C++"] },
    { label: "ML & Data", items: ["Scikit-learn", "NumPy", "Pandas", "PyTorch", "HuggingFace", "Plotly"] },
    { label: "Vision models", items: ["Real-ESRGAN", "GFPGAN", "RemBG", "LaMa"] },
    { label: "Backend", items: ["FastAPI", "Django", "REST", "Celery", "Redis", "JWT/OAuth"] },
    { label: "Infra", items: ["Docker", "Kubernetes", "DigitalOcean DOKS", "AWS", "Vercel"] },
  ],
  backend: [
    { label: "Languages", items: ["Python", "SQL (PostgreSQL)", "TypeScript", "JavaScript", "Java"] },
    { label: "Frameworks", items: ["FastAPI", "Django", "Node.js", "Express", "REST", "WebRTC signaling"] },
    { label: "Data", items: ["PostgreSQL", "MongoDB", "Prisma", "SQLAlchemy", "Supabase", "Neon", "Firestore"] },
    { label: "Async", items: ["Celery", "Redis", "Cloud Functions / FCM"] },
    { label: "Infra", items: ["Docker", "Kubernetes (Kind, DOKS)", "Gateway API", "AWS", "Vercel"] },
  ],
  fullstack: [
    { label: "Languages", items: ["TypeScript", "JavaScript", "Python", "SQL", "Java"] },
    { label: "Frontend", items: ["React 19", "Next.js 14", "Vite", "Tailwind", "shadcn/ui", "Leaflet", "PWA"] },
    { label: "Backend", items: ["Node.js", "Express", "FastAPI", "Django", "REST", "JWT/OAuth", "WebRTC"] },
    { label: "Data", items: ["PostgreSQL", "MongoDB", "Prisma", "SQLAlchemy", "Firebase"] },
    { label: "Infra", items: ["Docker", "Kubernetes", "Vercel", "Stripe", "Capacitor"] },
  ],
};

export const RESUME_PDF: Record<Lens, string> = {
  ai: "/resume/Vishvam_Patel_AI_Developer.pdf",
  backend: "/resume/Vishvam_Patel_Backend_Developer.pdf",
  fullstack: "/resume/Vishvam_Patel_FullStack_Developer.pdf",
};
