import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { C, F, WALLPAPER } from "./theme";
import { AppIcon, type IconKind } from "./icons";
import { Window } from "./Window";
import { ProjectApp, AboutApp, StackApp, ContactApp } from "./apps";
import { TerminalApp } from "./Terminal";
import { useGitHub, langColor, ago } from "@/components/dc/useGitHub";
import { FS_PROFILE } from "@/data/fullstack";

type AppDef = { title: string; icon: IconKind; w: number; h: number; render: () => React.ReactNode };
const APPS: Record<string, AppDef> = {
  lendlocal: { title: "LendLocal", icon: "lendlocal", w: 470, h: 580, render: () => <ProjectApp id="lendlocal" /> },
  near: { title: "Near", icon: "near", w: 470, h: 580, render: () => <ProjectApp id="near" /> },
  vrixo: { title: "Vrixo", icon: "vrixo", w: 470, h: 580, render: () => <ProjectApp id="vrixo" /> },
  about: { title: "About — Vishvam Patel", icon: "about", w: 460, h: 520, render: () => <AboutApp /> },
  stack: { title: "Stack", icon: "stack", w: 430, h: 500, render: () => <StackApp /> },
  terminal: { title: "Terminal", icon: "terminal", w: 540, h: 360, render: () => <TerminalApp /> },
  contact: { title: "Contact", icon: "contact", w: 430, h: 430, render: () => <ContactApp /> },
};
const DOCK: string[] = ["about", "lendlocal", "near", "vrixo", "stack", "terminal", "contact"];
const DESKTOP_ICONS: { id: string; label: string }[] = [
  { id: "lendlocal", label: "LendLocal" }, { id: "near", label: "Near" }, { id: "vrixo", label: "Vrixo" }, { id: "about", label: "About.me" },
];

type Win = { id: string; x: number; y: number; w: number; h: number; z: number; min: boolean };

function Clock() {
  const [t, setT] = useState("");
  useEffect(() => {
    const tick = () => { const d = new Date(); setT(d.toLocaleDateString(undefined, { weekday: "short" }) + "  " + d.toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" })); };
    tick(); const id = setInterval(tick, 10000); return () => clearInterval(id);
  }, []);
  return <span style={{ fontVariantNumeric: "tabular-nums" }}>{t}</span>;
}

function GitHubWidget() {
  const repos = useGitHub(FS_PROFILE.githubHandle, 3);
  return (
    <div style={{ position: "absolute", top: 44, right: 16, width: 230, padding: "13px 14px", borderRadius: 14, background: C.win, backdropFilter: "blur(20px)", border: `1px solid ${C.borderSoft}`, boxShadow: `0 14px 40px -16px ${C.shadowSoft}`, fontFamily: F.ui, zIndex: 5 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 7, fontFamily: F.mono, fontSize: 11, color: C.sub, marginBottom: 10 }}>
        <span style={{ width: 7, height: 7, borderRadius: 99, background: C.ok, boxShadow: `0 0 7px ${C.ok}` }} /> live · github
      </div>
      {repos === null && <div style={{ fontFamily: F.mono, fontSize: 11, color: C.faint }}>syncing…</div>}
      {repos?.map((r) => (
        <a key={r.name} href={r.html_url} target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", gap: 8, padding: "5px 0", textDecoration: "none" }}>
          <span style={{ width: 8, height: 8, borderRadius: 99, background: langColor(r.language), flexShrink: 0 }} />
          <span style={{ fontSize: 12.5, color: C.ink, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{r.name}</span>
          <span style={{ marginLeft: "auto", fontFamily: F.mono, fontSize: 10, color: C.faint, flexShrink: 0 }}>{ago(r.pushed_at)}</span>
        </a>
      ))}
    </div>
  );
}

export function Desktop() {
  const [wins, setWins] = useState<Win[]>([]);
  const [booted, setBooted] = useState(false);
  const zTop = useRef(10);

  const open = useCallback((id: string) => {
    const a = APPS[id]; if (!a) return;
    setWins((prev) => {
      const z = (zTop.current += 1);
      if (prev.some((w) => w.id === id)) return prev.map((w) => (w.id === id ? { ...w, z, min: false } : w));
      const n = prev.length;
      const w = Math.min(a.w, window.innerWidth - 24);
      const h = Math.min(a.h, window.innerHeight - 130);
      const x = Math.max(12, Math.min(window.innerWidth - w - 20, 96 + (n % 5) * 36));
      const y = Math.max(40, Math.min(window.innerHeight - h - 96, 64 + (n % 5) * 30));
      return [...prev, { id, x, y, w, h, z, min: false }];
    });
  }, []);

  const focus = useCallback((id: string) => setWins((p) => p.map((w) => (w.id === id ? { ...w, z: (zTop.current += 1) } : w))), []);
  const close = useCallback((id: string) => setWins((p) => p.filter((w) => w.id !== id)), []);
  const toggleMin = useCallback((id: string) => setWins((p) => p.map((w) => (w.id === id ? { ...w, min: !w.min, z: (zTop.current += 1) } : w))), []);
  const move = useCallback((id: string, x: number, y: number) => setWins((p) => p.map((w) => (w.id === id ? { ...w, x: Math.max(-w.w + 130, Math.min(window.innerWidth - 130, x)), y: Math.max(30, Math.min(window.innerHeight - 80, y)) } : w))), []);

  useEffect(() => {
    const onOpen = (e: Event) => open((e as CustomEvent<string>).detail);
    window.addEventListener("os:open", onOpen);
    const t = setTimeout(() => { setBooted(true); open("about"); }, 1500);
    return () => { window.removeEventListener("os:open", onOpen); clearTimeout(t); };
  }, [open]);

  const topId = wins.filter((w) => !w.min).sort((a, b) => b.z - a.z)[0]?.id;
  const running = new Set(wins.map((w) => w.id));

  const PORTFOLIOS = [{ href: "/", l: "ai" }, { href: "/backend", l: "backend" }, { href: "/full-stack", l: "full-stack", on: true }];

  return (
    <div style={{ position: "fixed", inset: 0, overflow: "hidden", background: WALLPAPER, fontFamily: F.ui, color: C.ink }}>
      {/* menu bar */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 30, zIndex: 60, display: "flex", alignItems: "center", gap: 16, padding: "0 14px", background: C.bar, backdropFilter: "blur(20px)", borderBottom: `1px solid ${C.borderSoft}`, fontSize: 12.5 }}>
        <span style={{ fontWeight: 700, letterSpacing: "-0.01em" }}>vish<span style={{ color: C.accent }}>OS</span></span>
        <span style={{ fontWeight: 600 }}>{topId ? APPS[topId].title.split(" — ")[0] : "Finder"}</span>
        <span className="dc-hide-sm" style={{ color: C.sub }}>File</span>
        <span className="dc-hide-sm" style={{ color: C.sub }}>View</span>
        <span style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 14 }}>
          <nav style={{ display: "flex", gap: 2, border: `1px solid ${C.border}`, borderRadius: 99, padding: 2, background: "rgba(255,255,255,0.5)" }}>
            {PORTFOLIOS.map((p) => <a key={p.href} href={p.href} style={{ padding: "2px 9px", borderRadius: 99, textDecoration: "none", fontFamily: F.mono, fontSize: 10.5, background: p.on ? C.ink : "transparent", color: p.on ? "#fff" : C.sub }}>{p.l}</a>)}
          </nav>
          <a href={FS_PROFILE.github} target="_blank" rel="noopener noreferrer" style={{ color: C.sub, textDecoration: "none" }}>GitHub</a>
          <Clock />
        </span>
      </div>

      {/* desktop icons */}
      <div style={{ position: "absolute", top: 44, left: 16, display: "flex", flexDirection: "column", gap: 18, zIndex: 1 }}>
        {DESKTOP_ICONS.map((d) => (
          <button key={d.id} onDoubleClick={() => open(d.id)} onClick={() => open(d.id)} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 5, width: 76, background: "transparent", border: "none", cursor: "pointer" }}>
            <AppIcon kind={APPS[d.id].icon as IconKind} size={48} />
            <span style={{ fontSize: 11.5, color: C.ink, fontWeight: 500, textShadow: "0 1px 3px rgba(255,255,255,0.6)" }}>{d.label}</span>
          </button>
        ))}
      </div>

      <GitHubWidget />

      {/* windows */}
      <AnimatePresence>
        {wins.filter((w) => !w.min).map((w) => (
          <Window key={w.id} id={w.id} title={APPS[w.id].title} x={w.x} y={w.y} w={w.w} h={w.h} z={w.z}
            focused={w.id === topId} onFocus={focus} onClose={close} onMin={toggleMin} onMove={move}>
            {APPS[w.id].render()}
          </Window>
        ))}
      </AnimatePresence>

      {/* dock */}
      <div style={{ position: "absolute", bottom: 12, left: "50%", transform: "translateX(-50%)", zIndex: 60, display: "flex", alignItems: "flex-end", gap: 10, padding: "9px 12px", borderRadius: 20, background: C.bar, backdropFilter: "blur(22px)", border: `1px solid ${C.borderSoft}`, boxShadow: `0 18px 50px -16px ${C.shadow}`, maxWidth: "94vw", overflowX: "auto" }}>
        {DOCK.map((id) => (
          <button key={id} title={APPS[id].title} onClick={() => open(id)} className="os-dock-btn"
            style={{ position: "relative", background: "transparent", border: "none", cursor: "pointer", padding: 0, lineHeight: 0 }}>
            <AppIcon kind={APPS[id].icon as IconKind} size={46} />
            {running.has(id) && <span style={{ position: "absolute", bottom: -7, left: "50%", transform: "translateX(-50%)", width: 4, height: 4, borderRadius: 99, background: C.ink }} />}
          </button>
        ))}
      </div>

      {/* boot screen */}
      <AnimatePresence>
        {!booted && (
          <motion.div initial={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.6 }}
            style={{ position: "absolute", inset: 0, zIndex: 90, display: "grid", placeItems: "center", background: "#16151c" }}>
            <div style={{ textAlign: "center" }}>
              <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
                style={{ fontFamily: F.display, fontWeight: 700, fontSize: 40, color: "#fff", letterSpacing: "-0.02em" }}>vish<span style={{ color: C.accent }}>OS</span></motion.div>
              <div style={{ fontFamily: F.mono, fontSize: 11, color: "#8a8893", marginTop: 12 }}>booting workspace…</div>
              <div style={{ width: 180, height: 3, borderRadius: 99, background: "rgba(255,255,255,0.12)", margin: "16px auto 0", overflow: "hidden" }}>
                <motion.div initial={{ width: "0%" }} animate={{ width: "100%" }} transition={{ duration: 1.3, ease: "easeInOut" }} style={{ height: "100%", background: C.accent }} />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
