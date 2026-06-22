import { useEffect, useRef, useState } from "react";
import { Scene } from "@/components/dc/Scene";
import { Hud } from "@/components/dc/Hud";
import { TopNav } from "@/components/dc/TopNav";
import { Sections } from "@/components/dc/Sections";
import { CommandPalette } from "@/components/dc/CommandPalette";
import { Terminal } from "@/components/dc/Terminal";
import { C, F } from "@/components/dc/theme";

const rackParam = () => new URLSearchParams(window.location.search).get("rack");

export default function BackendPage() {
  const [selected, setSelected] = useState<string | null>(rackParam); // drives the rack glow ring only
  const [hovered, setHovered] = useState<string | null>(null);
  const [ready, setReady] = useState(false);
  const [paused, setPaused] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  const railRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.title = "Vishvam Patel — Backend Engineer · datacenter";
    const t = setTimeout(() => setReady(true), 900);
    const scrollToHash = () => { if (window.location.hash) document.querySelector(window.location.hash)?.scrollIntoView(); };
    const r = requestAnimationFrame(scrollToHash);
    const t2 = setTimeout(scrollToHash, 980);

    const el = heroRef.current;
    let io: IntersectionObserver | undefined;
    if (el) {
      io = new IntersectionObserver(([e]) => setPaused(!e.isIntersecting), { threshold: 0.04 });
      io.observe(el);
    }
    // "inspect rack ↑" in a project card → highlight that rack in the scene
    const onRack = (e: Event) => setSelected((e as CustomEvent<string>).detail);
    window.addEventListener("dc:rack", onRack);
    // backplane scroll-progress rail
    const onScroll = () => {
      const h = document.documentElement;
      const p = h.scrollTop / Math.max(1, h.scrollHeight - h.clientHeight);
      if (railRef.current) railRef.current.style.transform = `scaleY(${Math.min(1, p)})`;
    };
    window.addEventListener("scroll", onScroll, { passive: true }); onScroll();
    return () => { clearTimeout(t); clearTimeout(t2); cancelAnimationFrame(r); io?.disconnect(); window.removeEventListener("dc:rack", onRack); window.removeEventListener("scroll", onScroll); };
  }, []);

  // clicking a rack scrolls down to its project card (the info now lives below)
  const openCard = (id: string) => {
    if (!id) return;
    document.getElementById(`card-${id}`)?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <main style={{ background: C.bg, color: C.fg, minHeight: "100svh" }}>
      {/* backplane scroll-progress rail */}
      <div style={{ position: "fixed", left: 0, top: 0, bottom: 0, width: 2, background: "rgba(120,160,180,0.10)", zIndex: 45, pointerEvents: "none" }}>
        <div ref={railRef} style={{ width: "100%", height: "100%", transformOrigin: "top", transform: "scaleY(0)", background: `linear-gradient(${C.cyan}, ${C.green})`, boxShadow: `0 0 8px ${C.cyan}` }} />
      </div>
      <TopNav />

      <section ref={heroRef} id="work" style={{ position: "relative", height: "100svh", overflow: "hidden" }}>
        <Scene selected={selected} hovered={hovered} onHover={setHovered} onSelect={openCard} paused={paused} />
        <Hud />

        {/* boot overlay */}
        <div style={{ position: "absolute", inset: 0, display: "grid", placeItems: "center", background: C.bg, transition: "opacity 0.7s ease", pointerEvents: ready ? "none" : "auto", opacity: ready ? 0 : 1, zIndex: 30 }}>
          <div style={{ fontFamily: F.mono, fontSize: 12, color: C.cyan, letterSpacing: "0.1em" }}>
            spinning up racks<span className="caret" />
          </div>
        </div>
      </section>

      <Sections />
      <CommandPalette />
      <Terminal />
    </main>
  );
}
