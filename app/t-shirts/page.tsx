
import ProductsPageTemplate from "@/components/ProductsPageTemplate"
import type { Metadata } from "next"
export const metadata: Metadata = {
  title: "Premium T-Shirts",
  description: "Shop premium graphic and performance t-shirts from Kaleem Sons. Bulk orders welcome. Worldwide shipping available.",
}
export default function TShirtsPage() {
  return (
    <ProductsPageTemplate
      category="T-Shirts"
      title="T-Shirts"
      subtitle="Premium tees built for performance and everyday style."
    />
  )
}