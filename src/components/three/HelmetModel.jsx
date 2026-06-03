import { Canvas, useFrame } from "@react-three/fiber";
import { Float, OrbitControls, Environment, ContactShadows } from "@react-three/drei";
import { useRef } from "react";

// Procedural high-end helmet geometry
function ProceduralHelmet({ color = "#E8002D" }) {
  const helmetGroup = useRef(null);

  // Slow automated rotation as fallback or extra dynamic motion
  useFrame((state) => {
    if (helmetGroup.current) {
      helmetGroup.current.rotation.y = state.clock.getElapsedTime() * 0.15;
    }
  });

  return (
    <group ref={helmetGroup} dispose={null}>
      {/* Outer Protective Shell (Slightly elongated sphere) */}
      <mesh castShadow receiveShadow scale={[1.1, 1.2, 1.15]}>
        <sphereGeometry args={[0.9, 64, 64]} />
        <meshStandardMaterial
          color={color}
          metalness={0.9}
          roughness={0.15}
          envMapIntensity={1.5}
        />
      </mesh>

      {/* Chin Guard / Mouth Vent Bar */}
      <mesh castShadow position={[0, -0.4, 0.6]} scale={[0.85, 0.4, 0.45]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial
          color="#1C1C1E"
          metalness={0.95}
          roughness={0.2}
        />
      </mesh>

      {/* Sleek Aerodynamic Top Spoiler */}
      <mesh castShadow position={[0, 0.75, -0.4]} rotation={[0.4, 0, 0]} scale={[0.6, 0.15, 0.8]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial
          color="#111111"
          metalness={0.8}
          roughness={0.3}
        />
      </mesh>

      {/* Cyber Visor Shield (Futuristic translucent visor) */}
      <mesh position={[0, 0.15, 0.45]} scale={[0.95, 0.5, 0.7]} rotation={[-0.1, 0, 0]}>
        <sphereGeometry args={[0.8, 32, 32, 0, Math.PI * 2, 0, Math.PI * 0.5]} />
        <meshPhysicalMaterial
          color="#FF1744"
          emissive="#FF1744"
          emissiveIntensity={0.65}
          transparent
          opacity={0.85}
          roughness={0.05}
          metalness={0.1}
          clearcoat={1.0}
          clearcoatRoughness={0.05}
        />
      </mesh>

      {/* Side Pivot Mounts for Visor (Left/Right) */}
      <mesh position={[0.92, 0.1, 0.1]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.12, 0.12, 0.1, 32]} />
        <meshStandardMaterial color="#C0C0C0" metalness={1.0} roughness={0.1} />
      </mesh>
      <mesh position={[-0.92, 0.1, 0.1]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.12, 0.12, 0.1, 32]} />
        <meshStandardMaterial color="#C0C0C0" metalness={1.0} roughness={0.1} />
      </mesh>

      {/* Decorative Signature Chrome Strip */}
      <mesh position={[0, 0.98, 0]} scale={[0.1, 0.05, 0.85]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#C0C0C0" metalness={1.0} roughness={0.05} />
      </mesh>
    </group>
  );
}

export function HelmetModel({ color = "#1C1C1E" }) {
  return (
    <div className="w-full h-full min-h-[350px] lg:min-h-[500px]">
      <Canvas camera={{ position: [0, 0.5, 3.2], fov: 42 }}>
        {/* Lights */}
        <ambientLight intensity={0.5} />
        
        {/* signature red rim highlight light */}
        <spotLight
          position={[5, 6, 5]}
          intensity={2.5}
          angle={0.4}
          penumbra={1}
          color="#E8002D"
          castShadow
        />
        {/* cool steel fill light */}
        <spotLight
          position={[-6, 3, -6]}
          intensity={1.5}
          angle={0.5}
          color="#C0C0C0"
        />
        {/* overhead highlight */}
        <directionalLight position={[0, 10, 0]} intensity={1.2} color="#ffffff" />

        <Float speed={2.0} rotationIntensity={0.3} floatIntensity={0.5}>
          <ProceduralHelmet color={color} />
        </Float>

        {/* Real-time shadows */}
        <ContactShadows
          position={[0, -1.3, 0]}
          opacity={0.65}
          scale={7}
          blur={1.8}
          far={4}
        />

        <Environment preset="studio" />
        
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate={false}
          maxPolarAngle={Math.PI / 2 + 0.1}
          minPolarAngle={Math.PI / 2 - 0.4}
        />
      </Canvas>
    </div>
  );
}
export default HelmetModel;
