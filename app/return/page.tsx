// returns/page.tsx
"use client";

import { useState } from "react";

const steps = [
  { num: "01", title: "Check Eligibility", desc: "Make sure your item is within 7 days of delivery, unworn, unwashed, and has all original tags attached. Sale items are not eligible for return." },
  { num: "02", title: "Contact Us", desc: "Reach out via WhatsApp at +92 326 5546 298 or email baseerbutt444@gmail.com with your order details and reason for return." },
  { num: "03", title: "Get Confirmation", desc: "Our team will review your request and confirm eligibility within 24 hours. We will provide you with return instructions." },
  { num: "04", title: "Ship the Item", desc: "Pack the item securely in its original packaging and send it to our Sialkot address as instructed. Keep your tracking number safe." },
  { num: "05", title: "Refund or Exchange", desc: "Once we receive and inspect the item, your refund or exchange will be processed within 5-7 business days." },
];

const policies = [
  { title: "Return Window", value: "7 days from delivery date" },
  { title: "Item Condition", value: "Unworn, unwashed, tags attached" },
  { title: "Sale Items", value: "Final sale — not eligible" },
  { title: "Processing Time", value: "5-7 business days after receipt" },
  { title: "Exchange Option", value: "Available for size or product swap" },
  { title: "Damaged Items", value: "Report within 48 hours of delivery" },
];

const faqs = [
  { q: "Can I return a sale item?", a: "No. All sale and discounted items are final sale and cannot be returned or exchanged." },
  { q: "What if my item arrived damaged?", a: "Please contact us within 48 hours of delivery with photos of the damage. We will arrange a replacement or refund immediately." },
  { q: "How long does a refund take?", a: "Once we receive and inspect the returned item, refunds are processed within 5-7 business days to your original payment method." },
  { q: "Can I exchange for a different size?", a: "Yes. Size exchanges are available subject to stock. Contact us with your order number and preferred size to begin the process." },
  { q: "Do I pay for return shipping?", a: "Return shipping costs are the responsibility of the customer unless the item arrived damaged or was the wrong product." },
  { q: "What items cannot be returned?", a: "Sale items, accessories, and items that have been worn, washed, or had their tags removed are not eligible for return." },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div onClick={() => setOpen(!open)} style={{ borderBottom: "1px solid #e5e5e5", cursor: "pointer" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "18px 0", gap: "12px" }}>
        <span style={{ fontFamily: "DM Sans, sans-serif", fontWeight: 500, fontSize: "14px", color: "#000", lineHeight: 1.5, flex: 1 }}>
          {q}
        </span>
        <span style={{ width: "26px", height: "26px", minWidth: "26px", borderRadius: "50%", background: open ? "#000" : "transparent", border: "1.5px solid #000", display: "flex", alignItems: "center", justifyContent: "center", transition: "background 0.2s ease" }}>
       <svg width="11" height="11" viewBox="0 0 12 12" fill="none" style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.25s ease" }}>
  <path d="M2 4l4 4 4-4" stroke={open ? "#fff" : "#000"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
</svg>
        </span>
      </div>
      <div style={{ overflow: "hidden", maxHeight: open ? "300px" : "0px", transition: "max-height 0.35s ease" }}>
        <p style={{ fontFamily: "DM Sans, sans-serif", fontSize: "13px", color: "#555", lineHeight: 1.75, paddingBottom: "18px", margin: 0 }}>
          {a}
        </p>
      </div>
    </div>
  );
}

export default function ReturnsPage() {
  return (
    <div style={{ minHeight: "100vh", background: "#fff", fontFamily: "DM Sans, sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&family=Bebas+Neue&display=swap" rel="stylesheet" />
      <style dangerouslySetInnerHTML={{ __html: `
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .r-pad { padding: 64px 24px; }
        .r-policies-grid { display: grid; grid-template-columns: 1fr; gap: 1px; background: #e5e5e5; }
        .r-steps { display: grid; grid-template-columns: 1fr; gap: 1px; background: #e5e5e5; }
        .r-cta-grid { display: block; }
        @media (min-width: 640px) {
          .r-pad { padding: 80px 40px; }
          .r-policies-grid { grid-template-columns: 1fr 1fr; }
          .r-steps { grid-template-columns: 1fr 1fr; }
        }
        @media (min-width: 900px) {
          .r-pad { padding: 100px 80px; }
          .r-policies-grid { grid-template-columns: 1fr 1fr 1fr; }
          .r-cta-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 40px; align-items: center; }
        }
        .r-step-card { background: #fff; padding: 32px 24px; }
        .r-policy-card { background: #fff; padding: 28px 24px; }
        .r-cta-btn { display: inline-block; padding: 14px 32px; background: #fff; border: 2px solid #fff; font-family: Bebas Neue, sans-serif; font-size: 18px; letter-spacing: 0.12em; text-decoration: none; color: #000; transition: background 0.2s, color 0.2s; margin-right: 12px; margin-top: 12px; }
        .r-cta-btn:hover { background: transparent; color: #fff; }
        .r-cta-btn-outline { display: inline-block; padding: 14px 32px; background: transparent; border: 2px solid #fff; font-family: Bebas Neue, sans-serif; font-size: 18px; letter-spacing: 0.12em; text-decoration: none; color: #fff; transition: background 0.2s, color 0.2s; margin-top: 12px; }
        .r-cta-btn-outline:hover { background: #fff; color: #000; }
      ` }} />

      {/* Hero */}
      <div style={{ borderBottom: "1px solid #e5e5e5", padding: "80px 24px 56px", position: "relative", overflow: "hidden", marginTop: "20px" }}>
        <p style={{ fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#aaa", marginBottom: "20px", fontWeight: 500 }}>
          Policy
        </p>
        <h1 style={{ fontFamily: "Bebas Neue, sans-serif", fontSize: "clamp(56px, 14vw, 130px)", lineHeight: 0.88, letterSpacing: "0.03em", color: "#000" }}>
          RETURNS
          <br />
          <span style={{ WebkitTextStroke: "2px #000", color: "black" }}>AND EXCHANGES</span>
        </h1>
        <p style={{ fontSize: "15px", color: "#666", lineHeight: 1.8, maxWidth: "500px", marginTop: "28px" }}>
          We want you to love every Kaleem Sons product. If something is not right, we make the return process as simple as possible.
        </p>
        <div style={{ marginTop: "32px", display: "flex", alignItems: "center", gap: "16px" }}>
          <div style={{ width: "40px", height: "2px", background: "#000" }} />
          <span style={{ fontSize: "12px", letterSpacing: "0.12em", textTransform: "uppercase", color: "#aaa", fontWeight: 500 }}>
            7-Day Return Window
          </span>
        </div>
        
      </div>

      {/* Policy Summary Cards */}
      <div style={{ background: "#e5e5e5" }}>
        <div className="r-policies-grid">
          {policies.map((p) => (
            <div key={p.title} className="r-policy-card">
              <p style={{ fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#aaa", marginBottom: "10px", fontWeight: 600 }}>
                {p.title}
              </p>
              <p style={{ fontSize: "15px", color: "#000", fontWeight: 600, lineHeight: 1.4 }}>
                {p.value}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* How It Works */}
      <div className="r-pad" style={{ borderBottom: "1px solid #e5e5e5" }}>
        <p style={{ fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#aaa", marginBottom: "16px", fontWeight: 500 }}>
          The Process
        </p>
        <h2 style={{ fontFamily: "Bebas Neue, sans-serif", fontSize: "clamp(36px, 6vw, 64px)", letterSpacing: "0.04em", color: "#000", lineHeight: 1, marginBottom: "48px" }}>
          HOW RETURNS
          <br />
          WORK
        </h2>
        <div className="r-steps">
          {steps.map((s) => (
            <div key={s.num} className="r-step-card">
              <div style={{ fontFamily: "Bebas Neue, sans-serif", fontSize: "48px", color: "#ebebeb", lineHeight: 1, marginBottom: "16px", letterSpacing: "0.04em" }}>
                {s.num}
              </div>
              <h3 style={{ fontFamily: "Bebas Neue, sans-serif", fontSize: "22px", letterSpacing: "0.06em", color: "#000", marginBottom: "12px" }}>
                {s.title}
              </h3>
              <p style={{ fontSize: "14px", color: "#666", lineHeight: 1.75 }}>
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ */}
      <div className="r-pad" style={{ borderBottom: "1px solid #e5e5e5", background: "#fafafa" }}>
        <p style={{ fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#aaa", marginBottom: "16px", fontWeight: 500 }}>
          Common Questions
        </p>
        <h2 style={{ fontFamily: "Bebas Neue, sans-serif", fontSize: "clamp(36px, 6vw, 64px)", letterSpacing: "0.04em", color: "#000", lineHeight: 1, marginBottom: "40px" }}>
          RETURNS FAQ
        </h2>
        <div style={{ maxWidth: "800px" }}>
          {faqs.map((f, i) => (
            <FAQItem key={i} q={f.q} a={f.a} />
          ))}
        </div>
      </div>

      
    </div>
  );
}