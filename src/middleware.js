import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

const isPublicRoute = createRouteMatcher(['/','/sign-in(.*)', '/sign-up(.*)']);
const isAdminRoute = createRouteMatcher(['/dashboard/(.*)']);
const isUserRoute = createRouteMatcher(['/rooms','/my-bookings']);

export default clerkMiddleware(async (auth, req) => {
  const { userId, user } = auth;
  console.log('role',auth);
  console.log(userId, user);

  if (!isPublicRoute(req)) {
    await auth.protect();
  }

  if (!userId) return NextResponse.next();

  // ✅ Safely access user metadata
  if (user) {
    const role = user.publicMetadata?.role || 'user';
    console.log("User Role:", role);

    // Role-based route redirection
    if (role !== 'admin' && isAdminRoute(req)) {
      return NextResponse.redirect(new URL('/rooms', req.url));
    }

    if (role === 'admin' && isUserRoute(req)) {
      return NextResponse.redirect(new URL('/dashboard', req.url));
    }
  } else {
    console.log("User not found in auth object");
  }

  return NextResponse.next();
});

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
