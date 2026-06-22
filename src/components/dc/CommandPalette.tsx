import { useEffect, useMemo, useRef, useState, Fragment } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { B_PROFILE } from "@/data/backend";
import { C, F } from "./theme";

type Cmd = { group: string; label: string; hint?: string; run: () => void };

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [idx, setIdx] = useState(0);
  const [copied, setCopied] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const go = (sel: string) => { setOpen(false); requestAnimationFrame(() => document.querySelector(sel)?.scrollIntoView({ behavior: "smooth" })); };
  const card = (id: string) => { setOpen(false); requestAnimationFrame(() => document.getElementById(`card-${id}`)?.scrollIntoView({ behavior: "smooth", block: "center" })); };
  const ext = (url: string) => { window.open(url, "_blank", "noopener"); setOpen(false); };
  const copy = (txt: string) => { navigator.clipboard?.writeText(txt); setCopied(true); setTimeout(() => setCopied(false), 1400); };

  const CMDS: Cmd[] = useMemo(() => [
    { group: "Navigate", label: "Work", hint: "the racks", run: () => go("#projects") },
    { group: "Navigate", label: "About", hint: "operator · experience", run: () => go("#operator") },
    { group: "Navigate", label: "How I operate", hint: "principles", run: () => go("#how") },
    { group: "Navigate", label: "Stack", run: () => go("#stack") },
    { group: "Navigate", label: "Contact", run: () => go("#contact") },
    { group: "Projects", label: "Vrixo", hint: "AI photo backend", run: () => card("vrixo") },
    { group: "Projects", label: "LendLocal", hint: "Stripe · Prisma", run: () => card("lendlocal") },
    { group: "Projects", label: "Near", hint: "WebRTC · Firestore", run: () => card("near") },
    { group: "Links", label: "GitHub", hint: B_PROFILE.githubHandle, run: () => ext(B_PROFILE.github) },
    { group: "Links", label: "LinkedIn", hint: "in/vishvam129", run: () => ext(B_PROFILE.linkedin) },
    { group: "Links", label: "Copy email", hint: B_PROFILE.email, run: () => copy(B_PROFILE.email) },
    { group: "Links", label: "Download résumé", hint: "PDF", run: () => ext(B_PROFILE.resume) },
    { group: "Actions", label: "Open terminal", hint: "⌘J", run: () => { setOpen(false); window.dispatchEvent(new CustomEvent("dc:terminal")); } },
    { group: "Portfolio", label: "AI portfolio", hint: "/", run: () => { window.location.href = "/"; } },
    { group: "Portfolio", label: "Full-stack portfolio", hint: "/full-stack", run: () => { window.location.href = "/full-stack"; } },
  ], []);

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return CMDS;
    return CMDS.filter((c) => (`${c.label} ${c.hint ?? ""} ${c.group}`).toLowerCase().includes(s));
  }, [q, CMDS]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.key === "k" || e.key === "K") && (e.metaKey || e.ctrlKey)) { e.preventDefault(); setOpen((o) => !o); return; }
      if (!open) return;
      if (e.key === "Escape") setOpen(false);
      else if (e.key === "ArrowDown") { e.preventDefault(); setIdx((i) => Math.min(filtered.length - 1, i + 1)); }
      else if (e.key === "ArrowUp") { e.preventDefault(); setIdx((i) => Math.max(0, i - 1)); }
      else if (e.key === "Enter") { e.preventDefault(); filtered[idx]?.run(); }
    };
    const onOpenEvt = () => setOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener("dc:cmdk", onOpenEvt);
    return () => { window.removeEventListener("keydown", onKey); window.removeEventListener("dc:cmdk", onOpenEvt); };
  }, [open, filtered, idx]);

  useEffect(() => { if (open) { setQ(""); setIdx(0); setTimeout(() => inputRef.current?.focus(), 30); } }, [open]);
  useEffect(() => { setIdx(0); }, [q]);

  let flat = -1; let lastGroup = "";

  return (
    <AnimatePresence>
      {open && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }}
          onMouseDown={() => setOpen(false)}
          style={{ position: "fixed", inset: 0, zIndex: 80, background: "rgba(3,6,9,0.62)", backdropFilter: "blur(3px)", display: "flex", alignItems: "flex-start", justifyContent: "center", paddingTop: "14vh", fontFamily: F.body }}>
          <motion.div initial={{ opacity: 0, y: -12, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -8, scale: 0.98 }} transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            onMouseDown={(e) => e.stopPropagation()}
            style={{ width: "min(560px, 92vw)", maxHeight: "66vh", display: "flex", flexDirection: "column", background: "rgba(9,14,19,0.97)", border: `1px solid ${C.line2}`, borderRadius: 12, overflow: "hidden", boxShadow: "0 24px 70px rgba(0,0,0,0.6)" }}>
            {/* search */}
            <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "14px 16px", borderBottom: `1px solid ${C.line}` }}>
              <span style={{ color: C.cyan, fontFamily: F.mono, fontSize: 14 }}>›</span>
              <input ref={inputRef} value={q} onChange={(e) => setQ(e.target.value)} placeholder="Type a command or search…"
                style={{ flex: 1, background: "transparent", border: "none", outline: "none", color: C.fg, fontFamily: F.body, fontSize: 15 }} />
              <span style={{ fontFamily: F.mono, fontSize: 10, color: C.faint, border: `1px solid ${C.line}`, borderRadius: 4, padding: "2px 6px" }}>esc</span>
            </div>

            {/* results */}
            <div style={{ overflowY: "auto", padding: "6px 6px 8px" }}>
              {filtered.length === 0 && (
                <div style={{ padding: "22px 14px", fontFamily: F.mono, fontSize: 13, color: C.faint }}>no matches — try “stack”, “email”, “vrixo”…</div>
              )}
              {filtered.map((c) => {
                flat += 1; const i = flat;
                const newGroup = c.group !== lastGroup; lastGroup = c.group;
                const active = i === idx;
                return (
                  <Fragment key={c.group + c.label}>
                    {newGroup && <div style={{ padding: "10px 12px 4px", fontFamily: F.mono, fontSize: 10, textTransform: "uppercase", letterSpacing: "0.16em", color: C.faint }}>{c.group}</div>}
                    <button onMouseMove={() => setIdx(i)} onClick={c.run}
                      style={{ display: "flex", alignItems: "center", gap: 12, width: "100%", textAlign: "left", padding: "10px 12px", border: "none", borderRadius: 7, cursor: "pointer", background: active ? "rgba(57,208,216,0.12)" : "transparent", borderLeft: active ? `2px solid ${C.cyan}` : "2px solid transparent" }}>
                      <span style={{ fontFamily: F.body, fontSize: 14, color: active ? C.fg : C.muted }}>{c.label === "Copy email" && copied ? "Copied ✓" : c.label}</span>
                      {c.hint && <span style={{ marginLeft: "auto", fontFamily: F.mono, fontSize: 11.5, color: C.faint }}>{c.hint}</span>}
                    </button>
                  </Fragment>
                );
              })}
            </div>

            {/* footer */}
            <div style={{ display: "flex", gap: 16, padding: "9px 14px", borderTop: `1px solid ${C.line}`, fontFamily: F.mono, fontSize: 10.5, color: C.faint }}>
              <span><b style={{ color: C.muted }}>↑↓</b> navigate</span>
              <span><b style={{ color: C.muted }}>↵</b> select</span>
              <span style={{ marginLeft: "auto", color: C.cyan }}>vishvam.systems</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
