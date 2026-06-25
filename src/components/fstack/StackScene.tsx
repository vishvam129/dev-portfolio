import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, RoundedBox, Edges, Html, Sparkles, MeshReflectorMaterial } from "@react-three/drei";
import { EffectComposer, Bloom, Vignette, DepthOfField } from "@react-three/postprocessing";
import * as THREE from "three";
import { C, F, LAYERS, PROJECT_LAYERS } from "./theme";

const TOP = LAYERS[0].y, BOT = LAYERS[LAYERS.length - 1].y;
const LAT = [0, 6, 14, 24, 38, 9]; // per-layer latency (ms), cosmetic

function LayerMesh({ i, def, tech, lat, side, showLat, selected, circuit, registerMat, registerGroup, onHover, onSelect }:
  { i: number; def: (typeof LAYERS)[number]; tech: string; lat: number; side: number; showLat: boolean; selected: boolean; circuit: THREE.Texture;
    registerMat: (i: number, m: THREE.MeshStandardMaterial) => void; registerGroup: (i: number, g: THREE.Group) => void; onHover: (id: string | null) => void; onSelect: (id: string | null) => void }) {
  return (
    <group ref={(g) => g && registerGroup(i, g)} position={[0, def.y, 0]}>
      {/* glassy board */}
      <RoundedBox args={[4.05, 0.13, 2.55]} radius={0.05} smoothness={4}
        onClick={(e) => { e.stopPropagation(); onSelect(selected ? null : def.id); }}
        onPointerOver={(e) => { e.stopPropagation(); onHover(def.id); document.body.style.cursor = "pointer"; }}
        onPointerOut={(e) => { e.stopPropagation(); onHover(null); document.body.style.cursor = "auto"; }}>
        <meshStandardMaterial ref={(m) => m && registerMat(i, m as THREE.MeshStandardMaterial)} color="#0a0b16" emissive={def.color} emissiveIntensity={0.6} transparent opacity={0.34} metalness={0.5} roughness={0.12} toneMapped={false} />
        <Edges threshold={15} color={def.color} />
      </RoundedBox>
      {/* faint circuit-grid on the board surface */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.07, 0]}>
        <planeGeometry args={[3.88, 2.42]} />
        <meshBasicMaterial map={circuit} color={def.color} transparent opacity={0.32} depthWrite={false} blending={THREE.AdditiveBlending} toneMapped={false} />
      </mesh>
      {/* connector to the label */}
      <mesh position={[-2.32, 0, 0]}><boxGeometry args={[0.52, 0.014, 0.014]} /><meshStandardMaterial color={def.color} emissive={def.color} emissiveIntensity={2.2} toneMapped={false} /></mesh>
      <mesh position={[-2.62, 0, 0]}><sphereGeometry args={[0.055, 12, 12]} /><meshStandardMaterial color="#fff" emissive={def.color} emissiveIntensity={2.6} toneMapped={false} /></mesh>
      {/* component modules sitting on the board */}
      {([[-1.45, 0.5, 0.55, 0.5], [-0.5, -0.5, 0.85, 0.55], [0.6, 0.45, 0.55, 0.75], [1.45, -0.35, 0.45, 0.5]] as const).map(([x, z, w, d], k) => (
        <mesh key={k} position={[x, 0.1, z]}>
          <boxGeometry args={[w, 0.12, d]} />
          <meshStandardMaterial color={def.color} emissive={def.color} emissiveIntensity={k % 2 ? 3.2 : 2.3} metalness={0.3} roughness={0.35} toneMapped={false} />
        </mesh>
      ))}
      {/* edge ports */}
      {[-1.2, -0.4, 0.4, 1.2].map((x) => (
        <mesh key={x} position={[x, 0.06, 1.18]}><boxGeometry args={[0.09, 0.07, 0.05]} /><meshStandardMaterial color="#fff" emissive="#fff" emissiveIntensity={2} toneMapped={false} /></mesh>
      ))}
      <Html position={[side * 2.72, 0, 0]} center distanceFactor={11} zIndexRange={[8, 0]} style={{ pointerEvents: "none", userSelect: "none", textAlign: side > 0 ? "left" : "right", width: 220, transform: `translateX(${side > 0 ? "0" : "-100%"})` }}>
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
      m.emissiveIntensity = Math.max(0.05, (1.7 + wave + hov + sel + (project ? 0.25 : 0)) * (0.15 + 0.85 * reveal));
      m.opacity = Math.max(0.05, (0.54 + Math.min(0.38, wave * 0.14) + (hoverRef.current === LAYERS[i].id ? 0.18 : 0) + (isSel ? 0.24 : selected ? -0.16 : 0)) * reveal);
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

function glowTexture() {
  const s = 128, c = document.createElement("canvas"); c.width = c.height = s;
  const ctx = c.getContext("2d")!;
  const g = ctx.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2);
  g.addColorStop(0, "rgba(255,255,255,1)"); g.addColorStop(0.4, "rgba(255,255,255,0.45)"); g.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = g; ctx.fillRect(0, 0, s, s);
  return new THREE.CanvasTexture(c);
}

function circuitTexture() {
  const s = 256, c = document.createElement("canvas"); c.width = c.height = s;
  const ctx = c.getContext("2d")!;
  // faint grid
  ctx.strokeStyle = "rgba(255,255,255,0.14)"; ctx.lineWidth = 1;
  for (let i = 32; i < s; i += 32) { ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, s); ctx.stroke(); ctx.beginPath(); ctx.moveTo(0, i); ctx.lineTo(s, i); ctx.stroke(); }
  // circuit traces
  ctx.strokeStyle = "rgba(255,255,255,0.5)"; ctx.lineWidth = 2; ctx.lineJoin = "round";
  const traces = [[[20, 48], [128, 48], [128, 140]], [[208, 24], [208, 96], [150, 96]], [[40, 210], [40, 150], [116, 150]], [[236, 168], [168, 168], [168, 236]], [[96, 96], [60, 96], [60, 40]]];
  traces.forEach((p) => { ctx.beginPath(); ctx.moveTo(p[0][0], p[0][1]); for (let k = 1; k < p.length; k++) ctx.lineTo(p[k][0], p[k][1]); ctx.stroke(); });
  // pads
  ctx.fillStyle = "rgba(255,255,255,0.75)";
  [[128, 140], [150, 96], [116, 150], [168, 168], [20, 48], [208, 24], [60, 40]].forEach(([x, y]) => ctx.fillRect(x - 3, y - 3, 6, 6));
  return new THREE.CanvasTexture(c);
}

function Nebula() {
  const tex = useRef(glowTexture()).current;
  const orbs: [number, number, number, number, string, number][] = [
    [5, 5.5, -9, 15, C.accent, 0.26],
    [-5, -5, -10, 17, C.accent2, 0.22],
    [3, -1, -11, 20, "#5f8cf2", 0.16],
  ];
  return (
    <group>
      {orbs.map(([x, y, z, sc, col, op], i) => (
        <mesh key={i} position={[x, y, z]} scale={[sc, sc, 1]}>
          <planeGeometry args={[1, 1]} />
          <meshBasicMaterial map={tex} color={col} transparent opacity={op} depthWrite={false} blending={THREE.AdditiveBlending} toneMapped={false} />
        </mesh>
      ))}
    </group>
  );
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
  const circuit = useRef<THREE.Texture>(undefined);
  if (!circuit.current) circuit.current = circuitTexture();
  const tech = (id: string) => (project && PROJECT_LAYERS[project]?.[id]) || LAYERS.find((l) => l.id === id)!.sub;
  const selY = selected ? (LAYERS.find((l) => l.id === selected)!.y) * 0.62 : 0;

  return (
    <Canvas shadows={false} dpr={[1, 1.8]} frameloop={paused ? "never" : "always"} camera={{ position: [7.6, 2.3, 9.6], fov: 38 }}
      gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping }} onPointerMissed={() => onSelect(null)} style={{ position: "absolute", inset: 0 }}>
      <color attach="background" args={[C.bg]} />
      <fog attach="fog" args={[C.bg, 16, 38]} />
      <ambientLight intensity={0.4} />
      <pointLight position={[6, 8, 8]} intensity={120} decay={2} color="#ffd9e6" />
      <pointLight position={[-6, -8, 4]} intensity={90} decay={2} color="#4db5ff" />

      <Suspense fallback={null}>
        <Nebula />
        <Floor />
        <mesh position={[0, (TOP + BOT) / 2, 0]}>
          <cylinderGeometry args={[0.05, 0.05, TOP - BOT + 0.6, 12]} />
          <meshStandardMaterial color="#aab8ff" emissive="#aab8ff" emissiveIntensity={1.4} transparent opacity={0.5} toneMapped={false} />
        </mesh>
        <mesh ref={packet}><sphereGeometry args={[0.13, 16, 16]} /><meshStandardMaterial color="#fff" emissive="#fff" emissiveIntensity={4} toneMapped={false} /></mesh>

        {LAYERS.map((def, i) => (
          <LayerMesh key={def.id} i={i} def={def} tech={tech(def.id)} lat={LAT[i]} side={-1} showLat={!!project} selected={selected === def.id} circuit={circuit.current!}
            registerMat={(idx, m) => (mats.current[idx] = m)} registerGroup={(idx, g) => (groups.current[idx] = g)} onHover={onHover} onSelect={onSelect} />
        ))}

        <Sparkles count={60} scale={[14, 13, 12]} size={1.6} speed={0.2} color="#9fb4ff" opacity={0.5} />
        <Flow mats={mats} groups={groups} packet={packet} runRef={runRef} project={project} hoverRef={hoverRef} selected={selected} />
        <Rig targetY={selY} />
      </Suspense>

      <OrbitControls makeDefault target={[0, 0, 0]} enablePan={false} enableZoom={false} enableDamping dampingFactor={0.08}
        minPolarAngle={0.5} maxPolarAngle={2.0} autoRotate={!project && !selected} autoRotateSpeed={0.5} />

      <EffectComposer>
        <Bloom intensity={1.75} luminanceThreshold={0.1} luminanceSmoothing={0.9} mipmapBlur radius={0.82} />
        <DepthOfField target={[0, 0, 0]} focalLength={0.018} bokehScale={2.6} height={480} />
        <Vignette eskil={false} offset={0.2} darkness={0.92} />
      </EffectComposer>
    </Canvas>
  );
}
