"use client";

import { useScrollProgress } from "@/hooks/useScrollProgress";

export function ReadingProgress() {
  const progress = useScrollProgress();

  return (
    <div className="fixed left-0 top-0 z-50 h-0.5 w-full bg-transparent">
      <div
        className="h-full bg-primary transition-[width] duration-100"
        style={{ width: `${progress * 100}%` }}
      />
    </div>
  );
}
