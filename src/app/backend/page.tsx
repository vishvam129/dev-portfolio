import type { Metadata } from "next";
import { StatusHero } from "@/components/backend/StatusHero";
import { TraceDiagram } from "@/components/backend/TraceDiagram";
import { BackendSections } from "@/components/backend/sections";
import { CommandPalette } from "@/components/backend/CommandPalette";
import { ContactTerminal } from "@/components/backend/ContactTerminal";
import { PROFILE } from "@/data/content";

export const metadata: Metadata = {
  title: "Backend Developer · Production",
  description:
    "Vishvam Patel — backend engineer. Reliable APIs, data layers and infra. Python, FastAPI, PostgreSQL, Celery, Kubernetes. A portfolio built like a status page.",
};

export default function BackendPage() {
  return (
    <main data-theme="backend" className="grain min-h-screen" style={{ background: "var(--bg)" }}>
      <CommandPalette />
      <StatusHero />
      <BackendSections />
      <TraceDiagram />

      <section id="contact" className="mx-auto max-w-6xl px-5 py-24">
        <div className="mb-10 flex items-end justify-between border-b pb-4" style={{ borderColor: "var(--line)" }}>
          <div className="flex items-baseline gap-4">
            <span className="mono-label" style={{ color: "var(--accent)" }}>05 / contact</span>
            <h2 className="font-display text-2xl font-semibold sm:text-3xl" style={{ color: "var(--fg)" }}>Open a connection</h2>
          </div>
          <span className="mono-label hidden sm:block">200 OK</span>
        </div>
        <div className="grid gap-8 lg:grid-cols-2">
          <div>
            <p className="max-w-md text-lg leading-relaxed" style={{ color: "var(--muted)" }}>
              Available for remote <span style={{ color: "var(--fg)" }}>backend / Python</span> roles.
              Shell&apos;s live — try <span className="font-mono" style={{ color: "var(--accent)" }}>help</span>, or just email me.
            </p>
            <div className="mt-8 space-y-3 font-mono text-sm">
              {[
                { k: "email", v: PROFILE.email, href: `mailto:${PROFILE.email}` },
                { k: "github", v: "github.com/" + PROFILE.githubHandle, href: PROFILE.github },
                { k: "linkedin", v: "in/vishvam129", href: PROFILE.linkedin },
              ].map((r) => (
                <a key={r.k} href={r.href} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-4 border-b pb-3 transition-opacity hover:opacity-70" style={{ borderColor: "var(--line)" }}>
                  <span className="mono-label w-20">{r.k}</span>
                  <span style={{ color: "var(--fg)" }}>{r.v}</span>
                  <span className="ml-auto" style={{ color: "var(--accent)" }}>↗</span>
                </a>
              ))}
            </div>
          </div>
          <ContactTerminal />
        </div>
      </section>

      <footer className="border-t" style={{ borderColor: "var(--line)" }}>
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-5 py-8 font-mono text-[11px] sm:flex-row sm:items-center" style={{ color: "var(--faint)" }}>
          <span>© 2026 {PROFILE.name}</span>
          <span className="sm:ml-auto">build: dev · region: local · all systems operational</span>
        </div>
      </footer>
    </main>
  );
}
