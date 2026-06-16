"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/\\<>*#@%░▒▓";

/** Character-by-character decode — random glyphs resolving into the target text. */
export function Scramble({
  text,
  className,
  start = "view",
  speed = 1,
}: {
  text: string;
  className?: string;
  start?: "view" | "mount";
  speed?: number;
}) {
  const prm = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const [out, setOut] = useState(prm ? text : "");
  const [armed, setArmed] = useState(start === "mount");

  useEffect(() => {
    if (start !== "view" || prm) return;
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && setArmed(true)),
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [start, prm]);

  useEffect(() => {
    if (!armed || prm) {
      if (prm) setOut(text);
      return;
    }
    let frame = 0;
    const total = text.length;
    let raf = 0;
    const run = () => {
      const revealed = Math.floor(frame / 2.2 * speed);
      let s = "";
      for (let i = 0; i < total; i++) {
        if (text[i] === " ") { s += " "; continue; }
        if (i < revealed) s += text[i];
        else s += GLYPHS[(Math.random() * GLYPHS.length) | 0];
      }
      setOut(s);
      frame++;
      if (revealed <= total) raf = requestAnimationFrame(run);
      else setOut(text);
    };
    raf = requestAnimationFrame(run);
    return () => cancelAnimationFrame(raf);
  }, [armed, text, prm, speed]);

  return (
    <span ref={ref} className={className} aria-label={text}>
      <span aria-hidden>{out || text}</span>
    </span>
  );
}
