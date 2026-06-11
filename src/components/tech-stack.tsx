"use client";

import { motion } from "framer-motion";
import data from "@/data/content.json";

export function TechStack() {
  return (
    <section className="py-24 md:py-32 relative overflow-hidden bg-transparent">
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-center justify-between gap-8"
        >
          <div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4">
              Tech <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-400">Stack.</span>
            </h2>
            <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-xl">
              The tools and technologies I use to build high-performance, accessible, and stunning digital experiences.
            </p>
          </div>
          
          {/* Fills the empty space on the right with a dynamic glowing element */}
          <div className="hidden md:flex relative w-64 h-24 items-center justify-center rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-cyan-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="flex gap-4 items-center z-10">
              <span className="w-3 h-3 rounded-full bg-blue-500 animate-pulse shadow-[0_0_10px_rgba(59,130,246,0.8)]" />
              <span className="font-mono text-sm tracking-widest uppercase text-neutral-300">System Ready</span>
            </div>
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-cyan-400 opacity-20 blur-xl group-hover:opacity-40 transition-opacity duration-500" />
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {data.skills.map((skillGroup, groupIndex) => (
            <motion.div
              key={skillGroup.category}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: groupIndex * 0.2 }}
              className="group relative p-8 rounded-3xl bg-white/5 dark:bg-black/20 backdrop-blur-md border border-neutral-200 dark:border-white/10 hover:border-blue-500/30 transition-all duration-500 hover:shadow-[0_0_30px_rgba(59,130,246,0.15)] overflow-hidden"
            >
              {/* Subtle gradient background on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <h3 className="relative z-10 text-xl font-bold mb-6 group-hover:text-blue-400 transition-colors">{skillGroup.category}</h3>
              <ul className="relative z-10 flex flex-col gap-4">
                {skillGroup.items.map((item, index) => (
                  <motion.li
                    key={item}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: groupIndex * 0.2 + index * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 group-hover:shadow-[0_0_8px_rgba(59,130,246,0.8)] transition-shadow duration-300" />
                    <span className="text-neutral-700 dark:text-neutral-300 font-medium">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
