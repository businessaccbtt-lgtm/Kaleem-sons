import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { supabaseAdmin } from "@/lib/supabaseAdmin"

export async function POST(req: Request) {
  const { name, email, password } = await req.json()

  if (!name || !email || !password) {
    return NextResponse.json({ error: "All fields are required." }, { status: 400 })
  }

  if (password.length < 6) {
    return NextResponse.json({ error: "Password must be at least 6 characters." }, { status: 400 })
  }

  // Check if email already exists
  const { data: existing } = await supabaseAdmin
    .from("users")
    .select("id")
    .eq("email", email)
    .single()

  if (existing) {
    return NextResponse.json({ error: "An account with this email already exists." }, { status: 400 })
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  // Insert into next_auth.users (the adapter table)
  const { data: newUser, error } = await supabaseAdmin
    .schema("next_auth")
    .from("users")
    .insert({ name, email })
    .select()
    .single()

  if (error || !newUser) {
    return NextResponse.json({ error: "Could not create account." }, { status: 500 })
  }

  // Store hashed password in public.users
  await supabaseAdmin
    .from("users")
    .update({ password: hashedPassword })
    .eq("id", newUser.id)

  return NextResponse.json({ success: true })
}