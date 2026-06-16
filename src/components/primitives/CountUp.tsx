"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

/** Counts a number up when it scrolls into view. Prefix/suffix kept as-is. */
export function CountUp({
  to,
  decimals = 0,
  prefix = "",
  suffix = "",
  duration = 1200,
  className,
}: {
  to: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
}) {
  const prm = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const [val, setVal] = useState(prm ? to : 0);

  useEffect(() => {
    if (prm) return;
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    let startedAt = 0;
    const io = new IntersectionObserver(
      (es) => {
        if (!es[0].isIntersecting) return;
        io.disconnect();
        const step = (t: number) => {
          if (!startedAt) startedAt = t;
          const p = Math.min(1, (t - startedAt) / duration);
          const eased = 1 - Math.pow(1 - p, 3);
          setVal(to * eased);
          if (p < 1) raf = requestAnimationFrame(step);
          else setVal(to);
        };
        raf = requestAnimationFrame(step);
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => { io.disconnect(); cancelAnimationFrame(raf); };
  }, [to, duration, prm]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {val.toFixed(decimals)}
      {suffix}
    </span>
  );
}
