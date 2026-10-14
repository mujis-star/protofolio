"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

const navLinks = [
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Experience", href: "#experience" },
  { name: "Contact", href: "#contact" },
];

import { Menu, X, Download, Send, Volume2, VolumeX } from "lucide-react";
import { soundManager } from "@/lib/sound";

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setSoundEnabled(soundManager.getStatus());
  }, []);

  const toggleSound = () => {
    const newState = soundManager.toggle();
    setSoundEnabled(newState);
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3 }
    );

    const sections = document.querySelectorAll("section[id]");
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  // Close mobile menu on ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileMenuOpen]);

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    if (pathname !== "/") {
      window.location.href = `/#${targetId}`;
      return;
    }
    const target = document.getElementById(targetId);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  if (pathname === "/admin") return null;

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className={`fixed top-4 sm:top-6 left-0 right-0 mx-auto z-50 w-[95%] max-w-5xl transition-all duration-300 rounded-full border border-white/10 ${
          scrolled || mobileMenuOpen
            ? "bg-black/80 backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.8)]"
            : "bg-black/40 backdrop-blur-md shadow-[0_5px_20px_rgba(0,0,0,0.5)]"
        }`}
      >
        <div className="px-5 sm:px-8 h-14 sm:h-16 flex items-center justify-between relative">
          <Link 
            href="/" 
            className="text-lg sm:text-xl font-bold tracking-widest text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] uppercase focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded"
          >
            MUJEEB<span className="text-cyan-400">.</span>
          </Link>

          {/* Desktop Links */}
          <nav aria-label="Main Navigation" className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
            {navLinks.map((link) => {
              const targetId = link.href.replace("#", "");
              const isActive = activeSection === targetId;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleScrollTo(e, targetId)}
                  className={`text-sm font-medium transition-colors relative py-2 px-1 flex items-center min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:rounded ${
                    isActive ? "text-cyan-400 font-bold" : "text-neutral-300 hover:text-white"
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <motion.div
                      layoutId="active-pill"
                      className="absolute -bottom-1 left-0 right-0 h-[2px] bg-cyan-400 rounded-full shadow-[0_0_8px_rgba(34,211,238,0.8)]"
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Desktop CTAs */}
          <div className="hidden md:flex items-center gap-3">
            <button
              type="button"
              onClick={toggleSound}
              aria-label={soundEnabled ? "Mute interactive audio" : "Enable interactive audio"}
              title={soundEnabled ? "Sound Effects Active (Click to Mute)" : "Enable Mechanical Keystrokes & Audio"}
              className={`inline-flex h-9 items-center justify-center gap-1.5 rounded-full px-3 text-xs font-mono font-bold transition-all duration-300 border ${
                soundEnabled
                  ? "bg-cyan-500/10 border-cyan-400/50 text-cyan-300 shadow-[0_0_10px_rgba(6,182,212,0.3)]"
                  : "bg-white/5 border-white/10 text-neutral-400 hover:text-white hover:bg-white/10"
              }`}
            >
              {soundEnabled ? <Volume2 className="w-3.5 h-3.5 text-cyan-400" /> : <VolumeX className="w-3.5 h-3.5" />}
              <span>{soundEnabled ? "SFX ON" : "SFX"}</span>
            </button>
            <Link
              href="#contact"
              onClick={(e) => handleScrollTo(e, "contact")}
              className="inline-flex h-9 items-center justify-center rounded-full bg-blue-600 px-5 text-xs font-bold text-white transition-all duration-300 hover:bg-blue-500 hover:shadow-[0_0_15px_rgba(59,130,246,0.4)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
            >
              Let's Talk
            </Link>
            <a
              href="/resume.pdf"
              download
              className="inline-flex h-9 items-center justify-center rounded-full border border-white/20 bg-white/5 px-5 text-xs font-bold text-white transition-all duration-300 hover:bg-white/10 hover:border-white/40 hover:shadow-[0_0_15px_rgba(255,255,255,0.2)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              Resume
            </a>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            className="md:hidden flex items-center justify-center w-10 h-10 rounded-full bg-white/10 text-white hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 transition-colors"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-cyan-400" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </motion.header>

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed inset-x-4 top-22 z-40 rounded-3xl bg-[#030712]/95 border border-white/10 backdrop-blur-2xl p-6 shadow-2xl md:hidden"
        >
          <nav aria-label="Mobile Navigation" className="flex flex-col gap-2">
            {navLinks.map((link) => {
              const targetId = link.href.replace("#", "");
              const isActive = activeSection === targetId;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleScrollTo(e, targetId)}
                  className={`px-4 py-3 rounded-xl text-base font-semibold flex items-center justify-between transition-colors ${
                    isActive ? "bg-blue-600/20 text-cyan-400 border border-blue-500/30" : "text-neutral-300 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <span>{link.name}</span>
                  {isActive && <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]" />}
                </a>
              );
            })}
          </nav>

          <div className="flex flex-col gap-3 mt-6 pt-6 border-t border-white/10">
            <Link
              href="#contact"
              onClick={(e) => handleScrollTo(e, "contact")}
              className="w-full h-12 flex items-center justify-center gap-2 rounded-xl bg-blue-600 text-white font-bold text-sm shadow-[0_0_20px_rgba(37,99,235,0.4)]"
            >
              <Send className="w-4 h-4" /> Let's Talk
            </Link>
            <a
              href="/resume.pdf"
              download
              className="w-full h-12 flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 text-white font-bold text-sm hover:bg-white/10"
            >
              <Download className="w-4 h-4" /> Download Resume
            </a>
            <button
              type="button"
              onClick={toggleSound}
              className={`w-full h-11 flex items-center justify-center gap-2 rounded-xl border font-mono text-xs font-bold transition-colors ${
                soundEnabled
                  ? "bg-cyan-500/10 border-cyan-400/50 text-cyan-300"
                  : "bg-white/5 border-white/10 text-neutral-400"
              }`}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4 text-cyan-400" /> : <VolumeX className="w-4 h-4" />}
              <span>{soundEnabled ? "Audio Effects: ON" : "Audio Effects: OFF"}</span>
            </button>
          </div>
        </motion.div>
      )}
    </>
  );
}
