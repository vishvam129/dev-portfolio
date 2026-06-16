import { useTitle } from "@/lib/useTitle";
import { StatusBar } from "@/components/ai/StatusBar";
import { Hero } from "@/components/ai/Hero";
import { AiSections } from "@/components/ai/sections";

export default function AiPage() {
  useTitle(
    "VISHVAM-1 · AI Developer",
    "VISHVAM-1 — an AI-developer portfolio that behaves like a live model. Vishvam Patel: LLM platforms, vision pipelines, Python, FastAPI, Next.js.",
  );
  return (
    <main data-theme="ai" className="grain min-h-screen" style={{ background: "var(--bg)" }}>
      <StatusBar />
      <Hero />
      <AiSections />
    </main>
  );
}
