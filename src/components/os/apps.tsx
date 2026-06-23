import { useState } from "react";
import { C, F } from "./theme";
import { FS_PROJECTS, FS_STACK, FS_EXPERIENCE, FS_EDUCATION, FS_PROFILE, type Project } from "@/data/fullstack";
import { Mock } from "@/components/studio/Device";

const pad: React.CSSProperties = { padding: "20px 22px 24px" };

function Chip({ children }: { children: React.ReactNode }) {
  return <span style={{ fontFamily: F.mono, fontSize: 11.5, color: C.ink, border: `1px solid ${C.border}`, background: "rgba(255,255,255,0.55)", borderRadius: 99, padding: "3px 10px" }}>{children}</span>;
}

const STATUS: Record<Project["status"], string> = { live: C.ok, shipped: C.sub, building: "#d98a1f" };

export function ProjectApp({ id }: { id: string }) {
  const p = FS_PROJECTS.find((x) => x.id === id)!;
  const [live, setLive] = useState(false);
  return (
    <div>
      {/* preview banner */}
      <div style={{ position: "relative", height: 210, background: "#eee", borderBottom: `1px solid ${C.border}` }}>
        {live && p.liveUrl
          ? <iframe src={p.liveUrl} title={p.name} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: 0 }} />
          : <Mock preview={p.preview} accent={p.accent} />}
        {p.liveUrl && (
          <button onClick={() => setLive((v) => !v)} style={{ position: "absolute", right: 10, bottom: 10, fontFamily: F.mono, fontSize: 11, cursor: "pointer", border: "none", borderRadius: 99, padding: "5px 11px", background: live ? C.ink : "rgba(255,255,255,0.9)", color: live ? "#fff" : C.ink, boxShadow: `0 3px 10px ${C.shadowSoft}` }}>{live ? "■ stop" : "▸ live app"}</button>
        )}
      </div>
      <div style={pad}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontFamily: F.mono, fontSize: 11, color: STATUS[p.status] }}><span style={{ width: 7, height: 7, borderRadius: 99, background: STATUS[p.status] }} />{p.status}</span>
          <span style={{ fontFamily: F.mono, fontSize: 11, color: C.faint }}>{p.year}</span>
          {p.liveUrl && <a href={p.liveUrl} target="_blank" rel="noopener noreferrer" style={{ marginLeft: "auto", fontFamily: F.mono, fontSize: 11, color: C.accent, textDecoration: "none" }}>open ↗</a>}
        </div>
        <h2 style={{ fontFamily: F.display, fontWeight: 700, fontSize: 26, letterSpacing: "-0.02em", color: C.ink, margin: 0 }}>{p.name}</h2>
        <div style={{ fontSize: 14, fontWeight: 600, color: p.accent, marginTop: 2 }}>{p.tag}</div>
        <p style={{ fontSize: 13.5, lineHeight: 1.6, color: C.sub, margin: "14px 0 0" }}>{p.blurb}</p>
        <ul style={{ listStyle: "none", padding: 0, margin: "16px 0 0", display: "flex", flexDirection: "column", gap: 8 }}>
          {p.highlights.map((h) => <li key={h} style={{ display: "flex", gap: 9, fontSize: 13.5, color: C.ink }}><span style={{ color: p.accent, fontWeight: 700 }}>→</span>{h}</li>)}
        </ul>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "16px 28px", marginTop: 20 }}>
          {([["frontend", p.frontend], ["backend", p.backend]] as const).map(([label, items]) => (
            <div key={label}>
              <div style={{ fontFamily: F.mono, fontSize: 10, textTransform: "uppercase", letterSpacing: "0.14em", color: C.faint, marginBottom: 8 }}>{label}</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>{items.map((t) => <Chip key={t}>{t}</Chip>)}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function AboutApp() {
  return (
    <div style={pad}>
      <h2 style={{ fontFamily: F.display, fontWeight: 700, fontSize: 25, letterSpacing: "-0.02em", color: C.ink, margin: 0 }}>Vishvam Patel</h2>
      <div style={{ fontSize: 14, color: C.accent, fontWeight: 600, marginTop: 2 }}>{FS_PROFILE.role}</div>
      <p style={{ fontSize: 13.5, lineHeight: 1.65, color: C.sub, margin: "14px 0 0" }}>
        I build the whole product — schema, API, auth, the interface, and the deploy — and I sweat the seams between them. React &amp; Next.js on the front, FastAPI &amp; Postgres on the back, shipped to web, mobile, and production.
      </p>
      <div style={{ fontFamily: F.mono, fontSize: 10.5, textTransform: "uppercase", letterSpacing: "0.16em", color: C.faint, margin: "22px 0 6px" }}>experience</div>
      {FS_EXPERIENCE.map((e) => (
        <div key={e.role} style={{ padding: "13px 0", borderTop: `1px solid ${C.line}` }}>
          <div style={{ display: "flex", gap: 8, alignItems: "baseline" }}>
            <span style={{ fontWeight: 600, fontSize: 14.5, color: C.ink }}>{e.role}</span>
            <span style={{ fontSize: 13, color: C.sub }}>· {e.org}</span>
            <span style={{ marginLeft: "auto", fontFamily: F.mono, fontSize: 11, color: C.faint }}>{e.period}</span>
          </div>
          <p style={{ fontSize: 13, lineHeight: 1.55, color: C.sub, margin: "6px 0 0" }}>{e.desc}</p>
        </div>
      ))}
      <div style={{ padding: "13px 0", borderTop: `1px solid ${C.line}`, display: "flex", gap: 8, alignItems: "baseline" }}>
        <span style={{ fontWeight: 600, fontSize: 14.5, color: C.ink }}>{FS_EDUCATION.degree}</span>
        <span style={{ fontSize: 13, color: C.sub }}>· {FS_EDUCATION.org}</span>
        <span style={{ marginLeft: "auto", fontFamily: F.mono, fontSize: 11, color: C.faint }}>{FS_EDUCATION.period}</span>
      </div>
    </div>
  );
}

export function StackApp() {
  return (
    <div style={pad}>
      <h2 style={{ fontFamily: F.display, fontWeight: 700, fontSize: 22, letterSpacing: "-0.02em", color: C.ink, margin: "0 0 4px" }}>The whole stack</h2>
      {FS_STACK.map((g) => (
        <div key={g.label} style={{ padding: "14px 0", borderTop: `1px solid ${C.line}` }}>
          <div style={{ fontFamily: F.mono, fontSize: 11, textTransform: "uppercase", letterSpacing: "0.14em", color: C.accent, marginBottom: 9 }}>{g.label}</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>{g.items.map((it) => <Chip key={it}>{it}</Chip>)}</div>
        </div>
      ))}
    </div>
  );
}

export function ContactApp() {
  const links = [
    { k: "Email", v: FS_PROFILE.email, href: `mailto:${FS_PROFILE.email}` },
    { k: "GitHub", v: "github.com/" + FS_PROFILE.githubHandle, href: FS_PROFILE.github },
    { k: "LinkedIn", v: "in/vishvam129", href: FS_PROFILE.linkedin },
    { k: "Résumé", v: "FullStack_Developer.pdf", href: FS_PROFILE.resume },
  ];
  return (
    <div style={pad}>
      <h2 style={{ fontFamily: F.display, fontWeight: 700, fontSize: 23, letterSpacing: "-0.02em", color: C.ink, margin: 0 }}>Let&apos;s build something good.</h2>
      <p style={{ fontSize: 13.5, color: C.sub, margin: "10px 0 18px" }}>Open to full-stack roles &amp; freelance.</p>
      {links.map((r) => (
        <a key={r.k} href={r.href} target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 0", borderTop: `1px solid ${C.line}`, textDecoration: "none" }}
          onMouseEnter={(e) => { const v = e.currentTarget.querySelector("[data-v]") as HTMLElement; if (v) v.style.color = C.accent; }}
          onMouseLeave={(e) => { const v = e.currentTarget.querySelector("[data-v]") as HTMLElement; if (v) v.style.color = C.ink; }}>
          <span style={{ fontFamily: F.mono, fontSize: 11, color: C.faint, width: 64 }}>{r.k}</span>
          <span data-v style={{ fontSize: 14.5, color: C.ink, transition: "color .2s" }}>{r.v}</span>
          <span style={{ marginLeft: "auto", color: C.accent }}>↗</span>
        </a>
      ))}
    </div>
  );
}
