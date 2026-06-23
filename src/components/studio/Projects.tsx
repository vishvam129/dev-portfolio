import { useState } from "react";
import { C, F } from "./theme";
import { FS_PROJECTS, type Project } from "@/data/fullstack";
import { DeviceView } from "./Device";
import { Reveal, SectionShell } from "./ui";

const STATUS: Record<Project["status"], { label: string; color: string }> = {
  live: { label: "live", color: "#1f9d55" },
  shipped: { label: "shipped", color: "#5e5648" },
  building: { label: "building", color: "#d98a1f" },
};

function Chip({ children }: { children: React.ReactNode }) {
  return <span style={{ fontFamily: F.mono, fontSize: 11.5, color: C.ink, border: `1px solid ${C.line}`, background: C.surface, borderRadius: 99, padding: "4px 11px" }}>{children}</span>;
}

function Showcase({ p, i }: { p: Project; i: number }) {
  const [device, setDevice] = useState(p.devices[0]);
  const [live, setLive] = useState(false);
  const st = STATUS[p.status];
  const flip = i % 2 === 1;

  return (
    <Reveal delay={0.04}>
      <div className={`fs-show${flip ? " flip" : ""}`} style={{ display: "flex", gap: "clamp(28px,5vw,60px)", marginTop: i === 0 ? 54 : "clamp(72px,11vh,128px)" }}>
        {/* device */}
        <div style={{ minWidth: 0 }}>
          <DeviceView device={device} preview={p.preview} accent={p.accent} liveUrl={p.liveUrl} live={live && device === "desktop"} title={`${p.name} live preview`} />
          {/* controls */}
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 22, flexWrap: "wrap" }}>
            {p.devices.length > 1 && (
              <div style={{ display: "flex", gap: 2, background: C.bg2, border: `1px solid ${C.line}`, borderRadius: 99, padding: 3 }}>
                {(["desktop", "mobile"] as const).filter((d) => p.devices.includes(d)).map((d) => (
                  <button key={d} onClick={() => { setDevice(d); if (d === "mobile") setLive(false); }}
                    style={{ fontFamily: F.mono, fontSize: 11.5, border: "none", cursor: "pointer", borderRadius: 99, padding: "5px 13px", background: device === d ? C.ink : "transparent", color: device === d ? C.bg : C.sub }}>{d}</button>
                ))}
              </div>
            )}
            {p.liveUrl && device === "desktop" && (
              <button onClick={() => setLive((v) => !v)} style={{ fontFamily: F.mono, fontSize: 11.5, cursor: "pointer", border: `1px solid ${C.line}`, background: live ? C.ink : C.surface, color: live ? C.bg : C.ink, borderRadius: 99, padding: "6px 14px" }}>
                {live ? "■ stop preview" : "▸ load live app"}
              </button>
            )}
            {p.liveUrl && <a href={p.liveUrl} target="_blank" rel="noopener noreferrer" style={{ fontFamily: F.mono, fontSize: 11.5, color: C.accent, textDecoration: "none" }}>open ↗</a>}
          </div>
        </div>

        {/* copy */}
        <div style={{ minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontFamily: F.mono, fontSize: 11.5, color: st.color }}>
              <span style={{ width: 7, height: 7, borderRadius: 99, background: st.color }} />{st.label}
            </span>
            <span style={{ fontFamily: F.mono, fontSize: 11.5, color: C.faint }}>{p.year}</span>
          </div>
          <h3 style={{ fontFamily: F.display, fontWeight: 600, fontSize: "clamp(2rem,4vw,2.9rem)", letterSpacing: "-0.02em", color: C.ink, margin: 0 }}>{p.name}</h3>
          <div style={{ fontFamily: F.body, fontSize: "clamp(15px,1.7vw,18px)", color: C.accent, fontWeight: 600, marginTop: 4 }}>{p.tag}</div>
          <p style={{ fontFamily: F.body, fontSize: "clamp(14px,1.5vw,15.5px)", lineHeight: 1.65, color: C.sub, margin: "18px 0 0", maxWidth: 520 }}>{p.blurb}</p>

          <ul style={{ listStyle: "none", padding: 0, margin: "20px 0 0", display: "flex", flexDirection: "column", gap: 9 }}>
            {p.highlights.map((h) => (
              <li key={h} style={{ display: "flex", gap: 10, fontFamily: F.body, fontSize: 14, color: C.ink }}>
                <span style={{ color: p.accent, fontWeight: 700 }}>→</span>{h}
              </li>
            ))}
          </ul>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "20px 36px", marginTop: 26 }}>
            <div>
              <div style={{ fontFamily: F.mono, fontSize: 10.5, textTransform: "uppercase", letterSpacing: "0.14em", color: C.faint, marginBottom: 9 }}>frontend</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>{p.frontend.map((t) => <Chip key={t}>{t}</Chip>)}</div>
            </div>
            <div>
              <div style={{ fontFamily: F.mono, fontSize: 10.5, textTransform: "uppercase", letterSpacing: "0.14em", color: C.faint, marginBottom: 9 }}>backend</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>{p.backend.map((t) => <Chip key={t}>{t}</Chip>)}</div>
            </div>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

export function Projects() {
  return (
    <SectionShell id="work" index="01" eyebrow="selected work" title={<>Three products,<br />shipped end-to-end.</>}
      intro="Each one built across the whole stack — UI, API, data, payments, realtime, and deploy. Toggle the device, or load the live app.">
      {FS_PROJECTS.map((p, i) => <Showcase key={p.id} p={p} i={i} />)}
    </SectionShell>
  );
}
