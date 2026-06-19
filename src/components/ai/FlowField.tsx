import { useEffect, useRef } from "react";

/**
 * Curl-noise flow field — thousands of particles tracing an evolving vector
 * field, leaving glowing lime strands. A computational, generative-art hero
 * (not a particle network). Pointer adds a swirl. Pure 2D canvas, renders
 * everywhere; degrades to a single static frame under reduced-motion.
 */
export function FlowField({ className }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const cs = getComputedStyle(canvas);
    const bg = cs.getPropertyValue("--bg").trim() || "#070709";
    const accent = cs.getPropertyValue("--accent").trim() || "#ceff2e";
    const ac = ((): { r: number; g: number; b: number } => {
      const m = accent.replace("#", "");
      const n = parseInt(m.length === 3 ? m.split("").map((c) => c + c).join("") : m, 16);
      return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
    })();

    let w = 0, h = 0;
    const dpr = Math.min(1.75, window.devicePixelRatio || 1);
    const pointer = { x: -9999, y: -9999, active: false };

    // cheap 2D value noise
    const hash = (x: number, y: number) => {
      const s = Math.sin(x * 127.1 + y * 311.7) * 43758.5453;
      return s - Math.floor(s);
    };
    const smooth = (t: number) => t * t * (3 - 2 * t);
    const noise = (x: number, y: number) => {
      const xi = Math.floor(x), yi = Math.floor(y);
      const xf = x - xi, yf = y - yi;
      const tl = hash(xi, yi), tr = hash(xi + 1, yi), bl = hash(xi, yi + 1), br = hash(xi + 1, yi + 1);
      const u = smooth(xf), v = smooth(yf);
      return (tl * (1 - u) + tr * u) * (1 - v) + (bl * (1 - u) + br * u) * v;
    };

    type P = { x: number; y: number; life: number };
    let parts: P[] = [];
    const reset = (p: P) => { p.x = Math.random() * w; p.y = Math.random() * h; p.life = 40 + Math.random() * 120; };

    function resize() {
      const parent = canvas!.parentElement!;
      w = parent.clientWidth; h = parent.clientHeight;
      canvas!.width = w * dpr; canvas!.height = h * dpr;
      canvas!.style.width = w + "px"; canvas!.style.height = h + "px";
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx!.fillStyle = bg; ctx!.fillRect(0, 0, w, h);
      const n = Math.min(2400, Math.floor((w * h) / 700));
      parts = Array.from({ length: n }, () => { const p = { x: 0, y: 0, life: 0 }; reset(p); return p; });
    }

    // click shockwaves the user can fire into the field
    const ripples: { x: number; y: number; age: number }[] = [];

    let raf = 0;
    let t = 0;
    const SCALE = 0.0016;
    function frame() {
      t += 0.0015;
      // advance ripples (expanding rings); drop finished
      for (const rp of ripples) rp.age += 0.018;
      for (let k = ripples.length - 1; k >= 0; k--) if (ripples[k].age > 1) ripples.splice(k, 1);
      // fade previous frame toward bg (leaves glowing trails)
      ctx!.fillStyle = "rgba(7,7,9,0.04)";
      ctx!.fillRect(0, 0, w, h);
      ctx!.lineWidth = 1.15;
      for (const p of parts) {
        const a = noise(p.x * SCALE, p.y * SCALE + t) * Math.PI * 4;
        let vx = Math.cos(a), vy = Math.sin(a);
        // pointer swirl
        if (pointer.active) {
          const dx = p.x - pointer.x, dy = p.y - pointer.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < 200 * 200) {
            const d = Math.sqrt(d2) || 1;
            const f = (200 - d) / 200;
            vx += (-dy / d) * f * 2.2;
            vy += (dx / d) * f * 2.2;
          }
        }
        // click shockwaves push particles out along an expanding ring
        for (const rp of ripples) {
          const dx = p.x - rp.x, dy = p.y - rp.y;
          const d = Math.hypot(dx, dy) || 1;
          const ring = rp.age * 520;
          const band = Math.exp(-(((d - ring) / 46) ** 2));
          const force = band * (1 - rp.age) * 7;
          vx += (dx / d) * force;
          vy += (dy / d) * force;
        }
        const nx = p.x + vx * 1.25, ny = p.y + vy * 1.25;
        const speed = Math.min(1, Math.hypot(vx, vy) / 3);
        const alpha = 0.06 + speed * 0.36;
        ctx!.strokeStyle = `rgba(${ac.r},${ac.g},${ac.b},${alpha.toFixed(3)})`;
        ctx!.beginPath(); ctx!.moveTo(p.x, p.y); ctx!.lineTo(nx, ny); ctx!.stroke();
        p.x = nx; p.y = ny; p.life -= 1;
        if (p.life <= 0 || p.x < 0 || p.x > w || p.y < 0 || p.y > h) reset(p);
      }
      if (!reduce) raf = requestAnimationFrame(frame);
    }

    const move = (e: PointerEvent) => {
      const r = canvas!.getBoundingClientRect();
      pointer.x = e.clientX - r.left; pointer.y = e.clientY - r.top; pointer.active = true;
    };
    const leave = () => { pointer.active = false; };
    const down = (e: PointerEvent) => {
      const r = canvas!.getBoundingClientRect();
      const x = e.clientX - r.left, y = e.clientY - r.top;
      if (x < 0 || y < 0 || x > w || y > h) return; // only over the field
      ripples.push({ x, y, age: 0 });
      if (ripples.length > 6) ripples.shift();
    };

    resize();
    if (reduce) { for (let i = 0; i < 220; i++) frame(); } else { raf = requestAnimationFrame(frame); }
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerleave", leave);
    window.addEventListener("pointerdown", down);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerleave", leave);
      window.removeEventListener("pointerdown", down);
    };
  }, []);

  return <canvas ref={ref} className={className} aria-hidden />;
}
