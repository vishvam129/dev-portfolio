import { useEffect, useRef } from "react";
import { CAPABILITIES } from "@/data/content";

const ITEMS = [...new Set(CAPABILITIES.flatMap((g) => g.items))];
const clamp = (n: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, n));

type Chip = { el: HTMLElement; x: number; y: number; vx: number; vy: number; w: number; h: number };

/** Tech-stack physics toy: starts in tidy rows; grab & throw; chips bounce and
 *  collide; "reset" re-tidies. */
export function StackPlayground() {
  const box = useRef<HTMLDivElement>(null);
  const chips = useRef<Chip[]>([]);
  const resetRef = useRef<() => void>(() => {});

  useEffect(() => {
    const wrap = box.current!;
    const W = () => wrap.clientWidth, H = () => wrap.clientHeight;
    const GAP = 10, PAD = 18;

    // tidy, centered, wrapped rows — the clean starting arrangement
    function layout() {
      const w = W(), h = H();
      chips.current.forEach((c) => { c.w = c.el.offsetWidth; c.h = c.el.offsetHeight; c.vx = 0; c.vy = 0; });
      const rows: Chip[][] = []; let row: Chip[] = []; let rw = 0;
      for (const c of chips.current) {
        if (rw + c.w > w - PAD * 2 && row.length) { rows.push(row); row = []; rw = 0; }
        row.push(c); rw += c.w + GAP;
      }
      if (row.length) rows.push(row);
      const rowH = (chips.current[0]?.h ?? 30) + GAP;
      let y = (h - (rows.length * rowH - GAP)) / 2;
      for (const r of rows) {
        const totalW = r.reduce((s, c) => s + c.w + GAP, -GAP);
        let x = (w - totalW) / 2;
        for (const c of r) { c.x = x; c.y = y; place(c); x += c.w + GAP; }
        y += rowH;
      }
    }
    const place = (c: Chip) => { c.el.style.transform = `translate(${c.x}px, ${c.y}px)`; };
    resetRef.current = layout;

    let drag = -1, raf = 0;
    const off = { x: 0, y: 0 }, last = { x: 0, y: 0 }, vel = { x: 0, y: 0 };

    const loop = () => {
      const w = W(), h = H(), n = chips.current.length;
      for (let i = 0; i < n; i++) {
        const c = chips.current[i];
        if (i === drag) { place(c); continue; }
        c.x += c.vx; c.y += c.vy; c.vx *= 0.985; c.vy *= 0.985;
        if (Math.abs(c.vx) < 0.02) c.vx = 0;
        if (Math.abs(c.vy) < 0.02) c.vy = 0;
        if (c.x < 0) { c.x = 0; c.vx = Math.abs(c.vx) * 0.7; }
        if (c.x > w - c.w) { c.x = w - c.w; c.vx = -Math.abs(c.vx) * 0.7; }
        if (c.y < 0) { c.y = 0; c.vy = Math.abs(c.vy) * 0.7; }
        if (c.y > h - c.h) { c.y = h - c.h; c.vy = -Math.abs(c.vy) * 0.7; }
      }
      // gentle chip-to-chip separation (soft collisions)
      for (let i = 0; i < n; i++) for (let j = i + 1; j < n; j++) {
        const a = chips.current[i], b = chips.current[j];
        const ox = Math.min(a.x + a.w, b.x + b.w) - Math.max(a.x, b.x);
        const oy = Math.min(a.y + a.h, b.y + b.h) - Math.max(a.y, b.y);
        if (ox <= 0 || oy <= 0) continue;
        const ai = i === drag, bj = j === drag;
        if (ox < oy) {
          const dir = (a.x + a.w / 2) <= (b.x + b.w / 2) ? -1 : 1;
          const p = ox / 2;
          if (!ai) { a.x += dir * p; a.vx += dir * p * 0.25; }
          if (!bj) { b.x -= dir * p; b.vx -= dir * p * 0.25; }
        } else {
          const dir = (a.y + a.h / 2) <= (b.y + b.h / 2) ? -1 : 1;
          const p = oy / 2;
          if (!ai) { a.y += dir * p; a.vy += dir * p * 0.25; }
          if (!bj) { b.y -= dir * p; b.vy -= dir * p * 0.25; }
        }
      }
      for (let i = 0; i < n; i++) if (i !== drag) place(chips.current[i]);
      raf = requestAnimationFrame(loop);
    };

    const cleanups: Array<() => void> = [];
    chips.current.forEach((c, idx) => {
      const down = (e: PointerEvent) => {
        drag = idx; const r = wrap.getBoundingClientRect();
        off.x = e.clientX - r.left - c.x; off.y = e.clientY - r.top - c.y;
        last.x = e.clientX; last.y = e.clientY; vel.x = 0; vel.y = 0; c.vx = 0; c.vy = 0;
        c.el.style.zIndex = "30"; c.el.style.cursor = "grabbing";
        try { c.el.setPointerCapture(e.pointerId); } catch { /**/ }
        e.preventDefault();
      };
      const move = (e: PointerEvent) => {
        if (drag !== idx) return; const r = wrap.getBoundingClientRect();
        c.x = clamp(e.clientX - r.left - off.x, 0, W() - c.w);
        c.y = clamp(e.clientY - r.top - off.y, 0, H() - c.h);
        vel.x = e.clientX - last.x; vel.y = e.clientY - last.y; last.x = e.clientX; last.y = e.clientY;
      };
      const up = (e: PointerEvent) => {
        if (drag !== idx) return; drag = -1;
        c.vx = clamp(vel.x * 0.9, -36, 36); c.vy = clamp(vel.y * 0.9, -36, 36);
        c.el.style.zIndex = ""; c.el.style.cursor = "grab";
        try { c.el.releasePointerCapture(e.pointerId); } catch { /**/ }
      };
      c.el.addEventListener("pointerdown", down);
      c.el.addEventListener("pointermove", move);
      c.el.addEventListener("pointerup", up);
      c.el.addEventListener("pointercancel", up);
      cleanups.push(() => {
        c.el.removeEventListener("pointerdown", down); c.el.removeEventListener("pointermove", move);
        c.el.removeEventListener("pointerup", up); c.el.removeEventListener("pointercancel", up);
      });
    });

    layout();
    const onResize = () => layout();
    window.addEventListener("resize", onResize);
    loop(); // always run so drags repaint (chips start at rest — no autonomous motion)
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", onResize); cleanups.forEach((fn) => fn()); };
  }, []);

  return (
    <div ref={box} className="relative overflow-hidden rounded-[4px] border" style={{ height: 400, borderColor: "var(--line-2)", background: "var(--surface)", touchAction: "pan-y" }}>
      <span className="pointer-events-none absolute left-4 top-3 kicker" style={{ color: "var(--faint)", fontSize: "0.58rem" }}>grab &amp; throw</span>
      <button onClick={() => resetRef.current()} className="absolute right-3 top-2.5 z-[40] rounded-full border px-2.5 py-1 font-mono text-[11px] transition-colors hover:opacity-80"
        style={{ borderColor: "var(--line-2)", background: "var(--bg-2)", color: "var(--accent)" }}>↺ reset</button>
      {ITEMS.map((it, i) => (
        <span
          key={it}
          ref={(el) => { if (el) chips.current[i] = { el, x: 0, y: 0, vx: 0, vy: 0, w: 0, h: 0 }; }}
          className="absolute rounded-full border px-3 py-1.5 font-mono text-[13px]"
          style={{ left: 0, top: 0, cursor: "grab", userSelect: "none", WebkitUserSelect: "none", borderColor: "var(--line-2)", background: "var(--bg-2)", color: "var(--fg)", touchAction: "none", willChange: "transform" }}
        >
          {it}
        </span>
      ))}
    </div>
  );
}
