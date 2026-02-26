"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import type { Project } from "@/types";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/cn";

interface ProjectCardProps {
  project: Project;
  onSelect: (project: Project) => void;
}

export function ProjectCard({ project, onSelect }: ProjectCardProps) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "group cursor-pointer overflow-hidden rounded-xl border border-border",
        "bg-card transition-all duration-300",
        "hover:border-primary/50 hover:shadow-lg",
      )}
      onClick={() => onSelect(project)}
    >
      {/* Thumbnail */}
      <div className="relative aspect-video overflow-hidden">
        <Image
          src={project.thumbnail}
          alt={project.thumbnailAlt}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        {/* Hover overlay */}
        <div className="absolute inset-0 flex items-center justify-center gap-3 bg-background/80 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground transition-transform hover:scale-110"
              aria-label="View live site"
            >
              <ExternalLink className="h-4 w-4" />
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-foreground text-background transition-transform hover:scale-110"
              aria-label="View source code"
            >
              <Github className="h-4 w-4" />
            </a>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-lg font-semibold text-foreground">
          {project.title}
        </h3>
        <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
          {project.shortDescription}
        </p>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.techStack.slice(0, 4).map((tech) => (
            <Badge key={tech} variant="primary">
              {tech}
            </Badge>
          ))}
          {project.techStack.length > 4 && (
            <Badge variant="outline">+{project.techStack.length - 4}</Badge>
          )}
        </div>
      </div>
    </motion.article>
  );
}
