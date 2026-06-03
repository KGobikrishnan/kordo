import { Link } from "react-router-dom";
import { Instagram, Youtube, Facebook, ArrowUpRight } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-korda-black border-t-2 border-korda-red/80 pt-16 pb-8 overflow-hidden">
      {/* Glow effect on border */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-korda-glow blur-[8px]" />

      {/* Grid Layout: 2 Columns on Mobile (Column 1 is full-width 1*1, Columns 2/3 are half-width 1*2), 3 Columns on Desktop */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-3 gap-12 mb-16">
        {/* Column 1: Brand details (takes full-width on mobile: col-span-2) */}
        <div className="col-span-2 md:col-span-1 space-y-4">
          <Link to="/" className="text-3xl font-display tracking-widest text-korda-white cursor-none">
            KORDA<span className="text-korda-red text-4xl inline-block -translate-y-1">.</span>
          </Link>
          <p className="text-sm font-mono text-korda-red tracking-widest">BETTER BY DESIGN</p>
          <p className="text-xs text-korda-white/50 leading-relaxed font-body">
            Engineering premium safety armor and high-performance garments for urban racers, expedition tourers, and modern motorcyclists who refuse to compromise.
          </p>
          
          {/* Social media icons placed below description */}
          <div className="flex space-x-4 pt-2">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full border border-korda-steel flex items-center justify-center text-korda-white/70 hover:border-korda-red hover:text-korda-red transition-all duration-300 cursor-none"
            >
              <Instagram size={18} />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full border border-korda-steel flex items-center justify-center text-korda-white/70 hover:border-korda-red hover:text-korda-red transition-all duration-300 cursor-none"
            >
              <Youtube size={18} />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full border border-korda-steel flex items-center justify-center text-korda-white/70 hover:border-korda-red hover:text-korda-red transition-all duration-300 cursor-none"
            >
              <Facebook size={18} />
            </a>
          </div>
        </div>

        {/* Column 2: Products (half-width on mobile) */}
        <div className="col-span-1 md:col-span-1">
          <h4 className="text-sm font-mono tracking-widest text-korda-white uppercase mb-6 border-b border-korda-steel pb-2">
            PRODUCTS
          </h4>
          <ul className="space-y-3 font-body text-sm text-korda-white/60">
            <li>
              <Link to="/helmets" className="hover:text-korda-red hover:pl-1 transition-all duration-200 flex items-center gap-1 cursor-none">
                Helmets <ArrowUpRight size={12} className="opacity-40" />
              </Link>
            </li>
            <li>
              <Link to="/apparel" className="hover:text-korda-red hover:pl-1 transition-all duration-200 flex items-center gap-1 cursor-none">
                Apparel Gears <ArrowUpRight size={12} className="opacity-40" />
              </Link>
            </li>
            <li>
              <Link to="/boots" className="hover:text-korda-red hover:pl-1 transition-all duration-200 flex items-center gap-1 cursor-none">
                Riding Boots <ArrowUpRight size={12} className="opacity-40" />
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 3: Information (half-width on mobile) */}
        <div className="col-span-1 md:col-span-1">
          <h4 className="text-sm font-mono tracking-widest text-korda-white uppercase mb-6 border-b border-korda-steel pb-2">
            COMPANY
          </h4>
          <ul className="space-y-3 font-body text-sm text-korda-white/60">
            <li>
              <Link to="/about" className="hover:text-korda-red hover:pl-1 transition-all duration-200 cursor-none">
                Our Philosophy
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-korda-red hover:pl-1 transition-all duration-200 cursor-none">
                D3O® Smart Armor Tech
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-korda-red hover:pl-1 transition-all duration-200 cursor-none">
                Showrooms & Dealers
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto px-6 pt-8 border-t border-korda-steel flex flex-col md:flex-row justify-between items-center text-xs font-mono text-korda-white/40">
        <p>© {currentYear} KORDA® MOTORCYCLE LIFESTYLE. ALL RIGHTS RESERVED.</p>
        <div className="flex space-x-6 mt-4 md:mt-0">
          <Link to="/" className="hover:text-korda-red transition-colors cursor-none">
            PRIVACY
          </Link>
          <Link to="/" className="hover:text-korda-red transition-colors cursor-none">
            TERMS OF USE
          </Link>
          <button
            onClick={scrollToTop}
            className="hover:text-korda-red transition-colors flex items-center gap-1 cursor-none"
          >
            TOP ↑
          </button>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
