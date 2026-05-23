"use client";

import { motion, Variants } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

const categories = [
  {
    name: "T-Shirts",
    href: "/t-shirts",
    image: "https://ibtmpcpyulndpakzjxll.supabase.co/storage/v1/object/public/products/mens-T-shirt-forest.jpg",
  },
  {
    name: "Hoodies",
    href: "/hoodies",
    image: "https://ibtmpcpyulndpakzjxll.supabase.co/storage/v1/object/public/products/men-hoodie-beige.jpg",
  },
  {
    name: "Track Suits",
    href: "/track-suits",
    image: "https://ibtmpcpyulndpakzjxll.supabase.co/storage/v1/object/public/products/tracksuit-black.jpg",
  },
  {
    name: "Karate",
    href: "/karate",
    image: "https://ibtmpcpyulndpakzjxll.supabase.co/storage/v1/object/public/products/karate-blacksuit.jpg",
  },
  {
    name: "Jiu-Jitsu",
    href: "/jiu-jitsu",
    image: "https://ibtmpcpyulndpakzjxll.supabase.co/storage/v1/object/public/products/jiu-jitsu-premium-set.jpg",
  },
];
const container: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12 },
  },
};

const itemVariant: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function Categories() {
  const router = useRouter();
  const [clicked, setClicked] = useState<string | null>(null);

  const handleClick = (cat: { name: string; href: string }) => {
    setClicked(cat.name);
    setTimeout(() => {
      router.push(cat.href);
    }, 420);
  };

  return (
    <section className="bg-white py-16 px-4">
      {/* Heading */}
     <div className="text-center" style={{ marginBottom: "50px" }}>
        <p className="text-black text-[11px] tracking-[4px] uppercase font-bold mb-2 ">
          Browse by Category
        </p>
      
      </div>

      {/* Circles */}
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-60px" }}
        className="flex flex-wrap justify-center gap-x-16 gap-y-10 md:gap-x-20"
      >
        {categories.map((cat) => (
          <motion.div key={cat.name} variants={itemVariant}>
            <button
              onClick={() => handleClick(cat)}
              className="flex flex-col items-center gap-3 group cursor-pointer"
            >
              {/* Circle */}
              <motion.div
                animate={
                  clicked === cat.name
                    ? { scale: [1, 0.85, 1.08, 1], opacity: [1, 0.6, 1, 1] }
                    : { scale: 1, opacity: 1 }
                }
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="relative w-28 h-28 md:w-36 md:h-36 rounded-full overflow-hidden
                           shadow-md group-hover:shadow-xl transition-shadow duration-300"
              >
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 768px) 112px, 144px"
                />
                {/* Overlay on click */}
                <motion.div
                  animate={clicked === cat.name ? { opacity: 0.45 } : { opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="absolute inset-0 bg-white"
                />
              </motion.div>

              {/* Label */}
              <span className="text-black/70 group-hover:text-black text-[12px] md:text-[13px]
                               tracking-[2px] uppercase font-semibold transition-colors duration-300">
                {cat.name}
              </span>
            </button>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}