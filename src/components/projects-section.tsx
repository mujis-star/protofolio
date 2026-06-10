"use client";

import { motion } from "framer-motion";
import data from "@/data/content.json";
import { ArrowUpRight } from "lucide-react";

export function ProjectsSection() {
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
            className="group inline-flex h-12 items-center justify-center gap-2 rounded-full border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-black px-8 text-sm font-medium transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-900"
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
              className="group relative flex flex-col gap-6"
            >
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-neutral-200 dark:bg-neutral-800">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 to-cyan-400/10 mix-blend-overlay" />
              </div>
              
              <div>
                <div className="flex items-center gap-4 mb-3">
                  <span className="text-sm font-medium text-blue-500">{project.category}</span>
                  <div className="h-1 w-1 rounded-full bg-neutral-300 dark:bg-neutral-700" />
                  <span className="text-sm text-neutral-500">{project.techStack.slice(0, 2).join(", ")}</span>
                </div>
                <h3 className="text-2xl font-bold mb-2 group-hover:text-blue-500 transition-colors">
                  {project.title}
                </h3>
                <p className="text-neutral-600 dark:text-neutral-400">
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
