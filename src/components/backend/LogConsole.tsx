import { useEffect, useRef } from "react";
import type { LogLine } from "@/lib/useLiveLog";

const LVL: Record<string, string> = { INFO: "var(--ok)", WARN: "var(--warn)", ERR: "var(--err)" };

/** Auto-scrolling streaming log console. */
export function LogConsole({ lines, dense = false }: { lines: LogLine[]; dense?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => { const el = ref.current; if (el) el.scrollTop = el.scrollHeight; }, [lines]);
  return (
    <div ref={ref} className="h-full overflow-y-auto px-3 py-2 font-mono"
      style={{ fontSize: dense ? 11 : 12, lineHeight: dense ? 1.7 : 1.85, background: "var(--bg-2)" }}>
      {lines.map((l, i) => (
        <div key={i} className="flex gap-2.5 whitespace-nowrap" style={{ opacity: i === lines.length - 1 ? 1 : 0.92 }}>
          <span className="tnum shrink-0" style={{ color: "var(--faint)" }}>{l.t}</span>
          <span className="shrink-0 font-semibold" style={{ color: LVL[l.level], width: 34 }}>{l.level}</span>
          <span className="shrink-0" style={{ color: "var(--accent-2)", width: 78 }}>{l.svc}</span>
          <span style={{ color: "var(--muted)" }}>{l.msg}</span>
        </div>
      ))}
      <div className="flex gap-2.5" style={{ color: "var(--accent)" }}><span>▌</span></div>
    </div>
  );
}
