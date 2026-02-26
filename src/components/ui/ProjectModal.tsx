"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { X, ExternalLink, Github } from "lucide-react";
import type { Project } from "@/types";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import { useLockBodyScroll } from "@/hooks/useLockBodyScroll";
import { modalBackdrop, modalContent } from "@/styles/animations";

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  useLockBodyScroll(true);

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose]);

  return (
    <>
      {/* Backdrop */}
      <motion.div
        variants={modalBackdrop}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="fixed inset-0 z-30 bg-background/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <motion.div
        variants={modalContent}
        initial="hidden"
        animate="visible"
        exit="exit"
        className={cn(
          "fixed inset-4 z-40 overflow-y-auto rounded-2xl",
          "border border-border bg-card",
          "md:inset-x-auto md:inset-y-8 md:mx-auto md:max-w-3xl",
        )}
        role="dialog"
        aria-modal="true"
        aria-label={project.title}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className={cn(
            "absolute right-4 top-4 z-50",
            "flex h-8 w-8 items-center justify-center rounded-full",
            "bg-background/80 text-foreground backdrop-blur-sm",
            "transition-colors hover:bg-muted",
          )}
          aria-label="Close modal"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Hero image */}
        <div className="relative aspect-video w-full">
          <Image
            src={project.thumbnail}
            alt={project.thumbnailAlt}
            fill
            className="rounded-t-2xl object-cover"
            sizes="(max-width: 768px) 100vw, 768px"
          />
        </div>

        {/* Content */}
        <div className="space-y-8 p-6 md:p-8">
          {/* Header */}
          <div>
            <h2 className="text-h3 text-foreground">{project.title}</h2>
            <p className="mt-2 text-muted-foreground">
              {project.fullDescription}
            </p>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {project.techStack.map((tech) => (
                <Badge key={tech} variant="primary">
                  {tech}
                </Badge>
              ))}
            </div>
          </div>

          {/* Case Study */}
          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-lg border border-border bg-muted/30 p-4">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-primary">
                Problem
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {project.problem}
              </p>
            </div>
            <div className="rounded-lg border border-border bg-muted/30 p-4">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-primary">
                Solution
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {project.solution}
              </p>
            </div>
            <div className="rounded-lg border border-border bg-muted/30 p-4">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-primary">
                Impact
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {project.impact}
              </p>
            </div>
          </div>

          {/* Key Learnings */}
          {project.learnings.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">
                Key Learnings
              </h3>
              <ul className="mt-3 space-y-2">
                {project.learnings.map((learning, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-sm text-muted-foreground"
                  >
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    {learning}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Links */}
          <div className="flex flex-wrap gap-3">
            {project.liveUrl && (
              <Button
                variant="primary"
                onClick={() => window.open(project.liveUrl, "_blank")}
              >
                <ExternalLink className="h-4 w-4" />
                Live Demo
              </Button>
            )}
            {project.githubUrl && (
              <Button
                variant="outline"
                onClick={() => window.open(project.githubUrl, "_blank")}
              >
                <Github className="h-4 w-4" />
                Source Code
              </Button>
            )}
          </div>
        </div>
      </motion.div>
    </>
  );
}
