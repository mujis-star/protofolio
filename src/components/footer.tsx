"use client";

import Link from "next/link";
import { useContent } from "@/context/content-context";
import { ArrowUpRight } from "lucide-react";

export function Footer() {
  const data = useContent();
  return (
    <footer className="w-full border-t border-neutral-200 dark:border-neutral-800 bg-white/50 dark:bg-black/50 backdrop-blur-md">
      <div className="container mx-auto px-6 py-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-mono text-neutral-500">
        <div className="flex flex-wrap items-center gap-2 justify-center md:justify-start">
          <span className="font-bold text-neutral-800 dark:text-white">{data.personal.name}</span>
          <span>/</span>
          <span>{data.personal.role}</span>
        </div>

        {/* Lighthouse Audit Performance Metrics */}
        <div className="hidden lg:flex items-center gap-3 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-[11px]">
          <span className="text-emerald-400 font-bold uppercase tracking-wider font-mono">Lighthouse Verified</span>
          <span className="text-neutral-700">•</span>
          <span className="text-neutral-400">Perf 96+</span>
          <span className="text-neutral-700">•</span>
          <span className="text-neutral-400">A11y 100</span>
          <span className="text-neutral-700">•</span>
          <span className="text-neutral-400">SEO 100</span>
          <span className="text-neutral-700">•</span>
          <span className="text-neutral-400">Best Practices 100</span>
        </div>

        <div className="flex flex-col items-center md:items-end gap-1.5">
          <div className="flex flex-wrap items-center gap-3 justify-center text-neutral-400">
            <span>Designed & Engineered by Mujeeb Rahman</span>
          </div>
          <div className="flex flex-wrap items-center gap-2 justify-center text-[10px] text-neutral-500 font-sans">
            <span>Next.js</span>
            <span>•</span>
            <span>TypeScript</span>
            <span>•</span>
            <span>Tailwind CSS</span>
            <span>•</span>
            <span>Framer Motion</span>
            <span>•</span>
            <span>Firebase</span>
          </div>
          <div className="flex items-center gap-3 mt-1">
            <span>© 2026</span>
            <span className="text-neutral-700">•</span>
            <a href={data.personal.github} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">GitHub</a>
            <span className="text-neutral-700">•</span>
            <a href={data.personal.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">LinkedIn</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
