import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { B_PROFILE, B_STACK, SERVICES } from "@/data/backend";
import { C, F } from "./theme";

function Reveal({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  return (
    <motion.div initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-70px" }} transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}>
      {children}
    </motion.div>
  );
}

/** Section shell with the left "backplane" spine + a glowing node at the eyebrow. */
function Section({ id, eyebrow, children }: { id: string; eyebrow: string; children: ReactNode }) {
  return (
    <section id={id} style={{ scrollMarginTop: 70 }}>
      <div style={{ maxWidth: 1080, margin: "0 auto", padding: "clamp(72px,13vh,160px) clamp(20px,5vw,40px)", display: "grid", gridTemplateColumns: "26px 1fr", columnGap: "clamp(14px,3vw,40px)" }}>
        <div style={{ position: "relative" }}>
          <div style={{ position: "absolute", left: 3, top: -2, bottom: -2, width: 1, background: `linear-gradient(${C.line2}, ${C.line})` }} />
          <div style={{ position: "absolute", left: -1, top: 6, width: 9, height: 9, borderRadius: 9, background: C.cyan, boxShadow: `0 0 12px ${C.cyan}` }} />
        </div>
        <div>
          <Reveal>
            <div style={{ fontFamily: F.mono, fontSize: 11.5, letterSpacing: "0.24em", textTransform: "uppercase", color: C.cyan, marginBottom: 22 }}>{eyebrow}</div>
          </Reveal>
          {children}
        </div>
      </div>
    </section>
  );
}

const H2: React.CSSProperties = { fontFamily: F.disp, fontWeight: 600, fontSize: "clamp(1.9rem,4.2vw,3.1rem)", lineHeight: 1.05, letterSpacing: "-0.02em", color: C.fg, margin: 0 };

function ProjectCard({ s }: { s: (typeof SERVICES)[number] }) {
  const col = s.status === "ok" ? C.green : C.amber;
  return (
    <article id={`card-${s.id}`} style={{ scrollMarginTop: 80, display: "flex", flexDirection: "column", gap: 13, border: `1px solid ${C.line}`, borderRadius: 9, background: C.surface, padding: "22px 22px 20px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <span style={{ width: 9, height: 9, borderRadius: 9, background: col, boxShadow: `0 0 9px ${col}` }} />
        <span style={{ fontFamily: F.disp, fontWeight: 600, fontSize: 21, letterSpacing: "-0.01em", color: C.fg }}>{s.project}</span>
        <span style={{ marginLeft: "auto", fontFamily: F.mono, fontSize: 12, color: col, fontVariantNumeric: "tabular-nums" }}>{s.uptime}%</span>
      </div>
      <div style={{ display: "flex", gap: 14, fontFamily: F.mono, fontSize: 11.5, color: C.faint, marginTop: -6 }}>
        <span style={{ color: C.cyan }}>{s.name}</span>
        <span>p50 {s.p50}ms</span><span>p99 {s.p99}ms</span>
      </div>
      <p style={{ fontFamily: F.body, fontSize: 13.5, lineHeight: 1.6, color: C.muted, margin: 0 }}>{s.blurb}</p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
        {s.stack.map((t) => <span key={t} style={{ fontFamily: F.mono, fontSize: 10.5, color: C.fg, border: `1px solid ${C.line}`, borderRadius: 4, padding: "2px 7px" }}>{t}</span>)}
      </div>
      <div style={{ fontFamily: F.mono, fontSize: 11.5, color: C.muted, marginTop: 2 }}>
        <span style={{ color: C.green }}>✓ recovered</span> · {s.incidents[0].title}
      </div>
      <div style={{ display: "flex", gap: 18, marginTop: 4, fontFamily: F.mono, fontSize: 12 }}>
        <button onClick={() => { window.dispatchEvent(new CustomEvent("dc:rack", { detail: s.id })); window.scrollTo({ top: 0, behavior: "smooth" }); }}
          style={{ background: "transparent", border: "none", padding: 0, cursor: "pointer", color: C.cyan, fontFamily: F.mono, fontSize: 12 }}>inspect rack ↑</button>
        {s.url && <a href={s.url} target="_blank" rel="noopener noreferrer" style={{ color: C.muted, textDecoration: "none" }}>live ↗</a>}
      </div>
    </article>
  );
}

function Projects() {
  return (
    <Section id="projects" eyebrow="// selected work">
      <Reveal><h2 style={H2}>Four systems in production.</h2></Reveal>
      <Reveal delay={0.06}>
        <p style={{ fontFamily: F.body, fontSize: "clamp(14px,1.5vw,16px)", lineHeight: 1.6, color: C.muted, maxWidth: 560, margin: "16px 0 0" }}>
          The same racks you can walk above — here as the record. Real uptime, real latency, and the incidents I&apos;ve recovered from.
        </p>
      </Reveal>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))", gap: 16, marginTop: 40 }}>
        {SERVICES.map((s, i) => (
          <Reveal key={s.id} delay={i * 0.06}><ProjectCard s={s} /></Reveal>
        ))}
      </div>
    </Section>
  );
}

function About() {
  const langs = B_STACK[0].items.length;
  const avg = (SERVICES.reduce((a, s) => a + s.uptime, 0) / SERVICES.length).toFixed(2);
  const stats = [
    { v: String(SERVICES.length), k: "systems shipped" },
    { v: avg + "%", k: "avg uptime" },
    { v: langs + "+", k: "languages" },
    { v: "1100+", k: "lines of tests" },
  ];
  return (
    <Section id="operator" eyebrow="// operator">
      <Reveal>
        <h2 style={H2}>I build the parts users<br />never see — and never<br />have to <span style={{ color: C.cyan }}>think about.</span></h2>
      </Reveal>
      <Reveal delay={0.08}>
        <p style={{ fontFamily: F.body, fontSize: "clamp(15px,1.6vw,17.5px)", lineHeight: 1.7, color: C.muted, maxWidth: 620, margin: "26px 0 0" }}>
          I&apos;m {B_PROFILE.name}, a backend engineer. APIs, data models, auth, async pipelines, and the
          infrastructure underneath them. I care about the boring parts that decide whether a product is
          trustworthy — idempotency, observability, and what happens when something fails at the worst
          possible time. The racks above are real systems I&apos;ve shipped; this is the operator behind them.
        </p>
      </Reveal>
      <Reveal delay={0.15}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(130px,1fr))", gap: 1, marginTop: 42, border: `1px solid ${C.line}`, background: C.line }}>
          {stats.map((s) => (
            <div key={s.k} style={{ background: C.bg, padding: "20px 22px" }}>
              <div style={{ fontFamily: F.disp, fontSize: "clamp(1.6rem,3vw,2.2rem)", color: C.fg, fontVariantNumeric: "tabular-nums" }}>{s.v}</div>
              <div style={{ fontFamily: F.mono, fontSize: 11, color: C.faint, marginTop: 4, textTransform: "uppercase", letterSpacing: "0.1em" }}>{s.k}</div>
            </div>
          ))}
        </div>
      </Reveal>
    </Section>
  );
}

const PRINCIPLES = [
  { n: "01", t: "Ship small, ship observable", d: "Every service goes out with health checks, structured logs, and traces. If I can't see it in production, I don't trust it in production." },
  { n: "02", t: "Designed for 3am", d: "Idempotency keys, queue backpressure, graceful degradation. Things fail — the job is to fail safe, page no one, and recover fast." },
  { n: "03", t: "The schema is the contract", d: "Validate at the edge with Pydantic and Prisma, types end to end. Bad input dies early at the boundary, never quietly in the database." },
];

function Principles() {
  return (
    <Section id="how" eyebrow="// how I operate">
      <Reveal><h2 style={H2}>Three rules I don&apos;t break.</h2></Reveal>
      <div style={{ marginTop: 44, display: "flex", flexDirection: "column", gap: 0 }}>
        {PRINCIPLES.map((p, i) => (
          <Reveal key={p.n} delay={i * 0.07}>
            <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", columnGap: "clamp(18px,4vw,56px)", alignItems: "baseline", padding: "26px 0", borderTop: `1px solid ${C.line}` }}>
              <span style={{ fontFamily: F.mono, fontSize: 13, color: C.cyan }}>{p.n}</span>
              <div>
                <h3 style={{ fontFamily: F.disp, fontWeight: 600, fontSize: "clamp(1.2rem,2.4vw,1.75rem)", color: C.fg, margin: 0, letterSpacing: "-0.01em" }}>{p.t}</h3>
                <p style={{ fontFamily: F.body, fontSize: "clamp(14px,1.5vw,16px)", lineHeight: 1.65, color: C.muted, margin: "10px 0 0", maxWidth: 600 }}>{p.d}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

function Stack() {
  return (
    <Section id="stack" eyebrow="// the stack">
      <Reveal><h2 style={H2}>Tools I reach for.</h2></Reveal>
      <div style={{ marginTop: 40 }}>
        {B_STACK.map((g, i) => (
          <Reveal key={g.label} delay={i * 0.05}>
            <div style={{ display: "grid", gridTemplateColumns: "minmax(120px,180px) 1fr", columnGap: "clamp(16px,4vw,48px)", padding: "22px 0", borderTop: `1px solid ${C.line}` }}>
              <div style={{ fontFamily: F.mono, fontSize: 12, textTransform: "uppercase", letterSpacing: "0.14em", color: C.faint, paddingTop: 4 }}>{g.label}</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "10px 14px" }}>
                {g.items.map((it) => (
                  <span key={it} style={{ fontFamily: F.body, fontSize: "clamp(15px,1.7vw,19px)", color: C.fg }}>{it}</span>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

function Contact() {
  const links = [
    { k: "email", v: B_PROFILE.email, href: `mailto:${B_PROFILE.email}` },
    { k: "github", v: "github.com/" + B_PROFILE.githubHandle, href: B_PROFILE.github },
    { k: "linkedin", v: "in/vishvam129", href: B_PROFILE.linkedin },
    { k: "résumé", v: "Backend_Developer.pdf", href: B_PROFILE.resume },
  ];
  return (
    <Section id="contact" eyebrow="// status: available">
      <Reveal>
        <h2 style={{ ...H2, fontSize: "clamp(2.1rem,5vw,3.6rem)" }}>Need someone to keep<br />it <span style={{ color: C.cyan }}>running?</span></h2>
      </Reveal>
      <Reveal delay={0.1}>
        <div style={{ marginTop: 34, maxWidth: 640 }}>
          {links.map((r) => (
            <a key={r.k} href={r.href} target="_blank" rel="noopener noreferrer"
              style={{ display: "flex", alignItems: "center", gap: 18, padding: "16px 0", borderTop: `1px solid ${C.line}`, textDecoration: "none" }}
              onMouseEnter={(e) => { const v = e.currentTarget.querySelector("[data-v]") as HTMLElement; if (v) v.style.color = C.cyan; const a = e.currentTarget.querySelector("[data-a]") as HTMLElement; if (a) a.style.transform = "translateX(5px)"; }}
              onMouseLeave={(e) => { const v = e.currentTarget.querySelector("[data-v]") as HTMLElement; if (v) v.style.color = C.fg; const a = e.currentTarget.querySelector("[data-a]") as HTMLElement; if (a) a.style.transform = "none"; }}>
              <span style={{ fontFamily: F.mono, fontSize: 11.5, textTransform: "uppercase", letterSpacing: "0.12em", color: C.faint, width: 74 }}>{r.k}</span>
              <span data-v style={{ fontFamily: F.body, fontSize: "clamp(16px,2vw,22px)", color: C.fg, transition: "color 0.2s" }}>{r.v}</span>
              <span data-a style={{ marginLeft: "auto", color: C.cyan, transition: "transform 0.2s" }}>↗</span>
            </a>
          ))}
          <div style={{ borderTop: `1px solid ${C.line}` }} />
        </div>
      </Reveal>
    </Section>
  );
}

function Footer() {
  return (
    <footer style={{ borderTop: `1px solid ${C.line}`, fontFamily: F.mono }}>
      <div style={{ maxWidth: 1080, margin: "0 auto", padding: "24px clamp(20px,5vw,40px)", display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center", fontSize: 11, color: C.faint, fontVariantNumeric: "tabular-nums" }}>
        <span style={{ display: "flex", alignItems: "center", gap: 7 }}><i style={{ width: 6, height: 6, borderRadius: 9, background: C.green, boxShadow: `0 0 7px ${C.green}` }} /> all systems operational</span>
        <span style={{ marginLeft: "auto" }}>© 2026 {B_PROFILE.name} · {B_PROFILE.sha} · {B_PROFILE.region.split(" ")[0]}</span>
      </div>
    </footer>
  );
}

export function Sections() {
  return (
    <div style={{ position: "relative", background: C.bg, zIndex: 2 }}>
      <Projects />
      <About />
      <Principles />
      <Stack />
      <Contact />
      <Footer />
    </div>
  );
}
