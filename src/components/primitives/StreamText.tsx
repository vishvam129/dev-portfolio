"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * Token-streaming text. SSR / no-JS renders the full string (SEO-safe);
 * on mount it re-reveals word-by-word like an LLM generating.
 */
export function StreamText({
  text,
  className,
  speed = 28,
  onDone,
}: {
  text: string;
  className?: string;
  speed?: number;
  onDone?: () => void;
}) {
  const prm = useReducedMotion();
  const [n, setN] = useState<number>(prm ? text.length : 0);

  useEffect(() => {
    if (prm) { onDone?.(); return; }
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setN(i);
      if (i >= text.length) {
        clearInterval(id);
        onDone?.();
      }
    }, speed);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text]);

  const shown = text.slice(0, n);
  const done = n >= text.length;
  return (
    <span className={className}>
      {shown}
      {!done && <span className="caret" aria-hidden />}
    </span>
  );
}
