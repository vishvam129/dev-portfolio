"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { skillGroups } from "@/data/skills";
import type { SkillCategory } from "@/types";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import { cn } from "@/lib/cn";
import { fadeUp, staggerContainer } from "@/styles/animations";

const tabs: { label: string; value: SkillCategory }[] = [
  { label: "Frontend", value: "frontend" },
  { label: "Backend", value: "backend" },
  { label: "Database", value: "database" },
  { label: "DevOps & Tools", value: "devops" },
];

export function Skills() {
  const [activeTab, setActiveTab] = useState<SkillCategory>("frontend");
  const activeGroup = skillGroups.find((g) => g.category === activeTab);

  return (
    <section id="skills" className="py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <AnimateOnScroll>
          <p className="font-heading text-sm font-medium uppercase tracking-widest text-primary">
            Skills
          </p>
          <h2 className="text-h2 mt-2 text-foreground">
            My tech stack
          </h2>
        </AnimateOnScroll>

        {/* Tabs */}
        <div className="mt-10 flex flex-wrap gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setActiveTab(tab.value)}
              className={cn(
                "relative rounded-full px-5 py-2 text-sm font-medium transition-colors",
                activeTab === tab.value
                  ? "text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {activeTab === tab.value && (
                <motion.span
                  layoutId="activeTab"
                  className="absolute inset-0 rounded-full bg-primary"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <span className="relative z-10">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Skill Cards */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
          >
            {activeGroup?.skills.map((skill) => (
              <motion.div
                key={skill.name}
                variants={fadeUp}
                className={cn(
                  "flex items-center gap-3 rounded-xl border border-border p-4",
                  "bg-card transition-all duration-200",
                  "hover:border-primary/50 hover:shadow-glow",
                )}
              >
                <span className="text-2xl">{skill.icon}</span>
                <span className="text-sm font-medium text-foreground">
                  {skill.name}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
