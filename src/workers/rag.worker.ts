/// <reference lib="webworker" />
// On-device RAG worker. Loads a quantized sentence-embedding model
// (all-MiniLM-L6-v2) via Transformers.js, embeds the knowledge base, and
// answers queries with cosine-similarity retrieval + grounded extraction.
// Runs entirely in the browser — no server, no API calls.

import { pipeline, env } from "@huggingface/transformers";
import { KB } from "@/data/knowledge";

env.allowLocalModels = false;
env.useBrowserCache = true;

const ctx = self as unknown as DedicatedWorkerGlobalScope;

type Vec = Float32Array;
type Embedder = (text: string, opts: { pooling: "mean"; normalize: boolean }) => Promise<{ data: Float32Array }>;

let extractor: Embedder | null = null;
let kbVectors: Vec[] = [];

function post(msg: unknown) {
  ctx.postMessage(msg);
}

function dot(a: Vec, b: Vec): number {
  let s = 0;
  for (let i = 0; i < a.length; i++) s += a[i] * b[i];
  return s; // vectors are L2-normalized → dot == cosine similarity
}

async function embed(text: string): Promise<Vec> {
  const out = await extractor!(text, { pooling: "mean", normalize: true });
  return out.data;
}

async function init() {
  post({ type: "progress", stage: "boot", detail: "Initializing WebAssembly execution module…", pct: 4 });
  extractor = (await pipeline("feature-extraction", "Xenova/all-MiniLM-L6-v2", {
    dtype: "q8",
    progress_callback: (p: { status: string; file?: string; progress?: number }) => {
      if (p.status === "progress" && typeof p.progress === "number") {
        post({
          type: "progress",
          stage: "model",
          detail: `Downloading weights · ${p.file ?? "model"}`,
          pct: 6 + Math.round(p.progress * 0.7),
        });
      } else if (p.status === "ready") {
        post({ type: "progress", stage: "model", detail: "Allocating tensor buffers…", pct: 78 });
      }
    },
  })) as unknown as Embedder;

  post({ type: "progress", stage: "index", detail: "Embedding knowledge base…", pct: 84 });
  kbVectors = [];
  for (let i = 0; i < KB.length; i++) {
    kbVectors.push(await embed(KB[i].text));
    post({
      type: "progress",
      stage: "index",
      detail: `Indexed ${i + 1}/${KB.length} documents`,
      pct: 84 + Math.round(((i + 1) / KB.length) * 15),
    });
  }
  post({ type: "ready", dims: kbVectors[0]?.length ?? 0, docs: KB.length });
}

function pickSentences(query: string, text: string, max = 2): string {
  const q = new Set(
    query.toLowerCase().replace(/[^a-z0-9 ]/g, " ").split(/\s+/).filter((w) => w.length > 2),
  );
  const sentences = text.match(/[^.!?]+[.!?]+/g) ?? [text];
  const scored = sentences.map((s) => {
    const words = s.toLowerCase().split(/\s+/);
    let hit = 0;
    for (const w of words) if (q.has(w.replace(/[^a-z0-9]/g, ""))) hit++;
    return { s: s.trim(), hit };
  });
  const top = scored.filter((x) => x.hit > 0).sort((a, b) => b.hit - a.hit).slice(0, max);
  if (top.length === 0) return sentences.slice(0, max).join(" ").trim();
  // keep original order for readability
  const chosen = new Set(top.map((t) => t.s));
  return sentences.map((s) => s.trim()).filter((s) => chosen.has(s)).join(" ");
}

async function query(text: string, id: number) {
  if (!extractor) return;
  // real on-device timing
  const t0 = performance.now();
  const qv = await embed(text);
  const t1 = performance.now();
  const ranked = kbVectors
    .map((v, i) => ({ i, score: dot(qv, v) }))
    .sort((a, b) => b.score - a.score);
  const t2 = performance.now();
  const timing = { embed_ms: +(t1 - t0).toFixed(1), search_ms: +(t2 - t1).toFixed(2), docs: kbVectors.length };

  const top = ranked.slice(0, 3).filter((r) => r.score > 0.18);
  if (top.length === 0) {
    post({
      type: "result",
      id,
      timing,
      answer: "I can only answer from Vishvam's résumé and projects, and I couldn't find anything relevant to that. Try asking about Vrixo, Near, LendLocal, RdFlex, his stack, or availability.",
      sources: [],
      retrieval: ranked.slice(0, 3).map((r) => ({ source: KB[r.i].source, score: +r.score.toFixed(3) })),
    });
    return;
  }

  // grounded answer: best sentences from the top chunk, plus a supporting line
  const primary = pickSentences(text, KB[top[0].i].text, 3);
  let answer = primary;
  if (top[1] && top[1].score > 0.3) {
    const extra = pickSentences(text, KB[top[1].i].text, 1);
    if (extra && !primary.includes(extra)) answer += " " + extra;
  }

  post({
    type: "result",
    id,
    timing,
    answer,
    sources: [...new Set(top.map((r) => KB[r.i].source))],
    retrieval: top.map((r) => ({ source: KB[r.i].source, score: +r.score.toFixed(3) })),
  });
}

// lightweight per-keystroke scoring: embed query, cosine vs ALL docs, no answer
async function score(text: string, id: number) {
  if (!extractor || !kbVectors.length) return;
  const t0 = performance.now();
  const qv = await embed(text);
  const scores = kbVectors.map((v, i) => ({
    source: KB[i].source,
    short: (KB[i].source.split("·").pop() ?? KB[i].source).trim(),
    score: dot(qv, v),
  }));
  post({ type: "scores", id, scores, embed_ms: +(performance.now() - t0).toFixed(1) });
}

ctx.onmessage = async (e: MessageEvent) => {
  const msg = e.data;
  try {
    if (msg.type === "init") await init();
    else if (msg.type === "query") await query(msg.text, msg.id);
    else if (msg.type === "score") await score(msg.text, msg.id);
  } catch (err) {
    post({ type: "error", message: err instanceof Error ? err.message : String(err) });
  }
};
