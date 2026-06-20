import { useEffect, useRef, useState } from "react";
import { ENDPOINTS, type Endpoint } from "@/data/backend";
import { Panel } from "./Panel";

const STAGE_MS: Record<string, [number, number]> = {
  gateway: [2, 8], auth: [5, 16], validate: [1, 5], handler: [4, 22], db: [8, 42],
};
const rint = ([a, b]: [number, number]) => Math.round(a + Math.random() * (b - a));

function highlight(obj: unknown) {
  const json = JSON.stringify(obj, null, 2)
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  return json.replace(/("(?:\\.|[^"\\])*"(\s*:)?|\b(?:true|false|null)\b|-?\d+(?:\.\d+)?)/g, (m) => {
    let c = "var(--accent-2)";
    if (/^"/.test(m)) c = /:$/.test(m) ? "var(--info)" : "var(--ok)";
    else if (/true|false|null/.test(m)) c = "var(--warn)";
    return `<span style="color:${c}">${m}</span>`;
  });
}

export function ApiView() {
  const [ep, setEp] = useState<Endpoint>(ENDPOINTS[2]); // login (has a body + error paths)
  const [body, setBody] = useState(ENDPOINTS[2].body ?? "");
  const [stage, setStage] = useState(-1);
  const [done, setDone] = useState<number>(-1);
  const [resp, setResp] = useState<{ status: number; json: unknown; ms: number } | null>(null);
  const [busy, setBusy] = useState(false);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);
  function select(e: Endpoint) { setEp(e); setBody(e.body ?? ""); setResp(null); setStage(-1); setDone(-1); }

  function send() {
    if (busy) return;
    timers.current.forEach(clearTimeout); timers.current = [];
    setBusy(true); setResp(null); setStage(-1); setDone(-1);
    let acc = 0;
    ep.stages.forEach((st, i) => {
      const d = rint(STAGE_MS[st] ?? [4, 14]);
      timers.current.push(setTimeout(() => setStage(i), acc + 60));
      acc += d * 6 + 90;
      timers.current.push(setTimeout(() => setDone(i), acc));
    });
    const totalMs = ep.stages.reduce((s, st) => s + rint(STAGE_MS[st] ?? [4, 14]), 0);
    timers.current.push(setTimeout(() => {
      const r = ep.respond(body);
      setResp({ ...r, ms: totalMs }); setStage(-1); setBusy(false);
    }, acc + 120));
  }

  const statusColor = (s: number) => s < 300 ? "var(--ok)" : s < 500 ? "var(--warn)" : "var(--err)";

  return (
    <div className="grid h-full gap-3 overflow-y-auto p-4 lg:grid-cols-[210px_1fr] lg:grid-rows-1 lg:overflow-hidden">
      <Panel title="endpoints" dot="var(--accent)" meta={`${ENDPOINTS.length}`} bodyClass="overflow-y-auto" pad={false}>
        <div className="p-2">
          {ENDPOINTS.map((e) => (
            <button key={e.id} onClick={() => select(e)} className="flex w-full items-center gap-2 rounded px-2 py-2 text-left transition-colors"
              style={{ background: ep.id === e.id ? "var(--surface-2)" : "transparent" }}>
              <span className="font-mono text-[9px] font-semibold" style={{ color: e.method === "GET" ? "var(--ok)" : "var(--accent)", width: 30 }}>{e.method}</span>
              <span className="truncate font-mono text-[12px]" style={{ color: ep.id === e.id ? "var(--fg)" : "var(--muted)" }}>{e.path}</span>
            </button>
          ))}
        </div>
      </Panel>

      <Panel title="request" dot="var(--accent-2)" meta="real lifecycle · client-side" pad={false} bodyClass="overflow-y-auto">
        <div className="flex items-center gap-3 border-b px-4 py-3" style={{ borderColor: "var(--line)" }}>
          <span className="rounded px-1.5 py-0.5 font-mono text-[10px] font-semibold" style={{ background: ep.method === "GET" ? "color-mix(in srgb,var(--ok) 18%,transparent)" : "color-mix(in srgb,var(--accent) 18%,transparent)", color: ep.method === "GET" ? "var(--ok)" : "var(--accent)" }}>{ep.method}</span>
          <span className="font-mono text-[13px]" style={{ color: "var(--fg)" }}>{ep.path}</span>
          <button onClick={send} disabled={busy} className="ml-auto rounded px-3.5 py-1.5 font-mono text-[12px] disabled:opacity-50" style={{ background: "var(--accent)", color: "var(--accent-ink)" }}>{busy ? "···" : "Send"}</button>
        </div>
        <div className="px-4 pt-2 font-mono text-[11px]" style={{ color: "var(--muted)" }}>{ep.desc}</div>

        {ep.method === "POST" && (
          <div className="px-4 py-3">
            <div className="mb-1 font-mono text-[10px] uppercase tracking-widest" style={{ color: "var(--faint)" }}>request body</div>
            <textarea value={body} onChange={(e) => setBody(e.target.value)} spellCheck={false} rows={4}
              className="w-full resize-none rounded border bg-transparent p-2 font-mono text-[12px] outline-none" style={{ borderColor: "var(--line-2)", color: "var(--fg)" }} />
          </div>
        )}

        <div className="flex flex-wrap items-center gap-1.5 px-4 py-3">
          {ep.stages.map((st, i) => {
            const isDone = i <= done, isActive = i === stage;
            const col = isActive ? "var(--accent)" : isDone ? "var(--ok)" : "var(--faint)";
            return (
              <span key={st} className="flex items-center gap-1.5">
                <span className="rounded border px-2 py-1 font-mono text-[10.5px] transition-colors" style={{ borderColor: isActive || isDone ? col : "var(--line-2)", color: col, boxShadow: isActive ? "0 0 10px -2px var(--accent)" : "none" }}>{st}</span>
                {i < ep.stages.length - 1 && <span style={{ color: i < done ? "var(--ok)" : "var(--faint)" }}>→</span>}
              </span>
            );
          })}
        </div>

        <div className="border-t px-4 py-3" style={{ borderColor: "var(--line)" }}>
          {resp ? (
            <>
              <div className="mb-2 flex items-center gap-3">
                <span className="rounded px-1.5 py-0.5 font-mono text-[11px] tnum" style={{ background: `color-mix(in srgb, ${statusColor(resp.status)} 16%, transparent)`, color: statusColor(resp.status) }}>{resp.status}</span>
                <span className="font-mono text-[11px] tnum" style={{ color: "var(--muted)" }}>{resp.ms}ms</span>
                <span className="ml-auto font-mono text-[10px]" style={{ color: "var(--faint)" }}>application/json</span>
              </div>
              <pre className="overflow-x-auto rounded border p-3 font-mono text-[12px] leading-relaxed" style={{ borderColor: "var(--line)", background: "var(--bg-2)" }} dangerouslySetInnerHTML={{ __html: highlight(resp.json) }} />
            </>
          ) : (
            <div className="font-mono text-[12px]" style={{ color: "var(--faint)" }}>{busy ? "request in flight…" : "press Send — try a wrong password on /auth/login to see the 401."}</div>
          )}
        </div>
      </Panel>
    </div>
  );
}
