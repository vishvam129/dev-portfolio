import { motion, useScroll, useSpring } from "framer-motion";

/** Thin lime progress bar pinned to the top of the viewport. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const w = useSpring(scrollYProgress, { stiffness: 320, damping: 40 });
  return <motion.div className="scrollbar-prog" style={{ right: 0, scaleX: w }} />;
}
