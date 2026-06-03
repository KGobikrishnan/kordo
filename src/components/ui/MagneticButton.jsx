import { useMagneticEffect } from "../../hooks/useMagneticEffect";

export function MagneticButton({
  children,
  onClick,
  variant = "filled", // "filled" | "ghost" | "outline"
  className = "",
  type = "button"
}) {
  const magneticRef = useMagneticEffect(0.25);

  const baseStyles =
    "relative inline-flex items-center justify-center px-8 py-4 font-mono text-xs uppercase tracking-widest transition-all duration-300 select-none overflow-hidden active:scale-95 cursor-none";

  const variants = {
    filled: "bg-korda-red text-white hover:bg-korda-glow hover:shadow-red-neon",
    ghost: "bg-transparent text-korda-white hover:bg-korda-steel/40 border border-transparent",
    outline: "bg-transparent text-korda-white border border-korda-white/30 hover:border-korda-red hover:text-korda-red"
  };

  return (
    <button
      ref={magneticRef}
      type={type}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </button>
  );
}
