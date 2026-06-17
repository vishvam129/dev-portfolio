import { useEffect } from "react";
import { Boot } from "@/components/motion/Boot";
import { MotionHero } from "@/components/motion/MotionHero";
import { MotionSections } from "@/components/motion/MotionSections";
import { ScrollProgress } from "@/components/fx/ScrollProgress";
import { CommandPalette } from "@/components/fx/CommandPalette";
import { Marquee } from "@/components/motion/Marquee";
import { PROFILE } from "@/data/content";

function TopBar() {
  return (
    <header className="fixed inset-x-0 top-0 z-[150]" style={{ background: "color-mix(in srgb, var(--bg) 55%, transparent)", backdropFilter: "blur(10px)", borderBottom: "1px solid var(--line)" }}>
      <div className="wrap flex items-center gap-4 py-3">
        <span className="live-dot" />
        <span className="font-mono text-[12px] font-medium tracking-[0.18em]" style={{ color: "var(--fg)" }}>VISHVAM // NEURAL</span>
        <div className="ml-auto flex items-center gap-4 font-mono text-[12px]">
          <button data-hover onClick={() => window.dispatchEvent(new KeyboardEvent("keydown", { key: "k", metaKey: true }))} className="hidden items-center gap-1.5 sm:flex" style={{ color: "var(--muted)" }}>
            <kbd className="rounded border px-1.5 py-0.5 text-[10px]" style={{ borderColor: "var(--line-2)" }}>⌘K</kbd>
          </button>
          <a data-hover href={PROFILE.github} target="_blank" rel="noopener noreferrer" style={{ color: "var(--muted)" }}><span className="ulink">github</span></a>
          <a data-hover href={PROFILE.resume} style={{ color: "var(--accent)" }}><span className="ulink">résumé ↓</span></a>
        </div>
      </div>
    </header>
  );
}

export default function MotionPage() {
  useEffect(() => { document.title = "Vishvam Patel — AI Engineer · runs ML in your browser"; }, []);
  return (
    <main data-variant="motion" className="min-h-screen pb-10" style={{ background: "var(--bg)" }}>
      <Boot />
      <ScrollProgress />
      <CommandPalette />
      <TopBar />
      <MotionHero />
      <Marquee items={["PYTHON", "FASTAPI", "PYTORCH", "NEXT.JS", "KUBERNETES", "TRANSFORMERS.JS", "POSTGRESQL", "REACT"]} />
      <MotionSections />
    </main>
  );
}
