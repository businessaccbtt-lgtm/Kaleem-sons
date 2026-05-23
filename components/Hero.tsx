"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function HeroMinimal() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const bgY = useSpring(useTransform(scrollYProgress, [0, 1], ["0%", "25%"]), {
    stiffness: 80,
    damping: 30,
  });
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.6], ["0%", "8%"]);

  return (
    <section
      ref={containerRef}
      className="relative w-full h-[90vh] min-h-[600px] sm:h-[95vh] sm:min-h-[700px] overflow-hidden flex items-center bg-black"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/bgbb.jpeg"
          alt="Athlete in motion - SS 2025 Collection"
          fill
          priority
          quality={95}
          className="object-cover object-center scale-[1.08]"
        />
      </div>

      {/* Overlays */}
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-black via-black/60 to-transparent" />
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/40 via-transparent to-black/70" />

      {/* Top Accent */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent z-20"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
      />

      {/* Main Content */}
      <motion.div
        className="relative z-20 pr-8 max-w-5xl w-full"
        style={{ paddingLeft: "clamp(1.5rem, 4vw, 8rem)" }}
      >
        {/* Micro Label */}
        <motion.div
          className="flex items-center gap-3 mb-4 sm:mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="h-px w-8 bg-white/40" />
          <p className="text-white/60 text-[10px] tracking-[3px] uppercase font-light">
            SPRING SUMMER 2026
          </p>
        </motion.div>

        {/* Headline */}
        <div className="space-y-1 mb-8 sm:mb-16">
          <motion.h1
            className="text-[clamp(2.4rem,8.5vw,7rem)] sm:text-[clamp(3.4rem,8.5vw,7rem)] font-light text-white leading-[0.9] tracking-[-0.04em]"
            style={{ fontFamily: "'Playfair Display', serif" }}
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease: [0.215, 0.61, 0.355, 1] }}
          >
            Defined by
          </motion.h1>

          <motion.h1
            className="text-[clamp(2.4rem,8.5vw,7rem)] sm:text-[clamp(3.4rem,8.5vw,7rem)] font-semibold text-white leading-[0.9] tracking-[-0.04em] italic"
            style={{ fontFamily: "'Playfair Display', serif" }}
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.12 }}
          >
            Strength.
          </motion.h1>
        </div>

        {/* Description */}
        <motion.p
          className="max-w-sm sm:max-w-md text-white/75 text-[13px] sm:text-[15.5px] leading-relaxed tracking-wide mb-8 sm:mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.9 }}
        >
          <br className="hidden sm:block" />
          Performance-driven apparel engineered for those who push limits.
          Sweat-wicking. Squat-proof. Built to last.
        </motion.p>

        {/* Single CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.9 }}
        >
          <Link href="/new-in">
        <motion.button
  className="group relative bg-white text-black text-[11px] sm:text-sm tracking-[2.5px] uppercase font-semibold overflow-hidden flex items-center justify-center shadow-lg rounded-full"
  style={{
    paddingLeft: "clamp(1.5rem, 3vw, 3rem)",
    paddingRight: "clamp(1.5rem, 3vw, 3rem)",
    height: "clamp(36px, 5vw, 50px)",
  }}
  whileHover={{ scale: 1.03 }}
  whileTap={{ scale: 0.97 }}
  transition={{ duration: 0.2 }}
>
  <div className="absolute inset-0 bg-black scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" />
  <span className="relative z-10 group-hover:text-white transition-colors duration-500">
    Explore
  </span>
</motion.button>
          </Link>
        </motion.div>
      </motion.div>

      {/* Right Vertical Text */}
      <motion.div
        className="absolute right-8 xl:right-12 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-8 z-30"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <div className="h-16 w-px bg-gradient-to-b from-transparent via-white/30 to-transparent" />
        <p
          className="text-[10px] tracking-[2px] uppercase text-black/40"
          style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
        >
          Scroll to discover
        </p>
      </motion.div>
    </section>
  );
}