import { ProductCard } from "../components/ui/ProductCard";
import { accessories } from "../data/products";

export function Accessories() {
  return (
    <div className="w-full min-h-screen bg-korda-black py-12">
      <div className="max-w-7xl mx-auto px-6 space-y-12 text-left">
        
        {/* Banner Section */}
        <div className="bg-korda-charcoal border border-korda-steel p-8 rounded-sm grid grid-cols-1 md:grid-cols-2 gap-8 items-center relative overflow-hidden">
          <div className="absolute inset-0 bg-diagonal-texture opacity-10" />
          <div className="space-y-4 relative z-10">
            <span className="font-mono text-[9px] text-korda-red tracking-widest uppercase font-bold">
              ESSENTIAL GEAR COMPLEMENTS
            </span>
            <h1 className="font-display text-5xl md:text-7xl text-korda-white tracking-wider uppercase leading-none">
              TACTICAL <br />
              ACCESSORIES.
            </h1>
            <p className="font-body text-xs text-korda-white/50 leading-relaxed max-w-md">
              High durability luggage, weather-protective bike skins, moisture-wicking balaclavas, and ergonomic riding socks engineered to optimize your high-velocity journeys.
            </p>
          </div>
          <div className="p-6 bg-korda-black/50 border border-korda-steel space-y-4">
            <h3 className="font-mono text-xs text-korda-gold font-bold uppercase tracking-widest">
              TECHNOLOGY: UTILITY FIT
            </h3>
            <p className="font-body text-xs text-korda-white/45 leading-relaxed">
              Every accessory in our fleet utilizes heavy duty stitching, weather-sealed zipper mechanisms, and lightweight composite fabrics built for prolonged weather exposure.
            </p>
          </div>
        </div>

        {/* Section divider */}
        <div className="flex items-center justify-between border-b border-korda-steel pb-6">
          <h2 className="font-mono text-xs text-korda-white/70 uppercase tracking-widest">
            TACTICAL ACCESSORIES CATALOG
          </h2>
          <div className="font-mono text-[10px] text-korda-white/40 uppercase">
            SHOWING {accessories.length} SOLUTIONS
          </div>
        </div>

        {/* Grid Lineup */}
        <div className="grid grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-8">
          {accessories.map((prod) => (
            <div key={prod.id} className="relative flex flex-col justify-between group">
              <ProductCard
                name={prod.name}
                category={prod.category}
                price={prod.price}
                tag={prod.tag}
                specs={prod.specs}
                color="#B8961E"
              />
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
export default Accessories;
