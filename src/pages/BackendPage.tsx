import { useEffect, useRef, useState } from "react";
import { Scene } from "@/components/dc/Scene";
import { Hud } from "@/components/dc/Hud";
import { TopNav } from "@/components/dc/TopNav";
import { Sections } from "@/components/dc/Sections";
import { C, F } from "@/components/dc/theme";

const rackParam = () => new URLSearchParams(window.location.search).get("rack");

export default function BackendPage() {
  const [selected, setSelected] = useState<string | null>(rackParam);
  const [hovered, setHovered] = useState<string | null>(null);
  const [ready, setReady] = useState(false);
  const [paused, setPaused] = useState(false);
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    document.title = "Vishvam Patel — Backend Engineer · datacenter";
    const t = setTimeout(() => setReady(true), 900);
    // honor a deep-link hash once content has rendered + after boot settles
    const scrollToHash = () => { if (window.location.hash) document.querySelector(window.location.hash)?.scrollIntoView(); };
    const r = requestAnimationFrame(scrollToHash);
    const t2 = setTimeout(scrollToHash, 980);
    // pause the WebGL frameloop once the hero scrolls off-screen
    const el = heroRef.current;
    let io: IntersectionObserver | undefined;
    if (el) {
      io = new IntersectionObserver(([e]) => setPaused(!e.isIntersecting), { threshold: 0.04 });
      io.observe(el);
    }
    return () => { clearTimeout(t); clearTimeout(t2); cancelAnimationFrame(r); io?.disconnect(); };
  }, []);

  const onSelect = (id: string) => {
    setSelected(id || null);
    const url = new URL(window.location.href);
    if (id) url.searchParams.set("rack", id); else url.searchParams.delete("rack");
    window.history.replaceState(null, "", url);
  };

  return (
    <main style={{ background: C.bg, color: C.fg, minHeight: "100svh" }}>
      <TopNav />

      <section ref={heroRef} id="work" style={{ position: "relative", height: "100svh", overflow: "hidden" }}>
        <Scene selected={selected} hovered={hovered} onHover={setHovered} onSelect={onSelect} paused={paused} />
        <Hud selected={selected} onSelect={onSelect} hovered={hovered} />

        {/* boot overlay */}
        <div style={{ position: "absolute", inset: 0, display: "grid", placeItems: "center", background: C.bg, transition: "opacity 0.7s ease", pointerEvents: ready ? "none" : "auto", opacity: ready ? 0 : 1, zIndex: 30 }}>
          <div style={{ fontFamily: F.mono, fontSize: 12, color: C.cyan, letterSpacing: "0.1em" }}>
            spinning up racks<span className="caret" />
          </div>
        </div>
      </section>

      <Sections />
    </main>
  );
}
