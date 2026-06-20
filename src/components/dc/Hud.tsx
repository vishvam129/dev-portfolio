import { AnimatePresence, motion } from "framer-motion";
import { SERVICES, B_PROFILE, type Service } from "@/data/backend";
import { C, F } from "./theme";

const stColor = (s: Service["status"]) => (s === "ok" ? C.green : C.amber);

export function Hud({ selected, onSelect, hovered }: { selected: string | null; onSelect: (id: string) => void; hovered: string | null; }) {
  const svc = SERVICES.find((s) => s.id === selected) || null;

  return (
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none", fontFamily: F.body, color: C.fg }}>
      {/* hero intro */}
      <AnimatePresence>
        {!svc && (
          <motion.div key="intro" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 12 }} transition={{ duration: 0.5 }}
            style={{ position: "absolute", left: "clamp(20px,5vw,46px)", bottom: "clamp(70px,14vh,120px)", maxWidth: 460, pointerEvents: "none" }}>
            <div style={{ fontFamily: F.mono, fontSize: 11.5, letterSpacing: "0.24em", textTransform: "uppercase", color: C.cyan }}>// {B_PROFILE.region.split(" ")[0]} datacenter · live</div>
            <h1 style={{ fontFamily: F.disp, fontWeight: 600, fontSize: "clamp(2.1rem,5vw,3.6rem)", lineHeight: 1.01, letterSpacing: "-0.02em", margin: "14px 0 0", color: C.fg }}>
              Four systems.<br />Racked, lit, <span style={{ color: C.cyan }}>online.</span>
            </h1>
            <p style={{ fontFamily: F.body, fontSize: "clamp(14px,1.5vw,15.5px)", lineHeight: 1.6, color: C.muted, margin: "16px 0 0", maxWidth: 400 }}>
              Each rack is a backend I shipped, blinking with its real uptime. Drag to orbit the aisle — <span style={{ color: C.fg }}>click a rack</span> to open it.
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* hover hint */}
      <AnimatePresence>
        {hovered && !svc && (() => {
          const h = SERVICES.find((s) => s.id === hovered)!;
          return (
            <motion.div key="hint" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              style={{ position: "absolute", right: "clamp(20px,5vw,46px)", bottom: "clamp(70px,14vh,120px)", textAlign: "right", pointerEvents: "none" }}>
              <div style={{ fontFamily: F.disp, fontSize: 18, color: stColor(h.status) }}>{h.project}</div>
              <div style={{ fontFamily: F.mono, fontSize: 12, color: C.muted }}>{h.name} · {h.uptime}% · click to inspect →</div>
            </motion.div>
          );
        })()}
      </AnimatePresence>

      {/* scroll cue */}
      <AnimatePresence>
        {!svc && (
          <motion.a key="cue" href="#operator" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ position: "absolute", bottom: 22, left: "50%", transform: "translateX(-50%)", pointerEvents: "auto", textDecoration: "none", textAlign: "center", fontFamily: F.mono, fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase", color: C.faint }}>
            <div>the operator</div>
            <motion.div animate={{ y: [0, 5, 0] }} transition={{ duration: 1.6, repeat: Infinity }} style={{ color: C.cyan, fontSize: 14, marginTop: 2 }}>↓</motion.div>
          </motion.a>
        )}
      </AnimatePresence>

      {/* project panel */}
      <AnimatePresence>
        {svc && (
          <motion.aside key={svc.id} initial={{ x: 460, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: 460, opacity: 0 }} transition={{ type: "spring", stiffness: 320, damping: 34 }}
            style={{ pointerEvents: "auto", position: "absolute", top: 54, right: 0, bottom: 0, width: "min(430px, 92vw)", background: C.panel, backdropFilter: "blur(10px)", borderLeft: `1px solid ${C.line}`, overflowY: "auto", padding: "22px 24px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ width: 9, height: 9, borderRadius: 9, background: stColor(svc.status), boxShadow: `0 0 10px ${stColor(svc.status)}` }} />
              <span style={{ fontFamily: F.mono, fontSize: 12, color: stColor(svc.status) }}>{svc.status === "ok" ? "OPERATIONAL" : "DEGRADED"}</span>
              <button onClick={() => onSelect("")} style={{ marginLeft: "auto", pointerEvents: "auto", background: "transparent", border: `1px solid ${C.line}`, color: C.muted, borderRadius: 5, padding: "3px 9px", fontFamily: F.mono, fontSize: 12, cursor: "pointer" }}>esc ✕</button>
            </div>

            <h2 style={{ fontFamily: F.disp, fontWeight: 600, fontSize: 30, margin: "14px 0 2px", color: C.fg }}>{svc.project}</h2>
            <div style={{ fontFamily: F.mono, fontSize: 12.5, color: C.cyan }}>{svc.name}</div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, margin: "18px 0" }}>
              {[["uptime", svc.uptime + "%"], ["p50", svc.p50 + "ms"], ["p99", svc.p99 + "ms"]].map(([k, v]) => (
                <div key={k} style={{ border: `1px solid ${C.line}`, borderRadius: 6, padding: "10px 12px" }}>
                  <div style={{ fontFamily: F.mono, fontSize: 9.5, textTransform: "uppercase", letterSpacing: "0.12em", color: C.faint }}>{k}</div>
                  <div style={{ fontFamily: F.disp, fontSize: 20, color: C.fg, fontVariantNumeric: "tabular-nums" }}>{v}</div>
                </div>
              ))}
            </div>

            <p style={{ fontFamily: F.body, fontSize: 14, lineHeight: 1.65, color: C.muted, margin: 0 }}>{svc.blurb}</p>

            <div style={{ display: "flex", flexWrap: "wrap", gap: 7, margin: "16px 0 0" }}>
              {svc.stack.map((t) => (
                <span key={t} style={{ fontFamily: F.mono, fontSize: 11, color: C.fg, border: `1px solid ${C.line}`, borderRadius: 4, padding: "3px 8px" }}>{t}</span>
              ))}
            </div>

            <div style={{ fontFamily: F.mono, fontSize: 10, textTransform: "uppercase", letterSpacing: "0.16em", color: C.faint, margin: "24px 0 10px" }}>incident log · recovered</div>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 12 }}>
              {svc.incidents.map((inc, j) => (
                <li key={j} style={{ fontFamily: F.mono, fontSize: 12 }}>
                  <div style={{ display: "flex", gap: 8 }}><span style={{ color: C.amber }}>{inc.date}</span><span style={{ color: C.fg }}>{inc.title}</span></div>
                  <div style={{ color: C.muted, marginTop: 4 }}><span style={{ color: C.green }}>✓ </span>{inc.fix}</div>
                </li>
              ))}
            </ul>

            {svc.url && <a href={svc.url} target="_blank" rel="noopener noreferrer" style={{ display: "inline-block", marginTop: 18, fontFamily: F.mono, fontSize: 12.5, color: C.cyan, textDecoration: "none" }}>open live deployment ↗</a>}
          </motion.aside>
        )}
      </AnimatePresence>
    </div>
  );
}
