import { Link, useLocation } from "react-router-dom";
import { PROFILE } from "@/data/content";

const NAV = [
  { to: "/", label: "AI", n: "01" },
  { to: "/backend", label: "Backend", n: "02" },
  { to: "/full-stack", label: "Full-Stack", n: "03" },
];

const TICKER = [
  "ON-DEVICE INFERENCE",
  "RAG + VISION · NO SERVER",
  "GANDHINAGAR · IST (UTC+5:30)",
  "OPEN TO REMOTE AI / BACKEND / FULL-STACK ROLES",
  "B.E. COMPUTER SCIENCE · LJ UNIVERSITY",
  "GRADUATING JUNE 2026",
  "PYTHON · FASTAPI · PYTORCH · NEXT.JS · KUBERNETES",
];

export function TopBar() {
  const { pathname } = useLocation();
  return (
    <header className="sticky top-0 z-50" style={{ background: "color-mix(in srgb, var(--bg) 80%, transparent)", backdropFilter: "blur(8px)" }}>
      {/* masthead */}
      <div className="border-b" style={{ borderColor: "var(--line-2)" }}>
        <div className="mx-auto flex max-w-[1240px] items-center gap-4 px-6 py-3">
          <span className="live-dot" />
          <span className="font-mono text-[12px] font-medium tracking-[0.16em]" style={{ color: "var(--fg)" }}>
            VISHVAM&nbsp;PATEL
          </span>
          <span className="mono-label hidden sm:inline" style={{ color: "var(--faint)" }}>AI&nbsp;Engineer</span>

          <nav className="ml-auto flex items-center gap-1">
            {NAV.map((n) => {
              const active = pathname === n.to;
              return (
                <Link key={n.to} to={n.to} className="group flex items-baseline gap-1 px-2.5 py-1 font-mono text-[12px]"
                  style={{ color: active ? "var(--accent)" : "var(--muted)" }}>
                  <span className="text-[9px]" style={{ color: active ? "var(--accent)" : "var(--faint)" }}>{n.n}</span>
                  <span className="ulink">{n.label}</span>
                </Link>
              );
            })}
            <span className="mx-2 hidden h-4 w-px sm:block" style={{ background: "var(--line-2)" }} />
            <a href={PROFILE.resume} className="hidden px-2 py-1 font-mono text-[12px] sm:inline" style={{ color: "var(--fg)" }}>
              <span className="ulink">résumé ↓</span>
            </a>
          </nav>
        </div>
      </div>
      {/* ticker */}
      <div className="overflow-hidden border-b" style={{ borderColor: "var(--line)" }}>
        <div className="ticker-track py-1.5">
          {[0, 1].map((dup) => (
            <span key={dup} className="flex shrink-0">
              {TICKER.map((t, i) => (
                <span key={i} className="mono-label flex items-center" style={{ color: "var(--faint)", fontSize: "0.6rem" }}>
                  <span className="px-5">{t}</span>
                  <span style={{ color: "var(--accent)" }}>✳</span>
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>
    </header>
  );
}
