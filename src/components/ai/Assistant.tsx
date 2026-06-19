import { useEffect, useRef, useState } from "react";
import { useRag } from "@/lib/useRag";
import { WireframeCore } from "@/components/motion/WireframeCore";
import { statsBus } from "@/lib/statsBus";
import { SUGGESTED } from "@/data/knowledge";

/** Live, real on-device inference telemetry — appears once you've asked. */
function Telemetry() {
  const [s, setS] = useState(statsBus.get());
  useEffect(() => statsBus.subscribe(setS), []);
  if (!s.queries) return null;
  const Stat = ({ k, v }: { k: string; v: string }) => (
    <span>{k} <span style={{ color: "var(--accent-2)" }}>{v}</span></span>
  );
  return (
    <div className="mb-3 flex flex-wrap items-center gap-x-4 gap-y-1 border-b pb-2.5 font-mono text-[10.5px]" style={{ color: "var(--faint)", borderColor: "var(--line)" }}>
      <span style={{ color: "var(--accent)" }}>⚡ on-device</span>
      <Stat k="embed" v={`${s.lastEmbed}ms`} />
      <Stat k="search" v={`${s.lastSearch}ms`} />
      <Stat k="avg" v={`${s.avgEmbed}ms`} />
      <Stat k="q" v={`#${s.queries}`} />
    </div>
  );
}

/** Reveals text word-by-word (the "generation" feel) once the full answer lands. */
function TypeOut({ text, onDone }: { text: string; onDone?: () => void }) {
  const [n, setN] = useState(0);
  const words = text.split(" ");
  useEffect(() => {
    setN(0);
    if (!text) return;
    let i = 0;
    const id = setInterval(() => {
      i++;
      setN(i);
      if (i >= words.length) { clearInterval(id); onDone?.(); }
    }, 32);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text]);
  const done = n >= words.length;
  return (
    <span>
      {words.slice(0, n).join(" ")}
      {!done && <span className="caret" aria-hidden />}
    </span>
  );
}

export function Assistant() {
  const { status, progress, log, meta, turns, busy, boot, ask } = useRag();
  const [value, setValue] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const logRef = useRef<HTMLDivElement>(null);

  useEffect(() => { boot(); }, [boot]);
  useEffect(() => { if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight; }, [turns, busy]);
  useEffect(() => { if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight; }, [log]);

  const ready = status === "ready";

  return (
    <div className="overflow-hidden rounded-[3px] border" style={{ borderColor: "var(--line-2)", background: "var(--surface)", boxShadow: "0 24px 60px -40px color-mix(in srgb, var(--accent) 40%, transparent)" }}>
      {/* header */}
      <div className="flex items-center gap-3 border-b px-5 py-3.5" style={{ borderColor: "var(--line)", background: "var(--bg-2)" }}>
        <span className="block h-9 w-9 shrink-0" title="live model core"><WireframeCore className="h-full w-full" /></span>
        <span className="font-mono text-[13px] font-semibold" style={{ color: "var(--fg)" }}>VISHVAM&#8209;1</span>
        <span className="kicker">on&#8209;device RAG</span>
        <span className="ml-auto font-mono text-[11px]" style={{ color: "var(--faint)" }}>
          {ready ? `${meta.docs} docs · ${meta.dims}-dim · all-MiniLM-L6-v2` : "loading model…"}
        </span>
      </div>

      {/* body */}
      <div className="relative h-[420px]">
        {!ready && status !== "error" && (
          <div className="flex h-full flex-col p-5">
            <div className="kicker mb-3" style={{ color: "var(--accent)" }}>
              cold-starting inference engine · running locally in your browser
            </div>
            <div ref={logRef} data-lenis-prevent className="flex-1 overflow-y-auto font-mono text-[11.5px] leading-relaxed" style={{ color: "var(--muted)" }}>
              {log.map((l, i) => (
                <div key={i}>
                  <span style={{ color: "var(--faint)" }}>{String(i).padStart(2, "0")} </span>
                  {l}
                </div>
              ))}
              <div style={{ color: "var(--accent)" }}><span className="caret" /></div>
            </div>
            <div className="mt-4">
              <div className="mb-1 flex justify-between font-mono text-[11px]" style={{ color: "var(--muted)" }}>
                <span>{progress.detail}</span>
                <span>{progress.pct}%</span>
              </div>
              <div className="h-1.5 overflow-hidden rounded-full" style={{ background: "var(--line)" }}>
                <div className="h-full rounded-full transition-all duration-300" style={{ width: `${progress.pct}%`, background: "linear-gradient(90deg, var(--accent-press), var(--accent))" }} />
              </div>
            </div>
          </div>
        )}

        {status === "error" && (
          <div className="flex h-full items-center justify-center p-6 text-center">
            <p className="max-w-sm font-mono text-[12.5px]" style={{ color: "var(--muted)" }}>
              On-device inference needs WebAssembly + a modern browser, which isn&apos;t available here.
              Everything about Vishvam is still in the sections below — or email{" "}
              <span style={{ color: "var(--accent)" }}>vishvamp129@gmail.com</span>.
            </p>
          </div>
        )}

        {ready && (
          <div ref={scrollRef} data-lenis-prevent className="h-full overflow-y-auto px-5 py-4">
            {turns.length === 0 && (
              <div className="flex h-full flex-col items-start justify-center gap-3">
                <p className="font-mono text-[12.5px]" style={{ color: "var(--muted)" }}>
                  Ask anything about Vishvam. Answers are retrieved from his résumé by cosine
                  similarity and generated <span style={{ color: "var(--accent)" }}>on your device</span> — no server.
                </p>
              </div>
            )}
            <div className="space-y-4">
              {turns.map((t, i) =>
                t.role === "user" ? (
                  <div key={i} className="flex justify-end">
                    <div className="max-w-[80%] rounded-xl rounded-br-sm px-3.5 py-2 font-mono text-[12.5px]" style={{ background: "var(--surface-2)", color: "var(--fg)", border: "1px solid var(--line-2)" }}>
                      {t.text}
                    </div>
                  </div>
                ) : (
                  <div key={i} className="flex flex-col gap-2">
                    <div className="max-w-[88%] text-[13.5px] leading-relaxed" style={{ color: "var(--fg)" }}>
                      {t.text ? <TypeOut text={t.text} /> : <span className="caret" />}
                    </div>
                    {t.retrieval && t.retrieval.length > 0 && (
                      <div className="flex flex-wrap items-center gap-1.5">
                        <span className="kicker" style={{ color: "var(--faint)" }}>retrieved</span>
                        {t.retrieval.map((r, j) => (
                          <span key={j} className="rounded-full border px-2 py-0.5 font-mono text-[10px]" style={{ borderColor: "var(--line-2)", color: "var(--accent)" }}>
                            {r.source} · {r.score.toFixed(2)}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ),
              )}
            </div>
          </div>
        )}
      </div>

      {/* telemetry + suggested + input */}
      <div className="border-t px-5 py-3" style={{ borderColor: "var(--line)" }}>
        <Telemetry />
        {ready && turns.length === 0 && (
          <div className="mb-3 flex flex-wrap gap-1.5">
            {SUGGESTED.map((s) => (
              <button key={s} onClick={() => ask(s)} className="rounded-full border px-2.5 py-1 font-mono text-[11px] transition-colors hover:opacity-80" style={{ borderColor: "var(--line-2)", color: "var(--muted)" }}>
                {s}
              </button>
            ))}
          </div>
        )}
        <form onSubmit={(e) => { e.preventDefault(); ask(value); setValue(""); }} className="flex items-center gap-2">
          <span className="font-mono text-[13px]" style={{ color: "var(--accent)" }}>›</span>
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            disabled={!ready || busy}
            placeholder={ready ? "ask about Vishvam's work…" : "model loading…"}
            className="flex-1 bg-transparent font-mono text-[12.5px] outline-none disabled:opacity-50"
            style={{ color: "var(--fg)" }}
            spellCheck={false}
            autoComplete="off"
          />
          <button type="submit" disabled={!ready || busy} className="rounded-md px-3 py-1 font-mono text-[11px] disabled:opacity-40" style={{ background: "var(--accent)", color: "var(--bg)" }}>
            {busy ? "…" : "send"}
          </button>
        </form>
      </div>
    </div>
  );
}
