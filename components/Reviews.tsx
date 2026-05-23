"use client"

import { useState } from "react"

const reviews = [
  {
    name: "Ahmed K.",
    location: "Lahore",
    rating: 5,
    text: "Absolutely love the quality! The fabric is premium and the stitching is perfect. Will definitely order again.",
    product: "Classic Shalwar Kameez",
    avatar: "AK",
  },
  {
    name: "Sara M.",
    location: "Karachi",
    rating: 5,
    text: "Fast delivery and the clothes look even better in person. The sizing guide was really helpful too!",
    product: "Ash Grey Oversized",
    avatar: "SM",
  },
  {
    name: "Bilal R.",
    location: "Islamabad",
    rating: 5,
    text: "Ordered for Eid and received it on time. The packaging was beautiful and the outfit was stunning.",
    product: "Mocha Sherpa",
    avatar: "BR",
  },
  {
    name: "Fatima Z.",
    location: "Sialkot",
    rating: 5,
    text: "Great quality for the price. Customer support was also very helpful when I had a question about sizing.",
    product: "Navy Split Logo",
    avatar: "FZ",
  },
  {
    name: "Omar S.",
    location: "Peshawar",
    rating: 5,
    text: "Been buying from Kaleem Sons for 2 years now. Never disappointed. My go-to for formal wear.",
    product: "Black Forge",
    avatar: "OS",
  },
  {
    name: "Elsa T.",
    location: "Multan",
    rating: 4.8,
    text: "The fabric quality is unmatched at this price point. Highly recommend to anyone looking for premium clothing.",
    product: "Ecru Pigment Dyed",
    avatar: "ET",
  },
]

function Stars({ count }: { count: number }) {
  return (
    <div style={{ display: "flex", gap: "2px" }}>
      {[1, 2, 3, 4, 5].map((i) => (
        <svg
          key={i}
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill={i <= count ? "#f5a623" : "none"}
          stroke={i <= count ? "#f5a623" : "#ddd"}
          strokeWidth="2"
        >
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
    </div>
  )
}

export default function Reviews() {
  const [showAll, setShowAll] = useState(false)
  const visible = showAll ? reviews : reviews.slice(0, 3)

  return (
    <>
      <style>{`
        .reviews-section {
          padding: 64px 24px;
          background: #fff;
        }
        .reviews-header {
          text-align: center;
          margin-bottom: 40px;
        }
        .reviews-label {
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--primary);
          margin-bottom: 8px;
        }
        .reviews-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(1.4rem, 3vw, 2.4rem);
          font-weight: 600;
          color: var(--dark);
          margin-bottom: 12px;
          line-height: 1.2;
        }
        .reviews-meta {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          font-size: 0.82rem;
          color: var(--gray);
        }
        .reviews-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
          max-width: 1100px;
          margin: 0 auto;
        }
        .review-card {
          background: var(--light);
          border-radius: 12px;
          padding: 18px;
          border: 1px solid rgba(0,0,0,0.07);
          display: flex;
          flex-direction: column;
          gap: 10px;
          transition: box-shadow 0.2s ease;
        }
        .review-card:hover {
          box-shadow: 0 4px 20px rgba(0,0,0,0.07);
        }
        .review-text {
          font-size: 0.84rem;
          line-height: 1.65;
          color: #555;
          flex: 1;
          margin: 0;
        }
        .review-product {
          font-size: 0.68rem;
          color: var(--primary);
          font-weight: 700;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          margin: 0;
        }
        .review-footer {
          display: flex;
          align-items: center;
          gap: 10px;
          border-top: 1px solid rgba(0,0,0,0.06);
          padding-top: 10px;
        }
        .review-avatar {
          width: 34px;
          height: 34px;
          border-radius: 50%;
          background: var(--dark);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.68rem;
          font-weight: 700;
          flex-shrink: 0;
        }
        .review-name {
          font-size: 0.8rem;
          font-weight: 600;
          margin: 0;
          color: var(--dark);
        }
        .review-location {
          font-size: 0.7rem;
          color: var(--gray);
          margin: 0;
        }
        .verified-icon {
          margin-left: auto;
        }
        .reviews-footer {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 20px;
          margin-top: 32px;
        }
        .view-more-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: transparent;
          border: 1.5px solid var(--dark);
          color: var(--dark);
          font-size: 0.82rem;
          font-weight: 600;
          padding: 10px 24px;
          border-radius: 999px;
          cursor: pointer;
          letter-spacing: 0.03em;
          transition: background 0.2s, color 0.2s;
        }
        .view-more-btn:hover {
          background: var(--dark);
          color: #fff;
        }
        .view-more-btn svg {
          transition: transform 0.3s ease;
        }
        .view-more-btn.open svg {
          transform: rotate(180deg);
        }

        /* Mobile */
        @media (max-width: 768px) {
          .reviews-section {
            padding: 48px 16px;
          }
          .reviews-grid {
            grid-template-columns: 1fr;
            gap: 10px;
          }
          .review-card {
            padding: 14px 16px;
            border-radius: 10px;
            gap: 8px;
            flex-direction: row;
            flex-wrap: wrap;
          }
          .review-card-top {
            display: flex;
            flex-direction: column;
            gap: 6px;
            width: 100%;
          }
          .review-text {
            font-size: 0.8rem;
            line-height: 1.55;
            width: 100%;
          }
          .review-footer {
            width: 100%;
            padding-top: 8px;
          }
          .review-avatar {
            width: 28px;
            height: 28px;
            font-size: 0.6rem;
          }
          .review-name {
            font-size: 0.75rem;
          }
          .review-location {
            font-size: 0.65rem;
          }
        }
      `}</style>

      <section className="reviews-section">
        {/* Header */}
        <div className="reviews-header">
          <p className="reviews-label">Customer Reviews</p>
          <h2 className="reviews-title">What Our Customers Say</h2>
          <div className="reviews-meta">
            <Stars count={5} />
            <span>4.9 out of 5 — based on 200+ reviews</span>
          </div>
        </div>

        {/* Grid */}
        <div className="reviews-grid">
          {visible.map((review) => (
            <div key={review.name} className="review-card">
              <div className="review-card-top">
                <Stars count={review.rating} />
                <p className="review-text">"{review.text}"</p>
                <p className="review-product">Purchased: {review.product}</p>
              </div>

              <div className="review-footer">
                <div className="review-avatar">{review.avatar}</div>
                <div>
                  <p className="review-name">{review.name}</p>
                  <p className="review-location">{review.location}</p>
                </div>
                <div className="verified-icon">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#25D366" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View More */}
        <div className="reviews-footer">
          <button
            className={`view-more-btn ${showAll ? "open" : ""}`}
            onClick={() => setShowAll((prev) => !prev)}
          >
            {showAll ? "Show Less" : `View All Reviews (${reviews.length})`}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>
        </div>
      </section>
    </>
  )
}