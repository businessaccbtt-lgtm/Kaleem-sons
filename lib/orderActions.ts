"use server"
import { auth } from "@/auth"
import { supabaseAdmin } from "@/lib/supabaseAdmin"

type OrderForm = {
  name: string
  email: string
  phone: string
  address: string
  city: string
  country: string
}

type CartItem = {
  id: string
  name: string
  price: number
  image: string
  size: string
  color: string
  quantity: number
}

type PlaceOrderInput = {
  items: CartItem[]
  total: number
  paymentMethod: string
  form: OrderForm
}

export async function placeOrder(input: PlaceOrderInput) {
  const session = await auth()

  if (!session?.user?.email) {
    return { error: "Not authenticated" }
  }

  const { data: user } = await supabaseAdmin
    .from("users")
    .select("id")
    .eq("email", session.user.email)
    .single()

  let userId = user?.id

  if (!userId) {
    const { data: newUser, error } = await supabaseAdmin
      .from("users")
      .insert({
        name: session.user.name,
        email: session.user.email,
        image: session.user.image,
      })
      .select("id")
      .single()

    if (error || !newUser) return { error: "Could not create user" }
    userId = newUser.id
  }

  const { data: order, error } = await supabaseAdmin
    .from("orders")
    .insert({
      user_id: userId,
      items: input.items,
      total: input.total,
      payment_method: input.paymentMethod,
      shipping_name: input.form.name,
      shipping_email: input.form.email,
      shipping_phone: input.form.phone,
      shipping_address: input.form.address,
      shipping_city: input.form.city,
      shipping_country: input.form.country,
    })
    .select()
    .single()

  if (error) return { error: "Could not place order" }

  return { success: true, orderId: order.id }
}