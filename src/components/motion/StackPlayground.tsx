import { useEffect, useRef } from "react";
import { CAPABILITIES } from "@/data/content";

const ITEMS = [...new Set(CAPABILITIES.flatMap((g) => g.items))];
const clamp = (n: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, n));

type Chip = { el: HTMLElement; x: number; y: number; vx: number; vy: number; w: number; h: number };

/** Grab-and-throw physics sandbox of the tech stack. Fling chips; they bounce. */
export function StackPlayground() {
  const box = useRef<HTMLDivElement>(null);
  const chips = useRef<Chip[]>([]);
  const reduced = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    if (reduced) return;
    const wrap = box.current!;
    const W = () => wrap.clientWidth, H = () => wrap.clientHeight;
    const w0 = W(), h0 = H();
    chips.current.forEach((c) => {
      c.w = c.el.offsetWidth; c.h = c.el.offsetHeight;
      c.x = Math.random() * (w0 - c.w); c.y = Math.random() * (h0 - c.h);
      c.vx = (Math.random() - 0.5) * 2.4; c.vy = (Math.random() - 0.5) * 2.4;
    });
    const place = (c: Chip) => { c.el.style.transform = `translate(${c.x}px, ${c.y}px)`; };

    let drag = -1, raf = 0;
    const off = { x: 0, y: 0 }, last = { x: 0, y: 0 }, vel = { x: 0, y: 0 };

    const loop = () => {
      const w = W(), h = H();
      chips.current.forEach((c, i) => {
        if (i === drag) { place(c); return; }
        c.x += c.vx; c.y += c.vy; c.vx *= 0.99; c.vy *= 0.99;
        if (c.x < 0) { c.x = 0; c.vx = Math.abs(c.vx) * 0.7; }
        if (c.x > w - c.w) { c.x = w - c.w; c.vx = -Math.abs(c.vx) * 0.7; }
        if (c.y < 0) { c.y = 0; c.vy = Math.abs(c.vy) * 0.7; }
        if (c.y > h - c.h) { c.y = h - c.h; c.vy = -Math.abs(c.vy) * 0.7; }
        place(c);
      });
      raf = requestAnimationFrame(loop);
    };

    // per-chip pointer capture — robust drag/throw that tracks off-element
    const cleanups: Array<() => void> = [];
    chips.current.forEach((c, idx) => {
      const down = (e: PointerEvent) => {
        drag = idx;
        const r = wrap.getBoundingClientRect();
        off.x = e.clientX - r.left - c.x; off.y = e.clientY - r.top - c.y;
        last.x = e.clientX; last.y = e.clientY; vel.x = 0; vel.y = 0;
        c.vx = 0; c.vy = 0;
        c.el.style.zIndex = "20"; c.el.style.cursor = "grabbing";
        try { c.el.setPointerCapture(e.pointerId); } catch { /**/ }
        e.preventDefault();
      };
      const move = (e: PointerEvent) => {
        if (drag !== idx) return;
        const r = wrap.getBoundingClientRect();
        c.x = clamp(e.clientX - r.left - off.x, 0, W() - c.w);
        c.y = clamp(e.clientY - r.top - off.y, 0, H() - c.h);
        vel.x = e.clientX - last.x; vel.y = e.clientY - last.y;
        last.x = e.clientX; last.y = e.clientY;
      };
      const up = (e: PointerEvent) => {
        if (drag !== idx) return;
        drag = -1;
        c.vx = clamp(vel.x * 0.9, -34, 34); c.vy = clamp(vel.y * 0.9, -34, 34);
        c.el.style.zIndex = ""; c.el.style.cursor = "grab";
        try { c.el.releasePointerCapture(e.pointerId); } catch { /**/ }
      };
      c.el.addEventListener("pointerdown", down);
      c.el.addEventListener("pointermove", move);
      c.el.addEventListener("pointerup", up);
      c.el.addEventListener("pointercancel", up);
      cleanups.push(() => {
        c.el.removeEventListener("pointerdown", down);
        c.el.removeEventListener("pointermove", move);
        c.el.removeEventListener("pointerup", up);
        c.el.removeEventListener("pointercancel", up);
      });
    });

    loop();
    return () => { cancelAnimationFrame(raf); cleanups.forEach((fn) => fn()); };
  }, [reduced]);

  if (reduced) {
    return (
      <div className="flex flex-wrap gap-2">
        {ITEMS.map((it) => <span key={it} className="chip">{it}</span>)}
      </div>
    );
  }

  return (
    <div ref={box} className="relative overflow-hidden rounded-[4px] border" style={{ height: 400, borderColor: "var(--line-2)", background: "var(--surface)", touchAction: "none" }}>
      <span className="pointer-events-none absolute left-4 top-3 kicker" style={{ color: "var(--faint)", fontSize: "0.58rem" }}>grab &amp; throw — they bounce</span>
      {ITEMS.map((it, i) => (
        <span
          key={it}
          ref={(el) => { if (el) chips.current[i] = { el, x: 0, y: 0, vx: 0, vy: 0, w: 0, h: 0 }; }}
          className="absolute select-none rounded-full border px-3 py-1.5 font-mono text-[13px]"
          style={{ left: 0, top: 0, cursor: "grab", borderColor: "var(--line-2)", background: "var(--bg-2)", color: "var(--fg)", touchAction: "none", willChange: "transform" }}
        >
          {it}
        </span>
      ))}
    </div>
  );
}
