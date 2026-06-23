import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { C, F } from "./theme";

const ease = [0.22, 1, 0.36, 1] as const;

export function Reveal({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  return (
    <motion.div initial={{ opacity: 0, y: 26 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.7, delay, ease }}>
      {children}
    </motion.div>
  );
}

export function SectionShell({ id, index, eyebrow, title, intro, children }:
  { id: string; index: string; eyebrow: string; title: ReactNode; intro?: ReactNode; children: ReactNode }) {
  return (
    <section id={id} style={{ scrollMarginTop: 80, position: "relative" }}>
      <div style={{ maxWidth: 1180, margin: "0 auto", padding: "clamp(80px,12vh,150px) clamp(20px,5vw,48px)" }}>
        <Reveal>
          <div style={{ display: "flex", alignItems: "baseline", gap: 16, marginBottom: 8 }}>
            <span style={{ fontFamily: F.display, fontSize: "clamp(1rem,1.5vw,1.2rem)", color: C.faint, fontVariantNumeric: "tabular-nums" }}>{index}</span>
            <span style={{ fontFamily: F.mono, fontSize: 12, letterSpacing: "0.16em", textTransform: "uppercase", color: C.accent }}>{eyebrow}</span>
            <span style={{ flex: 1, height: 1, background: C.line }} />
          </div>
          <h2 style={{ fontFamily: F.display, fontWeight: 600, fontSize: "clamp(2rem,4.6vw,3.4rem)", lineHeight: 1.04, letterSpacing: "-0.02em", color: C.ink, margin: 0, maxWidth: 760 }}>{title}</h2>
          {intro && <p style={{ fontFamily: F.body, fontSize: "clamp(15px,1.6vw,17px)", lineHeight: 1.6, color: C.sub, maxWidth: 560, margin: "18px 0 0" }}>{intro}</p>}
        </Reveal>
        {children}
      </div>
    </section>
  );
}
