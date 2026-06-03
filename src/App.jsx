import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Lenis from "@studio-freight/lenis";

// CSS Styles
import "./App.css";

// Layout & Global Components
import { Navbar } from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";
import { Cursor } from "./components/ui/Cursor";
import { PageTransition } from "./components/layout/PageTransition";

// Hooks
import { useScrollProgress } from "./hooks/useScrollProgress";

// Pages
import { Home } from "./pages/Home";
import { Helmets } from "./pages/Helmets";
import { Apparel } from "./pages/Apparel";
import { Jackets } from "./pages/Jackets";
import { Gloves } from "./pages/Gloves";
import { Pants } from "./pages/Pants";
import { Boots } from "./pages/Boots";
import { Accessories } from "./pages/Accessories";
import { About } from "./pages/About";
import { Contact } from "./pages/Contact";

function AnimatedRoutes() {
  const location = useLocation();
  const progress = useScrollProgress();

  // Scroll to top instantly on page change (before transition animations finish)
  useEffect(() => {
    window.scrollTo(0, 0);
    if (window.lenis) {
      window.lenis.scrollTo(0, { immediate: true });
    }
  }, [location.pathname]);

  return (
    <>
      {/* 1. Thin Red Progress Bar Top of Viewport */}
      <div
        className="fixed top-0 left-0 h-[3px] bg-korda-red z-[99999] transition-all duration-100 ease-out"
        style={{ width: `${progress}%`, boxShadow: "0 0 10px #FF1744" }}
      />

      <Navbar />

      {/* 2. AnimatePresence wrapper for transition exits/enters */}
      <main className="flex-grow pt-[80px] pb-[64px] md:pb-0 min-h-[calc(100vh-80px)]">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route
              path="/"
              element={
                <PageTransition>
                  <Home />
                </PageTransition>
              }
            />
            <Route
              path="/helmets"
              element={
                <PageTransition>
                  <Helmets />
                </PageTransition>
              }
            />
            <Route
              path="/apparel"
              element={
                <PageTransition>
                  <Apparel />
                </PageTransition>
              }
            />
            <Route
              path="/jackets"
              element={
                <PageTransition>
                  <Jackets />
                </PageTransition>
              }
            />
            <Route
              path="/gloves"
              element={
                <PageTransition>
                  <Gloves />
                </PageTransition>
              }
            />
            <Route
              path="/pants"
              element={
                <PageTransition>
                  <Pants />
                </PageTransition>
              }
            />
            <Route
              path="/boots"
              element={
                <PageTransition>
                  <Boots />
                </PageTransition>
              }
            />
            <Route
              path="/accessories"
              element={
                <PageTransition>
                  <Accessories />
                </PageTransition>
              }
            />
            <Route
              path="/about"
              element={
                <PageTransition>
                  <About />
                </PageTransition>
              }
            />
            <Route
              path="/contact"
              element={
                <PageTransition>
                  <Contact />
                </PageTransition>
              }
            />
          </Routes>
        </AnimatePresence>
      </main>

      <Footer />
    </>
  );
}

export function App() {
  // Global Lenis Smooth Scroll Initialization
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.08,
      smoothWheel: true,
      smoothTouch: false
    });

    window.lenis = lenis;

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      window.lenis = null;
    };
  }, []);

  return (
    <Router>
      <div className="relative min-h-screen bg-korda-black text-korda-white flex flex-col noise-overlay">
        {/* Custom cursor overlay */}
        <Cursor />

        {/* Dynamic routing layouts */}
        <AnimatedRoutes />
      </div>
    </Router>
  );
}

export default App;
