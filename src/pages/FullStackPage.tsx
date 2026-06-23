import { useEffect } from "react";
import { TopNav } from "@/components/split/TopNav";
import { Hero, Sections } from "@/components/split/Sections";
import { C, F } from "@/components/split/theme";

export default function FullStackPage() {
  useEffect(() => {
    document.title = "Vishvam Patel — Full-Stack Engineer · split-stack";
    window.scrollTo(0, 0);
    const prev = document.body.style.background;
    document.body.style.background = C.bg;
    return () => { document.body.style.background = prev; };
  }, []);

  return (
    <main style={{ background: C.bg, color: C.fg, fontFamily: F.body, minHeight: "100svh", overflowX: "hidden" }}>
      <TopNav />
      <Hero />
      <Sections />
    </main>
  );
}
