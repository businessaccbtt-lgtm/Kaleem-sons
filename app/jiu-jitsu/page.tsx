import ProductsPageTemplate from "@/components/ProductsPageTemplate"
import type { Metadata } from "next"
export const metadata: Metadata = {
  title: "BJJ Gi & Rashguards",
  description: "Competition grade BJJ gi and rashguards. Pearl weave fabric. Bulk orders for academies worldwide. Ships from Pakistan.",
}
export default function JiuJitsuPage() {
  return (
    <ProductsPageTemplate
      category="Jiu-Jitsu"
      title="Jiu-Jitsu"
      subtitle="Professional BJJ gi sets and rashguards built for the mat."
    />
  )
}