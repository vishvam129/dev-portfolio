import { Assistant } from "./Assistant";
import { PROFILE } from "@/data/content";

const INDEX = [
  { n: "01", label: "On-device assistant", note: "RAG · live", href: "#top" },
  { n: "02", label: "Vision sandbox", note: "RMBG-1.4", href: "#sandbox" },
  { n: "03", label: "Checkpoints", note: "4 projects", href: "#work" },
  { n: "04", label: "Stack", note: "spec", href: "#stack" },
  { n: "05", label: "Contact", note: "open", href: "#contact" },
];

export function Hero() {
  return (
    <section id="top" className="mx-auto max-w-[1240px] px-6">
      {/* issue line */}
      <div className="flex items-center justify-between py-5">
        <span className="mono-label" style={{ color: "var(--faint)" }}>Portfolio · No. 01</span>
        <span className="mono-label" style={{ color: "var(--faint)" }}>Edge Inference</span>
      </div>
      <div className="rule" />

      {/* masthead headline — typography as architecture */}
      <div className="grid gap-x-10 gap-y-8 py-10 lg:grid-cols-12 lg:py-14">
        <div className="lg:col-span-7">
          <div className="mono-label mb-6" style={{ color: "var(--accent)" }}>◆ &nbsp;the portfolio runs the model</div>
          <h1 className="font-display leading-[0.94] tracking-[-0.01em]" style={{ fontSize: "clamp(3rem, 7.5vw, 6.6rem)", color: "var(--fg)" }}>
            An AI portfolio<br />
            that <em className="serif-italic" style={{ color: "var(--accent)" }}>thinks</em> for<br />
            itself.
          </h1>
          <p className="mt-8 max-w-md text-[15px] leading-relaxed" style={{ color: "var(--muted)" }}>
            I&apos;m <span style={{ color: "var(--fg)" }}>{PROFILE.name}</span>, an AI engineer. This page loads a real
            language model into your browser, embeds my résumé, and answers your questions by
            semantic retrieval — generated <span style={{ color: "var(--fg)" }}>on your device</span>. No server. No API keys.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-6 font-mono text-[13px]">
            <a href="#sandbox" className="ulink" style={{ color: "var(--accent)" }}>run the vision model ↓</a>
            <a href={`mailto:${PROFILE.email}`} className="ulink" style={{ color: "var(--fg)" }}>hire me →</a>
          </div>
        </div>

        {/* the live assistant, presented as a figure */}
        <div className="lg:col-span-5">
          <div className="mb-2 flex items-center justify-between">
            <span className="mono-label" style={{ color: "var(--faint)" }}>Fig. 01 — on-device RAG</span>
            <span className="mono-label" style={{ color: "var(--accent)" }}>live</span>
          </div>
          <Assistant />
        </div>
      </div>

      <div className="rule-2" />

      {/* contents / index */}
      <div className="grid gap-x-10 py-6 lg:grid-cols-12">
        <span className="mono-label lg:col-span-3" style={{ color: "var(--faint)" }}>Contents</span>
        <div className="lg:col-span-9">
          {INDEX.map((it) => (
            <a key={it.n} href={it.href} className="idx-row" style={{ color: "var(--fg)" }}>
              <span className="font-mono text-[12px]" style={{ color: "var(--accent)" }}>{it.n}</span>
              <span className="font-display text-lg">{it.label}</span>
              <span className="font-mono text-[11px]" style={{ color: "var(--faint)" }}>{it.note}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
