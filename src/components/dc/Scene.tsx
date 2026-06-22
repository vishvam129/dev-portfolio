import { Suspense, useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, MeshReflectorMaterial, ContactShadows, Environment, Lightformer } from "@react-three/drei";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import * as THREE from "three";
import { SERVICES } from "@/data/backend";
import { Rack } from "./Rack";

function Cable({ from, to, color }: { from: [number, number, number]; to: [number, number, number]; color: string }) {
  const geo = useMemo(() => {
    const mid: [number, number, number] = [(from[0] + to[0]) / 2, Math.min(from[1], to[1]) - 0.35, (from[2] + to[2]) / 2 + 0.18];
    const curve = new THREE.CatmullRomCurve3([new THREE.Vector3(...from), new THREE.Vector3(...mid), new THREE.Vector3(...to)]);
    return new THREE.TubeGeometry(curve, 24, 0.018, 8, false);
  }, [from, to]);
  return <mesh geometry={geo}><meshStandardMaterial color={color} metalness={0.2} roughness={0.7} /></mesh>;
}

function CableTray({ xs }: { xs: number[] }) {
  const y = 3.5, z = 0.15;
  const colors = ["#16202a", "#1f3a44", "#2a2f1a", "#16202a"];
  return (
    <group>
      {/* tray side rails */}
      {[-0.45, 0.45].map((dz) => (
        <mesh key={dz} position={[0, y, z + dz]}>
          <boxGeometry args={[xs.length * 2 + 2.4, 0.05, 0.06]} />
          <meshStandardMaterial color="#10161c" metalness={0.7} roughness={0.4} />
        </mesh>
      ))}
      {/* rungs */}
      {Array.from({ length: 13 }).map((_, i) => (
        <mesh key={i} position={[-(xs.length * 2 + 1.2) / 2 + i * ((xs.length * 2 + 1.2) / 12), y, z]}>
          <boxGeometry args={[0.04, 0.04, 0.9]} />
          <meshStandardMaterial color="#0c1116" metalness={0.6} roughness={0.5} />
        </mesh>
      ))}
      {/* cable drops into each rack */}
      {xs.map((x, i) => (
        <group key={x}>
          <Cable from={[x - 0.12, y, z]} to={[x - 0.12, 2.04, 0.3]} color={colors[i % colors.length]} />
          <Cable from={[x + 0.12, y, z]} to={[x + 0.12, 2.04, 0.3]} color={i % 2 ? "#2a6f6a" : "#244"} />
        </group>
      ))}
    </group>
  );
}

function CeilingStrip({ x, z }: { x: number; z: number }) {
  return (
    <group position={[x, 4.2, z]}>
      <mesh>
        <boxGeometry args={[0.18, 0.08, 5.2]} />
        <meshStandardMaterial color="#bfefff" emissive="#7fdfff" emissiveIntensity={2.2} toneMapped={false} />
      </mesh>
      <pointLight position={[0, -1.2, 1.4]} intensity={18} distance={9} color="#bfeaff" />
      <pointLight position={[0, -1.2, -1.4]} intensity={18} distance={9} color="#bfeaff" />
    </group>
  );
}

function Floor() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
      <planeGeometry args={[80, 80]} />
      <MeshReflectorMaterial
        resolution={1024} mixBlur={1} mixStrength={28} blur={[400, 120]}
        roughness={0.7} depthScale={1.1} minDepthThreshold={0.4} maxDepthThreshold={1.3}
        color="#070b0f" metalness={0.7} mirror={0} />
    </mesh>
  );
}

export function Scene({
  selected, hovered, onHover, onSelect, paused = false,
}: {
  selected: string | null; hovered: string | null;
  onHover: (id: string | null) => void; onSelect: (id: string) => void; paused?: boolean;
}) {
  const N = SERVICES.length;
  const idle = !hovered && !selected;
  const xs = SERVICES.map((_, i) => (i - (N - 1) / 2) * 2.0);
  return (
    <Canvas
      shadows
      dpr={[1, 1.8]}
      frameloop={paused ? "never" : "always"}
      camera={{ position: [7.5, 3.6, 8.5], fov: 42 }}
      gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping }}
      onPointerMissed={() => onSelect("")}
      style={{ position: "absolute", inset: 0 }}
    >
      <color attach="background" args={["#05080c"]} />
      <fog attach="fog" args={["#05080c", 10, 34]} />

      <ambientLight intensity={0.55} />
      <hemisphereLight args={["#9fd8ff", "#0a0f14", 0.8]} />
      <directionalLight position={[6, 11, 7]} intensity={2.1} color="#dcefff" castShadow shadow-mapSize={[2048, 2048]} shadow-bias={-0.0004} />
      <spotLight position={[8, 9, 6]} angle={0.6} penumbra={0.85} intensity={400} decay={2} color="#cfeaff" castShadow shadow-mapSize={[1024, 1024]} />
      <pointLight position={[0, 3.2, 9]} intensity={260} decay={2} color="#bfe6ff" />
      <pointLight position={[-9, 4, -3]} intensity={160} decay={2} color="#39d0d8" />
      <pointLight position={[9, 3, 6]} intensity={120} decay={2} color="#ffb454" />

      {/* ceiling light strips */}
      <CeilingStrip x={-3} z={0} />
      <CeilingStrip x={0} z={0} />
      <CeilingStrip x={3} z={0} />

      <Floor />
      <ContactShadows position={[0, 0.02, 0]} opacity={0.55} scale={26} blur={2.4} far={6} resolution={1024} color="#000000" />

      {/* image-based lighting so the metal reads as real hardware */}
      <Environment resolution={256} frames={1}>
        <Lightformer intensity={2.2} color="#bfe6ff" position={[0, 6, -5]} scale={[12, 5, 1]} />
        <Lightformer intensity={1.4} color="#39d0d8" position={[-7, 2.5, 3]} scale={[2.5, 7, 1]} />
        <Lightformer intensity={1.1} color="#ffb454" position={[7, 2.5, 4]} scale={[2.5, 6, 1]} />
        <Lightformer intensity={0.8} color="#ffffff" position={[0, 3, 9]} scale={[8, 3, 1]} />
      </Environment>

      <CableTray xs={xs} />

      <Suspense fallback={null}>
      {/* interactive racks — front aisle */}
      {SERVICES.map((s, i) => (
        <Rack
          key={s.id} service={s} position={[(i - (N - 1) / 2) * 2.0, 0, 0]}
          selected={selected === s.id} hovered={hovered === s.id}
          onHover={onHover} onSelect={onSelect} />
      ))}

      {/* decorative back rows for depth */}
      {Array.from({ length: 6 }).map((_, i) => (
        <Rack key={`b${i}`} position={[(i - 2.5) * 1.8, 0, -3.6]} interactive={false} dim />
      ))}
      {Array.from({ length: 6 }).map((_, i) => (
        <Rack key={`c${i}`} position={[(i - 2.5) * 1.8, 0, -6.8]} interactive={false} dim />
      ))}
      </Suspense>

      <OrbitControls
        target={[0, 1.0, 0]} enablePan={false} enableZoom={false} enableDamping dampingFactor={0.08}
        minPolarAngle={0.25} maxPolarAngle={Math.PI / 2 - 0.04}
        autoRotate={idle} autoRotateSpeed={0.45} />

      <EffectComposer>
        <Bloom intensity={0.9} luminanceThreshold={0.25} luminanceSmoothing={0.9} mipmapBlur radius={0.7} />
        <Vignette eskil={false} offset={0.25} darkness={0.85} />
      </EffectComposer>
    </Canvas>
  );
}
