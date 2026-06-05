"use client"
import { createContext, useContext, useState, useEffect,  useCallback, ReactNode } from "react"
import { useSession } from "next-auth/react"

import { supabase } from "@/lib/supabaseClient"

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

  const loadCart = useCallback(async (userId: string) => {
    if (!session?.accessToken) return

    try {
      const { data, error } = await supabase
        .from("cart_items")
        .select("*")
        .eq("user_id", userId)

      if (error) {
        console.error("❌ loadCart error:", error.message)
        return
      }

      if (data) {
        setItems(data.map(item => ({
          id: item.product_id,
          name: item.name,
          price: item.price,
          image: item.image,
          size: item.size,
          color: item.color ?? "",
          quantity: item.quantity,
        })))
      }
    } catch (err: any) {
      console.error("💥 loadCart exception:", err.message)
    }
  }, [supabase, session?.accessToken])

  useEffect(() => {
    if (session?.user?.id && session?.accessToken) {
      loadCart(session.user.id)
    } else {
      setItems([])
    }
  }, [session?.user?.id, session?.accessToken, loadCart])





 
  const addItem = useCallback(async (item: CartItem) => {
    if (!session?.user?.id) {
      setPendingItem(item)
      setIsAuthModalOpen(true)
      return
    }




    setItems(current => {
      const existing = current.find(i => i.id === item.id && i.size === item.size)
      if (existing) {
        return current.map(i =>
          i.id === item.id && i.size === item.size
            ? { ...i, quantity: i.quantity + 1 }
            : i
        )
      }
      return [...current, { ...item, quantity: 1 }]
    })

    setIsCartOpen(true)

    const existing = items.find(i => i.id === item.id && i.size === item.size)

    try {
      if (existing) {
        const { error } = await supabase
          .from("cart_items")
          .update({ quantity: existing.quantity + 1 })
          .eq("user_id", session.user.id)
          .eq("product_id", item.id)
          .eq("size", item.size)

        if (error) throw error
      } else {
        const { error } = await supabase
          .from("cart_items")
          .insert({
            user_id: session.user.id,
            product_id: item.id,
            name: item.name,
            price: item.price,
            image: item.image,
            size: item.size,
            color: item.color || null,
            quantity: 1,
          })

       
        if (error) throw error
      }
    } catch (err: any) {
      console.error("❌ addItem failed:", err.message)
      loadCart(session.user.id)
    }
  }, [session?.user?.id, items, supabase, loadCart])

  const removeItem = useCallback(async (id: string, size: string) => {
    if (!session?.user?.id) return

    setItems(current => current.filter(i => !(i.id === id && i.size === size)))

    try {
      const { error } = await supabase
        .from("cart_items")
        .delete()
        .eq("user_id", session.user.id)
        .eq("product_id", id)
        .eq("size", size)

      if (error) throw error
    } catch (err: any) {
      console.error("❌ removeItem failed:", err.message)
      loadCart(session.user.id)
    }
  }, [session?.user?.id, supabase, loadCart])

  const updateQuantity = useCallback(async (id: string, size: string, quantity: number) => {
    if (!session?.user?.id) return

    if (quantity <= 0) {
      removeItem(id, size)
      return
    }

    setItems(current =>
      current.map(i =>
        i.id === id && i.size === size ? { ...i, quantity } : i
      )
    )

    try {
      const { error } = await supabase
        .from("cart_items")
        .update({ quantity })
        .eq("user_id", session.user.id)
        .eq("product_id", id)
        .eq("size", size)

      if (error) throw error
    } catch (err: any) {
      console.error("❌ updateQuantity failed:", err.message)
      loadCart(session.user.id)
    }
  }, [session?.user?.id, supabase, loadCart, removeItem])

  const clearCart = useCallback(async () => {
    if (!session?.user?.id) return

    setItems([])

    try {
      const { error } = await supabase
        .from("cart_items")
        .delete()
        .eq("user_id", session.user.id)

      if (error) throw error
    } catch (err: any) {
      console.error("❌ clearCart failed:", err.message)
      loadCart(session.user.id)
    }
  }, [session?.user?.id, supabase, loadCart])

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0)
  const totalPrice = items.reduce((sum, i) => sum + i.price * i.quantity, 0)

  return (
    <CartContext.Provider value={{
      items,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      totalItems,
      totalPrice,
      isCartOpen,
      setIsCartOpen,
      isAuthModalOpen,
      setIsAuthModalOpen,
      pendingItem,
      setPendingItem,
    }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) throw new Error("useCart must be used within CartProvider")
  return context
}