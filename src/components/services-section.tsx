"use client";

import { motion } from "framer-motion";
import { Code2, Bot, Users, Layout } from "lucide-react";

export function ServicesSection() {
  const buildItems = [
    {
      title: "Web Applications",
      description: "High-performance React & Next.js applications engineered for speed, clean state, and accessibility.",
      icon: Code2,
      tag: "Next.js • React • TypeScript",
    },
    {
      title: "AI Tools & Interfaces",
      description: "Real-time AI document assistants, OpenAI GPT-4 API pipelines, and vector database search tools.",
      icon: Bot,
      tag: "OpenAI API • Vector DB • LLMs",
    },
    {
      title: "Community Platforms",
      description: "Accessible, mobile-responsive web portals designed to connect communities with media assets.",
      icon: Users,
      tag: "Vercel • HTML5/CSS3 • Responsive UI",
    },
    {
      title: "UI Systems & Motion",
      description: "Custom design token systems, fluid Framer Motion transitions, and interactive visual HUDs.",
      icon: Layout,
      tag: "Framer Motion • Tailwind • Figma",
    },
  ];

  return (
    <section id="services" className="py-24 md:py-32 relative overflow-hidden bg-transparent" aria-label="What I Build">
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-mono text-blue-400 mb-4">
            Product Capabilities
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4">
            What I <span className="text-blue-500">Build.</span>
          </h2>
          <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
            Focusing on digital applications that combine UI design excellence with scalable frontend code.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {buildItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group p-6 rounded-3xl bg-white/5 dark:bg-black/20 backdrop-blur-md border border-neutral-200 dark:border-white/10 hover:border-blue-500/30 transition-all duration-300 relative flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-6 text-blue-400">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm text-neutral-400 leading-relaxed font-sans mb-6">
                    {item.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10">
                  <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-wider">
                    {item.tag}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
