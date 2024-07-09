import { NextResponse } from 'next/server';

export default function Middleware(request) {
  const response = NextResponse.next();

  let token = request.cookies.has('sessionToken');
  const { pathname } = request.nextUrl;

  if (pathname.startsWith('/histori')) {
    if (!token) {
      return NextResponse.redirect(
        new URL(`/auth/login?callbackUrl=${pathname}`, request.url)
      );
    } else {
      return response;
    }
  }

  if (pathname.startsWith('/account')) {
    if (!token) {
      return NextResponse.redirect(
        new URL(`/auth/login?callbackUrl=${pathname}`, request.url)
      );
    } else {
      return response;
    }
  }

  if (pathname.startsWith('/auth/:path*')) {
    if (token) {
      return NextResponse.redirect(new URL(`/`, request.url));
    } else {
      return response;
    }
  }
}

export const config = {
  matcher: ['/histori/:path*', '/account/:path*'],
};
