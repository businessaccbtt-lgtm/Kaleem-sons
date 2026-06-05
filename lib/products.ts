// lib/products.ts
import { unstable_cache } from "next/cache"
import { supabase } from "@/lib/supabase"

export type Product = {
  id: string
  name: string
  category: string
  price: number
  img: string
  description: string
  sizes: string[]
  colors: string[]
}

// All products — used by Bestsellers
export const getAllProducts = unstable_cache(
  async () => {
    const { data, error } = await supabase
      .from("products")
      .select("*")
    if (error) { console.error(error); return [] }
    return data as Product[]
  },
  ["all-products"],
  { tags: ["products"], revalidate: 60 }
)

// Products by category — used by ProductsPageTemplate
export const getProductsByCategory = unstable_cache(
  async (category: string) => {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("category", category)
      .order("created_at", { ascending: true })
    if (error) { console.error(error); return [] }
    return data as Product[]
  },
  ["products-by-category"],
  { tags: ["products"], revalidate: 60 }
)

// Latest 8 products — used by ProductGrid
export const getNewArrivals = unstable_cache(
  async () => {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(8)
    if (error) { console.error(error); return [] }
    return data as Product[]
  },
  ["new-arrivals"],
  { tags: ["products"], revalidate: 60 }
)