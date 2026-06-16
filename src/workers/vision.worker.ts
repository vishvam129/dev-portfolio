/// <reference lib="webworker" />
// On-device background removal (RMBG-1.4 via Transformers.js). Demonstrates the
// kind of pretrained vision-model integration used in Vrixo — running fully
// client-side, no upload to any server.

import { pipeline, env, RawImage } from "@huggingface/transformers";

env.allowLocalModels = false;
env.useBrowserCache = true;

const ctx = self as unknown as DedicatedWorkerGlobalScope;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let remover: any = null;

function post(m: unknown, transfer?: Transferable[]) {
  if (transfer) ctx.postMessage(m, transfer);
  else ctx.postMessage(m);
}

async function init() {
  post({ type: "progress", detail: "Loading RMBG-1.4 segmentation model…", pct: 8 });
  remover = await pipeline("background-removal", "briaai/RMBG-1.4", {
    progress_callback: (p: { status: string; progress?: number; file?: string }) => {
      if (p.status === "progress" && typeof p.progress === "number") {
        post({ type: "progress", detail: `Downloading ${p.file ?? "weights"}`, pct: 10 + Math.round(p.progress * 0.85) });
      }
    },
  });
  post({ type: "ready" });
}

async function process(url: string, id: number) {
  if (!remover) return;
  post({ type: "progress", detail: "Computing alpha matte…", pct: 100 });
  const result = await remover(url);
  const img: RawImage = Array.isArray(result) ? result[0] : result;
  const rgba = img.channels === 4 ? img : await img.rgba();
  const data = new Uint8ClampedArray(rgba.data);
  const imageData = new ImageData(data, rgba.width, rgba.height);
  const canvas = new OffscreenCanvas(rgba.width, rgba.height);
  const c2d = canvas.getContext("2d")!;
  c2d.putImageData(imageData, 0, 0);
  const blob = await canvas.convertToBlob({ type: "image/png" });
  post({ type: "result", id, blob, width: rgba.width, height: rgba.height });
}

ctx.onmessage = async (e: MessageEvent) => {
  const m = e.data;
  try {
    if (m.type === "init") await init();
    else if (m.type === "process") await process(m.url, m.id);
  } catch (err) {
    post({ type: "error", message: err instanceof Error ? err.message : String(err) });
  }
};
