/** Clean, seamless CSS marquee — two identical halves shifted -50%. No jank. */
export function Marquee({ items, duration = 38 }: { items: string[]; duration?: number }) {
  const Half = (
    <div className="flex shrink-0 items-center">
      {items.map((it, i) => (
        <span key={i} className="flex items-center">
          <span className="font-display" style={{ fontSize: "clamp(1.5rem,3.6vw,2.6rem)", color: "var(--fg)", paddingInline: "1.4rem" }}>{it}</span>
          <span style={{ color: "var(--accent)", fontSize: "1rem" }}>✦</span>
        </span>
      ))}
    </div>
  );
  return (
    <div className="marquee group overflow-hidden border-y py-5" style={{ borderColor: "var(--line)" }}>
      <div className="ticker-track group-hover:[animation-play-state:paused]" style={{ animationDuration: `${duration}s` }}>
        {Half}
        {Half}
      </div>
    </div>
  );
}
