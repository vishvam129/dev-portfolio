import { useEffect, useRef } from "react";
import { coreBus, type CoreState } from "@/lib/coreBus";

/**
 * Rotating wireframe icosahedron — a clean, technical geometric "core".
 * Hand-rolled 3D → 2D projection on 2D canvas. Lime edges, cyan vertices,
 * gentle pointer parallax. The shape-driven centerpiece of the redesign.
 */
// Hexagonal crystal: outer hex bipyramid + apexes + an inner (rotated) hex core
// with spokes. Reads unmistakably hexagonal while spinning in 3D.
const OUTER = 0.84, APEX = 1.0, INNER = 0.42;
const VERTS: [number, number, number][] = [];
const EDGES: [number, number][] = [];
for (let i = 0; i < 6; i++) { const a = (i * Math.PI) / 3; VERTS.push([Math.cos(a) * OUTER, 0, Math.sin(a) * OUTER]); } // 0..5 outer hex
VERTS.push([0, APEX, 0]);   // 6 top apex
VERTS.push([0, -APEX, 0]);  // 7 bottom apex
for (let i = 0; i < 6; i++) { const a = (i * Math.PI) / 3 + Math.PI / 6; VERTS.push([Math.cos(a) * INNER, 0, Math.sin(a) * INNER]); } // 8..13 inner hex
for (let i = 0; i < 6; i++) {
  EDGES.push([i, (i + 1) % 6]);            // outer hexagon
  EDGES.push([i, 6]);                       // to top apex
  EDGES.push([i, 7]);                       // to bottom apex
  EDGES.push([8 + i, 8 + ((i + 1) % 6)]);  // inner hexagon
  EDGES.push([8 + i, i]);                   // spoke inner → outer
}

export function WireframeCore({ className, interactive = false }: { className?: string; interactive?: boolean }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const cs = getComputedStyle(canvas);
    const lime = cs.getPropertyValue("--accent").trim() || "#ceff2e";
    const cyan = cs.getPropertyValue("--accent-2").trim() || "#36e0ff";

    let w = 0, h = 0, R = 0;
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    const cur = { rx: -0.4, ry: 0 };   // current rotation
    const vel = { rx: 0, ry: 0 };       // angular velocity (drag inertia)
    let dragging = false, lastX = 0, lastY = 0;
    if (interactive) canvas.style.cursor = "grab";

    function resize() {
      const p = canvas!.parentElement!;
      w = p.clientWidth; h = p.clientHeight;
      canvas!.width = w * dpr; canvas!.height = h * dpr;
      canvas!.style.width = w + "px"; canvas!.style.height = h + "px";
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      R = Math.min(w, h) * 0.34;
    }
    function inBounds(e: PointerEvent) {
      const r = canvas!.getBoundingClientRect();
      return e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom;
    }
    function onDown(e: PointerEvent) {
      if (!interactive || !inBounds(e)) return;
      dragging = true; lastX = e.clientX; lastY = e.clientY;
      canvas!.style.cursor = "grabbing";
    }
    function onDrag(e: PointerEvent) {
      if (!dragging) return;
      const dx = e.clientX - lastX, dy = e.clientY - lastY;
      lastX = e.clientX; lastY = e.clientY;
      cur.ry += dx * 0.015; cur.rx += -dy * 0.015;
      vel.ry = dx * 0.015; vel.rx = -dy * 0.015;
    }
    function onUp() { if (dragging) { dragging = false; canvas!.style.cursor = "grab"; } }

    // react to the live model state (see lib/coreBus)
    let coreState: CoreState = "loading";
    let flash = 0;
    const unsub = coreBus.subscribe((s) => { coreState = s; if (s === "fire") flash = 1; });

    let raf = 0, t = 0;
    function frame() {
      // spin speed reflects what the model is doing
      const spin = coreState === "thinking" ? 0.02 : coreState === "loading" ? 0.009 : 0.0045;
      t += spin;
      flash *= 0.94;
      const energy = (coreState === "thinking" ? 0.35 : coreState === "loading" ? 0.18 : 0) + flash * 0.6;
      // gentle breathing pulse while loading/thinking
      const pulse = coreState === "idle" ? 1 : 1 + Math.sin(t * (coreState === "thinking" ? 9 : 5)) * 0.04;

      if (!dragging) {
        // tumble on TWO axes so rotation is clearly visible (a hexagon spun on its
        // own axis looks static due to 6-fold symmetry); plus drag inertia
        cur.ry += vel.ry + spin;
        cur.rx += vel.rx + spin * 0.42;
        vel.ry *= 0.95; vel.rx *= 0.95;
      }
      const cx = Math.cos(cur.rx), sx = Math.sin(cur.rx), cy = Math.cos(cur.ry), sy = Math.sin(cur.ry);
      const proj = VERTS.map(([x, y, z]) => {
        let X = x * cy + z * sy, Z = -x * sy + z * cy, Y = y;
        const Y2 = Y * cx - Z * sx, Z2 = Y * sx + Z * cx;
        const persp = 2.6 / (2.6 - Z2);
        return { x: w / 2 + X * R * persp * pulse, y: h / 2 + Y2 * R * persp * pulse, z: Z2, s: persp };
      });
      ctx!.clearRect(0, 0, w, h);
      ctx!.shadowColor = "rgba(206,255,46,0.8)";
      ctx!.shadowBlur = energy * 14;
      for (const [a, b] of EDGES) {
        const pa = proj[a], pb = proj[b];
        const depth = (pa.z + pb.z) / 2;
        const op = Math.min(1, 0.22 + (depth + 1) / 2 * 0.6 + energy);
        ctx!.strokeStyle = `rgba(206,255,46,${op.toFixed(3)})`;
        ctx!.lineWidth = 0.6 + (depth + 1) / 2 * 1.0 + flash * 1.2;
        ctx!.beginPath(); ctx!.moveTo(pa.x, pa.y); ctx!.lineTo(pb.x, pb.y); ctx!.stroke();
      }
      ctx!.shadowBlur = 0;
      for (const p of proj) {
        ctx!.fillStyle = p.z > 0 || flash > 0.2 ? cyan : "rgba(78,230,255,0.4)";
        ctx!.beginPath(); ctx!.arc(p.x, p.y, 1.6 + p.s + flash * 2, 0, Math.PI * 2); ctx!.fill();
      }
      void lime;
      if (!reduce) raf = requestAnimationFrame(frame);
    }
    resize();
    frame();
    window.addEventListener("resize", resize);
    if (interactive) {
      window.addEventListener("pointerdown", onDown);
      window.addEventListener("pointermove", onDrag);
      window.addEventListener("pointerup", onUp);
    }
    return () => {
      cancelAnimationFrame(raf); unsub();
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointermove", onDrag);
      window.removeEventListener("pointerup", onUp);
    };
  }, [interactive]);
  return <canvas ref={ref} className={className} aria-hidden />;
}
