"use client";

import { Reveal } from "@/components/primitives/Reveal";

/** Architecture diagram with packets flowing the wires + a span waterfall. */

const NODES = [
  { id: "client", x: 40, y: 70, label: "Client" },
  { id: "gateway", x: 200, y: 70, label: "Gateway API" },
  { id: "api", x: 370, y: 70, label: "FastAPI" },
  { id: "queue", x: 540, y: 30, label: "Celery / Redis" },
  { id: "db", x: 540, y: 120, label: "PostgreSQL" },
];

const EDGES: [string, string][] = [
  ["client", "gateway"],
  ["gateway", "api"],
  ["api", "queue"],
  ["api", "db"],
];

const SPANS = [
  { name: "GET /instances/:id", start: 0, dur: 18, depth: 0 },
  { name: "auth.verify_jwt", start: 2, dur: 4, depth: 1 },
  { name: "db.query(instance)", start: 7, dur: 9, depth: 1 },
  { name: "  └ pool.acquire", start: 7, dur: 2, depth: 2 },
  { name: "queue.enqueue(provision)", start: 16, dur: 3, depth: 1 },
  { name: "serialize → 200", start: 19, dur: 2, depth: 0 },
];
const TOTAL = 22;

function nodeById(id: string) {
  return NODES.find((n) => n.id === id)!;
}

export function TraceDiagram() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-24">
      <div className="mb-10 flex items-end justify-between border-b pb-4" style={{ borderColor: "var(--line)" }}>
        <div className="flex items-baseline gap-4">
          <span className="mono-label" style={{ color: "var(--accent)" }}>02 / trace</span>
          <h2 className="font-display text-2xl font-semibold sm:text-3xl" style={{ color: "var(--fg)" }}>Request lifecycle</h2>
        </div>
        <span className="mono-label hidden sm:block">one request, fully observed</span>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* topology */}
        <Reveal>
          <div className="rounded-xl border p-5" style={{ borderColor: "var(--line)", background: "var(--panel)" }}>
            <div className="mono-label mb-4">topology · live</div>
            <svg viewBox="0 0 640 170" className="w-full">
              {/* wires */}
              {EDGES.map(([a, b], i) => {
                const na = nodeById(a), nb = nodeById(b);
                const x1 = na.x + 110, y1 = na.y + 17, x2 = nb.x, y2 = nb.y + 17;
                const d = `M${x1},${y1} C${(x1 + x2) / 2},${y1} ${(x1 + x2) / 2},${y2} ${x2},${y2}`;
                return (
                  <g key={i}>
                    <path d={d} fill="none" stroke="var(--line)" strokeWidth="1.5" />
                    <path
                      d={d}
                      fill="none"
                      stroke="var(--accent)"
                      strokeWidth="1.5"
                      strokeDasharray="6 240"
                      style={{ animation: `flow 3s linear infinite`, animationDelay: `${i * 0.4}s` }}
                    />
                  </g>
                );
              })}
              {/* nodes */}
              {NODES.map((n) => (
                <g key={n.id}>
                  <rect x={n.x} y={n.y} width="110" height="34" rx="7" fill="var(--bg-soft)" stroke="var(--line)" />
                  <circle cx={n.x + 12} cy={n.y + 17} r="3" fill="var(--ok)" />
                  <text x={n.x + 24} y={n.y + 21} fill="var(--fg)" fontSize="11" fontFamily="var(--f-mono)">{n.label}</text>
                </g>
              ))}
            </svg>
          </div>
        </Reveal>

        {/* waterfall */}
        <Reveal delay={0.08}>
          <div className="rounded-xl border p-5" style={{ borderColor: "var(--line)", background: "var(--panel)" }}>
            <div className="mb-4 flex items-center justify-between">
              <span className="mono-label">distributed trace · 22ms</span>
              <span className="font-mono text-[11px]" style={{ color: "var(--ok)" }}>200 OK</span>
            </div>
            <div className="space-y-2">
              {SPANS.map((s, i) => (
                <div key={i} className="grid grid-cols-[1fr_120px] items-center gap-3">
                  <div className="relative h-4">
                    <div
                      className="absolute h-4 rounded-sm"
                      style={{
                        left: `${(s.start / TOTAL) * 100}%`,
                        width: `${(s.dur / TOTAL) * 100}%`,
                        background: s.depth === 0 ? "var(--accent)" : `color-mix(in srgb, var(--accent) ${70 - s.depth * 18}%, var(--panel))`,
                        transformOrigin: "left",
                        animation: `dash 0.6s ease-out both`,
                        animationDelay: `${i * 0.08}s`,
                      }}
                    />
                  </div>
                  <div className="truncate font-mono text-[10.5px]" style={{ color: s.depth === 0 ? "var(--fg)" : "var(--muted)", paddingLeft: s.depth * 8 }}>
                    {s.name}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 flex gap-4 border-t pt-3 font-mono text-[10.5px]" style={{ borderColor: "var(--line)", color: "var(--faint)" }}>
              <span>spans: 6</span><span>errors: 0</span><span>p99: 18ms</span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
