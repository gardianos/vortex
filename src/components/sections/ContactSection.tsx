"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

function LocationIcon() {
  return (
    <svg
      style={{ width: 20, height: 20 }}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
      />
    </svg>
  );
}

function EmailIcon() {
  return (
    <svg
      style={{ width: 20, height: 20 }}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
      />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg
      style={{ width: 20, height: 20 }}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
      />
    </svg>
  );
}

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(titleRef, { once: true, margin: "-100px" });
  const [focused, setFocused] = useState<string | null>(null);

  const contactInfo = [
    {
      icon: <LocationIcon />,
      label: "Standort",
      value: "Bahnhofstrasse 42, 8001 Zürich, Schweiz",
    },
    {
      icon: <EmailIcon />,
      label: "E-Mail",
      value: "contact@vortex.capital",
      href: "mailto:contact@vortex.capital",
    },
    {
      icon: <PhoneIcon />,
      label: "Telefon",
      value: "+41 44 123 45 67",
      href: "tel:+41441234567",
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="contact"
      style={{
        position: "relative",
        width: "100%",
        padding: "80px 0",
        overflow: "hidden",
        background:
          "linear-gradient(180deg, #040403 0%, #050504 50%, #070605 100%)",
      }}
    >
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
        <div
          style={{
            position: "absolute",
            top: "25%",
            right: -200,
            width: 480,
            height: 480,
            background: "rgba(234, 88, 12, 0.08)",
            borderRadius: "50%",
            filter: "blur(180px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "25%",
            left: -160,
            width: 400,
            height: 400,
            background: "rgba(180, 83, 9, 0.06)",
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
        <div ref={titleRef} style={{ textAlign: "center", marginBottom: 80 }}>
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
              Kontakt
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
            <span style={{ color: "#fff" }}>Lassen Sie uns </span>
            <span
              style={{
                background: "linear-gradient(90deg, #fde68a, #fbbf24, #f97316)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              sprechen
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            style={{
              fontSize: 18,
              color: "rgba(254, 243, 199, 0.4)",
              maxWidth: 640,
              margin: "0 auto",
              lineHeight: 1.6,
            }}
          >
            Haben Sie Fragen oder möchten mehr über unsere Lösungen erfahren?
            Unser Team freut sich auf Ihre Nachricht.
          </motion.p>
        </div>

        {/* Contact Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
            gap: 48,
          }}
        >
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3
              style={{
                fontSize: 24,
                fontWeight: 700,
                color: "#fff",
                marginBottom: 32,
              }}
            >
              Kontaktieren Sie uns
            </h3>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 24,
                marginBottom: 48,
              }}
            >
              {contactInfo.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  style={{ display: "flex", alignItems: "flex-start", gap: 16 }}
                >
                  <div
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: 10,
                      background: "rgba(180, 83, 9, 0.15)",
                      border: "1px solid rgba(180, 83, 9, 0.3)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#fbbf24",
                      flexShrink: 0,
                    }}
                  >
                    {item.icon}
                  </div>
                  <div>
                    <div
                      style={{
                        fontSize: 13,
                        color: "rgba(254, 243, 199, 0.4)",
                        marginBottom: 4,
                        textTransform: "uppercase",
                        letterSpacing: "0.1em",
                      }}
                    >
                      {item.label}
                    </div>
                    {item.href ? (
                      <a
                        href={item.href}
                        style={{
                          color: "#fff",
                          fontSize: 16,
                          textDecoration: "none",
                          transition: "color 0.2s",
                        }}
                        onMouseOver={(e) =>
                          (e.currentTarget.style.color = "#fbbf24")
                        }
                        onMouseOut={(e) =>
                          (e.currentTarget.style.color = "#fff")
                        }
                      >
                        {item.value}
                      </a>
                    ) : (
                      <div style={{ color: "#fff", fontSize: 16 }}>
                        {item.value}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Business Hours */}
            <div
              style={{
                padding: 24,
                borderRadius: 12,
                background: "rgba(15, 13, 10, 0.8)",
                border: "1px solid rgba(180, 83, 9, 0.2)",
              }}
            >
              <h4
                style={{
                  fontSize: 14,
                  fontWeight: 600,
                  color: "#fbbf24",
                  marginBottom: 16,
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                }}
              >
                Geschäftszeiten
              </h4>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: 14,
                  }}
                >
                  <span style={{ color: "rgba(254, 243, 199, 0.5)" }}>
                    Montag – Freitag
                  </span>
                  <span style={{ color: "#fff" }}>09:00 – 18:00</span>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: 14,
                  }}
                >
                  <span style={{ color: "rgba(254, 243, 199, 0.5)" }}>
                    Samstag – Sonntag
                  </span>
                  <span style={{ color: "rgba(254, 243, 199, 0.4)" }}>
                    Geschlossen
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <form
              style={{
                padding: 40,
                borderRadius: 16,
                background: "linear-gradient(180deg, #0f0d0a, #0a0907)",
                border: "1px solid rgba(180, 83, 9, 0.25)",
              }}
            >
              <h3
                style={{
                  fontSize: 24,
                  fontWeight: 700,
                  color: "#fff",
                  marginBottom: 32,
                  textAlign: "center",
                }}
              >
                Nachricht senden
              </h3>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 20,
                  marginBottom: 20,
                }}
              >
                {["name", "email"].map((field) => (
                  <div key={field}>
                    <label
                      style={{
                        display: "block",
                        fontSize: 13,
                        color: "rgba(254, 243, 199, 0.5)",
                        marginBottom: 8,
                        textTransform: "uppercase",
                        letterSpacing: "0.1em",
                      }}
                    >
                      {field === "name" ? "Name" : "E-Mail"}
                    </label>
                    <input
                      type={field === "email" ? "email" : "text"}
                      placeholder={
                        field === "name" ? "Ihr Name" : "ihre@email.ch"
                      }
                      onFocus={() => setFocused(field)}
                      onBlur={() => setFocused(null)}
                      style={{
                        width: "100%",
                        padding: 14,
                        borderRadius: 10,
                        background: "#070605",
                        fontSize: 15,
                        color: "#fff",
                        outline: "none",
                        boxSizing: "border-box",
                        border:
                          focused === field
                            ? "1px solid rgba(245, 158, 11, 0.6)"
                            : "1px solid rgba(180, 83, 9, 0.2)",
                        transition: "border-color 0.2s",
                      }}
                    />
                  </div>
                ))}
              </div>

              <div style={{ marginBottom: 20 }}>
                <label
                  style={{
                    display: "block",
                    fontSize: 13,
                    color: "rgba(254, 243, 199, 0.5)",
                    marginBottom: 8,
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                  }}
                >
                  Betreff
                </label>
                <input
                  type="text"
                  placeholder="Worum geht es?"
                  onFocus={() => setFocused("subject")}
                  onBlur={() => setFocused(null)}
                  style={{
                    width: "100%",
                    padding: 14,
                    borderRadius: 10,
                    background: "#070605",
                    fontSize: 15,
                    color: "#fff",
                    outline: "none",
                    boxSizing: "border-box",
                    border:
                      focused === "subject"
                        ? "1px solid rgba(245, 158, 11, 0.6)"
                        : "1px solid rgba(180, 83, 9, 0.2)",
                  }}
                />
              </div>

              <div style={{ marginBottom: 32 }}>
                <label
                  style={{
                    display: "block",
                    fontSize: 13,
                    color: "rgba(254, 243, 199, 0.5)",
                    marginBottom: 8,
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                  }}
                >
                  Nachricht
                </label>
                <textarea
                  placeholder="Ihre Nachricht..."
                  rows={5}
                  onFocus={() => setFocused("message")}
                  onBlur={() => setFocused(null)}
                  style={{
                    width: "100%",
                    padding: 14,
                    borderRadius: 10,
                    background: "#070605",
                    fontSize: 15,
                    color: "#fff",
                    outline: "none",
                    resize: "vertical",
                    boxSizing: "border-box",
                    fontFamily: "inherit",
                    border:
                      focused === "message"
                        ? "1px solid rgba(245, 158, 11, 0.6)"
                        : "1px solid rgba(180, 83, 9, 0.2)",
                  }}
                />
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                style={{
                  width: "100%",
                  padding: 16,
                  borderRadius: 12,
                  border: "none",
                  cursor: "pointer",
                  fontWeight: 600,
                  fontSize: 15,
                  background: "linear-gradient(90deg, #f59e0b, #ea580c)",
                  color: "#000",
                  boxShadow: "0 10px 40px rgba(245, 158, 11, 0.3)",
                }}
              >
                Nachricht senden →
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
