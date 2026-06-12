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
          ? "bg-white/70 dark:bg-black/70 backdrop-blur-md border-b border-neutral-200 dark:border-neutral-800 shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold tracking-tighter">
          MUJEEB<span className="text-blue-500">.</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="relative text-sm font-bold text-neutral-800 dark:text-neutral-200 hover:text-blue-600 dark:hover:text-cyan-400 transition-all duration-300 hover:scale-110 hover:drop-shadow-[0_0_10px_rgba(34,211,238,0.8)] [text-shadow:0_2px_10px_rgba(0,0,0,0.8)]"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <Link
            href="#contact"
            className="hidden md:inline-flex h-10 items-center justify-center rounded-full border border-neutral-300 dark:border-white/20 bg-black/5 dark:bg-white/10 backdrop-blur-md px-6 text-sm font-bold text-black dark:text-white transition-all duration-300 hover:bg-black/10 dark:hover:bg-white/20 hover:scale-105 hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] dark:hover:shadow-[0_0_20px_rgba(255,255,255,0.2)]"
          >
            Let's Talk
          </Link>
        </div>
      </div>
    </motion.header>
  );
}
