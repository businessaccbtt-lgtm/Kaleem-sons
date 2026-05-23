// proxy.ts
import { auth } from "@/auth"

export default auth((req) => {
  const isLoggedIn = !!req.auth
  const isProtected =
    req.nextUrl.pathname.startsWith("/account") ||
    req.nextUrl.pathname.startsWith("/checkout")

  if (isProtected && !isLoggedIn) {
    return Response.redirect(new URL("/signin", req.nextUrl))
  }
})

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}