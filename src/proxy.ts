import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Changed function name from middleware to proxy
export function proxy(request: NextRequest) {
  // Edge runtime reads incoming client cookies instantly
  const token = request.cookies.get("token")?.value;
  const { pathname } = request.nextUrl;

  const isProtectedRoute = pathname.startsWith("/dashboard");

  if (isProtectedRoute && !token) {
    const loginUrl = new URL("/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
