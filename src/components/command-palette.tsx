"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, User, Wrench, FolderGit2, Briefcase, Mail, FileText, Sparkles } from "lucide-react";

export function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      } else if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setSearch("");
    }
  }, [isOpen]);

  const items = [
    { name: "About Me", category: "Navigation", icon: User, href: "#about" },
    { name: "Tech Stack & Skills", category: "Navigation", icon: Wrench, href: "#skills" },
    { name: "Featured Projects", category: "Navigation", icon: FolderGit2, href: "#projects" },
    { name: "Experience Timeline", category: "Navigation", icon: Briefcase, href: "#experience" },
    { name: "Contact Card", category: "Navigation", icon: Mail, href: "#contact" },
    { name: "Download PDF Resume", category: "Resources", icon: FileText, href: "/resume.pdf", external: true },
  ];

  const filteredItems = items.filter(
    (item) =>
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.category.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelect = (item: typeof items[0]) => {
    setIsOpen(false);
    if (item.external) {
      window.open(item.href, "_blank", "noopener,noreferrer");
    } else {
      const target = document.getElementById(item.href.replace("#", ""));
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="absolute inset-0 bg-black/60 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ type: "spring", duration: 0.3 }}
            className="relative w-full max-w-lg bg-[#070b19] border border-blue-500/30 rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(59,130,246,0.25)] flex flex-col font-sans"
          >
            {/* Search Box */}
            <div className="flex items-center gap-3 px-4 py-4 border-b border-white/10">
              <Search className="w-5 h-5 text-neutral-400 shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search command or navigate..."
                className="w-full bg-transparent text-white outline-none border-none p-0 focus:ring-0 text-sm placeholder-neutral-500"
              />
              <span className="text-[10px] font-mono bg-white/5 border border-white/10 rounded px-1.5 py-0.5 text-neutral-400 shrink-0 select-none">
                ESC
              </span>
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto max-h-[300px] p-2 space-y-1 scrollbar-none">
              {filteredItems.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <button
                    key={idx}
                    onClick={() => handleSelect(item)}
                    className="w-full flex items-center gap-3 px-4 py-3 text-left rounded-xl hover:bg-blue-500/10 text-neutral-300 hover:text-white transition-all group cursor-pointer text-sm"
                  >
                    <Icon className="w-4 h-4 text-neutral-500 group-hover:text-cyan-400 transition-colors shrink-0" />
                    <span className="flex-1 font-medium">{item.name}</span>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-500 px-2 py-0.5 bg-white/5 rounded border border-white/5 group-hover:border-blue-500/20">
                      {item.category}
                    </span>
                  </button>
                );
              })}

              {filteredItems.length === 0 && (
                <div className="text-center py-8 text-neutral-500 text-sm flex flex-col items-center gap-2">
                  <Sparkles className="w-5 h-5 text-neutral-600" />
                  No results found for "{search}"
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="px-4 py-2 bg-black/40 border-t border-white/5 flex justify-between items-center text-[10px] font-mono text-neutral-500 select-none">
              <span>Use ↑↓ arrows to navigate</span>
              <span>Press Ctrl+K to close</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
