import { useEffect } from "react";
import { FullStackContent } from "@/components/product/Content";
import { C } from "@/components/product/theme";

export default function FullStackPage() {
  useEffect(() => {
    document.title = "Vishvam Patel — Full-Stack Engineer · shipped";
    window.scrollTo(0, 0);
    const prev = document.body.style.background;
    document.body.style.background = C.bg;
    return () => { document.body.style.background = prev; };
  }, []);
  return <FullStackContent />;
}
