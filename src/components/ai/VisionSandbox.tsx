import { useCallback, useEffect, useRef, useState } from "react";
import { Reveal } from "@/components/fx/Reveal";

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
      else if (m.type === "result") { setCutout(URL.createObjectURL(m.blob)); setStage("ready"); setSplit(50); }
      else if (m.type === "error") setStage("error");
    };
    w.onerror = () => setStage("error");
    w.postMessage({ type: "init" });
  }, []);

  const handleFile = useCallback((file: File) => {
    if (!file.type.startsWith("image/")) return;
    const url = URL.createObjectURL(file);
    setOriginal(url); setCutout(null);
    if (workerRef.current && (stage === "ready" || stage === "processing")) {
      setStage("processing");
      workerRef.current.postMessage({ type: "process", url, id: ++idRef.current });
    }
  }, [stage]);

  useEffect(() => {
    if (stage === "ready" && original && !cutout && workerRef.current) {
      setStage("processing");
      workerRef.current.postMessage({ type: "process", url: original, id: ++idRef.current });
    }
  }, [stage, original, cutout]);

  return (
    <section id="sandbox" className="wrap scroll-mt-24 py-24">
      <div className="mb-12">
        <div className="rule-faint" />
        <div className="flex items-center justify-between pt-4">
          <span className="glyph">02 — VISION SANDBOX</span>
          <span className="kicker hidden sm:inline" style={{ color: "var(--faint)", fontSize: "0.6rem" }}>RMBG-1.4 · client-side · à la Vrixo</span>
        </div>
      </div>

      <div className="grid gap-10 lg:grid-cols-[1.25fr_0.75fr]">
        {/* canvas */}
        <Reveal>
          <div
            className="relative grid min-h-[360px] place-items-center overflow-hidden rounded-[4px] border"
            style={{ borderColor: "var(--line-2)", background: "var(--surface)" }}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => { e.preventDefault(); const f = e.dataTransfer.files[0]; if (f) handleFile(f); }}
          >
            {!original && (
              <label data-hover className="flex cursor-pointer flex-col items-center gap-3 p-10 text-center">
                <div className="grid h-16 w-16 place-items-center rounded-full border" style={{ borderColor: "var(--line-2)", color: "var(--accent)" }}>↥</div>
                <span className="font-mono text-[13px]" style={{ color: "var(--fg)" }}>Drop an image, or click to upload</span>
                <span className="kicker" style={{ fontSize: "0.6rem" }}>removed locally — nothing leaves your device</span>
                <input type="file" accept="image/*" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); }} />
              </label>
            )}
            {original && (
              <div className="relative h-full w-full select-none" style={{ minHeight: 360 }}>
                <div className="absolute inset-0" style={{ backgroundImage: "conic-gradient(#14161b 90deg, transparent 90deg 180deg, #14161b 180deg 270deg, transparent 270deg)", backgroundSize: "22px 22px" }} />
                {cutout && <img src={cutout} alt="background removed" className="absolute inset-0 h-full w-full object-contain" />}
                <img src={original} alt="original" className="absolute inset-0 h-full w-full object-contain" style={{ clipPath: `inset(0 ${100 - split}% 0 0)` }} />
                {cutout && (
                  <>
                    <div className="absolute inset-y-0 w-px" style={{ left: `${split}%`, background: "var(--accent)" }} />
                    <input type="range" min={0} max={100} value={split} onChange={(e) => setSplit(+e.target.value)} className="absolute inset-x-0 bottom-3 mx-auto w-2/3" style={{ accentColor: "var(--accent)" }} />
                    <span className="kicker absolute left-3 top-3" style={{ color: "var(--fg)", fontSize: "0.58rem" }}>original</span>
                    <span className="kicker absolute right-3 top-3" style={{ color: "var(--accent)", fontSize: "0.58rem" }}>removed</span>
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
        </Reveal>

        {/* control */}
        <Reveal delay={0.1}>
          <p className="text-[14px] leading-relaxed" style={{ color: "var(--muted)" }}>
            Vrixo strips backgrounds with <span style={{ color: "var(--fg)" }}>RemBG / U²-Net</span> behind a job queue.
            Here the same class of model (<span style={{ color: "var(--fg)" }}>RMBG-1.4</span>) runs{" "}
            <span style={{ color: "var(--accent)" }}>entirely in your browser</span> via ONNX + WebAssembly.
          </p>
          {stage === "idle" && <button data-hover onClick={load} className="btn-lime mt-6 w-full justify-center">load vision model · ~44MB</button>}
          {stage === "loading" && (
            <div className="mt-6">
              <div className="mb-1 flex justify-between font-mono text-[11px]" style={{ color: "var(--muted)" }}><span>{progress.detail || "initializing…"}</span><span className="tnum">{progress.pct}%</span></div>
              <div className="h-1 overflow-hidden rounded-full" style={{ background: "var(--line)" }}><div className="h-full" style={{ width: `${progress.pct}%`, background: "var(--accent)" }} /></div>
            </div>
          )}
          {stage === "ready" && <p className="mt-6 font-mono text-[12px]" style={{ color: "var(--accent)" }}>✓ ready — drop an image.</p>}
          {stage === "error" && <p className="mt-6 font-mono text-[12px]" style={{ color: "var(--muted)" }}>This device can&apos;t run the model (needs WebAssembly).</p>}
          <div className="mt-7 pt-5" style={{ borderTop: "1px solid var(--line)" }}>
            <div className="kicker mb-3" style={{ fontSize: "0.6rem" }}>pipeline</div>
            <ol className="space-y-1.5 font-mono text-[11px]" style={{ color: "var(--faint)" }}>
              <li>01 · decode image → tensor</li>
              <li>02 · RMBG-1.4 forward pass (WASM)</li>
              <li>03 · alpha matte → RGBA composite</li>
              <li>04 · render to canvas</li>
            </ol>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
