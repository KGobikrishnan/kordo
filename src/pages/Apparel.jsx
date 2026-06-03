import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ProductCard } from "../components/ui/ProductCard";
import { apparel } from "../data/products";
import { BadgePill } from "../components/ui/BadgePill";
import { Award, Layers, Compass } from "lucide-react";

export function Apparel() {
  const [searchParams, setSearchParams] = useSearchParams();
  
  // Track selected color per product ID (mock state to showcase color swatch selection)
  const [selectedColors, setSelectedColors] = useState({});

  const tabFromQuery = searchParams.get("tab");
  const activeTab = tabFromQuery && ["jackets", "gloves", "pants"].includes(tabFromQuery) ? tabFromQuery : "jackets";

  const setActiveTab = (newTab) => {
    setSearchParams({ tab: newTab });
  };

  const tabs = [
    { id: "jackets", label: "RIDING JACKETS", icon: <Layers size={14} /> },
    { id: "gloves", label: "TACTICAL GLOVES", icon: <Award size={14} /> },
    { id: "pants", label: "ARMORED PANTS", icon: <Compass size={14} /> }
  ];

  const handleColorChange = (productId, colorHex) => {
    setSelectedColors((prev) => ({
      ...prev,
      [productId]: colorHex
    }));
  };

  const currentProducts = apparel[activeTab] || [];

  return (
    <div className="w-full min-h-screen bg-korda-black py-12">
      <div className="max-w-7xl mx-auto px-6 space-y-12 text-left">
        
        {/* Banner Section */}
        <div className="bg-korda-charcoal border border-korda-steel p-8 rounded-sm grid grid-cols-1 md:grid-cols-2 gap-8 items-center relative overflow-hidden">
          <div className="absolute inset-0 bg-diagonal-texture opacity-10" />
          <div className="space-y-4 relative z-10">
            <span className="font-mono text-[9px] text-korda-red tracking-widest uppercase font-bold">
              CORDURA COMPOSITES
            </span>
            <h1 className="font-display text-5xl md:text-7xl text-korda-white tracking-wider uppercase leading-none">
              APPAREL & <br />
              GARMENTS.
            </h1>
            <p className="font-body text-xs text-korda-white/50 leading-relaxed max-w-md">
              High density abrasion protection loaded with modular impact liners. Perforated panels for track speeds and thermal shielding for extreme conditions.
            </p>
          </div>
          <div className="p-6 bg-korda-black/50 border border-korda-steel space-y-4">
            <h3 className="font-mono text-xs text-korda-gold font-bold uppercase tracking-widest">
              TECHNOLOGY: D3O® IMPACT
            </h3>
            <p className="font-body text-xs text-korda-white/45 leading-relaxed">
              Every garment in our catalog integrates flexible D3O protective layers at key crash spots (knees, hips, elbows, knuckles) ensuring maximum deceleration absorbs on strike.
            </p>
          </div>
        </div>

        {/* Tab Selection Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-korda-steel pb-6 gap-4">
          <div className="flex flex-wrap gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-5 py-3 font-mono text-[10px] tracking-widest uppercase border transition-all cursor-none flex items-center gap-2 ${
                  activeTab === tab.id
                    ? "bg-korda-red text-white border-korda-red shadow-red-neon"
                    : "bg-korda-steel/30 border-korda-steel text-korda-white/60 hover:border-korda-white/20"
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>
          <div className="font-mono text-[10px] text-korda-white/40 uppercase">
            SHOWING {currentProducts.length} DESIGNS
          </div>
        </div>

        {/* Products lineup */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="grid grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-8"
          >
            {currentProducts.map((prod) => {
              const activeColor = selectedColors[prod.id] || prod.colors?.[0] || "#E8002D";
              return (
                <div
                  key={prod.id}
                  className="flex flex-col justify-between group"
                >
                  <div className="relative">
                    <ProductCard
                      name={prod.name}
                      category={activeTab}
                      price={prod.price}
                      tag={prod.tag}
                      specs={prod.features}
                      color={activeColor}
                    />

                    {/* Color swatches in card container overlays */}
                    {prod.colors && (
                      <div className="absolute top-4 left-4 z-20 flex space-x-2 bg-korda-black/60 p-1.5 border border-korda-steel rounded-sm">
                        {prod.colors.map((c) => (
                          <button
                            key={c}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleColorChange(prod.id, c);
                            }}
                            className={`w-4 h-4 rounded-full border transition-transform cursor-none hover:scale-110 ${
                              activeColor === c ? "border-korda-red scale-105" : "border-white/20"
                            }`}
                            style={{ backgroundColor: c }}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </motion.div>
        </AnimatePresence>

      </div>
    </div>
  );
}
export default Apparel;
