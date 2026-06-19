// Backend "Control Plane" data — projects rendered as production services.

export const B_PROFILE = {
  name: "Vishvam Patel",
  role: "Backend Engineer",
  region: "blr1 · IST",
  sha: "main@a1b2c3d",
  email: "vishvamp129@gmail.com",
  github: "https://github.com/vishvam129",
  githubHandle: "vishvam129",
  linkedin: "https://www.linkedin.com/in/vishvam129/",
  resume: "/resume/Vishvam_Patel_Backend_Developer.pdf",
};

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
    id: "auth-api", name: "auth-api", project: "RdFlex platform", status: "ok",
    uptime: 99.98, p50: 11, p99: 84, rps: 320,
    blurb: "The Python auth, session and REST layer the AI orchestrator consumes — JWT/OAuth with refresh tokens, cross-subdomain cookies, shared CORS middleware, and instance-lifecycle endpoints (create / wake / deploy / stop).",
    stack: ["FastAPI", "Odoo", "PostgreSQL", "JWT/OAuth", "Gateway API"],
    incidents: [
      { date: "2025-09", title: "cross-subdomain cookie not set on `.platxa.com`", fix: "corrected Domain + SameSite=None; Secure on the refresh cookie; verified across nip.io dev + prod" },
      { date: "2025-08", title: "CORS regression with nip.io origins", fix: "regex origin allowlist in shared middleware; added preflight cache" },
    ],
  },
  {
    id: "gpu-queue", name: "gpu-queue", project: "Vrixo", status: "warn",
    uptime: 99.90, p50: 240, p99: 5100, rps: 12,
    blurb: "Async, GPU-bound inference for an AI photo platform: FastAPI REST API, a Celery + Redis queue, SQLAlchemy + Postgres for job state, Supabase auth and Cloudflare R2 storage. pytest covers the auth + image pipelines.",
    stack: ["FastAPI", "Celery", "Redis", "SQLAlchemy", "PostgreSQL"],
    incidents: [
      { date: "2026-02", title: "queue saturation under burst upload", fix: "tuned Celery concurrency + Redis-depth based backpressure; p99 on the API path held while GPU drained" },
    ],
  },
  {
    id: "signaling", name: "signaling", project: "Near", status: "ok",
    uptime: 99.95, p50: 28, p99: 160, rps: 90,
    blurb: "Realtime backend for a couples app: Cloud Firestore data models with per-couple security rules, a WebRTC signaling channel (offer/answer/ICE), Cloud Functions + FCM push, and E2E-encrypted chat (passphrase KDF).",
    stack: ["Firestore", "WebRTC", "Cloud Functions", "FCM", "TypeScript"],
    incidents: [
      { date: "2026-01", title: "ICE trickle dropped on slow networks", fix: "buffered candidates in Firestore until remote description set; single call-lifecycle watcher" },
    ],
  },
  {
    id: "payments", name: "payments", project: "LendLocal", status: "ok",
    uptime: 99.99, p50: 64, p99: 210, rps: 40,
    blurb: "Server API routes for a hyperlocal sharing platform: OAuth auth, Stripe escrow-style hold/release, a Prisma/Postgres (Neon) schema across 20+ models, shipped to production. 1100+ lines of automated booking + payment test flows.",
    stack: ["Next.js routes", "Prisma", "Neon Postgres", "Stripe"],
    url: "https://lendlocal-eight.vercel.app",
    incidents: [
      { date: "2025-05", title: "double-charge risk on retry", fix: "Stripe idempotency keys per booking; covered the retry path in the 1100-line test suite" },
    ],
  },
];

// ----- system topology (RdFlex) -----
export type TNode = { id: string; label: string; sub: string; x: number; y: number; kind: "edge" | "svc" | "store" | "queue" };
export type TEdge = { from: string; to: string; label?: string };
export const TOPO_NODES: TNode[] = [
  { id: "client", label: "Client", sub: "browser", x: 60, y: 130, kind: "edge" },
  { id: "gateway", label: "Gateway API", sub: "k8s routing", x: 230, y: 130, kind: "edge" },
  { id: "auth", label: "auth-api", sub: "JWT / OAuth", x: 420, y: 60, kind: "svc" },
  { id: "engine", label: "ai-engine", sub: "orchestrator", x: 420, y: 200, kind: "svc" },
  { id: "validator", label: "validator", sub: "schema check", x: 600, y: 130, kind: "svc" },
  { id: "pg", label: "PostgreSQL", sub: "instance state", x: 790, y: 60, kind: "store" },
  { id: "redis", label: "Redis", sub: "cache / queue", x: 790, y: 200, kind: "queue" },
];
export const TOPO_EDGES: TEdge[] = [
  { from: "client", to: "gateway", label: "https" },
  { from: "gateway", to: "auth", label: "verify" },
  { from: "gateway", to: "engine" },
  { from: "auth", to: "validator" },
  { from: "engine", to: "validator" },
  { from: "validator", to: "pg", label: "query" },
  { from: "engine", to: "redis", label: "enqueue" },
];

// ----- distributed trace (Vrixo job) -----
export type Span = { name: string; svc: string; start: number; dur: number; depth: number; attrs: string };
export const TRACE_TOTAL = 312;
export const TRACE: Span[] = [
  { name: "POST /jobs", svc: "fastapi", start: 0, dur: 312, depth: 0, attrs: "http.status=202 · idempotent" },
  { name: "auth.verify_jwt", svc: "auth", start: 4, dur: 9, depth: 1, attrs: "alg=HS256 · ok" },
  { name: "validate(PhotoJob)", svc: "pydantic", start: 14, dur: 5, depth: 1, attrs: "pydantic v2" },
  { name: "celery.enqueue", svc: "celery", start: 20, dur: 7, depth: 1, attrs: "queue=gpu" },
  { name: "redis.LPUSH", svc: "redis", start: 22, dur: 2, depth: 2, attrs: "broker" },
  { name: "gpu.worker.infer", svc: "worker", start: 40, dur: 248, depth: 1, attrs: "Real-ESRGAN 4× · cuda" },
  { name: "pg.INSERT job", svc: "postgres", start: 290, dur: 16, depth: 1, attrs: "SQLAlchemy" },
  { name: "serialize → 202", svc: "fastapi", start: 306, dur: 6, depth: 1, attrs: "JSON" },
];

// ----- API playground endpoints (one shared simulated backend) -----
export type Endpoint = {
  id: string; method: "GET" | "POST"; path: string; desc: string;
  stages: string[];      // middleware pipeline
  status: number; latency: [number, number];
  body?: string;         // editable request body (for POST)
  respond: (body?: string) => { status: number; json: unknown };
};

export const ENDPOINTS: Endpoint[] = [
  {
    id: "health", method: "GET", path: "/health", desc: "Liveness + per-service status",
    stages: ["gateway", "handler"], status: 200, latency: [3, 12],
    respond: () => ({ status: 200, json: { status: "operational", services: SERVICES.length, region: B_PROFILE.region, ts: "now" } }),
  },
  {
    id: "projects", method: "GET", path: "/projects", desc: "List shipped services",
    stages: ["gateway", "auth", "handler", "db"], status: 200, latency: [12, 48],
    respond: () => ({ status: 200, json: SERVICES.map((s) => ({ id: s.id, project: s.project, status: s.status, uptime: s.uptime, stack: s.stack })) }),
  },
  {
    id: "login", method: "POST", path: "/auth/login", desc: "Issue a JWT (try a wrong password)",
    stages: ["gateway", "validate", "handler", "db"], status: 200, latency: [18, 60],
    body: '{\n  "email": "recruiter@corp.com",\n  "password": "hire-vishvam"\n}',
    respond: (body) => {
      try {
        const b = JSON.parse(body || "{}");
        if (!b.email || !b.password) return { status: 422, json: { detail: [{ loc: ["body", "password"], msg: "field required", type: "value_error.missing" }] } };
        if (b.password !== "hire-vishvam") return { status: 401, json: { detail: "invalid credentials" } };
        return { status: 200, json: { access_token: "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ2aXNodmFtIn0.S1G", token_type: "bearer", expires_in: 3600 } };
      } catch { return { status: 400, json: { detail: "malformed JSON body" } }; }
    },
  },
  {
    id: "book", method: "POST", path: "/bookings", desc: "LendLocal booking (Stripe, idempotent)",
    stages: ["gateway", "auth", "validate", "handler", "db"], status: 201, latency: [40, 120],
    body: '{\n  "item_id": "itm_42",\n  "days": 3\n}',
    respond: (body) => {
      try {
        const b = JSON.parse(body || "{}");
        if (!b.item_id) return { status: 422, json: { detail: [{ loc: ["body", "item_id"], msg: "field required", type: "value_error.missing" }] } };
        return { status: 201, json: { booking_id: "bk_7Q2", item_id: b.item_id, days: b.days ?? 1, hold: "pi_3Stripe_hold", status: "confirmed" } };
      } catch { return { status: 400, json: { detail: "malformed JSON body" } }; }
    },
  },
];

export const B_STACK = [
  { label: "Languages", items: ["Python", "SQL (PostgreSQL)", "TypeScript", "JavaScript", "Java", "C/C++"] },
  { label: "Frameworks", items: ["FastAPI", "Django", "Node.js", "Express", "REST", "WebRTC signaling"] },
  { label: "Data", items: ["PostgreSQL", "MongoDB", "Prisma", "SQLAlchemy", "Supabase", "Neon", "Firestore"] },
  { label: "Async", items: ["Celery", "Redis", "Cloud Functions", "FCM"] },
  { label: "Infra", items: ["Docker", "Kubernetes (Kind, DOKS)", "Gateway API", "AWS", "Vercel"] },
];
