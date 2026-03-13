"use client"

import { useState, useEffect } from "react"
import { Reveal } from "@/components/Reveal"
import { artworks, type ArtItem } from "@/lib/data"
import { X } from "lucide-react"

function ArtCard({ item, onClick }: { item: ArtItem; onClick: () => void }) {
  const aspectMap = {
    portrait: "3/4",
    landscape: "4/3",
    square: "1/1",
  }
  const ratio = aspectMap[item.aspectRatio ?? "square"]

  return (
    <button
      onClick={onClick}
      style={{
        display: "block",
        width: "100%",
        background: "none",
        border: "none",
        cursor: "pointer",
        padding: 0,
        textAlign: "left",
      }}
    >
      <div
        style={{
          position: "relative",
          aspectRatio: ratio,
          backgroundColor: "var(--bg-subtle)",
          border: "1px solid var(--border)",
          overflow: "hidden",
          transition: "border-color 0.25s ease",
        }}
        onMouseEnter={(e) => {
          const el = e.currentTarget as HTMLElement
          el.style.borderColor = "var(--accent)"
          const overlay = el.querySelector(".art-overlay") as HTMLElement | null
          if (overlay) overlay.style.opacity = "1"
        }}
        onMouseLeave={(e) => {
          const el = e.currentTarget as HTMLElement
          el.style.borderColor = "var(--border)"
          const overlay = el.querySelector(".art-overlay") as HTMLElement | null
          if (overlay) overlay.style.opacity = "0"
        }}
      >
        {item.imageSrc ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={item.imageSrc}
            alt={item.title}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
            }}
          />
        ) : (
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              gap: "8px",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.5625rem",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "var(--border)",
              }}
            >
              {item.medium}
            </span>
          </div>
        )}

        {/* Hover overlay */}
        <div
          className="art-overlay"
          style={{
            position: "absolute",
            inset: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            padding: "16px",
            opacity: 0,
            transition: "opacity 0.25s ease",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontSize: "0.9375rem",
              letterSpacing: "-0.02em",
              color: "#ffffff",
              marginBottom: "4px",
            }}
          >
            {item.title}
          </p>
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.625rem",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.6)",
            }}
          >
            {item.medium} · {item.year}
          </p>
        </div>
      </div>
    </button>
  )
}

function Lightbox({
  item,
  onClose,
}: {
  item: ArtItem
  onClose: () => void
}) {
  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        backgroundColor: "rgba(0,0,0,0.92)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px",
      }}
    >
      <button
        onClick={onClose}
        aria-label="Close"
        style={{
          position: "absolute",
          top: "24px",
          right: "24px",
          background: "none",
          border: "none",
          color: "rgba(255,255,255,0.6)",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <X size={20} />
      </button>

      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: "800px",
          width: "100%",
        }}
      >
        {item.imageSrc ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={item.imageSrc}
            alt={item.title}
            style={{
              width: "100%",
              height: "auto",
              display: "block",
              maxHeight: "75vh",
              objectFit: "contain",
            }}
          />
        ) : (
          <div
            style={{
              width: "100%",
              aspectRatio: "4/3",
              backgroundColor: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.6875rem",
                letterSpacing: "0.08em",
                color: "rgba(255,255,255,0.2)",
                textTransform: "uppercase",
              }}
            >
              Image placeholder
            </span>
          </div>
        )}
        <div style={{ marginTop: "20px" }}>
          <p
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontSize: "1.125rem",
              letterSpacing: "-0.02em",
              color: "#ffffff",
              marginBottom: "6px",
            }}
          >
            {item.title}
          </p>
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.625rem",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.4)",
            }}
          >
            {item.medium} · {item.year}
          </p>
        </div>
      </div>
    </div>
  )
}

export default function ArtPage() {
  const [selected, setSelected] = useState<ArtItem | null>(null)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelected(null)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [])

  // No reordering - use original medium-based order



  return (
    <>
      <div style={{ paddingTop: "64px" }}>
        {/* Page header */}
        <div
          style={{
            borderBottom: "1px solid var(--border)",
            paddingTop: "80px",
            paddingBottom: "64px",
          }}
        >
          <div className="container-site">
            <Reveal>
              <p
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.6875rem",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "var(--text-muted)",
                  marginBottom: "20px",
                }}
              >
                Drawing · Painting · Origami
              </p>
              <h1
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 800,
                  fontSize: "clamp(2.5rem, 6vw, 5rem)",
                  letterSpacing: "-0.04em",
                  lineHeight: 0.95,
                  color: "var(--text)",
                  marginBottom: "20px",
                }}
              >
                Art
              </h1>
              <p
                style={{
                  fontSize: "0.9375rem",
                  lineHeight: 1.7,
                  color: "var(--text-muted)",
                  maxWidth: "480px",
                }}
              >
                A collection of my art, including pastel, watercolour, pencil, and origami.
              </p>
            </Reveal>
          </div>
        </div>

        {/* Gallery with tight masonry layout */}
        <div
          style={{ paddingTop: "64px", paddingBottom: "120px" }}
        >
          <div
            className="container-site"
            style={{
              columns: "3",
              columnGap: "16px",
              columnFill: "balance",
            }}
          >
            {artworks.map((item, i) => (
              <Reveal key={item.id} delay={i * 0.05}>
                <div style={{ marginBottom: "16px", breakInside: "avoid" }}>
                  <ArtCard item={item} onClick={() => setSelected(item)} />
                  <div style={{ paddingTop: "8px" }}>
                    <p
                      style={{
                        fontFamily: "var(--font-display)",
                        fontWeight: 600,
                        fontSize: "0.8125rem",
                        letterSpacing: "-0.01em",
                        color: "var(--text)",
                        marginBottom: "2px",
                      }}
                    >
                      {item.title}
                    </p>
                    <p
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.5625rem",
                        letterSpacing: "0.06em",
                        textTransform: "uppercase",
                        color: "var(--text-muted)",
                      }}
                    >
                      {item.medium}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {selected && (
        <Lightbox item={selected} onClose={() => setSelected(null)} />
      )}

      <style>{`
        @media (max-width: 600px) {
          .art-columns {
            columns: 2 140px !important;
          }
        }
      `}</style>
    </>
  )
}
