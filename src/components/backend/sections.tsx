import { Reveal } from "@/components/primitives/Reveal";
import { CountUp } from "@/components/primitives/CountUp";
import { EXPERIENCE, SKILLS, projectsFor, describe, PROFILE } from "@/data/content";

const lens = "backend" as const;

// deterministic-but-varied "uptime" per service, for the status aesthetic
const UPTIME: Record<string, number> = {
  near: 99.97, vrixo: 99.92, lendlocal: 99.99, stock: 99.8, jobportal: 99.7,
};

function Services() {
  const projects = projectsFor(lens);
  return (
    <section id="services" className="mx-auto max-w-6xl px-5 py-24">
      <div className="mb-10 flex items-end justify-between border-b pb-4" style={{ borderColor: "var(--line)" }}>
        <div className="flex items-baseline gap-4">
          <span className="mono-label" style={{ color: "var(--accent)" }}>01 / services</span>
          <h2 className="font-display text-2xl font-semibold sm:text-3xl" style={{ color: "var(--fg)" }}>Services</h2>
        </div>
        <span className="mono-label hidden sm:block">each project = a running service</span>
      </div>

      <div className="space-y-4">
        {projects.map((p, i) => (
          <Reveal key={p.id} delay={i * 0.05}>
            <article className="rounded-xl border p-5 transition-colors hover:border-[color:var(--faint)]" style={{ borderColor: "var(--line)", background: "var(--panel)" }}>
              <div className="flex flex-wrap items-center gap-3">
                <span className="live-dot" style={{ background: p.status === "live" ? "var(--ok)" : "var(--warn)" }} />
                <h3 className="font-display text-lg font-semibold" style={{ color: "var(--fg)" }}>{p.name}</h3>
                <span className="mono-label" style={{ color: p.status === "live" ? "var(--ok)" : "var(--warn)" }}>
                  {p.status === "live" ? "operational" : "deploying"}
                </span>
                <span className="ml-auto font-mono text-[12px] tabular-nums" style={{ color: "var(--muted)" }}>
                  {UPTIME[p.id]?.toFixed(2)}% uptime
                </span>
              </div>

              <p className="mt-3 max-w-3xl text-sm leading-relaxed" style={{ color: "var(--muted)" }}>{describe(p, lens)}</p>

              {/* uptime bars (90 days) */}
              <div className="mt-4 flex items-end gap-[3px]" aria-hidden>
                {Array.from({ length: 60 }).map((_, k) => {
                  const bad = (k * 7 + i * 13) % 47 === 0 && p.status !== "live";
                  return (
                    <span
                      key={k}
                      className="w-full rounded-[1px]"
                      style={{ height: bad ? 8 : 16, background: bad ? "var(--warn)" : "color-mix(in srgb, var(--ok) 70%, transparent)" }}
                    />
                  );
                })}
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-2">
                {p.stack.map((s) => (
                  <span key={s} className="rounded border px-2 py-0.5 font-mono text-[10px]" style={{ borderColor: "var(--line)", color: "var(--muted)" }}>{s}</span>
                ))}
                {p.url && (
                  <a href={p.url} target="_blank" rel="noopener noreferrer" className="ml-auto font-mono text-[12px]" style={{ color: "var(--accent)" }}>
                    open ↗
                  </a>
                )}
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function DeployLog() {
  return (
    <section id="deploys" className="mx-auto max-w-6xl px-5 py-24">
      <div className="mb-10 flex items-end justify-between border-b pb-4" style={{ borderColor: "var(--line)" }}>
        <div className="flex items-baseline gap-4">
          <span className="mono-label" style={{ color: "var(--accent)" }}>03 / deploys</span>
          <h2 className="font-display text-2xl font-semibold sm:text-3xl" style={{ color: "var(--fg)" }}>Deploy log</h2>
        </div>
        <span className="mono-label hidden sm:block">experience, as releases</span>
      </div>

      <div className="rounded-xl border font-mono text-[12.5px]" style={{ borderColor: "var(--line)", background: "var(--panel)" }}>
        {EXPERIENCE[lens].map((e, i) => (
          <Reveal key={i}>
            <div className="border-b p-5 last:border-b-0" style={{ borderColor: "var(--line)" }}>
              <div className="flex flex-wrap items-center gap-2">
                <span style={{ color: "var(--ok)" }}>✓ deployed</span>
                <span style={{ color: "var(--fg)" }}>{e.role}</span>
                <span style={{ color: "var(--faint)" }}>@ {e.company}</span>
                {e.current && <span className="rounded-full border px-2 py-0.5 text-[10px]" style={{ borderColor: "var(--ok)", color: "var(--ok)" }}>live</span>}
                <span className="ml-auto" style={{ color: "var(--muted)" }}>{e.period}</span>
              </div>
              <ul className="mt-3 space-y-1.5">
                {e.bullets.map((b, j) => (
                  <li key={j} className="flex gap-2" style={{ color: "var(--muted)" }}>
                    <span style={{ color: "var(--accent)" }}>›</span>
                    <span className="font-body text-[13.5px] leading-relaxed">{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
        <div className="p-5" style={{ color: "var(--faint)" }}>
          <span style={{ color: "var(--accent)" }}>›</span> {PROFILE.education.degree} · {PROFILE.education.school} · {PROFILE.education.period}
        </div>
      </div>
    </section>
  );
}

function Stack() {
  const stats = [
    { to: 99.99, dec: 2, suf: "%", label: "uptime mindset" },
    { to: 22, suf: "ms", label: "p99 trace" },
    { to: 5, suf: "", label: "K8s components shipped" },
    { to: 1100, suf: "+", label: "lines of test flows" },
  ];
  return (
    <section id="stack" className="mx-auto max-w-6xl px-5 py-24">
      <div className="mb-10 flex items-end justify-between border-b pb-4" style={{ borderColor: "var(--line)" }}>
        <div className="flex items-baseline gap-4">
          <span className="mono-label" style={{ color: "var(--accent)" }}>04 / stack</span>
          <h2 className="font-display text-2xl font-semibold sm:text-3xl" style={{ color: "var(--fg)" }}>Stack &amp; numbers</h2>
        </div>
      </div>

      <div className="mb-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((s) => (
          <Reveal key={s.label}>
            <div className="rounded-xl border p-5" style={{ borderColor: "var(--line)", background: "var(--panel)" }}>
              <div className="font-mono text-3xl tabular-nums" style={{ color: "var(--accent)" }}>
                <CountUp to={s.to} decimals={s.dec ?? 0} suffix={s.suf} />
              </div>
              <div className="mt-1 font-mono text-[11px]" style={{ color: "var(--muted)" }}>{s.label}</div>
            </div>
          </Reveal>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {SKILLS[lens].map((g) => (
          <Reveal key={g.label}>
            <div className="rounded-xl border p-5" style={{ borderColor: "var(--line)", background: "var(--panel)" }}>
              <div className="mono-label mb-3" style={{ color: "var(--accent)" }}>{g.label}</div>
              <div className="flex flex-wrap gap-1.5">
                {g.items.map((s) => (
                  <span key={s} className="rounded border px-2 py-1 font-mono text-[11px]" style={{ borderColor: "var(--line)", color: "var(--fg)" }}>{s}</span>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export function BackendSections() {
  return (
    <>
      <Services />
      <Stack />
      <DeployLog />
    </>
  );
}
