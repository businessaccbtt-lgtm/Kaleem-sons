// contact/page.tsx
"use client";

import { useState } from "react";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e: React.MouseEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <div style={{ minHeight: "100vh", background: "#fff", fontFamily: "DM Sans, sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&family=Bebas+Neue&display=swap" rel="stylesheet" />
      <style dangerouslySetInnerHTML={{ __html: `
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .c-pad { padding: 64px 24px; }
        .c-grid { display: block; }
        .c-form-grid { display: block; }
        .c-info-cards { display: grid; grid-template-columns: 1fr; gap: 1px; background: #e5e5e5; }
        @media (min-width: 640px) {
          .c-pad { padding: 80px 40px; }
          .c-info-cards { grid-template-columns: 1fr 1fr; }
        }
        @media (min-width: 900px) {
          .c-pad { padding: 100px 80px; }
          .c-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: start; }
          .c-form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
          .c-info-cards { grid-template-columns: 1fr 1fr; }
        }
        .c-input { width: 100%; padding: 14px 16px; border: 1.5px solid #e0e0e0; background: #fff; font-family: DM Sans, sans-serif; font-size: 14px; color: #000; outline: none; transition: border-color 0.2s ease; border-radius: 0; appearance: none; }
        .c-input:focus { border-color: #000; }
        .c-input::placeholder { color: #bbb; }
        .c-submit { width: 100%; padding: 16px; background: #000; border: none; color: #fff; font-family: Bebas Neue, sans-serif; font-size: 20px; letter-spacing: 0.12em; cursor: pointer; transition: background 0.2s ease; }
        .c-submit:hover { background: #222; }
        .c-info-card { background: #fff; padding: 28px 24px; }
        .c-social { display: inline-flex; align-items: center; gap: 8px; padding: 10px 20px; border: 1.5px solid #000; font-family: DM Sans, sans-serif; font-size: 12px; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; text-decoration: none; color: #000; transition: background 0.2s, color 0.2s; margin-right: 10px; margin-top: 10px; }
        .c-social:hover { background: #000; color: #fff; }
        .c-link { color: #000; text-decoration: underline; text-underline-offset: 3px; font-weight: 500; word-break: break-all; font-size: 15px; }
        .c-link:hover { opacity: 0.6; }
        .c-span2 { grid-column: 1 / -1; }
      ` }} />

      {/* Hero */}
      <div style={{ borderBottom: "1px solid #e5e5e5", padding: "80px 24px 56px", position: "relative", overflow: "hidden", marginTop: "20px"}}>
        <p style={{ fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#aaa", marginBottom: "20px", fontWeight: 500 }}>
          Reach Out
        </p>
        <h1 style={{ fontFamily: "Bebas Neue, sans-serif", fontSize: "clamp(56px, 14vw, 130px)", lineHeight: 0.88, letterSpacing: "0.03em", color: "#000" }}>
          CONTACT US
        </h1>
        <p style={{ fontSize: "15px", color: "#666", lineHeight: 1.8, maxWidth: "480px", marginTop: "28px" }}>
          Have a question about an order, product, or partnership? We are here to help. Reach out and we will get back to you as soon as possible.
        </p>
       
      </div>

      {/* Info Cards */}
      <div style={{ background: "#e5e5e5" }}>
        <div className="c-info-cards">
          {[
            { label: "Location", value: "Sialkot, Pakistan", icon: "&#9679;" },
            { label: "Phone", value: "+44 7513 400064", href: "tel:+923265546298", icon: "&#9679;" },
            { label: "Email", value: "baseerbutt444@gmail.com", href: "mailto:baseerbutt444@gmail.com", icon: "&#9679;" },
            { label: "Website", value: "KaleemSons.vercel.app", href: "https://KaleemSons.vercel.app", icon: "&#9679;" },
          ].map((item) => (
            <div key={item.label} className="c-info-card">
              <p style={{ fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#aaa", marginBottom: "10px", fontWeight: 600 }}>
                {item.label}
              </p>
              {item.href ? (
                <a href={item.href} className="c-link">{item.value}</a>
              ) : (
                <p style={{ fontSize: "15px", color: "#000", fontWeight: 500 }}>{item.value}</p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="c-pad" style={{ borderBottom: "1px solid #e5e5e5" }}>
        <div className="c-grid">

          {/* Form */}
          <div>
            <p style={{ fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#aaa", marginBottom: "14px", fontWeight: 500 }}>
              Send a Message
            </p>
            <h2 style={{ fontFamily: "Bebas Neue, sans-serif", fontSize: "clamp(32px, 5vw, 52px)", letterSpacing: "0.04em", color: "#000", lineHeight: 1, marginBottom: "36px" }}>
              GET IN
              <br />
              TOUCH
            </h2>

            {submitted ? (
              <div style={{ padding: "40px 32px", border: "1.5px solid #000", textAlign: "center" }}>
                <div style={{ fontFamily: "Bebas Neue, sans-serif", fontSize: "48px", color: "#000", letterSpacing: "0.06em", marginBottom: "12px" }}>
                  SENT
                </div>
                <p style={{ fontSize: "14px", color: "#666", lineHeight: 1.7 }}>
                  Thank you for reaching out. We will get back to you within 24 hours.
                </p>
                <button onClick={() => { setSubmitted(false); setForm({ name: "", email: "", phone: "", subject: "", message: "" }); }} style={{ marginTop: "24px", padding: "10px 28px", background: "transparent", border: "1.5px solid #000", fontFamily: "DM Sans, sans-serif", fontSize: "13px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", cursor: "pointer" }}>
                  Send Another
                </button>
              </div>
            ) : (
              <div>
                <div className="c-form-grid">
                  <div>
                    <label style={{ fontSize: "11px", letterSpacing: "0.15em", textTransform: "uppercase", color: "#888", fontWeight: 600, display: "block", marginBottom: "8px" }}>
                      Full Name *
                    </label>
                    <input name="name" value={form.name} onChange={handleChange} placeholder="Your name" className="c-input" />
                  </div>
                  <div>
                    <label style={{ fontSize: "11px", letterSpacing: "0.15em", textTransform: "uppercase", color: "#888", fontWeight: 600, display: "block", marginBottom: "8px" }}>
                      Email *
                    </label>
                    <input name="email" value={form.email} onChange={handleChange} placeholder="your@email.com" className="c-input" />
                  </div>
                  <div>
                    <label style={{ fontSize: "11px", letterSpacing: "0.15em", textTransform: "uppercase", color: "#888", fontWeight: 600, display: "block", marginBottom: "8px" }}>
                      Phone
                    </label>
                    <input name="phone" value={form.phone} onChange={handleChange} placeholder="+92 300 0000000" className="c-input" />
                  </div>
                  <div>
                    <label style={{ fontSize: "11px", letterSpacing: "0.15em", textTransform: "uppercase", color: "#888", fontWeight: 600, display: "block", marginBottom: "8px" }}>
                      Subject *
                    </label>
                    <select name="subject" value={form.subject} onChange={handleChange} className="c-input">
                      <option value="">Select a topic</option>
                      <option value="order">Order Inquiry</option>
                      <option value="return">Return / Exchange</option>
                      <option value="product">Product Question</option>
                      <option value="wholesale">Wholesale / Partnership</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div className="c-span2">
                    <label style={{ fontSize: "11px", letterSpacing: "0.15em", textTransform: "uppercase", color: "#888", fontWeight: 600, display: "block", marginBottom: "8px" }}>
                      Message *
                    </label>
                    <textarea name="message" value={form.message} onChange={handleChange} placeholder="Tell us how we can help..." className="c-input" rows={6} style={{ resize: "vertical" }} />
                  </div>
                  <div className="c-span2">
                    <button onClick={handleSubmit} className="c-submit">
                      SEND MESSAGE
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Side Info */}
          <div style={{ marginTop: "48px" }}>
            <p style={{ fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#aaa", marginBottom: "14px", fontWeight: 500 }}>
              Follow Us
            </p>
            <h2 style={{ fontFamily: "Bebas Neue, sans-serif", fontSize: "clamp(32px, 5vw, 52px)", letterSpacing: "0.04em", color: "#000", lineHeight: 1, marginBottom: "24px" }}>
              FIND US
              <br />
              ONLINE
            </h2>
            <div style={{ marginBottom: "40px" }}>
              <a href="https://instagram.com/Kaleemandsons" target="_blank" rel="noopener noreferrer" className="c-social">
                Instagram
              </a>
              <a href="https://facebook.com/Kaleemsons" target="_blank" rel="noopener noreferrer" className="c-social">
                Facebook
              </a>
            </div>

            <div style={{ padding: "32px", background: "#000", marginBottom: "24px" }}>
              <p style={{ fontSize: "11px", letterSpacing: "0.15em", textTransform: "uppercase", color: "#555", marginBottom: "14px", fontWeight: 500 }}>
                Business Hours
              </p>
              {[
                { day: "Monday - Friday", time: "9:00 AM - 6:00 PM" },
                { day: "Saturday", time: "10:00 AM - 4:00 PM" },
                { day: "Sunday", time: "Closed" },
              ].map((h) => (
                <div key={h.day} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingBottom: "12px", marginBottom: "12px", borderBottom: "1px solid #222" }}>
                  <span style={{ fontSize: "13px", color: "#aaa" }}>{h.day}</span>
                  <span style={{ fontSize: "13px", color: "#fff", fontWeight: 500 }}>{h.time}</span>
                </div>
              ))}
            </div>

            <div style={{ padding: "24px", border: "1.5px solid #e5e5e5" }}>
              <p style={{ fontSize: "11px", letterSpacing: "0.15em", textTransform: "uppercase", color: "#aaa", marginBottom: "10px", fontWeight: 500 }}>
                Response Time
              </p>
              <p style={{ fontSize: "14px", color: "#444", lineHeight: 1.7 }}>
                We typically respond to all inquiries within <strong style={{ color: "#000" }}>24 hours</strong> during business days.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}