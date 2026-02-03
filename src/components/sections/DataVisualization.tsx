"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

// Currency coins with symbols
const CURRENCY_COINS = [
  { id: 1, symbol: "₿", size: 60, delay: 0, yOffset: 0, color: "#f7931a" },
  { id: 2, symbol: "Ξ", size: 45, delay: 1.5, yOffset: -20, color: "#627eea" },
  { id: 3, symbol: "$", size: 75, delay: 3, yOffset: 10, color: "#85bb65" },
  { id: 4, symbol: "€", size: 50, delay: 4.5, yOffset: -15, color: "#003399" },
  { id: 5, symbol: "₣", size: 85, delay: 6, yOffset: 20, color: "#ff0000" },
  { id: 6, symbol: "₿", size: 55, delay: 7.5, yOffset: -10, color: "#f7931a" },
  { id: 7, symbol: "$", size: 70, delay: 9, yOffset: 15, color: "#85bb65" },
  { id: 8, symbol: "Ξ", size: 40, delay: 10.5, yOffset: -25, color: "#627eea" },
  { id: 9, symbol: "€", size: 65, delay: 12, yOffset: 5, color: "#003399" },
  { id: 10, symbol: "₣", size: 80, delay: 13.2, yOffset: -5, color: "#ff0000" },
  { id: 11, symbol: "₿", size: 50, delay: 2.2, yOffset: 25, color: "#f7931a" },
  { id: 12, symbol: "$", size: 35, delay: 8.5, yOffset: -30, color: "#85bb65" },
];

export default function DataVisualization() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      ref={sectionRef}
      id="data-viz"
      style={{
        position: "relative",
        width: "100%",
        padding: "40px 0 0 0",
        overflow: "hidden",
        background:
          "linear-gradient(180deg, #040403 0%, #0a0907 50%, #050504 100%)",
      }}
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          maxWidth: 1400,
          margin: "0 auto",
          padding: "0 24px",
          boxSizing: "border-box",
        }}
      >
        {/* Floating Currency Coins */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8 }}
          style={{
            position: "relative",
            width: "100%",
            height: "clamp(180px, 25vh, 280px)",
            overflow: "visible",
          }}
        >
          {CURRENCY_COINS.map((coin) => (
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
                offsetPath: `path('M -200 ${140 + coin.yOffset} Q 350 ${110 + coin.yOffset}, 700 ${140 + coin.yOffset} T 1400 ${140 + coin.yOffset} Q 1750 ${110 + coin.yOffset}, 2100 ${140 + coin.yOffset} T 2800 ${140 + coin.yOffset}')`,
                background: `radial-gradient(circle at 30% 30%, ${coin.color}dd, ${coin.color}99, ${coin.color}66)`,
                boxShadow: `0 0 30px ${coin.color}88, inset -5px -5px 20px rgba(0, 0, 0, 0.4), inset 5px 5px 20px rgba(255, 255, 255, 0.3)`,
                border: `3px solid ${coin.color}cc`,
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  fontSize: coin.size * 0.5,
                  fontWeight: 900,
                  color: "#fff",
                  textShadow: `0 2px 10px rgba(0, 0, 0, 0.5), 0 0 20px ${coin.color}88`,
                }}
              >
                {coin.symbol}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
