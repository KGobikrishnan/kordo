import { useState } from "react";
import { ProductViewer3D } from "../components/three/ProductViewer3D";
import { ProductCard } from "../components/ui/ProductCard";
import { boots } from "../data/products";
import { ShieldCheck, Award, Zap } from "lucide-react";

export function Boots() {
  const [hoveredD3O, setHoveredD3O] = useState(false);

  return (
    <div className="w-full min-h-screen bg-korda-black py-12">
      <div className="max-w-7xl mx-auto px-6 space-y-16 text-left">
        
        {/* Hero 3D Showcase Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left: 3D interactive viewer */}
          <div className="lg:col-span-6 relative">
            <ProductViewer3D />
          </div>

          {/* Right: Technical specifications and brand details */}
          <div className="lg:col-span-6 space-y-6">
            <span className="font-mono text-[9px] text-korda-red tracking-widest uppercase font-bold flex items-center gap-1.5">
              <Zap size={10} className="animate-pulse" /> EXPEDITION GRADE SHELLS
            </span>
            <h1 className="font-display text-5xl md:text-7xl text-korda-white tracking-wider uppercase leading-none">
              RECON ADV <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-korda-white to-korda-red">
                D3O® ARMOR.
              </span>
            </h1>
            <p className="font-body text-xs text-korda-white/50 leading-relaxed">
              Engineered with full-grain cowhide leather, steel shank underlays, Vibram outsoles, and dual-compound polymer D3O impact discs covering ankle points. Fully dust and waterproof sealed.
            </p>

            {/* Highlighting technical features with D3O pulsing badge */}
            <div
              className="bg-korda-charcoal border border-korda-steel p-6 flex flex-col justify-between transition-all duration-300 relative overflow-hidden"
              onMouseEnter={() => setHoveredD3O(true)}
              onMouseLeave={() => setHoveredD3O(false)}
            >
              <div className="absolute top-0 right-0 w-[120px] h-[120px] bg-korda-red/5 rounded-full blur-[50px]" />
              
              <div className="flex justify-between items-start mb-4">
                <span className="font-mono text-[9px] text-korda-gold tracking-widest uppercase">
                  D3O® SMART BEACON
                </span>
                
                {/* Pulsing ring indicator */}
                <div className="relative flex h-3 w-3">
                  <span className={`animate-ping absolute inline-flex h-full w-full rounded-full bg-korda-red opacity-75 duration-1000 ${hoveredD3O ? "scale-150" : ""}`} />
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-korda-red" />
                </div>
              </div>

              <h3 className="font-display text-2xl text-korda-white uppercase tracking-wider mb-2">
                PULSING ANKLE DISCS
              </h3>
              <p className="font-body text-xs text-korda-white/45 leading-relaxed">
                Notice the D3O badge pulse. In dynamic movements, this orange elastomer is soft, flexing smoothly with the ankle's gait. On impact, the polymer locks solid within microseconds, dampening shock forces before transferring stress to bones.
              </p>
            </div>
          </div>
        </div>

        {/* Technical catalogs grid */}
        <div className="space-y-8">
          <div className="flex items-center space-x-2 border-b border-korda-steel pb-6">
            <ShieldCheck className="text-korda-red" size={20} />
            <h2 className="font-display text-3xl text-korda-white tracking-widest uppercase">
              EXPEDITION BOOTS CATALOG
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-6">
            {boots.map((b) => (
              <ProductCard
                key={b.id}
                name={b.name}
                category={b.type}
                price={b.price}
                tag="ADVENTURE"
                tech={b.tech}
                specs={b.specs}
                color="#E8002D"
              />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
export default Boots;
