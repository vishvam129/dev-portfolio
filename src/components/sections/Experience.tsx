"use client";

import { motion } from "framer-motion";
import { Briefcase, GraduationCap } from "lucide-react";
import { experience } from "@/data/experience";
import { formatDateRange } from "@/lib/formatDate";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/cn";
import { fadeUp, staggerContainer } from "@/styles/animations";

export function Experience() {
  return (
    <section id="experience" className="py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <AnimateOnScroll>
          <p className="font-heading text-sm font-medium uppercase tracking-widest text-primary">
            Experience
          </p>
          <h2 className="text-h2 mt-2 text-foreground">
            Where I&apos;ve worked
          </h2>
        </AnimateOnScroll>

        {/* Timeline */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="relative mt-12"
        >
          {/* Vertical line */}
          <div className="absolute left-4 top-0 bottom-0 w-px bg-border md:left-1/2 md:-translate-x-px" />

          {experience.map((entry, i) => {
            const isLeft = i % 2 === 0;
            const Icon = entry.type === "work" ? Briefcase : GraduationCap;

            return (
              <motion.div
                key={entry.id}
                variants={fadeUp}
                className={cn(
                  "relative mb-12 last:mb-0",
                  "pl-12 md:pl-0",
                  "md:flex md:items-start",
                  isLeft ? "md:flex-row" : "md:flex-row-reverse",
                )}
              >
                {/* Timeline dot */}
                <div
                  className={cn(
                    "absolute left-2.5 top-1 z-10 flex h-3 w-3 items-center justify-center md:left-1/2 md:-translate-x-1/2",
                  )}
                >
                  <span
                    className={cn(
                      "h-3 w-3 rounded-full border-2",
                      entry.current
                        ? "border-primary bg-primary shadow-glow"
                        : "border-border bg-card",
                    )}
                  />
                </div>

                {/* Card */}
                <div
                  className={cn(
                    "w-full md:w-[calc(50%-2rem)]",
                    isLeft ? "md:pr-0" : "md:pl-0",
                  )}
                >
                  <div className="rounded-xl border border-border bg-card p-5 transition-colors hover:border-primary/30">
                    {/* Header */}
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                          <Icon className="h-5 w-5" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground">
                            {entry.title}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {entry.organization}
                          </p>
                        </div>
                      </div>
                      {entry.current && (
                        <Badge variant="success">Current</Badge>
                      )}
                    </div>

                    {/* Date & Location */}
                    <p className="mt-3 text-xs text-muted-foreground">
                      {formatDateRange(entry.startDate, entry.endDate)} &middot;{" "}
                      {entry.location}
                    </p>

                    {/* Description */}
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                      {entry.description}
                    </p>

                    {/* Highlights */}
                    {entry.highlights.length > 0 && (
                      <ul className="mt-3 space-y-1.5">
                        {entry.highlights.map((highlight, j) => (
                          <li
                            key={j}
                            className="flex items-start gap-2 text-sm text-muted-foreground"
                          >
                            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                            {highlight}
                          </li>
                        ))}
                      </ul>
                    )}

                    {/* Tech Stack */}
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {entry.techStack.map((tech) => (
                        <Badge key={tech} variant="primary">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
