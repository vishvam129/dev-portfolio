import { motion } from "framer-motion";
import { C, F } from "./theme";
import { FS_PROFILE } from "@/data/fullstack";
import { DeviceView } from "./Device";

const ease = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  return (
    <section id="top" style={{ position: "relative", minHeight: "100svh", display: "flex", alignItems: "center", overflow: "hidden" }}>
      {/* soft warm atmosphere */}
      <div style={{ position: "absolute", inset: 0, background: `radial-gradient(120% 90% at 78% 18%, ${C.surface} 0%, transparent 45%), radial-gradient(80% 70% at 12% 90%, #f7ebd9 0%, transparent 50%)`, pointerEvents: "none" }} />
      <div style={{ position: "absolute", inset: 0, backgroundImage: `radial-gradient(${C.line} 1px, transparent 1px)`, backgroundSize: "26px 26px", opacity: 0.4, maskImage: "radial-gradient(80% 60% at 50% 40%, #000, transparent)", WebkitMaskImage: "radial-gradient(80% 60% at 50% 40%, #000, transparent)", pointerEvents: "none" }} />

      <div style={{ position: "relative", width: "100%", maxWidth: 1240, margin: "0 auto", padding: "120px clamp(20px,5vw,48px) 80px", display: "grid", gap: "clamp(36px,5vw,64px)", alignItems: "center" }} className="fs-hero-grid">
        {/* copy */}
        <div>
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease }}
            style={{ fontFamily: F.mono, fontSize: 12.5, letterSpacing: "0.14em", textTransform: "uppercase", color: C.accent, display: "flex", alignItems: "center", gap: 9 }}>
            <span style={{ width: 22, height: 1, background: C.accent }} /> Full-stack engineer
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease, delay: 0.05 }}
            style={{ fontFamily: F.display, fontWeight: 600, fontSize: "clamp(2.9rem,7vw,5.4rem)", lineHeight: 0.98, letterSpacing: "-0.025em", color: C.ink, margin: "20px 0 0" }}>
            I build the<br /><span style={{ fontStyle: "italic", color: C.accent }}>whole</span> thing.
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease, delay: 0.12 }}
            style={{ fontFamily: F.body, fontSize: "clamp(15px,1.7vw,18.5px)", lineHeight: 1.6, color: C.sub, maxWidth: 460, margin: "24px 0 0" }}>
            React & Next.js on the front, FastAPI & Postgres on the back — designed, built, and shipped to web, mobile, and production.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease, delay: 0.19 }}
            style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 34 }}>
            <a href="#work" style={{ display: "inline-flex", alignItems: "center", gap: 8, fontFamily: F.body, fontWeight: 600, fontSize: 14.5, color: C.accentInk, background: C.ink, borderRadius: 99, padding: "13px 22px", textDecoration: "none" }}>See the work <span aria-hidden>↓</span></a>
            <a href={FS_PROFILE.resume} target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 8, fontFamily: F.body, fontWeight: 600, fontSize: 14.5, color: C.ink, border: `1px solid ${C.line}`, background: C.surface, borderRadius: 99, padding: "13px 22px", textDecoration: "none" }}>Résumé <span aria-hidden>↗</span></a>
          </motion.div>
        </div>

        {/* device cluster */}
        <motion.div initial={{ opacity: 0, scale: 0.94, y: 24 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: 0.9, ease, delay: 0.15 }}
          style={{ position: "relative", maxWidth: 520, width: "100%", justifySelf: "center", marginTop: 8 }}>
          <motion.div animate={{ y: [0, -12, 0] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}>
            <DeviceView device="desktop" preview="map" accent="#ef6c1f" />
          </motion.div>
          <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            style={{ position: "absolute", left: "-6%", bottom: "-16%", width: "34%" }}>
            <DeviceView device="mobile" preview="chat" accent="#e84b6b" />
          </motion.div>
        </motion.div>
      </div>

      <a href="#work" style={{ position: "absolute", bottom: 26, left: "50%", transform: "translateX(-50%)", fontFamily: F.mono, fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase", color: C.faint, textDecoration: "none", textAlign: "center" }}>
        scroll
        <motion.div animate={{ y: [0, 5, 0] }} transition={{ duration: 1.6, repeat: Infinity }} style={{ color: C.accent, fontSize: 14, marginTop: 3 }}>↓</motion.div>
      </a>
    </section>
  );
}
