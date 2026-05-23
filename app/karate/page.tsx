import ProductsPageTemplate from "@/components/ProductsPageTemplate"
import type { Metadata } from "next"
export const metadata: Metadata = {
  title: "Karate Gi & Uniforms",
  description: "Professional karate gi and uniforms. WKF approved cuts. Bulk and wholesale orders for clubs and academies worldwide.",
}
export default function KaratePage() {
  return (
    <ProductsPageTemplate
      category="Karate"
      title="Karate"
      subtitle="Traditional and competition-grade karate uniforms and gi suits."
    />
  )
}