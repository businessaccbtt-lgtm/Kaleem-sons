import { NextResponse } from "next/server"
import crypto from "crypto"
import { supabaseAdmin } from "@/lib/supabaseAdmin"
import { auth } from "@/auth"

export async function POST(req: Request) {
  const session = await auth()
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
  }

  const { amount, orderId, form } = await req.json()

  const storeId = process.env.EASYPAISA_STORE_ID!
  const hashKey = process.env.EASYPAISA_HASH_KEY!
  const returnUrl = process.env.EASYPAISA_RETURN_URL!

  const orderRefNo = `EP${Date.now()}`
  const txnDateTime = new Date()
    .toISOString()
    .replace(/[-T:.Z]/g, "")
    .substring(0, 14)

  const params: Record<string, string> = {
    amount: String(amount),
    customerEmail: form.email,
    customerMobileNo: form.phone.replace(/\D/g, ""),
    expiryDate: txnDateTime,
    merchantPaymentRef: orderRefNo,
    orderRefNum: orderRefNo,
    paymentMethod: "MA_PAYMENT",
    postBackURL: returnUrl,
    storeId,
    timeStamp: txnDateTime,
  }

  const sorted = Object.keys(params)
    .sort()
    .map(k => `${k}=${params[k]}`)
    .join("&")

  const hashString = `${hashKey}&${sorted}&${hashKey}`
  const secureHash = crypto
    .createHmac("sha256", hashKey)
    .update(hashString)
    .digest("hex")
    .toUpperCase()

  params.signature = secureHash

  await supabaseAdmin
    .from("orders")
    .update({
      status: "pending_payment",
      payment_method: "easypaisa",
      easypaisa_order_ref: orderRefNo,
    })
    .eq("id", orderId)

  const isSandbox = process.env.NODE_ENV !== "production"
  const baseUrl = isSandbox
    ? "https://easypaystg.easypaisa.com.pk/easypay/Index.jsf"
    : "https://easypay.easypaisa.com.pk/easypay/Index.jsf"

  return NextResponse.json({ redirectUrl: baseUrl, params })
}