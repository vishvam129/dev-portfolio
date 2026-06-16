"use client";

import { useRef } from "react";
import { motion, useScroll, useVelocity, useSpring, useTransform, useMotionValue, useAnimationFrame } from "framer-motion";

/** A marquee band whose speed + skew respond to scroll velocity. */
export function VelocityText({ text, baseSpeed = 1.4 }: { text: string; baseSpeed?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVel = useVelocity(scrollY);
  const smoothVel = useSpring(scrollVel, { damping: 50, stiffness: 380 });
  const factor = useTransform(smoothVel, [-1500, 0, 1500], [-4, 1, 4], { clamp: false });
  const skew = useTransform(smoothVel, [-1500, 0, 1500], [-6, 0, 6], { clamp: true });

  const dirRef = useRef(1);
  useAnimationFrame((_, delta) => {
    let move = dirRef.current * baseSpeed * (delta / 16);
    const f = factor.get();
    if (f < 0) dirRef.current = -1;
    else if (f > 0) dirRef.current = 1;
    move *= Math.abs(f);
    let next = x.get() - move;
    // wrap within one segment width (-25% of 4x content)
    if (next <= -25) next += 25;
    if (next > 0) next -= 25;
    x.set(next);
  });

  const items = Array.from({ length: 4 });
  return (
    <div ref={ref} className="overflow-hidden border-y py-6" style={{ borderColor: "var(--line)" }}>
      <motion.div className="flex whitespace-nowrap" style={{ x: useTransform(x, (v) => `${v}%`), skewX: skew }}>
        {items.map((_, i) => (
          <span
            key={i}
            className="font-display font-semibold tracking-tight"
            style={{ fontSize: "clamp(2rem,7vw,5rem)", color: "var(--fg)", paddingRight: "3rem" }}
          >
            {text} <span style={{ color: "var(--accent)" }}>✦</span>{" "}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
