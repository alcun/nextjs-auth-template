import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Middleware to protect routes
 * Checks for session cookie existence
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Only protect /dashboard routes (add your protected routes here)
  if (!pathname.startsWith('/dashboard')) {
    return NextResponse.next()
  }

  // Check if cookie exists (try both secure and non-secure variants)
  const sessionCookie = request.cookies.get('__Secure-better-auth.session_token')
    || request.cookies.get('better-auth.session_token')

  if (!sessionCookie) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
