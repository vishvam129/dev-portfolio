import { B_STACK, B_PROFILE } from "@/data/backend";

export function Stack() {
  return (
    <section id="stack" className="mx-auto max-w-[1180px] scroll-mt-20 px-6 py-20">
      <div className="mb-8 border-b pb-3" style={{ borderColor: "var(--line)" }}>
        <div className="font-mono text-[11px] uppercase tracking-[0.22em]" style={{ color: "var(--accent)" }}>// stack</div>
        <h2 className="mt-1.5 font-display text-2xl font-semibold sm:text-3xl" style={{ color: "var(--fg)" }}>Bill of materials</h2>
      </div>
      <div className="ticks rounded-[4px] border" style={{ borderColor: "var(--line-2)", background: "var(--surface)" }}>
        {B_STACK.map((g, i) => (
          <div key={g.label} className="grid gap-y-2 px-5 py-4 sm:grid-cols-[150px_1fr] sm:gap-x-6" style={{ borderTop: i ? "1px solid var(--line)" : "none" }}>
            <div className="font-mono text-[11px] uppercase tracking-wider" style={{ color: "var(--accent)" }}>{g.label}</div>
            <div className="flex flex-wrap gap-x-5 gap-y-1.5 font-mono text-[13px]" style={{ color: "var(--fg)" }}>
              {g.items.map((s) => <span key={s}>{s}</span>)}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function Contact() {
  const rows = [
    { k: "email", v: B_PROFILE.email, href: `mailto:${B_PROFILE.email}` },
    { k: "github", v: "github.com/" + B_PROFILE.githubHandle, href: B_PROFILE.github },
    { k: "linkedin", v: "in/vishvam129", href: B_PROFILE.linkedin },
    { k: "resume", v: "Backend_Developer.pdf", href: B_PROFILE.resume },
  ];
  return (
    <section id="contact" className="mx-auto max-w-[1180px] scroll-mt-20 px-6 py-24">
      <div className="font-mono text-[11px] uppercase tracking-[0.22em]" style={{ color: "var(--accent)" }}>// 200 OK</div>
      <h2 className="mt-4 font-display font-semibold leading-tight" style={{ fontSize: "clamp(2rem,5vw,3.4rem)", color: "var(--fg)" }}>
        Need someone to keep it <span style={{ color: "var(--accent)" }}>running?</span>
      </h2>
      <div className="mt-9 max-w-xl">
        {rows.map((r) => (
          <a key={r.k} href={r.href} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-5 border-t py-3.5 transition-colors" style={{ borderColor: "var(--line)" }}>
            <span className="font-mono text-[11px] uppercase tracking-wider" style={{ color: "var(--faint)", width: 72 }}>{r.k}</span>
            <span className="font-mono text-[14px] transition-colors group-hover:text-[color:var(--accent)]" style={{ color: "var(--fg)" }}>{r.v}</span>
            <span className="ml-auto transition-transform group-hover:translate-x-1" style={{ color: "var(--accent)" }}>↗</span>
          </a>
        ))}
        <div style={{ borderTop: "1px solid var(--line)" }} />
      </div>
    </section>
  );
}

export function BackendFooter() {
  return (
    <footer className="border-t" style={{ borderColor: "var(--line)" }}>
      <div className="mx-auto flex max-w-[1180px] flex-col gap-2 px-6 py-7 font-mono text-[11px] tnum sm:flex-row sm:items-center" style={{ color: "var(--faint)" }}>
        <span>© 2026 {B_PROFILE.name}</span>
        <span className="sm:ml-auto">{B_PROFILE.sha} · {B_PROFILE.region.split(" ")[0]} · built 2026-06-20 · all systems operational</span>
      </div>
    </footer>
  );
}
