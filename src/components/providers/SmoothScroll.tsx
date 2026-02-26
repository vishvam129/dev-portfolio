"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  type ReactNode,
} from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/hooks/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

interface SmoothScrollContextValue {
  lenis: Lenis | null;
}

const SmoothScrollContext = createContext<SmoothScrollContextValue>({
  lenis: null,
});

export function useLenis() {
  return useContext(SmoothScrollContext).lenis;
}

export function SmoothScroll({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const lenis = new Lenis({
      duration: reduced ? 0 : 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    lenisRef.current = lenis;

    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [reduced]);

  return (
    <SmoothScrollContext.Provider value={{ lenis: lenisRef.current }}>
      {children}
    </SmoothScrollContext.Provider>
  );
}
