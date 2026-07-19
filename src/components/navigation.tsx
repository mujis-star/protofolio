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

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const pathname = usePathname();

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

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
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
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className={`fixed top-6 left-0 right-0 mx-auto z-50 w-[95%] max-w-5xl transition-all duration-300 rounded-full border border-white/10 ${
        scrolled
          ? "bg-black/40 backdrop-blur-lg shadow-[0_10px_30px_rgba(0,0,0,0.8)]"
          : "bg-black/20 backdrop-blur-md shadow-[0_5px_20px_rgba(0,0,0,0.5)]"
      }`}
    >
      <div className="px-6 md:px-8 h-16 flex items-center justify-between relative">
        <Link href="/" className="text-xl font-bold tracking-widest text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] uppercase">
          MUJEEB
        </Link>

        <nav className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
          {navLinks.map((link) => {
            const targetId = link.href.replace("#", "");
            const isActive = activeSection === targetId;
            return (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleScrollTo(e, targetId)}
                className={`text-sm font-medium transition-colors relative py-1 ${
                  isActive ? "text-blue-400 font-bold" : "text-neutral-300 hover:text-white"
                }`}
              >
                {link.name}
                {isActive && (
                  <motion.div
                    layoutId="active-pill"
                    className="absolute -bottom-1 left-0 right-0 h-[2px] bg-blue-500 rounded-full shadow-[0_0_8px_rgba(59,130,246,0.8)]"
                  />
                )}
              </a>
            );
          })}
        </nav>

        <div className="flex items-center gap-4">
          <Link
            href="#contact"
            onClick={(e) => handleScrollTo(e, "contact")}
            className="hidden md:inline-flex h-9 items-center justify-center rounded-full bg-blue-600 px-6 text-sm font-bold text-white transition-all duration-300 hover:bg-blue-500 hover:shadow-[0_0_15px_rgba(59,130,246,0.4)]"
          >
            Let's Talk
          </Link>
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex h-9 items-center justify-center rounded-full border border-white/20 bg-white/5 px-6 text-sm font-bold text-white transition-all duration-300 hover:bg-white/10 hover:border-white/40 hover:shadow-[0_0_15px_rgba(255,255,255,0.2)]"
          >
            Resume
          </a>
        </div>
      </div>
    </motion.header>
  );
}
