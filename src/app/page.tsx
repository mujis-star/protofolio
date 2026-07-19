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
import { GitHubActivity } from "@/components/github-activity";
import { ProcessSection } from "@/components/process-section";
import { Testimonials } from "@/components/testimonials";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "mainEntity": {
      "@type": "Person",
      "name": "Mujeeb P",
      "jobTitle": "Frontend Developer & Creative UI Engineer",
      "url": "https://mujeeb-portfolio.vercel.app",
      "sameAs": [
        "https://github.com/mujis-star",
        "https://linkedin.com"
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
        <ProcessSection />
        <AchievementsSection />
        <ProjectsSection />
        <ExperienceSection />
        <GitHubActivity />
        <Testimonials />
        <GallerySection />
        <FAQSection />
        <ContactSection />
      </div>
    </>
  );
}
