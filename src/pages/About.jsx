import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { GlobeRider } from "../components/three/GlobeRider";
import { MagneticButton } from "../components/ui/MagneticButton";
import { 
  Award, 
  Sparkles, 
  Layers, 
  Cpu, 
  Hammer, 
  ChevronRight, 
  ShieldCheck, 
  Compass, 
  ShieldAlert, 
  CheckCircle2 
} from "lucide-react";

export function About() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("fabrics");
  const [hoveredOccasion, setHoveredOccasion] = useState(null);

  const specTabs = {
    fabrics: {
      icon: <Layers size={18} className="text-korda-red" />,
      title: "FABRICS & TEXTILES",
      subtitle: "High-Abrasion Weave Formulations",
      desc: "Every yarn, thread gauge, and weave direction is selected to withstand severe friction slides and shearing forces. We only work with fabrics that guarantee premium durability and resistance.",
      specs: [
        { title: "Reinforced Aramid Blends", info: "Integrated into critical impact zones to resist friction heat and tearing." },
        { title: "Hydrophobic Finish", info: "Treated surface layers that repel road moisture, grit, and soil." },
        { title: "Bovine Leather Core", info: "Premium drum-dyed leathers designed to conform to the rider's body over time." }
      ]
    },
    components: {
      icon: <Cpu size={18} className="text-korda-gold" />,
      title: "SMART COMPONENTS",
      subtitle: "Impact Isolation Systems",
      desc: "Protective gear components are engineered for ease of use while offering high-performance shock absorption. Our smart polymer cores remain soft and flexible until impact.",
      specs: [
        { title: "Smart D3O® Armor Core", info: "Flexible, bio-dynamic protectors that instantly lock rigid upon collision." },
        { title: "Industrial YKK Fasteners", info: "High-tensile zips and closures built to prevent bursting under stress." },
        { title: "Dual-Ventilation Porting", info: "Air intake vents designed to offer maximum cooling without compromising shell integrity." }
      ]
    },
    production: {
      icon: <Hammer size={18} className="text-korda-red" />,
      title: "PRODUCTION PROCESS",
      subtitle: "Precision Industrial Assembly",
      desc: "Meticulous assembly standards eliminate critical seam failure points. Every production run is validated against severe load tests, ensuring that riders can fully depend on our gear.",
      specs: [
        { title: "Double Safety Overstitch", info: "Dual-locking stitches using heavy-gauge thread on structural joints." },
        { title: "Stress-Point Bar-Tacks", info: "Reinforced stitched bars on flex points subject to high tension." },
        { title: "ECE & CE Standard Checks", info: "Every helmet and garment shell exceeds global decelerating impact margins." }
      ]
    }
  };

  const occasions = [
    {
      id: "urban",
      title: "URBAN // STREET",
      tag: "DAILY COMMUTE",
      desc: "Optimized for daily flexibility and comfort off-bike, without compromising structural armor integrity. Light, breathable, and highly protective."
    },
    {
      id: "touring",
      title: "TOURING // ADVENTURE",
      tag: "MULTI-SEASON EXPEDITIONS",
      desc: "Pre-curved ergonomics engineered to prevent fatigue during long-distance rides. Packed with heavy-weather sealing and smart storage pockets."
    },
    {
      id: "track",
      title: "TRACK // PERFORMANCE",
      tag: "HIGH VELOCITY DECELERATION",
      desc: "Full race-grade bovine hides, composite slider systems, and aerodynamic structures designed for ultimate sliding resistance and high-speed protection."
    }
  ];

  return (
    <div className="w-full min-h-screen bg-korda-black text-korda-white overflow-hidden py-16">
      {/* Injecting marquee infinite scroll styling */}
      <style>{`
        @keyframes marquee-scroll {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee-custom {
          display: flex;
          width: max-content;
          animation: marquee-scroll 22s linear infinite;
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-6 space-y-28 text-left relative">
        
        {/* Decorative background aura */}
        <div className="absolute top-10 left-1/4 w-[400px] h-[400px] bg-korda-red/5 rounded-full filter blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-[350px] h-[350px] bg-korda-gold/5 rounded-full filter blur-[100px] pointer-events-none" />

        {/* Section 1: Hero Editorial Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start relative z-10">
          <div className="lg:col-span-8 space-y-6">
            <span className="font-mono text-[9px] text-korda-red tracking-[0.3em] uppercase font-bold bg-korda-steel/50 border border-korda-steel px-3 py-1.5 rounded-sm">
              BRAND STATEMENT // THE VISION
            </span>
            <h1 className="font-display text-6xl md:text-8xl text-korda-white tracking-wider uppercase leading-none">
              GEAR THAT REFLECTS <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-korda-white via-korda-chrome to-korda-red">
                YOUR LIFESTYLE.
              </span>
            </h1>
            <p className="font-body text-base md:text-lg text-korda-white/70 leading-relaxed font-light">
              KORDA® Motorcycle Lifestyle is a young brand that believes motorcycling is a lifestyle choice and its gear should reflect that same passion and vibrant energy. The focus of the brand is to create protective gear that is designed to be easy to use and yet offer the highest levels of protection possible for the occasion.
            </p>
          </div>
          
          <div className="lg:col-span-4 bg-korda-charcoal border border-korda-steel p-8 space-y-6 relative overflow-hidden group hover:border-korda-red/50 transition-colors duration-300">
            <div className="absolute inset-0 bg-diagonal-texture opacity-10" />
            <div className="absolute top-0 right-0 w-2.5 h-2.5 bg-korda-steel group-hover:bg-korda-red transition-colors duration-300" />
            
            <div className="relative z-10 space-y-4">
              <span className="font-mono text-[9px] text-korda-gold tracking-widest uppercase block">
                SYSTEM STATUS: ONLINE
              </span>
              <h3 className="font-display text-2xl text-korda-white uppercase tracking-widest">
                CORE ANTHEM
              </h3>
              <p className="font-body text-xs text-korda-white/50 leading-relaxed">
                Striving for excellence is not just an idea but rather our anthem. Original, fresh, innovative, and engineered to perform.
              </p>
              <div className="pt-2 border-t border-korda-steel flex justify-between items-center text-[10px] font-mono text-korda-white/40">
                <span>RIDER SAFETY CLASS_A</span>
                <span className="text-korda-red">● ACTV</span>
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Core DNA (The Team & Design Lab) */}
        <div className="space-y-12 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-korda-steel pb-6 gap-4">
            <div className="space-y-2">
              <span className="font-mono text-[9px] text-korda-gold tracking-widest uppercase block">
                THE EXPERT NETWORK
              </span>
              <h2 className="font-display text-4xl md:text-5xl text-korda-white uppercase tracking-wider">
                POWERED BY DECADES OF EXPERTISE
              </h2>
            </div>
            <p className="font-body text-xs text-korda-white/40 max-w-sm">
              Advanced styling and engineering calibrated by motorsport veterans and street riders.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-korda-charcoal border border-korda-steel p-8 rounded-sm space-y-6 hover:border-korda-red/45 hover:shadow-red-neon transition-all duration-300 relative group">
              <div className="absolute top-0 right-0 w-2 h-2 bg-korda-steel group-hover:bg-korda-red transition-colors" />
              <div className="flex items-center gap-4">
                <div className="p-3 bg-korda-steel/50 rounded-sm border border-korda-steel text-korda-red">
                  <Award size={24} />
                </div>
                <div className="space-y-0.5">
                  <span className="font-mono text-[9px] text-korda-white/30 tracking-widest uppercase block">SPECIFICATION_01</span>
                  <h3 className="font-display text-2xl text-korda-white uppercase tracking-wider">TEN YEARS IN RIDING GEAR</h3>
                </div>
              </div>
              <p className="font-body text-sm text-korda-white/60 leading-relaxed">
                Powered by a team that has spent over a decade in the design and production of riding gear for the everyday biker, KORDA® products represent the latest cutting-edge technology and know-how in the design and production of motorcycle wear.
              </p>
            </div>

            <div className="bg-korda-charcoal border border-korda-steel p-8 rounded-sm space-y-6 hover:border-korda-gold/45 hover:shadow-red-neon transition-all duration-300 relative group">
              <div className="absolute top-0 right-0 w-2 h-2 bg-korda-steel group-hover:bg-korda-gold transition-colors" />
              <div className="flex items-center gap-4">
                <div className="p-3 bg-korda-steel/50 rounded-sm border border-korda-steel text-korda-gold">
                  <Sparkles size={24} />
                </div>
                <div className="space-y-0.5">
                  <span className="font-mono text-[9px] text-korda-white/30 tracking-widest uppercase block">SPECIFICATION_02</span>
                  <h3 className="font-display text-2xl text-korda-white uppercase tracking-wider">IN-HOUSE STYLISTS</h3>
                </div>
              </div>
              <p className="font-body text-sm text-korda-white/60 leading-relaxed">
                In addition, our dedicated in-house stylists work tirelessly to ensure that your gear looks and feels great. We fuse state-of-the-art protective functions with modern styling, so you never have to compromise your aesthetic.
              </p>
            </div>
          </div>
        </div>

        {/* Section 3: Material Science & Integrity (Interactive Tabs) */}
        <div className="space-y-12 bg-korda-charcoal/50 border border-korda-steel p-8 md:p-12 rounded-sm relative z-10">
          <div className="absolute inset-0 bg-diagonal-texture opacity-5 pointer-events-none" />
          
          <div className="max-w-3xl space-y-4">
            <span className="font-mono text-[9px] text-korda-red tracking-[0.25em] uppercase font-bold bg-korda-steel/50 border border-korda-steel px-3 py-1 w-fit rounded-sm block">
              MATERIAL CORE // SYSTEMS & SPECS
            </span>
            <h2 className="font-display text-4xl md:text-5xl text-korda-white uppercase tracking-wider">
              MATERIAL INTEGRITY & COMPOSITION
            </h2>
            <p className="font-body text-sm text-korda-white/60 leading-relaxed font-light">
              KORDA® stands by its products and believes that riders should be able to depend on the brand. To have reliable products, we believe in only working with the best materials and processes. Fabrics, components, and production processes are always carefully selected keeping in mind that customers should not be let down by our products.
            </p>
          </div>

          {/* Interactive tab controls */}
          <div className="grid grid-cols-1 md:grid-cols-3 border border-korda-steel rounded-sm overflow-hidden bg-korda-black/40">
            {Object.keys(specTabs).map((key) => {
              const tab = specTabs[key];
              const isSelected = activeTab === key;
              return (
                <button
                  key={key}
                  onClick={() => setActiveTab(key)}
                  className={`flex items-center justify-between px-6 py-5 text-left transition-all duration-300 font-mono text-xs uppercase tracking-widest relative cursor-none border-b md:border-b-0 md:border-r last:border-r-0 last:border-b-0 border-korda-steel ${
                    isSelected ? "bg-korda-steel/70 text-korda-white" : "text-korda-white/40 hover:bg-korda-steel/30 hover:text-korda-white/70"
                  }`}
                >
                  <span className="flex items-center gap-3">
                    {tab.icon}
                    <span>{tab.title}</span>
                  </span>
                  {isSelected && (
                    <motion.div
                      layoutId="activeTabIndicator"
                      className="absolute bottom-0 left-0 w-full h-[2px] bg-korda-red"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <ChevronRight size={14} className={`opacity-40 transition-transform ${isSelected ? "translate-x-1" : ""}`} />
                </button>
              );
            })}
          </div>

          {/* Tab Content Display */}
          <div className="min-h-[280px] bg-korda-black/50 border border-korda-steel p-6 md:p-8 rounded-sm relative overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
              >
                <div className="lg:col-span-5 space-y-4">
                  <span className="font-mono text-[9px] text-korda-gold uppercase tracking-widest">
                    {specTabs[activeTab].subtitle}
                  </span>
                  <h3 className="font-display text-3xl text-korda-white uppercase tracking-wider">
                    {specTabs[activeTab].title}
                  </h3>
                  <p className="font-body text-xs text-korda-white/50 leading-relaxed">
                    {specTabs[activeTab].desc}
                  </p>
                </div>

                <div className="lg:col-span-7 space-y-4">
                  <span className="font-mono text-[9px] text-korda-white/30 uppercase tracking-widest block border-b border-korda-steel pb-2">
                    TECHNICAL PARAMETERS
                  </span>
                  <div className="space-y-4">
                    {specTabs[activeTab].specs.map((spec, idx) => (
                      <div key={idx} className="flex gap-4 items-start group">
                        <div className="p-1 bg-korda-steel border border-korda-steel text-korda-red mt-0.5 rounded-sm">
                          <CheckCircle2 size={12} />
                        </div>
                        <div className="space-y-1">
                          <h4 className="font-mono text-xs text-korda-white/80 group-hover:text-korda-red transition-colors duration-200">
                            {spec.title}
                          </h4>
                          <p className="font-body text-[11px] text-korda-white/45 leading-relaxed">
                            {spec.info}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Excellence Anthem Banner */}
          <div className="bg-korda-black/40 border border-korda-steel p-6 rounded-sm flex flex-col md:flex-row items-center justify-between gap-6 hover:shadow-red-neon-strong transition-all duration-300 group">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-korda-steel/70 rounded-sm border border-korda-steel text-korda-red shadow-red-neon">
                <ShieldCheck size={26} />
              </div>
              <div className="text-left space-y-1">
                <span className="font-mono text-[9px] text-korda-gold tracking-widest block uppercase">THE ANTHEM</span>
                <p className="font-display text-xl md:text-2xl text-korda-white uppercase tracking-widest group-hover:text-korda-red transition-colors">
                  At KORDA®, striving for excellence is not just an idea but rather our anthem.
                </p>
              </div>
            </div>
            <div className="font-mono text-[10px] text-korda-red uppercase tracking-widest font-bold">
              // MOT_SEC_09
            </div>
          </div>
        </div>

        {/* Section 4: Occasions & Purpose (3D Globe integration) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          
          {/* Globe Container */}
          <div className="lg:col-span-5 h-[350px] lg:h-[450px] relative border border-korda-steel/65 bg-korda-charcoal/30 rounded-sm overflow-hidden group">
            <div className="absolute inset-0 bg-diagonal-texture opacity-5" />
            <div className="absolute top-0 right-0 w-2.5 h-2.5 bg-korda-steel group-hover:bg-korda-red transition-colors" />
            <GlobeRider />
          </div>

          {/* Details & Occasions Selector */}
          <div className="lg:col-span-7 space-y-6">
            <span className="font-mono text-[9px] text-korda-red tracking-widest uppercase font-bold bg-korda-steel/50 border border-korda-steel px-3 py-1 rounded-sm w-fit block">
              SCENARIO DEPLOYMENT // PURPOSE BUILT
            </span>
            <h2 className="font-display text-4xl md:text-5xl text-korda-white tracking-widest uppercase leading-tight">
              BUILT TO LAST. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-korda-white via-korda-chrome to-korda-red">
                DESIGNED TO PERFORM.
              </span>
            </h2>
            <p className="font-body text-sm text-korda-white/60 leading-relaxed font-light">
              We ensure that our designs are original, fresh, innovative, and carefully engineered to serve a purpose. Our products are built to last and designed to perform in the best way possible for a given occasion. Simply put, our goal is that a motorcyclist should have the best experience possible with KORDA®.
            </p>

            {/* Occasion List Grid */}
            <div className="space-y-4 pt-4 border-t border-korda-steel">
              <span className="font-mono text-[9px] text-korda-white/40 uppercase tracking-widest block">
                HOVER TO DEPLOY OCCASION SPECIFICATIONS
              </span>
              <div className="grid grid-cols-1 gap-3">
                {occasions.map((o) => {
                  const isHovered = hoveredOccasion === o.id;
                  return (
                    <div
                      key={o.id}
                      onMouseEnter={() => setHoveredOccasion(o.id)}
                      onMouseLeave={() => setHoveredOccasion(null)}
                      className={`border px-5 py-4 rounded-sm transition-all duration-300 flex flex-col gap-2 ${
                        isHovered 
                          ? "border-korda-red bg-korda-steel/30 shadow-red-neon" 
                          : "border-korda-steel bg-korda-charcoal/50"
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <h4 className={`font-display text-xl tracking-wider transition-colors ${isHovered ? "text-korda-red" : "text-korda-white"}`}>
                          {o.title}
                        </h4>
                        <span className={`font-mono text-[8px] px-2 py-0.5 border rounded-sm transition-colors ${
                          isHovered ? "border-korda-red text-korda-red" : "border-korda-steel text-korda-white/40"
                        }`}>
                          {o.tag}
                        </span>
                      </div>
                      <AnimatePresence initial={false}>
                        {isHovered && (
                          <motion.p
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="font-body text-xs text-korda-white/65 leading-relaxed overflow-hidden"
                          >
                            {o.desc}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Section 5: Infinite Anthem Marquee */}
      <div className="w-full bg-korda-charcoal border-y border-korda-steel py-10 my-20 overflow-hidden relative group">
        <div className="absolute inset-0 bg-diagonal-texture opacity-5 pointer-events-none" />
        <div className="animate-marquee-custom">
          {/* Scroll segment 1 */}
          <span className="font-display text-6xl md:text-8xl text-transparent stroke-text tracking-widest uppercase px-4 select-none">
            LOOK GOOD. BE SAFE. <span className="text-korda-red font-bold">●</span> KORDA® MOTORCYCLE LIFESTYLE <span className="text-korda-gold font-bold">●</span>&nbsp;
          </span>
          <span className="font-display text-6xl md:text-8xl text-transparent stroke-text tracking-widest uppercase px-4 select-none">
            LOOK GOOD. BE SAFE. <span className="text-korda-red font-bold">●</span> KORDA® MOTORCYCLE LIFESTYLE <span className="text-korda-gold font-bold">●</span>&nbsp;
          </span>
          {/* Scroll segment 2 (needed for continuous loop) */}
          <span className="font-display text-6xl md:text-8xl text-transparent stroke-text tracking-widest uppercase px-4 select-none">
            LOOK GOOD. BE SAFE. <span className="text-korda-red font-bold">●</span> KORDA® MOTORCYCLE LIFESTYLE <span className="text-korda-gold font-bold">●</span>&nbsp;
          </span>
          <span className="font-display text-6xl md:text-8xl text-transparent stroke-text tracking-widest uppercase px-4 select-none">
            LOOK GOOD. BE SAFE. <span className="text-korda-red font-bold">●</span> KORDA® MOTORCYCLE LIFESTYLE <span className="text-korda-gold font-bold">●</span>&nbsp;
          </span>
        </div>

        {/* CSS outline utility inside the file for maximum compatibility */}
        <style>{`
          .stroke-text {
            -webkit-text-stroke: 1px rgba(245, 245, 240, 0.2);
            color: transparent;
            transition: -webkit-text-stroke 0.3s;
          }
          .group:hover .stroke-text {
            -webkit-text-stroke: 1px rgba(232, 0, 45, 0.45);
          }
        `}</style>
      </div>

      {/* Section 6: CTA Outro Block */}
      <div className="max-w-7xl mx-auto px-6 pb-12 relative z-10 text-center space-y-8">
        <div className="max-w-xl mx-auto space-y-4">
          <span className="font-mono text-[9px] text-korda-gold tracking-widest uppercase block font-bold">
            // TRANSMISSION COMPLETE
          </span>
          <h2 className="font-display text-5xl md:text-7xl text-korda-white uppercase tracking-wider leading-none">
            JOIN THE LIFESTYLE
          </h2>
          <p className="font-body text-xs text-korda-white/50 leading-relaxed">
            Equip yourself with protective gear engineered to absolute limits. Elevate your ride, reflect your passion, and look stunning at every occasion.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <MagneticButton
            variant="filled"
            onClick={() => navigate("/helmets")}
            className="w-full sm:w-auto px-10"
          >
            EXPLORE COLLECTIONS
          </MagneticButton>
          <MagneticButton
            variant="outline"
            onClick={() => navigate("/contact")}
            className="w-full sm:w-auto px-10"
          >
            GET IN TOUCH
          </MagneticButton>
        </div>
      </div>

    </div>
  );
}

export default About;
