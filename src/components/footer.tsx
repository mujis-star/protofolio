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
        <div className="hidden lg:flex items-center gap-3 px-3.5 py-1 rounded-full bg-white/5 border border-white/10 text-[11px]">
          <span className="text-emerald-400 font-bold">⚡ 95+ Perf</span>
          <span className="text-neutral-700">•</span>
          <span className="text-blue-400 font-bold">♿ 100 A11y</span>
          <span className="text-neutral-700">•</span>
          <span className="text-purple-400 font-bold">🔍 100 SEO</span>
        </div>

        <div className="flex flex-wrap items-center gap-3 justify-center">
          <span>©2026</span>
          <span className="text-neutral-700">•</span>
          <span>Built with Next.js</span>
          <span className="text-neutral-700">•</span>
          <a
            href={data.personal.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            GitHub
          </a>
          <span className="text-neutral-700">•</span>
          <a
            href={data.personal.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}
