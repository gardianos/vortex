"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { name: "Home", href: "#hero" },
  { name: "Über uns", href: "#about" },
  { name: "Produkte", href: "#products" },
  { name: "Kontakt", href: "#contact" },
];

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      const sections = navLinks.map((link) => link.href.substring(1));
      for (const section of sections.reverse()) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setIsMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          transition: "all 0.3s ease",
          padding: "6px 0",
          background: isScrolled ? "rgba(10, 8, 6, 0.95)" : "transparent",
          backdropFilter: isScrolled ? "blur(16px)" : "none",
          borderBottom: isScrolled
            ? "1px solid rgba(251, 191, 36, 0.12)"
            : "none",
        }}
      >
        <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 32px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            {/* Logo with glow effect */}
            <motion.a
              href="#hero"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick("#hero");
              }}
              style={{
                position: "relative",
                zIndex: 50,
                display: "flex",
                alignItems: "center",
                textDecoration: "none",
                marginTop: 8,
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logo-nav.svg"
                alt="VORTEX"
                style={{
                  height: 44,
                  width: "auto",
                }}
              />
            </motion.a>

            {/* Desktop Navigation - Premium Style */}
            <motion.div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                padding: "4px 6px",
                borderRadius: 30,
                background: "rgba(20, 18, 15, 0.7)",
                border: "1px solid rgba(251, 191, 36, 0.2)",
              }}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {navLinks.map((link, index) => {
                const isActive = activeSection === link.href.substring(1);
                const isHovered = hoveredLink === link.href;

                return (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(link.href);
                    }}
                    onMouseEnter={() => setHoveredLink(link.href)}
                    onMouseLeave={() => setHoveredLink(null)}
                    style={{
                      position: "relative",
                      padding: "6px 14px",
                      textDecoration: "none",
                      borderRadius: 20,
                      overflow: "hidden",
                    }}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 * index }}
                  >
                    {/* Active/Hover background */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{
                        opacity: isActive ? 1 : isHovered ? 0.5 : 0,
                        scale: isActive || isHovered ? 1 : 0.8,
                      }}
                      transition={{ duration: 0.3 }}
                      style={{
                        position: "absolute",
                        inset: 0,
                        background: isActive
                          ? "linear-gradient(135deg, rgba(251, 191, 36, 0.25) 0%, rgba(249, 115, 22, 0.2) 100%)"
                          : "rgba(251, 191, 36, 0.1)",
                        borderRadius: 24,
                        border: isActive
                          ? "1px solid rgba(251, 191, 36, 0.4)"
                          : "1px solid transparent",
                      }}
                    />

                    {/* Glow effect for active */}
                    {isActive && (
                      <motion.div
                        animate={{ opacity: [0.5, 0.8, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        style={{
                          position: "absolute",
                          inset: -5,
                          background:
                            "radial-gradient(ellipse at center, rgba(251, 191, 36, 0.3) 0%, transparent 70%)",
                          filter: "blur(10px)",
                          pointerEvents: "none",
                        }}
                      />
                    )}

                    <span
                      style={{
                        position: "relative",
                        zIndex: 1,
                        fontSize: 13,
                        fontWeight: isActive ? 600 : 500,
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                        transition: "all 0.3s ease",
                        color: isActive
                          ? "#fbbf24"
                          : isHovered
                            ? "#fde68a"
                            : "rgba(254, 243, 199, 0.7)",
                        textShadow: isActive
                          ? "0 0 15px rgba(251, 191, 36, 0.6)"
                          : "none",
                      }}
                    >
                      {link.name}
                    </span>
                  </motion.a>
                );
              })}
            </motion.div>
          </div>
        </div>

        {/* Animated bottom border line */}
        {isScrolled && (
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            style={{
              position: "absolute",
              bottom: 0,
              left: "10%",
              right: "10%",
              height: 1,
              background:
                "linear-gradient(90deg, transparent 0%, rgba(251, 191, 36, 0.3) 50%, transparent 100%)",
            }}
          />
        )}
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ position: "fixed", inset: 0, zIndex: 40 }}
          >
            <motion.div
              style={{
                position: "absolute",
                inset: 0,
                background: "rgba(10, 8, 6, 0.98)",
                backdropFilter: "blur(24px)",
              }}
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              style={{
                position: "absolute",
                left: 0,
                right: 0,
                top: 112,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 32,
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
            >
              {navLinks.map((link, index) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                  style={{
                    fontSize: 28,
                    fontWeight: 500,
                    textDecoration: "none",
                    transition: "color 0.3s",
                    color:
                      activeSection === link.href.substring(1)
                        ? "#fbbf24"
                        : "rgba(254, 243, 199, 0.4)",
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {link.name}
                </motion.a>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
