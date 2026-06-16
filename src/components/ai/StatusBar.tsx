"use client";

import { useClock } from "@/lib/useClock";
import { RESUME_PDF } from "@/data/content";

export function StatusBar() {
  const clock = useClock();
  return (
    <header
      className="sticky top-0 z-50 border-b backdrop-blur-md"
      style={{ borderColor: "var(--line)", background: "color-mix(in srgb, var(--bg) 72%, transparent)" }}
    >
      <div className="mx-auto flex max-w-6xl items-center gap-3 px-5 py-3">
        <span className="live-dot" />
        <span className="font-mono text-[13px] font-semibold tracking-tight" style={{ color: "var(--fg)" }}>
          VISHVAM&#8209;1
        </span>
        <span className="mono-label hidden sm:inline">online</span>
        <span className="mono-label hidden md:inline" style={{ color: "var(--faint)" }}>
          ctx&nbsp;200k
        </span>
        <div className="ml-auto flex items-center gap-4">
          <span className="mono-label tabular-nums" style={{ color: "var(--muted)" }}>
            {clock || "--:--:--"} IST
          </span>
          <a
            href={RESUME_PDF.ai}
            className="rounded-md border px-2.5 py-1 font-mono text-[11px] transition-colors hover:opacity-80"
            style={{ borderColor: "var(--line)", color: "var(--accent)" }}
          >
            resume.pdf ↓
          </a>
        </div>
      </div>
    </header>
  );
}
