import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";
import type { Service } from "@/data/backend";

const RW = 1.06, RH = 2.0, RD = 0.92;
const BASE_H = 0.08;
const BODY_BOT = BASE_H, BODY_TOP = BASE_H + RH;
const U = 12;
const STATUS: Record<string, string> = { ok: "#36e2a4", warn: "#ffb454" };

type Emit = { x: number; y: number; z: number; w: number; h: number; color: string; base: number; speed: number; phase: number; blink: boolean; revealAt?: number };

function makeRng(seed: number) {
  let s = seed % 233280 || 1;
  return () => { s = (s * 9301 + 49297) % 233280; return s / 233280; };
}

export function Rack({
  service, position, interactive = true, dim = false, selected = false, hovered = false,
  onHover, onSelect,
}: {
  service?: Service; position: [number, number, number];
  interactive?: boolean; dim?: boolean; selected?: boolean; hovered?: boolean;
  onHover?: (id: string | null) => void; onSelect?: (id: string) => void;
}) {
  const group = useRef<THREE.Group>(null);
  const ledRefs = useRef<THREE.MeshStandardMaterial[]>([]);
  const ringRef = useRef<THREE.Mesh>(null);
  const detailed = interactive && !dim;
  const accent = service ? STATUS[service.status] : "#2a3a44";

  // calm, evenly-spaced status-light column — one indicator per rack unit
  const emitters = useMemo<Emit[]>(() => {
    const out: Emit[] = [];
    const fz = RD / 2;
    const slotH = (RH - 0.42) / U;
    const yTop = BODY_TOP - 0.30;
    const seed = (service?.id ?? "deco").split("").reduce((a, c) => a + c.charCodeAt(0), Math.round(position[0] * 13 + position[2] * 7));
    const rng = makeRng(seed);

    if (detailed) {
      // emissive nameplate
      out.push({ x: -RW * 0.16, y: BODY_TOP - 0.15, z: fz + 0.016, w: RW * 0.4, h: 0.05, color: accent, base: 0.7, speed: 0.4, phase: 1, blink: false });
      // single top status dot
      out.push({ x: RW / 2 - 0.1, y: BODY_TOP - 0.08, z: fz + 0.02, w: 0.04, h: 0.04, color: "#36e2a4", base: 1.5, speed: 1.4, phase: 0, blink: false });
    }
    for (let i = 0; i < U; i++) {
      const y = yTop - i * slotH;
      const r = rng();
      const color = dim ? "#1f6b53" : r > 0.86 ? accent : r > 0.7 ? "#39d0d8" : "#36e2a4";
      out.push({ x: -RW * 0.36, y, z: fz + 0.04, w: 0.05, h: 0.05, color, base: dim ? 0.45 : 1.15, speed: 0.8 + rng() * 1.6, phase: rng() * 6.28, blink: !dim && r > 0.88 });
    }
    // power-on cascade: racks sweep on left→right, LEDs bottom→top
    const base = 0.55 + Math.max(0, position[0] + 3) * 0.1;
    out.forEach((e) => { e.revealAt = base + (e.y - BODY_BOT) * 0.16; });
    return out;
  }, [service?.id, accent, dim, detailed, position]);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    for (let i = 0; i < ledRefs.current.length; i++) {
      const m = ledRefs.current[i]; if (!m) continue;
      const e = emitters[i]; if (!e) continue;
      const ra = e.revealAt ?? 0;
      if (t < ra) { m.emissiveIntensity = 0.02; continue; }   // not powered yet
      if (t - ra < 0.16) { m.emissiveIntensity = e.base + 1.8; continue; } // power-on flash
      m.emissiveIntensity = e.blink
        ? (Math.sin(t * e.speed + e.phase) > 0.2 ? e.base + 0.8 : e.base * 0.2)
        : e.base + Math.sin(t * e.speed * 0.5 + e.phase) * 0.22;
    }
    if (group.current) {
      const s = hovered || selected ? 1.035 : 1;
      group.current.scale.lerp(new THREE.Vector3(s, s, s), 0.15);
    }
    if (ringRef.current) {
      const mat = ringRef.current.material as THREE.MeshBasicMaterial;
      const want = selected ? 0.9 : hovered ? 0.4 : 0;
      mat.opacity += (want - mat.opacity) * 0.2;
      ringRef.current.rotation.z = t * 0.3;
    }
  });

  const metalDark = dim ? "#0f151b" : "#1b242d";
  const slotH = (RH - 0.42) / U;
  const yTop = BODY_TOP - 0.30;

  return (
    <group position={position}>
      {/* floor selection ring */}
      <mesh ref={ringRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, RD / 2]}>
        <ringGeometry args={[0.86, 0.97, 48]} />
        <meshBasicMaterial color={accent} transparent opacity={0} toneMapped={false} side={THREE.DoubleSide} />
      </mesh>

      <group
        ref={group}
        onPointerOver={interactive ? (e) => { e.stopPropagation(); onHover?.(service!.id); document.body.style.cursor = "pointer"; } : undefined}
        onPointerOut={interactive ? (e) => { e.stopPropagation(); onHover?.(null); document.body.style.cursor = "auto"; } : undefined}
        onClick={interactive ? (e) => { e.stopPropagation(); onSelect?.(service!.id); } : undefined}
      >
        {/* base plinth */}
        <mesh position={[0, BASE_H / 2, 0]} castShadow receiveShadow>
          <boxGeometry args={[RW + 0.05, BASE_H, RD + 0.03]} />
          <meshStandardMaterial color="#0a0e13" metalness={0.6} roughness={0.55} />
        </mesh>

        {/* chassis */}
        <mesh position={[0, BODY_BOT + RH / 2, 0]} castShadow receiveShadow>
          <boxGeometry args={[RW, RH, RD]} />
          <meshStandardMaterial color={metalDark} metalness={0.72} roughness={0.4} />
        </mesh>

        {/* clean front face */}
        <mesh position={[0, BODY_BOT + RH / 2, RD / 2 + 0.01]}>
          <boxGeometry args={[RW * 0.92, RH * 0.96, 0.02]} />
          <meshStandardMaterial color={dim ? "#0c1116" : "#0e141a"} metalness={0.55} roughness={0.5} />
        </mesh>

        {/* mounting rails (subtle vertical edges) */}
        {detailed && [-1, 1].map((s) => (
          <mesh key={s} position={[s * (RW / 2 - 0.03), BODY_BOT + RH / 2, RD / 2 + 0.02]} castShadow>
            <boxGeometry args={[0.045, RH * 0.94, 0.04]} />
            <meshStandardMaterial color="#39434e" metalness={0.85} roughness={0.32} />
          </mesh>
        ))}

        {/* thin rack-unit seam lines — quiet rhythm, no clutter */}
        {Array.from({ length: U - 1 }).map((_, i) => (
          <mesh key={i} position={[0, yTop - i * slotH - slotH / 2, RD / 2 + 0.022]}>
            <boxGeometry args={[RW * 0.86, 0.006, 0.006]} />
            <meshStandardMaterial color="#05080a" metalness={0.3} roughness={0.9} />
          </mesh>
        ))}

        {/* top cap */}
        <mesh position={[0, BODY_TOP - 0.05, 0]} castShadow>
          <boxGeometry args={[RW + 0.01, 0.1, RD + 0.01]} />
          <meshStandardMaterial color={dim ? "#0c1116" : "#161e26"} metalness={0.75} roughness={0.38} />
        </mesh>

        {/* status lights + nameplate */}
        {emitters.map((e, i) => (
          <mesh key={i} position={[e.x, e.y, e.z]}>
            <boxGeometry args={[e.w, e.h, 0.02]} />
            <meshStandardMaterial
              ref={(m) => { if (m) ledRefs.current[i] = m as THREE.MeshStandardMaterial; }}
              color={e.color} emissive={e.color} emissiveIntensity={e.base} toneMapped={false} />
          </mesh>
        ))}

        {/* floating label */}
        {detailed && service && (
          <Html position={[0, BODY_TOP + 0.26, 0]} center distanceFactor={9} zIndexRange={[10, 0]} style={{ pointerEvents: "none", userSelect: "none", whiteSpace: "nowrap", textAlign: "center", transition: "transform 0.2s", transform: `scale(${hovered || selected ? 1.08 : 1})` }}>
            <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: 16, letterSpacing: "-0.01em", color: hovered || selected ? accent : "#cfdbe4", textShadow: "0 2px 12px rgba(0,0,0,0.9)" }}>{service.project}</div>
          </Html>
        )}
      </group>
    </group>
  );
}
