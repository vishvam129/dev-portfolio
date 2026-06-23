import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { C, F } from "./theme";

export function Window({
  id, title, x, y, w, h, z, focused, onFocus, onClose, onMin, onMove, children,
}: {
  id: string; title: string; x: number; y: number; w: number; h: number; z: number;
  focused: boolean; onFocus: (id: string) => void; onClose: (id: string) => void; onMin: (id: string) => void;
  onMove: (id: string, x: number, y: number) => void; children: ReactNode;
}) {
  const startDrag = (e: React.PointerEvent) => {
    if ((e.target as HTMLElement).closest("[data-tl]")) return; // don't drag from buttons
    onFocus(id);
    const sx = e.clientX, sy = e.clientY, ox = x, oy = y;
    const move = (ev: PointerEvent) => onMove(id, ox + ev.clientX - sx, oy + ev.clientY - sy);
    const up = () => { window.removeEventListener("pointermove", move); window.removeEventListener("pointerup", up); };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
      onPointerDown={() => onFocus(id)}
      style={{
        position: "absolute", left: x, top: y, width: w, height: h, zIndex: z,
        display: "flex", flexDirection: "column", borderRadius: 14, overflow: "hidden",
        background: C.win, backdropFilter: "blur(26px) saturate(1.4)", WebkitBackdropFilter: "blur(26px) saturate(1.4)",
        border: `1px solid ${focused ? "rgba(255,255,255,0.8)" : C.borderSoft}`,
        boxShadow: focused ? `0 30px 70px -18px ${C.shadow}, 0 0 0 1px ${C.borderSoft}` : `0 14px 40px -16px ${C.shadowSoft}`,
        fontFamily: F.ui, color: C.ink,
      }}>
      {/* title bar */}
      <div onPointerDown={startDrag} style={{ display: "flex", alignItems: "center", gap: 8, height: 38, padding: "0 13px", cursor: "default", background: "rgba(255,255,255,0.35)", borderBottom: `1px solid ${C.borderSoft}`, flexShrink: 0 }}>
        <div style={{ display: "flex", gap: 8 }}>
          <button data-tl onClick={() => onClose(id)} title="close" style={{ width: 12, height: 12, borderRadius: 99, border: "none", cursor: "pointer", background: "#ff5f57" }} />
          <button data-tl onClick={() => onMin(id)} title="minimize" style={{ width: 12, height: 12, borderRadius: 99, border: "none", cursor: "pointer", background: "#febc2e" }} />
          <span style={{ width: 12, height: 12, borderRadius: 99, background: "#28c840", opacity: 0.5 }} />
        </div>
        <span style={{ flex: 1, textAlign: "center", fontSize: 12.5, fontWeight: 600, color: focused ? C.ink : C.faint, marginRight: 44, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{title}</span>
      </div>
      {/* body */}
      <div style={{ flex: 1, minHeight: 0, overflowY: "auto", overflowX: "hidden", background: "rgba(255,255,255,0.32)" }}>{children}</div>
    </motion.div>
  );
}
