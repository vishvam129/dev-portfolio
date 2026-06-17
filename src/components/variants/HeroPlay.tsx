import { PROFILE } from "@/data/content";

const BLOBS = [
  { c: "#ff5d73", s: 120, x: "8%", y: "20%", d: "0s" },
  { c: "#4d7cff", s: 80, x: "82%", y: "16%", d: "0.6s" },
  { c: "#ffb22e", s: 64, x: "70%", y: "62%", d: "1.1s" },
  { c: "#2bb673", s: 96, x: "18%", y: "70%", d: "0.3s" },
];

export function HeroPlay() {
  return (
    <section className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden">
      {/* floating shapes */}
      {BLOBS.map((b, i) => (
        <div key={i} className="pointer-events-none absolute rounded-full" aria-hidden
          style={{ width: b.s, height: b.s, left: b.x, top: b.y, background: b.c, opacity: 0.85, filter: "blur(2px)", animation: `float-y 5s ease-in-out infinite`, animationDelay: b.d }} />
      ))}
      <div className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(60% 50% at 50% 50%, color-mix(in srgb, var(--bg) 30%, transparent), var(--bg) 80%)" }} />

      <div className="relative z-10 w-full px-6 text-center" style={{ maxWidth: "var(--maxw)", marginInline: "auto" }}>
        <span className="chip mb-7" style={{ background: "var(--surface)", borderColor: "var(--line)" }}>
          <span className="live-dot" /> hi! the model below runs in your browser
        </span>
        <h1 className="font-display mx-auto" style={{ fontSize: "clamp(3rem, 11vw, 8.5rem)", color: "var(--fg)", maxWidth: "14ch" }}>
          I build <span style={{ color: "#ff5d73" }}>AI</span> that{" "}
          <span style={{ color: "#4d7cff" }}>actually</span>{" "}
          <span style={{ color: "#2bb673" }}>ships</span>
          <span style={{ color: "#ffb22e" }}>.</span>
        </h1>
        <p className="mx-auto mt-7 max-w-md text-[16px] leading-relaxed" style={{ color: "var(--muted)" }}>
          I&apos;m {PROFILE.name} — ask the model anything about my work. It answers from my résumé,
          right here on your device. Promise it&apos;s real. ✦
        </p>
        <div className="mt-9 flex items-center justify-center gap-3">
          <a href="#ask" data-hover className="rounded-full px-6 py-3 font-mono text-[14px] font-semibold transition-transform hover:-translate-y-0.5" style={{ background: "var(--accent)", color: "var(--accent-ink)" }}>ask the model ↓</a>
          <a href={`mailto:${PROFILE.email}`} data-hover className="rounded-full px-6 py-3 font-mono text-[14px] transition-transform hover:-translate-y-0.5" style={{ background: "var(--surface)", border: "1px solid var(--line)", color: "var(--fg)" }}>say hi 👋</a>
        </div>
      </div>
    </section>
  );
}
