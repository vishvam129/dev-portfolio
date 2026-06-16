# Vishvam Patel — Portfolio

Three sibling sites, one engineer — each one's design argues for its role, mirroring the three tailored résumés. Built from scratch (no template) on Next.js 15 + Tailwind v4 + TypeScript.

| Route | Concept | Signature |
|---|---|---|
| `/` | **VISHVAM-1 / The Inference** (AI) | Behaves like a live model — latent-space hero, model-card projects with eval scores, fine-tuning log, and an interactive "Ask VISHVAM-1" terminal |
| `/backend` | **Production** (Backend) | A live status page — "all systems operational", real `/api/health` telemetry + latency sparkline, animated request-trace + span waterfall, ⌘K command palette, runnable shell |
| `/full-stack` | **The Product** (Full-Stack) | Product-launch craft — hand-rolled WebGL2 molten-gradient hero, custom magnetic cursor, scroll-velocity kinetic type, bento grid, scroll-story |

## Stack

- **Next.js 15** (App Router) · **React 19** · **TypeScript** (strict)
- **Tailwind v4** · CSS-variable theme system (one palette per site)
- **Framer Motion** (light) · hand-rolled WebGL2 + 2D canvas (no three.js)
- **geist** fonts + Sora / JetBrains Mono / Bricolage Grotesque / Hanken Grotesk

## Develop

```bash
pnpm install
pnpm dev        # http://localhost:3000
pnpm build      # production build
pnpm typecheck  # tsc --noEmit
```

Content is a single source of truth in `src/data/content.ts`, derived from the three résumés in `public/resume/`.
