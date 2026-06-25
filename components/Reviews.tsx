"use client"

import { useState, useEffect } from "react"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

type Review = {
  id?: string
  name: string
  location: string
  rating: number
  text: string
  product: string
  avatar: string
  isStatic?: boolean
}

const STATIC_REVIEWS: Review[] = [
  { name: "James R.",    location: "London, UK",           rating: 5,   text: "Absolutely love the quality! The fabric is premium and the stitching is perfect. Will definitely order again.",              product: "Classic Shalwar Kameez", avatar: "JR", isStatic: true },
  { name: "Sofia M.",    location: "Toronto, Canada",      rating: 5,   text: "Fast delivery and the clothes look even better in person. The sizing guide was really helpful too!",                        product: "Ash Grey Oversized",     avatar: "SM", isStatic: true },
  { name: "Luca B.",     location: "Milan, Italy",         rating: 5,   text: "Ordered for a special occasion and received it on time. The packaging was beautiful and the outfit was stunning.",          product: "Mocha Sherpa",           avatar: "LB", isStatic: true },
  { name: "Emma T.",     location: "New York, USA",        rating: 5,   text: "Great quality for the price. Customer support was also very helpful when I had a question about sizing.",                   product: "Navy Split Logo",        avatar: "ET", isStatic: true },
  { name: "Noah K.",     location: "Berlin, Germany",      rating: 5,   text: "Been buying from Kaleem Sons for 2 years now. Never disappointed. My go-to for formal wear.",                              product: "Black Forge",            avatar: "NK", isStatic: true },
  { name: "Chloe D.",    location: "Paris, France",        rating: 4.8, text: "The fabric quality is unmatched at this price point. Highly recommend to anyone looking for premium clothing.",             product: "Ecru Pigment Dyed",      avatar: "CD", isStatic: true },
  { name: "Aiden W.",    location: "Sydney, Australia",    rating: 5,   text: "The stitching detail is incredible. You can tell a lot of care goes into every piece.",                                    product: "Classic Shalwar Kameez", avatar: "AW", isStatic: true },
  { name: "Isabelle V.", location: "Amsterdam, Netherlands", rating: 5, text: "Wore this to a formal dinner and got so many compliments. Absolutely worth every penny.",                                  product: "Mocha Sherpa",           avatar: "IV", isStatic: true },
]

const PRODUCTS = [
  "Classic Shalwar Kameez",
  "Ash Grey Oversized",
  "Mocha Sherpa",
  "Navy Split Logo",
  "Black Forge",
  "Ecru Pigment Dyed",
  "Other",
]

type FormState = {
  name: string
  location: string
  rating: number
  text: string
  product: string
}

const EMPTY_FORM: FormState = { name: "", location: "", rating: 0, text: "", product: "" }

function getInitials(name: string): string {
  return name.trim().split(" ").filter(Boolean).slice(0, 2).map((w) => w[0].toUpperCase()).join("")
}

function Stars({
  count,
  interactive = false,
  onSet,
}: {
  count: number
  interactive?: boolean
  onSet?: (n: number) => void
}) {
  const [hovered, setHovered] = useState(0)
  return (
    <div style={{ display: "flex", gap: "3px" }}>
      {[1, 2, 3, 4, 5].map((i) => (
        <svg
          key={i}
          width={interactive ? 20 : 13}
          height={interactive ? 20 : 13}
          viewBox="0 0 24 24"
          fill={i <= (interactive ? hovered || count : count) ? "#f5a623" : "none"}
          stroke={i <= (interactive ? hovered || count : count) ? "#f5a623" : "#ddd"}
          strokeWidth="2"
          style={{ cursor: interactive ? "pointer" : "default", transition: "fill 0.1s" }}
          onMouseEnter={() => interactive && setHovered(i)}
          onMouseLeave={() => interactive && setHovered(0)}
          onClick={() => interactive && onSet?.(i)}
        >
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
    </div>
  )
}

function ReviewCard({ review }: { review: Review }) {
  return (
    <div className="mq-card">
      <Stars count={review.rating} />
      <p className="mq-card-text">"{review.text}"</p>
      <p className="mq-card-product">Purchased: {review.product}</p>
      <div className="mq-card-footer">
        <div className="mq-avatar">{review.avatar}</div>
        <div>
          <p className="mq-name">{review.name}</p>
          <p className="mq-loc">{review.location}</p>
        </div>
        <div className="mq-verified">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
      </div>
    </div>
  )
}

export default function ReviewsMarquee() {
  const [dbReviews, setDbReviews] = useState<Review[]>([])
  const [modalOpen, setModalOpen] = useState(false)
  const [form, setForm] = useState<FormState>(EMPTY_FORM)
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({})
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    async function fetchReviews() {
      const { data, error } = await supabase
        .from("reviews")
        .select("*")
        .order("created_at", { ascending: false })
      if (!error && data) {
        setDbReviews(
          data.map((r) => ({
            id: r.id,
            name: r.name,
            location: r.location,
            rating: r.rating,
            text: r.text,
            product: r.product,
            avatar: r.avatar,
          }))
        )
      }
    }
    fetchReviews()
  }, [])

  const allReviews = [...STATIC_REVIEWS, ...dbReviews]
  const mid = Math.ceil(allReviews.length / 2)
  const baseRow1 = allReviews.slice(0, mid)
  const baseRow2 = allReviews.slice(mid)
  const row1 = [...baseRow1, ...baseRow1, ...baseRow1, ...baseRow1]
  const row2 = [...baseRow2, ...baseRow2, ...baseRow2, ...baseRow2]
  const avgRating = allReviews.reduce((s, r) => s + r.rating, 0) / allReviews.length

  function validate(): boolean {
    const e: Partial<Record<keyof FormState, string>> = {}
    if (!form.name.trim()) e.name = "Name is required"
    if (!form.location.trim()) e.location = "City / Country is required"
    if (!form.rating) e.rating = "Please select a rating"
    if (!form.text.trim() || form.text.trim().length < 20) e.text = "Review must be at least 20 characters"
    if (!form.product) e.product = "Please select a product"
    setErrors(e)
    return Object.keys(e).length === 0
  }

  async function handleSubmit() {
    if (!validate()) return
    setSubmitting(true)
    const avatar = getInitials(form.name)
    const { error } = await supabase.from("reviews").insert({
      name: form.name.trim(),
      location: form.location.trim(),
      rating: form.rating,
      text: form.text.trim(),
      product: form.product,
      avatar,
    })
    setSubmitting(false)
    if (error) {
      setErrors({ text: "Something went wrong. Please try again." })
      return
    }
    setDbReviews((prev) => [
      { name: form.name.trim(), location: form.location.trim(), rating: form.rating, text: form.text.trim(), product: form.product, avatar },
      ...prev,
    ])
    setSubmitted(true)
  }

  function closeModal() {
    setModalOpen(false)
    setForm(EMPTY_FORM)
    setErrors({})
    setSubmitted(false)
  }

  return (
    <>
      <style>{`
        .mq-section { padding: 72px 0 64px; background: #fff; overflow: hidden; }

        .mq-header { text-align: center; padding: 0 24px; margin-bottom: 44px; }
        .mq-eyebrow { font-size: 0.72rem; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: var(--primary); margin-bottom: 8px; }
        .mq-title { font-family: 'Playfair Display', serif; font-size: clamp(1.5rem, 3vw, 2.4rem); font-weight: 600; color: var(--dark); margin-bottom: 12px; line-height: 1.2; }
        .mq-meta { display: flex; align-items: center; justify-content: center; gap: 10px; font-size: 0.82rem; color: var(--gray); margin-bottom: 20px; }
        .mq-write-btn { display: inline-flex; align-items: center; gap: 7px; background: var(--primary, #8b5a2b); color: #fff; border: none; border-radius: 999px; padding: 11px 28px; font-size: 0.83rem; font-weight: 700; letter-spacing: 0.03em; cursor: pointer; transition: opacity 0.2s; }
        .mq-write-btn:hover { opacity: 0.88; }

        .mq-viewport { position: relative; margin-bottom: 14px; }
        .mq-viewport::before, .mq-viewport::after { content: ''; position: absolute; top: 0; bottom: 0; width: 100px; z-index: 2; pointer-events: none; }
        .mq-viewport::before { left: 0; background: linear-gradient(to right, #fff, transparent); }
        .mq-viewport::after  { right: 0; background: linear-gradient(to left,  #fff, transparent); }

        .mq-track { display: flex; gap: 16px; width: max-content; padding: 6px 0; }
        .mq-track.left  { animation: mqLeft  18s linear infinite; }
        .mq-track.right { animation: mqRight 22s linear infinite; }
        .mq-section:hover .mq-track { animation-play-state: paused; }
        @keyframes mqLeft  { from { transform: translateX(0);    } to { transform: translateX(-50%); } }
        @keyframes mqRight { from { transform: translateX(-50%); } to { transform: translateX(0);    } }
        @media (prefers-reduced-motion: reduce) { .mq-track { animation: none !important; } }

        .mq-card { background: var(--light, #f8f6f3); border: 1px solid rgba(0,0,0,0.07); border-radius: 14px; padding: 20px 22px; width: 340px; flex-shrink: 0; display: flex; flex-direction: column; gap: 10px; transition: box-shadow 0.2s; }
        .mq-card:hover { box-shadow: 0 4px 20px rgba(0,0,0,0.07); }
        .mq-card-text { font-size: 0.85rem; line-height: 1.65; color: #555; margin: 0; flex: 1; }
        .mq-card-product { font-size: 0.68rem; font-weight: 700; letter-spacing: 0.05em; text-transform: uppercase; color: var(--primary); margin: 0; }
        .mq-card-footer { display: flex; align-items: center; gap: 10px; border-top: 1px solid rgba(0,0,0,0.06); padding-top: 10px; }
        .mq-avatar { width: 34px; height: 34px; border-radius: 50%; background: var(--dark); color: #fff; display: flex; align-items: center; justify-content: center; font-size: 0.65rem; font-weight: 700; flex-shrink: 0; }
        .mq-name { font-size: 0.8rem; font-weight: 600; color: var(--dark); margin: 0; }
        .mq-loc  { font-size: 0.68rem; color: var(--gray); margin: 0; }
        .mq-verified { margin-left: auto; }

        .mq-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.45); display: flex; align-items: center; justify-content: center; z-index: 1000; padding: 16px; backdrop-filter: blur(3px); }
        .mq-modal { background: #fff; border-radius: 18px; padding: 32px 28px; width: 100%; max-width: 480px; max-height: 90vh; overflow-y: auto; position: relative; box-shadow: 0 24px 64px rgba(0,0,0,0.18); }
        .mq-modal-close { position: absolute; top: 14px; right: 14px; background: none; border: none; cursor: pointer; color: var(--gray, #888); padding: 4px; border-radius: 50%; transition: background 0.15s; line-height: 1; }
        .mq-modal-close:hover { background: #f3f3f3; }
        .mq-modal-title { font-family: 'Playfair Display', serif; font-size: 1.45rem; font-weight: 600; color: var(--dark); margin: 0 0 4px; }
        .mq-modal-sub { font-size: 0.78rem; color: var(--gray, #888); margin: 0 0 24px; }

        .mq-form-group { display: flex; flex-direction: column; gap: 5px; margin-bottom: 16px; }
        .mq-form-label { font-size: 0.74rem; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase; color: var(--dark); }
        .mq-input, .mq-textarea, .mq-select { border: 1.5px solid rgba(0,0,0,0.13); border-radius: 8px; padding: 9px 12px; font-size: 0.85rem; color: var(--dark); background: #fafafa; outline: none; transition: border-color 0.15s; font-family: inherit; width: 100%; box-sizing: border-box; }
        .mq-input:focus, .mq-textarea:focus, .mq-select:focus { border-color: var(--primary, #8b5a2b); background: #fff; }
        .mq-input.err, .mq-textarea.err, .mq-select.err { border-color: #e05252; }
        .mq-textarea { resize: vertical; min-height: 90px; }
        .mq-form-err  { font-size: 0.7rem; color: #e05252; }
        .mq-char-hint { font-size: 0.68rem; text-align: right; }
        .mq-rating-row { display: flex; align-items: center; gap: 10px; }
        .mq-rating-hint { font-size: 0.75rem; color: var(--gray, #888); }
        .mq-submit-btn { width: 100%; background: var(--dark); color: #fff; border: none; border-radius: 999px; padding: 13px; font-size: 0.9rem; font-weight: 700; letter-spacing: 0.04em; cursor: pointer; margin-top: 8px; transition: opacity 0.2s; }
        .mq-submit-btn:hover:not(:disabled) { opacity: 0.85; }
        .mq-submit-btn:disabled { opacity: 0.55; cursor: not-allowed; }

        .mq-success { text-align: center; padding: 12px 0; }
        .mq-success-icon { width: 54px; height: 54px; border-radius: 50%; background: #e8f8ef; display: flex; align-items: center; justify-content: center; margin: 0 auto 16px; }
        .mq-success-title { font-family: 'Playfair Display', serif; font-size: 1.3rem; font-weight: 600; color: var(--dark); margin: 0 0 8px; }
        .mq-success-text { font-size: 0.83rem; color: var(--gray, #888); margin: 0 0 24px; line-height: 1.6; }
        .mq-success-btn { background: var(--dark); color: #fff; border: none; border-radius: 999px; padding: 11px 32px; font-size: 0.85rem; font-weight: 700; cursor: pointer; transition: opacity 0.2s; }
        .mq-success-btn:hover { opacity: 0.85; }

        @media (max-width: 640px) {
          .mq-card { width: 270px; padding: 16px 18px; }
          .mq-modal { padding: 24px 18px; }
        }
      `}</style>

      <section className="mq-section" aria-label="Customer reviews">

        <div className="mq-header">
          <p className="mq-eyebrow">Customer Reviews</p>
          <h2 className="mq-title">What Our Customers Say</h2>
          <div className="mq-meta">
            <Stars count={Math.round(avgRating)} />
            <span>{avgRating.toFixed(1)} out of 5 — based on {allReviews.length}+ reviews</span>
          </div>
          <button className="mq-write-btn" onClick={() => setModalOpen(true)}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
              <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
            </svg>
            Write a Review
          </button>
        </div>

        <div className="mq-viewport">
          <div className="mq-track left" aria-hidden="true">
            {row1.map((r, i) => <ReviewCard key={`r1-${i}`} review={r} />)}
          </div>
        </div>

        <div className="mq-viewport">
          <div className="mq-track right" aria-hidden="true">
            {row2.map((r, i) => <ReviewCard key={`r2-${i}`} review={r} />)}
          </div>
        </div>

      </section>

      {modalOpen && (
        <div className="mq-overlay" onClick={(e) => e.target === e.currentTarget && closeModal()}>
          <div className="mq-modal" role="dialog" aria-modal="true" aria-label="Write a review">
            <button className="mq-modal-close" onClick={closeModal} aria-label="Close">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            {submitted ? (
              <div className="mq-success">
                <div className="mq-success-icon">
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className="mq-success-title">Thank you!</p>
                <p className="mq-success-text">Your review is now live. Scroll up and you'll see it in the marquee!</p>
                <button className="mq-success-btn" onClick={closeModal}>Done</button>
              </div>
            ) : (
              <>
                <p className="mq-modal-title">Leave a Review</p>
                <p className="mq-modal-sub">Share your experience with other customers</p>

                <div className="mq-form-group">
                  <label className="mq-form-label">Your Name</label>
                  <input className={`mq-input${errors.name ? " err" : ""}`} placeholder="e.g. James R." value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                  {errors.name && <span className="mq-form-err">{errors.name}</span>}
                </div>

                <div className="mq-form-group">
                  <label className="mq-form-label">City &amp; Country</label>
                  <input className={`mq-input${errors.location ? " err" : ""}`} placeholder="e.g. London, UK" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} />
                  {errors.location && <span className="mq-form-err">{errors.location}</span>}
                </div>

                <div className="mq-form-group">
                  <label className="mq-form-label">Product Purchased</label>
                  <select className={`mq-select${errors.product ? " err" : ""}`} value={form.product} onChange={(e) => setForm({ ...form, product: e.target.value })}>
                    <option value="">Select a product...</option>
                    {PRODUCTS.map((p) => <option key={p} value={p}>{p}</option>)}
                  </select>
                  {errors.product && <span className="mq-form-err">{errors.product}</span>}
                </div>

                <div className="mq-form-group">
                  <label className="mq-form-label">Rating</label>
                  <div className="mq-rating-row">
                    <Stars count={form.rating} interactive onSet={(n) => setForm({ ...form, rating: n })} />
                    <span className="mq-rating-hint">
                      {form.rating === 0 ? "Tap to rate" : ["", "Poor", "Fair", "Good", "Very Good", "Excellent"][form.rating]}
                    </span>
                  </div>
                  {errors.rating && <span className="mq-form-err">{errors.rating}</span>}
                </div>

                <div className="mq-form-group">
                  <label className="mq-form-label">Your Review</label>
                  <textarea className={`mq-textarea${errors.text ? " err" : ""}`} placeholder="Tell others about quality, fit, delivery..." value={form.text} onChange={(e) => setForm({ ...form, text: e.target.value })} />
                  <span className="mq-char-hint" style={{ color: form.text.length < 20 ? "#aaa" : "#22c55e" }}>
                    {form.text.length} / 20 min
                  </span>
                  {errors.text && <span className="mq-form-err">{errors.text}</span>}
                </div>

                <button className="mq-submit-btn" onClick={handleSubmit} disabled={submitting}>
                  {submitting ? "Submitting..." : "Submit Review"}
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  )
}