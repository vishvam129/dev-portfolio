import { useState } from "react";
import { TRACE, TRACE_TOTAL } from "@/data/backend";

const SVC_COLOR: Record<string, string> = {
  fastapi: "var(--accent)", auth: "var(--info)", pydantic: "var(--accent-2)",
  celery: "var(--warn)", redis: "var(--err)", worker: "var(--accent)", postgres: "var(--accent-2)",
};

export function Trace() {
  const [hover, setHover] = useState<number>(5); // the fat GPU span by default
  const s = TRACE[hover];
  return (
    <section id="trace" className="mx-auto max-w-[1180px] scroll-mt-20 px-6 py-20">
      <div className="mb-8 flex items-end justify-between border-b pb-3" style={{ borderColor: "var(--line)" }}>
        <div>
          <div className="font-mono text-[11px] uppercase tracking-[0.22em]" style={{ color: "var(--accent)" }}>// distributed trace</div>
          <h2 className="mt-1.5 font-display text-2xl font-semibold sm:text-3xl" style={{ color: "var(--fg)" }}>Vrixo — one photo job</h2>
        </div>
        <span className="hidden font-mono text-[12px] sm:flex sm:items-center sm:gap-2">
          <span style={{ color: "var(--ok)" }}>202 Accepted</span><span className="tnum" style={{ color: "var(--muted)" }}>· {TRACE_TOTAL}ms · 8 spans</span>
        </span>
      </div>

      <div className="ticks rounded-[4px] border p-5" style={{ borderColor: "var(--line-2)", background: "var(--surface)" }}>
        <div className="space-y-1.5">
          {TRACE.map((sp, i) => (
            <div key={i} onMouseEnter={() => setHover(i)} className="grid cursor-default grid-cols-[180px_1fr] items-center gap-3 rounded px-1 py-1 transition-colors"
              style={{ background: hover === i ? "color-mix(in srgb, var(--accent) 8%, transparent)" : "transparent" }}>
              <span className="truncate font-mono text-[11px]" style={{ color: hover === i ? "var(--fg)" : "var(--muted)", paddingLeft: sp.depth * 12 }}>{sp.name}</span>
              <div className="relative h-4">
                <div className="absolute h-4 rounded-sm" style={{
                  left: `${(sp.start / TRACE_TOTAL) * 100}%`, width: `${Math.max(0.8, (sp.dur / TRACE_TOTAL) * 100)}%`,
                  background: SVC_COLOR[sp.svc] ?? "var(--accent)", opacity: hover === i ? 1 : 0.72,
                  transformOrigin: "left", animation: "draw 0.5s ease-out both", animationDelay: `${i * 0.06}s`,
                }} />
                <span className="absolute top-0 font-mono text-[9px] tnum" style={{ left: `calc(${(sp.start / TRACE_TOTAL) * 100}% + ${Math.max(0.8, (sp.dur / TRACE_TOTAL) * 100)}%)`, marginLeft: 4, color: "var(--faint)", lineHeight: "16px" }}>{sp.dur}ms</span>
              </div>
            </div>
          ))}
        </div>
        {/* span inspector */}
        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 border-t pt-3 font-mono text-[11px]" style={{ borderColor: "var(--line)" }}>
          <span style={{ color: SVC_COLOR[s.svc] ?? "var(--accent)" }}>{s.svc}</span>
          <span style={{ color: "var(--fg)" }}>{s.name}</span>
          <span className="tnum" style={{ color: "var(--muted)" }}>{s.dur}ms</span>
          <span style={{ color: "var(--faint)" }}>{s.attrs}</span>
        </div>
      </div>
      <p className="mt-3 font-mono text-[11px]" style={{ color: "var(--faint)" }}>↑ hover a span — the GPU inference is the fat bar; everything else is &lt; 20ms.</p>
    </section>
  );
}
