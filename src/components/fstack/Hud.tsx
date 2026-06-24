import { AnimatePresence, motion } from "framer-motion";
import { C, F } from "./theme";
import { FS_PROJECTS } from "@/data/fullstack";

export function Hud({ project, tracing, onPick }: { project: string | null; tracing: boolean; onPick: (id: string) => void }) {
  return (
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none", fontFamily: F.body, color: C.fg }}>
      {/* intro + trace controls */}
      <div style={{ position: "absolute", left: "clamp(20px,5vw,48px)", bottom: "clamp(64px,12vh,108px)", maxWidth: 480, pointerEvents: "none" }}>
        <div style={{ fontFamily: F.mono, fontSize: 12, letterSpacing: "0.18em", textTransform: "uppercase", color: C.accent, display: "flex", alignItems: "center", gap: 9 }}>
          <span style={{ width: 22, height: 1, background: `linear-gradient(90deg,${C.accent},${C.accent2})` }} /> Full-stack engineer
        </div>
        <h1 style={{ fontFamily: F.display, fontWeight: 600, fontSize: "clamp(2.2rem,5.4vw,3.9rem)", lineHeight: 1.0, letterSpacing: "-0.025em", margin: "14px 0 0" }}>
          Every layer.<br /><span style={{ background: `linear-gradient(90deg,${C.accent},${C.accent2})`, WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>One engineer.</span>
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
    </div>
  );
}
