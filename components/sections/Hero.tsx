"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { siteConfig } from "@/lib/data"

export function Hero() {
  const [taglineIndex, setTaglineIndex] = useState(0)
  const taglines = siteConfig.taglines

  useEffect(() => {
    const interval = setInterval(() => {
      setTaglineIndex((i) => (i + 1) % taglines.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [taglines.length])

  const nameFontSize = "clamp(4.2rem, 15vw, 14rem)"
  const nameStyle: React.CSSProperties = {
    fontFamily: "var(--font-display)",
    fontWeight: 800,
    fontSize: nameFontSize,
    lineHeight: 0.88,
    letterSpacing: "-0.05em",
    userSelect: "none",
  }

  return (
    <section
      style={{
        minHeight: "100svh",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Top strip removed */}

      {/* ── NAME BLOCK ── */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          paddingTop: "56px",
          paddingBottom: "16px",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div className="container-site">

          {/* ANTON — solid, left */}
          <motion.div
            initial={{ opacity: 0, y: 64 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <div style={{ ...nameStyle, color: "var(--text)", textAlign: "left" }}>
              Anton
            </div>
          </motion.div>

          {/* Thin divider between the two names */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            style={{
              height: "1px",
              backgroundColor: "var(--border)",
              transformOrigin: "left",
              margin: "clamp(6px, 1.2vw, 18px) 0",
            }}
          />

          {/* LEE — ACCENT COLOR, right */}
          <motion.div
            initial={{ opacity: 0, y: -48 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            <div
              style={{
                ...nameStyle,
                color: "var(--accent)",
                textAlign: "right",
              }}
            >
              Lee
            </div>
          </motion.div>

          {/* Outline ghost of "Anton" — typographic depth layer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.6 }}
            aria-hidden
            style={{
              position: "absolute",
              bottom: "-0.06em",
              right: "-0.02em",
              fontFamily: "var(--font-display)",
              fontWeight: 800,
              fontSize: "clamp(3rem, 10vw, 9rem)",
              lineHeight: 1,
              letterSpacing: "-0.05em",
              color: "transparent",
              WebkitTextStroke: "1px var(--border)",
              pointerEvents: "none",
              userSelect: "none",
              opacity: 0.5,
              whiteSpace: "nowrap",
            }}
          >
            Anton Lee
          </motion.div>
        </div>
      </div>

      {/* ── BOTTOM INFO STRIP ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.75 }}
        style={{
          borderTop: "1px solid var(--border)",
          paddingTop: "24px",
          paddingBottom: "40px",
          position: "relative",
          zIndex: 2,
        }}
      >
        <div
          className="container-site"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "24px",
            flexWrap: "wrap",
          }}
        >
          {/* Left: role + cycling tagline */}
          <div>
            <p
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.625rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "var(--text-muted)",
                marginBottom: "10px",
              }}
            >
              {siteConfig.title} · {siteConfig.school}
            </p>
            <div style={{ height: "26px", overflow: "hidden", position: "relative" }}>
              <AnimatePresence mode="wait">
                <motion.span
                  key={taglineIndex}
                  initial={{ y: 26, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -26, opacity: 0 }}
                  transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
                  style={{
                    display: "block",
                    fontFamily: "var(--font-display)",
                    fontWeight: 700,
                    fontSize: "1.125rem",
                    letterSpacing: "-0.03em",
                    color: "var(--accent)",
                  }}
                >
                  {taglines[taglineIndex]}
                </motion.span>
              </AnimatePresence>
            </div>
          </div>

          {/* Right: scroll hint */}
          <motion.a
            href="#about"
            aria-label="Scroll to about"
            whileHover={{ x: 3 }}
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.5625rem",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "var(--text-faint)",
              display: "flex",
              alignItems: "center",
              gap: "10px",
              transition: "color 0.2s ease",
            }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLElement).style.color = "var(--accent)")
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLElement).style.color = "var(--text-faint)")
            }
          >
            Scroll
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <line x1="8" y1="2" x2="8" y2="14" stroke="currentColor" strokeWidth="1" />
              <polyline points="4,10 8,14 12,10" stroke="currentColor" strokeWidth="1" fill="none" />
            </svg>
          </motion.a>
        </div>
      </motion.div>

      {/* Ambient orb — top-right */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: "-15%",
          right: "-8%",
          width: "55vw",
          height: "55vw",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(var(--accent-rgb), 0.08) 0%, transparent 65%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />
      {/* Ambient orb — bottom-left */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          bottom: "-10%",
          left: "-5%",
          width: "30vw",
          height: "30vw",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(var(--accent-rgb), 0.05) 0%, transparent 70%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />
    </section>
  )
}
