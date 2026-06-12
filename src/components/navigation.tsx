"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ThemeToggle } from "./theme-toggle";

const navLinks = [
  { name: "About", href: "#about" },
  { name: "Services", href: "#services" },
  { name: "Projects", href: "#projects" },
  { name: "Experience", href: "#experience" },
];

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#030712]/80 backdrop-blur-xl border-b border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
          : "bg-gradient-to-b from-[#030712]/90 via-[#030712]/50 to-transparent backdrop-blur-[2px]"
      }`}
    >
      <div className="container mx-auto px-6 h-24 flex items-center justify-between">
        <Link href="/" className="text-2xl font-black tracking-tighter text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
          MUJEEB<span className="text-cyan-400">.</span>
        </Link>

        <nav className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="relative text-sm font-bold text-white/80 hover:text-cyan-400 transition-all duration-300 hover:scale-110 hover:drop-shadow-[0_0_15px_rgba(34,211,238,0.8)] tracking-wide"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <Link
            href="#contact"
            className="hidden md:inline-flex h-11 items-center justify-center rounded-full border border-cyan-500/30 bg-cyan-500/10 backdrop-blur-md px-8 text-sm font-bold text-white transition-all duration-300 hover:bg-cyan-500/20 hover:scale-105 hover:border-cyan-400 hover:shadow-[0_0_25px_rgba(34,211,238,0.4)]"
          >
            Let's Talk
          </Link>
        </div>
      </div>
    </motion.header>
  );
}
