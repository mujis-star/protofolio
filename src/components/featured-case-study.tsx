"use client";

import { motion } from "framer-motion";
import { Sparkles, ArrowUpRight, CheckCircle2, ShieldAlert, BookOpen, Layers } from "lucide-react";

export function FeaturedCaseStudy() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8 }}
      className="mb-20 rounded-3xl bg-gradient-to-b from-blue-950/30 via-black/40 to-black/20 border border-blue-500/30 p-6 sm:p-10 backdrop-blur-xl relative overflow-hidden group shadow-[0_0_60px_rgba(59,130,246,0.15)]"
    >
      {/* Background Glow Overlay */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none group-hover:bg-blue-500/20 transition-all duration-700" />

      {/* Top Banner Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-6 border-b border-white/10 relative z-10">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30 text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" /> Flagship Case Study
          </span>
          <span className="text-xs font-mono text-neutral-400">Next.js • OpenAI API • Vector DB</span>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="https://github.com/mujis-star/studyflow-ai"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 hover:text-white transition-colors text-neutral-300"
            title="GitHub Repository"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
          </a>
          <a
            href="https://studyflow-ai.example.com"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center gap-2 transition-all shadow-[0_0_20px_rgba(37,99,235,0.4)]"
          >
            Live Demo <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* Title & Tagline */}
      <div className="mb-10 relative z-10">
        <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight mb-3">
          StudyFlow AI
        </h3>
        <p className="text-lg text-neutral-300 max-w-2xl font-medium">
          An intelligent document assistant engineered to transform dense academic PDFs into instant interactive summaries and study vectors.
        </p>
      </div>

      {/* Case Study Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
        {/* Problem */}
        <div className="p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md flex flex-col justify-between">
          <div>
            <div className="w-9 h-9 rounded-xl bg-red-500/10 text-red-400 flex items-center justify-center mb-3">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider font-mono mb-2">01. Problem</h4>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Students waste dozens of hours reading long, unstructured academic PDFs and struggling to isolate key exam topics.
            </p>
          </div>
        </div>

        {/* Research */}
        <div className="p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md flex flex-col justify-between">
          <div>
            <div className="w-9 h-9 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center mb-3">
              <BookOpen className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider font-mono mb-2">02. Research</h4>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Existing generic LLMs lacked study-specific context management and suffered from PDF layout extraction loss.
            </p>
          </div>
        </div>

        {/* Challenges */}
        <div className="p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md flex flex-col justify-between">
          <div>
            <div className="w-9 h-9 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center mb-3">
              <Layers className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider font-mono mb-2">03. Engineering</h4>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Engineered token chunking pipelines, context window buffering, prompt tuning, and streaming response UI.
            </p>
          </div>
        </div>

        {/* Results */}
        <div className="p-5 rounded-2xl bg-blue-500/10 border border-blue-500/20 backdrop-blur-md flex flex-col justify-between">
          <div>
            <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-3">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider font-mono mb-2">04. Results</h4>
            <ul className="text-xs text-neutral-300 space-y-1 font-mono">
              <li>⚡ 70% Faster study workflows</li>
              <li>🎨 Responsive Framer UI</li>
              <li>🛡️ Clean scalable architecture</li>
            </ul>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
