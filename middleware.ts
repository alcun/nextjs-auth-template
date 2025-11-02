import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Middleware to protect routes
 * Checks for session cookie existence
 */
export function middleware(request: NextRequest) {
  const sessionCookie = request.cookies.get('better-auth.session_token');
  const { pathname } = request.nextUrl;

  // Public routes that don't require authentication
  const publicRoutes = ['/login', '/signup'];
  const isPublicRoute = publicRoutes.some(route => pathname.startsWith(route));

  // If not authenticated and trying to access protected route
  if (!sessionCookie && !isPublicRoute && pathname !== '/') {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // If authenticated and trying to access login/signup
  if (sessionCookie && isPublicRoute) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
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
