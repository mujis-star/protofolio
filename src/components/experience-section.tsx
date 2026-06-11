"use client";

import { motion } from "framer-motion";
import data from "@/data/content.json";

export function ExperienceSection() {
  return (
    <section id="experience" className="py-24 md:py-32 relative overflow-hidden bg-transparent">
      <div className="container mx-auto px-6 max-w-4xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 md:mb-24"
        >
          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4">
            Experience & <span className="text-blue-500">Clients.</span>
          </h2>
          <p className="text-lg text-neutral-600 dark:text-neutral-400">
            A timeline of my professional journey.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative border-l border-neutral-200 dark:border-neutral-800 ml-3 md:ml-0 md:pl-0 mb-24">
          {data.experience.map((exp, index) => (
            <motion.div
              key={exp.company}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="relative pl-8 md:pl-0 mb-12 last:mb-0"
            >
              {/* Timeline Dot */}
              <div className="absolute left-[-5px] md:left-1/2 md:-translate-x-1/2 top-1.5 w-2.5 h-2.5 rounded-full bg-blue-500 ring-4 ring-white dark:ring-black z-10" />
              
              <div className={`md:w-1/2 ${index % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12 md:ml-auto"}`}>
                <span className="inline-block px-3 py-1 mb-3 text-xs font-medium text-blue-500 bg-blue-500/10 rounded-full">
                  {exp.period}
                </span>
                <h3 className="text-xl font-bold mb-1">{exp.role}</h3>
                <h4 className="text-lg text-neutral-500 dark:text-neutral-400 mb-4">{exp.company}</h4>
                <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  {exp.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Client Logos Placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="pt-16 border-t border-neutral-200 dark:border-neutral-800"
        >
          <p className="text-center text-sm font-medium text-neutral-500 uppercase tracking-widest mb-8">
            Core Capabilities
          </p>
          <div className="flex flex-wrap justify-center gap-6 md:gap-12 opacity-80">
            {data.coreCapabilities.map((capability) => (
              <div key={capability.name} className="text-lg md:text-xl font-bold font-sans tracking-tight px-6 py-3 rounded-full border border-neutral-200/20 dark:border-white/10 bg-white/5 dark:bg-white/5 backdrop-blur-md text-neutral-800 dark:text-neutral-300 shadow-[0_0_15px_rgba(0,0,0,0.1)] dark:shadow-[0_0_15px_rgba(255,255,255,0.05)] hover:bg-white/10 dark:hover:bg-white/10 transition-colors">
                {capability.name}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
