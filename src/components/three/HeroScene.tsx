"use client";

import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Environment } from "@react-three/drei";
import type { Mesh } from "three";

/**
 * Element 3D subtil pentru hero: o formă geometrică abstractă, distorsionată
 * lent, în tonul accentului bronz. Rămâne discretă și performantă
 * (dpr capat, un singur mesh).
 */
function AbstractForm() {
  const ref = useRef<Mesh>(null);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.getElapsedTime();
    ref.current.rotation.x = t * 0.08;
    ref.current.rotation.y = t * 0.12;
    // Reacție subtilă la poziția mouse-ului.
    ref.current.position.x = state.pointer.x * 0.3;
    ref.current.position.y = state.pointer.y * 0.2;
  });

  return (
    <Float speed={1.4} rotationIntensity={0.6} floatIntensity={1.2}>
      <mesh ref={ref} scale={2.1}>
        <icosahedronGeometry args={[1, 12]} />
        <MeshDistortMaterial
          color="#B8956A"
          roughness={0.15}
          metalness={0.9}
          distort={0.38}
          speed={1.4}
          emissive="#5a4326"
          emissiveIntensity={0.25}
        />
      </mesh>
    </Float>
  );
}

export default function HeroScene() {
  return (
    <Canvas
      dpr={[1, 1.6]}
      camera={{ position: [0, 0, 6], fov: 38 }}
      gl={{ antialias: true, alpha: true }}
      className="!absolute inset-0"
    >
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={2.2} />
      <directionalLight position={[-5, -2, -3]} intensity={0.6} color="#B8956A" />
      <Suspense fallback={null}>
        <AbstractForm />
        <Environment preset="city" />
      </Suspense>
    </Canvas>
  );
}
