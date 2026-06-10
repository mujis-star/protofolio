"use client";

import { useState } from "react";
import { LoadingScreen } from "@/components/loading-screen";
import { HeroSection } from "@/components/hero-section";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      <LoadingScreen onComplete={() => setIsLoading(false)} />
      
      {/* We keep the content in the DOM but control its opacity/interaction based on loading state */}
      <div
        className={`transition-opacity duration-1000 ${
          isLoading ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
        <HeroSection />
        
        {/* Placeholder for future sections */}
        <div className="h-[100vh] flex items-center justify-center border-t border-neutral-200 dark:border-neutral-800">
          <p className="text-neutral-500">More sections coming soon...</p>
        </div>
      </div>
    </>
  );
}
