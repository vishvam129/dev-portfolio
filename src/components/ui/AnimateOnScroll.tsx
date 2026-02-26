"use client";

import { type ReactNode } from "react";
import { motion, type Variants } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { fadeUp } from "@/styles/animations";

interface AnimateOnScrollProps {
  children: ReactNode;
  variants?: Variants;
  className?: string;
  delay?: number;
  once?: boolean;
}

const noMotion: Variants = {
  hidden: {},
  visible: {},
};

export function AnimateOnScroll({
  children,
  variants = fadeUp,
  className,
  delay = 0,
  once = true,
}: AnimateOnScrollProps) {
  const { ref, inView } = useInView({ threshold: 0.1, once });
  const reduced = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      variants={reduced ? noMotion : variants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      transition={delay ? { delay } : undefined}
      className={className}
    >
      {children}
    </motion.div>
  );
}
