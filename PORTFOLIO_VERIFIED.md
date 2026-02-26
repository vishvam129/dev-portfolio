# Developer Portfolio - Verified & Complete Specification

> Verified against PORTFOLIO_SPEC.md. Every gap, contradiction, and missing detail has been resolved.
> This is the **final, build-ready specification** — from scratch to deployment.

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Tech Stack (Finalized)](#2-tech-stack-finalized)
3. [Design System](#3-design-system)
4. [Content Schemas](#4-content-schemas)
5. [Environment Variables](#5-environment-variables)
6. [Feature Breakdown (18 Features)](#6-feature-breakdown)
7. [Pages & Routes](#7-pages--routes)
8. [Folder Structure (Complete)](#8-folder-structure-complete)
9. [State Management & Providers](#9-state-management--providers)
10. [Error Handling Strategy](#10-error-handling-strategy)
11. [Responsive Design Rules](#11-responsive-design-rules)
12. [Security](#12-security)
13. [Testing Strategy](#13-testing-strategy)
14. [Browser Support](#14-browser-support)
15. [CI/CD Pipeline](#15-cicd-pipeline)
16. [Deployment Configuration](#16-deployment-configuration)
17. [Build Order (Revised — 7 Phases, 40 Steps)](#17-build-order)
18. [Audit Trail — Issues Fixed from PORTFOLIO_SPEC.md](#18-audit-trail)

---

## 1. Project Overview

### What This Is
A single-page developer portfolio with a blog subsection. It is a **personal brand website** that showcases projects, skills, experience, and writing — designed to impress recruiters, clients, and fellow developers within the first 3 seconds.

### Goals
- **Visual Impact**: Cinematic hero, smooth animations, 3D elements, custom cursor
- **Storytelling**: Guide visitors through a narrative (Hero → About → Skills → Projects → Experience → Contact)
- **Performance**: Lighthouse 95+ in all categories, Core Web Vitals all green
- **Accessibility**: WCAG 2.1 AA compliant
- **SEO**: First-page ranking for "[Your Name] developer"
- **Zero Backend**: Fully static/SSG with client-side email sending

### Non-Goals (Explicitly Out of Scope)
- CMS or admin dashboard
- User authentication or login
- Internationalization / multi-language
- PWA / offline support
- Comments system on blog posts
- E-commerce or payment processing
- Services / pricing page

---

## 2. Tech Stack (Finalized)

All either/or decisions from PORTFOLIO_SPEC.md are resolved here.

| Layer | Technology | Version | Why |
|-------|-----------|---------|-----|
| **Framework** | Next.js (App Router) | 15.x | SSG, server components, image optimization, file-based routing, best SEO |
| **Language** | TypeScript | 5.x | Type safety, better DX |
| **Styling** | Tailwind CSS | 4.x | Utility-first, CSS custom properties, design tokens |
| **Animation** | Framer Motion | 11.x | React-native declarative animations, AnimatePresence, layout animations |
| **Animation (Advanced)** | GSAP + ScrollTrigger | 3.x | Scroll-driven timelines, pinning, complex sequencing |
| **3D Graphics** | React Three Fiber + Drei | latest | Interactive 3D hero, floating particles |
| **Smooth Scroll** | Lenis | latest | Buttery smooth scroll, integrates with GSAP |
| **Icons** | Lucide React | latest | UI icons (nav, social, buttons) |
| **Tech Icons** | Simple Icons (SVGs) | latest | Technology/brand logos for skill cards |
| **Theme** | next-themes | latest | SSR-safe theme toggle, system preference, localStorage |
| **Forms** | React Hook Form + Zod | latest | Performant validation with schema |
| **Email** | EmailJS | latest | **Decision: EmailJS** — client-side, no API route needed, free tier sufficient |
| **Toast** | Sonner | latest | Lightweight, accessible toast notifications |
| **Blog Content** | next-mdx-remote | latest | MDX rendering with server components |
| **Syntax Highlighting** | Rehype Pretty Code (Shiki) | latest | Beautiful code blocks with themes |
| **MDX Plugins** | remark-gfm, rehype-slug, rehype-autolink-headings | latest | GFM support, heading IDs, heading links |
| **Reading Time** | reading-time | latest | Blog post reading time calculation |
| **Frontmatter** | gray-matter | latest | MDX frontmatter parsing |
| **Date Formatting** | date-fns | latest | Lightweight date utilities |
| **Class Utilities** | clsx + tailwind-merge | latest | The `cn()` helper function |
| **Carousel** | Embla Carousel React | latest | Lightweight, accessible testimonial carousel |
| **Deployment** | Vercel | — | Zero-config Next.js hosting |
| **Analytics** | Vercel Analytics + Vercel Speed Insights | — | **Decision: Vercel** — built-in, no extra setup, privacy-friendly |
| **Linting** | ESLint + Prettier | latest | Code quality |
| **Package Manager** | pnpm | latest | Fast, disk-efficient |

### Total Dependencies (~30 packages)

```
# Core
next react react-dom typescript

# Styling
tailwindcss @tailwindcss/postcss

# Animation
framer-motion gsap @gsap/react lenis

# 3D
three @react-three/fiber @react-three/drei

# Theme
next-themes

# UI
lucide-react sonner embla-carousel-react

# Forms & Email
react-hook-form @hookform/resolvers zod @emailjs/browser

# Blog
next-mdx-remote gray-matter reading-time remark-gfm rehype-slug rehype-autolink-headings rehype-pretty-code shiki

# Utils
clsx tailwind-merge date-fns

# Analytics
@vercel/analytics @vercel/speed-insights

# Dev
eslint prettier eslint-config-next @types/react @types/node
```

---

## 3. Design System

### 3.1 Color Palette

All colors defined as CSS custom properties in `globals.css`. Tailwind v4 references them natively.

```
DARK MODE (default):
  --background:      #0a0a0f        (near-black with blue tint)
  --foreground:      #e4e4e7        (zinc-200)
  --card:            #18181b        (zinc-900)
  --card-foreground: #fafafa        (zinc-50)
  --primary:         #6366f1        (indigo-500 — brand color)
  --primary-hover:   #818cf8        (indigo-400)
  --secondary:       #a855f7        (purple-500 — accent)
  --muted:           #27272a        (zinc-800)
  --muted-foreground:#a1a1aa        (zinc-400)
  --border:          #3f3f46        (zinc-700)
  --ring:            #6366f1        (matches primary)
  --success:         #22c55e        (green-500)
  --error:           #ef4444        (red-500)
  --warning:         #f59e0b        (amber-500)

LIGHT MODE:
  --background:      #ffffff
  --foreground:      #18181b        (zinc-900)
  --card:            #f4f4f5        (zinc-100)
  --card-foreground: #18181b        (zinc-900)
  --primary:         #4f46e5        (indigo-600)
  --primary-hover:   #6366f1        (indigo-500)
  --secondary:       #9333ea        (purple-600)
  --muted:           #f4f4f5        (zinc-100)
  --muted-foreground:#71717a        (zinc-500)
  --border:          #e4e4e7        (zinc-200)
  --ring:            #4f46e5        (matches primary)
  --success:         #16a34a        (green-600)
  --error:           #dc2626        (red-600)
  --warning:         #d97706        (amber-600)

GRADIENTS:
  --gradient-primary: linear-gradient(135deg, #6366f1, #a855f7)
  --gradient-hero:    linear-gradient(135deg, #0a0a0f 0%, #1e1b4b 50%, #0a0a0f 100%)
  --glassmorphism-bg: rgba(10, 10, 15, 0.7) with backdrop-blur-xl
```

### 3.2 Typography

```
FONTS (loaded via next/font/google):
  Heading:   "Inter" variable, weights 600-800
  Body:      "Inter" variable, weights 400-500
  Monospace: "JetBrains Mono" variable, weights 400-500 (code blocks)

SCALE (fluid with clamp):
  h1:   clamp(2.5rem, 5vw, 4.5rem)    — Hero headline
  h2:   clamp(2rem, 4vw, 3rem)         — Section titles
  h3:   clamp(1.25rem, 2vw, 1.75rem)   — Card titles
  h4:   1.25rem                         — Subsection titles
  body: 1rem (16px)                     — Default text
  small:0.875rem (14px)                 — Captions, tags
  xs:   0.75rem (12px)                  — Fine print

LINE HEIGHT:
  Headings: 1.2
  Body:     1.6
  Code:     1.7

LETTER SPACING:
  Headings: -0.02em (tight)
  Body:     0 (normal)
  Mono:     -0.01em
```

### 3.3 Spacing

```
SECTION PADDING:
  Vertical:   py-24 (6rem) desktop, py-16 (4rem) mobile
  Horizontal: px-6 (1.5rem) mobile, px-8 (2rem) tablet, px-0 desktop (within max-width container)

CONTENT MAX-WIDTH:
  Container: max-w-7xl (80rem / 1280px) centered with mx-auto
  Blog:      max-w-3xl (48rem / 768px) for article content
  Narrow:    max-w-2xl (42rem / 672px) for contact form

COMPONENT GAPS:
  Card grid:  gap-6 (1.5rem) mobile, gap-8 (2rem) desktop
  Section heading to content: mb-16 (4rem)
  Between stacked elements: space-y-4 (1rem) to space-y-8 (2rem)
```

### 3.4 Glassmorphism Tokens

```
NAVBAR:
  background: rgba(10, 10, 15, 0.7)     dark
              rgba(255, 255, 255, 0.7)   light
  backdrop-filter: blur(16px)            (-webkit-backdrop-filter for Safari)
  border-bottom: 1px solid rgba(255, 255, 255, 0.1)

CARDS:
  background: rgba(24, 24, 27, 0.5)     dark
              rgba(244, 244, 245, 0.5)   light
  backdrop-filter: blur(8px)
  border: 1px solid rgba(255, 255, 255, 0.05)
  border-radius: 1rem (rounded-2xl)
```

---

## 4. Content Schemas

All TypeScript interfaces for data files.

### 4.1 Site Config (`src/data/siteConfig.ts`)

```typescript
export const siteConfig = {
  name: "Your Name",
  title: "Full Stack Developer",
  description: "A brief meta description for SEO.",
  url: "https://yourname.dev",
  email: "hello@yourname.dev",
  location: "City, Country",
  socials: {
    github: "https://github.com/username",
    linkedin: "https://linkedin.com/in/username",
    twitter: "https://x.com/username",
  },
  navLinks: [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Projects", href: "#projects" },
    { label: "Experience", href: "#experience" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "#contact" },
  ],
} as const;
```

### 4.2 Projects (`src/data/projects.ts`)

```typescript
interface Project {
  id: string;                    // unique identifier
  slug: string;                  // URL-safe slug for /projects/[slug]
  title: string;
  shortDescription: string;      // 1-2 lines for card
  fullDescription: string;       // For case study modal
  problem: string;               // Problem statement
  solution: string;              // Solution narrative
  impact: string;                // Measurable impact/results
  thumbnail: string;             // path: "/images/projects/slug-thumb.webp"
  screenshots: string[];         // additional images for case study
  video?: string;                // optional demo video URL
  techStack: string[];           // ["Next.js", "TypeScript", "Tailwind CSS"]
  category: "frontend" | "fullstack" | "open-source" | "mobile";
  featured: boolean;             // gets larger card
  liveUrl?: string;              // live demo link
  githubUrl?: string;            // source code link
  date: string;                  // "2025-01" for sorting
  learnings: string[];           // key takeaways
  order: number;                 // display order
}
```

### 4.3 Experience (`src/data/experience.ts`)

```typescript
interface ExperienceEntry {
  id: string;
  type: "work" | "education";
  title: string;                 // Role or Degree
  organization: string;          // Company or Institution
  organizationLogo?: string;     // path: "/images/logos/company.svg"
  location: string;              // "City, Country" or "Remote"
  startDate: string;             // "2023-06"
  endDate: string | "present";   // "2025-01" or "present"
  current: boolean;              // true if active/current
  description: string;           // responsibilities/achievements paragraph
  highlights: string[];          // bullet points
  techStack: string[];           // tech used
  order: number;                 // display order (newest first)
}
```

### 4.4 Skills (`src/data/skills.ts`)

```typescript
interface Skill {
  name: string;                  // "React"
  icon: string;                  // SVG path or import from simple-icons
  category: "frontend" | "backend" | "database" | "devops";
  proficiency: 1 | 2 | 3 | 4 | 5; // 1=familiar, 5=expert
  yearsUsed?: number;
}
```

### 4.5 Testimonials (`src/data/testimonials.ts`)

```typescript
interface Testimonial {
  id: string;
  quote: string;
  name: string;
  role: string;                  // "Senior Developer"
  company: string;               // "TechCorp"
  avatar?: string;               // path or null for initials fallback
  rating?: 1 | 2 | 3 | 4 | 5;
}
```

### 4.6 About Stats (`src/data/about.ts`)

```typescript
interface Stat {
  label: string;                 // "Years Experience"
  value: number;                 // 5
  suffix?: string;               // "+"
}
```

### 4.7 Blog Frontmatter (in each `.mdx` file)

```yaml
---
title: "Blog Post Title"
date: "2025-06-15"
excerpt: "A short description for cards and SEO."
coverImage: "/images/blog/post-slug.webp"
tags: ["react", "typescript", "tutorial"]
published: true
---
```

---

## 5. Environment Variables

File: `.env.local` (never committed). Template: `.env.example` (committed).

```env
# EmailJS — all safe for client exposure (NEXT_PUBLIC_)
NEXT_PUBLIC_EMAILJS_SERVICE_ID=service_xxxxx
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=template_xxxxx
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=xxxxxxxxxxx

# Site URL — used for OG images, sitemap, canonical
NEXT_PUBLIC_SITE_URL=https://yourname.dev
```

**Note**: Vercel Analytics and Speed Insights require no env vars — they auto-detect the Vercel environment.

---

## 6. Feature Breakdown

---

### F1: Navigation & Layout Shell

**Priority:** Critical | **Phase:** 1

#### Requirements
- Fixed/sticky navbar at top, z-50
- Glassmorphism: `bg-background/70 backdrop-blur-xl border-b border-white/10`
- Logo/name on left — text logo with subtle gradient on hover
- Nav links on right: Home, About, Skills, Projects, Experience, Blog, Contact
- Active section tracking via `IntersectionObserver` — highlights current section link
- Navbar hides on scroll-down, reappears on scroll-up (track `scrollY` delta)
- CTA button: "Resume" with download icon, triggers `/resume.pdf` download
- Mobile (below `md` / 768px): hamburger icon → `MobileMenu` overlay

#### Mobile Menu
- Full-screen overlay, `fixed inset-0 z-50 bg-background/95 backdrop-blur-xl`
- Links stagger in from left with Framer Motion (`staggerChildren: 0.1, spring`)
- Close button (X icon) top-right
- Focus-trapped while open
- Body scroll locked while open (Lenis `.stop()` / `.start()`)

#### Interactions
- Nav links: underline slides in from left on hover (CSS `::after` with `scaleX` transform)
- Navbar opacity: transparent at top → `bg-background/70` after 100px scroll
- Resume button: subtle scale + shadow on hover

#### Component: `src/components/layout/Navbar.tsx`
#### Component: `src/components/layout/MobileMenu.tsx`

---

### F2: Hero Section

**Priority:** Critical | **Phase:** 2 (text) + 4 (3D)

#### Requirements
- Full viewport: `min-h-dvh` (uses `dvh` for mobile Safari compatibility, NOT `100vh`)
- Layout: centered content, vertically and horizontally

#### Text Content
- Greeting: "Hi, I'm" (small, fades in first)
- Name: large heading, character-by-character reveal animation (Framer Motion)
- Title/tagline: typewriter effect cycling through roles ["Full Stack Developer", "UI/UX Enthusiast", "Open Source Contributor"]
- Two CTA buttons:
  - "View My Work" → smooth scroll to `#projects` (primary style)
  - "Get In Touch" → smooth scroll to `#contact` (outline style)
- Social icons (GitHub, LinkedIn, Twitter/X) — `lucide-react` icons, hover: scale + color change

#### 3D Background (Phase 4)
- **Decision: Option C — Particle field** that responds to cursor position
- Implementation: `@react-three/fiber` Canvas with custom particle system
- ~200 particles (small spheres or points), slowly drifting
- Mouse movement → particles gently repel/attract within a radius
- Colors: primary + secondary gradient (`#6366f1` to `#a855f7`)
- Mobile: reduce to ~80 particles, disable mouse tracking (no cursor on touch)
- Fallback if WebGL unavailable: CSS animated gradient background (no 3D)

#### Scroll Indicator
- Animated mouse icon with bouncing arrow at bottom center
- Fades out after user starts scrolling

#### Interactions
- Text staggers in: greeting → name → title → CTAs → socials (total ~1.5s)
- CTA buttons: magnetic hover effect (button translates toward cursor within 50px radius)
- Particles drift slowly when idle, react to mouse with spring physics
- `prefers-reduced-motion`: no text animation (instant), no particles (static gradient)

#### Components
- `src/components/sections/Hero.tsx`
- `src/components/three/ParticleField.tsx`
- `src/components/ui/MagneticButton.tsx`

---

### F3: About Section

**Priority:** Critical | **Phase:** 2

#### Requirements
- Section ID: `#about`
- Layout: two columns on desktop (photo left, content right), stacked on mobile
- Section heading: "About Me" with reveal animation (fade-up on scroll)

#### Photo
- Professional photo in `public/images/about/profile.webp`
- Creative frame: rounded-2xl with gradient border (primary → secondary)
- Dimensions: 400x500px on desktop, full-width on mobile
- Reveal: clip-path animation (circle expanding from center) on scroll entry
- `next/image` with `placeholder="blur"` and static import for blur data

#### Bio
- 2-3 sentences, impactful and personal
- Rendered as styled paragraphs with subtle fade-up stagger

#### Stats
- 4 animated counters in a 2x2 grid (mobile) or 4-column row (desktop):
  - Years Experience: `5+`
  - Projects Completed: `30+`
  - Technologies: `20+`
  - Open Source Contributions: `50+`
- Each counter: large number (h2 size), small label below
- Animation: counts from 0 to target when section enters viewport (Framer Motion `useInView` + custom `AnimatedCounter` component)
- Duration: ~2 seconds, eased
- Suffix ("+" symbol) appears after count completes

#### Fun Facts (Optional)
- 3-4 small cards showing hobbies/interests with emoji icons
- Example: "Coffee Lover", "Night Owl", "Open Source Advocate"

#### Component: `src/components/sections/About.tsx`
#### Component: `src/components/ui/AnimatedCounter.tsx`

---

### F4: Skills & Tech Stack

**Priority:** High | **Phase:** 2

#### Requirements
- Section ID: `#skills`
- Section heading: "Skills & Technologies"

#### Category Tabs
- 4 tabs: Frontend, Backend, Database, DevOps / Tools
- Tab bar with animated active indicator (underline slides to active tab, Framer Motion `layoutId`)
- On mobile: horizontally scrollable tab bar

#### Skill Cards
- Grid: 4 columns desktop, 3 columns tablet, 2 columns mobile
- Each card:
  - Technology SVG icon (from `simple-icons` package or custom SVGs in `public/images/icons/`)
  - Technology name
  - Proficiency: 5-dot indicator (filled dots = proficiency level)
- Cards stagger in on scroll (`staggerChildren: 0.05`)
- Hover: card lifts (`translateY(-4px)`), shadow increases, border glows with primary color

#### Interactions
- Tab switch: content fades out → new content fades in (Framer Motion `AnimatePresence` with `mode="wait"`)
- Proficiency dots fill in sequentially when card enters viewport
- `prefers-reduced-motion`: instant tab switch, no stagger, no hover lift

#### Component: `src/components/sections/Skills.tsx`

---

### F5: Projects Showcase

**Priority:** Critical | **Phase:** 2 (cards) + 3 (animations)

#### Requirements
- Section ID: `#projects`
- Section heading: "Featured Projects"

#### Filter Bar
- Buttons: All | Frontend | Fullstack | Open Source
- Active filter has pill background with primary color (animated with `layoutId`)
- Mobile: horizontal scroll on the filter bar
- Filter state stored in component state (not URL — homepage section, not a page)

#### Project Grid
- 3 columns desktop, 2 tablet, 1 mobile
- Gap: `gap-8`
- Featured projects: `col-span-2` on desktop (wider card)

#### Project Card
- Thumbnail: `next/image` with `fill` mode, aspect-ratio 16:9, rounded-t-2xl
- On hover: image scales 1.05x with transition, dark overlay fades in
- Content below image:
  - Title (h3)
  - Description (1-2 lines, truncated with `line-clamp-2`)
  - Tech stack: pills/badges (max 4 visible + "+N more")
  - Links: "Live Demo" and "GitHub" as icon buttons
- Card: glassmorphism background, rounded-2xl, border
- Tilt effect on hover: 3D perspective transform (max 5deg rotation, tracked to mouse position within card)

#### Case Study Modal
- **Decision: Modal approach** (not a separate page — keeps users on homepage)
- Triggered by clicking card (not the Live Demo/GitHub links — those navigate directly)
- Modal component: `src/components/ui/ProjectModal.tsx`
- Framer Motion `layoutId` shared animation from card to modal
- Modal contents:
  - Full-width screenshot
  - Title + tech stack
  - Three sections: Problem / Solution / Impact
  - Screenshot gallery (horizontal scroll)
  - Key Learnings (bullet list)
  - CTA buttons: Live Demo | GitHub
- Close: click overlay, press Escape, or click X button
- Focus trapped, body scroll locked
- Mobile: modal becomes full-screen sheet (slides up from bottom)

#### Interactions
- Cards stagger in on scroll
- Filter change: layout animation (cards rearrange with `layout` prop)
- Card hover: tilt + image zoom + overlay
- Modal enter/exit: shared layout animation + backdrop fade
- `prefers-reduced-motion`: no tilt, no stagger, instant filter switch, simple fade for modal

#### Components
- `src/components/sections/Projects.tsx`
- `src/components/ui/ProjectCard.tsx`
- `src/components/ui/ProjectModal.tsx`

---

### F6: Experience Timeline

**Priority:** High | **Phase:** 2

#### Requirements
- Section ID: `#experience`
- Section heading: "Experience"

#### Timeline Layout
- Desktop: vertical center line with cards alternating left/right
- Tablet: single column, line on left
- Mobile: single column, line on left, compact cards

#### Timeline Line
- SVG or CSS pseudo-element line down the center
- Line draws progressively as user scrolls (GSAP ScrollTrigger `scroller` with Lenis integration)
- Node dots at each entry position (filled circle, primary color)

#### Entry Card
- Organization logo (small, top of card) — `next/image`, 40x40px
- Role title (h3, bold)
- Organization name + location
- Date range: "Jun 2023 — Present" (formatted with `date-fns`)
- "Present" badge with green dot indicator if `current: true`
- Description paragraph
- Tech stack pills (same style as project cards)

#### Interactions
- Cards slide in from left/right alternately on scroll (Framer Motion, `x: -50` or `x: 50`)
- Mobile: all cards slide from left
- Line draws with GSAP ScrollTrigger linked to scroll progress
- Hover on card: subtle elevation increase
- `prefers-reduced-motion`: no slide, cards just fade in

#### GSAP + Lenis Integration
```typescript
// In the Lenis provider setup:
lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((time) => { lenis.raf(time * 1000); });
gsap.ticker.lagSmoothing(0);
```

#### Component: `src/components/sections/Experience.tsx`

---

### F7: Testimonials

**Priority:** Medium | **Phase:** 5

#### Requirements
- Section ID: part of homepage, below Experience
- Section heading: "What People Say"

#### Carousel
- Embla Carousel with auto-play (5s interval)
- 3 cards visible on desktop, 2 on tablet, 1 on mobile
- Infinite loop (wraps around)
- Pause on hover
- Navigation: prev/next arrow buttons + dot indicators

#### Testimonial Card
- Quote text in italics with large quotation mark icon
- Person's name (bold)
- Role + Company (muted text)
- Avatar: circular image (48x48px), fallback to initials in a colored circle
- Optional star rating: 5 stars, filled to rating value (Lucide `Star` icon)

#### Interactions
- Cards slide smoothly
- Active/center card slightly larger (`scale-105`)
- Touch/swipe support on mobile (Embla handles this natively)
- `prefers-reduced-motion`: disable auto-play, still allow manual navigation

#### Component: `src/components/sections/Testimonials.tsx`

---

### F8: Blog / Articles

**Priority:** Medium | **Phase:** 5

#### Requirements

##### Homepage Section
- Section heading: "Latest Articles"
- 3 latest published blog posts as cards
- "View All Posts" button → navigates to `/blog`

##### Blog Card
- Cover image (aspect-ratio 16:9, rounded-t-xl)
- Category tag (top-left overlay badge)
- Title (h3)
- Date + reading time (muted, small text)
- Excerpt (2 lines, `line-clamp-2`)
- Hover: image zoom, card elevation

##### `/blog` Page
- Header: "Blog" title
- Search input: client-side fuzzy search using `Array.filter` on title + tags + excerpt (no external library needed — dataset is small)
- Category filter pills: All + unique tags from all posts
- Post list: same card style as homepage, responsive grid
- Debounced search input (300ms)

##### `/blog/[slug]` Page
- Reading progress bar: thin bar at very top of viewport, fills based on scroll position (primary color)
- Cover image: full-width, 400px max height
- Title (h1), date, reading time, tags
- Table of Contents: auto-generated from h2/h3 headings
  - Desktop: sticky sidebar on the right
  - Mobile: collapsible accordion above the article
  - Active heading highlighted based on scroll position
- MDX content: rendered with custom component overrides
  - Code blocks: Rehype Pretty Code (Shiki) with "one-dark-pro" theme (dark) and "github-light" (light)
  - Copy button on code blocks with "Copied!" toast (Sonner)
  - Images: wrapped in `next/image`
  - Links: external links open in new tab
- Share buttons: Twitter, LinkedIn, Copy Link (with toast feedback)
- Previous / Next post navigation at bottom
- Back to blog link

##### MDX Pipeline
```
.mdx file → gray-matter (frontmatter) → next-mdx-remote (compile)
  → remark-gfm (tables, strikethrough)
  → rehype-slug (heading IDs)
  → rehype-autolink-headings (clickable heading links)
  → rehype-pretty-code (syntax highlighting)
  → React components
```

##### Static Generation
- `generateStaticParams()` in `/blog/[slug]/page.tsx` — pre-renders all published posts at build time
- Blog listing page uses `fs.readdir` + `gray-matter` to read all posts

#### Components
- `src/components/sections/BlogPreview.tsx` (homepage section)
- `src/components/blog/BlogCard.tsx`
- `src/components/blog/TableOfContents.tsx`
- `src/components/blog/ReadingProgress.tsx`
- `src/components/blog/ShareButtons.tsx`
- `src/components/blog/CopyCodeButton.tsx`
- `src/components/blog/PostNavigation.tsx`

---

### F9: Contact Section

**Priority:** Critical | **Phase:** 2

#### Requirements
- Section ID: `#contact`
- Section heading: "Get In Touch"
- Layout: two columns desktop (form left, info right), stacked mobile

#### Contact Form
- Fields:
  - Name: text input, required, min 2 chars
  - Email: email input, required, valid email format (Zod `.email()`)
  - Subject: text input, optional
  - Message: textarea, required, min 10 chars, max 1000 chars (with character counter)
- Validation: Zod schema + React Hook Form, inline error messages below each field
- Submit button: "Send Message" with send icon
- Button states: idle → loading (spinner) → success (checkmark, 2s) → reset to idle
- Honeypot field: hidden input named `website`, if filled → silently reject (bot detected)

#### EmailJS Integration
- `@emailjs/browser` `send()` function called on valid form submission
- Uses env vars: `NEXT_PUBLIC_EMAILJS_SERVICE_ID`, `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID`, `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY`
- On success: show success toast (Sonner) + reset form
- On failure: show error toast with "Something went wrong. Please try emailing me directly."
- Rate limit: disable submit button for 60 seconds after successful send (client-side cooldown)

#### Contact Info
- Email: displayed with mail icon, click copies to clipboard → "Copied!" toast
- Location: city/country with map-pin icon (text only, no map)
- Social links: GitHub, LinkedIn, Twitter/X — icon buttons with hover effects
- Optional: "Or schedule a call" text with external Calendly link

#### Form Field Styling
- Labels: small, muted, above input
- Inputs: bg-card, border, rounded-lg, focus:ring-2 ring-primary
- Error state: red border + red error text below
- Smooth transitions on focus/error states

#### Component: `src/components/sections/Contact.tsx`

---

### F10: Footer

**Priority:** High | **Phase:** 1

#### Requirements
- `<footer>` semantic element
- Background: slightly different from main bg (`bg-card` or darker)
- Layout: 3 columns desktop, stacked mobile
  - Col 1: Logo/name + short tagline
  - Col 2: Quick navigation links (same as navbar)
  - Col 3: Social links + email
- Bottom bar: copyright `© {currentYear} Your Name. All rights reserved.` + "Built with Next.js & Tailwind CSS"
- Back-to-top button: fixed, bottom-right, appears after scrolling 500px, smooth scrolls to top
  - Icon: `ChevronUp` from Lucide
  - Style: circular, primary bg, hover: scale + shadow

#### Component: `src/components/layout/Footer.tsx`
#### Component: `src/components/ui/BackToTop.tsx`

---

### F11: Theme System

**Priority:** High | **Phase:** 1

#### Requirements
- Library: `next-themes` with `attribute="class"` strategy (Tailwind dark mode)
- Provider: `<ThemeProvider>` wraps the app in `layout.tsx`
- Default theme: `"dark"`
- System preference: respected on first visit via `enableSystem` prop
- Persistence: `localStorage` (handled by `next-themes` automatically)

#### Theme Toggle
- In navbar, icon button
- Dark mode: Moon icon → Light mode: Sun icon
- Morph animation: rotate 180deg + fade crossover (Framer Motion)
- Tooltip on hover: "Switch to light/dark mode"

#### CSS Transitions
- On `<html>`: `transition-colors duration-300` to prevent jarring flash
- `next-themes` handles flash-of-wrong-theme with script injection

#### 3D Scene Adaptation
- Dark: darker environment lighting, brighter particles
- Light: brighter environment, softer particle colors
- Theme value passed as prop to `ParticleField` component

#### Component: `src/components/ui/ThemeToggle.tsx`

---

### F12: Animations & Micro-Interactions

**Priority:** High | **Phase:** 3

#### Scroll-Triggered Animations (Framer Motion)
- Reusable `<AnimateOnScroll>` wrapper component
- Variants: fadeUp, fadeIn, slideLeft, slideRight, scaleIn
- Trigger: `useInView` with `once: true`, `margin: "-100px"`
- Stagger: parent uses `staggerChildren: 0.1`

```typescript
// src/styles/animations.ts
export const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};
export const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};
```

#### Page Transitions (Framer Motion)
- `AnimatePresence` wrapper in blog layout for route transitions
- Enter: fade in + slide up (opacity 0→1, y 20→0)
- Exit: fade out (opacity 1→0)
- Duration: 300ms

#### Hover Effects
- Magnetic buttons: `MagneticButton` component, max offset 10px, spring physics
- Card tilt: `perspective(1000px) rotateX(Xdeg) rotateY(Ydeg)`, max 5deg, reset on mouse leave
- Link underlines: `::after` pseudo-element, `scaleX(0)` → `scaleX(1)` from left

#### GSAP Integration
- Register ScrollTrigger plugin in Lenis provider
- Used for: timeline line drawing, parallax effects
- Not used for anything Framer Motion handles well (enter animations, hover states)

#### Smooth Scrolling (Lenis)
- Lenis wraps the entire app via `<SmoothScroll>` provider component
- Config: `duration: 1.2, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))`
- Disabled when modals are open (body scroll lock)

#### Performance Rules
- Only animate `transform` and `opacity` (GPU-accelerated)
- Use `will-change` sparingly (only on elements actively animating)
- Debounce scroll listeners
- No animation on mobile if `prefers-reduced-motion: reduce`

#### `prefers-reduced-motion` Support
- Custom hook: `useReducedMotion()` wrapping `window.matchMedia`
- When true: all Framer Motion variants return `{ opacity: 1, y: 0 }` (instant, no motion)
- Lenis: set `duration: 0` (instant scroll)
- GSAP: disable ScrollTrigger animations
- Particles: static positions, no drift

#### Components
- `src/components/ui/AnimateOnScroll.tsx`
- `src/components/ui/MagneticButton.tsx`
- `src/components/providers/SmoothScroll.tsx`

---

### F13: Custom Cursor

**Priority:** Low | **Phase:** 3

#### Requirements
- Desktop only: hidden when `pointer: coarse` (CSS media query) or screen < 768px
- Two elements:
  - Inner dot: 8px circle, primary color, follows cursor instantly
  - Outer ring: 32px circle, border only, follows with spring delay (~0.15s)
- State changes:
  - Default: dot + ring
  - Hovering `<a>`, `<button>`: ring expands to 48px, fill with primary/10%
  - Hovering images: ring becomes "View" text label
  - Clicking: ring squeezes to 24px briefly (100ms)
- Implementation: two `<div>`s with `fixed` positioning, `pointer-events-none`, z-[9999]
- Position tracked with `requestAnimationFrame` for 60fps smoothness
- Native cursor hidden: `* { cursor: none }` (only when custom cursor is active)

#### Component: `src/components/ui/CustomCursor.tsx`
#### Hook: `src/hooks/useMousePosition.ts`

---

### F14: Preloader / Loading Screen

**Priority:** Medium | **Phase:** 3

#### Requirements
- Full-screen fixed overlay, z-[9999], bg-background
- Shows on first visit only (checked via `sessionStorage.getItem("visited")`)
- Content: animated initials or name text
- SVG path draw animation for initials (stroke-dasharray technique)
- Progress: percentage counter 0% → 100% (faked over 2 seconds with eased interpolation, not tied to actual asset loading)
- Exit: after 2s minimum or when 3D assets are loaded (whichever is later):
  - Curtain slides up (translateY -100%)
  - Duration: 800ms, ease: cubic-bezier(0.76, 0, 0.24, 1)
- Sets `sessionStorage.setItem("visited", "true")` on exit
- `prefers-reduced-motion`: skip entirely, no preloader shown

#### Component: `src/components/layout/Preloader.tsx`

---

### F15: SEO & Performance

**Priority:** Critical | **Phase:** 6

#### Metadata (Next.js `generateMetadata`)
- Root layout: site name, default title template `"%s | Your Name"`, description, OG image
- Blog posts: dynamic title, excerpt as description, cover image as OG image
- Canonical URL on every page

#### Open Graph Images
- Default OG image: static `/images/og-default.png` (1200x630px)
- Blog posts: use cover image as OG image
- Twitter card: `summary_large_image`

#### Sitemap
- Generated via `src/app/sitemap.ts` (Next.js built-in, NOT static file in public/)
- Includes: `/`, `/blog`, all `/blog/[slug]` pages
- `lastModified` dates from blog post dates

#### Robots
- Generated via `src/app/robots.ts` (Next.js built-in)
- Allow all crawlers, reference sitemap URL

#### Structured Data (JSON-LD)
- Homepage: `Person` schema (name, job title, URL, social profiles)
- Homepage: `WebSite` schema
- Blog posts: `BlogPosting` schema (title, date, author, description)
- Injected via `<script type="application/ld+json">` in layouts

#### Performance Targets
- Lighthouse: 95+ all categories
- LCP < 2.5s | INP < 200ms | CLS < 0.1
- First Contentful Paint < 1.5s
- Total JS bundle < 200KB (gzipped, initial load)

#### Optimization Techniques
- `next/image` for all images (auto WebP/AVIF, responsive sizes)
- `next/font` for fonts (zero layout shift)
- `next/dynamic` with `ssr: false` for Three.js components (heavy, client-only)
- Code splitting: automatic via App Router
- Preload hero image and critical fonts
- `loading="lazy"` for below-fold images

---

### F16: Analytics

**Priority:** Low | **Phase:** 6

#### Requirements
- `@vercel/analytics`: page views, unique visitors, referrers — auto-configured on Vercel
- `@vercel/speed-insights`: Core Web Vitals monitoring
- Both added as components in root `layout.tsx`:
  ```tsx
  <Analytics />
  <SpeedInsights />
  ```
- Custom events for CTA tracking:
  - `track("resume_download")`
  - `track("contact_form_submit")`
  - `track("project_link_click", { project: slug })`
- No cookie banner needed — Vercel Analytics is privacy-friendly

---

### F17: Responsive Design

**Priority:** Critical | **Phase:** Throughout (every phase)

#### Breakpoints (Tailwind defaults)
```
sm:  640px   (small tablets)
md:  768px   (tablets — MOBILE MENU BREAKPOINT)
lg:  1024px  (small desktops)
xl:  1280px  (desktops — MAX CONTENT WIDTH)
2xl: 1536px  (large screens)
```

#### Per-Feature Mobile Behavior

| Feature | Mobile Behavior |
|---------|----------------|
| Navbar | Hamburger menu below `md` (768px) |
| Hero | Stacked layout, `min-h-dvh`, particles reduced to 80 |
| Hero 3D | Particles simplified, no mouse tracking |
| About | Photo stacks above bio, stats in 2x2 grid |
| Skills | Tabs scroll horizontally, cards in 2-col grid |
| Projects | 1-col grid, filter bar scrolls horizontally |
| Project Modal | Full-screen bottom sheet (slides up) |
| Experience | Single-column, line on left side |
| Testimonials | 1 card visible, swipe enabled |
| Blog TOC | Collapsible accordion above article |
| Contact | Form stacks above info |
| Custom Cursor | Disabled (hidden via `pointer: coarse` query) |
| Magnetic Buttons | Disabled (no cursor to attract) |
| Card Tilt | Disabled (no cursor for tracking) |
| Parallax | Disabled (no mouse position) |

#### Mobile Safari Fix
- Use `min-h-dvh` instead of `min-h-screen` or `100vh`
- Apply `-webkit-backdrop-filter` alongside `backdrop-filter`

---

### F18: Accessibility

**Priority:** High | **Phase:** Throughout (every phase)

#### Requirements
- All pages pass axe-core with 0 violations
- Semantic HTML: `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`
- Every `<section>` has `aria-labelledby` pointing to its heading
- All images: meaningful `alt` text or `alt=""` for decorative
- All interactive elements: visible focus ring (`ring-2 ring-primary ring-offset-2`)
- Skip-to-content link: first focusable element, visually hidden until focused
- Modals: focus trapped, Escape closes, `role="dialog"`, `aria-modal="true"`
- Form errors: `aria-invalid`, `aria-describedby` linking to error message
- Toast notifications: `role="status"`, `aria-live="polite"` (Sonner handles this)
- Color contrast: all text meets 4.5:1 ratio (AA)
- `prefers-reduced-motion`: all animations disabled (see F12)
- `prefers-color-scheme`: initial theme matches system (see F11)
- Tab order: logical, follows visual flow
- No keyboard traps (except intentional modal focus traps)

---

## 7. Pages & Routes

| Route | Type | Description |
|-------|------|-------------|
| `/` | SSG | Homepage — all sections (Hero through Contact) |
| `/blog` | SSG | Blog listing with search + filter |
| `/blog/[slug]` | SSG | Individual blog post (MDX) |
| `/not-found` | SSG | Custom 404 page |

### 404 Page (`src/app/not-found.tsx`)
- Fun, on-brand 404 page
- Large "404" text with glitch animation
- Message: "Oops! This page doesn't exist."
- CTA: "Back to Home" button
- Optional: interactive mini-game or animation

---

## 8. Folder Structure (Complete)

```
dev-portfolio/
├── .env.example                    # Environment variable template
├── .env.local                      # Actual env vars (git-ignored)
├── .eslintrc.json                  # ESLint config
├── .gitignore                      # Git ignore rules
├── .prettierrc                     # Prettier config
├── next.config.ts                  # Next.js configuration
├── package.json                    # Dependencies & scripts
├── pnpm-lock.yaml                  # Lock file
├── postcss.config.mjs              # PostCSS (required by Tailwind v4)
├── tsconfig.json                   # TypeScript config
├── PORTFOLIO_SPEC.md               # Original spec
├── PORTFOLIO_VERIFIED.md           # This file
├── LICENSE                         # License
├── README.md                       # Project readme
│
├── public/
│   ├── fonts/                      # (empty — using next/font/google)
│   ├── images/
│   │   ├── about/
│   │   │   └── profile.webp        # About section photo
│   │   ├── blog/
│   │   │   └── *.webp              # Blog cover images
│   │   ├── icons/
│   │   │   └── *.svg               # Tech stack SVG icons
│   │   ├── logos/
│   │   │   └── *.svg               # Company/institution logos
│   │   ├── projects/
│   │   │   └── *.webp              # Project screenshots
│   │   ├── testimonials/
│   │   │   └── *.webp              # Avatar photos
│   │   └── og-default.png          # Default Open Graph image (1200x630)
│   ├── resume.pdf                  # Downloadable resume
│   └── favicon.ico                 # Favicon
│
├── src/
│   ├── app/
│   │   ├── layout.tsx              # Root layout (providers, nav, footer, cursor, preloader)
│   │   ├── page.tsx                # Homepage (all sections composed)
│   │   ├── not-found.tsx           # Custom 404 page
│   │   ├── error.tsx               # Error boundary page
│   │   ├── globals.css             # CSS custom properties, Tailwind directives, base styles
│   │   ├── sitemap.ts              # Auto-generated sitemap
│   │   ├── robots.ts               # Robots.txt config
│   │   └── blog/
│   │       ├── page.tsx            # Blog listing
│   │       ├── layout.tsx          # Blog layout (AnimatePresence wrapper)
│   │       └── [slug]/
│   │           └── page.tsx        # Blog post (generateStaticParams)
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
│   │   │   ├── Testimonials.tsx
│   │   │   ├── BlogPreview.tsx     # Homepage blog section (latest 3 posts)
│   │   │   └── Contact.tsx
│   │   │
│   │   ├── ui/
│   │   │   ├── AnimateOnScroll.tsx  # Reusable scroll-triggered animation wrapper
│   │   │   ├── AnimatedCounter.tsx  # Number counter animation
│   │   │   ├── BackToTop.tsx        # Scroll-to-top floating button
│   │   │   ├── Badge.tsx            # Tag/pill component
│   │   │   ├── Button.tsx           # Button with variants (primary, outline, ghost)
│   │   │   ├── Card.tsx             # Base card component
│   │   │   ├── CustomCursor.tsx     # Custom cursor (desktop only)
│   │   │   ├── MagneticButton.tsx   # Magnetic hover effect button
│   │   │   ├── ProjectCard.tsx      # Project grid card
│   │   │   ├── ProjectModal.tsx     # Project case study modal
│   │   │   ├── SkipToContent.tsx    # Accessibility skip link
│   │   │   └── ThemeToggle.tsx      # Dark/light toggle
│   │   │
│   │   ├── three/
│   │   │   └── ParticleField.tsx    # 3D particle background for hero
│   │   │
│   │   ├── blog/
│   │   │   ├── BlogCard.tsx         # Blog post card
│   │   │   ├── CopyCodeButton.tsx   # Copy button for code blocks
│   │   │   ├── PostNavigation.tsx   # Previous/Next post links
│   │   │   ├── ReadingProgress.tsx  # Progress bar at top
│   │   │   ├── ShareButtons.tsx     # Social share buttons
│   │   │   └── TableOfContents.tsx  # Auto-generated TOC
│   │   │
│   │   └── providers/
│   │       ├── ThemeProvider.tsx     # next-themes wrapper
│   │       └── SmoothScroll.tsx     # Lenis provider + GSAP integration
│   │
│   ├── content/
│   │   └── blog/                    # MDX blog posts
│   │       ├── hello-world.mdx
│   │       └── building-portfolio.mdx
│   │
│   ├── data/
│   │   ├── siteConfig.ts           # Central site configuration
│   │   ├── about.ts                # About section stats
│   │   ├── skills.ts               # Skills by category
│   │   ├── projects.ts             # Project data
│   │   ├── experience.ts           # Experience entries
│   │   └── testimonials.ts         # Testimonials
│   │
│   ├── hooks/
│   │   ├── useCopyToClipboard.ts   # Copy text with toast feedback
│   │   ├── useInView.ts            # Intersection Observer wrapper
│   │   ├── useMediaQuery.ts        # Responsive breakpoint detection
│   │   ├── useMousePosition.ts     # Mouse position tracking (RAF)
│   │   ├── useReducedMotion.ts     # prefers-reduced-motion detection
│   │   └── useScrollProgress.ts    # Scroll percentage (0-1)
│   │
│   ├── lib/
│   │   ├── cn.ts                   # clsx + tailwind-merge utility
│   │   ├── email.ts                # EmailJS send function
│   │   ├── formatDate.ts           # Date formatting with date-fns
│   │   ├── mdx.ts                  # MDX compilation + blog post fetching
│   │   └── schemas.ts              # Zod schemas (contact form, etc.)
│   │
│   ├── styles/
│   │   └── animations.ts           # Framer Motion variants & transitions
│   │
│   └── types/
│       └── index.ts                # All TypeScript interfaces
```

---

## 9. State Management & Providers

No external state library. React Context + hooks only.

### Provider Hierarchy (in `layout.tsx`)

```tsx
<ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
  <SmoothScroll>
    <Toaster position="bottom-right" />
    <CustomCursor />
    <Preloader />
    <SkipToContent />
    <Navbar />
    <main id="main-content">{children}</main>
    <Footer />
    <BackToTop />
    <Analytics />
    <SpeedInsights />
  </SmoothScroll>
</ThemeProvider>
```

### State Flows

| State | Managed By | Scope |
|-------|-----------|-------|
| Theme (dark/light) | `next-themes` (localStorage + context) | Global |
| Smooth scroll instance | `SmoothScroll` provider (React context) | Global |
| Active nav section | `Navbar` component (IntersectionObserver) | Navbar only |
| Mobile menu open | `Navbar` local state (`useState`) | Navbar only |
| Project filter | `Projects` section local state (`useState`) | Section only |
| Project modal open + data | `Projects` section local state (`useState`) | Section only |
| Blog search query | `/blog` page local state (`useState`) | Page only |
| Blog category filter | `/blog` page local state (`useState`) | Page only |
| Contact form | `react-hook-form` (`useForm`) | Section only |
| Contact form cooldown | `Contact` section local state (`useState`) | Section only |
| Preloader visible | `Preloader` local state + `sessionStorage` | Component only |
| Custom cursor state | `CustomCursor` local state + `useMousePosition` | Component only |
| Back-to-top visible | `BackToTop` local state + scroll listener | Component only |

---

## 10. Error Handling Strategy

### Global Error Boundary
- `src/app/error.tsx`: catches runtime errors in any route
- Shows: "Something went wrong" message + "Try Again" button (calls `reset()`)
- Styled consistently with the site design

### 404 Page
- `src/app/not-found.tsx`: custom 404 with animation and "Back to Home" CTA

### 3D Scene Failures
- `ParticleField` wrapped in React `ErrorBoundary`
- Fallback: CSS animated gradient background (no 3D)
- WebGL detection: check `document.createElement('canvas').getContext('webgl')` before mounting Canvas
- Mobile with low GPU: use `@react-three/drei`'s `useDetectGPU` — if tier 0, show fallback

### Contact Form Errors
- Validation errors: inline below each field, red border + text
- EmailJS network error: toast "Failed to send message. Please try emailing directly at hello@yourname.dev"
- Rate limit: disable button for 60s after success, show countdown

### Image Loading
- All `next/image` with `placeholder="blur"` where possible
- Blog images: fallback to a generic placeholder if missing

### Blog MDX Errors
- If MDX compilation fails: Next.js error boundary catches it
- Invalid slug: Next.js `notFound()` redirects to 404

---

## 11. Responsive Design Rules

### General
- Mobile-first approach: base styles are mobile, `md:` and `lg:` add desktop styles
- Use `dvh` units instead of `vh` for mobile Safari
- All touch targets minimum 44x44px
- No horizontal scroll on any viewport
- Test on: iPhone SE (375px), iPhone 14 (390px), iPad (768px), Desktop (1280px), 4K (2560px)

### 3D Performance Budget
| Device | Particles | Mouse tracking | Post-processing |
|--------|-----------|---------------|-----------------|
| Desktop (GPU tier 2+) | 200 | Yes | Optional bloom |
| Tablet (GPU tier 1) | 100 | No | None |
| Mobile (GPU tier 0-1) | 80 | No | None |
| WebGL unsupported | 0 (CSS fallback) | — | — |

---

## 12. Security

### Contact Form
- **Honeypot field**: hidden `<input name="website">`, rejected server-side if filled
- **Client-side rate limit**: 60-second cooldown after successful send
- **Input sanitization**: Zod schema strips/validates all inputs before sending
- **No sensitive data**: form data sent directly to EmailJS, not stored anywhere

### Email Obfuscation
- Email address rendered via JavaScript (not in static HTML) to prevent scraping
- Alternative: use `mailto:` link only (scrapers can still get it, but it is standard practice)

### Headers (via `next.config.ts`)
```typescript
headers: [
  {
    source: "/(.*)",
    headers: [
      { key: "X-Frame-Options", value: "DENY" },
      { key: "X-Content-Type-Options", value: "nosniff" },
      { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
      { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
    ],
  },
],
```

### Environment Variables
- `NEXT_PUBLIC_*` prefixed vars are safe for client exposure (EmailJS public key is designed to be public)
- No server-only secrets in this project (no API routes, no database)

---

## 13. Testing Strategy

### Tools
- **Unit/Component**: Vitest + React Testing Library
- **E2E**: Playwright
- **Accessibility**: axe-core (via `@axe-core/playwright` or manual audit)
- **Performance**: Lighthouse CI in GitHub Actions

### What to Test

| Category | What | Tool |
|----------|------|------|
| Components | Button, Card, Badge render correctly | Vitest + RTL |
| Contact Form | Validation, submission, error states | Vitest + RTL |
| Blog | MDX rendering, frontmatter parsing | Vitest |
| Navigation | Scroll to section, mobile menu toggle | Playwright |
| Theme | Toggle works, persists on reload | Playwright |
| Accessibility | Zero axe violations on all pages | Playwright + axe |
| SEO | Metadata, OG tags, structured data present | Playwright |
| Performance | Lighthouse scores meet targets | Lighthouse CI |
| Responsive | No layout breaks at all breakpoints | Playwright viewports |

### Test File Locations
```
src/
  components/
    ui/
      __tests__/
        Button.test.tsx
        AnimatedCounter.test.tsx
  lib/
    __tests__/
      mdx.test.ts
      formatDate.test.ts
e2e/
  homepage.spec.ts
  blog.spec.ts
  contact.spec.ts
  accessibility.spec.ts
```

---

## 14. Browser Support

### Target Browsers
- Chrome 90+ (desktop & mobile)
- Firefox 90+ (desktop)
- Safari 15+ (desktop & mobile — critical for `-webkit-` prefixes)
- Edge 90+ (Chromium-based)
- Samsung Internet 15+

### Explicitly NOT Supported
- Internet Explorer (any version)
- Safari < 15
- Any browser without ES2020 support

### Known Safari Workarounds
- Use `-webkit-backdrop-filter` alongside `backdrop-filter`
- Use `dvh` instead of `vh` for full-viewport sections
- Test `IntersectionObserver` threshold behavior (can differ slightly)

### WebGL Support
- Required for 3D features — graceful CSS fallback if unavailable
- Minimum: WebGL 1.0 (99%+ of modern browsers)

---

## 15. CI/CD Pipeline

### GitHub Actions (`.github/workflows/ci.yml`)

```yaml
on: [push, pull_request]
jobs:
  lint:     pnpm lint
  typecheck: pnpm tsc --noEmit
  test:     pnpm test
  build:    pnpm build
  e2e:      pnpm playwright test (on build artifact)
  lighthouse: lighthouse-ci (on preview URL)
```

### Pre-commit (optional, Phase 7)
- `husky` + `lint-staged`: run ESLint + Prettier on staged files before commit

### Deployment
- Vercel auto-deploys `main` branch to production
- Vercel creates preview deployments for all PRs
- No manual deploy steps needed

---

## 16. Deployment Configuration

### Vercel Settings
- Framework: Next.js (auto-detected)
- Build command: `pnpm build`
- Output directory: `.next` (default)
- Node.js version: 20.x
- Environment variables: set in Vercel dashboard (from `.env.example`)

### Domain
- Custom domain configured in Vercel dashboard
- `www` → non-www redirect (Vercel handles this)
- HTTPS enforced (automatic)

### Caching
- Static assets: immutable cache (Next.js handles via hashed filenames)
- Blog posts: SSG at build time, revalidate by redeploying
- Images: optimized and cached by Vercel's image CDN

---

## 17. Build Order

### Phase 1: Foundation (Steps 1-8)
1. Initialize Next.js 15 with TypeScript, Tailwind v4, ESLint, Prettier
2. Set up folder structure (all directories)
3. Install all dependencies (full list from Section 2)
4. Create `.env.example` and `.env.local`
5. Create `globals.css` with CSS custom properties (color palette, design tokens)
6. Set up `next/font` for Inter + JetBrains Mono
7. Create `ThemeProvider` + `SmoothScroll` provider + root `layout.tsx`
8. Build Navbar (desktop + mobile menu) + Footer + BackToTop + SkipToContent

### Phase 2: Data Layer & Core Sections (Steps 9-19)
9. Create TypeScript interfaces (`src/types/index.ts`)
10. Create all data files with placeholder content (`src/data/*.ts`)
11. Create utility functions (`cn`, `formatDate`)
12. Create reusable UI components (Button, Card, Badge, AnimateOnScroll, AnimatedCounter)
13. Build Hero section (text animations, CTAs, social links — no 3D yet)
14. Build About section (photo, bio, animated counters)
15. Build Skills section (category tabs, skill cards)
16. Build Projects section (filter bar, project cards, tilt effect)
17. Build ProjectModal (case study modal with shared layout animation)
18. Build Experience timeline (alternating cards, GSAP line drawing)
19. Build Contact section (form, validation, EmailJS integration, toast)

### Phase 3: Animations & Polish (Steps 20-25)
20. Add scroll-triggered animations to all sections (AnimateOnScroll wrapper)
21. Add micro-interactions (magnetic buttons, card tilts, link underlines)
22. Build custom cursor (desktop only)
23. Build preloader / loading screen
24. Add page transitions (AnimatePresence for blog routes)
25. Test and refine all animations, ensure 60fps

### Phase 4: 3D Elements (Steps 26-28)
26. Set up React Three Fiber + Drei
27. Build ParticleField component (hero background)
28. Add WebGL detection + fallback + mobile performance optimization

### Phase 5: Blog System (Steps 29-34)
29. Set up MDX pipeline (gray-matter, next-mdx-remote, rehype plugins)
30. Create `lib/mdx.ts` (getAllPosts, getPostBySlug, generateStaticParams)
31. Build BlogPreview section (homepage — latest 3 posts)
32. Build `/blog` page (listing, search, category filter)
33. Build `/blog/[slug]` page (MDX rendering, TOC, reading progress, share buttons, code copy)
34. Build Testimonials section with Embla Carousel

### Phase 6: SEO, Performance & Quality (Steps 35-40)
35. Add metadata (`generateMetadata` for all routes) + OG images
36. Create `sitemap.ts` + `robots.ts` + JSON-LD structured data
37. Build custom 404 page + error boundary
38. Performance optimization (dynamic imports for Three.js, image optimization audit)
39. Accessibility audit (axe-core, keyboard navigation, screen reader testing)
40. Security headers in `next.config.ts`

### Phase 7: Testing & Deploy (Steps 41-45)
41. Set up Vitest + React Testing Library, write component tests
42. Set up Playwright, write E2E tests (homepage, blog, contact, a11y)
43. Set up GitHub Actions CI pipeline
44. Add Vercel Analytics + Speed Insights
45. Deploy to Vercel, configure custom domain, verify production

---

## 18. Audit Trail — Issues Fixed from PORTFOLIO_SPEC.md

This section documents every gap, contradiction, and missing detail found in the original `PORTFOLIO_SPEC.md` and how it was resolved in this verified spec.

### Contradictions Resolved

| Issue | Original | Fixed |
|-------|----------|-------|
| Lighthouse target | Goal says "100", F15 says "95+" | Standardized to **95+** (realistic) |
| Sitemap | F15 says "auto-generated", folder shows `public/sitemap.xml` | Moved to `src/app/sitemap.ts` (Next.js built-in) |
| Mobile menu breakpoint | F17 says "below 768px", F17 also defines Tablet at 640px | Clarified: mobile menu at `md` (768px), aligned with Tailwind |
| Project detail | "modal or page" unresolved | **Decision: Modal** |
| Dark mode default vs system | Both stated | Clarified: dark is default when system preference is unavailable |
| Hero viewport | `100vh` specified | Changed to `min-h-dvh` for mobile Safari |
| Preloader vs 3D loading | Preloader skips on revisit, but 3D may still need loading | Preloader is cosmetic only (faked progress), 3D loads independently |

### Missing Pieces Added

| Category | What Was Missing | Now Defined In |
|----------|-----------------|----------------|
| Design System | Zero colors, fonts, spacing defined | Section 3 |
| Content Schemas | No TypeScript interfaces for data | Section 4 |
| Environment Variables | None mentioned | Section 5 |
| Site Config | No central config for name, URL, socials | Section 4.1 |
| State Management | Not addressed | Section 9 |
| Provider Hierarchy | Undefined | Section 9 |
| Error Handling | Almost none | Section 10 |
| 3D Fallback | No fallback for WebGL failure | Section 10 |
| Toast System | Referenced but never specified | Tech stack: Sonner |
| Testing | Not mentioned | Section 13 |
| CI/CD | Not mentioned | Section 15 |
| Security | Not addressed | Section 12 |
| Browser Support | Not addressed | Section 14 |
| Deployment Config | Superficial | Section 16 |
| 404 Page | Missing | Section 7 + folder structure |
| Error Boundary | Missing | Folder structure + Section 10 |
| Search Implementation | Mentioned, not specified | F8 blog section |
| Syntax Highlighting | Not specified | Tech stack: Rehype Pretty Code + Shiki |
| MDX Plugins | Not listed | Tech stack + F8 pipeline |
| Font Choice | None | Section 3.2: Inter + JetBrains Mono |
| Component List | Incomplete | Section 8 (full folder structure) |
| Hooks List | Incomplete | Section 8 (6 hooks) |
| Data Files | Incomplete | Section 8 (6 data files including siteConfig) |
| Build Order | 32 steps with gaps | 45 steps, no gaps |
| Mobile Behavior Table | Per-feature mobile rules missing | Section 11 table |
| 3D Performance Budget | Not addressed | Section 11 table |
| Responsive Typography | Not addressed | Section 3.2 (clamp) |
| `prefers-reduced-motion` | Mentioned but not detailed | F12 (comprehensive rules) |

### Unresolved Decisions Resolved

| Decision | Original | Resolved |
|----------|----------|----------|
| EmailJS vs Resend | "or" | **EmailJS** (client-side, no API route) |
| Vercel Analytics vs Plausible | "or" | **Vercel Analytics** (built-in, zero config) |
| 3D Hero: Option A/B/C | Unresolved | **Option C: Particle field** |
| Modal vs Page for projects | "modal or page" | **Modal** |
| `next-themes` vs custom hook | Unclear | **next-themes** (wrapping the custom `useTheme` is unnecessary) |
| Syntax highlighter | Not chosen | **Rehype Pretty Code + Shiki** |
| Carousel library | Not chosen | **Embla Carousel React** |
| Toast library | Not chosen | **Sonner** |
| Which fonts | Not chosen | **Inter + JetBrains Mono** |

### Dependencies Added (16 packages not in original spec)

```
@react-three/drei, next-themes, clsx, tailwind-merge,
rehype-pretty-code, shiki, remark-gfm, rehype-slug,
rehype-autolink-headings, reading-time, gray-matter,
date-fns, sonner, embla-carousel-react, @gsap/react,
@vercel/analytics, @vercel/speed-insights
```

---

*This document resolves every gap found in PORTFOLIO_SPEC.md. It is the definitive, build-ready specification. No more decisions to make — only code to write.*
