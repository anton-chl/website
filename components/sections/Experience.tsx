"use client"

import { Reveal } from "@/components/Reveal"
import { experiences } from "@/lib/data"

export function Experience() {
  return (
    <section id="experience" className="section">
      <div className="container-site">

        {/* Section label only — no tagline subtitle */}
        <Reveal>
          <div style={{ marginBottom: "72px" }}>
            <span className="num-label" style={{ display: "block", marginBottom: "20px" }}>
              02 — Work
            </span>
            <h2 className="t-heading">Experience</h2>
          </div>
        </Reveal>

        {/* Experience rows — simplified: no bullets */}
        <div>
          {experiences.map((exp, i) => (
            <Reveal key={i} delay={i * 0.09}>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "180px 1fr",
                  gap: "48px",
                  paddingTop: "40px",
                  paddingBottom: "40px",
                  borderBottom: "1px solid var(--border)",
                  position: "relative",
                  overflow: "hidden",
                }}
                className="exp-row"
              >
                {/* Watermark index */}
                <div
                  aria-hidden
                  style={{
                    position: "absolute",
                    right: "-8px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    fontFamily: "var(--font-display)",
                    fontWeight: 800,
                    fontSize: "clamp(6rem, 14vw, 12rem)",
                    lineHeight: 1,
                    letterSpacing: "-0.05em",
                    color: "var(--text)",
                    opacity: 0.025,
                    userSelect: "none",
                    pointerEvents: "none",
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </div>

                {/* Left: period + company */}
                <div style={{ paddingTop: "4px" }}>
                  <p className="t-label" style={{ marginBottom: "10px" }}>
                    {exp.period}
                  </p>
                  <p
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: 700,
                      fontSize: "0.9375rem",
                      letterSpacing: "-0.02em",
                      color: "var(--accent)",
                      lineHeight: 1.3,
                    }}
                  >
                    {exp.company}
                  </p>
                </div>

                {/* Right: title + tech tags only */}
                <div style={{ position: "relative", zIndex: 1 }}>
                  <h3
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: 800,
                      fontSize: "1.375rem",
                      letterSpacing: "-0.03em",
                      color: "var(--text)",
                      marginBottom: "20px",
                      lineHeight: 1.1,
                    }}
                  >
                    {exp.title}
                  </h3>

                  <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                    {exp.technologies.map((tech) => (
                      <span key={tech} className="tag">{tech}</span>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .exp-row {
            grid-template-columns: 1fr !important;
            gap: 16px !important;
          }
        }
      `}</style>
    </section>
  )
}
