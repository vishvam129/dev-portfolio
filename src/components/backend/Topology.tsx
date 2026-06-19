import { useState } from "react";
import { TOPO_NODES, TOPO_EDGES, type TNode } from "@/data/backend";

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

export function Topology() {
  const [sel, setSel] = useState<string>("auth");
  return (
    <section id="topology" className="mx-auto max-w-[1180px] scroll-mt-20 px-6 py-20">
      <div className="mb-8 flex items-end justify-between border-b pb-3" style={{ borderColor: "var(--line)" }}>
        <div>
          <div className="font-mono text-[11px] uppercase tracking-[0.22em]" style={{ color: "var(--accent)" }}>// system topology</div>
          <h2 className="mt-1.5 font-display text-2xl font-semibold sm:text-3xl" style={{ color: "var(--fg)" }}>RdFlex — request path</h2>
        </div>
        <span className="hidden font-mono text-[11px] sm:block" style={{ color: "var(--faint)" }}>click a node · packets = live traffic</span>
      </div>

      <div className="ticks rounded-[4px] border p-4" style={{ borderColor: "var(--line-2)", background: "var(--surface)" }}>
        <svg viewBox="0 0 905 285" className="w-full">
          {/* edges + packets */}
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
          {/* nodes */}
          {TOPO_NODES.map((n) => {
            const active = sel === n.id;
            return (
              <g key={n.id} onClick={() => setSel(n.id)} style={{ cursor: "pointer" }}>
                <rect x={n.x} y={n.y} width="110" height="34" rx="5" fill={active ? "var(--surface-2)" : "var(--bg-2)"} stroke={active ? KIND_COLOR[n.kind] : "var(--line-2)"} strokeWidth={active ? 1.5 : 1} />
                <circle cx={n.x + 12} cy={n.y + 17} r="3" fill={KIND_COLOR[n.kind]} />
                <text x={n.x + 22} y={n.y + 15} fill="var(--fg)" fontSize="11" fontFamily="var(--f-mono)">{n.label}</text>
                <text x={n.x + 22} y={n.y + 26} fill="var(--faint)" fontSize="8" fontFamily="var(--f-mono)">{n.sub}</text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* inspector */}
      <div className="mt-4 ticks rounded-[4px] border p-5" style={{ borderColor: "var(--line-2)", background: "var(--bg-2)" }}>
        <div className="flex items-center gap-2">
          <span className="sdot" style={{ background: KIND_COLOR[nodeById(sel).kind] }} />
          <span className="font-mono text-[13px]" style={{ color: "var(--fg)" }}>{nodeById(sel).label}</span>
          <span className="font-mono text-[11px]" style={{ color: "var(--faint)" }}>· {nodeById(sel).kind}</span>
        </div>
        <p className="mt-2 max-w-2xl text-[13.5px] leading-relaxed" style={{ color: "var(--muted)" }}>{NODE_DETAIL[sel]}</p>
      </div>
    </section>
  );
}
