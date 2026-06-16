"use client";

import { useRef, type ReactNode } from "react";
import { useReducedMotion } from "framer-motion";

/** Element pulls toward the cursor, springs back on leave. */
export function Magnetic({
  children,
  strength = 0.35,
  className,
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) {
  const prm = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);

  function onMove(e: React.MouseEvent) {
    if (prm) return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - (r.left + r.width / 2)) * strength;
    const y = (e.clientY - (r.top + r.height / 2)) * strength;
    el.style.transform = `translate(${x}px, ${y}px)`;
  }
  function reset() {
    const el = ref.current;
    if (el) el.style.transform = "translate(0px, 0px)";
  }

  return (
    <span
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      className={className}
      style={{ display: "inline-block", transition: "transform 0.35s cubic-bezier(0.16,1,0.3,1)" }}
    >
      {children}
    </span>
  );
}
