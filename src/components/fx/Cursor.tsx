import { useEffect, useRef } from "react";

/** Custom cursor: instant lime dot + spring-trailed ring that grows on hover. */
export function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    document.body.classList.add("cursor-none");
    const p = { x: innerWidth / 2, y: innerHeight / 2 };
    const r = { ...p };
    let raf = 0;
    let over = false;

    const move = (e: PointerEvent) => {
      p.x = e.clientX; p.y = e.clientY;
      if (dot.current) dot.current.style.transform = `translate(${p.x}px, ${p.y}px)`;
      const t = e.target as HTMLElement;
      over = !!t.closest("a, button, input, [data-hover]");
    };
    const loop = () => {
      r.x += (p.x - r.x) * 0.2; r.y += (p.y - r.y) * 0.2;
      if (ring.current) {
        const s = over ? 1.7 : 1;
        ring.current.style.transform = `translate(${r.x}px, ${r.y}px) scale(${s})`;
        ring.current.style.opacity = over ? "1" : "0.6";
        ring.current.style.background = over ? "color-mix(in srgb, var(--accent) 14%, transparent)" : "transparent";
      }
      raf = requestAnimationFrame(loop);
    };
    window.addEventListener("pointermove", move);
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("pointermove", move);
      cancelAnimationFrame(raf);
      document.body.classList.remove("cursor-none");
    };
  }, []);

  return (
    <>
      <div ref={ring} className="cursor-ring" aria-hidden />
      <div ref={dot} className="cursor-dot" aria-hidden />
    </>
  );
}
