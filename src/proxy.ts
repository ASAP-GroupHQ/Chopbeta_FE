import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const token =
    request.cookies.get("token")?.value ??
    request.cookies.get("accessToken")?.value;
  const userRole = request.cookies.get("role")?.value;
  const { pathname } = request.nextUrl;

  const normalizedPathname = pathname.toLowerCase();
  const isUserDashboard = normalizedPathname.startsWith("/dashboard");
  const isAdminDashboard = normalizedPathname.startsWith("/admin/dashboard");

  // Unauthenticated access guard
  if ((isUserDashboard || isAdminDashboard) && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Non-admin trying to access admin dashboard
  if (isAdminDashboard && userRole && userRole !== "admin") {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // Admin trying to access standard user dashboard (Redirect them to Admin dashboard)
  if (isUserDashboard && !isAdminDashboard && userRole === "admin") {
    return NextResponse.redirect(new URL("/admin/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/admin/dashboard/:path*",
  ],
};
