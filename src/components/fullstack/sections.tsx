import { Reveal } from "@/components/primitives/Reveal";
import { CountUp } from "@/components/primitives/CountUp";
import { projectsFor, describe, SKILLS, EXPERIENCE, PROFILE } from "@/data/content";

const lens = "fullstack" as const;

/* ----------------------------- BENTO GRID ----------------------------- */
function Bento() {
  const [near, lendlocal, vrixo, jobportal] = projectsFor(lens);
  return (
    <section id="work" className="mx-auto max-w-6xl px-5 py-24">
      <Reveal>
        <h2 className="mb-3 font-display text-4xl font-bold tracking-tight sm:text-5xl" style={{ color: "var(--fg)" }}>
          Selected work
        </h2>
        <p className="mb-12 max-w-lg text-lg" style={{ color: "var(--muted)" }}>
          Products shipped end-to-end — schema to pixel, idea to production.
        </p>
      </Reveal>

      <div className="grid auto-rows-[minmax(140px,auto)] grid-cols-2 gap-4 lg:grid-cols-4">
        {/* featured — LendLocal (live) */}
        <Reveal className="col-span-2 row-span-2 lg:col-span-2">
          <a href={lendlocal.url} target="_blank" rel="noopener noreferrer" data-cursor
            className="group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border p-7 transition-transform duration-300 hover:-translate-y-1"
            style={{ borderColor: "var(--line)", background: "var(--panel)" }}>
            <div
              className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full opacity-30 blur-2xl transition-opacity group-hover:opacity-60"
              style={{ background: "var(--accent)" }}
            />
            <div className="relative flex items-center gap-2">
              <span className="live-dot" />
              <span className="mono-label" style={{ color: "var(--ok)" }}>live in production</span>
            </div>
            <div className="relative">
              <h3 className="font-display text-3xl font-bold" style={{ color: "var(--fg)" }}>{lendlocal.name}</h3>
              <p className="mt-2 max-w-sm text-sm leading-relaxed" style={{ color: "var(--muted)" }}>{describe(lendlocal, lens)}</p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {lendlocal.stack.slice(0, 6).map((s) => (
                  <span key={s} className="rounded-full border px-2.5 py-0.5 font-mono text-[10px]" style={{ borderColor: "var(--line)", color: "var(--muted)" }}>{s}</span>
                ))}
              </div>
              <span className="mt-4 inline-flex items-center gap-1 font-body text-sm font-medium" style={{ color: "var(--accent)" }}>
                Open live demo ↗
              </span>
            </div>
          </a>
        </Reveal>

        {/* Near */}
        <Reveal className="col-span-2 lg:col-span-2" delay={0.05}>
          <div data-cursor className="flex h-full flex-col justify-between rounded-2xl border p-6 transition-transform duration-300 hover:-translate-y-1" style={{ borderColor: "var(--line)", background: "var(--panel)" }}>
            <div className="flex items-center justify-between">
              <h3 className="font-display text-2xl font-bold" style={{ color: "var(--fg)" }}>{near.name}</h3>
              <span className="mono-label" style={{ color: "var(--accent)" }}>web + android</span>
            </div>
            <p className="mt-2 text-sm leading-relaxed" style={{ color: "var(--muted)" }}>{describe(near, lens)}</p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {near.stack.slice(0, 5).map((s) => (
                <span key={s} className="rounded-full border px-2.5 py-0.5 font-mono text-[10px]" style={{ borderColor: "var(--line)", color: "var(--muted)" }}>{s}</span>
              ))}
            </div>
          </div>
        </Reveal>

        {/* stat tile */}
        <Reveal delay={0.1}>
          <div className="flex h-full flex-col justify-center rounded-2xl border p-6 text-center" style={{ borderColor: "var(--line)", background: "var(--accent)", color: "var(--bg)" }}>
            <div className="font-display text-5xl font-bold tabular-nums"><CountUp to={4} /></div>
            <div className="mt-1 font-mono text-[11px] opacity-80">shipped products</div>
          </div>
        </Reveal>

        {/* github tile */}
        <Reveal delay={0.12}>
          <a href={PROFILE.github} target="_blank" rel="noopener noreferrer" data-cursor
            className="flex h-full flex-col justify-between rounded-2xl border p-6 transition-transform duration-300 hover:-translate-y-1" style={{ borderColor: "var(--line)", background: "var(--panel)" }}>
            <span className="mono-label">github</span>
            <div>
              <div className="font-display text-lg font-semibold" style={{ color: "var(--fg)" }}>@{PROFILE.githubHandle}</div>
              <span className="font-body text-sm" style={{ color: "var(--accent)" }}>Follow ↗</span>
            </div>
          </a>
        </Reveal>

        {/* vrixo */}
        <Reveal className="col-span-2" delay={0.14}>
          <div data-cursor className="flex h-full flex-col justify-between rounded-2xl border p-6 transition-transform duration-300 hover:-translate-y-1" style={{ borderColor: "var(--line)", background: "var(--panel)" }}>
            <div className="flex items-center justify-between">
              <h3 className="font-display text-2xl font-bold" style={{ color: "var(--fg)" }}>{vrixo.name}</h3>
              <span className="mono-label" style={{ color: "var(--accent)" }}>AI · in progress</span>
            </div>
            <p className="mt-2 text-sm leading-relaxed" style={{ color: "var(--muted)" }}>{describe(vrixo, lens)}</p>
          </div>
        </Reveal>

        {/* job portal */}
        <Reveal className="col-span-2" delay={0.16}>
          <div data-cursor className="flex h-full flex-col justify-between rounded-2xl border p-6 transition-transform duration-300 hover:-translate-y-1" style={{ borderColor: "var(--line)", background: "var(--panel)" }}>
            <div className="flex items-center justify-between">
              <h3 className="font-display text-2xl font-bold" style={{ color: "var(--fg)" }}>{jobportal.name}</h3>
              <span className="mono-label" style={{ color: "var(--accent)" }}>MERN</span>
            </div>
            <p className="mt-2 text-sm leading-relaxed" style={{ color: "var(--muted)" }}>{describe(jobportal, lens)}</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* --------------------------- SCROLL STORY ----------------------------- */
function Story() {
  const e = EXPERIENCE[lens][0];
  return (
    <section className="mx-auto max-w-6xl px-5 py-24">
      <div className="grid gap-12 lg:grid-cols-2">
        <div className="lg:sticky lg:top-24 lg:h-fit">
          <Reveal>
            <span className="mono-label" style={{ color: "var(--accent)" }}>now / building</span>
            <h2 className="mt-3 font-display text-4xl font-bold tracking-tight sm:text-5xl" style={{ color: "var(--fg)" }}>
              {e.role}
            </h2>
            <p className="mt-2 font-body text-lg" style={{ color: "var(--muted)" }}>
              {e.company} · {e.period}
            </p>
            <p className="mt-6 max-w-md leading-relaxed" style={{ color: "var(--muted)" }}>
              An AI code-generation platform — I own the product surface: APIs, auth, the workspace UI, and the Kubernetes pipeline that ships it.
            </p>
          </Reveal>
        </div>
        <div className="space-y-5">
          {e.bullets.map((b, i) => (
            <Reveal key={i} delay={i * 0.05}>
              <div className="rounded-xl border p-6" style={{ borderColor: "var(--line)", background: "var(--panel)" }}>
                <span className="font-display text-2xl font-bold" style={{ color: "var(--accent)" }}>{String(i + 1).padStart(2, "0")}</span>
                <p className="mt-2 leading-relaxed" style={{ color: "var(--fg)" }}>{b}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ----------------------------- TOOLKIT -------------------------------- */
function Toolkit() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-24">
      <Reveal>
        <h2 className="mb-12 font-display text-4xl font-bold tracking-tight sm:text-5xl" style={{ color: "var(--fg)" }}>Toolkit</h2>
      </Reveal>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {SKILLS[lens].map((g, i) => (
          <Reveal key={g.label} delay={i * 0.04}>
            <div className="rounded-2xl border p-6" style={{ borderColor: "var(--line)", background: "var(--panel)" }}>
              <div className="mono-label mb-3" style={{ color: "var(--accent)" }}>{g.label}</div>
              <div className="flex flex-wrap gap-2">
                {g.items.map((s) => (
                  <span key={s} className="rounded-full border px-3 py-1 font-body text-[13px]" style={{ borderColor: "var(--line)", color: "var(--fg)" }}>{s}</span>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ----------------------------- CONTACT -------------------------------- */
function Contact() {
  return (
    <section id="contact" className="mx-auto max-w-6xl px-5 py-32 text-center">
      <Reveal>
        <span className="mono-label" style={{ color: "var(--accent)" }}>let&apos;s build</span>
        <h2 className="mx-auto mt-4 max-w-3xl font-display text-5xl font-bold leading-[0.95] tracking-tight sm:text-7xl" style={{ color: "var(--fg)" }}>
          Got a product to ship?
        </h2>
        <a
          href={`mailto:${PROFILE.email}`}
          data-cursor
          className="mt-10 inline-block font-display text-2xl underline decoration-1 underline-offset-8 sm:text-4xl"
          style={{ color: "var(--accent)" }}
        >
          {PROFILE.email}
        </a>
        <div className="mt-10 flex items-center justify-center gap-6 font-body text-sm" style={{ color: "var(--muted)" }}>
          <a href={PROFILE.github} target="_blank" rel="noopener noreferrer" className="hover:opacity-70">GitHub</a>
          <a href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer" className="hover:opacity-70">LinkedIn</a>
          <span style={{ color: "var(--faint)" }}>{PROFILE.location}</span>
        </div>
      </Reveal>
    </section>
  );
}

export function FullStackSections() {
  return (
    <>
      <Bento />
      <Story />
      <Toolkit />
      <Contact />
      <footer className="border-t" style={{ borderColor: "var(--line)" }}>
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-5 py-8 font-mono text-[11px] sm:flex-row sm:items-center" style={{ color: "var(--faint)" }}>
          <span>© 2026 {PROFILE.name}</span>
          <span className="sm:ml-auto">designed &amp; built from scratch · next.js · webgl · no template</span>
        </div>
      </footer>
    </>
  );
}
