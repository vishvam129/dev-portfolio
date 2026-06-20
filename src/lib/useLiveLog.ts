import { useEffect, useRef, useState } from "react";

export type LogLine = { t: string; level: "INFO" | "WARN" | "ERR"; svc: string; msg: string };

const POOL: Omit<LogLine, "t">[] = [
  { level: "INFO", svc: "auth-api", msg: "GET /projects 200 · 12ms" },
  { level: "INFO", svc: "auth-api", msg: "auth.verify_jwt ok · sub=vishvam" },
  { level: "INFO", svc: "gateway", msg: "route /v1/instances → auth-api" },
  { level: "INFO", svc: "gpu-queue", msg: "celery task gpu.infer queued · id=7Q2" },
  { level: "INFO", svc: "redis", msg: "LPUSH gpu · depth=3" },
  { level: "INFO", svc: "postgres", msg: "pool.acquire 2ms · SELECT instance" },
  { level: "INFO", svc: "payments", msg: "stripe webhook charge.succeeded 200" },
  { level: "INFO", svc: "signaling", msg: "ICE candidate relayed · peer=b21" },
  { level: "INFO", svc: "k8s", msg: "readiness probe passed · auth-api-7d9" },
  { level: "WARN", svc: "gpu-queue", msg: "queue depth 14 · applying backpressure" },
  { level: "INFO", svc: "gpu-queue", msg: "worker drained 6 jobs · depth=2" },
  { level: "INFO", svc: "auth-api", msg: "refresh token rotated · cross-subdomain" },
  { level: "ERR", svc: "payments", msg: "idempotency replay blocked · safe" },
  { level: "INFO", svc: "k8s", msg: "rollout auth-api ready · 3/3" },
  { level: "INFO", svc: "engine", msg: "draft-instance provisioned · 1.2s" },
];

function stamp(d: number) {
  const dt = new Date(d);
  const p = (n: number, l = 2) => String(n).padStart(l, "0");
  return `${p(dt.getHours())}:${p(dt.getMinutes())}:${p(dt.getSeconds())}.${p(dt.getMilliseconds(), 3)}`;
}

/** Streaming backend log — appends a plausible line on an interval. */
export function useLiveLog(max = 60, every = 750) {
  const [lines, setLines] = useState<LogLine[]>([]);
  const i = useRef(0);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setLines(POOL.slice(0, 12).map((p, k) => ({ ...p, t: stamp(Date.now() - k * 800) })));
      return;
    }
    // seed a few so it isn't empty
    setLines(POOL.slice(0, 6).map((p, k) => ({ ...p, t: stamp(Date.now() - (6 - k) * 800) })));
    const id = setInterval(() => {
      i.current = (i.current + 1 + Math.floor(Math.random() * 3)) % POOL.length;
      const next = { ...POOL[i.current], t: stamp(Date.now()) };
      setLines((l) => [...l.slice(-(max - 1)), next]);
    }, every);
    return () => clearInterval(id);
  }, [max, every]);
  return lines;
}
