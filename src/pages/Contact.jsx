import { useState } from "react";
import { Mail, Phone, MapPin, Send, Loader2, Compass, Clock, ShieldAlert, CheckCircle2, Globe } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { MagneticButton } from "../components/ui/MagneticButton";

export function Contact() {
  const [activeHub, setActiveHub] = useState("chennai");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const hubs = {
    chennai: {
      title: "CHENNAI FLAGSHIP",
      subtitle: "Primary Retail & Fitting Station",
      address: "3/386, Gangai amman kovil street,\nEast coast road,\nUthandi, Chennai – 600119.",
      phone: "76699 66611",
      coords: "12.8633° N, 80.2483° E",
      status: "OPEN // 10:00 - 19:00 IST",
      weather: "TROPICAL RIDING CLASS",
      grid: "ACTIVE // VISITS & FIT TESTS"
    },
    munich: {
      title: "MUNICH R&D LAB",
      subtitle: "Bavarian Engineering & Styling Core",
      address: "Leopoldstraße 12,\n80802 Munich,\nBavaria, Germany",
      phone: "+49 (0) 89 243 9051",
      coords: "48.1351° N, 11.5820° E",
      status: "SECURE // R&D STAFF ONLY",
      weather: "ALPINE TOURING CLASS",
      grid: "ACTIVE // PRIVATE LAB ONLY"
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setLoading(true);

    // Mock network request delay
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
      
      // Auto dismiss success message
      setTimeout(() => setSuccess(false), 5000);
    }, 1800);
  };

  return (
    <div className="w-full min-h-screen bg-korda-black py-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 text-left relative">
        
        {/* Decorative background aura */}
        <div className="absolute top-10 left-10 w-[300px] h-[300px] bg-korda-red/5 rounded-full filter blur-[100px] pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-[300px] h-[300px] bg-korda-gold/5 rounded-full filter blur-[100px] pointer-events-none" />

        {/* Left Side: Contact Information & Switcher */}
        <div className="lg:col-span-5 space-y-8 relative z-10">
          <div className="space-y-4">
            <span className="font-mono text-[9px] text-korda-red tracking-[0.3em] uppercase font-bold bg-korda-steel/50 border border-korda-steel px-3 py-1.5 rounded-sm w-fit block">
              GEAR STATION DIRECTORY
            </span>
            <h1 className="font-display text-5xl md:text-7xl text-korda-white tracking-wider uppercase leading-none">
              THE GEAR <br />
              STATION.
            </h1>
            <p className="font-body text-xs text-korda-white/50 leading-relaxed max-w-sm">
              Need assistance sizing your carbon helmet shell or checking impact jackets? Select your local station and contact our technical coordinators.
            </p>
          </div>

          {/* Dynamic Switcher buttons */}
          <div className="flex border border-korda-steel rounded-sm bg-korda-charcoal/60 overflow-hidden">
            {Object.keys(hubs).map((key) => {
              const isActive = activeHub === key;
              return (
                <button
                  key={key}
                  onClick={() => setActiveHub(key)}
                  className={`flex-1 py-3 text-center font-mono text-[10px] uppercase tracking-wider transition-all duration-300 relative cursor-none border-r last:border-r-0 border-korda-steel ${
                    isActive ? "bg-korda-steel text-korda-white" : "text-korda-white/40 hover:text-korda-white/70"
                  }`}
                >
                  <span>{hubs[key].title.split(" ")[0]} Hub</span>
                  {isActive && (
                    <motion.div
                      layoutId="activeContactTabIndicator"
                      className="absolute bottom-0 left-0 w-full h-[2px] bg-korda-red"
                      transition={{ type: "spring", stiffness: 350, damping: 28 }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Switcher details box */}
          <div className="bg-korda-charcoal border border-korda-steel p-6 rounded-sm relative overflow-hidden group hover:border-korda-red/50 transition-colors duration-300">
            <div className="absolute top-0 right-0 w-2 h-2 bg-korda-steel group-hover:bg-korda-red transition-colors" />
            <div className="absolute inset-0 bg-diagonal-texture opacity-5 pointer-events-none" />

            <AnimatePresence mode="wait">
              <motion.div
                key={activeHub}
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 15 }}
                transition={{ duration: 0.25 }}
                className="space-y-6 relative z-10"
              >
                <div>
                  <span className="font-mono text-[8px] text-korda-gold uppercase tracking-widest">
                    {hubs[activeHub].subtitle}
                  </span>
                  <h3 className="font-display text-2xl text-korda-white uppercase tracking-wider mt-0.5">
                    {hubs[activeHub].title}
                  </h3>
                </div>

                <div className="space-y-4 pt-4 border-t border-korda-steel/60">
                  {/* Address */}
                  <div className="flex items-start space-x-3">
                    <div className="p-2 bg-korda-steel/80 border border-korda-steel text-korda-red rounded-sm mt-0.5">
                      <MapPin size={14} />
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-mono text-[8px] text-korda-white/30 uppercase tracking-widest">STATION LOCATION</h4>
                      <p className="font-body text-xs text-korda-white/70 leading-relaxed whitespace-pre-line">
                        {hubs[activeHub].address}
                      </p>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex items-start space-x-3">
                    <div className="p-2 bg-korda-steel/80 border border-korda-steel text-korda-red rounded-sm mt-0.5">
                      <Phone size={14} />
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-mono text-[8px] text-korda-white/30 uppercase tracking-widest">DIRECT COMM-LINE</h4>
                      <p className="font-mono text-xs text-korda-white/80 hover:text-korda-red transition-colors duration-200">
                        {hubs[activeHub].phone}
                      </p>
                    </div>
                  </div>

                  {/* General Email */}
                  <div className="flex items-start space-x-3">
                    <div className="p-2 bg-korda-steel/80 border border-korda-steel text-korda-red rounded-sm mt-0.5">
                      <Mail size={14} />
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-mono text-[8px] text-korda-white/30 uppercase tracking-widest">GLOBAL MAILBOX</h4>
                      <p className="font-body text-xs text-korda-white/70 hover:text-korda-red transition-colors duration-200">
                        support@kordalifestyle.com
                      </p>
                    </div>
                  </div>
                </div>

                {/* Technical status tags */}
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-korda-steel/65 font-mono text-[8px] text-korda-white/45">
                  <div className="space-y-1">
                    <span className="uppercase text-korda-white/20 block">COORDINATES</span>
                    <span className="text-korda-white/80 flex items-center gap-1">
                      <Compass size={8} className="text-korda-red" /> {hubs[activeHub].coords}
                    </span>
                  </div>
                  <div className="space-y-1">
                    <span className="uppercase text-korda-white/20 block">HUB METRICS</span>
                    <span className="text-korda-gold flex items-center gap-1">
                      <Globe size={8} /> {hubs[activeHub].weather}
                    </span>
                  </div>
                  <div className="col-span-2 space-y-1">
                    <span className="uppercase text-korda-white/20 block">STATION STATUS</span>
                    <span className="text-korda-white/80 flex items-center gap-1.5">
                      <Clock size={8} className="text-korda-red animate-pulse" /> {hubs[activeHub].status}
                    </span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Right Side: Minimal Dark Form */}
        <div className="lg:col-span-7 bg-korda-charcoal border border-korda-steel p-8 rounded-sm relative overflow-hidden z-10 hover:border-korda-red/35 transition-colors duration-300">
          {/* Subtle grid backdrop inside form box */}
          <div className="absolute inset-0 bg-diagonal-texture opacity-10 pointer-events-none" />

          <h3 className="font-mono text-xs text-korda-gold font-bold uppercase tracking-widest mb-6 relative z-10 border-b border-korda-steel pb-4">
            TRANSMIT SPEC_REQUEST
          </h3>

          <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Name */}
              <div className="space-y-2">
                <label className="font-mono text-[9px] text-korda-white/40 tracking-widest uppercase block">
                  YOUR NAME <span className="text-korda-red">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="E.G. LUCA RIDER"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-korda-steel/30 border border-korda-steel px-4 py-3 text-xs font-mono focus:outline-none focus:border-korda-red focus:shadow-red-neon focus:bg-korda-steel/50 w-full text-white cursor-none transition-all duration-300 rounded-sm"
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label className="font-mono text-[9px] text-korda-white/40 tracking-widest uppercase block">
                  EMAIL ADDRESS <span className="text-korda-red">*</span>
                </label>
                <input
                  type="email"
                  required
                  placeholder="E.G. LUCA@KORDA.COM"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-korda-steel/30 border border-korda-steel px-4 py-3 text-xs font-mono focus:outline-none focus:border-korda-red focus:shadow-red-neon focus:bg-korda-steel/50 w-full text-white cursor-none transition-all duration-300 rounded-sm"
                />
              </div>
            </div>

            {/* Subject */}
            <div className="space-y-2">
              <label className="font-mono text-[9px] text-korda-white/40 tracking-widest uppercase block">
                MESSAGE SUBJECT
              </label>
              <input
                type="text"
                placeholder="E.G. HELMET RE-SIZING"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                className="w-full bg-korda-steel/30 border border-korda-steel px-4 py-3 text-xs font-mono focus:outline-none focus:border-korda-red focus:shadow-red-neon focus:bg-korda-steel/50 w-full text-white cursor-none transition-all duration-300 rounded-sm"
              />
            </div>

            {/* Message Body */}
            <div className="space-y-2">
              <label className="font-mono text-[9px] text-korda-white/40 tracking-widest uppercase block">
                MESSAGE CONTENT <span className="text-korda-red">*</span>
              </label>
              <textarea
                required
                rows={5}
                placeholder="ENTER MESSAGE DETAILS HERE..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full bg-korda-steel/30 border border-korda-steel px-4 py-3 text-xs font-mono focus:outline-none focus:border-korda-red focus:shadow-red-neon focus:bg-korda-steel/50 w-full text-white cursor-none transition-all duration-300 resize-none rounded-sm"
              />
            </div>

            {/* Action submit button */}
            <div className="pt-2">
              <MagneticButton
                type="submit"
                variant="filled"
                className="w-full py-4 text-center cursor-none"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <Loader2 className="animate-spin" size={16} /> TRANSMITTING...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-1.5">
                    TRANSMIT MESSAGE <Send size={12} />
                  </span>
                )}
              </MagneticButton>
            </div>

            {/* Success message popup panel */}
            <AnimatePresence>
              {success && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  className="bg-korda-red/10 border border-korda-red p-4 rounded-sm text-center flex flex-col items-center justify-center gap-1"
                >
                  <span className="font-mono text-[10px] text-korda-red tracking-widest uppercase font-bold flex items-center gap-1.5">
                    <CheckCircle2 size={12} /> TRANSMISSION SUCCESSFUL
                  </span>
                  <span className="font-body text-[11px] text-korda-white/60">
                    Your message packet has been loaded. Our Chennai team will get back to you shortly.
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </div>

        {/* Full-width Map Container */}
        <div className="lg:col-span-12 bg-korda-charcoal border border-korda-steel p-2 rounded-sm relative overflow-hidden group hover:border-korda-red/50 transition-colors duration-300">
          <div className="absolute top-0 right-0 w-2 h-2 bg-korda-steel group-hover:bg-korda-red transition-colors" />
          <div className="absolute inset-0 bg-diagonal-texture opacity-5 pointer-events-none" />

          <div className="p-4 border-b border-korda-steel/60 flex justify-between items-center flex-wrap gap-4">
            <div>
              <span className="font-mono text-[8px] text-korda-gold uppercase tracking-widest">NAVIGATIONAL DISPLAY</span>
              <h3 className="font-display text-xl text-korda-white uppercase tracking-wider mt-0.5">
                GEAR STATION MAP INTEGRATION
              </h3>
            </div>
            <a
              href="https://maps.app.goo.gl/pDe35TreAZQ9u9g49"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-korda-red/10 border border-korda-red text-korda-white text-xs font-mono tracking-widest hover:bg-korda-red hover:shadow-red-neon transition-all duration-300 uppercase rounded-sm flex items-center gap-2 cursor-none"
            >
              <Compass size={14} className="animate-spin duration-[4000ms]" /> OPEN DIRECT MAP LINK
            </a>
          </div>

          <div className="relative w-full h-[350px] md:h-[450px] bg-korda-black overflow-hidden">
            {/* Dark Styled Google Maps Embedded IFrame */}
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3889.3621415923985!2d80.2461111!3d12.8633333!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a525c38b2512f45%3A0xe543c7b6c5bebb58!2s3%2F386%2C%20Gangai%20Amman%20Koil%20St%2C%20Uthandi%2C%20Chennai%2C%20Tamil%20Nadu%20600119!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{
                border: 0,
                filter: "invert(90%) hue-rotate(180deg) contrast(120%) brightness(95%) opacity(0.85)",
              }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Korda Chennai Flagship Station Map"
            />
            {/* Cyber reticle overlay */}
            <div className="absolute top-4 left-4 p-3 bg-korda-black/80 border border-korda-steel rounded-sm pointer-events-none font-mono text-[8px] space-y-1 text-korda-white/70 max-w-xs sm:block hidden shadow-lg">
              <span className="text-korda-red font-bold uppercase tracking-widest block mb-1">
                // SYSTEM_MAP: CONNECTED
              </span>
              <div>LAT/LONG: 12.8633° N, 80.2483° E</div>
              <div>STATION: CHENNAI FLAGSHIP FIT HUB</div>
              <div>RESOLVING DIRECT COORDINATES... OK</div>
            </div>

            {/* Click to open overlay link for iframe */}
            <a 
              href="https://maps.app.goo.gl/pDe35TreAZQ9u9g49"
              target="_blank"
              rel="noopener noreferrer"
              className="absolute inset-0 bg-korda-red/0 hover:bg-korda-red/[0.03] transition-colors cursor-none flex items-center justify-center group/maplink"
            >
              <span className="absolute bottom-4 right-4 px-3 py-1.5 bg-korda-black/90 border border-korda-steel rounded-sm font-mono text-[8px] text-korda-gold tracking-widest uppercase opacity-0 group-hover/maplink:opacity-100 transition-opacity">
                CLICK TO LAUNCH NAVIGATIONAL INTERFACE
              </span>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Contact;
