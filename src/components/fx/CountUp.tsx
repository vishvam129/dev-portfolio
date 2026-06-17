import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

/** Counts to a number when scrolled into view. */
export function CountUp({ to, decimals = 0, prefix = "", suffix = "", duration = 1400, className }: { to: number; decimals?: number; prefix?: string; suffix?: string; duration?: number; className?: string }) {
  const prm = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const [v, setV] = useState(prm ? to : 0);
  useEffect(() => {
    if (prm) return;
    const el = ref.current; if (!el) return;
    let raf = 0, t0 = 0;
    const io = new IntersectionObserver((es) => {
      if (!es[0].isIntersecting) return;
      io.disconnect();
      const step = (t: number) => { if (!t0) t0 = t; const p = Math.min(1, (t - t0) / duration); setV(to * (1 - Math.pow(1 - p, 3))); if (p < 1) raf = requestAnimationFrame(step); else setV(to); };
      raf = requestAnimationFrame(step);
    }, { threshold: 0.6 });
    io.observe(el);
    return () => { io.disconnect(); cancelAnimationFrame(raf); };
  }, [to, duration, prm]);
  return <span ref={ref} className={className}>{prefix}{v.toFixed(decimals)}{suffix}</span>;
}
