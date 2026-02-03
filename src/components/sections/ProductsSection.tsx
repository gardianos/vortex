"use client";

import { useRef, useMemo } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";

function BuildingIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" style={{ width: 28, height: 28 }}>
      <path
        d="M3 21h18M5 21V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M9 8h1M9 12h1M9 16h1M14 8h1M14 12h1M14 16h1"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" style={{ width: 28, height: 28 }}>
      <circle cx="12" cy="8" r="5" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M20 21a8 8 0 0 0-16 0"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      style={{ width: 16, height: 16 }}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="3"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}

// Animated growing chart bars after "Unsere Produkte"
function AnimatedChartBars() {
  const chartRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: chartRef,
    offset: ["start end", "center center"],
  });

  const bars = [
    { height: 40, delay: 0 },
    { height: 55, delay: 0.05 },
    { height: 45, delay: 0.1 },
    { height: 70, delay: 0.15 },
    { height: 60, delay: 0.2 },
    { height: 85, delay: 0.25 },
    { height: 75, delay: 0.3 },
    { height: 95, delay: 0.35 },
    { height: 80, delay: 0.4 },
    { height: 100, delay: 0.45 },
    { height: 70, delay: 0.5 },
    { height: 90, delay: 0.55 },
    { height: 65, delay: 0.6 },
    { height: 85, delay: 0.65 },
    { height: 75, delay: 0.7 },
    { height: 95, delay: 0.75 },
    { height: 55, delay: 0.8 },
    { height: 80, delay: 0.85 },
    { height: 70, delay: 0.9 },
    { height: 90, delay: 0.95 },
  ];

  return (
    <motion.div
      ref={chartRef}
      style={{
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "space-between",
        gap: 8,
        height: 200,
        marginTop: 48,
        marginBottom: 80,
        width: "100%",
        padding: "0",
      }}
    >
      {bars.map((bar, i) => (
        <motion.div
          key={i}
          initial={{ height: 0, opacity: 0 }}
          whileInView={{ height: `${bar.height}%`, opacity: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{
            duration: 0.8,
            delay: bar.delay,
            type: "spring",
            stiffness: 100,
          }}
          style={{
            flex: 1,
            minWidth: 20,
            borderRadius: "8px 8px 0 0",
            background: `linear-gradient(180deg, 
              ${i === bars.length - 1 ? "#fbbf24" : i >= bars.length - 3 ? "#d97706" : "#b45309"} 0%,
              ${i === bars.length - 1 ? "#f97316" : i >= bars.length - 3 ? "#92400e" : "#78350f"} 100%)`,
            boxShadow:
              i >= bars.length - 3
                ? "0 0 20px rgba(251, 191, 36, 0.3)"
                : "none",
            position: "relative",
          }}
        >
          {/* Glow effect on top bars */}
          {i >= bars.length - 3 && (
            <motion.div
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: 4,
                background:
                  "linear-gradient(90deg, transparent, #fbbf24, transparent)",
                borderRadius: "8px 8px 0 0",
              }}
            />
          )}
        </motion.div>
      ))}
    </motion.div>
  );
}

// Animated line chart with moving data points
function AnimatedLineChart() {
  const points = [20, 35, 25, 50, 40, 65, 55, 80, 70, 95];
  const pathD = points
    .map((p, i) => `${i === 0 ? "M" : "L"} ${i * 11.1}% ${100 - p}%`)
    .join(" ");

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      style={{ position: "relative", height: 120, marginBottom: 16 }}
    >
      <svg style={{ width: "100%", height: "100%", overflow: "visible" }}>
        {/* Grid lines */}
        {[0, 25, 50, 75, 100].map((y) => (
          <motion.line
            key={y}
            x1="0%"
            y1={`${y}%`}
            x2="100%"
            y2={`${y}%`}
            stroke="rgba(180, 83, 9, 0.1)"
            strokeWidth="1"
          />
        ))}

        {/* Animated path */}
        <motion.path
          d={pathD}
          fill="none"
          stroke="url(#goldGradient)"
          strokeWidth="3"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 2, ease: "easeOut" }}
        />

        {/* Gradient fill under line */}
        <motion.path
          d={`${pathD} L 100% 100% L 0% 100% Z`}
          fill="url(#goldFill)"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.3 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 1 }}
        />

        {/* Data points */}
        {points.map((p, i) => (
          <motion.circle
            key={i}
            cx={`${i * 11.1}%`}
            cy={`${100 - p}%`}
            r="4"
            fill="#fbbf24"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.5 + i * 0.1 }}
          />
        ))}

        <defs>
          <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#d97706" />
            <stop offset="50%" stopColor="#fbbf24" />
            <stop offset="100%" stopColor="#f97316" />
          </linearGradient>
          <linearGradient id="goldFill" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#fbbf24" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    </motion.div>
  );
}

interface ProductCardProps {
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  cta: string;
  isPrimary: boolean;
  index: number;
}

function ProductCard({
  title,
  subtitle,
  description,
  features,
  cta,
  isPrimary,
  index,
}: ProductCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 80, rotateX: -15, scale: 0.9 }}
      animate={
        isInView
          ? { opacity: 1, y: 0, rotateX: 0, scale: 1 }
          : { opacity: 0, y: 80, rotateX: -15, scale: 0.9 }
      }
      transition={{
        duration: 1,
        delay: index * 0.3,
        type: "spring",
        stiffness: 60,
      }}
      whileHover={{
        y: -15,
        rotateY: isPrimary ? 2 : -2,
        transition: { duration: 0.4 },
      }}
      style={{
        height: "100%",
        position: "relative",
        perspective: 2000,
        transformStyle: "preserve-3d",
      }}
    >
      <motion.div
        style={{
          height: "100%",
          borderRadius: 24,
          overflow: "hidden",
          background: isPrimary
            ? "linear-gradient(135deg, #1a1508 0%, #0d0b07 100%)"
            : "linear-gradient(135deg, #0f0d0a 0%, #080706 100%)",
          border: isPrimary
            ? "2px solid rgba(251, 191, 36, 0.5)"
            : "1px solid rgba(180, 83, 9, 0.3)",
          position: "relative",
          transformStyle: "preserve-3d",
        }}
        whileHover={{
          borderColor: isPrimary
            ? "rgba(251, 191, 36, 0.8)"
            : "rgba(245, 158, 11, 0.6)",
          boxShadow: isPrimary
            ? "0 30px 100px rgba(251, 191, 36, 0.35)"
            : "0 25px 80px rgba(180, 83, 9, 0.2)",
        }}
      >
        {/* Animated mesh gradient background */}
        <motion.div
          animate={{
            background: [
              `radial-gradient(circle at 20% 30%, rgba(251, 191, 36, 0.15) 0%, transparent 50%)`,
              `radial-gradient(circle at 80% 70%, rgba(249, 115, 22, 0.15) 0%, transparent 50%)`,
              `radial-gradient(circle at 40% 60%, rgba(217, 119, 6, 0.15) 0%, transparent 50%)`,
              `radial-gradient(circle at 20% 30%, rgba(251, 191, 36, 0.15) 0%, transparent 50%)`,
            ],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
          }}
        />

        {/* Floating particles inside card */}
        {isPrimary && (
          <>
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0, opacity: 0 }}
                animate={{
                  scale: [0, 1, 0],
                  opacity: [0, 0.5, 0],
                  x: [0, Math.random() * 100 - 50],
                  y: [0, -Math.random() * 150],
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: i * 0.4,
                }}
                style={{
                  position: "absolute",
                  left: `${20 + Math.random() * 60}%`,
                  top: "80%",
                  width: 4,
                  height: 4,
                  borderRadius: "50%",
                  background: "#fbbf24",
                  boxShadow: "0 0 10px #fbbf24",
                  pointerEvents: "none",
                }}
              />
            ))}
          </>
        )}

        {/* Recommended badge with animation */}
        {isPrimary && (
          <motion.div
            initial={{ scale: 0, rotate: -15, y: -20 }}
            animate={
              isInView
                ? { scale: 1, rotate: 0, y: 0 }
                : { scale: 0, rotate: -15, y: -20 }
            }
            transition={{
              duration: 0.6,
              delay: 0.7,
              type: "spring",
              stiffness: 200,
            }}
            style={{
              position: "absolute",
              top: 20,
              left: "50%",
              transform: "translateX(-50%)",
              zIndex: 30,
              padding: "8px 20px",
              borderRadius: 9999,
              background: "linear-gradient(90deg, #f59e0b, #f97316)",
              color: "#000",
              fontSize: 11,
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              boxShadow: "0 8px 30px rgba(245, 158, 11, 0.4)",
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            <motion.span
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              style={{ fontSize: 12 }}
            >
              ★
            </motion.span>
            Empfohlen
          </motion.div>
        )}

        {/* Animated top border */}
        <motion.div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 3,
            background: isPrimary
              ? "linear-gradient(90deg, transparent, #fbbf24, #f97316, #fbbf24, transparent)"
              : "linear-gradient(90deg, transparent, rgba(180, 83, 9, 0.5), transparent)",
            backgroundSize: "200% 100%",
          }}
          animate={
            isPrimary
              ? {
                  backgroundPosition: ["0% 0%", "200% 0%"],
                  opacity: [0.7, 1, 0.7],
                }
              : {}
          }
          transition={{ duration: 3, repeat: Infinity }}
        />

        <div
          style={{
            position: "relative",
            zIndex: 10,
            padding: isPrimary ? 44 : 36,
            display: "flex",
            flexDirection: "column",
            height: "100%",
          }}
        >
          {/* Icon with 3D effect */}
          <motion.div
            initial={{ scale: 0, rotateY: -180 }}
            animate={
              isInView ? { scale: 1, rotateY: 0 } : { scale: 0, rotateY: -180 }
            }
            transition={{
              duration: 0.8,
              delay: index * 0.3 + 0.4,
              type: "spring",
              stiffness: 100,
            }}
            whileHover={{ scale: 1.1, rotateZ: 5 }}
            style={{
              width: 72,
              height: 72,
              borderRadius: 20,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 28,
              background: isPrimary
                ? "linear-gradient(135deg, rgba(251, 191, 36, 0.3), rgba(234, 88, 12, 0.3))"
                : "rgba(180, 83, 9, 0.25)",
              border: isPrimary
                ? "2px solid rgba(251, 191, 36, 0.5)"
                : "1px solid rgba(180, 83, 9, 0.4)",
              color: isPrimary ? "#fbbf24" : "rgba(245, 158, 11, 0.8)",
              boxShadow: isPrimary
                ? "0 10px 30px rgba(251, 191, 36, 0.3)"
                : "none",
              position: "relative",
            }}
          >
            {isPrimary ? <BuildingIcon /> : <UserIcon />}

            {/* Pulsing ring around icon */}
            <motion.div
              animate={{
                scale: [1, 1.4, 1],
                opacity: [0.5, 0, 0.5],
              }}
              transition={{ duration: 2, repeat: Infinity }}
              style={{
                position: "absolute",
                inset: -8,
                borderRadius: 24,
                border: `2px solid ${isPrimary ? "#fbbf24" : "#d97706"}`,
              }}
            />
          </motion.div>

          {/* Title with gradient animation */}
          <motion.h3
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: 0.6, delay: index * 0.3 + 0.5 }}
            style={{
              fontSize: 28,
              fontWeight: 700,
              marginBottom: 8,
              background: isPrimary
                ? "linear-gradient(90deg, #fff, #fef3c7)"
                : "linear-gradient(90deg, rgba(255,255,255,0.9), rgba(254,243,199,0.6))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            {title}
          </motion.h3>

          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5, delay: index * 0.3 + 0.6 }}
            style={{
              fontSize: 14,
              color: isPrimary ? "#fbbf24" : "rgba(245, 158, 11, 0.7)",
              marginBottom: 20,
              fontWeight: 500,
            }}
          >
            {subtitle}
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5, delay: index * 0.3 + 0.7 }}
            style={{
              color: "rgba(254, 243, 199, 0.5)",
              fontSize: 15,
              lineHeight: 1.8,
              marginBottom: 36,
            }}
          >
            {description}
          </motion.p>

          {/* Features with stagger animation */}
          <ul
            style={{
              listStyle: "none",
              flexGrow: 1,
              padding: 0,
              margin: 0,
              marginBottom: 44,
            }}
          >
            {features.map((feature, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -30 }}
                animate={
                  isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }
                }
                transition={{
                  duration: 0.5,
                  delay: index * 0.3 + 0.6 + i * 0.1,
                  type: "spring",
                  stiffness: 100,
                }}
                whileHover={{ x: 10, transition: { duration: 0.2 } }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                  marginBottom: 16,
                  cursor: "default",
                }}
              >
                <motion.span
                  whileHover={{ scale: 1.3, rotate: 360 }}
                  transition={{ duration: 0.5 }}
                  style={{
                    width: 26,
                    height: 26,
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    background: isPrimary
                      ? "linear-gradient(135deg, rgba(251, 191, 36, 0.25), rgba(249, 115, 22, 0.25))"
                      : "rgba(180, 83, 9, 0.35)",
                    color: isPrimary ? "#fbbf24" : "#d97706",
                    border: isPrimary
                      ? "1px solid rgba(251, 191, 36, 0.4)"
                      : "1px solid rgba(180, 83, 9, 0.5)",
                  }}
                >
                  <CheckIcon />
                </motion.span>
                <span
                  style={{
                    fontSize: 14,
                    color: isPrimary
                      ? "rgba(254, 243, 199, 0.8)"
                      : "rgba(254, 243, 199, 0.6)",
                    fontWeight: 500,
                  }}
                >
                  {feature}
                </span>
              </motion.li>
            ))}
          </ul>

          {/* CTA Button with advanced effects */}
          <motion.button
            whileHover={{
              scale: 1.02,
              y: -3,
              boxShadow: isPrimary
                ? "0 20px 60px rgba(245, 158, 11, 0.5)"
                : "0 15px 40px rgba(180, 83, 9, 0.3)",
            }}
            whileTap={{ scale: 0.98 }}
            style={{
              width: "100%",
              padding: 20,
              borderRadius: 16,
              fontWeight: 700,
              fontSize: 15,
              cursor: "pointer",
              background: isPrimary
                ? "linear-gradient(135deg, #f59e0b, #ea580c)"
                : "transparent",
              color: isPrimary ? "#000" : "#fbbf24",
              boxShadow: isPrimary
                ? "0 12px 45px rgba(245, 158, 11, 0.3)"
                : "none",
              border: isPrimary ? "none" : "2px solid rgba(180, 83, 9, 0.5)",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Button shine effect */}
            <motion.div
              animate={{
                x: ["-100%", "200%"],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatDelay: 1,
              }}
              style={{
                position: "absolute",
                inset: 0,
                background: isPrimary
                  ? "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)"
                  : "linear-gradient(90deg, transparent, rgba(251, 191, 36, 0.1), transparent)",
                transform: "skewX(-20deg)",
              }}
            />
            <span style={{ position: "relative", zIndex: 1 }}>{cta} →</span>
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
}

function AnalyticsChart() {
  const bars = [35, 50, 40, 70, 55, 65, 45, 80, 60, 90, 75];
  return (
    <div
      style={{
        width: "100%",
        height: 112,
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "space-between",
        gap: 6,
        padding: "0 8px",
      }}
    >
      {bars.map((height, i) => (
        <motion.div
          key={i}
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: i * 0.05 }}
          style={{
            flex: 1,
            height: `${height}%`,
            borderRadius: "4px 4px 0 0",
            transformOrigin: "bottom",
            background:
              i === bars.length - 1
                ? "linear-gradient(180deg, #fbbf24, #d97706)"
                : i >= bars.length - 3
                  ? "rgba(217, 119, 6, 0.7)"
                  : "rgba(180, 83, 9, 0.5)",
          }}
        />
      ))}
    </div>
  );
}

export default function ProductsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(titleRef, { once: true, margin: "-100px" });

  const products = [
    {
      id: "b2b",
      title: "B2B Enterprise",
      subtitle: "Für institutionelle Anleger",
      description:
        "Enterprise-grade Lösungen für institutionelle Anleger mit maßgeschneiderten Features und höchster Sicherheit.",
      features: [
        "Echtzeit Portfolio Analytics",
        "Risk Management Suite",
        "Regulatory Compliance & Reporting",
        "White-Label API Integration",
        "Custom Dashboards & Alerts",
        "Dedizierter Account Manager 24/7",
      ],
      cta: "Enterprise Demo anfragen",
      isPrimary: true,
    },
    {
      id: "b2c",
      title: "B2C Platform",
      subtitle: "Für private Anleger",
      description:
        "Intuitive Tools für private Anleger und Vermögensverwalter mit leistungsstarken Features.",
      features: [
        "Smart Portfolio Tracking",
        "AI-powered Trading Insights",
        "Market Sentiment Analysis",
        "Personalisierte Preisalerts",
        "Mobile App (iOS & Android)",
        "Community & Social Features",
      ],
      cta: "Kostenlos starten",
      isPrimary: false,
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="products"
      style={{
        position: "relative",
        width: "100%",
        padding: "0 0 80px 0",
        marginTop: -40,
        overflow: "hidden",
        background:
          "linear-gradient(180deg, #050504 0%, #070605 50%, #040403 100%)",
      }}
    >
      {/* Glow Effects */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
        <div
          style={{
            position: "absolute",
            top: "33%",
            left: -160,
            width: 500,
            height: 500,
            background: "rgba(180, 83, 9, 0.08)",
            borderRadius: "50%",
            filter: "blur(180px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "33%",
            right: -160,
            width: 400,
            height: 400,
            background: "rgba(234, 88, 12, 0.06)",
            borderRadius: "50%",
            filter: "blur(160px)",
          }}
        />
      </div>

      <div
        style={{
          position: "relative",
          zIndex: 10,
          width: "100%",
          maxWidth: 1152,
          margin: "0 auto",
          padding: "0 24px",
          boxSizing: "border-box",
        }}
      >
        {/* Header */}
        <div ref={titleRef} style={{ textAlign: "center", marginBottom: 32 }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "8px 16px",
              borderRadius: 9999,
              background: "rgba(245, 158, 11, 0.1)",
              border: "1px solid rgba(245, 158, 11, 0.2)",
              marginBottom: 32,
            }}
          >
            <motion.span
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "#fbbf24",
              }}
            />
            <span style={{ fontSize: 14, fontWeight: 500, color: "#fbbf24" }}>
              Unsere Produkte
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{
              fontSize: "clamp(36px, 5vw, 60px)",
              fontWeight: 700,
              marginBottom: 24,
            }}
          >
            <span style={{ color: "#fff" }}>Innovative </span>
            <span
              style={{
                background: "linear-gradient(90deg, #fde68a, #fbbf24, #f97316)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Lösungen
            </span>
            <br />
            <span style={{ color: "#fff" }}>für jeden Bedarf</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            style={{
              fontSize: 18,
              color: "rgba(254, 243, 199, 0.4)",
              maxWidth: 672,
              margin: "0 auto",
              lineHeight: 1.6,
            }}
          >
            Wählen Sie die passende Lösung für Ihre Anforderungen – von
            individuellen Anlegern bis zu institutionellen Investoren.
          </motion.p>
        </div>

        {/* Animated Chart Bars */}
        <AnimatedChartBars />

        {/* Product Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
            gap: 40,
            marginBottom: 96,
            maxWidth: 900,
            margin: "0 auto 96px auto",
          }}
        >
          {products.map((product, index) => (
            <ProductCard
              key={product.id}
              title={product.title}
              subtitle={product.subtitle}
              description={product.description}
              features={product.features}
              cta={product.cta}
              isPrimary={product.isPrimary}
              index={index}
            />
          ))}
        </div>

        {/* Analytics Box */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7 }}
          style={{
            borderRadius: 20,
            background: "linear-gradient(90deg, #0d0b08, #0f0c08, #0d0b08)",
            border: "1px solid rgba(180, 83, 9, 0.25)",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: 40,
              padding: 48,
            }}
          >
            <div>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "6px 12px",
                  borderRadius: 9999,
                  background: "rgba(245, 158, 11, 0.1)",
                  border: "1px solid rgba(245, 158, 11, 0.2)",
                  marginBottom: 24,
                }}
              >
                <motion.span
                  animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: "#4ade80",
                  }}
                />
                <span
                  style={{
                    fontSize: 12,
                    fontWeight: 500,
                    color: "#fbbf24",
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                  }}
                >
                  Real-Time
                </span>
              </div>
              <h3
                style={{
                  fontSize: "clamp(24px, 3vw, 32px)",
                  fontWeight: 700,
                  color: "#fff",
                  marginBottom: 16,
                }}
              >
                Real-Time Analytics
              </h3>
              <p
                style={{
                  color: "rgba(254, 243, 199, 0.4)",
                  lineHeight: 1.7,
                  marginBottom: 32,
                }}
              >
                Verfolgen Sie Marktbewegungen in Echtzeit mit unserer
                fortschrittlichen Analytics-Engine. Erhalten Sie sofortige
                Einblicke in Kryptomärkte.
              </p>
              <div style={{ display: "flex", gap: 40, flexWrap: "wrap" }}>
                {[
                  { value: "< 50ms", label: "Latenz" },
                  { value: "10K+", label: "Assets" },
                  { value: "99.9%", label: "Uptime" },
                ].map((stat, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <div
                      style={{
                        fontSize: 22,
                        fontWeight: 700,
                        color: "#fbbf24",
                      }}
                    >
                      {stat.value}
                    </div>
                    <div
                      style={{
                        fontSize: 12,
                        color: "rgba(254, 243, 199, 0.4)",
                        textTransform: "uppercase",
                        letterSpacing: "0.1em",
                      }}
                    >
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div style={{ position: "relative" }}>
              <div
                style={{
                  padding: 24,
                  borderRadius: 16,
                  background: "#0a0907",
                  border: "1px solid rgba(180, 83, 9, 0.2)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: 20,
                  }}
                >
                  <div>
                    <span style={{ color: "#fff", fontWeight: 600 }}>
                      BTC/USD
                    </span>
                    <span
                      style={{ color: "#d97706", fontSize: 14, marginLeft: 8 }}
                    >
                      Bitcoin
                    </span>
                  </div>
                  <motion.span
                    animate={{ opacity: [1, 0.5, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                    style={{ color: "#4ade80", fontSize: 14, fontWeight: 600 }}
                  >
                    +12.5%
                  </motion.span>
                </div>
                <AnalyticsChart />
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: 16,
                    fontSize: 12,
                    color: "rgba(254, 243, 199, 0.3)",
                  }}
                >
                  {["1W", "1M", "3M", "1Y", "ALL"].map((period, i) => (
                    <span
                      key={period}
                      style={
                        i === 4 ? { color: "#fbbf24", fontWeight: 500 } : {}
                      }
                    >
                      {period}
                    </span>
                  ))}
                </div>
              </div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                style={{
                  position: "absolute",
                  top: -12,
                  right: -12,
                  padding: "10px 14px",
                  borderRadius: 10,
                  background: "rgba(74, 222, 128, 0.1)",
                  border: "1px solid rgba(74, 222, 128, 0.3)",
                  color: "#4ade80",
                  fontSize: 12,
                  fontWeight: 600,
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                }}
              >
                <motion.span
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: "#4ade80",
                  }}
                />
                Buy Signal
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
