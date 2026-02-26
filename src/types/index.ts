/* ═══════════════════════════════════════════════════════
   Site Config
   ═══════════════════════════════════════════════════════ */

export interface NavLink {
  label: string;
  href: string;
}

export interface SiteConfig {
  name: string;
  title: string;
  description: string;
  url: string;
  email: string;
  location: string;
  resumeUrl: string;
  ogImage: string;
  socials: {
    github: string;
    linkedin: string;
    twitter: string;
  };
  navLinks: NavLink[];
}

/* ═══════════════════════════════════════════════════════
   Projects
   ═══════════════════════════════════════════════════════ */

export type ProjectCategory =
  | "frontend"
  | "fullstack"
  | "open-source"
  | "mobile";

export interface Project {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  problem: string;
  solution: string;
  impact: string;
  thumbnail: string;
  thumbnailAlt: string;
  screenshots: string[];
  video?: string;
  techStack: string[];
  category: ProjectCategory;
  featured: boolean;
  liveUrl?: string;
  githubUrl?: string;
  date: string;
  learnings: string[];
  order: number;
}

/* ═══════════════════════════════════════════════════════
   Experience
   ═══════════════════════════════════════════════════════ */

export interface ExperienceEntry {
  id: string;
  type: "work" | "education";
  title: string;
  organization: string;
  organizationLogo?: string;
  location: string;
  startDate: string;
  endDate: string | "present";
  current: boolean;
  description: string;
  highlights: string[];
  techStack: string[];
  order: number;
}

/* ═══════════════════════════════════════════════════════
   Skills
   ═══════════════════════════════════════════════════════ */

export type SkillCategory = "frontend" | "backend" | "database" | "devops";

export interface Skill {
  name: string;
  icon: string;
  category: SkillCategory;
  proficiency: 1 | 2 | 3 | 4 | 5;
  yearsUsed?: number;
}

export interface SkillGroup {
  category: SkillCategory;
  label: string;
  skills: Skill[];
}

/* ═══════════════════════════════════════════════════════
   Testimonials
   ═══════════════════════════════════════════════════════ */

export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  role: string;
  company: string;
  avatar?: string;
  rating?: 1 | 2 | 3 | 4 | 5;
}

/* ═══════════════════════════════════════════════════════
   About
   ═══════════════════════════════════════════════════════ */

export interface Stat {
  label: string;
  value: number;
  suffix?: string;
}

export interface FunFact {
  emoji: string;
  label: string;
}

export interface AboutData {
  bio: string[];
  stats: Stat[];
  funFacts: FunFact[];
  profileImage: string;
  profileImageAlt: string;
}

/* ═══════════════════════════════════════════════════════
   Certifications
   ═══════════════════════════════════════════════════════ */

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  issuerLogo?: string;
  date: string;
  credentialUrl?: string;
  badgeImage?: string;
}

/* ═══════════════════════════════════════════════════════
   Blog
   ═══════════════════════════════════════════════════════ */

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  updatedDate?: string;
  excerpt: string;
  coverImage: string;
  coverImageAlt: string;
  tags: string[];
  published: boolean;
  readingTime: string;
  content: string;
}

export interface BlogPostMeta {
  slug: string;
  title: string;
  date: string;
  updatedDate?: string;
  excerpt: string;
  coverImage: string;
  coverImageAlt: string;
  tags: string[];
  readingTime: string;
}
