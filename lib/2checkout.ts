import crypto from "crypto"

const MERCHANT_CODE = process.env.TWOCHECKOUT_MERCHANT_CODE!
const SECRET_KEY = process.env.TWOCHECKOUT_SECRET_KEY!
const BASE_URL = "https://api.2checkout.com/rest/6.0"

export function generate2COAuth() {
  const date = new Date().toISOString().replace("T", " ").substring(0, 19)
  const string = `${MERCHANT_CODE.length}${MERCHANT_CODE}${date.length}${date}`
  const hash = crypto.createHmac("sha256", SECRET_KEY).update(string).digest("hex")
  return {
    header: `code="${MERCHANT_CODE}" date="${date}" hash="${hash}" algo="sha256"`,
    date,
  }
}

export async function twoCheckoutRequest(endpoint: string, method = "GET", body?: object) {
  const { header } = generate2COAuth()
  const res = await fetch(`${BASE_URL}/${endpoint}/`, {
    method,
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "X-Avangate-Authentication": header,
    },
    body: body ? JSON.stringify(body) : undefined,
  })
  return res.json()
}