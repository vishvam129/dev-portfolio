// Live, REAL on-device inference telemetry, accumulated over the session.
// Fed by genuine performance.now() timings measured inside the RAG worker.

export type Stats = {
  queries: number;
  lastEmbed: number;   // ms
  lastSearch: number;  // ms
  avgEmbed: number;    // ms
  docs: number;
};

let stats: Stats = { queries: 0, lastEmbed: 0, lastSearch: 0, avgEmbed: 0, docs: 0 };
const subs = new Set<(s: Stats) => void>();

export const statsBus = {
  get: () => stats,
  record(embed_ms: number, search_ms: number, docs: number) {
    const queries = stats.queries + 1;
    const avgEmbed = (stats.avgEmbed * stats.queries + embed_ms) / queries;
    stats = { queries, lastEmbed: embed_ms, lastSearch: search_ms, avgEmbed: +avgEmbed.toFixed(1), docs };
    subs.forEach((f) => f(stats));
  },
  subscribe(f: (s: Stats) => void) {
    subs.add(f);
    return () => { subs.delete(f); };
  },
};
