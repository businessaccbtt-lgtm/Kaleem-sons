"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function AdminLogin() {
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      if (password === "Baseerb12") {
        localStorage.setItem("admin_auth", "true")
        router.push("/admin/products")
      } else {
        setError("Incorrect password. Try again.")
        setLoading(false)
      }
    }, 600)
  }

  return (
    <div style={{ minHeight: "100vh", background: "#f9f9f9", display: "flex", alignItems: "center", justifyContent: "center", paddingTop: "6rem" }}>
      <div style={{
        background: "#fff", borderRadius: "16px",
        padding: "2.5rem", width: "100%", maxWidth: "400px",
        boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
      }}>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.8rem", fontWeight: 700, marginBottom: "0.25rem", color: "#111" }}>
          Admin Panel
        </h1>
        <p style={{ color: "#999", fontSize: "0.85rem", marginBottom: "2rem" }}>Kaleem & Sons</p>

        <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <input
            type="password"
            placeholder="Enter admin password"
            value={password}
            onChange={e => { setPassword(e.target.value); setError("") }}
            style={{
              padding: "0.85rem 1rem", borderRadius: "10px",
              border: error ? "1.5px solid #ff4444" : "1.5px solid #e5e5e5",
              fontSize: "0.9rem", outline: "none", width: "100%",
              boxSizing: "border-box",
            }}
          />
          {error && <p style={{ color: "#ff4444", fontSize: "0.8rem", margin: 0 }}>{error}</p>}
          <button
            type="submit"
            disabled={loading}
            style={{
              padding: "0.85rem", borderRadius: "10px",
              background: "#111", color: "#fff", border: "none",
              fontSize: "0.85rem", fontWeight: 700,
              textTransform: "uppercase", letterSpacing: "1.5px",
              cursor: loading ? "not-allowed" : "pointer",
              opacity: loading ? 0.7 : 1,
            }}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  )
}