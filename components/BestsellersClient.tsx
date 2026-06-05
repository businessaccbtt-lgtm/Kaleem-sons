"use client"
import { useState } from "react"
import Image from "next/image"
import { useSession } from "next-auth/react"
import { useCart } from "@/context/CartContext"
import type { Product } from "@/lib/products"
import ProductModal from "@/components/ProductModal"

function BestsellerCard({ product, onClick }: { product: Product; onClick: () => void }) {
  const [hovered, setHovered] = useState(false)
  return (
    <div onClick={onClick} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} style={{ borderRadius: 0, overflow: "hidden", cursor: "pointer", position: "relative", aspectRatio: "3/4", boxShadow: hovered ? "0 20px 40px -10px rgba(0,0,0,0.22)" : "0 4px 16px -4px rgba(0,0,0,0.12)", transform: hovered ? "translateY(-4px)" : "translateY(0)", transition: "all 0.25s cubic-bezier(0.34,1.2,0.64,1)", WebkitTapHighlightColor: "transparent" }}>
      <Image src={product.img} alt={product.name} fill style={{ objectFit: "cover", transform: hovered ? "scale(1.06)" : "scale(1)", transition: "transform 0.4s ease" }} />
      <div style={{ position: "absolute", top: 10, left: 10, background: "#111", color: "#fff", fontSize: "0.65rem", fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase", padding: "4px 10px", borderRadius: "20px", zIndex: 1 }}>
        Best Seller
      </div>
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "2.5rem 0.8rem 0.8rem", background: "linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 100%)", display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: "4px" }}>
        <span style={{ color: "#fff", fontSize: "0.7rem", fontWeight: 500, maxWidth: "62%", lineHeight: 1.3, textShadow: "0 1px 4px rgba(0,0,0,0.5)" }}>{product.name}</span>
        <span style={{ background: "rgba(255,255,255,0.95)", color: "#111", fontSize: "0.7rem", fontWeight: 700, borderRadius: "20px", padding: "3px 9px", flexShrink: 0 }}>PKR {product.price.toLocaleString()}</span>
      </div>
      <div style={{ position: "absolute", top: "50%", left: "50%", transform: `translate(-50%, -50%) scale(${hovered ? 1 : 0.85})`, opacity: hovered ? 1 : 0, background: "rgba(255,255,255,0.92)", color: "#111", fontSize: "0.63rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "1.5px", padding: "7px 18px", borderRadius: "30px", transition: "all 0.2s ease", pointerEvents: "none", backdropFilter: "blur(4px)" }}>Quick View</div>
    </div>
  )
}

export default function BestsellersClient({ products }: { products: Product[] }) {
  const [activeProduct, setActiveProduct] = useState<Product | null>(null)

  return (
    <>
      <style>{`
        .bs-section { padding: 64px 24px; background: #ffffff; }
        .bs-heading { font-family: 'Playfair Display', serif; font-size: clamp(1.6rem, 3.5vw, 3.2rem); letter-spacing: -0.01em; line-height: 1.2; text-align: center; margin-bottom: 32px; font-weight: 400; }
        .bs-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px; max-width: 1280px; margin: 0 auto; }
        @media (max-width: 900px) { .bs-section { padding: 48px 16px; } .bs-grid { grid-template-columns: repeat(2, 1fr); gap: 16px; } }
        @media (max-width: 480px) { .bs-section { padding: 40px 16px; } .bs-grid { grid-template-columns: repeat(2, 1fr); gap: 12px; } }
        @media (min-width: 1000px) { .bs-section { padding: 80px 24px; } .bs-heading { margin-bottom: 48px; } }
      `}</style>
      <section className="bs-section">
        <h2 className="bs-heading">Our Bestsellers</h2>
        <div className="bs-grid">
          {products.map(p => (
            <BestsellerCard key={p.id} product={p} onClick={() => setActiveProduct(p)} />
          ))}
        </div>
      </section>
      {activeProduct && <ProductModal product={activeProduct} onClose={() => setActiveProduct(null)} />}
    </>
  )
}