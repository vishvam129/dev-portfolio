import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { B_PROFILE } from "@/data/backend";

export function Masthead() {
  const [rtt, setRtt] = useState<number | null>(null);
  useEffect(() => {
    let alive = true;
    const ping = async () => {
      const t0 = performance.now();
      try { await fetch("/ping.json", { cache: "no-store" }); if (alive) setRtt(+(performance.now() - t0).toFixed(0)); } catch { /**/ }
    };
    ping(); const id = setInterval(ping, 3000);
    return () => { alive = false; clearInterval(id); };
  }, []);
  return (
    <header className="sticky top-0 z-[150] border-b backdrop-blur-md" style={{ borderColor: "var(--line)", background: "color-mix(in srgb, var(--bg) 78%, transparent)" }}>
      <div className="mx-auto flex max-w-[1180px] items-center gap-4 px-6 py-2.5">
        <span className="sdot sdot-ok" />
        <span className="font-mono text-[12.5px] font-medium tracking-tight" style={{ color: "var(--fg)" }}>vishvam.systems</span>
        <span className="hidden font-mono text-[11px] sm:inline" style={{ color: "var(--ok)" }}>operational</span>
        <span className="hidden font-mono text-[11px] tnum md:inline" style={{ color: "var(--faint)" }}>
          {rtt !== null ? `${rtt}ms` : "···"} · {B_PROFILE.region}
        </span>
        <nav className="ml-auto flex items-center gap-4 font-mono text-[12px]">
          <Link to="/" className="hover:opacity-80" style={{ color: "var(--muted)" }}>ai</Link>
          <span style={{ color: "var(--accent)" }}>backend</span>
          <Link to="/full-stack" className="hover:opacity-80" style={{ color: "var(--muted)" }}>full-stack</Link>
          <span className="mx-1 hidden h-3.5 w-px sm:block" style={{ background: "var(--line-2)" }} />
          <a href={B_PROFILE.resume} className="hidden sm:inline" style={{ color: "var(--accent)" }}>resume.pdf ↓</a>
        </nav>
      </div>
    </header>
  );
}
