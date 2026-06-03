import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Wind, ShieldAlert, KeyRound, Cpu } from "lucide-react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

// Glowing technical wireframe mesh schematic for safety specs
function WireframeMesh({ activeTech }) {
  // We can render a rotating technological node that changes colors based on the active spec!
  const colorMap = {
    "irp-vent": "#E8002D", // Red
    "d3o-core": "#FF1744", // Neon glow red
    "kevlar-mesh": "#B8961E" // Gold
  };

  return (
    <Canvas camera={{ position: [0, 0, 2.0], fov: 45 }}>
      <ambientLight intensity={0.5} />
      
      {/* rotating techno ring */}
      <mesh rotation={[0.4, 0.4, 0]}>
        <torusGeometry args={[0.55, 0.1, 16, 100]} />
        <meshBasicMaterial color={colorMap[activeTech]} wireframe />
      </mesh>

      {/* secondary outer orbit rings */}
      <mesh rotation={[1.2, -0.6, 0]}>
        <torusGeometry args={[0.78, 0.02, 8, 80]} />
        <meshBasicMaterial color="#C0C0C0" wireframe transparent opacity={0.35} />
      </mesh>

      {/* Center core sphere */}
      <mesh>
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshStandardMaterial
          color={colorMap[activeTech]}
          metalness={0.9}
          roughness={0.1}
          emissive={colorMap[activeTech]}
          emissiveIntensity={0.65}
        />
      </mesh>

      <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1.5} />
    </Canvas>
  );
}

export function SafetyTechSection() {
  const [activeTech, setActiveTech] = useState("irp-vent");

  const techCards = [
    {
      id: "irp-vent",
      icon: <Wind size={24} className="text-korda-red" />,
      title: "IRP+ Venting",
      label: "INTEGRATED FLOW CHANNEL",
      desc: "Aerodynamics-tested flow ventilation channels integrated directly into the ESP composite liner. Siphons moisture, heat, and carbon dioxide out at racing velocities.",
      stats: ["Mitigates thermal load by 40%", "Symmetrical dual chin inlets", "Venturi negative pressure rear exhaust"]
    },
    {
      id: "d3o-core",
      icon: <ShieldAlert size={24} className="text-korda-red" />,
      title: "D3O® Smart Impact",
      label: "MOLECULAR ABSORPTION",
      desc: "Revolutionary non-Newtonian polymer material. Stays soft and flexible for riding comfort, but instantly locks molecular structure on impact to disperse kinetic shock.",
      stats: ["Absorbs up to 86% of sudden forces", "Ultra-low 8mm profile thickness", "Sub-zero temperature consistency"]
    },
    {
      id: "kevlar-mesh",
      icon: <KeyRound size={24} className="text-korda-gold" />,
      title: "Kevlar® Shell Grid",
      label: "ANTI-ABRASION SHIELDING",
      desc: "Internal grid layer woven with genuine DuPont™ Kevlar® fibers. Forms a protective puncture-proof barrier that stops high-friction heat on pavement slides.",
      stats: ["Tested to FIM friction thresholds", "450°C heat dissipation core", "Lightweight structural weave"]
    }
  ];

  return (
    <section className="relative w-full py-24 bg-korda-black border-b border-korda-steel overflow-hidden">
      {/* Background Red Ambient Mesh Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-korda-red/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Tech Specs & Selection Tabs (Stays sticky/pinned in view on desktop) */}
        <div className="lg:col-span-7 text-left space-y-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <span className="w-1.5 h-1.5 bg-korda-red rounded-full" />
              <span className="font-mono text-[10px] tracking-widest text-korda-red font-bold uppercase">
                ADVANCED DEFENSE SYSTEMS
              </span>
            </div>
            <h2 className="font-display text-5xl md:text-6xl tracking-wider text-korda-white uppercase leading-none">
              METICULOUS <br />
              SAFETY SHIELDS.
            </h2>
          </div>

          {/* Interactive Navigation Tabs */}
          <div className="grid grid-cols-3 gap-3">
            {techCards.map((tech) => (
              <button
                key={tech.id}
                onClick={() => setActiveTech(tech.id)}
                className={`py-4 px-3 flex flex-col items-center justify-center border transition-all duration-300 font-mono text-[10px] tracking-widest uppercase cursor-none ${
                  activeTech === tech.id
                    ? "bg-korda-steel/50 border-korda-red text-korda-red shadow-red-neon"
                    : "bg-korda-steel/15 border-korda-steel text-korda-white/50 hover:border-korda-white/20"
                }`}
              >
                <div className="mb-2">{tech.icon}</div>
                <span className="text-center">{tech.title.split(" ")[0]}</span>
              </button>
            ))}
          </div>

          {/* Dynamic Content Display */}
          <div className="bg-korda-steel/20 border border-korda-steel p-8 min-h-[300px] flex flex-col justify-between rounded-sm">
            <AnimatePresence mode="wait">
              {(() => {
                const tech = techCards.find((t) => t.id === activeTech);
                if (!tech) return null;
                return (
                  <motion.div
                    key={tech.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.4 }}
                    className="space-y-6"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[9px] text-korda-gold tracking-widest uppercase">
                        {tech.label}
                      </span>
                      <Cpu size={14} className="text-korda-white/30 animate-[spin_8s_linear_infinite]" />
                    </div>

                    <h3 className="font-display text-3xl tracking-wide text-korda-white uppercase">
                      {tech.title}
                    </h3>

                    <p className="font-body text-xs text-korda-white/60 leading-relaxed">
                      {tech.desc}
                    </p>

                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-korda-steel/60">
                      {tech.stats.map((stat, i) => (
                        <li key={i} className="font-mono text-[9px] text-korda-white/70 flex items-center gap-2">
                          <span className="w-1 h-1 bg-korda-red rounded-full shadow-red-neon" />
                          {stat}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                );
              })()}
            </AnimatePresence>
          </div>
        </div>

        {/* Right Column: WebGL Interactive Wireframe Node */}
        <div className="lg:col-span-5 relative w-full h-[350px] lg:h-[450px] flex items-center justify-center bg-korda-steel/15 border border-korda-steel/40 rounded-sm">
          <div className="absolute top-4 right-4 font-mono text-[8px] text-korda-white/30 tracking-widest uppercase">
            HOLOGRAPHIC SPEC_ANALYSIS
          </div>
          <div className="w-full h-full">
            <WireframeMesh activeTech={activeTech} />
          </div>
        </div>
      </div>
    </section>
  );
}
export default SafetyTechSection;
