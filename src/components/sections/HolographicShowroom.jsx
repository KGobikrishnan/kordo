import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Shield, Cpu, Layers, Settings,
  Eye, EyeOff, Check
} from "lucide-react";

const JACKETS_DATA = [
  {
    id: "j1",
    img: "/jackets/j1.png",
    name: "KORDA APEX-1 SHIELD",
    tagline: "Aero-Vent Armour Mesh",
    specs: {
      armor: "D3O® Viper Stealth Level 2 (Back & Shoulders)",
      weave: "1000D Cordura® Core Abrasion Fabric",
      weight: "1.75 kg",
      airflow: "92% (High-Speed Ventilation)",
      feature: "Aerodynamic Speed Hump, Hydration Tube Conduit",
    },
    techSpecs: [
      { label: "Tensile Strength", value: "94%" },
      { label: "Impact Dispersal", value: "96%" },
      { label: "Thermal Regulation", value: "88%" },
      { label: "Flexibility index", value: "85%" }
    ]
  },
  {
    id: "j2",
    img: "/jackets/j2.png",
    name: "VALKYRIE PRO V2",
    tagline: "All-Weather Protection",
    specs: {
      armor: "Knox Microlock Level 2 (Shoulders & Elbows)",
      weave: "1200D Ripstop Ballistic Nylon Shell",
      weight: "1.90 kg",
      airflow: "80% (Variable Vent Zippers)",
      feature: "Removable Thermal Liner, Hydro-Guard Waterproof Membrane",
    },
    techSpecs: [
      { label: "Tensile Strength", value: "98%" },
      { label: "Impact Dispersal", value: "92%" },
      { label: "Thermal Regulation", value: "95%" },
      { label: "Flexibility index", value: "78%" }
    ]
  },
  {
    id: "j3",
    img: "/jackets/j3.png",
    name: "HYPERION CARBON",
    tagline: "Composite Reinforced Armor",
    specs: {
      armor: "SAS-TEC 3D Protectors Level 2 Elite",
      weave: "Carbon-Core Hybrid Composite Fabric",
      weight: "1.60 kg",
      airflow: "88% (Dynamic Mesh Panels)",
      feature: "Integrated LED Safety Strip Ports, Night-Glow Reflective Piping",
    },
    techSpecs: [
      { label: "Tensile Strength", value: "97%" },
      { label: "Impact Dispersal", value: "98%" },
      { label: "Thermal Regulation", value: "84%" },
      { label: "Flexibility index", value: "90%" }
    ]
  },
  {
    id: "j4",
    img: "/jackets/j4.png",
    name: "CHRONOS KEVLAR",
    tagline: "Kevlar Touring Mesh",
    specs: {
      armor: "D3O® Level 2 T5 EVO Pro Shoulders & Chest",
      weave: "DuPont™ Kevlar® Full Mesh Weave",
      weight: "1.45 kg",
      airflow: "98% (Hyper-Cooling Matrix)",
      feature: "Touring Comfort Fit, Detachable Cargo Hydropack Pocket",
    },
    techSpecs: [
      { label: "Tensile Strength", value: "99%" },
      { label: "Impact Dispersal", value: "95%" },
      { label: "Thermal Regulation", value: "99%" },
      { label: "Flexibility index", value: "92%" }
    ]
  },
  {
    id: "j5",
    img: "/jackets/j5.png",
    name: "PHANTOM STEALTH",
    tagline: "Understated Urban Shield",
    specs: {
      armor: "Ultra-thin D3O® Ghost Level 1 Protective Pads",
      weave: "Waxed Canvas & Kevlar reinforcement zones",
      weight: "1.80 kg",
      airflow: "72% (Intake Vents)",
      feature: "Understated street aesthetics, multi-pocket concealed design",
    },
    techSpecs: [
      { label: "Tensile Strength", value: "88%" },
      { label: "Impact Dispersal", value: "85%" },
      { label: "Thermal Regulation", value: "80%" },
      { label: "Flexibility index", value: "97%" }
    ]
  },
  {
    id: "j6",
    img: "/jackets/j6.png",
    name: "SPECTER EXOS",
    tagline: "Rigid Titanium Spine",
    specs: {
      armor: "External Titanium Slider plates + D3O® L2",
      weave: "1680D Ballistic Nylon Outer Core",
      weight: "2.10 kg",
      airflow: "78% (Exhaust Flow Channels)",
      feature: "Rigid anatomical spine brace, reinforced collarbone armor",
    },
    techSpecs: [
      { label: "Tensile Strength", value: "99%" },
      { label: "Impact Dispersal", value: "99%" },
      { label: "Thermal Regulation", value: "82%" },
      { label: "Flexibility index", value: "72%" }
    ]
  },
  {
    id: "j7",
    img: "/jackets/j7.png",
    name: "TITAN RAIDER",
    tagline: "Heavy Adventure Armor",
    specs: {
      armor: "Forcefield Isolator Level 2 (Full Coverage)",
      weave: "SuperFabric® High-abrasion reinforcement areas",
      weight: "2.25 kg",
      airflow: "65% (Heavy Duty Vent Ports)",
      feature: "Integrated hydration system bladder, 10 waterproof gear compartments",
    },
    techSpecs: [
      { label: "Tensile Strength", value: "99%" },
      { label: "Impact Dispersal", value: "97%" },
      { label: "Thermal Regulation", value: "75%" },
      { label: "Flexibility index", value: "70%" }
    ]
  },
  {
    id: "j8",
    img: "/jackets/j8.png",
    name: "ECLIPSE MATRIX",
    tagline: "Matte Race Specification",
    specs: {
      armor: "Dual-comp TPU slider plates + Level 2 protectors",
      weave: "Matte Premium Kangaroo Leather (1.2mm)",
      weight: "2.05 kg",
      airflow: "85% (Perforated chest panels)",
      feature: "Bi-axial stretch accordion panels, race collar with neoprene edge",
    },
    techSpecs: [
      { label: "Tensile Strength", value: "96%" },
      { label: "Impact Dispersal", value: "98%" },
      { label: "Thermal Regulation", value: "86%" },
      { label: "Flexibility index", value: "94%" }
    ]
  }
];

const COLORS_CORES = [
  { id: "cyan", label: "CYAN PROJECTOR", value: "#00f0ff", rgba: "rgba(0, 240, 255, 0.4)", secondary: "rgba(0, 240, 255, 0.1)" },
  { id: "red", label: "KORDA CRIMSON", value: "#e8002d", rgba: "rgba(232, 0, 45, 0.4)", secondary: "rgba(232, 0, 45, 0.1)" },
  { id: "gold", label: "STARK CORE GOLD", value: "#b8961e", rgba: "rgba(184, 150, 30, 0.4)", secondary: "rgba(184, 150, 30, 0.1)" },
  { id: "green", label: "NANO TECH GREEN", value: "#10b981", rgba: "rgba(16, 185, 129, 0.4)", secondary: "rgba(16, 185, 129, 0.1)" }
];

// Reusable canvas background with dynamic particle coloring
function ParticleGrid({ color }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let animationFrameId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const particles = [];
    const particleCount = 65;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.5 + 0.5,
        speedX: Math.random() * 0.4 - 0.2,
        speedY: Math.random() * 0.4 - 0.2,
        alpha: Math.random() * 0.5 + 0.1
      });
    }

    const resizeHandler = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", resizeHandler);

    const drawParticles = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw Grid lines
      ctx.strokeStyle = "rgba(28, 28, 30, 0.15)";
      ctx.lineWidth = 1;
      const gridSize = 45;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Draw and Animate particles with dynamic color
      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;

        if (p.x < 0 || p.x > width) p.speedX *= -1;
        if (p.y < 0 || p.y > height) p.speedY *= -1;

        ctx.fillStyle = color;
        ctx.globalAlpha = p.alpha;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.globalAlpha = 1.0; // Reset alpha

      animationFrameId = requestAnimationFrame(drawParticles);
    };

    drawParticles();

    return () => {
      window.removeEventListener("resize", resizeHandler);
      cancelAnimationFrame(animationFrameId);
    };
  }, [color]);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />;
}

export function HolographicShowroom() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeColor, setActiveColor] = useState(COLORS_CORES[0]);
  const [hologramView, setHologramView] = useState(true); // Hologram style tint vs Real style full color
  const [isScanning, setIsScanning] = useState(false);

  const selectedJacket = JACKETS_DATA[currentIndex];

  // Auto-rotate jackets every 3 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setIsScanning(true);
      setTimeout(() => setIsScanning(false), 1200);
      setCurrentIndex((prev) => (prev + 1) % JACKETS_DATA.length);
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  // Left-to-Right slide variants
  const slideVariants = {
    enter: {
      x: -250,
      opacity: 0,
      scale: 0.9
    },
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: "spring", stiffness: 100, damping: 16 },
        opacity: { duration: 0.4 },
        scale: { duration: 0.4 }
      }
    },
    exit: {
      x: 250,
      opacity: 0,
      scale: 0.9,
      transition: {
        x: { type: "spring", stiffness: 100, damping: 16 },
        opacity: { duration: 0.3 },
        scale: { duration: 0.3 }
      }
    }
  };

  const changeColorCore = (color) => {
    setActiveColor(color);
    setIsScanning(true);
    setTimeout(() => setIsScanning(false), 1200);
  };

  return (
    <section className="relative w-full py-24 bg-korda-black border-b border-korda-steel overflow-hidden">
      {/* Sci-fi Canvas Grid and Particle background (matching hero background) */}
      <ParticleGrid color={activeColor.value} />

      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[150px] opacity-15 pointer-events-none transition-colors duration-1000"
        style={{ backgroundColor: activeColor.value }}
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="flex items-center space-x-2 mb-3">
              <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: activeColor.value }} />
              <span className="font-mono text-[10px] tracking-widest font-bold uppercase" style={{ color: activeColor.value }}>
                Korda Jackets Collections
              </span>
            </div>
            <h2 className="font-display text-5xl md:text-6xl text-korda-white tracking-wider uppercase leading-none">
              ARMOR <span className="text-transparent bg-clip-text" style={{ backgroundImage: `linear-gradient(to right, #ffffff, ${activeColor.value})` }}>DEPOT</span>
            </h2>
          </div>

          {/* Display Mode Control */}
          <div className="flex items-center gap-3 bg-korda-steel/20 border border-korda-steel p-1.5 rounded-sm">
            <button
              onClick={() => setHologramView(true)}
              className={`px-4 py-2 font-mono text-[10px] tracking-widest uppercase transition-all duration-300 ${hologramView
                  ? "text-korda-black bg-korda-white font-bold"
                  : "text-korda-white/40 hover:text-korda-white"
                }`}
            >
              <span className="flex items-center gap-1.5">
                <Eye size={12} />
                HOLOGRAM VIEW
              </span>
            </button>
            <button
              onClick={() => setHologramView(false)}
              className={`px-4 py-2 font-mono text-[10px] tracking-widest uppercase transition-all duration-300 ${!hologramView
                  ? "text-korda-black bg-korda-white font-bold"
                  : "text-korda-white/40 hover:text-korda-white"
                }`}
            >
              <span className="flex items-center gap-1.5">
                <EyeOff size={12} />
                PHYSICAL VIEW
              </span>
            </button>
          </div>
        </div>

        {/* MAIN HUD LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">

          {/* LEFT/CENTER: HOLOGRAPHIC PROJECTION CHAMBER (7 Cols on large screen) */}
          <div className="lg:col-span-7 flex flex-col justify-between bg-korda-steel/10 border border-korda-steel/60 p-6 md:p-12 relative overflow-hidden rounded-sm min-h-[550px] md:min-h-[620px]">

            {/* Hologram Chamber tech borders */}
            <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-korda-steel/60 pointer-events-none" />
            <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-korda-steel/60 pointer-events-none" />
            <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-korda-steel/60 pointer-events-none" />
            <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-korda-steel/60 pointer-events-none" />

            {/* Grid background inside chamber */}
            <div className="absolute inset-0 bg-[radial-gradient(#1c1c1e_1.5px,transparent_1.5px)] [background-size:24px_24px] opacity-20 pointer-events-none" />

            {/* Scanning Laser Line */}
            {isScanning && (
              <motion.div
                className="absolute left-0 right-0 h-[3px] z-35 pointer-events-none"
                style={{
                  backgroundColor: activeColor.value,
                  boxShadow: `0 0 15px ${activeColor.value}, 0 0 30px ${activeColor.value}`
                }}
                animate={{ top: ["5%", "95%", "5%"] }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
              />
            )}

            {/* Chamber Status Bar */}
            <div className="flex justify-between items-center z-10 font-mono text-[9px] text-korda-white/40 tracking-wider">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full animate-ping" style={{ backgroundColor: activeColor.value }} />
                CHAMBER STATE: AUTO_ROTATION_SYNC_ON
              </span>
              <span style={{ color: activeColor.value }}>VESSEL REF: 0{currentIndex + 1}_MKV</span>
            </div>

            {/* The Floating Jacket Hologram Stage */}
            <div className="relative flex-grow flex items-center justify-center py-6 select-none">

              {/* Outer cybernetic bracket overlay when scanning/hologram is active */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedJacket.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                  className="absolute w-full max-w-[380px] aspect-[4/5] pointer-events-none z-10 border border-dashed border-korda-steel/30 rounded-sm"
                >
                  {/* Floating Tech Reticles */}
                  <div className="absolute top-[15%] -left-6 font-mono text-[8px] bg-korda-black/80 px-2 py-1 border border-korda-steel flex flex-col gap-0.5">
                    <span className="text-korda-white/40">CALIBRATING_Z_AXIS:</span>
                    <span style={{ color: activeColor.value }} className="font-bold">L2_PROTECT_ON</span>
                  </div>

                  <div className="absolute bottom-[40%] -right-8 font-mono text-[8px] bg-korda-black/80 px-2 py-1 border border-korda-steel flex flex-col gap-0.5">
                    <span className="text-korda-white/40">AIR_FLOW_INTEG:</span>
                    <span style={{ color: activeColor.value }} className="font-bold">{selectedJacket.specs.airflow}</span>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Vertical Laser Projection Beam */}
              <div
                className="absolute bottom-16 left-1/2 -translate-x-1/2 w-[340px] h-[340px] rounded-full blur-[80px] pointer-events-none transition-all duration-1000"
                style={{
                  background: `radial-gradient(ellipse at bottom, ${activeColor.rgba}, transparent 70%)`,
                  opacity: hologramView ? 0.45 : 0.1
                }}
              />

              {/* Floating Jacket Image Carousel (Left-to-Right Slide Transition) */}
              <div className="w-full max-w-[320px] aspect-[3/4] flex items-center justify-center overflow-visible relative">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedJacket.id + (hologramView ? "_holo" : "_real")}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    className="absolute inset-0 z-10 flex items-center justify-center"
                  >
                    <motion.img
                      src={selectedJacket.img}
                      alt={selectedJacket.name}
                      animate={{
                        y: [0, -12, 0],
                        rotate: [0, 1, 0, -1, 0]
                      }}
                      transition={{
                        y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                        rotate: { duration: 8, repeat: Infinity, ease: "easeInOut" }
                      }}
                      className="w-full h-full object-contain filter select-none pointer-events-none transition-all duration-500"
                      style={{
                        // Hologram filter application: Blue/Red/Gold/Green tint, transparency, neon glow outline
                        filter: hologramView
                          ? `brightness(0.85) contrast(1.1) drop-shadow(0 0 15px ${activeColor.value}) drop-shadow(0 0 2px ${activeColor.value}) opacity(0.88)`
                          : `drop-shadow(0 15px 35px rgba(0,0,0,0.7))`
                      }}
                    />

                    {/* Glitch Overlay Effect during scanning */}
                    {isScanning && (
                      <div
                        className="absolute inset-0 bg-gradient-to-t from-transparent via-white/5 to-transparent mix-blend-overlay animate-pulse pointer-events-none"
                        style={{ filter: `hue-rotate(90deg)` }}
                      />
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Holographic Text label floating below the jacket inside the chamber */}
              <div className="absolute bottom-16 left-0 right-0 text-center z-20 pointer-events-none select-none px-4">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedJacket.id + "_text_group"}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    className="flex flex-col items-center"
                  >
                    <span
                      className="font-mono text-[9px] uppercase tracking-widest mb-1.5 font-bold"
                      style={{ color: activeColor.value }}
                    >
                      {selectedJacket.tagline}
                    </span>
                    <h3
                      className="font-display text-3xl md:text-4xl text-korda-white tracking-widest uppercase leading-tight"
                      style={{
                        textShadow: `0 0 12px ${activeColor.value}`
                      }}
                    >
                      {selectedJacket.name}
                    </h3>
                  </motion.div>
                </AnimatePresence>
              </div>

            </div>

            {/* Bottom Cybernetic Disc Emitter (Perspective Ellipse) */}
            <div className="relative w-full h-12 flex items-center justify-center">
              <div className="absolute w-[280px] h-[35px] rounded-full border border-korda-steel/40 bg-korda-steel/10 flex items-center justify-center transform scale-y-[0.3]">
                {/* Rotating Dashed Border */}
                <div
                  className="absolute inset-0 rounded-full border-2 border-dashed transition-colors duration-1000 animate-[spin_25s_linear_infinite]"
                  style={{ borderColor: activeColor.value, opacity: hologramView ? 0.7 : 0.3 }}
                />

                {/* Inner counter-rotating ring */}
                <div
                  className="absolute inset-2 rounded-full border border-dashed transition-colors duration-1000 animate-[spin_12s_linear_infinite_reverse]"
                  style={{ borderColor: activeColor.value, opacity: hologramView ? 0.5 : 0.2 }}
                />

                {/* Inner Solid Ring */}
                <div
                  className="absolute inset-4 rounded-full border-2 transition-colors duration-1000"
                  style={{ borderColor: activeColor.value, opacity: hologramView ? 0.3 : 0.1 }}
                />

                {/* Center Core Emitter Glow */}
                <div
                  className="absolute inset-6 rounded-full blur-[8px] transition-colors duration-1000"
                  style={{ backgroundColor: activeColor.value, opacity: hologramView ? 0.9 : 0.3 }}
                />
              </div>

              {/* Glowing Laser Pillars rising up from edges of emitter ring */}
              <div className="absolute w-[280px] h-[150px] bottom-6 pointer-events-none transform -translate-y-2 select-none overflow-hidden scale-y-[0.4]">
                <div
                  className="w-full h-full opacity-10"
                  style={{
                    background: `linear-gradient(to top, ${activeColor.value}, transparent)`
                  }}
                />
              </div>
            </div>

          </div>

          {/* RIGHT: FUTURISTIC HUD SPECS & CONTROLS (5 Cols on large screen) */}
          <div className="lg:col-span-5 flex flex-col justify-center gap-6">

            {/* 1. HUD SPECS PANEL */}
            <div className="bg-korda-steel/10 border border-korda-steel/60 p-6 md:p-8 rounded-sm relative">

              <div className="absolute top-0 right-4 transform -translate-y-1/2 bg-korda-black px-2 py-0.5 border border-korda-steel font-mono text-[8px] text-korda-white/40 uppercase">
                SPECIFICATIONS_READOUT
              </div>

              <div className="mb-4">
                <span className="font-mono text-[9px] text-korda-gold uppercase tracking-wider block mb-1">
                  {selectedJacket.tagline}
                </span>
                <h3 className="font-display text-3xl text-korda-white tracking-wide uppercase">
                  {selectedJacket.name}
                </h3>
              </div>

              {/* Key Specs Grid */}
              <div className="space-y-4 my-6">

                <div className="flex items-start gap-3">
                  <div className="p-1.5 bg-korda-steel/40 border border-korda-steel/80 text-korda-white/60">
                    <Shield size={14} />
                  </div>
                  <div>
                    <span className="font-mono text-[9px] text-korda-white/30 uppercase block">CORE PROTECTOR LAYER</span>
                    <span className="text-xs text-korda-white font-medium">{selectedJacket.specs.armor}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-1.5 bg-korda-steel/40 border border-korda-steel/80 text-korda-white/60">
                    <Layers size={14} />
                  </div>
                  <div>
                    <span className="font-mono text-[9px] text-korda-white/30 uppercase block">INTEGRATED CHASSIS MAT</span>
                    <span className="text-xs text-korda-white font-medium">{selectedJacket.specs.weave}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-1.5 bg-korda-steel/40 border border-korda-steel/80 text-korda-white/60">
                    <Cpu size={14} />
                  </div>
                  <div>
                    <span className="font-mono text-[9px] text-korda-white/30 uppercase block">SYSTEM MASS / FLOW INDEX</span>
                    <span className="text-xs text-korda-white font-medium">
                      Mass: {selectedJacket.specs.weight} / AirFlow: {selectedJacket.specs.airflow}
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-1.5 bg-korda-steel/40 border border-korda-steel/80 text-korda-white/60">
                    <Settings size={14} />
                  </div>
                  <div>
                    <span className="font-mono text-[9px] text-korda-white/30 uppercase block">SPECIALIZED CORE SYSTEM</span>
                    <span className="text-xs text-korda-white font-medium">{selectedJacket.specs.feature}</span>
                  </div>
                </div>

              </div>

              {/* Graphic Technical Specs Progress Bars */}
              <div className="border-t border-korda-steel/60 pt-4 space-y-3">
                <span className="font-mono text-[9px] text-korda-white/40 uppercase tracking-widest block mb-2">INTEGRATION METRICS</span>

                {selectedJacket.techSpecs.map((tech, i) => (
                  <div key={i} className="space-y-1">
                    <div className="flex justify-between font-mono text-[9px] uppercase tracking-wider text-korda-white/60">
                      <span>{tech.label}</span>
                      <span style={{ color: activeColor.value }} className="font-bold">{tech.value}</span>
                    </div>
                    <div className="h-1.5 w-full bg-korda-steel/30 rounded-sm overflow-hidden border border-korda-steel/50">
                      <motion.div
                        className="h-full rounded-sm transition-all duration-500"
                        style={{ backgroundColor: activeColor.value }}
                        initial={{ width: 0 }}
                        animate={{ width: tech.value }}
                        transition={{ duration: 0.8, delay: i * 0.1 }}
                      />
                    </div>
                  </div>
                ))}

              </div>
            </div>

            {/* 2. COLOR CORES SELECTOR */}
            <div className="bg-korda-steel/10 border border-korda-steel/60 p-6 rounded-sm relative">
              <div className="absolute top-0 right-4 transform -translate-y-1/2 bg-korda-black px-2 py-0.5 border border-korda-steel font-mono text-[8px] text-korda-white/40 uppercase">
                COLOR_CORE_CALIBRATOR
              </div>
              <span className="font-mono text-[9px] text-korda-white/40 uppercase tracking-widest block mb-3">SELECT PLASMA CORE COLOR</span>

              <div className="flex flex-wrap gap-3">
                {COLORS_CORES.map((col) => (
                  <button
                    key={col.id}
                    onClick={() => changeColorCore(col)}
                    className="flex-grow md:flex-grow-0 flex items-center justify-between gap-2 px-3 py-2 bg-korda-steel/20 border text-left cursor-none group transition-all duration-300 hover:bg-korda-steel/40"
                    style={{
                      borderColor: activeColor.id === col.id ? col.value : "rgba(28, 28, 30, 0.6)",
                      boxShadow: activeColor.id === col.id ? `0 0 10px ${col.secondary}` : "none"
                    }}
                  >
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: col.value }} />
                    <span className="font-mono text-[8px] tracking-widest text-korda-white/70 group-hover:text-korda-white uppercase">
                      {col.id}
                    </span>
                    {activeColor.id === col.id && (
                      <Check size={10} style={{ color: col.value }} />
                    )}
                  </button>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
export default HolographicShowroom;
