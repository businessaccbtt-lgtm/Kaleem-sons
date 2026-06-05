// components/Bestsellers.tsx
import { getAllProducts } from "@/lib/products"
import BestsellersClient from "@/components/BestsellersClient"

export default async function Bestsellers() {
  const all = await getAllProducts()
  const shuffled = [...all].sort(() => Math.random() - 0.5)
  const products = shuffled.slice(0, 4)
  return <BestsellersClient products={products} />
}