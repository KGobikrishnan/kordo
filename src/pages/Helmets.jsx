import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ProductCard } from "../components/ui/ProductCard";
import { HelmetGallery } from "../components/sections/HelmetGallery";
import { helmets } from "../data/products";

export function Helmets() {
  const [filter, setFilter] = useState("All");
  const [heroColor, setHeroColor] = useState("#E8002D");
  const [heroImgIndex, setHeroImgIndex] = useState(0);

  const filters = ["All", "Full Face", "Open Face", "Off Road"];

  // Filtered list
  const filteredHelmets = helmets.filter(
    (h) => filter === "All" || h.category === filter
  );

  const heroImages = [
    "/helmets/h1.png",
    "/helmets/h2.png",
    "/helmets/h3.png"
  ];

  // Rotate images every 3 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setHeroImgIndex((prev) => (prev + 1) % heroImages.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full min-h-screen bg-korda-black py-12">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Main Catalog Column - now takes full span since compare is removed */}
        <div className="lg:col-span-12 space-y-12">
          
          {/* Hero Section */}
          <div className="bg-korda-charcoal border border-korda-steel p-8 rounded-sm grid grid-cols-1 md:grid-cols-12 gap-6 items-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-korda-red/5 rounded-full blur-[80px] pointer-events-none" />
            
            {/* Left side text */}
            <div className="md:col-span-7 text-left space-y-4 relative z-10">
              <span className="font-mono text-[9px] text-korda-red tracking-widest uppercase font-bold">
                HIGH VELOCITY ARMOR
              </span>
              <h1 className="font-display text-5xl md:text-7xl text-korda-white tracking-wider uppercase leading-none">
                THE HELMET <br />
                ACADEMY.
              </h1>
              <p className="font-body text-xs text-korda-white/50 leading-relaxed max-w-md">
                Tested to FIM and ECE 22.06 extremes. High density EPS channels with carbon matrix composites shell configurations. Choose your protective shell.
              </p>
              
              {/* Color Customizer */}
              <div className="space-y-2 pt-2">
                <span className="font-mono text-[8px] text-korda-white/40 tracking-wider uppercase block">
                  Interactive Ambient Glow:
                </span>
                <div className="flex space-x-3">
                  {["#E8002D", "#FFFFFF", "#B8961E", "#C0C0C0", "#1C1C1E"].map((col) => (
                    <button
                      key={col}
                      onClick={() => setHeroColor(col)}
                      className={`w-6 h-6 rounded-full border-2 transition-all cursor-none ${
                        heroColor === col ? "border-korda-red scale-110" : "border-transparent"
                      }`}
                      style={{ backgroundColor: col }}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Right side rotating high-quality helmet images with interactive glow */}
            <div className="md:col-span-5 h-[300px] flex items-center justify-center relative select-none">
              {/* Interactive background glow linked to color selector */}
              <div 
                className="absolute w-[220px] h-[220px] rounded-full blur-[65px] opacity-15 pointer-events-none transition-all duration-700 ease-out"
                style={{ backgroundColor: heroColor }}
              />
              
              <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
                {heroImages.map((src, idx) => (
                  <motion.img
                    key={src}
                    src={src}
                    alt="Korda Helmet Model"
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={{
                      opacity: idx === heroImgIndex ? 1 : 0,
                      scale: idx === heroImgIndex ? 1 : 0.85,
                      zIndex: idx === heroImgIndex ? 10 : 0
                    }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="absolute w-4/5 h-4/5 object-contain filter drop-shadow-[0_12px_24px_rgba(0,0,0,0.6)] select-none pointer-events-none"
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Helmet Academy Gallery Showcase */}
          <HelmetGallery />

          {/* Filtering bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-korda-steel pb-6 gap-4 text-left">
            <div className="flex flex-wrap gap-2">
              {filters.map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-4 py-2 font-mono text-[10px] tracking-widest uppercase border transition-all cursor-none ${
                    filter === f
                      ? "bg-korda-red text-white border-korda-red shadow-red-neon"
                      : "bg-korda-steel/30 border-korda-steel text-korda-white/60 hover:border-korda-white/20"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
            <div className="font-mono text-[10px] text-korda-white/40 uppercase">
              SHOWING {filteredHelmets.length} HELMET SHELLS
            </div>
          </div>

          {/* Grid lineup */}
          <div className="grid grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
            {filteredHelmets.map((helm) => {
              // Map the 6 helmets to the 3 available PNG files
              const helmetImg = `/helmets/h${((helm.id - 1) % 3) + 1}.png`;
              
              return (
                <div key={helm.id} className="relative flex flex-col justify-between">
                  <ProductCard
                    name={helm.name}
                    category={helm.category}
                    price={helm.price}
                    tag={helm.tag}
                    cert={helm.cert}
                    specs={helm.specs}
                    color={helm.color}
                    img={helmetImg}
                  />
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </div>
  );
}
export default Helmets;
