"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Sun, Moon } from "lucide-react"
import { useTheme } from "@/components/ThemeProvider"

const sectionLinks = [
  { href: "/#about",      label: "About", id: "about" },
  { href: "/#projects",   label: "Featured", id: "projects" },
  { href: "/#experience", label: "Work", id: "experience" },
  { href: "/#contact",    label: "Contact", id: "contact" },
]

const allMobileLinks = [
  ...sectionLinks,
  { href: "/projects", label: "Projects" },
  { href: "/art", label: "Art" },
]

export function Navigation() {
  const pathname = usePathname()
  const { theme, toggle } = useTheme()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState<string | null>(null)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 48)

      // Detect active section
      if (pathname === "/") {
        let current: string | null = null
        for (const { id } of sectionLinks) {
          const element = document.getElementById(id)
          if (element) {
            const rect = element.getBoundingClientRect()
            if (rect.top <= 150) {
              current = id
            }
          }
        }
        setActiveSection(current)
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true })
    onScroll() // Call once on mount
    return () => window.removeEventListener("scroll", onScroll)
  }, [pathname])

  const linkStyle = (sectionId: string | undefined) => {
    const isActive = activeSection === sectionId
    return {
      fontFamily: "var(--font-mono)",
      fontSize: "0.625rem",
      letterSpacing: "0.1em",
      textTransform: "uppercase" as const,
      color: isActive ? "var(--highlight)" : "var(--accent)",
      transition: "color 0.2s ease",
    }
  }

  return (
    <>
      <header
        className="nav-bar"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          height: "var(--nav-height)",
          backgroundColor: scrolled ? "var(--bg)" : "transparent",
          borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent",
          transition: "background-color 0.35s ease, border-color 0.35s ease",
        }}
      >
        <div
          className="container-site"
          style={{
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Wordmark */}
          <Link
            href="/"
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 500,
              fontSize: "1.6rem",
              color: "var(--text)",
              display: "flex",
              alignItems: "baseline",
              marginLeft: "-140px",
            }}
          >
            Anton Lee
          </Link>

          {/* Desktop nav — section links + separator + Art (right) + theme toggle */}
          <nav
            className="desktop-nav"
            style={{ display: "flex", alignItems: "center", gap: "40px" }}
          >
            {/* Section links */}
            {sectionLinks.map(({ href, label, id }) => (
              <Link
                key={href}
                href={href}
                style={linkStyle(id)}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLElement).style.color = "var(--text)")
                }
                onMouseLeave={(e) => {
                  const element = e.currentTarget as HTMLElement
                  element.style.color = activeSection === id ? "var(--highlight)" : "var(--accent)"
                }}
              >
                {label}
              </Link>
            ))}

            {/* Thin vertical separator */}
            <span
              style={{
                display: "block",
                width: "1px",
                height: "14px",
                backgroundColor: "var(--border)",
              }}
            />

            {/* Art — right-side link, distinct */}
            <Link
              href="/projects"
              style={{
                ...linkStyle(undefined),
                color: pathname === "/projects" ? "var(--highlight)" : "var(--accent)",
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLElement).style.color = "var(--text)")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLElement).style.color =
                  pathname === "/projects" ? "var(--highlight)" : "var(--accent)")
              }
            >
              Projects
            </Link>

            <Link
              href="/art"
              style={{
                ...linkStyle(undefined),
                color: pathname === "/art" ? "var(--highlight)" : "var(--accent)",
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLElement).style.color = "var(--text)")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLElement).style.color =
                  pathname === "/art" ? "var(--highlight)" : "var(--accent)")
              }
            >
              Art
            </Link>

            {/* Theme toggle */}
            <button
              onClick={toggle}
              aria-label="Toggle theme"
              style={{
                background: "none",
                border: "1px solid var(--border)",
                cursor: "pointer",
                color: "var(--text-muted)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "30px",
                height: "30px",
                borderRadius: "var(--radius)",
                transition: "border-color 0.2s ease, color 0.2s ease",
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
              {theme === "dark" ? <Sun size={13} /> : <Moon size={13} />}
            </button>
          </nav>

          {/* Mobile controls */}
          <div
            className="mobile-controls"
            style={{ display: "none", alignItems: "center", gap: "12px" }}
          >
            <button
              onClick={toggle}
              aria-label="Toggle theme"
              style={{
                background: "none",
                border: "1px solid var(--border)",
                cursor: "pointer",
                color: "var(--text-muted)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "32px",
                height: "32px",
                borderRadius: "var(--radius)",
              }}
            >
              {theme === "dark" ? <Sun size={13} /> : <Moon size={13} />}
            </button>
            <button
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Toggle menu"
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "var(--text)",
                display: "flex",
                flexDirection: "column",
                gap: "5px",
                padding: "4px",
              }}
            >
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  style={{
                    display: "block",
                    width: "20px",
                    height: "1px",
                    backgroundColor: "currentColor",
                    transition: "transform 0.2s ease, opacity 0.2s ease",
                    transform:
                      menuOpen && i === 0
                        ? "rotate(45deg) translate(4px, 4px)"
                        : menuOpen && i === 2
                        ? "rotate(-45deg) translate(4px, -4px)"
                        : "none",
                    opacity: menuOpen && i === 1 ? 0 : 1,
                  }}
                />
              ))}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile overlay menu */}
      {menuOpen && (
        <div
          onClick={() => setMenuOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 999,
            backgroundColor: "var(--bg)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "32px",
          }}
        >
          {allMobileLinks.map(({ href, label, id }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setMenuOpen(false)}
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 800,
                fontSize: "2.5rem",
                letterSpacing: "-0.04em",
                color: id && activeSection === id ? "var(--highlight)" : "var(--text)",
                transition: "color 0.15s ease",
              }}
              onMouseEnter={(e) => {
                ((e.currentTarget as HTMLElement).style.color = id && activeSection === id ? "var(--highlight)" : "var(--accent)")
              }}
              onMouseLeave={(e) => {
                ((e.currentTarget as HTMLElement).style.color = id && activeSection === id ? "var(--highlight)" : "var(--text)")
              }}
            >
              {label}
            </Link>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-controls { display: flex !important; }
        }
      `}</style>
    </>
  )
}
