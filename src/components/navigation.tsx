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
      initial={{ y: -100, x: "-50%", opacity: 0 }}
      animate={{ y: 0, x: "-50%", opacity: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className={`fixed top-6 left-1/2 z-50 w-[95%] max-w-5xl transition-all duration-300 rounded-full border border-white/10 ${
        scrolled
          ? "bg-[#030712]/90 backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.8)]"
          : "bg-[#030712]/60 backdrop-blur-md shadow-[0_5px_20px_rgba(0,0,0,0.5)]"
      }`}
    >
      <div className="px-6 md:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold tracking-widest text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] uppercase">
          MUJEEB
        </Link>

        <nav className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-white/70 hover:text-white transition-all duration-300 hover:drop-shadow-[0_0_15px_rgba(255,255,255,0.8)] tracking-wide"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <Link
            href="#contact"
            className="hidden md:inline-flex h-9 items-center justify-center rounded-full border border-white/20 bg-white/5 px-6 text-sm font-medium text-white transition-all duration-300 hover:bg-white/10 hover:border-white/40 hover:shadow-[0_0_15px_rgba(255,255,255,0.2)]"
          >
            Let's Talk
          </Link>
        </div>
      </div>
    </motion.header>
  );
}
