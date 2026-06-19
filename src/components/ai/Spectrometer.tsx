import { useEffect, useRef, useState } from "react";
import { ragClient } from "@/lib/ragClient";
import { KB } from "@/data/knowledge";

type Score = { source: string; short: string; score: number };
const DOCS = KB.map((c) => ({ source: c.source, short: (c.source.split("·").pop() ?? c.source).trim() }));
const norm = (s: number) => Math.max(0, Math.min(1, (s - 0.04) / 0.52));

const SUGGEST = ["vision models", "kubernetes deploys", "real-time chat", "payments", "available to hire"];

/** Live cosine-similarity meter: type, and every résumé doc's bar tracks how
 *  semantically close it is — measured on-device, per keystroke. */
export function Spectrometer() {
  const [ready, setReady] = useState(false);
  const [bySrc, setBySrc] = useState<Record<string, number>>({});
  const [value, setValue] = useState("");
  const [embedMs, setEmbedMs] = useState<number | null>(null);
  const idRef = useRef(0);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    ragClient.start();
    return ragClient.on((m) => {
      if (m.type === "ready") setReady(true);
      else if (m.type === "scores") {
        const map: Record<string, number> = {};
        (m.scores as Score[]).forEach((s) => { map[s.source] = s.score; });
        setBySrc(map); setEmbedMs(m.embed_ms);
      }
    });
  }, []);

  function run(v: string) {
    setValue(v);
    if (timer.current) clearTimeout(timer.current);
    if (!v.trim()) { setBySrc({}); setEmbedMs(null); return; }
    timer.current = setTimeout(() => ragClient.score(v, ++idRef.current), 120);
  }

  let topSrc = ""; let topScore = -1;
  for (const d of DOCS) { const s = bySrc[d.source] ?? 0; if (s > topScore) { topScore = s; topSrc = d.source; } }
  const active = Object.keys(bySrc).length > 0;

  return (
    <section id="spectrometer" className="wrap scroll-mt-24 py-24">
      <div className="mb-10">
        <div className="rule-faint" />
        <div className="flex items-end justify-between gap-6 pt-4">
          <div className="flex items-end gap-5">
            <span className="ghostnum">◴</span>
            <div className="pb-1">
              <span className="glyph block">// LIVE RETRIEVAL</span>
              <h2 className="font-display mt-1" style={{ fontSize: "clamp(1.6rem,3vw,2.2rem)", color: "var(--fg)" }}>Semantic spectrometer</h2>
            </div>
          </div>
          <span className="kicker hidden pb-2 sm:inline" style={{ color: "var(--faint)", fontSize: "0.58rem" }}>cosine · per keystroke · on-device</span>
        </div>
      </div>

      <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr]">
        {/* control */}
        <div>
          <p className="max-w-sm text-[14.5px] leading-relaxed" style={{ color: "var(--muted)" }}>
            Type a phrase. Every résumé document&apos;s bar tracks how close it is in meaning —
            <span style={{ color: "var(--fg)" }}> measured live</span>, on your device, as you type. No submit.
          </p>
          <div className="mt-6 flex items-center gap-2 rounded-[4px] border px-3 py-2.5" style={{ borderColor: "var(--line-2)", background: "var(--surface)" }}>
            <span className="font-mono text-[13px]" style={{ color: "var(--accent)" }}>›</span>
            <input
              value={value}
              onChange={(e) => run(e.target.value)}
              disabled={!ready}
              placeholder={ready ? "e.g. vision models, kubernetes, payments…" : "model loading…"}
              className="flex-1 bg-transparent font-mono text-[13px] outline-none disabled:opacity-50"
              style={{ color: "var(--fg)" }} spellCheck={false} autoComplete="off"
            />
          </div>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {SUGGEST.map((s) => (
              <button key={s} disabled={!ready} onClick={() => run(s)} className="rounded-full border px-2.5 py-1 font-mono text-[11px] disabled:opacity-40"
                style={{ borderColor: "var(--line-2)", color: "var(--muted)" }}>{s}</button>
            ))}
          </div>
          <div className="mt-5 font-mono text-[11px]" style={{ color: "var(--faint)" }}>
            {active
              ? <>top match → <span style={{ color: "var(--accent-2)" }}>{(topSrc.split("·").pop() ?? topSrc).trim()}</span> · {topScore.toFixed(2)} · embed {embedMs}ms</>
              : "waiting for input…"}
          </div>
        </div>

        {/* meter rack */}
        <div className="rounded-[4px] border p-5" style={{ borderColor: "var(--line-2)", background: "var(--surface)" }}>
          <div className="space-y-2.5">
            {DOCS.map((d) => {
              const raw = bySrc[d.source] ?? 0;
              const isTop = active && d.source === topSrc;
              const col = isTop ? "var(--accent-2)" : "var(--accent)";
              return (
                <div key={d.source} className="grid grid-cols-[110px_1fr_38px] items-center gap-3">
                  <span className="truncate font-mono text-[10.5px]" style={{ color: isTop ? "var(--fg)" : "var(--muted)" }}>{d.short}</span>
                  <div className="relative h-2 overflow-hidden rounded-full" style={{ background: "var(--bg-2)" }}>
                    <div className="absolute inset-y-0 left-0 rounded-full" style={{ width: `${norm(raw) * 100}%`, background: col, transition: "width 0.18s cubic-bezier(0.16,1,0.3,1)", boxShadow: isTop ? "0 0 8px var(--accent-2)" : "none" }} />
                  </div>
                  <span className="text-right font-mono text-[10px] tabular-nums" style={{ color: raw > 0.04 ? col : "var(--faint)" }}>{raw > 0 ? raw.toFixed(2) : "—"}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
