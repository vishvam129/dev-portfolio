import { useEffect } from "react";
import { Link } from "react-router-dom";
import { VARIANTS } from "@/data/variants";

export default function Chooser() {
  useEffect(() => { document.title = "Vishvam Patel — pick a vibe"; }, []);
  return (
    <main data-variant="motion" className="min-h-screen" style={{ background: "var(--bg)" }}>
      <div className="wrap py-16 sm:py-24">
        <div className="kicker mb-5" style={{ color: "var(--accent)" }}>vishvam patel · ai engineer</div>
        <h1 className="font-display" style={{ fontSize: "clamp(2.4rem,6vw,4.5rem)", color: "var(--fg)", maxWidth: "18ch" }}>
          Same portfolio. <span style={{ color: "var(--accent)" }}>Four</span> ways to feel it.
        </h1>
        <p className="mt-5 max-w-lg text-[15px] leading-relaxed" style={{ color: "var(--muted)" }}>
          Each runs the same on-device AI — different art direction. Open them, feel them,
          tell me which one gives you the kick. I&apos;ll perfect that one.
        </p>

        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          {VARIANTS.map((v, i) => (
            <Link key={v.id} to={`/v/${v.id}`} data-hover
              className="group relative overflow-hidden rounded-2xl border p-7 transition-transform duration-300 hover:-translate-y-1"
              style={{ background: v.bg, borderColor: "color-mix(in srgb, " + v.fg + " 14%, transparent)", minHeight: 220 }}>
              <div className="flex items-center justify-between">
                <span className="font-mono text-[11px] tracking-[0.2em] uppercase" style={{ color: v.accent }}>0{i + 1}</span>
                <span className="font-mono text-[11px]" style={{ color: "color-mix(in srgb, " + v.fg + " 55%, transparent)" }}>{v.tag}</span>
              </div>
              <div className="mt-12">
                <div className="text-4xl font-extrabold tracking-tight" style={{ color: v.fg, fontFamily: v.id === "calm" ? "Fraunces, serif" : v.id === "loud" ? "Anton, sans-serif" : v.id === "play" ? "Fredoka, sans-serif" : "Bricolage Grotesque, sans-serif" }}>
                  {v.name}
                </div>
                <p className="mt-2 text-[14px] leading-snug" style={{ color: "color-mix(in srgb, " + v.fg + " 68%, transparent)" }}>{v.desc}</p>
                <span className="mt-4 inline-flex items-center gap-2 font-mono text-[12px]" style={{ color: v.accent }}>
                  open <span className="transition-transform group-hover:translate-x-1">→</span>
                </span>
              </div>
              <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full opacity-90" style={{ background: v.accent }} />
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
