import { FlowField } from "@/components/ai/FlowField";
import { Magnetic } from "@/components/fx/Magnetic";
import { PROFILE } from "@/data/content";

export function HeroMotion() {
  return (
    <section className="relative flex min-h-[100svh] flex-col overflow-hidden">
      <div className="absolute inset-0"><FlowField className="h-full w-full" /></div>
      <div className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(120% 80% at 50% 0%, transparent 30%, var(--bg) 95%)" }} />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3" style={{ background: "linear-gradient(to top, var(--bg) 8%, transparent)" }} />

      <div className="relative z-10 hidden justify-between px-6 pt-8 md:flex" style={{ maxWidth: "var(--maxw)", marginInline: "auto", width: "100%" }}>
        <span className="kicker" style={{ color: "var(--faint)", fontSize: "0.6rem" }}>FLOW FIELD · CURL NOISE</span>
        <span className="kicker tnum" style={{ color: "var(--faint)", fontSize: "0.6rem" }}>23.22°N 72.68°E · IST</span>
      </div>

      <div className="relative z-10 mt-auto w-full" style={{ maxWidth: "var(--maxw)", marginInline: "auto" }}>
        <div className="px-6 pb-24">
          <div className="kicker mb-6 flex items-center gap-3" style={{ color: "var(--accent)" }}>
            <span className="live-dot" /> edge inference · rag + vision · on-device
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
        </div>
      </div>
    </section>
  );
}
