"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "@/hooks/useInView";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface AnimatedCounterProps {
  target: number;
  duration?: number;
  suffix?: string;
  className?: string;
}

export function AnimatedCounter({
  target,
  duration = 2000,
  suffix = "",
  className,
}: AnimatedCounterProps) {
  const { ref, inView } = useInView({ threshold: 0.5, once: true });
  const [count, setCount] = useState(0);
  const reduced = useReducedMotion();
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!inView || hasAnimated.current) return;
    hasAnimated.current = true;

    if (reduced) {
      setCount(target);
      return;
    }

    const startTime = performance.now();

    function animate(currentTime: number) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    }

    requestAnimationFrame(animate);
  }, [inView, target, duration, reduced]);

  return (
    <span ref={ref} className={className}>
      {count}
      {suffix}
    </span>
  );
}
