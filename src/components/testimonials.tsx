"use client";

import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";

export function Testimonials() {
  const testimonials = [
    {
      quote: "Mujeeb designed and structured our community web platform with exceptional attention to mobile performance and layout clarity. He communicates engineering decisions clearly.",
      author: "Project Lead",
      relation: "ITQAN Community Web Project",
    },
    {
      quote: "Mujeeb handled our workstation hardware diagnostics, storage drive recoveries, and system setups methodically. He approaches complex technical hurdles with patience and precision.",
      author: "Lab Administrator",
      relation: "Academic Systems & Hardware Lab",
    },
  ];

  return (
    <section className="py-24 md:py-32 relative overflow-hidden bg-transparent" aria-label="Testimonials and Endorsements">
      <div className="container mx-auto px-6 max-w-5xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-mono text-blue-400 mb-4">
            Recommendations
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4">
            Collaborator <span className="text-blue-500">Feedback.</span>
          </h2>
          <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-xl mx-auto">
            Direct endorsements from team leads and project collaborators.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="p-8 rounded-3xl bg-white/5 dark:bg-black/20 backdrop-blur-md border border-neutral-200 dark:border-white/10 relative flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-1 text-amber-400 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <p className="text-base text-neutral-300 italic leading-relaxed mb-6 font-sans">
                  "{item.quote}"
                </p>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-white">{item.author}</h4>
                  <span className="text-xs text-neutral-500 font-mono">{item.relation}</span>
                </div>
                <Quote className="w-6 h-6 text-blue-500/30" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
