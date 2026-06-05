"use client"
import { useState } from "react"
import type { Product } from "@/lib/products"
import ProductModal from "@/components/ProductModal"

function ProductCard({ product, onClick }: { product: Product; onClick: () => void }) {
  const [hovered, setHovered] = useState(false)
  return (
    <div onClick={onClick} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} style={{ borderRadius: "0", overflow: "hidden", cursor: "pointer", position: "relative", aspectRatio: "3/4", boxShadow: hovered ? "0 20px 40px -10px rgba(0,0,0,0.22)" : "0 4px 16px -4px rgba(0,0,0,0.12)", transform: hovered ? "translateY(-4px)" : "translateY(0)", transition: "all 0.25s cubic-bezier(0.34,1.2,0.64,1)", WebkitTapHighlightColor: "transparent" }}>
      <img src={product.img} alt={product.name} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transform: hovered ? "scale(1.06)" : "scale(1)", transition: "transform 0.4s ease" }} />
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "2.5rem 0.8rem 0.8rem", background: "linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 100%)", display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: "4px" }}>
        <span style={{ color: "#fff", fontSize: "0.7rem", fontWeight: 500, maxWidth: "62%", lineHeight: 1.3, textShadow: "0 1px 4px rgba(0,0,0,0.5)" }}>{product.name}</span>
        <span style={{ background: "rgba(255,255,255,0.95)", color: "#111", fontSize: "0.7rem", fontWeight: 700, borderRadius: "20px", padding: "3px 9px", flexShrink: 0 }}>PKR {product.price.toLocaleString()}</span>
      </div>
      <div style={{ position: "absolute", top: "50%", left: "50%", transform: `translate(-50%, -50%) scale(${hovered ? 1 : 0.85})`, opacity: hovered ? 1 : 0, background: "rgba(255,255,255,0.92)", color: "#111", fontSize: "0.63rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "1.5px", padding: "7px 18px", borderRadius: "30px", transition: "all 0.2s ease", pointerEvents: "none", backdropFilter: "blur(4px)" }}>Quick View</div>
    </div>
  )
}

interface Props {
  products: Product[]
  title: string
  subtitle: string
  category: string
}

export default function ProductsPageClient({ products, title, subtitle }: Props) {
  const [activeProduct, setActiveProduct] = useState<Product | null>(null)

  return (
    <>
      <style>{`
        .ts-section { padding: 100px 150px 80px; background: #fff; }
        .ts-header { text-align: center; margin-bottom: 60px; }
        .ts-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; max-width: 1280px; margin: 0 auto; }
        @media (max-width: 900px) { .ts-section { padding: 80px 66px 60px; } .ts-grid { grid-template-columns: repeat(2, 1fr); gap: 16px; } }
        @media (max-width: 480px) { .ts-section { padding: 70px 42px 50px; } .ts-grid { grid-template-columns: repeat(1, 1fr); gap: 12px; } }
      `}</style>

      <main className="ts-section">
        <div className="ts-header">
          <p style={{ fontSize: "0.7rem", letterSpacing: "4px", color: "#999", textTransform: "uppercase", marginBottom: "12px" }}>Collection</p>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2.2rem, 5vw, 3.5rem)", fontWeight: 400, letterSpacing: "-0.03em", marginBottom: "14px", lineHeight: 1.1 }}>{title}</h1>
          <p style={{ color: "#888", fontSize: "0.9rem", letterSpacing: "0.5px" }}>{subtitle}</p>
        </div>

        {products.length === 0 ? (
          <div style={{ textAlign: "center", padding: "4rem", color: "#999", fontSize: "0.85rem" }}>No products found.</div>
        ) : (
          <div className="ts-grid">
            {products.map(p => (
              <ProductCard key={p.id} product={p} onClick={() => setActiveProduct(p)} />
            ))}
          </div>
        )}
      </main>

      {activeProduct && <ProductModal product={activeProduct} onClose={() => setActiveProduct(null)} />}
    </>
  )
}