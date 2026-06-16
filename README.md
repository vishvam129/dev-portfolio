# Vishvam Patel — Portfolio

Three sibling sites, one engineer — each one's design argues for its role, mirroring the three tailored résumés. Built from scratch (no template) with **React + Vite + TypeScript**.

| Route | Concept | Signature |
|---|---|---|
| `/` | **VISHVAM-1 / The Inference** (AI) | Behaves like a live model — a **WebGL2 diffusion-denoise hero** (the name materializes from latent noise) with a `step/σ/tokens` HUD, model-card projects with eval scores, fine-tuning log, and an interactive "Ask VISHVAM-1" terminal |
| `/backend` | **Production** (Backend) | A live status page — "all systems operational", real client-measured latency + sparkline, animated request-trace + span waterfall, ⌘K command palette, runnable shell |
| `/full-stack` | **The Product** (Full-Stack) | Product-launch craft — hand-rolled WebGL2 molten-gradient hero, custom magnetic cursor, scroll-velocity kinetic type, bento grid, scroll-story |

## Stack

- **React 19** + **Vite** + **TypeScript** (strict)
- **react-router-dom** (client routing)
- **Tailwind v4** (`@tailwindcss/vite`) · CSS-variable theme system (one palette per site)
- **Framer Motion** (light) · hand-rolled WebGL2 + 2D canvas (no three.js)
- Google Fonts: Sora · JetBrains Mono · Geist / Geist Mono · Bricolage Grotesque · Hanken Grotesk

## Develop

```bash
pnpm install
pnpm dev        # http://localhost:5173
pnpm build      # tsc --noEmit && vite build  → dist/
pnpm preview    # serve the production build
pnpm typecheck
```

Content is a single source of truth in `src/data/content.ts`, derived from the three résumés in `public/resume/`. SPA routing falls back to `index.html` (`vercel.json` / `public/_redirects`) so deep links work on static hosts.
