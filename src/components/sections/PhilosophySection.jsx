import { motion } from "framer-motion";
import { ShieldCheck, Zap, Award } from "lucide-react";

export function PhilosophySection() {
  const stats = [
    {
      icon: <Award size={32} className="text-korda-red" />,
      number: "10+ Years",
      title: "Design Experience",
      desc: "Years of advanced product design and high-speed motorsport testing."
    },
    {
      icon: <ShieldCheck size={32} className="text-korda-gold" />,
      number: "ECE 22.06",
      title: "Certified Helmets",
      desc: "Exceeding strict European impact tests by over 30% shock mitigation."
    },
    {
      icon: <Zap size={32} className="text-korda-red" />,
      number: "D3O® Smart",
      title: "Impact Core Tech",
      desc: "Flexible under movement, molecular lock and solid protection on strike."
    }
  ];

  const containerVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.25, 1, 0.5, 1] }
    }
  };

  return (
    <section className="relative w-full bg-korda-charcoal py-20 border-y border-korda-steel">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-10"
        >
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              className="bg-korda-black/50 border border-korda-steel p-8 text-left rounded-sm relative group hover:border-korda-red/50 transition-all duration-300 hover:shadow-red-neon"
            >
              {/* Corner industrial notches */}
              <div className="absolute top-0 right-0 w-2 h-2 bg-korda-steel group-hover:bg-korda-red transition-colors" />
              
              <div className="mb-6 flex justify-between items-center">
                <div className="p-3 bg-korda-steel/40 border border-korda-steel rounded-sm">
                  {stat.icon}
                </div>
                <span className="font-mono text-[9px] text-korda-white/30 tracking-widest uppercase">
                  SPEC_0{idx + 1}
                </span>
              </div>

              <h3 className="font-display text-4xl text-korda-white mb-2 tracking-wider group-hover:text-korda-red transition-colors duration-200">
                {stat.number}
              </h3>
              
              <h4 className="font-mono text-xs text-korda-white/70 uppercase tracking-widest mb-4">
                {stat.title}
              </h4>
              
              <p className="font-body text-xs text-korda-white/45 leading-relaxed">
                {stat.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
export default PhilosophySection;
