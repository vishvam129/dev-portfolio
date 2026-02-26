import type { SiteConfig } from "@/types";

export const siteConfig: SiteConfig = {
  name: "Vishvam Patel",
  title: "Software Developer",
  description:
    "Software Developer specializing in Python, React, and Full Stack Development. Building scalable backend systems and modern web experiences.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  email: "vishvamp129@gmail.com",
  location: "Gandhinagar, Gujarat, India",
  resumeUrl: "/resume.pdf",
  ogImage: "/images/og-default.png",
  socials: {
    github: "https://github.com/vishvamp129",
    linkedin: "https://linkedin.com/in/vishvamp129",
    twitter: "https://x.com/vishvamp129",
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
};
