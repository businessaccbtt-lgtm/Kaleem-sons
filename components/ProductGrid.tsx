"use client"
import { supabase } from "@/lib/supabase"

import { useState, useEffect } from "react"
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
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.img,
      size: selectedSize,
      color: selectedColor,
      quantity: 1,
    }
    if (!session) {
      setPendingItem(item)
      setIsAuthModalOpen(true)
      onClose()
      return
    }
    addItem(item)
    setAdded(true)
    setTimeout(() => { setAdded(false); onClose() }, 1200)
  }

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0,
        background: "rgba(0,0,0,0.55)",
        backdropFilter: "blur(5px)",
        zIndex: 9999,
        display: "flex",
        alignItems: isMobile ? "flex-end" : "center",
        justifyContent: "center",
        padding: isMobile ? 0 : "1rem",
        animation: "pgFadeIn 0.2s ease",
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: "#fff",
          borderRadius: isMobile ? "24px 24px 0 0" : "24px",
          width: "100%",
          maxWidth: isMobile ? "100%" : "780px",
          maxHeight: isMobile ? "92dvh" : "88vh",
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          overflow: "hidden",
          boxShadow: "0 32px 64px -12px rgba(0,0,0,0.35)",
          animation: isMobile
            ? "pgSlideUp 0.3s cubic-bezier(0.34,1.1,0.64,1)"
            : "pgPopIn 0.28s cubic-bezier(0.34,1.2,0.64,1)",
          position: "relative",
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: "absolute", top: 12, right: 14, zIndex: 10,
            background: "rgba(255,255,255,0.92)", border: "none",
            borderRadius: "50%", width: 34, height: 34,
            padding: 0, lineHeight: 1, boxSizing: "border-box",
            cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: "0 2px 8px rgba(0,0,0,0.18)",
            flexShrink: 0,
          }}
        >
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path d="M1 1L9 9M9 1L1 9" stroke="#111" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>

        <div style={{
          flexShrink: 0,
          width: isMobile ? "100%" : "46%",
          height: isMobile ? "min(65vw, 320px)" : "auto",
          overflow: "hidden",
        }}>
          <img
            src={product.img}
            alt={product.name}
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />
        </div>

        <div style={{
          flex: 1,
          padding: isMobile ? "1.1rem 1.2rem 1.8rem" : "2rem 1.8rem",
          display: "flex", flexDirection: "column",
          gap: isMobile ? "0.75rem" : "1rem",
          overflowY: "auto",
        }}>
          <div>
            <p style={{ fontSize: "0.62rem", textTransform: "uppercase", letterSpacing: "2px", color: "#aaa", marginBottom: "0.25rem" }}>
              {product.category}
            </p>
            <h2 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: isMobile ? "1.25rem" : "1.55rem",
              fontWeight: 700, lineHeight: 1.2, color: "#111", marginBottom: "0.35rem",
            }}>{product.name}</h2>
            <p style={{ color: "#777", fontSize: "0.78rem", lineHeight: 1.6 }}>{product.description}</p>
          </div>

          <div style={{ fontSize: isMobile ? "1.35rem" : "1.6rem", fontWeight: 800, color: "#111", letterSpacing: "-0.5px" }}>
            PKR {product.price.toLocaleString()}
          </div>

          <div>
            <p style={{ fontSize: "0.65rem", textTransform: "uppercase", letterSpacing: "1.5px", color: "#999", marginBottom: "0.4rem" }}>
              Colour
            </p>
            <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
              {product.colors.map(c => (
                <div
                  key={c}
                  onClick={() => setSelectedColor(c)}
                  style={{
                    width: 26, height: 26, minWidth: 26, minHeight: 26,
                    borderRadius: "50%", background: c,
                    border: selectedColor === c ? "3px solid #111" : "2px solid transparent",
                    outline: selectedColor === c ? "2px solid #fff" : "none",
                    outlineOffset: "-4px", cursor: "pointer", transition: "all 0.15s",
                    boxShadow: "0 1px 4px rgba(0,0,0,0.2)", flexShrink: 0,
                  }}
                />
              ))}
            </div>
          </div>

          <div>
            <p style={{ fontSize: "0.65rem", textTransform: "uppercase", letterSpacing: "1.5px", color: "#999", marginBottom: "0.4rem" }}>
              Size
            </p>
            <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
              {product.sizes.map(size => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  style={{
                    width: isMobile ? 36 : 42, height: isMobile ? 36 : 42,
                    borderRadius: "10px",
                    border: selectedSize === size ? "2px solid #111" : "1.5px solid #ddd",
                    background: selectedSize === size ? "#111" : "#fafafa",
                    color: selectedSize === size ? "#fff" : "#555",
                    fontSize: "0.7rem", fontWeight: 600, cursor: "pointer",
                    transition: "all 0.15s", padding: 0,
                  }}
                >{size}</button>
              ))}
            </div>
          </div>

          <button
            onClick={handleAddToCart}
            style={{
              marginTop: "auto", width: "100%",
              padding: isMobile ? "0.78rem" : "0.88rem",
              borderRadius: "50px", border: "none",
              background: added ? "#2a7a2a" : "#111",
              color: "#fff", fontSize: "0.73rem", fontWeight: 700,
              textTransform: "uppercase", letterSpacing: "1.5px",
              cursor: "pointer", transition: "background 0.2s ease",
            }}
          >
            {added ? "✓ Added to Cart!" : "Add to Cart"}
          </button>
        </div>
      </div>

      <style>{`
        @keyframes pgFadeIn  { from{opacity:0} to{opacity:1} }
        @keyframes pgSlideUp { from{opacity:0;transform:translateY(50px)} to{opacity:1;transform:translateY(0)} }
        @keyframes pgPopIn   { from{opacity:0;transform:scale(0.96) translateY(10px)} to{opacity:1;transform:scale(1) translateY(0)} }
      `}</style>
    </div>
  )
}

function ProductCard({ product, onClick }: { product: Product; onClick: () => void }) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderRadius: "0", overflow: "hidden",
        cursor: "pointer", position: "relative", aspectRatio: "3/4",
        boxShadow: hovered ? "0 20px 40px -10px rgba(0,0,0,0.22)" : "0 4px 16px -4px rgba(0,0,0,0.12)",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        transition: "all 0.25s cubic-bezier(0.34,1.2,0.64,1)",
        WebkitTapHighlightColor: "transparent",
      }}
    >
      <img
        src={product.img} alt={product.name}
        style={{
          width: "100%", height: "100%", objectFit: "cover", display: "block",
          transform: hovered ? "scale(1.06)" : "scale(1)",
          transition: "transform 0.4s ease",
        }}
      />
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0,
        padding: "2.5rem 0.8rem 0.8rem",
        background: "linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 100%)",
        display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: "4px",
      }}>
        <span style={{ color: "#fff", fontSize: "0.7rem", fontWeight: 500, maxWidth: "62%", lineHeight: 1.3, textShadow: "0 1px 4px rgba(0,0,0,0.5)" }}>
          {product.name}
        </span>
        <span style={{ background: "rgba(255,255,255,0.95)", color: "#111", fontSize: "0.7rem", fontWeight: 700, borderRadius: "20px", padding: "3px 9px", flexShrink: 0 }}>
          PKR {product.price.toLocaleString()}
        </span>
      </div>
      <div style={{
        position: "absolute", top: "50%", left: "50%",
        transform: `translate(-50%, -50%) scale(${hovered ? 1 : 0.85})`,
        opacity: hovered ? 1 : 0,
        background: "rgba(255,255,255,0.92)", color: "#111",
        fontSize: "0.63rem", fontWeight: 700,
        textTransform: "uppercase", letterSpacing: "1.5px",
        padding: "7px 18px", borderRadius: "30px",
        transition: "all 0.2s ease",
        pointerEvents: "none", backdropFilter: "blur(4px)",
      }}>Quick View</div>
    </div>
  )
}

export default function ProductGrid() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [activeProduct, setActiveProduct] = useState<Product | null>(null)
  

  useEffect(() => {
    async function fetchProducts() {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: false }) // ✅ newest first
        .limit(8)                                   // ✅ only 8 for homepage
      if (error) console.error(error)
      else setProducts(data || [])
      setLoading(false)
    }
    fetchProducts()
  }, [])

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');
        .pg-section { padding: 64px 24px; background: #ffffff; }
        .pg-heading-wrapper { text-align: center; margin-bottom: 32px; }
        
        .pg-grid {
          display: grid; grid-template-columns: repeat(4, 1fr);
          gap: 24px; max-width: 1280px; margin: 0 auto;
        }
        @media (max-width: 900px) {
          .pg-section { padding: 48px 16px; }
          .pg-grid { grid-template-columns: repeat(2, 1fr); gap: 16px; }
        }
        @media (max-width: 480px) {
          .pg-section { padding: 40px 16px; }
          .pg-new-arrivals { font-size: clamp(2.4rem, 11vw, 3.2rem); -webkit-text-stroke: 1px #111; }
          .pg-grid { grid-template-columns: repeat(2, 1fr); gap: 12px; }
        }
        @media (min-width: 1000px) {
          .pg-section { padding: 80px 24px; }
          .pg-heading-wrapper { margin-bottom: 64px; }
        }
      `}</style>

      <section className="pg-section">
        <div className="pg-heading-wrapper">
          <div>
  <p style={{ fontSize: "0.7rem", letterSpacing: "4px", color: "#999", textTransform: "uppercase", marginBottom: "12px", textAlign: "center" }}>
    Collection
  </p>
 <h2 style={{
    fontFamily: "'Playfair Display', serif",
    fontSize: "clamp(2.2rem, 6vw, 4.5rem)",
    fontWeight: 600,
    letterSpacing: "-0.03em",
    lineHeight: 1.1,
    textAlign: "center",
    color: "#111",
    marginBottom: "14px",
  }}>
    The New Arrivals
  </h2>
  <p style={{ color: "#999", fontSize: "0.9rem", letterSpacing: "0.5px", textAlign: "center" }}>
   The finest threads for the fiercest athletes.
  </p>
</div>
</div>
        

        {loading ? (
          <div style={{ textAlign: "center", padding: "4rem", color: "#999", fontSize: "0.85rem" }}>
            Loading...
          </div>
        ) : (
          <div className="pg-grid">
            {products.map(p => (
              <ProductCard key={p.id} product={p} onClick={() => setActiveProduct(p)} />
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