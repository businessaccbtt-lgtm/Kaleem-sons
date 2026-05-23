"use client"
import { useState, useEffect } from "react"
import { useCart } from "@/context/CartContext"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { formatPKR, formatUSD, toUSD, isInternational } from "@/lib/currency"

const PAYMENT_METHODS = [
  {
    id: "cod",
    label: "Cash on Delivery",
    desc: "Pay when you receive your order",
    tag: "Local",
    tagColor: "#e8f5e9",
    tagText: "#2e7d32",
    icon: "💵",
  },
  {
    id: "jazzcash_manual",
    label: "JazzCash",
    desc: "Send to 0326-5546298 — we confirm your order manually",
    tag: "Local",
    tagColor: "#e8f5e9",
    tagText: "#2e7d32",
    icon: "📱",
  },
  {
    id: "easypaisa_manual",
    label: "Easypaisa",
    desc: "Send to 0326-5546298 — we confirm your order manually",
    tag: "Local",
    tagColor: "#e8f5e9",
    tagText: "#2e7d32",
    icon: "📱",
  },
]

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart()
  const { data: session } = useSession()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [placed, setPlaced] = useState(false)
  const [showUSD, setShowUSD] = useState(false)
  const [selectedPayment, setSelectedPayment] = useState("cod")
  const [form, setForm] = useState({
    name: session?.user?.name || "",
    email: session?.user?.email || "",
    phone: "",
    address: "",
    city: "",
    country: "Pakistan",
  })

  useEffect(() => {
    setShowUSD(isInternational())
  }, [])

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  function displayPrice(pkrAmount: number) {
    return showUSD
      ? formatUSD(parseFloat(toUSD(pkrAmount)))
      : formatPKR(pkrAmount)
  }

  async function handlePlaceOrder(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)

    const res = await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        items,
        total: totalPrice,
        paymentMethod: selectedPayment,
        form,
      }),
    })

    const data = await res.json()

    if (!res.ok) {
      alert(data.error || "Something went wrong.")
      setLoading(false)
      return
    }

    clearCart()
    setPlaced(true)
    setLoading(false)
  }

  if (placed) {
    const isManualTransfer = ["jazzcash_manual", "easypaisa_manual"].includes(selectedPayment)
    const isCOD = selectedPayment === "cod"

    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: "1rem", padding: "2rem" }}>
        <div style={{ width: "64px", height: "64px", borderRadius: "50%", background: "#f0faf0", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "28px" }}>✓</div>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.8rem", fontWeight: 600, margin: 0 }}>Order Placed!</h2>

        {isCOD && (
          <p style={{ color: "#888", fontSize: "0.9rem", textAlign: "center", maxWidth: "360px" }}>
            Thank you! Your order has been placed. Our team will contact you to confirm delivery.
          </p>
        )}

        {isManualTransfer && (
          <div style={{ background: "#fffbea", border: "1px solid #f0e68c", borderRadius: "12px", padding: "1.2rem 1.6rem", maxWidth: "380px", textAlign: "center" }}>
            <p style={{ fontWeight: 600, fontSize: "0.9rem", margin: "0 0 6px" }}>
              Please transfer {displayPrice(totalPrice)} to:
            </p>
            {selectedPayment === "jazzcash_manual" && (
              <p style={{ fontSize: "0.95rem", fontWeight: 700, margin: "0 0 4px" }}>
                JazzCash: 03XX-XXXXXXX
              </p>
            )}
            {selectedPayment === "easypaisa_manual" && (
              <p style={{ fontSize: "0.95rem", fontWeight: 700, margin: "0 0 4px" }}>
                Easypaisa: 03XX-XXXXXXX
              </p>
            )}
            <p style={{ fontSize: "0.78rem", color: "#888", margin: 0 }}>
              Send your payment screenshot to confirm your order. We'll process it within 24 hours.
            </p>
          </div>
        )}

        <button
          onClick={() => router.push("/")}
          style={{ marginTop: "1rem", background: "#111", color: "#fff", padding: "0.7rem 2rem", borderRadius: "40px", border: "none", cursor: "pointer", fontSize: "0.85rem", fontWeight: 500 }}
        >
          Continue Shopping
        </button>
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: "1rem" }}>
        <p style={{ color: "#888" }}>Your cart is empty.</p>
        <button onClick={() => router.push("/")} style={{ background: "#111", color: "#fff", padding: "0.7rem 2rem", borderRadius: "40px", border: "none", cursor: "pointer" }}>
          Shop Now
        </button>
      </div>
    )
  }

  return (
    <div style={{ minHeight: "100vh", background: "#fafafa", padding: "2rem 4%" }}>
      <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "2rem", fontWeight: 600, marginBottom: "0.5rem", textAlign: "center" }}>Checkout</h1>

      {/* Currency toggle */}
      <div style={{ display: "flex", justifyContent: "center", gap: "8px", marginBottom: "2rem" }}>
        {["PKR", "USD"].map(c => (
          <button
            key={c}
            onClick={() => setShowUSD(c === "USD")}
            style={{
              padding: "4px 16px",
              borderRadius: "20px",
              border: "1px solid #ddd",
              background: (c === "USD") === showUSD ? "#111" : "#fff",
              color: (c === "USD") === showUSD ? "#fff" : "#555",
              fontSize: "0.78rem",
              fontWeight: 500,
              cursor: "pointer",
              transition: "all 0.15s",
            }}
          >
            {c}
          </button>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 380px", gap: "2rem", maxWidth: "1000px", margin: "0 auto" }}>

        {/* Left — form */}
        <form onSubmit={handlePlaceOrder}>

          {/* Shipping */}
          <div style={{ background: "#fff", borderRadius: "16px", padding: "1.8rem", border: "1px solid #eee", marginBottom: "1rem" }}>
            <h2 style={{ fontSize: "1rem", fontWeight: 600, marginBottom: "1.2rem", letterSpacing: "0.05em", textTransform: "uppercase" }}>Shipping Details</h2>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
              {[
                { label: "Full Name", name: "name", type: "text", placeholder: "Ali Hassan" },
                { label: "Email", name: "email", type: "email", placeholder: "you@example.com" },
                { label: "Phone", name: "phone", type: "tel", placeholder: "+92 300 0000000" },
                { label: "City", name: "city", type: "text", placeholder: "Karachi" },
              ].map(field => (
                <div key={field.name}>
                  <label style={{ display: "block", fontSize: "0.72rem", fontWeight: 600, color: "#555", letterSpacing: "0.07em", textTransform: "uppercase", marginBottom: "5px" }}>
                    {field.label}
                  </label>
                  <input
                    type={field.type}
                    name={field.name}
                    required
                    value={(form as any)[field.name]}
                    onChange={handleChange}
                    placeholder={field.placeholder}
                    style={{ width: "100%", padding: "0.65rem 0.85rem", border: "1px solid #ddd", borderRadius: "6px", fontSize: "0.87rem", outline: "none", boxSizing: "border-box", background: "#fafafa" }}
                  />
                </div>
              ))}
            </div>

            <div style={{ marginBottom: "1rem" }}>
              <label style={{ display: "block", fontSize: "0.72rem", fontWeight: 600, color: "#555", letterSpacing: "0.07em", textTransform: "uppercase", marginBottom: "5px" }}>
                Street Address
              </label>
              <input
                type="text"
                name="address"
                required
                value={form.address}
                onChange={handleChange}
                placeholder="House #, Street, Area"
                style={{ width: "100%", padding: "0.65rem 0.85rem", border: "1px solid #ddd", borderRadius: "6px", fontSize: "0.87rem", outline: "none", boxSizing: "border-box", background: "#fafafa" }}
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "0.72rem", fontWeight: 600, color: "#555", letterSpacing: "0.07em", textTransform: "uppercase", marginBottom: "5px" }}>
                Country
              </label>
              <select
                name="country"
                value={form.country}
                onChange={handleChange}
                style={{ width: "100%", padding: "0.65rem 0.85rem", border: "1px solid #ddd", borderRadius: "6px", fontSize: "0.87rem", outline: "none", background: "#fafafa" }}
              >
                <option>Pakistan</option>
                <option>United Kingdom</option>
                <option>United States</option>
                <option>United Arab Emirates</option>
                <option>Saudi Arabia</option>
                <option>Canada</option>
                <option>Australia</option>
              </select>
            </div>
          </div>

          {/* Payment methods */}
          <div style={{ background: "#fff", borderRadius: "16px", padding: "1.8rem", border: "1px solid #eee" }}>
            <h2 style={{ fontSize: "1rem", fontWeight: 600, marginBottom: "1.2rem", letterSpacing: "0.05em", textTransform: "uppercase" }}>Payment Method</h2>

            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {PAYMENT_METHODS.map(method => (
                <label
                  key={method.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    padding: "12px 16px",
                    border: `1px solid ${selectedPayment === method.id ? "#111" : "#e0e0e0"}`,
                    borderRadius: "10px",
                    cursor: "pointer",
                    background: selectedPayment === method.id ? "#fafafa" : "#fff",
                    transition: "all 0.15s",
                  }}
                >
                  <input
                    type="radio"
                    name="payment"
                    value={method.id}
                    checked={selectedPayment === method.id}
                    onChange={() => setSelectedPayment(method.id)}
                    style={{ accentColor: "#111" }}
                  />
                  <span style={{ fontSize: "16px" }}>{method.icon}</span>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: "0.88rem", fontWeight: 600, margin: 0 }}>{method.label}</p>
                    <p style={{ fontSize: "0.75rem", color: "#888", margin: 0 }}>{method.desc}</p>
                  </div>
                  <span style={{ fontSize: "0.68rem", fontWeight: 600, padding: "2px 8px", borderRadius: "20px", background: method.tagColor, color: method.tagText }}>
                    {method.tag}
                  </span>
                </label>
              ))}
            </div>

            {/* Manual transfer instruction box */}
            {(selectedPayment === "jazzcash_manual" || selectedPayment === "easypaisa_manual") && (
              <div style={{ marginTop: "1rem", background: "#fffbea", border: "1px solid #f0e68c", borderRadius: "10px", padding: "1rem" }}>
                <p style={{ fontSize: "0.82rem", fontWeight: 600, margin: "0 0 4px" }}>
                  How it works:
                </p>
                <p style={{ fontSize: "0.78rem", color: "#666", margin: 0, lineHeight: 1.6 }}>
                  1. Place your order<br />
                  2. Transfer {displayPrice(totalPrice)} to {selectedPayment === "jazzcash_manual" ? "JazzCash: 03XX-XXXXXXX" : "Easypaisa: 03XX-XXXXXXX"}<br />
                  3. Send screenshot to our WhatsApp<br />
                  4. We confirm and dispatch your order
                </p>
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              marginTop: "1.2rem",
              background: loading ? "#555" : "#111",
              color: "#fff",
              padding: "1rem",
              borderRadius: "40px",
              border: "none",
              cursor: loading ? "not-allowed" : "pointer",
              fontSize: "0.85rem",
              fontWeight: 600,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              transition: "background 0.2s",
            }}
          >
            {loading ? "Processing..." : `Place Order — ${displayPrice(totalPrice)}`}
          </button>

          <p style={{ textAlign: "center", fontSize: "0.72rem", color: "#bbb", marginTop: "10px" }}>
            🔒 Secured with HTTPS
          </p>
        </form>

        {/* Right — order summary */}
        <div>
          <div style={{ background: "#fff", borderRadius: "16px", padding: "1.8rem", border: "1px solid #eee", position: "sticky", top: "2rem" }}>
            <h2 style={{ fontSize: "1rem", fontWeight: 600, marginBottom: "1.2rem", letterSpacing: "0.05em", textTransform: "uppercase" }}>Order Summary</h2>

            <div style={{ display: "flex", flexDirection: "column", gap: "14px", marginBottom: "1.4rem" }}>
              {items.map(item => (
                <div key={`${item.id}-${item.size}`} style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                  <img src={item.image} alt={item.name} style={{ width: "56px", height: "56px", objectFit: "cover", borderRadius: "8px", background: "#f0f0f0" }} />
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: "0.85rem", fontWeight: 600, margin: 0 }}>{item.name}</p>
                    <p style={{ fontSize: "0.75rem", color: "#888", margin: "2px 0 0" }}>Size: {item.size} × {item.quantity}</p>
                  </div>
                  <p style={{ fontSize: "0.88rem", fontWeight: 600, whiteSpace: "nowrap" }}>
                    {displayPrice(item.price * item.quantity)}
                  </p>
                </div>
              ))}
            </div>

            <div style={{ borderTop: "1px solid #eee", paddingTop: "1rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem", color: "#888", marginBottom: "6px" }}>
                <span>Subtotal</span>
                <span>{displayPrice(totalPrice)}</span>
              </div>
              {showUSD && (
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.78rem", color: "#bbb", marginBottom: "6px" }}>
                  <span>≈ PKR equivalent</span>
                  <span>{formatPKR(totalPrice)}</span>
                </div>
              )}
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem", color: "#888", marginBottom: "12px" }}>
                <span>Shipping</span>
                <span style={{ color: "#2a7a2a" }}>Free</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "1rem", fontWeight: 700 }}>
                <span>Total</span>
                <span>{displayPrice(totalPrice)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}