// components/ProductGrid.tsx
import { getNewArrivals } from "@/lib/products"
import ProductGridClient from "@/components/ProductGridClient"

export default async function ProductGrid() {
  const products = await getNewArrivals()
  return <ProductGridClient products={products} />
}