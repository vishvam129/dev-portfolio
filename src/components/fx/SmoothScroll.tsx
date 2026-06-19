import { useEffect } from "react";
import Lenis from "lenis";

let lenisInstance: Lenis | null = null;
export const getLenis = () => lenisInstance;

/** Buttery momentum scrolling (Lenis). Also smooths in-page #anchor clicks. */
export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ lerp: 0.09, wheelMultiplier: 1, smoothWheel: true });
    lenisInstance = lenis;
    let raf = 0;
    const loop = (t: number) => { lenis.raf(t); raf = requestAnimationFrame(loop); };
    raf = requestAnimationFrame(loop);

    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement)?.closest?.('a[href^="#"]') as HTMLAnchorElement | null;
      if (!a) return;
      const id = a.getAttribute("href")!.slice(1);
      if (!id) return;
      const target = document.getElementById(id);
      if (!target) return;
      e.preventDefault();
      lenis.scrollTo(target, { offset: -80, duration: 1.1 });
    };
    document.addEventListener("click", onClick);

    return () => { cancelAnimationFrame(raf); document.removeEventListener("click", onClick); lenis.destroy(); lenisInstance = null; };
  }, []);
  return null;
}
