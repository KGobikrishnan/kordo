import { useState, useEffect, useRef } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { Search, Menu, X, ChevronDown, Home, Shield, Layers, Compass, Mail, Award, Zap } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { helmets, apparel, boots, accessories } from "../../data/products";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [subNavbarOpen, setSubNavbarOpen] = useState(false);
  
  const dropdownRef = useRef(null);
  const subNavbarRef = useRef(null);
  const lastClickTimeRef = useRef(0);
  const clickTimeoutRef = useRef(null);
  
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile and dropdown menu on page changes
  useEffect(() => {
    setIsOpen(false);
    setDropdownOpen(false);
    setSubNavbarOpen(false);
  }, [location.pathname, location.search]);

  // Click outside to close dropdown & sub navbar
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
      if (subNavbarRef.current && !subNavbarRef.current.contains(event.target)) {
        const apparelBtn = document.getElementById("mobile-bottom-apparel-btn");
        if (apparelBtn && !apparelBtn.contains(event.target)) {
          setSubNavbarOpen(false);
        }
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle ESC press to close search
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setSearchOpen(false);
        setSearchQuery("");
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Prevent scroll when search or full menu is active
  useEffect(() => {
    if (searchOpen || isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [searchOpen, isOpen]);

  // Double tap handler for mobile Apparel button
  const handleApparelClick = (e) => {
    e.preventDefault();
    const now = Date.now();
    const DOUBLE_PRESS_DELAY = 300;

    if (now - lastClickTimeRef.current < DOUBLE_PRESS_DELAY) {
      // Double tap detected: Clear single tap timer and navigate to /apparel
      if (clickTimeoutRef.current) {
        clearTimeout(clickTimeoutRef.current);
        clickTimeoutRef.current = null;
      }
      navigate("/apparel");
      setSubNavbarOpen(false);
    } else {
      // Single tap detected: Wait to see if it is a double tap
      clickTimeoutRef.current = setTimeout(() => {
        setSubNavbarOpen((prev) => !prev);
        clickTimeoutRef.current = null;
      }, DOUBLE_PRESS_DELAY);
    }
    lastClickTimeRef.current = now;
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Helmets", path: "/helmets" },
    {
      name: "Apparel",
      path: "/jackets",
      hasDropdown: true,
      dropdownItems: [
        { name: "Jackets", path: "/jackets" },
        { name: "Gloves", path: "/gloves" },
        { name: "Pants", path: "/pants" },
        { name: "Riding Boots", path: "/boots" }
      ]
    },
    { name: "Layers", path: "/apparel" },
    { name: "Accessories", path: "/accessories" },
    { name: "About Us", path: "/about" },
    { name: "Contact", path: "/contact" }
  ];

  // Mobile persistent bottom navbar navigation items (Flipkart style)
  const bottomNavLinks = [
    { name: "Home", path: "/", icon: <Home size={20} /> },
    { name: "Helmets", path: "/helmets", icon: <Shield size={20} /> },
    { name: "Apparel", path: "/apparel", icon: <Layers size={20} /> },
    { name: "Gear", path: "/accessories", icon: <Compass size={20} /> },
    { name: "Contact", path: "/contact", icon: <Mail size={20} /> }
  ];

  // Mobile bottom sub-navbar items (Jackets, Gloves, Pants, Riding Boots)
  const subCategories = [
    { name: "Jackets", path: "/jackets", icon: <Layers size={16} /> },
    { name: "Gloves", path: "/gloves", icon: <Award size={16} /> },
    { name: "Pants", path: "/pants", icon: <Compass size={16} /> },
    { name: "Boots", path: "/boots", icon: <Zap size={16} /> }
  ];

  // Compile search database
  const allProducts = [
    ...helmets.map((p) => ({ ...p, type: "Helmets", path: "/helmets" })),
    ...apparel.jackets.map((p) => ({ ...p, type: "Jackets", path: "/jackets" })),
    ...apparel.gloves.map((p) => ({ ...p, type: "Gloves", path: "/gloves" })),
    ...apparel.pants.map((p) => ({ ...p, type: "Pants", path: "/pants" })),
    ...boots.map((p) => ({ ...p, type: "Riding Boots", path: "/boots" })),
    ...accessories.map((p) => ({ ...p, type: "Accessories", path: "/accessories" }))
  ];

  const filteredProducts =
    searchQuery.trim() === ""
      ? []
      : allProducts.filter(
          (p) =>
            p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (p.category && p.category.toLowerCase().includes(searchQuery.toLowerCase())) ||
            (p.type && p.type.toLowerCase().includes(searchQuery.toLowerCase())) ||
            (p.description && p.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
            (p.tag && p.tag.toLowerCase().includes(searchQuery.toLowerCase()))
        );

  return (
    <>
      {/* Top Header */}
      <header
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-500 ease-in-out border-b ${
          scrolled
            ? "bg-[#111111]/85 backdrop-blur-md border-korda-steel py-4"
            : "bg-transparent border-transparent py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center group cursor-none">
            <img
              src="/logo.png"
              alt="Korda® Logo"
              className="h-8 w-auto object-contain select-none"
              onError={(e) => {
                e.target.style.display = "none";
                const fallbackEl = e.target.nextSibling;
                if (fallbackEl) fallbackEl.style.display = "block";
              }}
            />
            <span style={{ display: "none" }} className="text-3xl font-display tracking-wider text-korda-white select-none">
              KORDA<span className="text-korda-red text-4xl inline-block -translate-y-1">.</span>
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => {
              if (link.hasDropdown) {
                return (
                  <div key={link.name} ref={dropdownRef} className="relative">
                    <button
                      onClick={() => setDropdownOpen(!dropdownOpen)}
                      className={`text-sm font-mono tracking-widest uppercase transition-all duration-300 hover:text-korda-red relative py-1 flex items-center gap-1 cursor-none ${
                        location.pathname.startsWith("/apparel") ||
                        location.pathname.startsWith("/jackets") ||
                        location.pathname.startsWith("/gloves") ||
                        location.pathname.startsWith("/pants")
                          ? "text-korda-red font-bold"
                          : "text-korda-white/70"
                      }`}
                    >
                      {link.name}{" "}
                      <ChevronDown
                        size={12}
                        className={`transition-transform duration-300 ${
                          dropdownOpen ? "rotate-180 text-korda-red" : "text-korda-white/40"
                        }`}
                      />
                      {(location.pathname.startsWith("/apparel") ||
                        location.pathname.startsWith("/jackets") ||
                        location.pathname.startsWith("/gloves") ||
                        location.pathname.startsWith("/pants")) && (
                        <motion.span
                          layoutId="activeNavLine"
                          className="absolute bottom-0 left-0 w-full h-[2px] bg-korda-red"
                          transition={{ type: "spring", stiffness: 380, damping: 30 }}
                        />
                      )}
                    </button>

                    {/* Dropdown Card */}
                    <AnimatePresence>
                      {dropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.25, ease: "easeOut" }}
                          className="absolute top-full left-0 mt-3 bg-[#111111] border border-korda-steel p-4 flex flex-col space-y-3 z-50 rounded-sm w-48 shadow-red-neon"
                        >
                          {link.dropdownItems.map((item) => (
                            <Link
                              key={item.name}
                              to={item.path}
                              onClick={() => setDropdownOpen(false)}
                              className="text-xs font-mono tracking-widest uppercase text-korda-white/70 hover:text-korda-red py-1 text-left cursor-none transition-colors border-b border-korda-steel/30 last:border-b-0 pb-1.5 last:pb-0"
                            >
                              {item.name}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }

              return (
                <NavLink
                  key={link.name}
                  to={link.path}
                  className={({ isActive }) =>
                    `text-sm font-mono tracking-widest uppercase transition-all duration-300 hover:text-korda-red relative py-1 ${
                      isActive ? "text-korda-red" : "text-korda-white/70"
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {link.name}
                      {isActive && (
                        <motion.span
                          layoutId="activeNavLine"
                          className="absolute bottom-0 left-0 w-full h-[2px] bg-korda-red"
                          transition={{ type: "spring", stiffness: 380, damping: 30 }}
                        />
                      )}
                    </>
                  )}
                </NavLink>
              );
            })}
          </nav>

          {/* Desktop Utility Icons (Cart Removed) */}
          <div className="hidden md:flex items-center space-x-6 text-korda-white/80">
            <button
              onClick={() => setSearchOpen(true)}
              className="hover:text-korda-red transition-colors duration-200 cursor-none flex items-center gap-2 font-mono text-[10px] tracking-widest bg-korda-steel/20 border border-korda-steel/40 px-3 py-1.5 rounded-sm hover:border-korda-red/35"
            >
              <Search size={14} />
              <span>SEARCH</span>
            </button>
          </div>

          {/* Mobile Action Controls (Cart Removed) */}
          <div className="flex md:hidden items-center space-x-4">
            <button
              onClick={() => setSearchOpen(true)}
              className="text-korda-white/85 hover:text-korda-red transition-colors cursor-none"
            >
              <Search size={20} />
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-korda-white hover:text-korda-red transition-colors z-50 cursor-none"
            >
              {isOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Persistent Bottom Navigation Bar (like Flipkart style) */}
      <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-[#111111]/90 backdrop-blur-lg border-t border-korda-steel/45 shadow-[0_-8px_24px_rgba(0,0,0,0.5)]">
        <div className="flex justify-around items-center h-16 px-2">
          {bottomNavLinks.map((link) => {
            // Check if active (allowing match on subpaths like Jackets/Boots under apparel tab)
            const isActive =
              link.path === "/"
                ? location.pathname === "/"
                : location.pathname.startsWith(link.path) ||
                  (link.path === "/apparel" &&
                    (location.pathname.startsWith("/jackets") ||
                      location.pathname.startsWith("/gloves") ||
                      location.pathname.startsWith("/pants") ||
                      location.pathname.startsWith("/boots")));

            const isApparelLink = link.path === "/apparel";

            return (
              <Link
                key={link.name}
                to={link.path}
                id={isApparelLink ? "mobile-bottom-apparel-btn" : undefined}
                onClick={isApparelLink ? handleApparelClick : undefined}
                className="flex flex-col items-center justify-center flex-1 py-1 group text-center cursor-none"
              >
                <div
                  className={`relative p-1 transition-all duration-300 ${
                    isActive ? "text-korda-red scale-110" : "text-korda-white/50 group-hover:text-korda-white"
                  }`}
                >
                  {link.icon}
                  {isActive && (
                    <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 bg-korda-red rounded-full shadow-red-neon animate-pulse" />
                  )}
                </div>
                <span
                  className={`text-[8px] font-mono tracking-widest uppercase mt-0.5 transition-colors duration-300 ${
                    isActive ? "text-korda-red font-bold" : "text-korda-white/40 group-hover:text-korda-white/70"
                  }`}
                >
                  {link.name}
                </span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Mobile Bottom Sub-Navbar (Apparel Sub-categories popup) */}
      <AnimatePresence>
        {subNavbarOpen && (
          <motion.div
            ref={subNavbarRef}
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed bottom-[74px] left-4 right-4 z-40 md:hidden bg-[#161616]/95 backdrop-blur-md border border-korda-steel/45 shadow-[0_-4px_20px_rgba(232,0,45,0.15)] rounded-sm p-1.5"
          >
            {/* Cyber reticle corner brackets */}
            <div className="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-korda-red/60" />
            <div className="absolute top-0 right-0 w-1.5 h-1.5 border-t border-r border-korda-red/60" />
            <div className="absolute bottom-0 left-0 w-1.5 h-1.5 border-b border-l border-korda-red/60" />
            <div className="absolute bottom-0 right-0 w-1.5 h-1.5 border-b border-r border-korda-red/60" />

            <div className="flex justify-around items-center h-12">
              {subCategories.map((sub) => {
                const isSubActive = location.pathname === sub.path;
                return (
                  <Link
                    key={sub.name}
                    to={sub.path}
                    onClick={() => setSubNavbarOpen(false)}
                    className="flex flex-col items-center justify-center flex-1 py-1 group text-center cursor-none"
                  >
                    <div
                      className={`p-1 rounded-full transition-all duration-300 ${
                        isSubActive ? "text-korda-red scale-110" : "text-korda-white/60 group-hover:text-korda-red"
                      }`}
                    >
                      {sub.icon}
                    </div>
                    <span
                      className={`text-[8px] font-mono tracking-widest uppercase mt-0.5 transition-colors duration-300 ${
                        isSubActive ? "text-korda-red font-bold" : "text-korda-white/40 group-hover:text-korda-white/70"
                      }`}
                    >
                      {sub.name}
                    </span>
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Smart Search Overlay Panel */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 bg-korda-black/95 backdrop-blur-md z-[100] flex flex-col justify-start pt-20 px-6 cursor-none"
          >
            {/* Close controls */}
            <div className="max-w-4xl mx-auto w-full flex justify-between items-center mb-10 border-b border-korda-steel/45 pb-4">
              <span className="font-mono text-[10px] tracking-widest text-korda-red font-bold flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-korda-red rounded-full animate-ping" />
                SYSTEM DIAGNOSTIC: PRODUCT QUERY
              </span>
              <button
                onClick={() => {
                  setSearchOpen(false);
                  setSearchQuery("");
                }}
                className="text-korda-white/60 hover:text-korda-red transition-colors flex items-center gap-1.5 font-mono text-[10px] tracking-widest border border-korda-steel px-3 py-1 rounded-sm cursor-none"
              >
                <X size={14} /> CLOSE (ESC)
              </button>
            </div>

            {/* Central search core */}
            <div className="max-w-4xl mx-auto w-full flex-grow flex flex-col space-y-6 overflow-y-auto pb-20">
              <div className="relative">
                {/* Visual schematic boundaries */}
                <div className="absolute top-0 left-0 w-2.5 h-2.5 border-t border-l border-korda-red" />
                <div className="absolute top-0 right-0 w-2.5 h-2.5 border-t border-r border-korda-red" />
                <div className="absolute bottom-0 left-0 w-2.5 h-2.5 border-b border-l border-korda-red" />
                <div className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b border-r border-korda-red" />

                <input
                  type="text"
                  placeholder="INPUT DESIGN IDENTIFIER (e.g. Neo, Sonic, Recon)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                  className="w-full bg-korda-charcoal/40 text-korda-white placeholder-korda-white/30 border border-korda-steel/65 p-4 pl-12 font-mono text-xs md:text-sm tracking-wider focus:outline-none focus:border-korda-red focus:shadow-red-neon uppercase transition-all cursor-none"
                />
                <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-korda-white/40" />
              </div>

              {/* Popular tags */}
              <div className="flex flex-wrap gap-2 items-center">
                <span className="font-mono text-[9px] text-korda-white/30 tracking-widest uppercase mr-2">
                  HOT QUERIES:
                </span>
                {["StormTrooper", "Sonic GP", "Recon ADV", "D3O", "Jeans", "Rain"].map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setSearchQuery(tag)}
                    className="font-mono text-[9px] tracking-widest uppercase px-2.5 py-1 bg-korda-steel/25 border border-korda-steel/45 text-korda-white/70 hover:text-korda-red hover:border-korda-red/35 transition-colors rounded-sm cursor-none"
                  >
                    #{tag}
                  </button>
                ))}
              </div>

              {/* Results rendering */}
              <div className="mt-8 space-y-4">
                {searchQuery.trim() !== "" ? (
                  filteredProducts.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {filteredProducts.map((p) => (
                        <Link
                          key={p.id}
                          to={p.path}
                          onClick={() => {
                            setSearchOpen(false);
                            setSearchQuery("");
                          }}
                          className="flex justify-between items-center p-4 bg-korda-steel/20 border border-korda-steel/45 hover:border-korda-red hover:bg-korda-steel/30 rounded-sm group transition-all cursor-none"
                        >
                          <div className="text-left space-y-1 max-w-[85%]">
                            <span className="font-mono text-[8px] text-korda-gold tracking-widest uppercase block">
                              {p.type}
                            </span>
                            <h4 className="font-display text-sm md:text-base text-korda-white tracking-widest group-hover:text-korda-red transition-colors uppercase truncate">
                              {p.name}
                            </h4>
                            <p className="font-body text-[9px] text-korda-white/45 truncate">
                              {p.description}
                            </p>
                          </div>
                          <div className="text-right space-y-1 flex flex-col items-end">
                            <span className="font-mono text-[10px] md:text-xs text-korda-white/80 font-bold block">
                              {p.price}
                            </span>
                            {p.tag && (
                              <span className="text-[7px] font-mono px-1 bg-korda-red/10 border border-korda-red/20 text-korda-red uppercase rounded-sm">
                                {p.tag}
                              </span>
                            )}
                          </div>
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12 border border-dashed border-korda-steel/45 rounded-sm bg-korda-steel/10">
                      <p className="font-mono text-[10px] text-korda-white/30 tracking-widest uppercase">
                        NO DIAGNOSTIC RECORDS MATCHING QUERY: "{searchQuery}"
                      </p>
                    </div>
                  )
                ) : (
                  /* Default Categories Panel */
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6">
                    <div className="p-4 bg-korda-steel/10 border border-korda-steel/40 text-left space-y-2 rounded-sm">
                      <h5 className="font-mono text-[9px] text-korda-red tracking-widest uppercase font-bold">
                        01 // FULL-FACE HELMETS
                      </h5>
                      <p className="font-body text-[10px] text-korda-white/40 leading-relaxed">
                        High aerodynamic speed shells engineered with wind-tunnel stabilization and ECE 22.06 ratings.
                      </p>
                      <Link
                        to="/helmets"
                        onClick={() => setSearchOpen(false)}
                        className="inline-block font-mono text-[8px] tracking-widest text-korda-white/60 hover:text-korda-red uppercase pt-2 cursor-none"
                      >
                        VIEW HELMETS →
                      </Link>
                    </div>
                    <div className="p-4 bg-korda-steel/10 border border-korda-steel/40 text-left space-y-2 rounded-sm">
                      <h5 className="font-mono text-[9px] text-korda-gold tracking-widest uppercase font-bold">
                        02 // TECHNICAL APPAREL
                      </h5>
                      <p className="font-body text-[10px] text-korda-white/40 leading-relaxed">
                        Riding jackets, tactile gauntlet gloves, and armored denim loaded with modular D3O elastomer sheets.
                      </p>
                      <Link
                        to="/apparel"
                        onClick={() => setSearchOpen(false)}
                        className="inline-block font-mono text-[8px] tracking-widest text-korda-white/60 hover:text-korda-red uppercase pt-2 cursor-none"
                      >
                        VIEW APPAREL →
                      </Link>
                    </div>
                    <div className="p-4 bg-korda-steel/10 border border-korda-steel/40 text-left space-y-2 rounded-sm">
                      <h5 className="font-mono text-[9px] text-korda-white/50 tracking-widest uppercase font-bold">
                        03 // EXPEDITION GEAR
                      </h5>
                      <p className="font-body text-[10px] text-korda-white/40 leading-relaxed">
                        Waterproof luggage carriers, thermal riding socks, elastic storm covers, and safety essentials.
                      </p>
                      <Link
                        to="/accessories"
                        onClick={() => setSearchOpen(false)}
                        className="inline-block font-mono text-[8px] tracking-widest text-korda-white/60 hover:text-korda-red uppercase pt-2 cursor-none"
                      >
                        VIEW ACCESSORIES →
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Drawer Navigation Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 bg-korda-black z-30 flex flex-col justify-center px-8 border-b border-korda-red/20 overflow-y-auto cursor-none pb-20"
          >
            <nav className="flex flex-col space-y-4 pt-24 pb-8">
              {navLinks.map((link, idx) => {
                if (link.hasDropdown) {
                  return (
                    <motion.div
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.08 * idx, duration: 0.4 }}
                      key={link.name}
                      className="space-y-2 text-left"
                    >
                      <span className="text-4xl font-display tracking-widest uppercase text-korda-white/80 block border-b border-korda-steel/45 pb-1">
                        {link.name}
                      </span>
                      <div className="flex flex-col space-y-2 pl-4 pt-1">
                        {link.dropdownItems.map((item) => (
                          <Link
                            key={item.name}
                            to={item.path}
                            onClick={() => setIsOpen(false)}
                            className="text-xl font-mono tracking-wider uppercase text-korda-white/50 hover:text-korda-red cursor-none"
                          >
                            {item.name}
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  );
                }

                return (
                  <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.08 * idx, duration: 0.4 }}
                    key={link.name}
                  >
                    <NavLink
                      to={link.path}
                      onClick={() => setIsOpen(false)}
                      className={({ isActive }) =>
                        `text-4xl font-display tracking-widest uppercase transition-all duration-300 block cursor-none ${
                          isActive
                            ? "text-korda-red pl-4 border-l-4 border-korda-red"
                            : "text-korda-white/80"
                        }`
                      }
                    >
                      {link.name}
                    </NavLink>
                  </motion.div>
                );
              })}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
export default Navbar;
