import { useEffect, useState } from "react";

/** Opt-in UI sound: a soft tick on interactive hovers/clicks via WebAudio. */
export function Sound() {
  const [on, setOn] = useState(false);

  useEffect(() => {
    if (!on) return;
    let ctx: AudioContext | null = null;
    const tick = (freq: number, dur: number, vol: number) => {
      try {
        ctx = ctx ?? new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
        const o = ctx.createOscillator(), g = ctx.createGain();
        o.type = "sine"; o.frequency.value = freq;
        g.gain.setValueAtTime(vol, ctx.currentTime);
        g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + dur);
        o.connect(g); g.connect(ctx.destination); o.start(); o.stop(ctx.currentTime + dur);
      } catch { /* ignore */ }
    };
    let last = 0;
    const over = (e: Event) => {
      const t = e.target as HTMLElement;
      if (!t.closest?.("a, button, [data-hover]")) return;
      const now = performance.now(); if (now - last < 60) return; last = now;
      tick(880, 0.04, 0.04);
    };
    const click = (e: Event) => { if ((e.target as HTMLElement).closest?.("a, button, [data-hover]")) tick(440, 0.08, 0.06); };
    window.addEventListener("pointerover", over);
    window.addEventListener("pointerdown", click);
    return () => { window.removeEventListener("pointerover", over); window.removeEventListener("pointerdown", click); ctx?.close(); };
  }, [on]);

  return (
    <button data-hover onClick={() => setOn((v) => !v)} aria-label="toggle sound"
      className="fixed bottom-5 right-5 z-[160] flex items-center gap-2 rounded-full border px-3 py-2 font-mono text-[11px] backdrop-blur-md"
      style={{ borderColor: "var(--line-2)", background: "color-mix(in srgb, var(--bg) 70%, transparent)", color: on ? "var(--accent)" : "var(--muted)" }}>
      <span className="flex items-end gap-0.5" aria-hidden>
        {[5, 9, 6].map((h, i) => <span key={i} style={{ width: 2, height: on ? h : 2, background: "currentColor", transition: "height 0.2s", transitionDelay: `${i * 60}ms` }} />)}
      </span>
      sound {on ? "on" : "off"}
    </button>
  );
}
