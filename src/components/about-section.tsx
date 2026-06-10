"use client";

import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import data from "@/data/content.json";

gsap.registerPlugin(ScrollTrigger);

export function AboutSection() {
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (imageRef.current) {
      gsap.to(imageRef.current, {
        yPercent: 20,
        ease: "none",
        scrollTrigger: {
          trigger: imageRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }
  }, []);

  return (
    <section id="about" className="py-24 md:py-32 relative overflow-hidden bg-transparent">
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-center"
        >
          <div className="flex flex-col gap-6">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter">
              About <span className="text-blue-500">Me.</span>
            </h2>
            <p className="text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed">
              I am {data.personal.name}, a passionate {data.personal.role} dedicated to crafting 
              extraordinary digital products. With a strong foundation in both design and development, 
              I bridge the gap between aesthetics and functionality.
            </p>
            <p className="text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Based in {data.personal.location}, I specialize in building performant web applications 
              with modern technologies like Next.js, Framer Motion, and Three.js.
            </p>
          </div>
          
          <div ref={imageRef} className="relative aspect-square md:aspect-[4/5] rounded-3xl overflow-hidden bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 flex items-center justify-center">
            <img 
              src="/profile.jpg" 
              alt="Mujeeb Profile" 
              className="absolute inset-0 w-full h-full object-cover"
            />
            {/* Overlay to ensure it blends nicely with the theme */}
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 to-purple-500/10 mix-blend-overlay" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
