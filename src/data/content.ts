export const PROFILE = {
  name: "Vishvam Patel",
  role: "AI Engineer",
  location: "Gandhinagar, India",
  email: "vishvamp129@gmail.com",
  github: "https://github.com/vishvam129",
  githubHandle: "vishvam129",
  linkedin: "https://www.linkedin.com/in/vishvam129/",
  resume: "/resume/Vishvam_Patel_AI_Developer.pdf",
  graduating: "June 2026",
};

export type Project = {
  id: string;
  name: string;
  blurb: string;
  status: "production" | "in-progress" | "shipped";
  stack: string[];
  models?: string[];
  url?: string;
  metrics: { label: string; value: string }[];
};

export const PROJECTS: Project[] = [
  {
    id: "vrixo",
    name: "Vrixo",
    blurb:
      "AI photo-enhancement platform — pretrained vision models behind a FastAPI + Celery inference queue.",
    status: "in-progress",
    stack: ["PyTorch", "HuggingFace", "FastAPI", "Celery", "Redis", "Next.js"],
    models: ["Real-ESRGAN", "GFPGAN", "RemBG", "LaMa"],
    metrics: [
      { label: "vision models", value: "4" },
      { label: "upscale", value: "4×" },
      { label: "inference", value: "async GPU" },
    ],
  },
  {
    id: "near",
    name: "Near",
    blurb:
      "Real-time app for long-distance couples — one React codebase to web (PWA) + Android, WebRTC calls, E2E-encrypted chat.",
    status: "in-progress",
    stack: ["React 19", "TypeScript", "Firebase", "WebRTC", "Capacitor"],
    metrics: [
      { label: "components", value: "70+" },
      { label: "bundle", value: "1.2MB→616KB" },
      { label: "targets", value: "web + android" },
    ],
  },
  {
    id: "lendlocal",
    name: "LendLocal",
    blurb:
      "Hyperlocal sharing platform — built solo, live in production. OAuth, Stripe escrow, Leaflet, 1100+ test lines.",
    status: "production",
    stack: ["Next.js", "Prisma", "PostgreSQL", "Stripe", "Leaflet"],
    url: "https://lendlocal-eight.vercel.app",
    metrics: [
      { label: "status", value: "live" },
      { label: "schema", value: "20+ models" },
      { label: "tests", value: "1100+ lines" },
    ],
  },
  {
    id: "stock",
    name: "Stock Price Prediction",
    blurb:
      "Django + Scikit-learn regression over Yahoo Finance data with interactive Plotly forecasts.",
    status: "shipped",
    stack: ["Python", "Django", "Scikit-learn", "Plotly"],
    metrics: [
      { label: "models", value: "regression" },
      { label: "viz", value: "Plotly" },
    ],
  },
];

export const CAPABILITIES = [
  { label: "ML / Data", items: ["Scikit-learn", "PyTorch", "HuggingFace", "NumPy", "Pandas", "Plotly"] },
  { label: "Vision models", items: ["Real-ESRGAN", "GFPGAN", "RemBG", "LaMa"] },
  { label: "Backend", items: ["Python", "FastAPI", "Django", "REST", "Celery", "Redis", "JWT/OAuth"] },
  { label: "Frontend", items: ["React 19", "Next.js", "TypeScript", "Vite", "Tailwind"] },
  { label: "Infra", items: ["Docker", "Kubernetes", "DigitalOcean DOKS", "AWS", "Vercel"] },
];
