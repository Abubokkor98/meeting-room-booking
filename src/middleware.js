import { NextResponse } from "next/server";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export async function middleware(req) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  const adminEmail = "mail.abubokkor@gmail.com";
  const isAdmin = user?.email === adminEmail;

  const url = new URL(req.url); // Use new URL() for better reliability

  // Prevent infinite login redirect loop
  if (!user && url.pathname !== "/api/auth/login") {
    return NextResponse.redirect(new URL("/api/auth/login", req.url));
  }

  // Redirect non-admin users away from dashboard
  if (url.pathname.startsWith("/dashboard") && !isAdmin) {
    return NextResponse.redirect(new URL("/rooms", req.url));
  }

  // Redirect admins away from user-only pages
  if (url.pathname.startsWith("/rooms") && isAdmin) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
}

// Apply middleware to specific paths
export const config = {
  matcher: ["/rooms", "/dashboard/:path*"],
};
