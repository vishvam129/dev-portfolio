import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { PROFILE } from "@/data/content";
import { getLenis } from "@/components/fx/SmoothScroll";

type Cmd = { id: string; label: string; hint: string; run: () => void };

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [idx, setIdx] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const cmds = useMemo<Cmd[]>(() => {
    const go = (id: string) => () => {
      setOpen(false);
      const t = document.getElementById(id);
      if (!t) return;
      const l = getLenis();
      if (l) l.scrollTo(t, { offset: -80, duration: 1.1 });
      else t.scrollIntoView({ behavior: "smooth" });
    };
    return [
      { id: "ask", label: "Ask the model", hint: "§01", run: go("ask") },
      { id: "sandbox", label: "Vision sandbox", hint: "§02", run: go("sandbox") },
      { id: "work", label: "Work", hint: "§03", run: go("work") },
      { id: "stack", label: "Stack", hint: "§04", run: go("stack") },
      { id: "contact", label: "Contact", hint: "§05", run: go("contact") },
      { id: "email", label: "Copy email", hint: PROFILE.email, run: () => { navigator.clipboard?.writeText(PROFILE.email); setOpen(false); } },
      { id: "resume", label: "Download résumé", hint: "pdf", run: () => { window.open(PROFILE.resume, "_blank"); setOpen(false); } },
      { id: "github", label: "Open GitHub", hint: "@" + PROFILE.githubHandle, run: () => { window.open(PROFILE.github, "_blank"); setOpen(false); } },
      { id: "top", label: "Back to top", hint: "↑", run: () => { window.scrollTo({ top: 0, behavior: "smooth" }); setOpen(false); } },
    ];
  }, []);
  const filtered = useMemo(() => cmds.filter((c) => c.label.toLowerCase().includes(q.toLowerCase())), [cmds, q]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") { e.preventDefault(); setOpen((o) => !o); }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
  useEffect(() => { if (open) { setQ(""); setIdx(0); setTimeout(() => inputRef.current?.focus(), 30); } }, [open]);
  useEffect(() => { setIdx(0); }, [q]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div className="fixed inset-0 z-[400] flex items-start justify-center px-4 pt-[14vh]"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setOpen(false)}
          style={{ background: "color-mix(in srgb, var(--bg) 72%, transparent)", backdropFilter: "blur(5px)" }}>
          <motion.div onClick={(e) => e.stopPropagation()} initial={{ opacity: 0, scale: 0.97, y: -8 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.97, y: -8 }} transition={{ duration: 0.16 }}
            className="w-full max-w-lg overflow-hidden rounded-xl border" style={{ borderColor: "var(--line-2)", background: "var(--surface)", boxShadow: "0 30px 80px -30px #000" }}>
            <div className="flex items-center gap-3 border-b px-4 py-3" style={{ borderColor: "var(--line)" }}>
              <span className="font-mono text-[13px]" style={{ color: "var(--accent)" }}>⌘</span>
              <input ref={inputRef} value={q} onChange={(e) => setQ(e.target.value)}
                onKeyDown={(e) => { if (e.key === "ArrowDown") { e.preventDefault(); setIdx((i) => Math.min(filtered.length - 1, i + 1)); } if (e.key === "ArrowUp") { e.preventDefault(); setIdx((i) => Math.max(0, i - 1)); } if (e.key === "Enter") { e.preventDefault(); filtered[idx]?.run(); } }}
                placeholder="type a command…" className="flex-1 bg-transparent font-mono text-[13px] outline-none" style={{ color: "var(--fg)" }} spellCheck={false} />
              <kbd className="kicker rounded border px-1.5 py-0.5" style={{ borderColor: "var(--line-2)", fontSize: "0.55rem" }}>esc</kbd>
            </div>
            <ul className="max-h-[320px] overflow-y-auto py-2">
              {filtered.map((c, i) => (
                <li key={c.id}>
                  <button onMouseEnter={() => setIdx(i)} onClick={c.run} className="flex w-full items-center gap-3 px-4 py-2.5 text-left" style={{ background: i === idx ? "var(--surface-2)" : "transparent" }}>
                    <span className="font-mono text-[13px]" style={{ color: i === idx ? "var(--fg)" : "var(--muted)" }}>{c.label}</span>
                    <span className="ml-auto font-mono text-[11px]" style={{ color: "var(--faint)" }}>{c.hint}</span>
                  </button>
                </li>
              ))}
              {filtered.length === 0 && <li className="px-4 py-6 text-center font-mono text-[12px]" style={{ color: "var(--faint)" }}>no command</li>}
            </ul>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
