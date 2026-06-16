"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

const STEPS = 50;
const DUR = 2600;

/** Live diffusion readout that runs while the ASCII name denoises. */
export function GenHUD() {
  const prm = useReducedMotion();
  const [p, setP] = useState(prm ? 1 : 0);

  useEffect(() => {
    if (prm) return;
    const t0 = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const v = Math.min(1, (now - t0) / DUR);
      setP(v);
      if (v < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [prm]);

  const step = Math.round(p * STEPS);
  const sigma = (1 - p) * 0.9 + 0.01;
  const done = p >= 1;
  const tokens = Math.round(p * 1284);

  return (
    <div className="flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-[11px]" style={{ color: "var(--muted)" }}>
      <span className="inline-flex items-center gap-2">
        <span className="live-dot" style={{ background: done ? "var(--ok)" : "var(--accent)" }} />
        <span style={{ color: done ? "var(--ok)" : "var(--accent)" }}>
          {done ? "generation complete" : "denoising"}
        </span>
      </span>
      <span>step <span style={{ color: "var(--fg)" }} className="tabular-nums">{step}/{STEPS}</span></span>
      <span>σ=<span style={{ color: "var(--fg)" }} className="tabular-nums">{sigma.toFixed(2)}</span></span>
      <span>guidance <span style={{ color: "var(--fg)" }}>7.5</span></span>
      <span>{tokens.toLocaleString()} <span style={{ color: "var(--faint)" }}>tok</span></span>
      {/* progress rail */}
      <span className="relative h-px w-24 overflow-hidden" style={{ background: "var(--line)" }}>
        <span className="absolute inset-y-0 left-0" style={{ width: `${p * 100}%`, background: "var(--accent)" }} />
      </span>
    </div>
  );
}
