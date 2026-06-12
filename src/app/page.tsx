"use client";

import { useState } from "react";
import { LoadingScreen } from "@/components/loading-screen";
import { HeroSection } from "@/components/hero-section";
import { AboutSection } from "@/components/about-section";
import { ServicesSection } from "@/components/services-section";
import { TechStack } from "@/components/tech-stack";
import { ProjectsSection } from "@/components/projects-section";
import { ExperienceSection } from "@/components/experience-section";
import { AchievementsSection } from "@/components/achievements-section";
import { GallerySection } from "@/components/gallery-section";
import { FAQSection } from "@/components/faq-section";
import { ContactSection } from "@/components/contact-section";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "mainEntity": {
      "@type": "Person",
      "name": "Mujeeb",
      "jobTitle": "Creative Developer & Tech Enthusiast",
      "url": "https://mujeeb-portfolio.example.com",
      "sameAs": [
        "https://github.com",
        "https://linkedin.com",
        "https://twitter.com"
      ]
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <LoadingScreen onComplete={() => setIsLoading(false)} />
      
      {/* We keep the content in the DOM but control its opacity/interaction based on loading state */}
      <div
        className={`transition-opacity duration-1000 ${
          isLoading ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <TechStack />
        <AchievementsSection />
        <ProjectsSection />
        <ExperienceSection />
        <GallerySection />
        <FAQSection />
        <ContactSection />
      </div>
    </>
  );
}
