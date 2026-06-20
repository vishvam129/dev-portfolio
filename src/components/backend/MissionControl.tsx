import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { B_PROFILE, SERVICES } from "@/data/backend";
import { useLiveLog } from "@/lib/useLiveLog";
import { OverviewPanel } from "./OverviewPanel";
import { ServicesView } from "./StatusBoard";
import { TopologyView } from "./Topology";
import { TraceView } from "./Trace";
import { ApiView } from "./ApiPlayground";
import { LogsView } from "./LogsView";
import { InfoView } from "./StackContact";

type ViewId = "overview" | "services" | "topology" | "traces" | "api" | "logs" | "info";

const VIEWS: { id: ViewId; label: string }[] = [
  { id: "overview", label: "overview" },
  { id: "services", label: "services" },
  { id: "topology", label: "topology" },
  { id: "traces", label: "traces" },
  { id: "api", label: "api" },
  { id: "logs", label: "logs" },
];

function Glyph({ id }: { id: ViewId }) {
  const c = { fill: "none", stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  switch (id) {
    case "overview": return <svg width="15" height="15" viewBox="0 0 16 16"><rect x="1.5" y="1.5" width="5" height="5" rx="1" {...c} /><rect x="9.5" y="1.5" width="5" height="5" rx="1" {...c} /><rect x="1.5" y="9.5" width="5" height="5" rx="1" {...c} /><rect x="9.5" y="9.5" width="5" height="5" rx="1" {...c} /></svg>;
    case "services": return <svg width="15" height="15" viewBox="0 0 16 16"><rect x="1.5" y="2" width="13" height="3.4" rx="1" {...c} /><rect x="1.5" y="6.3" width="13" height="3.4" rx="1" {...c} /><rect x="1.5" y="10.6" width="13" height="3.4" rx="1" {...c} /></svg>;
    case "topology": return <svg width="15" height="15" viewBox="0 0 16 16"><circle cx="3" cy="8" r="2" {...c} /><circle cx="13" cy="3.5" r="2" {...c} /><circle cx="13" cy="12.5" r="2" {...c} /><path d="M5 7 11 4M5 9l6 3" {...c} /></svg>;
    case "traces": return <svg width="15" height="15" viewBox="0 0 16 16"><path d="M2 3.5h9M2 8h13M2 12.5h6" {...c} /></svg>;
    case "api": return <svg width="15" height="15" viewBox="0 0 16 16"><path d="M5.5 2.5 2 8l3.5 5.5M10.5 2.5 14 8l-3.5 5.5" {...c} /></svg>;
    case "logs": return <svg width="15" height="15" viewBox="0 0 16 16"><path d="M3 3.5h4M9 3.5h4M3 7h7M3 10.5h9" {...c} /></svg>;
    case "info": return <svg width="15" height="15" viewBox="0 0 16 16"><circle cx="8" cy="8" r="6.3" {...c} /><path d="M8 7v4M8 5h.01" {...c} /></svg>;
  }
}

function Clock() {
  const [t, setT] = useState("--:--:--");
  useEffect(() => {
    const tick = () => {
      const d = new Date();
      const p = (n: number) => String(n).padStart(2, "0");
      setT(`${p(d.getHours())}:${p(d.getMinutes())}:${p(d.getSeconds())}`);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return <span className="tnum">{t}</span>;
}

function Ping() {
  const [ms, setMs] = useState<number | null>(null);
  useEffect(() => {
    let alive = true;
    const ping = async () => {
      const start = performance.now();
      try {
        await fetch(`/favicon.ico?_=${start}`, { cache: "no-store" });
        if (alive) setMs(Math.max(1, Math.round(performance.now() - start)));
      } catch { /* offline — keep last */ }
    };
    ping();
    const id = setInterval(ping, 3000);
    return () => { alive = false; clearInterval(id); };
  }, []);
  return <span className="tnum" style={{ color: ms == null ? "var(--faint)" : ms < 80 ? "var(--ok)" : "var(--warn)" }}>{ms == null ? "—" : `${ms}ms`}</span>;
}

const NAV = [
  { href: "/", label: "ai" },
  { href: "/backend", label: "backend", active: true },
  { href: "/full-stack", label: "full-stack" },
];

const IDS: ViewId[] = ["overview", "services", "topology", "traces", "api", "logs", "info"];
function initialView(): ViewId {
  const q = new URLSearchParams(window.location.search).get("view") as ViewId | null;
  return q && IDS.includes(q) ? q : "overview";
}

export function MissionControl() {
  const [view, setViewState] = useState<ViewId>(initialView);
  const setView = (v: ViewId) => {
    setViewState(v);
    const url = new URL(window.location.href);
    url.searchParams.set("view", v);
    window.history.replaceState(null, "", url);
  };
  const ticker = useLiveLog(8, 1100);
  const last = ticker[ticker.length - 1];
  const allOk = SERVICES.every((s) => s.status === "ok");
  const lvlColor: Record<string, string> = { INFO: "var(--ok)", WARN: "var(--warn)", ERR: "var(--err)" };

  const renderView = () => {
    switch (view) {
      case "overview": return <OverviewPanel />;
      case "services": return <ServicesView />;
      case "topology": return <TopologyView />;
      case "traces": return <TraceView />;
      case "api": return <ApiView />;
      case "logs": return <LogsView />;
      case "info": return <InfoView />;
    }
  };

  const NavBtn = ({ v }: { v: { id: ViewId; label: string } }) => {
    const on = view === v.id;
    return (
      <button onClick={() => setView(v.id)}
        className="group flex items-center gap-2.5 rounded-[5px] px-2.5 py-2 text-left transition-colors"
        style={{ background: on ? "var(--surface-2)" : "transparent", color: on ? "var(--accent)" : "var(--muted)" }}>
        <Glyph id={v.id} />
        <span className="hidden font-mono text-[12.5px] md:block" style={{ color: on ? "var(--fg)" : "inherit" }}>{v.label}</span>
        {on && <span className="ml-auto hidden h-3.5 w-0.5 rounded md:block" style={{ background: "var(--accent)" }} />}
      </button>
    );
  };

  return (
    <div data-skin="backend" className="flex h-[100svh] flex-col overflow-hidden"
      style={{ background: "var(--bg)", color: "var(--fg)", fontFamily: "var(--f-body)" }}>

      {/* ── top status bar ── */}
      <header className="flex h-12 shrink-0 items-center gap-3 border-b px-3 sm:px-4" style={{ borderColor: "var(--line-2)", background: "var(--bg-2)" }}>
        <span className="flex items-center gap-2">
          <span className="sdot sdot-ok" style={{ width: 7, height: 7 }} />
          <span className="font-display text-[14px] font-semibold tracking-tight" style={{ color: "var(--fg)" }}>vishvam<span style={{ color: "var(--accent)" }}>.systems</span></span>
        </span>
        <span className="hidden font-mono text-[11px] tnum sm:inline" style={{ color: allOk ? "var(--ok)" : "var(--warn)" }}>
          ● {allOk ? "all systems operational" : "degraded"}
        </span>

        <span className="ml-auto flex items-center gap-3 font-mono text-[11px]" style={{ color: "var(--muted)" }}>
          <span className="hidden items-center gap-1.5 lg:flex"><span style={{ color: "var(--faint)" }}>rtt</span><Ping /></span>
          <span className="hidden items-center gap-1.5 sm:flex"><span style={{ color: "var(--faint)" }}>{B_PROFILE.region.split(" ")[0]}</span><Clock /></span>
          <span className="hidden font-mono text-[11px] md:inline" style={{ color: "var(--faint)" }}>{B_PROFILE.sha}</span>
          <nav className="flex items-center gap-1 rounded-[5px] border p-0.5" style={{ borderColor: "var(--line-2)" }}>
            {NAV.map((n) => (
              <a key={n.href} href={n.href} className="rounded px-2 py-0.5 transition-colors"
                style={{ background: n.active ? "var(--accent)" : "transparent", color: n.active ? "var(--accent-ink)" : "var(--muted)" }}>{n.label}</a>
            ))}
          </nav>
        </span>
      </header>

      {/* ── rail + main ── */}
      <div className="flex min-h-0 flex-1">
        <nav className="flex w-[52px] shrink-0 flex-col gap-1 border-r p-1.5 md:w-[180px] md:p-2.5" style={{ borderColor: "var(--line-2)", background: "var(--bg-2)" }}>
          <div className="hidden px-2.5 pb-1.5 pt-1 font-mono text-[10px] uppercase tracking-[0.18em] md:block" style={{ color: "var(--faint)" }}>views</div>
          {VIEWS.map((v) => <NavBtn key={v.id} v={v} />)}
          <div className="mt-auto">
            <div className="my-1.5 border-t" style={{ borderColor: "var(--line)" }} />
            <NavBtn v={{ id: "info", label: "stack · contact" }} />
          </div>
        </nav>

        <main className="relative min-h-0 flex-1">
          <AnimatePresence mode="wait">
            <motion.div key={view} className="absolute inset-0"
              initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.18, ease: "easeOut" }}>
              {renderView()}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      {/* ── live log ticker ── */}
      <footer className="flex h-7 shrink-0 items-center gap-3 border-t px-3 font-mono text-[11px]" style={{ borderColor: "var(--line-2)", background: "var(--bg-2)" }}>
        <span className="flex shrink-0 items-center gap-1.5" style={{ color: "var(--accent-2)" }}><span className="sdot sdot-ok" style={{ width: 5, height: 5 }} />live</span>
        <AnimatePresence mode="popLayout">
          {last && (
            <motion.span key={last.t} className="flex min-w-0 items-center gap-2.5 truncate"
              initial={{ opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
              <span className="tnum shrink-0" style={{ color: "var(--faint)" }}>{last.t}</span>
              <span className="shrink-0 font-semibold" style={{ color: lvlColor[last.level] }}>{last.level}</span>
              <span className="shrink-0" style={{ color: "var(--accent-2)" }}>{last.svc}</span>
              <span className="truncate" style={{ color: "var(--muted)" }}>{last.msg}</span>
            </motion.span>
          )}
        </AnimatePresence>
        <span className="ml-auto hidden shrink-0 sm:inline" style={{ color: "var(--faint)" }}>built 2026-06-20 · {B_PROFILE.region.split(" ")[0]}</span>
      </footer>
    </div>
  );
}
