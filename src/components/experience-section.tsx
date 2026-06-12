"use client";

import { motion } from "framer-motion";
import { useContent } from "@/context/content-context";

export function ExperienceSection() {
  const data = useContent();
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
              
              <div className={`md:w-1/2 flex ${index % 2 === 0 ? "md:pr-12 md:justify-end" : "md:pl-12 md:justify-start md:ml-auto"}`}>
                <div className="bg-white/5 dark:bg-[#030712]/80 backdrop-blur-md border border-neutral-200 dark:border-white/10 p-6 sm:p-8 rounded-2xl shadow-xl hover:shadow-[0_0_30px_rgba(59,130,246,0.15)] transition-shadow duration-300 w-full text-left">
                  <span className="inline-block px-3 py-1 mb-3 text-xs font-medium text-blue-500 bg-blue-500/10 rounded-full">
                    {exp.period}
                  </span>
                  <h3 className="text-xl font-bold mb-1 text-neutral-900 dark:text-white">{exp.role}</h3>
                  <h4 className="text-lg text-neutral-500 dark:text-cyan-400/80 mb-4">{exp.company}</h4>
                  <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed">
                    {exp.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Client Logos Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="pt-16 border-t border-neutral-200 dark:border-white/10 relative"
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-30" />
          
          <p className="text-center text-sm font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-widest mb-10">
            Trusted by innovative teams
          </p>
          
          {/* Faux Infinite Marquee using overflow and flex */}
          <div className="relative w-full overflow-hidden flex justify-center">
            {/* Left/Right fading edges */}
            <div className="absolute top-0 bottom-0 left-0 w-24 bg-gradient-to-r from-white dark:from-[#030712] to-transparent z-10" />
            <div className="absolute top-0 bottom-0 right-0 w-24 bg-gradient-to-l from-white dark:from-[#030712] to-transparent z-10" />
            
            <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-60 hover:opacity-100 transition-opacity duration-500">
              {data.clients.slice(0, 5).map((client, i) => (
                <div key={i} className="flex items-center justify-center grayscale hover:grayscale-0 hover:scale-110 transition-all duration-300">
                  <span className="text-2xl md:text-3xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-neutral-800 to-neutral-500 dark:from-neutral-200 dark:to-neutral-600 hover:from-blue-500 hover:to-cyan-400">
                    {client.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
