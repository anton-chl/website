"use client"

import { useEffect, useState } from "react"
import { Reveal } from "@/components/Reveal"
import { siteConfig } from "@/lib/data"
import { ArrowUpRight } from "lucide-react"
import { Icon } from "@iconify/react"

export function Contact() {
  const [time, setTime] = useState("")

  useEffect(() => {
    const fmt = () =>
      new Date().toLocaleTimeString("en-CA", {
        timeZone: "America/Toronto",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      })
    setTime(fmt())
    const id = setInterval(() => setTime(fmt()), 60_000)
    return () => clearInterval(id)
  }, [])

  return (
    <section id="contact" className="section">
      <div className="container-site">

        <Reveal>
          <span className="num-label" style={{ display: "block", marginBottom: "20px" }}>
            04 — Contact
          </span>
        </Reveal>

        {/* Giant CTA headline */}
        <Reveal delay={0.05}>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 800,
              fontSize: "clamp(3rem, 9vw, 8rem)",
              letterSpacing: "-0.05em",
              lineHeight: 0.9,
              color: "var(--text)",
              marginBottom: "64px",
            }}
          >
            Let's build<br />
            something<br />
            <span style={{ color: "var(--accent)" }}>together.</span>
          </h2>
        </Reveal>

        {/* Two-column: CTA left, links right */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr auto",
            gap: "80px",
            alignItems: "start",
          }}
          className="contact-grid"
        >
          {/* Left */}
          <Reveal delay={0.1}>
            <div>
              <p className="t-lead" style={{ maxWidth: "480px", marginBottom: "40px", color: "var(--text-muted)" }}>
                My inbox is always open to chat about a project, opportunity, or just to say hi!
              </p>
              <a
                href={`mailto:${siteConfig.email}`}
                className="btn btn-accent"
              >
                {siteConfig.email} ↗
              </a>
            </div>
          </Reveal>

          {/* Right: meta */}
          <Reveal delay={0.15}>
            <div style={{ display: "flex", flexDirection: "column", gap: "36px", minWidth: "180px" }}>
              {/* Links */}
              <div>
                <p className="t-label" style={{ marginBottom: "14px" }}>My digital spaces</p>
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  {[
                    { label: "Devpost", href: siteConfig.devpost, icon: "simple-icons:devpost" },
                    { label: "GitHub", href: siteConfig.github, icon: "mdi:github" },
                    { label: "LinkedIn", href: siteConfig.linkedin, icon: "mdi:linkedin" },
                  ].map(({ label, href, icon }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                        fontFamily: "var(--font-mono)",
                        fontSize: "1.125rem",
                        letterSpacing: "0.04em",
                        color: "var(--text-muted)",
                        transition: "color 0.2s ease",
                      }}
                      onMouseEnter={(e) =>
                        ((e.currentTarget as HTMLElement).style.color = "var(--accent)")
                      }
                      onMouseLeave={(e) =>
                        ((e.currentTarget as HTMLElement).style.color = "var(--text-muted)")
                      }
                    >
                      <Icon icon={icon} style={{ fontSize: "1.125rem", color: "var(--text-muted)" }} />
                      {label} <ArrowUpRight size={10} />
                    </a>
                  ))}
                </div>
              </div>

              {/* Location */}
              <div>
                <p className="t-label" style={{ marginBottom: "10px" }}>Location</p>
                <p
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.875rem",
                    color: "var(--text-muted)",
                    lineHeight: 1.7,
                  }}
                >
                  {siteConfig.location}
                  {time && (
                    <>
                      <br />
                      <span style={{ color: "var(--accent)" }}>{time}</span>
                    </>
                  )}
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .contact-grid {
            grid-template-columns: 1fr !important;
            gap: 48px !important;
          }
        }
      `}</style>
    </section>
  )
}
