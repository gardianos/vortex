"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import dynamic from "next/dynamic";

const Hero3DScene = dynamic(() => import("@/components/three/Hero3DScene"), {
  ssr: false,
  loading: () => (
    <div style={{ position: "absolute", inset: 0, background: "#0c0a15" }} />
  ),
});

// Animated letter component for VORTEX
function AnimatedLetter({ letter, index }: { letter: string; index: number }) {
  return (
    <motion.span
      initial={{ opacity: 0, y: 100, rotateX: -90 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{
        duration: 0.8,
        delay: 0.5 + index * 0.1,
        type: "spring",
        stiffness: 100,
      }}
      style={{
        display: "inline-block",
        position: "relative",
      }}
    >
      <motion.span
        animate={{
          textShadow: [
            "0 0 20px rgba(251, 191, 36, 0.5)",
            "0 0 60px rgba(251, 191, 36, 0.8)",
            "0 0 20px rgba(251, 191, 36, 0.5)",
          ],
        }}
        transition={{
          duration: 2,
          delay: index * 0.2,
          repeat: Infinity,
          repeatType: "reverse",
        }}
        style={{
          background: "linear-gradient(180deg, #fef3c7, #fbbf24, #d97706)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}
      >
        {letter}
      </motion.span>
    </motion.span>
  );
}

// Generate particles once at module level, not during render
const PARTICLES = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  size: Math.random() * 4 + 2,
  x: Math.random() * 100,
  delay: Math.random() * 3,
  duration: Math.random() * 3 + 2,
  xMove: Math.random() * 40 - 20,
  repeatDelay: Math.random() * 2,
}));

// Floating particles around VORTEX text
function FloatingParticles() {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        pointerEvents: "none",
      }}
    >
      {PARTICLES.map((p) => (
        <motion.div
          key={p.id}
          initial={{ opacity: 0, y: 50 }}
          animate={{
            opacity: [0, 1, 0],
            y: [-20, -100],
            x: [0, p.xMove],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            repeatDelay: p.repeatDelay,
          }}
          style={{
            position: "absolute",
            left: `${p.x}%`,
            bottom: 0,
            width: p.size,
            height: p.size,
            borderRadius: "50%",
            background: "linear-gradient(135deg, #fbbf24, #f97316)",
            boxShadow: "0 0 10px rgba(251, 191, 36, 0.5)",
          }}
        />
      ))}
    </div>
  );
}

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const vortexText = "VORTEX".split("");

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 80]);

  const scrollToSection = (id: string) => {
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="hero"
      style={{
        position: "relative",
        minHeight: "100vh",
        width: "100%",
        overflow: "hidden",
        background:
          "linear-gradient(180deg, #030305 0%, #0a0810 50%, #030305 100%)",
      }}
    >
      {/* Golden glow effects */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at 50% 30%, rgba(255,170,0,0.12) 0%, transparent 50%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at 50% 60%, rgba(255,140,0,0.08) 0%, transparent 40%)",
        }}
      />

      {/* 3D Scene */}
      <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
        <Hero3DScene />
      </div>

      {/* Bottom content */}
      <motion.div
        style={{
          opacity,
          y,
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 10,
          paddingBottom: 48,
        }}
      >
        <div style={{ maxWidth: 1024, margin: "0 auto", padding: "0 24px" }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            style={{ textAlign: "center" }}
          >
            {/* Gold Logo */}
            <div style={{ position: "relative", marginBottom: 24 }}>
              <FloatingParticles />
              <motion.div
                initial={{ opacity: 0, y: 100, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{
                  duration: 1.2,
                  delay: 0.5,
                  type: "spring",
                  stiffness: 80,
                }}
                style={{
                  position: "relative",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <motion.img
                  src="/logo-nav.svg"
                  alt="VORTEX"
                  animate={{
                    filter: [
                      "drop-shadow(0 0 20px rgba(251, 191, 36, 0.5))",
                      "drop-shadow(0 0 60px rgba(251, 191, 36, 0.8))",
                      "drop-shadow(0 0 20px rgba(251, 191, 36, 0.5))",
                    ],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                  style={{
                    width: "clamp(300px, 60vw, 700px)",
                    height: "auto",
                  }}
                />
              </motion.div>

              {/* Glowing underline */}
              <motion.div
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 1 }}
                transition={{ duration: 1, delay: 1.2 }}
                style={{
                  height: 3,
                  background:
                    "linear-gradient(90deg, transparent, #fbbf24, #f97316, #fbbf24, transparent)",
                  marginTop: 16,
                  borderRadius: 2,
                }}
              />
            </div>

            {/* Main headline - moved down */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.5 }}
              style={{
                fontSize: "clamp(28px, 4vw, 48px)",
                fontWeight: 600,
                marginBottom: 40,
                marginTop: 32,
                letterSpacing: "-0.01em",
              }}
            >
              <span
                style={{
                  background:
                    "linear-gradient(90deg, #fde68a, #fcd34d, #fb923c)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Intelligence{" "}
              </span>
              <span style={{ color: "#fff" }}>Empowers Capital</span>
            </motion.h1>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.8 }}
              style={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                justifyContent: "center",
                gap: 16,
              }}
            >
              <motion.button
                onClick={() => scrollToSection("#about")}
                style={{
                  padding: "16px 40px",
                  borderRadius: 12,
                  border: "none",
                  cursor: "pointer",
                  background: "linear-gradient(90deg, #f59e0b, #ea580c)",
                  color: "#000",
                  fontWeight: 600,
                  fontSize: 18,
                  boxShadow: "0 10px 40px rgba(251,191,36,0.3)",
                }}
                whileHover={{
                  scale: 1.03,
                  boxShadow: "0 15px 50px rgba(251,191,36,0.5)",
                }}
                whileTap={{ scale: 0.97 }}
              >
                Mehr erfahren
              </motion.button>

              <motion.button
                onClick={() => scrollToSection("#contact")}
                style={{
                  padding: "16px 40px",
                  borderRadius: 12,
                  cursor: "pointer",
                  background: "transparent",
                  color: "#fcd34d",
                  fontWeight: 600,
                  fontSize: 18,
                  border: "2px solid rgba(245, 158, 11, 0.4)",
                }}
                whileHover={{
                  scale: 1.03,
                  borderColor: "rgba(245, 158, 11, 0.8)",
                }}
                whileTap={{ scale: 0.97 }}
              >
                Kontakt
              </motion.button>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5 }}
          style={{ display: "flex", justifyContent: "center", marginTop: 40 }}
        >
          <motion.button
            onClick={() => scrollToSection("#about")}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 8,
              color: "rgba(251, 191, 36, 0.4)",
              background: "transparent",
              border: "none",
              cursor: "pointer",
            }}
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <span
              style={{
                fontSize: 11,
                textTransform: "uppercase",
                letterSpacing: "0.2em",
              }}
            >
              Scroll
            </span>
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M12 5v14M5 12l7 7 7-7" />
            </svg>
          </motion.button>
        </motion.div>
      </motion.div>
    </section>
  );
}
