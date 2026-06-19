import { WireframeCore } from "./WireframeCore";
import { Reticle } from "./Reticle";
import { FlowField } from "@/components/ai/FlowField";
import { Magnetic } from "@/components/fx/Magnetic";
import { Scramble } from "@/components/fx/Scramble";
import { PROFILE } from "@/data/content";

function Corner({ pos, children }: { pos: string; children: React.ReactNode }) {
  return <span className={`absolute ${pos} font-mono text-[10px] tracking-wide`} style={{ color: "var(--faint)" }}>{children}</span>;
}

export function MotionHero() {
  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden">
      {/* interactive field — swirl with the cursor, click to fire a shockwave */}
      <FlowField className="absolute inset-0 h-full w-full opacity-70" />
      <div className="pointer-events-none absolute inset-0 techgrid opacity-20" aria-hidden />
      <div className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(140% 90% at 50% 50%, transparent 35%, var(--bg) 92%)" }} aria-hidden />

      <div className="relative z-10 grid w-full items-center gap-12 px-6 lg:grid-cols-12" style={{ maxWidth: "var(--maxw)", marginInline: "auto" }}>
        {/* left: statement */}
        <div className="lg:col-span-6">
          <div className="kicker mb-6" style={{ color: "var(--accent)" }}>[ SYS.01 / EDGE INFERENCE ]</div>
          <h1 className="font-display" style={{ fontSize: "clamp(3rem, 8vw, 6.4rem)", color: "var(--fg)" }}>
            I build AI<br />that <span style={{ color: "var(--accent)" }}>ships.</span>
          </h1>
          <p className="mt-7 max-w-md text-[15px] leading-relaxed" style={{ color: "var(--muted)" }}>
            <span style={{ color: "var(--fg)" }}>{PROFILE.name}</span> — AI engineer. This page loads a real model into
            your browser and answers from my résumé, <span style={{ color: "var(--fg)" }}>on your device</span>.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Magnetic><a href="#ask" data-hover className="btn-lime">ask the model ↓</a></Magnetic>
            <Magnetic strength={0.25}><a href={`mailto:${PROFILE.email}`} data-hover className="btn-ghost">hire me</a></Magnetic>
          </div>
          {/* telemetry strip */}
          <div className="mt-10 grid max-w-md grid-cols-3 gap-px overflow-hidden border" style={{ borderColor: "var(--line-2)", background: "var(--line-2)" }}>
            {[["model", "MiniLM-L6"], ["inference", "100% local"], ["status", "online"]].map(([k, v]) => (
              <div key={k} className="px-3 py-2.5" style={{ background: "var(--bg)" }}>
                <div className="font-mono text-[9px] uppercase tracking-widest" style={{ color: "var(--faint)" }}>{k}</div>
                <div className="mt-0.5 font-mono text-[12px]" style={{ color: "var(--accent-2)" }}>{v}</div>
              </div>
            ))}
          </div>
        </div>

        {/* right: the geometric core */}
        <div className="lg:col-span-6">
          <div className="relative mx-auto aspect-square w-full max-w-[460px]">
            <div className="coreglow" aria-hidden />
            <WireframeCore className="absolute inset-0 h-full w-full" />
            <Reticle />
            <Corner pos="left-0 top-0">CORE.icosahedron</Corner>
            <Corner pos="right-0 top-0">v:12 · e:30</Corner>
            <Corner pos="left-0 bottom-0">proj: perspective</Corner>
            <Corner pos="right-0 bottom-0"><Scramble text="rot: auto" start="mount" speed={2} /></Corner>
          </div>
        </div>
      </div>

      <div className="absolute bottom-6 left-0 right-0 px-6">
        <div className="mx-auto flex items-center justify-between font-mono text-[10px]" style={{ maxWidth: "var(--maxw)", color: "var(--faint)" }}>
          <span><span style={{ color: "var(--accent)" }}>click anywhere</span> — fire a shockwave · drag to swirl the field</span>
          <span>scroll to run inference ↓</span>
        </div>
      </div>
    </section>
  );
}
