"use client"

import dynamic from "next/dynamic"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { Reveal } from "@/components/Reveal"
import { featuredProjects, type Project } from "@/lib/data"
import { ArrowUpRight, Play } from "lucide-react"

// Load point cloud scene client-side only (no SSR)
const PointCloudScene = dynamic(
  () => import("@/components/PointCloudScene").then((m) => m.PointCloudScene),
  { ssr: false }
)

export function FeaturedProjects() {
  return (
    <section id="projects">

      {/* Section header */}
      <div className="container-site" style={{ paddingTop: "128px", paddingBottom: "72px" }}>
        <Reveal>
          <span className="num-label" style={{ display: "block", marginBottom: "20px" }}>
            03 — Featured
          </span>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: "16px" }}>
            <h2 className="t-heading">Featured Projects</h2>
            <Link
              href="/projects"
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.625rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase" as const,
                color: "var(--text-muted)",
                display: "flex",
                alignItems: "center",
                gap: "6px",
                transition: "color 0.2s ease",
                marginBottom: "8px",
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLElement).style.color = "var(--accent)")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLElement).style.color = "var(--text-muted)")
              }
            >
              View more <ArrowUpRight size={11} />
            </Link>
          </div>
        </Reveal>
      </div>

      {/* Project panels */}
      {featuredProjects.map((project, i) =>
        project.slug === "lattice" ? (
          <LatticePanel key={project.slug} project={project} />
        ) : (
          <ProjectPanel
            key={project.slug}
            project={project}
            index={i}
          />
        )
      )}
    </section>
  )
}

function LatticePanel({ project }: { project: Project }) {
  const panelRef = useRef<HTMLDivElement>(null)
  const [showBanner, setShowBanner] = useState(true)
  const [shouldFade, setShouldFade] = useState(false)
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const fadeStartedRef = useRef(false)

  useEffect(() => {
    // Observer to detect when banner is in view
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !fadeStartedRef.current) {
          fadeStartedRef.current = true
          // Start fade animation after 1 second
          timerRef.current = setTimeout(() => {
            setShouldFade(true)
            setTimeout(() => {
              setShowBanner(false)
            }, 1000) // Fade duration
          }, 1000)
        }
      },
      { threshold: 0.5 }
    )

    if (panelRef.current) {
      observer.observe(panelRef.current)
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current)
      }
      if (panelRef.current) {
        observer.unobserve(panelRef.current)
      }
    }
  }, [])

  return (
    <div
      ref={panelRef}
      style={{
        minHeight: "100vh",
        aspectRatio: "3 / 2",
        position: "relative",
        overflow: "hidden",
        backgroundColor: "#0a0a0f",
        userSelect: "none",
        WebkitUserSelect: "none",
      }}
    >
      <style>{`
        @keyframes bannerFadeOut {
          0% { opacity: 1; }
          100% { opacity: 0; }
        }
        .lattice-banner {
          animation: bannerFadeOut 1s ease-out forwards;
        }
      `}</style>

      {/* Lattice Banner */}
      {showBanner && (
        <div
          className={shouldFade ? "lattice-banner" : ""}
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 10,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#0a0a0f",
          }}
        >
          <Image
            src="/Lattice Banner.png"
            alt="Lattice Project Banner"
            fill
            style={{ objectFit: "contain", objectPosition: "center" }}
            sizes="100vw"
            priority
          />
        </div>
      )}

      {/* 3D canvas — fills entire panel */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
        }}
      >
        <PointCloudScene
          url={project.plySrc ?? "/3dImage.lssnap"}
          style={{ width: "100%", height: "100%" }}
        />
      </div>

      {/* Bottom gradient for text legibility */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "65%",
          background:
            "linear-gradient(to top, rgba(10,10,15,0.97) 0%, rgba(10,10,15,0.6) 55%, transparent 100%)",
          zIndex: 1,
          pointerEvents: "none",
        }}
      />

      {/* Top-right: index */}
      <div
        style={{
          position: "absolute",
          top: "32px",
          right: "40px",
          zIndex: 2,
          fontFamily: "var(--font-mono)",
          fontSize: "0.5rem",
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: "rgba(167,139,250,0.4)",
          pointerEvents: "none",
        }}
      >
        01 / {String(featuredProjects.length).padStart(2, "0")}
      </div>

      {/* AR headset photo — top-right card */}
      <div
        style={{
          position: "absolute",
          top: "64px",
          right: "40px",
          zIndex: 3,
          width: "220px",
          height: "280px",
          border: "1px solid rgba(167,139,250,0.25)",
          borderRadius: "4px",
          overflow: "hidden",
          backgroundColor: "rgba(10,10,15,0.5)",
          backdropFilter: "blur(4px)",
          boxShadow: "0 0 32px rgba(167,139,250,0.08)",
          pointerEvents: "none",
        }}
        className="ar-photo-card"
      >
        <Image
          src="/ar-headset.jpg"
          alt="Anton wearing AR headset"
          fill
          style={{ objectFit: "cover", objectPosition: "center top" }}
          sizes="220px"
        />
        {/* Caption */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            padding: "20px 12px 10px",
            background: "linear-gradient(to top, rgba(10,10,15,0.85) 0%, transparent 100%)",
            fontFamily: "var(--font-mono)",
            fontSize: "0.46rem",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "rgba(167,139,250,0.7)",
          }}
        >
          On the scanner rig
        </div>
      </div>

      {/* Content overlay — bottom */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 2,
          padding: "0 56px 56px",
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
          gap: "48px",
          flexWrap: "wrap",
          pointerEvents: "none",
        }}
        className="lattice-content"
      >
        {/* Left: main info */}
        <div style={{ flex: "1", minWidth: "280px", maxWidth: "600px", pointerEvents: "auto" }}>
          {(project.award || project.slug === "lattice") && (
            <div style={{ marginBottom: "40px", display: "flex", flexDirection: "column", gap: "10px" }}>
              {project.award && (
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.5625rem",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: "#a78bfa",
                    padding: "4px 10px",
                    border: "1px solid rgba(167,139,250,0.4)",
                    borderRadius: "2px",
                    width: "fit-content",
                  }}
                >
                  {project.award}
                </span>
              )}
              {project.slug === "lattice" && (
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.5625rem",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: "#a78bfa",
                    padding: "4px 10px",
                    border: "1px solid rgba(167,139,250,0.4)",
                    borderRadius: "2px",
                    width: "fit-content",
                  }}
                >
                  Grand Prize Finalist — Stanford Treehacks 2026
                </span>
              )}
            </div>
          )}

          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 800,
              fontSize: "clamp(3rem, 7vw, 6rem)",
              letterSpacing: "-0.05em",
              lineHeight: 0.9,
              color: "#ede9e2",
              marginBottom: "16px",
            }}
          >
            {project.title}
          </h2>

          <p
            style={{
              fontSize: "0.625rem",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "#a78bfa",
              marginBottom: "20px",
            }}
          >
            {project.theme}
          </p>

          <div
            style={{
              padding: "16px 20px",
              marginBottom: "24px",
              backgroundColor: "rgba(10, 10, 15, 0.7)",
              backdropFilter: "blur(2px)",
              borderRadius: "8px",
              border: "1px solid rgba(167, 139, 250, 0.1)",
              maxWidth: "440px",
            }}
          >
            <p
              style={{
                fontSize: "0.9375rem",
                lineHeight: 1.7,
                color: "rgba(237,233,226,0.6)",
                margin: 0,
              }}
            >
              {project.description}
            </p>
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "28px" }}>
            {project.technologies.map((tech) => (
              <span
                key={tech}
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.625rem",
                  letterSpacing: "0.05em",
                  textTransform: "uppercase",
                  padding: "4px 10px",
                  border: "1px solid rgba(255,255,255,0.12)",
                  borderRadius: "2px",
                  color: "rgba(237,233,226,0.45)",
                }}
              >
                {tech}
              </span>
            ))}
          </div>

          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.6875rem",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  padding: "12px 24px",
                  border: "1px solid rgba(255,255,255,0.18)",
                  color: "#ede9e2",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  transition: "border-color 0.2s ease, color 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement
                  el.style.borderColor = "#a78bfa"
                  el.style.color = "#a78bfa"
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement
                  el.style.borderColor = "rgba(255,255,255,0.18)"
                  el.style.color = "#ede9e2"
                }}
              >
                GitHub <ArrowUpRight size={12} />
              </a>
            )}
            {project.videoUrl && (
              <a
                href={project.videoUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.6875rem",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  padding: "12px 24px",
                  backgroundColor: "#a78bfa",
                  border: "1px solid #a78bfa",
                  color: "#0a0a0f",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <Play size={11} /> Demo
              </a>
            )}
          </div>
        </div>

        {/* Right: collaborators + year */}
        <div style={{ display: "flex", flexDirection: "column", gap: "24px", alignItems: "flex-end", pointerEvents: "auto" }}>
          {project.collaborators && project.collaborators.length > 0 && (
            <div style={{ textAlign: "right" }}>
              <p
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.75rem",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "rgba(167,139,250,0.6)",
                  marginBottom: "10px",
                }}
              >
                Made with
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px", alignItems: "flex-end" }}>
                {project.collaborators.map((c) => (
                  <a
                    key={c.name}
                    href={c.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: 700,
                      fontSize: "1rem",
                      letterSpacing: "-0.02em",
                      color: "#ede9e2",
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      transition: "color 0.2s ease",
                    }}
                    onMouseEnter={(e) =>
                      ((e.currentTarget as HTMLElement).style.color = "#a78bfa")
                    }
                    onMouseLeave={(e) =>
                      ((e.currentTarget as HTMLElement).style.color = "#ede9e2")
                    }
                  >
                    {c.name} <ArrowUpRight size={12} />
                  </a>
                ))}
              </div>
            </div>
          )}
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.5rem",
              letterSpacing: "0.14em",
              color: "rgba(237,233,226,0.25)",
            }}
          >
            {project.year}
          </p>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .lattice-content {
            flex-direction: column !important;
            align-items: flex-start !important;
            padding: 0 24px 48px !important;
          }
          .ar-photo-card {
            width: 140px !important;
            height: 180px !important;
            top: 56px !important;
            right: 16px !important;
          }
        }
      `}</style>
    </div>
  )
}

function ProjectPanel({ project, index }: { project: Project; index: number }) {
  // Offset index accounting for lattice being removed from the alternation
  const altIndex = index - 1
  const imageLeft = altIndex % 2 === 0

  return (
    <Reveal>
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: imageLeft ? "row" : "row-reverse",
        }}
        className="project-panel"
      >
        {/* Image panel */}
        <div
          style={{
            flex: "0 0 58%",
            position: "relative",
            overflow: "hidden",
            backgroundColor: "var(--bg-subtle)",
          }}
          className="project-image-panel"
        >
          {project.imageSrc ? (
            <Image
              src={project.imageSrc}
              alt={project.title}
              fill
              style={{ objectFit: "cover", objectPosition: "center" }}
              sizes="(max-width: 900px) 100vw, 58vw"
            />
          ) : (
            <div
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
              }}
            >
              <div
                aria-hidden
                style={{
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: "var(--font-display)",
                  fontWeight: 800,
                  fontSize: "clamp(4rem, 10vw, 9rem)",
                  letterSpacing: "-0.06em",
                  color: "var(--text)",
                  opacity: 0.04,
                  userSelect: "none",
                  textAlign: "center",
                  lineHeight: 1,
                  padding: "40px",
                }}
              >
                {project.title}
              </div>
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.5625rem",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "var(--text-faint)",
                }}
              >
                Image coming soon
              </span>
            </div>
          )}
          <div
            style={{
              position: "absolute",
              bottom: "28px",
              left: imageLeft ? "28px" : "auto",
              right: imageLeft ? "auto" : "28px",
              fontFamily: "var(--font-mono)",
              fontSize: "0.5rem",
              letterSpacing: "0.14em",
              color: "rgba(255,255,255,0.3)",
              textTransform: "uppercase",
            }}
          >
            {String(index + 1).padStart(2, "0")} / {String(featuredProjects.length).padStart(2, "0")}
          </div>
        </div>

        {/* Content panel */}
        <div
          style={{
            flex: "0 0 42%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "80px 56px",
          }}
          className="project-content-panel"
        >
          {project.award && (
            <Reveal>
              <div style={{ marginBottom: "28px" }}>
                <span className="badge-award">{project.award}</span>
              </div>
            </Reveal>
          )}
          <Reveal>
            <p className="t-label" style={{ marginBottom: "16px" }}>{project.year}</p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 800,
                fontSize: "clamp(2rem, 4vw, 3.5rem)",
                letterSpacing: "-0.04em",
                lineHeight: 0.96,
                color: "var(--text)",
                marginBottom: "20px",
              }}
            >
              {project.title}
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.625rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "var(--accent)",
                marginBottom: "24px",
              }}
            >
              {project.theme}
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="t-body" style={{ marginBottom: "32px", maxWidth: "440px" }}>
              {project.description}
            </p>
          </Reveal>
          <Reveal delay={0.12}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "40px" }}>
              {project.technologies.map((tech) => (
                <span key={tech} className="tag">{tech}</span>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
              {project.liveUrl && (
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="btn" style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  Devpost <ArrowUpRight size={12} />
                </a>
              )}
              {project.videoUrl && (
                <a href={project.videoUrl} target="_blank" rel="noopener noreferrer" className="btn btn-accent" style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <Play size={11} /> Demo
                </a>
              )}
              {!project.liveUrl && !project.videoUrl && project.githubUrl && (
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="btn" style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  GitHub <ArrowUpRight size={12} />
                </a>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </Reveal>
  )
}
