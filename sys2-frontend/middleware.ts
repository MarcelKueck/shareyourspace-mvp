import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// 1. Define protected paths
// Add routes that require authentication
const protectedPaths = ['/dashboard', '/settings', '/profile']; 
// Or use a function for more complex logic, e.g., /admin/*

// Helper function to check if a path is protected
function isProtectedPath(pathname: string): boolean {
  // Check if the pathname starts with any of the protected paths
  return protectedPaths.some(path => pathname.startsWith(path));
}

// 3. Middleware function
export function middleware(request: NextRequest) {
  // 3a. Get pathname
  const { pathname } = request.nextUrl;

  // 3b. Get authentication cookie
  const authToken = request.cookies.get('access_token')?.value; // Using 'access_token' as requested

  // 3c. Check if path is protected AND token is missing
  const pathIsProtected = isProtectedPath(pathname);
  const needsRedirect = pathIsProtected && !authToken;

  console.log(`Middleware: Path="${pathname}", Protected=${pathIsProtected}, HasToken=${!!authToken}, NeedsRedirect=${needsRedirect}`);

  // 3d. Redirect if necessary
  if (needsRedirect) {
    console.log("Middleware: No token on protected path, redirecting to /login");
    const loginUrl = new URL('/login', request.url); // Use request.url as base for correct domain/port
    loginUrl.searchParams.set('callbackUrl', pathname); // Add current path as callback
    return NextResponse.redirect(loginUrl);
  }

  // Optional: Redirect logged-in users away from auth pages
  // if (authToken && (pathname.startsWith('/login') || pathname.startsWith('/register'))) {
  //   console.log("Middleware: Authenticated user accessing auth page, redirecting to /dashboard");
  //   return NextResponse.redirect(new URL('/dashboard', request.url));
  // }

  // 3e. Allow request to proceed
  return NextResponse.next();
}

// 4. Config object with matcher
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
};
