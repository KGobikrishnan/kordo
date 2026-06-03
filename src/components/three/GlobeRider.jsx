import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useRef } from "react";

function GlobeMesh() {
  const groupRef = useRef(null);

  // Auto rotate the globe
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.12;
    }
  });

  // Coordinates data translated into spherical positions
  // spherical formula: x = r * cos(lat) * sin(lon), etc.
  const pins = [
    { name: "San Francisco", lat: 37.77, lon: -122.41, r: 1.0 },
    { name: "London", lat: 51.50, lon: -0.12, r: 1.0 },
    { name: "Tokyo", lat: 35.67, lon: 139.65, r: 1.0 },
    { name: "Munich", lat: 48.13, lon: 11.58, r: 1.0 },
    { name: "Sydney", lat: -33.86, lon: 151.20, r: 1.0 }
  ];

  const getSphericalPos = (lat, lon, radius) => {
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lon + 180) * (Math.PI / 180);
    
    return [
      -(radius * Math.sin(phi) * Math.sin(theta)),
      radius * Math.cos(phi),
      radius * Math.sin(phi) * Math.cos(theta)
    ];
  };

  return (
    <group ref={groupRef}>
      {/* 1. Core Glowing Metallic Earth Sphere */}
      <mesh>
        <sphereGeometry args={[1.0, 64, 64]} />
        <meshStandardMaterial
          color="#1C1C1E"
          metalness={0.9}
          roughness={0.3}
          transparent
          opacity={0.95}
        />
      </mesh>

      {/* 2. Technological Wireframe Grid Overlay */}
      <mesh scale={[1.02, 1.02, 1.02]}>
        <sphereGeometry args={[1.0, 30, 30]} />
        <meshBasicMaterial
          color="#888888"
          wireframe
          transparent
          opacity={0.15}
        />
      </mesh>

      {/* 3. Glowing Coordinate Pins */}
      {pins.map((pin, idx) => {
        const pos = getSphericalPos(pin.lat, pin.lon, 1.02);
        return (
          <group key={idx} position={pos}>
            {/* The pinhead red dot */}
            <mesh>
              <sphereGeometry args={[0.03, 16, 16]} />
              <meshBasicMaterial color="#FF1744" />
            </mesh>
            
            {/* Inner neon beacon pulse */}
            <mesh scale={[1.8, 1.8, 1.8]}>
              <sphereGeometry args={[0.025, 8, 8]} />
              <meshBasicMaterial color="#E8002D" transparent opacity={0.4} />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}

export function GlobeRider() {
  return (
    <div className="w-full h-full min-h-[300px] lg:min-h-[400px] cursor-none relative">
      <div className="absolute top-2 left-2 font-mono text-[8px] text-korda-white/40 z-10 uppercase">
        ACTIVE SHOWROOM GRID COORDS: SEC_9
      </div>
      <Canvas camera={{ position: [0, 0, 2.2], fov: 45 }}>
        <ambientLight intensity={0.65} />
        
        {/* signature red ambient glimmers */}
        <pointLight position={[3, 3, 3]} intensity={1.5} color="#E8002D" />
        <pointLight position={[-3, -3, -3]} intensity={1.0} color="#C0C0C0" />
        
        <GlobeMesh />
        
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate={false}
        />
      </Canvas>
    </div>
  );
}
export default GlobeRider;
