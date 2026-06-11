"use client";

import { useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { Engine } from "@tsparticles/engine";

export function AnimatedBackground() {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine: Engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  if (!init) return <div className="fixed inset-0 z-[-2] bg-[#030712]" />;

  return (
    <div className="fixed inset-0 z-[-2] pointer-events-none bg-[#030712]">
      <Particles
        id="tsparticles"
        className="absolute inset-0"
        options={{
          background: { color: { value: "transparent" } },
          fpsLimit: 120,
          interactivity: {
            events: {
              onHover: { enable: true, mode: "repulse" },
            },
            modes: {
              repulse: { distance: 150, duration: 0.4 },
            },
          },
          particles: {
            color: { value: ["#3b82f6", "#8b5cf6", "#06b6d4", "#e879f9"] },
            move: {
              direction: "none",
              enable: true,
              outModes: { default: "bounce" },
              random: true,
              speed: 4,
              straight: false,
              trail: {
                enable: true,
                length: 10,
                fill: { color: "#030712" }
              }
            },
            number: {
              density: { enable: true, width: 800, height: 800 },
              value: 120,
            },
            opacity: {
              value: 0.8,
              animation: { enable: true, speed: 1, minimumValue: 0.1 }
            },
            shape: { type: "circle" },
            size: {
              value: { min: 2, max: 6 },
              animation: { enable: true, speed: 2, minimumValue: 1 }
            },
          },
          detectRetina: true,
        }}
      />
      {/* Intense Glowing Overlay for Gaming Vibe */}
      <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/20 via-transparent to-purple-900/20 mix-blend-screen pointer-events-none" />
    </div>
  );
}
