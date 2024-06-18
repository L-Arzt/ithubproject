import { NextResponse } from 'next/server';
import withAuth from 'next-auth/middleware';
export default withAuth(function middleware(req) {
  if (req.nextUrl.pathname === '/login') {
    return;
  }
  if (
    req.nextUrl.pathname.startsWith('/') &&
    req.nextauth.token.role !== 'admin'
  ) {
    return NextResponse.redirect(`${req.nextUrl.origin}/login`);
  }
});

export const config = {
  matcher: ['/', '/user/TimeTable'],
};
