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
          className="fixed inset-0 z-[1000] flex flex-col items-center justify-center bg-[#030712] font-mono"
        >
          {/* Subtle Grid Background */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(34,211,238,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />

          <div className="relative flex flex-col items-center max-w-md w-full px-6">
            {/* Unique Hexagon Loader */}
            <div className="relative w-24 h-24 mb-8">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0"
              >
                <svg viewBox="0 0 100 100" className="w-full h-full fill-transparent stroke-blue-500 stroke-[1]">
                  <polygon points="50,5 90,27.5 90,72.5 50,95 10,72.5 10,27.5" />
                </svg>
              </motion.div>
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="absolute inset-2"
              >
                <svg viewBox="0 0 100 100" className="w-full h-full fill-transparent stroke-cyan-400 stroke-[2]" strokeDasharray="20 10">
                  <polygon points="50,5 90,27.5 90,72.5 50,95 10,72.5 10,27.5" />
                </svg>
              </motion.div>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-sm font-bold text-white tracking-tighter">
                  MUJEEB<span className="text-cyan-400">.</span>
                </span>
              </div>
            </div>

            {/* Terminal Boot Sequence */}
            <div className="w-full bg-black/40 border border-blue-500/20 rounded-lg p-4 backdrop-blur-sm mb-6">
              <div className="flex items-center gap-2 mb-3 border-b border-blue-500/20 pb-2">
                <div className="w-2 h-2 rounded-full bg-red-500" />
                <div className="w-2 h-2 rounded-full bg-yellow-500" />
                <div className="w-2 h-2 rounded-full bg-green-500" />
                <span className="text-[10px] text-blue-400/60 ml-2">sys_boot.exe</span>
              </div>
              <div className="text-xs text-cyan-400/80 space-y-1">
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>{">"} INITIATING NEURAL NETWORKS...</motion.div>
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}>{">"} DECRYPTING PROTOCOLS...</motion.div>
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4 }}>{">"} ESTABLISHING SECURE CONNECTION...</motion.div>
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.0 }} className="text-green-400">{">"} ACCESS GRANTED. WELCOME MUJEEB.</motion.div>
              </div>
            </div>

            {/* Segmented Cyber Progress Bar */}
            <div className="w-full flex gap-1 h-1.5">
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0.2 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex-1 bg-cyan-400 rounded-sm shadow-[0_0_5px_rgba(34,211,238,0.5)]"
                />
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
