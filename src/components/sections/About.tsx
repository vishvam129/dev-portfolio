"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { aboutData } from "@/data/about";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { fadeUp, slideLeft, slideRight, staggerContainer } from "@/styles/animations";

export function About() {
  return (
    <section id="about" className="py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <AnimateOnScroll>
          <p className="font-heading text-sm font-medium uppercase tracking-widest text-primary">
            About Me
          </p>
          <h2 className="text-h2 mt-2 text-foreground">
            Get to know me
          </h2>
        </AnimateOnScroll>

        <div className="mt-12 grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Photo */}
          <AnimateOnScroll variants={slideLeft}>
            <div className="relative mx-auto aspect-square w-full max-w-md overflow-hidden rounded-2xl border border-border">
              <Image
                src={aboutData.profileImage}
                alt={aboutData.profileImageAlt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
            </div>
          </AnimateOnScroll>

          {/* Bio */}
          <AnimateOnScroll variants={slideRight}>
            <div className="space-y-4">
              {aboutData.bio.map((paragraph, i) => (
                <p key={i} className="text-muted-foreground leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Fun Facts */}
            <div className="mt-8 flex flex-wrap gap-4">
              {aboutData.funFacts.map((fact) => (
                <span
                  key={fact.label}
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-muted/50 px-4 py-2 text-sm text-muted-foreground"
                >
                  <span>{fact.emoji}</span>
                  {fact.label}
                </span>
              ))}
            </div>
          </AnimateOnScroll>
        </div>

        {/* Stats Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="mt-16 grid grid-cols-2 gap-6 md:grid-cols-4"
        >
          {aboutData.stats.map((stat) => (
            <motion.div
              key={stat.label}
              variants={fadeUp}
              className="rounded-xl border border-border bg-card p-6 text-center"
            >
              <p className="text-h2 font-bold text-primary">
                <AnimatedCounter
                  target={stat.value}
                  suffix={stat.suffix || ""}
                />
              </p>
              <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
