/** HUD reticle that frames the wireframe core: rings, crosshair, ticks. SVG. */
export function Reticle() {
  const ticks = Array.from({ length: 60 });
  return (
    <svg viewBox="0 0 400 400" className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden>
      <defs>
        <radialGradient id="rfade" cx="50%" cy="50%" r="50%">
          <stop offset="60%" stopColor="transparent" />
          <stop offset="100%" stopColor="var(--bg)" />
        </radialGradient>
      </defs>

      {/* tick ring */}
      <g transform="translate(200 200)">
        {ticks.map((_, i) => {
          const a = (i / ticks.length) * Math.PI * 2;
          const major = i % 5 === 0;
          const r1 = 168, r2 = major ? 156 : 162;
          return <line key={i} x1={Math.cos(a) * r1} y1={Math.sin(a) * r1} x2={Math.cos(a) * r2} y2={Math.sin(a) * r2}
            stroke={major ? "var(--accent)" : "var(--line-2)"} strokeWidth={major ? 1 : 0.6} opacity={major ? 0.7 : 0.5} />;
        })}
      </g>

      {/* concentric rings */}
      <circle cx="200" cy="200" r="150" fill="none" stroke="var(--line-2)" strokeWidth="0.75" />
      <circle cx="200" cy="200" r="120" fill="none" stroke="var(--line)" strokeWidth="0.75" />
      {/* rotating dashed ring */}
      <circle cx="200" cy="200" r="178" fill="none" stroke="var(--accent-2)" strokeWidth="0.75" strokeDasharray="2 10" opacity="0.55">
        <animateTransform attributeName="transform" type="rotate" from="0 200 200" to="360 200 200" dur="40s" repeatCount="indefinite" />
      </circle>

      {/* crosshair with center gap */}
      <g stroke="var(--accent)" strokeWidth="0.6" opacity="0.5">
        <line x1="20" y1="200" x2="170" y2="200" /><line x1="230" y1="200" x2="380" y2="200" />
        <line x1="200" y1="20" x2="200" y2="170" /><line x1="200" y1="230" x2="200" y2="380" />
      </g>
      <circle cx="200" cy="200" r="4" fill="none" stroke="var(--accent)" strokeWidth="0.8" opacity="0.7" />

      {/* corner brackets */}
      <g stroke="var(--accent)" strokeWidth="1" fill="none" opacity="0.8">
        <path d="M30 50 L30 30 L50 30" /><path d="M350 30 L370 30 L370 50" />
        <path d="M370 350 L370 370 L350 370" /><path d="M50 370 L30 370 L30 350" />
      </g>
    </svg>
  );
}
