"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import data from "@/data/content.json";

// Lazy load the heavy Three.js background
const Hero3D = dynamic(() => import("./hero-3d"), { ssr: false });

export function HeroSection() {
  return (
    <section className="relative min-h-[calc(100vh-5rem)] flex items-center justify-center overflow-hidden">
      <Hero3D />
      
      <div className="container relative z-10 px-6 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-sm font-medium mb-6"
        >
          <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
          {data.personal.availabilityStatus}
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-6"
        >
          I craft <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-400">digital</span>
          <br />
          experiences.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-lg md:text-xl text-neutral-600 dark:text-neutral-400 max-w-2xl mb-10"
        >
          Hi, I'm {data.personal.name}. A {data.personal.role} based in {data.personal.location}.
          {data.personal.bio}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center gap-4"
        >
          <a
            href="#projects"
            className="group flex h-12 items-center justify-center gap-2 rounded-full bg-black dark:bg-white px-8 text-sm font-medium text-white dark:text-black transition-transform hover:scale-105"
          >
            View Projects
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href="#contact"
            className="flex h-12 items-center justify-center rounded-full border border-neutral-200 dark:border-neutral-800 bg-white/50 dark:bg-black/50 backdrop-blur-md px-8 text-sm font-medium transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-900"
          >
            Contact Me
          </a>
        </motion.div>
      </div>
    </section>
  );
}
