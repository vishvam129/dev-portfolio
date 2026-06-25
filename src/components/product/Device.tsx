import type { CSSProperties, ReactNode } from "react";
import { C, F } from "./theme";
import type { Preview } from "@/data/fullstack";

const fill: CSSProperties = { position: "absolute", inset: 0, display: "flex", flexDirection: "column", overflow: "hidden" };

/* ---- dark, premium in-app mocks ---- */
function MapMock({ accent }: { accent: string }) {
  const pins = [[24, 36], [56, 28], [42, 56], [70, 62], [33, 70]];
  return (
    <div style={{ ...fill, background: "#0e0f14", fontFamily: F.body }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "5% 6% 4%" }}>
        <div style={{ flex: 1, height: "9%", minHeight: 16, background: "#191b22", borderRadius: 99, display: "flex", alignItems: "center", padding: "0 12px", fontSize: 9, color: C.faint }}>Find near you</div>
        <div style={{ width: 16, height: 16, borderRadius: 99, background: accent }} />
      </div>
      <div style={{ flex: 1, position: "relative", margin: "0 6%", borderRadius: 10, background: "#14161d", backgroundImage: "linear-gradient(rgba(255,255,255,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.04) 1px,transparent 1px)", backgroundSize: "12% 12%" }}>
        {pins.map(([x, y], i) => (
          <div key={i} style={{ position: "absolute", left: `${x}%`, top: `${y}%`, width: 12, height: 12, borderRadius: "50% 50% 50% 0", transform: "rotate(-45deg)", background: i === 1 ? accent : "#1c1f28", border: `2px solid ${i === 1 ? accent : "#2c3040"}`, boxShadow: i === 1 ? `0 0 12px ${accent}` : "none" }} />
        ))}
      </div>
      <div style={{ margin: "5% 6% 6%", background: "#181a22", border: `1px solid ${C.line}`, borderRadius: 11, padding: "9px 11px", display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{ width: 30, height: 30, borderRadius: 8, background: `linear-gradient(135deg, ${accent}, ${accent}66)` }} />
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 10.5, fontWeight: 700, color: C.fg }}>Cordless drill</div>
          <div style={{ fontSize: 8.5, color: C.faint }}>0.4 mi · ★ 4.9</div>
        </div>
        <div style={{ fontSize: 9, fontWeight: 700, color: "#0a0a0f", background: accent, borderRadius: 99, padding: "6px 11px" }}>$9/day</div>
      </div>
    </div>
  );
}

function ChatMock({ accent }: { accent: string }) {
  const bubbles: [boolean, string][] = [[false, "miss you 🌙"], [true, "2 days left ♥"], [false, "watch-party tonight?"], [true, "yes! 9pm"]];
  return (
    <div style={{ ...fill, background: "#0e0f14", fontFamily: F.body }}>
      <div style={{ display: "flex", alignItems: "center", gap: 9, padding: "6% 6% 5%", borderBottom: `1px solid ${C.line}` }}>
        <div style={{ width: 26, height: 26, borderRadius: 99, background: `linear-gradient(135deg, ${accent}, ${accent}55)` }} />
        <div style={{ flex: 1, fontSize: 11, fontWeight: 700, color: C.fg }}>Aanya <span style={{ color: accent }}>♥</span></div>
        <div style={{ display: "flex", gap: 9, color: accent, fontSize: 12 }}><span>📞</span><span>📹</span></div>
      </div>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 8, padding: "6%", justifyContent: "flex-end" }}>
        {bubbles.map(([me, t], i) => (
          <div key={i} style={{ alignSelf: me ? "flex-end" : "flex-start", maxWidth: "78%", fontSize: 9.5, padding: "7px 11px", borderRadius: 13, color: me ? "#0a0a0f" : C.fg, background: me ? accent : "#1a1c24", borderBottomRightRadius: me ? 3 : 13, borderBottomLeftRadius: me ? 13 : 3 }}>{t}</div>
        ))}
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "4% 6% 6%" }}>
        <div style={{ flex: 1, height: 26, borderRadius: 99, background: "#191b22", display: "flex", alignItems: "center", padding: "0 12px", fontSize: 9, color: C.faint }}>Message…</div>
        <div style={{ width: 26, height: 26, borderRadius: 99, background: accent }} />
      </div>
    </div>
  );
}

function PhotoMock({ accent }: { accent: string }) {
  return (
    <div style={{ ...fill, background: "#0c0c12", fontFamily: F.body }}>
      <div style={{ display: "flex", alignItems: "center", gap: 9, padding: "5% 6% 4%" }}>
        <div style={{ flex: 1, fontSize: 12, fontWeight: 800, color: C.fg, fontFamily: F.display }}>Vrixo</div>
        <div style={{ fontSize: 9, fontWeight: 700, color: "#0a0a0f", background: accent, borderRadius: 99, padding: "6px 12px" }}>Enhance</div>
      </div>
      <div style={{ flex: 1, display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 6, padding: "0 6%" }}>
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} style={{ borderRadius: 7, background: `linear-gradient(${135 + i * 30}deg, ${accent}${i % 2 ? "aa" : "55"}, #16131f)`, position: "relative" }}>
            {i === 0 && <div style={{ position: "absolute", inset: 0, border: `2px solid ${accent}`, borderRadius: 7 }} />}
          </div>
        ))}
      </div>
      <div style={{ margin: "5% 6% 6%" }}>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 8.5, color: C.sub, marginBottom: 5 }}><span>processing · GPU</span><span>2 / 3</span></div>
        <div style={{ height: 4, borderRadius: 99, background: "#1c1c28", overflow: "hidden" }}><div style={{ width: "66%", height: "100%", background: accent }} /></div>
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
export function Browser({ url, children }: { url: string; children: ReactNode }) {
  return (
    <div style={{ borderRadius: 14, overflow: "hidden", background: "#0d0d14", border: `1px solid ${C.line2}`, boxShadow: "0 50px 100px -30px rgba(0,0,0,0.8)" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, height: 40, padding: "0 14px", background: "#15151e", borderBottom: `1px solid ${C.line}` }}>
        <span style={{ display: "flex", gap: 7 }}>{["#ff5f57", "#febc2e", "#28c840"].map((c) => <i key={c} style={{ width: 11, height: 11, borderRadius: 99, background: c, opacity: 0.9 }} />)}</span>
        <div style={{ flex: 1, maxWidth: 320, margin: "0 auto", height: 22, borderRadius: 99, background: "#0d0d14", border: `1px solid ${C.line}`, display: "flex", alignItems: "center", justifyContent: "center", gap: 6, fontFamily: F.mono, fontSize: 11, color: C.sub }}>
          <span style={{ color: C.faint }}>↪</span>{url}
        </div>
        <span style={{ width: 44 }} />
      </div>
      <div style={{ position: "relative", aspectRatio: "16 / 10" }}>{children}</div>
    </div>
  );
}

export function Phone({ children }: { children: ReactNode }) {
  return (
    <div style={{ width: "100%", maxWidth: 260, margin: "0 auto" }}>
      <div style={{ borderRadius: 38, padding: 9, background: "linear-gradient(160deg,#23232c,#101015)", boxShadow: "0 50px 90px -30px rgba(0,0,0,0.8)" }}>
        <div style={{ borderRadius: 30, overflow: "hidden", aspectRatio: "9 / 19", background: "#0c0c12", position: "relative" }}>
          <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: "36%", height: 18, background: "#0c0c12", borderRadius: "0 0 12px 12px", zIndex: 6 }} />
          {children}
        </div>
      </div>
    </div>
  );
}
