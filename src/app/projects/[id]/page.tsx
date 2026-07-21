"use client";

import { useContent, useContentLoading, Project } from "@/context/content-context";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink, Code2, CheckCircle2, Activity, LayoutTemplate, Shield, Zap } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function ProjectCaseStudy() {
  const params = useParams();
  const data = useContent();
  const isLoading = useContentLoading();
  const [project, setProject] = useState<Project | null>(null);

  useEffect(() => {
    if (!isLoading && data.projects) {
      const found = data.projects.find((p) => p.id === params.id);
      setProject((found as unknown as Project) || null);
    }
  }, [isLoading, data, params.id]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center pt-20">
        <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-cyan-400 font-mono text-sm tracking-widest">sys.load_project_data</p>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center pt-20 px-6">
        <h1 className="text-4xl font-black text-white mb-4">404</h1>
        <p className="text-neutral-400 mb-8 max-w-md">The case study you are looking for does not exist or has been moved.</p>
        <Link href="/#projects" className="px-6 py-3 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-500 transition-colors">
          Return to Projects
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-32">
      {/* Dynamic Background */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-blue-500/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto px-6 max-w-4xl relative z-10">
        
        {/* Navigation */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="mb-12">
          <Link href="/#projects" className="inline-flex items-center gap-2 text-sm font-medium text-neutral-400 hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Portfolio
          </Link>
        </motion.div>

        {/* Header section */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-sm font-bold uppercase tracking-wider text-blue-400 font-mono">{project.category}</span>
            <span className="text-neutral-600">•</span>
            <span className="text-sm text-neutral-400">{project.role || "Frontend Engineer"}</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 tracking-tight leading-tight">
            {project.title}
          </h1>
          <p className="text-xl md:text-2xl text-neutral-300 font-medium leading-relaxed max-w-3xl">
            {project.overview || project.description}
          </p>
        </motion.div>

        {/* Hero Image */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }} 
          animate={{ opacity: 1, scale: 1 }} 
          transition={{ delay: 0.2, type: "spring" }}
          className="relative aspect-[16/9] md:aspect-[21/9] w-full rounded-3xl overflow-hidden bg-neutral-900 border border-white/10 mb-16 shadow-[0_0_50px_rgba(0,0,0,0.5)]"
        >
          <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-transparent to-transparent opacity-60" />
        </motion.div>

        {/* Metrics HUD */}
        {project.performance && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col items-center justify-center text-center">
              <Zap className="w-6 h-6 text-yellow-400 mb-3" />
              <span className="text-3xl font-black text-white mb-1">{project.performance.lighthouse}</span>
              <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider">Performance</span>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col items-center justify-center text-center">
              <CheckCircle2 className="w-6 h-6 text-green-400 mb-3" />
              <span className="text-3xl font-black text-white mb-1">{project.performance.accessibility}</span>
              <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider">Accessibility</span>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col items-center justify-center text-center">
              <LayoutTemplate className="w-6 h-6 text-blue-400 mb-3" />
              <span className="text-3xl font-black text-white mb-1">{project.performance.bestPractices}</span>
              <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider">Best Practices</span>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col items-center justify-center text-center">
              <Shield className="w-6 h-6 text-purple-400 mb-3" />
              <span className="text-3xl font-black text-white mb-1">{project.performance.seo}</span>
              <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider">SEO</span>
            </div>
          </motion.div>
        )}

        {/* Links & Tech Stack */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 py-8 border-y border-white/10 mb-16">
          <div className="flex flex-wrap gap-2">
            {project.techStack.map(tech => (
              <span key={tech} className="px-3 py-1 text-sm font-medium bg-blue-500/10 text-blue-300 border border-blue-500/20 rounded-full">
                {tech}
              </span>
            ))}
          </div>
          <div className="flex gap-4">
            {project.github && (
              <a href={project.github} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium transition-colors">
                <Code2 className="w-4 h-4" /> Source
              </a>
            )}
            {project.link && (
              <a href={project.link} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-6 py-3 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-medium shadow-[0_0_20px_rgba(37,99,235,0.3)] transition-all">
                Live Demo <ExternalLink className="w-4 h-4" />
              </a>
            )}
          </div>
        </motion.div>

        {/* Deep Dive Content */}
        <div className="space-y-16 text-neutral-300 text-lg leading-relaxed">
          {project.problem && (
            <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <span className="w-8 h-px bg-blue-500" /> The Problem
              </h2>
              <p>{project.problem}</p>
            </motion.section>
          )}

          {project.solution && (
            <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <span className="w-8 h-px bg-cyan-400" /> The Solution
              </h2>
              <p>{project.solution}</p>
            </motion.section>
          )}

          {project.architecture && (
            <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <span className="w-8 h-px bg-purple-500" /> Architecture & Decisions
              </h2>
              <p>{project.architecture}</p>
            </motion.section>
          )}

          {project.challenges && (
            <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <span className="w-8 h-px bg-orange-500" /> Technical Challenges
              </h2>
              <p>{project.challenges}</p>
            </motion.section>
          )}

          {project.outcome && (
            <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <span className="w-8 h-px bg-green-500" /> Results & Outcome
              </h2>
              <p>{project.outcome}</p>
            </motion.section>
          )}

          {project.lessonsLearned && (
            <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <span className="w-8 h-px bg-pink-500" /> Lessons Learned
              </h2>
              <p>{project.lessonsLearned}</p>
            </motion.section>
          )}
        </div>

      </div>
    </div>
  );
}
