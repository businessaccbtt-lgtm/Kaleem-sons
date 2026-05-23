"use client";

import { useState, useEffect } from "react";

const products = [
  "Oversize Tees",
  "Hoodies",
  "Half Compression Shirts",
  "Tank Tops & Vests",
  "Training Shorts",
  "karate",
  "jiu-jitsu",
];

const reasons = [
  { title: "Premium Quality", desc: "Sports wear and fitness clothing built to last through every session." },
  { title: "Performance First", desc: "Designed for training, workouts, and bodybuilding with a strong focus on fit and durability." },
  { title: "Sialkot Crafted", desc: "Made in Sialkot, the global capital of sports manufacturing, Pakistan." },
  { title: "Trusted Brand", desc: "A reliable Pakistani activewear and gym apparel brand growing with the fitness community." },
];

export default function AboutPage() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div style={{ minHeight: "100vh", background: "#fff", fontFamily: "DM Sans, sans-serif", overflowX: "hidden" }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&family=Bebas+Neue&display=swap" rel="stylesheet" />
      <style dangerouslySetInnerHTML={{ __html: `
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .about-fade { opacity: 0; transform: translateY(24px); transition: opacity 0.7s ease, transform 0.7s ease; }
        .about-fade.visible { opacity: 1; transform: translateY(0); }
        .hero-title { font-size: clamp(52px, 14vw, 140px); }
        .hero-sub { font-size: clamp(52px, 14vw, 140px); }
        .section-pad { padding: 64px 24px; }
        .vision-grid { display: block; }
        .reasons-grid { display: grid; grid-template-columns: 1fr; gap: 1px; }
        .products-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1px; }
        .contact-grid { display: block; }
        .founder-layout { display: block; }
        .founder-text { padding: 32px 24px; }
        .founder-badge { padding: 32px 24px; }
        @media (min-width: 640px) {
          .section-pad { padding: 80px 40px; }
          .reasons-grid { grid-template-columns: 1fr 1fr; }
          .products-grid { grid-template-columns: 1fr 1fr 1fr; }
        }
        @media (min-width: 900px) {
          .section-pad { padding: 100px 80px; }
          .vision-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items: center; }
          .reasons-grid { grid-template-columns: 1fr 1fr; }
          .contact-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 60px; }
          .founder-layout { display: grid; grid-template-columns: 1fr 1fr; }
          .founder-text { padding: 64px 56px; }
          .founder-badge { padding: 64px 56px; }
        }
        .product-item { padding: 20px; border: 1px solid #e8e8e8; transition: background 0.2s ease, color 0.2s ease; cursor: default; }
        .product-item:hover { background: #000; color: #fff; }
        .contact-link { color: #000; text-decoration: underline; text-underline-offset: 3px; font-weight: 500; word-break: break-all; }
        .contact-link:hover { opacity: 0.6; }
        .social-btn { display: inline-block; padding: 10px 20px; border: 1.5px solid #000; font-family: DM Sans, sans-serif; font-size: 12px; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; text-decoration: none; color: #000; transition: background 0.2s ease, color 0.2s ease; margin-right: 10px; margin-top: 10px; }
        .social-btn:hover { background: #000; color: #fff; }
      ` }} />

     

      {/* Who We Are */}
      
      <div className="section-pad" style={{ borderBottom: "1px solid #e5e5e5" }}>
        <div className="vision-grid">
          <div>
           
             <div className={`about-fade ${visible ? "visible" : ""}`} style={{ transitionDelay: "0s" }}>
          <p style={{ fontSize: "13px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#aaa", marginBottom: "16px", fontWeight: 500 }}>
            Est. Sialkot, Pakistan
          </p>
        </div>
            <h2 style={{ fontFamily: "Bebas Neue, sans-serif", fontSize: "clamp(36px, 6vw, 64px)", letterSpacing: "0.04em", color: "#000", lineHeight: 1, marginBottom: "32px" }}>
              ABOUT
              <br />
              KALEEM SONS
            </h2>
            <div style={{ width: "40px", height: "2px", background: "#000", marginBottom: "32px" }} />
          </div>
          <div>
            <p style={{ fontSize: "15px", color: "#444", lineHeight: 1.9, marginBottom: "20px" }}>
              Kaleem Sons is a premium gym and fitness clothing brand in Pakistan, proudly based in Sialkot — a city globally recognized for sports and athletic manufacturing excellence.
            </p>
            <p style={{ fontSize: "15px", color: "#444", lineHeight: 1.9, marginBottom: "20px" }}>
              Founded and owned by Mohammad Baseer Bin Kaleem, our mission is to provide high-performance gym wear that combines strength, comfort, and modern athletic style.
            </p>
            <p style={{ fontSize: "15px", color: "#444", lineHeight: 1.9 }}>
              Every product reflects durability, flexibility, and a powerful fit that supports peak performance — whether you are in the gym, on the track, or living an active lifestyle.
            </p>
          </div>
        </div>
      </div>
       {/* Watermark */}
        <div style={{ position: "absolute", right: "-20px", bottom: "-20px", fontFamily: "Bebas Neue, sans-serif", fontSize: "clamp(80px, 20vw, 220px)", color: "#f0f0f0", lineHeight: 1, pointerEvents: "none", userSelect: "none", letterSpacing: "0.02em" }}>
          KS
        </div>
      

      {/* Vision */}
      <div style={{ background: "#000", padding: "0" }}>
        <div className="section-pad">
          <p style={{ fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#666", marginBottom: "16px", fontWeight: 500 }}>
            Our Vision
          </p>
          <h2 style={{ fontFamily: "Bebas Neue, sans-serif", fontSize: "clamp(28px, 5vw, 52px)", letterSpacing: "0.04em", color: "#fff", lineHeight: 1.1, maxWidth: "800px" }}>
            TO BECOME A LEADING GYM CLOTHING BRAND IN PAKISTAN, DELIVERING PREMIUM WORKOUT WEAR THAT MEETS INTERNATIONAL QUALITY STANDARDS.
          </h2>
          <div style={{ marginTop: "32px", display: "flex", alignItems: "center", gap: "16px" }}>
            <div style={{ width: "40px", height: "1px", background: "#444" }} />
            <p style={{ fontSize: "13px", color: "#666", letterSpacing: "0.08em", textTransform: "uppercase" }}>
              Representing Pakistan's Growing Fitness Culture
            </p>
          </div>
        </div>
      </div>

      {/* Products */}
      <div className="section-pad" style={{ borderBottom: "1px solid #e5e5e5" }}>
        <p style={{ fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#aaa", marginBottom: "16px", fontWeight: 500 }}>
          What We Make
        </p>
        <h2 style={{ fontFamily: "Bebas Neue, sans-serif", fontSize: "clamp(36px, 6vw, 64px)", letterSpacing: "0.04em", color: "#000", lineHeight: 1, marginBottom: "8px" }}>
          OUR PRODUCT RANGE
        </h2>
        <p style={{ fontSize: "14px", color: "#888", marginBottom: "40px", lineHeight: 1.6 }}>
          A complete range of gym and fitness apparel designed for intense training.
        </p>
        <div className="products-grid">
          {products.map((p, i) => (
            <div key={i} className="product-item">
              <span style={{ fontFamily: "Bebas Neue, sans-serif", fontSize: "11px", letterSpacing: "0.15em", color: "#bbb", display: "block", marginBottom: "6px" }}>
                0{i + 1}
              </span>
              <span style={{ fontFamily: "DM Sans, sans-serif", fontSize: "14px", fontWeight: 500, lineHeight: 1.4 }}>
                {p}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="section-pad" style={{ borderBottom: "1px solid #e5e5e5", background: "#fafafa" }}>
        <p style={{ fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#aaa", marginBottom: "16px", fontWeight: 500 }}>
          Why Us
        </p>
        <h2 style={{ fontFamily: "Bebas Neue, sans-serif", fontSize: "clamp(36px, 6vw, 64px)", letterSpacing: "0.04em", color: "#000", lineHeight: 1, marginBottom: "48px" }}>
          WHY CHOOSE
          <br />
          KALEEM SONS
        </h2>
        <div className="reasons-grid">
          {reasons.map((r, i) => (
            <div key={i} style={{ padding: "32px", border: "1px solid #e5e5e5", background: "#fff" }}>
              <div style={{ width: "32px", height: "32px", background: "#000", borderRadius: "2px", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "20px" }}>
                <span style={{ fontFamily: "Bebas Neue, sans-serif", fontSize: "14px", color: "#fff", letterSpacing: "0.05em" }}>
                  0{i + 1}
                </span>
              </div>
              <h3 style={{ fontFamily: "Bebas Neue, sans-serif", fontSize: "22px", letterSpacing: "0.06em", color: "#000", marginBottom: "12px" }}>
                {r.title}
              </h3>
              <p style={{ fontSize: "14px", color: "#666", lineHeight: 1.75 }}>
                {r.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Founder */}
      <div style={{ borderBottom: "1px solid #e5e5e5" }}>
        <div className="founder-layout">
          <div className="founder-text" style={{ background: "#fff" }}>
            <p style={{ fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#aaa", marginBottom: "16px", fontWeight: 500 }}>
              Leadership
            </p>
            <h2 style={{ fontFamily: "Bebas Neue, sans-serif", fontSize: "clamp(32px, 5vw, 56px)", letterSpacing: "0.04em", color: "#000", lineHeight: 1.05, marginBottom: "28px" }}>
              FOUNDER
              <br />
              AND OWNER
            </h2>
            <div style={{ width: "40px", height: "2px", background: "#000", marginBottom: "28px" }} />
            <p style={{ fontSize: "15px", color: "#444", lineHeight: 1.9, marginBottom: "16px" }}>
              Kaleem Sons was founded and is owned by <strong style={{ color: "#000" }}>Mohammad Baseer Bin Kaleem</strong>, a Pakistani entrepreneur passionate about fitness and athletic fashion.
            </p>
            <p style={{ fontSize: "15px", color: "#444", lineHeight: 1.9 }}>
              Under his leadership, Kaleem Sons continues to grow as a reliable fitness clothing and gym wear brand in Pakistan, inspiring athletes to push beyond their limits.
            </p>
          </div>
          <div className="founder-badge" style={{ background: "#000", display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <p style={{ fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#555", marginBottom: "20px", fontWeight: 500 }}>
              Our Commitment
            </p>
            <p style={{ fontFamily: "Bebas Neue, sans-serif", fontSize: "clamp(22px, 3.5vw, 34px)", color: "#fff", lineHeight: 1.3, letterSpacing: "0.04em", marginBottom: "28px" }}>
              FROM FABRIC SELECTION TO FINAL STITCHING, EVERY DETAIL IS CRAFTED FOR LONG-LASTING QUALITY AND COMFORT.
            </p>
            <div style={{ width: "40px", height: "1px", background: "#333" }} />
          </div>
        </div>
      </div>

     
    </div>
  );
}