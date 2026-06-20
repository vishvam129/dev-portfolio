import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SERVICES, B_PROFILE, type Service } from "@/data/backend";

const C = {
  cyan: "#39d0d8", green: "#36e2a4", amber: "#ffb454",
  fg: "#dcebf4", muted: "#7d8c99", faint: "#4d5a66",
  panel: "rgba(8,13,18,0.82)", line: "rgba(120,160,180,0.16)",
};
const mono = "'JetBrains Mono', ui-monospace, monospace";
const disp = "'Space Grotesk', system-ui, sans-serif";
const body = "'Inter', system-ui, sans-serif";
const stColor = (s: Service["status"]) => (s === "ok" ? C.green : C.amber);

function Clock() {
  const [t, setT] = useState("--:--:--");
  useEffect(() => {
    const tick = () => { const d = new Date(); const p = (n: number) => String(n).padStart(2, "0"); setT(`${p(d.getHours())}:${p(d.getMinutes())}:${p(d.getSeconds())}`); };
    tick(); const id = setInterval(tick, 1000); return () => clearInterval(id);
  }, []);
  return <span style={{ fontVariantNumeric: "tabular-nums" }}>{t}</span>;
}

const NAV = [{ href: "/", label: "ai" }, { href: "/backend", label: "backend", on: true }, { href: "/full-stack", label: "full-stack" }];

export function Hud({ selected, onSelect, hovered }: { selected: string | null; onSelect: (id: string) => void; hovered: string | null; }) {
  const svc = SERVICES.find((s) => s.id === selected) || null;
  const allOk = SERVICES.every((s) => s.status === "ok");

  return (
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none", fontFamily: body, color: C.fg }}>
      {/* top bar */}
      <header style={{ pointerEvents: "auto", position: "absolute", top: 0, left: 0, right: 0, height: 52, display: "flex", alignItems: "center", gap: 14, padding: "0 18px", borderBottom: `1px solid ${C.line}`, background: "linear-gradient(180deg, rgba(5,8,12,0.85), rgba(5,8,12,0))", backdropFilter: "blur(2px)" }}>
        <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span className="sdot sdot-ok" style={{ width: 7, height: 7, background: C.green }} />
          <span style={{ fontFamily: disp, fontWeight: 600, fontSize: 15, letterSpacing: "-0.01em" }}>vishvam<span style={{ color: C.cyan }}>.systems</span></span>
        </span>
        <span style={{ fontFamily: mono, fontSize: 11, color: allOk ? C.green : C.amber }} className="dc-hide-sm">● datacenter online</span>
        <span style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 14, fontFamily: mono, fontSize: 11, color: C.muted }}>
          <span className="dc-hide-sm">{B_PROFILE.region.split(" ")[0]} · <Clock /></span>
          <nav style={{ display: "flex", gap: 2, border: `1px solid ${C.line}`, borderRadius: 6, padding: 2, pointerEvents: "auto" }}>
            {NAV.map((n) => (
              <a key={n.href} href={n.href} style={{ padding: "3px 9px", borderRadius: 4, textDecoration: "none", fontFamily: mono, background: n.on ? C.cyan : "transparent", color: n.on ? "#04181a" : C.muted }}>{n.label}</a>
            ))}
          </nav>
        </span>
      </header>

      {/* intro / instructions (hidden when a rack is open) */}
      <AnimatePresence>
        {!svc && (
          <motion.div key="intro" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} transition={{ duration: 0.4 }}
            style={{ position: "absolute", left: 26, bottom: 30, maxWidth: 440, pointerEvents: "none" }}>
            <div style={{ fontFamily: mono, fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase", color: C.cyan }}>// {B_PROFILE.region.split(" ")[0]} datacenter</div>
            <h1 style={{ fontFamily: disp, fontWeight: 600, fontSize: "clamp(2rem,4.4vw,3.4rem)", lineHeight: 1.02, margin: "12px 0 0", color: C.fg }}>
              Four systems.<br />Racked, lit, <span style={{ color: C.cyan }}>online.</span>
            </h1>
            <p style={{ fontFamily: body, fontSize: 14.5, lineHeight: 1.6, color: C.muted, margin: "14px 0 0", maxWidth: 380 }}>
              I&apos;m {B_PROFILE.name}. Each rack is a backend I shipped, blinking with its real uptime. Walk the aisle — <span style={{ color: C.fg }}>click a rack</span> to open it.
            </p>
            <div style={{ display: "flex", gap: 16, marginTop: 18, fontFamily: mono, fontSize: 11, color: C.faint }}>
              <span>◐ drag to orbit</span><span>⊙ scroll to zoom</span><span>▣ click a rack</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* hover hint */}
      <AnimatePresence>
        {hovered && !svc && (() => {
          const h = SERVICES.find((s) => s.id === hovered)!;
          return (
            <motion.div key="hint" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              style={{ position: "absolute", right: 26, bottom: 30, textAlign: "right", pointerEvents: "none" }}>
              <div style={{ fontFamily: disp, fontSize: 18, color: stColor(h.status) }}>{h.project}</div>
              <div style={{ fontFamily: mono, fontSize: 12, color: C.muted }}>{h.name} · {h.uptime}% · click to inspect →</div>
            </motion.div>
          );
        })()}
      </AnimatePresence>

      {/* legend */}
      {!svc && (
        <div className="dc-hide-sm" style={{ position: "absolute", right: 26, top: 70, display: "flex", flexDirection: "column", gap: 6, fontFamily: mono, fontSize: 11, color: C.muted, pointerEvents: "none" }}>
          <span style={{ display: "flex", alignItems: "center", gap: 7, justifyContent: "flex-end" }}>healthy <i style={{ width: 8, height: 8, borderRadius: 9, background: C.green, boxShadow: `0 0 8px ${C.green}` }} /></span>
          <span style={{ display: "flex", alignItems: "center", gap: 7, justifyContent: "flex-end" }}>degraded <i style={{ width: 8, height: 8, borderRadius: 9, background: C.amber, boxShadow: `0 0 8px ${C.amber}` }} /></span>
        </div>
      )}

      {/* project panel */}
      <AnimatePresence>
        {svc && (
          <motion.aside key={svc.id} initial={{ x: 460, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: 460, opacity: 0 }} transition={{ type: "spring", stiffness: 320, damping: 34 }}
            style={{ pointerEvents: "auto", position: "absolute", top: 52, right: 0, bottom: 0, width: "min(430px, 92vw)", background: C.panel, backdropFilter: "blur(10px)", borderLeft: `1px solid ${C.line}`, overflowY: "auto", padding: "22px 24px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ width: 9, height: 9, borderRadius: 9, background: stColor(svc.status), boxShadow: `0 0 10px ${stColor(svc.status)}` }} />
              <span style={{ fontFamily: mono, fontSize: 12, color: stColor(svc.status) }}>{svc.status === "ok" ? "OPERATIONAL" : "DEGRADED"}</span>
              <button onClick={() => onSelect("")} style={{ marginLeft: "auto", pointerEvents: "auto", background: "transparent", border: `1px solid ${C.line}`, color: C.muted, borderRadius: 5, padding: "3px 9px", fontFamily: mono, fontSize: 12, cursor: "pointer" }}>esc ✕</button>
            </div>

            <h2 style={{ fontFamily: disp, fontWeight: 600, fontSize: 30, margin: "14px 0 2px", color: C.fg }}>{svc.project}</h2>
            <div style={{ fontFamily: mono, fontSize: 12.5, color: C.cyan }}>{svc.name}</div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, margin: "18px 0" }}>
              {[["uptime", svc.uptime + "%"], ["p50", svc.p50 + "ms"], ["p99", svc.p99 + "ms"]].map(([k, v]) => (
                <div key={k} style={{ border: `1px solid ${C.line}`, borderRadius: 6, padding: "10px 12px" }}>
                  <div style={{ fontFamily: mono, fontSize: 9.5, textTransform: "uppercase", letterSpacing: "0.12em", color: C.faint }}>{k}</div>
                  <div style={{ fontFamily: disp, fontSize: 20, color: C.fg, fontVariantNumeric: "tabular-nums" }}>{v}</div>
                </div>
              ))}
            </div>

            <p style={{ fontFamily: body, fontSize: 14, lineHeight: 1.65, color: C.muted, margin: 0 }}>{svc.blurb}</p>

            <div style={{ display: "flex", flexWrap: "wrap", gap: 7, margin: "16px 0 0" }}>
              {svc.stack.map((t) => (
                <span key={t} style={{ fontFamily: mono, fontSize: 11, color: C.fg, border: `1px solid ${C.line}`, borderRadius: 4, padding: "3px 8px" }}>{t}</span>
              ))}
            </div>

            <div style={{ fontFamily: mono, fontSize: 10, textTransform: "uppercase", letterSpacing: "0.16em", color: C.faint, margin: "24px 0 10px" }}>incident log · recovered</div>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 12 }}>
              {svc.incidents.map((inc, j) => (
                <li key={j} style={{ fontFamily: mono, fontSize: 12 }}>
                  <div style={{ display: "flex", gap: 8 }}><span style={{ color: C.amber }}>{inc.date}</span><span style={{ color: C.fg }}>{inc.title}</span></div>
                  <div style={{ color: C.muted, marginTop: 4 }}><span style={{ color: C.green }}>✓ </span>{inc.fix}</div>
                </li>
              ))}
            </ul>

            {svc.url && <a href={svc.url} target="_blank" rel="noopener noreferrer" style={{ display: "inline-block", marginTop: 18, fontFamily: mono, fontSize: 12.5, color: C.cyan, textDecoration: "none" }}>open live deployment ↗</a>}

            <div style={{ borderTop: `1px solid ${C.line}`, marginTop: 24, paddingTop: 16, display: "flex", gap: 16, fontFamily: mono, fontSize: 12 }}>
              <a href={`mailto:${B_PROFILE.email}`} style={{ color: C.muted, textDecoration: "none" }}>email ↗</a>
              <a href={B_PROFILE.github} target="_blank" rel="noopener noreferrer" style={{ color: C.muted, textDecoration: "none" }}>github ↗</a>
              <a href={B_PROFILE.resume} target="_blank" rel="noopener noreferrer" style={{ color: C.muted, textDecoration: "none" }}>résumé ↗</a>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </div>
  );
}
