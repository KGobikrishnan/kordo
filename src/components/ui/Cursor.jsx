import { useEffect, useState, useRef } from "react";

export function Cursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(true); // Default to true, verify on mount

  const mouse = useRef({ x: 0, y: 0 });
  const ring = useRef({ x: 0, y: 0 });
  const reqFrameId = useRef(null);

  // Detect mobile / touch devices
  useEffect(() => {
    const checkDevice = () => {
      const mobileDevice =
        window.matchMedia("(pointer: coarse)").matches ||
        window.innerWidth < 768 ||
        "ontouchstart" in window;
      setIsMobile(mobileDevice);
    };
    
    checkDevice();
    window.addEventListener("resize", checkDevice);
    return () => window.removeEventListener("resize", checkDevice);
  }, []);

  useEffect(() => {
    if (isMobile) return;

    // Hide standard cursor on desktop
    document.body.classList.add("custom-cursor-active");

    const moveCursor = (e) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      setIsVisible(true);
    };

    const handleMouseLeaveWindow = () => {
      setIsVisible(false);
    };

    window.addEventListener("mousemove", moveCursor);
    document.addEventListener("mouseleave", handleMouseLeaveWindow);

    // High performance animation tick running directly on hardware transforms
    const tick = () => {
      // Smooth interpolation for the outer ring
      const dx = mouse.current.x - ring.current.x;
      const dy = mouse.current.y - ring.current.y;
      
      ring.current.x += dx * 0.15;
      ring.current.y += dy * 0.15;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouse.current.x}px, ${mouse.current.y}px, 0) translate(-50%, -50%)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.current.x}px, ${ring.current.y}px, 0) translate(-50%, -50%)`;
      }

      reqFrameId.current = requestAnimationFrame(tick);
    };

    reqFrameId.current = requestAnimationFrame(tick);

    return () => {
      document.body.classList.remove("custom-cursor-active");
      window.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseleave", handleMouseLeaveWindow);
      if (reqFrameId.current) {
        cancelAnimationFrame(reqFrameId.current);
      }
    };
  }, [isMobile]);

  // Global listener for interactive hover triggers
  useEffect(() => {
    if (isMobile) return;

    const handleMouseOver = (e) => {
      const target = e.target;
      if (!target) return;

      const isInteractive =
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        target.classList.contains("clickable") ||
        target.closest(".clickable");

      setIsHovered(!!isInteractive);
    };

    window.addEventListener("mouseover", handleMouseOver);
    return () => {
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [isMobile]);

  if (isMobile || !isVisible) return null;

  return (
    <>
      {/* Outer Ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 pointer-events-none z-[99999] rounded-full border border-korda-red transition-all duration-300 ease-out"
        style={{
          width: isHovered ? "60px" : "38px",
          height: isHovered ? "60px" : "38px",
          backgroundColor: isHovered ? "rgba(232, 0, 45, 0.25)" : "transparent",
          boxShadow: isHovered ? "0 0 15px rgba(232, 0, 45, 0.4)" : "none",
          willChange: "transform"
        }}
      />
      {/* Inner Dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 bg-korda-red rounded-full pointer-events-none z-[99999]"
        style={{
          willChange: "transform"
        }}
      />
    </>
  );
}

export default Cursor;
