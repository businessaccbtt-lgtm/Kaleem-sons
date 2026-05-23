import { NextResponse } from "next/server"
import { supabaseAdmin } from "@/lib/supabaseAdmin"
import { auth } from "@/auth"

export async function POST(req: Request) {
  const session = await auth()

  if (!session?.user?.email) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
  }

  const body = await req.json()

  // Try by email first, then fall back to name
  const { data: user } = await supabaseAdmin
    .from("users")
    .select("id")
    .eq("email", session.user.email)
    .single()

  if (!user) {
    // Insert the user if they somehow don't exist yet
    const { data: newUser, error } = await supabaseAdmin
      .from("users")
      .insert({
        name: session.user.name,
        email: session.user.email,
        image: session.user.image,
      })
      .select("id")
      .single()

    if (error || !newUser) {
      return NextResponse.json({ error: "Could not create user" }, { status: 500 })
    }

    const { data: order, error: orderError } = await supabaseAdmin
      .from("orders")
      .insert({
        user_id: newUser.id,
        items: body.items,
        total: body.total,
        payment_method: body.paymentMethod,
        shipping_name: body.form.name,
        shipping_email: body.form.email,
        shipping_phone: body.form.phone,
        shipping_address: body.form.address,
        shipping_city: body.form.city,
        shipping_country: body.form.country,
      })
      .select()
      .single()

    if (orderError) {
      return NextResponse.json({ error: "Could not place order" }, { status: 500 })
    }

    return NextResponse.json({ success: true, orderId: order.id })
  }

  const { data: order, error } = await supabaseAdmin
    .from("orders")
    .insert({
      user_id: user.id,
      items: body.items,
      total: body.total,
      payment_method: body.paymentMethod,
      shipping_name: body.form.name,
      shipping_email: body.form.email,
      shipping_phone: body.form.phone,
      shipping_address: body.form.address,
      shipping_city: body.form.city,
      shipping_country: body.form.country,
    })
    .select()
    .single()

  if (error) {
    return NextResponse.json({ error: "Could not place order" }, { status: 500 })
  }

  return NextResponse.json({ success: true, orderId: order.id })
}