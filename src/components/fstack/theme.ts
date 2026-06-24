// Full-Stack "The Stack" — an immersive 3D tower of layers in a dark void.
export const C = {
  bg: "#070610",
  bg2: "#0b0a18",
  panel: "#12121f",
  line: "#1e1d2e",
  line2: "#2b2a42",
  fg: "#edeef6",
  sub: "#9a9ab4",
  faint: "#5e5d78",
  accent: "#e85cc0",   // magenta — top of the stack / hero
  accent2: "#34d0e0",  // cyan — bottom of the stack / hero
  ok: "#35e0b4",       // teal (cohesive with the cool palette)
};

export const F = {
  display: "'Space Grotesk', system-ui, sans-serif",
  body: "'Hanken Grotesk', system-ui, sans-serif",
  mono: "'JetBrains Mono', ui-monospace, monospace",
};

// the layers of the stack, top (client) → bottom (infra); warm → cool
export type LayerDef = { id: string; label: string; sub: string; color: string; y: number; desc: string };
// cohesive magenta → cyan hue-arc (analogous cool sweep; no garish yellow/green)
export const LAYERS: LayerDef[] = [
  { id: "client", label: "Client", sub: "React · Next.js · PWA", color: "#ec5fb6", y: 4.2, desc: "The interface users touch — React 19 / Next.js 14, responsive, installable as a PWA and shipped native to Android via Capacitor." },
  { id: "edge", label: "Edge / CDN", sub: "Vercel · routing", color: "#b266ef", y: 2.5, desc: "Assets and routing at the edge — Vercel / Firebase Hosting serve the app worldwide and route each request to the right handler." },
  { id: "api", label: "API", sub: "FastAPI · route handlers", color: "#8a72f2", y: 0.8, desc: "The contract — FastAPI and Next.js route handlers that own request validation, response shape, and status codes." },
  { id: "services", label: "Services", sub: "auth · payments · queue", color: "#5f8cf2", y: -0.9, desc: "The work behind the request — JWT/OAuth auth, Stripe payments, WebRTC realtime, and Celery/Redis async queues." },
  { id: "data", label: "Database", sub: "Postgres · Firestore", color: "#3eaeec", y: -2.6, desc: "Where state lives — PostgreSQL via Prisma/SQLAlchemy, Firestore for realtime, plus object storage (R2 / Cloudinary)." },
  { id: "infra", label: "Infra", sub: "Docker · Kubernetes", color: "#34d0d8", y: -4.3, desc: "Shipping it — Docker images, Kubernetes (Kind locally, DOKS in prod), and automated deploys with Gateway API routing." },
];

// per-project tech shown on each layer when traced
export const PROJECT_LAYERS: Record<string, Record<string, string>> = {
  lendlocal: { client: "Next.js 14 · Leaflet", edge: "Vercel", api: "app/api routes", services: "OAuth · Stripe", data: "Prisma · Neon Postgres", infra: "Vercel · Blob" },
  near: { client: "React 19 · Capacitor", edge: "Firebase Hosting", api: "Cloud Functions", services: "WebRTC · FCM", data: "Firestore · Cloudinary", infra: "Firebase" },
  vrixo: { client: "Next.js 14 · shadcn/ui", edge: "Vercel", api: "FastAPI", services: "Supabase · Celery", data: "SQLAlchemy · Postgres", infra: "Redis · Cloudflare R2" },
};
