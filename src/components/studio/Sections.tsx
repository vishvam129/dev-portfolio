import { C, F } from "./theme";
import { FS_PROFILE, FS_EXPERIENCE, FS_EDUCATION, FS_STACK } from "@/data/fullstack";
import { Reveal, SectionShell } from "./ui";

function About() {
  return (
    <SectionShell id="about" index="02" eyebrow="who" title={<>Full-stack, <span style={{ fontStyle: "italic", color: C.accent }}>genuinely</span>.</>}
      intro="Most “full-stack” means a little of each. I ship the whole product — schema, API, auth, the interface, and the deploy — and I sweat the seams between them.">
      <Reveal delay={0.1}>
        <div style={{ marginTop: 50 }}>
          <div style={{ fontFamily: F.mono, fontSize: 11, textTransform: "uppercase", letterSpacing: "0.16em", color: C.faint, marginBottom: 4 }}>experience</div>
          {FS_EXPERIENCE.map((e) => (
            <div key={e.role} style={{ display: "grid", gridTemplateColumns: "minmax(120px,160px) 1fr", columnGap: "clamp(16px,3vw,44px)", padding: "22px 0", borderTop: `1px solid ${C.line}` }}>
              <div style={{ fontFamily: F.mono, fontSize: 12.5, color: C.accent, paddingTop: 4 }}>{e.period}</div>
              <div>
                <div style={{ fontFamily: F.display, fontWeight: 600, fontSize: "clamp(1.2rem,2.2vw,1.55rem)", color: C.ink }}>{e.role} <span style={{ color: C.sub, fontWeight: 400, fontFamily: F.body }}>· {e.org}</span></div>
                <p style={{ fontFamily: F.body, fontSize: "clamp(13.5px,1.4vw,15px)", lineHeight: 1.6, color: C.sub, margin: "9px 0 0", maxWidth: 620 }}>{e.desc}</p>
              </div>
            </div>
          ))}
          <div style={{ display: "grid", gridTemplateColumns: "minmax(120px,160px) 1fr", columnGap: "clamp(16px,3vw,44px)", padding: "22px 0", borderTop: `1px solid ${C.line}` }}>
            <div style={{ fontFamily: F.mono, fontSize: 12.5, color: C.accent, paddingTop: 4 }}>{FS_EDUCATION.period}</div>
            <div style={{ fontFamily: F.display, fontWeight: 600, fontSize: "clamp(1.2rem,2.2vw,1.55rem)", color: C.ink }}>{FS_EDUCATION.degree} <span style={{ color: C.sub, fontWeight: 400, fontFamily: F.body }}>· {FS_EDUCATION.org}</span></div>
          </div>
        </div>
      </Reveal>
    </SectionShell>
  );
}

function Stack() {
  return (
    <SectionShell id="stack" index="03" eyebrow="toolkit" title="The whole stack." intro="What I reach for across the front, the back, and everything wiring them together.">
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(230px,1fr))", gap: 16, marginTop: 46 }}>
        {FS_STACK.map((g, i) => (
          <Reveal key={g.label} delay={i * 0.06}>
            <div style={{ background: C.surface, border: `1px solid ${C.line}`, borderRadius: 14, padding: "22px 22px 24px", height: "100%", boxShadow: `0 10px 30px -18px ${C.shadowSoft}` }}>
              <div style={{ fontFamily: F.display, fontWeight: 600, fontSize: 19, color: C.ink }}>{g.label}</div>
              <div style={{ width: 26, height: 2, background: C.accent, margin: "10px 0 16px" }} />
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px 10px" }}>
                {g.items.map((it) => <span key={it} style={{ fontFamily: F.body, fontSize: 14, color: C.sub }}>{it}</span>)}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </SectionShell>
  );
}

function Contact() {
  const links = [
    { k: "GitHub", v: "github.com/" + FS_PROFILE.githubHandle, href: FS_PROFILE.github },
    { k: "LinkedIn", v: "in/vishvam129", href: FS_PROFILE.linkedin },
    { k: "Résumé", v: "FullStack_Developer.pdf", href: FS_PROFILE.resume },
  ];
  return (
    <SectionShell id="contact" index="04" eyebrow="say hi" title={<>Let&apos;s build<br />something <span style={{ fontStyle: "italic", color: C.accent }}>good</span>.</>}>
      <Reveal delay={0.08}>
        <a href={`mailto:${FS_PROFILE.email}`} style={{ display: "inline-flex", alignItems: "center", gap: 12, marginTop: 34, fontFamily: F.display, fontWeight: 600, fontSize: "clamp(1.4rem,3vw,2.2rem)", color: C.ink, textDecoration: "none", borderBottom: `2px solid ${C.accent}`, paddingBottom: 4 }}>
          {FS_PROFILE.email} <span style={{ color: C.accent }}>↗</span>
        </a>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "10px 28px", marginTop: 36 }}>
          {links.map((r) => (
            <a key={r.k} href={r.href} target="_blank" rel="noopener noreferrer" style={{ fontFamily: F.body, fontSize: 15, color: C.sub, textDecoration: "none" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = C.accent)} onMouseLeave={(e) => (e.currentTarget.style.color = C.sub)}>
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
      <div style={{ maxWidth: 1180, margin: "0 auto", padding: "26px clamp(20px,5vw,48px)", display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center", fontFamily: F.mono, fontSize: 12, color: C.faint }}>
        <span>© 2026 {FS_PROFILE.name}</span>
        <span style={{ marginLeft: "auto" }}>designed &amp; built end-to-end · React + Vite</span>
      </div>
    </footer>
  );
}

export function Sections() {
  return (
    <div style={{ position: "relative", background: C.bg }}>
      <About />
      <Stack />
      <Contact />
      <Footer />
    </div>
  );
}
