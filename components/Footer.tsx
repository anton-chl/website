"use client"

import { siteConfig } from "@/lib/data"

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer
      style={{
        borderTop: "1px solid var(--border)",
        padding: "40px 0",
      }}
    >
      <div
        className="container-site"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexWrap: "wrap",
          gap: "16px",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "1rem",
            letterSpacing: "0.04em",
            color: "var(--text-muted)",
          }}
        >
          © {year} {siteConfig.name}
        </span>
      </div>
    </footer>
  )
}
