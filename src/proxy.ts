import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const token =
    request.cookies.get("accessToken")?.value ||
    request.cookies.get("token")?.value;
  const userRole = request.cookies.get("role")?.value; // "admin" or "user"
  const { pathname } = request.nextUrl;

  const isUserDashboard = pathname.startsWith("/dashboard");
  const isAdminDashboard = pathname.startsWith("/admin/dashboard");
  const hasGoogleAuthResponse = [
    "code",
    "token",
    "accessToken",
    "access_token",
    "data",
    "error",
  ].some((key) => request.nextUrl.searchParams.has(key));

  // OAuth responses must reach the client callback before dashboard auth checks run.
  if ((isUserDashboard || isAdminDashboard) && hasGoogleAuthResponse) {
    const callbackUrl = new URL("/google/callback", request.url);
    callbackUrl.search = request.nextUrl.search;
    return NextResponse.redirect(callbackUrl);
  }

  // Unauthenticated access guard
  if ((isUserDashboard || isAdminDashboard) && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Non-admin trying to access admin dashboard
  if (isAdminDashboard && userRole !== "admin") {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // Admin trying to access standard user dashboard (Redirect them to Admin dashboard)
  if (isUserDashboard && !isAdminDashboard && userRole === "admin") {
    return NextResponse.redirect(new URL("/admin/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/admin/dashboard/:path*"],
};
