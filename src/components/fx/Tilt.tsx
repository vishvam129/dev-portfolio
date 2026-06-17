import { useRef, type ReactNode } from "react";

/** 3D tilt toward the cursor. Disabled on coarse pointers. */
export function Tilt({ children, max = 7, className }: { children: ReactNode; max?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  function move(e: React.MouseEvent) {
    const el = ref.current;
    if (!el || window.matchMedia("(pointer: coarse)").matches) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(900px) rotateY(${px * max}deg) rotateX(${-py * max}deg)`;
  }
  function reset() { if (ref.current) ref.current.style.transform = "perspective(900px) rotateY(0deg) rotateX(0deg)"; }
  return <div ref={ref} onMouseMove={move} onMouseLeave={reset} className={`tilt ${className ?? ""}`}>{children}</div>;
}
