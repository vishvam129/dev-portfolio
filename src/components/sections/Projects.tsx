"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Project, ProjectCategory } from "@/types";
import { projects } from "@/data/projects";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { ProjectModal } from "@/components/ui/ProjectModal";
import { cn } from "@/lib/cn";

type FilterValue = "all" | ProjectCategory;

const filters: { label: string; value: FilterValue }[] = [
  { label: "All", value: "all" },
  { label: "Frontend", value: "frontend" },
  { label: "Full Stack", value: "fullstack" },
  { label: "Open Source", value: "open-source" },
  { label: "Mobile", value: "mobile" },
];

export function Projects() {
  const [activeFilter, setActiveFilter] = useState<FilterValue>("all");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filteredProjects =
    activeFilter === "all"
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  return (
    <section id="projects" className="py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <AnimateOnScroll>
          <p className="font-heading text-sm font-medium uppercase tracking-widest text-primary">
            Projects
          </p>
          <h2 className="text-h2 mt-2 text-foreground">
            Featured work
          </h2>
        </AnimateOnScroll>

        {/* Filter Bar */}
        <div className="mt-10 flex flex-wrap gap-2">
          {filters.map((filter) => (
            <button
              key={filter.value}
              onClick={() => setActiveFilter(filter.value)}
              className={cn(
                "relative rounded-full px-5 py-2 text-sm font-medium transition-colors",
                activeFilter === filter.value
                  ? "text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {activeFilter === filter.value && (
                <motion.span
                  layoutId="activeFilter"
                  className="absolute inset-0 rounded-full bg-primary"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <span className="relative z-10">{filter.label}</span>
            </button>
          ))}
        </div>

        {/* Project Grid */}
        <motion.div layout className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onSelect={setSelectedProject}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Project Modal */}
        <AnimatePresence>
          {selectedProject && (
            <ProjectModal
              project={selectedProject}
              onClose={() => setSelectedProject(null)}
            />
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
