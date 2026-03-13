"use client"

import { Reveal } from "@/components/Reveal"
import { about, siteConfig } from "@/lib/data"

export function About() {
  return (
    <section id="about" className="section">
      <div className="container-site">

        {/* Section label row */}
        <Reveal>
          <div style={{ marginBottom: "72px" }}>
            <span className="num-label" style={{ display: "block", marginBottom: "20px" }}>
              01 — About
            </span>
            <h2 className="t-heading">
              Building at the edge of<br />
              software and systems.
            </h2>
          </div>
        </Reveal>

        {/* Content: two-column */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.2fr 0.8fr",
            gap: "140px",
            alignItems: "start",
          }}
          className="about-grid"
        >
          {/* Left: bio */}
          <div>
            {/* First paragraph — lead scale */}
            <Reveal>
              <p className="t-lead" style={{ marginBottom: "24px" }}>
                {about.bio[0]}
              </p>
            </Reveal>

            {/* Second paragraph — body scale, muted */}
            {about.bio.slice(1).map((p, i) => (
              <Reveal key={i} delay={0.1}>
                <p
                  className="t-body"
                  style={{ marginBottom: "20px" }}
                >
                  {p}
                </p>
              </Reveal>
            ))}

            <Reveal delay={0.2}>
              <div style={{ marginTop: "40px", display: "flex", gap: "12px", flexWrap: "wrap" }}>
                <a
                  href={siteConfig.resumeUrl}
                  className="btn"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Resume ↗
                </a>
                <a href={`mailto:${siteConfig.email}`} className="btn btn-accent">
                  Get in touch
                </a>
              </div>
            </Reveal>
          </div>

          {/* Right: skills */}
          <div>
            <Reveal>
              <p className="t-label" style={{ marginBottom: "36px" }}>My Digital Toolbox</p>
            </Reveal>

            <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
              {about.skillGroups.map((group, i) => (
                <Reveal key={group.label} delay={0.08 + i * 0.06}>
                  <div
                    style={{
                      paddingLeft: "16px",
                      borderLeft: "1px solid var(--border)",
                      transition: "border-color 0.2s ease",
                    }}
                    onMouseEnter={(e) =>
                      ((e.currentTarget as HTMLElement).style.borderLeftColor = "var(--accent)")
                    }
                    onMouseLeave={(e) =>
                      ((e.currentTarget as HTMLElement).style.borderLeftColor = "var(--border)")
                    }
                  >
                    <p
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.5625rem",
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        color: "var(--accent)",
                        marginBottom: "10px",
                      }}
                    >
                      {group.label}
                    </p>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                      {group.skills.map((skill) => (
                        <span key={skill} className="tag">{skill}</span>
                      ))}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .about-grid {
            grid-template-columns: 1fr !important;
            gap: 56px !important;
          }
        }
      `}</style>
    </section>
  )
}
