import { useEffect, useRef, useState } from "react";
import { TopNav } from "@/components/fstack/TopNav";
import { StackScene } from "@/components/fstack/StackScene";
import { Hud } from "@/components/fstack/Hud";
import { Sections } from "@/components/fstack/Sections";
import { C, F } from "@/components/fstack/theme";

export default function FullStackPage() {
  const [project, setProject] = useState<string | null>(null);
  const [layer, setLayer] = useState<string | null>(null);
  const [tracing, setTracing] = useState(false);
  const [ready, setReady] = useState(false);
  const [paused, setPaused] = useState(false);
  const runRef = useRef(0);
  const hoverRef = useRef<string | null>(null);
  const heroRef = useRef<HTMLElement>(null);
  const traceTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    document.title = "Vishvam Patel — Full-Stack Engineer · the stack";
    window.scrollTo(0, 0);
    const prevBg = document.body.style.background;
    document.body.style.background = C.bg;
    const t = setTimeout(() => setReady(true), 900);
    const el = heroRef.current;
    let io: IntersectionObserver | undefined;
    if (el) { io = new IntersectionObserver(([e]) => setPaused(!e.isIntersecting), { threshold: 0.04 }); io.observe(el); }
    return () => { document.body.style.background = prevBg; clearTimeout(t); clearTimeout(traceTimer.current); io?.disconnect(); };
  }, []);

  const onPick = (id: string) => {
    setProject(id);
    runRef.current += 1;
    setTracing(true);
    clearTimeout(traceTimer.current);
    traceTimer.current = setTimeout(() => setTracing(false), 2400);
  };

  return (
    <main style={{ background: C.bg, color: C.fg, fontFamily: F.body, minHeight: "100svh", overflowX: "hidden" }}>
      <TopNav />
      <section ref={heroRef} id="top" style={{ position: "relative", height: "100svh", overflow: "hidden" }}>
        <div className="fs-canvas-wrap">
          <StackScene project={project} selected={layer} runRef={runRef} hoverRef={hoverRef} onHover={(id) => (hoverRef.current = id)} onSelect={setLayer} paused={paused} />
        </div>
        <Hud project={project} tracing={tracing} onPick={onPick} layer={layer} onCloseLayer={() => setLayer(null)} />
        <div style={{ position: "absolute", inset: 0, display: "grid", placeItems: "center", background: C.bg, transition: "opacity .7s ease", pointerEvents: ready ? "none" : "auto", opacity: ready ? 0 : 1, zIndex: 30 }}>
          <div style={{ fontFamily: F.mono, fontSize: 12, color: C.accent, letterSpacing: "0.1em" }}>assembling the stack<span className="caret" /></div>
        </div>
      </section>
      <Sections />
    </main>
  );
}
