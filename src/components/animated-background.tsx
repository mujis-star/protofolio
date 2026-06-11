"use client";

import { useEffect, useState, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Stars, Float, MeshDistortMaterial, TorusKnot } from "@react-three/drei";
import * as THREE from "three";

function CyberCore() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.05;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.1;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <TorusKnot ref={meshRef} args={[9, 1.5, 256, 32]} position={[10, 0, -15]}>
        <MeshDistortMaterial
          color="#3b82f6"
          emissive="#8b5cf6"
          emissiveIntensity={0.5}
          wireframe
          distort={0.4}
          speed={2}
          roughness={0.2}
          metalness={1}
        />
      </TorusKnot>

      <TorusKnot args={[12, 0.5, 128, 32]} position={[-15, 10, -20]}>
        <MeshDistortMaterial
          color="#06b6d4"
          emissive="#06b6d4"
          emissiveIntensity={0.8}
          wireframe
          distort={0.2}
          speed={1.5}
        />
      </TorusKnot>
    </Float>
  );
}

export function AnimatedBackground() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="fixed inset-0 z-[-2] bg-[#030712]" />;

  return (
    <div className="fixed inset-0 z-[-2] pointer-events-none bg-[#030712]">
      <Canvas camera={{ position: [0, 0, 10], fov: 60 }} dpr={[1, 2]}>
        <ambientLight intensity={0.2} />
        <directionalLight position={[10, 10, 5]} intensity={2} color="#e879f9" />
        <directionalLight position={[-10, -10, -5]} intensity={2} color="#06b6d4" />
        
        <CyberCore />
        <Stars radius={100} depth={50} count={3000} factor={4} saturation={1} fade speed={2} />
      </Canvas>
      
      {/* Intense Glowing Overlay for Gaming Vibe */}
      <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/20 via-transparent to-purple-900/20 mix-blend-screen pointer-events-none" />
      {/* Dark Vignette to keep text readable */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#030712_100%)] pointer-events-none opacity-80" />
    </div>
  );
}
