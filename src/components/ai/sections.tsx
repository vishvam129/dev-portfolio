import { Reveal } from "@/components/primitives/Reveal";
import { Scramble } from "@/components/primitives/Scramble";
import { AskTerminal } from "./AskTerminal";
import { EXPERIENCE, SKILLS, projectsFor, describe, PROFILE } from "@/data/content";

const lens = "ai" as const;

function SectionHead({ n, title, note }: { n: string; title: string; note?: string }) {
  return (
    <div className="mb-10 flex items-end justify-between gap-4 border-b pb-4" style={{ borderColor: "var(--line)" }}>
      <div className="flex items-baseline gap-4">
        <span className="mono-label" style={{ color: "var(--accent)" }}>{n}</span>
        <h2 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl" style={{ color: "var(--fg)" }}>
          <Scramble text={title} />
        </h2>
      </div>
      {note && <span className="mono-label hidden sm:block">{note}</span>}
    </div>
  );
}

const STATUS_LABEL: Record<string, string> = {
  live: "deployed",
  "in-progress": "training",
  shipped: "stable",
};

function ModelCards() {
  const projects = projectsFor(lens);
  return (
    <section id="work" className="mx-auto max-w-6xl px-5 py-24">
      <SectionHead n="01 / eval" title="Model cards" note="benchmarked on real shipped work" />
      <div className="grid gap-5 md:grid-cols-2">
        {projects.map((p, i) => (
          <Reveal key={p.id} delay={i * 0.06}>
            <article
              className="group h-full rounded-xl border p-6 transition-all duration-300 hover:-translate-y-1"
              style={{ borderColor: "var(--line)", background: "var(--panel)" }}
            >
              <div className="mb-4 flex items-center justify-between">
                <h3 className="font-display text-xl font-semibold" style={{ color: "var(--fg)" }}>{p.name}</h3>
                <span
                  className="rounded-full border px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider"
                  style={{
                    borderColor: p.status === "live" ? "var(--ok)" : "var(--line)",
                    color: p.status === "live" ? "var(--ok)" : "var(--muted)",
                  }}
                >
                  {STATUS_LABEL[p.status]}
                </span>
              </div>
              <p className="mb-5 text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
                {describe(p, lens)}
              </p>

              {/* eval metrics */}
              {p.metrics && (
                <div className="mb-5 space-y-1.5">
                  {p.metrics.map((m) => (
                    <div key={m.label} className="flex items-center gap-3 font-mono text-[11.5px]">
                      <span style={{ color: "var(--faint)" }} className="w-28 shrink-0">{m.label}</span>
                      <span className="h-px flex-1" style={{ background: "var(--line)" }} />
                      <span style={{ color: "var(--accent)" }}>{m.value}</span>
                    </div>
                  ))}
                </div>
              )}

              <div className="flex flex-wrap gap-1.5">
                {p.stack.slice(0, 6).map((s) => (
                  <span key={s} className="rounded border px-2 py-0.5 font-mono text-[10px]" style={{ borderColor: "var(--line)", color: "var(--muted)" }}>
                    {s}
                  </span>
                ))}
              </div>

              {p.url && (
                <a href={p.url} target="_blank" rel="noopener noreferrer"
                  className="mt-5 inline-flex items-center gap-1 font-mono text-[12px] transition-opacity hover:opacity-70"
                  style={{ color: "var(--accent)" }}>
                  open deployment ↗
                </a>
              )}
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function TrainingLog() {
  return (
    <section id="experience" className="mx-auto max-w-6xl px-5 py-24">
      <SectionHead n="02 / training" title="Fine-tuning log" note="where the weights came from" />
      <div className="space-y-10">
        {EXPERIENCE[lens].map((e, i) => (
          <Reveal key={i} delay={i * 0.05}>
            <div className="grid gap-4 md:grid-cols-[200px_1fr]">
              <div>
                <div className="font-mono text-[12px]" style={{ color: "var(--accent)" }}>{e.period}</div>
                <div className="mt-1 font-mono text-[11px]" style={{ color: "var(--faint)" }}>{e.place}</div>
                {e.current && (
                  <div className="mt-2 inline-flex items-center gap-1.5">
                    <span className="live-dot" />
                    <span className="mono-label" style={{ color: "var(--ok)" }}>active run</span>
                  </div>
                )}
              </div>
              <div className="border-l pl-6" style={{ borderColor: "var(--line)" }}>
                <h3 className="font-display text-lg font-semibold" style={{ color: "var(--fg)" }}>
                  {e.role} · <span style={{ color: "var(--muted)" }}>{e.company}</span>
                </h3>
                <ul className="mt-3 space-y-2">
                  {e.bullets.map((b, j) => (
                    <li key={j} className="flex gap-3 text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
                      <span style={{ color: "var(--accent)" }} className="font-mono text-[11px] mt-0.5">{String(j + 1).padStart(2, "0")}</span>
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        ))}
        <Reveal>
          <div className="grid gap-4 md:grid-cols-[200px_1fr]">
            <div className="font-mono text-[12px]" style={{ color: "var(--accent)" }}>{PROFILE.education.period}</div>
            <div className="border-l pl-6" style={{ borderColor: "var(--line)" }}>
              <h3 className="font-display text-lg font-semibold" style={{ color: "var(--fg)" }}>
                {PROFILE.education.degree}
              </h3>
              <p className="mt-1 text-sm" style={{ color: "var(--muted)" }}>
                {PROFILE.education.school} · {PROFILE.education.place} · graduating {PROFILE.graduating}
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Capabilities() {
  return (
    <section id="stack" className="mx-auto max-w-6xl px-5 py-24">
      <SectionHead n="03 / capabilities" title="Capability surface" note="what the model can do" />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {SKILLS[lens].map((g, i) => (
          <Reveal key={g.label} delay={i * 0.05}>
            <div className="rounded-xl border p-5" style={{ borderColor: "var(--line)", background: "var(--panel)" }}>
              <div className="mono-label mb-3" style={{ color: "var(--accent)" }}>{g.label}</div>
              <div className="flex flex-wrap gap-1.5">
                {g.items.map((s) => (
                  <span key={s} className="rounded border px-2 py-1 font-mono text-[11px]" style={{ borderColor: "var(--line)", color: "var(--fg)" }}>
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function ContactSession() {
  return (
    <section id="contact" className="mx-auto max-w-6xl px-5 py-24">
      <SectionHead n="04 / session" title="Open a session" note="latency: human-speed" />
      <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr]">
        <div>
          <p className="max-w-md text-lg leading-relaxed" style={{ color: "var(--muted)" }}>
            Open to remote junior <span style={{ color: "var(--fg)" }}>AI / ML</span>, backend, and
            full-stack roles. Ask the model anything, or reach a human directly.
          </p>
          <div className="mt-8 space-y-3 font-mono text-sm">
            {[
              { k: "email", v: PROFILE.email, href: `mailto:${PROFILE.email}` },
              { k: "github", v: "github.com/" + PROFILE.githubHandle, href: PROFILE.github },
              { k: "linkedin", v: "in/vishvam129", href: PROFILE.linkedin },
            ].map((r) => (
              <a key={r.k} href={r.href} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-4 border-b pb-3 transition-colors hover:opacity-70"
                style={{ borderColor: "var(--line)" }}>
                <span className="mono-label w-20">{r.k}</span>
                <span style={{ color: "var(--fg)" }}>{r.v}</span>
                <span className="ml-auto" style={{ color: "var(--accent)" }}>↗</span>
              </a>
            ))}
          </div>
        </div>
        <AskTerminal />
      </div>
    </section>
  );
}

export function AiSections() {
  return (
    <>
      <ModelCards />
      <TrainingLog />
      <Capabilities />
      <ContactSession />
      <footer className="border-t" style={{ borderColor: "var(--line)" }}>
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-5 py-8 sm:flex-row sm:items-center">
          <span className="mono-label">© 2026 {PROFILE.name}</span>
          <span className="mono-label sm:ml-auto" style={{ color: "var(--faint)" }}>
            vishvam-1 · built from scratch · next.js · no template
          </span>
        </div>
      </footer>
    </>
  );
}
