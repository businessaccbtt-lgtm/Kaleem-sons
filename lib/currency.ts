export const PKR_TO_USD = 278

export function toUSD(pkr: number): string {
  return (pkr / PKR_TO_USD).toFixed(2)
}

export function toPKR(usd: number): string {
  return Math.round(usd * PKR_TO_USD).toLocaleString()
}

export function formatPKR(amount: number): string {
  return `Rs. ${amount.toLocaleString()}`
}

export function formatUSD(amount: number): string {
  return `$${amount.toFixed(2)}`
}

// Detect if customer is international based on browser locale
export function isInternational(): boolean {
  if (typeof window === "undefined") return false
  const locale = navigator.language || "en-PK"
  return !locale.includes("PK") && !locale.includes("ur")
}