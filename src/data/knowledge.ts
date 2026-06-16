// Knowledge Base for the on-device RAG assistant.
// Each chunk is embedded (Transformers.js) at load; queries are matched by
// cosine similarity and the top chunks ground the streamed, cited answer.

export type Chunk = {
  id: string;
  source: string; // citation label
  text: string;
};

export const KB: Chunk[] = [
  {
    id: "profile",
    source: "profile",
    text: "Vishvam Patel is a final-year Computer Science engineering student at LJ University, Gujarat, India, graduating June 2026. He is based in Gandhinagar and strongly prefers remote work. He is an AI / backend / full-stack engineer focused on shipping AI-powered products. Contact: vishvamp129@gmail.com, github.com/vishvam129, linkedin.com/in/vishvam129.",
  },
  {
    id: "education",
    source: "education",
    text: "Vishvam studies a Bachelor of Engineering in Computer Science and Technology at LJ University (June 2022 to June 2026). Relevant coursework: Data Structures and Algorithms, Database Management Systems, Computer Networks, Programming in Python, Programming in Java, MERN stack development, and AWS cloud computing.",
  },
  {
    id: "rdflex-ai",
    source: "experience · RdFlex (AI Platform Developer)",
    text: "At RdFlex, Vishvam is an AI Platform Developer (July 2025 to present) contributing to an AI-powered development platform that uses Anthropic Claude to generate application modules from natural-language prompts. He built the Python authentication, session and REST API layer the AI orchestrator consumes — JWT and OAuth flows, cross-subdomain cookies, CORS handling, and instance-lifecycle endpoints. He integrated the Python AI engine, an editor-sync sidecar and validator services with the core platform, and designed the draft-instance provisioning flow that lets the AI generate and preview code in seconds.",
  },
  {
    id: "rdflex-infra",
    source: "experience · RdFlex (infra)",
    text: "Vishvam deployed RdFlex services to Kubernetes — Kind for local development and DigitalOcean DOKS for production — with automated Docker image build and push pipelines and Gateway API routing. He works across Python (FastAPI / Odoo) backend services against PostgreSQL, designing and optimizing schemas and queries for the platform's instance-lifecycle data model.",
  },
  {
    id: "rdflex-intern",
    source: "experience · RdFlex (Intern)",
    text: "Before his current role, Vishvam was a Python Developer Intern at RdFlex (January to June 2025). He built Python backend components for a large-scale business-management platform serving manufacturing and retail clients, engineered and optimized PostgreSQL schemas and queries for data integrity and production performance, and integrated third-party REST APIs for e-commerce and inventory management across the full SDLC.",
  },
  {
    id: "vrixo",
    source: "project · Vrixo",
    text: "Vrixo is an AI photo-enhancement platform Vishvam is building: background removal, HD upscaling, face enhancement, colorization, object removal and old-photo restoration. It integrates pre-trained open-source vision models — Real-ESRGAN for 4x upscaling, GFPGAN for face enhancement, RemBG for background removal, and LaMa for object removal — via PyTorch and HuggingFace. The backend is FastAPI with a Celery + Redis queue for asynchronous, GPU-bound inference jobs, SQLAlchemy + PostgreSQL for user and job data, Supabase auth and Cloudflare R2 object storage. The frontend is Next.js 14 with Tailwind and shadcn/ui. He wrote pytest unit and integration tests for the auth and image pipelines.",
  },
  {
    id: "near",
    source: "project · Near",
    text: "Near is a real-time app for long-distance couples that Vishvam built from a single React 19 + TypeScript codebase shipping to both web (an installable PWA) and Android (via Capacitor). Features include chat, photos, voice notes, synced YouTube watch-together, shared albums and a couple dashboard. He implemented WebRTC voice, video and sleep calls with Firestore-based signaling (offer/answer/ICE exchange), and end-to-end-encrypted secret chat using passphrase-derived keys with KDF iteration hardening. Realtime data and security rules run on Cloud Firestore; push notifications use Firebase Cloud Functions + FCM; async video messages use Cloudinary. He code-split the PWA from 1.2 MB down to 616 KB and deployed on Firebase Hosting. About 70 feature components.",
  },
  {
    id: "lendlocal",
    source: "project · LendLocal",
    text: "LendLocal is a hyperlocal community sharing platform Vishvam built solo and shipped to production (lendlocal-eight.vercel.app). Users share tools, equipment and skills with nearby people — browse, book, pay and review. Stack: Next.js 14, Prisma, PostgreSQL on Neon, Stripe payments, Leaflet maps, Vercel Blob storage. He designed the Prisma/Postgres schema (20+ models: users, listings, bookings, reviews, moderation reports), built OAuth authentication and secure sessions, integrated Stripe with an escrow-style hold/release flow, and wrote over 1100 lines of automated end-to-end test flows for the booking and payment journeys.",
  },
  {
    id: "stock",
    source: "project · Stock Price Prediction",
    text: "Stock Price Prediction is a Python and Django web app where Vishvam applied multiple Scikit-learn regression models to historical equity data from the Yahoo Finance API, with interactive Plotly visualizations comparing predicted versus actual prices.",
  },
  {
    id: "jobportal",
    source: "project · Job Portal",
    text: "Job Portal is a full-stack MERN application: a responsive React UI for browsing, advanced search and filtering, and application management, backed by a Node.js / Express REST API and MongoDB.",
  },
  {
    id: "skills",
    source: "skills",
    text: "Vishvam's languages: Python, TypeScript, JavaScript, SQL (PostgreSQL), Java, C/C++. AI and data: Scikit-learn, NumPy, Pandas, PyTorch, HuggingFace, Plotly; integrating pre-trained vision models like Real-ESRGAN, GFPGAN, RemBG and LaMa. Backend: FastAPI, Django, Node.js, Express, REST API design, JWT/OAuth, Celery, Redis, WebRTC signaling. Frontend: React 19, Next.js 14, Vite, Tailwind, shadcn/ui, Leaflet, PWA, Capacitor. Data: PostgreSQL, MongoDB, Prisma, SQLAlchemy, Supabase, Neon, Firebase/Firestore. Infra: Docker, Kubernetes (Kind, DigitalOcean DOKS), Gateway API, AWS, Vercel.",
  },
  {
    id: "philosophy",
    source: "philosophy",
    text: "Vishvam's strengths: he ships production software solo (LendLocal is live), and he integrates AI and ML end-to-end rather than only building demos. He is comfortable across the whole stack — Python APIs, React UIs, and Kubernetes deployments. He is honest about scope: he integrates pre-trained models and consumes LLM APIs, and is going deeper on PyTorch through Vrixo; he does not claim to train large models from scratch or do deep-learning research.",
  },
  {
    id: "availability",
    source: "availability",
    text: "Vishvam is available for remote-first junior roles in AI/ML engineering, backend, or full-stack development, graduating June 2026. He is based in Gandhinagar, Gujarat, India (IST), strongly prefers remote, and is open to hybrid. Reach him at vishvamp129@gmail.com.",
  },
];

// Suggested starter prompts shown in the assistant UI.
export const SUGGESTED = [
  "What did Vishvam build at RdFlex?",
  "How did he use GFPGAN and Real-ESRGAN in Vrixo?",
  "Explain the WebRTC and encryption work in Near.",
  "Is he available for a remote AI role?",
  "What's his strongest production project?",
];
