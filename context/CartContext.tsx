"use client"
import { createContext, useContext, useState, useEffect, ReactNode } from "react"
import { useSession } from "next-auth/react"
import { supabase } from "@/lib/supabase"

export type CartItem = {
  id: string
  name: string
  price: number
  image: string
  size: string
  color: string
  quantity: number
}

type CartContextType = {
  items: CartItem[]
  addItem: (item: CartItem) => void
  removeItem: (id: string, size: string) => void
  updateQuantity: (id: string, size: string, quantity: number) => void
  clearCart: () => void
  totalItems: number
  totalPrice: number
  isCartOpen: boolean
  setIsCartOpen: (open: boolean) => void
  isAuthModalOpen: boolean
  setIsAuthModalOpen: (open: boolean) => void
  pendingItem: CartItem | null
  setPendingItem: (item: CartItem | null) => void
}

const CartContext = createContext<CartContextType | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const { data: session } = useSession()
  const [items, setItems] = useState<CartItem[]>([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const [pendingItem, setPendingItem] = useState<CartItem | null>(null)

  useEffect(() => {
    if (session?.user?.id) {
      loadCart(session.user.id)
    } else {
      setItems([])
    }
  }, [session?.user?.id])

  async function loadCart(userId: string) {
    const { data } = await supabase
      .from("cart_items")
      .select("*")
      .eq("user_id", userId)

    if (data) {
      setItems(data.map(item => ({
        id: item.product_id,
        name: item.name,
        price: item.price,
        image: item.image,
        size: item.size,
        color: item.color ?? "",   // ← safe fallback for existing rows without color
        quantity: item.quantity,
      })))
    }
  }

  async function addItem(item: CartItem) {
    setItems(prev => {
      const existing = prev.find(i => i.id === item.id && i.size === item.size)
      if (existing) {
        return prev.map(i =>
          i.id === item.id && i.size === item.size
            ? { ...i, quantity: i.quantity + item.quantity }
            : i
        )
      }
      return [...prev, item]
    })

    setIsCartOpen(true)

    if (session?.user?.id) {
      await supabase.from("cart_items").upsert({
        user_id: session.user.id,
        product_id: item.id,
        name: item.name,
        price: item.price,
        image: item.image,
        size: item.size,
        color: item.color,        // ← was missing, now included
        quantity: item.quantity,
      }, { onConflict: "user_id,product_id,size" })
    }
  }

  async function removeItem(id: string, size: string) {
    setItems(prev => prev.filter(i => !(i.id === id && i.size === size)))

    if (session?.user?.id) {
      await supabase
        .from("cart_items")
        .delete()
        .eq("user_id", session.user.id)
        .eq("product_id", id)
        .eq("size", size)
    }
  }

  async function updateQuantity(id: string, size: string, quantity: number) {
    if (quantity < 1) return removeItem(id, size)

    setItems(prev =>
      prev.map(i => i.id === id && i.size === size ? { ...i, quantity } : i)
    )

    if (session?.user?.id) {
      await supabase
        .from("cart_items")
        .update({ quantity })
        .eq("user_id", session.user.id)
        .eq("product_id", id)
        .eq("size", size)
    }
  }

  async function clearCart() {
    setItems([])
    if (session?.user?.id) {
      await supabase
        .from("cart_items")
        .delete()
        .eq("user_id", session.user.id)
    }
  }

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0)
  const totalPrice = items.reduce((sum, i) => sum + i.price * i.quantity, 0)

  return (
    <CartContext.Provider value={{
      items, addItem, removeItem, updateQuantity, clearCart,
      totalItems, totalPrice,
      isCartOpen, setIsCartOpen,
      isAuthModalOpen, setIsAuthModalOpen,
      pendingItem, setPendingItem,
    }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error("useCart must be used inside CartProvider")
  return ctx
}
