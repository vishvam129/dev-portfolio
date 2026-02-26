"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Menu } from "lucide-react";
import { cn } from "@/lib/cn";
import { siteConfig } from "@/data/siteConfig";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { MobileMenu } from "@/components/sections/MobileMenu";
import { navSlideDown } from "@/styles/animations";

export function Navbar() {
  const [activeSection, setActiveSection] = useState("");
  const [hidden, setHidden] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const lastScrollY = useRef(0);

  // Hide/show navbar on scroll direction
  useEffect(() => {
    function handleScroll() {
      const currentY = window.scrollY;
      // Only hide after scrolling past 100px
      if (currentY > 100) {
        setHidden(currentY > lastScrollY.current);
      } else {
        setHidden(false);
      }
      lastScrollY.current = currentY;
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Active section tracking via IntersectionObserver
  useEffect(() => {
    const sectionIds = siteConfig.navLinks
      .filter((link) => link.href.startsWith("#"))
      .map((link) => link.href.slice(1));

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        }
      },
      { rootMargin: "-20% 0px -70% 0px" },
    );

    for (const id of sectionIds) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, []);

  const handleNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      if (href.startsWith("#")) {
        e.preventDefault();
        const el = document.getElementById(href.slice(1));
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
      }
    },
    [],
  );

  return (
    <>
      <motion.header
        variants={navSlideDown}
        initial="hidden"
        animate="visible"
        className={cn(
          "fixed top-0 left-0 right-0 z-20",
          "glass",
          "transition-transform duration-300",
          hidden && !mobileMenuOpen && "-translate-y-full",
        )}
      >
        <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          {/* Logo / Name */}
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, "#home")}
            className="text-lg font-bold text-foreground transition-colors hover:text-primary"
          >
            {siteConfig.name.split(" ")[0]}
            <span className="text-primary">.</span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-1 lg:flex">
            {siteConfig.navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={cn(
                  "relative px-3 py-2 text-sm font-medium transition-colors",
                  "hover:text-primary",
                  activeSection === link.href.slice(1)
                    ? "text-primary"
                    : "text-muted-foreground",
                )}
              >
                {link.label}
                {activeSection === link.href.slice(1) && (
                  <motion.span
                    layoutId="activeSection"
                    className="absolute inset-x-1 -bottom-px h-0.5 rounded-full bg-primary"
                    transition={{
                      type: "spring",
                      stiffness: 380,
                      damping: 30,
                    }}
                  />
                )}
              </a>
            ))}
            <ThemeToggle className="ml-2" />
          </div>

          {/* Mobile Controls */}
          <div className="flex items-center gap-2 lg:hidden">
            <ThemeToggle />
            <button
              onClick={() => setMobileMenuOpen(true)}
              className={cn(
                "flex h-9 w-9 items-center justify-center rounded-full",
                "border border-border bg-muted/50 text-foreground",
                "transition-colors hover:bg-muted",
              )}
              aria-label="Open menu"
            >
              <Menu className="h-4 w-4" />
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        activeSection={activeSection}
      />
    </>
  );
}
