"use client";

import { useEffect, useRef } from "react";

/**
 * "Latent space" — drifting embedding nodes with proximity-linked edges and
 * pointer repulsion. Hand-rolled 2D canvas (no WebGL compile risk, renders
 * everywhere). Themed via --accent. The AI hero's living background.
 */
export function LatentField({ className }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let w = 0, h = 0, dpr = Math.min(2, window.devicePixelRatio || 1);
    const accent = getComputedStyle(canvas).getPropertyValue("--accent").trim() || "#8b8bff";

    type Node = { x: number; y: number; vx: number; vy: number; r: number };
    let nodes: Node[] = [];
    const pointer = { x: -9999, y: -9999 };

    function resize() {
      const parent = canvas!.parentElement!;
      w = parent.clientWidth;
      h = parent.clientHeight;
      canvas!.width = w * dpr;
      canvas!.height = h * dpr;
      canvas!.style.width = w + "px";
      canvas!.style.height = h + "px";
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.min(120, Math.floor((w * h) / 11000));
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.22,
        vy: (Math.random() - 0.5) * 0.22,
        r: Math.random() * 1.4 + 0.6,
      }));
    }

    function hexToRgb(hex: string) {
      const m = hex.replace("#", "");
      const n = parseInt(m.length === 3 ? m.split("").map((c) => c + c).join("") : m, 16);
      return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
    }
    const c = hexToRgb(accent);

    let raf = 0;
    function frame() {
      ctx!.clearRect(0, 0, w, h);
      const LINK = 116;
      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > w) n.vx *= -1;
        if (n.y < 0 || n.y > h) n.vy *= -1;
        // pointer repulsion
        const dx = n.x - pointer.x;
        const dy = n.y - pointer.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < 120 * 120) {
          const d = Math.sqrt(d2) || 1;
          const f = (120 - d) / 120 * 0.9;
          n.x += (dx / d) * f;
          n.y += (dy / d) * f;
        }
      }
      // edges
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i], b = nodes[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const d = Math.hypot(dx, dy);
          if (d < LINK) {
            const o = (1 - d / LINK) * 0.5;
            ctx!.strokeStyle = `rgba(${c.r},${c.g},${c.b},${o.toFixed(3)})`;
            ctx!.lineWidth = 0.6;
            ctx!.beginPath();
            ctx!.moveTo(a.x, a.y);
            ctx!.lineTo(b.x, b.y);
            ctx!.stroke();
          }
        }
      }
      // nodes
      for (const n of nodes) {
        ctx!.fillStyle = `rgba(${c.r},${c.g},${c.b},0.85)`;
        ctx!.beginPath();
        ctx!.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx!.fill();
      }
      if (!reduce) raf = requestAnimationFrame(frame);
    }

    function onMove(e: PointerEvent) {
      const r = canvas!.getBoundingClientRect();
      pointer.x = e.clientX - r.left;
      pointer.y = e.clientY - r.top;
    }
    function onLeave() { pointer.x = -9999; pointer.y = -9999; }

    resize();
    frame();
    if (reduce) frame(); // one static paint
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return <canvas ref={ref} className={className} aria-hidden />;
}
