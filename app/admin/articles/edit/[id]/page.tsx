"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Image from "@tiptap/extension-image"
import Link from "@tiptap/extension-link"
import Placeholder from "@tiptap/extension-placeholder"
import { supabase } from "@/lib/supabase"

export default function EditArticle() {
  const router = useRouter()
  const { id } = useParams()
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState({ title: "", slug: "", excerpt: "", cover_image: "" })

  const editor = useEditor({
    extensions: [
      StarterKit,
      Image,
      Link.configure({ openOnClick: false }),
      Placeholder.configure({ placeholder: "Write your article here..." }),
    ],
    content: "",
  })

  useEffect(() => { fetchArticle() }, [])

  async function fetchArticle() {
    const { data } = await supabase.from("articles").select("*").eq("id", id).single()
    if (data) {
      setForm({ title: data.title, slug: data.slug, excerpt: data.excerpt || "", cover_image: data.cover_image || "" })
      editor?.commands.setContent(data.content)
    }
    setLoading(false)
  }

  // Re-set content once editor is ready and data loaded
  useEffect(() => {
    if (editor && !loading) {
      supabase.from("articles").select("content").eq("id", id).single().then(({ data }) => {
        if (data) editor.commands.setContent(data.content)
      })
    }
  }, [editor])

  async function handleCoverUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    const { createClient } = await import("@supabase/supabase-js")
    const adminClient = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_SERVICE_KEY!
    )
    const filename = `articles/${Date.now()}-${file.name.toLowerCase().replace(/\s+/g, "-")}`
    const { error } = await adminClient.storage.from("products").upload(filename, file, { upsert: true })
    if (error) { alert("Upload failed: " + error.message); setUploading(false); return }
    const { data } = adminClient.storage.from("products").getPublicUrl(filename)
    setForm(f => ({ ...f, cover_image: data.publicUrl }))
    setUploading(false)
  }

  async function handleSave() {
    if (!form.title || !form.slug || !editor?.getHTML()) {
      alert("Title, slug and content are required.")
      return
    }
    setSaving(true)
    const { error } = await supabase.from("articles").update({
      title: form.title,
      slug: form.slug,
      excerpt: form.excerpt,
      cover_image: form.cover_image,
      content: editor.getHTML(),
    }).eq("id", id)
    if (error) { alert("Error: " + error.message); setSaving(false); return }
    router.push("/admin/articles")
  }

  if (loading) return <div style={{ padding: "3rem", textAlign: "center", color: "#999" }}>Loading...</div>

  return (
    <div style={{ minHeight: "100vh", background: "#f9f9f9", padding: "2rem", paddingTop: "6rem" }}>
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        <button onClick={() => router.push("/admin/articles")}
          style={{ background: "none", border: "none", color: "#999", cursor: "pointer", fontSize: "0.85rem", marginBottom: "1rem", padding: 0 }}>
          ← Back
        </button>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.8rem", fontWeight: 700, color: "#111", marginBottom: "1.5rem" }}>
          Edit Article
        </h1>

        <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          <div style={cardStyle}>
            <label style={labelStyle}>Cover Image</label>
            <input type="file" accept="image/*" onChange={handleCoverUpload} style={{ fontSize: "0.85rem" }} />
            {uploading && <p style={{ color: "#999", fontSize: "0.8rem", marginTop: "0.5rem" }}>Uploading...</p>}
            {form.cover_image && (
              <img src={form.cover_image} alt="cover" style={{ marginTop: "0.75rem", width: "100%", maxHeight: "220px", objectFit: "cover", borderRadius: "8px" }} />
            )}
          </div>

          <div style={{ ...cardStyle, display: "flex", flexDirection: "column", gap: "1rem" }}>
            <div>
              <label style={labelStyle}>Title *</label>
              <input style={inputStyle} value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} />
            </div>
            <div>
              <label style={labelStyle}>Slug *</label>
              <input style={inputStyle} value={form.slug} onChange={e => setForm(f => ({ ...f, slug: e.target.value }))} />
              <p style={{ fontSize: "0.73rem", color: "#bbb", margin: "0.3rem 0 0" }}>yoursite.com/articles/{form.slug}</p>
            </div>
            <div>
              <label style={labelStyle}>Excerpt</label>
              <textarea style={{ ...inputStyle, height: "70px", resize: "vertical" }} value={form.excerpt}
                onChange={e => setForm(f => ({ ...f, excerpt: e.target.value }))} />
            </div>
          </div>

          <div style={cardStyle}>
            <label style={labelStyle}>Content *</label>
            <EditorToolbar editor={editor} />
            <div style={{
              border: "1.5px solid #e5e5e5", borderRadius: "10px",
              minHeight: "400px", padding: "1rem",
              background: "#fafafa", fontSize: "0.9rem", lineHeight: 1.7, cursor: "text",
            }}
              onClick={() => editor?.commands.focus()}
            >
              <EditorContent editor={editor} />
            </div>
          </div>

          <button onClick={handleSave} disabled={saving || uploading}
            style={{ padding: "0.9rem", background: "#111", color: "#fff", border: "none", borderRadius: "12px", fontSize: "0.85rem", fontWeight: 700, cursor: "pointer", letterSpacing: "1px", opacity: saving ? 0.7 : 1 }}>
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
      <style>{tiptapStyles}</style>
    </div>
  )
}

function EditorToolbar({ editor }: { editor: ReturnType<typeof useEditor> }) {
  if (!editor) return null
  const btn = (active: boolean, onClick: () => void, label: string) => (
    <button type="button" onClick={onClick}
      style={{ padding: "0.35rem 0.65rem", borderRadius: "6px", border: "none", background: active ? "#111" : "#f0f0f0", color: active ? "#fff" : "#555", fontSize: "0.78rem", fontWeight: 600, cursor: "pointer" }}>
      {label}
    </button>
  )
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem", marginBottom: "0.75rem" }}>
      {btn(editor.isActive("bold"), () => editor.chain().focus().toggleBold().run(), "B")}
      {btn(editor.isActive("italic"), () => editor.chain().focus().toggleItalic().run(), "I")}
      {btn(editor.isActive("strike"), () => editor.chain().focus().toggleStrike().run(), "S̶")}
      <div style={{ width: "1px", background: "#ddd", margin: "0 0.25rem" }} />
      {btn(editor.isActive("heading", { level: 2 }), () => editor.chain().focus().toggleHeading({ level: 2 }).run(), "H2")}
      {btn(editor.isActive("heading", { level: 3 }), () => editor.chain().focus().toggleHeading({ level: 3 }).run(), "H3")}
      <div style={{ width: "1px", background: "#ddd", margin: "0 0.25rem" }} />
      {btn(editor.isActive("bulletList"), () => editor.chain().focus().toggleBulletList().run(), "• List")}
      {btn(editor.isActive("orderedList"), () => editor.chain().focus().toggleOrderedList().run(), "1. List")}
      {btn(editor.isActive("blockquote"), () => editor.chain().focus().toggleBlockquote().run(), "❝ Quote")}
      {btn(editor.isActive("codeBlock"), () => editor.chain().focus().toggleCodeBlock().run(), "<> Code")}
      <div style={{ width: "1px", background: "#ddd", margin: "0 0.25rem" }} />
      <button type="button"
        onClick={() => { const url = prompt("Enter URL:"); if (url) editor.chain().focus().setLink({ href: url }).run() }}
        style={{ padding: "0.35rem 0.65rem", borderRadius: "6px", border: "none", background: editor.isActive("link") ? "#111" : "#f0f0f0", color: editor.isActive("link") ? "#fff" : "#555", fontSize: "0.78rem", fontWeight: 600, cursor: "pointer" }}>
        🔗 Link
      </button>
      {btn(false, () => editor.chain().focus().undo().run(), "↩ Undo")}
      {btn(false, () => editor.chain().focus().redo().run(), "↪ Redo")}
    </div>
  )
}

const cardStyle: React.CSSProperties = { background: "#fff", borderRadius: "12px", padding: "1.25rem", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }
const labelStyle: React.CSSProperties = { fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "1px", color: "#999", display: "block", marginBottom: "0.4rem" }
const inputStyle: React.CSSProperties = { width: "100%", padding: "0.75rem 1rem", borderRadius: "10px", border: "1.5px solid #e5e5e5", fontSize: "0.88rem", outline: "none", boxSizing: "border-box", background: "#fafafa" }

const tiptapStyles = `
  .tiptap { outline: none; min-height: 360px; }
  .tiptap h2 { font-size: 1.4rem; font-weight: 700; margin: 1.2rem 0 0.5rem; font-family: 'Playfair Display', serif; }
  .tiptap h3 { font-size: 1.15rem; font-weight: 700; margin: 1rem 0 0.4rem; }
  .tiptap p { margin: 0.6rem 0; }
  .tiptap ul, .tiptap ol { padding-left: 1.5rem; margin: 0.5rem 0; }
  .tiptap li { margin: 0.25rem 0; }
  .tiptap blockquote { border-left: 3px solid #111; padding-left: 1rem; margin: 1rem 0; color: #555; font-style: italic; }
  .tiptap pre { background: #1a1a1a; color: #f0f0f0; padding: 1rem; border-radius: 8px; font-size: 0.85rem; overflow-x: auto; margin: 0.75rem 0; }
  .tiptap code { background: #f0f0f0; padding: 0.15rem 0.4rem; border-radius: 4px; font-size: 0.85rem; }
  .tiptap pre code { background: none; padding: 0; }
  .tiptap a { color: #111; text-decoration: underline; }
  .tiptap img { max-width: 100%; border-radius: 8px; margin: 0.5rem 0; }
  .tiptap p.is-editor-empty:first-child::before { color: #aaa; content: attr(data-placeholder); float: left; height: 0; pointer-events: none; }
`