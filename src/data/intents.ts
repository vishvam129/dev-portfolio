// Response engine for the "Ask VISHVAM-1" inference terminal.
// Keyword-matched; deterministic; with a few easter eggs.

export type Intent = {
  id: string;
  chip: string;
  keywords: string[];
  answer: string[];
};

export const INTENTS: Intent[] = [
  {
    id: "who",
    chip: "Who are you?",
    keywords: ["who", "about", "you", "yourself", "vishvam", "intro"],
    answer: [
      "VISHVAM-1 — a developer model fine-tuned on Vishvam Patel.",
      "Final-year CS @ LJ University (grad Jun 2026). Currently an AI Platform Developer",
      "at RdFlex, building on an Anthropic-Claude code-generation platform.",
      "Strong on Python backend, full-stack web, and integrating AI/ML end-to-end.",
    ],
  },
  {
    id: "projects",
    chip: "Show projects",
    keywords: ["project", "projects", "work", "built", "build", "portfolio", "vrixo", "near", "lendlocal"],
    answer: [
      "→ Vrixo — AI photo platform: Real-ESRGAN, GFPGAN, RemBG, LaMa via FastAPI + Celery.",
      "→ Near — real-time couples app, web + Android; WebRTC calls, E2E chat, FCM push.",
      "→ LendLocal — production hyperlocal platform: Next.js, Prisma, Stripe (live).",
      "→ Stock Prediction — Scikit-learn regressors + Plotly over Yahoo Finance.",
      "Scroll to the model cards for eval scores.",
    ],
  },
  {
    id: "stack",
    chip: "Tech stack",
    keywords: ["stack", "tech", "skills", "tools", "language", "languages", "framework"],
    answer: [
      "Languages: Python · TypeScript · SQL · Java · C/C++",
      "AI/ML: Scikit-learn · PyTorch · HuggingFace · NumPy · Pandas",
      "Backend: FastAPI · Django · REST · Celery · Redis · JWT/OAuth",
      "Infra: Docker · Kubernetes (Kind, DOKS) · Gateway API · AWS · Vercel",
    ],
  },
  {
    id: "experience",
    chip: "Experience",
    keywords: ["experience", "job", "rdflex", "work history", "career", "role"],
    answer: [
      "RdFlex · AI Platform Developer · Jul 2025 — Present",
      "  Built the Python auth/session/REST layer the AI orchestrator consumes;",
      "  designed draft-instance provisioning; deployed to K8s (Kind + DOKS).",
      "RdFlex · Python Developer Intern · Jan — Jun 2025",
      "  Backend components + PostgreSQL optimization for a business platform.",
    ],
  },
  {
    id: "hire",
    chip: "Why hire?",
    keywords: ["hire", "why", "fit", "good", "strength", "offer"],
    answer: [
      "Ships production solo (LendLocal is live). Integrates AI end-to-end, not just demos.",
      "Comfortable across the stack — Python APIs to React UIs to Kubernetes.",
      "Honest about scope: integrates pre-trained models; learning deeper PyTorch via Vrixo.",
      "Remote-first, IST, available for junior AI / backend / full-stack roles.",
    ],
  },
  {
    id: "contact",
    chip: "Contact",
    keywords: ["contact", "email", "reach", "hire me", "talk", "connect", "github", "linkedin"],
    answer: [
      "email   → vishvamp129@gmail.com",
      "github  → github.com/vishvam129",
      "linkedin→ linkedin.com/in/vishvam129",
      "status  → open to remote junior AI / backend / full-stack roles",
    ],
  },
];

export const EGGS: Record<string, string[]> = {
  sudo: ["Permission denied: you are not in the sudoers file.", "This incident will be reported. (to nobody)"],
  hello: ["> hello, world.", "Nice to meet you. Ask me about projects, stack, or why to hire."],
  sentient: ["I am a portfolio pretending to be a model pretending to be a person. So... no comment."],
  salary: ["Target: ₹8–15 LPA · remote strongly preferred. Negotiable for the right team."],
  ls: ["projects/  experience/  stack/  contact/  resume.pdf  secrets/ (403)"],
  whoami: ["vishvam — engineer, age 22, build-things enthusiast."],
};

export const HELP_LINES = [
  "Try: who · projects · stack · experience · hire · contact",
  "Or just ask in plain English. (some hidden commands exist)",
];

export function infer(raw: string): string[] {
  const q = raw.trim().toLowerCase();
  if (!q) return HELP_LINES;
  if (q === "help" || q === "?") return HELP_LINES;
  if (q === "clear") return [];
  for (const k of Object.keys(EGGS)) {
    if (q === k || q.includes(k)) return EGGS[k];
  }
  let best: Intent | null = null;
  let bestScore = 0;
  for (const intent of INTENTS) {
    let score = 0;
    for (const kw of intent.keywords) if (q.includes(kw)) score += kw.length;
    if (score > bestScore) { bestScore = score; best = intent; }
  }
  if (best && bestScore > 0) return best.answer;
  return [
    `"${raw.trim()}" — out of distribution.`,
    "I'm fine-tuned on Vishvam's work. Try: who · projects · stack · hire · contact.",
  ];
}
