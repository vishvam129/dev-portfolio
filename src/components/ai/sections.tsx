import { PROJECTS, CAPABILITIES, PROFILE } from "@/data/content";

const STATUS: Record<string, { label: string; color: string }> = {
  production: { label: "in production", color: "var(--ok)" },
  "in-progress": { label: "training", color: "var(--accent)" },
  shipped: { label: "stable", color: "var(--muted)" },
};

/** A numbered editorial entry: sticky marginalia label + content. */
function Entry({ n, label, note, children }: { n: string; label: string; note?: string; children: React.ReactNode }) {
  return (
    <section className="mx-auto max-w-[1240px] px-6">
      <div className="rule-2" />
      <div className="entry py-14">
        <div className="entry-label">
          <div className="bignum">§ {n}</div>
          <h2 className="mt-2 font-display text-3xl leading-none" style={{ color: "var(--fg)" }}>{label}</h2>
          {note && <p className="mt-3 font-mono text-[11px] leading-relaxed" style={{ color: "var(--faint)" }}>{note}</p>}
        </div>
        <div>{children}</div>
      </div>
    </section>
  );
}

function Checkpoints() {
  return (
    <div id="work">
      <Entry n="03" label="Checkpoints" note="Shipped work, not claims. Selected projects with real metrics.">
        <div>
          {PROJECTS.map((p, i) => (
            <article key={p.id} className="group grid gap-y-4 py-7 lg:grid-cols-12 lg:gap-x-8" style={{ borderTop: "1px solid var(--line)" }}>
              <div className="font-mono text-[12px] lg:col-span-1" style={{ color: "var(--accent)" }}>{String(i + 1).padStart(2, "0")}</div>
              <div className="lg:col-span-4">
                <h3 className="font-display text-2xl leading-none" style={{ color: "var(--fg)" }}>{p.name}</h3>
                <div className="mt-2 flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full" style={{ background: STATUS[p.status].color }} />
                  <span className="mono-label" style={{ color: STATUS[p.status].color, fontSize: "0.6rem" }}>{STATUS[p.status].label}</span>
                </div>
                {p.models && (
                  <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1 font-mono text-[10.5px]" style={{ color: "var(--accent)" }}>
                    {p.models.map((m) => <span key={m}>{m}</span>)}
                  </div>
                )}
              </div>
              <p className="text-[14px] leading-relaxed lg:col-span-4" style={{ color: "var(--muted)" }}>{p.blurb}</p>
              <div className="lg:col-span-3">
                <dl className="space-y-1.5">
                  {p.metrics.map((m) => (
                    <div key={m.label} className="flex items-baseline justify-between gap-3 border-b pb-1 font-mono text-[11px]" style={{ borderColor: "var(--line)" }}>
                      <dt style={{ color: "var(--faint)" }}>{m.label}</dt>
                      <dd style={{ color: "var(--fg)" }}>{m.value}</dd>
                    </div>
                  ))}
                </dl>
                {p.url && (
                  <a href={p.url} target="_blank" rel="noopener noreferrer" className="ulink mt-3 inline-block font-mono text-[12px]" style={{ color: "var(--accent)" }}>
                    visit live ↗
                  </a>
                )}
              </div>
            </article>
          ))}
          <div style={{ borderTop: "1px solid var(--line)" }} />
        </div>
      </Entry>
    </div>
  );
}

function Stack() {
  return (
    <div id="stack">
      <Entry n="04" label="Stack" note="Tools in service. The instrument set behind the work.">
        <div>
          {CAPABILITIES.map((g) => (
            <div key={g.label} className="grid gap-y-2 py-5 sm:grid-cols-[140px_1fr] sm:gap-x-6" style={{ borderTop: "1px solid var(--line)" }}>
              <div className="mono-label pt-1" style={{ color: "var(--accent)" }}>{g.label}</div>
              <div className="flex flex-wrap gap-x-5 gap-y-2 font-mono text-[13px]" style={{ color: "var(--fg)" }}>
                {g.items.map((s) => <span key={s}>{s}</span>)}
              </div>
            </div>
          ))}
          <div style={{ borderTop: "1px solid var(--line)" }} />
        </div>
      </Entry>
    </div>
  );
}

function Contact() {
  const rows = [
    { k: "email", v: PROFILE.email, href: `mailto:${PROFILE.email}` },
    { k: "github", v: "github.com/" + PROFILE.githubHandle, href: PROFILE.github },
    { k: "linkedin", v: "in/vishvam129", href: PROFILE.linkedin },
    { k: "résumé", v: "AI_Developer.pdf", href: PROFILE.resume },
  ];
  return (
    <div id="contact">
      <Entry n="05" label="Contact" note="Available June 2026 · remote preferred.">
        <h3 className="font-display leading-[0.98] tracking-[-0.01em]" style={{ fontSize: "clamp(2.2rem, 5vw, 4rem)", color: "var(--fg)" }}>
          Let&apos;s build something <em className="serif-italic" style={{ color: "var(--accent)" }}>intelligent.</em>
        </h3>
        <div className="mt-10 max-w-xl">
          {rows.map((r) => (
            <a key={r.k} href={r.href} target="_blank" rel="noopener noreferrer" className="idx-row" style={{ color: "var(--fg)" }}>
              <span className="mono-label" style={{ color: "var(--faint)" }}>{r.k}</span>
              <span className="font-mono text-[14px]">{r.v}</span>
              <span style={{ color: "var(--accent)" }}>↗</span>
            </a>
          ))}
          <div style={{ borderTop: "1px solid var(--line)" }} />
        </div>
      </Entry>
    </div>
  );
}

export function AiSections() {
  return (
    <>
      <Checkpoints />
      <Stack />
      <Contact />
      <footer className="mx-auto max-w-[1240px] px-6">
        <div className="rule-2" />
        <div className="flex flex-col gap-2 py-8 font-mono text-[11px] sm:flex-row sm:items-center" style={{ color: "var(--faint)" }}>
          <span>© 2026 {PROFILE.name} · Gandhinagar</span>
          <span className="sm:ml-auto">RAG + vision on-device · React · Transformers.js · built from scratch</span>
        </div>
      </footer>
    </>
  );
}
