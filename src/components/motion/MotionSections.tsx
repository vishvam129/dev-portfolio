import { useState } from "react";
import { Assistant } from "@/components/ai/Assistant";
import { VisionSandbox } from "@/components/ai/VisionSandbox";
import { Pipeline } from "./Pipeline";
import { Reveal } from "@/components/fx/Reveal";
import { CountUp } from "@/components/fx/CountUp";
import { Scramble } from "@/components/fx/Scramble";
import { Magnetic } from "@/components/fx/Magnetic";
import { spotMove } from "@/components/fx/Spotlight";
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
      <div className="grid items-center gap-x-12 gap-y-8 lg:grid-cols-[0.62fr_1.38fr]">
        <Reveal>
          <h2 className="font-display" style={{ fontSize: "clamp(2rem,3.6vw,3rem)", color: "var(--fg)" }}>
            It answers from<br />my <span style={{ color: "var(--accent)" }}>résumé.</span>
          </h2>
          <p className="mt-5 max-w-sm text-[14.5px] leading-relaxed" style={{ color: "var(--muted)" }}>
            A real embedding model runs in a Web Worker, vectorizes my history, and answers by
            cosine retrieval — streamed and <span style={{ color: "var(--fg)" }}>cited</span>, fully client-side.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {["Transformers.js", "ONNX / WASM", "384-dim", "0 servers"].map((c) => <span key={c} className="chip">{c}</span>)}
          </div>
        </Reveal>
        <Reveal delay={0.1}><div className="crop spot" onMouseMove={spotMove}><Assistant /></div></Reveal>
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
            <div key={p.id} onMouseMove={spotMove} className="spot border-t" style={{ borderColor: "var(--line)" }}>
              <button data-hover onClick={() => setOpen(active ? null : p.id)} aria-expanded={active}
                className="grid w-full grid-cols-[auto_1fr_auto] items-center gap-5 py-6 text-left">
                <span className="font-mono text-[12px]" style={{ color: active ? "var(--accent)" : "var(--faint)" }}>{String(i + 1).padStart(2, "0")}</span>
                <h3 className="font-display transition-all duration-300" style={{ fontSize: "clamp(1.7rem,3.4vw,2.6rem)", color: active ? "var(--accent)" : "var(--fg)", transform: active ? "translateX(8px)" : "none" }}>{p.name}</h3>
                <div className="flex items-center gap-4">
                  <span className="hidden font-mono text-[11px] uppercase tracking-wider sm:inline" style={{ color: STATUS[p.status].color }}>{STATUS[p.status].label}</span>
                  <span className="grid h-7 w-7 place-items-center rounded-full border text-[13px] transition-all" style={{ borderColor: active ? "var(--accent)" : "var(--line-2)", color: "var(--accent)", transform: active ? "rotate(45deg)" : "none" }}>+</span>
                </div>
              </button>
              <div className="grid transition-all duration-500" style={{ gridTemplateRows: active ? "1fr" : "0fr" }}>
                <div className="overflow-hidden">
                  <div className="grid gap-8 pb-10 lg:grid-cols-[1.5fr_1fr] lg:pl-[3.4rem]">
                    <div>
                      <p className="max-w-xl text-[15.5px] leading-relaxed" style={{ color: "var(--fg)" }}>{p.blurb}</p>
                      {p.models && (
                        <div className="mt-6">
                          <div className="kicker mb-2" style={{ color: "var(--faint)", fontSize: "0.58rem" }}>models</div>
                          <div className="flex flex-wrap gap-2">{p.models.map((m) => <span key={m} className="chip" style={{ color: "var(--accent-2)", borderColor: "var(--line-2)" }}>{m}</span>)}</div>
                        </div>
                      )}
                      <div className="mt-5">
                        <div className="kicker mb-2" style={{ color: "var(--faint)", fontSize: "0.58rem" }}>stack</div>
                        <div className="flex flex-wrap gap-2">{p.stack.map((s) => <span key={s} className="chip">{s}</span>)}</div>
                      </div>
                      {p.url && <a href={p.url} data-hover target="_blank" rel="noopener noreferrer" className="btn-lime mt-7">visit live ↗</a>}
                    </div>
                    <div className="self-start rounded-[4px] border p-5" style={{ borderColor: "var(--line-2)", background: "var(--surface)" }}>
                      <div className="kicker mb-3" style={{ color: "var(--faint)", fontSize: "0.58rem" }}>metrics</div>
                      <dl className="space-y-3">
                        {p.metrics.map((m) => (
                          <div key={m.label} className="flex items-baseline justify-between gap-3 border-b pb-2" style={{ borderColor: "var(--line)" }}>
                            <dt className="font-mono text-[11px]" style={{ color: "var(--muted)" }}>{m.label}</dt>
                            <dd className="font-display tnum" style={{ fontSize: "1.15rem", color: "var(--accent)" }}>{m.value}</dd>
                          </div>
                        ))}
                      </dl>
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
          <div key={s.label} className="spot p-7" onMouseMove={spotMove} style={{ background: "var(--bg)" }}>
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
      <Pipeline />
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
