import { useState, useRef } from "react";
import { BadgePill } from "./BadgePill";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export function ProductCard({
  name,
  category,
  price,
  tag,
  cert,
  tech,
  specs,
  color,
  img,
  onClick
}) {
  const cardRef = useRef(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    // Mouse coordinates relative to card center
    const mouseX = e.clientX - rect.left - width / 2;
    const mouseY = e.clientY - rect.top - height / 2;

    // Calculate rotation angles (max 10 degrees)
    const rotateX = -(mouseY / (height / 2)) * 10;
    const rotateY = (mouseX / (width / 2)) * 10;

    setRotate({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
    setIsHovered(false);
  };

  // Generate a procedural schematic representation for visual excellence instead of empty placeholders
  const renderProductFallback = () => {
    return (
      <div className="relative w-full h-32 md:h-48 bg-korda-charcoal border border-korda-steel flex items-center justify-center overflow-hidden group-hover:border-korda-red/35 transition-colors duration-300">
        {/* Decorative Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1c1c1e_1px,transparent_1px),linear-gradient(to_bottom,#1c1c1e_1px,transparent_1px)] bg-[size:14px_24px] opacity-20" />
        
        {/* Glowing aura */}
        <div 
          className="absolute w-16 h-16 md:w-24 md:h-24 rounded-full blur-[30px] md:blur-[40px] opacity-20 group-hover:opacity-40 transition-opacity duration-500"
          style={{ backgroundColor: color || "#E8002D" }}
        />

        {/* Technical crosshairs */}
        <div className="absolute top-2 left-2 font-mono text-[7px] text-korda-white/20 sm:block hidden">
          SYS: 0x4B3A
        </div>
        <div className="absolute bottom-2 right-2 font-mono text-[7px] text-korda-white/20 sm:block hidden">
          GRID: LVL_9
        </div>

        {/* Sleek abstract shape */}
        <div 
          className="relative w-20 h-20 md:w-28 md:h-28 border border-korda-white/10 rounded-full flex items-center justify-center group-hover:scale-105 group-hover:border-korda-red/30 transition-all duration-500"
        >
          {/* Inner ring */}
          <div className="w-14 h-14 md:w-20 md:h-20 border border-dashed border-korda-white/15 rounded-full animate-[spin_40s_linear_infinite]" />
          
          {/* Central schematic */}
          <div 
            className="absolute w-8 h-8 md:w-12 md:h-12 flex items-center justify-center rounded-sm rotate-45 border"
            style={{ 
              borderColor: isHovered ? "#E8002D" : "rgba(192, 192, 192, 0.2)",
              backgroundColor: isHovered ? "rgba(232, 0, 45, 0.05)" : "transparent"
            }}
          >
            <div 
              className="w-2.5 h-2.5 md:w-4 md:h-4 rounded-full"
              style={{ backgroundColor: color || "#E8002D" }}
            />
          </div>
        </div>
      </div>
    );
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className="perspective-card cursor-none group w-full"
      style={{
        transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
        transition: isHovered ? "none" : "transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)"
      }}
    >
      <div
        className={`bg-korda-steel/30 border p-4 md:p-6 flex flex-col justify-between transition-all duration-300 ${
          isHovered
            ? "border-korda-red shadow-red-neon bg-korda-steel/50"
            : "border-korda-steel"
        }`}
      >
        {/* Badges / Header */}
        <div className="flex justify-between items-start mb-4">
          <div className="flex flex-col gap-1">
            <span className="text-[8px] md:text-[10px] font-mono tracking-widest text-korda-white/40 uppercase">
              {category}
            </span>
            {cert && <span className="text-[7px] md:text-[9px] font-mono text-korda-gold font-bold">{cert}</span>}
          </div>
          {tag && (
            <BadgePill color={tag === "FLAGSHIP" || tag === "TRACK" ? "red" : "gold"} className="!px-1.5 !py-0.5 !text-[7px] md:!text-[9px]">
              {tag}
            </BadgePill>
          )}
        </div>

        {/* Schematic Canvas representation */}
        <div className="mb-4 md:mb-6 relative z-10">
          {img ? (
            <div className="relative w-full h-32 md:h-48 bg-korda-charcoal border border-korda-steel flex items-center justify-center overflow-hidden group-hover:border-korda-red/35 transition-colors duration-300">
              {/* Decorative Grid */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#1c1c1e_1px,transparent_1px),linear-gradient(to_bottom,#1c1c1e_1px,transparent_1px)] bg-[size:14px_24px] opacity-20" />
              
              {/* Glowing aura */}
              <div 
                className="absolute w-16 h-16 md:w-24 md:h-24 rounded-full blur-[30px] md:blur-[40px] opacity-20 group-hover:opacity-40 transition-opacity duration-500"
                style={{ backgroundColor: color || "#E8002D" }}
              />

              <img
                src={img}
                alt={name}
                className="relative z-10 w-4/5 h-4/5 object-contain select-none pointer-events-none transition-transform duration-500 group-hover:scale-105 filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.5)]"
              />
            </div>
          ) : (
            renderProductFallback()
          )}
        </div>

        {/* Product Details */}
        <div className="space-y-3">
          <div className="flex justify-between items-baseline gap-1.5">
            <h3 className="font-display text-base md:text-2xl tracking-wider text-korda-white group-hover:text-korda-red transition-colors duration-200 truncate max-w-[65%] uppercase">
              {name}
            </h3>
            <span className="font-mono text-xs md:text-sm text-korda-white/70 font-semibold">
              {price}
            </span>
          </div>

          {/* Specs list on hover (or subtle specs details) */}
          {specs && (
            <ul className="text-[8px] md:text-[10px] font-mono text-korda-white/50 space-y-1 pt-2 border-t border-korda-steel/65">
              {specs.slice(0, 2).map((spec, i) => (
                <li key={i} className="truncate flex items-center gap-1">
                  <span className="w-1 h-1 bg-korda-red rounded-full" />
                  {spec}
                </li>
              ))}
            </ul>
          )}

          {/* D3O Ankle protection Badge pill for Boots */}
          {tech && (
            <div className="flex flex-wrap gap-1 pt-2">
              {tech.map((t, idx) => (
                <span
                  key={idx}
                  className={`text-[7px] md:text-[8px] font-mono px-1.5 py-0.5 border rounded-sm ${
                    t === "D3O"
                      ? "bg-korda-red/10 border-korda-red/30 text-korda-red font-bold animate-[pulse_2s_infinite]"
                      : "bg-korda-steel border-korda-steel text-korda-white/50"
                  }`}
                >
                  {t}
                </span>
              ))}
            </div>
          )}

          {/* View CTA */}
          <div className="flex items-center justify-between text-xs font-mono tracking-widest pt-4 text-korda-white/50 group-hover:text-korda-red transition-colors duration-300">
            <span>EXPLORE PRODUCT</span>
            <motion.div
              animate={{ x: isHovered ? 5 : 0 }}
              transition={{ repeat: Infinity, repeatType: "reverse", duration: 0.6 }}
            >
              <ArrowRight size={14} />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
