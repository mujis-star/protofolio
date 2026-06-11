"use client";

import { useEffect, useState, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Stars, Float, MeshDistortMaterial, TorusKnot } from "@react-three/drei";
import * as THREE from "three";

function ScrollCamera() {
  useFrame((state) => {
    const scrollY = window.scrollY;
    // Subtle zoom in and out, rather than flying infinitely forward
    state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, 12 + Math.sin(scrollY * 0.001) * 5, 0.05);
    state.camera.rotation.z = THREE.MathUtils.lerp(state.camera.rotation.z, scrollY * 0.0002, 0.05);
  });
  return null;
}

function CyberCore() {
  const mesh1 = useRef<THREE.Mesh>(null);
  const mesh2 = useRef<THREE.Mesh>(null);
  const mat1 = useRef<any>(null);
  const mat2 = useRef<any>(null);
  
  const targetColor1 = new THREE.Color();
  const targetColor2 = new THREE.Color();

  useFrame((state) => {
    const scrollY = window.scrollY;
    const scrollFactor = scrollY * 0.002;

    if (mesh1.current) {
      mesh1.current.rotation.x = state.clock.getElapsedTime() * 0.05 + scrollFactor;
      mesh1.current.rotation.y = state.clock.getElapsedTime() * 0.1 + scrollFactor * 0.5;
      // Keep on screen: oscillate Y and X based on scroll instead of linear movement
      mesh1.current.position.y = THREE.MathUtils.lerp(mesh1.current.position.y, Math.sin(scrollY * 0.0015) * 8, 0.05);
      mesh1.current.position.x = THREE.MathUtils.lerp(mesh1.current.position.x, 10 + Math.cos(scrollY * 0.001) * 4, 0.05);
    }
    
    if (mesh2.current) {
      mesh2.current.rotation.x = -state.clock.getElapsedTime() * 0.08 - scrollFactor;
      mesh2.current.rotation.z = state.clock.getElapsedTime() * 0.12 + scrollFactor * 0.8;
      mesh2.current.position.y = THREE.MathUtils.lerp(mesh2.current.position.y, 5 + Math.cos(scrollY * 0.0015) * 8, 0.05);
      mesh2.current.position.x = THREE.MathUtils.lerp(mesh2.current.position.x, -15 + Math.sin(scrollY * 0.001) * 4, 0.05);
    }

    // Dynamic Color Shifting based on scroll depth
    if (mat1.current) {
      const hue1 = (0.6 + scrollY * 0.0001) % 1; // Starts blueish, shifts across spectrum
      targetColor1.setHSL(hue1, 0.9, 0.6);
      mat1.current.color.lerp(targetColor1, 0.05);
      mat1.current.emissive.lerp(targetColor1, 0.05);
    }

    if (mat2.current) {
      const hue2 = (0.5 + scrollY * 0.00015) % 1; // Starts cyan, shifts slightly faster
      targetColor2.setHSL(hue2, 0.9, 0.5);
      mat2.current.color.lerp(targetColor2, 0.05);
      mat2.current.emissive.lerp(targetColor2, 0.05);
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <TorusKnot ref={mesh1} args={[9, 1.5, 256, 32]} position={[10, 0, -15]}>
        <MeshDistortMaterial
          ref={mat1}
          color="#3b82f6"
          emissive="#8b5cf6"
          emissiveIntensity={0.8}
          wireframe
          distort={0.4}
          speed={2}
          roughness={0.2}
          metalness={1}
        />
      </TorusKnot>

      <TorusKnot ref={mesh2} args={[12, 0.5, 128, 32]} position={[-15, 10, -20]}>
        <MeshDistortMaterial
          ref={mat2}
          color="#06b6d4"
          emissive="#06b6d4"
          emissiveIntensity={0.9}
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
        <ScrollCamera />
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
