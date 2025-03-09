import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

const isProtectedRoute = createRouteMatcher(['/dashboard(.*)', '/rooms(.*)', '/my-bookings(.*)'])
const isAdminRoute = createRouteMatcher(['/dashboard(.*)'])
const isMemberRoute = createRouteMatcher(['/rooms(.*)', '/my-bookings(.*)'])


export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) {
    await auth.protect()

    // stop member from accessing admin routes
    if (isAdminRoute(req) && (await auth()).sessionClaims?.metadata?.role !== 'meetingroom_admin') {
      const url = new URL('/', req.url)
      return NextResponse.redirect(url)
    }

    // stop admin from accessing member routes
    if (isMemberRoute(req) && (await auth()).sessionClaims?.metadata?.role === 'meetingroom_admin') {
      const url = new URL('/dashboard', req.url)
      return NextResponse.redirect(url)
    }
  }
})

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}