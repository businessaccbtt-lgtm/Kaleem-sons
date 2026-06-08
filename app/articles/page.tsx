import { supabase } from "@/lib/supabase"
import ArticleCard from "./ArticleCard"

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
              <ArticleCard
                key={a.id}
                id={a.id}
                slug={a.slug}
                title={a.title}
                excerpt={a.excerpt}
                cover_image={a.cover_image}
                published_at={a.published_at}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}