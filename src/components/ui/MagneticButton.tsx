"use client";

import { useRef, useState, type ReactNode } from "react";
import { motion } from "framer-motion";
import { useMediaQuery } from "@/hooks/useMediaQuery";

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  strength?: number;
}

export function MagneticButton({
  children,
  className,
  strength = 0.3,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  function handleMouseMove(e: React.MouseEvent) {
    if (!isDesktop || !ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const x = (e.clientX - left - width / 2) * strength;
    const y = (e.clientY - top - height / 2) * strength;
    setPosition({ x, y });
  }

  function handleMouseLeave() {
    setPosition({ x: 0, y: 0 });
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
    >
      {children}
    </motion.div>
  );
}
