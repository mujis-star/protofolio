"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { useContent } from "@/context/content-context";

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

function InteractiveTerminal() {
  const [history, setHistory] = useState<string[]>([
    "Booting core systems...",
    "Establishing secure connection...",
    "Access granted. Welcome to Mujeeb's shell.",
    "Type 'help' to see available commands."
  ]);
  const [input, setInput] = useState("");
  const terminalEndRef = useRef<HTMLDivElement>(null);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = input.trim().toLowerCase();
    if (!cmd) return;

    let response = "";
    switch (cmd) {
      case "help":
        response = "Available commands:\n- help : show commands\n- projects : view projects list\n- resume : download pdf resume\n- contact : email & social links\n- skills : view core stack\n- clear : clear screen";
        break;
      case "projects":
        response = "Featured projects:\n01 StudyFlow AI: AI study assistant\n02 ITQAN Friends: Responsive community web\n03 Vogue Vault: High-performance E-commerce catalog";
        break;
      case "resume":
        response = "Opening resume download link: /resume.pdf";
        if (typeof window !== "undefined") {
          window.open("/resume.pdf", "_blank");
        }
        break;
      case "contact":
        response = "Contact channels:\n- Email: mujee00012@gmail.com\n- GitHub: github.com/mujis-star\n- LinkedIn: linkedin.com";
        break;
      case "skills":
        response = "Frontend: React, Next.js, TypeScript, Tailwind\nBackend: Node.js, Express, REST APIs, Firebase\nTools: Git, Docker, Linux, VMware";
        break;
      case "clear":
        setHistory([]);
        setInput("");
        return;
      default:
        response = `Command not recognized: '${cmd}'. Type 'help' for options.`;
    }

    setHistory((prev) => [...prev, `> ${input}`, response]);
    setInput("");
  };

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  return (
    <div className="h-full flex flex-col font-mono text-[11px] sm:text-xs text-cyan-400 text-left">
      <div className="flex-1 overflow-y-auto space-y-1.5 pr-2 scrollbar-none h-[140px] sm:h-[180px] lg:h-[200px]">
        {history.map((line, i) => (
          <div key={i} className="whitespace-pre-wrap leading-relaxed">
            {line}
          </div>
        ))}
        <div ref={terminalEndRef} />
      </div>
      <form onSubmit={handleCommand} className="flex items-center mt-2 border-t border-cyan-500/20 pt-2 shrink-0">
        <span className="text-pink-500 mr-2 font-bold">$</span>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="type command here..."
          className="flex-1 bg-transparent text-cyan-400 outline-none border-none p-0 focus:ring-0 text-[11px] sm:text-xs font-mono"
        />
      </form>
    </div>
  );
}

export function HeroSection() {
  const data = useContent();
  return (
    <section className="relative min-h-[calc(100vh-5rem)] flex items-center pt-20 md:pt-0 overflow-hidden">
      {/* Static Gradient Glows (Animations removed) */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[450px] h-[450px] bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />
      
      {/* Localized Subtle Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:30px_30px] [mask-image:radial-gradient(ellipse_at_center,white,transparent_80%)] pointer-events-none" />

      <div className="container relative z-10 px-6 mx-auto max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Content */}
          <div className="flex flex-col items-start text-left">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 dark:bg-black/20 backdrop-blur-md border border-white/10 dark:border-white/5 text-sm font-medium mb-8 shadow-[0_0_10px_rgba(0,0,0,0.1)] dark:shadow-[0_0_15px_rgba(59,130,246,0.1)]"
            >
              <span className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
              <span className="text-neutral-700 dark:text-neutral-300">{data.personal.availabilityStatus}</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <h2 className="text-xl sm:text-2xl font-semibold text-neutral-500 dark:text-neutral-400 mb-2">
                {data.personal.name}
              </h2>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tighter mb-6 leading-tight text-neutral-900 dark:text-white">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-cyan-400 to-purple-600 drop-shadow-[0_0_10px_rgba(59,130,246,0.2)]">
                  {data.personal.role}
                </span>
              </h1>
            </motion.div>

            {/* Value Proposition & Brand Statement */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mb-8 flex flex-col gap-4 text-left"
            >
              <div className="flex flex-wrap gap-2 text-xs sm:text-sm font-bold tracking-widest font-mono uppercase text-blue-400">
                <span>Next.js</span>
                <span className="text-neutral-600">•</span>
                <span>React</span>
                <span className="text-neutral-600">•</span>
                <span>Firebase</span>
                <span className="text-neutral-600">•</span>
                <span>Node.js</span>
              </div>
              <p className="text-lg md:text-xl font-medium text-neutral-200 dark:text-neutral-200 max-w-xl leading-relaxed">
                {data.personal.bio.split(". ")[0]}.
              </p>
              <p className="text-base text-neutral-400 dark:text-neutral-400 max-w-xl leading-relaxed">
                {data.personal.bio.split(". ")[1]}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
            >
              <a
                href="#projects"
                className="group flex h-14 w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-blue-600 px-8 text-sm font-bold text-white transition-all duration-300 hover:bg-blue-500 hover:scale-105 hover:shadow-[0_0_30px_rgba(59,130,246,0.6)]"
              >
                <Sparkles className="w-4 h-4" />
                View Projects
              </a>
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-14 w-full sm:w-auto items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 dark:bg-white/5 backdrop-blur-md px-8 text-sm font-bold text-neutral-800 dark:text-white transition-all duration-300 hover:bg-white/10 dark:hover:bg-white/10 hover:border-white/30 hover:shadow-[0_0_20px_rgba(255,255,255,0.1)]"
              >
                Download Resume
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </motion.div>

            {/* Professional Stats HUD */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.0 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-12 mt-12 border-t border-neutral-200 dark:border-white/10 w-full"
            >
              <div>
                <div className="text-3xl md:text-4xl font-extrabold text-blue-500 font-heading">15+</div>
                <div className="text-[10px] text-neutral-500 dark:text-neutral-400 mt-1 font-mono uppercase tracking-wider">Projects Built</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-extrabold text-cyan-400 font-heading">10+</div>
                <div className="text-[10px] text-neutral-500 dark:text-neutral-400 mt-1 font-mono uppercase tracking-wider">Technologies</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-extrabold text-purple-500 font-heading">3+</div>
                <div className="text-[10px] text-neutral-500 dark:text-neutral-400 mt-1 font-mono uppercase tracking-wider">Years Learning</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-extrabold text-pink-500 font-heading">100%</div>
                <div className="text-[10px] text-neutral-500 dark:text-neutral-400 mt-1 font-mono uppercase tracking-wider">Passion</div>
              </div>
            </motion.div>
          </div>

          {/* Right Video Container (Dashboard Interface) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, x: 50 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.4, type: "spring", stiffness: 100 }}
            className="relative w-full aspect-square md:aspect-[4/3] lg:aspect-[4/5] xl:aspect-square rounded-3xl overflow-hidden bg-black/40 backdrop-blur-[2px] border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)] group"
          >
            {/* Profile Image with Soft Glow */}
            <div className="absolute inset-0 w-full h-full z-0 group-hover:scale-105 transition-transform duration-700 ease-in-out">
              <img 
                src="/profile.jpg" 
                alt="Mujeeb P" 
                className="w-full h-full object-cover opacity-25 filter grayscale group-hover:grayscale-0 transition-all duration-700" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-transparent to-transparent opacity-80" />
            </div>

            {/* Subtle Ambient Glow */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.08)_0%,transparent_60%)] pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/10 via-transparent to-purple-900/10 pointer-events-none" />

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
            <div className="absolute top-12 sm:top-24 left-4 sm:left-6 rounded-xl bg-[#030712]/90 backdrop-blur-xl border border-blue-500/40 shadow-[0_0_50px_rgba(59,130,246,0.2)] opacity-95 transition-all duration-500 w-[300px] sm:w-[380px] lg:w-[420px] overflow-hidden flex flex-col group/terminal hover:opacity-100 hover:shadow-[0_0_70px_rgba(59,130,246,0.4)] z-20">
              
              {/* Terminal Header */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-blue-500/30 bg-black/60 backdrop-blur-md">
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
                
                <div className="relative z-20 h-full">
                  <InteractiveTerminal />
                </div>
              </div>
            </div>

            {/* Floating Performance Stats Widget */}
            <div className="absolute top-32 right-6 p-4 rounded-xl bg-[#030712]/90 backdrop-blur-xl border border-white/10 flex flex-col gap-3 opacity-95 transition-all duration-500 hover:opacity-100 z-20 shadow-[0_0_30px_rgba(0,0,0,0.5)]">
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
            <div className="absolute bottom-6 left-6 right-6 p-5 sm:p-6 rounded-2xl bg-[#030712]/90 backdrop-blur-xl border border-white/20 opacity-95 transition-all duration-500 shadow-[0_10px_40px_rgba(0,0,0,0.5)] hover:bg-black/95 z-20">
              <div className="flex justify-between items-end">
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-white mb-1 tracking-wide">Currently Building</h3>
                  <p className="text-xs sm:text-sm text-blue-300 font-mono">Modern web experiences</p>
                </div>
              </div>
            </div>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}
