import { useEffect, useRef } from "react";

/**
 * Rotating wireframe icosahedron — a clean, technical geometric "core".
 * Hand-rolled 3D → 2D projection on 2D canvas. Lime edges, cyan vertices,
 * gentle pointer parallax. The shape-driven centerpiece of the redesign.
 */
const PHI = (1 + Math.sqrt(5)) / 2;
const RAW: [number, number, number][] = [
  [0, 1, PHI], [0, -1, PHI], [0, 1, -PHI], [0, -1, -PHI],
  [1, PHI, 0], [-1, PHI, 0], [1, -PHI, 0], [-1, -PHI, 0],
  [PHI, 0, 1], [-PHI, 0, 1], [PHI, 0, -1], [-PHI, 0, -1],
];
// normalize to unit-ish + compute edges (adjacent verts ~2 apart)
const VERTS = RAW.map(([x, y, z]) => { const l = Math.hypot(x, y, z); return [x / l, y / l, z / l] as [number, number, number]; });
const EDGES: [number, number][] = [];
for (let i = 0; i < RAW.length; i++)
  for (let j = i + 1; j < RAW.length; j++) {
    const d = Math.hypot(RAW[i][0] - RAW[j][0], RAW[i][1] - RAW[j][1], RAW[i][2] - RAW[j][2]);
    if (d < 2.1) EDGES.push([i, j]);
  }

export function WireframeCore({ className }: { className?: string }) {
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
    const target = { rx: -0.4, ry: 0 };
    const cur = { rx: -0.4, ry: 0 };

    function resize() {
      const p = canvas!.parentElement!;
      w = p.clientWidth; h = p.clientHeight;
      canvas!.width = w * dpr; canvas!.height = h * dpr;
      canvas!.style.width = w + "px"; canvas!.style.height = h + "px";
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      R = Math.min(w, h) * 0.34;
    }
    function onMove(e: PointerEvent) {
      const r = canvas!.getBoundingClientRect();
      target.ry = ((e.clientX - r.left) / r.width - 0.5) * 1.1;
      target.rx = -0.4 + ((e.clientY - r.top) / r.height - 0.5) * 0.8;
    }

    let raf = 0, t = 0;
    function frame() {
      t += 0.0045;
      cur.ry += (target.ry + t - cur.ry) * 0.06;
      cur.rx += (target.rx - cur.rx) * 0.06;
      const cx = Math.cos(cur.rx), sx = Math.sin(cur.rx), cy = Math.cos(cur.ry), sy = Math.sin(cur.ry);
      const proj = VERTS.map(([x, y, z]) => {
        // rotate Y then X
        let X = x * cy + z * sy, Z = -x * sy + z * cy, Y = y;
        const Y2 = Y * cx - Z * sx, Z2 = Y * sx + Z * cx;
        const persp = 2.6 / (2.6 - Z2);
        return { x: w / 2 + X * R * persp, y: h / 2 + Y2 * R * persp, z: Z2, s: persp };
      });
      ctx!.clearRect(0, 0, w, h);
      // edges
      for (const [a, b] of EDGES) {
        const pa = proj[a], pb = proj[b];
        const depth = (pa.z + pb.z) / 2;
        const op = 0.22 + (depth + 1) / 2 * 0.6;
        ctx!.strokeStyle = `rgba(206,255,46,${op.toFixed(3)})`;
        ctx!.lineWidth = 0.6 + (depth + 1) / 2 * 1.0;
        ctx!.beginPath(); ctx!.moveTo(pa.x, pa.y); ctx!.lineTo(pb.x, pb.y); ctx!.stroke();
      }
      // vertices
      for (const p of proj) {
        ctx!.fillStyle = p.z > 0 ? cyan : "rgba(54,224,255,0.4)";
        ctx!.beginPath(); ctx!.arc(p.x, p.y, 1.6 + p.s, 0, Math.PI * 2); ctx!.fill();
      }
      void lime;
      if (!reduce) raf = requestAnimationFrame(frame);
    }
    resize();
    frame();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onMove);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); window.removeEventListener("pointermove", onMove); };
  }, []);
  return <canvas ref={ref} className={className} aria-hidden />;
}
