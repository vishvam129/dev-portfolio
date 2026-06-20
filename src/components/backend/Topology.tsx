import { useState } from "react";
import { TOPO_NODES, TOPO_EDGES, type TNode } from "@/data/backend";
import { Panel } from "./Panel";

const KIND_COLOR: Record<string, string> = { edge: "var(--info)", svc: "var(--accent)", store: "var(--accent-2)", queue: "var(--warn)" };
const NODE_DETAIL: Record<string, string> = {
  client: "Browser client. Speaks HTTPS to the Gateway; carries the JWT in a cross-subdomain cookie.",
  gateway: "Kubernetes Gateway API. Regex origin allowlist (CORS), TLS, and route fan-out to services. Kind locally, DigitalOcean DOKS in prod.",
  auth: "FastAPI auth service. JWT/OAuth issue + refresh, session, and instance-lifecycle endpoints (create/wake/deploy/stop).",
  engine: "Python AI orchestrator the auth layer feeds. Draft-instance provisioning so code previews in seconds.",
  validator: "Schema/contract validation (Pydantic) before anything touches the store. Rejects bad input early.",
  pg: "PostgreSQL — the instance-lifecycle data model. Schemas + queries optimized for production read paths.",
  redis: "Redis — cache + Celery broker for async, GPU-bound work.",
};

function nodeById(id: string) { return TOPO_NODES.find((n) => n.id === id)!; }
function edgePath(a: TNode, b: TNode) {
  const x1 = a.x + 110, y1 = a.y + 17, x2 = b.x, y2 = b.y + 17;
  return `M${x1},${y1} C${(x1 + x2) / 2},${y1} ${(x1 + x2) / 2},${y2} ${x2},${y2}`;
}

export function TopologyView() {
  const [sel, setSel] = useState<string>("auth");
  const n = nodeById(sel);
  return (
    <div className="flex h-full flex-col gap-3 overflow-y-auto p-4">
      <Panel title="system topology · rdflex" dot="var(--accent)" meta="click a node · packets = live traffic" className="flex-1" bodyClass="grid place-items-center">
        <svg viewBox="0 0 905 285" className="w-full" style={{ maxHeight: "100%" }}>
          {TOPO_EDGES.map((e, i) => {
            const a = nodeById(e.from), b = nodeById(e.to);
            const d = edgePath(a, b);
            return (
              <g key={i}>
                <path d={d} fill="none" stroke="var(--line-2)" strokeWidth="1.25" />
                {e.label && <text x={(a.x + 110 + b.x) / 2} y={(a.y + b.y) / 2 + 12} fill="var(--faint)" fontSize="9" fontFamily="var(--f-mono)" textAnchor="middle">{e.label}</text>}
                <circle r="3" fill="var(--accent)">
                  <animateMotion dur={`${2 + (i % 3) * 0.5}s`} repeatCount="indefinite" path={d} begin={`${i * 0.3}s`} />
                </circle>
              </g>
            );
          })}
          {TOPO_NODES.map((nd) => {
            const active = sel === nd.id;
            return (
              <g key={nd.id} onClick={() => setSel(nd.id)} style={{ cursor: "pointer" }}>
                <rect x={nd.x} y={nd.y} width="110" height="34" rx="5" fill={active ? "var(--surface-2)" : "var(--bg-2)"} stroke={active ? KIND_COLOR[nd.kind] : "var(--line-2)"} strokeWidth={active ? 1.5 : 1} />
                <circle cx={nd.x + 12} cy={nd.y + 17} r="3" fill={KIND_COLOR[nd.kind]} />
                <text x={nd.x + 22} y={nd.y + 15} fill="var(--fg)" fontSize="11" fontFamily="var(--f-mono)">{nd.label}</text>
                <text x={nd.x + 22} y={nd.y + 26} fill="var(--faint)" fontSize="8" fontFamily="var(--f-mono)">{nd.sub}</text>
              </g>
            );
          })}
        </svg>
      </Panel>

      <Panel title="inspector" dot={KIND_COLOR[n.kind]} meta={n.kind}>
        <div className="flex items-center gap-2">
          <span className="font-mono text-[13px]" style={{ color: "var(--fg)" }}>{n.label}</span>
          <span className="font-mono text-[11px]" style={{ color: "var(--faint)" }}>· {n.sub}</span>
        </div>
        <p className="mt-2 max-w-2xl text-[13.5px] leading-relaxed" style={{ color: "var(--muted)" }}>{NODE_DETAIL[sel]}</p>
      </Panel>
    </div>
  );
}
