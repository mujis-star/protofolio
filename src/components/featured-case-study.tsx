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
      className="mb-20 rounded-3xl bg-neutral-900/40 border border-white/10 p-6 sm:p-10 backdrop-blur-xl relative overflow-hidden group shadow-[0_0_40px_rgba(0,0,0,0.2)]"
    >
      {/* Background Glow Overlay - Toned down */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none transition-all duration-700" />

      {/* Top Banner Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-6 border-b border-white/10 relative z-10">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" /> Flagship Case Study
          </span>
          <span className="text-xs font-mono text-neutral-400">Next.js • Firebase • Full Stack</span>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="https://github.com/mujis-star/itqan-friends"
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
            href="https://itqan-friends.example.com"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center gap-2 transition-all shadow-[0_0_15px_rgba(37,99,235,0.3)]"
          >
            Live Demo <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* Title & Tagline */}
      <div className="mb-10 relative z-10">
        <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight mb-3">
          ITQAN Friends Portal
        </h3>
        <p className="text-lg text-neutral-300 max-w-2xl font-medium">
          A scalable community management platform with secure authentication, admin controls, and cloud-synced PDF archiving.
        </p>
      </div>

      {/* Architecture Diagram */}
      <div className="mb-10 p-5 rounded-2xl bg-black/40 border border-white/10 relative z-10">
        <h4 className="text-sm font-bold text-white uppercase tracking-wider font-mono mb-4 flex items-center gap-2">
          <Layers className="w-4 h-4 text-cyan-400" /> Architecture
        </h4>
        <div className="font-mono text-xs sm:text-sm text-neutral-300 flex flex-col gap-2 opacity-80">
          <div className="flex items-center gap-4">
            <span className="bg-blue-500/20 px-3 py-1 rounded border border-blue-500/30">Next.js Client</span>
            <span>→</span>
            <span className="bg-orange-500/20 px-3 py-1 rounded border border-orange-500/30">Firebase Auth</span>
          </div>
          <div className="flex items-center gap-4 ml-8 border-l border-neutral-700 pl-4 py-2">
            <span>↳</span>
            <span className="bg-yellow-500/20 px-3 py-1 rounded border border-yellow-500/30">Firestore DB</span>
            <span>↔</span>
            <span className="bg-green-500/20 px-3 py-1 rounded border border-green-500/30">Google Drive API</span>
          </div>
          <div className="flex items-center gap-4 ml-16 border-l border-neutral-700 pl-4 py-2">
            <span>↳</span>
            <span className="bg-purple-500/20 px-3 py-1 rounded border border-purple-500/30">Admin Dashboard</span>
          </div>
        </div>
      </div>

      {/* Case Study Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
        {/* Problem */}
        <div className="p-5 rounded-2xl bg-white/5 border border-white/10 flex flex-col justify-between">
          <div>
            <div className="w-9 h-9 rounded-xl bg-red-500/10 text-red-400 flex items-center justify-center mb-3">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider font-mono mb-2">01. Problem</h4>
            <p className="text-xs text-neutral-400 leading-relaxed">
              The community lacked a centralized, secure platform to share resources, manage members, and host a digital PDF library.
            </p>
          </div>
        </div>

        {/* Research */}
        <div className="p-5 rounded-2xl bg-white/5 border border-white/10 flex flex-col justify-between">
          <div>
            <div className="w-9 h-9 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center mb-3">
              <BookOpen className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider font-mono mb-2">02. Research</h4>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Evaluated scalable storage solutions and authentication providers, prioritizing security, minimal latency, and developer velocity.
            </p>
          </div>
        </div>

        {/* Challenges */}
        <div className="p-5 rounded-2xl bg-white/5 border border-white/10 flex flex-col justify-between">
          <div>
            <div className="w-9 h-9 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center mb-3">
              <Layers className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider font-mono mb-2">03. Challenges</h4>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Designing role-based access control (RBAC) securely on the client-side while managing seamless Google Drive API limits.
            </p>
          </div>
        </div>

        {/* Results */}
        <div className="p-5 rounded-2xl bg-blue-500/5 border border-blue-500/20 flex flex-col justify-between">
          <div>
            <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-3">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider font-mono mb-2">04. Results</h4>
            <ul className="text-xs text-neutral-300 space-y-1 font-mono">
              <li>⚡ Sub-1s page loads</li>
              <li>🛡️ Secure admin controls</li>
              <li>📁 Automated PDF syncing</li>
            </ul>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
