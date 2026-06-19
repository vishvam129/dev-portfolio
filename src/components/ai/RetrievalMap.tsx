import { useEffect, useState } from "react";
import { KB } from "@/data/knowledge";
import { retrievalBus, type Hit } from "@/lib/retrievalBus";

// deterministic phyllotaxis layout — an "embedding cloud" of the résumé docs
const GA = 2.399963229;
const NODES = KB.map((c, i) => {
  const r = 15 + Math.sqrt(i + 0.5) * 21;
  const a = i * GA;
  return {
    source: c.source,
    short: (c.source.split("·").pop() ?? c.source).trim(),
    x: 100 + Math.cos(a) * r,
    y: 100 + Math.sin(a) * r,
  };
});

/** Visualizes the cosine retrieval: docs the model pulled light up + connect. */
export function RetrievalMap() {
  const [hits, setHits] = useState<Hit[]>(retrievalBus.get());
  useEffect(() => retrievalBus.subscribe(setHits), []);
  const hitMap = new Map(hits.map((h) => [h.source, h.score]));

  return (
    <div className="rounded-[4px] border p-4" style={{ borderColor: "var(--line-2)", background: "var(--surface)" }}>
      <div className="mb-2 flex items-center justify-between">
        <span className="kicker" style={{ color: "var(--faint)", fontSize: "0.58rem" }}>latent space · cosine retrieval</span>
        <span className="font-mono text-[10px]" style={{ color: "var(--accent-2)" }}>{hits.length ? `${hits.length}/${KB.length} hit` : `${KB.length} docs`}</span>
      </div>
      <svg viewBox="0 0 200 200" className="w-full" style={{ aspectRatio: "1.4 / 1" }} aria-hidden>
        {/* connections from query-center to retrieved docs */}
        {NODES.map((n) => {
          const score = hitMap.get(n.source);
          if (score === undefined) return null;
          return <line key={"l" + n.source} x1="100" y1="100" x2={n.x} y2={n.y} stroke="var(--accent)" strokeWidth={0.5 + score} opacity={0.25 + score * 0.6} />;
        })}
        {/* doc nodes */}
        {NODES.map((n) => {
          const score = hitMap.get(n.source);
          const hit = score !== undefined;
          return (
            <g key={n.source} style={{ transition: "opacity 0.5s" }}>
              <circle cx={n.x} cy={n.y} r={hit ? 2.4 + score * 3.4 : 1.3} fill={hit ? "var(--accent)" : "var(--faint)"}
                style={{ transition: "r 0.45s cubic-bezier(0.16,1,0.3,1), fill 0.45s", filter: hit ? "drop-shadow(0 0 4px var(--accent))" : "none" }} />
              {hit && score > 0.34 && (
                <text x={n.x + 5} y={n.y + 2.5} fontSize="5.5" fontFamily="var(--f-mono)" fill="var(--fg)">{n.short}</text>
              )}
            </g>
          );
        })}
        {/* query center */}
        <circle cx="100" cy="100" r="3.4" fill="none" stroke="var(--accent-2)" strokeWidth="1" />
        <circle cx="100" cy="100" r="1.4" fill="var(--accent-2)" />
      </svg>
      <div className="mt-1 font-mono text-[10px]" style={{ color: "var(--faint)" }}>
        {hits.length ? "↑ documents the model pulled to answer" : "ask something — watch which docs light up"}
      </div>
    </div>
  );
}
