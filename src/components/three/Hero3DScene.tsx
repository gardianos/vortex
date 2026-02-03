"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Preload } from "@react-three/drei";
import * as THREE from "three";

// Pre-generated star positions
const starPositions = new Float32Array([
  -45.2, 28.3, -65.1, 32.8, -15.4, -52.3, -28.6, 42.1, -71.2, 18.4, -33.7,
  -48.5, 41.3, 8.9, -58.4, -12.5, 38.2, -62.1, 35.7, -22.4, -55.3, -8.3, 45.6,
  -68.9, 22.1, 31.8, -49.7, -38.4, -18.9, -61.2, 15.6, -42.3, -53.8, 48.2, 12.7,
  -66.4, -25.8, 35.4, -59.1, 8.7, -28.6, -64.7, -42.1, 22.3, -51.5, 28.9, 18.5,
  -70.2, -15.3, -38.7, -56.8, 38.5, -8.2, -63.6, -32.7, 28.9, -50.4, 12.4, 42.8,
  -67.3, 45.8, -25.1, -54.9, -18.6, 15.3, -71.8, 25.3, 38.7, -48.2, -48.2,
  -12.8, -65.5, 8.5, -45.2, -52.1, 35.2, 28.4, -69.4, -22.8, -32.5, -57.6, 42.6,
  8.3, -62.8, -35.4, 45.8, -49.3, 18.7, -18.4, -66.1, -8.9, 32.6, -53.5, 28.3,
  -42.7, -70.7, -50.2, 20.3, -58.1, 40.8, -10.4, -55.3, -20.6, 35.1, -68.2,
  25.4, -28.7, -52.5,
]);

// Floating Vortex Brand Logo - Silver/White spiral that floats in the air
function FloatingVortexLogo() {
  const groupRef = useRef<THREE.Group>(null);
  const spiral1Ref = useRef<THREE.Points>(null);
  const spiral2Ref = useRef<THREE.Points>(null);
  const glow1Ref = useRef<THREE.Points>(null);
  const glow2Ref = useRef<THREE.Points>(null);

  // First spiral arm (matches logo)
  const spiral1Positions = useMemo(() => {
    const positions: number[] = [];
    const count = 600;

    for (let i = 0; i < count; i++) {
      const t = i / count;
      const angle = t * Math.PI * 1.8 + Math.PI * 0.2;
      const radius = 2.5 - t * 2;
      const thickness = (1 - t * 0.6) * 0.15;

      const offsetX = (((i * 7) % 100) / 100 - 0.5) * thickness;
      const offsetY = (((i * 13) % 100) / 100 - 0.5) * thickness;

      positions.push(
        Math.cos(angle) * radius + offsetX,
        Math.sin(angle) * radius * 0.9 + offsetY,
        (((i * 3) % 100) / 100 - 0.5) * 0.1,
      );
    }
    return new Float32Array(positions);
  }, []);

  // Second spiral arm (opposite)
  const spiral2Positions = useMemo(() => {
    const positions: number[] = [];
    const count = 600;

    for (let i = 0; i < count; i++) {
      const t = i / count;
      const angle = t * Math.PI * 1.8 + Math.PI * 1.2;
      const radius = 2.5 - t * 2;
      const thickness = (1 - t * 0.6) * 0.15;

      const offsetX = (((i * 11) % 100) / 100 - 0.5) * thickness;
      const offsetY = (((i * 17) % 100) / 100 - 0.5) * thickness;

      positions.push(
        Math.cos(angle) * radius + offsetX,
        Math.sin(angle) * radius * 0.9 + offsetY,
        (((i * 5) % 100) / 100 - 0.5) * 0.1,
      );
    }
    return new Float32Array(positions);
  }, []);

  // Glow trails
  const glow1Positions = useMemo(() => {
    const positions: number[] = [];
    const count = 400;

    for (let i = 0; i < count; i++) {
      const t = i / count;
      const angle = t * Math.PI * 1.6 + Math.PI * 0.3;
      const radius = 2.7 - t * 1.8;
      const spread = (1 - t * 0.5) * 0.4;

      positions.push(
        Math.cos(angle) * radius + (((i * 19) % 100) / 100 - 0.5) * spread,
        Math.sin(angle) * radius * 0.9 +
          (((i * 23) % 100) / 100 - 0.5) * spread,
        (((i * 7) % 100) / 100 - 0.5) * 0.2,
      );
    }
    return new Float32Array(positions);
  }, []);

  const glow2Positions = useMemo(() => {
    const positions: number[] = [];
    const count = 400;

    for (let i = 0; i < count; i++) {
      const t = i / count;
      const angle = t * Math.PI * 1.6 + Math.PI * 1.3;
      const radius = 2.7 - t * 1.8;
      const spread = (1 - t * 0.5) * 0.4;

      positions.push(
        Math.cos(angle) * radius + (((i * 29) % 100) / 100 - 0.5) * spread,
        Math.sin(angle) * radius * 0.9 +
          (((i * 31) % 100) / 100 - 0.5) * spread,
        (((i * 11) % 100) / 100 - 0.5) * 0.2,
      );
    }
    return new Float32Array(positions);
  }, []);

  useFrame((state) => {
    const time = state.clock.elapsedTime;

    // Beautiful floating movement
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(time * 0.5) * 0.8 + 1;
      groupRef.current.position.x = Math.sin(time * 0.3) * 0.5;
      groupRef.current.position.z = Math.sin(time * 0.4) * 0.3;
      groupRef.current.rotation.y = time * 0.15;
      groupRef.current.rotation.z = Math.sin(time * 0.25) * 0.1;
      groupRef.current.rotation.x = Math.sin(time * 0.2) * 0.05;
    }

    // Spiral pulsing
    if (spiral1Ref.current) {
      const scale = 1 + Math.sin(time * 1.5) * 0.06;
      spiral1Ref.current.scale.setScalar(scale);
    }

    if (spiral2Ref.current) {
      const scale = 1 + Math.sin(time * 1.5 + 0.5) * 0.06;
      spiral2Ref.current.scale.setScalar(scale);
    }

    if (glow1Ref.current) {
      const mat = glow1Ref.current.material as THREE.PointsMaterial;
      mat.opacity = 0.3 + Math.sin(time * 1.8) * 0.1;
    }

    if (glow2Ref.current) {
      const mat = glow2Ref.current.material as THREE.PointsMaterial;
      mat.opacity = 0.3 + Math.sin(time * 1.8 + 0.3) * 0.1;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, -6]}>
      {/* First spiral - silver/white */}
      <points ref={spiral1Ref}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[spiral1Positions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.1}
          color="#e8e8e8"
          transparent
          opacity={0.95}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Second spiral - silver/white */}
      <points ref={spiral2Ref}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[spiral2Positions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.1}
          color="#e8e8e8"
          transparent
          opacity={0.95}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Glow 1 */}
      <points ref={glow1Ref}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[glow1Positions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.15}
          color="#c0c0c0"
          transparent
          opacity={0.35}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Glow 2 */}
      <points ref={glow2Ref}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[glow2Positions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.15}
          color="#c0c0c0"
          transparent
          opacity={0.35}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
}

// Golden pulsing sphere (the main visual)
function GoldenSphere() {
  const groupRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const innerGlowRef = useRef<THREE.Mesh>(null);
  const midGlowRef = useRef<THREE.Mesh>(null);
  const outerGlowRef = useRef<THREE.Mesh>(null);
  const atmosphereRef = useRef<THREE.Mesh>(null);
  const haloRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const time = state.clock.elapsedTime;

    // Floating movement
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(time * 0.5) * 0.6 - 1.5;
      groupRef.current.position.x = Math.sin(time * 0.3) * 0.4;
      groupRef.current.rotation.y = time * 0.1;
    }

    // Core pulsing
    if (coreRef.current) {
      const basePulse = 1 + Math.sin(time * 2) * 0.12;
      const microPulse = 1 + Math.sin(time * 8) * 0.02;
      coreRef.current.scale.setScalar(basePulse * microPulse);
      coreRef.current.rotation.y = time * 0.5;
    }

    // Glow layers
    if (innerGlowRef.current) {
      const scale = 1.5 + Math.sin(time * 1.8) * 0.25;
      innerGlowRef.current.scale.setScalar(scale);
      const mat = innerGlowRef.current.material as THREE.MeshBasicMaterial;
      mat.opacity = 0.65 + Math.sin(time * 2.5) * 0.12;
    }

    if (midGlowRef.current) {
      const scale = 2.2 + Math.sin(time * 1.2 + 0.5) * 0.35;
      midGlowRef.current.scale.setScalar(scale);
      const mat = midGlowRef.current.material as THREE.MeshBasicMaterial;
      mat.opacity = 0.4 + Math.sin(time * 1.5) * 0.08;
    }

    if (outerGlowRef.current) {
      const scale = 3.2 + Math.sin(time * 0.8) * 0.5;
      outerGlowRef.current.scale.setScalar(scale);
      const mat = outerGlowRef.current.material as THREE.MeshBasicMaterial;
      mat.opacity = 0.22 + Math.sin(time * 1.2 + 1) * 0.06;
    }

    if (atmosphereRef.current) {
      const scale = 4.5 + Math.sin(time * 0.6 + 0.3) * 0.7;
      atmosphereRef.current.scale.setScalar(scale);
      const mat = atmosphereRef.current.material as THREE.MeshBasicMaterial;
      mat.opacity = 0.1 + Math.sin(time * 0.9) * 0.03;
    }

    if (haloRef.current) {
      haloRef.current.rotation.x = Math.PI * 0.4 + Math.sin(time * 0.4) * 0.1;
      haloRef.current.rotation.z = time * 0.2;
      const scale = 1 + Math.sin(time * 1.5) * 0.08;
      haloRef.current.scale.setScalar(scale);
    }
  });

  return (
    <group ref={groupRef} position={[0, -1.5, -10]}>
      {/* Bright golden core */}
      <mesh ref={coreRef}>
        <icosahedronGeometry args={[0.7, 4]} />
        <meshBasicMaterial color="#fff8e7" />
      </mesh>

      {/* Inner hot glow */}
      <mesh ref={innerGlowRef}>
        <sphereGeometry args={[0.7, 64, 64]} />
        <meshBasicMaterial
          color="#ffd93d"
          transparent
          opacity={0.65}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Mid warm glow */}
      <mesh ref={midGlowRef}>
        <sphereGeometry args={[0.7, 64, 64]} />
        <meshBasicMaterial
          color="#ff9f43"
          transparent
          opacity={0.4}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Outer glow */}
      <mesh ref={outerGlowRef}>
        <sphereGeometry args={[0.7, 64, 64]} />
        <meshBasicMaterial
          color="#ff6b35"
          transparent
          opacity={0.22}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Atmosphere */}
      <mesh ref={atmosphereRef}>
        <sphereGeometry args={[0.7, 64, 64]} />
        <meshBasicMaterial
          color="#ff4500"
          transparent
          opacity={0.1}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Orbiting halo */}
      <mesh ref={haloRef}>
        <torusGeometry args={[3.5, 0.06, 16, 128]} />
        <meshBasicMaterial
          color="#ffd700"
          transparent
          opacity={0.45}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  );
}

// Sweeping golden energy arc
function EnergyArc() {
  const arcRef = useRef<THREE.Points>(null);
  const glowRef = useRef<THREE.Points>(null);

  const mainArc = useMemo(() => {
    const positions: number[] = [];
    const count = 1000;

    for (let i = 0; i < count; i++) {
      const t = i / count;
      const angle = t * Math.PI * 2 - Math.PI * 0.3;
      const radius = 9 - t * 5;
      const heightCurve = Math.sin(t * Math.PI) * 2.5 - t * 3.5;

      const thickness = (1 - t * 0.7) * 0.35;
      const offsetX = (((i * 7) % 100) / 100 - 0.5) * thickness;
      const offsetY = (((i * 13) % 100) / 100 - 0.5) * thickness;

      positions.push(
        Math.cos(angle) * radius + offsetX,
        heightCurve + offsetY + 1,
        Math.sin(angle) * radius * 0.5 - 10,
      );
    }
    return new Float32Array(positions);
  }, []);

  const glowArc = useMemo(() => {
    const positions: number[] = [];
    const count = 500;

    for (let i = 0; i < count; i++) {
      const t = i / count;
      const angle = t * Math.PI * 1.8 - Math.PI * 0.2;
      const radius = 10 - t * 4.5;
      const heightCurve = Math.sin(t * Math.PI * 0.9) * 3 - t * 3;

      const spread = (1 - t * 0.5) * 1.2;

      positions.push(
        Math.cos(angle) * radius + (((i * 17) % 100) / 100 - 0.5) * spread,
        heightCurve + (((i * 23) % 100) / 100 - 0.5) * spread + 1.5,
        Math.sin(angle) * radius * 0.4 - 10,
      );
    }
    return new Float32Array(positions);
  }, []);

  useFrame((state) => {
    const time = state.clock.elapsedTime;

    if (arcRef.current) {
      arcRef.current.rotation.y = time * 0.1;
      const mat = arcRef.current.material as THREE.PointsMaterial;
      mat.opacity = 0.9 + Math.sin(time * 2) * 0.05;
    }

    if (glowRef.current) {
      glowRef.current.rotation.y = time * 0.08;
      const mat = glowRef.current.material as THREE.PointsMaterial;
      mat.opacity = 0.4 + Math.sin(time * 1.5 + 1) * 0.12;
    }
  });

  return (
    <group>
      <points ref={arcRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[mainArc, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.09}
          color="#ffb347"
          transparent
          opacity={0.9}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
        />
      </points>

      <points ref={glowRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[glowArc, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.16}
          color="#ff8c00"
          transparent
          opacity={0.45}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
}

// Orbiting particles
function OrbitingParticles() {
  const ref = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const pos: number[] = [];
    const count = 350;

    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const radius = 4.5 + ((i * 7) % 25) / 10;
      const height = (((i * 13) % 100) / 100 - 0.5) * 2.5;

      pos.push(
        Math.cos(angle) * radius,
        height - 1.5,
        Math.sin(angle) * radius - 10,
      );
    }
    return new Float32Array(pos);
  }, []);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.18;
      ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.25) * 0.12;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#ffeaa7"
        transparent
        opacity={0.65}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// Stars
function StarField() {
  const ref = useRef<THREE.Points>(null);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.006;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[starPositions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.55}
        color="#ffffff"
        transparent
        opacity={0.65}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// Floating dust
function FloatingDust() {
  const ref = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const pos: number[] = [];
    for (let i = 0; i < 140; i++) {
      pos.push(((i * 7) % 40) - 20, ((i * 13) % 24) - 12, -((i * 3) % 30) - 5);
    }
    return new Float32Array(pos);
  }, []);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.014;
      ref.current.position.y = Math.sin(state.clock.elapsedTime * 0.18) * 0.25;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        color="#ffcc80"
        transparent
        opacity={0.38}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// Light rays
function LightRays() {
  const ray1Ref = useRef<THREE.Mesh>(null);
  const ray2Ref = useRef<THREE.Mesh>(null);
  const ray3Ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const time = state.clock.elapsedTime;

    if (ray1Ref.current) {
      ray1Ref.current.rotation.z = time * 0.04;
      const mat = ray1Ref.current.material as THREE.MeshBasicMaterial;
      mat.opacity = 0.055 + Math.sin(time * 0.7) * 0.018;
    }

    if (ray2Ref.current) {
      ray2Ref.current.rotation.z = -time * 0.025;
      const mat = ray2Ref.current.material as THREE.MeshBasicMaterial;
      mat.opacity = 0.038 + Math.sin(time * 0.55 + 1) * 0.012;
    }

    if (ray3Ref.current) {
      ray3Ref.current.rotation.z = time * 0.018;
      const mat = ray3Ref.current.material as THREE.MeshBasicMaterial;
      mat.opacity = 0.028 + Math.sin(time * 0.45 + 2) * 0.008;
    }
  });

  return (
    <group position={[0, 0, -18]}>
      <mesh ref={ray1Ref}>
        <planeGeometry args={[55, 55]} />
        <meshBasicMaterial
          color="#ff9500"
          transparent
          opacity={0.055}
          blending={THREE.AdditiveBlending}
          side={THREE.DoubleSide}
        />
      </mesh>

      <mesh ref={ray2Ref} position={[0, 0, -4]}>
        <planeGeometry args={[65, 65]} />
        <meshBasicMaterial
          color="#ffd700"
          transparent
          opacity={0.038}
          blending={THREE.AdditiveBlending}
          side={THREE.DoubleSide}
        />
      </mesh>

      <mesh ref={ray3Ref} position={[0, 0, -8]}>
        <planeGeometry args={[75, 75]} />
        <meshBasicMaterial
          color="#ff6b00"
          transparent
          opacity={0.028}
          blending={THREE.AdditiveBlending}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}

// Scene
function Scene() {
  return (
    <>
      <ambientLight intensity={0.12} color="#ffd700" />

      <LightRays />
      <StarField />

      {/* Floating Vortex Brand Logo */}
      <FloatingVortexLogo />

      {/* Golden sphere below */}
      <GoldenSphere />

      {/* Energy arc */}
      <EnergyArc />

      {/* Orbiting particles */}
      <OrbitingParticles />

      {/* Dust */}
      <FloatingDust />
    </>
  );
}

// Main component
export default function Hero3DScene() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 1, 16], fov: 48 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        dpr={[1, 2]}
      >
        <Scene />
        <Preload all />
      </Canvas>

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, transparent 0%, rgba(0, 0, 0, 0.18) 50%, rgba(0, 0, 0, 0.65) 100%)",
        }}
      />
    </div>
  );
}
