"use client";

import { useState, useEffect, useRef } from "react";

const hoodies = [
  { img: "https://ibtmpcpyulndpakzjxll.supabase.co/storage/v1/object/public/products/slider-cll.jpg", name: "New Collection" },
  { img: "https://ibtmpcpyulndpakzjxll.supabase.co/storage/v1/object/public/products/slider-hoodie.jpg", name: "Premium Hoodies" },
  { img: "https://ibtmpcpyulndpakzjxll.supabase.co/storage/v1/object/public/products/slider-jjj.jpg", name: "Jiu-Jitsu Collection" },
  { img: "https://ibtmpcpyulndpakzjxll.supabase.co/storage/v1/object/public/products/slider-k.jpg", name: "Kaleem Sons" },
  { img: "https://ibtmpcpyulndpakzjxll.supabase.co/storage/v1/object/public/products/slider-karate.jpg", name: "Karate Collection" },
  { img: "https://ibtmpcpyulndpakzjxll.supabase.co/storage/v1/object/public/products/slider-shirt.jpg", name: "T-Shirts Collection" },
  { img: "https://ibtmpcpyulndpakzjxll.supabase.co/storage/v1/object/public/products/slider-store.jpg", name: "Kaleem Sons Store" },
  { img: "https://ibtmpcpyulndpakzjxll.supabase.co/storage/v1/object/public/products/slider-tracksuit.jpg", name: "Tracksuits Collection" },
  { img: "https://ibtmpcpyulndpakzjxll.supabase.co/storage/v1/object/public/products/slider2.jpg", name: "Latest Arrivals" },
]

export default function Slider() {
  const [current, setCurrent] = useState(0);
  const [dragX, setDragX] = useState(0);         // live finger offset
  const [dragging, setDragging] = useState(false);
  const total = hoodies.length;

  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);
  const isHorizontal = useRef(false);
  const sliderRef = useRef<HTMLDivElement>(null);

  const next = () => { setCurrent((p) => (p + 1) % total); setDragX(0); };
  const prev = () => { setCurrent((p) => (p - 1 + total) % total); setDragX(0); };

  useEffect(() => {
    const timer = setInterval(next, 4500);
    return () => clearInterval(timer);
  }, [current]);

  // Register passive:false touchmove so preventDefault works
  useEffect(() => {
    const el = sliderRef.current;
    if (!el) return;
    const onMove = (e: TouchEvent) => {
      if (touchStartX.current === null || touchStartY.current === null) return;
      const dx = e.touches[0].clientX - touchStartX.current;
      const dy = e.touches[0].clientY - touchStartY.current;

      if (!isHorizontal.current) {
        if (Math.abs(dy) > Math.abs(dx)) return; // vertical — let scroll win
        isHorizontal.current = true;
      }

      e.preventDefault();
      setDragging(true);
      setDragX(dx);
    };
    el.addEventListener("touchmove", onMove, { passive: false });
    return () => el.removeEventListener("touchmove", onMove);
  }, []);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
    isHorizontal.current = false;
    setDragging(false);
    setDragX(0);
  };

  const handleTouchEnd = () => {
    if (!isHorizontal.current) return;
    if (dragX < -40) next();
    else if (dragX > 40) prev();
    else setDragX(0);
    setDragging(false);
    touchStartX.current = null;
    touchStartY.current = null;
  };

  const prevIndex = (current - 1 + total) % total;
  const nextIndex = (current + 1) % total;

  // Normalise drag to a -1…1 progress value for subtle card movement
  const progress = dragX / 300; // 300px = full swipe

  // Each card's extra translateX nudge during drag
  const frontExtra   = dragX * 0.6;
  const prevExtra    = dragX * 0.4;
  const nextExtra    = dragX * 0.4;

  const transitionStyle = dragging ? "none" : "all 0.4s ease";

  return (
    <section className="hoodie-showcase">
      <div className="special-heading">OUR COLLECTION</div>

      <div className="slider-wrapper">
        <button className="arrow-btn left" onClick={prev} aria-label="Previous">&#8592;</button>

        <div
          ref={sliderRef}
          className="circle-slider"
          style={{ touchAction: "pan-y" }}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div className="slide-stack">
            {/* PREV */}
            <div
              className="slide-item prev"
              style={{ transform: `translateX(calc(-60% + ${prevExtra}px)) scale(${0.85 + Math.max(0, progress) * 0.15})`, opacity: 0.6 + Math.max(0, progress) * 0.4, transition: transitionStyle }}
            >
              <img src={hoodies[prevIndex].img} alt={hoodies[prevIndex].name} />
              <div className="slide-tag">{hoodies[prevIndex].name}</div>
            </div>

            {/* FRONT */}
            <div
              className="slide-item front"
              style={{ transform: `translateX(${frontExtra}px) scale(1)`, transition: transitionStyle }}
            >
              <img src={hoodies[current].img} alt={hoodies[current].name} />
              <div className="slide-tag">{hoodies[current].name}</div>
            </div>

            {/* NEXT */}
            <div
              className="slide-item next"
              style={{ transform: `translateX(calc(60% + ${nextExtra}px)) scale(${0.85 + Math.max(0, -progress) * 0.15})`, opacity: 0.6 + Math.max(0, -progress) * 0.4, transition: transitionStyle }}
            >
              <img src={hoodies[nextIndex].img} alt={hoodies[nextIndex].name} />
              <div className="slide-tag">{hoodies[nextIndex].name}</div>
            </div>
          </div>
        </div>

        <button className="arrow-btn right" onClick={next} aria-label="Next">&#8594;</button>
      </div>

      <div className="slider-indicators">
        {hoodies.map((_, i) => (
          <span key={i} className={`dot ${i === current ? "active" : ""}`} onClick={() => setCurrent(i)} />
        ))}
      </div>

      <style jsx>{`
        .hoodie-showcase { padding: 100px 4%; text-align: center; }
        .special-heading { font-size: 2.4rem; font-weight: 600; margin-bottom: 50px; letter-spacing: -0.5px; }
        .slider-wrapper { display: flex; align-items: center; justify-content: center; gap: 24px; }
        .arrow-btn { width: 44px; height: 44px; border-radius: 50%; border: 1.5px solid #111; background: white; font-size: 1.1rem; cursor: pointer; display: flex; align-items: center; justify-content: center; flex-shrink: 0; transition: background 0.2s, color 0.2s; z-index: 10; }
        .arrow-btn:hover { background: #111; color: white; }
        .circle-slider { position: relative; width: 420px; height: 560px; }
        .slide-stack { position: relative; width: 100%; height: 100%; }
        .slide-item { position: absolute; width: 100%; height: 100%; border-radius: 16px; overflow: hidden; }
        .slide-item img { width: 100%; height: 100%; object-fit: cover; }
        .slide-item.front { z-index: 3; }
        .slide-item.prev { z-index: 2; opacity: 0.6; }
        .slide-item.next { z-index: 2; opacity: 0.6; }
        .slide-tag { position: absolute; bottom: 12px; left: 12px; background: rgba(0,0,0,0.6); color: white; padding: 6px 10px; font-size: 0.75rem; border-radius: 6px; }
        .slider-indicators { margin-top: 25px; }
        .dot { display: inline-block; width: 8px; height: 8px; margin: 0 4px; background: #ccc; border-radius: 50%; cursor: pointer; }
        .dot.active { background: #111; }
        @media (max-width: 768px) {
          .hoodie-showcase { padding: 60px 2%; }
          .special-heading { font-size: 1.6rem; }
          .slider-wrapper { gap: 12px; }
          .circle-slider { width: 260px; height: 360px; }
          .arrow-btn { width: 36px; height: 36px; font-size: 0.95rem; }
        }
      `}</style>
    </section>
  );
}