import { NextResponse } from "next/server";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export async function middleware(req) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  const adminEmail = "mail.abubokkor@gmail.com";
  const isAdmin = user?.email === adminEmail;

  const url = req.nextUrl.clone();

  // If user is not logged in, send to login
  if (!user) {
    url.pathname = "/api/auth/login";
    return NextResponse.redirect(url);
  }

  // Admin protection
  if (url.pathname.startsWith("/admin-dashboard") && !isAdmin) {
    url.pathname = "/dashboard";
    return NextResponse.redirect(url);
  }

  // Normal user protection
  if (url.pathname.startsWith("/dashboard") && isAdmin) {
    url.pathname = "/admin-dashboard";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

// Apply middleware to specific paths
export const config = {
  matcher: ["/dashboard/:path*", "/admin-dashboard/:path*"], // Protect these routes
};
