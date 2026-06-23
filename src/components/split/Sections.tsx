import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { C, F } from "./theme";
import { FS_PROFILE, FS_PROJECTS, FS_EXPERIENCE, FS_EDUCATION, FS_STACK } from "@/data/fullstack";
import { SplitConsole } from "./SplitConsole";

const ease = [0.22, 1, 0.36, 1] as const;
const grad = `linear-gradient(90deg, ${C.front}, ${C.back})`;

function Reveal({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  return <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-70px" }} transition={{ duration: 0.65, delay, ease }}>{children}</motion.div>;
}

function SectionShell({ id, n, eyebrow, title, intro, children }: { id: string; n: string; eyebrow: string; title: ReactNode; intro?: ReactNode; children: ReactNode }) {
  return (
    <section id={id} style={{ scrollMarginTop: 72 }}>
      <div style={{ maxWidth: 1140, margin: "0 auto", padding: "clamp(76px,12vh,150px) clamp(20px,5vw,44px)", display: "grid", gridTemplateColumns: "26px 1fr", columnGap: "clamp(14px,3vw,40px)" }}>
        <div style={{ position: "relative" }}>
          <div style={{ position: "absolute", left: 3, top: -2, bottom: -2, width: 1, background: `linear-gradient(${C.front}55, ${C.back}55)` }} />
          <div style={{ position: "absolute", left: -2, top: 6, width: 9, height: 9, borderRadius: 99, background: grad, boxShadow: `0 0 12px ${C.back}` }} />
        </div>
        <div>
          <Reveal>
            <div style={{ display: "flex", alignItems: "baseline", gap: 14, marginBottom: 14 }}>
              <span style={{ fontFamily: F.mono, fontSize: 12, color: C.faint }}>{n}</span>
              <span style={{ fontFamily: F.mono, fontSize: 12, letterSpacing: "0.18em", textTransform: "uppercase", color: C.front }}>{eyebrow}</span>
            </div>
            <h2 style={{ fontFamily: F.display, fontWeight: 600, fontSize: "clamp(2rem,4.4vw,3.2rem)", lineHeight: 1.04, letterSpacing: "-0.02em", color: C.fg, margin: 0, maxWidth: 760 }}>{title}</h2>
            {intro && <p style={{ fontFamily: F.body, fontSize: "clamp(15px,1.6vw,17px)", lineHeight: 1.6, color: C.sub, maxWidth: 560, margin: "16px 0 0" }}>{intro}</p>}
          </Reveal>
          {children}
        </div>
      </div>
    </section>
  );
}

export function Hero() {
  return (
    <section id="top" style={{ position: "relative", paddingTop: 96, paddingBottom: 40, overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, background: `radial-gradient(60% 50% at 20% 0%, ${C.front}1a, transparent 60%), radial-gradient(60% 50% at 85% 8%, ${C.back}1f, transparent 60%)`, pointerEvents: "none" }} />
      <div style={{ position: "relative", maxWidth: 1140, margin: "0 auto", padding: "0 clamp(20px,5vw,44px)" }}>
        <Reveal>
          <div style={{ fontFamily: F.mono, fontSize: 12.5, letterSpacing: "0.16em", textTransform: "uppercase", color: C.front, display: "flex", alignItems: "center", gap: 9 }}>
            <span style={{ width: 22, height: 1, background: grad }} /> Full-stack engineer
          </div>
        </Reveal>
        <Reveal delay={0.05}>
          <h1 style={{ fontFamily: F.display, fontWeight: 600, fontSize: "clamp(2.6rem,6.5vw,5rem)", lineHeight: 1.0, letterSpacing: "-0.025em", color: C.fg, margin: "18px 0 0" }}>
            I build <span style={{ background: grad, WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>both halves</span>.
          </h1>
        </Reveal>
        <Reveal delay={0.1}>
          <p style={{ fontFamily: F.body, fontSize: "clamp(15px,1.7vw,18px)", lineHeight: 1.6, color: C.sub, maxWidth: 540, margin: "20px 0 0" }}>
            Frontend and backend, wired together. Fire a request below and watch it cross the whole stack — route, auth, query, response — then land back in the UI.
          </p>
        </Reveal>
        <div style={{ marginTop: 36 }}><SplitConsole /></div>
      </div>
    </section>
  );
}

function Work() {
  return (
    <SectionShell id="work" n="01" eyebrow="selected work" title={<>Three products,<br />front to back.</>} intro="The same apps you traced above — each built across the whole stack and shipped.">
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(330px,1fr))", gap: 16, marginTop: 42 }}>
        {FS_PROJECTS.map((p, i) => (
          <Reveal key={p.id} delay={i * 0.06}>
            <article style={{ background: C.panel, border: `1px solid ${C.line2}`, borderRadius: 12, padding: "22px 22px 24px", height: "100%" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ fontFamily: F.display, fontWeight: 600, fontSize: 21, color: C.fg }}>{p.name}</span>
                <span style={{ marginLeft: "auto", fontFamily: F.mono, fontSize: 11, color: p.status === "live" ? C.ok : p.status === "building" ? C.warn : C.sub }}>{p.status}</span>
                {p.liveUrl && <a href={p.liveUrl} target="_blank" rel="noopener noreferrer" style={{ fontFamily: F.mono, fontSize: 11, color: C.back, textDecoration: "none" }}>↗</a>}
              </div>
              <div style={{ fontFamily: F.body, fontSize: 14, color: C.front, fontWeight: 600, marginTop: 3 }}>{p.tag}</div>
              <p style={{ fontFamily: F.body, fontSize: 13.5, lineHeight: 1.6, color: C.sub, margin: "13px 0 16px" }}>{p.blurb}</p>
              {([["frontend", p.frontend, C.front], ["backend", p.backend, C.back]] as const).map(([label, items, col]) => (
                <div key={label} style={{ marginTop: 10 }}>
                  <div style={{ fontFamily: F.mono, fontSize: 10, textTransform: "uppercase", letterSpacing: "0.14em", color: col, marginBottom: 7 }}>{label}</div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                    {items.map((t) => <span key={t} style={{ fontFamily: F.mono, fontSize: 11, color: C.fg, border: `1px solid ${col}44`, background: `${col}12`, borderRadius: 6, padding: "3px 8px" }}>{t}</span>)}
                  </div>
                </div>
              ))}
            </article>
          </Reveal>
        ))}
      </div>
    </SectionShell>
  );
}

function About() {
  return (
    <SectionShell id="about" n="02" eyebrow="operator" title={<>Both ends, <span style={{ color: C.front }}>genuinely</span>.</>}
      intro="Most “full-stack” means a little of each. I own the product end to end — schema, API, auth, the interface, and the deploy — and I sweat the seams between them.">
      <Reveal delay={0.1}>
        <div style={{ marginTop: 46 }}>
          <div style={{ fontFamily: F.mono, fontSize: 11, textTransform: "uppercase", letterSpacing: "0.16em", color: C.faint, marginBottom: 4 }}>experience</div>
          {FS_EXPERIENCE.map((e) => (
            <div key={e.role} style={{ display: "grid", gridTemplateColumns: "minmax(120px,150px) 1fr", columnGap: "clamp(16px,3vw,40px)", padding: "20px 0", borderTop: `1px solid ${C.line}` }}>
              <div style={{ fontFamily: F.mono, fontSize: 12, color: C.back, paddingTop: 3 }}>{e.period}</div>
              <div>
                <div style={{ fontFamily: F.display, fontWeight: 600, fontSize: "clamp(1.1rem,2vw,1.45rem)", color: C.fg }}>{e.role} <span style={{ color: C.sub, fontWeight: 400, fontFamily: F.body }}>· {e.org}</span></div>
                <p style={{ fontFamily: F.body, fontSize: "clamp(13.5px,1.4vw,15px)", lineHeight: 1.6, color: C.sub, margin: "8px 0 0", maxWidth: 620 }}>{e.desc}</p>
              </div>
            </div>
          ))}
          <div style={{ display: "grid", gridTemplateColumns: "minmax(120px,150px) 1fr", columnGap: "clamp(16px,3vw,40px)", padding: "20px 0", borderTop: `1px solid ${C.line}` }}>
            <div style={{ fontFamily: F.mono, fontSize: 12, color: C.back, paddingTop: 3 }}>{FS_EDUCATION.period}</div>
            <div style={{ fontFamily: F.display, fontWeight: 600, fontSize: "clamp(1.1rem,2vw,1.45rem)", color: C.fg }}>{FS_EDUCATION.degree} <span style={{ color: C.sub, fontWeight: 400, fontFamily: F.body }}>· {FS_EDUCATION.org}</span></div>
          </div>
        </div>
      </Reveal>
    </SectionShell>
  );
}

function Stack() {
  return (
    <SectionShell id="stack" n="03" eyebrow="toolkit" title="The whole stack." intro="What I reach for across the front, the back, and everything wiring them together.">
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(230px,1fr))", gap: 16, marginTop: 44 }}>
        {FS_STACK.map((g, i) => {
          const col = g.label === "Frontend" ? C.front : g.label === "Backend" || g.label === "Data" ? C.back : C.ok;
          return (
            <Reveal key={g.label} delay={i * 0.05}>
              <div style={{ background: C.panel, border: `1px solid ${C.line2}`, borderRadius: 12, padding: "20px 20px 22px", height: "100%" }}>
                <div style={{ fontFamily: F.display, fontWeight: 600, fontSize: 18, color: C.fg }}>{g.label}</div>
                <div style={{ width: 24, height: 2, background: col, margin: "9px 0 15px" }} />
                <div style={{ display: "flex", flexWrap: "wrap", gap: "7px 9px" }}>{g.items.map((it) => <span key={it} style={{ fontFamily: F.body, fontSize: 13.5, color: C.sub }}>{it}</span>)}</div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </SectionShell>
  );
}

function Contact() {
  const links = [
    { k: "github", v: "github.com/" + FS_PROFILE.githubHandle, href: FS_PROFILE.github },
    { k: "linkedin", v: "in/vishvam129", href: FS_PROFILE.linkedin },
    { k: "résumé", v: "FullStack_Developer.pdf", href: FS_PROFILE.resume },
  ];
  return (
    <SectionShell id="contact" n="04" eyebrow="say hi" title={<>Let&apos;s ship<br />something <span style={{ background: grad, WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>good</span>.</>}>
      <Reveal delay={0.08}>
        <a href={`mailto:${FS_PROFILE.email}`} style={{ display: "inline-flex", alignItems: "center", gap: 12, marginTop: 32, fontFamily: F.display, fontWeight: 600, fontSize: "clamp(1.4rem,3vw,2.2rem)", color: C.fg, textDecoration: "none", borderBottom: `2px solid ${C.front}`, paddingBottom: 4 }}>
          {FS_PROFILE.email} <span style={{ color: C.front }}>↗</span>
        </a>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "10px 26px", marginTop: 34 }}>
          {links.map((r) => (
            <a key={r.k} href={r.href} target="_blank" rel="noopener noreferrer" style={{ fontFamily: F.body, fontSize: 15, color: C.sub, textDecoration: "none" }} onMouseEnter={(e) => (e.currentTarget.style.color = C.back)} onMouseLeave={(e) => (e.currentTarget.style.color = C.sub)}>
              <span style={{ fontFamily: F.mono, fontSize: 11, color: C.faint, marginRight: 8 }}>{r.k}</span>{r.v} ↗
            </a>
          ))}
        </div>
      </Reveal>
    </SectionShell>
  );
}

function Footer() {
  return (
    <footer style={{ borderTop: `1px solid ${C.line}` }}>
      <div style={{ maxWidth: 1140, margin: "0 auto", padding: "24px clamp(20px,5vw,44px)", display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center", fontFamily: F.mono, fontSize: 11.5, color: C.faint }}>
        <span>© 2026 {FS_PROFILE.name}</span>
        <span style={{ marginLeft: "auto" }}>frontend + backend · one engineer · React + Vite</span>
      </div>
    </footer>
  );
}

export function Sections() {
  return <div style={{ position: "relative", background: C.bg }}><Work /><About /><Stack /><Contact /><Footer /></div>;
}
