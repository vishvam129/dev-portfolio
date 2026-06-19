// Single shared RAG worker for the whole page — the console (chat) and the
// spectrometer (live per-keystroke scoring) both talk to ONE model instance.

// worker messages are dynamic; keep the shape loose for consumers
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Msg = { type: string; [k: string]: any };
type Listener = (m: Msg) => void;

let worker: Worker | null = null;
let started = false;
const listeners = new Set<Listener>();

function ensure() {
  if (worker) return;
  worker = new Worker(new URL("../workers/rag.worker.ts", import.meta.url), { type: "module" });
  worker.onmessage = (e: MessageEvent) => { for (const l of listeners) l(e.data); };
  worker.onerror = () => { for (const l of listeners) l({ type: "error", message: "worker error" }); };
}

export const ragClient = {
  start() { ensure(); if (!started) { started = true; worker!.postMessage({ type: "init" }); } },
  on(l: Listener) { listeners.add(l); return () => { listeners.delete(l); }; },
  query(text: string, id: number) { ensure(); worker!.postMessage({ type: "query", text, id }); },
  score(text: string, id: number) { ensure(); worker!.postMessage({ type: "score", text, id }); },
};
