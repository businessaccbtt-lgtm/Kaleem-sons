// components/ProductsPageTemplate.tsx
import { getProductsByCategory } from "@/lib/products"
import ProductsPageClient from "@/components/ProductsPageClient"

interface Props {
  category: string
  title: string
  subtitle: string
}

export default async function ProductsPageTemplate({ category, title, subtitle }: Props) {
  const products = await getProductsByCategory(category)
  return <ProductsPageClient products={products} title={title} subtitle={subtitle} category={category} />
}