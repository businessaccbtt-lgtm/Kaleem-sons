"use client"
import { useSession } from "next-auth/react"
import { useCart } from "@/context/CartContext"
import Link from "next/link"
import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"

const TOPBAR_HEIGHT = 32
const HEADER_HEIGHT_DESKTOP = 50
const HEADER_HEIGHT_MOBILE = 40

export default function Header() {
  const { data: session } = useSession()
  const { totalItems, setIsCartOpen, setIsAuthModalOpen } = useCart()
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [topBarVisible, setTopBarVisible] = useState(true)
  const [isMobile, setIsMobile] = useState(false)

  const pathname = usePathname()
  const isTransparent = pathname === "/" && !scrolled

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768)
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const past = window.scrollY > 10
      setScrolled(past)
      setTopBarVisible(!past)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Lock body scroll when sidebar open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [menuOpen])

  const navLinks = [
    { href: "/new-in", label: "New In", icon: "fiber_new" },
    { href: "/track-suits", label: "Suits", icon: "checkroom" },
    { href: "/karate", label: "Casuals", icon: "sports_martial_arts" },
    { href: "/shop", label: "Shop All", icon: "storefront" },
    { href: "/articles", label: "Articles", icon: "article" },
  ]

  const iconColor = !isTransparent ? "#232323" : "#fff"
  const topOffset = topBarVisible ? TOPBAR_HEIGHT : 0
  const headerHeight = isMobile ? HEADER_HEIGHT_MOBILE : HEADER_HEIGHT_DESKTOP

  return (
    <>
      <header style={{
        position: "fixed",
        top: `${topOffset}px`,
        left: 0,
        right: 0,
        zIndex: 100,
        background: !isTransparent ? "rgba(255,255,255,0.97)" : "rgba(255,255,255,0.15)",
        backdropFilter: !isTransparent ? "blur(12px)" : "blur(18px) saturate(1.8)",
        WebkitBackdropFilter: !isTransparent ? "blur(12px)" : "blur(18px) saturate(1.8)",
        borderBottom: !isTransparent ? "1px solid rgba(0,0,0,0.08)" : "1px solid rgba(255,255,255,0.15)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        transition: "top 0.4s ease, background 0.4s ease, backdrop-filter 0.4s ease, border 0.4s ease",
      }} className="main-header">

        {/* Hamburger */}
        <button
          className="hamburger-btn"
          onClick={() => setMenuOpen(prev => !prev)}
          style={{
            display: "none",
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: "4px",
            color: iconColor,
            transition: "color 0.4s ease",
          }}
          aria-label="Toggle menu"
        >
          <span className="material-symbols-outlined" style={{ fontSize: "1.5rem", fontVariationSettings: "'FILL' 0, 'wght' 300" }}>
            {menuOpen ? "close" : "menu"}
          </span>
        </button>

        {/* Logo */}
        <Link href="/" style={{ textDecoration: "none" }}>
          <div className="logo-text" style={{
            fontFamily: "'Playfair Display', serif",
            fontWeight: 700,
            letterSpacing: "-0.2px",
            lineHeight: 1,
            cursor: "pointer",
            color: iconColor,
            transition: "color 0.4s ease",
          }}>
            Kaleem Sons
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="desktop-nav" style={{ display: "flex" }}>
          <ul style={{
            display: "flex",
            gap: "2.2rem",
            fontSize: "0.82rem",
            fontWeight: 500,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            listStyle: "none",
            margin: 0,
            padding: 0,
          }}>
            {navLinks.map(link => (
              <li key={link.href}>
                <Link href={link.href} style={{ textDecoration: "none", color: iconColor, transition: "color 0.4s ease" }}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Icons */}
        <div style={{ display: "flex", alignItems: "center" }} className="icon-group">
          <a href="#" aria-label="Search" style={{ display: "flex", alignItems: "center", color: iconColor, transition: "color 0.4s ease" }}>
            <span className="material-symbols-outlined icon-size">search</span>
          </a>

          {session ? (
            <span className="user-name" style={{
              fontSize: "0.78rem",
              color: !isTransparent ? "#555" : "rgba(255,255,255,0.85)",
              maxWidth: "80px",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              transition: "color 0.4s ease",
            }}>
              {session.user?.name?.split(" ")[0]}
            </span>
          ) : (
            <button
              onClick={() => setIsAuthModalOpen(true)}
              style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", color: iconColor, transition: "color 0.4s ease" }}
            >
              <span className="material-symbols-outlined icon-size">account_circle</span>
            </button>
          )}

          <button
            onClick={() => setIsCartOpen(true)}
            style={{ position: "relative", display: "flex", alignItems: "center", background: "none", border: "none", cursor: "pointer", color: iconColor, transition: "color 0.4s ease" }}
          >
            <span className="material-symbols-outlined icon-size">shopping_bag</span>
            {totalItems > 0 && (
              <span style={{
                position: "absolute", top: "-4px", right: "-5px",
                background: !isTransparent ? "#111" : "#fff",
                color: !isTransparent ? "#fff" : "#111",
                fontSize: "0.5rem",
                width: "14px", height: "14px", borderRadius: "50%",
                display: "flex", alignItems: "center", justifyContent: "center",
                border: "1px solid rgba(0,0,0,0.15)", fontWeight: 700,
                transition: "all 0.4s ease",
              }}>
                {totalItems > 9 ? "9+" : totalItems}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* Backdrop overlay */}
      <div
        onClick={() => setMenuOpen(false)}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 98,
          background: "rgba(0,0,0,0.45)",
          backdropFilter: "blur(2px)",
          WebkitBackdropFilter: "blur(2px)",
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? "all" : "none",
          transition: "opacity 0.35s ease",
        }}
      />

      {/* Sidebar Drawer */}
      <aside style={{
        position: "fixed",
        top: 0,
        left: 0,
        bottom: 0,
        width: "300px",
        zIndex: 99,
        background: "#fff",
        boxShadow: "4px 0 32px rgba(0,0,0,0.15)",
        transform: menuOpen ? "translateX(0)" : "translateX(-100%)",
        transition: "transform 0.38s cubic-bezier(0.4, 0, 0.2, 1)",
        display: "flex",
        flexDirection: "column",
        overflowY: "auto",
      }}>

        {/* Sidebar Header */}
        <div style={{
          padding: "1.5rem 1.5rem 1.25rem",
          borderBottom: "1px solid #f0f0f0",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}>
          <Link href="/" onClick={() => setMenuOpen(false)} style={{ textDecoration: "none" }}>
            <span style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "1.3rem",
              fontWeight: 700,
              color: "#111",
              letterSpacing: "-0.2px",
            }}>
              Kaleem Sons
            </span>
          </Link>
          <button
            onClick={() => setMenuOpen(false)}
            style={{ background: "none", border: "none", cursor: "pointer", color: "#999", padding: "4px", display: "flex" }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: "1.4rem" }}>close</span>
          </button>
        </div>

        {/* Nav Links */}
        <nav style={{ padding: "1rem 0", flex: 1 }}>
          <p style={{
            fontSize: "0.65rem", fontWeight: 700, letterSpacing: "2px",
            textTransform: "uppercase", color: "#bbb",
            padding: "0 1.5rem", margin: "0 0 0.5rem",
          }}>
            Browse
          </p>
          <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
            {navLinks.map((link, i) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.85rem",
                    padding: "0.85rem 1.5rem",
                    textDecoration: "none",
                    color: pathname === link.href ? "#111" : "#555",
                    fontSize: "0.92rem",
                    fontWeight: pathname === link.href ? 700 : 500,
                    letterSpacing: "0.02em",
                    background: pathname === link.href ? "#f7f7f7" : "transparent",
                    borderLeft: pathname === link.href ? "3px solid #111" : "3px solid transparent",
                    transition: "all 0.2s ease",
                  }}
                >
                  <span className="material-symbols-outlined" style={{
                    fontSize: "1.15rem",
                    color: pathname === link.href ? "#111" : "#bbb",
                    fontVariationSettings: "'FILL' 0, 'wght' 300",
                  }}>
                    {link.icon}
                  </span>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Divider */}
          <div style={{ height: "1px", background: "#f0f0f0", margin: "1rem 1.5rem" }} />

          {/* Account section */}
          <p style={{
            fontSize: "0.65rem", fontWeight: 700, letterSpacing: "2px",
            textTransform: "uppercase", color: "#bbb",
            padding: "0 1.5rem", margin: "0 0 0.5rem",
          }}>
            Account
          </p>

          {session ? (
            <div style={{ padding: "0.85rem 1.5rem", display: "flex", alignItems: "center", gap: "0.85rem" }}>
              <span className="material-symbols-outlined" style={{ fontSize: "1.15rem", color: "#bbb", fontVariationSettings: "'FILL' 0, 'wght' 300" }}>
                account_circle
              </span>
              <div>
                <p style={{ margin: 0, fontSize: "0.88rem", fontWeight: 600, color: "#111" }}>{session.user?.name}</p>
                <p style={{ margin: 0, fontSize: "0.73rem", color: "#aaa" }}>{session.user?.email}</p>
              </div>
            </div>
          ) : (
            <button
              onClick={() => { setIsAuthModalOpen(true); setMenuOpen(false) }}
              style={{
                display: "flex", alignItems: "center", gap: "0.85rem",
                padding: "0.85rem 1.5rem", width: "100%",
                background: "none", border: "none", cursor: "pointer",
                color: "#555", fontSize: "0.92rem", fontWeight: 500,
                letterSpacing: "0.02em", textAlign: "left",
                borderLeft: "3px solid transparent",
              }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: "1.15rem", color: "#bbb", fontVariationSettings: "'FILL' 0, 'wght' 300" }}>
                login
              </span>
              Sign In / Register
            </button>
          )}

          <button
            onClick={() => { setIsCartOpen(true); setMenuOpen(false) }}
            style={{
              display: "flex", alignItems: "center", gap: "0.85rem",
              padding: "0.85rem 1.5rem", width: "100%",
              background: "none", border: "none", cursor: "pointer",
              color: "#555", fontSize: "0.92rem", fontWeight: 500,
              letterSpacing: "0.02em", textAlign: "left",
              borderLeft: "3px solid transparent",
            }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: "1.15rem", color: "#bbb", fontVariationSettings: "'FILL' 0, 'wght' 300" }}>
              shopping_bag
            </span>
            Cart {totalItems > 0 && <span style={{ marginLeft: "auto", background: "#111", color: "#fff", fontSize: "0.65rem", fontWeight: 700, padding: "0.15rem 0.45rem", borderRadius: "20px" }}>{totalItems}</span>}
          </button>
        </nav>

        {/* Sidebar Footer */}
        <div style={{
          padding: "1.25rem 1.5rem",
          borderTop: "1px solid #f0f0f0",
          background: "#fafafa",
        }}>
          <p style={{ margin: 0, fontSize: "0.73rem", color: "#bbb", lineHeight: 1.6 }}>
            Premium Sportswear & Martial Arts Apparel
          </p>
          <p style={{ margin: "0.25rem 0 0", fontSize: "0.73rem", color: "#ccc" }}>
            Sialkot, Pakistan · Worldwide Shipping
          </p>
        </div>
      </aside>

      <style>{`
        .main-header { padding: 0.65rem 4%; }
        .logo-text { font-size: 1.4rem; }
        .icon-group { gap: 0.5rem; }
        .icon-size { font-size: 1.6rem; }
        .user-name { display: inline; }

        @media (max-width: 768px) {
          .hamburger-btn { display: flex !important; }
          .desktop-nav { display: none !important; }
          .main-header { padding: 0.35rem 4% !important; }
          .logo-text { font-size: 1.15rem !important; }
          .icon-group { gap: 0.2rem !important; }
          .icon-size { font-size: 1.35rem !important; }
          .user-name { display: none !important; }
        }

        @media (min-width: 769px) {
          aside { display: none !important; }
        }
      `}</style>
    </>
  )
}