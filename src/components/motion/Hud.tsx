import { useEffect, useState } from "react";

/** Live telemetry: fps, pointer coords, IST clock. Pure techie flavor. */
export function Hud() {
  const [fps, setFps] = useState(60);
  const [xy, setXy] = useState({ x: 0, y: 0 });
  const [clock, setClock] = useState("--:--:--");

  useEffect(() => {
    let raf = 0, last = performance.now(), frames = 0, acc = 0;
    const loop = (t: number) => {
      frames++; acc += t - last; last = t;
      if (acc >= 500) { setFps(Math.round((frames * 1000) / acc)); frames = 0; acc = 0; }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    const move = (e: PointerEvent) => setXy({ x: e.clientX, y: e.clientY });
    window.addEventListener("pointermove", move);
    const fmt = new Intl.DateTimeFormat("en-GB", { timeZone: "Asia/Kolkata", hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false });
    const tick = () => setClock(fmt.format(new Date()));
    tick();
    const cid = setInterval(tick, 1000);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("pointermove", move); clearInterval(cid); };
  }, []);

  const Item = ({ k, v }: { k: string; v: string }) => (
    <span className="flex items-center gap-1.5">
      <span style={{ color: "var(--faint)" }}>{k}</span>
      <span className="tnum" style={{ color: "var(--accent-2)" }}>{v}</span>
    </span>
  );

  return (
    <div className="flex flex-wrap gap-x-5 gap-y-1 font-mono text-[10.5px]" style={{ color: "var(--muted)" }}>
      <Item k="fps" v={String(fps)} />
      <Item k="xy" v={`${String(xy.x).padStart(4, "0")},${String(xy.y).padStart(4, "0")}`} />
      <Item k="ist" v={clock} />
      <Item k="render" v="canvas2d" />
    </div>
  );
}
