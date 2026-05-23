"use client"
import { supabase } from "@/lib/supabase"
import { useState, useEffect } from "react"
import Image from "next/image"
import { useSession } from "next-auth/react"
import { useCart } from "@/context/CartContext"


type Product = {
  id: string
  name: string
  category: string
  price: number
  img: string
  description: string
  sizes: string[]
  colors: string[]
}

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640)
    check()
    window.addEventListener("resize", check)
    return () => window.removeEventListener("resize", check)
  }, [])
  return isMobile
}

function ProductModal({ product, onClose }: { product: Product; onClose: () => void }) {
  const { data: session } = useSession()
  const { addItem, setIsAuthModalOpen, setPendingItem } = useCart()
  const [selectedSize, setSelectedSize] = useState(product.sizes[0])
  const [selectedColor, setSelectedColor] = useState(product.colors[0])
  const [added, setAdded] = useState(false)
  const isMobile = useIsMobile()

  useEffect(() => {
    document.body.style.overflow = "hidden"
    return () => { document.body.style.overflow = "" }
  }, [])

  function handleAddToCart() {
    const item = {
      id: product.id, name: product.name,
      price: product.price, image: product.img,
      size: selectedSize, color: selectedColor, quantity: 1,
    }
    if (!session) {
      setPendingItem(item); setIsAuthModalOpen(true); onClose(); return
    }
    addItem(item); setAdded(true)
    setTimeout(() => { setAdded(false); onClose() }, 1200)
  }

  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.55)", backdropFilter: "blur(5px)", zIndex: 9999, display: "flex", alignItems: isMobile ? "flex-end" : "center", justifyContent: "center", padding: isMobile ? 0 : "1rem", animation: "bsFadeIn 0.2s ease" }}>
      <div onClick={e => e.stopPropagation()} style={{ background: "#fff", borderRadius: isMobile ? "24px 24px 0 0" : "24px", width: "100%", maxWidth: isMobile ? "100%" : "780px", maxHeight: isMobile ? "92dvh" : "88vh", display: "flex", flexDirection: isMobile ? "column" : "row", overflow: "hidden", boxShadow: "0 32px 64px -12px rgba(0,0,0,0.35)", animation: isMobile ? "bsSlideUp 0.3s cubic-bezier(0.34,1.1,0.64,1)" : "bsPopIn 0.28s cubic-bezier(0.34,1.2,0.64,1)", position: "relative" }}>

        <button onClick={onClose} style={{ position: "absolute", top: 12, right: 14, zIndex: 10, background: "rgba(255,255,255,0.92)", border: "none", borderRadius: "50%", width: 34, height: 34, padding: 0, lineHeight: 1, boxSizing: "border-box", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 2px 8px rgba(0,0,0,0.18)" }}>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M1 1L11 11M11 1L1 11" stroke="#111" strokeWidth="2" strokeLinecap="round"/></svg>
        </button>

        <div style={{ flexShrink: 0, width: isMobile ? "100%" : "46%", height: isMobile ? "min(65vw, 320px)" : "auto", overflow: "hidden" }}>
          <img src={product.img} alt={product.name} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
        </div>

        <div style={{ flex: 1, padding: isMobile ? "1.1rem 1.2rem 1.8rem" : "2rem 1.8rem", display: "flex", flexDirection: "column", gap: isMobile ? "0.75rem" : "1rem", overflowY: "auto" }}>
          <div>
            <p style={{ fontSize: "0.62rem", textTransform: "uppercase", letterSpacing: "2px", color: "#aaa", marginBottom: "0.25rem" }}>{product.category}</p>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: isMobile ? "1.25rem" : "1.55rem", fontWeight: 700, lineHeight: 1.2, color: "#111", marginBottom: "0.35rem" }}>{product.name}</h2>
            <p style={{ color: "#777", fontSize: "0.78rem", lineHeight: 1.6 }}>{product.description}</p>
          </div>

          <div style={{ fontSize: isMobile ? "1.35rem" : "1.6rem", fontWeight: 800, color: "#111", letterSpacing: "-0.5px" }}>
            PKR {product.price.toLocaleString()}
          </div>

          <div>
            <p style={{ fontSize: "0.65rem", textTransform: "uppercase", letterSpacing: "1.5px", color: "#999", marginBottom: "0.4rem" }}>Colour</p>
            <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
              {product.colors.map(c => (
                <div key={c} onClick={() => setSelectedColor(c)} style={{ width: 26, height: 26, minWidth: 26, minHeight: 26, borderRadius: "50%", background: c, border: selectedColor === c ? "3px solid #111" : "2px solid transparent", outline: selectedColor === c ? "2px solid #fff" : "none", outlineOffset: "-4px", cursor: "pointer", transition: "all 0.15s", boxShadow: "0 1px 4px rgba(0,0,0,0.2)", flexShrink: 0 }} />
              ))}
            </div>
          </div>

          <div>
            <p style={{ fontSize: "0.65rem", textTransform: "uppercase", letterSpacing: "1.5px", color: "#999", marginBottom: "0.4rem" }}>Size</p>
            <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
              {product.sizes.map(size => (
                <button key={size} onClick={() => setSelectedSize(size)} style={{ width: isMobile ? 36 : 42, height: isMobile ? 36 : 42, borderRadius: "10px", border: selectedSize === size ? "2px solid #111" : "1.5px solid #ddd", background: selectedSize === size ? "#111" : "#fafafa", color: selectedSize === size ? "#fff" : "#555", fontSize: "0.7rem", fontWeight: 600, cursor: "pointer", transition: "all 0.15s", padding: 0 }}>{size}</button>
              ))}
            </div>
          </div>

          <button onClick={handleAddToCart} style={{ marginTop: "auto", width: "100%", padding: isMobile ? "0.78rem" : "0.88rem", borderRadius: "50px", border: "none", background: added ? "#2a7a2a" : "#111", color: "#fff", fontSize: "0.73rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "1.5px", cursor: "pointer", transition: "background 0.2s ease" }}>
            {added ? "✓ Added to Cart!" : "Add to Cart"}
          </button>
        </div>
      </div>
      <style>{`
        @keyframes bsFadeIn  { from{opacity:0} to{opacity:1} }
        @keyframes bsSlideUp { from{opacity:0;transform:translateY(50px)} to{opacity:1;transform:translateY(0)} }
        @keyframes bsPopIn   { from{opacity:0;transform:scale(0.96) translateY(10px)} to{opacity:1;transform:scale(1) translateY(0)} }
      `}</style>
    </div>
  )
}

function BestsellerCard({ product, onClick }: { product: Product; onClick: () => void }) {
  const [hovered, setHovered] = useState(false)
  return (
    <div onClick={onClick} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} style={{ borderRadius: 0, overflow: "hidden", cursor: "pointer", position: "relative", aspectRatio: "3/4", boxShadow: hovered ? "0 20px 40px -10px rgba(0,0,0,0.22)" : "0 4px 16px -4px rgba(0,0,0,0.12)", transform: hovered ? "translateY(-4px)" : "translateY(0)", transition: "all 0.25s cubic-bezier(0.34,1.2,0.64,1)", WebkitTapHighlightColor: "transparent" }}>
      <Image src={product.img} alt={product.name} fill style={{ objectFit: "cover", transform: hovered ? "scale(1.06)" : "scale(1)", transition: "transform 0.4s ease" }} />

      {/* ✅ Best Seller badge on every card */}
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

export default function Bestsellers() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [activeProduct, setActiveProduct] = useState<Product | null>(null)
  

  useEffect(() => {
    async function fetchProducts() {
      // ✅ fetch all then pick 4 random ones
      const { data, error } = await supabase
        .from("products")
        .select("*")
      if (error) { console.error(error); setLoading(false); return }
      const shuffled = (data || []).sort(() => Math.random() - 0.5)
      setProducts(shuffled.slice(0, 4))
      setLoading(false)
    }
    fetchProducts()
  }, [])

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
        {loading ? (
          <div style={{ textAlign: "center", padding: "4rem", color: "#999", fontSize: "0.85rem" }}>Loading...</div>
        ) : (
          <div className="bs-grid">
            {products.map(p => (
              <BestsellerCard key={p.id} product={p} onClick={() => setActiveProduct(p)} />
            ))}
          </div>
        )}
      </section>

      {activeProduct && (
        <ProductModal product={activeProduct} onClose={() => setActiveProduct(null)} />
      )}
    </>
  )
}