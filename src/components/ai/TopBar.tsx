import { Link, useLocation } from "react-router-dom";
import { PROFILE } from "@/data/content";

const NAV = [
  { to: "/", label: "AI" },
  { to: "/backend", label: "Backend" },
  { to: "/full-stack", label: "Full-Stack" },
];

export function TopBar() {
  const { pathname } = useLocation();
  return (
    <header className="sticky top-0 z-50 border-b backdrop-blur-md" style={{ borderColor: "var(--line)", background: "color-mix(in srgb, var(--bg) 72%, transparent)" }}>
      <div className="mx-auto flex max-w-6xl items-center gap-4 px-5 py-3">
        <span className="live-dot" />
        <span className="font-mono text-[13px] font-semibold tracking-tight" style={{ color: "var(--fg)" }}>VISHVAM&#8209;1</span>
        <nav className="ml-2 hidden items-center gap-1 sm:flex">
          {NAV.map((n) => (
            <Link key={n.to} to={n.to} className="rounded-md px-2.5 py-1 font-mono text-[12px] transition-colors"
              style={{ color: pathname === n.to ? "var(--accent)" : "var(--muted)", background: pathname === n.to ? "var(--panel)" : "transparent" }}>
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-3">
          <a href={PROFILE.github} target="_blank" rel="noopener noreferrer" className="mono-label hover:opacity-80">github</a>
          <a href={PROFILE.resume} className="rounded-md border px-2.5 py-1 font-mono text-[11px] transition-colors hover:opacity-80" style={{ borderColor: "var(--line-2)", color: "var(--accent)" }}>
            resume.pdf ↓
          </a>
        </div>
      </div>
    </header>
  );
}
