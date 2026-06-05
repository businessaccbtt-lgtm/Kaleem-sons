"use client"
import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useCart } from "@/context/CartContext"
import type { Product } from "@/lib/products"

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

export default function ProductModal({ product, onClose }: { product: Product; onClose: () => void }) {
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
    <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.55)", backdropFilter: "blur(5px)", zIndex: 9999, display: "flex", alignItems: isMobile ? "flex-end" : "center", justifyContent: "center", padding: isMobile ? 0 : "1rem", animation: "pmFadeIn 0.2s ease" }}>
      <div onClick={e => e.stopPropagation()} style={{ background: "#fff", borderRadius: isMobile ? "24px 24px 0 0" : "24px", width: "100%", maxWidth: isMobile ? "100%" : "780px", maxHeight: isMobile ? "92dvh" : "88vh", display: "flex", flexDirection: isMobile ? "column" : "row", overflow: "hidden", boxShadow: "0 32px 64px -12px rgba(0,0,0,0.35)", animation: isMobile ? "pmSlideUp 0.3s cubic-bezier(0.34,1.1,0.64,1)" : "pmPopIn 0.28s cubic-bezier(0.34,1.2,0.64,1)", position: "relative" }}>

        <button onClick={onClose} style={{ position: "absolute", top: 12, right: 14, zIndex: 10, background: "rgba(255,255,255,0.92)", border: "none", borderRadius: "50%", width: 34, height: 34, padding: 0, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 2px 8px rgba(0,0,0,0.18)", flexShrink: 0 }}>
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M1 1L9 9M9 1L1 9" stroke="#111" strokeWidth="2" strokeLinecap="round"/></svg>
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
        @keyframes pmFadeIn  { from{opacity:0} to{opacity:1} }
        @keyframes pmSlideUp { from{opacity:0;transform:translateY(50px)} to{opacity:1;transform:translateY(0)} }
        @keyframes pmPopIn   { from{opacity:0;transform:scale(0.96) translateY(10px)} to{opacity:1;transform:scale(1) translateY(0)} }
      `}</style>
    </div>
  )
}