import { useEffect, useState } from "react";
import { C, F } from "./theme";

const SECTIONS = [{ href: "#work", label: "work" }, { href: "#about", label: "about" }, { href: "#stack", label: "stack" }, { href: "#contact", label: "contact" }];
const PORTFOLIOS = [{ href: "/", l: "ai" }, { href: "/backend", l: "backend" }, { href: "/full-stack", l: "full-stack", on: true }];

export function TopNav() {
  const [s, setS] = useState(false);
  useEffect(() => {
    const on = () => setS(window.scrollY > window.innerHeight * 0.6);
    on(); window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <header style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 40, height: 56, display: "flex", alignItems: "center", gap: 16, padding: "0 clamp(16px,4vw,40px)", fontFamily: F.body, color: C.fg, borderBottom: `1px solid ${s ? C.line : "transparent"}`, background: s ? "rgba(6,6,13,0.8)" : "transparent", backdropFilter: s ? "blur(12px)" : "none", transition: "background .4s, border-color .4s" }}>
      <a href="#top" style={{ display: "flex", alignItems: "center", gap: 8, textDecoration: "none", color: C.fg }}>
        <span style={{ width: 7, height: 7, borderRadius: 2, background: `linear-gradient(135deg, ${C.accent}, ${C.accent2})` }} />
        <span style={{ fontFamily: F.display, fontWeight: 600, fontSize: 16, letterSpacing: "-0.01em" }}>vishvam<span style={{ background: `linear-gradient(90deg,${C.accent},${C.accent2})`, WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>.dev</span></span>
      </a>
      <nav className="dc-hide-sm" style={{ display: "flex", gap: 20, marginLeft: 20, fontFamily: F.mono, fontSize: 12.5 }}>
        {SECTIONS.map((x) => <a key={x.href} href={x.href} style={{ color: C.sub, textDecoration: "none" }} onMouseEnter={(e) => (e.currentTarget.style.color = C.accent)} onMouseLeave={(e) => (e.currentTarget.style.color = C.sub)}>{x.label}</a>)}
      </nav>
      <nav style={{ marginLeft: "auto", display: "flex", gap: 2, border: `1px solid ${C.line2}`, borderRadius: 99, padding: 3 }}>
        {PORTFOLIOS.map((p) => <a key={p.href} href={p.href} style={{ padding: "4px 11px", borderRadius: 99, textDecoration: "none", fontFamily: F.mono, fontSize: 11.5, background: p.on ? `linear-gradient(90deg,${C.accent},${C.accent2})` : "transparent", color: p.on ? "#0a0a14" : C.sub, fontWeight: p.on ? 700 : 400 }}>{p.l}</a>)}
      </nav>
    </header>
  );
}
