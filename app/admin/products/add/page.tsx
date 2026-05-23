"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"

const CATEGORIES = ["T-Shirts", "Hoodies", "Tracksuits", "Jiu-Jitsu", "Karate"]
const ALL_SIZES = ["XS", "S", "M", "L", "XL", "XXL"]

export default function AddProduct() {
  const router = useRouter()
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [form, setForm] = useState({
    id: "", name: "", category: "T-Shirts",
    price: "", description: "",
    img: "", sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["#111111"],
  })

  useEffect(() => {
    if (localStorage.getItem("admin_auth") !== "true") router.push("/admin")
  }, [])

 async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
  const file = e.target.files?.[0]
  if (!file) return
  setUploading(true)

  // Use service role client for upload
  const { createClient } = await import("@supabase/supabase-js")
  const adminClient = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_SERVICE_KEY!
  )

  const filename = file.name.toLowerCase().replace(/\s+/g, "-")
  const { error } = await adminClient.storage
    .from("products")
    .upload(filename, file, { upsert: true })

  if (error) { 
    alert("Upload failed: " + error.message)
    setUploading(false)
    return 
  }

  const { data } = adminClient.storage
    .from("products")
    .getPublicUrl(filename)

  setForm(f => ({ ...f, img: data.publicUrl }))
  setUploading(false)
}

  function toggleSize(size: string) {
    setForm(f => ({
      ...f,
      sizes: f.sizes.includes(size) ? f.sizes.filter(s => s !== size) : [...f.sizes, size]
    }))
  }

  function addColor() {
    setForm(f => ({ ...f, colors: [...f.colors, "#ffffff"] }))
  }

  function updateColor(index: number, value: string) {
    setForm(f => {
      const colors = [...f.colors]
      colors[index] = value
      return { ...f, colors }
    })
  }

  function removeColor(index: number) {
    setForm(f => ({ ...f, colors: f.colors.filter((_, i) => i !== index) }))
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault()
    if (!form.id || !form.name || !form.price || !form.img) {
      alert("Please fill all required fields and upload an image.")
      return
    }
    setSaving(true)
    const { error } = await supabase.from("products").insert({
      id: form.id,
      name: form.name,
      category: form.category,
      price: Number(form.price),
      description: form.description,
      img: form.img,
      sizes: form.sizes,
      colors: form.colors,
    })
    if (error) { alert("Error: " + error.message); setSaving(false); return }
    router.push("/admin/products")
  }

  return (
 <div style={{ minHeight: "100vh", background: "#f9f9f9", padding: "2rem", paddingTop: "6rem" }}>
      <div style={{ maxWidth: "600px", margin: "0 auto" }}>
        <button onClick={() => router.push("/admin/products")} style={{ background: "none", border: "none", color: "#999", cursor: "pointer", fontSize: "0.85rem", marginBottom: "1rem", padding: 0 }}>
          ← Back
        </button>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.8rem", fontWeight: 700, color: "#111", marginBottom: "1.5rem" }}>
          Add Product
        </h1>

        <form onSubmit={handleSave} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>

          {/* Image Upload */}
          <div style={{ background: "#fff", borderRadius: "12px", padding: "1.25rem", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
            <label style={labelStyle}>Product Image *</label>
            <input type="file" accept="image/*" onChange={handleImageUpload} style={{ fontSize: "0.85rem" }} />
            {uploading && <p style={{ color: "#999", fontSize: "0.8rem", marginTop: "0.5rem" }}>Uploading...</p>}
            {form.img && (
              <img src={form.img} alt="preview" style={{ marginTop: "0.75rem", width: "100%", maxHeight: "200px", objectFit: "cover", borderRadius: "8px" }} />
            )}
          </div>

          {/* Basic Info */}
          <div style={{ background: "#fff", borderRadius: "12px", padding: "1.25rem", boxShadow: "0 2px 8px rgba(0,0,0,0.05)", display: "flex", flexDirection: "column", gap: "1rem" }}>
            <div>
              <label style={labelStyle}>Product ID * (e.g. ts-9, h-9)</label>
              <input style={inputStyle} value={form.id} onChange={e => setForm(f => ({ ...f, id: e.target.value }))} placeholder="ts-9" />
            </div>
            <div>
              <label style={labelStyle}>Product Name *</label>
              <input style={inputStyle} value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="Men's Black Hoodie" />
            </div>
            <div>
              <label style={labelStyle}>Category *</label>
              <select style={inputStyle} value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))}>
                {CATEGORIES.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label style={labelStyle}>Price (PKR) *</label>
              <input style={inputStyle} type="number" value={form.price} onChange={e => setForm(f => ({ ...f, price: e.target.value }))} placeholder="5000" />
            </div>
            <div>
              <label style={labelStyle}>Description</label>
              <textarea style={{ ...inputStyle, height: "80px", resize: "vertical" }} value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} placeholder="Product description..." />
            </div>
          </div>

          {/* Sizes */}
          <div style={{ background: "#fff", borderRadius: "12px", padding: "1.25rem", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
            <label style={labelStyle}>Sizes</label>
            <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginTop: "0.5rem" }}>
              {ALL_SIZES.map(size => (
                <button
                  key={size} type="button" onClick={() => toggleSize(size)}
                  style={{
                    width: 42, height: 42, borderRadius: "10px",
                    border: form.sizes.includes(size) ? "2px solid #111" : "1.5px solid #ddd",
                    background: form.sizes.includes(size) ? "#111" : "#fafafa",
                    color: form.sizes.includes(size) ? "#fff" : "#555",
                    fontSize: "0.75rem", fontWeight: 600, cursor: "pointer",
                  }}
                >{size}</button>
              ))}
            </div>
          </div>

          {/* Colors */}
          <div style={{ background: "#fff", borderRadius: "12px", padding: "1.25rem", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
            <label style={labelStyle}>Colors</label>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", marginTop: "0.5rem" }}>
              {form.colors.map((color, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                  <input type="color" value={color} onChange={e => updateColor(i, e.target.value)}
                    style={{ width: 40, height: 40, border: "none", borderRadius: "8px", cursor: "pointer", padding: 0 }} />
                  <span style={{ fontSize: "0.85rem", color: "#555" }}>{color}</span>
                  {form.colors.length > 1 && (
                    <button type="button" onClick={() => removeColor(i)}
                      style={{ background: "none", border: "none", color: "#cc2200", cursor: "pointer", fontSize: "0.8rem" }}>
                      Remove
                    </button>
                  )}
                </div>
              ))}
              <button type="button" onClick={addColor}
                style={{ alignSelf: "flex-start", padding: "0.4rem 0.85rem", background: "#f5f5f5", border: "none", borderRadius: "8px", fontSize: "0.78rem", fontWeight: 600, cursor: "pointer", marginTop: "0.25rem" }}>
                + Add Colour
              </button>
            </div>
          </div>

          <button type="submit" disabled={saving || uploading}
            style={{ padding: "0.9rem", background: "#111", color: "#fff", border: "none", borderRadius: "12px", fontSize: "0.85rem", fontWeight: 700, cursor: "pointer", letterSpacing: "1px", opacity: saving ? 0.7 : 1 }}>
            {saving ? "Saving..." : "Save Product"}
          </button>
        </form>
      </div>
    </div>
  )
}

const labelStyle: React.CSSProperties = { fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "1px", color: "#999", display: "block", marginBottom: "0.4rem" }
const inputStyle: React.CSSProperties = { width: "100%", padding: "0.75rem 1rem", borderRadius: "10px", border: "1.5px solid #e5e5e5", fontSize: "0.88rem", outline: "none", boxSizing: "border-box", background: "#fafafa" }