"use client";

import { useEffect, useState } from "react";
import { PROFILE } from "@/data/content";

/** Live clock in the subject's timezone. Returns "" until mounted (SSR-safe). */
export function useClock(): string {
  const [now, setNow] = useState<string>("");
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", {
      timeZone: PROFILE.timezone,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });
    const tick = () => setNow(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return now;
}
