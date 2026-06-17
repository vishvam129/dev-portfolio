import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

const GLYPHS = "ABCDEFGHJKLMNPQRSTUVWXYZ0123456789/\\<>*#%[]{}";

/** Decode text: random glyphs resolving into the target. Fires when in view. */
export function Scramble({ text, className, speed = 1.8, start = "view" }: { text: string; className?: string; speed?: number; start?: "view" | "mount" }) {
  const prm = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const [out, setOut] = useState(prm ? text : "");
  const [armed, setArmed] = useState(start === "mount");

  useEffect(() => {
    if (start !== "view" || prm) return;
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && setArmed(true)), { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, [start, prm]);

  useEffect(() => {
    if (prm) { setOut(text); return; }
    if (!armed) return;
    let frame = 0, raf = 0;
    const run = () => {
      const revealed = Math.floor(frame / 2 * speed);
      let s = "";
      for (let i = 0; i < text.length; i++) {
        if (text[i] === " ") { s += " "; continue; }
        s += i < revealed ? text[i] : GLYPHS[(Math.random() * GLYPHS.length) | 0];
      }
      setOut(s);
      frame++;
      if (revealed <= text.length) raf = requestAnimationFrame(run);
      else setOut(text);
    };
    raf = requestAnimationFrame(run);
    return () => cancelAnimationFrame(raf);
  }, [armed, text, prm, speed]);

  return <span ref={ref} className={className} aria-label={text}><span aria-hidden>{out || text}</span></span>;
}
