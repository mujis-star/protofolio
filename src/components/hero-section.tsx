"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import data from "@/data/content.json";

const codeTokens = [
  { text: "import ", color: "text-pink-500" },
  { text: "{ Core } ", color: "text-blue-300" },
  { text: "from ", color: "text-pink-500" },
  { text: '"@sys/core"', color: "text-green-400" },
  { text: ";\n", color: "text-white" },
  
  { text: "import ", color: "text-pink-500" },
  { text: "{ NeuralNet } ", color: "text-blue-300" },
  { text: "from ", color: "text-pink-500" },
  { text: '"@ai/engine"', color: "text-green-400" },
  { text: ";\n\n", color: "text-white" },

  { text: "async function ", color: "text-pink-500" },
  { text: "initSequence", color: "text-yellow-300" },
  { text: "() {\n", color: "text-white" },

  { text: "  console.", color: "text-white" },
  { text: "log", color: "text-yellow-300" },
  { text: "(", color: "text-white" },
  { text: '"Booting core systems..."', color: "text-green-400" },
  { text: ");\n", color: "text-white" },

  { text: "  const ", color: "text-pink-500" },
  { text: "sys ", color: "text-blue-300" },
  { text: "= ", color: "text-white" },
  { text: "new ", color: "text-pink-500" },
  { text: "Core", color: "text-yellow-300" },
  { text: "({\n", color: "text-white" },
  
  { text: "    mode: ", color: "text-white" },
  { text: '"overdrive"', color: "text-green-400" },
  { text: ",\n", color: "text-white" },
  
  { text: "    threads: ", color: "text-white" },
  { text: "128", color: "text-orange-400" },
  { text: ",\n", color: "text-white" },
  
  { text: "    encryption: ", color: "text-white" },
  { text: "true", color: "text-orange-400" },
  { text: "\n  });\n\n", color: "text-white" },

  { text: "  await ", color: "text-pink-500" },
  { text: "sys.", color: "text-white" },
  { text: "connect", color: "text-yellow-300" },
  { text: "();\n", color: "text-white" },
  
  { text: "  if ", color: "text-pink-500" },
  { text: "(sys.", color: "text-white" },
  { text: "status ", color: "text-blue-300" },
  { text: "=== ", color: "text-pink-500" },
  { text: '"ACTIVE"', color: "text-green-400" },
  { text: ") {\n", color: "text-white" },

  { text: "    const ", color: "text-pink-500" },
  { text: "net ", color: "text-blue-300" },
  { text: "= ", color: "text-white" },
  { text: "new ", color: "text-pink-500" },
  { text: "NeuralNet", color: "text-yellow-300" },
  { text: "();\n", color: "text-white" },
  
  { text: "    net.", color: "text-white" },
  { text: "sync", color: "text-yellow-300" },
  { text: "();\n", color: "text-white" },
  
  { text: "    return ", color: "text-pink-500" },
  { text: '"Welcome, Engineer."', color: "text-green-400" },
  { text: ";\n  }\n}", color: "text-white" }
];

function TypingCodeWidget() {
  const [displayedChars, setDisplayedChars] = useState(0);
  const totalChars = codeTokens.reduce((acc, token) => acc + token.text.length, 0);

  useEffect(() => {
    let currentChars = 0;
    let isDeleting = false;
    let timeout: NodeJS.Timeout;

    const type = () => {
      if (!isDeleting && currentChars < totalChars) {
        currentChars++;
        setDisplayedChars(currentChars);
        timeout = setTimeout(type, 10 + Math.random() * 20); // Faster typing for long scripts
      } else if (!isDeleting && currentChars === totalChars) {
        isDeleting = true;
        timeout = setTimeout(type, 4000); // Wait longer at the end
      } else if (isDeleting && currentChars > 0) {
        currentChars--;
        setDisplayedChars(currentChars);
        timeout = setTimeout(type, 5); // Very fast delete
      } else if (isDeleting && currentChars === 0) {
        isDeleting = false;
        timeout = setTimeout(type, 500);
      }
    };

    timeout = setTimeout(type, 1000);
    return () => clearTimeout(timeout);
  }, [totalChars]);

  let charsLeft = displayedChars;

  return (
    <pre className="text-xs sm:text-sm font-mono text-blue-400 leading-relaxed text-left whitespace-pre-wrap">
      <code>
        {codeTokens.map((token, i) => {
          if (charsLeft <= 0) return null;
          const take = Math.min(charsLeft, token.text.length);
          charsLeft -= take;
          return (
            <span key={i} className={token.color}>
              {token.text.substring(0, take)}
            </span>
          );
        })}
        <span className="inline-block w-[5px] h-[10px] bg-white/70 ml-0.5 animate-pulse align-middle" />
      </code>
    </pre>
  );
}

export function HeroSection() {
  return (
    <section className="relative min-h-[calc(100vh-5rem)] flex items-center pt-20 md:pt-0 overflow-hidden">
      <div className="container relative z-10 px-6 mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Content */}
          <div className="flex flex-col items-start text-left">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 dark:bg-black/20 backdrop-blur-md border border-white/10 dark:border-white/5 text-sm font-medium mb-8 shadow-[0_0_15px_rgba(0,0,0,0.1)] dark:shadow-[0_0_20px_rgba(59,130,246,0.15)]"
            >
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
              <span className="text-neutral-700 dark:text-neutral-300">{data.personal.availabilityStatus}</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-6 leading-tight text-neutral-900 dark:text-white"
            >
              I craft <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-600 drop-shadow-[0_0_15px_rgba(59,130,246,0.3)]">digital</span>
              <br />
              experiences.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-lg md:text-xl text-neutral-600 dark:text-neutral-300 max-w-xl mb-10 leading-relaxed"
            >
              Hi, I'm <strong className="text-black dark:text-white font-semibold">{data.personal.name}</strong>. A {data.personal.role} based in {data.personal.location}.
              {data.personal.bio}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-col sm:flex-row items-center gap-5 w-full sm:w-auto"
            >
              <a
                href="#projects"
                className="group flex h-14 w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-blue-600 px-8 text-sm font-bold text-white transition-all duration-300 hover:bg-blue-500 hover:scale-105 hover:shadow-[0_0_30px_rgba(59,130,246,0.6)]"
              >
                <Sparkles className="w-4 h-4" />
                View Projects
              </a>
              <a
                href="#contact"
                className="group flex h-14 w-full sm:w-auto items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 dark:bg-white/5 backdrop-blur-md px-8 text-sm font-bold text-neutral-800 dark:text-white transition-all duration-300 hover:bg-white/10 dark:hover:bg-white/10 hover:border-white/30 hover:shadow-[0_0_20px_rgba(255,255,255,0.1)]"
              >
                Contact Me
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </motion.div>
          </div>

          {/* Right Video Container (Dashboard Interface) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, x: 50 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.4, type: "spring", stiffness: 100 }}
            className="relative w-full aspect-square md:aspect-[4/3] lg:aspect-[4/5] xl:aspect-square rounded-3xl overflow-hidden border border-white/10 shadow-[0_0_50px_rgba(59,130,246,0.15)] group"
          >
            {/* Ambient Glow to replace video light and make glassmorphism pop */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.15)_0%,transparent_70%)] pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/20 via-transparent to-purple-900/20 pointer-events-none" />

            {/* Dashboard HUD Elements */}
            
            {/* Top Bar (Console Header) */}
            <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center bg-gradient-to-b from-black/40 to-transparent">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80 border border-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80 border border-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500/80 border border-green-500" />
              </div>
              <div className="px-3 py-1 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-[10px] font-mono text-cyan-300 uppercase tracking-widest shadow-[0_0_15px_rgba(6,182,212,0.2)]">
                Sys.Active // {new Date().getFullYear()}
              </div>
            </div>

            {/* Floating Cyber Terminal Widget */}
            <div className="absolute top-12 sm:top-24 left-4 sm:left-6 rounded-xl bg-[#0a1128]/60 backdrop-blur-xl border border-blue-500/40 shadow-[0_0_50px_rgba(59,130,246,0.2)] opacity-95 transition-all duration-500 w-[300px] sm:w-[380px] lg:w-[420px] overflow-hidden flex flex-col group/terminal hover:opacity-100 hover:shadow-[0_0_70px_rgba(59,130,246,0.4)] z-20">
              
              {/* Terminal Header */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-blue-500/30 bg-blue-900/10 backdrop-blur-md">
                <div className="flex items-center gap-2 sm:gap-3">
                  <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-red-500 animate-pulse shadow-[0_0_8px_rgba(239,68,68,0.8)]" />
                  <span className="text-[10px] sm:text-xs font-mono text-blue-300 tracking-widest uppercase [text-shadow:0_0_8px_rgba(147,197,253,0.5)]">sys.terminal_exec</span>
                </div>
                <div className="flex gap-2">
                  <div className="w-2 h-2 rounded-full bg-white/20" />
                  <div className="w-2 h-2 rounded-full bg-white/20" />
                </div>
              </div>
              
              {/* Terminal Body with Effects */}
              <div className="relative p-5 sm:p-6 h-[200px] sm:h-[250px] lg:h-[280px] overflow-hidden">
                {/* Animated Laser Scanline */}
                <motion.div 
                  animate={{ top: ["0%", "100%", "0%"] }}
                  transition={{ duration: 5, ease: "linear", repeat: Infinity }}
                  className="absolute left-0 right-0 h-[2px] bg-blue-400/50 shadow-[0_0_15px_rgba(96,165,250,0.8)] z-10 pointer-events-none"
                />
                
                {/* CRT Screen Scanlines Overlay */}
                <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.4)_50%)] bg-[length:100%_4px] pointer-events-none z-10 opacity-50 mix-blend-overlay" />
                
                <div className="relative z-20">
                  <TypingCodeWidget />
                </div>
              </div>
            </div>

            {/* Floating Performance Stats Widget */}
            <div className="absolute top-32 right-6 p-4 rounded-xl bg-[#0a1128]/60 backdrop-blur-xl border border-white/10 flex flex-col gap-3 opacity-95 transition-all duration-500 hover:opacity-100 z-20 shadow-[0_0_30px_rgba(0,0,0,0.5)]">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.8)]" />
                <span className="text-[10px] font-mono text-white/90">FPS: 144</span>
              </div>
              <div className="w-24 h-1 bg-white/10 rounded-full overflow-hidden">
                <div className="w-[85%] h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full" />
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-blue-500" />
                <span className="text-[10px] font-mono text-white/90">MEM: 32%</span>
              </div>
            </div>
            
            {/* Bottom Glassmorphism Info Card */}
            <div className="absolute bottom-6 left-6 right-6 p-5 sm:p-6 rounded-2xl bg-[#0a1128]/60 backdrop-blur-xl border border-white/20 opacity-95 transition-all duration-500 shadow-[0_10px_40px_rgba(0,0,0,0.5)] hover:bg-[#0a1128]/80 z-20">
              <div className="flex justify-between items-end">
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-white mb-1 tracking-wide">Currently Building</h3>
                  <p className="text-xs sm:text-sm text-blue-300 font-mono">AI & Secure Network Systems</p>
                </div>
                <div className="flex gap-1 h-6 items-end">
                  {/* Fake Audio/Data Visualizer */}
                  {[1, 2, 3, 4, 5].map((i) => (
                    <motion.div
                      key={i}
                      animate={{ height: ["20%", "100%", "40%", "80%", "20%"] }}
                      transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1 }}
                      className="w-1.5 bg-cyan-400 rounded-t-sm"
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}
