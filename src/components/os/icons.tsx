type IconKind = "lendlocal" | "near" | "vrixo" | "about" | "stack" | "terminal" | "contact" | "github";

const GLYPH: Record<IconKind, { bg: string; path: React.ReactNode }> = {
  lendlocal: { bg: "linear-gradient(150deg,#ff9a5a,#ef5a2a)", path: <path d="M12 3a6 6 0 0 0-6 6c0 4.2 6 12 6 12s6-7.8 6-12a6 6 0 0 0-6-6Zm0 8.2A2.2 2.2 0 1 1 12 6.8a2.2 2.2 0 0 1 0 4.4Z" fill="#fff" /> },
  near: { bg: "linear-gradient(150deg,#ff7eb3,#e3496b)", path: <path d="M12 20s-7-4.4-7-9.3A3.7 3.7 0 0 1 12 8a3.7 3.7 0 0 1 7-2.3c0 4.9-7 9.3-7 9.3Z" fill="#fff" /> },
  vrixo: { bg: "linear-gradient(150deg,#9a7bff,#6c3bff)", path: <path d="M12 4l1.7 4.6L18 10l-4.3 1.4L12 16l-1.7-4.6L6 10l4.3-1.4L12 4Z" fill="#fff" /> },
  about: { bg: "linear-gradient(150deg,#5cd0ff,#2b8bff)", path: <path d="M12 12a3.4 3.4 0 1 0 0-6.8A3.4 3.4 0 0 0 12 12Zm0 1.6c-3.2 0-6 1.7-6 3.9V19h12v-1.5c0-2.2-2.8-3.9-6-3.9Z" fill="#fff" /> },
  stack: { bg: "linear-gradient(150deg,#34d6a8,#0fa97e)", path: <path d="M12 3 3 8l9 5 9-5-9-5Zm-7 8.6L12 16l7-4.4 2 1.1-9 5-9-5 2-1.1Z" fill="#fff" /> },
  terminal: { bg: "linear-gradient(150deg,#3b3a45,#16151c)", path: <><path d="M6 8l3 3-3 3" stroke="#7CF6B0" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" /><path d="M12.5 15h5" stroke="#7CF6B0" strokeWidth="1.8" strokeLinecap="round" /></> },
  contact: { bg: "linear-gradient(150deg,#ffc24b,#f59324)", path: <path d="M4 7h16v10H4V7Zm1.6 1.3 6.4 4.2 6.4-4.2" fill="none" stroke="#fff" strokeWidth="1.7" strokeLinejoin="round" /> },
  github: { bg: "linear-gradient(150deg,#3b3a45,#16151c)", path: <path d="M12 4a8 8 0 0 0-2.5 15.6c.4.07.55-.17.55-.38v-1.3c-2.2.48-2.7-1-2.7-1-.36-.92-.9-1.16-.9-1.16-.73-.5.06-.49.06-.49.8.06 1.23.83 1.23.83.72 1.23 1.88.88 2.34.67.07-.52.28-.88.5-1.08-1.75-.2-3.6-.88-3.6-3.9 0-.86.3-1.57.82-2.12-.08-.2-.36-1 .08-2.1 0 0 .67-.21 2.2.81a7.6 7.6 0 0 1 4 0c1.53-1.02 2.2-.81 2.2-.81.44 1.1.16 1.9.08 2.1.5.55.82 1.26.82 2.12 0 3.03-1.85 3.7-3.61 3.9.29.24.54.72.54 1.46v2.16c0 .21.15.45.55.38A8 8 0 0 0 12 4Z" fill="#fff" /> },
};

export function AppIcon({ kind, size = 46, radius }: { kind: IconKind; size?: number; radius?: number }) {
  const g = GLYPH[kind];
  return (
    <div style={{ width: size, height: size, borderRadius: radius ?? size * 0.27, background: g.bg, display: "grid", placeItems: "center", boxShadow: "inset 0 1px 0 rgba(255,255,255,0.35), 0 5px 14px rgba(28,18,60,0.22)" }}>
      <svg width={size * 0.56} height={size * 0.56} viewBox="0 0 24 24">{g.path}</svg>
    </div>
  );
}

export type { IconKind };
