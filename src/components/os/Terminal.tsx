import { useEffect, useRef, useState } from "react";
import { FS_PROJECTS, FS_PROFILE, FS_STACK } from "@/data/fullstack";
import { ago } from "@/components/dc/useGitHub";
import { F } from "./theme";

type Line = { k: "cmd" | "out" | "err" | "ok"; t: string };
const BANNER: Line[] = [
  { k: "ok", t: "vishOS terminal — type 'help', click anywhere to focus" },
];
const COL = { cmd: "#e8e6ef", out: "#9b99a6", err: "#ff9d8a", ok: "#7CF6B0", green: "#7CF6B0", dim: "#6a6876" };

const openApp = (id: string) => window.dispatchEvent(new CustomEvent("os:open", { detail: id }));

export function TerminalApp() {
  const [lines, setLines] = useState<Line[]>(BANNER);
  const [input, setInput] = useState("");
  const [hist, setHist] = useState<string[]>([]);
  const bodyRef = useRef<HTMLDivElement>(null);
  const inRef = useRef<HTMLInputElement>(null);

  useEffect(() => { const el = bodyRef.current; if (el) el.scrollTop = el.scrollHeight; }, [lines]);
  useEffect(() => { setTimeout(() => inRef.current?.focus(), 60); }, []);

  function run(raw: string) {
    const cmd = raw.trim();
    const out: Line[] = [{ k: "cmd", t: cmd }];
    const [name, ...args] = cmd.split(/\s+/);
    const a = (args[0] || "").toLowerCase();
    const push = (t: string, k: Line["k"] = "out") => out.push({ k, t });
    const proj = FS_PROJECTS.find((p) => p.id === a || p.name.toLowerCase() === a);

    switch (name.toLowerCase()) {
      case "": break;
      case "help":
        push("commands:", "ok");
        ["help            this", "whoami          about me", "ls              list projects", "open <app>      open a window (lendlocal·near·vrixo·about·stack·contact)",
         "stack           the tech stack", "repos           live github pushes", "resume          open résumé", "clear           clear"].forEach((l) => push("  " + l));
        break;
      case "whoami": push(`${FS_PROFILE.name} — ${FS_PROFILE.role}.`); push("I build the whole thing — database to pixel."); break;
      case "ls": FS_PROJECTS.forEach((p) => push(`  ${(p.id + "/").padEnd(14)}${p.tag}`)); break;
      case "open":
        if (["lendlocal", "near", "vrixo", "about", "stack", "contact", "terminal"].includes(a)) { push(`opening ${a}…`, "ok"); openApp(a); }
        else if (proj) { push(`opening ${proj.id}…`, "ok"); openApp(proj.id); }
        else push(`open: unknown app '${a || "?"}'`, "err");
        break;
      case "stack": FS_STACK.forEach((g) => push(`  ${g.label.toLowerCase().padEnd(10)} ${g.items.join(", ")}`)); break;
      case "resume": case "cv": push("opening résumé…", "ok"); window.open(FS_PROFILE.resume, "_blank", "noopener"); break;
      case "repos": case "git":
        push(`fetching github.com/${FS_PROFILE.githubHandle} …`);
        fetch(`https://api.github.com/users/${FS_PROFILE.githubHandle}/repos?sort=pushed&per_page=5`)
          .then((r) => (r.ok ? r.json() : Promise.reject(new Error())))
          .then((d: { name: string; language: string | null; pushed_at: string }[]) =>
            setLines((l) => [...l, ...d.slice(0, 5).map((rp) => ({ k: "out" as const, t: `  ${rp.name.padEnd(20)}${(rp.language ?? "—").padEnd(12)}pushed ${ago(rp.pushed_at)}` }))]))
          .catch(() => setLines((l) => [...l, { k: "err", t: "github: unreachable" }]));
        break;
      case "clear": setLines([]); setInput(""); return;
      case "sudo": push("nice try 🙂", "err"); break;
      default: push(`command not found: ${name} — try 'help'`, "err");
    }
    setLines((l) => [...l, ...out]); setInput("");
  }

  return (
    <div ref={bodyRef} onClick={() => inRef.current?.focus()} style={{ height: "100%", overflowY: "auto", background: "#141118", padding: "12px 14px", fontFamily: F.mono, fontSize: 12.5, lineHeight: 1.7 }}>
      {lines.map((l, i) => (
        <div key={i} style={{ color: COL[l.k], whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
          {l.k === "cmd" ? <span><span style={{ color: COL.green }}>vishvam@os</span><span style={{ color: COL.dim }}>:~$ </span>{l.t}</span> : l.t}
        </div>
      ))}
      <div style={{ display: "flex", alignItems: "center" }}>
        <span style={{ color: COL.green }}>vishvam@os</span><span style={{ color: COL.dim }}>:~$&nbsp;</span>
        <input ref={inRef} value={input} spellCheck={false} autoComplete="off"
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter") { if (input.trim()) setHist((h) => [...h, input.trim()]); run(input); } else if (e.key === "ArrowUp") { e.preventDefault(); setInput(hist[hist.length - 1] ?? ""); } }}
          style={{ flex: 1, background: "transparent", border: "none", outline: "none", color: "#e8e6ef", fontFamily: F.mono, fontSize: 12.5, caretColor: COL.green }} />
      </div>
    </div>
  );
}
