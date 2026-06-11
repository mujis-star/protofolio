"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export function AnimatedBackground() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="fixed inset-0 z-[-2] bg-[#030712]" />;

  return (
    <div className="fixed inset-0 z-[-2] bg-[#030712] overflow-hidden pointer-events-none">
      
      {/* 1. Animated Glowing Aurora Orbs */}
      <motion.div
        animate={{
          transform: [
            "translate(0%, 0%) scale(1)",
            "translate(5%, 10%) scale(1.1)",
            "translate(-5%, 5%) scale(0.9)",
            "translate(0%, 0%) scale(1)",
          ],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-blue-600/20 mix-blend-screen blur-[120px]"
      />
      
      <motion.div
        animate={{
          transform: [
            "translate(0%, 0%) scale(1)",
            "translate(-10%, -5%) scale(1.2)",
            "translate(10%, -10%) scale(0.8)",
            "translate(0%, 0%) scale(1)",
          ],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-purple-600/20 mix-blend-screen blur-[120px]"
      />

      <motion.div
        animate={{
          transform: [
            "translate(0%, 0%) scale(1)",
            "translate(10%, -10%) scale(1.1)",
            "translate(-10%, 10%) scale(0.9)",
            "translate(0%, 0%) scale(1)",
          ],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[20%] right-[20%] w-[40vw] h-[40vw] rounded-full bg-cyan-500/10 mix-blend-screen blur-[100px]"
      />

      {/* 2. Premium Tech Grid */}
      <div 
        className="absolute inset-0 opacity-[0.15]"
        style={{
          backgroundImage: `
            linear-gradient(to right, #4f4f4f 1px, transparent 1px),
            linear-gradient(to bottom, #4f4f4f 1px, transparent 1px)
          `,
          backgroundSize: '4rem 4rem',
          maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 0%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 0%, transparent 100%)'
        }}
      />
      
      {/* 3. Vignette / Overlay to darken edges and make text readable */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#030712]/50 to-[#030712] pointer-events-none" />
      
    </div>
  );
}
