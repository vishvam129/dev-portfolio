import { useState } from "react";
import { TRACE, TRACE_TOTAL } from "@/data/backend";
import { Panel } from "./Panel";

const SVC_COLOR: Record<string, string> = {
  fastapi: "var(--accent)", auth: "var(--info)", pydantic: "var(--accent-2)",
  celery: "var(--warn)", redis: "var(--err)", worker: "var(--accent)", postgres: "var(--accent-2)",
};

export function TraceView() {
  const [hover, setHover] = useState<number>(5); // the fat GPU span by default
  const s = TRACE[hover];
  return (
    <div className="flex h-full flex-col gap-3 overflow-y-auto p-4">
      <Panel title="distributed trace · vrixo — one photo job" dot="var(--warn)"
        meta={<><span style={{ color: "var(--ok)" }}>202</span> · {TRACE_TOTAL}ms · 8 spans</>} className="flex-1">
        <div className="space-y-1.5">
          {TRACE.map((sp, i) => (
            <div key={i} onMouseEnter={() => setHover(i)} className="grid cursor-default grid-cols-[170px_1fr] items-center gap-3 rounded px-1 py-1 transition-colors"
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
      </Panel>

      <Panel title="span" dot={SVC_COLOR[s.svc] ?? "var(--accent)"} meta={`${s.dur}ms`}>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-[12px]">
          <span style={{ color: SVC_COLOR[s.svc] ?? "var(--accent)" }}>{s.svc}</span>
          <span style={{ color: "var(--fg)" }}>{s.name}</span>
          <span style={{ color: "var(--faint)" }}>{s.attrs}</span>
        </div>
        <p className="mt-2 font-mono text-[11px]" style={{ color: "var(--faint)" }}>hover a span — GPU inference is the fat bar; everything else is &lt; 20ms.</p>
      </Panel>
    </div>
  );
}
