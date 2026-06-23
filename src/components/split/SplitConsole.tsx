import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { C, F } from "./theme";

type Layer = { n: string; t: string };
type Demo = {
  id: string; name: string; front: "listing" | "chat" | "photo"; action: string; done: string;
  req: { m: string; path: string }; layers: Layer[]; res: { status: number; body: Record<string, unknown> };
};

const DEMOS: Demo[] = [
  {
    id: "lendlocal", name: "LendLocal", front: "listing", action: "Book · $9/day", done: "Booked ✓",
    req: { m: "POST", path: "/api/bookings" },
    layers: [{ n: "Next.js route", t: "app/api/bookings" }, { n: "OAuth session", t: "verify user" }, { n: "Stripe", t: "payment hold" }, { n: "Prisma", t: "INSERT booking" }],
    res: { status: 201, body: { booking_id: "bk_7Q2", item: "itm_42", hold: "pi_3xK", status: "confirmed" } },
  },
  {
    id: "near", name: "Near", front: "chat", action: "Send", done: "delivered ✓",
    req: { m: "WS", path: "firestore://messages" },
    layers: [{ n: "React client", t: "optimistic add" }, { n: "Firestore rules", t: "per-couple auth" }, { n: "Cloud Function", t: "onCreate" }, { n: "FCM", t: "push to device" }],
    res: { status: 200, body: { id: "msg_91", delivered: true, encrypted: true } },
  },
  {
    id: "vrixo", name: "Vrixo", front: "photo", action: "Enhance", done: "queued ✓",
    req: { m: "POST", path: "/api/jobs" },
    layers: [{ n: "Next.js route", t: "app/api/jobs" }, { n: "Supabase auth", t: "verify" }, { n: "Celery", t: "enqueue gpu" }, { n: "Redis → worker", t: "Real-ESRGAN" }],
    res: { status: 202, body: { job_id: "job_7Q2", status: "queued", queue: "gpu" } },
  },
];

function json(obj: Record<string, unknown>) {
  return JSON.stringify(obj, null, 2).replace(/("[^"]+":)|("[^"]*")|(\b(?:true|false)\b)|(\b\d+\b)/g, (m, k, s, b) => {
    const col = k ? C.back : s ? C.ok : b ? C.warn : C.front;
    return `<span style="color:${col}">${m}</span>`;
  });
}

/* dark frontend mocks per project */
function FrontUI({ demo, done, onRun, busy }: { demo: Demo; done: boolean; onRun: () => void; busy: boolean }) {
  const Btn = (
    <button onClick={onRun} disabled={busy} style={{ width: "100%", marginTop: 12, padding: "11px 14px", borderRadius: 10, border: "none", cursor: busy ? "default" : "pointer", fontFamily: F.body, fontWeight: 700, fontSize: 14, background: done ? C.ok : C.front, color: C.inkOnAccent, opacity: busy && !done ? 0.7 : 1, transition: "background .3s" }}>
      {done ? demo.done : busy ? "working…" : demo.action}
    </button>
  );
  if (demo.front === "listing") return (
    <div>
      <div style={{ height: 96, borderRadius: 10, background: "linear-gradient(135deg,#ff7a9c,#ef5a2a)" }} />
      <div style={{ marginTop: 12, fontFamily: F.display, fontWeight: 600, fontSize: 17, color: C.fg }}>Cordless drill</div>
      <div style={{ fontFamily: F.body, fontSize: 12.5, color: C.sub, marginTop: 2 }}>0.4 mi · ★ 4.9 · available</div>
      {Btn}
    </div>
  );
  if (demo.front === "chat") return (
    <div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8, minHeight: 96 }}>
        <div style={{ alignSelf: "flex-start", background: C.panel2, color: C.fg, fontSize: 12.5, padding: "7px 11px", borderRadius: 12, borderBottomLeftRadius: 3 }}>miss you 🌙</div>
        {done && <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} style={{ alignSelf: "flex-end", background: C.front, color: C.inkOnAccent, fontSize: 12.5, padding: "7px 11px", borderRadius: 12, borderBottomRightRadius: 3 }}>2 days left ♥</motion.div>}
      </div>
      <div style={{ display: "flex", gap: 8, alignItems: "center", marginTop: 10 }}>
        <div style={{ flex: 1, fontFamily: F.body, fontSize: 12.5, color: C.fg, background: C.bg2, border: `1px solid ${C.line}`, borderRadius: 99, padding: "8px 12px" }}>2 days left ♥</div>
      </div>
      {Btn}
    </div>
  );
  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
        {[0, 1].map((i) => <div key={i} style={{ aspectRatio: "1", borderRadius: 10, background: `linear-gradient(${130 + i * 40}deg,#9a7bff,#3a2f5e)`, position: "relative" }}>{i === 0 && done && <div style={{ position: "absolute", inset: 0, border: `2px solid ${C.ok}`, borderRadius: 10 }} />}</div>)}
      </div>
      <div style={{ fontFamily: F.body, fontSize: 12.5, color: C.sub, marginTop: 10 }}>portrait.png · 4.2 MB</div>
      {Btn}
    </div>
  );
}

export function SplitConsole() {
  const [idx, setIdx] = useState(0);
  const [step, setStep] = useState(-1);   // active layer index
  const [phase, setPhase] = useState<"idle" | "run" | "done">("idle");
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const demo = DEMOS[idx];

  const reset = () => { timers.current.forEach(clearTimeout); timers.current = []; setStep(-1); setPhase("idle"); };
  useEffect(() => reset, []);              // cleanup on unmount
  useEffect(() => { reset(); }, [idx]);    // reset when switching project

  function run() {
    if (phase === "run") return;
    reset(); setPhase("run");
    demo.layers.forEach((_, i) => timers.current.push(setTimeout(() => setStep(i), 120 + i * 460)));
    timers.current.push(setTimeout(() => { setStep(demo.layers.length); setPhase("done"); }, 120 + demo.layers.length * 460 + 260));
  }
  const busy = phase === "run", done = phase === "done";

  return (
    <div style={{ background: C.panel, border: `1px solid ${C.line2}`, borderRadius: 16, overflow: "hidden", boxShadow: "0 40px 90px -30px rgba(0,0,0,0.7)" }}>
      {/* header: project tabs + request line */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 16px", borderBottom: `1px solid ${C.line}`, background: C.bg2, flexWrap: "wrap" }}>
        <div style={{ display: "flex", gap: 4, background: C.bg, border: `1px solid ${C.line}`, borderRadius: 99, padding: 3 }}>
          {DEMOS.map((d, i) => (
            <button key={d.id} onClick={() => setIdx(i)} style={{ fontFamily: F.mono, fontSize: 12, border: "none", cursor: "pointer", borderRadius: 99, padding: "5px 13px", background: i === idx ? C.fg : "transparent", color: i === idx ? C.bg : C.sub }}>{d.name}</button>
          ))}
        </div>
        <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 8, fontFamily: F.mono, fontSize: 12 }}>
          <span style={{ color: C.front, fontWeight: 700 }}>{demo.req.m}</span>
          <span style={{ color: C.sub }}>{demo.req.path}</span>
        </div>
      </div>

      {/* the split */}
      <div className="sp-split" style={{ display: "grid", position: "relative" }}>
        {/* FRONTEND */}
        <div style={{ padding: "20px 20px 24px", borderRight: `1px solid ${C.line}` }}>
          <Label color={C.front} side="frontend" sub="React · Next.js" />
          <div style={{ marginTop: 16, background: C.bg2, border: `1px solid ${C.line}`, borderRadius: 12, padding: 16 }}>
            <FrontUI demo={demo} done={done} busy={busy} onRun={run} />
          </div>
        </div>

        {/* SEAM */}
        <div className="sp-seam" style={{ position: "absolute", left: "50%", top: 0, bottom: 0, width: 1, background: `linear-gradient(${C.front}, ${C.back})`, transform: "translateX(-0.5px)", pointerEvents: "none" }}>
          <AnimatePresence>
            {busy && (
              <motion.div key="pkt" initial={{ top: "12%", opacity: 0 }} animate={{ top: ["12%", "82%"], opacity: [0, 1, 1, 0] }} transition={{ duration: 0.9, repeat: Infinity, ease: "easeInOut" }}
                style={{ position: "absolute", left: "50%", transform: "translateX(-50%)", width: 9, height: 9, borderRadius: 99, background: "#fff", boxShadow: `0 0 12px 3px ${C.back}` }} />
            )}
          </AnimatePresence>
        </div>

        {/* BACKEND */}
        <div style={{ padding: "20px 20px 24px" }}>
          <Label color={C.back} side="backend" sub="FastAPI · Postgres" />
          <div style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 8 }}>
            {demo.layers.map((l, i) => {
              const active = i === step, did = i < step || done;
              const col = active ? C.back : did ? C.ok : C.faint;
              return (
                <div key={l.n} style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 12px", borderRadius: 9, border: `1px solid ${active ? C.back : did ? "color-mix(in srgb,var(--ok,#34e0a1) 40%, transparent)" : C.line}`, background: active ? "rgba(77,140,255,0.08)" : C.bg2, transition: "all .25s" }}>
                  <span style={{ width: 7, height: 7, borderRadius: 99, background: col, boxShadow: active ? `0 0 8px ${C.back}` : "none" }} />
                  <span style={{ fontFamily: F.mono, fontSize: 12.5, color: did || active ? C.fg : C.sub }}>{l.n}</span>
                  <span style={{ marginLeft: "auto", fontFamily: F.mono, fontSize: 11, color: C.faint }}>{l.t}</span>
                  <span style={{ fontFamily: F.mono, fontSize: 12, color: did ? C.ok : C.faint, width: 14, textAlign: "right" }}>{did ? "✓" : active ? "•" : ""}</span>
                </div>
              );
            })}
          </div>

          {/* response */}
          <div style={{ marginTop: 12, minHeight: 96 }}>
            <AnimatePresence mode="wait">
              {done ? (
                <motion.div key="res" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6, fontFamily: F.mono, fontSize: 12 }}>
                    <span style={{ background: "rgba(52,224,161,0.16)", color: C.ok, borderRadius: 5, padding: "2px 7px" }}>{demo.res.status}</span>
                    <span style={{ color: C.faint }}>application/json</span>
                  </div>
                  <pre style={{ margin: 0, fontFamily: F.mono, fontSize: 12, lineHeight: 1.55, color: C.fg, background: C.bg, border: `1px solid ${C.line}`, borderRadius: 8, padding: "10px 12px", overflowX: "auto" }} dangerouslySetInnerHTML={{ __html: json(demo.res.body) }} />
                </motion.div>
              ) : (
                <div style={{ fontFamily: F.mono, fontSize: 12, color: C.faint, paddingTop: 8 }}>{busy ? "request in flight…" : "↖ click the button — watch it cross the stack."}</div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}

function Label({ color, side, sub }: { color: string; side: string; sub: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
      <span style={{ width: 8, height: 8, borderRadius: 99, background: color, boxShadow: `0 0 8px ${color}` }} />
      <span style={{ fontFamily: F.mono, fontSize: 11.5, letterSpacing: "0.14em", textTransform: "uppercase", color }}>{side}</span>
      <span style={{ fontFamily: F.mono, fontSize: 11, color: C.faint }}>· {sub}</span>
    </div>
  );
}
