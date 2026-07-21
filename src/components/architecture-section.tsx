"use client";

import { motion } from "framer-motion";
import { Server, Database, Layers, Flame, Cpu, Globe } from "lucide-react";

export function ArchitectureSection() {
  const techChoices = [
    {
      title: "Next.js App Router",
      description: "Leveraging React Server Components (RSC) to ship less JavaScript to the client, resulting in near-instant page loads and optimal SEO.",
      icon: Globe,
      color: "text-blue-400 bg-blue-500/10 border-blue-500/20"
    },
    {
      title: "Firebase & Firestore",
      description: "NoSQL database paired with context providers for dynamic content management. Bypasses static build times for real-time updates.",
      icon: Database,
      color: "text-orange-400 bg-orange-500/10 border-orange-500/20"
    },
    {
      title: "Framer Motion",
      description: "Hardware-accelerated layout transitions and scroll-linked animations that maintain a steady 60 FPS without layout thrashing.",
      icon: Layers,
      color: "text-purple-400 bg-purple-500/10 border-purple-500/20"
    },
    {
      title: "Resend API",
      description: "Serverless email infrastructure integrated via Next.js Route Handlers (API routes) to securely manage the contact form.",
      icon: Flame,
      color: "text-red-400 bg-red-500/10 border-red-500/20"
    }
  ];

  return (
    <section className="py-24 md:py-32 relative overflow-hidden bg-transparent" id="architecture" aria-label="Portfolio Architecture">
      <div className="container mx-auto px-6 max-w-5xl relative z-10">
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-xs font-mono text-indigo-400 mb-4">
            <Cpu className="w-3 h-3" />
            Under The Hood
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4">
            How I Built <span className="text-blue-500">This.</span>
          </h2>
          <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-xl mx-auto">
            This portfolio isn't just a static site. It's a full-stack application built to demonstrate performance, accessibility, and modern engineering practices.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {techChoices.map((tech, index) => {
            const Icon = tech.icon;
            return (
              <motion.div
                key={tech.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="p-8 rounded-3xl bg-white/5 dark:bg-black/20 border border-neutral-200 dark:border-white/10 backdrop-blur-md flex flex-col justify-center"
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center border mb-6 ${tech.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">
                  {tech.title}
                </h3>
                <p className="text-sm text-neutral-400 leading-relaxed font-sans">
                  {tech.description}
                </p>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
