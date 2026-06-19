import { useCallback, useEffect, useRef, useState } from "react";
import { coreBus } from "@/lib/coreBus";
import { retrievalBus } from "@/lib/retrievalBus";
import { statsBus } from "@/lib/statsBus";
import { ragClient } from "@/lib/ragClient";

export type RagStatus = "idle" | "loading" | "ready" | "error";
export type Progress = { stage: string; detail: string; pct: number };
export type Retrieval = { source: string; score: number };
export type Turn = {
  role: "user" | "assistant";
  text: string;
  sources?: string[];
  retrieval?: Retrieval[];
  streaming?: boolean;
};

let _id = 0;

/** Owns the RAG worker lifecycle, boot progress, and the chat transcript. */
export function useRag() {
  const unsubRef = useRef<(() => void) | null>(null);
  const [status, setStatus] = useState<RagStatus>("idle");
  const [progress, setProgress] = useState<Progress>({ stage: "boot", detail: "Cold start", pct: 0 });
  const [log, setLog] = useState<string[]>([]);
  const [meta, setMeta] = useState<{ dims: number; docs: number }>({ dims: 0, docs: 0 });
  const [turns, setTurns] = useState<Turn[]>([]);
  const [busy, setBusy] = useState(false);

  const boot = useCallback(() => {
    if (unsubRef.current) return;
    setStatus("loading");
    coreBus.set("loading");

    unsubRef.current = ragClient.on((m) => {
      if (m.type === "progress") {
        setProgress({ stage: m.stage, detail: m.detail, pct: m.pct });
        setLog((l) => [...l.slice(-40), m.detail]);
      } else if (m.type === "ready") {
        setMeta({ dims: m.dims, docs: m.docs });
        setProgress({ stage: "ready", detail: "Inference engine ready", pct: 100 });
        setLog((l) => [...l.slice(-40), `Ready · ${m.docs} docs · ${m.dims}-dim embeddings`]);
        setStatus("ready");
        coreBus.fire();
      } else if (m.type === "result") {
        setBusy(false);
        coreBus.fire();
        retrievalBus.set(m.retrieval ?? []);
        if (m.timing) statsBus.record(m.timing.embed_ms, m.timing.search_ms, m.timing.docs);
        setTurns((t) => {
          const next = [...t];
          // replace the trailing placeholder assistant turn
          for (let i = next.length - 1; i >= 0; i--) {
            if (next[i].role === "assistant" && next[i].streaming) {
              next[i] = { role: "assistant", text: m.answer, sources: m.sources, retrieval: m.retrieval, streaming: true };
              break;
            }
          }
          return next;
        });
      } else if (m.type === "error") {
        setStatus("error");
        setBusy(false);
        setLog((l) => [...l, `error: ${m.message}`]);
      }
    });
    ragClient.start();
  }, []);

  useEffect(() => {
    // unsubscribe on unmount; the shared worker stays alive for the page
    return () => { unsubRef.current?.(); unsubRef.current = null; };
  }, []);

  const ask = useCallback((text: string) => {
    const q = text.trim();
    if (!q || busy || status !== "ready") return;
    setBusy(true);
    coreBus.set("thinking");
    setTurns((t) => [...t, { role: "user", text: q }, { role: "assistant", text: "", streaming: true }]);
    ragClient.query(q, ++_id);
  }, [busy, status]);

  const markDone = useCallback((idx: number) => {
    setTurns((t) => t.map((turn, i) => (i === idx ? { ...turn, streaming: false } : turn)));
  }, []);

  return { status, progress, log, meta, turns, busy, boot, ask, markDone };
}
