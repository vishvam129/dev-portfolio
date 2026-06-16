"use client";

import { LatentField } from "./LatentField";
import { StreamText } from "@/components/primitives/StreamText";
import { TAGLINES } from "@/data/content";

const META = [
  { k: "base", v: "Vishvam Patel" },
  { k: "role", v: "AI Developer" },
  { k: "context", v: "full-stack" },
  { k: "status", v: "available" },
];

export function Hero() {
  return (
    <section className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden px-5">
      <div className="pointer-events-none absolute inset-0">
        <LatentField className="h-full w-full opacity-70" />
      </div>
      {/* vignette */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 80% at 50% 40%, transparent 40%, var(--bg) 100%)",
        }}
      />

      <div className="relative mx-auto w-full max-w-6xl">
        <div className="mono-label mb-5 flex items-center gap-3">
          <span style={{ color: "var(--accent)" }}>◆</span> model&nbsp;card&nbsp;/&nbsp;v1.0
          <span className="h-px flex-1" style={{ background: "var(--line)" }} />
          <span>2026</span>
        </div>

        <h1
          className="font-display font-bold tracking-[-0.03em] leading-[0.92]"
          style={{ fontSize: "clamp(3rem, 11vw, 9rem)", color: "var(--fg)" }}
        >
          VISHVAM<span style={{ color: "var(--accent)" }}>-1</span>
        </h1>

        <p
          className="mt-6 max-w-2xl font-body text-lg sm:text-xl"
          style={{ color: "var(--muted)" }}
        >
          <StreamText text={TAGLINES.ai} speed={22} />
        </p>

        {/* model meta strip */}
        <dl className="mt-10 grid max-w-2xl grid-cols-2 gap-x-8 gap-y-3 sm:grid-cols-4">
          {META.map((m) => (
            <div key={m.k} className="border-t pt-2" style={{ borderColor: "var(--line)" }}>
              <dt className="mono-label">{m.k}</dt>
              <dd className="font-mono text-[13px]" style={{ color: "var(--fg)" }}>{m.v}</dd>
            </div>
          ))}
        </dl>

        <div className="mono-label mt-14 flex items-center gap-2 animate-pulse" style={{ color: "var(--faint)" }}>
          ↓ scroll to run inference
        </div>
      </div>
    </section>
  );
}
