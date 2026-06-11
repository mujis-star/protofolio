"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isMobile, setIsMobile] = useState(true); // default to true to avoid hydration mismatch

  useEffect(() => {
    // Check if it's a touch device
    const checkMobile = () => {
      setIsMobile(window.matchMedia("(pointer: coarse)").matches);
    };
    
    checkMobile();
    window.addEventListener("resize", checkMobile);

    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName.toLowerCase() === "a" ||
        target.tagName.toLowerCase() === "button" ||
        target.closest("a") ||
        target.closest("button")
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    if (!isMobile) {
      window.addEventListener("mousemove", updateMousePosition);
      window.addEventListener("mouseover", handleMouseOver);
    }

    return () => {
      window.removeEventListener("resize", checkMobile);
      window.removeEventListener("mousemove", updateMousePosition);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [isMobile]);

  if (isMobile) return null;

  return (
    <>
      {/* Central Solid Dot */}
      <motion.div
        className="fixed top-0 left-0 w-3 h-3 bg-white rounded-full pointer-events-none z-[100] shadow-[0_0_10px_rgba(255,255,255,0.8)]"
        animate={{
          x: mousePosition.x - 6,
          y: mousePosition.y - 6,
          scale: isHovering ? 0 : 1,
        }}
        transition={{ type: "spring", stiffness: 800, damping: 28, mass: 0.1 }}
      />
      
      {/* Outer Ring with Orbital Dots */}
      <motion.div
        className="fixed top-0 left-0 w-16 h-16 border border-white/20 rounded-full pointer-events-none z-[99] flex items-center justify-center"
        animate={{
          x: mousePosition.x - 32,
          y: mousePosition.y - 32,
          scale: isHovering ? 1.5 : 1,
          backgroundColor: isHovering ? "rgba(255, 255, 255, 0.05)" : "transparent",
        }}
        transition={{ type: "spring", stiffness: 250, damping: 20, mass: 0.5 }}
      >
        {/* Continuous Rotation Wrapper */}
        <motion.div
          className="absolute inset-0 w-full h-full rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 8, ease: "linear", repeat: Infinity }}
        >
          {/* Orbital Dot 1 */}
          <div className="absolute top-[10%] right-[10%] w-1.5 h-1.5 bg-white/80 rounded-full shadow-[0_0_5px_white]" />
          {/* Orbital Dot 2 */}
          <div className="absolute bottom-[-2px] left-1/2 -translate-x-1/2 w-1 h-1 bg-white/60 rounded-full shadow-[0_0_5px_white]" />
          {/* Orbital Dot 3 */}
          <div className="absolute top-1/2 left-[-2px] -translate-y-1/2 w-1 h-1 bg-white/40 rounded-full" />
        </motion.div>
      </motion.div>
    </>
  );
}
