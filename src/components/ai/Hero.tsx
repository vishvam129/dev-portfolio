"use client";

import { DiffusionName } from "./DiffusionName";
import { GenHUD } from "./GenHUD";
import { StreamText } from "@/components/primitives/StreamText";
import { Magnetic } from "@/components/primitives/Magnetic";
import { TAGLINES, RESUME_PDF } from "@/data/content";

const META = [
  { k: "base", v: "Vishvam Patel" },
  { k: "params", v: "22 yrs" },
  { k: "context", v: "AI · full-stack" },
  { k: "status", v: "available" },
];

export function Hero() {
  return (
    <section className="relative flex min-h-[100svh] flex-col overflow-hidden">
      {/* the model denoises its own name into existence */}
      <div className="absolute inset-0">
        <DiffusionName text="VISHVAM-1" className="h-full w-full" />
      </div>
      {/* readability vignette toward the bottom */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: "linear-gradient(to bottom, color-mix(in srgb, var(--bg) 35%, transparent) 0%, transparent 28%, transparent 60%, var(--bg) 100%)" }}
      />

      {/* top HUD */}
      <div className="relative mx-auto flex w-full max-w-6xl items-start justify-between px-5 pt-24">
        <GenHUD />
        <span className="mono-label hidden sm:block" style={{ color: "var(--faint)" }}>model card / v1.0</span>
      </div>

      {/* bottom content layer */}
      <div className="relative mt-auto mx-auto w-full max-w-6xl px-5 pb-14">
        <p className="max-w-2xl font-display text-2xl font-semibold tracking-tight sm:text-4xl" style={{ color: "var(--fg)" }}>
          <StreamText text={TAGLINES.ai} speed={20} />
        </p>

        <dl className="mt-8 grid max-w-2xl grid-cols-2 gap-x-8 gap-y-3 sm:grid-cols-4">
          {META.map((m) => (
            <div key={m.k} className="border-t pt-2" style={{ borderColor: "var(--line)" }}>
              <dt className="mono-label">{m.k}</dt>
              <dd className="font-mono text-[13px]" style={{ color: "var(--fg)" }}>{m.v}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-9 flex flex-wrap items-center gap-4">
          <Magnetic>
            <a href="#work" className="inline-block rounded-full px-6 py-2.5 font-mono text-[13px]" style={{ background: "var(--accent)", color: "var(--bg)" }}>
              run inference ↓
            </a>
          </Magnetic>
          <Magnetic strength={0.25}>
            <a href={RESUME_PDF.ai} className="inline-block rounded-full border px-6 py-2.5 font-mono text-[13px]" style={{ borderColor: "var(--line)", color: "var(--fg)" }}>
              weights.pdf ↓
            </a>
          </Magnetic>
        </div>
      </div>
    </section>
  );
}
