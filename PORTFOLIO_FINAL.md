# Developer Portfolio — FINAL Specification v3.0

> Third and final pass. Architecture validated, all features verified, 7 new features added,
> every known pitfall addressed. This file supersedes both PORTFOLIO_SPEC.md and PORTFOLIO_VERIFIED.md.

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Tech Stack (Final — All Decisions Locked)](#2-tech-stack)
3. [Design System](#3-design-system)
4. [Content Schemas](#4-content-schemas)
5. [Environment Variables](#5-environment-variables)
6. [Feature Breakdown (25 Features)](#6-feature-breakdown)
7. [Pages & Routes](#7-pages--routes)
8. [Folder Structure (Complete)](#8-folder-structure)
9. [State Management & Provider Architecture](#9-state-management--provider-architecture)
10. [Data Flow Architecture](#10-data-flow-architecture)
11. [Error Handling & Fallbacks](#11-error-handling--fallbacks)
12. [Responsive Design Matrix](#12-responsive-design-matrix)
13. [Animation Architecture](#13-animation-architecture)
14. [Security Hardening](#14-security-hardening)
15. [Performance Budget](#15-performance-budget)
16. [Testing Strategy](#16-testing-strategy)
17. [Browser Support & Polyfills](#17-browser-support--polyfills)
18. [CI/CD Pipeline](#18-cicd-pipeline)
19. [Deployment & Infrastructure](#19-deployment--infrastructure)
20. [Build Order (8 Phases, 52 Steps)](#20-build-order)
21. [Changelog from PORTFOLIO_VERIFIED.md](#21-changelog)

---

## 1. Project Overview

### What This Is
A developer portfolio website — a **single-page app** with a blog subsection. Showcases projects, skills, experience, and writing. Designed to win Awwwards Honorable Mention-level quality.

### Core Principles
1. **3-Second Rule**: The hero must captivate in under 3 seconds
2. **Story > List**: Every section flows into the next like a narrative
3. **Performance is a Feature**: 95+ Lighthouse, instant interactions, no jank
4. **Accessible by Default**: WCAG 2.1 AA, keyboard-first, screen-reader-friendly
5. **Zero Backend**: Fully static, CDN-delivered, no server to maintain

### Goals
| Goal | Metric |
|------|--------|
| Visual Impact | Awwwards-quality hero, animations at 60fps |
| Performance | Lighthouse 95+ all categories |
| SEO | First page for "[Your Name] developer" |
| Accessibility | WCAG 2.1 AA, 0 axe violations |
| Load Time | FCP < 1.5s, LCP < 2.5s |
| Bundle Size | < 200KB JS gzipped (initial) |

### Non-Goals (Explicitly Out of Scope)
- CMS / admin dashboard
- User authentication
- Internationalization (i18n)
- PWA / offline mode / service worker
- Comments on blog posts
- E-commerce / payments
- Services / pricing / freelance page

---

## 2. Tech Stack

Every decision is locked. No "or" options remain.

### Core

| Layer | Package | Version | Purpose |
|-------|---------|---------|---------|
| Framework | `next` | 15.x | App Router, SSG, image optimization, SEO |
| Language | `typescript` | 5.x | Type safety |
| Runtime | `react` + `react-dom` | 19.x | UI library |
| Styling | `tailwindcss` + `@tailwindcss/postcss` | 4.x | Utility-first CSS |
| PostCSS | `postcss` | latest | Required by Tailwind v4 |

### Animation & 3D

| Package | Purpose |
|---------|---------|
| `framer-motion` (11.x) | Declarative React animations, layout animations, AnimatePresence |
| `gsap` + `@gsap/react` (3.x) | ScrollTrigger, timeline drawing, pinning, text reveals |
| `lenis` | Smooth scroll (integrates with GSAP ticker) |
| `three` + `@react-three/fiber` + `@react-three/drei` | 3D particle hero, WebGL scenes |

### UI & Components

| Package | Purpose |
|---------|---------|
| `next-themes` | Dark/light theme with SSR, system preference, localStorage |
| `lucide-react` | UI icons (nav, buttons, social) |
| `sonner` | Toast notifications ("Copied!", form success/error) |
| `embla-carousel-react` + `embla-carousel-autoplay` | Testimonial carousel with autoplay |

### Forms & Email

| Package | Purpose |
|---------|---------|
| `react-hook-form` + `@hookform/resolvers` | Performant form state |
| `zod` | Schema validation |
| `@emailjs/browser` | Client-side email (no API route) |

### Blog / MDX

| Package | Purpose |
|---------|---------|
| `next-mdx-remote` | MDX compilation with RSC support |
| `gray-matter` | Frontmatter parsing |
| `reading-time` | Reading time estimate |
| `remark-gfm` | GitHub-flavored markdown (tables, strikethrough) |
| `rehype-slug` | Auto-generate heading IDs |
| `rehype-autolink-headings` | Clickable heading links |
| `rehype-pretty-code` + `shiki` | Syntax highlighting with themes |

### Utilities

| Package | Purpose |
|---------|---------|
| `clsx` + `tailwind-merge` | `cn()` class utility |
| `date-fns` | Date formatting |
| `react-calendar-heatmap` | GitHub-style contribution graph (About section) |

### Analytics & Monitoring

| Package | Purpose |
|---------|---------|
| `@vercel/analytics` | Page views, visitors, referrers |
| `@vercel/speed-insights` | Core Web Vitals monitoring |

### Dev Dependencies

| Package | Purpose |
|---------|---------|
| `eslint` + `eslint-config-next` | Linting |
| `prettier` + `prettier-plugin-tailwindcss` | Formatting + Tailwind class sorting |
| `vitest` + `@testing-library/react` + `@testing-library/jest-dom` | Unit/component tests |
| `playwright` + `@axe-core/playwright` | E2E + accessibility tests |
| `@types/react` + `@types/node` + `@types/three` | Type definitions |
| `husky` + `lint-staged` | Pre-commit hooks |

### Total: ~42 packages

### `package.json` Scripts

```json
{
  "scripts": {
    "dev": "next dev --turbopack",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "lint:fix": "next lint --fix",
    "format": "prettier --write .",
    "format:check": "prettier --check .",
    "typecheck": "tsc --noEmit",
    "test": "vitest",
    "test:run": "vitest run",
    "test:e2e": "playwright test",
    "test:a11y": "playwright test --grep @a11y",
    "prepare": "husky"
  }
}
```

---

## 3. Design System

### 3.1 Color Palette

CSS custom properties in `globals.css`. Tailwind v4 consumes them natively.

```css
/* DARK MODE (default) */
:root {
  --background:         hsl(240 10% 4%);       /* #0a0a0f — near-black blue tint */
  --foreground:         hsl(240 5% 90%);        /* #e4e4e7 — zinc-200 */
  --card:               hsl(240 6% 10%);        /* #18181b — zinc-900 */
  --card-foreground:    hsl(0 0% 98%);          /* #fafafa — zinc-50 */
  --primary:            hsl(239 84% 67%);       /* #6366f1 — indigo-500 */
  --primary-foreground: hsl(0 0% 100%);         /* white */
  --primary-hover:      hsl(239 84% 74%);       /* #818cf8 — indigo-400 */
  --secondary:          hsl(271 81% 66%);       /* #a855f7 — purple-500 */
  --muted:              hsl(240 4% 16%);        /* #27272a — zinc-800 */
  --muted-foreground:   hsl(240 5% 65%);        /* #a1a1aa — zinc-400 */
  --border:             hsl(240 4% 26%);        /* #3f3f46 — zinc-700 */
  --ring:               hsl(239 84% 67%);       /* matches primary */
  --destructive:        hsl(0 84% 60%);         /* #ef4444 — red-500 */
  --success:            hsl(142 71% 45%);       /* #22c55e — green-500 */
  --warning:            hsl(38 92% 50%);        /* #f59e0b — amber-500 */
  --radius:             0.75rem;
}

/* LIGHT MODE */
.light {
  --background:         hsl(0 0% 100%);
  --foreground:         hsl(240 6% 10%);
  --card:               hsl(240 5% 96%);        /* #f4f4f5 */
  --card-foreground:    hsl(240 6% 10%);
  --primary:            hsl(239 84% 56%);       /* #4f46e5 — indigo-600 */
  --primary-foreground: hsl(0 0% 100%);
  --primary-hover:      hsl(239 84% 67%);
  --secondary:          hsl(271 81% 56%);       /* #9333ea — purple-600 */
  --muted:              hsl(240 5% 96%);
  --muted-foreground:   hsl(240 4% 46%);        /* #71717a */
  --border:             hsl(240 5% 90%);
  --ring:               hsl(239 84% 56%);
  --destructive:        hsl(0 72% 51%);
  --success:            hsl(142 76% 36%);
  --warning:            hsl(32 95% 44%);
}
```

#### Gradients
```css
--gradient-primary:    linear-gradient(135deg, var(--primary), var(--secondary));
--gradient-hero:       linear-gradient(135deg, hsl(240 10% 4%) 0%, hsl(243 47% 15%) 50%, hsl(240 10% 4%) 100%);
--gradient-text:       linear-gradient(135deg, var(--primary), var(--secondary)); /* for gradient text */
```

#### Glassmorphism
```css
/* Navbar */
--glass-bg:      rgba(10, 10, 15, 0.7);      /* dark */
                 rgba(255, 255, 255, 0.7);    /* light */
--glass-blur:    blur(16px);
--glass-border:  1px solid rgba(255, 255, 255, 0.1);

/* Cards */
--glass-card-bg: rgba(24, 24, 27, 0.5);      /* dark */
                 rgba(244, 244, 245, 0.5);    /* light */
--glass-card-blur: blur(8px);
--glass-card-border: 1px solid rgba(255, 255, 255, 0.05);
```

### 3.2 Typography

```
FONTS (via next/font/google):
  Primary:   "Inter" (variable) — headings (600-800) + body (400-500)
  Monospace: "JetBrains Mono" (variable) — code blocks (400-500)

FLUID SCALE:
  --text-hero:    clamp(3rem, 6vw, 5rem)       — Hero name
  --text-h1:      clamp(2.5rem, 5vw, 4rem)     — Hero heading
  --text-h2:      clamp(2rem, 4vw, 3rem)        — Section titles
  --text-h3:      clamp(1.25rem, 2vw, 1.75rem)  — Card titles
  --text-h4:      1.25rem                        — Subsection titles
  --text-body:    1rem (16px)                    — Default
  --text-sm:      0.875rem (14px)                — Captions, tags
  --text-xs:      0.75rem (12px)                 — Fine print

LINE HEIGHT:      Headings: 1.1 | Body: 1.6 | Code: 1.7
LETTER SPACING:   Headings: -0.025em | Body: 0 | Mono: -0.01em
FONT DISPLAY:     swap (for both fonts)
```

### 3.3 Spacing & Layout

```
CONTAINER:
  max-width: 80rem (1280px) — max-w-7xl
  padding:   0 1.5rem (mobile) | 0 2rem (tablet+)
  center:    mx-auto

SECTION RHYTHM:
  py-20 (5rem) mobile → py-28 (7rem) lg → py-32 (8rem) xl
  Each section ID has scroll-margin-top: 5rem (clears sticky navbar)

CONTENT WIDTHS:
  Full:    max-w-7xl (1280px)  — project grids, skills
  Blog:    max-w-3xl (768px)   — article content
  Narrow:  max-w-xl (576px)    — contact form

CARD GRIDS:
  gap: 1.5rem mobile → 2rem desktop
```

### 3.4 Shadows & Borders

```
--shadow-sm:    0 1px 2px rgba(0,0,0,0.05)
--shadow-md:    0 4px 6px rgba(0,0,0,0.1)
--shadow-lg:    0 10px 15px rgba(0,0,0,0.15)
--shadow-glow:  0 0 20px rgba(99, 102, 241, 0.3)   — primary glow for hover states

BORDER RADIUS:
  --radius-sm:  0.5rem
  --radius-md:  0.75rem
  --radius-lg:  1rem
  --radius-xl:  1.5rem
  --radius-full: 9999px
```

### 3.5 Z-Index Scale

```
--z-behind:     -1     — background 3D canvas
--z-base:       0      — normal content
--z-dropdown:   10     — dropdowns
--z-sticky:     20     — sticky navbar
--z-overlay:    30     — modal backdrop
--z-modal:      40     — modal content
--z-popover:    50     — tooltips, popovers
--z-toast:      60     — toast notifications
--z-cursor:     70     — custom cursor
--z-preloader:  80     — preloader (above everything)
```

---

## 4. Content Schemas

### 4.1 Site Config (`src/data/siteConfig.ts`)

```typescript
export interface NavLink {
  label: string;
  href: string;       // "#about" for sections, "/blog" for pages
  isExternal?: false;  // always internal
}

export interface SiteConfig {
  name: string;
  title: string;       // job title for hero
  description: string; // meta description
  url: string;         // canonical URL
  email: string;
  location: string;
  resumeUrl: string;   // "/resume.pdf"
  ogImage: string;     // "/images/og-default.png"
  socials: {
    github: string;
    linkedin: string;
    twitter: string;
  };
  navLinks: NavLink[];
}
```

### 4.2 Projects (`src/data/projects.ts`)

```typescript
export interface Project {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;     // card: 1-2 lines
  fullDescription: string;      // modal: full paragraph
  problem: string;
  solution: string;
  impact: string;               // measurable results
  thumbnail: string;            // "/images/projects/slug-thumb.webp"
  thumbnailAlt: string;         // accessibility
  screenshots: string[];
  video?: string;               // optional demo video URL (YouTube/Loom embed)
  techStack: string[];
  category: "frontend" | "fullstack" | "open-source" | "mobile";
  featured: boolean;
  liveUrl?: string;
  githubUrl?: string;
  date: string;                 // "2025-01" — for sorting
  learnings: string[];
  order: number;
}
```

### 4.3 Experience (`src/data/experience.ts`)

```typescript
export interface ExperienceEntry {
  id: string;
  type: "work" | "education";
  title: string;                // Role or Degree
  organization: string;
  organizationLogo?: string;    // "/images/logos/company.svg" — 40x40
  location: string;
  startDate: string;            // "2023-06"
  endDate: string | "present";
  current: boolean;
  description: string;
  highlights: string[];         // bullet points
  techStack: string[];
  order: number;
}
```

### 4.4 Skills (`src/data/skills.ts`)

```typescript
export type SkillCategory = "frontend" | "backend" | "database" | "devops";

export interface Skill {
  name: string;
  icon: string;                 // path to SVG in /images/icons/ OR simple-icons slug
  category: SkillCategory;
  proficiency: 1 | 2 | 3 | 4 | 5;
  yearsUsed?: number;
}

export interface SkillGroup {
  category: SkillCategory;
  label: string;                // "Frontend", "Backend", etc.
  skills: Skill[];
}
```

### 4.5 Testimonials (`src/data/testimonials.ts`)

```typescript
export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  role: string;
  company: string;
  avatar?: string;              // path — fallback: colored initials circle
  rating?: 1 | 2 | 3 | 4 | 5;
}
```

### 4.6 About (`src/data/about.ts`)

```typescript
export interface Stat {
  label: string;
  value: number;
  suffix?: string;              // "+"
  icon?: string;                // lucide icon name
}

export interface FunFact {
  emoji: string;
  label: string;
}

export interface AboutData {
  bio: string[];                // array of paragraphs
  stats: Stat[];
  funFacts: FunFact[];
  profileImage: string;         // "/images/about/profile.webp"
  profileImageAlt: string;
}
```

### 4.7 Blog Frontmatter

```yaml
---
title: "Blog Post Title"
date: "2025-06-15"              # ISO date for sorting
updatedDate: "2025-07-01"       # optional: shows "Updated on" badge
excerpt: "Short description for cards + SEO meta."
coverImage: "/images/blog/post-slug.webp"
coverImageAlt: "Description for accessibility"
tags: ["react", "typescript", "tutorial"]
published: true                  # false = draft, excluded from listing
---
```

### 4.8 Certifications (NEW) (`src/data/certifications.ts`)

```typescript
export interface Certification {
  id: string;
  name: string;                 // "AWS Solutions Architect"
  issuer: string;               // "Amazon Web Services"
  issuerLogo?: string;
  date: string;                 // "2024-03"
  credentialUrl?: string;       // verification link
  badgeImage?: string;          // badge image path
}
```

---

## 5. Environment Variables

`.env.example` (committed to git):

```env
# ──── EmailJS (client-side safe — NEXT_PUBLIC_ prefix) ────
NEXT_PUBLIC_EMAILJS_SERVICE_ID=service_xxxxx
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=template_xxxxx
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=xxxxxxxxxxx

# ──── Site URL (for OG images, sitemap, canonical) ────
NEXT_PUBLIC_SITE_URL=https://yourname.dev

# ──── GitHub (for contribution graph — public API, no auth needed) ────
NEXT_PUBLIC_GITHUB_USERNAME=username
```

**Security notes:**
- All env vars use `NEXT_PUBLIC_` — they are client-exposed by design
- EmailJS public keys are designed to be public (rate-limited by EmailJS dashboard)
- GitHub username is public information
- No server secrets exist in this project

---

## 6. Feature Breakdown

### Features 1–18: Carried from PORTFOLIO_VERIFIED.md (all verified, no changes needed except where noted below)

> F1: Navigation, F2: Hero, F3: About, F4: Skills, F5: Projects, F6: Experience,
> F7: Testimonials, F8: Blog, F9: Contact, F10: Footer, F11: Theme, F12: Animations,
> F13: Custom Cursor, F14: Preloader, F15: SEO, F16: Analytics, F17: Responsive, F18: Accessibility

### Corrections Applied to Existing Features

#### F1 Correction: Lenis conflict with Framer Motion
- **Issue found**: Lenis and Framer Motion can create conflicting animation loops causing erratic scroll behavior
- **Fix**: Lenis handles scroll only. Framer Motion handles element animations only. Never use Framer Motion's scroll-linked animations — delegate all scroll-linked work to GSAP ScrollTrigger (which is properly synced with Lenis)
- **Rule**: `framer-motion` = enter/exit/hover/layout animations. `GSAP` = scroll-driven animations. `Lenis` = smooth scroll provider. No overlap.

#### F2 Correction: Hero section fallback chain
- WebGL check → if unsupported → CSS animated gradient (no Canvas mounted at all)
- `useDetectGPU()` → tier 0 → static gradient, tier 1 → 80 particles (no mouse), tier 2+ → 200 particles (with mouse)
- Three.js canvas loaded via `next/dynamic` with `ssr: false` — never server-rendered

#### F5 Correction: Project slug in schema
- `slug` field exists in Project schema but the modal approach was chosen
- **Clarification**: `slug` is used as a unique key for `layoutId` animations and analytics tracking — NOT for routing

#### F8 Correction: Blog search implementation detail
- Search uses `Array.filter()` matching against `title.toLowerCase()`, `excerpt.toLowerCase()`, and `tags.join(' ').toLowerCase()`
- Input is debounced with a 300ms custom hook `useDebounce`
- No external search library needed — dataset will remain small (< 100 posts)

#### F11 Correction: Theme flash prevention
- `next-themes` injects a blocking `<script>` in `<head>` that reads localStorage before paint
- **Additional**: add `suppressHydrationWarning` on `<html>` element to prevent React hydration mismatch warning
- `color-scheme` CSS property set to match theme for native form controls

#### F12 Correction: Animation responsibility split
```
┌─────────────────────────────────────────┐
│              ANIMATION STACK            │
├──────────────┬──────────────────────────┤
│ Framer Motion│ Enter/exit animations    │
│              │ Layout animations        │
│              │ Hover/tap states         │
│              │ AnimatePresence (routes) │
│              │ Stagger children         │
├──────────────┼──────────────────────────┤
│ GSAP +       │ Timeline line draw       │
│ ScrollTrigger│ Parallax effects         │
│              │ Text pinning/reveal      │
│              │ Horizontal scroll section│
│              │ Marquee text speed sync  │
├──────────────┼──────────────────────────┤
│ Lenis        │ Smooth scroll behavior   │
│              │ Syncs with GSAP ticker   │
│              │ Stop/start for modals    │
├──────────────┼──────────────────────────┤
│ CSS          │ Color transitions (theme)│
│              │ Underline hover effects  │
│              │ Glassmorphism            │
│              │ Infinite marquee         │
└──────────────┴──────────────────────────┘
```

#### F14 Correction: Preloader tied to real loading
- **Previous**: faked progress over 2 seconds
- **Updated**: Preloader shows until `document.readyState === 'complete'` OR 3 seconds (whichever comes first). This ensures the site is actually ready when revealed.
- Three.js assets load lazily after preloader exits (they appear in hero background progressively)

---

### NEW FEATURES (F19–F25)

---

### F19: Marquee / Infinite Scroll Text Band

**Priority:** Medium | **Phase:** 3

#### Description
A full-width horizontal scrolling text band — a signature Awwwards-style element. Appears between sections (e.g., between Projects and Experience).

#### Requirements
- Full-width container, overflows viewport
- Text: repeated phrase like "OPEN TO WORK" or tech stack names ("REACT — NEXT.JS — TYPESCRIPT — TAILWIND — NODE.JS —") separated by a decorative dot or dash
- Scrolls infinitely from right to left using CSS `@keyframes` + `translateX`
- Two rows possible: one scrolling left, one scrolling right (parallax feel)
- Stroke-only text style (large, outlined, no fill) for a bold visual
- Pauses on hover
- `prefers-reduced-motion`: static, no scroll

#### Implementation
- Pure CSS animation — no JS needed
- `animation: marquee 30s linear infinite`
- Duplicate the text content to fill the gap (`text text text text`)
- GPU-accelerated via `transform: translateX()`

#### Component: `src/components/ui/Marquee.tsx`

---

### F20: Horizontal Scroll Projects Section (Optional Alternate)

**Priority:** Low | **Phase:** 3

#### Description
An optional alternate display mode for the Projects section where projects scroll horizontally as the user scrolls vertically. Awwwards-winning effect.

#### Requirements
- Container: pinned to viewport while horizontal scrolling occurs (GSAP ScrollTrigger `pin: true`)
- Project cards laid out horizontally, scroll left as user scrolls down
- Progress indicator (thin bar at bottom) shows how far through the section you are
- Standard vertical layout remains the default; this is a progressive enhancement
- Mobile: falls back to standard vertical grid (no horizontal scroll)

#### Implementation
- GSAP ScrollTrigger with `scrub: true` and `pin: true`
- Lenis integration via shared ticker
- Container width calculated dynamically: `numCards * cardWidth + gaps`
- `prefers-reduced-motion`: standard vertical grid

#### Component: Integrated into `src/components/sections/Projects.tsx` as a layout mode

---

### F21: GitHub Contribution Graph

**Priority:** Medium | **Phase:** 2

#### Description
A GitHub-style contribution heatmap calendar in the About section — shows real coding activity.

#### Requirements
- Uses `react-calendar-heatmap` package
- Data source: GitHub public API (`https://api.github.com/users/{username}/events`) OR static placeholder data
- Shows last 6 months of activity (not full year — saves space)
- Color scale matches theme: muted → primary (4 levels)
- Tooltip on hover: "N contributions on Month Day, Year"
- Responsive: horizontally scrollable on mobile
- Fallback: if API fails, show static placeholder data with a note

#### Data Fetching
- Fetched at build time via `fetch()` in a server component (SSG)
- Cached for the build — updates on next deployment
- No auth token needed for public event data
- Rate limited to 60 req/hr without auth — fine for SSG (1 request per build)

#### Component: `src/components/ui/GitHubHeatmap.tsx`

---

### F22: Spotlight / Gradient Cursor Follow

**Priority:** Low | **Phase:** 3

#### Description
A radial gradient "spotlight" that follows the cursor over card grids, creating a subtle lighting effect — very popular in modern portfolios (Stripe-inspired).

#### Requirements
- Applied to: project cards grid, skill cards grid
- Effect: radial gradient centered on cursor position within the container
- Color: `radial-gradient(600px at {x}px {y}px, rgba(99,102,241,0.1), transparent 80%)`
- Container-relative positioning (not viewport)
- Desktop only: disabled on touch devices
- Performance: uses CSS custom properties updated via `onMouseMove` (no React re-renders)

#### Implementation
```tsx
// On parent container:
onMouseMove={(e) => {
  const rect = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
  e.currentTarget.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
}}
```
```css
.spotlight-grid::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(600px at var(--mouse-x) var(--mouse-y), rgba(99,102,241,0.1), transparent 80%);
  pointer-events: none;
  z-index: 1;
}
```

#### Component: `src/components/ui/SpotlightGrid.tsx`

---

### F23: Certifications & Achievements Section

**Priority:** Medium | **Phase:** 2

#### Description
A compact section showcasing professional certifications, awards, and notable achievements — between Experience and Testimonials.

#### Requirements
- Section ID: `#certifications` (optional in navbar, or keep it between Experience and Testimonials without nav link)
- Horizontal scrollable card row (desktop: 3 visible, tablet: 2, mobile: 1)
- Each card:
  - Certification/award name
  - Issuer name + logo
  - Date earned
  - "Verify" link (opens credential URL in new tab)
  - Badge image if available
- Cards have subtle gradient border on hover

#### Component: `src/components/sections/Certifications.tsx`

---

### F24: RSS Feed for Blog

**Priority:** Low | **Phase:** 5

#### Description
An RSS/Atom feed for the blog — standard for any blog, allows readers to subscribe.

#### Requirements
- Route: `/feed.xml`
- Generated via `src/app/feed.xml/route.ts` (Next.js route handler)
- Includes all published blog posts: title, link, description, date, author
- Valid RSS 2.0 XML
- Link in blog page `<head>`: `<link rel="alternate" type="application/rss+xml" href="/feed.xml" />`
- RSS icon in blog page header linking to `/feed.xml`

#### Implementation
- Route handler reads all MDX posts (same as blog listing page)
- Generates XML string manually (no library needed — it's simple XML)
- Returns `new Response(xml, { headers: { 'Content-Type': 'application/xml' } })`

---

### F25: 404 Page (Interactive)

**Priority:** Medium | **Phase:** 6

#### Description
A custom, memorable 404 page that showcases personality and technical skill.

#### Requirements
- Large "404" text with animated glitch effect (CSS `clip-path` + keyframes)
- Message: "Lost in the void" or "This page doesn't exist"
- Animated particles or stars background (reuse simplified ParticleField or CSS-only stars)
- CTA: "Take Me Home" button → navigates to `/`
- Optional: Easter egg — Konami code (↑↑↓↓←→←→BA) triggers a fun animation or message
- Responsive: works on all viewports
- SEO: proper 404 status code (Next.js handles this automatically with `not-found.tsx`)

#### Component: `src/app/not-found.tsx`

---

## 7. Pages & Routes

| Route | Type | File | Description |
|-------|------|------|-------------|
| `/` | SSG | `app/page.tsx` | Homepage — Hero, About, Skills, Projects, Experience, Certifications, Testimonials, Blog Preview, Contact |
| `/blog` | SSG | `app/blog/page.tsx` | Blog listing with search + filter |
| `/blog/[slug]` | SSG | `app/blog/[slug]/page.tsx` | Blog post (MDX) |
| `/feed.xml` | Route Handler | `app/feed.xml/route.ts` | RSS feed |
| `/sitemap.xml` | Auto | `app/sitemap.ts` | Sitemap |
| `/robots.txt` | Auto | `app/robots.ts` | Robots |
| `/*` (404) | SSG | `app/not-found.tsx` | Custom 404 |

### Section Flow on Homepage
```
Hero (#home)
  ↓
About (#about) — includes GitHub heatmap
  ↓
Skills (#skills)
  ↓
Projects (#projects) — includes marquee band below
  ↓  ┌─── Marquee Text Band ───┐
Experience (#experience)
  ↓
Certifications (no nav link — flows naturally)
  ↓
Testimonials (no nav link — flows naturally)
  ↓
Blog Preview ("Latest Articles")
  ↓
Contact (#contact)
  ↓
Footer
```

---

## 8. Folder Structure

```
dev-portfolio/
├── .env.example
├── .env.local                       # git-ignored
├── .eslintrc.json
├── .gitignore
├── .husky/
│   └── pre-commit                   # lint-staged
├── .prettierrc
├── .prettierignore
├── next.config.ts
├── package.json
├── pnpm-lock.yaml
├── postcss.config.mjs
├── tsconfig.json
├── vitest.config.ts
├── playwright.config.ts
├── LICENSE
├── README.md
├── PORTFOLIO_FINAL.md               # this file
│
├── public/
│   ├── images/
│   │   ├── about/
│   │   │   └── profile.webp
│   │   ├── blog/
│   │   │   └── *.webp
│   │   ├── certifications/
│   │   │   └── *.png
│   │   ├── icons/
│   │   │   └── *.svg               # tech logos
│   │   ├── logos/
│   │   │   └── *.svg               # company logos
│   │   ├── projects/
│   │   │   └── *.webp
│   │   ├── testimonials/
│   │   │   └── *.webp
│   │   └── og-default.png           # 1200x630
│   ├── resume.pdf
│   └── favicon.ico
│
├── src/
│   ├── app/
│   │   ├── layout.tsx               # root layout: providers, nav, footer, cursor
│   │   ├── page.tsx                 # homepage: compose all sections
│   │   ├── not-found.tsx            # interactive 404
│   │   ├── error.tsx                # error boundary
│   │   ├── globals.css              # tokens + tailwind + base
│   │   ├── sitemap.ts
│   │   ├── robots.ts
│   │   ├── blog/
│   │   │   ├── page.tsx
│   │   │   ├── layout.tsx           # blog layout: AnimatePresence
│   │   │   └── [slug]/
│   │   │       └── page.tsx
│   │   └── feed.xml/
│   │       └── route.ts             # RSS feed
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx
│   │   │   ├── MobileMenu.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── Preloader.tsx
│   │   │
│   │   ├── sections/
│   │   │   ├── Hero.tsx
│   │   │   ├── About.tsx
│   │   │   ├── Skills.tsx
│   │   │   ├── Projects.tsx
│   │   │   ├── Experience.tsx
│   │   │   ├── Certifications.tsx   # NEW
│   │   │   ├── Testimonials.tsx
│   │   │   ├── BlogPreview.tsx
│   │   │   └── Contact.tsx
│   │   │
│   │   ├── ui/
│   │   │   ├── AnimateOnScroll.tsx
│   │   │   ├── AnimatedCounter.tsx
│   │   │   ├── BackToTop.tsx
│   │   │   ├── Badge.tsx
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── CustomCursor.tsx
│   │   │   ├── GitHubHeatmap.tsx    # NEW
│   │   │   ├── MagneticButton.tsx
│   │   │   ├── Marquee.tsx          # NEW
│   │   │   ├── ProjectCard.tsx
│   │   │   ├── ProjectModal.tsx
│   │   │   ├── SkipToContent.tsx
│   │   │   ├── SpotlightGrid.tsx    # NEW
│   │   │   └── ThemeToggle.tsx
│   │   │
│   │   ├── three/
│   │   │   └── ParticleField.tsx
│   │   │
│   │   ├── blog/
│   │   │   ├── BlogCard.tsx
│   │   │   ├── CopyCodeButton.tsx
│   │   │   ├── PostNavigation.tsx
│   │   │   ├── ReadingProgress.tsx
│   │   │   ├── ShareButtons.tsx
│   │   │   └── TableOfContents.tsx
│   │   │
│   │   └── providers/
│   │       ├── ThemeProvider.tsx
│   │       └── SmoothScroll.tsx
│   │
│   ├── content/
│   │   └── blog/
│   │       ├── hello-world.mdx
│   │       └── building-portfolio.mdx
│   │
│   ├── data/
│   │   ├── siteConfig.ts
│   │   ├── about.ts
│   │   ├── skills.ts
│   │   ├── projects.ts
│   │   ├── experience.ts
│   │   ├── certifications.ts        # NEW
│   │   └── testimonials.ts
│   │
│   ├── hooks/
│   │   ├── useCopyToClipboard.ts
│   │   ├── useDebounce.ts           # NEW — for blog search
│   │   ├── useInView.ts
│   │   ├── useLockBodyScroll.ts     # NEW — for modals/mobile menu
│   │   ├── useMediaQuery.ts
│   │   ├── useMousePosition.ts
│   │   ├── useReducedMotion.ts
│   │   └── useScrollProgress.ts
│   │
│   ├── lib/
│   │   ├── cn.ts
│   │   ├── email.ts
│   │   ├── formatDate.ts
│   │   ├── github.ts                # NEW — fetch GitHub contribution data
│   │   ├── mdx.ts
│   │   └── schemas.ts
│   │
│   ├── styles/
│   │   └── animations.ts
│   │
│   └── types/
│       └── index.ts                 # ALL interfaces exported here
│
├── e2e/                             # Playwright tests
│   ├── homepage.spec.ts
│   ├── blog.spec.ts
│   ├── contact.spec.ts
│   └── accessibility.spec.ts
│
└── .github/
    └── workflows/
        └── ci.yml                   # CI pipeline
```

---

## 9. State Management & Provider Architecture

### Provider Tree (`layout.tsx`)

```tsx
<html lang="en" suppressHydrationWarning>
  <body>
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange={false}>
      <SmoothScroll>
        <SkipToContent />
        <Navbar />
        <Preloader />
        <CustomCursor />
        <main id="main-content">{children}</main>
        <Footer />
        <BackToTop />
        <Toaster position="bottom-right" richColors closeButton />
        <Analytics />
        <SpeedInsights />
      </SmoothScroll>
    </ThemeProvider>
  </body>
</html>
```

### State Map

| State | Owner | Storage | Scope |
|-------|-------|---------|-------|
| Theme | `next-themes` | localStorage + context | Global |
| Lenis instance | `SmoothScroll` provider | React context | Global |
| Active nav section | `Navbar` | IntersectionObserver (local) | Navbar |
| Mobile menu open | `Navbar` | `useState` | Navbar |
| Project filter | `Projects` section | `useState` | Section |
| Modal open + project | `Projects` section | `useState` | Section |
| Blog search | `/blog` page | `useState` + `useDebounce` | Page |
| Blog tag filter | `/blog` page | `useState` | Page |
| Contact form | `react-hook-form` | `useForm` | Section |
| Contact cooldown | `Contact` section | `useState` + timer | Section |
| Preloader visible | `Preloader` | `useState` + `sessionStorage` | Component |
| Cursor state | `CustomCursor` | `useState` + RAF | Component |
| Back-to-top visible | `BackToTop` | `useState` + scroll listener | Component |

**No global state library needed.** All state is local or provided via lightweight React context.

---

## 10. Data Flow Architecture

```
┌──────────────────────────────────────────────────────┐
│                    BUILD TIME (SSG)                    │
├──────────────────────────────────────────────────────┤
│                                                        │
│  src/data/*.ts ──→ imported directly by sections       │
│                    (static data, tree-shaken)           │
│                                                        │
│  src/content/blog/*.mdx                                │
│    ├─→ lib/mdx.ts (getAllPosts) ──→ /blog page         │
│    ├─→ lib/mdx.ts (getPostBySlug) ──→ /blog/[slug]    │
│    └─→ generateStaticParams() ──→ pre-renders all slugs│
│                                                        │
│  GitHub API ──→ lib/github.ts ──→ About section        │
│    (fetched once at build, cached in page)              │
│                                                        │
├──────────────────────────────────────────────────────┤
│                    CLIENT TIME                          │
├──────────────────────────────────────────────────────┤
│                                                        │
│  Contact form ──→ lib/email.ts ──→ EmailJS API         │
│  Theme toggle ──→ next-themes ──→ localStorage          │
│  Analytics ──→ @vercel/analytics ──→ Vercel dashboard   │
│                                                        │
└──────────────────────────────────────────────────────┘
```

### Import Pattern for Data
```typescript
// In src/components/sections/Projects.tsx (client component)
import { projects } from "@/data/projects";
// Data is bundled at build time, no runtime fetch
```

### MDX Pipeline
```
.mdx file
  → fs.readFileSync (build time)
  → gray-matter (extract frontmatter + content)
  → next-mdx-remote compileMDX (RSC)
    → remark-gfm
    → rehype-slug
    → rehype-autolink-headings
    → rehype-pretty-code (shiki)
  → React component tree
```

---

## 11. Error Handling & Fallbacks

| Scenario | Handling | Fallback UI |
|----------|----------|-------------|
| **Runtime JS error (any route)** | `app/error.tsx` catches | "Something went wrong" + "Try Again" button |
| **404 / invalid route** | `app/not-found.tsx` | Interactive 404 page with animation |
| **WebGL not supported** | Check before mounting Canvas | CSS animated gradient background |
| **Low GPU (tier 0)** | `useDetectGPU()` from drei | Static gradient, no particles |
| **Three.js crash** | React ErrorBoundary around Canvas | CSS gradient fallback |
| **EmailJS send failure** | try/catch in `lib/email.ts` | Error toast + "email me directly" message |
| **Contact form validation** | Zod + React Hook Form | Inline red error messages per field |
| **Blog MDX compile error** | Next.js error boundary | Error page |
| **Blog invalid slug** | `notFound()` in page | 404 page |
| **Image load failure** | `next/image` onError | Generic placeholder image |
| **GitHub API failure (build)** | try/catch in `lib/github.ts` | Static placeholder heatmap data |
| **Font load failure** | `next/font` display: swap | System font fallback |

---

## 12. Responsive Design Matrix

### Breakpoints
```
base:  0px      (mobile-first default)
sm:    640px    (landscape phones, small tablets)
md:    768px    (tablets — NAVBAR SWITCH POINT)
lg:    1024px   (laptops, small desktops)
xl:    1280px   (desktops — CONTAINER MAX-WIDTH)
2xl:   1536px   (large monitors)
```

### Per-Feature Responsive Behavior

| Feature | Mobile (< 768) | Tablet (768-1023) | Desktop (1024+) |
|---------|----------------|-------------------|-----------------|
| Navbar | Hamburger → full-screen overlay | Hamburger → full-screen overlay | Horizontal links |
| Hero | Stacked, `min-h-dvh` | Stacked | Centered, particles active |
| 3D Particles | 80 particles, no mouse | 100 particles, no mouse | 200 particles + mouse |
| About layout | Photo above, full-width | 2-column | 2-column |
| About stats | 2x2 grid | 4-column row | 4-column row |
| GitHub heatmap | Horizontal scroll, 6 months | Full width | Full width |
| Skills grid | 2 columns | 3 columns | 4 columns |
| Skill tabs | Horizontal scroll | Full width | Full width |
| Project grid | 1 column | 2 columns | 3 columns (featured: span-2) |
| Project modal | Bottom sheet (full screen) | Centered modal (80% width) | Centered modal (max-w-4xl) |
| Project filter | Horizontal scroll | Full width | Full width |
| Experience | Line left, single column | Line left, single column | Line center, alternating |
| Certifications | 1 card visible, scroll | 2 visible | 3 visible |
| Testimonials | 1 card, swipe | 2 cards | 3 cards |
| Blog grid | 1 column | 2 columns | 3 columns |
| Blog TOC | Accordion above article | Accordion above article | Sticky sidebar right |
| Contact | Form above info, stacked | 2-column | 2-column |
| Footer | Stacked single column | 2-column | 3-column |
| Custom cursor | Hidden | Hidden | Active |
| Magnetic buttons | Disabled | Disabled | Active |
| Card tilt | Disabled | Disabled | Active |
| Marquee | Smaller text, slower | Full size | Full size |
| Spotlight grid | Disabled | Disabled | Active |

### Mobile Safari Fixes
- `min-h-dvh` instead of `100vh` (URL bar issue)
- `-webkit-backdrop-filter` alongside `backdrop-filter`
- `scroll-margin-top: 5rem` on all section IDs (clears fixed navbar)

---

## 13. Animation Architecture

### Responsibility Split (Critical — No Overlap)

```
LENIS ─── owns ───→ Scroll behavior (smooth scroll)
  │                  Syncs with GSAP ticker
  │                  Stops/starts for modals
  │
GSAP ──── owns ───→ Scroll-DRIVEN animations
  │                  ScrollTrigger: pin, scrub, progress
  │                  Timeline line drawing
  │                  Parallax layers
  │                  Horizontal scroll section
  │
FRAMER ── owns ───→ Component-level animations
  │                  Enter/exit (AnimatePresence)
  │                  Layout animations (filter, modal)
  │                  Hover/tap gestures
  │                  Stagger children
  │
CSS ───── owns ───→ Color transitions (theme switch)
                     Underline hovers (::after scaleX)
                     Marquee infinite scroll
                     Glassmorphism backdrop-filter
                     Glitch text effect (404)
```

### GSAP + Lenis Sync (in SmoothScroll provider)
```typescript
useEffect(() => {
  const lenis = new Lenis({ duration: 1.2 });

  lenis.on('scroll', ScrollTrigger.update);

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);

  // Expose lenis via context for stop/start
  setLenisInstance(lenis);

  return () => {
    lenis.destroy();
    gsap.ticker.remove(lenis.raf);
  };
}, []);
```

### Framer Motion Variants (`src/styles/animations.ts`)
```typescript
export const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
  },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5 }
  },
};

export const slideLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: {
    opacity: 1, x: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
  },
};

export const slideRight = {
  hidden: { opacity: 0, x: 60 },
  visible: {
    opacity: 1, x: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
  },
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1, scale: 1,
    transition: { duration: 0.5 }
  },
};

export const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.1 }
  },
};
```

### `prefers-reduced-motion` Strategy
```typescript
// useReducedMotion.ts
export function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);
  return reduced;
}

// When reduced = true:
// - Framer variants: { hidden: {}, visible: {} } (instant, no motion)
// - Lenis duration: 0 (instant scroll)
// - GSAP ScrollTrigger: disable all
// - Three.js: static gradient fallback
// - CSS marquee: paused
// - Preloader: skipped
```

---

## 14. Security Hardening

### Contact Form
- **Honeypot**: hidden `<input name="website" tabIndex={-1} autoComplete="off" />` — rejected if filled
- **Client cooldown**: 60s after successful send (button disabled + countdown)
- **Validation**: Zod schema with `.trim()`, `.min()`, `.max()` — no injection possible
- **EmailJS**: all keys are NEXT_PUBLIC — intentionally client-exposed, rate-limited by EmailJS

### Email Obfuscation
- Email rendered via JS (not in initial HTML) — basic scraper deterrent
- `data-email` attribute decoded at runtime
- `mailto:` link generated on click, not in static markup

### Security Headers (`next.config.ts`)
```typescript
async headers() {
  return [{
    source: "/(.*)",
    headers: [
      { key: "X-DNS-Prefetch-Control", value: "on" },
      { key: "X-Frame-Options", value: "DENY" },
      { key: "X-Content-Type-Options", value: "nosniff" },
      { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
      { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), interest-cohort=()" },
      { key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains" },
    ],
  }];
}
```

### Content Security Considerations
- No user-generated content (blog is author-only MDX)
- No `dangerouslySetInnerHTML` except JSON-LD (safe static data)
- No external scripts loaded except Vercel Analytics (first-party)
- All external links: `rel="noopener noreferrer"` + `target="_blank"`

---

## 15. Performance Budget

### Bundle Size Targets (gzipped)
| Chunk | Target | Contents |
|-------|--------|----------|
| Initial JS | < 100KB | Next.js runtime, React, layout |
| Page JS (home) | < 80KB | Framer Motion, section components |
| Three.js (lazy) | < 120KB | Three + R3F + Drei (loaded after paint) |
| GSAP (lazy) | < 30KB | GSAP core + ScrollTrigger |
| Blog page | < 50KB | MDX renderer, syntax highlighter |
| Total initial | < 200KB | First meaningful paint |

### Loading Strategy
```
1. HTML + critical CSS (immediate)
2. next/font (preloaded, display: swap)
3. Hero text animations (Framer Motion — in initial bundle)
4. Below-fold sections (code-split, loaded on demand)
5. Three.js Canvas (next/dynamic ssr:false — loaded after hero text is visible)
6. GSAP ScrollTrigger (imported in SmoothScroll provider — client-only)
7. Blog/MDX (only loaded when navigating to /blog)
```

### Image Strategy
- Format: WebP for all raster images, SVG for icons/logos
- Sizes: thumbnails 800px wide, full screenshots 1600px wide, OG 1200x630
- `next/image` with `sizes` prop for responsive srcsets
- `placeholder="blur"` for above-fold images (profile photo, hero)
- `loading="lazy"` for all below-fold images
- Static imports for blur data URLs where possible

### Core Web Vitals Targets
| Metric | Target | How |
|--------|--------|-----|
| LCP | < 2.5s | Preload hero content, optimize fonts |
| INP | < 200ms | No heavy JS on interaction paths |
| CLS | < 0.1 | next/font (no FOUT), next/image (aspect-ratio), no layout shifts |
| FCP | < 1.5s | SSG, minimal blocking JS |
| TTFB | < 200ms | Vercel edge network |

---

## 16. Testing Strategy

### Test Pyramid
```
       ╱╲
      ╱  ╲         E2E (Playwright)         — 5-10 tests
     ╱    ╲        Critical user journeys
    ╱──────╲
   ╱        ╲      Integration (Vitest+RTL)  — 10-15 tests
  ╱          ╲     Section rendering, form submission
 ╱────────────╲
╱              ╲    Unit (Vitest)            — 15-20 tests
╱                ╲  Utils, hooks, data transforms
╱──────────────────╲
```

### Unit Tests (Vitest)
| File | Tests |
|------|-------|
| `lib/cn.test.ts` | Class merging edge cases |
| `lib/formatDate.test.ts` | Date formatting, "present" handling |
| `lib/mdx.test.ts` | Frontmatter parsing, post sorting, slug generation |
| `lib/schemas.test.ts` | Zod schema validation (valid/invalid inputs) |
| `hooks/useDebounce.test.ts` | Debounce timing behavior |
| `hooks/useCopyToClipboard.test.ts` | Clipboard API mock |

### Component Tests (Vitest + RTL)
| Component | Tests |
|-----------|-------|
| `Button` | Renders all variants, handles click, shows loading state |
| `AnimatedCounter` | Renders target value (skip animation in test) |
| `Badge` | Renders text, applies variant styles |
| `Contact form` | Validates required fields, shows errors, submits successfully, shows cooldown |
| `ProjectCard` | Renders title/description/tags, opens modal on click |
| `ThemeToggle` | Toggles between dark/light |
| `BlogCard` | Renders title, date, reading time, tags |

### E2E Tests (Playwright)
| Test File | Scenarios |
|-----------|-----------|
| `homepage.spec.ts` | Page loads, all sections visible, nav scroll works, theme toggle, project filter |
| `blog.spec.ts` | Blog listing loads, search works, post page renders, TOC navigation, share buttons |
| `contact.spec.ts` | Form validation, successful submission mock, cooldown behavior |
| `accessibility.spec.ts` | axe-core scan on `/`, `/blog`, `/blog/[slug]` — 0 violations |

### Test Configuration
```typescript
// vitest.config.ts
export default defineConfig({
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    include: ['src/**/*.test.{ts,tsx}'],
  },
});
```

---

## 17. Browser Support & Polyfills

### Supported Browsers
| Browser | Minimum Version | Notes |
|---------|----------------|-------|
| Chrome | 90+ | Desktop + Mobile |
| Firefox | 90+ | Desktop |
| Safari | 15.4+ | Desktop + iOS — requires -webkit- prefixes |
| Edge | 90+ | Chromium-based |
| Samsung Internet | 15+ | Android |

### Not Supported
- Internet Explorer (any version)
- Safari < 15.4
- Opera Mini
- UC Browser

### Safari-Specific Workarounds
| Issue | Fix |
|-------|-----|
| `backdrop-filter` | Always include `-webkit-backdrop-filter` |
| `100vh` on mobile | Use `dvh` units |
| Smooth scroll | Lenis handles it (not CSS `scroll-behavior`) |
| WebGL performance | `useDetectGPU` → reduce particles or fallback |
| `IntersectionObserver` threshold | Minor differences — test and adjust |

### Polyfills
- None needed — all target browsers support ES2020+
- `next/font` handles font loading cross-browser
- `next/image` handles image format negotiation

---

## 18. CI/CD Pipeline

### `.github/workflows/ci.yml`

```yaml
name: CI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  quality:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: pnpm
      - run: pnpm install --frozen-lockfile
      - run: pnpm lint
      - run: pnpm format:check
      - run: pnpm typecheck
      - run: pnpm test:run
      - run: pnpm build

  e2e:
    runs-on: ubuntu-latest
    needs: quality
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: pnpm
      - run: pnpm install --frozen-lockfile
      - run: pnpm exec playwright install --with-deps chromium
      - run: pnpm build
      - run: pnpm test:e2e
```

### Pre-commit Hooks (Husky + lint-staged)

```json
// .lintstagedrc.json
{
  "*.{ts,tsx}": ["eslint --fix", "prettier --write"],
  "*.{json,md,css}": ["prettier --write"]
}
```

### Deployment Flow
```
Developer pushes → GitHub Actions (lint + test + build) → Vercel auto-deploys
  ├── PR → Preview deployment (unique URL)
  └── main → Production deployment
```

---

## 19. Deployment & Infrastructure

### Vercel Configuration

| Setting | Value |
|---------|-------|
| Framework | Next.js (auto-detected) |
| Build Command | `pnpm build` |
| Output | `.next` (default) |
| Node.js | 20.x |
| Package Manager | pnpm (auto-detected from lockfile) |

### Environment Variables (in Vercel Dashboard)
- Same as `.env.example` — set for Production environment
- Preview deployments inherit from Production

### Domain
- Custom domain configured in Vercel → DNS settings
- `www` → non-www redirect (automatic)
- HTTPS enforced (automatic via Let's Encrypt)

### Caching
- Static assets: immutable (hashed filenames by Next.js)
- Blog posts: SSG at build time, updates on redeploy
- Images: Vercel Image Optimization CDN (auto WebP/AVIF)
- `Cache-Control: public, max-age=31536000, immutable` for static

### Monitoring
- Vercel Analytics: page views, visitors, top pages
- Vercel Speed Insights: live Core Web Vitals from real users
- Vercel deployment logs: build errors, function logs

---

## 20. Build Order

### Phase 1: Foundation (Steps 1-10)
1. `pnpm create next-app` with TypeScript, Tailwind v4, ESLint, App Router
2. Install ALL dependencies (full list from Section 2)
3. Configure `.eslintrc.json`, `.prettierrc`, `.prettierignore`
4. Set up `husky` + `lint-staged` pre-commit hook
5. Create `.env.example` + `.env.local`
6. Create `.gitignore` (ensure .env.local, node_modules, .next are ignored)
7. Set up `globals.css` — all CSS custom properties (Section 3.1), Tailwind directives, base resets
8. Set up `next/font` — Inter + JetBrains Mono
9. Create TypeScript interfaces (`src/types/index.ts`)
10. Create all data files with placeholder content (`src/data/*.ts`)

### Phase 2: Layout Shell (Steps 11-18)
11. Create `ThemeProvider` wrapper (`src/components/providers/ThemeProvider.tsx`)
12. Create `SmoothScroll` provider with Lenis + GSAP ticker sync
13. Create root `layout.tsx` with full provider tree + `suppressHydrationWarning`
14. Create `SkipToContent` component
15. Create `Button`, `Card`, `Badge` base UI components
16. Build `Navbar` — desktop links, active section tracking, scroll hide/show
17. Build `MobileMenu` — full-screen overlay, stagger animation, focus trap, scroll lock
18. Build `Footer` + `BackToTop` button

### Phase 3: Core Sections (Steps 19-28)
19. Create `AnimateOnScroll` wrapper + all Framer Motion variants
20. Create `AnimatedCounter` component
21. Build `Hero` section — text animations, typewriter effect, CTAs, social links, scroll indicator
22. Build `About` section — photo, bio, stats grid, fun facts
23. Build `GitHubHeatmap` component (fetch data in page, pass as prop)
24. Build `Skills` section — tabbed categories, skill cards, proficiency dots
25. Build `Projects` section — filter bar, project grid
26. Build `ProjectCard` + `ProjectModal` (with shared layout animation)
27. Build `Experience` timeline — cards, date formatting, current badge
28. Build `Contact` section — form, Zod validation, EmailJS integration, honeypot, toast feedback

### Phase 4: Animations & Polish (Steps 29-35)
29. Add scroll-triggered animations to ALL sections (wrap in AnimateOnScroll)
30. Build `MagneticButton` and apply to CTAs
31. Add card tilt effect to ProjectCard
32. Implement GSAP ScrollTrigger for timeline line drawing
33. Build `Marquee` component, place between Projects and Experience
34. Build `SpotlightGrid` and apply to Projects + Skills grids
35. Build `CustomCursor` (desktop only) + `useMousePosition` hook

### Phase 5: 3D & Loading (Steps 36-39)
36. Build `ParticleField` component (Three.js + R3F + Drei)
37. Add `useDetectGPU` tier-based rendering + WebGL fallback
38. Load ParticleField via `next/dynamic` with `ssr: false` in Hero
39. Build `Preloader` — SVG path draw, progress counter, curtain exit

### Phase 6: Blog System (Steps 40-46)
40. Create `lib/mdx.ts` — `getAllPosts()`, `getPostBySlug()`, MDX compile pipeline
41. Write 2 sample blog posts (hello-world.mdx, building-portfolio.mdx)
42. Build `BlogPreview` section for homepage (latest 3 posts)
43. Build `/blog` page — listing, search (`useDebounce`), category filter
44. Build `/blog/[slug]` page — MDX rendering, `generateStaticParams`
45. Build blog sub-components: `ReadingProgress`, `TableOfContents`, `ShareButtons`, `CopyCodeButton`, `PostNavigation`
46. Build `Certifications` section + `Testimonials` carousel (Embla)

### Phase 7: SEO, Security & Quality (Steps 47-52)
47. Add `generateMetadata` to all routes + JSON-LD structured data
48. Create `sitemap.ts`, `robots.ts`, RSS `feed.xml/route.ts`
49. Build `not-found.tsx` (interactive 404) + `error.tsx` (error boundary)
50. Add security headers to `next.config.ts`
51. Performance audit — dynamic imports, image optimization, bundle analysis
52. Accessibility audit — axe-core scan, keyboard testing, screen reader testing

### Phase 8: Testing & Deploy (Steps 53-58)
53. Set up `vitest.config.ts` + test setup file
54. Write unit tests (utils, hooks, schemas)
55. Write component tests (Button, Contact form, ProjectCard, BlogCard)
56. Set up `playwright.config.ts`, install browsers
57. Write E2E tests (homepage, blog, contact, accessibility)
58. Set up GitHub Actions CI + deploy to Vercel + configure custom domain

---

## 21. Changelog from PORTFOLIO_VERIFIED.md

### New Features Added (7)
| Feature | Why |
|---------|-----|
| **F19: Marquee Text Band** | Awwwards-standard visual separator between sections |
| **F20: Horizontal Scroll Projects** | Optional progressive enhancement, very impressive when enabled |
| **F21: GitHub Contribution Graph** | Proves real coding activity — better than just claiming stats |
| **F22: Spotlight Cursor Grid** | Stripe-inspired effect, adds premium feel to card grids |
| **F23: Certifications Section** | Recruiters specifically look for these |
| **F24: RSS Feed** | Standard for any blog, enables subscriptions |
| **F25: Interactive 404 Page** | Detailed spec, not just "add a 404" |

### Architecture Issues Fixed
| Issue | Fix |
|-------|-----|
| **Lenis + Framer Motion conflict** | Documented strict responsibility split (Section 13) |
| **No data flow documentation** | Added complete data flow architecture (Section 10) |
| **Missing z-index system** | Added z-index scale (Section 3.5) |
| **Missing shadow system** | Added shadow + border-radius tokens (Section 3.4) |
| **Colors in hex, not HSL** | Converted to HSL for Tailwind v4 compatibility |
| **No `color-scheme` CSS** | Added for native form controls |
| **No `suppressHydrationWarning`** | Added to `<html>` for next-themes |
| **Missing `useDebounce` hook** | Added for blog search |
| **Missing `useLockBodyScroll` hook** | Added for modals/mobile menu |
| **No `lib/github.ts`** | Added for GitHub heatmap data fetching |
| **Preloader faked progress** | Tied to real `document.readyState` |
| **No `prettier-plugin-tailwindcss`** | Added for automatic class sorting |
| **No `vitest.config.ts`** | Added to folder structure |
| **No `playwright.config.ts`** | Added to folder structure |
| **No `.github/` directory** | Added with CI workflow |
| **No `.prettierignore`** | Added to folder structure |
| **Build order: 45 steps** | Expanded to **58 steps** across **8 phases** |
| **Missing `@types/three`** | Added to dev dependencies |
| **Missing `embla-carousel-autoplay`** | Added (Embla autoplay is a separate plugin) |
| **No `package.json` scripts** | Full scripts section defined |
| **Image `alt` text not in schemas** | Added `thumbnailAlt` and `coverImageAlt` fields |
| **No `certifications.ts` data file** | Added with schema |
| **Section scroll-margin-top missing** | Added 5rem scroll margin for navbar clearance |
| **No animation easing curves defined** | Added cubic-bezier values in animation variants |

### Content Schema Enhancements
| Schema | Changes |
|--------|---------|
| Project | Added `thumbnailAlt` for accessibility |
| Blog | Added `updatedDate` field, `coverImageAlt` |
| About | Restructured as `AboutData` interface with typed arrays |
| Skills | Added `SkillGroup` wrapper interface |
| NEW: Certifications | Complete schema added |

---

*This is the final, definitive specification. 25 features, 58 build steps, 8 phases.
Every architecture decision is locked. Every edge case is handled. Ready to build.*
