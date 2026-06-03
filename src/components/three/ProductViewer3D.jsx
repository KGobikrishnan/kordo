import { Canvas } from "@react-three/fiber";
import { Float, OrbitControls, Environment, ContactShadows } from "@react-three/drei";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

function ProceduralBoot() {
  const bootGroup = useRef(null);

  useFrame((state) => {
    if (bootGroup.current) {
      // Gentle automated bobbing/hovering
      bootGroup.current.position.y = Math.sin(state.clock.getElapsedTime() * 1.2) * 0.05;
    }
  });

  return (
    <group ref={bootGroup} position={[0, 0.2, 0]} dispose={null}>
      {/* 1. Rugged Vibram Sole Base */}
      <mesh castShadow position={[0, -0.6, 0]} scale={[0.65, 0.18, 1.5]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#111111" roughness={0.95} metalness={0.1} />
      </mesh>

      {/* 2. Reinforced Ankle/Foot Midsole */}
      <mesh castShadow position={[0, -0.42, 0.05]} scale={[0.6, 0.2, 1.4]} rotation={[0.08, 0, 0]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#1C1C1E" roughness={0.35} metalness={0.8} />
      </mesh>

      {/* 3. Toe Slider Armor Cover */}
      <mesh castShadow position={[0, -0.38, 0.55]} scale={[0.55, 0.22, 0.4]}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial color="#E8002D" metalness={0.9} roughness={0.15} />
      </mesh>

      {/* 4. High-Ankle Protective Shaft/Neck */}
      <mesh castShadow position={[0, 0.12, -0.22]} rotation={[-0.15, 0, 0]} scale={[0.55, 0.95, 0.55]}>
        <cylinderGeometry args={[0.6, 0.75, 1, 32]} />
        <meshStandardMaterial color="#1C1C1E" roughness={0.5} metalness={0.7} />
      </mesh>

      {/* 5. Front Shin Guard Plate */}
      <mesh castShadow position={[0, 0.42, -0.1]} rotation={[-0.15, 0, 0]} scale={[0.42, 0.5, 0.1]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#E8002D" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* 6. Signature Glowing D3O Ankle Protectors (Left & Right Circles) */}
      <mesh position={[0.32, 0.05, -0.25]} rotation={[0, Math.PI / 2, 0]}>
        <cylinderGeometry args={[0.15, 0.15, 0.05, 32]} />
        <meshStandardMaterial
          color="#FF1744"
          emissive="#FF1744"
          emissiveIntensity={0.8}
          metalness={0.1}
          roughness={0.1}
        />
      </mesh>
      <mesh position={[-0.32, 0.05, -0.25]} rotation={[0, Math.PI / 2, 0]}>
        <cylinderGeometry args={[0.15, 0.15, 0.05, 32]} />
        <meshStandardMaterial
          color="#FF1744"
          emissive="#FF1744"
          emissiveIntensity={0.8}
          metalness={0.1}
          roughness={0.1}
        />
      </mesh>

      {/* 7. Metallic Expedition Buckles */}
      <mesh position={[0, 0.2, 0.1]} scale={[0.62, 0.06, 0.08]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#C0C0C0" metalness={1.0} roughness={0.05} />
      </mesh>
      <mesh position={[0, -0.1, 0.18]} scale={[0.62, 0.06, 0.08]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#C0C0C0" metalness={1.0} roughness={0.05} />
      </mesh>
    </group>
  );
}

export function ProductViewer3D() {
  return (
    <div className="w-full h-full min-h-[350px] lg:min-h-[450px] bg-korda-steel/10 rounded-sm border border-korda-steel/50 overflow-hidden relative group">
      {/* Decorative controls indicator */}
      <div className="absolute top-4 left-4 font-mono text-[9px] text-korda-white/40 z-10 pointer-events-none uppercase">
        DRAG MOUSE TO ROTATE / WHEEL TO ZOOM
      </div>

      <Canvas camera={{ position: [2.2, 1.2, 2.8], fov: 40 }}>
        <ambientLight intensity={0.45} />
        
        {/* signature spots */}
        <spotLight position={[5, 6, 5]} intensity={2.0} color="#E8002D" />
        <spotLight position={[-5, 4, -5]} intensity={1.5} color="#C0C0C0" />
        
        <directionalLight position={[0, 5, 0]} intensity={1.0} />

        <ProceduralBoot />

        <ContactShadows
          position={[0, -0.85, 0]}
          opacity={0.6}
          scale={5}
          blur={1.6}
          far={3}
        />

        <Environment preset="studio" />
        
        <OrbitControls
          enableZoom={true}
          enablePan={false}
          maxPolarAngle={Math.PI / 2 + 0.1}
          minDistance={1.8}
          maxDistance={4.5}
        />
      </Canvas>
    </div>
  );
}
export default ProductViewer3D;
