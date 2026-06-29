import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { C, F } from "./theme";

const fill: CSSProperties = { position: "absolute", inset: 0, display: "flex", flexDirection: "column", overflow: "hidden" };
const bricolage = "'Bricolage Grotesque', system-ui, sans-serif";
const fraunces = "'Fraunces', Georgia, serif";

/* =========================================================================
   LendLocal — a LIVE Browse view. Click categories / conditions and the
   real catalog filters in front of you. Not a screenshot.
   ========================================================================= */
type Item = { name: string; cat: string; emoji: string; ico: string; cond: "New" | "Good" | "Fair"; free: boolean; price?: string; owner: string; dist: string };
const LL_ITEMS: Item[] = [
  { name: "Cordless Power Drill", cat: "Power Tools", emoji: "⚡", ico: "#fbbf24", cond: "Good", free: true, owner: "Alice Lender", dist: "0.4 mi" },
  { name: "Hedge Trimmer", cat: "Garden", emoji: "🌿", ico: "#34d399", cond: "Good", free: true, owner: "Leo M.", dist: "0.6 mi" },
  { name: "Extension Ladder", cat: "Hand Tools", emoji: "🪜", ico: "#9ca3af", cond: "Good", free: false, price: "$4/day", owner: "Mark T.", dist: "0.8 mi" },
  { name: "Pressure Washer", cat: "Garden", emoji: "💦", ico: "#38bdf8", cond: "New", free: false, price: "$9/day", owner: "Dana K.", dist: "1.1 mi" },
  { name: "Hydraulic Car Jack", cat: "Automotive", emoji: "🚗", ico: "#f87171", cond: "Fair", free: true, owner: "Sam R.", dist: "1.5 mi" },
  { name: "DSLR Camera Kit", cat: "Tech", emoji: "📷", ico: "#a78bfa", cond: "Good", free: false, price: "$12/day", owner: "Priya N.", dist: "2.0 mi" },
];
const LL_CATS: [string, string][] = [["", "All"], ["⚡", "Power Tools"], ["🔨", "Hand Tools"], ["🚗", "Automotive"], ["🌿", "Garden"], ["💻", "Tech"]];
const LL_CONDS = ["All", "New", "Good", "Fair"];

function LendLocalMock() {
  const teal = "#2dd4bf", green = "#34d399", bg = "#0f1115", card = "#181a1f", chip = "#23262d", text = "#f1f2f4", mute = "#9ca3af", line = "#2a2d35";
  const [cat, setCat] = useState("All");
  const [cond, setCond] = useState("All");
  const shown = LL_ITEMS.filter((it) => (cat === "All" || it.cat === cat) && (cond === "All" || it.cond === cond));
  return (
    <div style={{ ...fill, background: bg, fontFamily: "'Hanken Grotesk',sans-serif", color: text }}>
      {/* top nav */}
      <div style={{ display: "flex", alignItems: "center", gap: 7, padding: "2.4% 4%", borderBottom: `1px solid ${line}`, flexShrink: 0 }}>
        <div style={{ width: 18, height: 18, borderRadius: 6, background: teal, color: "#06231f", display: "grid", placeItems: "center", fontFamily: bricolage, fontWeight: 800, fontSize: 8 }}>LL</div>
        <div style={{ fontFamily: bricolage, fontWeight: 700, fontSize: 11 }}>LendLocal</div>
        <div style={{ display: "flex", gap: 10, marginLeft: 14, fontSize: 8, color: mute }}>
          {["Browse", "Search", "Skills", "Wanted", "Community"].map((n, i) => <span key={n} style={{ color: i === 0 ? text : mute, fontWeight: i === 0 ? 600 : 400 }}>{n}</span>)}
        </div>
        <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 8, color: mute, fontSize: 9 }}>🌐 ☾</div>
        <div style={{ fontSize: 8, fontWeight: 700, color: "#06231f", background: teal, borderRadius: 7, padding: "4px 9px" }}>Sign up</div>
      </div>
      {/* browse body */}
      <div style={{ flex: 1, padding: "3% 4% 0", overflow: "hidden", display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", alignItems: "flex-end", gap: 8, flexShrink: 0 }}>
          <div>
            <div style={{ fontFamily: bricolage, fontWeight: 800, fontSize: 15, letterSpacing: "-0.02em", lineHeight: 1 }}>Browse Items</div>
            <div style={{ fontSize: 7.5, color: mute, marginTop: 3 }}><b style={{ color: teal }}>{shown.length}</b> {shown.length === 1 ? "item" : "items"} available{shown.length > 3 ? " · showing 3" : ""}</div>
          </div>
          <div style={{ marginLeft: "auto", display: "flex", gap: 6 }}>
            <span style={{ fontSize: 7.5, color: text, border: `1px solid ${line}`, borderRadius: 7, padding: "4px 8px" }}>🗺 Map</span>
            <span style={{ fontSize: 7.5, fontWeight: 700, color: "#06231f", background: teal, borderRadius: 7, padding: "4px 8px" }}>+ List Item</span>
          </div>
        </div>
        {/* search */}
        <div style={{ height: 24, marginTop: 8, borderRadius: 8, background: card, border: `1px solid ${line}`, display: "flex", alignItems: "center", gap: 6, padding: "0 10px", fontSize: 8.5, color: mute, flexShrink: 0 }}>
          <span style={{ color: mute }}>🔍</span>Search for tools, equipment, skills…
        </div>
        {/* category pills — interactive */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginTop: 8, flexShrink: 0 }}>
          {LL_CATS.map(([e, n]) => {
            const on = cat === n;
            return (
              <button key={n} onClick={() => setCat(n)} style={{ display: "inline-flex", alignItems: "center", gap: 3, fontSize: 7.5, fontWeight: on ? 700 : 500, color: on ? "#06231f" : text, background: on ? teal : chip, border: `1px solid ${on ? teal : line}`, borderRadius: 99, padding: "3px 8px", cursor: "pointer", font: "inherit", fontFamily: "inherit", transition: "all .15s" }}>{e && <span>{e}</span>}{n}</button>
            );
          })}
        </div>
        {/* condition filter — interactive */}
        <div style={{ display: "flex", alignItems: "center", gap: 5, marginTop: 7, fontSize: 7, flexShrink: 0 }}>
          <span style={{ color: mute, fontWeight: 700, letterSpacing: "0.04em" }}>CONDITION</span>
          {LL_CONDS.map((t) => {
            const on = cond === t;
            return <button key={t} onClick={() => setCond(t)} style={{ fontSize: 7, fontWeight: on ? 700 : 500, color: on ? "#06231f" : text, background: on ? teal : chip, borderRadius: 99, padding: "2.5px 7px", border: "none", cursor: "pointer", fontFamily: "inherit", transition: "all .15s" }}>{t}</button>;
          })}
        </div>
        {/* item grid — re-renders on filter */}
        <div style={{ marginTop: 9, display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 8, flex: 1, alignContent: "start", overflow: "hidden" }}>
          {shown.slice(0, 3).map((it) => (
            <div key={it.name} style={{ borderRadius: 9, background: card, border: `1px solid ${line}`, overflow: "hidden", animation: "ll-pop .25s ease" }}>
              <div style={{ position: "relative", aspectRatio: "4 / 3", background: "linear-gradient(150deg,#23262d,#15181d)", display: "grid", placeItems: "center" }}>
                <span style={{ fontSize: 19, color: it.ico }}>{it.emoji}</span>
                <span style={{ position: "absolute", top: 5, left: 5, fontSize: 6.5, fontWeight: 600, background: "rgba(0,0,0,0.55)", borderRadius: 5, padding: "2px 6px" }}>{it.emoji} {it.cat}</span>
                <span style={{ position: "absolute", bottom: 5, right: 5, fontSize: 7, fontWeight: 800, color: "#06231f", background: it.free ? green : "#fbbf24", borderRadius: 5, padding: "2px 7px" }}>{it.free ? "Free" : it.price}</span>
              </div>
              <div style={{ padding: "6px 7px 8px" }}>
                <span style={{ fontSize: 6.5, fontWeight: 700, color: green, border: `1px solid ${green}55`, borderRadius: 5, padding: "1.5px 5px" }}>{it.cond}</span>
                <div style={{ fontFamily: bricolage, fontWeight: 700, fontSize: 9, marginTop: 5, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{it.name}</div>
                <div style={{ fontSize: 7, color: mute, marginTop: 3 }}>{it.owner} · {it.dist}</div>
              </div>
            </div>
          ))}
          {shown.length === 0 && <div style={{ gridColumn: "1 / -1", textAlign: "center", color: mute, fontSize: 8.5, paddingTop: 14 }}>No items match — try another filter.</div>}
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   Near — a LIVE chat. Type a message, hit send: it appears, the typing dots
   pulse, and a reply comes back. Tabs swap chat / album / watch.
   ========================================================================= */
const NEAR_REPLIES = ["miss you 🌙", "9pm works ♥", "sending a pic 📷", "can't wait 💞", "call me after?"];
type Msg = { id: number; me: boolean; t: string };
function NearMock() {
  const bg = "#16121d", panel = "#221b2c", text = "#f6ece8", mute = "#b3a6b3", grad = "linear-gradient(120deg,#ff7da6,#ffb27a)", line = "rgba(255,232,224,0.1)";
  const [tab, setTab] = useState(1);
  const [msgs, setMsgs] = useState<Msg[]>([{ id: 1, me: false, t: "miss you 🌙" }, { id: 2, me: true, t: "2 days left ♥" }, { id: 3, me: false, t: "watch-party tonight?" }]);
  const [val, setVal] = useState("");
  const [typing, setTyping] = useState(false);
  const nRef = useRef(0);
  const idRef = useRef(3);
  const timers = useRef<number[]>([]);
  useEffect(() => () => timers.current.forEach(clearTimeout), []);
  const send = () => {
    const t = val.trim() || "yes! 9pm ♥";
    setVal("");
    setMsgs((m) => [...m, { id: ++idRef.current, me: true, t }]);
    setTyping(true);
    const reply = NEAR_REPLIES[nRef.current++ % NEAR_REPLIES.length];
    timers.current.push(window.setTimeout(() => { setTyping(false); setMsgs((m) => [...m, { id: ++idRef.current, me: false, t: reply }]); }, 900));
  };
  return (
    <div style={{ ...fill, background: bg, fontFamily: "'Hanken Grotesk',sans-serif", color: text }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "6% 6% 5%", borderBottom: `1px solid ${line}`, flexShrink: 0 }}>
        <div style={{ width: 26, height: 26, borderRadius: 99, background: grad }} />
        <div>
          <div style={{ fontFamily: fraunces, fontWeight: 600, fontSize: 13, lineHeight: 1 }}>Aanya</div>
          <div style={{ fontSize: 8.5, color: "#9be8b0" }}>● online</div>
        </div>
        <div style={{ marginLeft: "auto", display: "flex", gap: 8, fontSize: 13, color: "#ff7da6" }}><span>📞</span><span>📹</span></div>
      </div>

      {tab === 1 && (
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 7, padding: "6%", justifyContent: "flex-end", overflow: "hidden" }}>
          {msgs.slice(-5).map((m) => (
            <div key={m.id} style={{ alignSelf: m.me ? "flex-end" : "flex-start", maxWidth: "78%", fontSize: 10, padding: "8px 11px", color: m.me ? "#3a1020" : text, background: m.me ? grad : panel, border: m.me ? "none" : `1px solid ${line}`, borderRadius: 14, borderBottomRightRadius: m.me ? 5 : 14, borderBottomLeftRadius: m.me ? 14 : 5, fontWeight: m.me ? 600 : 400, animation: "ll-pop .2s ease" }}>{m.t}</div>
          ))}
          {typing && <div style={{ alignSelf: "flex-start", background: panel, border: `1px solid ${line}`, borderRadius: 14, borderBottomLeftRadius: 5, padding: "8px 12px", display: "flex", gap: 3 }}>{[0, 1, 2].map((d) => <span key={d} style={{ width: 4, height: 4, borderRadius: 99, background: mute, animation: `near-dot 1s ${d * 0.18}s infinite` }} />)}</div>}
        </div>
      )}
      {tab === 2 && (
        <div style={{ flex: 1, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6, padding: "6%", alignContent: "center" }}>
          {["🌅", "🎂", "🏖️", "🐶"].map((e) => <div key={e} style={{ aspectRatio: "1", borderRadius: 12, background: panel, border: `1px solid ${line}`, display: "grid", placeItems: "center", fontSize: 22 }}>{e}</div>)}
        </div>
      )}
      {tab === 3 && (
        <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 8, padding: "6%" }}>
          <div style={{ width: "82%", aspectRatio: "16/9", borderRadius: 12, background: "linear-gradient(135deg,#2a1f33,#14101b)", border: `1px solid ${line}`, display: "grid", placeItems: "center", fontSize: 22, position: "relative" }}>▶<span style={{ position: "absolute", bottom: 6, left: 8, fontSize: 8, color: mute }}>watching together · 2 online</span></div>
          <div style={{ fontSize: 9, color: mute }}>synced to the second 🍿</div>
        </div>
      )}

      {tab === 1 && (
        <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "4% 6% 3%", flexShrink: 0 }}>
          <input value={val} onChange={(e) => setVal(e.target.value)} onKeyDown={(e) => e.key === "Enter" && send()} placeholder="Message…" aria-label="Type a message" style={{ flex: 1, height: 28, borderRadius: 99, background: panel, border: `1px solid ${line}`, padding: "0 12px", fontSize: 10, color: text, outline: "none", fontFamily: "inherit" }} />
          <button onClick={send} aria-label="Send message" style={{ width: 28, height: 28, borderRadius: 99, background: grad, display: "grid", placeItems: "center", fontSize: 11, border: "none", cursor: "pointer" }}>✉️</button>
        </div>
      )}
      <div style={{ display: "flex", justifyContent: "space-around", padding: "8px 0 11px", borderTop: `1px solid ${line}`, fontSize: 14, flexShrink: 0 }}>
        {["🏠", "💬", "🍿", "🎮", "✨"].map((e, i) => {
          const TAB_OF: Record<number, number> = { 1: 1, 2: 3, 4: 2 }; // 💬→chat · 🍿→watch · ✨→album
          const LABELS = ["Home", "Chat", "Watch together", "Games", "Shared album"];
          const target = TAB_OF[i];
          const live = target !== undefined;
          const active = target === tab;
          return <button key={i} onClick={() => live && setTab(target)} aria-label={LABELS[i]} aria-disabled={!live} title={live ? LABELS[i] : `${LABELS[i]} — coming soon`} style={{ background: "none", border: "none", cursor: live ? "pointer" : "default", fontSize: 14, opacity: active ? 1 : live ? 0.55 : 0.3, filter: active ? "drop-shadow(0 0 6px #ff7da6)" : "none", transition: "all .15s" }}>{e}</button>;
        })}
      </div>
    </div>
  );
}

/* =========================================================================
   Vrixo — a LIVE before/after. Drag the divider to reveal the enhance;
   hit Enhance to run a processing pass.
   ========================================================================= */
function VrixoMock() {
  const bg = "#0e1016", text = "#eef1f6", mute = "#8b93a5", blue = "#3b8cff", line = "rgba(255,255,255,0.08)";
  const [pos, setPos] = useState(52);
  const [busy, setBusy] = useState(false);
  const wrap = useRef<HTMLDivElement>(null);
  const drag = useRef(false);
  const timers = useRef<number[]>([]);
  useEffect(() => () => timers.current.forEach(clearTimeout), []);
  const move = (clientX: number) => {
    const el = wrap.current; if (!el) return;
    const r = el.getBoundingClientRect();
    setPos(Math.max(4, Math.min(96, ((clientX - r.left) / r.width) * 100)));
  };
  const nudge = (d: number) => setPos((p) => Math.max(4, Math.min(96, p + d)));
  const enhance = () => { setBusy(true); setPos(12); timers.current.push(window.setTimeout(() => setBusy(false), 950)); };
  return (
    <div style={{ ...fill, background: bg, fontFamily: "'Hanken Grotesk',sans-serif", color: text }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "4% 5%", borderBottom: `1px solid ${line}`, flexShrink: 0 }}>
        <div style={{ fontFamily: bricolage, fontWeight: 800, fontSize: 13 }}>✨ Vrixo</div>
        <div style={{ fontSize: 9, color: mute }}>AI photo magic</div>
        <div style={{ marginLeft: "auto", display: "flex", gap: 5 }}>
          {[["Upscale", true], ["Remove bg", false], ["Restore", false]].map(([t, on], i) => (
            <span key={i} style={{ fontSize: 8, fontWeight: 600, borderRadius: 99, padding: "4px 9px", color: on ? "#04101f" : mute, background: on ? blue : "transparent", border: `1px solid ${on ? blue : line}` }}>{t as string}</span>
          ))}
        </div>
      </div>
      {/* before/after compare — draggable */}
      <div ref={wrap} role="slider" tabIndex={0} aria-label="Compare before and after — drag or use arrow keys" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(pos)}
        onPointerDown={(e) => { drag.current = true; (e.target as HTMLElement).setPointerCapture?.(e.pointerId); move(e.clientX); }} onPointerMove={(e) => drag.current && move(e.clientX)} onPointerUp={() => (drag.current = false)} onPointerCancel={() => (drag.current = false)} onPointerLeave={() => (drag.current = false)}
        onKeyDown={(e) => { if (e.key === "ArrowLeft") { e.preventDefault(); nudge(-6); } else if (e.key === "ArrowRight") { e.preventDefault(); nudge(6); } else if (e.key === "Home") { e.preventDefault(); setPos(4); } else if (e.key === "End") { e.preventDefault(); setPos(96); } }}
        style={{ position: "relative", flex: 1, margin: "4% 5%", borderRadius: 10, overflow: "hidden", border: `1px solid ${line}`, cursor: "ew-resize", touchAction: "none", userSelect: "none" }}>
        {/* after (vivid) — full base layer */}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg,#7db4ff,#2b3a55)", display: "grid", placeItems: "center", fontSize: 30 }}>🏔️</div>
        {/* before (dull) — top layer clipped to the left of the divider */}
        <div style={{ position: "absolute", inset: 0, clipPath: `inset(0 ${100 - pos}% 0 0)`, background: "linear-gradient(135deg,#3a3f4d,#23262e)", filter: "saturate(0.5) brightness(0.8)", display: "grid", placeItems: "center", fontSize: 30, transition: busy ? "clip-path .9s ease" : "none" }}>🏔️</div>
        <span style={{ position: "absolute", top: 6, left: 6, fontSize: 8, fontWeight: 700, color: "#fff", background: "rgba(0,0,0,0.45)", borderRadius: 6, padding: "2px 7px" }}>Before</span>
        <span style={{ position: "absolute", top: 6, right: 6, fontSize: 8, fontWeight: 700, color: "#04101f", background: blue, borderRadius: 6, padding: "2px 7px" }}>After</span>
        {/* divider handle */}
        <div style={{ position: "absolute", top: 0, bottom: 0, left: `${pos}%`, width: 2, background: "#fff", transform: "translateX(-1px)", transition: busy ? "left .9s ease" : "none" }}>
          <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 18, height: 18, borderRadius: 99, background: "#fff", color: "#04101f", display: "grid", placeItems: "center", fontSize: 9, fontWeight: 800, boxShadow: "0 2px 8px rgba(0,0,0,0.4)" }}>⇆</div>
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 9, padding: "0 5% 5%", flexShrink: 0 }}>
        <button onClick={enhance} disabled={busy} style={{ fontSize: 9, fontWeight: 700, color: "#04101f", background: blue, borderRadius: 8, padding: "7px 13px", border: "none", cursor: busy ? "default" : "pointer", opacity: busy ? 0.7 : 1 }}>{busy ? "Enhancing…" : "✨ Enhance"}</button>
        <div style={{ fontSize: 8.5, color: mute }}>{busy ? <span style={{ color: blue }}>● processing</span> : <><span style={{ color: "#4ee0a0" }}>✓ done</span> · drag to compare</>}</div>
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
export function Browser({ url, secure = true, children }: { url: string; secure?: boolean; children: ReactNode }) {
  return (
    <div style={{ borderRadius: 14, overflow: "hidden", background: "#0d0d14", border: `1px solid ${C.line2}`, boxShadow: "0 50px 100px -30px rgba(0,0,0,0.8)" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, height: 40, padding: "0 14px", background: "#15151e", borderBottom: `1px solid ${C.line}` }}>
        <span style={{ display: "flex", gap: 7 }}>{["#ff5f57", "#febc2e", "#28c840"].map((c) => <i key={c} style={{ width: 11, height: 11, borderRadius: 99, background: c, opacity: 0.9 }} />)}</span>
        <div style={{ flex: 1, maxWidth: 320, margin: "0 auto", height: 22, borderRadius: 99, background: "#0d0d14", border: `1px solid ${C.line}`, display: "flex", alignItems: "center", justifyContent: "center", gap: 6, fontFamily: F.mono, fontSize: 11, color: C.sub }}>
          <span style={{ color: C.faint }}>{secure ? "🔒" : "◉"}</span>{url}
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
