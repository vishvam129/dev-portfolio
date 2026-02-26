"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { ArrowDown, Github, Linkedin, Twitter, Download, Mail } from "lucide-react";
import { siteConfig } from "@/data/siteConfig";
import { Button } from "@/components/ui/Button";
import { staggerContainer, heroTextReveal } from "@/styles/animations";
import { cn } from "@/lib/cn";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const ParticleField = dynamic(
  () =>
    import("@/components/three/ParticleField").then((mod) => mod.ParticleField),
  { ssr: false },
);

const roles = ["Python Developer", "Full Stack Developer", "Odoo Developer"];

function useTypewriter(words: string[], typingSpeed = 80, deletingSpeed = 50, pauseTime = 2000) {
  const [text, setText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) {
      setText(words[0]);
      return;
    }

    const currentWord = words[wordIndex];

    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          setText(currentWord.slice(0, text.length + 1));
          if (text.length + 1 === currentWord.length) {
            setTimeout(() => setIsDeleting(true), pauseTime);
          }
        } else {
          setText(currentWord.slice(0, text.length - 1));
          if (text.length === 0) {
            setIsDeleting(false);
            setWordIndex((prev) => (prev + 1) % words.length);
          }
        }
      },
      isDeleting ? deletingSpeed : typingSpeed,
    );

    return () => clearTimeout(timeout);
  }, [text, wordIndex, isDeleting, words, typingSpeed, deletingSpeed, pauseTime, reduced]);

  return text;
}

const socialLinks = [
  { icon: Github, href: siteConfig.socials.github, label: "GitHub" },
  { icon: Linkedin, href: siteConfig.socials.linkedin, label: "LinkedIn" },
  { icon: Twitter, href: siteConfig.socials.twitter, label: "Twitter" },
];

export function Hero() {
  const typedText = useTypewriter(roles);

  return (
    <section
      id="home"
      className="relative flex min-h-dvh items-center justify-center overflow-hidden"
    >
      {/* 3D Particle Background */}
      <ParticleField />

      <div className="mx-auto max-w-7xl px-6 py-20 text-center">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {/* Greeting */}
          <motion.p
            custom={0}
            variants={heroTextReveal}
            className="mb-4 text-sm font-medium uppercase tracking-widest text-primary"
          >
            Hello, I&apos;m
          </motion.p>

          {/* Name */}
          <motion.h1
            custom={1}
            variants={heroTextReveal}
            className="text-hero gradient-text"
          >
            {siteConfig.name}
          </motion.h1>

          {/* Typewriter */}
          <motion.div
            custom={2}
            variants={heroTextReveal}
            className="mt-4 h-10"
          >
            <span className="text-h3 text-muted-foreground">
              {typedText}
              <span className="animate-pulse text-primary">|</span>
            </span>
          </motion.div>

          {/* Description */}
          <motion.p
            custom={3}
            variants={heroTextReveal}
            className="mx-auto mt-6 max-w-xl text-muted-foreground"
          >
            {siteConfig.description}
          </motion.p>

          {/* CTAs */}
          <motion.div
            custom={4}
            variants={heroTextReveal}
            className="mt-8 flex flex-wrap items-center justify-center gap-4"
          >
            <Button
              variant="primary"
              size="lg"
              onClick={() => {
                const el = document.getElementById("contact");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
            >
              <Mail className="h-4 w-4" />
              Get in Touch
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => window.open(siteConfig.resumeUrl, "_blank")}
            >
              <Download className="h-4 w-4" />
              Resume
            </Button>
          </motion.div>

          {/* Social Links */}
          <motion.div
            custom={5}
            variants={heroTextReveal}
            className="mt-8 flex items-center justify-center gap-4"
          >
            {socialLinks.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-full",
                  "border border-border text-muted-foreground",
                  "transition-all duration-200",
                  "hover:border-primary hover:text-primary hover:shadow-glow",
                )}
                aria-label={label}
              >
                <Icon className="h-5 w-5" />
              </a>
            ))}
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <a
            href="#about"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="flex flex-col items-center gap-2 text-muted-foreground transition-colors hover:text-primary"
            aria-label="Scroll to about section"
          >
            <span className="text-xs uppercase tracking-widest">Scroll</span>
            <ArrowDown className="h-4 w-4 animate-bounce" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
