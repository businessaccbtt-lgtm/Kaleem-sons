import ProductsPageTemplate from "@/components/ProductsPageTemplate"
import type { Metadata } from "next"
export const metadata: Metadata = {
  title: "Tracksuits",
  description: "Premium athletic tracksuits for men and women. Bulk manufacturer in Pakistan. Worldwide export available.",
}
export default function TracksuitPage() {
  return (
    <ProductsPageTemplate
      category="Tracksuits"
      title="Tracksuits"
      subtitle="Performance tracksuits built for the gym and the streets."
    />
  )
}