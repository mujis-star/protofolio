"use client";

import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useContent } from "@/context/content-context";
import { CheckCircle2 } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export function AboutSection() {
  const data = useContent();
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
            {data.about?.paragraphs && data.about.paragraphs.length > 0 ? (
              data.about.paragraphs.map((paragraph, index) => (
                <p key={index} className="text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  {paragraph}
                </p>
              ))
            ) : (
              <>
                <p className="text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  I'm {data.personal.name}. I combine frontend engineering, UI design, and system knowledge to build complete digital experiences—from UI mockups to deployment.
                </p>
                <p className="text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  Based in {data.personal.location}, I specialize in building performant web applications with modern technologies like React, Next.js, and AI API integrations.
                </p>
              </>
            )}

            {data.about?.engineeringPrinciples && (
              <div className="mt-6 p-6 rounded-2xl bg-white/5 border border-neutral-200 dark:border-white/10 backdrop-blur-md">
                <h3 className="text-sm font-bold text-neutral-800 dark:text-white uppercase tracking-wider font-mono mb-4">
                  Engineering Principles
                </h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {data.about.engineeringPrinciples.map((principle, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-blue-500" />
                      {principle.title}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            {/* Quick Resume Preview */}
            <div className="mt-6 p-6 rounded-2xl bg-blue-500/5 border border-blue-500/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h4 className="font-bold text-neutral-800 dark:text-white mb-1">Résumé Preview</h4>
                <div className="flex flex-wrap gap-2 text-xs font-mono text-neutral-500 dark:text-neutral-400">
                  <span>Experience</span>
                  <span>•</span>
                  <span>Education</span>
                  <span>•</span>
                  <span>Skills</span>
                </div>
              </div>
              <a 
                href="/resume.pdf" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm transition-colors whitespace-nowrap"
              >
                Download PDF
              </a>
            </div>
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
