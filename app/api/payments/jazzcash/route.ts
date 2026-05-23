import { NextResponse } from "next/server"
import crypto from "crypto"
import { supabaseAdmin } from "@/lib/supabaseAdmin"
import { auth } from "@/auth"

function generateJazzCashHash(params: Record<string, string>, hashKey: string): string {
  const sorted = Object.keys(params)
    .filter(k => k !== "pp_SecureHash" && params[k])
    .sort()
    .map(k => params[k])
    .join("&")

  const message = `${hashKey}&${sorted}`
  return crypto.createHmac("sha256", hashKey).update(message).digest("hex")
}

export async function POST(req: Request) {
  const session = await auth()
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
  }

  const { amount, orderId, form } = await req.json()

  const merchantId = process.env.JAZZCASH_MERCHANT_ID!
  const password = process.env.JAZZCASH_PASSWORD!
  const hashKey = process.env.JAZZCASH_HASH_KEY!
  const returnUrl = process.env.JAZZCASH_RETURN_URL!

  const txnDateTime = new Date()
    .toISOString()
    .replace(/[-T:.Z]/g, "")
    .substring(0, 14)

  const txnExpiryDateTime = new Date(Date.now() + 3600000)
    .toISOString()
    .replace(/[-T:.Z]/g, "")
    .substring(0, 14)

  const txnRefNo = `T${txnDateTime}`
  const amountInPaisa = String(amount * 100)

  const params: Record<string, string> = {
    pp_Version: "1.1",
    pp_TxnType: "MWALLET",
    pp_Language: "EN",
    pp_MerchantID: merchantId,
    pp_Password: password,
    pp_TxnRefNo: txnRefNo,
    pp_Amount: amountInPaisa,
    pp_TxnDateTime: txnDateTime,
    pp_BillReference: orderId,
    pp_Description: "Kaleem Sons Order",
    pp_TxnExpiryDateTime: txnExpiryDateTime,
    pp_ReturnURL: returnUrl,
    pp_MobileNumber: form.phone.replace(/\D/g, ""),
    ppmpf_1: form.name,
    ppmpf_2: form.email,
    ppmpf_3: orderId,
  }

  params.pp_SecureHash = generateJazzCashHash(params, hashKey)

  // Update order with txn ref
  await supabaseAdmin
    .from("orders")
    .update({
      status: "pending_payment",
      payment_method: "jazzcash",
      jazzcash_txn_ref: txnRefNo,
    })
    .eq("id", orderId)

  const isSandbox = process.env.NODE_ENV !== "production"
  const baseUrl = isSandbox
    ? "https://sandbox.jazzcash.com.pk/CustomerPortal/transactionmanagement/merchantform"
    : "https://payments.jazzcash.com.pk/CustomerPortal/transactionmanagement/merchantform"

  return NextResponse.json({ redirectUrl: baseUrl, params })
}