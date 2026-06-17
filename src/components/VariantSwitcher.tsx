import { Link } from "react-router-dom";
import { VARIANTS, type VariantId } from "@/data/variants";

/** Always-visible bar to flip between the four art directions and feel them. */
export function VariantSwitcher({ current }: { current: VariantId }) {
  return (
    <div className="fixed inset-x-0 bottom-5 z-[160] flex justify-center px-4">
      <div className="flex items-center gap-1 rounded-full border p-1.5 shadow-xl backdrop-blur-md"
        style={{ borderColor: "var(--line-2)", background: "color-mix(in srgb, var(--bg) 78%, transparent)" }}>
        <Link to="/" data-hover className="px-2.5 py-1.5 font-mono text-[11px]" style={{ color: "var(--faint)" }}>↤ all</Link>
        {VARIANTS.map((v) => {
          const active = v.id === current;
          return (
            <Link key={v.id} to={`/v/${v.id}`} data-hover
              className="rounded-full px-3.5 py-1.5 font-mono text-[12px] transition-colors"
              style={{
                background: active ? "var(--accent)" : "transparent",
                color: active ? "var(--accent-ink)" : "var(--muted)",
              }}>
              {v.name}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
