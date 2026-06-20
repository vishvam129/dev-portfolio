import { useState } from "react";
import { useLiveLog } from "@/lib/useLiveLog";
import { Panel } from "./Panel";
import { LogConsole } from "./LogConsole";

const LEVELS = ["ALL", "INFO", "WARN", "ERR"] as const;

export function LogsView() {
  const lines = useLiveLog(120, 650);
  const [lvl, setLvl] = useState<(typeof LEVELS)[number]>("ALL");
  const shown = lvl === "ALL" ? lines : lines.filter((l) => l.level === lvl);
  return (
    <div className="flex h-full flex-col p-4">
      <Panel title="logs · all services" dot="var(--accent-2)" pad={false} className="min-h-0 flex-1"
        meta={
          <span className="flex items-center gap-1.5">
            {LEVELS.map((L) => (
              <button key={L} onClick={() => setLvl(L)} className="rounded px-1.5 py-0.5 transition-colors"
                style={{ color: lvl === L ? "var(--accent-ink)" : "var(--muted)", background: lvl === L ? "var(--accent)" : "transparent" }}>{L}</button>
            ))}
          </span>
        }>
        <LogConsole lines={shown} />
      </Panel>
    </div>
  );
}
