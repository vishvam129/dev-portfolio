"use client";

import { useEffect, useState } from "react";
import { Scramble } from "@/components/primitives/Scramble";
import { TAGLINES, RESUME_PDF } from "@/data/content";

type Health = { server_ms: number; uptime_s: number; commit: string; region: string };

export function StatusHero() {
  const [history, setHistory] = useState<number[]>([]);
  const [health, setHealth] = useState<Health | null>(null);
  const [rtt, setRtt] = useState<number | null>(null);

  useEffect(() => {
    let alive = true;
    const boot = performance.now();
    async function ping() {
      const t0 = performance.now();
      try {
        // real round-trip to a static asset (genuine client-measured latency)
        const res = await fetch("/ping.json", { cache: "no-store" });
        const tHeaders = performance.now();
        await res.json();
        const roundtrip = performance.now() - t0;
        if (!alive) return;
        setHealth({
          server_ms: +(tHeaders - t0).toFixed(2),
          uptime_s: Math.floor((performance.now() - boot) / 1000),
          commit: "static",
          region: "edge",
        });
        setRtt(+roundtrip.toFixed(1));
        setHistory((h) => [...h.slice(-39), Math.min(100, roundtrip)]);
      } catch {
        /* offline: keep last good */
      }
    }
    ping();
    const id = setInterval(ping, 2000);
    return () => { alive = false; clearInterval(id); };
  }, []);

  // sparkline path
  const spark = (() => {
    if (history.length < 2) return "";
    const w = 220, h = 40;
    const max = Math.max(20, ...history);
    return history
      .map((v, i) => {
        const x = (i / (history.length - 1)) * w;
        const y = h - (v / max) * h;
        return `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`;
      })
      .join(" ");
  })();

  return (
    <section className="relative overflow-hidden border-b" style={{ borderColor: "var(--line)" }}>
      <div className="absolute inset-0 blueprint opacity-[0.5]" aria-hidden />
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(100% 100% at 70% 0%, color-mix(in srgb, var(--accent) 8%, transparent), transparent 55%)" }}
      />
      <div className="relative mx-auto max-w-6xl px-5 pt-24 pb-16">
        {/* operational banner */}
        <div
          className="mb-10 inline-flex items-center gap-3 rounded-lg border px-4 py-2"
          style={{ borderColor: "color-mix(in srgb, var(--ok) 40%, var(--line))", background: "color-mix(in srgb, var(--ok) 7%, transparent)" }}
        >
          <span className="live-dot" />
          <span className="font-mono text-[13px] font-medium" style={{ color: "var(--ok)" }}>
            All systems operational
          </span>
          <span className="font-mono text-[12px]" style={{ color: "var(--muted)" }}>
            · 99.99% uptime
          </span>
        </div>

        <div className="mono-label mb-4">vishvam.systems / production</div>
        <h1
          className="font-display font-semibold tracking-[-0.03em] leading-[0.95]"
          style={{ fontSize: "clamp(2.6rem, 8vw, 6.5rem)", color: "var(--fg)" }}
        >
          <Scramble text="Vishvam Patel" start="mount" />
        </h1>
        <p className="mt-5 max-w-xl text-lg" style={{ color: "var(--muted)" }}>{TAGLINES.backend}</p>

        {/* live telemetry row */}
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Metric label="latency" value={rtt !== null ? `${rtt}ms` : "···"} sub="round-trip to /api/health" />
          <Metric label="server" value={health ? `${health.server_ms}ms` : "···"} sub="compute time" />
          <Metric label="region" value={health?.region ?? "···"} sub="edge node" />
          <div className="rounded-lg border p-4" style={{ borderColor: "var(--line)", background: "var(--panel)" }}>
            <div className="mono-label mb-2">latency · live</div>
            <svg viewBox="0 0 220 40" className="h-10 w-full overflow-visible">
              {spark && <path d={spark} fill="none" stroke="var(--accent)" strokeWidth="1.5" />}
              {spark && <path d={`${spark} L220,40 L0,40 Z`} fill="color-mix(in srgb, var(--accent) 12%, transparent)" stroke="none" />}
            </svg>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <a href="#services" className="rounded-md px-4 py-2 font-mono text-[13px]" style={{ background: "var(--accent)", color: "var(--bg)" }}>
            view services →
          </a>
          <a href={RESUME_PDF.backend} className="rounded-md border px-4 py-2 font-mono text-[13px]" style={{ borderColor: "var(--line)", color: "var(--fg)" }}>
            resume.pdf ↓
          </a>
          <span className="mono-label" style={{ color: "var(--faint)" }}>press ⌘K for commands</span>
        </div>
      </div>
    </section>
  );
}

function Metric({ label, value, sub }: { label: string; value: string; sub: string }) {
  return (
    <div className="rounded-lg border p-4" style={{ borderColor: "var(--line)", background: "var(--panel)" }}>
      <div className="mono-label mb-1">{label}</div>
      <div className="font-mono text-2xl tabular-nums" style={{ color: "var(--fg)" }}>{value}</div>
      <div className="mt-1 font-mono text-[10.5px]" style={{ color: "var(--faint)" }}>{sub}</div>
    </div>
  );
}
