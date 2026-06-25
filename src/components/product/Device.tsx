import type { CSSProperties, ReactNode } from "react";
import { C, F } from "./theme";

const fill: CSSProperties = { position: "absolute", inset: 0, display: "flex", flexDirection: "column", overflow: "hidden" };
const bricolage = "'Bricolage Grotesque', system-ui, sans-serif";
const fraunces = "'Fraunces', Georgia, serif";

/* ---- LendLocal: the live Browse view — the real marketplace product ---- */
function LendLocalMock() {
  const teal = "#2dd4bf", green = "#34d399", bg = "#0f1115", card = "#181a1f", chip = "#23262d", text = "#f1f2f4", mute = "#9ca3af", line = "#2a2d35";
  const cats: [string, string, boolean][] = [["", "All", true], ["⚡", "Power Tools", false], ["🔨", "Hand Tools", false], ["🚗", "Automotive", false], ["🌿", "Garden", false], ["💻", "Tech", false]];
  return (
    <div style={{ ...fill, background: bg, fontFamily: "'Hanken Grotesk',sans-serif", color: text }}>
      {/* top nav */}
      <div style={{ display: "flex", alignItems: "center", gap: 7, padding: "2.6% 4%", borderBottom: `1px solid ${line}` }}>
        <div style={{ width: 18, height: 18, borderRadius: 6, background: teal, color: "#06231f", display: "grid", placeItems: "center", fontFamily: bricolage, fontWeight: 800, fontSize: 8 }}>LL</div>
        <div style={{ fontFamily: bricolage, fontWeight: 700, fontSize: 11 }}>LendLocal</div>
        <div style={{ display: "flex", gap: 10, marginLeft: 14, fontSize: 8, color: mute }}>
          {["Browse", "Search", "Skills", "Wanted", "Community"].map((n, i) => <span key={n} style={{ color: i === 0 ? text : mute, fontWeight: i === 0 ? 600 : 400 }}>{n}</span>)}
        </div>
        <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 8, color: mute, fontSize: 9 }}>🌐 ☾</div>
        <div style={{ fontSize: 8, fontWeight: 700, color: "#06231f", background: teal, borderRadius: 7, padding: "4px 9px" }}>Sign up</div>
      </div>
      {/* browse body */}
      <div style={{ flex: 1, padding: "3.4% 4% 0", overflow: "hidden" }}>
        <div style={{ display: "flex", alignItems: "flex-end", gap: 8 }}>
          <div>
            <div style={{ fontFamily: bricolage, fontWeight: 800, fontSize: 15, letterSpacing: "-0.02em", lineHeight: 1 }}>Browse Items</div>
            <div style={{ fontSize: 7.5, color: mute, marginTop: 3 }}>1 item available</div>
          </div>
          <div style={{ marginLeft: "auto", display: "flex", gap: 6 }}>
            <span style={{ fontSize: 7.5, color: text, border: `1px solid ${line}`, borderRadius: 7, padding: "4px 8px" }}>🗺 Map</span>
            <span style={{ fontSize: 7.5, fontWeight: 700, color: "#06231f", background: teal, borderRadius: 7, padding: "4px 8px" }}>+ List Item</span>
          </div>
        </div>
        {/* search */}
        <div style={{ height: 24, marginTop: 9, borderRadius: 8, background: card, border: `1px solid ${line}`, display: "flex", alignItems: "center", gap: 6, padding: "0 10px", fontSize: 8.5, color: mute }}>
          <span style={{ color: mute }}>🔍</span>Search for tools, equipment, skills…
        </div>
        {/* category pills */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginTop: 9 }}>
          {cats.map(([e, n, on]) => (
            <span key={n} style={{ display: "inline-flex", alignItems: "center", gap: 3, fontSize: 7.5, fontWeight: on ? 700 : 500, color: on ? "#06231f" : text, background: on ? teal : chip, border: `1px solid ${on ? teal : line}`, borderRadius: 99, padding: "3px 8px" }}>{e && <span>{e}</span>}{n}</span>
          ))}
        </div>
        {/* condition filter */}
        <div style={{ display: "flex", alignItems: "center", gap: 5, marginTop: 7, fontSize: 7 }}>
          <span style={{ color: mute, fontWeight: 700, letterSpacing: "0.04em" }}>CONDITION</span>
          {[["All", true], ["New", false], ["Good", false], ["Fair", false]].map(([t, on]) => (
            <span key={t as string} style={{ fontSize: 7, fontWeight: on ? 700 : 500, color: on ? "#06231f" : text, background: on ? teal : chip, borderRadius: 99, padding: "2.5px 7px" }}>{t as string}</span>
          ))}
        </div>
        {/* item grid */}
        <div style={{ marginTop: 10, display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 8 }}>
          <div style={{ borderRadius: 9, background: card, border: `1px solid ${line}`, overflow: "hidden" }}>
            <div style={{ position: "relative", aspectRatio: "4 / 3", background: "linear-gradient(150deg,#23262d,#15181d)", display: "grid", placeItems: "center" }}>
              <span style={{ fontSize: 20, color: "#fbbf24" }}>⚡</span>
              <span style={{ position: "absolute", top: 5, left: 5, fontSize: 6.5, fontWeight: 600, background: "rgba(0,0,0,0.55)", borderRadius: 5, padding: "2px 6px" }}>⚡ Power Tools</span>
              <span style={{ position: "absolute", bottom: 5, right: 5, fontSize: 7, fontWeight: 800, color: "#06231f", background: green, borderRadius: 5, padding: "2px 7px" }}>Free</span>
            </div>
            <div style={{ padding: "6px 7px 8px" }}>
              <span style={{ fontSize: 6.5, fontWeight: 700, color: green, border: `1px solid ${green}55`, borderRadius: 5, padding: "1.5px 5px" }}>Good</span>
              <div style={{ fontFamily: bricolage, fontWeight: 700, fontSize: 9.5, marginTop: 5 }}>Cordless Power Drill</div>
              <div style={{ fontSize: 7, color: mute, marginTop: 3 }}>Alice Lender · 0.4 mi away</div>
            </div>
          </div>
          {/* ghost cards hint a fuller catalog */}
          {[0, 1].map((k) => (
            <div key={k} style={{ borderRadius: 9, background: card, border: `1px dashed ${line}`, opacity: 0.5, display: "flex", flexDirection: "column" }}>
              <div style={{ aspectRatio: "4 / 3", background: "linear-gradient(150deg,#1c1f25,#15181d)" }} />
              <div style={{ padding: "6px 7px 8px" }}><div style={{ height: 6, width: "70%", borderRadius: 3, background: chip }} /><div style={{ height: 5, width: "45%", borderRadius: 3, background: chip, marginTop: 5 }} /></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---- Near: dark "dusk" chat, rose→peach gradient (React PWA) ---- */
function NearMock() {
  const bg = "#16121d", panel = "#221b2c", text = "#f6ece8", mute = "#b3a6b3", grad = "linear-gradient(120deg,#ff7da6,#ffb27a)", line = "rgba(255,232,224,0.1)";
  const bubbles: [boolean, string][] = [[false, "miss you 🌙"], [true, "2 days left ♥"], [false, "watch-party tonight?"], [true, "yes! 9pm"]];
  return (
    <div style={{ ...fill, background: bg, fontFamily: "'Hanken Grotesk',sans-serif", color: text }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "6% 6% 5%", borderBottom: `1px solid ${line}` }}>
        <div style={{ width: 26, height: 26, borderRadius: 99, background: grad }} />
        <div>
          <div style={{ fontFamily: fraunces, fontWeight: 600, fontSize: 13, lineHeight: 1 }}>Aanya</div>
          <div style={{ fontSize: 8.5, color: "#9be8b0" }}>● online</div>
        </div>
        <div style={{ marginLeft: "auto", display: "flex", gap: 8, fontSize: 13, color: "#ff7da6" }}><span>📞</span><span>📹</span></div>
      </div>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 7, padding: "6%", justifyContent: "flex-end" }}>
        {bubbles.map(([me, t], i) => (
          <div key={i} style={{ alignSelf: me ? "flex-end" : "flex-start", maxWidth: "78%", fontSize: 10, padding: "8px 11px", color: me ? "#3a1020" : text, background: me ? grad : panel, border: me ? "none" : `1px solid ${line}`, borderRadius: 14, borderBottomRightRadius: me ? 5 : 14, borderBottomLeftRadius: me ? 14 : 5, fontWeight: me ? 600 : 400 }}>{t}</div>
        ))}
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "4% 6% 3%" }}>
        <div style={{ flex: 1, height: 28, borderRadius: 99, background: panel, border: `1px solid ${line}`, display: "flex", alignItems: "center", padding: "0 12px", fontSize: 10, color: mute }}>Message…</div>
        <div style={{ width: 28, height: 28, borderRadius: 99, background: grad, display: "grid", placeItems: "center", fontSize: 11 }}>✉️</div>
      </div>
      <div style={{ display: "flex", justifyContent: "space-around", padding: "8px 0 11px", borderTop: `1px solid ${line}`, fontSize: 14 }}>
        {["🏠", "💬", "🍿", "🎮", "✨"].map((e, i) => <span key={i} style={{ opacity: i === 1 ? 1 : 0.45, filter: i === 1 ? `drop-shadow(0 0 6px #ff7da6)` : "none" }}>{e}</span>)}
      </div>
    </div>
  );
}

/* ---- Vrixo: dark AI photo enhance, before/after (blue accent) ---- */
function VrixoMock() {
  const bg = "#0e1016", text = "#eef1f6", mute = "#8b93a5", blue = "#3b8cff", line = "rgba(255,255,255,0.08)";
  return (
    <div style={{ ...fill, background: bg, fontFamily: "'Hanken Grotesk',sans-serif", color: text }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "4% 5%", borderBottom: `1px solid ${line}` }}>
        <div style={{ fontFamily: bricolage, fontWeight: 800, fontSize: 13 }}>✨ Vrixo</div>
        <div style={{ fontSize: 9, color: mute }}>AI photo magic</div>
        <div style={{ marginLeft: "auto", display: "flex", gap: 5 }}>
          {[["Upscale", true], ["Remove bg", false], ["Restore", false]].map(([t, on], i) => (
            <span key={i} style={{ fontSize: 8, fontWeight: 600, borderRadius: 99, padding: "4px 9px", color: on ? "#04101f" : mute, background: on ? blue : "transparent", border: `1px solid ${on ? blue : line}` }}>{t as string}</span>
          ))}
        </div>
      </div>
      <div style={{ flex: 1, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, padding: "4% 5%" }}>
        {[["Before", "linear-gradient(135deg,#3a3f4d,#23262e)", false], ["After", "linear-gradient(135deg,#7db4ff,#2b3a55)", true]].map(([label, g, on], i) => (
          <div key={i} style={{ position: "relative", borderRadius: 9, background: g as string, border: on ? `1.5px solid ${blue}` : `1px solid ${line}`, overflow: "hidden" }}>
            <div style={{ position: "absolute", top: 6, left: 6, fontSize: 8, fontWeight: 700, color: "#fff", background: "rgba(0,0,0,0.4)", borderRadius: 6, padding: "2px 7px" }}>{label}</div>
            {on && <div style={{ position: "absolute", bottom: 6, right: 6, width: 16, height: 16, borderRadius: 99, background: blue, color: "#04101f", display: "grid", placeItems: "center", fontSize: 9, fontWeight: 800 }}>✓</div>}
          </div>
        ))}
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 9, padding: "3% 5% 5%" }}>
        <div style={{ fontSize: 9, fontWeight: 700, color: "#04101f", background: blue, borderRadius: 8, padding: "7px 13px" }}>✨ Enhance</div>
        <div style={{ fontSize: 8.5, color: mute }}><span style={{ color: "#4ee0a0" }}>✓ done</span> · 3/5 today</div>
      </div>
    </div>
  );
}

export function Mock({ id }: { id: string }) {
  if (id === "lendlocal") return <LendLocalMock />;
  if (id === "near") return <NearMock />;
  return <VrixoMock />;
}

/* ---- frames ---- */
export function Browser({ url, children }: { url: string; children: ReactNode }) {
  return (
    <div style={{ borderRadius: 14, overflow: "hidden", background: "#0d0d14", border: `1px solid ${C.line2}`, boxShadow: "0 50px 100px -30px rgba(0,0,0,0.8)" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, height: 40, padding: "0 14px", background: "#15151e", borderBottom: `1px solid ${C.line}` }}>
        <span style={{ display: "flex", gap: 7 }}>{["#ff5f57", "#febc2e", "#28c840"].map((c) => <i key={c} style={{ width: 11, height: 11, borderRadius: 99, background: c, opacity: 0.9 }} />)}</span>
        <div style={{ flex: 1, maxWidth: 320, margin: "0 auto", height: 22, borderRadius: 99, background: "#0d0d14", border: `1px solid ${C.line}`, display: "flex", alignItems: "center", justifyContent: "center", gap: 6, fontFamily: F.mono, fontSize: 11, color: C.sub }}>
          <span style={{ color: C.faint }}>🔒</span>{url}
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
