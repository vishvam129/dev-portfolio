import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, MeshReflectorMaterial, ContactShadows } from "@react-three/drei";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import * as THREE from "three";
import { SERVICES } from "@/data/backend";
import { Rack } from "./Rack";

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
  selected, hovered, onHover, onSelect,
}: {
  selected: string | null; hovered: string | null;
  onHover: (id: string | null) => void; onSelect: (id: string) => void;
}) {
  const N = SERVICES.length;
  const idle = !hovered && !selected;
  return (
    <Canvas
      shadows
      dpr={[1, 1.8]}
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
        target={[0, 1.0, 0]} enablePan={false} enableDamping dampingFactor={0.08}
        minDistance={5.5} maxDistance={17} minPolarAngle={0.25} maxPolarAngle={Math.PI / 2 - 0.04}
        autoRotate={idle} autoRotateSpeed={0.45} />

      <EffectComposer>
        <Bloom intensity={0.9} luminanceThreshold={0.25} luminanceSmoothing={0.9} mipmapBlur radius={0.7} />
        <Vignette eskil={false} offset={0.25} darkness={0.85} />
      </EffectComposer>
    </Canvas>
  );
}
