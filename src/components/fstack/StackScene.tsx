import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, RoundedBox, Edges, Html, Sparkles } from "@react-three/drei";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import * as THREE from "three";
import { C, F, LAYERS, PROJECT_LAYERS } from "./theme";

const TOP = LAYERS[0].y, BOT = LAYERS[LAYERS.length - 1].y;

function LayerMesh({ i, def, tech, side, register, onHover }:
  { i: number; def: (typeof LAYERS)[number]; tech: string; side: number; register: (i: number, m: THREE.MeshStandardMaterial) => void; onHover: (id: string | null) => void }) {
  return (
    <group position={[0, def.y, 0]}>
      <RoundedBox args={[4.3, 0.18, 2.7]} radius={0.08} smoothness={3}
        onPointerOver={(e) => { e.stopPropagation(); onHover(def.id); document.body.style.cursor = "pointer"; }}
        onPointerOut={(e) => { e.stopPropagation(); onHover(null); document.body.style.cursor = "auto"; }}>
        <meshStandardMaterial ref={(m) => m && register(i, m as THREE.MeshStandardMaterial)} color={def.color} emissive={def.color} emissiveIntensity={0.7} transparent opacity={0.4} metalness={0.1} roughness={0.25} toneMapped={false} />
        <Edges threshold={15} color={def.color} />
      </RoundedBox>
      {/* node dots on the slab */}
      {[-1.4, 0, 1.4].map((x) => (
        <mesh key={x} position={[x, 0.12, 0.7]}><sphereGeometry args={[0.05, 10, 10]} /><meshStandardMaterial color="#fff" emissive={def.color} emissiveIntensity={2} toneMapped={false} /></mesh>
      ))}
      {/* annotation label */}
      <Html position={[side * 2.55, 0, 0]} center distanceFactor={11} zIndexRange={[8, 0]} style={{ pointerEvents: "none", userSelect: "none", textAlign: side > 0 ? "left" : "right", width: 200, transform: `translateX(${side > 0 ? "0" : "-100%"})` }}>
        <div style={{ fontFamily: F.display, fontWeight: 600, fontSize: 17, color: "#fff", textShadow: `0 2px 14px ${def.color}, 0 1px 4px #000` }}>{def.label}</div>
        <div style={{ fontFamily: F.mono, fontSize: 10.5, color: def.color, marginTop: 2, textShadow: "0 1px 4px #000" }}>{tech}</div>
      </Html>
    </group>
  );
}

function Flow({ mats, packet, runRef, project, hoverRef }:
  { mats: React.MutableRefObject<THREE.MeshStandardMaterial[]>; packet: React.RefObject<THREE.Mesh | null>; runRef: React.MutableRefObject<number>; project: string | null; hoverRef: React.MutableRefObject<string | null> }) {
  const last = useRef(0); const start = useRef(-99);
  useFrame((s) => {
    const t = s.clock.elapsedTime;
    if (runRef.current !== last.current) { last.current = runRef.current; start.current = t; }
    const since = t - start.current;
    const DUR = 2.4;
    const running = since < DUR;
    // packet y: down (request) then up (response)
    let py = TOP + 1;
    if (running) {
      const p = since / DUR; // 0..1
      py = p < 0.5 ? THREE.MathUtils.lerp(TOP, BOT, p / 0.5) : THREE.MathUtils.lerp(BOT, TOP, (p - 0.5) / 0.5);
      if (packet.current) {
        packet.current.position.y = py;
        packet.current.visible = true;
        const m = packet.current.material as THREE.MeshStandardMaterial;
        m.color.set(p < 0.5 ? "#ffffff" : C.ok); m.emissive.set(p < 0.5 ? "#ffffff" : C.ok);
      }
    } else if (packet.current) {
      // ambient slow packet
      const a = (t * 0.18) % 1; py = THREE.MathUtils.lerp(TOP, BOT, a);
      packet.current.position.y = py; packet.current.visible = true;
      const m = packet.current.material as THREE.MeshStandardMaterial; m.color.set("#cfe0ff"); m.emissive.set("#cfe0ff");
    }
    // layer glow: base + wave from packet + hover boost
    for (let i = 0; i < mats.current.length; i++) {
      const m = mats.current[i]; if (!m) continue;
      const ly = LAYERS[i].y;
      const wave = (running ? 2.8 : 0.9) * Math.exp(-(((ly - py) / 0.85) ** 2));
      const hov = hoverRef.current === LAYERS[i].id ? 1.3 : 0;
      m.emissiveIntensity = 1.25 + wave + hov + (project ? 0.25 : 0);
      m.opacity = 0.52 + Math.min(0.4, wave * 0.16) + (hoverRef.current === LAYERS[i].id ? 0.2 : 0);
    }
  });
  return null;
}

export function StackScene({ project, runRef, hoverRef, onHover, paused = false }:
  { project: string | null; runRef: React.MutableRefObject<number>; hoverRef: React.MutableRefObject<string | null>; onHover: (id: string | null) => void; paused?: boolean }) {
  const mats = useRef<THREE.MeshStandardMaterial[]>([]);
  const packet = useRef<THREE.Mesh>(null);
  const tech = (id: string) => (project && PROJECT_LAYERS[project]?.[id]) || LAYERS.find((l) => l.id === id)!.sub;

  return (
    <Canvas shadows={false} dpr={[1, 1.8]} frameloop={paused ? "never" : "always"} camera={{ position: [8.5, 2.6, 10.5], fov: 38 }}
      gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping }} style={{ position: "absolute", inset: 0 }}>
      <color attach="background" args={[C.bg]} />
      <fog attach="fog" args={[C.bg, 14, 34]} />
      <ambientLight intensity={0.4} />
      <pointLight position={[6, 8, 8]} intensity={120} decay={2} color="#ffd9e6" />
      <pointLight position={[-6, -8, 4]} intensity={90} decay={2} color="#4db5ff" />

      <Suspense fallback={null}>
        {/* central data beam */}
        <mesh position={[0, (TOP + BOT) / 2, 0]}>
          <cylinderGeometry args={[0.05, 0.05, TOP - BOT + 0.6, 12]} />
          <meshStandardMaterial color="#aab8ff" emissive="#aab8ff" emissiveIntensity={1.4} transparent opacity={0.5} toneMapped={false} />
        </mesh>
        <mesh ref={packet}><sphereGeometry args={[0.13, 16, 16]} /><meshStandardMaterial color="#fff" emissive="#fff" emissiveIntensity={4} toneMapped={false} /></mesh>

        {LAYERS.map((def, i) => (
          <LayerMesh key={def.id} i={i} def={def} tech={tech(def.id)} side={i % 2 === 0 ? 1 : -1}
            register={(idx, m) => (mats.current[idx] = m)} onHover={onHover} />
        ))}

        <Sparkles count={60} scale={[14, 13, 12]} size={1.6} speed={0.2} color="#9fb4ff" opacity={0.5} />
        <Flow mats={mats} packet={packet} runRef={runRef} project={project} hoverRef={hoverRef} />
      </Suspense>

      <OrbitControls makeDefault target={[0, 0, 0]} enablePan={false} enableZoom={false} enableDamping dampingFactor={0.08}
        minPolarAngle={0.55} maxPolarAngle={2.1} autoRotate={!project} autoRotateSpeed={0.5} />

      <EffectComposer>
        <Bloom intensity={1.35} luminanceThreshold={0.14} luminanceSmoothing={0.9} mipmapBlur radius={0.78} />
        <Vignette eskil={false} offset={0.2} darkness={0.9} />
      </EffectComposer>
    </Canvas>
  );
}
