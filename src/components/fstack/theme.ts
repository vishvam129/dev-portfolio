// Full-Stack "The Stack" — an immersive 3D tower of layers in a dark void.
export const C = {
  bg: "#07060f",       // near-black, faint violet
  bg2: "#0c0a1a",
  panel: "#13111f",
  line: "#211d33",
  line2: "#2f2a48",
  fg: "#f6f6ff",       // crisp white
  sub: "#a8a9c8",
  faint: "#66688c",
  accent: "#6e7bff",   // electric indigo — hero / frontend
  accent2: "#9b3bff",  // vivid violet — backend / bottom of stack
  ok: "#34e0c0",       // teal (success contrast)
};

export const F = {
  display: "'Sora', system-ui, sans-serif",
  body: "'Hanken Grotesk', system-ui, sans-serif",
  mono: "'JetBrains Mono', ui-monospace, monospace",
};

// the layers of the stack, top (client) → bottom (infra); warm → cool
export type LayerDef = { id: string; label: string; sub: string; color: string; y: number; desc: string };
// electric sweep — periwinkle-white (top, the UI) → electric indigo → vivid violet (foundation)
export const LAYERS: LayerDef[] = [
  { id: "client", label: "Client", sub: "React · Next.js · PWA", color: "#cdd6ff", y: 4.2, desc: "The interface users touch — React 19 / Next.js 14, responsive, installable as a PWA and shipped native to Android via Capacitor." },
  { id: "edge", label: "Edge / CDN", sub: "Vercel · routing", color: "#9aa6ff", y: 2.5, desc: "Assets and routing at the edge — Vercel / Firebase Hosting serve the app worldwide and route each request to the right handler." },
  { id: "api", label: "API", sub: "FastAPI · route handlers", color: "#7d80ff", y: 0.8, desc: "The contract — FastAPI and Next.js route handlers that own request validation, response shape, and status codes." },
  { id: "services", label: "Services", sub: "auth · payments · queue", color: "#7a63ff", y: -0.9, desc: "The work behind the request — JWT/OAuth auth, Stripe payments, WebRTC realtime, and Celery/Redis async queues." },
  { id: "data", label: "Database", sub: "Postgres · Firestore", color: "#8a4dff", y: -2.6, desc: "Where state lives — PostgreSQL via Prisma/SQLAlchemy, Firestore for realtime, plus object storage (R2 / Cloudinary)." },
  { id: "infra", label: "Infra", sub: "Docker · Kubernetes", color: "#9b3bff", y: -4.3, desc: "Shipping it — Docker images, Kubernetes (Kind locally, DOKS in prod), and automated deploys with Gateway API routing." },
];

// per-project tech shown on each layer when traced
export const PROJECT_LAYERS: Record<string, Record<string, string>> = {
  lendlocal: { client: "Next.js 14 · Leaflet", edge: "Vercel", api: "app/api routes", services: "OAuth · Stripe", data: "Prisma · Neon Postgres", infra: "Vercel · Blob" },
  near: { client: "React 19 · Capacitor", edge: "Firebase Hosting", api: "Cloud Functions", services: "WebRTC · FCM", data: "Firestore · Cloudinary", infra: "Firebase" },
  vrixo: { client: "Next.js 14 · shadcn/ui", edge: "Vercel", api: "FastAPI", services: "Supabase · Celery", data: "SQLAlchemy · Postgres", infra: "Redis · Cloudflare R2" },
};
