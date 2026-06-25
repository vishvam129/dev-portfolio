import type { CSSProperties, ReactNode } from "react";
import { C, F } from "./theme";

const fill: CSSProperties = { position: "absolute", inset: 0, display: "flex", flexDirection: "column", overflow: "hidden" };
const bricolage = "'Bricolage Grotesque', system-ui, sans-serif";
const fraunces = "'Fraunces', Georgia, serif";

/* ---- LendLocal: the LIVE deployed landing — dark, teal/cyan (lendlocal-eight.vercel.app) ---- */
function LendLocalMock() {
  const teal = "#2dd4bf", bg = "#0c0e13", card = "#15181e", text = "#f1f2f4", mute = "#8b929c", line = "rgba(255,255,255,0.07)";
  return (
    <div style={{ ...fill, background: bg, fontFamily: "'Hanken Grotesk',sans-serif", color: text }}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "55%", background: `radial-gradient(60% 80% at 50% -10%, ${teal}1f, transparent)`, pointerEvents: "none" }} />
      {/* header */}
      <div style={{ position: "relative", display: "flex", alignItems: "center", gap: 8, padding: "3% 5%", borderBottom: `1px solid ${line}` }}>
        <div style={{ width: 22, height: 22, borderRadius: 7, background: teal, color: "#06231f", display: "grid", placeItems: "center", fontFamily: bricolage, fontWeight: 800, fontSize: 10 }}>LL</div>
        <div style={{ fontFamily: bricolage, fontWeight: 700, fontSize: 12.5 }}>LendLocal</div>
        <div className="ll-nav" style={{ marginLeft: 14, display: "flex", gap: 12, fontSize: 9, color: mute }}>{["Browse", "Skills", "Community", "Pricing"].map((n) => <span key={n}>{n}</span>)}</div>
        <div style={{ marginLeft: "auto", fontSize: 9, fontWeight: 700, color: "#06231f", background: teal, borderRadius: 8, padding: "5px 11px" }}>Sign up</div>
      </div>
      {/* hero */}
      <div style={{ position: "relative", flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "0 8%" }}>
        <div style={{ fontFamily: bricolage, fontWeight: 800, fontSize: 22, lineHeight: 1.08, letterSpacing: "-0.02em" }}>
          Share Tools &amp; Skills<br /><span style={{ background: `linear-gradient(90deg,${teal},#5eead4)`, WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>With Your Neighbors</span>
        </div>
        <div style={{ fontSize: 9.5, color: mute, marginTop: 10, maxWidth: "78%", lineHeight: 1.5 }}>Borrow a drill, lend a ladder, teach a skill — LendLocal connects you with neighbors to share resources and save money.</div>
        <div style={{ marginTop: 14, fontSize: 9.5, fontWeight: 700, color: "#06231f", background: teal, borderRadius: 99, padding: "8px 16px", boxShadow: `0 8px 22px ${teal}44` }}>Browse Items Now →</div>
        <div style={{ display: "flex", gap: 14, marginTop: 16, fontSize: 8.5, color: mute }}>
          {["Verified members", "Hyperlocal", "Sustainable"].map((b) => <span key={b}><span style={{ color: teal }}>✓ </span>{b}</span>)}
        </div>
      </div>
      {/* stat strip */}
      <div style={{ position: "relative", display: "flex", justifyContent: "space-around", padding: "3.5% 5%", borderTop: `1px solid ${line}`, background: card }}>
        {[["$0", "to start"], ["15 min", "avg setup"], ["$3K+", "saved / yr"]].map(([v, k]) => (
          <div key={k} style={{ textAlign: "center" }}><div style={{ fontFamily: bricolage, fontWeight: 800, fontSize: 13, color: teal }}>{v}</div><div style={{ fontSize: 7.5, color: mute }}>{k}</div></div>
        ))}
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
