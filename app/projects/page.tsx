"use client"

import { Reveal } from "@/components/Reveal"
import { projects } from "@/lib/data"
import { ArrowUpRight, Play } from "lucide-react"

export default function ProjectsPage() {
  return (
    <div style={{ paddingTop: "var(--nav-height)" }}>

      {/* Page header */}
      <div
        style={{
          paddingTop: "96px",
          paddingBottom: "72px",
          borderBottom: "1px solid var(--border)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Watermark heading — decorative removed */}
        <div className="container-site" style={{ position: "relative", zIndex: 1 }}>
          <Reveal>
            <span className="num-label" style={{ display: "block", marginBottom: "20px" }}>
              Selected work
            </span>
            <h1 className="t-heading">More Projects</h1>
          </Reveal>
        </div>
      </div>

      {/* Projects list */}
      <div className="container-site" style={{ paddingBottom: "120px" }}>
        {projects.map((project, i) => (
          <Reveal key={project.slug} delay={i * 0.06}>
            <article
              style={{
                display: "grid",
                gridTemplateColumns: "64px 1fr 120px",
                gap: "40px",
                alignItems: "start",
                paddingTop: "44px",
                paddingBottom: "44px",
                borderBottom: "1px solid var(--border)",
                borderLeft: "2px solid transparent",
                paddingLeft: "16px",
                transition: "border-color 0.2s ease",
              }}
              className="project-row"
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLElement).style.borderLeftColor = "var(--accent)")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLElement).style.borderLeftColor = "transparent")
              }
            >
              {/* Index */}
              <div style={{ paddingTop: "4px" }}>
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.75rem",
                    letterSpacing: "0.1em",
                    color: "var(--text-faint)",
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>

              {/* Main content */}
              <div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    marginBottom: "12px",
                    flexWrap: "wrap",
                  }}
                >
                  <h2
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: 800,
                      fontSize: "clamp(1.25rem, 2.5vw, 1.75rem)",
                      letterSpacing: "-0.04em",
                      lineHeight: 1.0,
                      color: "var(--text)",
                    }}
                  >
                    {project.title}
                  </h2>
                  {project.award && (
                    <span className="badge-award">{project.award}</span>
                  )}
                  {project.slug === "lattice" && (
                    <span className="badge-award">Grand Prize Finalist — Stanford Treehacks 2026</span>
                  )}
                </div>

                <p
                  className="t-body"
                  style={{ marginBottom: "20px", maxWidth: "600px" }}
                >
                  {project.description}
                </p>

                <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                  {project.technologies.map((tech) => (
                    <span key={tech} className="tag">{tech}</span>
                  ))}
                </div>
              </div>

              {/* Year + links */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                  paddingTop: "4px",
                  textAlign: "right",
                }}
              >
                <span className="t-label" style={{ fontSize: "0.75rem" }}>{project.year}</span>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px", alignItems: "flex-end" }}>
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.75rem",
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                        color: "var(--text-muted)",
                        display: "flex",
                        alignItems: "center",
                        gap: "4px",
                        transition: "color 0.2s ease",
                      }}
                      onMouseEnter={(e) =>
                        ((e.currentTarget as HTMLElement).style.color = "var(--accent)")
                      }
                      onMouseLeave={(e) =>
                        ((e.currentTarget as HTMLElement).style.color = "var(--text-muted)")
                      }
                    >
                      Devpost <ArrowUpRight size={9} />
                    </a>
                  )}
                  {project.videoUrl && (
                    <a
                      href={project.videoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.75rem",
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                        color: "var(--text-muted)",
                        display: "flex",
                        alignItems: "center",
                        gap: "4px",
                        transition: "color 0.2s ease",
                      }}
                      onMouseEnter={(e) =>
                        ((e.currentTarget as HTMLElement).style.color = "var(--accent)")
                      }
                      onMouseLeave={(e) =>
                        ((e.currentTarget as HTMLElement).style.color = "var(--text-muted)")
                      }
                    >
                      <Play size={9} /> Demo
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.75rem",
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                        color: "var(--text-muted)",
                        display: "flex",
                        alignItems: "center",
                        gap: "4px",
                        transition: "color 0.2s ease",
                      }}
                      onMouseEnter={(e) =>
                        ((e.currentTarget as HTMLElement).style.color = "var(--accent)")
                      }
                      onMouseLeave={(e) =>
                        ((e.currentTarget as HTMLElement).style.color = "var(--text-muted)")
                      }
                    >
                      GitHub <ArrowUpRight size={9} />
                    </a>
                  )}
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </div>

      {/* Devpost CTA button */}
      <div className="container-site" style={{ paddingBottom: "120px", display: "flex", justifyContent: "center" }}>
        <a
          href="https://devpost.com/cx"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.625rem",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            padding: "12px 24px",
            border: "1px solid var(--border)",
            borderRadius: "var(--radius)",
            color: "var(--text-muted)",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            transition: "all 0.2s ease",
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget as HTMLElement
            el.style.borderColor = "var(--accent)"
            el.style.color = "var(--accent)"
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget as HTMLElement
            el.style.borderColor = "var(--border)"
            el.style.color = "var(--text-muted)"
          }}
        >
          View all my projects on Devpost <ArrowUpRight size={11} />
        </a>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .project-row {
            grid-template-columns: 1fr !important;
            gap: 12px !important;
            padding-left: 12px !important;
          }
        }
      `}</style>
    </div>
  )
}
