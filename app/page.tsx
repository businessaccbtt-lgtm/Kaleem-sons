
import Hero from "@/components/Hero";
import Categories from "@/components/Categories";
import ProductGrid from "@/components/ProductGrid";
import Slider from "@/components/Slider";
import Bestsellers from "@/components/Bestsellers";
import Newsletter from "@/components/Newsletter";
import Reviews from "@/components/Reviews";

export default function Home() {
  return (
    <>
      <Hero />
      <Categories />
      <ProductGrid />
      <Slider />
      <Bestsellers />
      <Newsletter />
      <Reviews />
    </>
  );
}