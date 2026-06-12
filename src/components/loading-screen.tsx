"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Show loading screen for at least 2.5 seconds
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onComplete, 1000); // Wait for exit animation to finish before notifying parent
    }, 2500);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)", transition: { duration: 0.8, ease: "easeInOut" } }}
          className="fixed inset-0 z-[1000] flex flex-col items-center justify-center bg-black"
        >
          {/* Radial glow background */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#0b1030,#05060f_60%)] pointer-events-none" />

          {/* Loader Ring container */}
          <div className="relative flex items-center justify-center mb-8">
            {/* Spinning Ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1.1, repeat: Infinity, ease: "linear" }}
              className="w-32 h-32 rounded-full border-2 border-transparent border-t-cyan-400 border-r-purple-500 shadow-[0_0_40px_rgba(34,211,238,0.35),inset_0_0_30px_rgba(168,85,247,0.2)]"
            />
            {/* MP Logo */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-2xl font-black text-[#c8f2ff] tracking-widest [text-shadow:0_0_12px_#22d3ee]">
                MP
              </span>
            </div>
          </div>

          {/* Progress Bar Container */}
          <div className="w-[220px] h-1 bg-white/10 rounded-full overflow-hidden mb-4">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 2.5, ease: "easeInOut" }}
              className="h-full bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500"
            />
          </div>

          {/* System Loading Text */}
          <motion.div
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-xs font-mono text-neutral-500 tracking-[0.2em] uppercase"
          >
            System Loading
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
