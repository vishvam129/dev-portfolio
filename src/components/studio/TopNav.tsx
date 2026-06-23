import { useEffect, useState } from "react";
import { C, F } from "./theme";

const SECTIONS = [
  { href: "#work", label: "Work" },
  { href: "#about", label: "About" },
  { href: "#stack", label: "Stack" },
  { href: "#contact", label: "Contact" },
];
const PORTFOLIOS = [
  { href: "/", label: "ai" },
  { href: "/backend", label: "backend" },
  { href: "/full-stack", label: "full-stack", on: true },
];

export function TopNav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > window.innerHeight * 0.5);
    on(); window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <header style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 40, height: 60,
      display: "flex", alignItems: "center", gap: 16, padding: "0 clamp(18px,5vw,48px)", color: C.ink,
      borderBottom: `1px solid ${scrolled ? C.line : "transparent"}`,
      background: scrolled ? "rgba(244,241,234,0.82)" : "transparent",
      backdropFilter: scrolled ? "blur(12px)" : "none", transition: "background .4s, border-color .4s",
    }}>
      <a href="#top" style={{ textDecoration: "none", color: C.ink, fontFamily: F.display, fontSize: 21, fontWeight: 600, letterSpacing: "-0.01em" }}>
        Vishvam<span style={{ color: C.accent }}>.</span>
      </a>

      <nav className="dc-hide-sm" style={{ display: "flex", gap: 24, marginLeft: 22, fontFamily: F.body, fontSize: 14, fontWeight: 500 }}>
        {SECTIONS.map((s) => (
          <a key={s.href} href={s.href} style={{ color: C.sub, textDecoration: "none" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = C.accent)} onMouseLeave={(e) => (e.currentTarget.style.color = C.sub)}>{s.label}</a>
        ))}
      </nav>

      <nav style={{ marginLeft: "auto", display: "flex", gap: 2, border: `1px solid ${C.line}`, borderRadius: 99, padding: 3, background: C.surface }}>
        {PORTFOLIOS.map((p) => (
          <a key={p.href} href={p.href} style={{ padding: "5px 12px", borderRadius: 99, textDecoration: "none", fontFamily: F.mono, fontSize: 11.5, background: p.on ? C.ink : "transparent", color: p.on ? C.bg : C.sub }}>{p.label}</a>
        ))}
      </nav>
    </header>
  );
}
