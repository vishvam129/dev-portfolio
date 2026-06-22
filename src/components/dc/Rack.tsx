import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";
import type { Service } from "@/data/backend";

const RW = 1.06, RH = 2.0, RD = 0.92;
const BASE_H = 0.08;
const BODY_BOT = BASE_H, BODY_TOP = BASE_H + RH;
const U = 14;
const STATUS: Record<string, string> = { ok: "#36e2a4", warn: "#ffb454" };

type Emit = { x: number; y: number; z: number; w: number; h: number; color: string; base: number; speed: number; phase: number; blink: boolean };
type Panel = { x: number; y: number; z: number; w: number; h: number; d: number; color: string; metal: number; rough: number };

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

  const { emitters, panels } = useMemo(() => {
    const emitters: Emit[] = [];
    const panels: Panel[] = [];
    const seed = (service?.id ?? "deco").split("").reduce((a, c) => a + c.charCodeAt(0), Math.round(position[0] * 13 + position[2] * 7));
    const rng = makeRng(seed);
    const fz = RD / 2;
    const slotH = (RH - 0.4) / U;
    const yTop = BODY_TOP - 0.26;

    if (detailed) {
      // emissive nameplate strip
      emitters.push({ x: -RW * 0.16, y: BODY_TOP - 0.14, z: fz + 0.016, w: RW * 0.42, h: 0.045, color: accent, base: 0.8, speed: 0.5, phase: 1, blink: false });
      // top-of-rack status LEDs
      emitters.push({ x: RW / 2 - 0.13, y: BODY_TOP - 0.07, z: fz + 0.02, w: 0.04, h: 0.04, color: "#36e2a4", base: 1.7, speed: 1.6, phase: 0, blink: false });
      emitters.push({ x: RW / 2 - 0.06, y: BODY_TOP - 0.07, z: fz + 0.02, w: 0.04, h: 0.04, color: accent, base: 1.3, speed: 3.2, phase: 2, blink: true });
    }

    for (let i = 0; i < U; i++) {
      const y = yTop - i * slotH;
      const r = rng();
      const type = !detailed ? "server" : i === 0 ? "display" : r < 0.2 ? "switch" : r < 0.36 ? "patch" : r < 0.5 ? "blank" : "server";

      // unit face panel
      panels.push({ x: 0, y, z: fz + 0.02, w: RW * 0.9, h: slotH * 0.84, d: 0.05, color: dim ? "#0c1116" : "#10161c", metal: 0.55, rough: 0.5 });

      if (type === "switch") {
        const ports = 11;
        for (let p = 0; p < ports; p++) {
          const on = rng() > 0.35;
          emitters.push({ x: -RW * 0.36 + p * (RW * 0.66 / (ports - 1)), y: y + slotH * 0.12, z: fz + 0.05, w: 0.03, h: 0.022, color: on ? "#36e2a4" : "#1b6", base: on ? 1.6 : 0.25, speed: 4 + rng() * 6, phase: rng() * 6.28, blink: rng() > 0.4 });
        }
        panels.push({ x: 0, y: y - slotH * 0.16, z: fz + 0.045, w: RW * 0.8, h: slotH * 0.3, d: 0.01, color: "#05080a", metal: 0.3, rough: 0.9 });
      } else if (type === "patch") {
        const ports = 12;
        for (let p = 0; p < ports; p++) {
          panels.push({ x: -RW * 0.37 + p * (RW * 0.68 / (ports - 1)), y, z: fz + 0.05, w: 0.04, h: slotH * 0.4, d: 0.012, color: "#04070a", metal: 0.2, rough: 1 });
          if (rng() > 0.55) emitters.push({ x: -RW * 0.37 + p * (RW * 0.68 / (ports - 1)), y: y + slotH * 0.22, z: fz + 0.055, w: 0.016, h: 0.012, color: "#36e2a4", base: 1.2, speed: 5 + rng() * 5, phase: rng() * 6, blink: true });
        }
      } else if (type === "display") {
        // mini status screen
        panels.push({ x: -RW * 0.2, y, z: fz + 0.045, w: RW * 0.42, h: slotH * 0.62, d: 0.012, color: "#06121a", metal: 0.1, rough: 0.4 });
        emitters.push({ x: -RW * 0.2, y, z: fz + 0.052, w: RW * 0.4, h: slotH * 0.56, color: accent, base: 0.32, speed: 0.8, phase: 0.5, blink: false });
        for (let b = 0; b < 6; b++) {
          const bh = (0.3 + rng() * 0.7) * slotH * 0.4;
          emitters.push({ x: -RW * 0.34 + b * 0.05, y: y - slotH * 0.2 + bh / 2, z: fz + 0.058, w: 0.03, h: bh, color: b % 2 ? "#39d0d8" : "#36e2a4", base: 1.4, speed: 1 + b * 0.4, phase: b, blink: false });
        }
        // a couple of indicator LEDs on the right
        emitters.push({ x: RW * 0.32, y: y + slotH * 0.12, z: fz + 0.05, w: 0.03, h: 0.03, color: accent, base: 1.6, speed: 2.5, phase: 1, blink: true });
      } else if (type === "blank") {
        // blanking panel + two screws
        for (const sx of [-RW * 0.4, RW * 0.4]) panels.push({ x: sx, y, z: fz + 0.045, w: 0.05, h: 0.05, d: 0.01, color: "#2c3742", metal: 0.85, rough: 0.3 });
      } else {
        // server blade: vent + handle tabs + status LEDs
        panels.push({ x: RW * 0.16, y, z: fz + 0.045, w: RW * 0.42, h: slotH * 0.42, d: 0.012, color: "#05080a", metal: 0.3, rough: 0.95 });
        for (const sx of [-RW * 0.42, -RW * 0.3]) panels.push({ x: sx, y, z: fz + 0.05, w: 0.022, h: slotH * 0.5, d: 0.03, color: "#39434e", metal: 0.85, rough: 0.35 });
        const n = dim ? 1 : 2;
        for (let k = 0; k < n; k++) {
          const rr = rng();
          const color = dim ? "#1f6b53" : rr > 0.8 ? "#39d0d8" : rr > 0.5 ? "#36e2a4" : accent;
          emitters.push({ x: -RW * 0.12 + k * 0.07, y, z: fz + 0.05, w: 0.032, h: 0.032, color, base: dim ? 0.5 : 1.5, speed: 1 + rng() * 5, phase: rng() * 6.28, blink: rng() > 0.65 });
        }
      }
    }
    return { emitters, panels };
  }, [service?.id, accent, dim, detailed, position]);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    for (let i = 0; i < ledRefs.current.length; i++) {
      const m = ledRefs.current[i]; if (!m) continue;
      const e = emitters[i]; if (!e) continue;
      m.emissiveIntensity = e.blink
        ? (Math.sin(t * e.speed + e.phase) > 0.25 ? e.base + 1.0 : e.base * 0.12 + 0.05)
        : e.base + Math.sin(t * e.speed * 0.5 + e.phase) * 0.35;
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

        {/* front bezel recess */}
        <mesh position={[0, BODY_BOT + RH / 2, RD / 2 + 0.004]}>
          <boxGeometry args={[RW * 0.95, RH * 0.985, 0.02]} />
          <meshStandardMaterial color="#070a0d" metalness={0.5} roughness={0.7} />
        </mesh>

        {/* mounting rails (19" ears) */}
        {detailed && [-1, 1].map((s) => (
          <mesh key={s} position={[s * (RW / 2 - 0.035), BODY_BOT + RH / 2, RD / 2 + 0.01]} castShadow>
            <boxGeometry args={[0.05, RH * 0.96, 0.05]} />
            <meshStandardMaterial color="#39434e" metalness={0.85} roughness={0.32} />
          </mesh>
        ))}

        {/* top cap + vents */}
        <mesh position={[0, BODY_TOP - 0.05, 0]} castShadow>
          <boxGeometry args={[RW + 0.01, 0.1, RD + 0.01]} />
          <meshStandardMaterial color={dim ? "#0c1116" : "#161e26"} metalness={0.75} roughness={0.38} />
        </mesh>
        {detailed && Array.from({ length: 7 }).map((_, i) => (
          <mesh key={i} position={[-RW * 0.3 + i * (RW * 0.6 / 6), BODY_TOP - 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <boxGeometry args={[0.02, RD * 0.7, 0.005]} />
            <meshStandardMaterial color="#05080a" metalness={0.3} roughness={0.9} />
          </mesh>
        ))}

        {/* static module panels */}
        {panels.map((p, i) => (
          <mesh key={i} position={[p.x, p.y, p.z]}>
            <boxGeometry args={[p.w, p.h, p.d]} />
            <meshStandardMaterial color={p.color} metalness={p.metal} roughness={p.rough} />
          </mesh>
        ))}

        {/* emissive elements (LEDs / screens) */}
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
          <Html position={[0, BODY_TOP + 0.28, 0]} center distanceFactor={9} zIndexRange={[10, 0]} style={{ pointerEvents: "none", userSelect: "none", whiteSpace: "nowrap", textAlign: "center", transition: "transform 0.2s", transform: `scale(${hovered || selected ? 1.08 : 1})` }}>
            <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: 17, letterSpacing: "-0.01em", color: hovered || selected ? accent : "#dcebf4", textShadow: "0 2px 12px rgba(0,0,0,0.9)" }}>{service.project}</div>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10.5, color: "#7d8c99", marginTop: 2 }}>{service.name} · {service.uptime}%</div>
          </Html>
        )}
      </group>
    </group>
  );
}
