"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export function AnimatedBackground() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 z-[-2] overflow-hidden bg-black pointer-events-none">
      {/* Dark overlay to ensure text readability */}
      <div className="absolute inset-0 z-10 bg-black/40 backdrop-blur-[100px]" />
      
      {/* Animated Orbs */}
      <motion.div
        animate={{
          x: [0, 100, -50, 0],
          y: [0, -100, 50, 0],
          scale: [1, 1.2, 0.8, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute top-1/4 left-1/4 w-[40vw] h-[40vw] bg-blue-600/30 rounded-full mix-blend-screen filter blur-[80px] md:blur-[120px] opacity-70"
      />
      
      <motion.div
        animate={{
          x: [0, -150, 50, 0],
          y: [0, 100, -100, 0],
          scale: [1, 0.9, 1.3, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute bottom-1/4 right-1/4 w-[50vw] h-[50vw] bg-purple-600/30 rounded-full mix-blend-screen filter blur-[80px] md:blur-[120px] opacity-70"
      />

      <motion.div
        animate={{
          x: [0, 50, -150, 0],
          y: [0, 150, 50, 0],
          scale: [1, 1.5, 0.9, 1],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute top-1/2 left-1/2 w-[35vw] h-[35vw] bg-cyan-600/20 rounded-full mix-blend-screen filter blur-[80px] md:blur-[120px] opacity-70"
      />
      
      {/* Static Starry particles (using simple CSS background for performance) */}
      <div 
        className="absolute inset-0 z-0 opacity-30"
        style={{
          backgroundImage: `radial-gradient(circle at center, white 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      />
    </div>
  );
}
