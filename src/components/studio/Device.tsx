import type { CSSProperties } from "react";
import { C, F } from "./theme";
import type { Device as Dev, Preview } from "@/data/fullstack";

const fill: CSSProperties = { position: "absolute", inset: 0, display: "flex", flexDirection: "column", overflow: "hidden" };

/* ---- in-frame app mocks (evoke each product, not pixel-exact) ---- */
function MapMock({ accent }: { accent: string }) {
  const pins = [[26, 38], [58, 30], [44, 58], [72, 64], [34, 72]];
  return (
    <div style={{ ...fill, background: "#eef0ea", fontFamily: F.body }}>
      <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "7% 8% 5%" }}>
        <div style={{ flex: 1, height: "9%", minHeight: 14, background: "#fff", borderRadius: 99, boxShadow: `0 2px 8px ${C.shadowSoft}`, display: "flex", alignItems: "center", padding: "0 9px", fontSize: 8, color: C.faint }}>Find near you</div>
        <div style={{ width: 14, height: 14, borderRadius: 99, background: accent }} />
      </div>
      <div style={{ flex: 1, position: "relative", margin: "0 8%", borderRadius: 8, background: "#e3e6dd", backgroundImage: "linear-gradient(#0001 1px,transparent 1px),linear-gradient(90deg,#0001 1px,transparent 1px)", backgroundSize: "13% 13%" }}>
        {pins.map(([x, y], i) => (
          <div key={i} style={{ position: "absolute", left: `${x}%`, top: `${y}%`, width: 11, height: 11, borderRadius: "50% 50% 50% 0", transform: "rotate(-45deg)", background: i === 1 ? accent : "#fff", border: `2px solid ${i === 1 ? accent : "#c9cabf"}`, boxShadow: `0 2px 5px ${C.shadowSoft}` }} />
        ))}
      </div>
      <div style={{ margin: "6% 8% 8%", background: "#fff", borderRadius: 9, padding: "8px 10px", display: "flex", alignItems: "center", gap: 9, boxShadow: `0 4px 14px ${C.shadowSoft}` }}>
        <div style={{ width: 28, height: 28, borderRadius: 7, background: `linear-gradient(135deg, ${accent}, ${accent}88)` }} />
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 9.5, fontWeight: 700, color: C.ink }}>Cordless drill</div>
          <div style={{ fontSize: 8, color: C.faint }}>0.4 mi · ★ 4.9</div>
        </div>
        <div style={{ fontSize: 8.5, fontWeight: 700, color: C.accentInk, background: accent, borderRadius: 99, padding: "5px 10px" }}>$9/day</div>
      </div>
    </div>
  );
}

function ChatMock({ accent }: { accent: string }) {
  const bubbles: [boolean, string][] = [[false, "miss you 🌙"], [true, "2 days left ♥"], [false, "watch-party tonight?"], [true, "yes! 9pm"]];
  return (
    <div style={{ ...fill, background: "#fff", fontFamily: F.body }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "7% 7% 5%", borderBottom: `1px solid ${C.lineSoft}` }}>
        <div style={{ width: 24, height: 24, borderRadius: 99, background: `linear-gradient(135deg, ${accent}, ${accent}77)` }} />
        <div style={{ flex: 1, fontSize: 10, fontWeight: 700, color: C.ink }}>Aanya <span style={{ color: accent }}>♥</span></div>
        <div style={{ display: "flex", gap: 7, color: accent, fontSize: 11 }}><span>📞</span><span>📹</span></div>
      </div>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 7, padding: "7%", justifyContent: "flex-end" }}>
        {bubbles.map(([me, t], i) => (
          <div key={i} style={{ alignSelf: me ? "flex-end" : "flex-start", maxWidth: "78%", fontSize: 9, padding: "6px 10px", borderRadius: 12, color: me ? C.accentInk : C.ink, background: me ? accent : "#f0ede6", borderBottomRightRadius: me ? 3 : 12, borderBottomLeftRadius: me ? 12 : 3 }}>{t}</div>
        ))}
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 7, padding: "5% 7% 7%" }}>
        <div style={{ flex: 1, height: 24, borderRadius: 99, background: "#f0ede6", display: "flex", alignItems: "center", padding: "0 10px", fontSize: 8.5, color: C.faint }}>Message…</div>
        <div style={{ width: 24, height: 24, borderRadius: 99, background: accent }} />
      </div>
    </div>
  );
}

function PhotoMock({ accent }: { accent: string }) {
  return (
    <div style={{ ...fill, background: "#15121d", fontFamily: F.body }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "6% 7% 4%" }}>
        <div style={{ flex: 1, fontSize: 11, fontWeight: 800, color: "#fff", fontFamily: F.display }}>Vrixo</div>
        <div style={{ fontSize: 8.5, fontWeight: 700, color: "#fff", background: accent, borderRadius: 99, padding: "5px 11px" }}>Enhance</div>
      </div>
      <div style={{ flex: 1, display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 6, padding: "0 7%" }}>
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} style={{ borderRadius: 6, background: `linear-gradient(${135 + i * 30}deg, ${accent}${i % 2 ? "cc" : "88"}, #2a2340)`, position: "relative" }}>
            {i === 0 && <div style={{ position: "absolute", inset: 0, border: `2px solid ${accent}`, borderRadius: 6 }} />}
          </div>
        ))}
      </div>
      <div style={{ margin: "6% 7% 7%" }}>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 8, color: "#b9b2cc", marginBottom: 5 }}><span>processing · GPU</span><span>2 / 3</span></div>
        <div style={{ height: 4, borderRadius: 99, background: "#2a2340", overflow: "hidden" }}><div style={{ width: "66%", height: "100%", background: accent }} /></div>
      </div>
    </div>
  );
}

export function Mock({ preview, accent }: { preview: Preview; accent: string }) {
  if (preview === "map") return <MapMock accent={accent} />;
  if (preview === "chat") return <ChatMock accent={accent} />;
  return <PhotoMock accent={accent} />;
}

/* ---- frames ---- */
function Screen({ children }: { children: React.ReactNode }) {
  return <div style={{ position: "relative", width: "100%", height: "100%", overflow: "hidden" }}>{children}</div>;
}

function Laptop({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ width: "100%" }}>
      <div style={{ borderRadius: 16, padding: "11px 11px 13px", background: "linear-gradient(160deg,#2b2823,#141210)", boxShadow: `0 44px 90px -28px ${C.shadow}` }}>
        <div style={{ borderRadius: 8, overflow: "hidden", aspectRatio: "16 / 10", background: "#fff", position: "relative" }}>
          <Screen>{children}</Screen>
        </div>
      </div>
      <div style={{ width: "116%", marginLeft: "-8%", height: 13, background: "linear-gradient(#d9d3c5,#b3ad9e)", borderRadius: "0 0 16px 16px", boxShadow: `0 22px 34px -12px ${C.shadow}`, position: "relative" }}>
        <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: "16%", height: 5, background: "#9a9387", borderRadius: "0 0 7px 7px" }} />
      </div>
    </div>
  );
}

function Phone({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ width: "100%", maxWidth: 232, margin: "0 auto" }}>
      <div style={{ borderRadius: 36, padding: 9, background: "linear-gradient(160deg,#2b2823,#141210)", boxShadow: `0 44px 80px -26px ${C.shadow}` }}>
        <div style={{ borderRadius: 28, overflow: "hidden", aspectRatio: "9 / 19", background: "#fff", position: "relative" }}>
          <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: "38%", height: 17, background: "#141210", borderRadius: "0 0 12px 12px", zIndex: 6 }} />
          <Screen>{children}</Screen>
        </div>
      </div>
    </div>
  );
}

export function DeviceView({ device, preview, accent, liveUrl, live = false, title }:
  { device: Dev; preview: Preview; accent: string; liveUrl?: string; live?: boolean; title?: string }) {
  const inner = live && liveUrl
    ? <iframe src={liveUrl} title={title ?? "live preview"} loading="lazy" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: 0, background: "#fff" }} />
    : <Mock preview={preview} accent={accent} />;
  return device === "mobile" ? <Phone>{inner}</Phone> : <Laptop>{inner}</Laptop>;
}
