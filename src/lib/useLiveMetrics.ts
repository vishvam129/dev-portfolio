import { useEffect, useRef, useState } from "react";

export type Metric = { key: string; label: string; unit: string; val: number; base: number; hist: number[] };

const SEED: Omit<Metric, "hist">[] = [
  { key: "rps", label: "requests / s", unit: "", val: 1240, base: 1240 },
  { key: "p99", label: "p99 latency", unit: "ms", val: 84, base: 84 },
  { key: "err", label: "error rate", unit: "%", val: 0.02, base: 0.02 },
  { key: "conn", label: "open conns", unit: "", val: 318, base: 318 },
];

function jitter(base: number, key: string) {
  const r = (Math.random() - 0.5) * 2;
  if (key === "err") return Math.max(0, +(base + r * 0.03).toFixed(3));
  if (key === "p99") return Math.round(base + r * 11);
  if (key === "rps") return Math.round(base + r * 140);
  return Math.round(base + r * 26);
}

/** Live service metrics — gently jitter around a baseline, keeping a short history for sparklines. */
export function useLiveMetrics(every = 1300) {
  const [m, setM] = useState<Metric[]>(() => SEED.map((s) => ({ ...s, hist: Array.from({ length: 24 }, () => s.base) })));
  const reduced = useRef(false);
  useEffect(() => {
    reduced.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced.current) return;
    const id = setInterval(() => {
      setM((prev) => prev.map((x) => {
        const v = jitter(x.base, x.key);
        return { ...x, val: v, hist: [...x.hist.slice(-23), v] };
      }));
    }, every);
    return () => clearInterval(id);
  }, [every]);
  return m;
}
