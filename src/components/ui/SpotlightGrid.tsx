"use client";

import { useRef, type ReactNode } from "react";
import { useMousePosition } from "@/hooks/useMousePosition";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { cn } from "@/lib/cn";

interface SpotlightGridProps {
  children: ReactNode;
  className?: string;
}

export function SpotlightGrid({ children, className }: SpotlightGridProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouse = useMousePosition();
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  const getSpotlightStyle = () => {
    if (!isDesktop || !containerRef.current) return {};
    const rect = containerRef.current.getBoundingClientRect();
    const x = mouse.x - rect.left;
    const y = mouse.y - rect.top;
    return {
      "--spotlight-x": `${x}px`,
      "--spotlight-y": `${y}px`,
    } as React.CSSProperties;
  };

  return (
    <div
      ref={containerRef}
      className={cn("spotlight-grid relative", className)}
      style={getSpotlightStyle()}
    >
      {children}
    </div>
  );
}
