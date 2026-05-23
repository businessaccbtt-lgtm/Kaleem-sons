"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";

const messages = [
  "FREE DELIVERY OVER $120",
  '20% OFF CASUALWEAR — CODE "FB2827"',
];

export default function Ribbon() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % messages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY < 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const diffX = touchStartX.current - e.changedTouches[0].clientX;
    const diffY = touchStartY.current - e.changedTouches[0].clientY;
    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 30) {
      setIndex((prev) =>
        diffX > 0
          ? (prev + 1) % messages.length
          : (prev - 1 + messages.length) % messages.length
      );
    }
    touchStartX.current = null;
    touchStartY.current = null;
  };

  return (
    <div
      className="bg-black border-b border-[#C9A84C]/30"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 101,
        touchAction: "pan-y",
        padding: "0.4rem 0",
        transform: visible ? "translateY(0)" : "translateY(-100%)",
        transition: "transform 0.4s ease",
      }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div
        className="relative flex items-center justify-center w-full overflow-hidden"
        style={{ height: "18px" }}
      >
        <AnimatePresence>
          {messages.map((msg, i) =>
            i === index ? (
              <motion.span
                key={i}
                className="absolute text-white font-semibold uppercase tracking-widest"
                style={{
                  fontSize: "clamp(9px, 2.5vw, 13px)",
                  whiteSpace: "nowrap",
                  letterSpacing: "0.12em",
                  width: "100%",
                  textAlign: "center",
                  paddingLeft: "12px",
                  paddingRight: "12px",
                  boxSizing: "border-box",
                }}
                initial={{ x: i === 0 ? "-110%" : "110%" }}
                animate={{ x: "0%" }}
                exit={{ x: i === 0 ? "-110%" : "110%" }}
                transition={{ duration: 0.75, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                {msg}
              </motion.span>
            ) : null
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}