"use client";

import { ShaderHero } from "./ShaderHero";
import { Magnetic } from "@/components/primitives/Magnetic";
import { TAGLINES, RESUME_PDF, PROFILE } from "@/data/content";

export function Hero() {
  return (
    <section className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden">
      <div className="absolute inset-0">
        <ShaderHero className="h-full w-full" />
      </div>
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: "linear-gradient(to bottom, color-mix(in srgb, var(--bg) 30%, transparent), transparent 30%, var(--bg))" }}
      />

      <div className="relative mx-auto w-full max-w-6xl px-5 pb-16">
        <div className="mono-label mb-6 flex items-center gap-3" style={{ color: "var(--signal)" }}>
          <span style={{ color: "var(--accent)" }}>●</span> the product / full-stack
          <span className="h-px w-16" style={{ background: "var(--line)" }} /> v2026
        </div>

        <h1
          className="font-display font-bold leading-[0.86] tracking-[-0.02em]"
          style={{ fontSize: "clamp(3rem, 13vw, 11rem)", color: "var(--fg)" }}
        >
          Vishvam<br />
          <span style={{ color: "var(--accent)" }}>Patel</span>
        </h1>

        <p className="mt-7 max-w-xl font-body text-lg sm:text-xl" style={{ color: "var(--muted)" }}>
          {TAGLINES.fullstack}
        </p>

        <div className="mt-9 flex flex-wrap items-center gap-4">
          <Magnetic>
            <a
              href="#work"
              className="inline-block rounded-full px-7 py-3 font-body text-[15px] font-medium"
              style={{ background: "var(--accent)", color: "var(--bg)" }}
            >
              See the work
            </a>
          </Magnetic>
          <Magnetic strength={0.25}>
            <a
              href={RESUME_PDF.fullstack}
              className="inline-block rounded-full border px-7 py-3 font-body text-[15px]"
              style={{ borderColor: "var(--line)", color: "var(--fg)" }}
            >
              Résumé ↓
            </a>
          </Magnetic>
          <span className="font-mono text-[12px]" style={{ color: "var(--faint)" }}>{PROFILE.location}</span>
        </div>
      </div>
    </section>
  );
}
