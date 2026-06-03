import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Search, Shield, Cpu, Zap, Maximize2 } from "lucide-react";

const GALLERY_DATA = [
  {
    id: 1,
    name: "StormTrooper",
    img: "/helmets/gh1.jpeg",
    code: "SHELL_REF: ST-01",
    category: "Full Face",
    desc: "Carbon Matrix composite shell with dual-density EPS liners for elite track speed absorption.",
    gridClass: "md:col-span-2 md:row-span-2 min-h-[320px] md:min-h-[480px]",
    specs: { shell: "Carbon-Fiber", weight: "1280g", cert: "ECE 22.06 & FIM", aerodynamics: "Class-A" }
  },
  {
    id: 2,
    name: "Sonic GP",
    img: "/helmets/gh2.jpeg",
    code: "SHELL_REF: SGP-02",
    category: "Full Face",
    desc: "Track-focused aerodynamics featuring wind-tunnel extended spoilers and pinlock visor arrays.",
    gridClass: "md:col-span-1 md:row-span-1 min-h-[230px]",
    specs: { shell: "Polycarbonate", weight: "1350g", cert: "ECE 22.06", aerodynamics: "Race-Spoiler" }
  },
  {
    id: 3,
    name: "Icon",
    img: "/helmets/gh3.jpeg",
    code: "SHELL_REF: IC-03",
    category: "Classic",
    desc: "Heritage retro shape combined with modern safety structures and brown leather liners.",
    gridClass: "md:col-span-1 md:row-span-1 min-h-[230px]",
    specs: { shell: "Fiberglass Composite", weight: "1250g", cert: "ECE 22.06", aerodynamics: "Classic-Smooth" }
  },
  {
    id: 4,
    name: "Neo",
    img: "/helmets/gh4.jpeg",
    code: "SHELL_REF: NJ-04",
    category: "Open Face",
    desc: "Panoramic city shield configuration with built-in drop-down sun visor matrices.",
    gridClass: "md:col-span-1 md:row-span-2 min-h-[320px] md:min-h-[480px]",
    specs: { shell: "Thermo-injection", weight: "1100g", cert: "ECE 22.06", aerodynamics: "Open-Panoramic" }
  },
  {
    id: 5,
    name: "Shockwave",
    img: "/helmets/gh5.jpeg",
    code: "SHELL_REF: SW-05",
    category: "Off Road",
    desc: "Dirt riding chassis designed with extreme ventilation vents and wide goggle apertures.",
    gridClass: "md:col-span-1 md:row-span-1 min-h-[230px]",
    specs: { shell: "Tri-composite Matrix", weight: "1150g", cert: "ECE 22.06", aerodynamics: "Offroad Peak" }
  },
  {
    id: 6,
    name: "Tourance",
    img: "/helmets/gh6.jpeg",
    code: "SHELL_REF: TE-06",
    category: "Adventure",
    desc: "Expedition-grade modular adventure peak with dual-density sealing rings.",
    gridClass: "md:col-span-1 md:row-span-1 min-h-[230px]",
    specs: { shell: "Kevlar & Carbon Blend", weight: "1420g", cert: "ECE 22.06", aerodynamics: "Dual-purpose" }
  }
];

export function HelmetGallery() {
  const [activeItem, setActiveItem] = useState(null);
  const [isScanning, setIsScanning] = useState(false);

  const openLightbox = (item) => {
    setActiveItem(item);
    setIsScanning(true);
    setTimeout(() => setIsScanning(false), 1500);
  };

  return (
    <section className="space-y-8 text-left py-6">
      
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-korda-steel pb-6">
        <div>
          <div className="flex items-center space-x-2 mb-2">
            <span className="w-1.5 h-1.5 bg-korda-red rounded-full" />
            <span className="font-mono text-[9px] tracking-widest text-korda-red font-bold uppercase">
              SHELL PERFORMANCE GRID
            </span>
          </div>
          <h2 className="font-display text-4xl text-korda-white tracking-widest uppercase">
            HELMET SHELLS IN ACTION
          </h2>
        </div>
        <p className="font-body text-xs text-korda-white/40 max-w-sm leading-relaxed">
          Click any helmet capture below to initialize structural scanning diagnostics.
        </p>
      </div>

      {/* Asymmetrical Bento Box Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-fr">
        {GALLERY_DATA.map((item) => (
          <div
            key={item.id}
            onClick={() => openLightbox(item)}
            className={`relative bg-korda-charcoal border border-korda-steel p-6 flex flex-col justify-between overflow-hidden cursor-none group transition-all duration-500 hover:border-korda-red hover:shadow-red-neon ${item.gridClass}`}
          >
            {/* Background image with hover zoom */}
            <div 
              className="absolute inset-0 bg-cover bg-center filter brightness-90 group-hover:scale-105 transition-all duration-700 ease-out z-0"
              style={{ backgroundImage: `url(${item.img})` }}
            />
            {/* Tech Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-korda-black via-korda-black/30 to-transparent opacity-80 group-hover:opacity-65 transition-opacity duration-300 z-0" />
            
            {/* Technical targeting crosshair overlay on hover */}
            <div className="absolute inset-0 border border-korda-red/0 group-hover:border-korda-red/20 transition-colors duration-300 pointer-events-none z-10 m-4 flex items-center justify-center">
              <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-korda-red/0 group-hover:border-korda-red/60 transition-colors duration-300" />
              <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-korda-red/0 group-hover:border-korda-red/60 transition-colors duration-300" />
              <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-korda-red/0 group-hover:border-korda-red/60 transition-colors duration-300" />
              <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-korda-red/0 group-hover:border-korda-red/60 transition-colors duration-300" />
              
              {/* Maximize Icon */}
              <Maximize2 size={16} className="text-korda-white opacity-0 group-hover:opacity-70 scale-75 group-hover:scale-100 transition-all duration-300" />
            </div>

            {/* Top info */}
            <div className="relative z-10 self-start font-mono text-[8px] bg-korda-black/75 border border-korda-steel px-2 py-0.5 tracking-widest text-korda-white/40 uppercase">
              {item.code}
            </div>

            {/* Label / Name */}
            <div className="relative z-10 pt-16">
              <span className="font-mono text-[9px] text-korda-gold tracking-widest uppercase block mb-1">
                {item.category}
              </span>
              <h3 className="font-display text-2xl md:text-3xl text-korda-white tracking-widest uppercase group-hover:text-korda-red transition-colors">
                {item.name}
              </h3>
            </div>
          </div>
        ))}
      </div>

      {/* Diagnostics Lightbox Modal Overlay */}
      <AnimatePresence>
        {activeItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[999] bg-korda-black/95 backdrop-blur-md flex items-center justify-center p-4 md:p-8"
          >
            {/* Close Button overlay */}
            <button
              onClick={() => setActiveItem(null)}
              className="absolute top-6 right-6 p-2 bg-korda-steel/40 border border-korda-steel text-korda-white hover:text-korda-red cursor-none rounded-sm transition-colors z-50"
            >
              <X size={20} />
            </button>

            {/* Holographic Diagnostic Panel */}
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: -15 }}
              transition={{ type: "spring", stiffness: 120, damping: 18 }}
              className="w-full max-w-5xl bg-korda-charcoal border border-korda-steel p-6 md:p-10 rounded-sm relative grid grid-cols-1 lg:grid-cols-12 gap-8 overflow-hidden"
            >
              {/* Sci-fi targeting border decoration */}
              <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-korda-red/50 pointer-events-none" />
              <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-korda-red/50 pointer-events-none" />
              <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-korda-red/50 pointer-events-none" />
              <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-korda-red/50 pointer-events-none" />

              {/* Scanning sweep laser */}
              {isScanning && (
                <motion.div
                  className="absolute left-0 right-0 h-1 bg-korda-red shadow-[0_0_15px_#FF1744] z-30 pointer-events-none"
                  animate={{ top: ["5%", "95%", "5%"] }}
                  transition={{ duration: 1.5, ease: "easeInOut" }}
                />
              )}

              {/* Left Column: Visual scanner viewport */}
              <div className="lg:col-span-7 aspect-video lg:aspect-[4/3] bg-korda-black/50 border border-korda-steel/70 flex items-center justify-center relative overflow-hidden rounded-sm select-none">
                <div className="absolute inset-0 bg-[radial-gradient(#1c1c1e_1.5px,transparent_1.5px)] [background-size:20px_20px] opacity-15" />
                <img
                  src={activeItem.img}
                  alt={activeItem.name}
                  className="w-full h-full object-cover transition-transform duration-500 filter brightness-95"
                />

                {/* Reticle grid coordinates overlay */}
                <div className="absolute inset-4 border border-dashed border-korda-white/5 opacity-30 flex items-center justify-center pointer-events-none">
                  <div className="w-[1px] h-full bg-dashed bg-korda-white/5" />
                  <div className="h-[1px] w-full bg-dashed bg-korda-white/5" />
                </div>

                {/* Diagnostic scan lines status */}
                <div className="absolute bottom-3 left-3 bg-korda-black/80 px-2.5 py-1 border border-korda-steel font-mono text-[8px] tracking-widest text-korda-gold uppercase">
                  {isScanning ? "SCANNING_DENSITY..." : "SCAN_COMPLETE_100%"}
                </div>
              </div>

              {/* Right Column: Spec HUD diagnostics */}
              <div className="lg:col-span-5 flex flex-col justify-between text-left space-y-6">
                <div>
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="w-1.5 h-1.5 bg-korda-gold rounded-full animate-ping" />
                    <span className="font-mono text-[9px] tracking-widest text-korda-gold uppercase">
                      SHELL DIAGNOSTIC DATA
                    </span>
                  </div>
                  <h3 className="font-display text-4xl text-korda-white tracking-widest uppercase">
                    {activeItem.name}
                  </h3>
                  <span className="font-mono text-[9px] text-korda-white/40 block mt-1">
                    {activeItem.code}
                  </span>
                  
                  <p className="font-body text-xs text-korda-white/60 leading-relaxed mt-4">
                    {activeItem.desc}
                  </p>
                </div>

                {/* Specs List values */}
                <div className="space-y-4 border-t border-b border-korda-steel py-4">
                  <div className="flex items-center gap-3">
                    <div className="p-1.5 bg-korda-steel/40 border border-korda-steel text-korda-white/60">
                      <Shield size={14} />
                    </div>
                    <div>
                      <span className="font-mono text-[8px] text-korda-white/30 uppercase block">OUTER MATRIX COMPOSITIONS</span>
                      <span className="text-xs text-korda-white font-medium">{activeItem.specs.shell}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="p-1.5 bg-korda-steel/40 border border-korda-steel text-korda-white/60">
                      <Cpu size={14} />
                    </div>
                    <div>
                      <span className="font-mono text-[8px] text-korda-white/30 uppercase block">SYSTEM SHIELD MASS / CERTIFICATION</span>
                      <span className="text-xs text-korda-white font-medium">
                        Mass: {activeItem.specs.weight} / Compliance: {activeItem.specs.cert}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="p-1.5 bg-korda-steel/40 border border-korda-steel text-korda-white/60">
                      <Zap size={14} />
                    </div>
                    <div>
                      <span className="font-mono text-[8px] text-korda-white/30 uppercase block">AERODYNAMIC PROFILE</span>
                      <span className="text-xs text-korda-white font-medium">{activeItem.specs.aerodynamics}</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={() => {
                      setIsScanning(true);
                      setTimeout(() => setIsScanning(false), 1500);
                    }}
                    className="flex-grow py-3 font-mono text-[9px] tracking-widest bg-korda-steel/20 border border-korda-steel hover:border-korda-gold hover:text-korda-gold transition-colors text-center uppercase cursor-none"
                  >
                    RE-SCAN MATRIX
                  </button>
                  <button
                    onClick={() => setActiveItem(null)}
                    className="flex-grow py-3 font-mono text-[9px] tracking-widest bg-korda-red text-white hover:bg-korda-glow hover:shadow-red-neon transition-colors text-center uppercase cursor-none"
                  >
                    DISMISS DATALOG
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}
export default HelmetGallery;
