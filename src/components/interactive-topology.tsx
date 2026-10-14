"use client";

import React, { useState } from "react";
import { Server, Shield, Network, Monitor, HardDrive, Database, Wifi } from "lucide-react";
import { soundManager } from "@/lib/sound";

interface NodeDetail {
  id: string;
  name: string;
  role: string;
  ip: string;
  status: "ONLINE" | "STANDBY" | "ROUTING";
  description: string;
  tools: string[];
}

const NODES: Record<string, NodeDetail> = {
  pfsense: {
    id: "pfsense",
    name: "pfSense Security Gateway",
    role: "Perimeter Firewall & Routing",
    ip: "192.168.1.1/24",
    status: "ONLINE",
    description: "Multi-WAN gateway managing VLAN segmentation, stateful inspection, and bandwidth traffic shaping.",
    tools: ["FreeRADIUS Captive Portal", "SNORT IDS", "DHCP Server", "DNS Resolver"],
  },
  samba: {
    id: "samba",
    name: "Samba Active Directory DC",
    role: "Identity & Access Directory",
    ip: "192.168.1.5",
    status: "ONLINE",
    description: "Linux-hosted Samba 4 domain controller handling user logon policies, Kerberos tickets, and LDAP authentication.",
    tools: ["Kerberos V5", "LDAP Bindings", "Group Policy (GPO)", "Roaming Profiles"],
  },
  fog: {
    id: "fog",
    name: "FOG PXE Server & NFS Pool",
    role: "Automated Disk Imaging & Storage",
    ip: "192.168.1.10",
    status: "ONLINE",
    description: "Centralized TFTP/PXE network deployment server with dynamic LVM storage expansion and NFS shared mount exports.",
    tools: ["PXE Bootloader", "TFTP Service", "NFS Storage Mount", "LVM Logical Volumes"],
  },
  fleet: {
    id: "fleet",
    name: "Lab Terminal Fleet (30+ Stations)",
    role: "Workstation Endpoints",
    ip: "192.168.1.100 - 130",
    status: "ROUTING",
    description: "Custom-assembled Intel H410 motherboards with NVMe storage. Monitored via Veyon and provisioned via unattended batch scripts.",
    tools: ["Intel H410 Chipset", "NVMe SSD Optimization", "Veyon Master/Service", "Silent Batch Automation"],
  },
  cloud: {
    id: "cloud",
    name: "Vercel Edge & Firebase",
    role: "Public Web Deployments",
    ip: "Edge CDN Anycast",
    status: "ONLINE",
    description: "Production web applications (ITQAN Friends, Reelagram, Portfolio) deployed with sub-second latency.",
    tools: ["Next.js App Router", "Firebase Auth / Firestore", "Vercel CDN", "Google Search Console"],
  },
};

export function InteractiveTopology() {
  const [selectedNode, setSelectedNode] = useState<string>("pfsense");
  const node = NODES[selectedNode];

  const handleSelect = (id: string) => {
    soundManager.playClick();
    setSelectedNode(id);
  };

  return (
    <div className="w-full flex flex-col h-full bg-[#030712]/90 backdrop-blur-xl rounded-2xl p-4 sm:p-5 border border-white/10 text-left">
      <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
          <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
            Live Lab Topology Map
          </span>
        </div>
        <span className="text-[10px] font-mono text-cyan-400 px-2 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/20">
          Interactive Node Inspect
        </span>
      </div>

      {/* SVG Interactive Architecture Graph */}
      <div className="relative w-full h-[140px] sm:h-[160px] bg-black/40 rounded-xl border border-white/5 p-2 flex items-center justify-between overflow-x-auto scrollbar-none">
        {/* Connection Wire Lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" xmlns="http://www.w3.org/2000/svg">
          <line x1="18%" y1="50%" x2="40%" y2="28%" stroke="rgba(59, 130, 246, 0.4)" strokeWidth="1.5" strokeDasharray="3 3" />
          <line x1="18%" y1="50%" x2="40%" y2="72%" stroke="rgba(59, 130, 246, 0.4)" strokeWidth="1.5" strokeDasharray="3 3" />
          <line x1="40%" y1="28%" x2="70%" y2="50%" stroke="rgba(34, 211, 238, 0.4)" strokeWidth="1.5" />
          <line x1="40%" y1="72%" x2="70%" y2="50%" stroke="rgba(168, 85, 247, 0.4)" strokeWidth="1.5" />
          <line x1="70%" y1="50%" x2="90%" y2="50%" stroke="rgba(52, 211, 153, 0.4)" strokeWidth="1.5" strokeDasharray="4 2" />
        </svg>

        {/* Nodes Grid */}
        <div className="relative z-10 w-full flex items-center justify-between px-2 gap-2 min-w-[340px]">
          {/* Node 1: pfSense */}
          <button
            type="button"
            onClick={() => handleSelect("pfsense")}
            className={`flex flex-col items-center gap-1.5 p-2 rounded-xl transition-all duration-300 ${
              selectedNode === "pfsense"
                ? "bg-blue-600/30 border border-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.5)] scale-105"
                : "bg-white/5 border border-white/10 hover:bg-white/10"
            }`}
          >
            <Shield className="w-5 h-5 text-blue-400" />
            <span className="text-[10px] font-mono font-bold text-white">pfSense</span>
          </button>

          {/* Node 2 & 3: Middle Layer (Samba AD & FOG) */}
          <div className="flex flex-col gap-2">
            <button
              type="button"
              onClick={() => handleSelect("samba")}
              className={`flex items-center gap-2 px-2.5 py-1.5 rounded-xl transition-all duration-300 ${
                selectedNode === "samba"
                  ? "bg-cyan-600/30 border border-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.5)] scale-105"
                  : "bg-white/5 border border-white/10 hover:bg-white/10"
              }`}
            >
              <Database className="w-4 h-4 text-cyan-400" />
              <span className="text-[10px] font-mono font-bold text-white">Samba AD</span>
            </button>
            <button
              type="button"
              onClick={() => handleSelect("fog")}
              className={`flex items-center gap-2 px-2.5 py-1.5 rounded-xl transition-all duration-300 ${
                selectedNode === "fog"
                  ? "bg-purple-600/30 border border-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.5)] scale-105"
                  : "bg-white/5 border border-white/10 hover:bg-white/10"
              }`}
            >
              <Server className="w-4 h-4 text-purple-400" />
              <span className="text-[10px] font-mono font-bold text-white">FOG / NFS</span>
            </button>
          </div>

          {/* Node 4: Fleet Workstations */}
          <button
            type="button"
            onClick={() => handleSelect("fleet")}
            className={`flex flex-col items-center gap-1.5 p-2 rounded-xl transition-all duration-300 ${
              selectedNode === "fleet"
                ? "bg-emerald-600/30 border border-emerald-400 shadow-[0_0_15px_rgba(52,211,153,0.5)] scale-105"
                : "bg-white/5 border border-white/10 hover:bg-white/10"
            }`}
          >
            <Monitor className="w-5 h-5 text-emerald-400" />
            <span className="text-[10px] font-mono font-bold text-white">30+ PCs</span>
          </button>

          {/* Node 5: Cloud Deployment */}
          <button
            type="button"
            onClick={() => handleSelect("cloud")}
            className={`flex flex-col items-center gap-1.5 p-2 rounded-xl transition-all duration-300 ${
              selectedNode === "cloud"
                ? "bg-indigo-600/30 border border-indigo-400 shadow-[0_0_15px_rgba(99,102,241,0.5)] scale-105"
                : "bg-white/5 border border-white/10 hover:bg-white/10"
            }`}
          >
            <Wifi className="w-5 h-5 text-indigo-400" />
            <span className="text-[10px] font-mono font-bold text-white">Cloud/Vercel</span>
          </button>
        </div>
      </div>

      {/* Selected Node Technical Telemetry */}
      <div className="mt-3 p-3 rounded-xl bg-black/60 border border-white/10">
        <div className="flex items-center justify-between mb-1.5">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-white font-mono">{node.name}</span>
            <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              {node.status}
            </span>
          </div>
          <span className="text-[10px] font-mono text-cyan-300">{node.ip}</span>
        </div>
        <p className="text-[11px] text-neutral-300 font-sans leading-relaxed mb-2">
          {node.description}
        </p>
        <div className="flex flex-wrap gap-1.5">
          {node.tools.map((t) => (
            <span
              key={t}
              className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-neutral-300"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
