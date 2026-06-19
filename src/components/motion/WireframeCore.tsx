import { useEffect, useRef } from "react";
import { coreBus, type CoreState } from "@/lib/coreBus";

/**
 * Faceted hexagonal step-cut crystal — translucent depth-sorted facets with
 * glowing edges ("stained-glass" gem look). Hand-rolled 3D → 2D. Drag to orbit
 * (inertia); reacts to the on-device model (warms while loading, fires on answer).
 */

// concentric hexagon rings (emerald/step cut): table → crown → girdle → pavilion → culet
const RINGS = [
  { y: 0.86, r: 0.40 },   // 0 table
  { y: 0.55, r: 0.66 },   // 1 crown step
  { y: 0.22, r: 0.88 },   // 2 girdle (widest)
  { y: -0.34, r: 0.56 },  // 3 pavilion step
];
const VERTS: [number, number, number][] = [];
for (const { y, r } of RINGS) for (let i = 0; i < 6; i++) { const a = (i * Math.PI) / 3; VERTS.push([Math.cos(a) * r, y, Math.sin(a) * r]); }
const CULET = VERTS.length;
VERTS.push([0, -0.96, 0]);

const FACES: number[][] = [];
FACES.push([0, 1, 2, 3, 4, 5]);                 // table (top hexagon)
for (let band = 0; band < 3; band++) {           // crown / girdle / pavilion bands
  const a0 = band * 6, b0 = (band + 1) * 6;
  for (let i = 0; i < 6; i++) { const j = (i + 1) % 6; FACES.push([a0 + i, a0 + j, b0 + j, b0 + i]); }
}
const P3 = 18;
for (let i = 0; i < 6; i++) { const j = (i + 1) % 6; FACES.push([P3 + i, P3 + j, CULET]); } // pavilion → culet

export function WireframeCore({ className, interactive = false }: { className?: string; interactive?: boolean }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let w = 0, h = 0, R = 0;
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    const cur = { rx: -0.42, ry: 0 };
    const vel = { rx: 0, ry: 0 };
    let dragging = false, lastX = 0, lastY = 0;
    if (interactive) { canvas.style.cursor = "grab"; canvas.style.touchAction = "none"; }

    function resize() {
      const p = canvas!.parentElement!;
      w = p.clientWidth; h = p.clientHeight;
      canvas!.width = w * dpr; canvas!.height = h * dpr;
      canvas!.style.width = w + "px"; canvas!.style.height = h + "px";
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      R = Math.min(w, h) * 0.36;
    }
    function onDown(e: PointerEvent) { dragging = true; lastX = e.clientX; lastY = e.clientY; canvas!.style.cursor = "grabbing"; try { canvas!.setPointerCapture(e.pointerId); } catch { /**/ } e.preventDefault(); }
    function onDrag(e: PointerEvent) {
      if (!dragging) return;
      const dx = e.clientX - lastX, dy = e.clientY - lastY; lastX = e.clientX; lastY = e.clientY;
      cur.ry += dx * 0.016; cur.rx += -dy * 0.016; vel.ry = dx * 0.016; vel.rx = -dy * 0.016;
    }
    function onUp(e: PointerEvent) { if (!dragging) return; dragging = false; canvas!.style.cursor = "grab"; try { canvas!.releasePointerCapture(e.pointerId); } catch { /**/ } }

    let coreState: CoreState = "loading";
    let flash = 0;
    const unsub = coreBus.subscribe((s) => { coreState = s; if (s === "fire") flash = 1; });

    let raf = 0, t = 0;
    function frame() {
      const spin = reduce ? 0 : coreState === "thinking" ? 0.018 : coreState === "loading" ? 0.008 : 0.004;
      t += spin || 0.004;
      flash *= 0.94;
      const energy = (coreState === "thinking" ? 0.3 : coreState === "loading" ? 0.16 : 0) + flash * 0.6;
      const pulse = coreState === "idle" ? 1 : 1 + Math.sin(t * (coreState === "thinking" ? 9 : 5)) * 0.035;

      if (!dragging) {
        cur.ry += vel.ry + spin;
        cur.rx += vel.rx + spin * 0.4;
        vel.ry *= 0.95; vel.rx *= 0.95;
      }
      const cx = Math.cos(cur.rx), sx = Math.sin(cur.rx), cy = Math.cos(cur.ry), sy = Math.sin(cur.ry);
      const proj = VERTS.map(([x, y, z]) => {
        const X = x * cy + z * sy, Z = -x * sy + z * cy;
        const Y2 = y * cx - Z * sx, Z2 = y * sx + Z * cx;
        const persp = 2.7 / (2.7 - Z2);
        return { x: w / 2 + X * R * persp * pulse, y: h / 2 + Y2 * R * persp * pulse, z: Z2 };
      });

      // depth-sort facets back → front for translucent glass look
      const order = FACES.map((f, i) => ({ i, z: f.reduce((s, vi) => s + proj[vi].z, 0) / f.length }))
        .sort((a, b) => a.z - b.z);

      ctx!.clearRect(0, 0, w, h);
      ctx!.lineJoin = "round";
      for (const { i, z } of order) {
        const f = FACES[i];
        const front = Math.max(0, Math.min(1, (z + 1) / 2)); // 0 (back) → 1 (front)
        ctx!.beginPath();
        f.forEach((vi, k) => { const p = proj[vi]; if (k === 0) ctx!.moveTo(p.x, p.y); else ctx!.lineTo(p.x, p.y); });
        ctx!.closePath();
        // translucent fill (brighter toward the front + when the model is active)
        ctx!.fillStyle = `rgba(206,255,46,${(0.03 + front * 0.10 + energy * 0.12 + flash * 0.2).toFixed(3)})`;
        ctx!.fill();
        // glowing edges
        ctx!.shadowColor = "rgba(206,255,46,0.7)";
        ctx!.shadowBlur = (front * 4 + energy * 14);
        ctx!.strokeStyle = `rgba(206,255,46,${(0.18 + front * 0.5 + energy * 0.4 + flash * 0.5).toFixed(3)})`;
        ctx!.lineWidth = 0.6 + front * 0.8 + flash * 1.4;
        ctx!.stroke();
        ctx!.shadowBlur = 0;
      }
      // cyan vertex sparks on the front
      for (const p of proj) if (p.z > 0.25) {
        ctx!.fillStyle = "rgba(78,230,255,0.9)";
        ctx!.beginPath(); ctx!.arc(p.x, p.y, 1.3 + flash * 2, 0, Math.PI * 2); ctx!.fill();
      }
      raf = requestAnimationFrame(frame);
    }

    resize();
    frame();
    window.addEventListener("resize", resize);
    if (interactive) {
      canvas.addEventListener("pointerdown", onDown);
      canvas.addEventListener("pointermove", onDrag);
      canvas.addEventListener("pointerup", onUp);
      canvas.addEventListener("pointercancel", onUp);
    }
    return () => {
      cancelAnimationFrame(raf); unsub();
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("pointerdown", onDown);
      canvas.removeEventListener("pointermove", onDrag);
      canvas.removeEventListener("pointerup", onUp);
      canvas.removeEventListener("pointercancel", onUp);
    };
  }, [interactive]);
  return <canvas ref={ref} className={className} aria-hidden />;
}
