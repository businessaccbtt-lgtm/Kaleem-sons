"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"

type Product = {
  id: string
  name: string
  category: string
  price: number
  img: string
}

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [deleting, setDeleting] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    if (localStorage.getItem("admin_auth") !== "true") {
      router.push("/admin")
      return
    }
    fetchProducts()
  }, [])

  async function fetchProducts() {
    const { data } = await supabase
      .from("products")
      .select("id, name, category, price, img")
      .order("category", { ascending: true })
    setProducts(data || [])
    setLoading(false)
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this product?")) return
    setDeleting(id)
    await supabase.from("products").delete().eq("id", id)
    setProducts(prev => prev.filter(p => p.id !== id))
    setDeleting(null)
  }

  function handleLogout() {
    localStorage.removeItem("admin_auth")
    router.push("/admin")
  }

  return (
   <div style={{ minHeight: "100vh", background: "#f9f9f9", padding: "2rem", paddingTop: "6rem" }}>
      {/* Header */}
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem", flexWrap: "wrap", gap: "1rem" }}>
          <div>
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.8rem", fontWeight: 700, color: "#111", margin: 0 }}>
              Products
            </h1>
            <p style={{ color: "#999", fontSize: "0.85rem", margin: 0 }}>{products.length} total products</p>
          </div>
          <div style={{ display: "flex", gap: "0.75rem" }}>
            <button
              onClick={() => router.push("/admin/products/add")}
              style={{ padding: "0.7rem 1.4rem", background: "#111", color: "#fff", border: "none", borderRadius: "10px", fontSize: "0.82rem", fontWeight: 700, cursor: "pointer", letterSpacing: "1px" }}
            >
              + Add Product
            </button>
            <button
              onClick={handleLogout}
              style={{ padding: "0.7rem 1.4rem", background: "#fff", color: "#111", border: "1.5px solid #e5e5e5", borderRadius: "10px", fontSize: "0.82rem", fontWeight: 700, cursor: "pointer" }}
            >
              Logout
            </button>
          </div>
        </div>

        {loading ? (
          <p style={{ color: "#999", textAlign: "center", padding: "3rem" }}>Loading products...</p>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {products.map(p => (
              <div key={p.id} style={{
                background: "#fff", borderRadius: "12px",
                padding: "1rem 1.25rem",
                display: "flex", alignItems: "center", gap: "1rem",
                boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                flexWrap: "wrap",
              }}>
                {/* Image */}
                <img
                  src={p.img} alt={p.name}
                  style={{ width: 56, height: 56, borderRadius: "8px", objectFit: "cover", flexShrink: 0 }}
                />

                {/* Info */}
                <div style={{ flex: 1, minWidth: "150px" }}>
                  <p style={{ fontWeight: 700, fontSize: "0.9rem", color: "#111", margin: 0 }}>{p.name}</p>
                  <p style={{ fontSize: "0.75rem", color: "#999", margin: 0 }}>{p.category}</p>
                </div>

                {/* Price */}
                <p style={{ fontWeight: 800, fontSize: "0.95rem", color: "#111", margin: 0, flexShrink: 0 }}>
                  PKR {p.price.toLocaleString()}
                </p>

                {/* Actions */}
                <div style={{ display: "flex", gap: "0.5rem", flexShrink: 0 }}>
                  <button
                    onClick={() => router.push(`/admin/products/edit/${p.id}`)}
                    style={{ padding: "0.5rem 1rem", background: "#f5f5f5", border: "none", borderRadius: "8px", fontSize: "0.78rem", fontWeight: 600, cursor: "pointer", color: "#111" }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(p.id)}
                    disabled={deleting === p.id}
                    style={{ padding: "0.5rem 1rem", background: "#fff0f0", border: "none", borderRadius: "8px", fontSize: "0.78rem", fontWeight: 600, cursor: "pointer", color: "#cc2200" }}
                  >
                    {deleting === p.id ? "..." : "Delete"}
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