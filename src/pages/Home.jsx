import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { HeroSection } from "../components/sections/HeroSection";
import { HolographicShowroom } from "../components/sections/HolographicShowroom";
import { PhilosophySection } from "../components/sections/PhilosophySection";
import { ProductsGrid } from "../components/sections/ProductsGrid";
import { SafetyTechSection } from "../components/sections/SafetyTechSection";
import { CTASection } from "../components/sections/CTASection";

function CategoryBgSlideshow({ images }) {
  const [imgIndex, setImgIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setImgIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [images]);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      {images.map((img, idx) => (
        <div
          key={img}
          className="absolute inset-0 bg-cover bg-center mix-blend-luminosity filter brightness-75 contrast-125 transition-opacity duration-1000 ease-in-out"
          style={{
            backgroundImage: `url(${img})`,
            opacity: idx === imgIndex ? 0.18 : 0,
            willChange: "opacity"
          }}
        />
      ))}
      {/* Dark overlay to ensure text is fully readable */}
      <div className="absolute inset-0 bg-gradient-to-t from-korda-black via-transparent to-korda-black/45 opacity-60 z-[1]" />
    </div>
  );
}

export function Home() {
  const navigate = useNavigate();

  // Premium Masonry Grid Categories config
  const categories = [
    {
      id: "helmets",
      name: "HELMETS",
      count: "6 MODELS Available",
      tech: "ECE 22.06 CERTIFIED",
      color: "rgba(232, 0, 45, 0.4)", // Red glow
      path: "/helmets",
      gridClass: "md:col-span-2 md:row-span-2 min-h-[300px] md:min-h-[450px]",
      bgImages: [
        "/helmets/gh1.jpeg",
        "/helmets/gh2.jpeg",
        "/helmets/gh3.jpeg",
        "/helmets/gh4.jpeg",
        "/helmets/gh5.jpeg",
        "/helmets/gh6.jpeg"
      ]
    },
    {
      id: "apparel-jackets",
      name: "JACKETS",
      count: "5 SHIELDS Available",
      tech: "CORDURA® & D3O® LEVEL 2",
      color: "rgba(184, 150, 30, 0.4)", // Gold glow
      path: "/jackets",
      gridClass: "md:col-span-1 md:row-span-1 min-h-[220px]",
      bgImages: [
        "/jackets/gj1.jpeg",
        "/jackets/gj2.jpeg",
        "/jackets/gj3.jpeg",
        "/jackets/gj4.jpeg",
        "/jackets/gj5.jpeg"
      ]
    },
    {
      id: "apparel-gloves",
      name: "GLOVES",
      count: "6 WEAVES Available",
      tech: "TPU KNUCLKES & CARBON",
      color: "rgba(192, 192, 192, 0.4)", // Chrome glow
      path: "/gloves",
      gridClass: "md:col-span-1 md:row-span-1 min-h-[220px]"
    },
    {
      id: "boots",
      name: "RIDING BOOTS",
      count: "4 SHANKS Available",
      tech: "VIBRAM® & D3O® CORE",
      color: "rgba(255, 23, 68, 0.4)", // Bright glow
      path: "/boots",
      gridClass: "md:col-span-2 md:row-span-1 min-h-[220px]",
      bgImages: [
        "/boots/gb1.jpeg",
        "/boots/gb2.jpeg",
        "/boots/gb3.jpeg",
        "/boots/gb4.jpeg"
      ]
    }
  ];

  return (
    <div className="w-full">
      {/* 1. Hero Landing Model Screen */}
      <HeroSection />

      {/* Holographic Jacket Armor Customizer (Spider-man Stark Tech style) */}
      <HolographicShowroom />

      {/* 2. Philosophy Trust Indicators */}
      <PhilosophySection />

      {/* 3. Featured 3D Showcase horizontal snap */}
      <ProductsGrid />

      {/* 4. Safety Specs sticking/pinning columns */}
      <SafetyTechSection />

      {/* 5. Product Categories Masonry Grid */}
      <section className="relative w-full py-24 bg-korda-black border-b border-korda-steel">
        <div className="max-w-7xl mx-auto px-6">
          
          {/* Section title */}
          <div className="flex items-center space-x-2 mb-12">
            <span className="w-1.5 h-1.5 bg-korda-red rounded-full" />
            <span className="font-mono text-[10px] tracking-widest text-korda-red font-bold uppercase">
              SHOWROOM NAVIGATION
            </span>
          </div>

          {/* Masonry Layout */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-fr">
            {categories.map((cat) => (
              <div
                key={cat.id}
                onClick={() => navigate(cat.path)}
                className={`relative bg-korda-charcoal border border-korda-steel p-8 flex flex-col justify-between overflow-hidden cursor-none group transition-all duration-500 hover:border-korda-red hover:shadow-red-neon ${cat.gridClass}`}
              >
                {/* Dynamic sliding background slideshow for categories that have bgImages */}
                {cat.bgImages ? (
                  <CategoryBgSlideshow images={cat.bgImages} />
                ) : (
                  /* Diagonal stripes backdrop */
                  <div className="absolute inset-0 bg-diagonal-texture opacity-10 group-hover:opacity-20 transition-opacity" />
                )}

                {/* Glowing neon sphere background inside category cell */}
                <div
                  className="absolute w-48 h-48 rounded-full blur-[80px] -bottom-16 -right-16 opacity-10 group-hover:opacity-35 transition-all duration-700 ease-out pointer-events-none"
                  style={{ backgroundColor: cat.color }}
                />

                {/* Top Corner Technical Info */}
                <div className="relative z-10 flex justify-between items-start font-mono text-[9px] text-korda-white/40 tracking-widest uppercase">
                  <span>{cat.count}</span>
                  <span className="text-korda-gold">{cat.tech}</span>
                </div>

                {/* Title and Action */}
                <div className="relative z-10 pt-16">
                  <h3 className="font-display text-4xl md:text-5xl text-korda-white tracking-widest mb-2 group-hover:text-korda-red transition-colors duration-300">
                    {cat.name}
                  </h3>
                  <div className="flex items-center gap-2 text-[10px] font-mono tracking-widest text-korda-white/30 group-hover:text-korda-red transition-colors duration-300">
                    <span>ENTER WAREHOUSE</span>
                    <span className="inline-block transform group-hover:translate-x-1 transition-transform">
                      →
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 6. Rider CTA */}
      <CTASection />
    </div>
  );
}
export default Home;
