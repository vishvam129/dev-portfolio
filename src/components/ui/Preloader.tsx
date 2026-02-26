"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function Preloader() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) {
      setLoading(false);
      return;
    }

    // Simulate loading progress
    const duration = 1500;
    const start = performance.now();

    function tick(now: number) {
      const elapsed = now - start;
      const pct = Math.min(elapsed / duration, 1);
      setProgress(Math.round(pct * 100));

      if (pct < 1) {
        requestAnimationFrame(tick);
      } else {
        setTimeout(() => setLoading(false), 300);
      }
    }

    requestAnimationFrame(tick);
  }, [reduced]);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ y: "-100%", opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[80] flex flex-col items-center justify-center bg-background"
        >
          {/* SVG Logo animation */}
          <motion.svg
            width="80"
            height="80"
            viewBox="0 0 80 80"
            className="text-primary"
          >
            <motion.circle
              cx="40"
              cy="40"
              r="35"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: progress / 100 }}
              transition={{ duration: 0.1 }}
            />
            <motion.text
              x="40"
              y="44"
              textAnchor="middle"
              fill="currentColor"
              fontSize="16"
              fontWeight="700"
              fontFamily="var(--font-sans)"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {progress}%
            </motion.text>
          </motion.svg>

          {/* Loading text */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-6 text-sm text-muted-foreground"
          >
            Loading...
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
