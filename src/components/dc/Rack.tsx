import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";
import type { Service } from "@/data/backend";

const RW = 1.06, RH = 2.0, RD = 0.92;       // rack outer dims
const U = 14;                                 // rack units
const STATUS: Record<string, string> = { ok: "#36e2a4", warn: "#ffb454" };

type Led = { x: number; y: number; color: string; speed: number; phase: number; blink: boolean };

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
  const accent = service ? STATUS[service.status] : "#2a3a44";

  // deterministic LED layout per unit
  const leds = useMemo<Led[]>(() => {
    const out: Led[] = [];
    const top = RH / 2 - 0.12, gap = (RH - 0.24) / U;
    let seed = (service?.id ?? "d").split("").reduce((a, c) => a + c.charCodeAt(0), position[0] * 7);
    const rng = () => { seed = (seed * 9301 + 49297) % 233280; return seed / 233280; };
    for (let i = 0; i < U; i++) {
      const y = top - i * gap;
      const n = 2 + Math.floor(rng() * 2);
      for (let k = 0; k < n; k++) {
        const r = rng();
        const color = dim ? "#1f6b53" : r > 0.82 ? "#39d0d8" : r > 0.6 ? "#ffffff" : accent;
        out.push({ x: -RW / 2 + 0.12 + k * 0.12, y, color, speed: 1 + rng() * 5, phase: rng() * 6.28, blink: rng() > 0.7 });
      }
    }
    return out;
  }, [service?.id, accent, dim, position]);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    for (let i = 0; i < ledRefs.current.length; i++) {
      const m = ledRefs.current[i]; if (!m) continue;
      const l = leds[i];
      const base = dim ? 0.5 : 1.4;
      const v = l.blink
        ? (Math.sin(t * l.speed + l.phase) > 0.3 ? base + 1.2 : 0.15)
        : base + Math.sin(t * l.speed * 0.5 + l.phase) * 0.5;
      m.emissiveIntensity = v;
    }
    if (group.current) {
      const target = hovered || selected ? 1.04 : 1;
      group.current.scale.lerp(new THREE.Vector3(target, target, target), 0.15);
    }
    if (ringRef.current) {
      const mat = ringRef.current.material as THREE.MeshBasicMaterial;
      const want = selected ? 0.9 : hovered ? 0.4 : 0;
      mat.opacity += (want - mat.opacity) * 0.2;
      ringRef.current.rotation.z = t * 0.3;
    }
  });

  const unitTop = RH / 2 - 0.12, gap = (RH - 0.24) / U;
  let ledIdx = -1;

  return (
    <group position={position}>
      {/* floor selection ring */}
      <mesh ref={ringRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, RD / 2]}>
        <ringGeometry args={[0.85, 0.96, 48]} />
        <meshBasicMaterial color={accent} transparent opacity={0} toneMapped={false} side={THREE.DoubleSide} />
      </mesh>

      <group
        ref={group}
        onPointerOver={interactive ? (e) => { e.stopPropagation(); onHover?.(service!.id); document.body.style.cursor = "pointer"; } : undefined}
        onPointerOut={interactive ? (e) => { e.stopPropagation(); onHover?.(null); document.body.style.cursor = "auto"; } : undefined}
        onClick={interactive ? (e) => { e.stopPropagation(); onSelect?.(service!.id); } : undefined}
      >
        {/* chassis */}
        <mesh castShadow receiveShadow position={[0, RH / 2, 0]}>
          <boxGeometry args={[RW, RH, RD]} />
          <meshStandardMaterial color={dim ? "#10161c" : "#1a242d"} metalness={0.5} roughness={0.55} />
        </mesh>
        {/* front bezel (slightly proud, darker) */}
        <mesh position={[0, RH / 2, RD / 2 + 0.005]}>
          <boxGeometry args={[RW * 0.96, RH * 0.98, 0.02]} />
          <meshStandardMaterial color="#080b0e" metalness={0.7} roughness={0.6} />
        </mesh>

        {/* rack units */}
        {Array.from({ length: U }).map((_, i) => {
          const y = unitTop - i * gap;
          return (
            <group key={i} position={[0, y, RD / 2 + 0.02]}>
              <mesh>
                <boxGeometry args={[RW * 0.9, gap * 0.78, 0.05]} />
                <meshStandardMaterial color="#0d1318" metalness={0.6} roughness={0.5} />
              </mesh>
              {/* vent slot */}
              <mesh position={[RW * 0.22, 0, 0.03]}>
                <boxGeometry args={[RW * 0.4, gap * 0.34, 0.012]} />
                <meshStandardMaterial color="#05080a" metalness={0.4} roughness={0.9} />
              </mesh>
            </group>
          );
        })}

        {/* LEDs */}
        {leds.map((l, i) => {
          ledIdx = i;
          return (
            <mesh key={i} position={[l.x, l.y, RD / 2 + 0.055]}>
              <boxGeometry args={[0.052, 0.05, 0.025]} />
              <meshStandardMaterial
                ref={(m) => { if (m) ledRefs.current[ledIdx] = m; }}
                color={l.color} emissive={l.color} emissiveIntensity={1} toneMapped={false} />
            </mesh>
          );
        })}

        {/* label */}
        {interactive && service && (
          <Html position={[0, RH + 0.28, 0]} center distanceFactor={9} zIndexRange={[10, 0]} style={{ pointerEvents: "none", userSelect: "none", whiteSpace: "nowrap", textAlign: "center", transition: "transform 0.2s", transform: `scale(${hovered || selected ? 1.08 : 1})` }}>
            <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: 17, letterSpacing: "-0.01em", color: hovered || selected ? accent : "#dcebf4", textShadow: "0 2px 12px rgba(0,0,0,0.9)" }}>{service.project}</div>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10.5, color: "#7d8c99", marginTop: 2 }}>{service.name} · {service.uptime}%</div>
          </Html>
        )}
      </group>
    </group>
  );
}
