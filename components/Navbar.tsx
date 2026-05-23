"use client"
import { useSession } from "next-auth/react"
import { useCart } from "@/context/CartContext"
import Link from "next/link"
import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"  // ← ADD THIS

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

  const pathname = usePathname()                        // ← ADD THIS
  const isTransparent = pathname === "/" && !scrolled   // ← ADD THIS

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

  const navLinks = [
    { href: "/new-in", label: "New In" },
    { href: "/track-suits", label: "Suits" },
    { href: "/karate", label: "Casuals" },
    { href: "/shop", label: "Shop All" },
  ]

  const iconColor = !isTransparent ? "#232323" : "#fff"   // ← CHANGED
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
        background: !isTransparent ? "rgba(255,255,255,0.97)" : "rgba(255,255,255,0.15)",           // ← CHANGED
        backdropFilter: !isTransparent ? "blur(12px)" : "blur(18px) saturate(1.8)",                 // ← CHANGED
        WebkitBackdropFilter: !isTransparent ? "blur(12px)" : "blur(18px) saturate(1.8)",           // ← CHANGED
        borderBottom: !isTransparent ? "1px solid rgba(0,0,0,0.08)" : "1px solid rgba(255,255,255,0.15)", // ← CHANGED
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        transition: "top 0.4s ease, background 0.4s ease, backdrop-filter 0.4s ease, border 0.4s ease",
      }} className="main-header">

        {/* Hamburger - mobile only */}
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

        {/* Nav - desktop only */}
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
              color: !isTransparent ? "#555" : "rgba(255,255,255,0.85)",   // ← CHANGED
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
                background: !isTransparent ? "#111" : "#fff",   // ← CHANGED
                color: !isTransparent ? "#fff" : "#111",         // ← CHANGED
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

      {/* Mobile Nav Drawer */}
      <nav
        className="mobile-nav"
        style={{
          position: "fixed",
          top: `${topOffset + headerHeight}px`,
          left: 0,
          right: 0,
          zIndex: 99,
          background: !isTransparent ? "rgba(255,255,255,0.97)" : "rgba(20,20,20,0.75)",  // ← CHANGED
          backdropFilter: "blur(18px) saturate(1.8)",
          WebkitBackdropFilter: "blur(18px) saturate(1.8)",
          borderBottom: "1px solid rgba(255,255,255,0.1)",
          padding: "0.25rem 0 0.75rem",
          transition: "top 0.4s ease",
          display: menuOpen ? "block" : "none",
        }}
      >
        <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
          {navLinks.map(link => (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={() => setMenuOpen(false)}
                style={{
                  display: "block",
                  padding: "0.75rem 6%",
                  textDecoration: "none",
                  color: !isTransparent ? "#232323" : "#fff",   // ← CHANGED
                  fontSize: "0.9rem",
                  fontWeight: 500,
                  letterSpacing: "0.04em",
                  textTransform: "uppercase",
                  borderBottom: `1px solid ${!isTransparent ? "rgba(0,0,0,0.06)" : "rgba(255,255,255,0.08)"}`,  // ← CHANGED
                }}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

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
          .mobile-nav { display: none !important; }
        }
      `}</style>
    </>
  )
}