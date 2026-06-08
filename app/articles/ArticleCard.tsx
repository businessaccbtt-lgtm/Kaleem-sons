"use client"
import Link from "next/link"
import { useState } from "react"

type Props = {
  id: string
  slug: string
  title: string
  excerpt?: string | null
  cover_image?: string | null
  published_at: string
}

export default function ArticleCard({ id, slug, title, excerpt, cover_image, published_at }: Props) {
  const [hovered, setHovered] = useState(false)

  return (
    <Link key={id} href={`/articles/${slug}`} style={{ textDecoration: "none" }}>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          background: "#fff", borderRadius: "14px", overflow: "hidden",
          boxShadow: hovered ? "0 8px 24px rgba(0,0,0,0.12)" : "0 2px 12px rgba(0,0,0,0.07)",
          transform: hovered ? "translateY(-3px)" : "translateY(0)",
          transition: "transform 0.2s, box-shadow 0.2s",
        }}
      >
        {cover_image && (
          <img src={cover_image} alt={title} style={{ width: "100%", height: "180px", objectFit: "cover" }} />
        )}
        <div style={{ padding: "1.25rem" }}>
          <p style={{ fontSize: "0.72rem", color: "#bbb", margin: "0 0 0.5rem", textTransform: "uppercase", letterSpacing: "1px" }}>
            {new Date(published_at).toLocaleDateString("en-PK", { day: "numeric", month: "short", year: "numeric" })}
          </p>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.05rem", fontWeight: 700, color: "#111", margin: "0 0 0.5rem", lineHeight: 1.4 }}>
            {title}
          </h2>
          {excerpt && (
            <p style={{ fontSize: "0.82rem", color: "#888", margin: 0, lineHeight: 1.6, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
              {excerpt}
            </p>
          )}
          <p style={{ fontSize: "0.78rem", fontWeight: 700, color: "#111", margin: "0.85rem 0 0", letterSpacing: "0.5px" }}>
            Read More →
          </p>
        </div>
      </div>
    </Link>
  )
}