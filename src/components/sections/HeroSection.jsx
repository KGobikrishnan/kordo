import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { MagneticButton } from "../ui/MagneticButton";

// Canvas Particle Grid for Hero background
function ParticleGrid() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let animationFrameId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const particles = [];
    const particleCount = 65;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.5 + 0.5,
        speedX: Math.random() * 0.4 - 0.2,
        speedY: Math.random() * 0.4 - 0.2,
        alpha: Math.random() * 0.5 + 0.1
      });
    }

    const resizeHandler = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", resizeHandler);

    const drawParticles = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw Grid lines
      ctx.strokeStyle = "rgba(28, 28, 30, 0.15)";
      ctx.lineWidth = 1;
      const gridSize = 45;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Draw and Animate particles
      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;

        if (p.x < 0 || p.x > width) p.speedX *= -1;
        if (p.y < 0 || p.y > height) p.speedY *= -1;

        ctx.fillStyle = `rgba(232, 0, 45, ${p.alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(drawParticles);
    };

    drawParticles();

    return () => {
      window.removeEventListener("resize", resizeHandler);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />;
}

export function HeroSection() {
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images = [
    "/helmets/h1.png",
    "/helmets/h2.png",
    "/helmets/h3.png"
  ];

  // Rotate images every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full min-h-screen bg-korda-black flex items-center justify-center overflow-hidden py-12">
      {/* Red particle canvas background */}
      <ParticleGrid />

      <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
        {/* Left Side: Typography */}
        <div className="space-y-6 text-left order-2 lg:order-1">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex items-center space-x-2"
          >
            <span className="w-2 h-2 bg-korda-red rounded-full animate-ping" />
            <span className="font-mono text-xs uppercase tracking-widest text-korda-red font-bold">
              BETTER BY DESIGN
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-6xl md:text-8xl tracking-wider text-korda-white uppercase leading-none"
          >
            RIDE BEYOND <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-korda-white via-korda-chrome to-korda-red">
              LIMITS.
            </span>
          </motion.h1>

          {/* Red animated horizontal rule */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "160px" }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="h-[2px] bg-korda-red shadow-red-neon"
          />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="font-body text-base text-korda-white/60 max-w-md leading-relaxed"
          >
            Premium aerospace-certified motorcycle helmets, impact protectors, and armor systems engineered for speed riders who demand absolute technical excellence.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="pt-4"
          >
            <MagneticButton variant="filled" onClick={() => navigate("/helmets")}>
              EXPLORE GEAR <ArrowRight size={14} className="ml-1" />
            </MagneticButton>
          </motion.div>
        </div>

        {/* Right Side: Fading Image Slideshow */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.0, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full h-[350px] lg:h-[500px] flex items-center justify-center order-1 lg:order-2"
        >
          {/* Glowing back aura behind images */}
          <div className="absolute w-[280px] h-[280px] bg-korda-red/10 rounded-full blur-[80px] z-0 animate-pulse pointer-events-none" />

          {/* Technical panel container */}
          <div className="relative w-full max-w-[420px] aspect-square bg-korda-steel/15 border border-korda-steel/50 p-6 flex items-center justify-center overflow-hidden rounded-sm">
            {/* Tech details overlay */}
            <div className="absolute top-4 left-4 font-mono text-[8px] text-korda-white/30 tracking-widest uppercase">
              SHOWCASE_DISPLAY: ACTIVE
            </div>
            <div className="absolute bottom-4 right-4 font-mono text-[8px] text-korda-white/30 tracking-widest uppercase">
              GRID: LVL_0{currentImageIndex + 1}
            </div>

            {images.map((src, idx) => (
              <motion.img
                key={src}
                src={src}
                alt={`Korda Helmet display ${idx + 1}`}
                initial={{ opacity: 0, scale: 0.88 }}
                animate={{
                  opacity: idx === currentImageIndex ? 1 : 0,
                  scale: idx === currentImageIndex ? 1 : 0.88,
                  zIndex: idx === currentImageIndex ? 10 : 0
                }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="absolute w-4/5 h-4/5 object-contain select-none filter drop-shadow-[0_10px_20px_rgba(232,0,45,0.25)]"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://images.unsplash.com/photo-1599819811279-d5ad9cccf838?auto=format&fit=crop&q=80&w=600";
                }}
              />
            ))}
          </div>
        </motion.div>
      </div>

      {/* Right Edge Scroll indicator */}
      <div className="absolute right-8 bottom-16 hidden md:flex flex-col items-center space-y-4 z-20 pointer-events-none">
        <span className="font-mono text-[10px] tracking-widest text-korda-white/40 uppercase rotate-90 origin-right translate-x-2">
          SCROLL
        </span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-[1px] h-10 bg-gradient-to-b from-korda-red to-transparent"
        />
      </div>
    </section>
  );
}
export default HeroSection;
