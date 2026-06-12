"use client";

import { motion } from "framer-motion";
import { useContent } from "@/context/content-context";
import { Award, ShieldCheck, Trophy } from "lucide-react";

export function AchievementsSection() {
  const data = useContent();
  return (
    <section id="achievements" className="py-24 md:py-32 relative overflow-hidden bg-transparent">
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 md:mb-24"
        >
          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4">
            Awards & <span className="text-blue-500">Achievements.</span>
          </h2>
          <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
            Milestones and recognitions from my journey in tech, AI, and cybersecurity.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {data.achievements.map((achievement, index) => {
            // Pick a random icon based on index to make it look dynamic
            const Icon = index % 3 === 0 ? Trophy : index % 3 === 1 ? ShieldCheck : Award;
            
            return (
              <motion.div
                key={achievement.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="group relative p-8 rounded-3xl bg-white/5 dark:bg-black/20 backdrop-blur-md border border-neutral-200 dark:border-white/10 hover:border-blue-500/30 hover:shadow-[0_0_30px_rgba(59,130,246,0.15)] transition-all duration-500 overflow-hidden"
              >
                {/* Glowing background on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-cyan-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-2xl bg-blue-500/10 flex items-center justify-center mb-6 group-hover:bg-blue-500/20 group-hover:scale-110 transition-all duration-500">
                    <Icon className="w-7 h-7 text-blue-500" />
                  </div>
                  
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-blue-400">
                      {achievement.category}
                    </span>
                    <span className="text-xs font-mono text-neutral-500">
                      // {achievement.date}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-3 group-hover:text-blue-400 transition-colors">
                    {achievement.title}
                  </h3>
                  <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed text-sm">
                    {achievement.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
