import { useRef, type ReactNode } from "react";

/** Pulls toward the cursor, springs back on leave. Desktop only. */
export function Magnetic({ children, strength = 0.4, className }: { children: ReactNode; strength?: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  function move(e: React.MouseEvent) {
    const el = ref.current;
    if (!el || window.matchMedia("(pointer: coarse)").matches) return;
    const r = el.getBoundingClientRect();
    el.style.transform = `translate(${(e.clientX - (r.left + r.width / 2)) * strength}px, ${(e.clientY - (r.top + r.height / 2)) * strength}px)`;
  }
  function reset() { if (ref.current) ref.current.style.transform = "translate(0,0)"; }
  return (
    <span ref={ref} onMouseMove={move} onMouseLeave={reset} className={className}
      style={{ display: "inline-block", transition: "transform 0.4s cubic-bezier(0.16,1,0.3,1)" }}>
      {children}
    </span>
  );
}
