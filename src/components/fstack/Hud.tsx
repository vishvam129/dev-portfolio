import { AnimatePresence, motion } from "framer-motion";
import { C, F, LAYERS, PROJECT_LAYERS } from "./theme";
import { FS_PROJECTS } from "@/data/fullstack";

export function Hud({ project, tracing, onPick, layer, onCloseLayer }: { project: string | null; tracing: boolean; onPick: (id: string) => void; layer: string | null; onCloseLayer: () => void }) {
  const ld = LAYERS.find((l) => l.id === layer) || null;
  return (
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none", fontFamily: F.body, color: C.fg }}>
      {/* intro + trace controls */}
      <div style={{ position: "absolute", left: "clamp(20px,5vw,52px)", top: "50%", transform: "translateY(-48%)", maxWidth: 440, pointerEvents: "none" }}>
        <div style={{ fontFamily: F.mono, fontSize: 12, letterSpacing: "0.18em", textTransform: "uppercase", color: C.accent, display: "flex", alignItems: "center", gap: 9 }}>
          <span style={{ width: 22, height: 1, background: `linear-gradient(90deg,${C.accent},${C.accent2})` }} /> Full-stack engineer
        </div>
        <h1 style={{ fontFamily: F.display, fontWeight: 700, fontSize: "clamp(2.6rem,6.2vw,4.7rem)", lineHeight: 0.98, letterSpacing: "-0.035em", margin: "16px 0 0", color: C.fg }}>
          Every layer.<br /><span style={{ background: `linear-gradient(95deg,${C.accent},${C.accent2})`, WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>One engineer.</span>
        </h1>
        <p style={{ fontFamily: F.body, fontSize: "clamp(14px,1.5vw,16px)", lineHeight: 1.55, color: C.sub, margin: "14px 0 0", maxWidth: 380 }}>
          The whole stack — client to infra. Pick a project to trace a request down through every layer and back.
        </p>

        <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 20, flexWrap: "wrap", pointerEvents: "auto" }}>
          <span style={{ fontFamily: F.mono, fontSize: 11, color: C.faint, marginRight: 2 }}>trace:</span>
          {FS_PROJECTS.map((p) => (
            <button key={p.id} onClick={() => onPick(p.id)}
              style={{ fontFamily: F.mono, fontSize: 12, cursor: "pointer", borderRadius: 99, padding: "7px 14px", border: `1px solid ${project === p.id ? C.accent : C.line2}`, background: project === p.id ? C.accent : "transparent", color: project === p.id ? "#0a0a14" : C.sub, fontWeight: project === p.id ? 700 : 400 }}>
              {p.name}
            </button>
          ))}
        </div>
        <div style={{ fontFamily: F.mono, fontSize: 11, color: C.faint, marginTop: 12, height: 14 }}>
          <AnimatePresence mode="wait">
            {tracing
              ? <motion.span key="t" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>● request in flight — watch it cross the stack…</motion.span>
              : project
                ? <motion.span key="d" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ color: C.ok }}>✓ 200 · traced {project} across 6 layers</motion.span>
                : <motion.span key="i" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>◐ drag to orbit · click a layer to inspect</motion.span>}
          </AnimatePresence>
        </div>
      </div>

      {/* scroll cue */}
      <a href="#work" style={{ position: "absolute", bottom: 22, left: "50%", transform: "translateX(-50%)", pointerEvents: "auto", textDecoration: "none", textAlign: "center", fontFamily: F.mono, fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase", color: C.faint }}>
        the work
        <motion.div animate={{ y: [0, 5, 0] }} transition={{ duration: 1.6, repeat: Infinity }} style={{ color: C.accent, fontSize: 14, marginTop: 2 }}>↓</motion.div>
      </a>

      {/* layer inspector */}
      <AnimatePresence>
        {ld && (
          <motion.aside key={ld.id} initial={{ x: 360, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: 360, opacity: 0 }} transition={{ type: "spring", stiffness: 320, damping: 34 }}
            style={{ pointerEvents: "auto", position: "absolute", top: 76, right: "clamp(16px,4vw,40px)", width: "min(340px, 86vw)", background: "rgba(10,10,20,0.82)", backdropFilter: "blur(16px)", border: `1px solid ${ld.color}55`, borderRadius: 14, padding: "18px 20px 20px", boxShadow: `0 24px 60px -20px #000` }}>
            <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
              <span style={{ width: 9, height: 9, borderRadius: 99, background: ld.color, boxShadow: `0 0 10px ${ld.color}` }} />
              <span style={{ fontFamily: F.display, fontWeight: 600, fontSize: 20, color: C.fg }}>{ld.label}</span>
              <button onClick={onCloseLayer} style={{ marginLeft: "auto", background: "transparent", border: `1px solid ${C.line2}`, color: C.sub, borderRadius: 6, padding: "2px 8px", fontFamily: F.mono, fontSize: 11, cursor: "pointer" }}>esc ✕</button>
            </div>
            <p style={{ fontFamily: F.body, fontSize: 13.5, lineHeight: 1.6, color: C.sub, margin: "12px 0 0" }}>{ld.desc}</p>
            <div style={{ fontFamily: F.mono, fontSize: 10, textTransform: "uppercase", letterSpacing: "0.16em", color: C.faint, margin: "18px 0 8px" }}>this layer, per project</div>
            {FS_PROJECTS.map((p) => (
              <div key={p.id} style={{ display: "flex", gap: 10, padding: "7px 0", borderTop: `1px solid ${C.line}`, fontFamily: F.mono, fontSize: 12 }}>
                <span style={{ color: C.fg, width: 78, flexShrink: 0 }}>{p.name}</span>
                <span style={{ color: ld.color }}>{PROJECT_LAYERS[p.id]?.[ld.id] ?? "—"}</span>
              </div>
            ))}
          </motion.aside>
        )}
      </AnimatePresence>
    </div>
  );
}
