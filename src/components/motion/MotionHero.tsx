import { FlowField } from "@/components/ai/FlowField";
import { Magnetic } from "@/components/fx/Magnetic";
import { Scramble } from "@/components/fx/Scramble";
import { Hud } from "./Hud";
import { PROFILE } from "@/data/content";

export function MotionHero() {
  return (
    <section className="relative flex min-h-[100svh] flex-col overflow-hidden">
      <div className="absolute inset-0"><FlowField className="h-full w-full" /></div>
      <div className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(125% 85% at 50% -5%, transparent 28%, var(--bg) 92%)" }} />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3" style={{ background: "linear-gradient(to top, var(--bg) 6%, transparent)" }} />

      {/* top HUD row */}
      <div className="relative z-10 flex items-start justify-between gap-4 px-6 pt-7" style={{ maxWidth: "var(--maxw)", marginInline: "auto", width: "100%" }}>
        <Hud />
        <span className="kicker hidden text-right sm:inline" style={{ color: "var(--faint)", fontSize: "0.58rem" }}>FLOW FIELD<br />CURL NOISE · 2.4K AGENTS</span>
      </div>

      {/* statement */}
      <div className="relative z-10 mt-auto w-full" style={{ maxWidth: "var(--maxw)", marginInline: "auto" }}>
        <div className="px-6 pb-24">
          <div className="kicker mb-6 flex items-center gap-3" style={{ color: "var(--accent)" }}>
            <span className="live-dot" /> <Scramble text="EDGE INFERENCE · RAG + VISION · ON-DEVICE" start="mount" speed={2.4} />
          </div>
          <h1 className="font-display" style={{ fontSize: "clamp(3.2rem, 12vw, 10rem)", color: "var(--fg)" }}>
            I build AI<br />that <span style={{ color: "var(--accent)" }}>ships.</span>
          </h1>
          <div className="mt-9 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <p className="max-w-md text-[15px] leading-relaxed" style={{ color: "var(--muted)" }}>
              I&apos;m <span style={{ color: "var(--fg)" }}>{PROFILE.name}</span>. This page loads a real model into your
              browser and answers from my résumé — <span style={{ color: "var(--fg)" }}>on your device</span>.
            </p>
            <div className="flex items-center gap-4">
              <Magnetic><a href="#ask" data-hover className="btn-lime">ask the model ↓</a></Magnetic>
              <Magnetic strength={0.25}><a href={`mailto:${PROFILE.email}`} data-hover className="btn-ghost">hire me</a></Magnetic>
            </div>
          </div>
          <div className="mt-10 font-mono text-[10.5px]" style={{ color: "var(--faint)" }}>press <span style={{ color: "var(--accent)" }}>⌘K</span> for commands · scroll to run inference</div>
        </div>
      </div>
    </section>
  );
}
