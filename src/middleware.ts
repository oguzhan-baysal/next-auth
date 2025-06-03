import { auth } from "../lib/auth"
import { NextResponse } from "next/server"

export default auth((req) => {
  const { nextUrl } = req
  const isLoggedIn = !!req.auth
  const userRole = req.auth?.user?.role

  // Public routes that don't require authentication
  const isPublicRoute = ['/login', '/'].includes(nextUrl.pathname)
  
  // API routes
  const isApiAuthRoute = nextUrl.pathname.startsWith('/api/auth')

  // Admin routes that require admin role
  const isAdminRoute = nextUrl.pathname.startsWith('/admin')

  // If not logged in and trying to access protected route
  if (!isLoggedIn && !isPublicRoute && !isApiAuthRoute) {
    return NextResponse.redirect(new URL('/login', nextUrl))
  }

  // If logged in and trying to access login page, redirect to dashboard
  if (isLoggedIn && nextUrl.pathname === '/login') {
    return NextResponse.redirect(new URL('/dashboard', nextUrl))
  }

  // Admin route protection
  if (isAdminRoute && userRole !== 'admin') {
    // If not logged in, redirect to login
    if (!isLoggedIn) {
      return NextResponse.redirect(new URL('/login', nextUrl))
    }
    // If logged in but not admin, redirect to dashboard with error
    return NextResponse.redirect(new URL('/dashboard?error=unauthorized', nextUrl))
  }

  return NextResponse.next()
})

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
} 