import { useEffect, useState } from "react";
import { C, F } from "./theme";

const SECTIONS = [
  { href: "#work", label: "work" },
  { href: "#operator", label: "about" },
  { href: "#stack", label: "stack" },
  { href: "#contact", label: "contact" },
];
const PORTFOLIOS = [
  { href: "/", label: "ai" },
  { href: "/backend", label: "backend", on: true },
  { href: "/full-stack", label: "full-stack" },
];

export function TopNav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > window.innerHeight * 0.6);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <header
      style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 40, height: 54,
        display: "flex", alignItems: "center", gap: 16, padding: "0 clamp(16px,4vw,40px)",
        fontFamily: F.body, color: C.fg,
        borderBottom: `1px solid ${scrolled ? C.line : "transparent"}`,
        background: scrolled ? "rgba(5,8,12,0.78)" : "transparent",
        backdropFilter: scrolled ? "blur(10px)" : "none",
        transition: "background 0.4s, border-color 0.4s",
      }}
    >
      <a href="#work" style={{ display: "flex", alignItems: "center", gap: 8, textDecoration: "none", color: C.fg }}>
        <span style={{ width: 7, height: 7, borderRadius: 9, background: C.green, boxShadow: `0 0 8px ${C.green}` }} />
        <span style={{ fontFamily: F.disp, fontWeight: 600, fontSize: 15, letterSpacing: "-0.01em" }}>
          vishvam<span style={{ color: C.cyan }}>.systems</span>
        </span>
      </a>

      <nav className="dc-hide-sm" style={{ display: "flex", gap: 20, marginLeft: 18, fontFamily: F.mono, fontSize: 12.5 }}>
        {SECTIONS.map((s) => (
          <a key={s.href} href={s.href} style={{ color: C.muted, textDecoration: "none" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = C.cyan)}
            onMouseLeave={(e) => (e.currentTarget.style.color = C.muted)}>{s.label}</a>
        ))}
      </nav>

      <nav style={{ marginLeft: "auto", display: "flex", gap: 2, border: `1px solid ${C.line}`, borderRadius: 6, padding: 2 }}>
        {PORTFOLIOS.map((p) => (
          <a key={p.href} href={p.href} style={{ padding: "4px 10px", borderRadius: 4, textDecoration: "none", fontFamily: F.mono, fontSize: 12, background: p.on ? C.cyan : "transparent", color: p.on ? "#04181a" : C.muted }}>{p.label}</a>
        ))}
      </nav>
    </header>
  );
}
