import { useEffect, useState, type ReactNode } from "react";
import { motion } from "framer-motion";
import { C, F } from "./theme";
import { Browser, Phone, Mock } from "./Device";
import { FS_PROFILE, FS_PROJECTS, FS_EXPERIENCE, FS_EDUCATION, FS_STACK, type Project } from "@/data/fullstack";

const ease = [0.22, 1, 0.36, 1] as const;
const flagship = FS_PROJECTS.find((p) => p.id === "lendlocal")!;

function Reveal({ children, delay = 0, y = 26 }: { children: ReactNode; delay?: number; y?: number }) {
  return <motion.div initial={{ opacity: 0, y }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.7, delay, ease }}>{children}</motion.div>;
}

function Frame({ p }: { p: Project }) {
  const phone = p.devices[0] === "mobile";
  const inner = <Mock preview={p.preview} accent={p.accent} />;
  return phone ? <Phone>{inner}</Phone> : <Browser url={p.liveUrl ? p.liveUrl.replace("https://", "") : `${p.id}.app`}>{inner}</Browser>;
}

/* ---------- nav ---------- */
const NAV = [{ href: "#work", l: "work" }, { href: "#about", l: "about" }, { href: "#stack", l: "stack" }, { href: "#contact", l: "contact" }];
const PORT = [{ href: "/", l: "ai" }, { href: "/backend", l: "backend" }, { href: "/full-stack", l: "full-stack", on: true }];

function Nav() {
  const [s, setS] = useState(false);
  useEffect(() => { const on = () => setS(window.scrollY > 40); on(); window.addEventListener("scroll", on, { passive: true }); return () => window.removeEventListener("scroll", on); }, []);
  return (
    <header style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 50, height: 60, display: "flex", alignItems: "center", gap: 16, padding: "0 clamp(18px,5vw,48px)", fontFamily: F.body, color: C.fg, borderBottom: `1px solid ${s ? C.line : "transparent"}`, background: s ? "rgba(10,10,15,0.72)" : "transparent", backdropFilter: s ? "blur(14px)" : "none", transition: "background .4s,border-color .4s" }}>
      <a href="#top" style={{ fontFamily: F.display, fontWeight: 700, fontSize: 18, letterSpacing: "-0.02em", textDecoration: "none", color: C.fg }}>Vishvam<span style={{ color: C.accent }}>.</span></a>
      <nav className="dc-hide-sm" style={{ display: "flex", gap: 22, marginLeft: 22, fontFamily: F.mono, fontSize: 12.5 }}>
        {NAV.map((x) => <a key={x.href} href={x.href} style={{ color: C.sub, textDecoration: "none" }} onMouseEnter={(e) => (e.currentTarget.style.color = C.fg)} onMouseLeave={(e) => (e.currentTarget.style.color = C.sub)}>{x.l}</a>)}
      </nav>
      <nav style={{ marginLeft: "auto", display: "flex", gap: 2, border: `1px solid ${C.line2}`, borderRadius: 99, padding: 3 }}>
        {PORT.map((p) => <a key={p.href} href={p.href} style={{ padding: "5px 12px", borderRadius: 99, textDecoration: "none", fontFamily: F.mono, fontSize: 11.5, background: p.on ? C.fg : "transparent", color: p.on ? C.bg : C.sub }}>{p.l}</a>)}
      </nav>
    </header>
  );
}

/* ---------- hero ---------- */
function Hero() {
  return (
    <section id="top" style={{ position: "relative", padding: "clamp(120px,16vh,180px) clamp(20px,5vw,48px) clamp(60px,9vh,110px)", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: "-10%", left: "50%", transform: "translateX(-50%)", width: "80%", height: "60%", background: `radial-gradient(closest-side, ${flagship.accent}1f, transparent)`, pointerEvents: "none" }} />
      <div style={{ position: "relative", maxWidth: 1080, margin: "0 auto", textAlign: "center" }}>
        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease }}
          style={{ display: "inline-flex", alignItems: "center", gap: 8, fontFamily: F.mono, fontSize: 12, letterSpacing: "0.14em", textTransform: "uppercase", color: C.sub, border: `1px solid ${C.line}`, borderRadius: 99, padding: "6px 14px" }}>
          <span style={{ width: 6, height: 6, borderRadius: 99, background: C.ok, boxShadow: `0 0 8px ${C.ok}` }} /> Full-stack engineer · 3 products live
        </motion.div>
        <motion.h1 initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease, delay: 0.06 }}
          style={{ fontFamily: F.display, fontWeight: 700, fontSize: "clamp(2.7rem,8vw,6rem)", lineHeight: 0.96, letterSpacing: "-0.04em", color: C.fg, margin: "26px 0 0" }}>
          I build &amp; ship<br />the <span style={{ fontStyle: "italic", fontWeight: 600, color: flagship.accent }}>whole</span> product.
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease, delay: 0.12 }}
          style={{ fontFamily: F.body, fontSize: "clamp(15px,1.8vw,19px)", lineHeight: 1.55, color: C.sub, maxWidth: 520, margin: "22px auto 0" }}>
          Frontend, backend, mobile — designed, built, and deployed end to end, by one engineer.
        </motion.p>
      </div>

      {/* flagship product */}
      <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.9, ease, delay: 0.2 }}
        style={{ position: "relative", maxWidth: 880, margin: "clamp(40px,6vw,72px) auto 0" }}>
        <div style={{ position: "absolute", inset: "-8% -4% -12%", background: `radial-gradient(closest-side, ${flagship.accent}26, transparent 75%)`, filter: "blur(20px)", pointerEvents: "none" }} />
        <div style={{ position: "relative" }}><Frame p={flagship} /></div>
        <div style={{ display: "flex", justifyContent: "center", gap: 18, marginTop: 22, fontFamily: F.mono, fontSize: 12.5 }}>
          <span style={{ color: C.fg }}><span style={{ color: C.ok }}>● </span>{flagship.name} — {flagship.tag}</span>
          {flagship.liveUrl && <a href={flagship.liveUrl} target="_blank" rel="noopener noreferrer" style={{ color: flagship.accent, textDecoration: "none" }}>open live ↗</a>}
        </div>
      </motion.div>
    </section>
  );
}

/* ---------- shipped products ---------- */
function Work() {
  return (
    <section id="work" style={{ maxWidth: 1140, margin: "0 auto", padding: "clamp(70px,10vh,130px) clamp(20px,5vw,48px) clamp(30px,5vh,60px)" }}>
      <Reveal>
        <div style={{ fontFamily: F.mono, fontSize: 12, letterSpacing: "0.2em", textTransform: "uppercase", color: C.accent }}>// shipped products</div>
        <h2 style={{ fontFamily: F.display, fontWeight: 700, fontSize: "clamp(2rem,4.6vw,3.3rem)", letterSpacing: "-0.03em", color: C.fg, margin: "14px 0 0" }}>Three, end to end.</h2>
      </Reveal>
      {FS_PROJECTS.map((p, i) => (
        <Reveal key={p.id} delay={0.04}>
          <div className={`pk-row${i % 2 ? " rev" : ""}`} style={{ marginTop: i === 0 ? 56 : "clamp(64px,10vh,120px)" }}>
            <div style={{ minWidth: 0 }}>
              <div style={{ position: "relative" }}>
                <div style={{ position: "absolute", inset: "-6% -3% -10%", background: `radial-gradient(closest-side, ${p.accent}22, transparent 75%)`, filter: "blur(16px)", pointerEvents: "none" }} />
                <div style={{ position: "relative" }}><Frame p={p} /></div>
              </div>
            </div>
            <div style={{ minWidth: 0 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                <span style={{ fontFamily: F.mono, fontSize: 11, color: p.status === "live" ? C.ok : p.status === "building" ? "#ffb454" : C.sub }}>● {p.status}</span>
                <span style={{ fontFamily: F.mono, fontSize: 11, color: C.faint }}>{p.year}</span>
              </div>
              <h3 style={{ fontFamily: F.display, fontWeight: 700, fontSize: "clamp(1.9rem,3.6vw,2.7rem)", letterSpacing: "-0.02em", color: C.fg, margin: 0 }}>{p.name}</h3>
              <div style={{ fontFamily: F.body, fontSize: "clamp(15px,1.7vw,18px)", color: p.accent, fontWeight: 600, marginTop: 3 }}>{p.tag}</div>
              <p style={{ fontFamily: F.body, fontSize: "clamp(14px,1.5vw,15.5px)", lineHeight: 1.65, color: C.sub, margin: "16px 0 0", maxWidth: 500 }}>{p.blurb}</p>
              <ul style={{ listStyle: "none", padding: 0, margin: "18px 0 0", display: "flex", flexDirection: "column", gap: 8 }}>
                {p.highlights.slice(0, 3).map((h) => <li key={h} style={{ display: "flex", gap: 9, fontFamily: F.body, fontSize: 14, color: C.fg }}><span style={{ color: p.accent }}>→</span>{h}</li>)}
              </ul>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 7, marginTop: 18 }}>
                {[...p.frontend, ...p.backend].map((t) => <span key={t} style={{ fontFamily: F.mono, fontSize: 11, color: C.fg, border: `1px solid ${C.line}`, background: C.surface, borderRadius: 6, padding: "3px 9px" }}>{t}</span>)}
              </div>
              {p.liveUrl && <a href={p.liveUrl} target="_blank" rel="noopener noreferrer" style={{ display: "inline-block", marginTop: 20, fontFamily: F.mono, fontSize: 12.5, color: p.accent, textDecoration: "none" }}>open live deployment ↗</a>}
            </div>
          </div>
        </Reveal>
      ))}
    </section>
  );
}

/* ---------- about / stack / contact ---------- */
function Wrap({ id, eyebrow, title, children }: { id: string; eyebrow: string; title: ReactNode; children: ReactNode }) {
  return (
    <section id={id} style={{ maxWidth: 1140, margin: "0 auto", padding: "clamp(70px,10vh,130px) clamp(20px,5vw,48px)", scrollMarginTop: 72 }}>
      <Reveal>
        <div style={{ fontFamily: F.mono, fontSize: 12, letterSpacing: "0.2em", textTransform: "uppercase", color: C.accent }}>{eyebrow}</div>
        <h2 style={{ fontFamily: F.display, fontWeight: 700, fontSize: "clamp(2rem,4.6vw,3.3rem)", letterSpacing: "-0.03em", color: C.fg, margin: "14px 0 0" }}>{title}</h2>
      </Reveal>
      {children}
    </section>
  );
}

function About() {
  return (
    <Wrap id="about" eyebrow="// the engineer" title={<>One person, both ends.</>}>
      <Reveal delay={0.06}>
        <p style={{ fontFamily: F.body, fontSize: "clamp(15px,1.6vw,17px)", lineHeight: 1.65, color: C.sub, maxWidth: 600, margin: "20px 0 0" }}>
          I own products end to end — schema, API, auth, the interface, and the deploy — and I sweat the seams between them. React &amp; Next.js on the front, FastAPI &amp; Postgres on the back, shipped to web, mobile, and production.
        </p>
      </Reveal>
      <div style={{ marginTop: 44 }}>
        <Reveal><div style={{ fontFamily: F.mono, fontSize: 11, textTransform: "uppercase", letterSpacing: "0.16em", color: C.faint, marginBottom: 4 }}>experience</div></Reveal>
        {FS_EXPERIENCE.map((e, i) => (
          <Reveal key={e.role} delay={i * 0.05}>
            <div style={{ display: "grid", gridTemplateColumns: "minmax(120px,160px) 1fr", columnGap: "clamp(16px,3vw,44px)", padding: "20px 0", borderTop: `1px solid ${C.line}` }}>
              <div style={{ fontFamily: F.mono, fontSize: 12, color: C.accent, paddingTop: 3 }}>{e.period}</div>
              <div>
                <div style={{ fontFamily: F.display, fontWeight: 600, fontSize: "clamp(1.1rem,2vw,1.5rem)", color: C.fg }}>{e.role} <span style={{ color: C.sub, fontWeight: 400, fontFamily: F.body }}>· {e.org}</span></div>
                <p style={{ fontFamily: F.body, fontSize: "clamp(13.5px,1.4vw,15px)", lineHeight: 1.6, color: C.sub, margin: "8px 0 0", maxWidth: 620 }}>{e.desc}</p>
              </div>
            </div>
          </Reveal>
        ))}
        <Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "minmax(120px,160px) 1fr", columnGap: "clamp(16px,3vw,44px)", padding: "20px 0", borderTop: `1px solid ${C.line}` }}>
            <div style={{ fontFamily: F.mono, fontSize: 12, color: C.accent, paddingTop: 3 }}>{FS_EDUCATION.period}</div>
            <div style={{ fontFamily: F.display, fontWeight: 600, fontSize: "clamp(1.1rem,2vw,1.5rem)", color: C.fg }}>{FS_EDUCATION.degree} <span style={{ color: C.sub, fontWeight: 400, fontFamily: F.body }}>· {FS_EDUCATION.org}</span></div>
          </div>
        </Reveal>
      </div>
    </Wrap>
  );
}

function Stack() {
  return (
    <Wrap id="stack" eyebrow="// toolkit" title="The whole stack.">
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(230px,1fr))", gap: 16, marginTop: 42 }}>
        {FS_STACK.map((g, i) => (
          <Reveal key={g.label} delay={i * 0.05}>
            <div style={{ background: C.card, border: `1px solid ${C.line}`, borderRadius: 14, padding: "20px 20px 22px", height: "100%" }}>
              <div style={{ fontFamily: F.display, fontWeight: 600, fontSize: 18, color: C.fg }}>{g.label}</div>
              <div style={{ width: 24, height: 2, background: C.accent, margin: "9px 0 15px" }} />
              <div style={{ display: "flex", flexWrap: "wrap", gap: "7px 9px" }}>{g.items.map((it) => <span key={it} style={{ fontFamily: F.body, fontSize: 13.5, color: C.sub }}>{it}</span>)}</div>
            </div>
          </Reveal>
        ))}
      </div>
    </Wrap>
  );
}

function Contact() {
  const links = [
    { k: "github", v: "github.com/" + FS_PROFILE.githubHandle, href: FS_PROFILE.github },
    { k: "linkedin", v: "in/vishvam129", href: FS_PROFILE.linkedin },
    { k: "résumé", v: "FullStack_Developer.pdf", href: FS_PROFILE.resume },
  ];
  return (
    <Wrap id="contact" eyebrow="// say hi" title={<>Let&apos;s ship something.</>}>
      <Reveal delay={0.06}>
        <a href={`mailto:${FS_PROFILE.email}`} style={{ display: "inline-flex", alignItems: "center", gap: 12, marginTop: 28, fontFamily: F.display, fontWeight: 600, fontSize: "clamp(1.5rem,3.4vw,2.6rem)", letterSpacing: "-0.02em", color: C.fg, textDecoration: "none", borderBottom: `2px solid ${C.accent}`, paddingBottom: 5 }}>
          {FS_PROFILE.email} <span style={{ color: C.accent }}>↗</span>
        </a>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "10px 26px", marginTop: 32 }}>
          {links.map((r) => (
            <a key={r.k} href={r.href} target="_blank" rel="noopener noreferrer" style={{ fontFamily: F.body, fontSize: 15, color: C.sub, textDecoration: "none" }} onMouseEnter={(e) => (e.currentTarget.style.color = C.fg)} onMouseLeave={(e) => (e.currentTarget.style.color = C.sub)}>
              <span style={{ fontFamily: F.mono, fontSize: 11, color: C.faint, marginRight: 8 }}>{r.k}</span>{r.v} ↗
            </a>
          ))}
        </div>
      </Reveal>
    </Wrap>
  );
}

function Footer() {
  return (
    <footer style={{ borderTop: `1px solid ${C.line}` }}>
      <div style={{ maxWidth: 1140, margin: "0 auto", padding: "24px clamp(20px,5vw,48px)", display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center", fontFamily: F.mono, fontSize: 11.5, color: C.faint }}>
        <span>© 2026 {FS_PROFILE.name}</span>
        <span style={{ marginLeft: "auto" }}>designed &amp; shipped end to end · React + Vite</span>
      </div>
    </footer>
  );
}

export function FullStackContent() {
  return (
    <main style={{ background: C.bg, color: C.fg, fontFamily: F.body, minHeight: "100svh", overflowX: "hidden" }}>
      <Nav />
      <Hero />
      <Work />
      <About />
      <Stack />
      <Contact />
      <Footer />
    </main>
  );
}
