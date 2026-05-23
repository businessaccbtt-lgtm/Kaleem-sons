"use client";

import { useState } from "react";

const faqs = [
  {
    category: "Orders & Shipping",
    items: [
      {
        q: "How long does standard shipping take?",
        a: "Standard shipping takes 3-5 business days within the country. Express options (1-2 business days) are available at checkout. International orders may take 7-14 business days depending on the destination.",
      },
      {
        q: "Can I track my order?",
        a: "Yes. Once your order ships, you will receive a confirmation email with a tracking number. You can use it on our website or the carrier's site to follow your package in real time.",
      },
      {
        q: "Do you offer free shipping?",
        a: "We offer free standard shipping on all orders over $75. Orders below that threshold have a flat shipping fee applied at checkout.",
      },
    ],
  },
  {
    category: "Returns & Exchanges",
    items: [
      {
        q: "What is your return policy?",
        a: "We accept returns within 30 days of delivery. Items must be unworn, unwashed, and in original packaging with all tags attached. Sale items are final sale and cannot be returned.",
      },
      {
        q: "How do I start a return or exchange?",
        a: "Visit our Returns Portal, enter your order number and email address, and follow the steps. Once approved, you will receive a prepaid return label via email within 24 hours.",
      },
      {
        q: "When will I receive my refund?",
        a: "Refunds are processed within 5-7 business days of us receiving your return. The amount will appear on your original payment method. Processing times may vary by bank.",
      },
    ],
  },
  {
    category: "Sizing & Fit",
    items: [
      {
        q: "How do I find my size?",
        a: "Each product page includes a detailed size guide with measurements in both cm and inches. We recommend measuring your chest, waist, and hips and comparing against the chart before ordering.",
      },
      {
        q: "Do your products run true to size?",
        a: "Most of our performance gear is designed for an athletic fit. If you prefer a looser feel, we recommend sizing up one size. Product pages include fit notes for each style.",
      },
      {
        q: "What if my size is out of stock?",
        a: "You can sign up for restock notifications directly on the product page by clicking Notify Me. We typically restock popular items within 2-4 weeks.",
      },
    ],
  },
  {
    category: "Products & Care",
    items: [
      {
        q: "How should I wash my sportswear?",
        a: "Machine wash cold on a gentle cycle with like colors. Do not use bleach or fabric softeners as they break down performance fabrics. Tumble dry low or air dry.",
      },
      {
        q: "Are your products made sustainably?",
        a: "Our performance fabrics are made with a minimum of 50% recycled materials, and our packaging is 100% recyclable. We publish an annual sustainability report on our website.",
      },
    ],
  },
  {
    category: "Account & Payments",
    items: [
      {
        q: "What payment methods do you accept?",
        a: "We accept all major credit and debit cards (Visa, Mastercard, Amex), PayPal, Apple Pay, Google Pay, and Klarna for buy-now-pay-later options.",
      },
      {
        q: "Is my payment information secure?",
        a: "Absolutely. We use industry-standard SSL encryption and never store your full card details. All transactions are processed through certified PCI-DSS compliant payment providers.",
      },
      {
        q: "How do I use a discount code?",
        a: "Enter your discount code in the Promo Code field at checkout before completing your order. Only one code can be used per order.",
      },
    ],
  },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div onClick={() => setOpen(!open)} style={{ borderBottom: "1px solid #000", cursor: "pointer" }}>
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
      <div style={{ overflow: "hidden", maxHeight: open ? "400px" : "0px", transition: "max-height 0.35s ease" }}>
        <p style={{ fontFamily: "DM Sans, sans-serif", fontSize: "13px", color: "#555", lineHeight: 1.75, paddingBottom: "18px", margin: 0 }}>
          {a}
        </p>
      </div>
    </div>
  );
}

const contactStyle: React.CSSProperties = {
  color: "#000",
  fontWeight: 600,
  textDecoration: "underline",
  textUnderlineOffset: "3px",
  fontSize: "14px",

};

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState(faqs[0].category);
  const [menuOpen, setMenuOpen] = useState(false);
  const activeFaqs = faqs.find((f) => f.category === activeCategory)?.items ?? [];

  function selectCategory(cat: string) {
    setActiveCategory(cat);
    setMenuOpen(false);
  }

  return (
    <div style={{ minHeight: "100vh", background: "#fff", fontFamily: "DM Sans, sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&family=Bebas+Neue&display=swap" rel="stylesheet" />
      <style dangerouslySetInnerHTML={{ __html: `
        .faq-hero { padding: 56px 24px 40px; flex-direction: column; gap: 16px; margin:30px; }
        .faq-hero-right { align-items: flex-start; }
        .faq-hero-right p { text-align: left; }
        .faq-grid { display: block; }
        .faq-left-panel { display: none; }
        .faq-right-panel { padding: 24px 20px 60px; }
        .faq-cat-bar { padding: 16px 20px; }
        .faq-h1 { font-size: 52px; }
        .faq-questions { font-size: 52px; }
        .faq-mobile-only { display: block; }
        .faq-desktop-cats { display: none; }
        .faq-mobile-dropdown { display: block; }
        @media (min-width: 768px) {
          .faq-hero { padding: 72px 40px 56px; flex-direction: row; gap: 24px; }
          .faq-hero-right { align-items: flex-end; }
          .faq-hero-right p { text-align: right; }
          .faq-grid { display: grid; grid-template-columns: 1fr 2fr; }
          .faq-left-panel { display: block; }
          .faq-right-panel { padding: 48px 56px 80px; }
          .faq-cat-bar { padding: 24px 40px; }
          .faq-h1 { font-size: clamp(64px, 10vw, 120px); }
          .faq-questions { font-size: clamp(64px, 10vw, 120px); }
          .faq-mobile-only { display: none; }
          .faq-desktop-cats { display: flex; }
          .faq-mobile-dropdown { display: none; }
        }
      ` }} />

      {/* Hero */}
      <div className="faq-hero" style={{ borderBottom: "1px solid #e5e5e5", display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
        <div>
          <p style={{ fontSize: "11px", letterSpacing: "0.18em", textTransform: "uppercase", color: "#888", margin: "0 0 12px 0", fontWeight: 500 }}>
            Support
          </p>
          <h1 className="faq-h1" style={{ fontFamily: "Bebas Neue, sans-serif", lineHeight: 0.9, letterSpacing: "0.04em", color: "#000", margin: 0 }}>
            FREQUENTLY
            <br />
            ASKED Questions
          </h1>
        </div>
        <div className="faq-hero-right" style={{ display: "flex", flexDirection: "column", gap: "10px", paddingBottom: "4px" }}>
        
          <p style={{ fontSize: "13px", color: "#666", maxWidth: "240px", lineHeight: 1.6, margin: 0 }}>
            Everything you need to know about orders, returns, sizing, and more.
          </p>
        </div>
      </div>

      {/* Mobile dropdown */}
      <div className="faq-mobile-dropdown" style={{ padding: "16px 20px", borderBottom: "1px solid #e5e5e5" }}>
        <button onClick={() => setMenuOpen(!menuOpen)} style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", background: "#000", border: "none", padding: "12px 16px", cursor: "pointer", borderRadius: "2px" }}>
          <span style={{ fontFamily: "DM Sans, sans-serif", fontSize: "13px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "#fff" }}>
            {activeCategory}
          </span>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ transform: menuOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s ease" }}>
            <path d="M2 4l4 4 4-4" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <div style={{ overflow: "hidden", maxHeight: menuOpen ? "400px" : "0px", transition: "max-height 0.3s ease", border: menuOpen ? "1px solid #e5e5e5" : "none", borderTop: "none" }}>
          {faqs.map((f) => {
            const isActive = activeCategory === f.category;
            return (
              <button key={f.category} onClick={() => selectCategory(f.category)} style={{ width: "100%", textAlign: "left", padding: "12px 16px", background: isActive ? "#f5f5f5" : "#fff", border: "none", borderBottom: "1px solid #f0f0f0", fontFamily: "DM Sans, sans-serif", fontSize: "13px", fontWeight: isActive ? 600 : 400, color: "#000", cursor: "pointer", letterSpacing: "0.04em" }}>
                {f.category}
              </button>
            );
          })}
        </div>
      </div>

      {/* Desktop category pills */}
      <div className="faq-desktop-cats faq-cat-bar" style={{ borderBottom: "1px solid #e5e5e5", gap: "10px", flexWrap: "wrap" }}>
        {faqs.map((f) => {
          const isActive = activeCategory === f.category;
          return (
            <button key={f.category} onClick={() => setActiveCategory(f.category)} style={{ background: isActive ? "#000" : "transparent", border: isActive ? "1.5px solid #000" : "1.5px solid #ccc", padding: "8px 18px", fontFamily: "DM Sans, sans-serif", fontSize: "13px", fontWeight: 500, letterSpacing: "0.06em", textTransform: "uppercase", cursor: "pointer", color: isActive ? "#fff" : "#888", borderRadius: "2px", whiteSpace: "nowrap" }}>
              {f.category}
            </button>
          );
        })}
      </div>

      {/* Main grid */}
      <div className="faq-grid" style={{ minHeight: "500px" }}>

        {/* Left panel - desktop only */}
        <div className="faq-left-panel" style={{ borderRight: "1px solid #e5e5e5", padding: "48px 40px", position: "sticky", top: 0, alignSelf: "start" }}>
          <p style={{ fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#aaa", marginBottom: "12px", fontWeight: 500 }}>
            Topic
          </p>
          <h2 style={{ fontFamily: "Bebas Neue, sans-serif", fontSize: "34px", letterSpacing: "0.06em", color: "#000", lineHeight: 1.1, marginBottom: "20px" }}>
            {activeCategory}
          </h2>
          <div style={{ width: "40px", height: "2px", background: "#000", marginBottom: "28px" }} />
          <p style={{ fontSize: "13px", color: "#888", lineHeight: 1.7 }}>
            {activeFaqs.length} question{activeFaqs.length !== 1 ? "s" : ""} in this section
          </p>
          <div style={{ marginTop: "48px" }}>
            <p style={{ fontSize: "11px", letterSpacing: "0.12em", textTransform: "uppercase", color: "#aaa", marginBottom: "10px" }}>
              Still need help?
            </p>
            <a href="mailto:support@strkform.com" style={contactStyle}>
              Contact Support &#8594;
            </a>
          </div>
        </div>

        {/* Right panel */}
        <div className="faq-right-panel">
          <div className="faq-mobile-only" style={{ marginBottom: "24px", paddingBottom: "20px", borderBottom: "1px solid #e5e5e5" }}>
            <p style={{ fontSize: "11px", letterSpacing: "0.12em", textTransform: "uppercase", color: "#aaa", marginBottom: "6px" }}>
              Still need help?
            </p>
            <a href="mailto:support@strkform.com" style={contactStyle}>
              Contact Support &#8594;
            </a>
          </div>
          {activeFaqs.map((item, i) => (
            <FAQItem key={i} q={item.q} a={item.a} />
          ))}
        </div>
      </div>
    </div>
  );
}