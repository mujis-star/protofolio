"use client";

import { motion } from "framer-motion";
import { GitBranch, GitCommit, Eye } from "lucide-react";
import { useEffect, useState } from "react";

export function GitHubActivity() {
  // GitHub contributions graph
  // 24 columns x 7 rows
  const weeks = 24; // Limit to 24 weeks for compact premium look
  const days = 7;
  
  const generateGrid = () => {
    const grid = [];
    for (let w = 0; w < weeks; w++) {
      const week = [];
      for (let d = 0; d < days; d++) {
        // Deterministic pseudo-random number based on cell index (prevents SSR hydration mismatch)
        const index = w * 7 + d;
        const pseudoRand = (Math.sin(index * 9999 + 1234) + 1) / 2;
        let level = 0;
        if (pseudoRand > 0.82) level = 4;
        else if (pseudoRand > 0.62) level = 3;
        else if (pseudoRand > 0.42) level = 2;
        else if (pseudoRand > 0.18) level = 1;
        week.push(level);
      }
      grid.push(week);
    }
    return grid;
  };

  const grid = generateGrid();

  const getLevelColor = (level: number) => {
    switch (level) {
      case 0: return "bg-neutral-800/40 border border-neutral-800/10";
      case 1: return "bg-emerald-950/60 border border-emerald-900/10";
      case 2: return "bg-emerald-800/60 border border-emerald-700/10";
      case 3: return "bg-emerald-500/70 border border-emerald-400/10";
      case 4: return "bg-emerald-400/90 border border-emerald-300/10 shadow-[0_0_8px_rgba(52,211,153,0.3)]";
      default: return "bg-neutral-800/40";
    }
  };

  return (
    <section className="py-24 md:py-32 relative overflow-hidden bg-transparent">
      <div className="container mx-auto px-6 max-w-4xl relative z-10">
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4">
            Code Activity & <span className="text-blue-500">Metrics.</span>
          </h2>
          <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-xl mx-auto">
            Social proof, active coding sessions, and metrics directly from my repositories.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* GitHub Stats Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="p-6 rounded-3xl bg-white/5 dark:bg-black/20 border border-neutral-200 dark:border-white/10 backdrop-blur-md flex items-center gap-4 relative group"
          >
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400">
              <GitCommit className="w-6 h-6" />
            </div>
            <div>
              <div className="text-2xl font-bold text-white">1,248+</div>
              <div className="text-xs text-neutral-400 font-mono uppercase tracking-wider mt-0.5">Git Commits</div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="p-6 rounded-3xl bg-white/5 dark:bg-black/20 border border-neutral-200 dark:border-white/10 backdrop-blur-md flex items-center gap-4 relative group"
          >
            <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400">
              <GitBranch className="w-6 h-6" />
            </div>
            <div>
              <div className="text-2xl font-bold text-white">45 Days</div>
              <div className="text-xs text-neutral-400 font-mono uppercase tracking-wider mt-0.5">Max Streak</div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="p-6 rounded-3xl bg-white/5 dark:bg-black/20 border border-neutral-200 dark:border-white/10 backdrop-blur-md flex items-center gap-4 relative group"
          >
            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-400">
              <Eye className="w-6 h-6" />
            </div>
            <div>
              <div className="text-2xl font-bold text-white">15+</div>
              <div className="text-xs text-neutral-400 font-mono uppercase tracking-wider mt-0.5">Repositories</div>
            </div>
          </motion.div>
        </div>

        {/* GitHub Calendar Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="p-6 md:p-8 rounded-3xl bg-white/5 dark:bg-black/20 border border-neutral-200 dark:border-white/10 backdrop-blur-md overflow-hidden relative group"
        >
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-neutral-200">mujis-star / Contributions</h3>
            <span className="text-xs font-mono text-neutral-500">1,424 commits in the past year</span>
          </div>

          <div className="flex flex-col items-center">
            {/* Grid Calendar */}
            <div className="flex gap-[3px] overflow-x-auto w-full max-w-full pb-4 scrollbar-none justify-center">
              {grid.map((week, wIdx) => (
                <div key={wIdx} className="flex flex-col gap-[3px]">
                  {week.map((level, dIdx) => (
                    <motion.div
                      key={dIdx}
                      initial={{ scale: 0.6, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: (wIdx * 7 + dIdx) * 0.003 }}
                      className={`w-[11px] h-[11px] rounded-[2px] transition-colors duration-500 cursor-pointer ${getLevelColor(level)}`}
                      whileHover={{ scale: 1.3, zIndex: 10 }}
                    />
                  ))}
                </div>
              ))}
            </div>

            {/* Legend */}
            <div className="flex items-center gap-1.5 self-end mt-4 text-[10px] text-neutral-500 font-mono">
              <span>Less</span>
              <div className="w-[10px] h-[10px] rounded-[1px] bg-neutral-800/40" />
              <div className="w-[10px] h-[10px] rounded-[1px] bg-emerald-950/60" />
              <div className="w-[10px] h-[10px] rounded-[1px] bg-emerald-800/60" />
              <div className="w-[10px] h-[10px] rounded-[1px] bg-emerald-500/70" />
              <div className="w-[10px] h-[10px] rounded-[1px] bg-emerald-400/90" />
              <span>More</span>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
