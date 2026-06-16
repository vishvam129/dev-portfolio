import { Assistant } from "./Assistant";
import { PROFILE } from "@/data/content";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-60" aria-hidden />
      <div className="relative mx-auto grid max-w-6xl gap-10 px-5 pt-16 pb-20 lg:grid-cols-[1fr_1.05fr] lg:pt-24">
        {/* left: pitch */}
        <div className="flex flex-col justify-center">
          <div className="mono-label mb-5 flex items-center gap-2" style={{ color: "var(--accent)" }}>
            <span>◆</span> edge inference · paradigm III
          </div>
          <h1 className="font-display leading-[1.0] tracking-[-0.005em]" style={{ fontSize: "clamp(2.9rem, 6.4vw, 5.4rem)", color: "var(--fg)" }}>
            An AI portfolio,<br />
            <em className="serif-italic" style={{ color: "var(--accent)" }}>powered by&nbsp;AI.</em>
          </h1>
          <p className="mt-6 max-w-md text-lg leading-relaxed" style={{ color: "var(--muted)" }}>
            I&apos;m <span style={{ color: "var(--fg)" }}>{PROFILE.name}</span> — an AI engineer. This page runs a real
            language model <span style={{ color: "var(--fg)" }}>in your browser</span>: ask it anything and it
            retrieves the answer from my résumé and generates it on your device. No server, no API keys.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a href="#sandbox" className="rounded-full px-5 py-2.5 font-mono text-[13px]" style={{ background: "var(--accent)", color: "var(--bg)" }}>
              try the vision sandbox ↓
            </a>
            <a href={`mailto:${PROFILE.email}`} className="rounded-full border px-5 py-2.5 font-mono text-[13px]" style={{ borderColor: "var(--line-2)", color: "var(--fg)" }}>
              hire me
            </a>
          </div>
          <dl className="mt-10 grid max-w-md grid-cols-3 gap-4">
            {[
              { k: "inference", v: "100% local" },
              { k: "model", v: "MiniLM-L6" },
              { k: "grad", v: PROFILE.graduating.split(" ")[1] },
            ].map((m) => (
              <div key={m.k} className="border-t pt-2" style={{ borderColor: "var(--line)" }}>
                <dt className="mono-label">{m.k}</dt>
                <dd className="font-mono text-[13px]" style={{ color: "var(--fg)" }}>{m.v}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* right: the live assistant */}
        <div className="flex items-center">
          <div className="w-full">
            <Assistant />
          </div>
        </div>
      </div>
    </section>
  );
}
