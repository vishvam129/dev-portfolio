"use client";

import { useEffect, useRef } from "react";

/** Spring-trailed custom cursor that grows over interactive elements. Desktop only. */
export function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const pos = { x: innerWidth / 2, y: innerHeight / 2 };
    const ringPos = { ...pos };
    let raf = 0;
    let hovering = false;

    function onMove(e: PointerEvent) {
      pos.x = e.clientX; pos.y = e.clientY;
      const t = e.target as HTMLElement;
      hovering = !!t.closest("a, button, [data-cursor]");
    }
    function loop() {
      ringPos.x += (pos.x - ringPos.x) * 0.18;
      ringPos.y += (pos.y - ringPos.y) * 0.18;
      if (dot.current) dot.current.style.transform = `translate(${pos.x}px, ${pos.y}px)`;
      if (ring.current) {
        ring.current.style.transform = `translate(${ringPos.x}px, ${ringPos.y}px) scale(${hovering ? 1.8 : 1})`;
        ring.current.style.opacity = hovering ? "1" : "0.5";
      }
      raf = requestAnimationFrame(loop);
    }
    window.addEventListener("pointermove", onMove);
    raf = requestAnimationFrame(loop);
    document.body.style.cursor = "none";
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
      document.body.style.cursor = "";
    };
  }, []);

  return (
    <>
      <div
        ref={ring}
        className="pointer-events-none fixed left-0 top-0 z-[200] hidden h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border md:block"
        style={{ borderColor: "var(--accent)", marginLeft: -16, marginTop: -16, transition: "opacity 0.2s" }}
        aria-hidden
      />
      <div
        ref={dot}
        className="pointer-events-none fixed left-0 top-0 z-[200] hidden h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full md:block"
        style={{ background: "var(--accent)", marginLeft: -3, marginTop: -3 }}
        aria-hidden
      />
    </>
  );
}
