// proxy.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtDecode } from "jwt-decode";

export default function proxy(request: NextRequest) {
  const currentPath = request.nextUrl.pathname;
  const feedUrl = request.nextUrl.origin + "/feed"; // redirect if not logged in

  // Always allow NextAuth flows (callback, sign-in, sign-out)
  if (currentPath.startsWith("/api/auth")) {
    return NextResponse.next();
  }

  // Allow _next/static, images, favicon, etc.
  if (
    currentPath.startsWith("/_next") ||
    currentPath.startsWith("/static") ||
    currentPath.startsWith("/images") ||
    currentPath.startsWith("/favicon")
  ) {
    return NextResponse.next();
  }

  // Try to read either NextAuth cookies or custom token
  const token =
    request.cookies.get("token")?.value || // custom token
    request.cookies.get("next-auth.session-token")?.value || // dev
    request.cookies.get("__Secure-next-auth.session-token")?.value; // prod secure cookie

  // If no token, redirect to feed/login
  if (!token) {
    return NextResponse.redirect(feedUrl);
  }

  // Optional: validate JWT if using custom token
  if (request.cookies.get("token")?.value) {
    try {
      jwtDecode(token);
    } catch (err) {
      return NextResponse.redirect(feedUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/feed",
    "/posts",
    "/comments",
    "/likes",
    "/api/auth/:path*", // ALLOW all next-auth routes
  ],
};
