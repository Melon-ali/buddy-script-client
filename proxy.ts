import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtDecode } from "jwt-decode";

export default function proxy(request: NextRequest) {
  const currentPath = request.nextUrl.pathname;

  // If user is not logged in → redirect here
  const loginUrl = request.nextUrl.origin + "/login";

  // Allow public routes
  const publicRoutes = ["/login", "/register", "/forgot-password"];

  if (publicRoutes.includes(currentPath)) {
    return NextResponse.next();
  }

  // Allow framework static files and NextAuth routes
  if (
    currentPath.startsWith("/_next") ||
    currentPath.startsWith("/static") ||
    currentPath.startsWith("/images") ||
    currentPath.startsWith("/favicon") ||
    currentPath.startsWith("/api/auth")
  ) {
    return NextResponse.next();
  }

  // Read token from cookies
  const token =
    request.cookies.get("token")?.value ||
    request.cookies.get("next-auth.session-token")?.value ||
    request.cookies.get("__Secure-next-auth.session-token")?.value;

  // No token → redirect to login
  if (!token) {
    return NextResponse.redirect(loginUrl);
  }

  // Validate JWT if custom token exists
  if (request.cookies.get("token")?.value) {
    try {
      jwtDecode(token);
    } catch (err) {
      return NextResponse.redirect(loginUrl);
    }
  }

  // Allow request to continue
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/feed",
    "/posts/:path*",
    "/comments/:path*",
    "/likes/:path*",
  ],
};
