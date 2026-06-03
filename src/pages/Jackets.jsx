import { useState } from "react";
import { ProductCard } from "../components/ui/ProductCard";
import { apparel } from "../data/products";

export function Jackets() {
  const [selectedColors, setSelectedColors] = useState({});

  const handleColorChange = (productId, colorHex) => {
    setSelectedColors((prev) => ({
      ...prev,
      [productId]: colorHex
    }));
  };

  const jacketsList = apparel.jackets || [];

  return (
    <div className="w-full min-h-screen bg-korda-black py-12">
      <div className="max-w-7xl mx-auto px-6 space-y-12 text-left">
        
        {/* Banner Section */}
        <div className="bg-korda-charcoal border border-korda-steel p-8 rounded-sm grid grid-cols-1 md:grid-cols-2 gap-8 items-center relative overflow-hidden">
          <div className="absolute inset-0 bg-diagonal-texture opacity-10" />
          <div className="space-y-4 relative z-10">
            <span className="font-mono text-[9px] text-korda-red tracking-widest uppercase font-bold">
              CORDURA WEAPON-GRADE PROTECTION
            </span>
            <h1 className="font-display text-5xl md:text-7xl text-korda-white tracking-wider uppercase leading-none">
              RIDING <br />
              JACKETS.
            </h1>
            <p className="font-body text-xs text-korda-white/50 leading-relaxed max-w-md">
              High density abrasion protection armed with flexible D3O protective layers at key crash spots (knees, hips, elbows, knuckles) ensuring maximum deceleration absorbs on strike.
            </p>
          </div>
          <div className="p-6 bg-korda-black/50 border border-korda-steel space-y-4">
            <h3 className="font-mono text-xs text-korda-gold font-bold uppercase tracking-widest">
              TECHNOLOGY: CORDURA®
            </h3>
            <p className="font-body text-xs text-korda-white/45 leading-relaxed">
              Korda jackets are constructed using certified Cordura fabric weaves, offering superior abrasion, tear, and scuff resistance under extreme track velocities.
            </p>
          </div>
        </div>

        {/* Section divider */}
        <div className="flex items-center justify-between border-b border-korda-steel pb-6">
          <h2 className="font-mono text-xs text-korda-white/70 uppercase tracking-widest">
            ARMORED FLEET CATALOG
          </h2>
          <div className="font-mono text-[10px] text-korda-white/40 uppercase">
            SHOWING {jacketsList.length} SHIELDS
          </div>
        </div>

        {/* Grid Lineup */}
        <div className="grid grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-8">
          {jacketsList.map((prod) => {
            const activeColor = selectedColors[prod.id] || prod.colors?.[0] || "#E8002D";
            // Map jackets to their respective j1-j5 images (ID 101 -> j1, 102 -> j2...)
            const jacketImg = `/jackets/j${prod.id - 100}.png`;
            
            return (
              <div key={prod.id} className="relative flex flex-col justify-between group">
                <ProductCard
                  name={prod.name}
                  category="Jacket"
                  price={prod.price}
                  tag={prod.tag}
                  specs={prod.features}
                  color={activeColor}
                  img={jacketImg}
                />

                {/* Color swatch controls */}
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
            );
          })}
        </div>

      </div>
    </div>
  );
}
export default Jackets;
