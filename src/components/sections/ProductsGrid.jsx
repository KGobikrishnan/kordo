import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ProductCard } from "../ui/ProductCard";
import { helmets, boots } from "../../data/products";

export function ProductsGrid() {
  const navigate = useNavigate();

  // Combine top products to showcase
  const featuredProducts = [
    { ...helmets[0], type: "helmet" }, // StormTrooper
    { ...helmets[1], type: "helmet" }, // Sonic GP
    { ...boots[0], type: "boot" },      // Recon ADV
    { ...boots[1], type: "boot" }       // Pathfinder
  ];

  return (
    <section className="relative w-full py-24 bg-diagonal-texture border-b border-korda-steel overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 text-left">
          <div className="space-y-4 max-w-lg">
            <div className="flex items-center space-x-2">
              <span className="w-1.5 h-1.5 bg-korda-red rounded-full" />
              <span className="font-mono text-[10px] tracking-widest text-korda-red font-bold uppercase">
                FEATURED SHOWCASE
              </span>
            </div>
            <h2 className="font-display text-5xl md:text-6xl tracking-wider text-korda-white uppercase leading-none">
              THE RACING <br />
              LINEUP.
            </h2>
          </div>
          <p className="font-body text-xs text-korda-white/50 max-w-sm mt-4 md:mt-0 leading-relaxed">
            A curated selection of our finest high-performance riding armor. Grab yours now and step onto the track with complete security.
          </p>
        </div>

        {/* Snap Scroll Grid/Carousel Container */}
        <div className="relative">
          {/* Horizontal Snap Scroll Box */}
          <div className="flex gap-8 overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-thin scroll-smooth mask-image">
            {featuredProducts.map((prod) => (
              <div
                key={prod.id}
                className="min-w-[280px] sm:min-w-[320px] md:min-w-[360px] flex-1 snap-start"
              >
                <ProductCard
                  name={prod.name}
                  category={prod.category || prod.type}
                  price={prod.price}
                  tag={prod.tag || "PREMIUM"}
                  cert={prod.cert}
                  tech={prod.tech}
                  specs={prod.specs}
                  color={prod.color}
                  onClick={() => {
                    if (prod.type === "helmet") {
                      navigate("/helmets");
                    } else {
                      navigate("/boots");
                    }
                  }}
                />
              </div>
            ))}
          </div>

          {/* Mobile indicator notice */}
          <div className="flex justify-center mt-6 md:hidden">
            <span className="font-mono text-[9px] text-korda-white/30 tracking-widest uppercase">
              Swipe Left / Right to view
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
export default ProductsGrid;
