import { B_STACK, B_PROFILE } from "@/data/backend";
import { Panel } from "./Panel";

export function InfoView() {
  const rows = [
    { k: "email", v: B_PROFILE.email, href: `mailto:${B_PROFILE.email}` },
    { k: "github", v: "github.com/" + B_PROFILE.githubHandle, href: B_PROFILE.github },
    { k: "linkedin", v: "in/vishvam129", href: B_PROFILE.linkedin },
    { k: "resume", v: "Backend_Developer.pdf", href: B_PROFILE.resume },
  ];
  return (
    <div className="grid h-full gap-3 overflow-y-auto p-4 lg:grid-cols-[1fr_360px]">
      <Panel title="bill of materials" dot="var(--accent)" meta="prod stack" bodyClass="overflow-y-auto" pad={false}>
        <div>
          {B_STACK.map((g, i) => (
            <div key={g.label} className="grid gap-y-2 px-4 py-3.5 sm:grid-cols-[140px_1fr] sm:gap-x-6" style={{ borderTop: i ? "1px solid var(--line)" : "none" }}>
              <div className="font-mono text-[11px] uppercase tracking-wider" style={{ color: "var(--accent)" }}>{g.label}</div>
              <div className="flex flex-wrap gap-x-5 gap-y-1.5 font-mono text-[13px]" style={{ color: "var(--fg)" }}>
                {g.items.map((s) => <span key={s}>{s}</span>)}
              </div>
            </div>
          ))}
        </div>
      </Panel>

      <Panel title="200 OK · contact" dot="var(--ok)" meta="available">
        <p className="text-[14px] leading-relaxed" style={{ color: "var(--muted)" }}>
          Need someone to keep it <span style={{ color: "var(--accent)" }}>running?</span> I build the services and the infra that keeps them up.
        </p>
        <div className="mt-5">
          {rows.map((r) => (
            <a key={r.k} href={r.href} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-4 border-t py-3 transition-colors" style={{ borderColor: "var(--line)" }}>
              <span className="font-mono text-[11px] uppercase tracking-wider" style={{ color: "var(--faint)", width: 64 }}>{r.k}</span>
              <span className="truncate font-mono text-[13px] transition-colors group-hover:text-[color:var(--accent)]" style={{ color: "var(--fg)" }}>{r.v}</span>
              <span className="ml-auto transition-transform group-hover:translate-x-1" style={{ color: "var(--accent)" }}>↗</span>
            </a>
          ))}
          <div style={{ borderTop: "1px solid var(--line)" }} />
        </div>
      </Panel>
    </div>
  );
}
