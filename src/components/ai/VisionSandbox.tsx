import { useCallback, useEffect, useRef, useState } from "react";

type Stage = "idle" | "loading" | "ready" | "processing" | "error";

export function VisionSandbox() {
  const workerRef = useRef<Worker | null>(null);
  const [stage, setStage] = useState<Stage>("idle");
  const [progress, setProgress] = useState<{ detail: string; pct: number }>({ detail: "", pct: 0 });
  const [original, setOriginal] = useState<string | null>(null);
  const [cutout, setCutout] = useState<string | null>(null);
  const [split, setSplit] = useState(50);
  const idRef = useRef(0);

  useEffect(() => () => { workerRef.current?.terminate(); }, []);

  const load = useCallback(() => {
    if (workerRef.current) return;
    setStage("loading");
    const w = new Worker(new URL("../../workers/vision.worker.ts", import.meta.url), { type: "module" });
    workerRef.current = w;
    w.onmessage = (e: MessageEvent) => {
      const m = e.data;
      if (m.type === "progress") setProgress({ detail: m.detail, pct: m.pct });
      else if (m.type === "ready") setStage("ready");
      else if (m.type === "result") {
        setCutout(URL.createObjectURL(m.blob));
        setStage("ready");
        setSplit(50);
      } else if (m.type === "error") setStage("error");
    };
    w.onerror = () => setStage("error");
    w.postMessage({ type: "init" });
  }, []);

  const handleFile = useCallback((file: File) => {
    if (!file.type.startsWith("image/")) return;
    const url = URL.createObjectURL(file);
    setOriginal(url);
    setCutout(null);
    if (workerRef.current && (stage === "ready" || stage === "processing")) {
      setStage("processing");
      workerRef.current.postMessage({ type: "process", url, id: ++idRef.current });
    }
  }, [stage]);

  // reprocess once model becomes ready if an image is already chosen
  useEffect(() => {
    if (stage === "ready" && original && !cutout && workerRef.current) {
      setStage("processing");
      workerRef.current.postMessage({ type: "process", url: original, id: ++idRef.current });
    }
  }, [stage, original, cutout]);

  return (
    <section id="sandbox" className="mx-auto max-w-6xl px-5 py-20">
      <div className="mb-8 flex items-end justify-between border-b pb-4" style={{ borderColor: "var(--line)" }}>
        <div className="flex items-baseline gap-4">
          <span className="mono-label" style={{ color: "var(--accent)" }}>vision sandbox</span>
          <h2 className="font-display text-2xl font-bold sm:text-3xl" style={{ color: "var(--fg)" }}>Run a vision model</h2>
        </div>
        <span className="mono-label hidden sm:block">RMBG-1.4 · on-device · à la Vrixo</span>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
        {/* canvas */}
        <div
          className="relative grid min-h-[340px] place-items-center overflow-hidden rounded-2xl border"
          style={{ borderColor: "var(--line-2)", background: "var(--panel)" }}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => { e.preventDefault(); const f = e.dataTransfer.files[0]; if (f) handleFile(f); }}
        >
          {!original && (
            <label className="flex cursor-pointer flex-col items-center gap-3 p-10 text-center">
              <div className="grid h-14 w-14 place-items-center rounded-full border" style={{ borderColor: "var(--line-2)", color: "var(--accent)" }}>↥</div>
              <span className="font-mono text-[13px]" style={{ color: "var(--fg)" }}>Drop an image, or click to upload</span>
              <span className="mono-label">background removed locally — nothing leaves your device</span>
              <input type="file" accept="image/*" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); }} />
            </label>
          )}

          {original && (
            <div className="relative h-full w-full select-none" style={{ minHeight: 340 }}>
              {/* checkerboard for transparency */}
              <div className="absolute inset-0" style={{ backgroundImage: "conic-gradient(#1a2226 90deg, transparent 90deg 180deg, #1a2226 180deg 270deg, transparent 270deg)", backgroundSize: "20px 20px" }} />
              {/* cutout (full) */}
              {cutout && <img src={cutout} alt="background removed" className="absolute inset-0 h-full w-full object-contain" />}
              {/* original clipped to the left of the slider */}
              <img src={original} alt="original" className="absolute inset-0 h-full w-full object-contain" style={{ clipPath: `inset(0 ${100 - split}% 0 0)` }} />
              {/* divider */}
              {cutout && (
                <>
                  <div className="absolute inset-y-0 w-px" style={{ left: `${split}%`, background: "var(--accent)" }} />
                  <input type="range" min={0} max={100} value={split} onChange={(e) => setSplit(+e.target.value)}
                    className="absolute inset-x-0 bottom-3 mx-auto w-2/3 accent-[color:var(--accent)]" />
                  <span className="absolute left-3 top-3 mono-label" style={{ color: "var(--fg)" }}>original</span>
                  <span className="absolute right-3 top-3 mono-label" style={{ color: "var(--accent)" }}>removed</span>
                </>
              )}
              {stage === "processing" && (
                <div className="absolute inset-0 grid place-items-center" style={{ background: "color-mix(in srgb, var(--bg) 55%, transparent)" }}>
                  <span className="font-mono text-[12px]" style={{ color: "var(--accent)" }}>computing alpha matte… <span className="caret" /></span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* control panel */}
        <div className="rounded-2xl border p-6" style={{ borderColor: "var(--line-2)", background: "var(--panel)" }}>
          <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
            Vrixo strips backgrounds with <span style={{ color: "var(--fg)" }}>RemBG / U²-Net</span> behind a job queue.
            Here the same class of model (<span style={{ color: "var(--fg)" }}>RMBG-1.4</span>) runs <span style={{ color: "var(--accent)" }}>entirely in your browser</span> via
            ONNX + WebAssembly — your image is never uploaded.
          </p>

          {stage === "idle" && (
            <button onClick={load} className="mt-6 w-full rounded-lg px-4 py-3 font-mono text-[13px]" style={{ background: "var(--accent)", color: "var(--bg)" }}>
              load vision model (~44MB, one-time)
            </button>
          )}
          {stage === "loading" && (
            <div className="mt-6">
              <div className="mb-1 flex justify-between font-mono text-[11px]" style={{ color: "var(--muted)" }}>
                <span>{progress.detail || "initializing…"}</span><span>{progress.pct}%</span>
              </div>
              <div className="h-1.5 overflow-hidden rounded-full" style={{ background: "var(--line)" }}>
                <div className="h-full rounded-full transition-all" style={{ width: `${progress.pct}%`, background: "var(--accent)" }} />
              </div>
            </div>
          )}
          {stage === "ready" && (
            <p className="mt-6 font-mono text-[12px]" style={{ color: "var(--ok)" }}>
              ✓ model ready — drop an image to remove its background.
            </p>
          )}
          {stage === "error" && (
            <p className="mt-6 font-mono text-[12px]" style={{ color: "var(--muted)" }}>
              This device can&apos;t run the model (needs WebAssembly). The concept: pretrained vision models, client-side.
            </p>
          )}

          <div className="mt-6 border-t pt-4" style={{ borderColor: "var(--line)" }}>
            <div className="mono-label mb-2">pipeline</div>
            <ol className="space-y-1 font-mono text-[11px]" style={{ color: "var(--faint)" }}>
              <li>1 · decode image → tensor</li>
              <li>2 · RMBG-1.4 forward pass (WASM)</li>
              <li>3 · alpha matte → RGBA composite</li>
              <li>4 · render to canvas</li>
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
