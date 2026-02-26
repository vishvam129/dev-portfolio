"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useMousePosition } from "@/hooks/useMousePosition";
import { useMediaQuery } from "@/hooks/useMediaQuery";

export function CustomCursor() {
  const { x, y } = useMousePosition();
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!isDesktop) return;

    function show() { setVisible(true); }
    function hide() { setVisible(false); }

    document.addEventListener("mouseenter", show);
    document.addEventListener("mouseleave", hide);
    return () => {
      document.removeEventListener("mouseenter", show);
      document.removeEventListener("mouseleave", hide);
    };
  }, [isDesktop]);

  if (!isDesktop) return null;

  return (
    <>
      {/* Dot */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[70] h-2 w-2 rounded-full bg-primary"
        animate={{
          x: x - 4,
          y: y - 4,
          opacity: visible ? 1 : 0,
        }}
        transition={{ type: "spring", stiffness: 500, damping: 28, mass: 0.5 }}
      />
      {/* Ring */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[70] h-8 w-8 rounded-full border border-primary/50"
        animate={{
          x: x - 16,
          y: y - 16,
          opacity: visible ? 1 : 0,
        }}
        transition={{ type: "spring", stiffness: 200, damping: 20, mass: 0.8 }}
      />
    </>
  );
}
