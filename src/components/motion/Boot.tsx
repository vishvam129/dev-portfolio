import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const LINES = [
  "booting vishvam-os v1.0 …",
  "mounting /weights/all-MiniLM-L6-v2 …",
  "allocating tensor buffers …",
  "compiling wasm execution module …",
  "warming flow-field shader …",
  "system ready.",
];

/** One-time techie boot sequence that wipes to reveal the site. */
export function Boot() {
  const prm = useReducedMotion();
  const [done, setDone] = useState(() => prm || sessionStorage.getItem("booted") === "1" || location.search.includes("noboot"));
  const [pct, setPct] = useState(0);
  const [n, setN] = useState(0);

  useEffect(() => {
    if (done) return;
    const id = setInterval(() => setPct((p) => Math.min(100, p + Math.random() * 9 + 3)), 90);
    const lid = setInterval(() => setN((x) => Math.min(LINES.length, x + 1)), 280);
    return () => { clearInterval(id); clearInterval(lid); };
  }, [done]);

  useEffect(() => {
    if (pct >= 100 && n >= LINES.length && !done) {
      const t = setTimeout(() => { sessionStorage.setItem("booted", "1"); setDone(true); }, 450);
      return () => clearTimeout(t);
    }
  }, [pct, n, done]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div className="fixed inset-0 z-[500] flex flex-col justify-between p-6 sm:p-10" style={{ background: "var(--bg)" }}
          exit={{ y: "-100%" }} transition={{ duration: 0.7, ease: [0.7, 0, 0.3, 1] }}>
          <div className="flex items-center justify-between">
            <span className="kicker" style={{ color: "var(--accent)" }}>VISHVAM // NEURAL</span>
            <span className="kicker tnum" style={{ color: "var(--muted)" }}>{Math.floor(pct)}%</span>
          </div>
          <div className="font-mono text-[12px] leading-relaxed" style={{ color: "var(--muted)" }}>
            {LINES.slice(0, n).map((l, i) => (
              <div key={i}><span style={{ color: "var(--faint)" }}>{String(i).padStart(2, "0")} </span>{l}</div>
            ))}
            <span className="caret" />
          </div>
          <div>
            <div className="mb-2 font-mono text-[10px] tracking-[0.3em] uppercase" style={{ color: "var(--faint)" }}>initializing on-device intelligence</div>
            <div className="h-[3px] w-full overflow-hidden" style={{ background: "var(--line)" }}>
              <div className="h-full transition-all duration-100" style={{ width: `${pct}%`, background: "var(--accent)" }} />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
