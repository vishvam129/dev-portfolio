# Vishvam Patel — Portfolio (tripartite)

Three role-specific portfolios, each one's *medium* proving the discipline — built per a research blueprint (Architectural Paradigms for Next-Generation Developer Portfolios). React + Vite + TypeScript.

| Route | Paradigm | What it proves |
|---|---|---|
| `/` | **III · Browser-native AI inference** | On-device **RAG assistant** (Transformers.js embeddings → cosine retrieval over the résumé → grounded, cited answers, in a Web Worker) + a **Vision Sandbox** (RMBG-1.4 background removal, client-side). No server, no API keys. |
| `/backend` | **I · System-first** *(next)* | Terminal CLI + React-Flow C4 architecture topology with animated data-flow. |
| `/full-stack` | **II · Spatial web** *(next)* | React-Three-Fiber 3D studio; projects as interactive artifacts. |

## Stack
- React 19 + Vite + TypeScript (strict), react-router-dom
- **@huggingface/transformers** (Transformers.js) — embeddings + vision, ONNX/WASM in Web Workers
- Tailwind v4 (`@tailwindcss/vite`), Framer Motion
- Fonts: Space Grotesk · Geist / Geist Mono · JetBrains Mono

## Develop
```bash
pnpm install
pnpm dev        # http://localhost:5173
pnpm build      # tsc --noEmit && vite build → dist/
```
First visit to `/` downloads a ~25MB embedding model (cached after). Everything runs locally in the browser; graceful static fallback if WASM is unavailable. Knowledge base lives in `src/data/knowledge.ts`.
