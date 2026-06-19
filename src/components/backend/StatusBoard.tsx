import { useState } from "react";
import { SERVICES, B_PROFILE } from "@/data/backend";
import { StatusDot, UptimeBars, Sparkline, LatencyBadge } from "./viz";

export function StatusBoard() {
  const [open, setOpen] = useState<string | null>(null);
  const allOk = SERVICES.every((s) => s.status === "ok");
  const avgUptime = (SERVICES.reduce((a, s) => a + s.uptime, 0) / SERVICES.length).toFixed(2);

  return (
    <section id="status" className="relative">
      <div className="pointer-events-none absolute inset-0 dotgrid2 opacity-[0.35]" style={{ maskImage: "radial-gradient(120% 70% at 50% 0%, #000 30%, transparent 80%)", WebkitMaskImage: "radial-gradient(120% 70% at 50% 0%, #000 30%, transparent 80%)" }} aria-hidden />
      <div className="relative mx-auto max-w-[1180px] px-6 pt-16 pb-12">
        <div className="font-mono text-[11px] uppercase tracking-[0.22em]" style={{ color: "var(--accent)" }}>// control plane</div>
        <h1 className="mt-5 font-display font-semibold leading-[1.02] tracking-tight" style={{ fontSize: "clamp(2.4rem,6vw,4.6rem)", color: "var(--fg)" }}>
          Systems that don&apos;t<br />fall over at <span style={{ color: "var(--accent)" }}>3am.</span>
        </h1>
        <p className="mt-6 max-w-xl text-[15px] leading-relaxed" style={{ color: "var(--muted)" }}>
          I&apos;m <span style={{ color: "var(--fg)" }}>{B_PROFILE.name}</span>, a backend engineer. Below is my work rendered as
          what it actually is — <span style={{ color: "var(--fg)" }}>production services</span> with uptime, latency, and the
          incidents I&apos;ve recovered from. Everything here runs in your browser.
        </p>

        {/* operational banner */}
        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 rounded-[4px] border px-5 py-3.5" style={{ borderColor: "color-mix(in srgb, var(--ok) 35%, var(--line-2))", background: "color-mix(in srgb, var(--ok) 6%, transparent)" }}>
          <span className="flex items-center gap-2.5"><span className="sdot sdot-ok" /><span className="font-mono text-[13px]" style={{ color: allOk ? "var(--ok)" : "var(--warn)" }}>{allOk ? "All systems operational" : "Degraded performance"}</span></span>
          <span className="font-mono text-[12px] tnum" style={{ color: "var(--muted)" }}>{SERVICES.length} services</span>
          <span className="font-mono text-[12px] tnum" style={{ color: "var(--muted)" }}>{avgUptime}% avg uptime · 90d</span>
          <a href="#api" className="ml-auto font-mono text-[12px]" style={{ color: "var(--accent)" }}>call the API ↓</a>
        </div>
      </div>

      {/* service tiles */}
      <div className="mx-auto max-w-[1180px] px-6 pb-16">
        <div className="grid gap-4 md:grid-cols-2">
          {SERVICES.map((s, i) => {
            const isOpen = open === s.id;
            return (
              <article key={s.id} className="ticks rounded-[4px] border" style={{ borderColor: "var(--line-2)", background: "var(--surface)" }}>
                <button onClick={() => setOpen(isOpen ? null : s.id)} className="w-full p-5 text-left">
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
                {/* incident runbook */}
                <div className="grid transition-all duration-300" style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}>
                  <div className="overflow-hidden">
                    <div className="border-t px-5 py-4" style={{ borderColor: "var(--line)" }}>
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
                <span className="sr-only">{i}</span>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
