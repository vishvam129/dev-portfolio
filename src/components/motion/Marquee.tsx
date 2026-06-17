/** Seamless CSS marquee with soft edge-fade (no hard cut). Two identical groups
 *  in a max-content flex track, translated -50%. Pauses on hover. */
export function Marquee({ items, duration = 40 }: { items: string[]; duration?: number }) {
  const Group = (
    <ul className="flex shrink-0 items-center" style={{ margin: 0, padding: 0, listStyle: "none" }} aria-hidden>
      {items.map((it, i) => (
        <li key={i} className="flex items-center">
          <span className="font-display" style={{ fontSize: "clamp(1.5rem,3.6vw,2.6rem)", color: "var(--fg)", paddingInline: "1.5rem", whiteSpace: "nowrap" }}>{it}</span>
          <span style={{ color: "var(--accent)", fontSize: "0.9rem" }}>✦</span>
        </li>
      ))}
    </ul>
  );
  return (
    <div
      className="marquee group overflow-hidden border-y py-5"
      style={{
        borderColor: "var(--line)",
        WebkitMaskImage: "linear-gradient(to right, transparent, #000 7%, #000 93%, transparent)",
        maskImage: "linear-gradient(to right, transparent, #000 7%, #000 93%, transparent)",
      }}
    >
      <div className="ticker-track group-hover:[animation-play-state:paused]" style={{ width: "max-content", animationDuration: `${duration}s` }}>
        {Group}
        {Group}
      </div>
    </div>
  );
}
