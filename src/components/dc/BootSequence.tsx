import { useEffect, useState } from "react";
import { C, F } from "./theme";

const LINES = [
  { t: "vishvam.systems · in-1 datacenter // POST", head: true },
  { t: "[ OK ]  power supply ......... nominal" },
  { t: "[ OK ]  mounting /dev/racks" },
  { t: "[ OK ]  vrixo-api ............ online" },
  { t: "[ OK ]  lendlocal-api ........ online" },
  { t: "[ OK ]  near-rtc ............. online" },
  { t: "[ OK ]  network fabric ....... 3 links up" },
  { t: "[ OK ]  cooling .............. nominal" },
  { t: "[ OK ]  render pipeline ...... bloom · dof" },
  { t: "datacenter online.", done: true },
];

export function BootSequence({ onDone }: { onDone: () => void }) {
  const [n, setN] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setN(LINES.length); onDone(); return; }
    let i = 0;
    const id = setInterval(() => {
      i += 1; setN(i);
      if (i >= LINES.length) { clearInterval(id); setTimeout(onDone, 380); }
    }, 110);
    return () => clearInterval(id);
  }, [onDone]);

  const pct = Math.round((Math.min(n, LINES.length) / LINES.length) * 100);

  return (
    <div style={{ width: "min(460px, 86vw)", fontFamily: F.mono }}>
      <div style={{ fontSize: 12.5, lineHeight: 1.85 }}>
        {LINES.slice(0, n).map((l, i) => (
          <div key={i} style={{ color: l.head ? C.cyan : l.done ? C.green : C.muted }}>
            {l.t.startsWith("[ OK ]") ? <><span style={{ color: C.green }}>[ OK ]</span>{l.t.slice(6)}</> : l.t}
          </div>
        ))}
        {n < LINES.length && <span style={{ color: C.cyan }}>▋</span>}
      </div>
      {/* progress */}
      <div style={{ marginTop: 16, height: 2, background: "rgba(120,160,180,0.14)", borderRadius: 2, overflow: "hidden" }}>
        <div style={{ height: "100%", width: `${pct}%`, background: `linear-gradient(90deg, ${C.cyan}, ${C.green})`, transition: "width 0.11s linear", boxShadow: `0 0 8px ${C.cyan}` }} />
      </div>
      <div style={{ marginTop: 8, display: "flex", fontSize: 10.5, color: C.faint }}>
        <span>booting racks</span>
        <span style={{ marginLeft: "auto", fontVariantNumeric: "tabular-nums" }}>{pct}%</span>
      </div>
      <div style={{ marginTop: 14, fontSize: 10, color: C.faint, opacity: 0.7 }}>click to skip</div>
    </div>
  );
}
