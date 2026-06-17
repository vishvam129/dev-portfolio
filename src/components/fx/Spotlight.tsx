import { useEffect, useRef } from "react";

/** Soft accent glow that follows the cursor — page-wide atmosphere. */
export function Spotlight() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const move = (e: PointerEvent) => { if (ref.current) ref.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`; };
    window.addEventListener("pointermove", move);
    return () => window.removeEventListener("pointermove", move);
  }, []);
  return <div ref={ref} className="spotlight-glow" aria-hidden />;
}

/** Wrap any element to give it a cursor-tracking radial highlight (.spot). */
export function spotMove(e: React.MouseEvent<HTMLElement>) {
  const el = e.currentTarget;
  const r = el.getBoundingClientRect();
  el.style.setProperty("--mx", `${e.clientX - r.left}px`);
  el.style.setProperty("--my", `${e.clientY - r.top}px`);
}
