import { NextResponse } from "next/server"
import { supabaseAdmin } from "@/lib/supabaseAdmin"
import crypto from "crypto"

export async function POST(req: Request) {
  const body = await req.text()
  const params = Object.fromEntries(new URLSearchParams(body))

  const hashKey = process.env.JAZZCASH_HASH_KEY!
  const receivedHash = params.pp_SecureHash

  const sorted = Object.keys(params)
    .filter(k => k !== "pp_SecureHash" && params[k])
    .sort()
    .map(k => params[k])
    .join("&")

  const expectedHash = crypto
    .createHmac("sha256", hashKey)
    .update(`${hashKey}&${sorted}`)
    .digest("hex")

  if (receivedHash !== expectedHash) {
    return NextResponse.redirect(new URL("/checkout?error=invalid_hash", process.env.AUTH_URL!))
  }

  const responseCode = params.pp_ResponseCode
  const txnRef = params.pp_TxnRefNo
  const orderId = params.pp_BillReference

  if (responseCode === "000") {
    await supabaseAdmin
      .from("orders")
      .update({ status: "paid", jazzcash_txn_ref: txnRef })
      .eq("id", orderId)

    return NextResponse.redirect(new URL("/checkout/success?method=jazzcash", process.env.AUTH_URL!))
  }

  return NextResponse.redirect(new URL("/checkout?error=payment_failed", process.env.AUTH_URL!))
}