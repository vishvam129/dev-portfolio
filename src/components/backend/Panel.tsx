import type { ReactNode } from "react";

/** The ops-console building block: a framed panel with a title bar (label left, meta right). */
export function Panel({
  title, meta, dot, children, className = "", bodyClass = "", pad = true,
}: {
  title: string; meta?: ReactNode; dot?: string; children: ReactNode;
  className?: string; bodyClass?: string; pad?: boolean;
}) {
  return (
    <section className={`flex min-h-0 flex-col overflow-hidden rounded-[5px] border ${className}`}
      style={{ borderColor: "var(--line-2)", background: "var(--surface)" }}>
      <header className="flex shrink-0 items-center gap-2 border-b px-3.5"
        style={{ borderColor: "var(--line)", background: "var(--surface-2)", height: 34 }}>
        {dot && <span className="sdot" style={{ width: 6, height: 6, background: dot }} />}
        <span className="font-mono text-[11px] uppercase tracking-[0.16em]" style={{ color: "var(--fg)" }}>{title}</span>
        {meta && <span className="ml-auto font-mono text-[10.5px] tnum" style={{ color: "var(--faint)" }}>{meta}</span>}
      </header>
      <div className={`min-h-0 flex-1 ${pad ? "p-4" : ""} ${bodyClass}`}>{children}</div>
    </section>
  );
}
