import { useEffect } from "react";
import { MissionControl } from "@/components/backend/MissionControl";

export default function BackendPage() {
  useEffect(() => {
    document.title = "Vishvam Patel — Backend Engineer · mission control";
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden"; // app-shell owns its own scroll
    return () => { document.body.style.overflow = prev; };
  }, []);
  return <MissionControl />;
}
