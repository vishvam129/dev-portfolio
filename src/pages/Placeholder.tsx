import { Link } from "react-router-dom";

/** Temporary placeholder for routes not yet built (backend, full-stack). */
export default function Placeholder({ title }: { title: string }) {
  return (
    <main className="grid min-h-screen place-items-center px-6 text-center" style={{ background: "var(--bg)" }}>
      <div>
        <div className="mono-label mb-3" style={{ color: "var(--accent)" }}>under construction</div>
        <h1 className="font-display text-4xl font-bold" style={{ color: "var(--fg)" }}>{title}</h1>
        <p className="mt-3 font-mono text-sm" style={{ color: "var(--muted)" }}>
          This portfolio is being built next.
        </p>
        <Link to="/" className="mt-6 inline-block rounded-full px-5 py-2 font-mono text-[13px]" style={{ background: "var(--accent)", color: "var(--bg)" }}>
          ← back to AI
        </Link>
      </div>
    </main>
  );
}
