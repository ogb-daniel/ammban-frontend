import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
const publicRoutes = [
  "/signup",
  "/",
  "/forgot-password",
  "/faqs",
  "/verify-account",
];
export async function middleware(request: NextRequest) {
  let token = request.cookies.get("accessToken")?.value;
  const refreshToken = request.cookies.get("refreshToken")?.value;
  const role = request.cookies.get("role")?.value;

  const pathname = request.nextUrl.pathname;
  const isPublicRoute = publicRoutes.includes(pathname);
  console.log("token", token);
  console.log("refreshToken", refreshToken);
  console.log("role", role);
  console.log("pathname", pathname);
  console.log("isPublicRoute", isPublicRoute);

  if (!token && refreshToken && !isPublicRoute) {
    try {
      const refreshResponse = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/TokenAuth/RefreshToken`,
        {
          method: "POST",
          body: JSON.stringify({ refreshToken }),
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      const data = await refreshResponse.json();
      if (data?.result?.accessToken) {
        const newAccessToken = data?.result?.accessToken;
        const newRefreshToken = data?.result?.refreshToken;
        const newExpiresIn = data?.result?.expireInSeconds;
        const newRefreshExpiresIn = data?.result?.refreshTokenExpireInSeconds;
        token = newAccessToken;
        const response = NextResponse.next();
        response.cookies.set("accessToken", newAccessToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          maxAge: newExpiresIn,
          sameSite: "lax",
          path: "/",
        });

        response.cookies.set("refreshToken", newRefreshToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          maxAge: newRefreshExpiresIn,
          sameSite: "lax",
          path: "/",
        });
        return response;
      }
    } catch (error) {
      console.error("Middleware refresh failed:", error);
    }
  }

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
