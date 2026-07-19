"use client";

import { motion } from "framer-motion";
import { Search, Compass, Layout, Code2, Gauge, Rocket } from "lucide-react";

export function ProcessSection() {
  const steps = [
    {
      num: "01",
      title: "Discovery & Research",
      description: "Understanding core problem statements, user needs, and target outcomes before writing code.",
      icon: Search,
      color: "text-blue-400 border-blue-500/30 bg-blue-500/10",
    },
    {
      num: "02",
      title: "Architecture & Planning",
      description: "Designing scalable component hierarchies, state models, and backend integration points.",
      icon: Compass,
      color: "text-cyan-400 border-cyan-500/30 bg-cyan-500/10",
    },
    {
      num: "03",
      title: "UI/UX Design System",
      description: "Crafting modern wireframes, cohesive color palettes, typography, and fluid micro-animations.",
      icon: Layout,
      color: "text-purple-400 border-purple-500/30 bg-purple-500/10",
    },
    {
      num: "04",
      title: "Frontend Engineering",
      description: "Writing clean, type-safe React & Next.js code with structured Tailwind styling and custom hooks.",
      icon: Code2,
      color: "text-pink-400 border-pink-500/30 bg-pink-500/10",
    },
    {
      num: "05",
      title: "Optimization & Audit",
      description: "Testing Lighthouse scores (95+), ARIA keyboard accessibility, and cross-browser responsiveness.",
      icon: Gauge,
      color: "text-emerald-400 border-emerald-500/30 bg-emerald-500/10",
    },
    {
      num: "06",
      title: "Deployment & Iteration",
      description: "Deploying to Vercel production edge servers with continuous integration and feature updates.",
      icon: Rocket,
      color: "text-amber-400 border-amber-500/30 bg-amber-500/10",
    },
  ];

  return (
    <section className="py-24 md:py-32 relative overflow-hidden bg-transparent" aria-label="Development Process">
      <div className="container mx-auto px-6 relative z-10">
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-mono text-blue-400 mb-4">
            Workflow & Methodology
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4">
            How I <span className="text-blue-500">Work.</span>
          </h2>
          <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-xl mx-auto">
            A systematic, engineering-first approach to delivering fast, polished digital applications.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group p-6 sm:p-8 rounded-3xl bg-white/5 dark:bg-black/20 border border-neutral-200 dark:border-white/10 backdrop-blur-md hover:border-blue-500/30 transition-all duration-300 relative overflow-hidden flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-xs font-mono font-bold text-neutral-500">{step.num}</span>
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${step.color}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-sm text-neutral-400 leading-relaxed font-sans">
                    {step.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/5 flex items-center gap-1.5 text-[10px] font-mono text-neutral-500 uppercase tracking-widest">
                  <span>Stage {index + 1} of 6</span>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
