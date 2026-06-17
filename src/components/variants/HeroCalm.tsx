import { PROFILE } from "@/data/content";

export function HeroCalm() {
  return (
    <section className="relative flex min-h-[100svh] flex-col justify-center">
      <div className="w-full px-6" style={{ maxWidth: "var(--maxw)", marginInline: "auto" }}>
        <div className="flex items-center justify-between pb-16">
          <span className="kicker" style={{ color: "var(--faint)" }}>{PROFILE.name}</span>
          <span className="kicker" style={{ color: "var(--faint)" }}>AI Engineer · est. 2026</span>
        </div>

        <p className="mb-8 max-w-xl font-mono text-[13px] leading-relaxed" style={{ color: "var(--accent)" }}>
          A portfolio that runs a language model in your browser.
        </p>
        <h1 className="font-display" style={{ fontSize: "clamp(2.8rem, 7vw, 6rem)", color: "var(--fg)", maxWidth: "16ch" }}>
          Engineering intelligence, <span style={{ fontStyle: "italic", color: "var(--accent)" }}>quietly</span> and end&#8209;to&#8209;end.
        </h1>

        <div className="mt-14 grid max-w-3xl gap-8 border-t pt-8 sm:grid-cols-[1fr_auto] sm:items-end" style={{ borderColor: "var(--line-2)" }}>
          <p className="max-w-md text-[16px] leading-relaxed" style={{ color: "var(--muted)" }}>
            I&apos;m {PROFILE.name} — I build AI-powered products and ship them, from Python backends
            to the browser. Ask the model below; it answers from my résumé, on your device.
          </p>
          <div className="flex items-center gap-6 font-mono text-[14px]">
            <a href="#ask" data-hover className="ulink" style={{ color: "var(--accent)" }}>ask the model ↓</a>
            <a href={`mailto:${PROFILE.email}`} data-hover className="ulink" style={{ color: "var(--fg)" }}>get in touch</a>
          </div>
        </div>
      </div>
    </section>
  );
}
