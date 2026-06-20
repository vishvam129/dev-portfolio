import { useEffect, useState } from "react";
import { Scene } from "@/components/dc/Scene";
import { Hud } from "@/components/dc/Hud";

const rackParam = () => new URLSearchParams(window.location.search).get("rack");

export default function BackendPage() {
  const [selected, setSelected] = useState<string | null>(rackParam);
  const [hovered, setHovered] = useState<string | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    document.title = "Vishvam Patel — Backend Engineer · datacenter";
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const t = setTimeout(() => setReady(true), 900);
    return () => { document.body.style.overflow = prev; clearTimeout(t); };
  }, []);

  const onSelect = (id: string) => {
    setSelected(id || null);
    const url = new URL(window.location.href);
    if (id) url.searchParams.set("rack", id); else url.searchParams.delete("rack");
    window.history.replaceState(null, "", url);
  };

  return (
    <main style={{ position: "fixed", inset: 0, background: "#05080c", overflow: "hidden" }}>
      <Scene selected={selected} hovered={hovered} onHover={setHovered} onSelect={onSelect} />
      <Hud selected={selected} onSelect={onSelect} hovered={hovered} />

      {/* boot overlay */}
      <div
        style={{
          position: "absolute", inset: 0, display: "grid", placeItems: "center",
          background: "#05080c", transition: "opacity 0.7s ease", pointerEvents: ready ? "none" : "auto",
          opacity: ready ? 0 : 1, zIndex: 50,
        }}
      >
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: "#39d0d8", letterSpacing: "0.1em" }}>
          spinning up racks<span className="caret" />
        </div>
      </div>
    </main>
  );
}
