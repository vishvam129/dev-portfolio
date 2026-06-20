import { SERVICES } from "@/data/backend";
import { useLiveMetrics, type Metric } from "@/lib/useLiveMetrics";
import { useLiveLog } from "@/lib/useLiveLog";
import { StatusDot, UptimeBars } from "./viz";
import { Panel } from "./Panel";
import { LogConsole } from "./LogConsole";

function fmt(m: Metric) {
  if (m.key === "err") return m.val.toFixed(2);
  if (m.key === "rps") return m.val.toLocaleString("en-US");
  return String(m.val);
}

function MiniSpark({ hist, color }: { hist: number[]; color: string }) {
  const min = Math.min(...hist), max = Math.max(...hist), span = max - min || 1;
  const pts = hist.map((v, i) => `${(i / (hist.length - 1)) * 100},${28 - ((v - min) / span) * 24 - 2}`).join(" ");
  return (
    <svg viewBox="0 0 100 28" preserveAspectRatio="none" className="mt-2 h-7 w-full">
      <polyline points={pts} fill="none" stroke={color} strokeWidth="1.5" vectorEffect="non-scaling-stroke" opacity="0.9" />
    </svg>
  );
}

export function OverviewPanel() {
  const metrics = useLiveMetrics();
  const log = useLiveLog(40, 850);
  const color = (k: string) => (k === "err" ? "var(--err)" : k === "p99" ? "var(--warn)" : "var(--accent-2)");

  return (
    <div className="grid h-full grid-rows-[auto_1fr] gap-3 overflow-y-auto p-4 lg:overflow-hidden">
      {/* live metric strip */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {metrics.map((m) => (
          <div key={m.key} className="ticks rounded-[5px] border px-3.5 py-3" style={{ borderColor: "var(--line-2)", background: "var(--surface)" }}>
            <div className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.14em]" style={{ color: "var(--faint)" }}>
              <span className="sdot sdot-ok" style={{ width: 5, height: 5 }} />{m.label}
            </div>
            <div className="mt-1.5 flex items-baseline gap-1">
              <span className="font-display tnum text-[27px] leading-none" style={{ color: "var(--fg)" }}>{fmt(m)}</span>
              <span className="font-mono text-[12px]" style={{ color: "var(--muted)" }}>{m.unit}</span>
            </div>
            <MiniSpark hist={m.hist} color={color(m.key)} />
          </div>
        ))}
      </div>

      {/* health + live log */}
      <div className="grid min-h-0 gap-3 lg:grid-cols-[1.05fr_1fr]">
        <Panel title="service health" dot="var(--ok)" meta={`${SERVICES.length} svc · 90d`} bodyClass="overflow-y-auto">
          <div>
            {SERVICES.map((s) => (
              <div key={s.id} className="flex items-center gap-3 px-3.5 py-3" style={{ borderTop: "1px solid var(--line)" }}>
                <StatusDot status={s.status} />
                <div className="min-w-0">
                  <div className="truncate font-mono text-[12.5px]" style={{ color: "var(--fg)" }}>{s.name}</div>
                  <div className="font-mono text-[10px]" style={{ color: "var(--faint)" }}>{s.project}</div>
                </div>
                <div className="ml-auto hidden w-28 sm:block"><UptimeBars seed={s.id} bad={s.status === "ok" ? 1 : 2} /></div>
                <div className="w-12 text-right font-mono text-[11px] tnum" style={{ color: s.status === "ok" ? "var(--ok)" : "var(--warn)" }}>{s.uptime}%</div>
                <div className="w-14 text-right font-mono text-[11px] tnum" style={{ color: "var(--muted)" }}>p99 {s.p99}</div>
              </div>
            ))}
          </div>
        </Panel>

        <Panel title="live log" dot="var(--accent-2)" meta="stdout · tail -f" pad={false} className="min-h-[200px]">
          <LogConsole lines={log} dense />
        </Panel>
      </div>
    </div>
  );
}
