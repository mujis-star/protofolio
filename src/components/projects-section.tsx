"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useContent } from "@/context/content-context";
import { ArrowUpRight, ExternalLink, AlertCircle } from "lucide-react";
import { FeaturedCaseStudy } from "./featured-case-study";

export function ProjectsSection() {
  const data = useContent();
  const [activeFilter, setActiveFilter] = useState("All");

  const filterCategories = ["All", "React", "AI", "UI Design", "Full Stack"];

  const filteredProjects = data.projects.filter((project: any) => {
    if (activeFilter === "All") return true;
    if (project.tags && Array.isArray(project.tags)) {
      return project.tags.includes(activeFilter);
    }
    return project.category.toLowerCase().includes(activeFilter.toLowerCase());
  });

  return (
    <section id="projects" className="py-24 md:py-32 relative overflow-hidden bg-transparent">
      <div className="container mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-8"
        >
          <div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4">
              Featured <span className="text-blue-500">Projects.</span>
            </h2>
            <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-xl">
              Production-ready web applications, UI systems, and AI integrations built for real-world impact.
            </p>
          </div>

          {/* Filter Chips */}
          <div className="flex flex-wrap gap-2">
            {filterCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-4 py-2 rounded-full text-xs font-mono font-bold transition-all duration-300 cursor-pointer ${
                  activeFilter === cat
                    ? "bg-blue-600 text-white shadow-[0_0_15px_rgba(37,99,235,0.4)] border border-blue-400"
                    : "bg-white/5 border border-white/10 text-neutral-400 hover:text-white hover:bg-white/10"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Featured Flagship Case Study */}
        <FeaturedCaseStudy />

        {/* Featured Projects Grid */}
        <AnimatePresence mode="wait">
          <motion.div 
            key={activeFilter}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12"
          >
            {filteredProjects.map((project: any, index: number) => (
              <motion.div
                key={project.id || index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative flex flex-col justify-between p-6 sm:p-8 rounded-3xl bg-white/5 dark:bg-black/20 backdrop-blur-md border border-neutral-200 dark:border-white/10 hover:border-blue-500/30 hover:shadow-[0_0_40px_rgba(59,130,246,0.15)] transition-all duration-500"
              >
                <div>
                  {/* Image Banner */}
                  <div className="relative aspect-[16/9] rounded-2xl overflow-hidden bg-neutral-200 dark:bg-neutral-800 mb-6">
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 group-hover:rotate-1 transition-transform duration-700 ease-in-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-purple-500/20 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    {/* Hover Overlay Button */}
                    <a 
                      href={project.link || "#"}
                      target={project.link?.startsWith("http") ? "_blank" : undefined}
                      rel={project.link?.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-black/50 backdrop-blur-xs cursor-pointer z-10"
                    >
                      <span className="px-6 py-3 rounded-full bg-blue-600 text-white font-medium text-sm shadow-[0_0_20px_rgba(37,99,235,0.5)] flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                        View Live Demo <ExternalLink className="w-4 h-4" />
                      </span>
                    </a>
                  </div>
                  
                  {/* Header Meta */}
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-blue-400 font-mono">{project.category}</span>
                    <span className="text-neutral-600">•</span>
                    <div className="flex flex-wrap gap-1">
                      {project.tags?.map((tag: string) => (
                        <span key={tag} className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-500/10 text-blue-300 border border-blue-500/20">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-bold mb-4 group-hover:text-blue-400 transition-colors">
                    {project.title}
                  </h3>

                  {/* Problem & Solution Breakdown */}
                  <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed text-sm whitespace-pre-line mb-4 font-sans">
                    {project.description}
                  </p>

                  {/* Challenges Section */}
                  {project.challenges && (
                    <div className="p-3.5 rounded-xl bg-blue-500/5 border border-blue-500/15 mb-6 text-xs text-neutral-400 flex items-start gap-2.5">
                      <AlertCircle className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-cyan-300 font-mono uppercase tracking-wider block text-[10px] mb-0.5">Engineering Challenge Solved</strong>
                        {project.challenges}
                      </div>
                    </div>
                  )}
                </div>

                {/* Card Footer Actions & Tech Tags */}
                <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-4">
                  <div className="flex flex-wrap gap-1.5">
                    {project.techStack.map((tech: string) => (
                      <span key={tech} className="px-2.5 py-1 rounded-md bg-neutral-100 dark:bg-neutral-900 text-[10px] font-mono text-neutral-500 dark:text-neutral-400">
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 hover:text-white transition-colors text-neutral-400"
                        title="View Source Code on GitHub"
                      >
                        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                        </svg>
                      </a>
                    )}
                    {project.link && (
                      <a
                        href={project.link}
                        target={project.link.startsWith("http") ? "_blank" : undefined}
                        rel={project.link.startsWith("http") ? "noopener noreferrer" : undefined}
                        className="p-2 rounded-full border border-blue-500/30 bg-blue-600/20 text-blue-400 hover:bg-blue-600 hover:text-white transition-colors"
                        title="Open Live Application"
                      >
                        <ArrowUpRight className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
}
