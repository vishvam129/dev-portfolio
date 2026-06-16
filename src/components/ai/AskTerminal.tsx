"use client";

import { useEffect, useRef, useState } from "react";
import { INTENTS, infer } from "@/data/intents";

type Line = { kind: "in" | "out" | "sys"; text: string };

const BOOT: Line[] = [
  { kind: "sys", text: "vishvam-1 · inference session · ctx 200k · temperature 0.2" },
  { kind: "sys", text: "model loaded. ask anything, or tap an intent below." },
];

export function AskTerminal() {
  const [lines, setLines] = useState<Line[]>(BOOT);
  const [value, setValue] = useState("");
  const [busy, setBusy] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [lines, busy]);

  function submit(raw: string) {
    const text = raw.trim();
    if (!text || busy) return;
    setValue("");
    if (text.toLowerCase() === "clear") {
      setLines(BOOT);
      return;
    }
    const answer = infer(text);
    setLines((l) => [...l, { kind: "in", text }]);
    setBusy(true);
    // stream the answer lines in, one at a time
    let i = 0;
    const push = () => {
      if (i >= answer.length) { setBusy(false); return; }
      setLines((l) => [...l, { kind: "out", text: answer[i] }]);
      i++;
      setTimeout(push, 130);
    };
    setTimeout(push, 220);
  }

  return (
    <div
      className="overflow-hidden rounded-xl border"
      style={{ borderColor: "var(--line)", background: "var(--panel)" }}
      onClick={() => inputRef.current?.focus()}
    >
      {/* title bar */}
      <div
        className="flex items-center gap-2 border-b px-4 py-2.5"
        style={{ borderColor: "var(--line)", background: "var(--bg-soft)" }}
      >
        <span className="live-dot" />
        <span className="mono-label" style={{ color: "var(--fg)" }}>
          ask vishvam&#8209;1
        </span>
        <span className="mono-label ml-auto">/ inference</span>
      </div>

      {/* transcript */}
      <div
        ref={scrollRef}
        className="font-mono text-[12.5px] leading-relaxed px-4 py-4 h-[300px] overflow-y-auto"
      >
        {lines.map((l, i) => (
          <div
            key={i}
            className="whitespace-pre-wrap break-words"
            style={{
              color:
                l.kind === "in" ? "var(--fg)" : l.kind === "sys" ? "var(--faint)" : "var(--muted)",
            }}
          >
            {l.kind === "in" && <span style={{ color: "var(--accent)" }}>{"› "}</span>}
            {l.text}
          </div>
        ))}
        {busy && (
          <div style={{ color: "var(--accent)" }} className="font-mono text-[12.5px]">
            <span className="caret" />
          </div>
        )}
      </div>

      {/* input */}
      <form
        onSubmit={(e) => { e.preventDefault(); submit(value); }}
        className="flex items-center gap-2 border-t px-4 py-3"
        style={{ borderColor: "var(--line)" }}
      >
        <span className="font-mono text-[12.5px]" style={{ color: "var(--accent)" }}>›</span>
        <input
          ref={inputRef}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="ask vishvam-1…  (try: projects, stack, hire)"
          aria-label="Ask VISHVAM-1"
          className="flex-1 bg-transparent font-mono text-[12.5px] outline-none"
          style={{ color: "var(--fg)" }}
          autoComplete="off"
          spellCheck={false}
        />
      </form>

      {/* intent chips */}
      <div className="flex flex-wrap gap-2 border-t px-4 py-3" style={{ borderColor: "var(--line)" }}>
        {INTENTS.map((it) => (
          <button
            key={it.id}
            onClick={() => submit(it.chip)}
            className="rounded-full border px-3 py-1 font-mono text-[11px] transition-colors"
            style={{ borderColor: "var(--line)", color: "var(--muted)" }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "var(--accent)";
              e.currentTarget.style.color = "var(--fg)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "var(--line)";
              e.currentTarget.style.color = "var(--muted)";
            }}
          >
            {it.chip}
          </button>
        ))}
      </div>
    </div>
  );
}
