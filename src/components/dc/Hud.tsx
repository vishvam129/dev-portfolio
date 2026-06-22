import { motion } from "framer-motion";
import { C, F } from "./theme";

/** Hero overlay is intentionally minimal — the server room is the visual; all the
 *  detail lives in the sections below. Just a quiet interaction + scroll cue. */
export function Hud() {
  return (
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none", fontFamily: F.body }}>
      <a href="#projects"
        style={{ position: "absolute", bottom: 24, left: "50%", transform: "translateX(-50%)", pointerEvents: "auto", textDecoration: "none", textAlign: "center", fontFamily: F.mono, fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase", color: C.faint }}>
        <div>drag to orbit · click a rack</div>
        <motion.div animate={{ y: [0, 5, 0] }} transition={{ duration: 1.6, repeat: Infinity }} style={{ color: C.cyan, fontSize: 14, marginTop: 3 }}>↓</motion.div>
      </a>
    </div>
  );
}
