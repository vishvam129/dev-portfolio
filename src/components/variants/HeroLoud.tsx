import { PROFILE } from "@/data/content";

const MARQUEE = ["AI ENGINEER", "RAG + VISION ON-DEVICE", "PYTHON · FASTAPI · PYTORCH", "SHIPS PRODUCTION SOLO", "OPEN TO REMOTE ROLES", "GRADUATING 2026"];

export function HeroLoud() {
  return (
    <section className="relative flex min-h-[100svh] flex-col">
      {/* top marquee */}
      <div className="overflow-hidden border-y" style={{ borderColor: "var(--line-2)", background: "var(--accent)" }}>
        <div className="ticker-track py-2">
          {[0, 1].map((d) => (
            <span key={d} className="flex shrink-0">
              {MARQUEE.map((m, i) => (
                <span key={i} className="flex items-center font-mono text-[12px] font-medium" style={{ color: "var(--accent-ink)" }}>
                  <span className="px-4">{m}</span><span>✦</span>
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>

      <div className="flex flex-1 flex-col justify-center px-6 py-10" style={{ maxWidth: "var(--maxw)", marginInline: "auto", width: "100%" }}>
        <span className="kicker mb-4" style={{ color: "var(--accent)" }}>● {PROFILE.name} — Ahmedabad/Gandhinagar</span>
        <h1 className="font-display uppercase" style={{ fontSize: "clamp(3.6rem, 17vw, 14rem)", color: "var(--fg)" }}>
          AI that<br /><span style={{ color: "var(--accent)" }}>ships.</span>
        </h1>
        <div className="mt-8 grid gap-6 border-t pt-6 md:grid-cols-[1fr_auto] md:items-center" style={{ borderColor: "var(--line-2)" }}>
          <p className="max-w-lg text-[16px] leading-snug" style={{ color: "var(--muted)" }}>
            A portfolio that runs a real language model in your browser. No demos, no fluff —
            ask it anything and it answers from my résumé, on your device.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <a href="#ask" data-hover className="px-6 py-3 font-mono text-[14px] font-semibold" style={{ background: "var(--accent)", color: "var(--accent-ink)" }}>ASK THE MODEL ↓</a>
            <a href={`mailto:${PROFILE.email}`} data-hover className="px-6 py-3 font-mono text-[14px] font-semibold" style={{ border: "2px solid var(--line-2)", color: "var(--fg)" }}>HIRE ME →</a>
          </div>
        </div>
      </div>
    </section>
  );
}
