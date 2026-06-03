export function BadgePill({ children, color = "red", className = "" }) {
  const colorStyles = {
    red: "bg-korda-red/10 text-korda-red border-korda-red/30",
    gold: "bg-korda-gold/10 text-korda-gold border-korda-gold/30",
    chrome: "bg-korda-chrome/10 text-korda-chrome border-korda-chrome/30",
    steel: "bg-korda-steel/30 text-korda-white/70 border-korda-steel"
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded-sm border text-[10px] font-mono tracking-widest uppercase ${colorStyles[color]} ${className}`}
    >
      {children}
    </span>
  );
}
