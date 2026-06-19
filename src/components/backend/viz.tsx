// Small observability primitives: status dot, uptime bars, sparkline, latency badge.

export function StatusDot({ status }: { status: "ok" | "warn" | "err" }) {
  const c = status === "ok" ? "var(--ok)" : status === "warn" ? "var(--warn)" : "var(--err)";
  return <span className={status === "ok" ? "sdot sdot-ok" : "sdot"} style={{ background: c }} />;
}

// deterministic pseudo-random from a string seed
function rng(seed: string) {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) { h ^= seed.charCodeAt(i); h = Math.imul(h, 16777619); }
  return () => { h += 0x6d2b79f5; let t = h; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
}

/** 90-cell uptime calendar — mostly healthy, a couple incidents per seed. */
export function UptimeBars({ seed, bad = 1 }: { seed: string; bad?: number }) {
  const r = rng(seed);
  const cells = Array.from({ length: 60 }, () => r());
  const badIdx = new Set<number>();
  for (let i = 0; i < bad; i++) badIdx.add(Math.floor(r() * 56) + 2);
  return (
    <div className="flex items-end gap-[2px]" aria-hidden>
      {cells.map((v, i) => {
        const isBad = badIdx.has(i);
        const isWarn = !isBad && v > 0.96;
        const col = isBad ? "var(--err)" : isWarn ? "var(--warn)" : "var(--ok)";
        return <span key={i} className="w-full rounded-[1px]" style={{ height: isBad ? 7 : 14, background: col, opacity: isBad ? 1 : 0.55 }} />;
      })}
    </div>
  );
}

/** SVG sparkline that draws itself in on mount. */
export function Sparkline({ seed, color = "var(--accent-2)", w = 120, h = 30 }: { seed: string; color?: string; w?: number; h?: number }) {
  const r = rng(seed);
  const n = 24;
  const pts = Array.from({ length: n }, (_, i) => {
    const base = 0.5 + Math.sin(i * 0.6) * 0.12;
    return base + (r() - 0.5) * 0.4;
  });
  const max = Math.max(...pts), min = Math.min(...pts);
  const path = pts.map((v, i) => {
    const x = (i / (n - 1)) * w;
    const y = h - ((v - min) / (max - min || 1)) * (h - 4) - 2;
    return `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(" ");
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full" style={{ height: h }} aria-hidden>
      <path d={`${path} L${w},${h} L0,${h} Z`} fill={color} opacity="0.08" />
      <path d={path} fill="none" stroke={color} strokeWidth="1.4" strokeLinecap="round"
        strokeDasharray="600" strokeDashoffset="600" style={{ animation: "draw 1.4s ease-out forwards" }} />
    </svg>
  );
}

export function LatencyBadge({ label, ms }: { label: string; ms: number }) {
  const col = ms < 80 ? "var(--ok)" : ms < 800 ? "var(--warn)" : "var(--err)";
  return (
    <span className="inline-flex items-baseline gap-1 rounded border px-1.5 py-0.5 font-mono text-[10px]" style={{ borderColor: "var(--line-2)" }}>
      <span style={{ color: "var(--faint)" }}>{label}</span>
      <span className="tnum" style={{ color: col }}>{ms}ms</span>
    </span>
  );
}
