import { PROJECTS, CAPABILITIES, PROFILE } from "@/data/content";

const STATUS: Record<string, { label: string; color: string }> = {
  production: { label: "in production", color: "var(--ok)" },
  "in-progress": { label: "training", color: "var(--warn)" },
  shipped: { label: "stable", color: "var(--muted)" },
};

function ModelCards() {
  return (
    <section id="work" className="mx-auto max-w-6xl px-5 py-20">
      <div className="mb-10 flex items-end justify-between border-b pb-4" style={{ borderColor: "var(--line)" }}>
        <div className="flex items-baseline gap-4">
          <span className="mono-label" style={{ color: "var(--accent)" }}>01 / checkpoints</span>
          <h2 className="font-display text-2xl font-bold sm:text-3xl" style={{ color: "var(--fg)" }}>Projects</h2>
        </div>
        <span className="mono-label hidden sm:block">shipped, not claimed</span>
      </div>
      <div className="grid gap-5 md:grid-cols-2">
        {PROJECTS.map((p) => (
          <article key={p.id} className="group rounded-2xl border p-6 transition-transform duration-300 hover:-translate-y-1" style={{ borderColor: "var(--line-2)", background: "var(--panel)" }}>
            <div className="mb-3 flex items-center justify-between">
              <h3 className="font-display text-xl font-bold" style={{ color: "var(--fg)" }}>{p.name}</h3>
              <span className="rounded-full border px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider" style={{ borderColor: STATUS[p.status].color, color: STATUS[p.status].color }}>
                {STATUS[p.status].label}
              </span>
            </div>
            <p className="mb-4 text-sm leading-relaxed" style={{ color: "var(--muted)" }}>{p.blurb}</p>
            {p.models && (
              <div className="mb-4 flex flex-wrap gap-1.5">
                {p.models.map((m) => (
                  <span key={m} className="rounded border px-2 py-0.5 font-mono text-[10px]" style={{ borderColor: "var(--line-2)", color: "var(--accent)" }}>{m}</span>
                ))}
              </div>
            )}
            <div className="mb-4 grid grid-cols-3 gap-2">
              {p.metrics.map((m) => (
                <div key={m.label} className="rounded-lg border p-2 text-center" style={{ borderColor: "var(--line)" }}>
                  <div className="font-mono text-[13px]" style={{ color: "var(--fg)" }}>{m.value}</div>
                  <div className="mono-label mt-0.5" style={{ fontSize: "0.55rem" }}>{m.label}</div>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap items-center gap-1.5">
              {p.stack.map((s) => (
                <span key={s} className="font-mono text-[10.5px]" style={{ color: "var(--faint)" }}>{s} ·</span>
              ))}
              {p.url && (
                <a href={p.url} target="_blank" rel="noopener noreferrer" className="ml-auto font-mono text-[12px]" style={{ color: "var(--accent)" }}>live ↗</a>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function Capabilities() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-20">
      <div className="mb-10 flex items-end justify-between border-b pb-4" style={{ borderColor: "var(--line)" }}>
        <div className="flex items-baseline gap-4">
          <span className="mono-label" style={{ color: "var(--accent)" }}>02 / capabilities</span>
          <h2 className="font-display text-2xl font-bold sm:text-3xl" style={{ color: "var(--fg)" }}>Stack</h2>
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {CAPABILITIES.map((g) => (
          <div key={g.label} className="rounded-2xl border p-5" style={{ borderColor: "var(--line-2)", background: "var(--panel)" }}>
            <div className="mono-label mb-3" style={{ color: "var(--accent)" }}>{g.label}</div>
            <div className="flex flex-wrap gap-1.5">
              {g.items.map((s) => (
                <span key={s} className="rounded border px-2 py-1 font-mono text-[11px]" style={{ borderColor: "var(--line)", color: "var(--fg)" }}>{s}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="mx-auto max-w-6xl px-5 py-24 text-center">
      <span className="mono-label" style={{ color: "var(--accent)" }}>03 / inference complete</span>
      <h2 className="mx-auto mt-4 max-w-2xl font-display text-4xl font-bold leading-tight sm:text-6xl" style={{ color: "var(--fg)" }}>
        Let&apos;s build something intelligent.
      </h2>
      <a href={`mailto:${PROFILE.email}`} className="mt-8 inline-block font-display text-2xl underline decoration-1 underline-offset-8 sm:text-3xl" style={{ color: "var(--accent)" }}>
        {PROFILE.email}
      </a>
      <div className="mt-8 flex items-center justify-center gap-6 font-mono text-sm" style={{ color: "var(--muted)" }}>
        <a href={PROFILE.github} target="_blank" rel="noopener noreferrer" className="hover:opacity-70">GitHub</a>
        <a href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer" className="hover:opacity-70">LinkedIn</a>
        <span style={{ color: "var(--faint)" }}>{PROFILE.location}</span>
      </div>
    </section>
  );
}

export function AiSections() {
  return (
    <>
      <ModelCards />
      <Capabilities />
      <Contact />
      <footer className="border-t" style={{ borderColor: "var(--line)" }}>
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-5 py-8 font-mono text-[11px] sm:flex-row sm:items-center" style={{ color: "var(--faint)" }}>
          <span>© 2026 {PROFILE.name}</span>
          <span className="sm:ml-auto">RAG + vision running on-device · React · Transformers.js · no template</span>
        </div>
      </footer>
    </>
  );
}
