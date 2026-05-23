"use client"
import { useState } from "react"
import { signIn } from "next-auth/react"
import { useCart } from "@/context/CartContext"

export default function AuthModal() {
  const { isAuthModalOpen, setIsAuthModalOpen, pendingItem, addItem, setPendingItem } = useCart()
  const [mode, setMode] = useState<"signin" | "signup">("signin")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  if (!isAuthModalOpen) return null

 async function handleCredentials(e: React.FormEvent) {
  e.preventDefault()
  setLoading(true)
  setError("")

  // Sign up flow
  if (mode === "signup") {
    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    })
    const data = await res.json()
    if (!res.ok) {
      setError(data.error)
      setLoading(false)
      return
    }
    // After registering, sign them in automatically
  }

  // Sign in flow (runs for both signin and after signup)
  const res = await signIn("credentials", {
    email, password, redirect: false,
  })

  setLoading(false)

  if (res?.error) {
    setError("Invalid email or password.")
    return
  }

  if (pendingItem) {
    addItem(pendingItem)
    setPendingItem(null)
  }
  setIsAuthModalOpen(false)
}

  function handleGoogle() {
    if (pendingItem) {
      sessionStorage.setItem("pendingCartItem", JSON.stringify(pendingItem))
    }
    signIn("google", { callbackUrl: "/" })
  }

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(0,0,0,0.6)",
        padding: "1rem",
        backdropFilter: "blur(4px)",
      }}
      onClick={() => setIsAuthModalOpen(false)}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "100%",
          maxWidth: "440px",
          background: "#fff",
          borderRadius: "4px",
          overflow: "hidden",
          position: "relative",
        }}
      >
        {/* Top accent bar */}
        <div style={{ height: "3px", background: "var(--dark, #111)" }} />

        {/* Close button */}
        <button
          onClick={() => setIsAuthModalOpen(false)}
          style={{
            position: "absolute",
            top: "16px",
            right: "16px",
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "#999",
            fontSize: "18px",
            lineHeight: 1,
            padding: "4px",
          }}
        >✕</button>

        <div style={{ padding: "2.2rem 2.5rem 2.5rem" }}>

          {/* Brand header */}
          <div style={{ textAlign: "center", marginBottom: "1.8rem" }}>
            <p style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "1.5rem",
              fontWeight: 600,
              color: "#111",
              letterSpacing: "0.02em",
              margin: 0,
            }}>
              {mode === "signin" ? "Welcome Back" : "Create Account"}
            </p>
            <p style={{
              fontSize: "0.8rem",
              color: "#888",
              marginTop: "6px",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}>
              {mode === "signin" ? "Sign in to continue shopping" : "Join Kaleem Sons today"}
            </p>
          </div>

          {/* Google button */}
          <button
            onClick={handleGoogle}
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "10px",
              padding: "0.75rem",
              border: "1px solid #e0e0e0",
              borderRadius: "3px",
              background: "#fff",
              cursor: "pointer",
              fontSize: "0.82rem",
              fontWeight: 500,
              color: "#333",
              letterSpacing: "0.02em",
              transition: "background 0.15s",
              marginBottom: "1.4rem",
            }}
            onMouseEnter={e => (e.currentTarget.style.background = "#f9f9f9")}
            onMouseLeave={e => (e.currentTarget.style.background = "#fff")}
          >
            <svg width="16" height="16" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Continue with Google
          </button>

          {/* Divider */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "1.4rem" }}>
            <div style={{ flex: 1, height: "1px", background: "#ebebeb" }} />
            <span style={{ fontSize: "0.72rem", color: "#bbb", letterSpacing: "0.08em", textTransform: "uppercase" }}>or</span>
            <div style={{ flex: 1, height: "1px", background: "#ebebeb" }} />
          </div>

          {/* Error */}
          {error && (
            <div style={{
              marginBottom: "1rem",
              padding: "0.7rem 1rem",
              background: "#fff5f5",
              border: "1px solid #ffd0d0",
              borderRadius: "3px",
              fontSize: "0.8rem",
              color: "#cc3333",
            }}>
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleCredentials}>
            {mode === "signup" && (
              <div style={{ marginBottom: "1rem" }}>
                <label style={labelStyle}>Full name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ali Hassan"
                  style={inputStyle}
                  onFocus={e => (e.currentTarget.style.borderColor = "#111")}
                  onBlur={e => (e.currentTarget.style.borderColor = "#ddd")}
                />
              </div>
            )}

            <div style={{ marginBottom: "1rem" }}>
              <label style={labelStyle}>Email address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                style={inputStyle}
                onFocus={e => (e.currentTarget.style.borderColor = "#111")}
                onBlur={e => (e.currentTarget.style.borderColor = "#ddd")}
              />
            </div>

            <div style={{ marginBottom: "1.6rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
                <label style={labelStyle}>Password</label>
                {mode === "signin" && (
                  <a href="#" style={{ fontSize: "0.72rem", color: "#888", textDecoration: "none" }}>
                    Forgot password?
                  </a>
                )}
              </div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                style={inputStyle}
                onFocus={e => (e.currentTarget.style.borderColor = "#111")}
                onBlur={e => (e.currentTarget.style.borderColor = "#ddd")}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                width: "100%",
                padding: "0.85rem",
                background: loading ? "#555" : "#111",
                color: "#fff",
                border: "none",
                borderRadius: "3px",
                fontSize: "0.78rem",
                fontWeight: 600,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                cursor: loading ? "not-allowed" : "pointer",
                transition: "background 0.2s",
              }}
              onMouseEnter={e => { if (!loading) e.currentTarget.style.background = "#333" }}
              onMouseLeave={e => { if (!loading) e.currentTarget.style.background = "#111" }}
            >
              {loading ? "Please wait..." : mode === "signin" ? "Sign In" : "Create Account"}
            </button>
          </form>

          {/* Toggle mode */}
          <p style={{
            textAlign: "center",
            marginTop: "1.4rem",
            fontSize: "0.8rem",
            color: "#888",
          }}>
            {mode === "signin" ? "New to Kaleem Sons? " : "Already have an account? "}
            <button
              onClick={() => { setMode(mode === "signin" ? "signup" : "signin"); setError("") }}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "#111",
                fontWeight: 600,
                fontSize: "0.8rem",
                textDecoration: "underline",
                padding: 0,
              }}
            >
              {mode === "signin" ? "Create one" : "Sign in"}
            </button>
          </p>

        </div>
      </div>
    </div>
  )
}

const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: "0.72rem",
  fontWeight: 600,
  color: "#555",
  letterSpacing: "0.07em",
  textTransform: "uppercase",
  marginBottom: "6px",
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "0.7rem 0.9rem",
  border: "1px solid #ddd",
  borderRadius: "3px",
  fontSize: "0.87rem",
  color: "#111",
  outline: "none",
  transition: "border-color 0.15s",
  boxSizing: "border-box",
  background: "#fafafa",
}