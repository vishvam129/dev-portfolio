import { useEffect } from "react";
import { Desktop } from "@/components/os/Desktop";

export default function FullStackPage() {
  useEffect(() => {
    document.title = "Vishvam Patel — Full-Stack Engineer · vishOS";
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, []);
  return <Desktop />;
}
