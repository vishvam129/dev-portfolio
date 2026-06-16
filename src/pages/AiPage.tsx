import { useEffect } from "react";
import { TopBar } from "@/components/ai/TopBar";
import { Hero } from "@/components/ai/Hero";
import { VisionSandbox } from "@/components/ai/VisionSandbox";
import { AiSections } from "@/components/ai/sections";

export default function AiPage() {
  useEffect(() => {
    document.title = "Vishvam Patel — AI Engineer · runs ML in your browser";
  }, []);
  return (
    <main className="min-h-screen" style={{ background: "var(--bg)" }}>
      <TopBar />
      <Hero />
      <VisionSandbox />
      <AiSections />
    </main>
  );
}
