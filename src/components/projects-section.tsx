"use client";

import { motion } from "framer-motion";
import { useContent } from "@/context/content-context";
import { ArrowUpRight } from "lucide-react";

export function ProjectsSection() {
  const data = useContent();
  return (
    <section id="projects" className="py-24 md:py-32 relative overflow-hidden bg-transparent">
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8"
        >
          <div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4">
              Featured <span className="text-blue-500">Projects.</span>
            </h2>
            <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-xl">
              A selection of my recent work, highlighting case studies across web development and UI/UX design.
            </p>
          </div>
          <a
            href="#"
            className="group inline-flex h-12 items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 dark:bg-white/5 backdrop-blur-md px-8 text-sm font-medium transition-all duration-300 hover:bg-white/10 dark:hover:bg-white/10 hover:shadow-[0_0_20px_rgba(255,255,255,0.1)] text-neutral-800 dark:text-white"
          >
            View All Work
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </a>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {data.projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="group relative flex flex-col gap-6 p-6 rounded-3xl bg-white/5 dark:bg-black/20 backdrop-blur-md border border-neutral-200 dark:border-white/10 hover:border-blue-500/30 hover:shadow-[0_0_40px_rgba(59,130,246,0.15)] transition-all duration-500"
            >
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-neutral-200 dark:bg-neutral-800">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 group-hover:rotate-1 transition-transform duration-700 ease-in-out"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-cyan-400/20 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Floating View Project Button on Hover */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-black/40 backdrop-blur-sm">
                  <span className="px-6 py-3 rounded-full bg-blue-600 text-white font-medium text-sm shadow-[0_0_20px_rgba(37,99,235,0.5)] flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                    View Case Study <ArrowUpRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
              
              <div className="px-2">
                <div className="flex items-center gap-4 mb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-blue-400">{project.category}</span>
                  <div className="h-1 w-1 rounded-full bg-neutral-300 dark:bg-neutral-700" />
                  <span className="text-xs text-neutral-500 font-mono uppercase tracking-wide">{project.techStack.slice(0, 3).join(" • ")}</span>
                </div>
                <h3 className="text-2xl font-bold mb-3 group-hover:text-blue-400 transition-colors">
                  {project.title}
                </h3>
                <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed text-sm">
                  {project.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
