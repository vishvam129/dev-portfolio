// Latest retrieval result (which résumé docs the RAG pulled + cosine scores).
// The RetrievalMap subscribes to visualize the semantic search as a constellation.

export type Hit = { source: string; score: number };

let latest: Hit[] = [];
const subs = new Set<(h: Hit[]) => void>();

export const retrievalBus = {
  get: () => latest,
  set(h: Hit[]) {
    latest = h;
    subs.forEach((f) => f(h));
  },
  subscribe(f: (h: Hit[]) => void) {
    subs.add(f);
    return () => { subs.delete(f); };
  },
};
