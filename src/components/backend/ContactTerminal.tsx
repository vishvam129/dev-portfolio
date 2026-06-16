"use client";

import { useEffect, useRef, useState } from "react";
import { PROFILE } from "@/data/content";

const PROMPT = "visitor@vishvam:~$";

const COMMANDS: Record<string, string[]> = {
  help: ["available: whoami  projects  stack  contact  resume  clear", "(or any of the ⌘K commands)"],
  whoami: ["vishvam — backend engineer · Python · FastAPI · PostgreSQL · Kubernetes"],
  projects: ["near · vrixo · lendlocal (live) · stock-prediction", "run `open lendlocal` — or scroll up to /services"],
  stack: ["python  typescript  fastapi  django  postgres  redis  celery  docker  k8s"],
  contact: [
    `email    ${PROFILE.email}`,
    `github   github.com/${PROFILE.githubHandle}`,
    `linkedin in/vishvam129`,
    "status   open to remote backend roles",
  ],
  resume: ["serving /resume/Vishvam_Patel_Backend_Developer.pdf …", "→ opening in a new tab"],
};

type Line = { p?: boolean; text: string };

export function ContactTerminal() {
  const [lines, setLines] = useState<Line[]>([
    { text: "vishvam.systems shell · type `help`" },
  ]);
  const [val, setVal] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [lines]);

  function run(raw: string) {
    const cmd = raw.trim().toLowerCase();
    setVal("");
    if (!cmd) return;
    if (cmd === "clear") { setLines([]); return; }
    const echo: Line = { p: true, text: raw.trim() };
    if (cmd === "resume") window.open("/resume/Vishvam_Patel_Backend_Developer.pdf", "_blank");
    if (cmd.startsWith("open lendlocal")) {
      window.open("https://lendlocal-eight.vercel.app", "_blank");
      setLines((l) => [...l, echo, { text: "→ opening lendlocal-eight.vercel.app" }]);
      return;
    }
    const out = COMMANDS[cmd] ?? [`command not found: ${cmd} — try \`help\``];
    setLines((l) => [...l, echo, ...out.map((t) => ({ text: t }))]);
  }

  return (
    <div
      className="overflow-hidden rounded-xl border"
      style={{ borderColor: "var(--line)", background: "#04060800" }}
      onClick={() => inputRef.current?.focus()}
    >
      <div className="flex items-center gap-2 border-b px-4 py-2.5" style={{ borderColor: "var(--line)", background: "var(--bg-soft)" }}>
        <span className="h-2.5 w-2.5 rounded-full" style={{ background: "var(--err, #f76d6d)" }} />
        <span className="h-2.5 w-2.5 rounded-full" style={{ background: "var(--warn)" }} />
        <span className="h-2.5 w-2.5 rounded-full" style={{ background: "var(--ok)" }} />
        <span className="mono-label ml-2">bash</span>
      </div>
      <div ref={scrollRef} className="h-[260px] overflow-y-auto p-4 font-mono text-[12.5px] leading-relaxed" style={{ background: "var(--panel)" }}>
        {lines.map((l, i) => (
          <div key={i} className="whitespace-pre-wrap break-words">
            {l.p && <span style={{ color: "var(--accent)" }}>{PROMPT} </span>}
            <span style={{ color: l.p ? "var(--fg)" : "var(--muted)" }}>{l.text}</span>
          </div>
        ))}
        <form onSubmit={(e) => { e.preventDefault(); run(val); }} className="mt-1 flex items-center">
          <span style={{ color: "var(--accent)" }}>{PROMPT}&nbsp;</span>
          <input
            ref={inputRef}
            value={val}
            onChange={(e) => setVal(e.target.value)}
            className="flex-1 bg-transparent outline-none"
            style={{ color: "var(--fg)" }}
            aria-label="terminal input"
            autoComplete="off"
            spellCheck={false}
          />
        </form>
      </div>
    </div>
  );
}
