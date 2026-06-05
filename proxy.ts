// proxy.ts
import { auth } from "@/auth"
import { NextResponse } from "next/server"

export default auth((req) => {
  const { pathname } = req.nextUrl

  // Admin route protection via cookie
  const isAdminRoute = pathname.startsWith("/admin") && pathname !== "/admin"
  if (isAdminRoute) {
    const adminAuth = req.cookies.get("admin_auth")?.value
    if (adminAuth !== "true") {
      return NextResponse.redirect(new URL("/admin", req.nextUrl))
    }
  }

  // User route protection via NextAuth session
  const isLoggedIn = !!req.auth
  const isProtected =
    pathname.startsWith("/account") ||
    pathname.startsWith("/checkout")
  if (isProtected && !isLoggedIn) {
    return NextResponse.redirect(new URL("/signin", req.nextUrl))
  }
})

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}