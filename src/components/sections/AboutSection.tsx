"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";

const COINS = [
  { id: 1, size: 60, delay: 0, yOffset: 0 },
  { id: 2, size: 45, delay: 1.5, yOffset: -20 },
  { id: 3, size: 75, delay: 3, yOffset: 10 },
  { id: 4, size: 50, delay: 4.5, yOffset: -15 },
  { id: 5, size: 85, delay: 6, yOffset: 20 },
  { id: 6, size: 55, delay: 7.5, yOffset: -10 },
  { id: 7, size: 70, delay: 9, yOffset: 15 },
  { id: 8, size: 40, delay: 10.5, yOffset: -25 },
  { id: 9, size: 65, delay: 12, yOffset: 5 },
  { id: 10, size: 80, delay: 13.2, yOffset: -5 },
  { id: 11, size: 50, delay: 2.2, yOffset: 25 },
  { id: 12, size: 35, delay: 8.5, yOffset: -30 },
];

// Icons
function RocketIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" style={{ width: 24, height: 24 }}>
      <path
        d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function UsersIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" style={{ width: 24, height: 24 }}>
      <path
        d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function TargetIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" style={{ width: 24, height: 24 }}>
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="12" cy="12" r="6" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="12" cy="12" r="2" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

const iconComponents = {
  rocket: RocketIcon,
  users: UsersIcon,
  target: TargetIcon,
};

interface CardProps {
  title: string;
  description: string;
  icon: keyof typeof iconComponents;
  index: number;
}

function AboutCard({ title, description, icon, index }: CardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-50px" });
  const IconComponent = iconComponents[icon];

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      style={{ height: "100%" }}
    >
      <div
        style={{
          height: "100%",
          backgroundColor: "#0f0d0a",
          borderRadius: 16,
          border: "1px solid rgba(180, 83, 9, 0.3)",
          padding: 32,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: 56,
            height: 56,
            marginBottom: 24,
            borderRadius: 12,
            background:
              "linear-gradient(135deg, rgba(245, 158, 11, 0.2), rgba(234, 88, 12, 0.2))",
            border: "1px solid rgba(245, 158, 11, 0.3)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#fbbf24",
          }}
        >
          <IconComponent />
        </div>
        <h3
          style={{
            fontSize: 20,
            fontWeight: 600,
            color: "#fff",
            marginBottom: 12,
          }}
        >
          {title}
        </h3>
        <p
          style={{
            color: "rgba(254, 243, 199, 0.4)",
            lineHeight: 1.7,
            fontSize: 15,
          }}
        >
          {description}
        </p>
      </div>
    </motion.div>
  );
}

function StatItem({
  value,
  label,
  delay,
}: {
  value: string;
  label: string;
  delay: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.5, delay }}
      style={{ textAlign: "center", padding: "0 16px" }}
    >
      <div
        style={{
          fontSize: "clamp(24px, 4vw, 36px)",
          fontWeight: 700,
          color: "#fbbf24",
          marginBottom: 4,
        }}
      >
        {value}
      </div>
      <div
        style={{
          fontSize: 12,
          color: "rgba(254, 243, 199, 0.4)",
          textTransform: "uppercase",
          letterSpacing: "0.1em",
        }}
      >
        {label}
      </div>
    </motion.div>
  );
}

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(titleRef, { once: true, margin: "-100px" });
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -50]);

  const aboutContent = [
    {
      id: "what-we-do",
      title: "Was tun wir",
      description:
        "Wir entwickeln innovative SaaS-Lösungen, die künstliche Intelligenz und Big Data kombinieren, um Investmentprozesse zu revolutionieren.",
      icon: "rocket" as const,
    },
    {
      id: "who-we-are",
      title: "Wer sind wir",
      description:
        "Ein Team aus erfahrenen Finanzexperten, Data Scientists und Software-Ingenieuren mit tiefem Marktverständnis.",
      icon: "users" as const,
    },
    {
      id: "our-goal",
      title: "Unser Ziel",
      description:
        "Die Demokratisierung von Finanzintelligenz. Wir machen fortschrittliche Analysetools zugänglich für alle.",
      icon: "target" as const,
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="about"
      style={{
        position: "relative",
        width: "100%",
        padding: "160px 0",
        overflow: "hidden",
        background:
          "linear-gradient(180deg, #030303 0%, #080705 50%, #050504 100%)",
      }}
    >
      <motion.div
        style={{
          y: backgroundY,
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "25%",
            left: "25%",
            width: 600,
            height: 600,
            background: "rgba(180, 83, 9, 0.1)",
            borderRadius: "50%",
            filter: "blur(200px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "25%",
            right: "25%",
            width: 500,
            height: 500,
            background: "rgba(234, 88, 12, 0.08)",
            borderRadius: "50%",
            filter: "blur(180px)",
          }}
        />
      </motion.div>

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
        <div ref={titleRef} style={{ textAlign: "center", marginBottom: 96 }}>
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
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "#fbbf24",
              }}
            />
            <span style={{ fontSize: 14, fontWeight: 500, color: "#fbbf24" }}>
              Über Uns
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
            <span
              style={{
                background: "linear-gradient(90deg, #fde68a, #fbbf24, #f97316)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Intelligence
            </span>{" "}
            <span style={{ color: "#fff" }}>Empowers Capital</span>
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
            Wir transformieren die Art und Weise, wie Investoren Entscheidungen
            treffen, durch die Kraft von KI und Datenanalyse.
          </motion.p>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "clamp(16px, 4vw, 64px)",
            marginBottom: 96,
            padding: "32px 0",
            borderTop: "1px solid rgba(180, 83, 9, 0.2)",
            borderBottom: "1px solid rgba(180, 83, 9, 0.2)",
            flexWrap: "wrap",
          }}
        >
          <StatItem value="10K+" label="Nutzer" delay={0} />
          <div
            style={{
              width: 1,
              height: 48,
              background: "rgba(180, 83, 9, 0.3)",
            }}
          />
          <StatItem value="€50M+" label="Analysiert" delay={0.1} />
          <div
            style={{
              width: 1,
              height: 48,
              background: "rgba(180, 83, 9, 0.3)",
            }}
          />
          <StatItem value="99.9%" label="Uptime" delay={0.2} />
          <div
            style={{
              width: 1,
              height: 48,
              background: "rgba(180, 83, 9, 0.3)",
            }}
          />
          <StatItem value="24/7" label="Support" delay={0.3} />
        </motion.div>

        {/* Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 32,
            marginBottom: 96,
          }}
        >
          {aboutContent.map((item, index) => (
            <AboutCard
              key={item.id}
              title={item.title}
              description={item.description}
              icon={item.icon}
              index={index}
            />
          ))}
        </div>

        {/* Team CTA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 32,
            padding: 40,
            borderRadius: 16,
            background:
              "linear-gradient(90deg, rgba(120, 53, 15, 0.2), #0c0a07, rgba(120, 53, 15, 0.2))",
            border: "1px solid rgba(180, 83, 9, 0.2)",
            position: "relative",
            overflow: "visible",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
            <div style={{ display: "flex" }}>
              {["A", "B", "C"].map((letter, i) => (
                <motion.div
                  key={letter}
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, #d97706, #c2410c)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#fff",
                    fontWeight: 500,
                    fontSize: 13,
                    border: "2px solid #0c0a07",
                    marginLeft: i === 0 ? 0 : -10,
                  }}
                >
                  {letter}
                </motion.div>
              ))}
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.3 }}
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  background: "rgba(180, 83, 9, 0.4)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#fbbf24",
                  fontSize: 11,
                  fontWeight: 500,
                  border: "2px solid #0c0a07",
                  marginLeft: -10,
                }}
              >
                +13
              </motion.div>
            </div>
            <div>
              <p style={{ color: "#fff", fontWeight: 500, margin: 0 }}>
                Unser Team
              </p>
              <p
                style={{
                  color: "rgba(254, 243, 199, 0.4)",
                  fontSize: 14,
                  margin: 0,
                }}
              >
                16+ Experten aus Finance & Tech
              </p>
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            style={{
              padding: "14px 28px",
              borderRadius: 12,
              background: "linear-gradient(90deg, #f59e0b, #ea580c)",
              color: "#000",
              fontWeight: 600,
              fontSize: 14,
              border: "none",
              cursor: "pointer",
              boxShadow: "0 10px 40px rgba(217, 119, 6, 0.2)",
            }}
          >
            Team kennenlernen →
          </motion.button>
        </motion.div>

        {/* Floating Coins */}
        <div
          style={{
            position: "relative",
            width: "100%",
            height: 120,
            marginTop: 20,
            overflow: "visible",
          }}
        >
          {COINS.map((coin) => (
            <motion.div
              key={coin.id}
              initial={{
                offsetDistance: "0%",
                scale: 0,
                opacity: 0,
              }}
              animate={{
                offsetDistance: ["0%", "100%"],
                scale: [0, 1, 1, 1, 0],
                opacity: [0, 0.8, 1, 0.8, 0],
                rotateY: [0, 720],
                rotateZ: [0, 180],
              }}
              transition={{
                duration: 20,
                delay: coin.delay,
                repeat: Infinity,
                ease: "linear",
              }}
              style={{
                position: "absolute",
                width: coin.size,
                height: coin.size,
                borderRadius: "50%",
                offsetPath: `path('M -200 ${90 + coin.yOffset} Q 200 ${60 + coin.yOffset}, 400 ${90 + coin.yOffset} T 800 ${90 + coin.yOffset} Q 1000 ${60 + coin.yOffset}, 1200 ${90 + coin.yOffset} T 1800 ${90 + coin.yOffset}')`,
                background:
                  "radial-gradient(circle at 30% 30%, #fde68a, #fbbf24, #d97706)",
                boxShadow:
                  "0 0 30px rgba(251, 191, 36, 0.5), inset -5px -5px 20px rgba(0, 0, 0, 0.4), inset 5px 5px 20px rgba(255, 255, 255, 0.3)",
                border: "3px solid rgba(251, 191, 36, 0.8)",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  fontSize: coin.size * 0.4,
                  fontWeight: 700,
                  color: "rgba(217, 119, 6, 0.8)",
                  textShadow: "0 2px 10px rgba(0, 0, 0, 0.3)",
                }}
              >
                V
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
