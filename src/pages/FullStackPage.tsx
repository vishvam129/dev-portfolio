import { useTitle } from "@/lib/useTitle";
import { Hero } from "@/components/fullstack/Hero";
import { VelocityText } from "@/components/fullstack/VelocityText";
import { FullStackSections } from "@/components/fullstack/sections";
import { Cursor } from "@/components/fullstack/Cursor";

export default function FullStackPage() {
  useTitle(
    "Full-Stack Developer · The Product",
    "Vishvam Patel — full-stack engineer. Ships products end-to-end: Next.js, React, FastAPI, Postgres, Stripe. Backend to pixel, idea to production.",
  );
  return (
    <main data-theme="fullstack" className="grain min-h-screen" style={{ background: "var(--bg)" }}>
      <Cursor />
      <Hero />
      <VelocityText text="React · Next.js · FastAPI · TypeScript · Postgres · Stripe" />
      <FullStackSections />
    </main>
  );
}
