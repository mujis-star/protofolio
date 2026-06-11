"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import data from "@/data/content.json";

export function HeroSection() {
  return (
    <section className="relative min-h-[calc(100vh-5rem)] flex items-center pt-20 md:pt-0 overflow-hidden">
      <div className="container relative z-10 px-6 mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Content */}
          <div className="flex flex-col items-start text-left">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 dark:bg-black/20 backdrop-blur-md border border-white/10 dark:border-white/5 text-sm font-medium mb-8 shadow-[0_0_15px_rgba(0,0,0,0.1)] dark:shadow-[0_0_20px_rgba(59,130,246,0.15)]"
            >
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
              <span className="text-neutral-700 dark:text-neutral-300">{data.personal.availabilityStatus}</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-6 leading-tight"
            >
              I craft <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-600 drop-shadow-[0_0_15px_rgba(59,130,246,0.3)]">digital</span>
              <br />
              experiences.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-lg md:text-xl text-neutral-600 dark:text-neutral-400 max-w-xl mb-10 leading-relaxed"
            >
              Hi, I'm <strong className="text-black dark:text-white font-semibold">{data.personal.name}</strong>. A {data.personal.role} based in {data.personal.location}.
              {data.personal.bio}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-col sm:flex-row items-center gap-5 w-full sm:w-auto"
            >
              <a
                href="#projects"
                className="group flex h-14 w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-blue-600 px-8 text-sm font-bold text-white transition-all duration-300 hover:bg-blue-500 hover:scale-105 hover:shadow-[0_0_30px_rgba(59,130,246,0.6)]"
              >
                <Sparkles className="w-4 h-4" />
                View Projects
              </a>
              <a
                href="#contact"
                className="group flex h-14 w-full sm:w-auto items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 dark:bg-white/5 backdrop-blur-md px-8 text-sm font-bold text-neutral-800 dark:text-white transition-all duration-300 hover:bg-white/10 dark:hover:bg-white/10 hover:border-white/30 hover:shadow-[0_0_20px_rgba(255,255,255,0.1)]"
              >
                Contact Me
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </motion.div>
          </div>

          {/* Right Video Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, x: 50 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.4, type: "spring", stiffness: 100 }}
            className="relative w-full aspect-square md:aspect-[4/3] lg:aspect-[3/4] rounded-3xl overflow-hidden border border-white/10 shadow-[0_0_50px_rgba(59,130,246,0.15)] group"
          >
            {/* The Video Element */}
            <video
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            >
              <source src="/hero-video.mp4" type="video/mp4" />
              {/* Fallback gradient if video is missing */}
            </video>
            
            {/* Fallback/Overlay Gradient to ensure it looks good even without the video loaded yet */}
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/40 via-transparent to-purple-900/40 mix-blend-overlay pointer-events-none" />
            
            {/* Premium Glassmorphism overlay element on top of video */}
            <div className="absolute bottom-6 left-6 right-6 p-6 rounded-2xl bg-white/10 dark:bg-black/20 backdrop-blur-md border border-white/10 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
              <p className="text-sm font-medium text-white">
                "Creating immersive digital realities."
              </p>
            </div>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}
