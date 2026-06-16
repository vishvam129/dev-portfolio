"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { PROFILE, RESUME_PDF } from "@/data/content";

type Cmd = { id: string; label: string; hint: string; run: () => void };

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [idx, setIdx] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const commands = useMemo<Cmd[]>(() => {
    const go = (id: string) => () => {
      setOpen(false);
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    };
    return [
      { id: "services", label: "Go to services", hint: "section", run: go("services") },
      { id: "trace", label: "Go to request trace", hint: "section", run: go("trace") },
      { id: "deploys", label: "Go to deploy log", hint: "section", run: go("deploys") },
      { id: "stack", label: "Go to stack", hint: "section", run: go("stack") },
      { id: "contact", label: "Go to contact", hint: "section", run: go("contact") },
      {
        id: "email",
        label: "Copy email",
        hint: PROFILE.email,
        run: () => { navigator.clipboard?.writeText(PROFILE.email); setOpen(false); },
      },
      { id: "resume", label: "Download resume", hint: "pdf", run: () => { window.open(RESUME_PDF.backend, "_blank"); setOpen(false); } },
      { id: "github", label: "Open GitHub", hint: PROFILE.githubHandle, run: () => { window.open(PROFILE.github, "_blank"); setOpen(false); } },
      { id: "linkedin", label: "Open LinkedIn", hint: "in/vishvam129", run: () => { window.open(PROFILE.linkedin, "_blank"); setOpen(false); } },
      { id: "health", label: "Run health check", hint: "GET /ping.json", run: () => { window.open("/ping.json", "_blank"); setOpen(false); } },
    ];
  }, []);

  const filtered = useMemo(
    () => commands.filter((c) => c.label.toLowerCase().includes(q.toLowerCase())),
    [commands, q],
  );

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (open) { setQ(""); setIdx(0); setTimeout(() => inputRef.current?.focus(), 30); }
  }, [open]);

  useEffect(() => { setIdx(0); }, [q]);

  function onListKey(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown") { e.preventDefault(); setIdx((i) => Math.min(filtered.length - 1, i + 1)); }
    if (e.key === "ArrowUp") { e.preventDefault(); setIdx((i) => Math.max(0, i - 1)); }
    if (e.key === "Enter") { e.preventDefault(); filtered[idx]?.run(); }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-start justify-center px-4 pt-[14vh]"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          onClick={() => setOpen(false)}
          style={{ background: "color-mix(in srgb, var(--bg) 70%, transparent)", backdropFilter: "blur(4px)" }}
        >
          <motion.div
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, scale: 0.97, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: -8 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-lg overflow-hidden rounded-xl border shadow-2xl"
            style={{ borderColor: "var(--line)", background: "var(--panel)" }}
          >
            <div className="flex items-center gap-3 border-b px-4 py-3" style={{ borderColor: "var(--line)" }}>
              <span className="font-mono text-[13px]" style={{ color: "var(--accent)" }}>⌘</span>
              <input
                ref={inputRef}
                value={q}
                onChange={(e) => setQ(e.target.value)}
                onKeyDown={onListKey}
                placeholder="type a command…"
                className="flex-1 bg-transparent font-mono text-[13px] outline-none"
                style={{ color: "var(--fg)" }}
                spellCheck={false}
              />
              <kbd className="mono-label rounded border px-1.5 py-0.5" style={{ borderColor: "var(--line)" }}>esc</kbd>
            </div>
            <ul className="max-h-[320px] overflow-y-auto py-2">
              {filtered.map((c, i) => (
                <li key={c.id}>
                  <button
                    onMouseEnter={() => setIdx(i)}
                    onClick={c.run}
                    className="flex w-full items-center gap-3 px-4 py-2.5 text-left"
                    style={{ background: i === idx ? "var(--bg-soft)" : "transparent" }}
                  >
                    <span className="font-mono text-[13px]" style={{ color: i === idx ? "var(--fg)" : "var(--muted)" }}>{c.label}</span>
                    <span className="ml-auto font-mono text-[11px]" style={{ color: "var(--faint)" }}>{c.hint}</span>
                  </button>
                </li>
              ))}
              {filtered.length === 0 && (
                <li className="px-4 py-6 text-center font-mono text-[12px]" style={{ color: "var(--faint)" }}>no command found</li>
              )}
            </ul>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
