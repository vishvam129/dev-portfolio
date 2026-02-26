"use client";

import { useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Github, Linkedin, Twitter } from "lucide-react";
import { cn } from "@/lib/cn";
import { siteConfig } from "@/data/siteConfig";
import { useLockBodyScroll } from "@/hooks/useLockBodyScroll";
import { menuItemStagger } from "@/styles/animations";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  activeSection: string;
}

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

const menuVariants = {
  hidden: { x: "100%" },
  visible: {
    x: 0,
    transition: { type: "spring" as const, stiffness: 300, damping: 30 },
  },
  exit: {
    x: "100%",
    transition: { duration: 0.2, ease: "easeIn" as const },
  },
};

const socialLinks = [
  { icon: Github, href: siteConfig.socials.github, label: "GitHub" },
  { icon: Linkedin, href: siteConfig.socials.linkedin, label: "LinkedIn" },
  { icon: Twitter, href: siteConfig.socials.twitter, label: "Twitter" },
];

export function MobileMenu({ isOpen, onClose, activeSection }: MobileMenuProps) {
  useLockBodyScroll(isOpen);

  // Close on Escape key
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose],
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      return () => document.removeEventListener("keydown", handleKeyDown);
    }
  }, [isOpen, handleKeyDown]);

  function handleLinkClick(e: React.MouseEvent<HTMLAnchorElement>, href: string) {
    if (href.startsWith("#")) {
      e.preventDefault();
      onClose();
      // Delay scroll to allow menu close animation
      setTimeout(() => {
        const el = document.getElementById(href.slice(1));
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 300);
    } else {
      onClose();
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 z-30 bg-background/80 backdrop-blur-sm lg:hidden"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Menu Panel */}
          <motion.div
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={cn(
              "fixed inset-y-0 right-0 z-40 w-full max-w-sm lg:hidden",
              "flex flex-col bg-background border-l border-border",
            )}
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
          >
            {/* Close button */}
            <div className="flex justify-end p-6">
              <button
                onClick={onClose}
                className={cn(
                  "flex h-9 w-9 items-center justify-center rounded-full",
                  "border border-border bg-muted/50 text-foreground",
                  "transition-colors hover:bg-muted",
                )}
                aria-label="Close menu"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Nav Links */}
            <nav className="flex flex-1 flex-col gap-2 px-6">
              {siteConfig.navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  custom={i}
                  variants={menuItemStagger}
                  initial="hidden"
                  animate="visible"
                  className={cn(
                    "py-3 text-2xl font-semibold transition-colors",
                    "border-b border-border/50",
                    activeSection === link.href.slice(1)
                      ? "text-primary"
                      : "text-foreground hover:text-primary",
                  )}
                >
                  {link.label}
                </motion.a>
              ))}
            </nav>

            {/* Social Links */}
            <div className="flex items-center gap-4 border-t border-border p-6">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground transition-colors hover:text-primary"
                  aria-label={label}
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
