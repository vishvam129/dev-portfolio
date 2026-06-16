import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

/** Staggered rise-in on scroll. */
export function Reveal({ children, delay = 0, y = 20, className }: { children: ReactNode; delay?: number; y?: number; className?: string }) {
  const prm = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={prm ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
      transition={{ duration: 0.75, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
