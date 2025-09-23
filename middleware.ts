import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
const publicRoutes = [
  "/signup",
  "/",
  "/forgot-password",
  "/faqs",
  "/verify-account",
];
export function middleware(request: NextRequest) {
  const token = request.cookies.get("accessToken")?.value;
  const role = request.cookies.get("role")?.value;

  const pathname = request.nextUrl.pathname;
  const isPublicRoute = publicRoutes.includes(pathname);

  // Allow public routes without token
  if (isPublicRoute && !token) {
    return NextResponse.next();
  }

  // Handle cases where cookies might not be fully set yet
  if (!token || !role) {
    if (!isPublicRoute) {
      return NextResponse.redirect(new URL("/", request.url));
    }
    return NextResponse.next();
  }

  // Block non-public routes if no token
  if (!token && !isPublicRoute) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Redirect logged-in users from public routes to their dashboard
  if (isPublicRoute && token) {
    console.log(role);

    return NextResponse.redirect(new URL(`${role}/dashboard`, request.url));
  }

  // Role-based protection
  if (pathname.startsWith("/admin") && role !== "admin") {
    return NextResponse.redirect(new URL("/unauthorized", request.url));
  }

  if (pathname.startsWith("/agent") && role !== "agent") {
    return NextResponse.redirect(new URL("/unauthorized", request.url));
  }
  if (pathname.startsWith("/agency") && role !== "agency") {
    return NextResponse.redirect(new URL("/unauthorized", request.url));
  }
  if (pathname.startsWith("/aggregator") && role !== "aggregator") {
    return NextResponse.redirect(new URL("/unauthorized", request.url));
  }

  return NextResponse.next();
}

// Routes Middleware should not run on
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
