"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Terminal as TerminalIcon, Network, User } from "lucide-react";
import { useContent } from "@/context/content-context";
import { soundManager } from "@/lib/sound";
import { InteractiveTopology } from "@/components/interactive-topology";

const codeTokens = [
  { text: "#!/bin/bash\n", color: "text-neutral-500" },
  { text: "# Computer Lab Systems Initializer\n\n", color: "text-neutral-500" },
  
  { text: "echo ", color: "text-pink-500" },
  { text: '"[INIT] Checking pfSense Gateway: 192.168.1.1 OK"', color: "text-green-400" },
  { text: ";\n", color: "text-white" },
  
  { text: "systemctl ", color: "text-yellow-300" },
  { text: "status ", color: "text-blue-300" },
  { text: "samba-ad-dc.service", color: "text-orange-400" },
  { text: " --no-pager;\n", color: "text-white" },
  
  { text: "mount ", color: "text-yellow-300" },
  { text: "-t nfs 192.168.1.10:/images /mnt/fog_images;\n", color: "text-blue-300" },
  
  { text: "echo ", color: "text-pink-500" },
  { text: '"[PROVISION] Running unattended workstation batch sequence..."', color: "text-cyan-400" },
  { text: ";\n", color: "text-white" },
  
  { text: "veyon-cli ", color: "text-yellow-300" },
  { text: "networkdiscovery scan;\n", color: "text-green-400" },
  
  { text: "echo ", color: "text-pink-500" },
  { text: '"[STATUS] 30+ Terminals Synchronized & Ready."', color: "text-emerald-400" },
  { text: ";\n", color: "text-white" }
];

function InteractiveTerminal() {
  const [history, setHistory] = useState<string[]>([
    "pfSense Gateway: 192.168.1.1 [ONLINE]",
    "Samba AD DC: Kerberos & LDAP Auth Active",
    "FOG Imaging Server: PXE Boot & NFS Mounted",
    "Type 'help' to inspect systems, or press TAB for commands."
  ]);
  const [input, setInput] = useState("");
  const [historyCommands, setHistoryCommands] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const terminalEndRef = useRef<HTMLDivElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    soundManager.playKeypress();

    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (historyCommands.length === 0) return;
      const nextIdx = historyIndex + 1 < historyCommands.length ? historyIndex + 1 : historyIndex;
      setHistoryIndex(nextIdx);
      setInput(historyCommands[historyCommands.length - 1 - nextIdx] || "");
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex > 0) {
        const nextIdx = historyIndex - 1;
        setHistoryIndex(nextIdx);
        setInput(historyCommands[historyCommands.length - 1 - nextIdx] || "");
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInput("");
      }
    } else if (e.key === "Tab") {
      e.preventDefault();
      const allCmds = ["help", "lab", "network", "topology", "projects", "skills", "ping", "uptime", "contact", "resume", "clear"];
      const match = allCmds.find((c) => c.startsWith(input.toLowerCase()));
      if (match) {
        setInput(match);
      }
    }
  };

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = input.trim().toLowerCase();
    if (!cmd) return;

    soundManager.playSuccess();
    setHistoryCommands((prev) => [...prev, cmd]);
    setHistoryIndex(-1);

    let response = "";
    switch (cmd) {
      case "help":
        response = "Available Commands:\n- lab       : inspect hardware specs & batch automation\n- network   : pfSense firewall, RADIUS & Samba AD details\n- projects  : list production systems & web deployments\n- ping      : check live latency to gateway & edge\n- uptime    : print lab uptime & system status\n- skills    : view infrastructure & frontend stack\n- contact   : email, phone & social coordinates\n- resume    : download verified CV document\n- clear     : reset console buffer";
        break;
      case "lab":
        response = "Lab Administration Fleet:\n- Terminals  : 30+ custom Intel H410 stations (NVMe SSDs)\n- Management : Veyon Master classroom sync & monitoring\n- Automation : Unattended silent batch scripts for VS Code, Python, Adobe CC";
        break;
      case "network":
        response = "Enterprise Network Stack:\n- Firewall    : pfSense perimeter router with VLAN policies\n- Auth/Billing: Captive Portal integrated with FreeRADIUS\n- Directory   : Samba Active Directory Domain Controller\n- Storage     : FOG Project PXE server + NFS image repository";
        break;
      case "ping":
        response = "PING 192.168.1.1 (gateway): 64 bytes, icmp_seq=1 time=0.42 ms\nPING edge.vercel.app (cdn): 64 bytes, icmp_seq=2 time=18.4 ms\n--- ping statistics --- 0% packet loss, status: OPTIMAL";
        break;
      case "uptime":
        response = "System Uptime: 42 days, 14 hours, 18 min\nActive Sessions: 32 authenticated users\nMemory Usage: 4.8 GB / 16.0 GB (30%)\nStatus: ALL SERVICES HEALTHY";
        break;
      case "projects":
        response = "Live Deployments:\n01 ITQAN Friends: itqan-friends.vercel.app (Next.js + Firebase)\n02 Lab Provisioning: Unattended batch installation suite\n03 FOG & NFS: Centralized network imaging & LVM storage\n04 pfSense & RADIUS: Firewall, captive portal & Samba AD\n05 Reelagram: Media application with Firebase Auth/Firestore";
        break;
      case "resume":
        response = "Opening verified resume: /resume.pdf";
        if (typeof window !== "undefined") {
          window.open("/resume.pdf", "_blank");
        }
        break;
      case "contact":
        response = "Coordinates:\n- Location: Kannur, Kerala, India\n- Email   : mujisworld09@gmail.com\n- Phone   : +91 9746613860\n- GitHub  : github.com/mujis-star\n- LinkedIn: linkedin.com/in/mujeeb-rahman";
        break;
      case "skills":
        response = "Systems  : Proxmox VE, TrueNAS, Ubuntu, Kali Linux, Batch Scripting\nNetwork  : pfSense, RADIUS, Samba AD, NFS, LVM, FOG, Veyon\nWeb Dev  : JavaScript, Next.js, React, Firebase Auth/Firestore, Vercel\nCreative : Adobe Creative Cloud, Filmora, A3 Tabloid Editorial Layout";
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
          onKeyDown={handleKeyDown}
          placeholder="type command (or press Tab)..."
          className="flex-1 bg-transparent text-cyan-400 outline-none border-none p-0 focus:ring-0 text-[11px] sm:text-xs font-mono"
        />
      </form>
    </div>
  );
}

export function HeroSection() {
  const data = useContent();
  const [activeTab, setActiveTab] = useState<"terminal" | "topology">("terminal");

  const switchTab = (tab: "terminal" | "topology") => {
    soundManager.playClick();
    setActiveTab(tab);
  };

  return (
    <section className="relative min-h-[calc(100vh-5rem)] flex items-center pt-20 md:pt-0 overflow-hidden">
      {/* Static Gradient Glows */}
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
              <div className="flex flex-wrap gap-2 text-xs sm:text-sm font-bold tracking-widest font-mono uppercase text-cyan-400">
                <span>pfSense</span>
                <span className="text-neutral-600">•</span>
                <span>Proxmox VE</span>
                <span className="text-neutral-600">•</span>
                <span>Samba AD</span>
                <span className="text-neutral-600">•</span>
                <span>Next.js</span>
                <span className="text-neutral-600">•</span>
                <span>Firebase</span>
                <span className="text-neutral-600">•</span>
                <span>FOG Server</span>
              </div>
              <p className="text-lg md:text-xl font-medium text-neutral-200 dark:text-neutral-200 max-w-xl leading-relaxed">
                {data.personal.bio}
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
                className="group flex h-14 w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-blue-600 px-8 text-sm font-bold text-white transition-all duration-300 hover:bg-blue-500 hover:scale-105 hover:shadow-[0_0_30px_rgba(59,130,246,0.6)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
              >
                <Sparkles className="w-4 h-4" />
                View Projects
              </a>
              <a
                href="/resume.pdf"
                download
                className="group flex h-14 w-full sm:w-auto items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 dark:bg-white/5 backdrop-blur-md px-8 text-sm font-bold text-neutral-800 dark:text-white transition-all duration-300 hover:bg-white/10 dark:hover:bg-white/10 hover:border-white/30 hover:shadow-[0_0_20px_rgba(255,255,255,0.1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
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
                <div className="text-3xl md:text-4xl font-extrabold text-blue-500 font-heading">30+</div>
                <div className="text-[10px] text-neutral-500 dark:text-neutral-400 mt-1 font-mono uppercase tracking-wider">Workstations Managed</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-extrabold text-cyan-400 font-heading">Gigabit</div>
                <div className="text-[10px] text-neutral-500 dark:text-neutral-400 mt-1 font-mono uppercase tracking-wider">PXE / FOG Network</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-extrabold text-purple-400 font-heading">Zero-Touch</div>
                <div className="text-[10px] text-neutral-500 dark:text-neutral-400 mt-1 font-mono uppercase tracking-wider">Silent Automation</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-extrabold text-emerald-400 font-heading">Production</div>
                <div className="text-[10px] text-neutral-500 dark:text-neutral-400 mt-1 font-mono uppercase tracking-wider">Next.js & Vercel Live</div>
              </div>
            </motion.div>
          </div>

          {/* Right Container (Interactive Multi-Mode Engineering Dashboard) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, x: 50 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.4, type: "spring", stiffness: 100 }}
            className="relative w-full aspect-square md:aspect-[4/3] lg:aspect-[4/5] xl:aspect-square rounded-3xl overflow-hidden bg-black/70 backdrop-blur-md border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.6)] flex flex-col justify-between"
          >
            {/* Top Bar (Interactive Mode Tabs) */}
            <div className="relative z-30 p-3 sm:p-4 flex justify-between items-center bg-black/90 border-b border-white/10 backdrop-blur-xl">
              <div className="flex gap-1.5 sm:gap-2">
                <button
                  type="button"
                  onClick={() => switchTab("terminal")}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono font-bold transition-all ${
                    activeTab === "terminal"
                      ? "bg-blue-600 text-white shadow-[0_0_12px_rgba(59,130,246,0.6)]"
                      : "bg-white/5 text-neutral-400 hover:text-white hover:bg-white/10"
                  }`}
                >
                  <TerminalIcon className="w-3.5 h-3.5" />
                  <span>Terminal</span>
                </button>
                <button
                  type="button"
                  onClick={() => switchTab("topology")}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono font-bold transition-all ${
                    activeTab === "topology"
                      ? "bg-cyan-600 text-white shadow-[0_0_12px_rgba(6,182,212,0.6)]"
                      : "bg-white/5 text-neutral-400 hover:text-white hover:bg-white/10"
                  }`}
                >
                  <Network className="w-3.5 h-3.5" />
                  <span>Network Topology</span>
                </button>
              </div>

              <div className="px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono text-cyan-300 uppercase tracking-widest hidden sm:block">
                SYS.ACTIVE
              </div>
            </div>

            {/* Tab 1: Terminal Mode */}
            {activeTab === "terminal" && (
              <div className="relative flex-1 p-4 sm:p-6 overflow-hidden flex flex-col justify-between">
                {/* Profile background subtle layer */}
                <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
                  <img src="/profile.jpg" alt="" className="w-full h-full object-cover object-top grayscale" />
                  <div className="absolute inset-0 bg-[#030712]/80" />
                </div>
                
                {/* Laser scanline */}
                <motion.div 
                  animate={{ top: ["0%", "100%", "0%"] }}
                  transition={{ duration: 6, ease: "linear", repeat: Infinity }}
                  className="absolute left-0 right-0 h-[2px] bg-cyan-400/40 shadow-[0_0_15px_rgba(34,211,238,0.8)] z-10 pointer-events-none"
                />

                <div className="relative z-20 flex-1">
                  <InteractiveTerminal />
                </div>

                <div className="relative z-20 mt-3 pt-3 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-neutral-400">
                  <span className="text-emerald-400">● 30 Stations Online</span>
                  <span className="text-cyan-400">Latency: 0.42ms</span>
                  <span>Port: 192.168.1.1</span>
                </div>
              </div>
            )}

            {/* Tab 2: Interactive Network Topology Mode */}
            {activeTab === "topology" && (
              <div className="relative flex-1 p-3 sm:p-4 overflow-hidden flex flex-col justify-center">
                <InteractiveTopology />
              </div>
            )}
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}
