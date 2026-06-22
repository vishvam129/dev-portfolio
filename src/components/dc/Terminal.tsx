import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SERVICES, B_PROFILE, B_STACK, EXPERIENCE } from "@/data/backend";
import { C, F } from "./theme";

type Line = { kind: "cmd" | "out" | "err" | "accent"; text: string };

const BANNER: Line[] = [
  { kind: "accent", text: "vishvam.systems // datacenter console" },
  { kind: "out", text: "type 'help' for commands · 'exit' to close" },
];

export function Terminal() {
  const [open, setOpen] = useState(false);
  const [lines, setLines] = useState<Line[]>(BANNER);
  const [input, setInput] = useState("");
  const [hist, setHist] = useState<string[]>([]);
  const [, setHi] = useState(-1);
  const bodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.key === "j" || e.key === "J") && (e.metaKey || e.ctrlKey)) { e.preventDefault(); setOpen((o) => !o); }
      else if (e.key === "Escape" && open) setOpen(false);
    };
    const onOpen = () => setOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener("dc:terminal", onOpen);
    return () => { window.removeEventListener("keydown", onKey); window.removeEventListener("dc:terminal", onOpen); };
  }, [open]);

  useEffect(() => { if (open) setTimeout(() => inputRef.current?.focus(), 40); }, [open]);
  useEffect(() => { const el = bodyRef.current; if (el) el.scrollTop = el.scrollHeight; }, [lines, open]);

  const find = (q: string) => SERVICES.find((s) => s.id === q || s.project.toLowerCase() === q);

  function run(raw: string) {
    const cmd = raw.trim();
    const out: Line[] = [{ kind: "cmd", text: cmd }];
    const [name, ...args] = cmd.split(/\s+/);
    const a = (args[0] || "").toLowerCase();
    const push = (t: string, kind: Line["kind"] = "out") => out.push({ kind, text: t });

    switch (name.toLowerCase()) {
      case "": break;
      case "help":
        push("available commands:", "accent");
        ["whoami        who I am", "ls            list projects", "cat <project> project detail (vrixo · lendlocal · near)",
         "stack         tech stack", "experience    roles @ RdFlex", "contact       how to reach me", "resume        open résumé (pdf)",
         "open <proj>   open a live deployment", "goto <section> work·about·stack·contact", "clear         clear screen", "exit          close console"].forEach((l) => push("  " + l));
        break;
      case "whoami":
        push(`${B_PROFILE.name} — ${B_PROFILE.role}.`);
        push("APIs, data models, auth, async pipelines, and the infra underneath. By day: backend @ RdFlex.");
        break;
      case "ls":
        SERVICES.forEach((s) => push(`  ${s.id}/`.padEnd(16) + `${s.project}  ·  ${s.stack.slice(0, 3).join(" ")}`));
        break;
      case "cat": {
        const s = find(a);
        if (!s) { push(`cat: ${a || "?"}: no such project — try: ${SERVICES.map((x) => x.id).join(", ")}`, "err"); break; }
        push(`${s.project}  [${s.status === "ok" ? "operational" : "degraded"}]`, "accent");
        push(s.blurb);
        push("stack: " + s.stack.join(", "));
        if (s.url) push("live:  " + s.url);
        break;
      }
      case "stack":
        B_STACK.forEach((g) => push(`  ${g.label.toLowerCase().padEnd(12)} ${g.items.join(", ")}`));
        break;
      case "experience": case "exp":
        EXPERIENCE.forEach((e) => { push(`${e.period}  —  ${e.role} · ${e.org}`, "accent"); push("  " + e.desc); });
        break;
      case "contact":
        push("email     " + B_PROFILE.email);
        push("github    github.com/" + B_PROFILE.githubHandle);
        push("linkedin  in/vishvam129");
        break;
      case "resume": case "cv":
        push("opening résumé…"); window.open(B_PROFILE.resume, "_blank", "noopener"); break;
      case "open": {
        const s = find(a);
        if (s?.url) { push(`opening ${s.project}…`); window.open(s.url, "_blank", "noopener"); }
        else push(`open: no live deployment for '${a || "?"}'`, "err");
        break;
      }
      case "goto": {
        const map: Record<string, string> = { work: "#projects", projects: "#projects", about: "#operator", stack: "#stack", contact: "#contact" };
        const sel = map[a];
        if (sel) { setOpen(false); requestAnimationFrame(() => document.querySelector(sel)?.scrollIntoView({ behavior: "smooth" })); }
        else push(`goto: unknown section '${a || "?"}'`, "err");
        break;
      }
      case "clear": setLines([]); setInput(""); return;
      case "exit": case "quit": setOpen(false); setInput(""); return;
      case "date": push(new Date().toString()); break;
      case "uptime": push("99.9% — the racks speak for themselves."); break;
      case "sudo": push("nice try. 🙂", "err"); break;
      default: push(`command not found: ${name} — try 'help'`, "err");
    }
    setLines((l) => [...l, ...out]);
    setInput("");
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") { if (input.trim()) setHist((h) => [...h, input.trim()]); setHi(-1); run(input); }
    else if (e.key === "ArrowUp") { e.preventDefault(); setHi((i) => { const n = Math.min(hist.length - 1, i + 1); setInput(hist[hist.length - 1 - n] ?? ""); return n; }); }
    else if (e.key === "ArrowDown") { e.preventDefault(); setHi((i) => { const n = Math.max(-1, i - 1); setInput(n < 0 ? "" : hist[hist.length - 1 - n] ?? ""); return n; }); }
  }

  const color = (k: Line["kind"]) => (k === "err" ? C.amber : k === "accent" ? C.cyan : k === "cmd" ? C.fg : C.muted);

  return (
    <AnimatePresence>
      {open && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }}
          onMouseDown={() => setOpen(false)}
          style={{ position: "fixed", inset: 0, zIndex: 85, background: "rgba(3,6,9,0.6)", backdropFilter: "blur(3px)", display: "flex", alignItems: "flex-start", justifyContent: "center", paddingTop: "11vh" }}>
          <motion.div initial={{ opacity: 0, y: -12, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -8, scale: 0.98 }} transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            onMouseDown={(e) => { e.stopPropagation(); inputRef.current?.focus(); }}
            style={{ width: "min(680px, 94vw)", height: "min(64vh, 520px)", display: "flex", flexDirection: "column", background: "rgba(5,9,13,0.98)", border: `1px solid ${C.line2}`, borderRadius: 11, overflow: "hidden", boxShadow: "0 24px 70px rgba(0,0,0,0.65)", fontFamily: F.mono }}>
            {/* title bar */}
            <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "9px 13px", borderBottom: `1px solid ${C.line}`, background: "rgba(10,16,22,0.7)" }}>
              <span style={{ display: "flex", gap: 6 }}>
                {["#ff5f57", "#febc2e", "#28c840"].map((c) => <i key={c} style={{ width: 11, height: 11, borderRadius: 9, background: c, opacity: 0.85 }} />)}
              </span>
              <span style={{ marginLeft: 6, fontSize: 12, color: C.muted }}>vishvam@datacenter — zsh</span>
              <span style={{ marginLeft: "auto", fontSize: 10.5, color: C.faint }}>⌘J</span>
            </div>
            {/* body */}
            <div ref={bodyRef} style={{ flex: 1, overflowY: "auto", padding: "12px 14px", fontSize: 13, lineHeight: 1.7 }}>
              {lines.map((l, i) => (
                <div key={i} style={{ color: color(l.kind), whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
                  {l.kind === "cmd" ? <span><span style={{ color: C.green }}>vishvam@datacenter</span><span style={{ color: C.muted }}>:~$ </span>{l.text}</span> : l.text}
                </div>
              ))}
              {/* live input line */}
              <div style={{ display: "flex", alignItems: "center", gap: 0, marginTop: 2 }}>
                <span style={{ color: C.green }}>vishvam@datacenter</span><span style={{ color: C.muted }}>:~$&nbsp;</span>
                <input ref={inputRef} value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={onKeyDown} spellCheck={false} autoComplete="off"
                  style={{ flex: 1, background: "transparent", border: "none", outline: "none", color: C.fg, fontFamily: F.mono, fontSize: 13, caretColor: C.cyan }} />
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
