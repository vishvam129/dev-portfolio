import { Link, useLocation } from "react-router-dom";
import { PROFILE } from "@/data/content";

const NAV = [
  { to: "/", label: "AI", n: "01" },
  { to: "/backend", label: "Backend", n: "02" },
  { to: "/full-stack", label: "Full-Stack", n: "03" },
];

export function TopBar() {
  const { pathname } = useLocation();
  return (
    <header className="fixed inset-x-0 top-0 z-[150]" style={{ background: "color-mix(in srgb, var(--bg) 60%, transparent)", backdropFilter: "blur(10px)", borderBottom: "1px solid var(--line)" }}>
      <div className="wrap flex items-center gap-4 py-3.5">
        <span className="live-dot" />
        <span className="font-mono text-[12px] font-medium tracking-[0.18em]" style={{ color: "var(--fg)" }}>VISHVAM&nbsp;PATEL</span>
        <span className="kicker hidden sm:inline" style={{ color: "var(--faint)", fontSize: "0.6rem" }}>AI&nbsp;ENGR</span>
        <nav className="ml-auto flex items-center gap-1.5">
          {NAV.map((n) => {
            const active = pathname === n.to;
            return (
              <Link key={n.to} to={n.to} data-hover className="group flex items-baseline gap-1 px-2 py-1 font-mono text-[12.5px]"
                style={{ color: active ? "var(--accent)" : "var(--muted)" }}>
                <span className="text-[9px]" style={{ color: active ? "var(--accent)" : "var(--faint)" }}>{n.n}</span>
                <span className="ulink">{n.label}</span>
              </Link>
            );
          })}
          <a href={PROFILE.resume} data-hover className="ml-2 hidden font-mono text-[12.5px] sm:inline" style={{ color: "var(--fg)" }}>
            <span className="ulink">résumé ↓</span>
          </a>
        </nav>
      </div>
    </header>
  );
}
