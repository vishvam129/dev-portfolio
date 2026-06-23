import { useEffect } from "react";
import { TopNav } from "@/components/studio/TopNav";
import { Hero } from "@/components/studio/Hero";
import { Projects } from "@/components/studio/Projects";
import { Sections } from "@/components/studio/Sections";
import { C, F } from "@/components/studio/theme";

export default function FullStackPage() {
  useEffect(() => {
    document.title = "Vishvam Patel — Full-Stack Engineer · the studio";
    window.scrollTo(0, 0);
    const prevBg = document.body.style.background;
    document.body.style.background = C.bg;
    return () => { document.body.style.background = prevBg; };
  }, []);

  return (
    <main style={{ background: C.bg, color: C.ink, fontFamily: F.body, minHeight: "100svh", overflowX: "hidden" }}>
      <TopNav />
      <Hero />
      <Projects />
      <Sections />
    </main>
  );
}
