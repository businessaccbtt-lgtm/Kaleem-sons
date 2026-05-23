"use client"
import { useSession } from "next-auth/react"
import { useCart, CartItem } from "@/context/CartContext"

export default function AddToCart({ product }: { product: Omit<CartItem, "quantity"> }) {
  const { data: session } = useSession()
  const { addItem, setIsAuthModalOpen, setPendingItem } = useCart()

  function handleClick() {
    if (!session) {
      // Not logged in — save item and show auth modal
      setPendingItem({ ...product, quantity: 1 })
      setIsAuthModalOpen(true)
      return
    }
    // Logged in — add directly
    addItem({ ...product, quantity: 1 })
  }

  return (
    <button
      onClick={handleClick}
      className="w-full bg-black text-white rounded-lg py-2.5 text-sm font-medium hover:bg-gray-800 transition"
    >
      Add to Cart
    </button>
  )
}