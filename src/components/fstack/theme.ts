// Full-Stack "The Stack" — an immersive 3D tower of layers in a dark void.
export const C = {
  bg: "#06060d",
  bg2: "#0a0a14",
  panel: "#10111d",
  line: "#1c1d2c",
  line2: "#2a2c40",
  fg: "#edeef6",
  sub: "#979ab2",
  faint: "#5c5f78",
  accent: "#ff5c8a",   // hero accent (warm top of the stack)
  accent2: "#4db5ff",  // cool bottom of the stack
  ok: "#5cff9e",
};

export const F = {
  display: "'Space Grotesk', system-ui, sans-serif",
  body: "'Hanken Grotesk', system-ui, sans-serif",
  mono: "'JetBrains Mono', ui-monospace, monospace",
};

// the layers of the stack, top (client) → bottom (infra); warm → cool
export type LayerDef = { id: string; label: string; sub: string; color: string; y: number; desc: string };
export const LAYERS: LayerDef[] = [
  { id: "client", label: "Client", sub: "React · Next.js · PWA", color: "#ff5c8a", y: 4.2, desc: "The interface users touch — React 19 / Next.js 14, responsive, installable as a PWA and shipped native to Android via Capacitor." },
  { id: "edge", label: "Edge / CDN", sub: "Vercel · routing", color: "#ff894d", y: 2.5, desc: "Assets and routing at the edge — Vercel / Firebase Hosting serve the app worldwide and route each request to the right handler." },
  { id: "api", label: "API", sub: "FastAPI · route handlers", color: "#ffce3d", y: 0.8, desc: "The contract — FastAPI and Next.js route handlers that own request validation, response shape, and status codes." },
  { id: "services", label: "Services", sub: "auth · payments · queue", color: "#5cff9e", y: -0.9, desc: "The work behind the request — JWT/OAuth auth, Stripe payments, WebRTC realtime, and Celery/Redis async queues." },
  { id: "data", label: "Database", sub: "Postgres · Firestore", color: "#4db5ff", y: -2.6, desc: "Where state lives — PostgreSQL via Prisma/SQLAlchemy, Firestore for realtime, plus object storage (R2 / Cloudinary)." },
  { id: "infra", label: "Infra", sub: "Docker · Kubernetes", color: "#9a6bff", y: -4.3, desc: "Shipping it — Docker images, Kubernetes (Kind locally, DOKS in prod), and automated deploys with Gateway API routing." },
];

// per-project tech shown on each layer when traced
export const PROJECT_LAYERS: Record<string, Record<string, string>> = {
  lendlocal: { client: "Next.js 14 · Leaflet", edge: "Vercel", api: "app/api routes", services: "OAuth · Stripe", data: "Prisma · Neon Postgres", infra: "Vercel · Blob" },
  near: { client: "React 19 · Capacitor", edge: "Firebase Hosting", api: "Cloud Functions", services: "WebRTC · FCM", data: "Firestore · Cloudinary", infra: "Firebase" },
  vrixo: { client: "Next.js 14 · shadcn/ui", edge: "Vercel", api: "FastAPI", services: "Supabase · Celery", data: "SQLAlchemy · Postgres", infra: "Redis · Cloudflare R2" },
};
