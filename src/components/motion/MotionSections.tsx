import { useState } from "react";
import { Assistant } from "@/components/ai/Assistant";
import { VisionSandbox } from "@/components/ai/VisionSandbox";
import { Reveal } from "@/components/fx/Reveal";
import { CountUp } from "@/components/fx/CountUp";
import { Scramble } from "@/components/fx/Scramble";
import { Magnetic } from "@/components/fx/Magnetic";
import { PROJECTS, CAPABILITIES, PROFILE } from "@/data/content";

function Head({ n, title, note }: { n: string; title: string; note?: string }) {
  return (
    <div className="mb-10">
      <div className="rule-faint" />
      <div className="flex items-center justify-between pt-3">
        <span className="glyph">{n} // {title.toUpperCase()}</span>
        {note && <span className="kicker hidden sm:inline" style={{ color: "var(--faint)", fontSize: "0.58rem" }}>{note}</span>}
      </div>
    </div>
  );
}

const STATUS: Record<string, { label: string; color: string }> = {
  production: { label: "live", color: "var(--accent)" },
  "in-progress": { label: "building", color: "var(--accent-2)" },
  shipped: { label: "shipped", color: "var(--muted)" },
};

function Console() {
  return (
    <section id="ask" className="wrap scroll-mt-20 py-24">
      <Head n="01" title="Ask the model" note="rag · minilm-l6 · on-device" />
      <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <Reveal>
          <h2 className="font-display" style={{ fontSize: "clamp(2.2rem,4.5vw,3.6rem)", color: "var(--fg)" }}>
            It answers from<br />my <span style={{ color: "var(--accent)" }}>résumé.</span>
          </h2>
          <p className="mt-6 max-w-sm text-[15px] leading-relaxed" style={{ color: "var(--muted)" }}>
            A real embedding model runs in a Web Worker, vectorizes my history, and answers by
            cosine retrieval — streamed and <span style={{ color: "var(--fg)" }}>cited</span>, fully client-side.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {["Transformers.js", "ONNX / WASM", "384-dim", "0 servers"].map((c) => <span key={c} className="chip">{c}</span>)}
          </div>
        </Reveal>
        <Reveal delay={0.1}><div className="crop"><Assistant /></div></Reveal>
      </div>
    </section>
  );
}

function Work() {
  const [open, setOpen] = useState<string | null>(PROJECTS[0]?.id ?? null);
  return (
    <section id="work" className="wrap scroll-mt-20 py-24">
      <Head n="03" title="Work" note="shipped, not claimed" />
      <div>
        {PROJECTS.map((p, i) => {
          const active = open === p.id;
          return (
            <div key={p.id} data-hover onMouseEnter={() => setOpen(p.id)}
              className="group cursor-pointer border-t transition-all" style={{ borderColor: "var(--line)" }}>
              <div className="grid grid-cols-[auto_1fr_auto] items-center gap-5 py-6">
                <span className="font-mono text-[12px]" style={{ color: active ? "var(--accent)" : "var(--faint)" }}>{String(i + 1).padStart(2, "0")}</span>
                <h3 className="font-display transition-transform" style={{ fontSize: "clamp(1.7rem,3.4vw,2.6rem)", color: active ? "var(--fg)" : "var(--muted)", transform: active ? "translateX(8px)" : "none" }}>{p.name}</h3>
                <div className="flex items-center gap-3">
                  <span className="hidden font-mono text-[11px] uppercase tracking-wider sm:inline" style={{ color: STATUS[p.status].color }}>{STATUS[p.status].label}</span>
                  <span className="transition-transform" style={{ color: "var(--accent)", transform: active ? "rotate(90deg)" : "none" }}>→</span>
                </div>
              </div>
              <div className="grid transition-all duration-300" style={{ gridTemplateRows: active ? "1fr" : "0fr" }}>
                <div className="overflow-hidden">
                  <div className="grid gap-6 pb-8 lg:grid-cols-[1.4fr_1fr] lg:pl-12">
                    <div>
                      <p className="max-w-lg text-[14px] leading-relaxed" style={{ color: "var(--muted)" }}>{p.blurb}</p>
                      {p.models && (
                        <div className="mt-4 flex flex-wrap gap-x-3 gap-y-1 font-mono text-[11px]" style={{ color: "var(--accent-2)" }}>
                          {p.models.map((m) => <span key={m}>{m}</span>)}
                        </div>
                      )}
                      <div className="mt-4 flex flex-wrap gap-x-4 font-mono text-[10.5px]" style={{ color: "var(--faint)" }}>
                        {p.stack.map((s) => <span key={s}>{s}</span>)}
                      </div>
                      {p.url && <a href={p.url} data-hover target="_blank" rel="noopener noreferrer" className="ulink mt-4 inline-block font-mono text-[12px]" style={{ color: "var(--accent)" }}>visit live ↗</a>}
                    </div>
                    <div className="grid grid-cols-3 gap-2 lg:grid-cols-1">
                      {p.metrics.map((m) => (
                        <div key={m.label} className="flex items-baseline justify-between gap-2 border-b pb-1 font-mono text-[11px]" style={{ borderColor: "var(--line)" }}>
                          <span style={{ color: "var(--faint)" }}>{m.label}</span><span className="tnum" style={{ color: "var(--fg)" }}>{m.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        <div style={{ borderTop: "1px solid var(--line)" }} />
      </div>
    </section>
  );
}

function Numbers() {
  const stats = [
    { to: 4, suffix: "", label: "shipped products" },
    { to: 1100, suffix: "+", label: "lines of test flows" },
    { to: 70, suffix: "+", label: "components in Near" },
    { to: 100, suffix: "%", label: "on-device inference" },
  ];
  return (
    <section className="wrap py-20">
      <div className="grid grid-cols-2 gap-px overflow-hidden rounded-[4px] border lg:grid-cols-4" style={{ borderColor: "var(--line-2)", background: "var(--line-2)" }}>
        {stats.map((s) => (
          <div key={s.label} className="p-7" style={{ background: "var(--bg)" }}>
            <div className="font-display tnum" style={{ fontSize: "clamp(2.4rem,5vw,3.6rem)", color: "var(--accent)" }}>
              <CountUp to={s.to} suffix={s.suffix} />
            </div>
            <div className="mt-1 font-mono text-[11px]" style={{ color: "var(--muted)" }}>{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Stack() {
  return (
    <section id="stack" className="wrap scroll-mt-20 py-24">
      <Head n="04" title="Stack" note="instruments in service" />
      <div>
        {CAPABILITIES.map((g) => (
          <div key={g.label} className="grid gap-y-2 py-5 sm:grid-cols-[150px_1fr] sm:gap-x-8" style={{ borderTop: "1px solid var(--line)" }}>
            <div className="kicker pt-1" style={{ color: "var(--accent)" }}>{g.label}</div>
            <div className="flex flex-wrap gap-x-6 gap-y-2 font-mono text-[13.5px]" style={{ color: "var(--fg)" }}>
              {g.items.map((s) => <span key={s} data-hover className="transition-colors hover:text-[color:var(--accent-2)]">{s}</span>)}
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
    <section id="contact" className="wrap scroll-mt-20 py-28">
      <Head n="05" title="Contact" note="available june 2026 · remote" />
      <Reveal>
        <h2 className="font-display" style={{ fontSize: "clamp(2.8rem,8vw,7rem)", color: "var(--fg)" }}>
          <Scramble text="let's build" /><br /><span style={{ color: "var(--accent)" }}><Scramble text="something smart." speed={1.4} /></span>
        </h2>
      </Reveal>
      <div className="mt-12 max-w-2xl">
        {rows.map((r) => (
          <Magnetic key={r.k} strength={0.15} className="block">
            <a href={r.href} data-hover target="_blank" rel="noopener noreferrer" className="group flex items-center gap-5 py-4" style={{ borderTop: "1px solid var(--line)" }}>
              <span className="kicker w-20 shrink-0" style={{ color: "var(--faint)" }}>{r.k}</span>
              <span className="font-mono text-[15px] transition-colors group-hover:text-[color:var(--accent)]" style={{ color: "var(--fg)" }}>{r.v}</span>
              <span className="ml-auto transition-transform group-hover:translate-x-1" style={{ color: "var(--accent)" }}>↗</span>
            </a>
          </Magnetic>
        ))}
        <div style={{ borderTop: "1px solid var(--line)" }} />
      </div>
    </section>
  );
}

export function MotionSections() {
  return (
    <>
      <Console />
      <VisionSandbox />
      <Work />
      <Numbers />
      <Stack />
      <Contact />
      <footer className="wrap">
        <div className="rule-faint" />
        <div className="flex flex-col gap-2 py-8 font-mono text-[11px] sm:flex-row sm:items-center" style={{ color: "var(--faint)" }}>
          <span>© 2026 {PROFILE.name} · Gandhinagar, IST</span>
          <span className="sm:ml-auto">rag + vision on-device · react · transformers.js · built from scratch</span>
        </div>
      </footer>
    </>
  );
}
