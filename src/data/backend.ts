// Backend "datacenter" data — the 3 projects from the résumé rendered as racks.

export const B_PROFILE = {
  name: "Vishvam Patel",
  role: "Backend Engineer",
  region: "in-1 · IST",
  sha: "main@a1b2c3d",
  email: "vishvamp129@gmail.com",
  phone: "+91 96245 99774",
  github: "https://github.com/vishvam129",
  githubHandle: "vishvam129",
  linkedin: "https://www.linkedin.com/in/vishvam129/",
  resume: "/resume/Vishvam_Patel_Backend_Developer.pdf",
};

// Experience (résumé) — surfaced in the About section, not as racks.
export const EXPERIENCE = [
  {
    org: "RdFlex", role: "Backend Developer", period: "Jul 2025 — present",
    desc: "Python backend for a multi-service web platform: REST APIs and auth in FastAPI / Odoo on PostgreSQL, JWT/OAuth with refresh tokens + cross-subdomain cookies, shared CORS middleware, instance-lifecycle schemas, and Docker / Kubernetes (Kind, DOKS) with Gateway API routing.",
  },
  {
    org: "RdFlex", role: "Python Developer Intern", period: "Jan — Jun 2025",
    desc: "Backend components for a large-scale business-management platform; optimized PostgreSQL schemas and integrated third-party REST APIs for e-commerce and inventory.",
  },
];

export const EDUCATION = { org: "LJ University", degree: "B.E. Computer Science & Technology", period: "2022 — 2026", place: "Gujarat, India" };

export type Service = {
  id: string;
  name: string;       // service name
  project: string;    // human project name
  status: "ok" | "warn";
  uptime: number;     // %
  p50: number; p99: number; // ms
  rps: number;
  blurb: string;
  stack: string[];
  url?: string;
  incidents: { date: string; title: string; fix: string }[];
};

export const SERVICES: Service[] = [
  {
    id: "vrixo", name: "vrixo-api", project: "Vrixo", status: "ok",
    uptime: 99.90, p50: 240, p99: 5100, rps: 12,
    blurb: "Python backend for an AI photo-processing platform: a FastAPI REST API, SQLAlchemy + PostgreSQL for user and job data, and a Celery + Redis queue for asynchronous, GPU-bound image jobs. Upload / submit / result endpoints, Supabase auth, Cloudflare R2 storage, and pytest across the auth and image pipelines.",
    stack: ["FastAPI", "SQLAlchemy", "PostgreSQL", "Celery", "Redis"],
    incidents: [
      { date: "in progress", title: "GPU jobs blocked the API path under burst upload", fix: "moved inference onto a Celery + Redis queue with Redis-depth backpressure — the REST path stays fast while the GPU drains" },
    ],
  },
  {
    id: "lendlocal", name: "lendlocal-api", project: "LendLocal", status: "ok",
    uptime: 99.99, p50: 64, p99: 210, rps: 40,
    blurb: "Full backend for a hyperlocal sharing platform: OAuth authentication, server-side Next.js API routes, and Stripe payments. A Prisma / PostgreSQL (Neon) schema across users, listings, bookings, reviews and moderation reports, with 1100+ lines of automated booking and payment test flows.",
    stack: ["Next.js routes", "Prisma", "Neon Postgres", "Stripe", "OAuth"],
    url: "https://lendlocal-eight.vercel.app",
    incidents: [
      { date: "shipped", title: "double-charge risk on payment retry", fix: "Stripe idempotency keys per booking, covered by the retry path in the 1100-line test suite" },
    ],
  },
  {
    id: "near", name: "near-rtc", project: "Near", status: "ok",
    uptime: 99.95, p50: 28, p99: 160, rps: 90,
    blurb: "Realtime backend for a couples app on Cloud Firestore: couple / message / album models with per-couple security rules, a WebRTC signaling backend over Firestore (offer / answer / ICE) for voice, video and sleep calls, Cloud Functions + FCM push, and end-to-end-encrypted chat with passphrase-derived keys.",
    stack: ["Firestore", "WebRTC", "Cloud Functions", "FCM", "TypeScript"],
    incidents: [
      { date: "shipped", title: "ICE candidates dropped on slow networks", fix: "buffered trickle candidates in Firestore until the remote description was set; one call-lifecycle watcher" },
    ],
  },
];

export const B_STACK = [
  { label: "Languages", items: ["Python", "SQL (PostgreSQL)", "JavaScript", "TypeScript", "Java", "C/C++"] },
  { label: "Frameworks", items: ["FastAPI", "Django", "Node.js", "Express", "REST", "JWT / OAuth", "WebRTC signaling"] },
  { label: "Data", items: ["PostgreSQL", "MongoDB", "Prisma", "SQLAlchemy", "Supabase", "Neon", "Firestore"] },
  { label: "Async", items: ["Celery", "Redis", "Cloud Functions", "FCM"] },
  { label: "Infra", items: ["Docker", "Kubernetes (Kind, DOKS)", "Git", "AWS", "Vercel"] },
];
