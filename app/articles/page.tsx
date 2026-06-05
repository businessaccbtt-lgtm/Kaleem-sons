import { supabase } from "@/lib/supabase"
import Link from "next/link"

export const revalidate = 60

export default async function ArticlesPage() {
  const { data: articles } = await supabase
    .from("articles")
    .select("id, title, slug, excerpt, cover_image, published_at")
    .order("published_at", { ascending: false })

  return (
    <div style={{ minHeight: "100vh", background: "#f9f9f9", padding: "2rem", paddingTop: "6rem" }}>
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "2.2rem", fontWeight: 700, color: "#111", marginBottom: "0.5rem" }}>
          Articles
        </h1>
        <p style={{ color: "#999", fontSize: "0.9rem", marginBottom: "2.5rem" }}>Tips, guides and insights from Kaleem & Sons</p>

        {!articles?.length ? (
          <p style={{ color: "#bbb", textAlign: "center", padding: "3rem" }}>No articles yet.</p>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1.5rem" }}>
            {articles.map(a => (
              <Link key={a.id} href={`/articles/${a.slug}`} style={{ textDecoration: "none" }}>
                <div style={{
                  background: "#fff", borderRadius: "14px", overflow: "hidden",
                  boxShadow: "0 2px 12px rgba(0,0,0,0.07)",
                  transition: "transform 0.2s, box-shadow 0.2s",
                }}
                  onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.transform = "translateY(-3px)"; (e.currentTarget as HTMLDivElement).style.boxShadow = "0 8px 24px rgba(0,0,0,0.12)" }}
                  onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLDivElement).style.boxShadow = "0 2px 12px rgba(0,0,0,0.07)" }}
                >
                  {a.cover_image && (
                    <img src={a.cover_image} alt={a.title} style={{ width: "100%", height: "180px", objectFit: "cover" }} />
                  )}
                  <div style={{ padding: "1.25rem" }}>
                    <p style={{ fontSize: "0.72rem", color: "#bbb", margin: "0 0 0.5rem", textTransform: "uppercase", letterSpacing: "1px" }}>
                      {new Date(a.published_at).toLocaleDateString("en-PK", { day: "numeric", month: "short", year: "numeric" })}
                    </p>
                    <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.05rem", fontWeight: 700, color: "#111", margin: "0 0 0.5rem", lineHeight: 1.4 }}>
                      {a.title}
                    </h2>
                    {a.excerpt && (
                      <p style={{ fontSize: "0.82rem", color: "#888", margin: 0, lineHeight: 1.6, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                        {a.excerpt}
                      </p>
                    )}
                    <p style={{ fontSize: "0.78rem", fontWeight: 700, color: "#111", margin: "0.85rem 0 0", letterSpacing: "0.5px" }}>
                      Read More →
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}