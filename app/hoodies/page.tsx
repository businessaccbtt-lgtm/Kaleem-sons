import ProductsPageTemplate from "@/components/ProductsPageTemplate"
import type { Metadata } from "next"
export const metadata: Metadata = {
  title: "Premium Hoodies",
  description: "Heavyweight oversized hoodies for men and women. Wholesale and bulk orders available. Ships worldwide from Pakistan.",
}
export default function HoodiesPage() {
  return (
    <ProductsPageTemplate
      category="Hoodies"
      title="Hoodies"
      subtitle="Premium hoodies engineered for comfort and street-ready style."
    />
  )
}