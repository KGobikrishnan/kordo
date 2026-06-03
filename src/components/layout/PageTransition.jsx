import { motion } from "framer-motion";

export function PageTransition({ children }) {
  return (
    <div className="relative w-full min-h-screen bg-korda-black">
      {/* Outward Sweep Curtain (Entering Page) */}
      <motion.div
        className="fixed inset-0 bg-korda-black z-[9999] pointer-events-none"
        initial={{ y: "0%" }}
        animate={{ y: "-100%" }}
        exit={{ y: "100%" }}
        transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
      />

      {/* Inward Sweep Curtain (Exiting Page) */}
      <motion.div
        className="fixed inset-0 bg-korda-black z-[9999] pointer-events-none"
        initial={{ y: "100%" }}
        animate={{ y: "100%" }}
        exit={{ y: "0%" }}
        transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
      />

      {/* Content Animation */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -30 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
      >
        {children}
      </motion.div>
    </div>
  );
}
