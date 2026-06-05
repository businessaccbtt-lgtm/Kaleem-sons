"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"

type Article = {
  id: string
  title: string
  slug: string
  excerpt: string
  published_at: string
}

export default function AdminArticles() {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const [deleting, setDeleting] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => { fetchArticles() }, [])

  async function fetchArticles() {
    const { data } = await supabase
      .from("articles")
      .select("id, title, slug, excerpt, published_at")
      .order("published_at", { ascending: false })
    setArticles(data || [])
    setLoading(false)
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this article?")) return
    setDeleting(id)
    await supabase.from("articles").delete().eq("id", id)
    setArticles(prev => prev.filter(a => a.id !== id))
    setDeleting(null)
  }

  async function handleLogout() {
    await fetch("/api/admin-logout", { method: "POST" })
    router.push("/admin")
  }

  return (
    <div style={{ minHeight: "100vh", background: "#f9f9f9", padding: "2rem", paddingTop: "6rem" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem", flexWrap: "wrap", gap: "1rem" }}>
          <div>
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.8rem", fontWeight: 700, color: "#111", margin: 0 }}>Articles</h1>
            <p style={{ color: "#999", fontSize: "0.85rem", margin: 0 }}>{articles.length} total articles</p>
          </div>
          <div style={{ display: "flex", gap: "0.75rem" }}>
            <button onClick={() => router.push("/admin/products")}
              style={{ padding: "0.7rem 1.4rem", background: "#fff", color: "#111", border: "1.5px solid #e5e5e5", borderRadius: "10px", fontSize: "0.82rem", fontWeight: 700, cursor: "pointer" }}>
              Products
            </button>
            <button onClick={() => router.push("/admin/articles/new")}
              style={{ padding: "0.7rem 1.4rem", background: "#111", color: "#fff", border: "none", borderRadius: "10px", fontSize: "0.82rem", fontWeight: 700, cursor: "pointer", letterSpacing: "1px" }}>
              + New Article
            </button>
            <button onClick={handleLogout}
              style={{ padding: "0.7rem 1.4rem", background: "#fff", color: "#111", border: "1.5px solid #e5e5e5", borderRadius: "10px", fontSize: "0.82rem", fontWeight: 700, cursor: "pointer" }}>
              Logout
            </button>
          </div>
        </div>

        {loading ? (
          <p style={{ color: "#999", textAlign: "center", padding: "3rem" }}>Loading articles...</p>
        ) : articles.length === 0 ? (
          <p style={{ color: "#999", textAlign: "center", padding: "3rem" }}>No articles yet. Create your first one!</p>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {articles.map(a => (
              <div key={a.id} style={{
                background: "#fff", borderRadius: "12px", padding: "1rem 1.25rem",
                display: "flex", alignItems: "center", gap: "1rem",
                boxShadow: "0 2px 8px rgba(0,0,0,0.05)", flexWrap: "wrap",
              }}>
                <div style={{ flex: 1, minWidth: "150px" }}>
                  <p style={{ fontWeight: 700, fontSize: "0.9rem", color: "#111", margin: 0 }}>{a.title}</p>
                  <p style={{ fontSize: "0.75rem", color: "#999", margin: 0 }}>
                    /{a.slug} · {new Date(a.published_at).toLocaleDateString("en-PK", { day: "numeric", month: "short", year: "numeric" })}
                  </p>
                  {a.excerpt && <p style={{ fontSize: "0.78rem", color: "#aaa", margin: "0.25rem 0 0", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: "500px" }}>{a.excerpt}</p>}
                </div>
                <div style={{ display: "flex", gap: "0.5rem", flexShrink: 0 }}>
                  <button onClick={() => window.open(`/articles/${a.slug}`, "_blank")}
                    style={{ padding: "0.5rem 1rem", background: "#f5f5f5", border: "none", borderRadius: "8px", fontSize: "0.78rem", fontWeight: 600, cursor: "pointer", color: "#111" }}>
                    View
                  </button>
                  <button onClick={() => router.push(`/admin/articles/edit/${a.id}`)}
                    style={{ padding: "0.5rem 1rem", background: "#f5f5f5", border: "none", borderRadius: "8px", fontSize: "0.78rem", fontWeight: 600, cursor: "pointer", color: "#111" }}>
                    Edit
                  </button>
                  <button onClick={() => handleDelete(a.id)} disabled={deleting === a.id}
                    style={{ padding: "0.5rem 1rem", background: "#fff0f0", border: "none", borderRadius: "8px", fontSize: "0.78rem", fontWeight: 600, cursor: "pointer", color: "#cc2200" }}>
                    {deleting === a.id ? "..." : "Delete"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}