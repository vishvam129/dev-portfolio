import { useState } from "react";
import { SERVICES } from "@/data/backend";
import { StatusDot, UptimeBars, Sparkline, LatencyBadge } from "./viz";

export function ServicesView() {
  const [open, setOpen] = useState<string | null>(SERVICES[0].id);
  return (
    <div className="h-full overflow-y-auto p-4">
      <div className="grid gap-3 lg:grid-cols-2">
        {SERVICES.map((s) => {
          const isOpen = open === s.id;
          return (
            <article key={s.id} className="ticks rounded-[5px] border" style={{ borderColor: "var(--line-2)", background: "var(--surface)" }}>
              <button onClick={() => setOpen(isOpen ? null : s.id)} className="w-full p-4 text-left">
                <div className="flex items-center gap-2.5">
                  <StatusDot status={s.status} />
                  <span className="font-mono text-[14px]" style={{ color: "var(--fg)" }}>{s.name}</span>
                  <span className="font-mono text-[11px]" style={{ color: "var(--faint)" }}>· {s.project}</span>
                  <span className="ml-auto font-mono text-[11px] tnum" style={{ color: s.status === "ok" ? "var(--ok)" : "var(--warn)" }}>{s.uptime}%</span>
                </div>
                <div className="mt-3"><UptimeBars seed={s.id} bad={s.status === "ok" ? 1 : 2} /></div>
                <div className="mt-3 flex items-center gap-3">
                  <div className="flex-1"><Sparkline seed={s.id + "lat"} /></div>
                  <LatencyBadge label="p50" ms={s.p50} />
                  <LatencyBadge label="p99" ms={s.p99} />
                </div>
                <p className="mt-3 text-[13px] leading-relaxed" style={{ color: "var(--muted)" }}>{s.blurb}</p>
                <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1">
                  {s.stack.map((t) => <span key={t} className="font-mono text-[10.5px]" style={{ color: "var(--faint)" }}>{t}</span>)}
                  <span className="ml-auto font-mono text-[11px]" style={{ color: "var(--accent)" }}>{isOpen ? "hide incidents −" : `incidents (${s.incidents.length}) +`}</span>
                </div>
              </button>
              <div className="grid transition-all duration-300" style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}>
                <div className="overflow-hidden">
                  <div className="border-t px-4 py-4" style={{ borderColor: "var(--line)" }}>
                    <div className="font-mono text-[10px] uppercase tracking-widest" style={{ color: "var(--faint)" }}>incident log</div>
                    <ul className="mt-3 space-y-3">
                      {s.incidents.map((inc, j) => (
                        <li key={j} className="font-mono text-[12px]">
                          <div className="flex items-baseline gap-2">
                            <span className="tnum" style={{ color: "var(--warn)" }}>{inc.date}</span>
                            <span style={{ color: "var(--fg)" }}>{inc.title}</span>
                          </div>
                          <div className="mt-1 flex gap-2" style={{ color: "var(--muted)" }}>
                            <span style={{ color: "var(--ok)" }}>✓ fix</span><span>{inc.fix}</span>
                          </div>
                        </li>
                      ))}
                    </ul>
                    {s.url && <a href={s.url} target="_blank" rel="noopener noreferrer" className="mt-3 inline-block font-mono text-[12px]" style={{ color: "var(--accent)" }}>open live ↗</a>}
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
