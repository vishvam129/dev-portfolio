import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, RoundedBox, Edges, Html, Sparkles, MeshReflectorMaterial } from "@react-three/drei";
import { EffectComposer, Bloom, Vignette, DepthOfField } from "@react-three/postprocessing";
import * as THREE from "three";
import { C, F, LAYERS, PROJECT_LAYERS } from "./theme";

const TOP = LAYERS[0].y, BOT = LAYERS[LAYERS.length - 1].y;
const LAT = [0, 6, 14, 24, 38, 9]; // per-layer latency (ms), cosmetic

function LayerMesh({ i, def, tech, lat, side, showLat, selected, registerMat, registerGroup, onHover, onSelect }:
  { i: number; def: (typeof LAYERS)[number]; tech: string; lat: number; side: number; showLat: boolean; selected: boolean;
    registerMat: (i: number, m: THREE.MeshStandardMaterial) => void; registerGroup: (i: number, g: THREE.Group) => void; onHover: (id: string | null) => void; onSelect: (id: string | null) => void }) {
  return (
    <group ref={(g) => g && registerGroup(i, g)} position={[0, def.y, 0]}>
      <RoundedBox args={[4.3, 0.18, 2.7]} radius={0.08} smoothness={3}
        onClick={(e) => { e.stopPropagation(); onSelect(selected ? null : def.id); }}
        onPointerOver={(e) => { e.stopPropagation(); onHover(def.id); document.body.style.cursor = "pointer"; }}
        onPointerOut={(e) => { e.stopPropagation(); onHover(null); document.body.style.cursor = "auto"; }}>
        <meshStandardMaterial ref={(m) => m && registerMat(i, m as THREE.MeshStandardMaterial)} color={def.color} emissive={def.color} emissiveIntensity={1.2} transparent opacity={0.5} metalness={0.15} roughness={0.22} toneMapped={false} />
        <Edges threshold={15} color={def.color} />
      </RoundedBox>
      {[-1.4, 0, 1.4].map((x) => (
        <mesh key={x} position={[x, 0.12, 0.7]}><sphereGeometry args={[0.05, 10, 10]} /><meshStandardMaterial color="#fff" emissive={def.color} emissiveIntensity={2.4} toneMapped={false} /></mesh>
      ))}
      <Html position={[side * 2.55, 0, 0]} center distanceFactor={11} zIndexRange={[8, 0]} style={{ pointerEvents: "none", userSelect: "none", textAlign: side > 0 ? "left" : "right", width: 220, transform: `translateX(${side > 0 ? "0" : "-100%"})` }}>
        <div style={{ fontFamily: F.display, fontWeight: 600, fontSize: 17, color: "#fff", textShadow: `0 2px 14px ${def.color}, 0 1px 4px #000` }}>{def.label}</div>
        <div style={{ fontFamily: F.mono, fontSize: 10.5, color: def.color, marginTop: 2, textShadow: "0 1px 4px #000" }}>
          {tech}{showLat && lat > 0 ? <span style={{ color: C.sub }}> · {lat}ms</span> : null}
        </div>
      </Html>
    </group>
  );
}

function Flow({ mats, groups, packet, runRef, project, hoverRef, selected }:
  { mats: React.MutableRefObject<THREE.MeshStandardMaterial[]>; groups: React.MutableRefObject<THREE.Group[]>; packet: React.RefObject<THREE.Mesh | null>; runRef: React.MutableRefObject<number>; project: string | null; hoverRef: React.MutableRefObject<string | null>; selected: string | null }) {
  const last = useRef(0); const start = useRef(-99);
  useFrame((s) => {
    const t = s.clock.elapsedTime;
    if (runRef.current !== last.current) { last.current = runRef.current; start.current = t; }
    const since = t - start.current;
    const DUR = 2.4;
    const running = since < DUR;

    // ---- assembly on load: layers ease into place, staggered top→bottom ----
    let py = TOP + 1;
    if (running) {
      const p = since / DUR;
      py = p < 0.5 ? THREE.MathUtils.lerp(TOP, BOT, p / 0.5) : THREE.MathUtils.lerp(BOT, TOP, (p - 0.5) / 0.5);
      if (packet.current) { packet.current.visible = true; packet.current.position.y = py; const m = packet.current.material as THREE.MeshStandardMaterial; const c = p < 0.5 ? "#ffffff" : C.ok; m.color.set(c); m.emissive.set(c); }
    } else if (packet.current) {
      const a = (t * 0.16) % 1; py = THREE.MathUtils.lerp(TOP, BOT, a);
      packet.current.position.y = py; packet.current.visible = true;
      const m = packet.current.material as THREE.MeshStandardMaterial; m.color.set("#cfe0ff"); m.emissive.set("#cfe0ff");
    }

    for (let i = 0; i < LAYERS.length; i++) {
      const m = mats.current[i], g = groups.current[i];
      const reveal = Math.max(0, Math.min(1, (t - 0.85 - i * 0.13) / 0.7)); // assembly progress
      if (g) g.position.y = LAYERS[i].y - (1 - reveal) * 1.1;
      if (!m) continue;
      const ly = LAYERS[i].y;
      const wave = (running ? 2.8 : 0.9) * Math.exp(-(((ly - py) / 0.85) ** 2));
      const isSel = selected === LAYERS[i].id;
      const hov = hoverRef.current === LAYERS[i].id ? 1.3 : 0;
      const sel = isSel ? 1.6 : selected ? -0.55 : 0;   // focus the selected layer, dim the rest
      m.emissiveIntensity = Math.max(0.05, (1.25 + wave + hov + sel + (project ? 0.25 : 0)) * (0.15 + 0.85 * reveal));
      m.opacity = Math.max(0.06, (0.52 + Math.min(0.4, wave * 0.16) + (hoverRef.current === LAYERS[i].id ? 0.2 : 0) + (isSel ? 0.25 : selected ? -0.2 : 0)) * reveal);
    }
  });
  return null;
}

function Rig({ targetY }: { targetY: number }) {
  useFrame((s) => {
    const c = s.controls as unknown as { target?: THREE.Vector3 } | null;
    if (c?.target) c.target.y += (targetY - c.target.y) * 0.05;
  });
  return null;
}

function Floor() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, BOT - 1.7, 0]}>
      <planeGeometry args={[60, 60]} />
      <MeshReflectorMaterial resolution={1024} mixBlur={1} mixStrength={18} blur={[300, 90]} roughness={0.85} depthScale={1.1} minDepthThreshold={0.4} maxDepthThreshold={1.3} color="#05050b" metalness={0.6} mirror={0} />
    </mesh>
  );
}

export function StackScene({ project, selected, runRef, hoverRef, onHover, onSelect, paused = false }:
  { project: string | null; selected: string | null; runRef: React.MutableRefObject<number>; hoverRef: React.MutableRefObject<string | null>; onHover: (id: string | null) => void; onSelect: (id: string | null) => void; paused?: boolean }) {
  const mats = useRef<THREE.MeshStandardMaterial[]>([]);
  const groups = useRef<THREE.Group[]>([]);
  const packet = useRef<THREE.Mesh>(null);
  const tech = (id: string) => (project && PROJECT_LAYERS[project]?.[id]) || LAYERS.find((l) => l.id === id)!.sub;
  const selY = selected ? (LAYERS.find((l) => l.id === selected)!.y) * 0.62 : 0;

  return (
    <Canvas shadows={false} dpr={[1, 1.8]} frameloop={paused ? "never" : "always"} camera={{ position: [8.5, 2.6, 10.5], fov: 38 }}
      gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping }} onPointerMissed={() => onSelect(null)} style={{ position: "absolute", inset: 0 }}>
      <color attach="background" args={[C.bg]} />
      <fog attach="fog" args={[C.bg, 16, 38]} />
      <ambientLight intensity={0.4} />
      <pointLight position={[6, 8, 8]} intensity={120} decay={2} color="#ffd9e6" />
      <pointLight position={[-6, -8, 4]} intensity={90} decay={2} color="#4db5ff" />

      <Suspense fallback={null}>
        <Floor />
        <mesh position={[0, (TOP + BOT) / 2, 0]}>
          <cylinderGeometry args={[0.05, 0.05, TOP - BOT + 0.6, 12]} />
          <meshStandardMaterial color="#aab8ff" emissive="#aab8ff" emissiveIntensity={1.4} transparent opacity={0.5} toneMapped={false} />
        </mesh>
        <mesh ref={packet}><sphereGeometry args={[0.13, 16, 16]} /><meshStandardMaterial color="#fff" emissive="#fff" emissiveIntensity={4} toneMapped={false} /></mesh>

        {LAYERS.map((def, i) => (
          <LayerMesh key={def.id} i={i} def={def} tech={tech(def.id)} lat={LAT[i]} side={i % 2 === 0 ? 1 : -1} showLat={!!project} selected={selected === def.id}
            registerMat={(idx, m) => (mats.current[idx] = m)} registerGroup={(idx, g) => (groups.current[idx] = g)} onHover={onHover} onSelect={onSelect} />
        ))}

        <Sparkles count={60} scale={[14, 13, 12]} size={1.6} speed={0.2} color="#9fb4ff" opacity={0.5} />
        <Flow mats={mats} groups={groups} packet={packet} runRef={runRef} project={project} hoverRef={hoverRef} selected={selected} />
        <Rig targetY={selY} />
      </Suspense>

      <OrbitControls makeDefault target={[0, 0, 0]} enablePan={false} enableZoom={false} enableDamping dampingFactor={0.08}
        minPolarAngle={0.5} maxPolarAngle={2.0} autoRotate={!project && !selected} autoRotateSpeed={0.5} />

      <EffectComposer>
        <Bloom intensity={1.35} luminanceThreshold={0.14} luminanceSmoothing={0.9} mipmapBlur radius={0.78} />
        <DepthOfField target={[0, 0, 0]} focalLength={0.018} bokehScale={2.6} height={480} />
        <Vignette eskil={false} offset={0.2} darkness={0.92} />
      </EffectComposer>
    </Canvas>
  );
}
