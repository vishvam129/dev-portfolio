"use client";

import { useState, useEffect, useRef } from "react";

interface MousePosition {
  x: number;
  y: number;
}

export function useMousePosition(): MousePosition {
  const [position, setPosition] = useState<MousePosition>({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    let currentX = 0;
    let currentY = 0;

    function handleMouseMove(e: MouseEvent) {
      currentX = e.clientX;
      currentY = e.clientY;
    }

    function updatePosition() {
      setPosition({ x: currentX, y: currentY });
      rafRef.current = requestAnimationFrame(updatePosition);
    }

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    rafRef.current = requestAnimationFrame(updatePosition);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return position;
}
