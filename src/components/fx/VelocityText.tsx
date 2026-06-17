import { useRef } from "react";
import { motion, useScroll, useVelocity, useSpring, useTransform, useMotionValue, useAnimationFrame } from "framer-motion";

/** A marquee whose speed + skew respond to scroll velocity. */
export function VelocityText({ text, baseSpeed = 0.4 }: { text: string; baseSpeed?: number }) {
  const x = useMotionValue(0);
  const { scrollY } = useScroll();
  const vel = useVelocity(scrollY);
  const smooth = useSpring(vel, { damping: 50, stiffness: 380 });
  const factor = useTransform(smooth, [-2000, 0, 2000], [-2.2, 1, 2.2], { clamp: false });
  const skew = useTransform(smooth, [-2000, 0, 2000], [-3, 0, 3], { clamp: true });
  const dir = useRef(1);
  useAnimationFrame((_, dt) => {
    let m = dir.current * baseSpeed * (dt / 16);
    const f = factor.get();
    if (f < 0) dir.current = -1; else if (f > 0) dir.current = 1;
    m *= Math.abs(f);
    let n = x.get() - m;
    if (n <= -25) n += 25; if (n > 0) n -= 25;
    x.set(n);
  });
  const items = Array.from({ length: 4 });
  return (
    <div className="overflow-hidden border-y py-5" style={{ borderColor: "var(--line)" }}>
      <motion.div className="flex whitespace-nowrap" style={{ x: useTransform(x, (v) => `${v}%`), skewX: skew }}>
        {items.map((_, i) => (
          <span key={i} className="font-display" style={{ fontSize: "clamp(1.8rem,5vw,3.4rem)", color: "var(--fg)", paddingRight: "2.5rem" }}>
            {text} <span style={{ color: "var(--accent)" }}>///</span>{" "}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
