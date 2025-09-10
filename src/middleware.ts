import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const hasAuthCookie = request.cookies.has('mock-auth-session');
  const url = request.nextUrl.clone();

  const isAppRoute = request.nextUrl.pathname.startsWith('/dashboard') || 
                     request.nextUrl.pathname.startsWith('/leads') || 
                     request.nextUrl.pathname.startsWith('/campaigns');

  const isAuthRoute = request.nextUrl.pathname.startsWith('/login') || 
                      request.nextUrl.pathname.startsWith('/register');

  // If user is on the root path, decide where to send them
  if (request.nextUrl.pathname === '/') {
    url.pathname = hasAuthCookie ? '/dashboard' : '/login';
    return NextResponse.redirect(url);
  }

  // Redirect to login if trying to access app without a cookie
  if (isAppRoute && !hasAuthCookie) {
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }

  // Redirect to dashboard if logged in and trying to access login/register
  if (isAuthRoute && hasAuthCookie) {
    url.pathname = '/dashboard';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

// Define which routes the middleware should run on
export const config = {
  matcher: [
    '/',
    '/dashboard/:path*',
    '/leads/:path*',
    '/campaigns/:path*',
    '/login/:path*',
    '/register/:path*',
  ],
}