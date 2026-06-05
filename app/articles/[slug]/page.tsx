import { supabase } from "@/lib/supabase"
import { notFound } from "next/navigation"
import Link from "next/link"

export const revalidate = 60

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const { data } = await supabase.from("articles").select("title, excerpt").eq("slug", params.slug).single()
  if (!data) return {}
  return { title: data.title, description: data.excerpt || "" }
}

export default async function ArticlePage({ params }: { params: { slug: string } }) {
  const { data: article } = await supabase
    .from("articles")
    .select("*")
    .eq("slug", params.slug)
    .single()

  if (!article) notFound()

  return (
    <div style={{ minHeight: "100vh", background: "#f9f9f9", paddingTop: "6rem", paddingBottom: "4rem" }}>
      {article.cover_image && (
        <div style={{ width: "100%", maxHeight: "420px", overflow: "hidden", marginBottom: "2.5rem" }}>
          <img src={article.cover_image} alt={article.title} style={{ width: "100%", height: "420px", objectFit: "cover" }} />
        </div>
      )}

      <div style={{ maxWidth: "720px", margin: "0 auto", padding: "0 1.5rem" }}>
        <Link href="/articles" style={{ fontSize: "0.85rem", color: "#999", textDecoration: "none", display: "inline-block", marginBottom: "1.5rem" }}>
          ← All Articles
        </Link>

        <p style={{ fontSize: "0.72rem", color: "#bbb", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "0.75rem" }}>
          {new Date(article.published_at).toLocaleDateString("en-PK", { day: "numeric", month: "long", year: "numeric" })}
        </p>

        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.8rem, 4vw, 2.6rem)", fontWeight: 700, color: "#111", lineHeight: 1.25, marginBottom: "2rem" }}>
          {article.title}
        </h1>

        <div
          style={{ fontSize: "0.95rem", lineHeight: 1.8, color: "#333" }}
          dangerouslySetInnerHTML={{ __html: article.content }}
        />
      </div>

      <style>{`
        article-content h2 { font-family: 'Playfair Display', serif; }
        div h2 { font-family: 'Playfair Display', serif; font-size: 1.5rem; font-weight: 700; margin: 2rem 0 0.75rem; color: #111; }
        div h3 { font-size: 1.2rem; font-weight: 700; margin: 1.5rem 0 0.5rem; color: #111; }
        div p { margin: 0.75rem 0; }
        div ul, div ol { padding-left: 1.5rem; margin: 0.75rem 0; }
        div li { margin: 0.3rem 0; }
        div blockquote { border-left: 3px solid #111; padding-left: 1.25rem; margin: 1.5rem 0; color: #666; font-style: italic; }
        div pre { background: #1a1a1a; color: #f0f0f0; padding: 1.25rem; border-radius: 10px; font-size: 0.85rem; overflow-x: auto; margin: 1rem 0; }
        div code { background: #f0f0f0; padding: 0.15rem 0.4rem; border-radius: 4px; font-size: 0.85rem; }
        div pre code { background: none; padding: 0; }
        div a { color: #111; text-decoration: underline; }
        div img { max-width: 100%; border-radius: 10px; margin: 1rem 0; }
      `}</style>
    </div>
  )
}