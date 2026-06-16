import { Assistant } from "./Assistant";
import { VisionSandbox } from "./VisionSandbox";
import { Reveal } from "@/components/fx/Reveal";
import { PROJECTS, CAPABILITIES, PROFILE } from "@/data/content";

function SectionHead({ n, title, note }: { n: string; title: string; note?: string }) {
  return (
    <div className="mb-12">
      <div className="rule-faint" />
      <div className="flex items-center justify-between pt-4">
        <span className="glyph">{n} — {title.toUpperCase()}</span>
        {note && <span className="kicker hidden sm:inline" style={{ color: "var(--faint)", fontSize: "0.6rem" }}>{note}</span>}
      </div>
    </div>
  );
}

const STATUS: Record<string, { label: string; color: string }> = {
  production: { label: "live", color: "var(--accent)" },
  "in-progress": { label: "building", color: "var(--warn)" },
  shipped: { label: "shipped", color: "var(--muted)" },
};

function Ask() {
  return (
    <section id="ask" className="wrap scroll-mt-24 py-24">
      <SectionHead n="01" title="Ask the model" note="RAG · MiniLM-L6 · on-device" />
      <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
        <Reveal>
          <h2 className="font-display" style={{ fontSize: "clamp(2.2rem,4.5vw,3.6rem)", color: "var(--fg)" }}>
            It answers<br />from my <span style={{ color: "var(--accent)" }}>résumé.</span>
          </h2>
          <p className="mt-6 max-w-sm text-[15px] leading-relaxed" style={{ color: "var(--muted)" }}>
            A real embedding model runs in a Web Worker, vectorizes my work history, and
            answers your question by cosine-similarity retrieval — streamed and{" "}
            <span style={{ color: "var(--fg)" }}>cited</span>, entirely client-side.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {["Transformers.js", "ONNX / WASM", "384-dim", "no server"].map((c) => (
              <span key={c} className="chip">{c}</span>
            ))}
          </div>
        </Reveal>
        <Reveal delay={0.1}><Assistant /></Reveal>
      </div>
    </section>
  );
}

function Work() {
  return (
    <section id="work" className="wrap scroll-mt-24 py-24">
      <SectionHead n="03" title="Work" note="shipped, not claimed" />
      <div>
        {PROJECTS.map((p, i) => (
          <Reveal key={p.id} delay={i * 0.04}>
            <article data-hover className="group grid gap-y-4 py-8 transition-colors lg:grid-cols-12 lg:gap-x-8"
              style={{ borderTop: "1px solid var(--line)" }}>
              <div className="font-mono text-[12px] lg:col-span-1" style={{ color: "var(--accent)" }}>{String(i + 1).padStart(2, "0")}</div>
              <div className="lg:col-span-4">
                <h3 className="font-display transition-colors group-hover:text-[color:var(--accent)]" style={{ fontSize: "2rem", color: "var(--fg)" }}>{p.name}</h3>
                <div className="mt-2 flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full" style={{ background: STATUS[p.status].color }} />
                  <span className="font-mono text-[11px] uppercase tracking-wider" style={{ color: STATUS[p.status].color }}>{STATUS[p.status].label}</span>
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
                      <dt style={{ color: "var(--faint)" }}>{m.label}</dt><dd className="tnum" style={{ color: "var(--fg)" }}>{m.value}</dd>
                    </div>
                  ))}
                </dl>
                {p.url && <a href={p.url} data-hover target="_blank" rel="noopener noreferrer" className="ulink mt-3 inline-block font-mono text-[12px]" style={{ color: "var(--accent)" }}>visit live ↗</a>}
              </div>
            </article>
          </Reveal>
        ))}
        <div style={{ borderTop: "1px solid var(--line)" }} />
      </div>
    </section>
  );
}

function Stack() {
  return (
    <section id="stack" className="wrap scroll-mt-24 py-24">
      <SectionHead n="04" title="Stack" note="instruments in service" />
      <div>
        {CAPABILITIES.map((g) => (
          <div key={g.label} className="grid gap-y-2 py-5 sm:grid-cols-[150px_1fr] sm:gap-x-8" style={{ borderTop: "1px solid var(--line)" }}>
            <div className="kicker pt-1" style={{ color: "var(--accent)" }}>{g.label}</div>
            <div className="flex flex-wrap gap-x-6 gap-y-2 font-mono text-[13.5px]" style={{ color: "var(--fg)" }}>
              {g.items.map((s) => <span key={s} data-hover>{s}</span>)}
            </div>
          </div>
        ))}
        <div style={{ borderTop: "1px solid var(--line)" }} />
      </div>
    </section>
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
    <section id="contact" className="wrap scroll-mt-24 py-28">
      <SectionHead n="05" title="Contact" note="available June 2026 · remote" />
      <Reveal>
        <h2 className="font-display" style={{ fontSize: "clamp(2.6rem,7vw,6rem)", color: "var(--fg)" }}>
          Let&apos;s build<br />something <span style={{ color: "var(--accent)" }}>intelligent.</span>
        </h2>
      </Reveal>
      <div className="mt-12 max-w-2xl">
        {rows.map((r) => (
          <a key={r.k} href={r.href} data-hover target="_blank" rel="noopener noreferrer"
            className="group flex items-center gap-5 py-4 transition-colors" style={{ borderTop: "1px solid var(--line)" }}>
            <span className="kicker w-20 shrink-0" style={{ color: "var(--faint)" }}>{r.k}</span>
            <span className="font-mono text-[15px] transition-colors group-hover:text-[color:var(--accent)]" style={{ color: "var(--fg)" }}>{r.v}</span>
            <span className="ml-auto transition-transform group-hover:translate-x-1" style={{ color: "var(--accent)" }}>↗</span>
          </a>
        ))}
        <div style={{ borderTop: "1px solid var(--line)" }} />
      </div>
    </section>
  );
}

export function AiSections() {
  return (
    <>
      <Ask />
      <VisionSandbox />
      <Work />
      <Stack />
      <Contact />
      <footer className="wrap">
        <div className="rule-faint" />
        <div className="flex flex-col gap-2 py-8 font-mono text-[11px] sm:flex-row sm:items-center" style={{ color: "var(--faint)" }}>
          <span>© 2026 {PROFILE.name} · Gandhinagar, IST</span>
          <span className="sm:ml-auto">RAG + vision on-device · React · Transformers.js · built from scratch</span>
        </div>
      </footer>
    </>
  );
}
