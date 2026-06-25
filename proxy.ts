import { auth } from "@/auth"
import { NextResponse } from "next/server"

export default auth((req) => {
  const { pathname } = req.nextUrl

  // Admin route protection via cookie
  const isAdminRoute = pathname.startsWith("/admin") && pathname !== "/admin"
  if (isAdminRoute) {
    const adminAuth = req.cookies.get("admin_auth")?.value
    if (adminAuth !== "true") {
      const redirectUrl = new URL("/admin", req.nextUrl.origin)
      return NextResponse.redirect(redirectUrl)
    }
  }

  // User route protection via NextAuth session
  const isLoggedIn = !!req.auth
  const isProtected =
    pathname.startsWith("/account") ||
    pathname.startsWith("/checkout")
  if (isProtected && !isLoggedIn) {
    const redirectUrl = new URL("/signin", req.nextUrl.origin)
    return NextResponse.redirect(redirectUrl)
  }

  return NextResponse.next()
})

export const config = {
  matcher: ["/admin/:path+", "/account/:path+", "/checkout/:path+"],
}