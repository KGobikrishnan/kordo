import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { MagneticButton } from "../ui/MagneticButton";

export function CTASection() {
  const navigate = useNavigate();

  return (
    <section className="relative w-full h-[80vh] min-h-[500px] bg-korda-black flex items-center justify-center overflow-hidden border-t border-korda-steel">
      {/* Cinematic Fog/Mist Overlay Background */}
      <div className="absolute inset-0 bg-korda-black">
        {/* Abstract animated gradient spheres to represent smoke/fog */}
        <div className="absolute top-[20%] left-[10%] w-[450px] h-[450px] bg-korda-steel/10 rounded-full blur-[100px] animate-[pulse_8s_infinite]" />
        <div className="absolute bottom-[10%] right-[15%] w-[550px] h-[550px] bg-korda-red/5 rounded-full blur-[120px] animate-[pulse_12s_infinite]" />
        
        {/* Subtle grid backdrop */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#111_1px,transparent_1px),linear-gradient(to_bottom,#111_1px,transparent_1px)] bg-[size:24px_24px] opacity-20" />
      </div>

      <div className="max-w-4xl mx-auto px-6 text-center relative z-10 space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-4"
        >
          <span className="font-mono text-xs uppercase tracking-widest text-korda-red font-bold">
            READY TO OUTPACE
          </span>
          
          <h2 className="font-display text-6xl md:text-8xl tracking-widest text-korda-white uppercase leading-none select-none">
            GEAR UP. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-korda-white via-korda-chrome to-korda-red">
              RIDE ON.
            </span>
          </h2>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="font-body text-sm text-korda-white/50 max-w-md mx-auto leading-relaxed"
        >
          Join the rank of elite motorcycle riders. Order your custom helmet and armored riding gears today with free global shipping.
        </motion.p>

        {/* Action Buttons wrapped in Magnetic wrappers */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-4"
        >
          <MagneticButton variant="filled" onClick={() => navigate("/helmets")}>
            SHOP COLLECTION <ArrowRight size={14} className="ml-1" />
          </MagneticButton>

          <MagneticButton variant="outline" onClick={() => navigate("/about")}>
            OUR PHILOSOPHY
          </MagneticButton>
        </motion.div>
      </div>

      {/* Decorative Technical Borders */}
      <div className="absolute top-8 left-8 hidden md:block font-mono text-[8px] text-korda-white/20 select-none uppercase">
        SYS_VER: 2.05 // LATENCY_REF: 0.12ms
      </div>
      <div className="absolute bottom-8 right-8 hidden md:block font-mono text-[8px] text-korda-white/20 select-none uppercase">
        SHOWROOM_GRID // MUNICH_DE
      </div>
    </section>
  );
}
export default CTASection;
