import { Fragment } from "react";
import { Reveal } from "@/components/fx/Reveal";
import { spotMove } from "@/components/fx/Spotlight";

const NODES = [
  { t: "Your prompt", s: "text in" },
  { t: "Web Worker", s: "off main-thread" },
  { t: "MiniLM-L6", s: "384-dim vector" },
  { t: "Cosine search", s: "over résumé KB" },
  { t: "Grounded answer", s: "streamed + cited" },
];

function Flow() {
  return (
    <div className="relative h-6 w-px shrink-0 self-center overflow-hidden lg:h-px lg:w-auto lg:flex-1" style={{ background: "var(--line-2)" }} aria-hidden>
      <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, transparent, var(--accent), transparent)", backgroundSize: "100% 200%", animation: "ticker 2.8s linear infinite" }} />
      <div className="absolute inset-0 hidden lg:block" style={{ background: "linear-gradient(90deg, transparent, var(--accent), transparent)", backgroundSize: "200% 100%", animation: "ticker 2.8s linear infinite" }} />
    </div>
  );
}

/** Animated request-trace: how the on-device RAG actually flows. */
export function Pipeline() {
  return (
    <section className="wrap py-24">
      <div className="mb-10">
        <div className="rule-faint" />
        <div className="flex items-center justify-between pt-3">
          <span className="glyph">// HOW IT RUNS</span>
          <span className="kicker hidden sm:inline" style={{ color: "var(--faint)", fontSize: "0.58rem" }}>0 network calls · ~0ms to a server</span>
        </div>
      </div>

      <Reveal>
        <div className="flex flex-col gap-0 lg:flex-row lg:items-center">
          {NODES.map((n, i) => (
            <Fragment key={n.t}>
              <div onMouseMove={spotMove} data-hover className="spot crop w-full rounded-[4px] border p-4 lg:flex-1" style={{ borderColor: "var(--line-2)", background: "var(--surface)" }}>
                <div className="font-mono text-[10px]" style={{ color: "var(--accent-2)" }}>{String(i + 1).padStart(2, "0")}</div>
                <div className="mt-1.5 font-display" style={{ fontSize: "1.1rem", color: "var(--fg)" }}>{n.t}</div>
                <div className="mt-0.5 font-mono text-[10.5px]" style={{ color: "var(--muted)" }}>{n.s}</div>
              </div>
              {i < NODES.length - 1 && <Flow />}
            </Fragment>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
